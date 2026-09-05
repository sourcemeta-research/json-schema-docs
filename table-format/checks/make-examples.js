#!/usr/bin/env node
// Everything in examples/, produced by the tools rather than copied by hand.
//
// A repository about turning schemas into readable documents should contain the
// readable documents. Ours did not: the output was generated into build/, which
// is ignored, so the one thing worth looking at was the one thing missing.
//
// Two kinds of example, for two kinds of reader:
//
//   * hello.*   a thirty-line schema and all four things the tools make from it,
//               each small enough to read in full. This is for someone deciding
//               whether to implement the format.
//   * pages/    every schema in the corpus rendered, all twenty-three. This is
//     markdown/ for someone deciding whether it works on real input. The Markdown
//               is there because GitHub renders it in the browser, so the output
//               can be read without cloning anything.
'use strict';
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

const { build } = require('../scripts/schema-to-table.js');
const html = require('../scripts/table-to-html.js');
const md = require('../scripts/table-to-markdown.js');
const { rebuild, compare } = require('../scripts/table-to-schema.js');

const out = path.join(root, 'examples');
for (const d of ['', 'pages', 'markdown']) fs.mkdirSync(path.join(out, d), { recursive: true });

// ---- the worked example ---------------------------------------------------
const helloPath = path.join(out, 'hello.schema.json');
const hello = JSON.parse(fs.readFileSync(helloPath, 'utf8'));
{
  const doc = build(hello, { name: 'hello.schema', source: 'examples/hello.schema.json' });
  fs.writeFileSync(path.join(out, 'hello.schema.table.json'), JSON.stringify(doc, null, 1));
  fs.writeFileSync(path.join(out, 'hello.schema.html'), html.render(doc));
  fs.writeFileSync(path.join(out, 'hello.schema.md'), md.render(doc));
  const back = rebuild(doc);
  fs.writeFileSync(path.join(out, 'hello.schema.rebuilt.json'), JSON.stringify(back, null, 1));
  const r = compare(hello, back);
  console.log(`hello.schema        ${r.meaningKept.toFixed(1)}% of meaning kept over ${r.total} places`);
}

// ---- every schema in the corpus -------------------------------------------
const sources = [];
for (const d of ['samples/real', 'samples/stress', 'patterns/omc']) {
  const abs = path.join(root, d);
  if (!fs.existsSync(abs)) continue;
  for (const f of fs.readdirSync(abs)) if (f.endsWith('.json')) sources.push(path.join(d, f).replace(/\\/g, '/'));
}
sources.sort();

const rows = [];
for (const rel of sources) {
  const name = path.basename(rel, '.json');
  let schema;
  try { schema = JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8')); }
  catch { console.log(`${name}: unreadable, skipped`); continue; }
  try {
    const doc = build(schema, { name, source: rel });
    const page = html.render(doc);
    const markdown = md.render(doc);
    fs.writeFileSync(path.join(out, 'pages', name + '.html'), page);
    fs.writeFileSync(path.join(out, 'markdown', name + '.md'), markdown);
    rows.push({
      name,
      dialect: String(doc.dialect || 'none declared').replace(/https?:\/\//, '')
        .replace('json-schema.org/', '').replace('draft/', '').replace('/schema#', '').replace('/schema', ''),
      srcKB: Math.round(fs.statSync(path.join(root, rel)).size / 1024),
      shapes: doc.shapes.length,
      pageKB: Math.round(page.length / 1024),
      mdKB: Math.round(markdown.length / 1024)
    });
  } catch (e) { console.log(`${name}: FAILED, ${e.message}`); }
}

// ---- the index ------------------------------------------------------------
const L = [];
L.push('# What the tools actually produce', '');
L.push('Every file here was made by the tools in `scripts/`. Regenerate the lot with');
L.push('`npm run examples`.', '');

L.push('## Start with the small one', '');
L.push('`hello.schema.json` is thirty lines. Its four outputs are small enough to read');
L.push('side by side, which is the fastest way to understand the format.', '');
L.push('| File | What it is |', '|---|---|');
L.push('| [`hello.schema.json`](hello.schema.json) | the schema you start with |');
L.push('| [`hello.schema.table.json`](hello.schema.table.json) | **the format**, what the schema becomes |');
L.push('| [`hello.schema.html`](hello.schema.html) | the page a person reads |');
L.push('| [`hello.schema.md`](hello.schema.md) | the same thing as Markdown |');
L.push('| [`hello.schema.rebuilt.json`](hello.schema.rebuilt.json) | a working schema, rebuilt from the format alone |');
L.push('');
L.push('The schema says this about one field:', '');
L.push('```json');
L.push('"id": {');
L.push('  "type": "string",');
L.push('  "pattern": "^[a-z0-9-]+$",');
L.push('  "description": "How this order is referred to everywhere else."');
L.push('}');
L.push('```');
L.push('');
L.push('The Markdown says this:', '');
L.push('```');
L.push('| id | text; made of letters, numbers, dashes | yes, always |');
L.push('  How this order is referred to everywhere else. |');
L.push('```');
L.push('');
L.push('No pattern, no keyword names, no JSON. The page says the same thing with the');
L.push('length drawn as a bar and any shape name as a link.', '');

L.push(`## Every schema in the corpus, rendered`, '');
L.push(`All ${rows.length} of them. The Markdown is worth clicking first, because GitHub renders`);
L.push('it here in the browser; the HTML is the real output and needs downloading.', '');
L.push('| Schema | Dialect | Schema size | Shapes | Page | Markdown |');
L.push('|---|---|---|---|---|---|');
for (const r of rows) {
  L.push(`| \`${r.name}\` | ${r.dialect} | ${r.srcKB}KB | ${r.shapes} | [${r.pageKB}KB](pages/${r.name}.html) | [${r.mdKB}KB](markdown/${r.name}.md) |`);
}
L.push('');
L.push('Every page here has no scripting, and shows no JSON, no pointers and no regular');
L.push('expressions. That is checked on every build by `npm test`.', '');

L.push('## Why both HTML and Markdown', '');
L.push('The Markdown renderer exists to prove the format is not secretly a description');
L.push('of our HTML. It is written against the same half of the format, never touches');
L.push('the validating half, and produces the same facts in a medium with no colour, no');
L.push('nesting and no expanding rows. If the format were HTML-shaped, that second');
L.push('renderer could not have been written.', '');

fs.writeFileSync(path.join(out, 'README.md'), L.join('\n') + '\n');

const kb = a => a.reduce((x, y) => x + y, 0);
console.log(`${rows.length} schemas rendered`);
console.log(`  pages    ${kb(rows.map(r => r.pageKB))}KB`);
console.log(`  markdown ${kb(rows.map(r => r.mdKB))}KB`);
