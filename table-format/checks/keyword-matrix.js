#!/usr/bin/env node
// Every keyword, one at a time, through the whole pipeline.
//
// "Can we find a schema that is impossible to convert" is not a question to
// answer by hunting for hard schemas, because not finding one proves nothing.
// It is answerable by construction: take every keyword in every dialect, put
// each one in the smallest schema that exercises it, and see what survives.
//
// Each keyword gets three verdicts:
//   rebuild  does a validator built from the format still enforce it
//   page     does a reader actually get told about it
//   dropped  did the converter record that it had no honest reading
//
// A keyword can pass one and fail another, and those are different problems.
// Enforced but never shown means a reader will trip over a rule nobody told
// them about. Shown but not enforced means the format is not canonical.
'use strict';
const path = require('path');
const { build } = require('../scripts/schema-to-table.js');
const { rebuild, compare } = require('../scripts/table-to-schema.js');
const html = require('../scripts/table-to-html.js');

const D3 = 'http://json-schema.org/draft-03/schema#';
const D4 = 'http://json-schema.org/draft-04/schema#';
const D6 = 'http://json-schema.org/draft-06/schema#';
const D7 = 'http://json-schema.org/draft-07/schema#';
const D19 = 'https://json-schema.org/draft/2019-09/schema';
const D20 = 'https://json-schema.org/draft/2020-12/schema';

// A case is a keyword, the dialects it belongs to, the smallest schema that
// uses it for real, and what a reader should end up being told. The `shows`
// string is checked against the rendered page, so "did the reader learn this"
// is a test rather than an opinion.
const CASES = [
  // ---- the basics ---------------------------------------------------------
  { kw: 'type (string)', dialects: [D3, D4, D6, D7, D19, D20],
    schema: { type: 'object', properties: { a: { type: 'string' } } }, shows: 'text' },
  { kw: 'type (list of types)', dialects: [D3, D4, D6, D7, D19, D20],
    schema: { type: 'object', properties: { a: { type: ['string', 'null'] } } }, shows: 'empty' },
  { kw: 'properties', dialects: [D3, D4, D6, D7, D19, D20],
    schema: { type: 'object', properties: { a: { type: 'string' } } }, shows: 'a' },
  { kw: 'title', dialects: [D3, D4, D6, D7, D19, D20],
    schema: { title: 'A Thing', type: 'object', properties: { a: { type: 'string' } } }, shows: 'A Thing' },
  { kw: 'description', dialects: [D3, D4, D6, D7, D19, D20],
    schema: { type: 'object', properties: { a: { type: 'string', description: 'what a is' } } }, shows: 'what a is' },
  { kw: 'default', dialects: [D3, D4, D6, D7, D19, D20],
    schema: { type: 'object', properties: { a: { type: 'string', default: 'x' } } }, shows: 'left out' },
  { kw: 'enum', dialects: [D3, D4, D6, D7, D19, D20],
    schema: { type: 'object', properties: { a: { enum: ['red', 'blue'] } } }, shows: 'red' },
  { kw: 'format', dialects: [D3, D4, D6, D7, D19, D20],
    schema: { type: 'object', properties: { a: { type: 'string', format: 'email' } } }, shows: 'email address' },

  // ---- required, which changed shape between dialects ---------------------
  { kw: 'required (array)', dialects: [D4, D6, D7, D19, D20],
    schema: { type: 'object', properties: { a: { type: 'string' } }, required: ['a'] }, shows: 'Yes, always' },
  { kw: 'required (draft 3 boolean)', dialects: [D3],
    schema: { type: 'object', properties: { a: { type: 'string', required: true } } }, shows: 'Yes, always' },

  // ---- numbers ------------------------------------------------------------
  { kw: 'minimum / maximum', dialects: [D3, D4, D6, D7, D19, D20],
    schema: { type: 'object', properties: { a: { type: 'integer', minimum: 1, maximum: 10 } } }, shows: '10' },
  { kw: 'exclusiveMinimum (number)', dialects: [D6, D7, D19, D20],
    schema: { type: 'object', properties: { a: { type: 'number', exclusiveMinimum: 0 } } }, shows: 'number' },
  { kw: 'exclusiveMinimum (draft 4 boolean)', dialects: [D4],
    schema: { type: 'object', properties: { a: { type: 'number', minimum: 0, exclusiveMinimum: true } } }, shows: 'number' },
  { kw: 'multipleOf', dialects: [D4, D6, D7, D19, D20],
    schema: { type: 'object', properties: { a: { type: 'number', multipleOf: 5 } } }, shows: 'number' },
  { kw: 'divisibleBy (draft 3)', dialects: [D3],
    schema: { type: 'object', properties: { a: { type: 'number', divisibleBy: 5 } } }, shows: 'number' },

  // ---- strings ------------------------------------------------------------
  { kw: 'minLength / maxLength', dialects: [D3, D4, D6, D7, D19, D20],
    schema: { type: 'object', properties: { a: { type: 'string', minLength: 1, maxLength: 8 } } }, shows: '8' },
  { kw: 'pattern', dialects: [D3, D4, D6, D7, D19, D20],
    schema: { type: 'object', properties: { a: { type: 'string', pattern: '^[a-z0-9-]+$' } } }, shows: 'letters' },

  // ---- lists --------------------------------------------------------------
  { kw: 'items (single schema)', dialects: [D3, D4, D6, D7, D19, D20],
    schema: { type: 'object', properties: { a: { type: 'array', items: { type: 'string' } } } }, shows: 'list' },
  { kw: 'items (tuple form)', dialects: [D3, D4, D6, D7, D19],
    schema: { type: 'object', properties: { a: { type: 'array', items: [{ type: 'string' }, { type: 'integer' }] } } }, shows: 'list' },
  { kw: 'prefixItems', dialects: [D20],
    schema: { type: 'object', properties: { a: { type: 'array', prefixItems: [{ type: 'string' }], items: { type: 'integer' } } } }, shows: 'list' },
  { kw: 'additionalItems', dialects: [D3, D4, D6, D7, D19],
    schema: { type: 'object', properties: { a: { type: 'array', items: [{ type: 'string' }], additionalItems: false } } }, shows: 'list' },
  { kw: 'minItems / maxItems', dialects: [D3, D4, D6, D7, D19, D20],
    schema: { type: 'object', properties: { a: { type: 'array', items: { type: 'string' }, minItems: 1, maxItems: 3 } } }, shows: '3' },
  { kw: 'uniqueItems', dialects: [D3, D4, D6, D7, D19, D20],
    schema: { type: 'object', properties: { a: { type: 'array', items: { type: 'string' }, uniqueItems: true } } }, shows: 'no two' },
  { kw: 'contains', dialects: [D6, D7, D19, D20],
    schema: { type: 'object', properties: { a: { type: 'array', contains: { type: 'string' } } } }, shows: 'list' },
  { kw: 'minContains / maxContains', dialects: [D19, D20],
    schema: { type: 'object', properties: { a: { type: 'array', contains: { type: 'string' }, minContains: 2 } } }, shows: 'list' },

  // ---- objects ------------------------------------------------------------
  { kw: 'additionalProperties: false', dialects: [D3, D4, D6, D7, D19, D20],
    schema: { type: 'object', properties: { a: { type: 'string' } }, additionalProperties: false }, shows: 'Nothing else', keys: ['additionalProperties'] },
  { kw: 'additionalProperties: schema', dialects: [D3, D4, D6, D7, D19, D20],
    schema: { type: 'object', additionalProperties: { type: 'string' } }, shows: 'you choose', keys: ['additionalProperties'] },
  { kw: 'patternProperties', dialects: [D3, D4, D6, D7, D19, D20],
    schema: { type: 'object', patternProperties: { '^x-': { type: 'string' } } }, shows: 'set format' },
  { kw: 'propertyNames', dialects: [D6, D7, D19, D20],
    schema: { type: 'object', propertyNames: { pattern: '^[a-z]+$' }, properties: { a: { type: 'string' } } }, shows: 'no honest short way' },
  { kw: 'minProperties / maxProperties', dialects: [D4, D6, D7, D19, D20],
    schema: { type: 'object', properties: { a: { type: 'string' } }, minProperties: 1 }, shows: 'at least 1 field' },
  { kw: 'unevaluatedProperties', dialects: [D19, D20],
    schema: { type: 'object', properties: { a: { type: 'string' } }, unevaluatedProperties: false }, shows: 'Nothing else' },

  // ---- combining ----------------------------------------------------------
  { kw: 'allOf', dialects: [D4, D6, D7, D19, D20],
    schema: { $defs: { Widget: { type: 'object', properties: { spin: { type: 'string' } } } },
      type: 'object', allOf: [{ $ref: '#/$defs/Widget' }], properties: { a: { type: 'string' } } }, shows: 'every Widget carries' },
  { kw: 'anyOf', dialects: [D4, D6, D7, D19, D20],
    schema: { $defs: { Widget: { type: 'object', properties: { spin: { type: 'string' } } },
      Gadget: { type: 'object', properties: { whirr: { type: 'string' } } } },
      type: 'object', properties: { a: { anyOf: [{ $ref: '#/$defs/Widget' }, { $ref: '#/$defs/Gadget' }] } } }, shows: 'either' },
  { kw: 'oneOf', dialects: [D4, D6, D7, D19, D20],
    schema: { $defs: { Widget: { type: 'object', properties: { spin: { type: 'string' } } },
      Gadget: { type: 'object', properties: { whirr: { type: 'string' } } } },
      type: 'object', properties: { a: { oneOf: [{ $ref: '#/$defs/Widget' }, { $ref: '#/$defs/Gadget' }] } } }, shows: 'either' },
  { kw: 'not (as exclusion)', dialects: [D4, D6, D7, D19, D20],
    schema: { type: 'object', properties: { a: { type: 'string' }, spin: { type: 'string' } },
      not: { required: ['a', 'b'] } }, shows: 'cannot use' },
  { kw: 'not (whole shape)', dialects: [D4, D6, D7, D19, D20],
    schema: { type: 'object', properties: { a: { not: { type: 'string' } } } }, shows: 'no honest short way' },
  { kw: 'extends (draft 3)', dialects: [D3],
    schema: { definitions: { Widget: { type: 'object', properties: { spin: { type: 'string' } } } },
      type: 'object', extends: { $ref: '#/definitions/Widget' }, properties: { a: { type: 'string' } } }, shows: 'every Widget carries' },
  { kw: 'disallow (draft 3)', dialects: [D3],
    schema: { type: 'object', properties: { a: { disallow: 'string' } } }, shows: 'no honest short way' },

  // ---- conditionals -------------------------------------------------------
  { kw: 'if / then / else', dialects: [D7, D19, D20],
    schema: { type: 'object', properties: { kind: { type: 'string' }, n: { type: 'integer' } },
      if: { properties: { kind: { const: 'x' } }, required: ['kind'] },
      then: { required: ['n'] } }, shows: 'kind' },
  { kw: 'dependencies (draft 4 to 7)', dialects: [D4, D6, D7],
    schema: { type: 'object', properties: { card: { type: 'string' }, cvv: { type: 'string' } },
      dependencies: { card: ['cvv'] } }, shows: 'cvv' },
  { kw: 'dependentRequired', dialects: [D19, D20],
    schema: { type: 'object', properties: { card: { type: 'string' }, cvv: { type: 'string' } },
      dependentRequired: { card: ['cvv'] } }, shows: 'cvv' },
  { kw: 'dependentSchemas', dialects: [D19, D20],
    schema: { type: 'object', properties: { card: { type: 'string' } },
      dependentSchemas: { card: { properties: { cvv: { type: 'string' } }, required: ['cvv'] } } }, shows: 'cvv' },

  // ---- pointers and identity ----------------------------------------------
  { kw: '$ref (local)', dialects: [D4, D6, D7, D19, D20],
    schema: { $defs: { Widget: { type: 'object', properties: { spin: { type: 'string' } } } },
      type: 'object', properties: { a: { $ref: '#/$defs/Widget' } } }, shows: 'Widget' },
  { kw: '$ref (external URL)', dialects: [D4, D6, D7, D19, D20],
    schema: { type: 'object', properties: { a: { $ref: 'https://example.com/other.json' } } },
    shows: 'example.com' },
  { kw: '$ref (to the whole document)', dialects: [D4, D6, D7, D19, D20],
    schema: { title: 'Node', type: 'object', properties: { child: { $ref: '#' } } }, shows: 'Node' },
  { kw: '$ref beside other keywords', dialects: [D19, D20],
    schema: { $defs: { Widget: { type: 'object', properties: { spin: { type: 'string' } } } },
      type: 'object', properties: { a: { $ref: '#/$defs/Widget', description: 'an a' } } }, shows: 'an a', keys: ['$ref'] },
  { kw: 'definitions drawer', dialects: [D3, D4, D6, D7],
    schema: { definitions: { Widget: { type: 'object', properties: { spin: { type: 'string' } } } },
      type: 'object', properties: { a: { $ref: '#/definitions/Widget' } } }, shows: 'Widget', keys: ['definitions'] },
  { kw: '$defs drawer', dialects: [D19, D20],
    schema: { $defs: { Widget: { type: 'object', properties: { spin: { type: 'string' } } } },
      type: 'object', properties: { a: { $ref: '#/$defs/Widget' } } }, shows: 'Widget', keys: ['$defs'] },
  { kw: '$anchor', dialects: [D19, D20],
    schema: { $defs: { Widget: { $anchor: 'bee', type: 'object', properties: { spin: { type: 'string' } } } },
      type: 'object', properties: { a: { $ref: '#/$defs/Widget' } } }, shows: 'Widget' },
  { kw: '$dynamicRef / $dynamicAnchor', dialects: [D20],
    schema: { $defs: { Widget: { $dynamicAnchor: 'node', type: 'object', properties: { spin: { type: 'string' } } } },
      type: 'object', properties: { a: { $dynamicRef: '#node' } } }, shows: 'anything' },
  { kw: '$recursiveRef / $recursiveAnchor', dialects: [D19],
    schema: { $recursiveAnchor: true, title: 'Node', type: 'object',
      properties: { child: { $recursiveRef: '#' } } }, shows: 'child' },

  // ---- annotations --------------------------------------------------------
  { kw: 'const', dialects: [D6, D7, D19, D20],
    schema: { type: 'object', properties: { v: { const: 2 } } }, shows: '2' },
  { kw: 'examples', dialects: [D6, D7, D19, D20],
    schema: { type: 'object', properties: { a: { type: 'string', examples: ['hello'] } } }, shows: 'hello' },
  { kw: 'readOnly / writeOnly', dialects: [D7, D19, D20],
    schema: { type: 'object', properties: { a: { type: 'string', readOnly: true } } }, shows: 'sent back to you' },
  { kw: 'deprecated', dialects: [D19, D20],
    schema: { type: 'object', properties: { a: { type: 'string', deprecated: true } } }, shows: 'a' },
  { kw: '$comment', dialects: [D7, D19, D20],
    schema: { $comment: 'internal', type: 'object', properties: { a: { type: 'string' } } }, shows: null, mustNotShow: 'internal',
    note: 'a note between schema authors, deliberately not shown to a reader' },
  { kw: 'contentMediaType / contentEncoding', dialects: [D7, D19, D20],
    schema: { type: 'object', properties: { a: { type: 'string', contentMediaType: 'text/html' } } }, shows: 'text/html' },

  // ---- boolean schemas, which are legal and easy to forget ----------------
  { kw: 'true as a schema', dialects: [D6, D7, D19, D20],
    schema: { type: 'object', properties: { a: true } }, shows: 'anything',
    bare: { type: 'object', properties: { a: { type: 'string' } } } },
  { kw: 'false as a schema', dialects: [D6, D7, D19, D20],
    schema: { type: 'object', properties: { a: false } }, shows: 'nothing is allowed',
    bare: { type: 'object', properties: { a: { type: 'string' } } } },
  { kw: 'empty schema {}', dialects: [D3, D4, D6, D7, D19, D20],
    schema: { type: 'object', properties: { a: {} } }, shows: 'anything',
    bare: { type: 'object', properties: { a: { type: 'string' } } } },
  // ---- keywords a review found missing from this list entirely -------------
  // Every one of these is legal in a dialect above and had no case at all, so
  // the matrix was claiming coverage it did not have.
  { kw: '$id', dialects: [D6, D7, D19, D20],
    schema: { $id: 'https://example.com/thing.json', type: 'object', properties: { a: { type: 'string' } } },
    shows: null, mustNotShow: 'example.com/thing.json', keys: ['$id'],
    note: 'the name a schema is fetched by, not something a reader acts on' },
  { kw: 'id (draft 3 and 4)', dialects: [D3, D4],
    schema: { id: 'https://example.com/thing.json', type: 'object', properties: { a: { type: 'string' } } },
    shows: null, mustNotShow: 'example.com/thing.json', keys: ['id'],
    note: 'the same, in the older spelling' },
  { kw: '$schema', dialects: [D4, D6, D7, D19, D20],
    schema: { type: 'object', properties: { a: { type: 'string' } } },
    shows: null, mustNotShow: 'json-schema.org', keys: ['$schema'],
    noAblation: 'every case declares a dialect, so there is no version of this one without it',
    note: 'which dialect a schema is written in, carried through the rebuild' },
  { kw: '$vocabulary', dialects: [D19, D20],
    schema: { $vocabulary: { 'https://json-schema.org/draft/2020-12/vocab/core': true },
      type: 'object', properties: { a: { type: 'string' } } },
    shows: null, mustNotShow: 'vocab/core', keys: ['$vocabulary'],
    note: 'tells a validator which keywords apply, and means nothing to a reader' },
  { kw: 'exclusiveMaximum (number)', dialects: [D6, D7, D19, D20],
    schema: { type: 'object', properties: { a: { type: 'number', exclusiveMaximum: 100 } } }, shows: 'a number' },
  { kw: 'exclusiveMaximum (draft 4 boolean)', dialects: [D4],
    schema: { type: 'object', properties: { a: { type: 'number', maximum: 100, exclusiveMaximum: true } } },
    shows: 'a number', keys: ['exclusiveMaximum'] },
  { kw: 'maxContains', dialects: [D19, D20],
    schema: { type: 'object', properties: { a: { type: 'array', contains: { type: 'string' }, maxContains: 3 } } },
    shows: 'a list', keys: ['maxContains'] },
  { kw: 'unevaluatedItems', dialects: [D19, D20],
    schema: { type: 'object', properties: { a: { type: 'array', prefixItems: [{ type: 'string' }], unevaluatedItems: false } } },
    shows: 'a list', keys: ['unevaluatedItems'] },
  { kw: 'contentSchema', dialects: [D19, D20],
    schema: { type: 'object', properties: { a: { type: 'string', contentMediaType: 'application/json',
      contentSchema: { type: 'object' } } } }, shows: 'application/json', keys: ['contentSchema'] },
  { kw: 'contentEncoding', dialects: [D7, D19, D20],
    schema: { type: 'object', properties: { a: { type: 'string', contentEncoding: 'base64' } } },
    shows: 'base64', keys: ['contentEncoding'] },
  { kw: 'writeOnly', dialects: [D7, D19, D20],
    schema: { type: 'object', properties: { a: { type: 'string', writeOnly: true } } },
    shows: 'never sent back', keys: ['writeOnly'] },
  { kw: 'else branch', dialects: [D7, D19, D20],
    schema: { type: 'object', properties: { kind: { type: 'string' }, n: { type: 'integer' }, m: { type: 'integer' } },
      if: { properties: { kind: { const: 'x' } }, required: ['kind'] },
      then: { required: ['n'] }, else: { required: ['m'] } }, shows: 'otherwise', keys: ['else'] },
  { kw: 'dependencies (schema form)', dialects: [D4, D6, D7],
    schema: { type: 'object', properties: { card: { type: 'string' } },
      dependencies: { card: { properties: { cvv: { type: 'string' } }, required: ['cvv'] } } },
    shows: 'cvv', keys: ['dependencies'] },
  { kw: 'dependencies (draft 3)', dialects: [D3],
    schema: { type: 'object', properties: { card: { type: 'string' }, cvv: { type: 'string' } },
      dependencies: { card: 'cvv' } }, shows: 'cvv', keys: ['dependencies'] }

];

// Does the rebuilt schema still say what the original said? For a schema this
// small, compare() is exact, so anything short of every place matching is a
// real difference rather than noise.
function run(c) {
  const schema = { $schema: c.dialects[c.dialects.length - 1], ...c.schema };
  let doc, back, page;
  try {
    doc = build(schema, { name: 'case', source: null });
  } catch (e) { return { verdict: 'CRASH', detail: 'converting: ' + e.message }; }
  try {
    back = rebuild(doc);
  } catch (e) { return { verdict: 'CRASH', detail: 'rebuilding: ' + e.message }; }
  try {
    page = html.render(doc);
  } catch (e) { return { verdict: 'CRASH', detail: 'rendering: ' + e.message }; }

  const r = compare(schema, back);
  // The stylesheet is part of the page but is not something a reader reads.
  // Leaving it in meant searching for "3" or "10" matched a CSS rule, so the
  // "did the reader learn this" column was answering about the wrong text.
  const text = page.replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ');
  return {
    page: text,
    back: back,
    verdict: r.meaningDiff === 0 ? 'kept' : 'lost',
    rebuild: r.meaningKept,
    moved: r.layoutDiff,
    // `shows: null` means the reader is deliberately not told, and the page is
    // checked for the ABSENCE of the value. A comment between schema authors,
    // or the identifier a schema is fetched by, is not documentation: putting
    // it in front of a reader would be a bug rather than a feature.
    onPage: c.shows === null
      ? !text.toLowerCase().includes(String(c.mustNotShow).toLowerCase())
      : text.toLowerCase().includes(String(c.shows).toLowerCase()),
    dropped: doc.dropped.length,
    droppedWhy: doc.dropped.map(d => d.why)[0] || '',
    detail: (r.examples || []).slice(0, 2).join('; ')
  };
}

// Which keywords a case is actually about. Taken from the label, so the label
// cannot quietly claim more than the schema tests.
const keysOf = c => c.keys || c.kw.replace(/\s*\(.*/, '').split(' / ').map(x => x.trim());

const strip = (node, keys) => {
  if (!node || typeof node !== 'object') return node;
  if (Array.isArray(node)) return node.map(x => strip(x, keys));
  const out = {};
  for (const [k, v] of Object.entries(node)) {
    if (keys.includes(k)) continue;
    out[k] = strip(v, keys);
  }
  return out;
};

// Does this case actually depend on its keyword?
//
// A case that passes just as well with the keyword deleted is testing nothing.
// Before this gate existed, half of these cases were in that state: the schema
// around the keyword was carrying the whole result. This runs each case again
// with the keyword removed and demands that something change.
function provesIt(c) {
  if (c.noAblation) return { proven: false, why: c.noAblation };
  const keys = keysOf(c);
  // Some cases are not about a keyword at all: a schema that IS `true` has no
  // key to delete. Those name the schema to compare against by hand.
  const bare = c.bare || strip(c.schema, keys);
  if (JSON.stringify(bare) === JSON.stringify(c.schema)) {
    return { proven: false, why: `the schema does not contain ${keys.join(' or ')}` };
  }
  const full = run(c);
  const without = run({ ...c, schema: bare });
  if (full.page !== without.page) return { proven: true, why: 'the page changes' };
  if (JSON.stringify(full.back) !== JSON.stringify(without.back)) {
    return { proven: true, why: 'the rebuilt schema changes' };
  }
  return { proven: false, why: 'removing it changes neither the page nor the rebuild' };
}

const short = d => d.replace(/https?:\/\//, '').replace('json-schema.org/', '')
  .replace('draft/', '').replace('/schema#', '').replace('/schema', '')
  .replace('draft-0', 'draft ');

const results = CASES.map(c => ({ c, r: run(c), p: provesIt(c) }));

if (require.main === module) {
  const args = process.argv.slice(2);
  const rows = [];
  rows.push('| Keyword | Dialects | Rebuild | On the page | Test depends on it | Dropped |');
  rows.push('|---|---|---|---|---|---|');
  for (const { c, r, p } of results) {
    const rb = r.verdict === 'CRASH' ? '**CRASH**'
      : r.verdict === 'kept' ? 'kept' : `**lost** (${r.rebuild.toFixed(0)}%)`;
    rows.push(`| \`${c.kw}\` | ${c.dialects.map(short).join(', ')} | ${rb} | ${
      r.onPage ? (c.shows === null ? 'not shown, on purpose' : 'yes') : '**no**'} | ${
      p.proven ? 'yes' : 'n/a, ' + p.why} | ${
      r.dropped ? r.droppedWhy : '-'} |`);
  }
  const kept = results.filter(x => x.r.verdict === 'kept').length;
  const shown = results.filter(x => x.r.onPage).length;
  const crashed = results.filter(x => x.r.verdict === 'CRASH');
  const proven = results.filter(x => x.p.proven).length;

  const summary = [
    '', `**${results.length} keywords tested across six dialects.**`, '',
    `- Rebuilt without losing meaning: ${kept} of ${results.length}`,
    `- Reached the reader on the page: ${shown} of ${results.length}` +
      ` (${results.filter(x => x.c.shows === null).length} of those are machine identifiers,` +
      ` checked for being absent rather than present)`,
    `- Crashed the pipeline: ${crashed.length}`,
    `- Cases that actually depend on their keyword: ${proven} of ${results.length}`, ''
  ];

  if (args.includes('--md')) {
    console.log('# Keyword coverage', '');
    console.log(summary.join('\n'));
    console.log(rows.join('\n'));
  } else {
    for (const { c, r, p } of results) {
      const flag = r.verdict === 'CRASH' ? 'CRASH' : r.verdict === 'lost' ? 'LOST ' : r.onPage ? '  ok ' : 'UNSEEN';
      console.log(`${flag}  ${c.kw.padEnd(38)} ${r.verdict === 'CRASH' ? r.detail : (r.rebuild || 0).toFixed(0) + '%'}${
        p.proven ? '' : '   VACUOUS: ' + p.why}`);
    }
    console.log(summary.join('\n'));
  }
  process.exitCode = crashed.length ? 1 : 0;
}

module.exports = { CASES, run, results };
