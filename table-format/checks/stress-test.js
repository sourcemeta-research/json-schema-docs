#!/usr/bin/env node
// The whole pipeline over every schema we can find, not just the six the
// reports are built on.
//
// The six in samples/real are the ones every number is quoted against, and they
// were chosen partly because they were tractable. This runs the same pipeline
// over a wider and deliberately more awkward pile, including four meta-schemas,
// two schemas whose entire root is a pointer to somewhere else, and several
// files large enough to be uncomfortable. A crash here is a real result.
'use strict';
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

const { build } = require('../scripts/schema-to-table.js');
const html = require('../scripts/table-to-html.js');
const md = require('../scripts/table-to-markdown.js');
const { rebuild, compare } = require('../scripts/table-to-schema.js');
const { check: validateFormat } = require('../scripts/validate-format.js');

const spec = JSON.parse(fs.readFileSync(path.join(root, 'patterns/table-format.schema.json'), 'utf8'));

const dirs = process.argv.slice(2).filter(a => !a.startsWith('-'));
const roots = dirs.length ? dirs : ['samples/real', 'samples/stress', 'patterns/omc'];
const files = [];
for (const d of roots) {
  const abs = path.join(root, d);
  if (!fs.existsSync(abs)) continue;
  for (const f of fs.readdirSync(abs)) {
    if (f.endsWith('.json') && !f.includes('.table.') && !f.includes('.rebuilt.')) {
      files.push(path.join(d, f).replace(/\\/g, '/'));
    }
  }
}
files.sort();

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

const shortDialect = d => String(d || 'none declared')
  .replace(/https?:\/\//, '').replace('json-schema.org/', '')
  .replace('draft/', '').replace('/schema#', '').replace('/schema', '');

const results = [];
for (const rel of files) {
  const name = path.basename(rel, '.json');
  const r = { name, rel, problems: [] };
  let schema;
  try {
    schema = JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
  } catch (e) { r.problems.push('unreadable: ' + e.message); results.push(r); continue; }

  r.srcKB = Math.round(fs.statSync(path.join(root, rel)).size / 1024);

  let doc, page, markdown, back;
  const t0 = Date.now();
  try { doc = build(schema, { name, source: rel }); }
  catch (e) { r.problems.push('CONVERT THREW: ' + e.message); results.push(r); continue; }
  try { page = html.render(doc); }
  catch (e) { r.problems.push('HTML THREW: ' + e.message); }
  try { markdown = md.render(doc); }
  catch (e) { r.problems.push('MARKDOWN THREW: ' + e.message); }
  try { back = rebuild(doc); }
  catch (e) { r.problems.push('REBUILD THREW: ' + e.message); }
  r.ms = Date.now() - t0;

  r.dialect = shortDialect(doc.dialect);
  r.shapes = doc.shapes.length;
  r.dropped = doc.dropped.length;
  r.pageKB = page ? Math.round(page.length / 1024) : null;

  if (back) {
    try {
      const c = compare(schema, back);
      r.kept = c.meaningKept;
      r.places = c.total;
      r.examples = c.examples.slice(0, 3);
    } catch (e) { r.problems.push('COMPARE THREW: ' + e.message); }
  }

  // The format has to describe itself, on a schema nobody tuned it for.
  try {
    const errs = validateFormat(doc, spec);
    if (errs.length) r.problems.push(`format invalid (${errs.length}): ${errs[0]}`);
  } catch (e) { r.problems.push('VALIDATE THREW: ' + e.message); }

  // The page promises, checked here too rather than only on the six.
  if (page) {
    const bad = scriptingIn(page);
    if (bad) r.problems.push('page contains scripting: ' + bad);
    const text = page.replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ');
    const ptr = localPointerIn(text);
    if (ptr) r.problems.push('page shows a pointer: ' + ptr);
    const ids = [...page.matchAll(/\sid="([^"]*)"/g)].map(m => m[1]);
    const dupes = [...new Set(ids.filter((x, i) => ids.indexOf(x) !== i))];
    if (dupes.length) r.problems.push('repeated id: ' + dupes.slice(0, 3).join(', '));
    const idSet = new Set(ids);
    const dead = [...new Set([...page.matchAll(/href="#([^"]*)"/g)].map(m => m[1]))]
      .filter(h => h && !idSet.has(h));
    if (dead.length) r.problems.push('link lands nowhere: ' + dead.slice(0, 3).join(', '));
    // A renderer must not read the rules half. Checked on every schema, not a sample.
    const stripped = JSON.parse(JSON.stringify(doc), function (k, v) { return k === 'rules' ? undefined : v; });
    try {
      if (html.render(stripped) !== page) r.problems.push('the page changed when rules were stripped');
      if (markdown && md.render(stripped) !== markdown) r.problems.push('the Markdown changed when rules were stripped');
    } catch (e) { r.problems.push('rules-stripped render threw: ' + e.message); }
  }
  results.push(r);
}

// ---------------------------------------------------------------- report
const bad = results.filter(r => r.problems.length);
const ok = results.filter(r => !r.problems.length);
const scored = results.filter(r => r.kept != null);
const avg = a => a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0;

const L = [];
L.push('# Stress test: every schema we could find', '');
L.push(`${results.length} schemas. The six in \`samples/real\` are the ones the reports quote.`);
L.push('The rest are here to break things: four meta-schemas including draft-04 and');
L.push('draft-06 which no sample schema exercises, two whose entire root is a pointer to');
L.push('another file, and several large enough to be uncomfortable.', '');
L.push(`- Put through the whole pipeline without a crash: **${results.filter(r => !r.problems.some(p => /THREW/.test(p))).length} of ${results.length}**`);
L.push(`- No problem of any kind: **${ok.length} of ${results.length}**`);
L.push(`- Average meaning kept on rebuild: **${avg(scored.map(r => r.kept)).toFixed(1)}%**`);
L.push(`- Lowest: **${scored.length ? Math.min(...scored.map(r => r.kept)).toFixed(1) : '-'}%**`, '');

L.push('## Every schema', '');
L.push('| Schema | Dialect | Size | Shapes | Page | Meaning kept | Dropped | Problems |');
L.push('|---|---|---|---|---|---|---|---|');
for (const r of results) {
  L.push(`| \`${r.name}\` | ${r.dialect || '-'} | ${r.srcKB}KB | ${r.shapes == null ? '-' : r.shapes} | ${
    r.pageKB == null ? '-' : r.pageKB + 'KB'} | ${r.kept == null ? '-' : r.kept.toFixed(1) + '%'} | ${
    r.dropped == null ? '-' : r.dropped} | ${r.problems.length ? '**' + r.problems.length + '**' : 'none'} |`);
}
L.push('');

if (bad.length) {
  L.push('## What went wrong', '');
  for (const r of bad) {
    L.push(`### ${r.name}`, '');
    r.problems.forEach(p => L.push('- ' + p));
    if (r.examples && r.examples.length) {
      L.push('', 'Largest differences on rebuild:', '');
      r.examples.forEach(e => L.push('- `' + e.slice(0, 140) + '`'));
    }
    L.push('');
  }
} else {
  L.push('## What went wrong', '', 'Nothing. Every schema converted, rendered, rebuilt and validated.', '');
}

const slow = results.filter(r => r.ms > 2000).sort((a, b) => b.ms - a.ms);
if (slow.length) {
  L.push('## Slow ones', '');
  slow.forEach(r => L.push(`- \`${r.name}\` (${r.srcKB}KB): ${(r.ms / 1000).toFixed(1)}s`));
  L.push('');
}

fs.mkdirSync(path.join(root, 'reports'), { recursive: true });
fs.writeFileSync(path.join(root, 'reports/stress-test.md'), L.join('\n') + '\n');

console.log(`${results.length} schemas, ${ok.length} clean, ${bad.length} with problems`);
console.log(`meaning kept: avg ${avg(scored.map(r => r.kept)).toFixed(1)}%, lowest ${
  scored.length ? Math.min(...scored.map(r => r.kept)).toFixed(1) : '-'}%`);
for (const r of bad) console.log(`  ${r.name}: ${r.problems.join(' | ').slice(0, 150)}`);
process.exitCode = bad.length ? 1 : 0;
