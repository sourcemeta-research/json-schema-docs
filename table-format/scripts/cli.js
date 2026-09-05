// Shared command line handling for the four tools.
//
// The scripts started as a lab harness: they took input paths but always wrote
// into build/ next to themselves, which is fine for our own build and useless
// to anyone else. These helpers give every tool the same behaviour: pick your
// own output directory, write to stdout instead, read stdin, and get a usage
// line rather than a stack trace when you get it wrong.
'use strict';
const fs = require('fs');
const path = require('path');

function fail(msg) { console.error(msg); process.exit(1); }

// `-o -` means stdout. That only makes sense for one input, because two
// documents on one stream cannot be told apart.
// The options every tool accepts, appended to each tool's own usage text.
//
// Three of them were documented in the README and invisible to anyone who ran
// --help, which is the first place a person looks. `--` in particular has to be
// last, and neither the README nor the help said so.
function sharedOptions({ noOut = false } = {}) {
  const lines = [''];
  if (!noOut) {
    lines.push('  -o <dir>     write results into <dir>');
    lines.push('  -o -         write the result to stdout instead (one input only)');
  }
  lines.push('  -            as an input, read from stdin');
  lines.push('  --           end of options: everything after it is a filename, so');
  lines.push('               it has to come last');
  lines.push('  -h, --help   print this and exit');
  return lines.join('\n');
}

function parse(argv, { usage, flags = [], noOut = false }) {
  // Appended here rather than in each tool, so a tool cannot document a
  // different set of shared options from the one it actually has.
  usage = usage + '\n' + sharedOptions({ noOut });
  const inputs = [];
  const on = Object.fromEntries(flags.map(f => [f, false]));
  let out = null;
  let noMoreFlags = false;

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (noMoreFlags) { inputs.push(a); continue; }
    // Everything after `--` is a filename, which is the only way to name a file
    // that begins with a dash.
    if (a === '--') { noMoreFlags = true; continue; }
    if (a === '-o' || a === '--out') {
      const next = argv[i + 1];
      // `-o` with nothing after it used to fall back to the default directory,
      // so asking for a destination and getting none looked like success.
      if (next === undefined) fail(`${a} needs a directory after it, or - for stdout\n\n${usage}`);
      // `-o --compare` silently created a directory named "--compare" and threw
      // the flag away.
      if (next !== '-' && next.startsWith('-')) {
        fail(`${a} needs a directory after it, but got ${next}\n\n${usage}`);
      }
      if (out !== null) fail(`${a} was given twice (${out} and then ${next})`);
      out = next;
      i++;
      continue;
    }
    if (a === '-h' || a === '--help') { console.log(usage); process.exit(0); }
    if (a.startsWith('--') && flags.includes(a.slice(2))) { on[a.slice(2)] = true; continue; }
    if (a.startsWith('-') && a !== '-') {
      fail(`unknown option ${a}\nIf that is a filename, put it after -- or write ./${a}\n\n${usage}`);
    }
    inputs.push(a);
  }

  if (!inputs.length) fail(usage);
  const stdout = out === '-';
  if (stdout && inputs.length > 1) fail('writing to stdout needs exactly one input file');
  if (inputs.filter(x => x === '-').length > 1) fail('only one input can be read from stdin');
  return { inputs, out, stdout, on };
}

// Read a JSON file and say which file was bad rather than letting a parse
// error surface with no filename attached.
//
// `-` as an input means stdin, so the tools pipe into each other. Naming the
// stream /dev/stdin instead looks like it works and then fails on Windows,
// where that path does not exist.
function readJSON(file) {
  let text;
  try { text = fs.readFileSync(file === '-' ? 0 : file, 'utf8'); }
  catch (e) {
    const why = e.code === 'ENOENT' ? 'no such file'
      : e.code === 'EISDIR' ? 'that is a directory, not a file'
      : e.code === 'EACCES' ? 'no permission to read it'
      : e.message;
    fail(`cannot read ${file}: ${why}`);
  }
  try { return JSON.parse(text); }
  catch (e) { fail(`${file === '-' ? 'the input' : file} is not valid JSON: ${e.message}`); }
}

// The table format, checked before use. Handing a schema to a renderer is the
// likeliest mistake there is, and it used to produce a TypeError from deep
// inside the renderer rather than a sentence saying what went wrong.
function readTable(file) {
  const doc = readJSON(file);
  if (!doc || typeof doc !== 'object' || !Array.isArray(doc.shapes) || !doc.root) {
    fail(`${file === '-' ? 'the input' : file} is not the table format.\n` +
      (doc && (doc.$schema || doc.properties)
        ? 'It looks like a JSON Schema. Run it through schema-to-table first.'
        : 'Expected an object with "root" and "shapes", as written by schema-to-table.'));
  }
  return doc;
}

// Where a result goes.
//
// Without -o, output goes to ./build/<kind> in the directory the user is
// standing in. It used to go to build/ inside the tool's own folder, which for
// anyone who installed this meant their files landed in node_modules.
function write(opts, kind, name, body) {
  if (opts.stdout) {
    // Piping into something that stops reading, `| head` being the obvious case,
    // closes the pipe under us. That is normal use, not a failure, and it was
    // producing an unhandled EPIPE stack trace.
    process.stdout.on('error', e => { if (e.code === 'EPIPE') process.exit(0); throw e; });
    try { process.stdout.write(body.endsWith('\n') ? body : body + '\n'); }
    catch (e) { if (e.code !== 'EPIPE') throw e; }
    return null;
  }
  const dir = opts.out || path.join(process.cwd(), 'build', kind);
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch (e) {
    fail(e.code === 'EEXIST' || e.code === 'ENOTDIR'
      ? `cannot write into ${dir}: there is already a file with that name`
      : `cannot create ${dir}: ${e.message}`);
  }
  const file = path.join(dir, name);
  fs.writeFileSync(file, body);
  return file;
}

// Two inputs with the same basename write to the same output file, and the
// second used to overwrite the first while both reported success.
function checkCollisions(inputs, ext, outExt) {
  if (inputs.length < 2) return;
  const seen = new Map();
  for (const f of inputs) {
    const name = nameOf(f, ext);
    if (seen.has(name)) {
      fail(`${f} and ${seen.get(name)} would both be written as ${name}${outExt}.\n` +
        'Run them separately with different -o directories.');
    }
    seen.set(name, f);
  }
}

// What to call the result when the input came off a pipe and has no filename.
// Strip the expected extension, and otherwise strip whatever extension is
// there, so fmt.json does not become fmt.json.html.
function nameOf(file, ext) {
  if (file === '-') return 'stdin';
  const base = path.basename(file);
  return base.endsWith(ext) ? base.slice(0, -ext.length) : base.replace(/\.[^.]+$/, '');
}

// Progress lines go to stderr so that `-o -` stays pipeable.
const note = s => process.stderr.write(s + '\n');

module.exports = { parse, readJSON, readTable, write, fail, note, nameOf, checkCollisions, sharedOptions };
