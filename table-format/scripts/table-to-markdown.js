#!/usr/bin/env node
// The table format into Markdown.
//
// This renderer exists to prove a point rather than to be beautiful. If the
// format were secretly a description of our HTML, a second renderer in a medium
// with no nesting, no colour and no dropdowns would be impossible to write
// without reaching back into the schema. It is written only against `doc`, the
// same half the HTML renderer uses, and it never touches `rules`.
'use strict';
const fs = require('fs');
const path = require('path');

const plain = v => v === true ? 'yes' : v === false ? 'no' : v === null ? 'nothing'
  : Array.isArray(v) ? v.map(plain).join(', ')
  : (v && typeof v === 'object') ? 'a group of details' : String(v);

const cell = s => String(s == null ? '' : s).replace(/\|/g, '\\|').replace(/\n+/g, ' ').trim();

function valueWords(v, byId) {
  if (!v) return '';
  const nameOf = ref => (byId.get(ref) || {}).name || String(ref).split('/').pop();
  const bits = [];
  switch (v.kind) {
    case 'ref': bits.push(nameOf(v.ref) + ((byId.get(v.ref) || {}).isList ? ', itself a list' : '')); break;
    case 'choice-of-refs': bits.push('either ' + (v.refs || []).map(nameOf).join(' or ')); break;
    case 'elsewhere': bits.push('rules kept in another file, ' + v.href); break;
    case 'list':
      bits.push('a list' + (v.item ? (v.item.kind === 'ref' ? ', each one ' + nameOf(v.item.ref)
        : v.item.kind === 'choice-of-refs' ? ', each entry either ' + (v.item.refs || []).map(nameOf).join(' or ')
        : v.item.words ? ', each one ' + v.item.words : '') : ''));
      break;
    case 'bool': bits.push('yes or no'); break;
    case 'fixed': bits.push('one of: ' + (v.fixed || []).map(plain).join(', ')); break;
    case 'choice': bits.push('one of ' + (v.options || []).length + ' forms: ' +
      (v.options || []).map(o => (o.description || o.words || 'a value') + (o.example !== undefined ? ` (${plain(o.example)})` : '')).join('; ')); break;
    default: if (v.words) bits.push(v.words);
  }
  if (v.alsoFollowsRef) bits.push('and follows ' + nameOf(v.alsoFollowsRef) + ' as well');
  if (v.range) bits.push(`from ${v.range.min == null ? 'any' : plain(v.range.min)} to ${v.range.max == null ? 'any' : plain(v.range.max)}${v.range.unit || ''}`);
  let ex = v.example;
  if (ex === undefined && v.kind === 'ref') ex = (byId.get(v.ref) || {}).example;
  if (v.patternWords) bits.push(ex !== undefined ? `written like "${plain(ex)}"` : v.patternWords);
  else if (ex !== undefined && v.kind !== 'fixed') bits.push(`for example ${plain(ex)}`);
  if (v.forbidden) bits.push('must not be ' + v.forbidden.map(plain).join(' or '));
  for (const set of v.exclusiveSets || []) bits.push('you cannot use ' + set.join(' and ') + ' together');
  if (v.howManyFields) {
    const { min, max } = v.howManyFields;
    bits.push(min != null && max != null ? `between ${min} and ${max} fields`
      : min != null ? `at least ${min} fields` : `at most ${max} fields`);
  }
  if (v.whoWrites === 'read') bits.push('you do not fill this in, it is sent back to you');
  if (v.whoWrites === 'write') bits.push('you fill this in, it is never sent back');
  if (v.holds) bits.push(`the text inside is ${v.holds.type || 'in a set format'}${v.holds.encoding ? `, written as ${v.holds.encoding}` : ''}`);
  if (v.closed) bits.push('nothing else may be added here');
  if (v.nullable) bits.push('the value itself may be empty');
  if (v.default !== undefined && v.kind !== 'fixed') bits.push(`left out means ${plain(v.default)}`);
  return bits.join('; ');
}

const needWords = n => !n ? 'no' : n.kind === 'always' ? 'yes, always'
  : n.kind === 'conditional' ? 'only in certain cases' : 'no';

// Markdown has no nesting, so what the page shows as a table inside a row is
// written here as a path. Nothing is lost, it just reads differently, which is
// the point being tested.
function rows(list, byId, out, prefix) {
  for (const r of list || []) {
    const name = prefix ? `${prefix}.${r.name.text}` : r.name.text;
    out.push(`| ${cell(name)}${r.borrowed ? ' *(borrowed)*' : ''} | ${cell(valueWords(r.value, byId))} | ${needWords(r.needed)} | ${cell(r.description)} |`);
    const v = r.value || {};
    if ((v.rows || []).length) rows(v.rows, byId, out, name);
    else if (v.item && (v.item.rows || []).length) rows(v.item.rows, byId, out, `${name}[]`);
    if ((v.thenRows || []).length) rows(v.thenRows, byId, out, `${name} then`);
    if ((v.elseRows || []).length) rows(v.elseRows, byId, out, `${name} otherwise`);
    if ((v.thenRequires || []).length) out.push(`| ${cell(name)} then | ${cell(v.thenRequires.join(' and '))} ${v.thenRequires.length > 1 ? 'become' : 'becomes'} required | yes | |`);
    if ((v.elseRequires || []).length) out.push(`| ${cell(name)} otherwise | ${cell(v.elseRequires.join(' and '))} ${v.elseRequires.length > 1 ? 'become' : 'becomes'} required | yes | |`);
    if (r.brings && (r.brings.rows || []).length) rows(r.brings.rows, byId, out, `${name} brings`);
  }
}

function render(doc) {
  const byId = new Map(doc.shapes.map(s => [s.id, s]));
  const out = [`# ${doc.title}`, ''];
  if (doc.description) out.push(doc.description, '');

  if (doc.root.picks && doc.root.picks.length) {
    out.push(`## Which kind of thing this is`, '',
      `The field \`${doc.root.picks[0].field}\` decides which shape applies:`, '',
      doc.root.picks.map(p => `\`${plain(p.value)}\``).join(', '), '');
  }

  if (doc.root.rows.length) {
    out.push('## What this file holds', '');
    for (const set of doc.root.exclusiveSets || []) {
      out.push(`You cannot use ${set.join(' and ')} together.`, '');
    }
    out.push('| Field | What goes in it | Needed? | What it means |', '|---|---|---|---|');
    rows(doc.root.rows, byId, out, '');
    out.push('');
  }

  out.push(`## All ${doc.shapes.length} shapes`, '',
    'Most used first, because everything else is built on them.', '',
    doc.shapes.map(s => `- **${s.name}**${s.usedBy ? ` (used ${s.usedBy})` : ''}`).join('\n'), '');

  for (const s of doc.shapes) {
    // Same as the page: when the document points at itself it is both the root
    // and a shape, and it has already been written out above as the root.
    if (s.id === '#' && doc.root.rows.length) continue;
    out.push(`### ${s.name}`, '');
    if (s.description) out.push(s.description, '');
    const notes = [s.isList ? 'This one is a list. The fields below describe a single entry.' : '',
      s.closed ? 'Nothing else may be added to it.' : ''].filter(Boolean);
    if (notes.length) out.push(notes.join(' '), '');
    if (s.rows.length) {
      out.push('| Field | What goes in it | Needed? | What it means |', '|---|---|---|---|');
      rows(s.rows, byId, out, '');
    } else {
      out.push(s.example !== undefined ? `A single value, for example ${plain(s.example)}.` : 'A single value.');
    }
    out.push('');
  }

  if ((doc.dropped || []).length) {
    out.push('## What this page does not show', '');
    [...new Set(doc.dropped.map(d => `${d.why} (${d.where})`))].forEach(d => out.push(`- ${d}`));
    out.push('');
  }
  return out.join('\n');
}

module.exports = { render };

if (require.main === module) {
  const cli = require('./cli.js');
  const opts = cli.parse(process.argv.slice(2), {
    usage: [
      'usage: table-to-markdown <name.table.json>... [-o <dir>|-]',
      '',
      'Renders the table format as Markdown. This exists to show the format is',
      'not a description of our HTML: the same doc half drives both renderers.',
    ].join('\n')
  });
  cli.checkCollisions(opts.inputs, '.table.json', '.md');
  for (const f of opts.inputs) {
    const doc = cli.readTable(f);
    const name = cli.nameOf(f, '.table.json');
    const md = render(doc);
    cli.write(opts, 'markdown', `${name}.md`, md);
    cli.note(`${name.padEnd(24)} ${String(Math.round(md.length / 1024)).padStart(5)}KB  ${String(md.split('\n').filter(l => l.startsWith('|')).length).padStart(5)} table lines`);
  }
}
