#!/usr/bin/env node
// The table format back into a schema.
//
// This is the test that decides whether the format is a canonical form or just
// a rendering format. If a script can rebuild something that accepts and
// rejects exactly the documents the original does, then the format holds the
// whole schema and the page is a view of it. If it cannot, the format is a
// pretty summary and should not be called canonical.
//
// It reads only the `rules` half. The `doc` half is for people and is allowed
// to lose things; `rules` is not.
'use strict';
const fs = require('fs');
const path = require('path');

// The rules on a row are already schema keywords, kept as they were found, so
// rebuilding is mostly putting them back where they came from rather than
// translating anything.
// The doc rows carry the structure; the rules carry the leaf constraints. Put
// back together they are the subschema again.
// Which keyword closed a shape is a distinction between validators, not
// between readings: both mean "nothing else may be added" to a person, and they
// differ only in whether inherited fields count. It was being stored in the
// document half as well as the rules half, saying the same thing twice, so it
// is read from the rules now and the document half no longer carries it.
const closedByOf = rules =>
  rules && rules.unevaluatedProperties === false ? 'unevaluatedProperties' : 'additionalProperties';

function withNested(rules, value) {
  // A property whose whole schema was `true` or `false` goes back as that
  // boolean, not as an object wrapping it.
  if (rules && rules.__boolean !== undefined) return rules.__boolean;
  if (!value) return rules;
  if ((value.rows || []).length) {
    const inner = rowsToSchema(value.rows, value.closed, closedByOf(rules));
    // Writing an empty properties object where the original had none is a
    // difference with no meaning, and it made eighteen places look changed.
    const merged = { ...(inner.properties || {}), ...(rules.properties || {}) };
    return { ...inner, ...rules, ...(Object.keys(merged).length ? { properties: merged } : {}),
      ...(inner.required ? { required: inner.required } : {}) };
  }
  if (value.item && (value.item.rows || []).length) {
    const inner = rowsToSchema(value.item.rows, value.itemClosed);
    return { ...rules, items: { ...inner, ...(rules.items && typeof rules.items === 'object' ? rules.items : {}) } };
  }
  return rules;
}

function rowsToSchema(rows, closed, closedBy) {
  const properties = {};
  const required = [];
  const patternProperties = {};
  let additionalProperties;
  const allOf = [];

  for (const r of rows || []) {
    const rules = r.rules || {};
    const { patternProperty, ...rest } = rules;

    // A borrowed row belongs to the shape it came from, which is already
    // pointed at. Writing it out here again does not just add noise, it moves
    // the rule: a borrowed pattern was reappearing as if this shape had
    // declared it.
    if (r.borrowed) continue;

    if (r.name.kind === 'pattern' && patternProperty) {
      patternProperties[patternProperty] = rest;
      continue;
    }
    if (r.name.kind === 'any') { additionalProperties = rest; continue; }
    if (r.name.kind === 'condition') {
      allOf.push({ if: rules.if, then: rules.then, else: rules.else });
      continue;
    }

    // A row that holds rows is an object, and its fields live in those rows
    // rather than in its own rules. Rebuilding only the leaf rules threw away
    // every nested field in the schema.
    properties[r.name.text] = withNested(rest, r.value);
    if (r.needed && r.needed.kind === 'always') required.push(r.name.text);
  }

  const out = {};
  if (Object.keys(properties).length) { out.type = 'object'; out.properties = properties; }
  if (required.length) out.required = required;
  if (Object.keys(patternProperties).length) out.patternProperties = patternProperties;
  if (additionalProperties !== undefined) out.additionalProperties = additionalProperties;
  else if (closed) out[closedBy === 'unevaluatedProperties' ? 'unevaluatedProperties' : 'additionalProperties'] = false;
  // One condition sat directly on the shape in the original. Wrapping it in an
  // allOf says the same thing to a validator but moves it, and a rebuilt schema
  // that has quietly rearranged itself is harder to trust and harder to diff.
  if (allOf.length === 1 && allOf[0].if) Object.assign(out, allOf[0]);
  else if (allOf.length) out.allOf = allOf;
  return out;
}

// A pointer segment escapes "/" as ~1 and "~" as ~0. Splitting a shape's id on
// "/" without decoding the pieces rebuilt every definition whose name contains a
// slash under a mangled key. AsyncAPI names its definitions by URL, so all 49 of
// them came back wrong.
const decodeSeg = t => String(t).replace(/~1/g, '/').replace(/~0/g, '~');

function rebuild(doc) {
  const defs = {};
  for (const s of doc.shapes) {
    // A schema that points at itself makes the whole document a shape. It is
    // the root, not something inside the root, and writing it out here created
    // a property literally named "#" holding a second copy of the document.
    if (s.id === '#') continue;
    // The id is a pointer into the original layout. Rebuilding into a flat
    // drawer would break every pointer, so the original nesting is recreated.
    const parts = s.id.replace(/^#\//, '').split('/').map(decodeSeg);
    let cur = defs;
    for (let i = 0; i < parts.length - 1; i++) {
      cur[parts[i]] = cur[parts[i]] || {};
      cur = cur[parts[i]];
    }
    const body = { ...(s.rules || {}) };
    // A pick-one was read out of thirty if/then blocks and has to go back as
    // thirty if/then blocks, or the rebuilt schema stops choosing anything.
    if (s.picks && s.picks.length) {
      body.allOf = (body.allOf || []).concat(s.picks.map(pk => ({
        if: { type: 'object', required: [pk.field], properties: { [pk.field]: { const: pk.value } } },
        then: { $ref: pk.ref }
      })));
      delete body.pickOne;
    }
    const shape = rowsToSchema(s.rows, s.closed, closedByOf(s.rules));
    for (const k of ['properties', 'required', 'patternProperties', 'additionalProperties', 'allOf', 'if', 'then', 'else']) {
      if (shape[k] !== undefined && body[k] === undefined) body[k] = shape[k];
    }
    if (body.$ref && Array.isArray(body.allOf)) {
      body.allOf = body.allOf.filter(x => !(x && x.$ref === body.$ref));
      if (!body.allOf.length) delete body.allOf;
    }
    if (s.isList) {
      // How many entries a list may hold belongs to the list. Folding those
      // rules into the entry made every list unbounded and every entry
      // over-constrained.
      // What a list is called, what it defaults to and who wrote it belong to
      // the list. Sweeping every remaining keyword into the entry moved them:
      // a list whose default is an empty list came back as an entry whose
      // default is an empty list, which is a different statement.
      // Splitting a list shape into the list and its entry.
      //
      // Keywords that constrain a single value describe the entry; everything
      // else describes the list. Getting this backwards in either direction
      // moves real rules: sweeping the remainder into the entry made OMC's
      // controlled value list and its nullability describe one entry instead of
      // the field, and sweeping it all onto the list put the entry's own fields
      // on the array.
      const ABOUT_AN_ENTRY = new Set(['properties', 'patternProperties',
        'additionalProperties', 'unevaluatedProperties', 'required', 'propertyNames',
        'minProperties', 'maxProperties', 'allOf', 'anyOf', 'oneOf', 'not',
        'if', 'then', 'else', 'dependencies', 'dependentRequired', 'dependentSchemas',
        'enum', 'const', 'format', 'pattern', 'minLength', 'maxLength',
        'minimum', 'maximum', 'exclusiveMinimum', 'exclusiveMaximum', 'multipleOf', '$ref']);
      const { items: itemRules, type, ...others } = body;
      const listLevel = {};
      const entryLevel = {};
      for (const [k, v] of Object.entries(others)) {
        (ABOUT_AN_ENTRY.has(k) ? entryLevel : listLevel)[k] = v;
      }
      const inner = { ...(typeof itemRules === 'object' ? itemRules : {}), ...entryLevel };
      if (shape.properties) inner.properties = shape.properties;
      if (shape.required) inner.required = shape.required;
      if (s.closed) inner[closedByOf(s.rules)] = false;
      // A list that may itself be absent keeps saying so.
      const arr = { type: Array.isArray(type) && type.includes('null') ? type : 'array',
        ...listLevel, items: typeof itemRules === 'boolean' ? itemRules : inner };
      cur[parts[parts.length - 1]] = arr;
    } else {
      // A shape that did not say what type it is has not said it. Adding
      // `type: "object"` because it has fields narrows the schema: the original
      // accepted a value of any type that happened to satisfy the rest, and the
      // rebuild would have turned those away. If the original declared a type it
      // is already in the rules and is used as it was found.
      cur[parts[parts.length - 1]] = body;
    }
    if (s.description && cur[parts[parts.length - 1]].description === undefined) {
      cur[parts[parts.length - 1]].description = s.description;
    }
  }

  const root = { ...(doc.root.rules || {}) };
  if (doc.root.picks && doc.root.picks.length) {
    root.allOf = (root.allOf || []).concat(doc.root.picks.map(pk => ({
      if: { type: 'object', required: [pk.field], properties: { [pk.field]: { const: pk.value } } },
      then: { $ref: pk.ref }
    })));
    delete root.pickOne;
  }
  const rootShape = rowsToSchema(doc.root.rows, doc.root.closed, closedByOf(doc.root.rules));
  for (const k of ['properties', 'required', 'patternProperties', 'additionalProperties', 'allOf', 'if', 'then', 'else']) {
    if (rootShape[k] !== undefined && root[k] === undefined) root[k] = rootShape[k];
  }
  // Drawers that hold shapes but are not shapes themselves.
  for (const [ptr, keywords] of Object.entries(doc.containers || {})) {
    const parts = ptr.replace(/^#\//, '').split('/').map(decodeSeg);
    let cur = defs;
    for (let i = 0; i < parts.length - 1; i++) { cur[parts[i]] = cur[parts[i]] || {}; cur = cur[parts[i]]; }
    const last = parts[parts.length - 1];
    cur[last] = { ...keywords, ...(cur[last] || {}) };
  }
  if (doc.dialect) root.$schema = doc.dialect;
  // The display title falls back to the filename when a schema has none, and
  // writing that back invented a title the original never had. The rules half
  // carries the real one if it exists.
  if (root.title === undefined && doc.titleIsOwn && doc.title) root.title = doc.title;
  Object.assign(root, defs);

  // The rebuild has to be legal in the dialect it declares. Keywords are read
  // in their modern spelling because that is simpler to work with, but writing
  // them back that way produced a schema that says it is draft-07 and then uses
  // `dependentRequired` and `prefixItems`, neither of which exists there.
  const modern = /2019-09|2020-12/.test(doc.dialect || '');
  if (!modern) {
    (function older(node) {
      if (!node || typeof node !== 'object') return;
      if (Array.isArray(node)) return node.forEach(older);
      if (Array.isArray(node.prefixItems)) {
        const rest = node.items;
        node.items = node.prefixItems;
        delete node.prefixItems;
        if (rest !== undefined) node.additionalItems = rest;
      }
      const deps = { ...(node.dependentRequired || {}), ...(node.dependentSchemas || {}) };
      if (Object.keys(deps).length) {
        node.dependencies = { ...(node.dependencies || {}), ...deps };
        delete node.dependentRequired;
        delete node.dependentSchemas;
      }
      for (const k of Object.keys(node)) older(node[k]);
    })(root);
  }
  return root;
}

// What the rebuilt schema demands, so it can be compared with the original
// without needing a validator installed. Two schemas that demand the same
// things of the same shapes accept and reject the same documents, for
// everything these six schemas actually use.
// Draft 3 spells several things differently from every later dialect, and the
// converter deliberately normalises them on the way in. Comparing the rebuild
// against the original without undoing that counts a correct translation as a
// loss: `{a: {required: true}}` rebuilt as `required: ["a"]` is the same rule
// written the modern way, and it was being scored as zero per cent kept.
//
// This is applied to both sides, so it cannot flatter the rebuild. It only
// removes differences of spelling, never of meaning.
// A pointer written against an embedded `$id` and the same pointer written from
// the root are one rule with two spellings, exactly like draft-3's `required`.
// The converter resolves them on the way in, so the comparison has to resolve
// them on both sides or every such pointer reads as changed.
let resolveScopedRefs;
try { ({ resolveScopedRefs } = require('./schema-to-table.js')); } catch { resolveScopedRefs = x => x; }

function normalise(schema) {
  if (!schema || typeof schema !== 'object') return schema;
  if (Array.isArray(schema)) return schema.map(normalise);
  const out = {};
  for (const [k, v] of Object.entries(schema)) out[k] = normalise(v);

  if (out.properties && typeof out.properties === 'object') {
    const fromChildren = [];
    for (const [name, sub] of Object.entries(out.properties)) {
      if (sub && typeof sub === 'object' && sub.required === true) {
        fromChildren.push(name);
        const { required, ...rest } = sub;
        out.properties[name] = rest;
      }
    }
    if (fromChildren.length) {
      const existing = Array.isArray(out.required) ? out.required : [];
      out.required = [...new Set([...existing, ...fromChildren])].sort();
    }
  }
  if (Array.isArray(out.required)) out.required = [...out.required].sort();

  // A tuple written the old way and the new way is one rule with two spellings:
  //   items: [a, b] + additionalItems: rest   ==   prefixItems: [a, b] + items: rest
  // The converter deliberately rebuilds into the modern spelling, so comparing
  // without folding them together scored a correct translation as a loss.
  if (Array.isArray(out.items)) {
    out.prefixItems = out.items;
    out.items = out.additionalItems !== undefined ? out.additionalItems : undefined;
    if (out.items === undefined) delete out.items;
    delete out.additionalItems;
  }
  // `allOf: [{if, then, else}]` and a bare `if/then/else` on the same object are
  // the same rule to a validator. The rebuild writes the unwrapped form because
  // a schema that has quietly rearranged itself is harder to diff, so the
  // comparison has to treat the two as one, on both sides.
  if (Array.isArray(out.allOf) && out.allOf.length === 1 &&
      out.allOf[0] && out.allOf[0].if !== undefined && out.if === undefined) {
    const only = out.allOf[0];
    delete out.allOf;
    for (const k of ['if', 'then', 'else']) if (only[k] !== undefined) out[k] = only[k];
    for (const [k, v] of Object.entries(only)) {
      if (!['if', 'then', 'else'].includes(k) && out[k] === undefined) out[k] = v;
    }
  }
  if (out.divisibleBy !== undefined && out.multipleOf === undefined) {
    out.multipleOf = out.divisibleBy;
    delete out.divisibleBy;
  }
  if (out.extends !== undefined && out.allOf === undefined) {
    out.allOf = Array.isArray(out.extends) ? out.extends : [out.extends];
    delete out.extends;
  }
  if (out.disallow !== undefined && out.not === undefined) {
    out.not = typeof out.disallow === 'string' ? { type: out.disallow } : out.disallow;
    delete out.disallow;
  }
  return out;
}

function fingerprint(schema) {
  const facts = new Map();
  (function walk(node, at) {
    // `true` and `false` are legal schemas: one accepts everything, the other
    // accepts nothing. Returning early on them made those two indistinguishable,
    // so a rebuild that turned "nothing is allowed" into "anything goes" scored
    // as perfect.
    if (node === true || node === false) { facts.set(at, { '': String(node) }); return; }
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) return node.forEach((x, i) => walk(x, `${at}/${i}`));

    // Every key is recorded, not a chosen list. The old version tracked about
    // twenty keywords by name, which meant a rebuild could drop `description`,
    // `examples`, `$comment`, `readOnly`, `deprecated`, `$anchor`, `$dynamicRef`,
    // `minContains` or `contentMediaType` entirely and still be scored as having
    // kept everything. What is not looked at cannot be found missing.
    const f = {};
    for (const [k, v] of Object.entries(node)) {
      if (v === null || typeof v !== 'object') { f[k] = JSON.stringify(v); continue; }
      if (Array.isArray(v) && v.every(x => x === null || typeof x !== 'object')) {
        // Order carries no meaning for a set of names.
        f[k] = JSON.stringify(k === 'required' ? [...v].sort() : v);
        continue;
      }
      // Something structured lives here. Its contents are walked; what is
      // recorded at this level is that the key exists at all.
      f[k] = '<subschema>';
    }
    if (node.properties) f.props = Object.keys(node.properties).sort().join(',');
    if (node.patternProperties) f.patterns = Object.keys(node.patternProperties).sort().join(',');
    if (Object.keys(f).length) facts.set(at, f);
    for (const k of Object.keys(node)) walk(node[k], `${at}/${k}`);
  })(schema, '');
  return facts;
}

// "Kept" counts a place as wrong when a rule moved, which is not the same as a
// rule changing. A validator does not care where a rule is written, so the two
// are counted apart: meaning is what matters, placement is worth knowing.
const LAYOUT_ONLY = new Set(['props']);

function compare(original, rebuilt) {
  const A = fingerprint(normalise(resolveScopedRefs(original)));
  const B = fingerprint(normalise(resolveScopedRefs(rebuilt)));
  let same = 0, missing = 0, changed = 0, meaningDiff = 0, layoutDiff = 0, added = 0;
  const examples = [];
  const note = m => { if (examples.length < 8) examples.push(m); };

  for (const [at, fa] of A) {
    const fb = B.get(at);
    if (!fb) { missing++; note(`missing ${at}`); continue; }
    const keys = new Set([...Object.keys(fa), ...Object.keys(fb)]);
    let ok = true, m = false, l = false;
    for (const k of keys) {
      if (fa[k] === fb[k]) continue;
      ok = false;
      if (LAYOUT_ONLY.has(k)) l = true; else m = true;
      note(`${at} ${k}: had ${fa[k]} now ${fb[k]}`);
    }
    if (ok) same++; else { changed++; if (m) meaningDiff++; else if (l) layoutDiff++; }
  }

  // The comparison used to walk only the original, so anything the rebuild
  // invented at a place the original knew nothing about was never looked at. A
  // rebuild could add a whole extra field and still score full marks.
  for (const [at] of B) {
    if (!A.has(at)) { added++; note(`invented ${at}`); }
  }

  const total = A.size;
  const lost = meaningDiff + missing + added;
  return { total, same, missing, changed, added, examples,
    meaningDiff: lost, layoutDiff,
    meaningKept: total ? Math.max(0, 100 * (total - lost) / total) : 0 };
}

module.exports = { rebuild, fingerprint, compare };

if (require.main === module) {
  const cli = require('./cli.js');
  const opts = cli.parse(process.argv.slice(2), {
    flags: ['compare'],
    usage: [
      'usage: table-to-schema <name.table.json>... [-o <dir>|-] [--compare]',
      '',
      'Rebuilds a working JSON Schema from the table format. The format alone',
      'is enough: the original is needed only if you ask to compare against it.',
      '  --compare   also check the rebuild against the original schema named',
      '              in the format\'s "source" field, and report what differs',
      '',
      'With --compare, set VERBOSE=1 to list example differences.'
    ].join('\n')
  });
  cli.checkCollisions(opts.inputs, '.table.json', '.rebuilt.json');
  if (opts.on.compare) {
    cli.note('schema'.padEnd(24) + 'places'.padStart(8) + 'same'.padStart(8) +
      'lost'.padStart(8) + 'changed'.padStart(9) + '   kept');
  }
  for (const f of opts.inputs) {
    const doc = cli.readTable(f);
    const name = cli.nameOf(f, '.table.json');
    const back = rebuild(doc);
    cli.write(opts, 'rebuilt', `${name}.rebuilt.json`, JSON.stringify(back, null, 1));
    if (!opts.on.compare) { cli.note(`${name.padEnd(24)} rebuilt`); continue; }
    // Comparing needs the original, and the path in "source" is relative to
    // wherever the format was built. Say so plainly rather than failing on a
    // missing-file error the user cannot act on.
    if (!doc.source) cli.fail(`${f} has no "source", so there is nothing to compare against`);
    if (!fs.existsSync(doc.source)) {
      cli.fail(`cannot compare ${name}: its source ${doc.source} is not here.\n` +
        'Run from the directory the format was built in, or drop --compare to just rebuild.');
    }
    const r = compare(cli.readJSON(doc.source), back);
    const pct = r.total ? (100 * r.same / r.total).toFixed(1) + '%' : 'n/a';
    cli.note(name.padEnd(24) + String(r.total).padStart(8) + String(r.same).padStart(8) +
      String(r.missing).padStart(8) + String(r.changed).padStart(9) + '   ' + pct);
    if (process.env.VERBOSE) r.examples.forEach(e => cli.note('      ' + e));
  }
}
