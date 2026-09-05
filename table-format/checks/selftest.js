#!/usr/bin/env node
// Every claim we make about the tools, checked.
//
// The point of this file is that nothing in the reports is taken on trust. If
// a claim cannot be checked by a script it does not belong in a report, and if
// it can, it belongs here so it keeps being checked.
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const root = path.resolve(__dirname, '..');
const os = require('os');

// Ninety-three dots and a total is not evidence to anyone but the person who
// wrote them. `--list` names every check and says whether it passed, so a reader
// can see what is actually being promised rather than take a number on trust.
// The whole argument of this repository is that its claims are checkable, and a
// summary line is not a checkable claim.
const VERBOSE = process.argv.includes('--list') || process.env.VERBOSE === '1';

let pass = 0;
const failures = [];
function check(name, fn) {
  let mark, note = '';
  try {
    const why = fn();
    if (why) { failures.push(`${name}: ${why}`); mark = 'x'; note = why; }
    else { pass++; mark = '.'; }
  } catch (e) {
    failures.push(`${name}: threw ${e.message}`);
    mark = 'E';
    note = 'threw ' + e.message;
  }
  if (VERBOSE) {
    const label = mark === '.' ? 'pass' : mark === 'x' ? 'FAIL' : 'ERR ';
    console.log(`  ${label}  ${name}${note ? '  -- ' + note : ''}`);
  } else {
    process.stdout.write(mark);
  }
}

const R = p => fs.readFileSync(path.join(root, p), 'utf8');
const J = p => JSON.parse(R(p));
// On a fresh checkout there is nothing built yet, and dying here with a raw
// ENOENT made `npm test` look broken rather than unbuilt.
if (!fs.existsSync(path.join(root, 'build/format'))) {
  console.error([
    'Nothing has been built yet. Run this first:',
    '',
    '  node scripts/build-all.js',
    ''
  ].join('\n'));
  process.exit(1);
}

// Does a rendered document dump JSON at a reader?
//
// Not every pair of braces is our doing. package.json's own descriptions quote
// { "license": "ISC" } as advice to the reader, and that is the author's prose,
// carried through on purpose. So the author's own text is removed before
// looking. Without this the HTML check was passing for the wrong reason: it
// only missed that text because quotes had become &quot;.
function leaksJSON(rendered, name, isHtml) {
  let text = rendered;
  if (isHtml) {
    text = text.replace(/<[^>]+>/g, ' ')
      .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  }
  const doc = J('build/format/' + name + '.table.json');
  const prose = [];
  (function walk(x) {
    if (!x || typeof x !== 'object') return;
    if (Array.isArray(x)) return x.forEach(walk);
    for (const k of ['description', 'words', 'patternWords', 'text', 'title']) {
      if (typeof x[k] === 'string' && x[k]) prose.push(x[k]);
    }
    for (const k of Object.keys(x)) walk(x[k]);
  })(doc);
  for (const p of [...new Set(prose)].sort((a, b) => b.length - a.length)) {
    text = text.split(p).join(' ');
  }
  const m = text.match(/\{\s*"[a-zA-Z$][^"]*"\s*:/);
  return m ? `shows raw JSON: ${m[0].slice(0, 50)}` : null;
}

// Scripting means markup, not the word "javascript" in a sentence. ESLint's own
// rule text is "Disallow javascript: urls" and tsconfig says "Converts to this
// JavaScript:", both escaped and both harmless. Searching the whole document
// flagged them as pages that contain scripting. Only tags are inspected here.
function scriptingIn(page) {
  const tags = page.match(/<[^>]+>/g) || [];
  const bad = tags.filter(t => /^<script/i.test(t) || /\son[a-z]+\s*=/i.test(t) ||
    /(?:href|src|action|formaction)\s*=\s*["']?\s*javascript:/i.test(t));
  return bad.length ? bad[0].slice(0, 80) : null;
}

// A pointer shown to a reader is a leak. A URL that happens to end in a
// fragment is not: the meta-schema's vocabularies genuinely live at
// "meta/core#/$defs/anchorString", and telling a reader where the rules are
// kept is the whole point of showing it. Only bare local pointers count.
function localPointerIn(text) {
  const m = text.match(/(\S*)#\/(?:\$defs|definitions|properties)\/\S*/);
  if (!m) return null;
  const before = m[1];
  if (/[a-z]+:\/\//i.test(before) || /\.(json|yaml|yml)$/i.test(before) || before.includes('/')) return null;
  return m[0].slice(0, 60);
}

const formats = fs.readdirSync(path.join(root, 'build/format')).filter(f => f.endsWith('.table.json'));
const names = formats.map(f => f.replace('.table.json', ''));

// ---- what a page may never contain ---------------------------------------
// A reader is never shown JSON, a pointer, or a raw pattern, and no page is
// allowed to depend on scripting.
for (const n of names) {
  const html = R('build/pages/' + n + '.html');
  check(n + ': no scripting', () => {
    const bad = scriptingIn(html);
    return bad ? 'page contains scripting: ' + bad : null;
  });
  check(n + ': no raw pointers shown', () => {
    const text = html.replace(/<[^>]+>/g, ' ');
    const m = localPointerIn(text);
    return m ? `shows a pointer: ${m}` : null;
  });
  check(n + ': no JSON braces shown', () => {
    return leaksJSON(R('build/pages/' + n + '.html'), n, true) || null;
  });
  // A regular expression is unreadable, so the page says what it allows in
  // words instead. The README claims this and nothing was checking it.
  check(n + ': no raw patterns shown', () => {
    const text = html.replace(/<[^>]+>/g, ' ');
    const m = text.match(/\^[^\s]*\$|\[a-z0-9[^\]]*\]\s*[+*]|\\[dws][+*]?/i);
    return m ? `shows a raw pattern: ${m[0].slice(0, 40)}` : null;
  });
  // The Markdown renderer is held to the same promises as the page. It was not
  // being checked at all, so it could have leaked both and passed.
  check(n + ': Markdown shows no JSON or pointers', () => {
    const md = R('build/markdown/' + n + '.md');
    const mdPtr = localPointerIn(md);
    if (mdPtr) return 'shows a pointer: ' + mdPtr;
    // The pattern check used to be on the page only, while the report claimed
    // both. Same rule, same renderer promise.
    const pat = md.match(/\^[^\s]*\$|\[a-z0-9[^\]]*\]\s*[+*]/i);
    if (pat) return `shows a raw pattern: ${pat[0].slice(0, 40)}`;
    return leaksJSON(md, n, false) || null;
  });
}

// ---- the format describes itself -----------------------------------------
// Every key the converter emits has to be written down in the format spec.
// Otherwise the spec drifts into being a nice document about a different
// format from the one we actually produce.
check('format spec covers every key emitted', () => {
  const spec = J('patterns/table-format.schema.json');
  const known = new Set();
  (function collect(n) {
    if (!n || typeof n !== 'object') return;
    if (Array.isArray(n)) return n.forEach(collect);
    for (const k of Object.keys(n.properties || {})) known.add(k);
    for (const k of Object.keys(n)) collect(n[k]);
  })(spec);
  const emitted = new Set();
  // `rules` is deliberately free-form, and the rest hold values written by the
  // schema's author. OpenAPI's default server is {"url": "/"}, and reading that
  // as a format key called `url` is my walker's mistake, not the format's.
  //  is rules-half content too: keywords of a drawer, kept verbatim.
  const skip = new Set(['rules', 'containers', 'default', 'example', 'fixed', 'forbidden']);
  for (const f of formats) {
    (function walk(n, inRules) {
      if (!n || typeof n !== 'object') return;
      if (Array.isArray(n)) return n.forEach(x => walk(x, inRules));
      for (const k of Object.keys(n)) {
        if (!inRules) emitted.add(k);
        walk(n[k], inRules || skip.has(k));
      }
    })(J('build/format/' + f), false);
  }
  const missing = [...emitted].filter(k => !known.has(k));
  return missing.length ? 'spec does not describe: ' + missing.join(', ') : null;
});

// ---- the page is sound as a document -------------------------------------
// Two elements with one id is invalid, and it is also the shape of a real bug:
// it is what the meta-schema looked like when the whole document was drawn once
// as the root and again as a shape.
for (const n of names) {
  check(n + ': no repeated ids', () => {
    const ids = [...R('build/pages/' + n + '.html').matchAll(/\sid="([^"]*)"/g)].map(m => m[1]);
    const dupes = ids.filter((x, i) => ids.indexOf(x) !== i);
    return dupes.length ? 'repeated: ' + [...new Set(dupes)].join(', ') : null;
  });
  check(n + ': every internal link has somewhere to land', () => {
    const html = R('build/pages/' + n + '.html');
    const ids = new Set([...html.matchAll(/\sid="([^"]*)"/g)].map(m => m[1]));
    const dead = [...new Set([...html.matchAll(/href="#([^"]*)"/g)].map(m => m[1]))]
      .filter(h => h && !ids.has(h));
    return dead.length ? 'links to nothing: ' + dead.slice(0, 5).join(', ') : null;
  });
}

// ---- nothing is carried and then never shown -----------------------------
// A rule that sits in the doc half but reaches no page is the worst kind of
// bug, because every number still looks right while a reader is quietly not
// being told something. This caught OpenAPI's "value and externalValue cannot
// both be used", which was carried under a key no renderer read.
for (const n of names) {
  check(n + ': every exclusion reaches the page', () => {
    const doc = J('build/format/' + n + '.table.json');
    // Count distinct rules, not occurrences. The same set is reachable by
    // several paths through the format, and one page line covers all of them.
    const want = new Set();
    const seen = new Set();
    (function walk(x, inRules) {
      if (!x || typeof x !== 'object' || seen.has(x)) return;
      seen.add(x);
      if (Array.isArray(x)) return x.forEach(y => walk(y, inRules));
      if (!inRules) for (const set of x.exclusiveSets || []) want.add(set.join(' and '));
      for (const k of Object.keys(x)) walk(x[k], inRules || k === 'rules');
    })(doc, false);
    const html = R('build/pages/' + n + '.html');
    const absent = [...want].filter(w => !html.includes(`cannot use ${w} together`));
    return absent.length ? `not shown on the page: ${absent.join('; ')}` : null;
  });
}

// ---- the round trip ------------------------------------------------------
const { rebuild, compare } = require('../scripts/table-to-schema.js');
for (const n of names) {
  check(n + ': rebuilds and keeps meaning', () => {
    const doc = J('build/format/' + n + '.table.json');
    const r = compare(J(doc.source), rebuild(doc));
    // 97 was low enough that the suite would have stayed green while the
    // reported figure collapsed. The bar is set just under where it actually is.
    return r.meaningKept < 99.5 ? `only ${r.meaningKept.toFixed(1)}% of meaning kept` : null;
  });
}

// ---- the renderers only read the doc half --------------------------------
// If a renderer reached into `rules` it could look good while the format was
// carrying nothing. Stripping rules entirely must not change a page.
for (const n of names) {
  check(n + ': renderers never read the rules half', () => {
    const html = require('../scripts/table-to-html.js');
    const md = require('../scripts/table-to-markdown.js');
    const doc = J('build/format/' + n + '.table.json');
    const stripped = JSON.parse(JSON.stringify(doc), function (k, v) { return k === 'rules' ? undefined : v; });
    if (html.render(doc) !== html.render(stripped)) return 'the HTML changed when rules were removed';
    if (md.render(doc) !== md.render(stripped)) return 'the Markdown changed when rules were removed';
    return null;
  });
}

// The format is written as a JSON Schema so it can check its own output. That
// is only true if something actually validates against it.
for (const n of names) {
  check(n + ': the format matches its own spec', () => {
    const { check: validate } = require('../scripts/validate-format.js');
    const errors = validate(J('build/format/' + n + '.table.json'), J('patterns/table-format.schema.json'));
    return errors.length ? `${errors.length} problems, first: ${errors[0]}` : null;
  });
}

// ---- the repository still has the files it needs -------------------------
// package.json and the tool README were both silently lost for four commits,
// because a script checked out an old tag to measure it and restored only some
// of the tree. Nothing noticed, because nothing was looking.
check('package.json is present and points at real files', () => {
  const p = path.join(root, 'package.json');
  if (!fs.existsSync(p)) return 'package.json is missing';
  const pkg = JSON.parse(fs.readFileSync(p, 'utf8'));
  const missing = Object.entries(pkg.bin || {})
    .filter(([, target]) => !fs.existsSync(path.join(root, target)))
    .map(([name]) => name);
  if (missing.length) return 'bin entries point at nothing: ' + missing.join(', ');
  const noScripts = ['build', 'test'].filter(k => !(pkg.scripts || {})[k]);
  return noScripts.length ? 'no npm script for: ' + noScripts.join(', ') : null;
});

check('the README is the tool README, not the lab notes', () => {
  const readme = R('README.md');
  if (/^# json-docs-lab/m.test(readme)) return 'README.md has reverted to the lab notes';
  // What matters is that the README documents the tools, not that it spells any
  // particular harness filename. It named them directly until the commands moved
  // behind `npm run build` and `npm test`, at which point this check failed for
  // the wrong reason.
  const tools = ['schema-to-table', 'table-to-html', 'table-to-markdown', 'table-to-schema'];
  const absent = tools.filter(x => !readme.includes(x));
  if (absent.length) return 'README does not document: ' + absent.join(', ');
  return /-o <dir>|-o `|`-o`/.test(readme) ? null : 'README does not explain the -o option';
});

check('every script the README names exists', () => {
  const named = [...new Set([...R('README.md').matchAll(/scripts\/([a-z-]+\.js)/g)].map(m => m[1]))];
  const gone = named.filter(f => !fs.existsSync(path.join(root, 'scripts', f)));
  return gone.length ? 'README names scripts that do not exist: ' + gone.join(', ') : null;
});

// ---- the command line tools ----------------------------------------------
const node = process.execPath;
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'jst-'));
const run = (script, args, opts = {}) =>
  execFileSync(node, [path.join(root, 'scripts', script), ...args],
    { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], ...opts });

check('cli: --help exits cleanly', () => {
  const out = run('schema-to-table.js', ['--help']);
  return out.includes('usage:') ? null : 'no usage line';
});

check('cli: no arguments is an error, not a crash', () => {
  try { run('schema-to-table.js', []); return 'should have failed'; }
  catch (e) { return e.status === 1 ? null : `exited ${e.status}`; }
});

check('cli: unknown option is refused', () => {
  try { run('schema-to-table.js', ['--wat', 'x.json']); return 'should have failed'; }
  catch (e) { return String(e.stderr).includes('unknown option') ? null : 'wrong message'; }
});

check('cli: a missing file says so by name', () => {
  try { run('schema-to-table.js', ['nope.json']); return 'should have failed'; }
  catch (e) { return String(e.stderr).includes('no such file') ? null : `said: ${e.stderr}`; }
});

check('cli: -o writes where it is told', () => {
  run('schema-to-table.js', ['samples/real/package.json', '-o', tmp]);
  return fs.existsSync(path.join(tmp, 'package.table.json')) ? null : 'nothing written to the chosen directory';
});

check('cli: -o - writes to stdout', () => {
  const out = run('schema-to-table.js', ['samples/real/package.json', '-o', '-']);
  try { JSON.parse(out); } catch { return 'stdout was not valid JSON'; }
  return null;
});

check('cli: stdout refuses two inputs', () => {
  try {
    run('schema-to-table.js', ['samples/real/package.json', 'samples/real/openapi31.json', '-o', '-']);
    return 'should have failed';
  } catch (e) { return String(e.stderr).includes('exactly one') ? null : 'wrong message'; }
});

// The README shows the tools piping into each other. If that stops working the
// README is wrong, so it is checked rather than hoped for.
check('cli: the tools pipe into each other', () => {
  const table = run('schema-to-table.js', ['samples/real/package.json', '-o', '-']);
  const page = execFileSync(node, [path.join(root, 'scripts/table-to-html.js'), '-', '-o', '-'],
    { cwd: root, encoding: 'utf8', input: table, stdio: ['pipe', 'pipe', 'pipe'] });
  if (!page.trimStart().startsWith('<')) return 'the second tool did not produce a page';
  const back = execFileSync(node, [path.join(root, 'scripts/table-to-schema.js'), '-', '-o', '-'],
    { cwd: root, encoding: 'utf8', input: table, stdio: ['pipe', 'pipe', 'pipe'] });
  return Object.keys(JSON.parse(back).properties || {}).length ? null : 'the rebuild off a pipe was empty';
});

// Each of these was a real bug found in review: the parser accepted something
// that looked like it worked and quietly did something else.
check('cli: -o with nothing after it is refused', () => {
  try { run('schema-to-table.js', ['samples/real/package.json', '-o']); return 'should have failed'; }
  catch (e) { return String(e.stderr).includes('needs a directory') ? null : `said: ${e.stderr}`; }
});

check('cli: -o does not swallow the next flag', () => {
  try {
    run('table-to-schema.js', ['build/format/package.table.json', '-o', '--compare']);
    return 'should have failed';
  } catch (e) { return String(e.stderr).includes('but got --compare') ? null : `said: ${e.stderr}`; }
});

check('cli: -o twice is refused', () => {
  try { run('schema-to-table.js', ['samples/real/package.json', '-o', tmp, '-o', tmp]); return 'should have failed'; }
  catch (e) { return String(e.stderr).includes('given twice') ? null : `said: ${e.stderr}`; }
});

check('cli: -o at an existing file explains itself', () => {
  const f = path.join(tmp, 'a-file');
  fs.writeFileSync(f, 'x');
  try { run('schema-to-table.js', ['samples/real/package.json', '-o', f]); return 'should have failed'; }
  catch (e) { return String(e.stderr).includes('already a file') ? null : `said: ${e.stderr}`; }
});

check('cli: two inputs with one basename are refused', () => {
  try {
    run('schema-to-table.js', ['samples/real/package.json', './samples/real/package.json', '-o', tmp]);
    return 'should have failed';
  } catch (e) { return String(e.stderr).includes('would both be written') ? null : `said: ${e.stderr}`; }
});

check('cli: a schema handed to a renderer says so', () => {
  try { run('table-to-html.js', ['samples/real/package.json', '-o', '-']); return 'should have failed'; }
  catch (e) {
    return String(e.stderr).includes('looks like a JSON Schema') ? null : `said: ${e.stderr}`;
  }
});

check('cli: a directory as input says so', () => {
  try { run('schema-to-table.js', ['samples']); return 'should have failed'; }
  catch (e) { return String(e.stderr).includes('is a directory') ? null : `said: ${e.stderr}`; }
});

// Without -o, results belong where the user is standing, not inside the tool.
// They used to land in the tool's own folder, which for an installed copy meant
// writing into node_modules.
check('cli: default output is relative to the working directory', () => {
  const here = fs.mkdtempSync(path.join(os.tmpdir(), 'jst-cwd-'));
  fs.copyFileSync(path.join(root, 'samples/real/package.json'), path.join(here, 'thing.json'));
  execFileSync(node, [path.join(root, 'scripts/schema-to-table.js'), 'thing.json'],
    { cwd: here, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  return fs.existsSync(path.join(here, 'build/format/thing.table.json'))
    ? null : 'did not write into the working directory';
});

check('cli: an output name does not keep the input extension', () => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'jst-ext-'));
  fs.copyFileSync(path.join(root, 'build/format/package.table.json'), path.join(d, 'fmt.json'));
  run('table-to-html.js', [path.join(d, 'fmt.json'), '-o', d]);
  return fs.existsSync(path.join(d, 'fmt.html')) ? null
    : 'expected fmt.html, got ' + fs.readdirSync(d).join(', ');
});

// Every other tool had command line checks and this one had none, while the
// report said "every command line tool".
check('cli: table-to-markdown writes where it is told', () => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'jst-md-'));
  run('table-to-markdown.js', ['build/format/package.table.json', '-o', d]);
  return fs.existsSync(path.join(d, 'package.md')) ? null : 'nothing written';
});

check('cli: table-to-markdown refuses a schema', () => {
  try { run('table-to-markdown.js', ['samples/real/package.json', '-o', '-']); return 'should have failed'; }
  catch (e) { return String(e.stderr).includes('looks like a JSON Schema') ? null : `said: ${e.stderr}`; }
});

check('cli: table-to-markdown writes to stdout', () => {
  const out = run('table-to-markdown.js', ['build/format/package.table.json', '-o', '-']);
  return out.trimStart().startsWith('#') ? null : 'stdout was not Markdown';
});

check('cli: progress notes stay off stdout', () => {
  const out = run('table-to-html.js', ['build/format/package.table.json', '-o', '-']);
  return out.trimStart().startsWith('<') ? null : 'stdout was polluted with progress output';
});

// The one that matters most: the format alone has to be enough to rebuild a
// schema. If this needs the original file, the format is not self contained.
check('cli: rebuild works without the original schema', () => {
  const isolated = fs.mkdtempSync(path.join(os.tmpdir(), 'jst-alone-'));
  fs.copyFileSync(path.join(root, 'build/format/package.table.json'), path.join(isolated, 'package.table.json'));
  const out = execFileSync(node, [path.join(root, 'scripts/table-to-schema.js'), 'package.table.json', '-o', '-'],
    { cwd: isolated, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  const back = JSON.parse(out);
  return back.properties && Object.keys(back.properties).length ? null : 'rebuilt an empty schema';
});

check('cli: --compare explains itself when the original is absent', () => {
  const isolated = fs.mkdtempSync(path.join(os.tmpdir(), 'jst-cmp-'));
  fs.copyFileSync(path.join(root, 'build/format/package.table.json'), path.join(isolated, 'package.table.json'));
  try {
    execFileSync(node, [path.join(root, 'scripts/table-to-schema.js'), 'package.table.json', '--compare'],
      { cwd: isolated, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    return 'should have failed';
  } catch (e) {
    return String(e.stderr).includes('is not here') ? null : `unhelpful message: ${e.stderr}`;
  }
});

// ---- report ---------------------------------------------------------------
console.log(VERBOSE ? '' : '\n');
if (failures.length) {
  failures.forEach(f => console.log('  FAIL  ' + f));
  console.log(`\n${pass} passed, ${failures.length} failed`);
  process.exit(1);
}
console.log(`${pass} checks passed` + (VERBOSE ? '' : '   (--list names every one)'));
