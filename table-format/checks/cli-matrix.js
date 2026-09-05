#!/usr/bin/env node
// Every command line tool, every flag, every way of getting it wrong.
//
// The selftest checks the cases that were once bugs. This runs the full grid so
// the README's promises can be shown rather than asserted, and so a reviewer can
// see exactly what each tool does with each input.
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const root = path.resolve(__dirname, '..');
const node = process.execPath;

const TOOLS = ['schema-to-table', 'table-to-html', 'table-to-markdown', 'table-to-schema', 'validate-format'];

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cli-matrix-'));
const rows = [];
let failures = 0;

// Run a command and record what actually happened, rather than only whether it
// matched an expectation.
function run(args, opts = {}) {
  // stderr matters on success as well as on failure: progress notes and the
  // comparison table both go there so that stdout stays pipeable. It is sent to
  // a file and read back either way, because redirecting it to a descriptor
  // means the thrown error no longer carries it.
  const err = path.join(tmp, 'stderr.txt');
  const fd = fs.openSync(err, 'w');
  let out = '', code = 0;
  try {
    out = execFileSync(node, args, {
      cwd: opts.cwd || root, encoding: 'utf8', timeout: 120000,
      input: opts.input, stdio: [opts.input === undefined ? 'ignore' : 'pipe', 'pipe', fd]
    });
  } catch (e) {
    code = e.status == null ? -1 : e.status;
    out = String(e.stdout || '');
  } finally { fs.closeSync(fd); }
  let stderr = '';
  try { stderr = fs.readFileSync(err, 'utf8'); } catch { /* nothing written */ }
  return { code, stdout: out, stderr };
}

const tool = t => path.join(root, 'scripts', t + '.js');
// A temp directory has a different random name every run, so this report
// changed on every run for no reason at all, and it wrote the author's home
// directory into a file meant to be published. Anything outside the repository
// becomes a stable placeholder.
function redact(s) {
  let out = String(s).split(tmp).join('<tmp>').split(root).join('.');
  out = out.replace(/[A-Za-z]:[\\/][^\s"'|]*(cli-[a-z]+-|jst-)[A-Za-z0-9]+/g, '<tmp>');
  out = out.replace(/\/tmp\/[^\s"'|]*/g, '<tmp>');
  return out;
}

const oneLine = s => redact(String(s).split('\n').find(l => l.trim()) || '');

function record(what, cmd, r, expect) {
  const ok = expect(r);
  if (!ok) failures++;
  rows.push({
    what, cmd: redact(cmd),
    code: r.code,
    said: oneLine(r.code === 0 ? r.stdout || r.stderr : r.stderr).slice(0, 90),
    ok
  });
}

const exits0 = r => r.code === 0;
const exits1 = r => r.code === 1;
const refuses = msg => r => r.code === 1 && (r.stderr + r.stdout).includes(msg);

// ---- help and misuse, for every tool -------------------------------------
for (const t of TOOLS) {
  record(`${t}: --help`, `${t} --help`, run([tool(t), '--help']),
    r => r.code === 0 && r.stdout.includes('usage:'));
  record(`${t}: no arguments`, t, run([tool(t)]), exits1);
  record(`${t}: unknown option`, `${t} --nope x.json`, run([tool(t), '--nope', 'x.json']),
    refuses('unknown option'));
  record(`${t}: missing file`, `${t} nope.json`, run([tool(t), 'nope.json']),
    refuses('no such file'));
  record(`${t}: a directory`, `${t} samples`, run([tool(t), 'samples']),
    refuses('is a directory'));
  record(`${t}: -o with no value`, `${t} <in> -o`, run([tool(t), 'samples/real/package.json', '-o']),
    refuses('needs a directory'));
  record(`${t}: -o twice`, `${t} <in> -o a -o b`,
    run([tool(t), 'samples/real/package.json', '-o', tmp, '-o', tmp]), refuses('given twice'));
}

// ---- the happy path, tool by tool ----------------------------------------
const out1 = path.join(tmp, 'one');
record('schema-to-table: -o <dir>', 'schema-to-table samples/real/package.json -o <dir>',
  run([tool('schema-to-table'), 'samples/real/package.json', '-o', out1]),
  r => r.code === 0 && fs.existsSync(path.join(out1, 'package.table.json')));

record('schema-to-table: -o - is JSON on stdout', 'schema-to-table <in> -o -',
  run([tool('schema-to-table'), 'samples/real/package.json', '-o', '-']),
  r => { try { return r.code === 0 && !!JSON.parse(r.stdout).shapes; } catch { return false; } });

record('schema-to-table: two inputs, one -o', 'schema-to-table a.json b.json -o <dir>',
  run([tool('schema-to-table'), 'samples/real/package.json', 'samples/real/openapi31.json', '-o', out1]),
  r => r.code === 0 && fs.existsSync(path.join(out1, 'openapi31.table.json')));

record('schema-to-table: stdout refuses two inputs', 'schema-to-table a.json b.json -o -',
  run([tool('schema-to-table'), 'samples/real/package.json', 'samples/real/openapi31.json', '-o', '-']),
  refuses('exactly one'));

record('schema-to-table: same basename twice', 'schema-to-table a/x.json b/x.json',
  run([tool('schema-to-table'), 'samples/real/package.json', './samples/real/package.json', '-o', out1]),
  refuses('would both be written'));

const table = path.join(out1, 'package.table.json');
for (const [t, ext, firstChar] of [['table-to-html', '.html', '<'], ['table-to-markdown', '.md', '#']]) {
  record(`${t}: -o <dir>`, `${t} <table> -o <dir>`, run([tool(t), table, '-o', out1]),
    r => r.code === 0 && fs.existsSync(path.join(out1, 'package' + ext)));
  record(`${t}: -o -`, `${t} <table> -o -`, run([tool(t), table, '-o', '-']),
    r => r.code === 0 && r.stdout.trimStart().startsWith(firstChar));
  record(`${t}: refuses a schema`, `${t} <schema> -o -`,
    run([tool(t), 'samples/real/package.json', '-o', '-']), refuses('looks like a JSON Schema'));
}

record('table-to-schema: rebuild without the original', 'table-to-schema <table> -o -',
  run([tool('table-to-schema'), table, '-o', '-']),
  r => { try { return r.code === 0 && Object.keys(JSON.parse(r.stdout).properties || {}).length > 0; } catch { return false; } });

record('table-to-schema: --compare against the original', 'table-to-schema <table> --compare',
  run([tool('table-to-schema'), 'build/format/package.table.json', '--compare', '-o', out1]),
  r => r.code === 0 && /kept|%/.test(r.stderr));

// The format alone has to be enough. Run it somewhere the original is not.
const alone = path.join(tmp, 'alone');
fs.mkdirSync(alone, { recursive: true });
fs.copyFileSync(table, path.join(alone, 'package.table.json'));
record('table-to-schema: works with the original absent', 'cd elsewhere; table-to-schema <table> -o -',
  run([tool('table-to-schema'), 'package.table.json', '-o', '-'], { cwd: alone }),
  r => r.code === 0 && r.stdout.trimStart().startsWith('{'));
record('table-to-schema: --compare says why it cannot', 'cd elsewhere; table-to-schema <table> --compare',
  run([tool('table-to-schema'), 'package.table.json', '--compare'], { cwd: alone }),
  refuses('is not here'));

record('validate-format: a valid format', 'validate-format <table>',
  run([tool('validate-format'), table]), r => r.code === 0 && /valid/.test(r.stderr + r.stdout));

const broken = path.join(tmp, 'broken.table.json');
{
  const d = JSON.parse(fs.readFileSync(table, 'utf8'));
  d.format = 'wrong/9';
  delete d.shapes[0].name;
  fs.writeFileSync(broken, JSON.stringify(d));
}
record('validate-format: catches a broken one', 'validate-format <broken>',
  run([tool('validate-format'), broken]), r => r.code === 1 && /problems/.test(r.stderr + r.stdout));

// ---- stdin, stdout and pipes ----------------------------------------------
const tableText = fs.readFileSync(table, 'utf8');
record('pipe: schema-to-table | table-to-html', 'schema-to-table <in> -o - | table-to-html - -o -',
  run([tool('table-to-html'), '-', '-o', '-'], { input: tableText }),
  r => r.code === 0 && r.stdout.trimStart().startsWith('<'));
record('pipe: schema-to-table | table-to-schema', 'schema-to-table <in> -o - | table-to-schema - -o -',
  run([tool('table-to-schema'), '-', '-o', '-'], { input: tableText }),
  r => r.code === 0 && r.stdout.trimStart().startsWith('{'));
record('pipe: broken JSON on stdin', 'echo "not json" | table-to-html - -o -',
  run([tool('table-to-html'), '-', '-o', '-'], { input: 'not json at all' }),
  refuses('not valid JSON'));
record('stdout carries only the result', 'table-to-html <table> -o - (stdout is pure)',
  run([tool('table-to-html'), table, '-o', '-']),
  r => r.code === 0 && !r.stdout.includes('KB  '));

// ---- awkward paths --------------------------------------------------------
const dashy = path.join(tmp, '-o.json');
fs.copyFileSync(path.join(root, 'samples/real/package.json'), dashy);
record('a filename starting with a dash, after --', 'schema-to-table -o <dir> -- -o.json',
  run([tool('schema-to-table'), '-o', out1, '--', dashy]), exits0);
record('after --, a flag is treated as a filename', 'schema-to-table -- -o <dir>',
  run([tool('schema-to-table'), '--', '-o', out1]), refuses('no such file'));

const spacey = path.join(tmp, 'a name with spaces.json');
fs.copyFileSync(path.join(root, 'samples/real/package.json'), spacey);
record('a filename with spaces', 'schema-to-table "a name with spaces.json"',
  run([tool('schema-to-table'), spacey, '-o', out1]), exits0);

record('-o at a path that is a file', 'schema-to-table <in> -o <existing file>',
  run([tool('schema-to-table'), 'samples/real/package.json', '-o', dashy]),
  refuses('already a file'));

// Without -o, results belong where the user is standing.
const cwdTest = fs.mkdtempSync(path.join(os.tmpdir(), 'cli-cwd-'));
fs.copyFileSync(path.join(root, 'samples/real/package.json'), path.join(cwdTest, 'thing.json'));
record('no -o writes under the working directory', 'cd elsewhere; schema-to-table thing.json',
  run([tool('schema-to-table'), 'thing.json'], { cwd: cwdTest }),
  r => r.code === 0 && fs.existsSync(path.join(cwdTest, 'build/format/thing.table.json')));

// ---- the whole chain on every stress schema -------------------------------
const stressDir = path.join(root, 'samples/stress');
if (fs.existsSync(stressDir)) {
  const files = fs.readdirSync(stressDir).filter(f => f.endsWith('.json'));
  const chainOut = path.join(tmp, 'chain');
  let chainOk = 0;
  for (const f of files) {
    const a = run([tool('schema-to-table'), path.join('samples/stress', f), '-o', chainOut]);
    const name = f.replace(/\.json$/, '');
    const t = path.join(chainOut, name + '.table.json');
    if (a.code !== 0 || !fs.existsSync(t)) continue;
    const b = run([tool('table-to-html'), t, '-o', chainOut]);
    const c = run([tool('table-to-markdown'), t, '-o', chainOut]);
    const d = run([tool('table-to-schema'), t, '-o', chainOut]);
    const e = run([tool('validate-format'), t]);
    if (b.code === 0 && c.code === 0 && d.code === 0 && e.code === 0) chainOk++;
  }
  record(`the full chain over all ${files.length} stress schemas`,
    'schema-to-table -> html, markdown, schema, validate',
    { code: chainOk === files.length ? 0 : 1, stdout: `${chainOk} of ${files.length} went through every tool`, stderr: '' },
    r => r.code === 0);
}

// ---- report ---------------------------------------------------------------
const L = [];
L.push('# The command line tools, exercised', '');
L.push(`${rows.length} commands run. ${rows.filter(r => r.ok).length} behaved as documented, ${failures} did not.`, '');
L.push('Every row below is a command that was actually run, with the exit code it');
L.push('returned and the first line it said. Nothing here is asserted.', '');
L.push('| What | Command | Exit | What it said | As documented |', '|---|---|---|---|---|');
for (const r of rows) {
  L.push(`| ${r.what} | \`${r.cmd}\` | ${r.code} | ${String(r.said).replace(/\|/g, '\\|')} | ${r.ok ? 'yes' : '**NO**'} |`);
}
L.push('');
fs.mkdirSync(path.join(root, 'reports'), { recursive: true });
fs.writeFileSync(path.join(root, 'reports/cli-matrix.md'), L.join('\n') + '\n');

console.log(`${rows.length} commands, ${rows.filter(r => r.ok).length} as documented, ${failures} not`);
rows.filter(r => !r.ok).forEach(r => console.log(`  FAIL ${r.what}: exit ${r.code} — ${r.said}`));
process.exitCode = failures ? 1 : 0;
