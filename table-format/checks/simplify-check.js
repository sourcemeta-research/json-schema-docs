#!/usr/bin/env node
// Is the format as simple as it could be?
//
// The ablation answers a weaker question. It removes one field at a time and
// measures what breaks, which proves no single field is dead. It cannot tell
// you that two fields are saying one thing, because removing either one alone
// still loses something.
//
// This looks for that instead. Across every value object the converter emits,
// for every ordered pair of fields A and B, it asks: does knowing B always tell
// you A? If it does, everywhere, then A is not carrying its own information and
// a renderer could work it out rather than the format storing it.
//
// A found dependency is a candidate, not a verdict. `words` being determined by
// `kind` means the sentence could be computed from the kind, which is worth
// knowing; it does not decide whether computing it is better than storing it.
'use strict';
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

// Only the document half is under examination. `rules` is deliberately
// free-form schema residue and is not ours to simplify.
const RULES = new Set(['rules', 'containers']);
// These hold values written by the schema's author, so two of them being equal
// says something about the schema, not about the format.
const AUTHOR = new Set(['default', 'example', 'fixed', 'forbidden', 'const', 'enum']);

// Which kind of object we are standing in. Without this the analysis compares
// unlike things: a shape's `name` is a string, a row's `name` is an object, and
// a pick's `value` is an author's literal while a row's `value` is a whole
// description. Lumping them together produced findings like "value is derivable
// from deprecated", which is an artefact and not a fact about the format.
const ROLE_OF = {
  shapes: 'shape', rows: 'row', value: 'value', item: 'value', restItem: 'value',
  options: 'value', slots: 'value', picks: 'pick', name: 'name', needed: 'needed',
  brings: 'brings', range: 'range', root: 'document', dropped: 'dropped',
  thenRows: 'row', elseRows: 'row'
};

function collect(doc, byShape) {
  const seen = new Set();
  (function walk(node, inRules, role) {
    if (!node || typeof node !== 'object' || seen.has(node)) return;
    seen.add(node);
    if (Array.isArray(node)) return node.forEach(x => walk(x, inRules, role));
    if (!inRules) {
      // One observation per object: which fields it has and what they hold,
      // recorded under the role of the object it belongs to.
      const obs = {};
      let interesting = false;
      for (const [k, v] of Object.entries(node)) {
        if (RULES.has(k) || AUTHOR.has(k)) continue;
        obs[`${role}.${k}`] = (v && typeof v === 'object') ? '<structure>' : JSON.stringify(v);
        interesting = true;
      }
      if (interesting) byShape.push(obs);
    }
    for (const [k, v] of Object.entries(node)) {
      walk(v, inRules || RULES.has(k), ROLE_OF[k] || role);
    }
  })(doc, false, 'document');
}

const observations = [];
const dir = path.join(root, 'build/format');
for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.table.json'))) {
  collect(JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')), observations);
}
// The six real schemas do not use every keyword, so the minimal schemas from the
// keyword matrix are folded in too. Otherwise a pair could look dependent only
// because nothing here exercises the case that separates them.
try {
  const { CASES } = require('./keyword-matrix.js');
  const { build } = require('../scripts/schema-to-table.js');
  for (const c of CASES) {
    try { collect(build({ $schema: c.dialects[c.dialects.length - 1], ...c.schema },
      { name: 'case', source: null }), observations); } catch { /* the matrix reports its own crashes */ }
  }
} catch { /* matrix not available, six schemas only */ }

const allFields = [...new Set(observations.flatMap(o => Object.keys(o)))].sort();
const count = f => observations.filter(o => o[f] !== undefined).length;

// A field holding a nested object is recorded only as "<structure>", because
// its contents are compared elsewhere. That placeholder never varies, so any
// field at all appears to predict it, and the first run of this reported
// nonsense like "value is derivable from deprecated". Those fields are named
// and set aside rather than compared.
const structural = allFields.filter(f => {
  const vals = new Set(observations.filter(o => o[f] !== undefined).map(o => o[f]));
  return vals.size === 1 && vals.has('<structure>');
});
const fields = allFields.filter(f => !structural.includes(f));

// A field that only ever holds one value is telling nobody anything.
const constants = [];
for (const f of fields) {
  const vals = new Set(observations.filter(o => o[f] !== undefined).map(o => o[f]));
  if (vals.size === 1 && count(f) > 1) constants.push({ f, value: [...vals][0], n: count(f) });
}

// Does B determine A? Only counted where both are present, and only trusted
// when there is enough evidence that it is not an accident of a small sample.
const MIN_EVIDENCE = 8;
const constantNames = new Set(constants.map(c => c.f));
const dependencies = [];
for (const a of fields) {
  // A field that is only ever written when it is true carries its meaning by
  // being present at all. It is reported above as a constant, and every other
  // field trivially "predicts" it, so listing those pairs is noise.
  if (constantNames.has(a)) continue;
  for (const b of fields) {
    if (a === b || constantNames.has(b)) continue;
    const both = observations.filter(o => o[a] !== undefined && o[b] !== undefined);
    if (both.length < MIN_EVIDENCE) continue;
    const map = new Map();
    let broken = false;
    for (const o of both) {
      if (map.has(o[b]) && map.get(o[b]) !== o[a]) { broken = true; break; }
      map.set(o[b], o[a]);
    }
    // If B only ever takes one value, "B determines A" is vacuous. And if B is
    // close to unique, it is an identifier rather than a classifier: a shape's
    // id has 239 different values across 250 shapes, so of course it predicts
    // everything about the shape. That is a property of identifiers, not a
    // redundancy in the format.
    const CLASSIFIER = both.length / 3;
    if (!broken && map.size > 1 && map.size <= CLASSIFIER) {
      dependencies.push({ a, b, n: both.length, distinct: map.size });
    }
  }
}

const lines = [];
lines.push('# Is the format as simple as it could be', '');
lines.push(`Every value object the converter emits, from the six real schemas and from`);
lines.push(`the minimal schema behind each keyword in the coverage matrix.`);
lines.push(`${observations.length} observations over ${fields.length} document-half fields.`, '');
lines.push('The ablation already shows no single field is dead. This asks the harder');
lines.push('question: is any field simply a restatement of another one.', '');

lines.push('## Fields not compared', '');
lines.push('These hold a nested object rather than a value of their own. What is inside');
lines.push('them is judged by the same rules, one level down.', '');
lines.push(structural.length ? structural.map(f => `\`${f}\``).join(', ') : 'None.', '');

lines.push('## Fields that never vary', '');
if (!constants.length) lines.push('None. Every field takes more than one value somewhere.', '');
else {
  lines.push('| Field | Always | Seen |', '|---|---|---|');
  constants.forEach(c => lines.push(`| \`${c.f}\` | ${c.value} | ${c.n} |`));
  lines.push('');
}

lines.push('## Fields that another field always predicts', '');
lines.push(`Read "A from B" as: wherever both appear, B's value has always implied A's.`);
lines.push(`Only pairs seen together at least ${MIN_EVIDENCE} times, where B varies but is`);
lines.push(`not close to unique, and where A is not one of the present-means-true flags`);
lines.push(`listed above. Without those guards an identifier predicts everything and the`);
lines.push(`table fills with findings that are true and meaningless.`, '');
if (!dependencies.length) lines.push('None. No document-half field is predictable from another.', '');
else {
  lines.push('| Derivable | From | Seen together | Distinct values of the source |', '|---|---|---|---|');
  dependencies.sort((x, y) => y.n - x.n)
    .forEach(d => lines.push(`| \`${d.a}\` | \`${d.b}\` | ${d.n} | ${d.distinct} |`));
  lines.push('');
}

lines.push('## How to read this', '');
lines.push('A pair listed here is a candidate for merging, not proof that merging is');
lines.push('right. Storing something a renderer could compute is a real cost only if the');
lines.push('computation belongs to the renderer. Where the sentence is the point, as with');
lines.push('wording meant for a person, holding it in the format is what lets a second');
lines.push('renderer say the same thing without reinventing it.', '');
lines.push('What this cannot show is a field that should exist and does not. That is what');
lines.push('the keyword coverage matrix is for.', '');

if (require.main === module) {
  const out = path.join(root, 'reports/simplicity.md');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, lines.join('\n') + '\n');
  console.log(`${observations.length} observations, ${fields.length} value fields (${structural.length} structural, set aside)`);
  console.log(`constants: ${constants.length}`);
  console.log(`derivable pairs: ${dependencies.length}`);
  dependencies.sort((x, y) => y.n - x.n).slice(0, 12)
    .forEach(d => console.log(`  ${d.a.padEnd(18)} from ${d.b.padEnd(18)} (${d.n} together, ${d.distinct} distinct)`));
  console.log('wrote reports/simplicity.md');
}

module.exports = { observations, dependencies, constants };
