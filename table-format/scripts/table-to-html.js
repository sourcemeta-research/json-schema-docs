#!/usr/bin/env node
// The table format into a page.
//
// This renderer is only allowed to read the `doc` half of the format. If it ever
// needs to reach into `rules`, or back into the original schema, the format is
// missing something and that is the bug, not the page.
//
// The document architecture is the one the OMC work arrived at over twelve
// passes and it is not re-litigated here:
//   * an index of every shape first, with how often each is used
//   * the shapes everything else is built on before the things built on them
//   * one row per field, with limits drawn rather than written
//   * a thing inside a thing is a table inside that row
//   * borrowed fields behind one strip, opened in place
//   * a shape you point at is a link to where it is written out once
// No scripting, no JSON on the page, no em dashes.
'use strict';
const fs = require('fs');
const path = require('path');

const esc = x => String(x)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// A pointer's last segment, for when the shape it names is not in this
// document. The name used to be stored beside every pointer; it is looked up
// or derived now instead of being written down twice.
const nameFromRef = ref => decodePtr(String(ref).split('/').pop());
const decodePtr = t => String(t).replace(/~1/g, '/').replace(/~0/g, '~');
const anchor = ref => 'shape-' + String(ref).replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// Values a reader sees, never JSON. Braces and the word null are exactly what
// makes someone stop reading.
function plain(v) {
  if (v === true) return 'yes';
  if (v === false) return 'no';
  if (v === null) return 'nothing';
  if (Array.isArray(v)) return v.length ? v.map(plain).join(', ') : 'an empty list';
  if (v && typeof v === 'object') return 'a group of details';
  return String(v);
}

const withArticle = w => /^(a|an|the) /i.test(w) ? w
  : `${/^[aeiou]/i.test(w) ? 'an' : 'a'} ${w}`;

// ---------------------------------------------------------------- controls

function bar(r) {
  const lo = r.min == null ? 'any' : plain(r.min);
  const hi = r.max == null ? 'any number of' : plain(r.max);
  return `<span class="bar" title="from ${esc(lo)} to ${esc(hi)}">
    <span class="bend">${esc(lo)}</span><span class="btrack"></span>
    <span class="bend">${esc(hi)}${esc(r.unit || '')}</span></span>`;
}

const boolControl = () =>
  `<span class="boolctl" title="a yes or no answer"><span class="bo">yes</span><span class="bo">no</span></span>`;

function chips(values, dflt) {
  const one = v => `<span class="chip${v === dflt ? ' def' : ''}">${esc(plain(v))}${v === dflt ? '<em>default</em>' : ''}</span>`;
  if (values.length <= 6) return `<span class="chips">${values.map(one).join('')}</span>`;
  return `<details class="pick"><summary>one of ${values.length}</summary><span class="chips">${values.map(one).join('')}</span></details>`;
}

// ---------------------------------------------------------------- cells

function nameCell(n) {
  if (n.kind === 'fixed') return `<span class="nm">${esc(n.text)}</span>`;
  if (n.kind === 'condition') return `<span class="nm cond">${esc(n.text)}</span>`;
  return `<span class="nm ghost" ${n.pattern ? `title="must match ${esc(n.pattern)}"` : ''}>${esc(n.text)}</span>`;
}

function neededCell(n, under) {
  if (!n) return `<span class="rq opt">No, you can leave it out</span>`;
  if (n.kind === 'conditional') return `<span class="rq cond">Only in certain cases</span>`;
  if (n.kind === 'always') {
    return under
      ? `<span class="rq cond">Yes, once you fill in ${esc(under)}</span>`
      : `<span class="rq req">Yes, always</span>`;
  }
  return `<span class="rq opt">No, you can leave it out</span>`;
}

function valueCell(v, ctx) {
  if (!v) return '';
  const bits = [];
  const link = ref => {
    const s = ctx.byId.get(ref);
    const label = s ? s.name : String(ref).split('/').pop();
    const extra = s && s.isList ? ', and that shape is itself a list' : '';
    return `<a class="ty link" href="#${anchor(ref)}">${esc(withArticle(label))}${esc(extra)}</a>`;
  };

  switch (v.kind) {
    case 'ref':
      bits.push(link(v.ref));
      break;
    case 'choice-of-refs': {
      const parts = (v.refs || []).map(link);
      const joined = parts.length === 1 ? parts[0]
        : parts.slice(0, -1).join(', ') + ' or ' + parts[parts.length - 1];
      bits.push(`<span class="ty">either ${joined}</span>`);
      break;
    }
    case 'elsewhere':
      bits.push(`<span class="ty">follows rules kept in another file</span>`);
      bits.push(`<a class="extlink" href="${esc(v.href)}">${esc(v.href)}</a>`);
      break;
    case 'list': {
      if (v.item && v.item.kind === 'ref') bits.push(`<span class="ty">a list, each one ${link(v.item.ref)}</span>`);
      else if (v.item && v.item.kind === 'choice-of-refs') {
        const parts = (v.item.refs || []).map(link);
        const joined = parts.length === 1 ? parts[0] : parts.slice(0, -1).join(', ') + ' or ' + parts[parts.length - 1];
        bits.push(`<span class="ty">a list, each entry either ${joined}</span>`);
      } else if (v.item && v.item.kind === 'choice' && (v.item.options || []).length) {
        // "a list, each one an one of 2 forms" is both bad grammar and no
        // information. The forms of an entry are the same fact as the forms of a
        // field and deserve the same treatment.
        bits.push(`<span class="ty">a list, each entry one of ${v.item.options.length} forms</span>`);
        bits.push('<div class="forms">' + v.item.options.map(o => {
          if (!o) return '';
          if (o.kind === 'ref') return `<span class="form">${link(o.ref)}</span>`;
          if (o.kind === 'list' && o.item && o.item.kind === 'ref') return `<span class="form">a list, each one ${link(o.item.ref)}</span>`;
          const label = o.description || o.words || 'a value';
          const ex = o.example !== undefined ? ` <b>${esc(plain(o.example))}</b>` : '';
          return `<span class="form">${esc(label)}${ex}</span>`;
        }).join('') + '</div>');
      } else bits.push(`<span class="ty">a list${v.item && v.item.words ? ', each one ' + esc(withArticle(v.item.words)) : ''}</span>`);
      break;
    }
    case 'bool':
      bits.push(boolControl());
      break;
    case 'fixed':
      bits.push(`<span class="ty">${esc(v.fixed && v.fixed.length === 1 ? 'a fixed value' : 'one of these')}</span>`);
      bits.push(chips(v.fixed || [], v.default));
      break;
    case 'choice': {
      // "one of 4 forms" on its own is not a fact anyone can use. The forms
      // differ by their format, and the schema author usually wrote an example
      // of each, which is the only thing that tells them apart.
      // "one of 3 forms" with nothing after it tells a reader nothing at all.
      // A form that is a named shape is a link; one that is not says what it is.
      const opts = (v.options || []).filter(o => o && (o.words || o.ref || o.example !== undefined));
      bits.push(`<span class="ty">one of ${opts.length} forms</span>`);
      bits.push('<div class="forms">' + opts.map(o => {
        if (o.kind === 'ref') return `<span class="form">${link(o.ref)}</span>`;
        if (o.kind === 'list' && o.item && o.item.kind === 'ref') return `<span class="form">a list, each one ${link(o.item.ref)}</span>`;
        const label = o.description || o.words || 'a value';
        const ex = o.example !== undefined ? ` <b>${esc(plain(o.example))}</b>` : '';
        // A rule sitting on one form of a choice is still a rule. Rendering only
        // the form's name dropped every one of them.
        const extra = (o.exclusiveSets || []).map(set => ` <i>you cannot use ${esc(set.join(' and '))} together</i>`).join('');
        return `<span class="form">${esc(label)}${ex}${extra}</span>`;
      }).join('') + '</div>');
      break;
    }
    case 'conditional':
      break;
    case 'group': {
      // A group whose only content is a name the writer picks is a map, and
      // making a reader open a nested table to find one italic row is a poor way
      // to say so. Said on the row itself it is one sentence.
      const only = (v.rows || []).length === 1 ? v.rows[0] : null;
      if (only && (only.name.kind === 'any' || only.name.kind === 'pattern')) {
        const what = only.value && only.value.kind === 'ref' ? link(only.value.ref)
          : only.value && only.value.kind === 'choice-of-refs'
            ? 'either ' + (only.value.refs || []).map(link).join(' or ')
            : esc(withArticle((only.value && only.value.words) || 'a value'));
        bits.push(`<span class="ty">a group where you choose the names, each one ${what}</span>`);
        if (only.name.kind === 'pattern') bits.push(`<div class="notes"><span>${esc(only.name.text)}</span></div>`);
        break;
      }
      if (v.words) bits.push(`<span class="ty">${esc(v.words)}</span>`);
      break;
    }
    default:
      if (v.words) bits.push(`<span class="ty">${esc(v.words)}</span>`);
  }

  if (v.alsoFollowsRef) {
    const followsName = ctx.byId.has(v.alsoFollowsRef)
      ? ctx.byId.get(v.alsoFollowsRef).name : nameFromRef(v.alsoFollowsRef);
    bits.push(`<div class="notes"><span>and follows ${
      ctx.byId.has(v.alsoFollowsRef)
        ? '<a class="link" href="#' + anchor(v.alsoFollowsRef) + '">' + esc(withArticle(followsName)) + '</a>'
        : esc(withArticle(followsName))} as well</span></div>`);
  }
  if (v.range) bits.push(bar(v.range));

  const notes = [];
  // A field that only says "same rules as linearDistance" sends a reader off to
  // find out what to actually type. The shape it points at already carries an
  // example, so it is brought back to the row that asks the question.
  if (v.example === undefined && (v.kind === 'ref' || v.kind === 'choice-of-refs')) {
    const targets = v.kind === 'ref' ? [v.ref] : (v.refs || []);
    for (const t of targets) {
      const s2 = ctx.byId.get(t);
      if (s2 && s2.example !== undefined) { v = { ...v, example: s2.example }; break; }
    }
  }
  if (v.patternWords) notes.push(v.example !== undefined
    ? `written like "${plain(v.example)}"`
    : `${v.patternWords}, shown in the description`);
  else if (v.example !== undefined && v.kind !== 'fixed') notes.push(`for example ${plain(v.example)}`);
  if (v.forbidden) notes.push(`must not be ${v.forbidden.map(plain).join(' or ')}`);
  for (const set of v.exclusiveSets || []) notes.push(`you cannot use ${set.join(' and ')} together`);
  if (v.howManyFields) {
    const { min, max } = v.howManyFields;
    notes.push(min != null && max != null ? `between ${min} and ${max} fields`
      : min != null ? `at least ${min} ${min === 1 ? 'field' : 'fields'}`
      : `at most ${max} ${max === 1 ? 'field' : 'fields'}`);
  }
  if (v.whoWrites === 'read') notes.push('you do not fill this in, it is sent back to you');
  if (v.whoWrites === 'write') notes.push('you fill this in, it is never sent back');
  if (v.holds) {
    notes.push(`the text inside is ${v.holds.type || 'in a set format'}${
      v.holds.encoding ? `, written as ${v.holds.encoding}` : ''}`);
  }
  if (v.uniqueItems) notes.push('no two entries the same');
  if (v.closed) notes.push('nothing else may be added here');
  if (v.itemClosed) notes.push('nothing else may be added to an entry');
  if (v.nullable) notes.push('the value itself may be empty');
  if (v.default !== undefined && v.kind !== 'fixed') notes.push(`left out means ${plain(v.default)}`);
  if (notes.length) bits.push(`<div class="notes">${notes.map(n => `<span>${esc(n)}</span>`).join('')}</div>`);

  return bits.join('');
}

// ---------------------------------------------------------------- rows

const COLS = `<colgroup><col style="width:21%"><col style="width:30%"><col style="width:22%"><col style="width:27%"></colgroup>`;
const HEAD = `<tr><th>Field</th><th>What goes in it</th><th>Needed?</th><th>What it means</th></tr>`;
const table = rows => rows ? `<table class="doc">${COLS}${HEAD}${rows}</table>` : '';
const subTable = rows => rows ? `<table class="doc sub">${COLS}${rows}</table>` : '';

function nest(title, count, inner, kind) {
  const cls = kind ? ` ${kind}` : '';
  return `<tr class="nest${cls}"><td colspan="4">
    <details class="nestbox${kind ? ' ' + kind + 'box' : ''}"${kind === 'dep' ? '' : ' open'}>
      <summary>${title}${count ? ` <span class="cnt">${esc(count)}</span>` : ''}</summary>
      ${inner}</details></td></tr>`;
}

function renderRows(rows, ctx, under) {
  let out = '';
  const own = (rows || []).filter(r => !r.borrowed);
  const borrowed = (rows || []).filter(r => r.borrowed);

  for (const r of own) out += renderRow(r, ctx, under);

  if (borrowed.length) {
    const from = borrowed[0].from || 'a shared shape';
    out += `<tr class="nest"><td colspan="4">
      <details class="borrow"><summary>and the ${borrowed.length} fields every ${esc(from)} carries</summary>
      ${subTable(borrowed.map(r => renderRow(r, ctx, under)).join(''))}</details></td></tr>`;
  }
  return out;
}

function renderRow(r, ctx, under) {
  const need = neededCell(r.needed, under);
  ctx.stats[r.needed && r.needed.kind === 'always' ? (under ? 'cond' : 'req')
    : r.needed && r.needed.kind === 'conditional' ? 'cond' : 'opt'] =
    (ctx.stats[r.needed && r.needed.kind === 'always' ? (under ? 'cond' : 'req')
      : r.needed && r.needed.kind === 'conditional' ? 'cond' : 'opt'] || 0) + 1;

  const desc = [r.description, r.deprecated ? 'No longer used.' : ''].filter(Boolean).map(esc).join(' ');
  let out = `<tr>
    <td>${nameCell(r.name)}</td>
    <td>${valueCell(r.value, ctx)}</td>
    <td>${need}</td>
    <td class="de">${desc}</td>
  </tr>`;

  const childUnder = (r.needed && r.needed.kind === 'always') || under ? under : r.name.text;
  const v = r.value || {};

  if (v.kind === 'conditional') {
    if ((v.thenRows || []).length) out += nest(`then these apply`, `${v.thenRows.length} fields`, subTable(renderRows(v.thenRows, ctx, childUnder)), 'dep');
    if ((v.elseRows || []).length) out += nest(`otherwise these apply`, `${v.elseRows.length} fields`, subTable(renderRows(v.elseRows, ctx, childUnder)), 'dep');
    // A branch that only makes existing fields required has no rows to show,
    // and saying so in a sentence is the whole of it.
    const mustFill = (names, lead) => nest(
      `${lead} <b>${esc(names.join('</b> and <b>'))}</b> ${names.length > 1 ? 'become' : 'becomes'} required`,
      '', '', 'dep');
    if ((v.thenRequires || []).length) out += mustFill(v.thenRequires, 'then');
    if ((v.elseRequires || []).length) out += mustFill(v.elseRequires, 'otherwise');
  } else if ((v.rows || []).length) {
    out += nest(`inside <b>${esc(r.name.text)}</b>`, `${v.rows.length} fields`, subTable(renderRows(v.rows, ctx, childUnder)));
  } else if (v.item && (v.item.rows || []).length) {
    out += nest(`inside <b>each entry of ${esc(r.name.text)}</b>`, `${v.item.rows.length} fields`, subTable(renderRows(v.item.rows, ctx, childUnder)));
  } else if (v.kind === 'choice' && (v.options || []).some(o => o && (o.rows || []).length)) {
    // A form of a choice can hold fields of its own, and showing only the form
    // name meant a whole branch of the document was never written down. On the
    // GitHub schema that hid everything under one of the ways "on" can be given.
    v.options.forEach((o, i) => {
      if (!o || !(o.rows || []).length) return;
      out += nest(`form ${i + 1} of <b>${esc(r.name.text)}</b>${o.description ? ': ' + esc(o.description) : ''}`,
        `${o.rows.length} fields`, subTable(renderRows(o.rows, ctx, childUnder)), 'dep');
    });
  } else if ((v.slots || []).length) {
    const slotRows = v.slots.map((sv, i) => renderRow({ name: { kind: 'fixed', text: `slot ${i + 1}` }, needed: { kind: 'always' }, value: sv, description: '' }, ctx, childUnder)).join('');
    out += nest(`the fixed slots of <b>${esc(r.name.text)}</b>`, `${v.slots.length} slots`, subTable(slotRows));
    if (v.slotsOnly) {
      out += nest(`after those slots, <b>${esc(r.name.text)}</b> holds nothing more`, '', '', 'dep');
    } else if (v.restItem) {
      const restRow = renderRow({ name: { kind: 'fixed', text: 'every entry after those' },
        needed: { kind: 'never' }, value: v.restItem, description: '' }, ctx, childUnder);
      out += nest(`what <b>${esc(r.name.text)}</b> holds after the fixed slots`, '', subTable(restRow), 'dep');
    }
  }

  if (r.brings) {
    if (r.brings.kind === 'required') {
      out += nest(`Filling in <b>${esc(r.name.text)}</b> makes ${r.brings.names.length} more needed`, '',
        subTable(r.brings.names.map(n => `<tr><td><span class="nm">${esc(n)}</span></td><td></td><td><span class="rq cond">Yes, once you fill in ${esc(r.name.text)}</span></td><td></td></tr>`).join('')), 'dep');
    } else if ((r.brings.rows || []).length) {
      out += nest(`Filling in <b>${esc(r.name.text)}</b> brings in ${r.brings.rows.length} more`, '',
        subTable(renderRows(r.brings.rows, ctx, r.name.text)), 'dep');
    }
  }
  return out;
}

// ---------------------------------------------------------------- document

function render(doc) {
  const ctx = { byId: new Map(doc.shapes.map(s => [s.id, s])), stats: {} };

  const groups = new Map();
  for (const s of doc.shapes) {
    const g = s.group || 'Shapes';
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g).push(s);
  }

  const index = doc.shapes.length > 8 ? `<section><h2>All ${doc.shapes.length} shapes</h2>
    <p class="snote">Every shape this document describes. The ones used most often come first, because everything else is built on them. Click any name to jump to its rules.</p>
    <div class="ix">${[...groups].map(([g, list]) => `<div class="ixgroup"><div class="ixh">${esc(g)}</div><ul>${
      list.map(s => `<li><a href="#${anchor(s.id)}">${esc(s.name)}</a>${s.usedBy ? ` <span class="ixn">used ${s.usedBy}</span>` : ''}</li>`).join('')
    }</ul></div>`).join('')}</div></section>` : '';

  const rootRows = renderRows(doc.root.rows, ctx, null);
  // A schema that points at itself makes the whole document a shape as well as
  // the root. Naming it is deliberate and load-bearing: without it every self
  // reference expanded the document again instead of linking back. But drawing
  // it twice is not, so the root section takes the anchor and the duplicate
  // block below is dropped. Links to `#` still land somewhere real.
  const rootSection = rootRows ? `<section id="${anchor('#')}"><h2>What this file holds</h2>
    ${doc.root.closed ? '<p class="snote">Nothing else may be added at the top level.</p>' : ''}
    ${(doc.root.exclusiveSets || []).map(set =>
      `<p class="snote">You cannot use ${esc(set.join(' and '))} together.</p>`).join('')}
    ${(() => {
      // Facts about the whole file that live on the root's own value. The root
      // has needed this three times now: for how it is closed, for exclusions,
      // and now for how many fields it must have.
      const rv = doc.root.value || {};
      const out = [];
      if (rv.howManyFields) {
        const { min, max } = rv.howManyFields;
        out.push(min != null && max != null ? `Between ${min} and ${max} fields in all.`
          : min != null ? `At least ${min} ${min === 1 ? 'field' : 'fields'} in all.`
          : `At most ${max} ${max === 1 ? 'field' : 'fields'} in all.`);
      }
      return out.map(t => `<p class="snote">${esc(t)}</p>`).join('');
    })()}
    ${table(rootRows)}</section>` : '';
  const drawnAsRoot = s => rootRows && s.id === '#';

  const picksSection = doc.root.picks && doc.root.picks.length ? `<section><h2>Which kind of thing this is</h2>
    <p class="snote">The field <b>${esc(doc.root.picks[0].field)}</b> decides which shape applies. There ${doc.root.picks.length === 1 ? 'is one choice' : `are ${doc.root.picks.length} choices`}.</p>
    <div class="chips">${doc.root.picks.map(p => `<a class="chip pickchip" href="#${anchor(p.ref)}">${esc(plain(p.value))}</a>`).join('')}</div></section>` : '';

  const shapeBlocks = [...groups].map(([g, list]) => `<div class="defblock">
    ${groups.size > 1 ? `<h3>${esc(g)}</h3>` : ''}
    ${list.filter(s => !drawnAsRoot(s)).map(s => `<div class="shapeblock" id="${anchor(s.id)}">
      <h4>${esc(s.name)}</h4>
      ${s.description ? `<p class="snote">${esc(s.description)}</p>` : ''}
      ${(s.exclusiveSets || []).map(set => `<p class="snote">You cannot use ${esc(set.join(' and '))} together.</p>`).join('')}
      ${s.value && s.value.alsoFollowsRef ? `<p class="snote">This also follows every rule of ${
        ctx.byId.has(s.value.alsoFollowsRef)
          ? '<a class="link" href="#' + anchor(s.value.alsoFollowsRef) + '">' + esc(ctx.byId.get(s.value.alsoFollowsRef).name) + '</a>'
          : esc(nameFromRef(s.value.alsoFollowsRef))}.</p>` : ''}
      ${[s.isList ? 'This one is a list. The fields below describe a single entry.' : '',
         s.closed ? 'Nothing else may be added to it.' : '',
         s.usedBy ? `Used in ${s.usedBy} ${s.usedBy === 1 ? 'place' : 'places'}.` : ''
        ].filter(Boolean).map(t => `<p class="snote">${esc(t)}</p>`).join('')}
      ${s.rows.length ? table(renderRows(s.rows, ctx, null))
        : `<p class="leafval">${s.value ? valueCell(s.value, ctx)
            : esc(s.example !== undefined ? `A single value, for example ${plain(s.example)}.` : 'A single value.')}</p>`}
    </div>`).join('')}
  </div>`).join('');

  const st = ctx.stats;
  const counted = (st.req || 0) + (st.opt || 0) + (st.cond || 0);
  const counts = `<div class="counts">
    ${st.req ? `<span class="c req"><b>${st.req}</b> you must always fill in</span>` : ''}
    ${st.opt ? `<span class="c opt"><b>${st.opt}</b> you can leave out</span>` : ''}
    ${st.cond ? `<span class="c cond"><b>${st.cond}</b> that only apply in certain cases</span>` : ''}
    ${!counted ? `<span class="c opt"><b>${doc.shapes.length}</b> shapes, written out below</span>` : ''}
  </div>`;

  const legend = `<div class="legend">
    <span><b>A table inside a row</b> means those fields live inside that one.</span>
    <span><b>Click a strip</b> to open what it holds.</span>
    <span><b>Bars</b> show the lowest and highest allowed.</span>
    <span><b>Names in blue</b> link to the shape they name.</span>
  </div>`;

  const dropped = (doc.dropped || []).length ? `<section><h2>What this page does not show</h2>
    <p class="snote">These rules are in the original and there is no honest short way to write them, so they are listed here rather than shown as something they are not.</p>
    <ul class="drops">${[...new Set(doc.dropped.map(d => `${d.why} (${d.where})`))].map(d => `<li>${esc(d)}</li>`).join('')}</ul></section>` : '';

  return `<!doctype html><meta charset="utf-8"><title>${esc(doc.title)}</title>
<style>${CSS}</style>
<div class="page">
<h1>${esc(doc.title)}</h1>
${doc.description ? `<p class="subtitle">${esc(doc.description)}</p>` : ''}
${counts}${legend}${picksSection}${rootSection}${index}
<section><h2>Every shape, written out once</h2>
<p class="snote">Each shape appears here once. Anywhere else on this page that names one, it means exactly this.</p>
${shapeBlocks}</section>
${dropped}
</div>`;
}

const CSS = `
:root { --line:#DDDDD6; --ink:#1a1a1a; --muted:#6b6b64; --accent:#0F49C0; }
* { box-sizing:border-box; margin:0; padding:0; }
body { font-family:"IBM Plex Sans","Segoe UI",sans-serif; background:#F7F7F5; color:var(--ink); padding:2rem 1.2rem; line-height:1.45; }
.page { max-width:1180px; margin:0 auto; }
h1 { font-size:1.5rem; font-weight:600; }
h2 { font-size:1rem; font-weight:600; margin:0 0 .15rem; }
h3 { font-size:.9rem; font-weight:600; margin:0 0 .3rem; }
h4 { font-size:.86rem; font-weight:600; margin:0 0 .15rem; font-family:"IBM Plex Mono",monospace; }
.subtitle { color:#555; margin:.3rem 0 1rem; max-width:70ch; }
.snote { color:var(--muted); font-size:.79rem; margin-bottom:.35rem; max-width:78ch; }
section { margin:1.6rem 0; }
.defblock { margin:1rem 0; padding-left:.7rem; border-left:3px solid #D9D9CF; }
.shapeblock { margin:.9rem 0 1.1rem; padding-left:.6rem; border-left:2px solid #E4E4DC; }
.shapeblock:target { border-left-color:var(--accent); background:#F3F7FD; }
table.doc { width:100%; border-collapse:collapse; background:#FFF; border:1px solid var(--line); font-size:.82rem; table-layout:fixed; }
table.doc th { background:#EFEFE9; text-align:left; font-size:.68rem; letter-spacing:.05em; text-transform:uppercase; color:#6b6b64; padding:.4rem .65rem; border-bottom:1px solid var(--line); }
table.doc td { padding:.34rem .65rem; border-bottom:1px solid #F0F0EA; vertical-align:top; word-wrap:break-word; overflow-wrap:anywhere; }
table.doc tr:hover > td { background:#F3F7FD; }
table.doc.sub { border:1px solid #E4E4DC; margin:0; }
.nm { font-weight:600; }
.nm.ghost { font-style:italic; font-weight:400; color:#7a7a70; }
.nm.cond { font-weight:600; color:#8a5A00; }
.ty { color:var(--accent); display:block; }
a.ty.link { text-decoration:underline; text-underline-offset:2px; }
.extlink { font-size:.72rem; color:#0B5FA5; word-break:break-all; max-width:100%; display:inline-block; }
.de { color:#333; }
.notes { margin-top:.2rem; }
.notes span { display:block; font-size:.73rem; color:#7a7a70; }
.rq { font-size:.77rem; }
.rq.req { color:#A31515; font-weight:600; }
.rq.opt { color:#8a8a80; }
.rq.cond { color:#8a5A00; font-weight:600; }
.bar { display:flex; align-items:center; gap:.4rem; margin-top:.3rem; font-size:.7rem; color:#5a5a52; }
.bend { font-family:"IBM Plex Mono",monospace; white-space:nowrap; }
.btrack { flex:1; min-width:38px; height:9px; border-radius:3px; border:1px solid #C9C9C0;
  background:repeating-linear-gradient(90deg,#F2F2EC 0,#F2F2EC 7px,#DCDCD2 7px,#DCDCD2 8px); }
.boolctl { display:inline-flex; margin-top:.3rem; border:1px solid #C9D4E8; border-radius:5px; overflow:hidden; }
.boolctl .bo { padding:.1rem .55rem; font-size:.73rem; background:#F4F8FE; color:#31527F; border-right:1px solid #C9D4E8; }
.boolctl .bo:last-child { border-right:none; }
.chips { display:flex; flex-wrap:wrap; gap:.22rem; margin-top:.3rem; max-width:100%; }
.chip { font-size:.72rem; background:#F1F1EA; border:1px solid #DEDED4; border-radius:4px; padding:.05rem .42rem; font-family:"IBM Plex Mono",monospace; max-width:100%; overflow-wrap:anywhere; }
.chip.def { background:#EAF3EC; border-color:#C3DFCB; color:#1F6B42; }
.chip em { font-family:"IBM Plex Sans",sans-serif; font-style:normal; font-size:.64rem; margin-left:.3rem; color:#4d8a63; }
a.pickchip { text-decoration:none; color:var(--accent); border-color:#C9D4E8; background:#F4F8FE; }
a.pickchip:hover { background:#EAF1FD; text-decoration:underline; }
details.pick > summary { cursor:pointer; font-size:.73rem; color:var(--accent); margin-top:.25rem; }
tr.nest > td { padding:.35rem .65rem .5rem 1.5rem; background:#FBFBF7; border-bottom:1px solid #EDEDE5; }
.nestbox > summary { cursor:pointer; font-size:.73rem; color:#6b6b64; padding:.15rem 0 .35rem; list-style:none; }
.nestbox > summary::before { content:"▸  "; color:#9a9a90; }
.nestbox[open] > summary::before { content:"▾  "; }
.nestbox .cnt { color:#9a9a90; }
tr.nest.dep > td { background:#FFFBF1; border-left:3px solid #E8C87A; }
.depbox > summary { color:#8a5A00; font-weight:600; font-size:.76rem; }
.depbox > summary::before { color:#C79B33; }
details.borrow { margin:.3rem 0 .2rem; border:1px dashed #D3D8E4; border-radius:5px; background:#FBFCFE; }
details.borrow > summary { cursor:pointer; padding:.28rem .6rem; font-size:.75rem; color:#4A5A7A; list-style:none; }
details.borrow > summary::before { content:"▸  "; color:#8b96ad; }
details.borrow[open] > summary::before { content:"▾  "; }
details.borrow table.doc { border:none; }
.ix { column-width:190px; column-gap:1.4rem; }
.ixgroup { break-inside:avoid; margin-bottom:.9rem; }
.ixgroup .ixh { font-size:.7rem; text-transform:uppercase; letter-spacing:.05em; color:#6b6b64; margin-bottom:.25rem; }
.ix ul { list-style:none; }
.ix li { font-size:.78rem; line-height:1.5; }
.ix a { color:var(--accent); text-decoration:none; }
.ix a:hover { text-decoration:underline; }
.ixn { font-size:.66rem; color:#a8a89e; }
.counts { display:flex; gap:.45rem; flex-wrap:wrap; margin:.2rem 0 .6rem; }
.counts .c { font-size:.79rem; padding:.28rem .7rem; border-radius:999px; border:1px solid; }
.counts .c b { font-size:.94rem; margin-right:.12rem; }
.counts .req { background:#FDEDEC; border-color:#F0C8C2; color:#A31515; }
.counts .opt { background:#F1F1EC; border-color:#DDDDD4; color:#5f5f57; }
.counts .cond { background:#FFF6E0; border-color:#EBD9A8; color:#8a5A00; }
.legend { display:flex; gap:1.2rem; flex-wrap:wrap; font-size:.75rem; color:var(--muted); margin-bottom:.9rem; padding:.45rem .75rem; background:#FFF; border:1px solid var(--line); border-radius:7px; }
.legend b { color:var(--ink); font-weight:600; }
.forms { margin-top:.25rem; }
.forms .form { display:block; font-size:.72rem; color:#5a5a52; padding:.06rem 0; }
.forms .form b { font-family:"IBM Plex Mono",monospace; color:#1F6B42; font-weight:600; }
.forms .form i { font-style:normal; color:#8a5A00; }
.drops { font-size:.78rem; color:#7a7a70; padding-left:1.2rem; }
`;

module.exports = { render, CSS, anchor };

if (require.main === module) {
  const cli = require('./cli.js');
  const opts = cli.parse(process.argv.slice(2), {
    usage: [
      'usage: table-to-html <name.table.json>... [-o <dir>|-]',
      '',
      'Renders the table format as a page. Reads only the doc half of the',
      'format, never the rules half.',
    ].join('\n')
  });
  cli.checkCollisions(opts.inputs, '.table.json', '.html');
  for (const f of opts.inputs) {
    const doc = cli.readTable(f);
    const name = cli.nameOf(f, '.table.json');
    const html = render(doc);
    cli.write(opts, 'pages', `${name}.html`, html);
    cli.note(`${name.padEnd(24)} ${String(Math.round(html.length / 1024)).padStart(5)}KB  ${String((html.match(/<tr/g) || []).length).padStart(5)} rows`);
  }
}
