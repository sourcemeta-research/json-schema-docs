#!/usr/bin/env node
// Any JSON Schema into the table format.
//
// The table format is two things kept apart on purpose. `doc` is what a page
// shows a reader. `rules` is the residue needed to rebuild something that
// validates the same documents. Keeping them separate means the document half
// can be cut down to only what earns its place on the page, while the whole
// thing stays convertible back into a working schema.
//
// Dialects handled: draft-3 through 2020-12. The differences that matter are
// small and are normalised on the way in:
//   * `definitions` and `$defs` are the same drawer
//   * draft 3 `required: true` on a field and `required: [names]` on the parent
//     say the same thing
//   * draft 3 `extends` and `allOf` are both inheritance
//   * `dependencies` splits into `dependentRequired` and `dependentSchemas`
//   * `unevaluatedProperties: false` and `additionalProperties: false` both
//     mean the shape is closed, on the shapes these schemas actually use
'use strict';

const decode = t => t.replace(/~1/g, '/').replace(/~0/g, '~');
const tail = ref => decode(String(ref).split('/').pop());

function pointer(root, ref) {
  if (typeof ref !== 'string' || !ref.startsWith('#')) return null;
  if (ref === '#') return root;
  let cur = root;
  for (const raw of ref.slice(2).split('/')) {
    if (cur == null || typeof cur !== 'object') return null;
    cur = cur[decode(raw)];
  }
  return cur == null ? null : cur;
}

const TYPE_WORDS = {
  string: 'text', integer: 'a whole number', number: 'a number',
  boolean: 'yes or no', object: 'a group of fields', array: 'a list', null: 'nothing'
};

const FORMAT_WORDS = {
  'date-time': 'a date and time', date: 'a date', time: 'a time',
  uri: 'a web address', 'uri-reference': 'a web address', url: 'a web address',
  email: 'an email address', hostname: 'a computer name', ipv4: 'an IP address',
  ipv6: 'an IP address', uuid: 'a unique id', regex: 'a search pattern'
};

// A pattern is unreadable, but what it allows usually is not. These cover the
// shapes that actually turn up in the six schemas; anything else falls back to
// saying a set format applies, which is honest rather than wrong.
function readPattern(p) {
  const body = String(p).replace(/^\^/, '').replace(/\$$/, '');
  if (/^\[a-zA-Z0-9[\]._-]+\]\+?$/.test(body) || /^[\w\\]*\[[^\]]*\]\+$/.test(body)) {
    const bits = [];
    if (/a-z/i.test(body)) bits.push('letters');
    if (/0-9|\\d/.test(body)) bits.push('numbers');
    const punct = [];
    if (body.includes('.')) punct.push('dots');
    if (body.includes('_')) punct.push('underscores');
    if (body.includes('-')) punct.push('dashes');
    if (punct.length) bits.push(punct.join(', '));
    if (bits.length) return `made of ${bits.join(', ')}`;
  }
  return null;
}

function splitNull(t) {
  const arr = Array.isArray(t) ? t.slice() : (t ? [t] : []);
  return { types: arr.filter(x => x !== 'null'), nullable: arr.includes('null') };
}

function firstExample(node) {
  let found;
  (function walk(n) {
    if (found !== undefined || !n || typeof n !== 'object') return;
    if (Array.isArray(n)) return n.forEach(walk);
    if (Array.isArray(n.examples) && n.examples.length && typeof n.examples[0] !== 'object') { found = n.examples[0]; return; }
    if (n.example !== undefined && typeof n.example !== 'object') { found = n.example; return; }
    for (const k of Object.keys(n)) walk(n[k]);
  })(node);
  return found;
}

// ---------------------------------------------------------------- conversion

// Two draft 3 keywords say exactly what a later keyword says, and nothing was
// reading them, so a draft 3 schema quietly lost them: `divisibleBy: 5` and
// `disallow: "string"` both vanished on the way through. They are renamed here
// rather than handled separately everywhere, which is how `extends` and the two
// spellings of `required` are already dealt with.
function normaliseDialect(node) {
  if (!node || typeof node !== 'object') return node;
  if (Array.isArray(node)) return node.map(normaliseDialect);
  const out = {};
  for (const [k, v] of Object.entries(node)) out[k] = normaliseDialect(v);
  if (out.divisibleBy !== undefined && out.multipleOf === undefined) {
    out.multipleOf = out.divisibleBy;
    delete out.divisibleBy;
  }
  if (out.disallow !== undefined && out.not === undefined) {
    // `disallow` takes a type name, a list of them, or a whole schema.
    out.not = typeof out.disallow === 'string' ? { type: out.disallow }
      : Array.isArray(out.disallow)
        ? { anyOf: out.disallow.map(d => typeof d === 'string' ? { type: d } : d) }
        : out.disallow;
    delete out.disallow;
  }
  return out;
}

// A pointer is read against the nearest enclosing `$id`, not against the top of
// the file.
//
// A schema may embed another whole schema under its own `$id`, and inside that
// island `#/definitions/x` means the island's definitions, not the outer
// document's. AsyncAPI does exactly this: it carries the draft-07 meta-schema
// inside itself, with 49 nested identities, and 49 of its pointers were being
// read against the wrong document and reported as leading nowhere.
//
// Rather than teach every later step about scopes, the pointers are rewritten
// here into ones that are true from the root. Everything downstream then works
// unchanged, and a pointer that really does lead nowhere still says so.
const escapeSeg = s => String(s).replace(/~/g, '~0').replace(/\//g, '~1');

function resolveScopedRefs(node) {
  // Where each island begins, as a pointer path from the root.
  const scopes = [];
  (function findScopes(n, at) {
    if (!n || typeof n !== 'object') return;
    if (Array.isArray(n)) return n.forEach((x, i) => findScopes(x, `${at}/${i}`));
    if (at && typeof n.$id === 'string') scopes.push(at);
    for (const k of Object.keys(n)) findScopes(n[k], `${at}/${escapeSeg(k)}`);
  })(node, '');
  if (!scopes.length) return node;

  const scopeSet = new Set(scopes);
  return (function rewrite(n, at, scope) {
    if (!n || typeof n !== 'object') return n;
    if (Array.isArray(n)) return n.map((x, i) => rewrite(x, `${at}/${i}`, scope));
    const here = scopeSet.has(at) ? at : scope;
    const out = {};
    for (const [k, v] of Object.entries(n)) {
      if (k === '$ref' && typeof v === 'string' && here && v.startsWith('#')) {
        out.$ref = v === '#' ? '#' + here : '#' + here + v.slice(1);
        continue;
      }
      out[k] = rewrite(v, `${at}/${escapeSeg(k)}`, here);
    }
    return out;
  })(node, '', '');
}

function build(schema, opts = {}) {
  const root = resolveScopedRefs(normaliseDialect(schema));
  const dropped = [];
  const drop = (why, where) => dropped.push({ why, where });

  // Every place anything points at, and how often. What is pointed at most is
  // what everything else is built on, and a reader needs those first.
  const inbound = new Map();
  (function walk(n) {
    if (!n || typeof n !== 'object') return;
    if (Array.isArray(n)) return n.forEach(walk);
    if (typeof n.$ref === 'string') inbound.set(n.$ref, (inbound.get(n.$ref) || 0) + 1);
    for (const k of Object.keys(n)) walk(n[k]);
  })(root);

  // ---- find the named shapes -------------------------------------------
  // A named shape is anything a pointer can land on. Schemas disagree on where
  // they keep them, and some keep them two levels down, so this follows the
  // pointers rather than assuming a layout.
  const shapes = new Map();   // ref -> { ref, name, node, group }
  const containers = {};      // pointer -> keywords of a drawer that is not itself a shape
  const addShape = (ref, node, group) => {
    if (!shapes.has(ref)) shapes.set(ref, { ref, name: tail(ref), node, group });
  };

  for (const drawer of ['$defs', 'definitions']) {
    for (const [name, node] of Object.entries(root[drawer] || {})) {
      const ref = `#/${drawer}/${name}`;
      const isNamespace = node && node.properties &&
        Object.keys(node.properties).some(p => inbound.has(`${ref}/properties/${p}`));
      if (isNamespace) {
        // The drawer itself has keywords of its own, and only its contents were
        // being kept. OMC's Asset drawer carries a title, a type and a closed
        // flag that all vanished. They are not shown to anyone, so they belong
        // to the rules half rather than to a shape.
        const { properties: _p, ...ownKeywords } = node;
        if (Object.keys(ownKeywords).length) containers[ref] = ownKeywords;
        for (const [p, sub] of Object.entries(node.properties)) addShape(`${ref}/properties/${p}`, sub, node.title || name);
      } else {
        addShape(ref, node, null);
      }
    }
  }
  // Anything else pointed at that we have not already named, including the
  // whole document pointing at itself. A schema that describes schemas does
  // exactly that, and leaving it unnamed made every self reference expand the
  // document again instead of linking back to it.
  for (const ref of inbound.keys()) {
    if (shapes.has(ref) || !ref.startsWith('#')) continue;
    const node = pointer(root, ref);
    if (node && typeof node === 'object') {
      addShape(ref, node, null);
      if (ref === '#') shapes.get(ref).name = root.title || 'this whole document';
    }
  }

  const refOf = node => {
    for (const [ref, s] of shapes) if (s.node === node) return ref;
    return null;
  };

  // ---- a value, described both ways ------------------------------------

  // Keywords the rebuild puts back from the rows and shapes. Everything else is
  // passed through untouched by `describe` below.
  const RECONSTRUCTED = new Set(['properties', '$defs', 'definitions', 'required',
    'patternProperties', 'additionalProperties', 'unevaluatedProperties',
    'items', 'prefixItems', 'additionalItems', 'allOf', 'anyOf', 'oneOf',
    'if', 'then', 'else', 'not', 'dependencies', 'dependentRequired',
    'dependentSchemas', 'extends', 'disallow', 'divisibleBy', '$ref']);

  // Anything this converter does not understand is still part of the schema.
  // Only the keywords above are rebuilt from the document half; every other
  // keyword is carried through as it was found. Without this, a keyword simply
  // not thought of was silently deleted: `$id`, `$anchor`, `$comment`,
  // `readOnly`, `deprecated`, `minContains`, `contentMediaType` and every
  // vendor extension such as `x-intellij-language-injection` all disappeared,
  // and nothing reported a loss because nothing was looking for them.
  function describe(s, depth, seen) {
    const out = describeInner(s, depth, seen);
    if (s && typeof s === 'object' && !Array.isArray(s)) {
      for (const [k, v] of Object.entries(s)) {
        // `additionalProperties: true` is rebuilt from the rows when it is a
        // schema, but as a bare `true` there is nothing to rebuild it from and
        // it says something real: anything else is allowed. A shape whose main
        // content is a choice never reached the branch that kept it.
        // `additionalItems` beside a single `items` schema is inert to a
        // validator, but it is in the file and the rebuild should hand it back
        // rather than quietly tidying the author's schema.
        const inertAdditionalItems = k === 'additionalItems' && !Array.isArray(s.items);
        if (RECONSTRUCTED.has(k) && !(k === 'additionalProperties' && v === true)
            && !inertAdditionalItems) continue;
        if (out.rules[k] === undefined) out.rules[k] = v;
      }
    }
    return out;
  }

  function describeInner(s, depth, seen) {
    const doc = {};
    const rules = {};
    // `true` and `false` are legal schemas: one accepts everything, the other
    // accepts nothing. Treating them as absent quietly changed what validates.
    // `true` and `false` are schemas, and the rules half has to give them back
    // exactly. Rewriting `true` as `{const: true}` changed "anything goes" into
    // "must be the boolean true", which is a different rule entirely.
    if (s === true) return { doc: { kind: 'anything', words: 'anything' }, rules: { __boolean: true } };
    if (s === false) return { doc: { kind: 'never', words: 'nothing is allowed here' }, rules: { __boolean: false } };
    if (!s || typeof s !== 'object') return { doc: { kind: 'anything', words: 'anything' }, rules };

    // From 2019-09 a pointer may sit beside other keywords and they all apply
    // together, so it inherits rather than replaces. Treating the pointer as the
    // whole story threw away everything written next to it, which on OpenAPI is
    // the entire root of the document.
    const SIBLINGS = ['type', 'properties', 'required', 'items', 'allOf', 'anyOf', 'oneOf',
      'enum', 'const', 'patternProperties', 'additionalProperties', 'unevaluatedProperties',
      'if', 'then', 'else', 'not', 'format', 'pattern', 'minimum', 'maximum'];
    if (typeof s.$ref === 'string' && s.$ref.startsWith('#') && SIBLINGS.some(k => s[k] !== undefined)) {
      const rest = { ...s };
      delete rest.$ref;
      const out = describe(rest, depth, seen);
      out.rules.$ref = s.$ref;
      // Only the pointer is kept. The name it resolves to was stored beside it
      // and is the same fact twice: a renderer already looks names up from
      // pointers everywhere else, so it can do it here too.
      out.doc.alsoFollowsRef = s.$ref;
      return out;
    }

    if (typeof s.$ref === 'string') {
      // A pointer that leaves this file is not broken, it is a rule kept
      // somewhere else, and a reader needs to be told where.
      if (!s.$ref.startsWith('#')) {
        doc.kind = 'elsewhere';
        doc.words = 'follows rules kept in another file';
        doc.href = s.$ref;
        rules.$ref = s.$ref;
        return { doc, rules };
      }
      const target = shapes.get(s.$ref);
      if (target) {
        doc.kind = 'ref';
        doc.ref = s.$ref;
        doc.words = target.name;
      } else {
        // Expanding a pointer in place is how a schema that contains itself
        // turns into an infinite document. If it resolves at all it is a shape,
        // so it gets named and linked; only a genuinely dead pointer is dropped.
        const inline = pointer(root, s.$ref);
        if (inline && typeof inline === 'object') {
          addShape(s.$ref, inline, null);
          doc.kind = 'ref'; doc.ref = s.$ref; doc.words = tail(s.$ref);
        } else {
          doc.kind = 'anything'; doc.words = 'anything';
          drop('a pointer that leads nowhere', s.$ref);
        }
      }
      rules.$ref = s.$ref;
      return { doc, rules };
    }

    const { types, nullable } = splitNull(s.type);
    if (nullable) doc.nullable = true;
    if (s.type !== undefined) rules.type = s.type;
    if (s.default !== undefined) { doc.default = s.default; rules.default = s.default; }

    if (s.const !== undefined) {
      doc.kind = 'fixed'; doc.fixed = [s.const]; doc.words = 'a fixed value';
      rules.const = s.const;
      return { doc, rules };
    }
    if (Array.isArray(s.enum)) {
      doc.kind = 'fixed'; doc.fixed = s.enum;
      doc.words = s.enum.length === 1 ? 'a fixed value' : 'one of these';
      rules.enum = s.enum;
      return { doc, rules };
    }

    // "must not be one of these" is a real rule a reader needs. A negated
    // subschema has no short honest reading, so it is dropped rather than
    // turned into something that sounds right and is not.
    if (s.not) {
      rules.not = s.not;
      if (Array.isArray(s.not.enum)) doc.forbidden = s.not.enum;
      else if (s.not.const !== undefined) doc.forbidden = [s.not.const];
      else if (Array.isArray(s.not.required) && s.not.required.length > 1) {
        // "must not have all of these at once" is the commonest real use of a
        // negation and it reads perfectly well: two fields that cannot both be
        // used. Dropping it would have lost a rule a writer will trip over.
        //
        // This is one set among possibly several, so it goes in the same place
        // every other exclusion goes. Writing it to its own key spelled
        // `exclusive` meant no renderer ever looked at it, and OpenAPI's rule
        // that value and externalValue cannot both be used was carried in the
        // format and shown on no page.
        (doc.exclusiveSets = doc.exclusiveSets || []).push(s.not.required);
      } else drop('a rule saying the value must not match a whole shape', s.title || '(unnamed)');
    }

    const branches = s.oneOf || s.anyOf;
    if (branches && branches.length) {
      const kind = s.oneOf ? 'oneOf' : 'anyOf';
      rules[kind] = branches;
      const real = branches.filter(b => !(b && splitNull(b.type).types.length === 0 && b.type));
      const described = real.map(b => describe(b, depth + 1, seen));
      if (described.length && described.every(d => d.doc.kind === 'ref')) {
        doc.kind = 'choice-of-refs';
        doc.refs = described.map(d => d.doc.ref);
        doc.words = 'either ' + described.map(d => d.doc.words).join(' or ');
      } else {
        doc.kind = 'choice';
        doc.options = described.map(d => d.doc);
        doc.words = `one of ${described.length} forms`;
      }
      if (branches.some(b => splitNull(b.type).types.length === 0 && b.type)) doc.nullable = true;
      if (!types.length) return { doc, rules };
    }

    if (types.includes('array')) {
      doc.kind = 'list';
      doc.words = 'a list';
      // A list is spelled three ways across the dialects and two of them can be
      // in play at once:
      //   every entry alike        items: {schema}
      //   fixed slots, up to 2019  items: [a, b]        additionalItems: rest
      //   fixed slots, 2020-12     prefixItems: [a, b]  items: rest
      // Reading this as `s.items || s.prefixItems` took the first that existed,
      // so a 2020-12 list with both threw its fixed slots away silently.
      const slots = Array.isArray(s.prefixItems) ? s.prefixItems
        : Array.isArray(s.items) ? s.items : null;
      const rest = slots
        ? (Array.isArray(s.items) ? s.additionalItems : s.items)
        : s.items;

      if (slots) {
        doc.slots = slots.map(x => describe(x, depth + 1, seen).doc);
        rules.prefixItems = slots;
      }
      // `false` here means the list stops after the fixed slots. Losing it made
      // a closed list unbounded, which accepts documents the original rejects.
      if (rest === false) {
        doc.slotsOnly = true;
        rules.items = false;
      } else if (rest === true) {
        // `items: true` says every entry may be anything. It is not the same as
        // no rule at all, and dropping it lost the fact that the list has
        // entries described at all.
        doc.item = { kind: 'anything', words: 'anything' };
        rules.items = true;
      } else if (rest && typeof rest === 'object') {
        const described = describe(rest, depth + 1, seen).doc;
        if (slots) doc.restItem = described; else doc.item = described;
        rules.items = rest;
        if (rest.additionalProperties === false || rest.unevaluatedProperties === false) doc.itemClosed = true;
      }
      if (s.minItems != null || s.maxItems != null) {
        doc.range = { min: s.minItems != null ? s.minItems : 0, max: s.maxItems != null ? s.maxItems : null, unit: ' entries' };
        if (s.minItems != null) rules.minItems = s.minItems;
        if (s.maxItems != null) rules.maxItems = s.maxItems;
      }
      if (s.uniqueItems) { doc.uniqueItems = true; rules.uniqueItems = true; }
      if (s.contains) { rules.contains = s.contains; drop('a rule about what a list must contain somewhere', 'contains'); }
      return { doc, rules };
    }

    // A schema whose only content is inheritance or a negation has no type and
    // no fields of its own, so it fell through to being described as a plain
    // value and everything it borrowed or forbade was lost.
    if (types.includes('object') || s.properties || s.patternProperties || s.additionalProperties
        || s.allOf || s.extends) {
      const inner = shapeRows(s, depth + 1, seen);

      // Inheritance on its own is not a group. `allOf: [{$ref: X}, {default: 0}]`
      // is X with a default, and calling it "a group of fields" told a reader
      // the opposite of the truth: the draft-07 meta-schema's
      // nonNegativeIntegerDefault0 is a whole number, and the page said it was
      // a group with nothing in it. Only take this path when the shape really
      // adds nothing structural of its own.
      const STRUCTURAL = ['type', 'properties', 'patternProperties', 'additionalProperties',
        'required', 'items', 'anyOf', 'oneOf', 'enum', 'const', 'if'];
      if (!inner.rows.length && !types.includes('object') && !s.properties
          && !s.patternProperties && s.additionalProperties === undefined
          && Array.isArray(s.allOf)) {
        const refs = s.allOf.filter(a => a && typeof a.$ref === 'string');
        const rest = s.allOf.filter(a => !(a && typeof a.$ref === 'string'));
        if (refs.length === 1 && rest.every(a => a && !STRUCTURAL.some(k => a[k] !== undefined))) {
          const target = shapes.get(refs[0].$ref);
          doc.kind = 'ref';
          doc.ref = refs[0].$ref;
          doc.words = target ? target.name : tail(refs[0].$ref);
          for (const a of rest) if (a.default !== undefined) doc.default = a.default;
          if (s.default !== undefined) doc.default = s.default;
          Object.assign(rules, inner.rules);
          return { doc, rules };
        }
      }

      // How many fields a group must have is a rule a writer can break, and the
      // page was not telling anyone about it.
      if (s.minProperties != null || s.maxProperties != null) {
        doc.howManyFields = {
          min: s.minProperties != null ? s.minProperties : null,
          max: s.maxProperties != null ? s.maxProperties : null
        };
      }

      // `additionalProperties: true` says out loud that anything else is allowed.
    // It is not the same as saying nothing, and it was being read as nothing.
    if (s.additionalProperties === true) rules.additionalProperties = true;

    // Saying "an object" on top of a choice between named shapes says nothing
      // the choice does not already say, and it overwrote the choice. The reader
      // was then told the field is a group of fields with no fields in it, and
      // the shapes it may actually point at were never shown at all.
      if (!doc.kind || !(doc.kind === 'choice-of-refs' || doc.kind === 'choice')) {
        doc.kind = 'group';
        doc.words = 'a group of fields';
      }
      if (inner.rows.length) doc.rows = inner.rows;
      if ((inner.exclusives || []).length) doc.exclusiveSets = inner.exclusives;
      if (inner.closed) doc.closed = true;
      Object.assign(rules, inner.rules);
      return { doc, rules };
    }

    // Who gets to write a field, and what the text inside it actually is, are
    // both things a reader needs and neither reached the page.
    if (s.readOnly) doc.whoWrites = 'read';
    else if (s.writeOnly) doc.whoWrites = 'write';
    if (s.contentMediaType || s.contentEncoding) {
      doc.holds = { type: s.contentMediaType || null, encoding: s.contentEncoding || null };
    }

    if (types.includes('boolean')) { doc.kind = 'bool'; doc.words = 'yes or no'; return { doc, rules }; }

    doc.kind = 'value';
    doc.words = types.length ? types.map(t => TYPE_WORDS[t] || t).join(' or ') : 'anything';
    if (s.format) {
      if (FORMAT_WORDS[s.format]) doc.words = FORMAT_WORDS[s.format];
      rules.format = s.format;
    }
    if (s.pattern) {
      rules.pattern = s.pattern;
      const readable = readPattern(s.pattern);
      doc.patternWords = readable ? `${readable}` : 'in an exact set format';
      const ex = firstExample(s);
      if (ex !== undefined) doc.example = ex;
    }
    const ex2 = firstExample(s);
    if (ex2 !== undefined && doc.example === undefined) doc.example = ex2;
    for (const [k, key] of [['minLength', 'min'], ['maxLength', 'max']]) {
      if (s[k] != null) { doc.range = doc.range || { unit: ' characters' }; doc.range[key] = s[k]; rules[k] = s[k]; }
    }
    for (const [k, key] of [['minimum', 'min'], ['maximum', 'max']]) {
      if (s[k] != null) { doc.range = doc.range || { unit: '' }; doc.range[key] = s[k]; rules[k] = s[k]; }
    }
    for (const k of ['exclusiveMinimum', 'exclusiveMaximum', 'multipleOf']) if (s[k] != null) rules[k] = s[k];
    return { doc, rules };
  }

  // ---- the rows of one shape -------------------------------------------
  function shapeRows(s, depth, seen = new Set()) {
    const rows = [];
    const rules = {};
    let closed = false;
    let closedBy = null;
    const exclusives = [];
    const required = new Set(Array.isArray(s.required) ? s.required : []);
    const taken = new Set();

    const addProps = (src, from) => {
      for (const [name, sub] of Object.entries(src.properties || {})) {
        if (taken.has(name)) continue;
        taken.add(name);
        const { doc, rules: r } = describe(sub, depth, seen);
        rows.push({
          name: { kind: 'fixed', text: name },
          needed: (required.has(name) || (src.required || []).includes(name) || sub.required === true) ? { kind: 'always' } : { kind: 'never' },
          description: sub.description || sub.title || '',
          deprecated: !!sub.deprecated,
          value: doc,
          from: from || undefined,
          rules: r
        });
      }
    };

    // inheritance, from either dialect
    const bases = []
      .concat(s.allOf || [])
      .concat(s.extends ? (Array.isArray(s.extends) ? s.extends : [s.extends]) : [])
      .concat(typeof s.$ref === 'string' && s.$ref.startsWith('#') &&
        (s.properties || s.required || s.patternProperties) ? [{ $ref: s.$ref }] : []);
    for (const base of bases) {
      if (!base || typeof base !== 'object') continue;
      if (base.if && base.then) continue;           // handled below as a pick-one
      // A branch that is only a negation carries no fields, so the loop below
      // found nothing in it and the rule vanished. "You cannot use these two
      // together" is a rule a writer will trip over, and it belongs to the
      // shape rather than to any one field.
      if (base.not && Array.isArray(base.not.required) && base.not.required.length > 1) {
        exclusives.push(base.not.required);
        (rules.allOf = rules.allOf || []).push(base);
        continue;
      }
      let src = base, label = null;
      if (typeof base.$ref === 'string') {
        if (seen.has(base.$ref)) continue;
        seen.add(base.$ref);
        const t = pointer(root, base.$ref);
        if (t) { src = t; label = tail(base.$ref); }
      }
      const inner = shapeRows(src, depth + 1, seen);
      if (inner.closed) closed = true;
      for (const r of inner.rows) {
        if (taken.has(r.name.text)) continue;
        taken.add(r.name.text);
        rows.push({ ...r, from: label || r.from, borrowed: true });
      }
      (rules.allOf = rules.allOf || []).push(base);
    }

    addProps(s, null);

    // a name the writer chooses, rather than one we can list
    for (const [pat, sub] of Object.entries(s.patternProperties || {})) {
      const { doc, rules: r } = describe(sub, depth, seen);
      const readable = readPattern(pat);
      rows.push({
        name: { kind: 'pattern', pattern: pat, text: readable ? `any name ${readable}` : 'any name in a set format' },
        needed: { kind: 'never' },
        description: sub.description || sub.title || '',
        value: doc,
        rules: { ...r, patternProperty: pat }
      });
    }
    if (s.patternProperties) rules.patternProperties = s.patternProperties;

    if (s.additionalProperties && typeof s.additionalProperties === 'object') {
      const { doc, rules: r } = describe(s.additionalProperties, depth, seen);
      rows.push({
        name: { kind: 'any', text: 'any name you choose' },
        needed: { kind: 'never' },
        description: s.additionalProperties.description || '',
        value: doc,
        rules: r
      });
      rules.additionalProperties = s.additionalProperties;
    } else if (s.additionalProperties === false || s.unevaluatedProperties === false) {
      // These read the same to a person and differ to a validator.
      // `unevaluatedProperties` allows whatever an inherited shape contributed;
      // `additionalProperties` does not. Rebuilding one as the other would make
      // a shape reject the very fields it inherits.
      closed = true;
      closedBy = s.additionalProperties === false ? 'additionalProperties' : 'unevaluatedProperties';
      if (s.additionalProperties === false) rules.additionalProperties = false;
      if (s.unevaluatedProperties === false) rules.unevaluatedProperties = false;
    }

    if (s.propertyNames) { rules.propertyNames = s.propertyNames; drop('a rule limiting what names may be used', 'propertyNames'); }
    if (s.minProperties != null) rules.minProperties = s.minProperties;
    if (s.maxProperties != null) rules.maxProperties = s.maxProperties;

    // one field being present pulling others in
    const deps = s.dependentRequired || {};
    const depSchemas = s.dependentSchemas || {};
    for (const [trigger, v] of Object.entries(s.dependencies || {})) {
      if (Array.isArray(v)) deps[trigger] = v; else depSchemas[trigger] = v;
    }
    for (const [trigger, names] of Object.entries(deps)) {
      const row = rows.find(r => r.name.text === trigger);
      if (row) row.brings = { names, kind: 'required' };
      (rules.dependentRequired = rules.dependentRequired || {})[trigger] = names;
    }
    for (const [trigger, sub] of Object.entries(depSchemas)) {
      const inner = shapeRows(sub, depth + 1, seen);
      const row = rows.find(r => r.name.text === trigger);
      if (row) row.brings = { rows: inner.rows, kind: 'fields' };
      (rules.dependentSchemas = rules.dependentSchemas || {})[trigger] = sub;
    }

    // if / then / else
    const conds = []
      .concat((s.allOf || []).filter(a => a && a.if))
      .concat(s.if ? [{ if: s.if, then: s.then, else: s.else }] : []);
    if (conds.length) {
      const picks = [];
      for (const c of conds) {
        const p = c.if && c.if.properties ? c.if.properties : {};
        const key = Object.keys(p)[0];
        const val = key && p[key] && (p[key].const !== undefined ? p[key].const
          : Array.isArray(p[key].enum) && p[key].enum.length === 1 ? p[key].enum[0] : undefined);
        if (val !== undefined && c.then && typeof c.then.$ref === 'string') {
          picks.push({ field: key, value: val, ref: c.then.$ref });
          continue;
        }
        // A branch may be a pointer rather than fields written out in place.
        // Following it is what turns "then something happens" into something a
        // reader can act on.
        const sideOf = branch => {
          if (!branch) return [];
          if (typeof branch.$ref === 'string') {
            const t = pointer(root, branch.$ref);
            return t ? shapeRows(t, depth + 1, new Set(seen)).rows : [];
          }
          return shapeRows(branch, depth + 1, seen).rows;
        };
        const whenRows = c.if ? shapeRows(c.if, depth + 1, seen).rows : [];
        const thenRows = sideOf(c.then);
        const elseRows = sideOf(c.else);
        // The condition may be about a field simply being there, rather than
        // holding a particular value. That is the commonest form in practice.
        const presence = Array.isArray(c.if && c.if.required) ? c.if.required : [];
        // A branch that only makes an existing field required has no fields of
        // its own, so it produced no rows and the whole condition was thrown
        // away. That lost the rule as well as the reading: "when kind is x, n
        // becomes required" is both perfectly sayable and perfectly common.
        const requires = branch => Array.isArray(branch && branch.required) ? branch.required : [];
        const thenRequires = requires(c.then);
        const elseRequires = requires(c.else);

        const when = val !== undefined && key
          ? `when ${key} is "${val}"`
          : presence.length
            ? `when ${presence.join(' and ')} ${presence.length > 1 ? 'are' : 'is'} filled in`
            : whenRows.length
              ? `when ${whenRows.map(r => r.name.text).join(' and ')} ${whenRows.length > 1 ? 'are' : 'is'} filled in`
              : 'in one case';

        if (thenRows.length || elseRows.length || thenRequires.length || elseRequires.length) {
          rows.push({
            name: { kind: 'condition', text: when },
            needed: { kind: 'conditional' },
            value: { kind: 'conditional', words: '', thenRows, elseRows,
              ...(thenRequires.length ? { thenRequires } : {}),
              ...(elseRequires.length ? { elseRequires } : {}) },
            rules: { if: c.if, then: c.then, else: c.else }
          });
        } else {
          // Nothing readable to show, but the rule still has to survive or the
          // rebuilt schema stops enforcing it. The document half may lose
          // things; the validating half may not.
          (rules.allOf = rules.allOf || []).push({ if: c.if, then: c.then, else: c.else });
          drop('a condition with nothing to show on either side', key || '(unnamed)');
        }
      }
      if (picks.length) {
        rules.pickOne = picks;
        return { rows, rules, closed, closedBy, exclusives, picks };
      }
    }

    return { rows, rules, closed, closedBy, exclusives };
  }

  // ---- assemble ---------------------------------------------------------
  const outShapes = [];
  for (const [ref, s] of shapes) {
    const node = s.node;
    const { types } = splitNull(node.type);
    const isList = types.includes('array');
    const body = isList && node.items ? node.items : node;
    const built = shapeRows(body, 0, new Set([ref]));
    // A shape is not always an object. A plain string with a pattern, a number
    // with a minimum, a list of fixed words: those carry all their rules at the
    // value level, and capturing only the object level threw every one of them
    // away, so the rebuilt schema turned them all into empty objects.
    const own = describe(node, 0, new Set([ref]));
    const valueRules = { ...own.rules };
    // Only drop the pointer when the shape is nothing but a pointer. When it
    // sits beside other keywords it is inheritance and has to survive.
    if (typeof node.$ref === 'string' && Object.keys(node).length === 1) delete valueRules.$ref;
    outShapes.push({
      id: ref,
      name: s.name,
      group: s.group || null,
      description: node.description || '',
      usedBy: inbound.get(ref) || 0,
      isList,
      closed: built.closed,
      // An exclusion can be found two ways: while walking the shape's fields,
      // or on the shape's own value when the shape is a bare `not`. Both mean
      // the same thing to a reader, so both belong in the one place renderers
      // look. Keeping them apart left OpenAPI's example shape carrying its rule
      // where nothing was reading it.
      ...(() => {
        const sets = [...(built.exclusives || []), ...(own.doc.exclusiveSets || [])];
        // Hoisted, not copied. Two homes for one rule is how it drifted in the
        // first place.
        delete own.doc.exclusiveSets;
        return sets.length ? { exclusiveSets: sets } : {};
      })(),
      picks: built.picks || null,
      rows: built.rows,
      rules: { ...valueRules, ...built.rules },
      value: own.doc,
      example: firstExample(node)
    });
  }
  outShapes.sort((a, b) => b.usedBy - a.usedBy);

  const rootBuilt = shapeRows(root, 0, new Set());
  const rootOwn = describe(root, 0, new Set());
  const rootValueRules = { ...rootOwn.rules };
  // The whole document can inherit through a pointer as well, and dropping it
  // lost a rule that applies to every file of this format.
  // Only a local self-pointer is dropped here. A root that is nothing but a
  // pointer to another file is a real and common thing: Renovate's published
  // schema is exactly `{"$ref": "https://..."}` and deleting it left a document
  // that said nothing at all.
  if (typeof root.$ref === 'string' && root.$ref.startsWith('#') && Object.keys(root).length === 1) {
    delete rootValueRules.$ref;
  }

  return {
    format: 'json-docs-table/1',
    title: root.title || opts.name || 'Schema',
    description: root.description || '',
    dialect: root.$schema || null,
    source: opts.source || null,
    // Which keyword closed the root matters as much as it does on a shape.
    // Every named shape carried closedBy and the root did not, so a document
    // closed with `unevaluatedProperties: false` rebuilt as
    // `additionalProperties: false`, which is stricter: it rejects the fields an
    // inherited shape contributes. The rebuilt schema would have turned away
    // documents the original accepts.
    root: { rows: rootBuilt.rows, closed: rootBuilt.closed,
      picks: rootBuilt.picks || null,
      // Same hoist as on a shape, and needed for the same reason: a rule saying
      // two top-level fields cannot both be used was sitting on the root's value
      // where no renderer looks, so the page never mentioned it.
      ...(() => {
        const sets = [...(rootBuilt.exclusives || []), ...(rootOwn.doc.exclusiveSets || [])];
        delete rootOwn.doc.exclusiveSets;
        return sets.length ? { exclusiveSets: sets } : {};
      })(),
      rules: { ...rootValueRules, ...rootBuilt.rules }, value: rootOwn.doc },
    shapes: outShapes,
    containers,
    dropped
  };
}

module.exports = { build, pointer, tail, TYPE_WORDS, readPattern, resolveScopedRefs, normaliseDialect };

if (require.main === module) {
  const fs = require('fs');
  const path = require('path');
  const cli = require('./cli.js');
  const opts = cli.parse(process.argv.slice(2), {
    usage: [
      'usage: schema-to-table <schema.json>... [-o <dir>|-]',
      '',
      'Turns any JSON Schema into the table format.',
    ].join('\n')
  });
  cli.checkCollisions(opts.inputs, '.json', '.table.json');
  for (const f of opts.inputs) {
    const name = cli.nameOf(f, '.json');
    const doc = build(cli.readJSON(f), { name, source: f === '-' ? null : f });
    const body = JSON.stringify(doc, null, 1);
    cli.write(opts, 'format', `${name}.table.json`, body);
    const rows = doc.shapes.reduce((n, s) => n + s.rows.length, 0) + doc.root.rows.length;
    cli.note(`${name.padEnd(24)} ${String(doc.shapes.length).padStart(4)} shapes  ${String(rows).padStart(5)} rows  ${String(doc.dropped.length).padStart(3)} dropped`);
  }
}
