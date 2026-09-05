#!/usr/bin/env node
// The whole pipeline over every real schema, in one command.
//
// This is the build our own numbers come from, so it deliberately runs the
// tools the same way anyone else would: same entry points, same defaults.
'use strict';
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

const { build } = require('../scripts/schema-to-table.js');
const html = require('../scripts/table-to-html.js');
const md = require('../scripts/table-to-markdown.js');
const { rebuild, compare } = require('../scripts/table-to-schema.js');

// The six real schemas, found rather than listed, so adding one to the folder
// is enough to get it built.
const sources = [
  ...fs.readdirSync(path.join(root, 'samples/real'))
    .filter(f => f.endsWith('.json'))
    .map(f => 'samples/real/' + f),
  'patterns/omc/omc-v2.6.json'
].filter(f => fs.existsSync(path.join(root, f)));

const dirs = ['build/format', 'build/pages', 'build/markdown', 'build/rebuilt'];
dirs.forEach(d => fs.mkdirSync(path.join(root, d), { recursive: true }));

console.log('schema'.padEnd(24) + 'shapes'.padStart(7) + 'rows'.padStart(7) +
  'page'.padStart(8) + 'dropped'.padStart(9) + 'kept'.padStart(8));

let worst = 100;
for (const rel of sources) {
  const name = path.basename(rel, '.json');
  const schema = JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
  const doc = build(schema, { name, source: rel });
  fs.writeFileSync(path.join(root, 'build/format', name + '.table.json'), JSON.stringify(doc, null, 1));

  const page = html.render(doc);
  fs.writeFileSync(path.join(root, 'build/pages', name + '.html'), page);
  fs.writeFileSync(path.join(root, 'build/markdown', name + '.md'), md.render(doc));

  const back = rebuild(doc);
  fs.writeFileSync(path.join(root, 'build/rebuilt', name + '.rebuilt.json'), JSON.stringify(back, null, 1));
  const r = compare(schema, back);
  worst = Math.min(worst, r.meaningKept);

  const rows = doc.shapes.reduce((n, s) => n + s.rows.length, 0) + doc.root.rows.length;
  console.log(name.padEnd(24) + String(doc.shapes.length).padStart(7) + String(rows).padStart(7) +
    (Math.round(page.length / 1024) + 'KB').padStart(8) + String(doc.dropped.length).padStart(9) +
    (r.meaningKept.toFixed(1) + '%').padStart(8));
}
console.log('\nlowest meaning kept: ' + worst.toFixed(1) + '%');
