# Canonical JSON Schema → HTML pipeline (draft spec)

Describes the HTML shape the Carbon-style layouts (`mockups/layout_1.js`–`layout_5.js`)
produce, independent of the JS implementation, so it can be reimplemented elsewhere
(VS Code extension, the Blaze C++ compiler, etc.) and validated by a test suite.

## Architecture note

All 5 layouts share one row-walking/rendering implementation
(`mockups/shared-renderer.js`). They are **one table design with 5 CSS skins**
(Classic / Dark / Compact / Borderless / Zebra), not 5 independently designed layouts.
Be upfront about this with Juan if he's expecting structurally different explorations,
what exists is one design, styled 5 ways.

## Constraints
- Output is plain HTML5 + CSS only. No `<script>`, no `on*` attributes. The only
  interactivity (row hover, collapsible `<details>`) is native HTML/CSS.
- There is no row-selection/batch-action UI. An earlier version had checkboxes and a
  "batch selected" bar that did nothing (the button behind it only fired a JS `alert()`
  and was never wired to a real action) — it's been removed rather than kept as decorative
  dead weight.
- One `<table>` row (`<tr class="carbon-row" id="node-<path>">`) per schema node reached by
  walking `properties` / `patternProperties` / `additionalProperties` / `items` recursively.
  `path` is the dot-joined property path from the schema root.

## Row columns
1. **Name** — the `path`, plus a `<details>` disclosure with the full `description` and raw
   constraint JSON.
2. **Type** — the resolved `type`. For a Draft 3 union (`type: [schemaA, schemaB, ...]`),
   this is every alternative's type joined with ` | ` (e.g. `string | object`), not just the
   last variant (see "Union types" below for why that distinction matters).
   Shows `recursiveRef to <a href="#node-...">` when a node revisits an ancestor.
3. **Status** — `REQUIRED` or `OPTIONAL`.
4. **Validation Constraints** — every remaining schema keyword on that node, rendered per the
   rules below.

## Constraint rendering rules
- `oneOf` / `anyOf` / `allOf` (array of branch schemas): rendered as a `<details>` labeled
  `<keyword> [N branches] [+ expand]`. Each branch renders as its own nested `<table>`
  (via the same row model, recursively) rather than a raw JSON dump.
- **Union types** (Draft 3's `type: [schemaA, schemaB, ...]`): rendered the same way, as a
  `type variants [N branches] [+ expand]` nested table, one branch per variant. This used to
  be broken: the walker overwrote a single `type` variable while recursing into each variant
  and merged all variants' `properties` into one shared object. In practice that meant a
  property like `bugs` (`type: [string, {object with url/email}]`) rendered as type `object`
  only (the `string` alternative silently vanished) and showed `bugs.url`/`bugs.email` as if
  they always existed, even when `bugs` was actually just a string. Fixed: each variant is
  now kept separate and rendered as its own branch, same as `oneOf`.
- `not` (single schema): rendered as a `<details>` labeled `not (Must NOT Match)`, containing
  one nested `<table>` for the negated schema.
- `if` / `then` / `else` (each a single schema): each rendered as its own `<details>`,
  labeled `if (Condition)`, `then (Applies When True)`, `else (Applies When False)`, in a
  distinct purple accent so conditional logic reads differently from branch alternation.
- `$ref` (string, external or internal reference URI): rendered as its own tag in an amber
  accent, with the URI shown as a link. The pipeline does not resolve/dereference the
  reference, it displays the pointer as-is.
- `$dynamicRef` / `$dynamicAnchor` (string): rendered as its own tag in a purple accent,
  visually distinct from a plain `$ref` since the resolution semantics differ (resolved
  against the nearest matching anchor in the dynamic scope, not a fixed target).
- Keys starting with `x-` (custom/vendor annotation keywords): rendered as a distinct green
  tag, visually separate from ordinary blue validation-constraint tags, so a reader can tell
  "this is metadata" from "this is a validation rule" at a glance.
- Any other object-valued keyword: collapsible `<details>` with a raw JSON `<pre>` block
  (fallback for keywords not yet given a dedicated representation).
- Any other scalar-valued keyword: inline tag `key: value`.

## Fixture schemas (synthetic, not real canonicalizer output)
Draft 3 doesn't have `$ref` in the 2020-12 sense, `$dynamicRef`, or `if`/`then`/`else`, and
none of the 10 real Draft 3 schemas in this repo happen to use `oneOf`/`anyOf`/`allOf`/`not`
either. To have something real to render against, three synthetic fixtures were added:
- `draft-3-docs/11-complex-constructs-canonical.json` — `oneOf`/`anyOf`/`allOf`/`not`/`x-`.
- `draft-3-docs/12-ref-and-dynamic-ref-canonical.json` — `$ref` and `$dynamicRef`/`$dynamicAnchor`.
- `draft-3-docs/13-conditional-if-then-else-canonical.json` — `if`/`then`/`else`.
These are clearly labeled in their own `description` field as synthetic, not real Draft 3
canonicalizer output, and they use 2020-12 keywords the real corpus doesn't. They exist to
prove the rendering rules work, not to represent what Blaze's canonicalizer actually emits.
The `$ref` target (`https://example.com/schemas/common/address.json`) is a placeholder,
nothing resolves it.

## Known gaps
- **External reference resolution**: the pipeline renders `$ref` as a pointer, it does not
  fetch/inline the referenced schema. Whether resolution should happen before this pipeline
  runs (so it only ever sees a fully-resolved tree) or whether the HTML should show
  unresolved pointers is an open design question, not yet decided.
- **Dynamic scope**: `$dynamicRef` is rendered as a label only. There's no representation yet
  of *which* anchor it would actually resolve to in a given usage context, that requires
  tracking the dynamic scope across the reference graph, which this pipeline doesn't do.
- Real Draft 3 canonicalizer output that exercises any of `$ref`/`$dynamicRef`/`if`/`then`/
  `else`/`oneOf`/`anyOf`/`allOf`/`not` doesn't exist yet, everything proving those rules out
  is the synthetic fixtures above.

## Test suite hook
`recursive-mockups/verify_recursive.js` walks every `*-canonical.json` schema in
`draft-3-docs/`, flattens the expected node paths/types (using the same union-type-fix logic
as the renderer, so it isn't asserting against the old broken behavior), and asserts each
appears in every generated layout's HTML. Any new schema dropped into `draft-3-docs/` is
automatically covered.
