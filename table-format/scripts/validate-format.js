#!/usr/bin/env node
// Check a table-format document against patterns/table-format.schema.json.
//
// The format is written as a JSON Schema so that it can check its own output.
// That was true in principle and not in practice, because nothing here actually
// validated anything: the spec was only read for its property names. This is a
// small validator covering exactly the keywords the format spec uses, so the
// claim becomes a check.
//
// It is deliberately not a general JSON Schema validator. Anything the spec
// does not use is not supported, and an unknown keyword is an error rather than
// something quietly ignored.
'use strict';
const fs = require('fs');
const path = require('path');

const SUPPORTED = new Set(['$schema', '$id', 'title', 'description', 'type', 'required',
  'properties', 'items', '$ref', '$defs', 'allOf', 'enum', 'const', 'propertyNames']);

function typeOf(v) {
  if (v === null) return 'null';
  if (Array.isArray(v)) return 'array';
  if (Number.isInteger(v)) return 'integer';
  return typeof v === 'number' ? 'number' : typeof v;
}

const matches = (actual, want) => {
  const list = Array.isArray(want) ? want : [want];
  return list.some(t => t === actual || (t === 'number' && actual === 'integer'));
};

function resolve(root, ref) {
  if (!ref.startsWith('#/')) throw new Error('unsupported $ref: ' + ref);
  let cur = root;
  for (const part of ref.slice(2).split('/')) {
    cur = cur[part.replace(/~1/g, '/').replace(/~0/g, '~')];
    if (cur === undefined) throw new Error('$ref goes nowhere: ' + ref);
  }
  return cur;
}

function validate(value, schema, root, at, errors) {
  if (schema === true || schema === undefined) return;
  if (schema === false) { errors.push(`${at}: nothing is allowed here`); return; }

  for (const k of Object.keys(schema)) {
    if (!SUPPORTED.has(k)) throw new Error(`the validator does not support "${k}" (used at ${at})`);
  }

  if (schema.$ref) return validate(value, resolve(root, schema.$ref), root, at, errors);
  for (const sub of schema.allOf || []) validate(value, sub, root, at, errors);

  if (schema.type && !matches(typeOf(value), schema.type)) {
    errors.push(`${at}: expected ${[].concat(schema.type).join(' or ')}, got ${typeOf(value)}`);
    return;
  }
  if (schema.const !== undefined && JSON.stringify(value) !== JSON.stringify(schema.const)) {
    errors.push(`${at}: expected ${JSON.stringify(schema.const)}, got ${JSON.stringify(value)}`);
  }
  if (schema.enum && !schema.enum.some(e => JSON.stringify(e) === JSON.stringify(value))) {
    errors.push(`${at}: ${JSON.stringify(value)} is not one of ${JSON.stringify(schema.enum)}`);
  }
  if (Array.isArray(value) && schema.items) {
    value.forEach((v, i) => validate(v, schema.items, root, `${at}[${i}]`, errors));
  }
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    for (const r of schema.required || []) {
      if (value[r] === undefined) errors.push(`${at}: missing required "${r}"`);
    }
    for (const [k, sub] of Object.entries(schema.properties || {})) {
      if (value[k] !== undefined) validate(value[k], sub, root, `${at}.${k}`, errors);
    }
  }
}

function check(doc, spec) {
  const errors = [];
  validate(doc, spec, spec, '', errors);
  return errors;
}

module.exports = { check };

if (require.main === module) {
  const cli = require('./cli.js');
  const opts = cli.parse(process.argv.slice(2), {
    usage: [
      'usage: validate-format <name.table.json>...',
      '',
      'Checks a table-format document against patterns/table-format.schema.json.',
      'Prints a line per file and exits 1 if any is invalid. It writes nothing,',
      'so unlike the other tools it has no -o.'
    ].join('\n'),
    noOut: true
  });
  const spec = JSON.parse(fs.readFileSync(
    path.resolve(__dirname, '../patterns/table-format.schema.json'), 'utf8'));
  let bad = 0;
  for (const f of opts.inputs) {
    const errors = check(cli.readJSON(f), spec);
    if (errors.length) {
      bad++;
      cli.note(`${cli.nameOf(f, '.table.json')}: ${errors.length} problems`);
      errors.slice(0, 10).forEach(e => cli.note('   ' + e));
    } else {
      cli.note(`${cli.nameOf(f, '.table.json').padEnd(24)} valid`);
    }
  }
  process.exitCode = bad ? 1 : 0;
}
