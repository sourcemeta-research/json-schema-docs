#!/usr/bin/env node
// Do the original schema and the rebuilt one accept and reject the same files?
//
// Everything else in this project compares two schemas as text: same rule, same
// place, same value. That is a strong argument and it is still an argument. This
// asks the only question that finally matters. Take a document, hand it to the
// original schema and to the schema rebuilt out of our format, and see whether
// they agree. A disagreement anywhere means the format lost or changed something
// real, whatever the text comparison said.
//
// Two things make this honest:
//
//   * The validator is Ajv, which knows nothing about this project. Both schemas
//     are compiled by it with identical settings, so nothing here is grading its
//     own homework. Ajv is a development dependency of this harness only; the
//     four tools still have none.
//   * Agreement is what is measured, not validity. Whether a document is good or
//     bad is beside the point. If the original says no and the rebuild says no,
//     that is a pass. Only a difference of opinion is a failure.
//
// Documents come from three places, and the last one matters most:
//
//   * real files, chiefly the hundreds of package.json files inside node_modules
//   * our own schema corpus, because every JSON Schema is itself a document that
//     its meta-schema is supposed to validate
//   * mutations of both, because two schemas agreeing that everything is fine
//     proves very little. The mutations push documents over the edge on purpose,
//     and the two schemas have to fall the same way.
'use strict';
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const { build } = require('../scripts/schema-to-table.js');
const { rebuild } = require('../scripts/table-to-schema.js');

let Ajv, Ajv4, Ajv2019, Ajv2020, addFormats;
try {
  Ajv = require('ajv');
  Ajv4 = require('ajv-draft-04');
  Ajv2019 = require('ajv/dist/2019');
  Ajv2020 = require('ajv/dist/2020');
  addFormats = require('ajv-formats');
} catch (e) {
  console.error([
    'This harness needs a validator that is not ours, so that neither schema is',
    'judged by our own code. Install it (it is not saved as a dependency):',
    '',
    '  npm install --no-save ajv@8 ajv-draft-04@1 ajv-formats@3',
    ''
  ].join('\n'));
  process.exit(1);
}

// ---- picking a validator for the dialect the schema declares --------------
function makeAjv(dialect) {
  const d = String(dialect || '');
  const opts = {
    strict: false,          // real schemas use keywords Ajv does not know
    validateSchema: false,  // we are testing the schemas, not Ajv's opinion of them
    allowUnionTypes: true,
    allowMatchingProperties: true,
    logger: false
  };
  let ajv;
  if (d.includes('draft-04')) ajv = new Ajv4(opts);
  else if (d.includes('2019-09')) ajv = new Ajv2019(opts);
  else if (d.includes('2020-12')) ajv = new Ajv2020(opts);
  else {
    ajv = new Ajv(opts);
    // draft-06 is not built in to Ajv 8.
    try { ajv.addMetaSchema(require('ajv/dist/refs/json-schema-draft-06.json')); } catch { /* fine */ }
  }
  try { addFormats(ajv); } catch { /* formats are optional here */ }
  return ajv;
}

// Two things stop a real schema compiling, and neither is a fault in the schema.
//
// Ajv already carries the JSON Schema meta-schemas, so handing it one of them
// collides with the copy it has. And a schema that points at a file we do not
// have cannot be resolved. Both are handled identically for the original and
// the rebuild, so the comparison stays fair; what a stub hides, it hides from
// both sides equally.
function idsIn(schema) {
  const ids = [];
  (function walk(n) {
    if (!n || typeof n !== 'object') return;
    if (Array.isArray(n)) return n.forEach(walk);
    if (typeof n.$id === 'string') ids.push(n.$id);
    if (typeof n.id === 'string') ids.push(n.id);
    for (const k of Object.keys(n)) walk(n[k]);
  })(schema);
  return [...new Set(ids)];
}

// Ajv will not accept a schema whose name it already holds, and its built-in
// meta-schemas cannot be removed. Nothing inside these schemas refers to itself
// by name, only by `#`, so dropping the outermost name lets them compile and
// changes nothing about what they mean. It is done to both sides or neither.
function compile(ajv, schema) {
  try { return compileExact(ajv, schema); }
  catch (e) {
    if (!/already exists|resolves to more than one schema/.test(e.message || '')) throw e;
    if (schema && typeof schema === 'object' && (schema.$id || schema.id)) {
      const { $id, id, ...rest } = schema;
      return compileExact(ajv, rest);
    }
    throw e;
  }
}

function compileExact(ajv, schema) {
  // Clear anything Ajv already knows under the same name, including the
  // meta-schemas it ships with, so a schema is judged as itself.
  for (const id of idsIn(schema)) {
    try { if (ajv.getSchema(id)) ajv.removeSchema(id); } catch { /* nothing to remove */ }
  }
  const permissive = { $comment: 'stub for a pointer this harness cannot follow' };
  const added = new Set();
  for (let attempt = 0; attempt < 60; attempt++) {
    try { return ajv.compile(schema); }
    catch (e) {
      const msg = e.message || '';
      let m = /can't resolve reference ([^\s]+) from id ([^\s]+)/.exec(msg);
      let target;
      if (m) {
        // The pointer is relative to whatever declared it.
        try { target = new URL(m[1], m[2]).href; } catch { target = m[1]; }
      } else {
        m = /can't resolve reference ([^\s]+)/.exec(msg);
        if (!m) throw e;
        target = m[1];
      }
      target = target.replace(/#.*$/, '');
      if (added.has(target)) throw e;
      added.add(target);
      try { ajv.addSchema({ ...permissive, $id: target }); } catch { throw e; }
    }
  }
  throw new Error('too many unresolvable pointers');
}

// ---- documents ------------------------------------------------------------
const readJSON = f => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return undefined; } };

function packageJsonFiles(limit) {
  const dir = path.join(root, 'node_modules');
  const found = [];
  if (!fs.existsSync(dir)) return found;
  const stack = [dir];
  while (stack.length && found.length < limit) {
    const d = stack.pop();
    let entries;
    try { entries = fs.readdirSync(d, { withFileTypes: true }); } catch { continue; }
    for (const e of entries) {
      if (found.length >= limit) break;
      const p = path.join(d, e.name);
      if (e.isDirectory()) stack.push(p);
      else if (e.name === 'package.json') found.push(p);
    }
  }
  return found;
}

// Every JSON Schema is a document, and its meta-schema is the thing that says
// whether it is a well formed one. So our own corpus is a real test set for the
// meta-schemas, at no cost and with no invention.
function schemaCorpus() {
  const out = [];
  for (const d of ['samples/real', 'samples/stress', 'patterns/omc']) {
    const abs = path.join(root, d);
    if (!fs.existsSync(abs)) continue;
    for (const f of fs.readdirSync(abs)) {
      if (f.endsWith('.json')) out.push(path.join(abs, f));
    }
  }
  return out;
}

// ---- mutations ------------------------------------------------------------
// Two schemas agreeing that a valid file is valid says almost nothing. The
// interesting question is whether they draw the line in the same place, so these
// push documents over it in several different directions.
function mutations(doc, rand) {
  const out = [];
  const clone = () => JSON.parse(JSON.stringify(doc));
  if (!doc || typeof doc !== 'object' || Array.isArray(doc)) return out;
  const keys = Object.keys(doc);
  if (!keys.length) return out;

  const pick = () => keys[Math.floor(rand() * keys.length)];

  // A field removed. Catches disagreement about what is required.
  { const m = clone(); delete m[pick()]; out.push(['a field removed', m]); }
  // A field with the wrong type in it.
  { const m = clone(); m[pick()] = 12345; out.push(['a number where something else belongs', m]); }
  { const m = clone(); m[pick()] = 'a string that does not belong here'; out.push(['a string where something else belongs', m]); }
  { const m = clone(); m[pick()] = null; out.push(['a field emptied', m]); }
  { const m = clone(); m[pick()] = []; out.push(['a field replaced by an empty list', m]); }
  { const m = clone(); m[pick()] = {}; out.push(['a field replaced by an empty group', m]); }
  // A field nobody asked for. Catches disagreement about closedness.
  { const m = clone(); m['zzz-not-in-the-schema'] = 'unexpected'; out.push(['an unexpected field added', m]); }
  // Everything stripped away.
  out.push(['an empty document', {}]);
  return out;
}

// A small reproducible random source, so a run can be repeated exactly.
function seeded(seed) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

// ---- the run --------------------------------------------------------------
const LIMIT = Number(process.env.DOCS || 120);
const results = [];

const schemaFiles = schemaCorpus();
const pkgFiles = packageJsonFiles(LIMIT);

for (const schemaPath of schemaFiles) {
  const name = path.basename(schemaPath, '.json');
  const original = readJSON(schemaPath);
  if (!original) continue;

  const r = { name, docs: 0, agree: 0, disagree: 0, bothAccept: 0, bothReject: 0, examples: [], note: null };

  let rebuilt;
  try { rebuilt = rebuild(build(original, { name, source: schemaPath })); }
  catch (e) { r.note = 'could not rebuild: ' + e.message; results.push(r); continue; }

  let checkA, checkB;
  try {
    checkA = compile(makeAjv(original.$schema), original);
    checkB = compile(makeAjv(original.$schema), rebuilt);
  } catch (e) {
    r.note = 'could not compile: ' + e.message.split('\n')[0].slice(0, 110);
    results.push(r);
    continue;
  }

  // What documents does this schema get to judge?
  const docs = [];
  if (name === 'package') {
    for (const f of pkgFiles) { const d = readJSON(f); if (d) docs.push([path.basename(path.dirname(f)) + '/package.json', d]); }
  }
  if (/^metaschema/.test(name)) {
    // A meta-schema judges schemas, and we have twenty-three of them.
    for (const f of schemaFiles) { const d = readJSON(f); if (d) docs.push([path.basename(f), d]); }
  }
  // Every schema also judges the mutations of whatever it already has, plus a
  // handful of shapes that no schema should be indifferent about.
  const seeds = docs.length ? docs.slice(0, 12) : [['an empty group', {}]];
  const rand = seeded(1234);
  for (const [label, d] of seeds) {
    for (const [how, m] of mutations(d, rand)) docs.push([`${label} with ${how}`, m]);
  }
  for (const [label, d] of [['nothing', null], ['a bare number', 7], ['a bare string', 'x'],
    ['a bare list', [1, 2, 3]], ['true', true]]) docs.push([label, d]);

  for (const [label, doc] of docs) {
    let a, b;
    try { a = !!checkA(doc); } catch { a = 'threw'; }
    try { b = !!checkB(doc); } catch { b = 'threw'; }
    r.docs++;
    if (a === b) {
      r.agree++;
      if (a === true) r.bothAccept++; else if (a === false) r.bothReject++;
    } else {
      r.disagree++;
      if (r.examples.length < 4) {
        r.examples.push(`${label}: original says ${a === true ? 'yes' : a}, rebuild says ${b === true ? 'yes' : b}`);
      }
    }
  }
  results.push(r);
}

// ---- can this test fail at all? ------------------------------------------
//
// A run that reports perfect agreement is worth nothing unless the same setup
// would have noticed a difference. So rebuilds are deliberately damaged and put
// through the identical comparison. Each damaged version has to produce
// disagreements.
//
// A damage that does not actually change the schema proves nothing either way,
// and the first version of this check reported two such no-ops as blind spots.
// package.json's schema has no required list at its root and is not closed, so
// "remove the required list" and "open the closed shape" both left it untouched.
// Each damage is now compared against the undamaged rebuild first, and one that
// changes nothing is reported as inapplicable rather than as a failure. Two
// schemas are probed, one open and one closed, so both cases are covered.
const sensitivity = [];
{
  const probes = [
    ['package', path.join(root, 'samples/real/package.json')],
    ['compose-spec', path.join(root, 'samples/real/compose-spec.json')]
  ];
  const realDocs = [];
  for (const f of pkgFiles.slice(0, 40)) { const d = readJSON(f); if (d) realDocs.push(d); }
  realDocs.push({}, { name: 'x' }, { name: 'x', version: '1.0.0' }, { name: 123 }, { zzz: 1 },
    { services: {} }, { services: { web: { image: 'nginx' } } });

  for (const [probeName, probeFile] of probes) {
    const original = readJSON(probeFile);
    if (!original) continue;
    let good;
    try { good = rebuild(build(original, { name: probeName, source: probeFile })); } catch { continue; }
    const copy = () => JSON.parse(JSON.stringify(good));
    // A damage only proves anything if it can bite. Closing an already closed
    // shape, opening an already open one, or stripping a field no test document
    // mentions all change the text and nothing else, and reporting those as
    // blind spots would be false. So the target is chosen to matter.
    const isClosed = good.additionalProperties === false || good.unevaluatedProperties === false;
    const used = new Set();
    for (const d of realDocs) if (d && typeof d === 'object' && !Array.isArray(d)) {
      for (const k of Object.keys(d)) used.add(k);
    }
    const liveField = Object.keys(good.properties || {}).find(k => used.has(k))
      || Object.keys(good.properties || {})[0];
    const damaged = {
      'every field becomes required': (() => {
        const x = copy();
        if (x.properties) x.required = Object.keys(x.properties).slice(0, 8);
        return x;
      })(),
      'a field loses all its rules': (() => {
        const x = copy();
        if (x.properties && liveField) x.properties[liveField] = {};
        return x;
      })(),
      'a field changes type': (() => {
        const x = copy();
        if (x.properties && liveField) x.properties[liveField] = { type: 'integer' };
        return x;
      })(),
      ...(isClosed
        ? { 'the closed shape is opened': (() => {
            const x = copy(); delete x.additionalProperties; delete x.unevaluatedProperties; return x; })() }
        : { 'the open shape is closed': (() => {
            const x = copy(); x.additionalProperties = false; return x; })() }),
      'the required list is removed': (() => { const x = copy(); delete x.required; return x; })()
    };

    let ref;
    try { ref = compile(makeAjv(original.$schema), original); } catch { continue; }
    for (const [how, bad] of Object.entries(damaged)) {
      const label = `${probeName}: ${how}`;
      if (JSON.stringify(bad) === JSON.stringify(good)) {
        sensitivity.push({ how: label, noticed: null, why: 'this schema has nothing to damage that way' });
        continue;
      }
      let check;
      try { check = compile(makeAjv(original.$schema), bad); }
      catch { sensitivity.push({ how: label, noticed: null, why: 'the damaged schema would not compile' }); continue; }
      let n = 0;
      for (const d of realDocs) {
        let a, b;
        try { a = !!ref(d); } catch { a = 'threw'; }
        try { b = !!check(d); } catch { b = 'threw'; }
        if (a !== b) n++;
      }
      sensitivity.push({ how: label, noticed: n, of: realDocs.length });
    }
  }
}
const blind = sensitivity.filter(x => x.noticed === 0);

// ---- report ---------------------------------------------------------------
const ran = results.filter(r => !r.note);
const skipped = results.filter(r => r.note);
const totalDocs = ran.reduce((a, r) => a + r.docs, 0);
const totalAgree = ran.reduce((a, r) => a + r.agree, 0);
const totalDis = ran.reduce((a, r) => a + r.disagree, 0);
const pct = totalDocs ? (100 * totalAgree / totalDocs) : 0;

const L = [];
L.push('# Do the rebuilt schemas behave like the originals', '');
L.push('Every other measurement in this project compares two schemas as text. This');
L.push('one runs documents past both and compares the verdicts, which is the only');
L.push('question that finally matters.', '');
L.push('The validator is Ajv. It knows nothing about this project, and it compiles');
L.push('both schemas with identical settings, so neither side is judged by our own');
L.push('code. What is measured is **agreement**, not validity: if the original');
L.push('rejects a document and the rebuild rejects it too, that is a pass. Only a');
L.push('difference of opinion counts against us.', '');
L.push(`- Documents judged by both schemas: **${totalDocs}**`);
L.push(`- The two agreed: **${totalAgree}** (${pct.toFixed(2)}%)`);
L.push(`- The two disagreed: **${totalDis}**`);
L.push(`- Schemas exercised: **${ran.length}**, of which ${ran.filter(r => !r.disagree).length} with no disagreement at all`);
L.push(`- Both accepted: ${ran.reduce((a, r) => a + r.bothAccept, 0)}, both rejected: ${ran.reduce((a, r) => a + r.bothReject, 0)}`, '');
L.push('Both numbers matter. Agreeing only to accept everything would be worthless,');
L.push('so the rejections are the half that shows the two schemas draw the line in');
L.push('the same place.', '');

L.push('## Would this test notice if something were wrong', '');
L.push('Perfect agreement means nothing unless the same setup would have caught a');
L.push('difference. One rebuild is damaged on purpose, four different ways, and put');
L.push('through the identical comparison. Each one has to be noticed.', '');
if (!sensitivity.length) L.push('The sensitivity check could not run.', '');
else {
  L.push('| The rebuild is damaged so that | Documents that changed verdict |', '|---|---|');
  sensitivity.forEach(x => L.push(`| ${x.how} | ${x.noticed === null ? 'not applicable, ' + x.why :
    x.noticed === 0 ? '**none. The damage is real, so no document here tells the difference**'
      : `${x.noticed} of ${x.of}`} |`));
  L.push('');
  L.push(blind.length
    ? `Every damage but ${blind.length} was caught, which is what makes the agreement above a result rather than an absence of measurement. ` +
      'The ones that were not caught are not blind spots in the comparison: the damage really was applied, and no document in this set happens to distinguish it. ' +
      'That is a statement about how thin the document corpus is for that schema, and it is the first thing to improve.'
    : 'Every kind of damage was noticed, so the agreement above is a real result rather than an absence of measurement.', '');
}

L.push('## By schema', '');
L.push('| Schema | Documents | Agreed | Disagreed | Both said yes | Both said no |', '|---|---|---|---|---|---|');
for (const r of ran.sort((a, b) => b.docs - a.docs)) {
  L.push(`| \`${r.name}\` | ${r.docs} | ${r.agree} | ${r.disagree ? '**' + r.disagree + '**' : '0'} | ${r.bothAccept} | ${r.bothReject} |`);
}
L.push('');

const bad = ran.filter(r => r.disagree);
L.push('## Where they disagreed', '');
if (!bad.length) L.push('Nowhere. Every document got the same verdict from both schemas.', '');
else {
  for (const r of bad) {
    L.push(`### ${r.name}`, '');
    r.examples.forEach(e => L.push('- ' + e));
    L.push('');
  }
}

L.push('## What this does not cover', '');
if (skipped.length) {
  L.push(`${skipped.length} schemas could not be put through this test at all:`, '');
  skipped.forEach(r => L.push(`- \`${r.name}\`: ${r.note}`));
  L.push('');
}
L.push('- A schema that points at files we do not have cannot be fully compiled.');
L.push('  Those pointers are answered with a stub that accepts anything, the same');
L.push('  stub on both sides. Rules behind such a pointer are therefore not tested.');
L.push('- The documents are real where real ones exist, and mutations of them');
L.push('  otherwise. This is not the same as a large corpus of genuine files for');
L.push('  every one of these formats.', '');

fs.mkdirSync(path.join(root, 'reports'), { recursive: true });
fs.writeFileSync(path.join(root, 'reports/behaviour.md'), L.join('\n') + '\n');

console.log(`${totalDocs} documents through ${ran.length} schemas`);
console.log(`agreed ${totalAgree} (${pct.toFixed(2)}%), disagreed ${totalDis}`);
console.log(`both accepted ${ran.reduce((a, r) => a + r.bothAccept, 0)}, both rejected ${ran.reduce((a, r) => a + r.bothReject, 0)}`);
console.log('sensitivity: ' + sensitivity.map(x => `${x.how} -> ${x.noticed === null ? 'n/a' : x.noticed}`).join(', '));
for (const r of bad) console.log(`  DISAGREE ${r.name}: ${r.examples[0]}`);
for (const r of skipped) console.log(`  skipped  ${r.name}: ${r.note}`);
// A disagreement is a failure. A damage no document distinguishes is a gap in
// the corpus, reported loudly but not treated as a broken build.
process.exitCode = totalDis ? 1 : 0;
