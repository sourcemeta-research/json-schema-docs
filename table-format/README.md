# JSON Schema table format

Turn any JSON Schema into a format that reads as a document, renders to HTML or
Markdown, and rebuilds back into a working schema.

```
schema  ->  schema-to-table  ->  the format  ->  table-to-html      ->  a page
                                             ->  table-to-markdown  ->  Markdown
                                             ->  table-to-schema    ->  a schema again
```

No dependencies. Node 16 or newer.

```
scripts/    the tool: five commands and the argument parser they share
checks/     the harnesses that produce everything in reports/ and examples/
examples/   what the tools make, including all 23 schemas rendered
```

---

## Quick start

```bash
node scripts/schema-to-table.js samples/real/package.json -o out/
node scripts/table-to-html.js out/package.table.json -o out/
```

Then open `out/package.html` in a browser (`start` on Windows, `open` on macOS,
`xdg-open` on Linux). Any schema works; `samples/` has twenty-three to try.

**If you only look at one thing, look at [`examples/`](examples/README.md).** It
holds a thirty-line schema and everything the tools make from it, all small
enough to read side by side, plus three real pages you can open.

Or in one line, where `-` means "read stdin" as an input and "write stdout" as
an output:

```bash
node scripts/schema-to-table.js samples/real/package.json -o - \
  | node scripts/table-to-html.js - -o - > package.html
```

---

## The one thing to know first

The format has two halves, kept apart on purpose.

- **`doc`** is what a page shows a person. It is allowed to simplify. It says
  "a list, each one a service" instead of restating four keywords.
- **`rules`** is the validating residue: everything needed to rebuild a schema
  that accepts and rejects the same documents.

**A renderer may read `doc` and must never read `rules`.** That is enforced, not
just intended: the selftest strips `rules` out entirely and fails if either
renderer produces different output.

This is what lets the reading half be made as plain as you like without ever
changing what a file is allowed to contain.

---

## The tools

Every tool takes the same options, except `validate-format`, which writes
nothing and so has no `-o`. Every tool's `--help` lists these too.

| Option | Means |
|---|---|
| `-o <dir>` | write results into `<dir>` |
| `-o -` | write the result to stdout instead (one input only) |
| `-` as an input | read the input from stdin |
| `--` | everything after it is a filename, even if it starts with `-`. **It has to come last**, so write `-o out/ -- -odd-name.json` |
| `-h`, `--help` | print usage and exit |

Without `-o`, results go to `./build/<kind>` **in the directory you are standing
in**, never inside the tool's own folder. Progress lines go to stderr, so a pipe
carries only the result.

`npm link` or `npm install -g .` puts all five on your path, so
`schema-to-table my-schema.json -o out/` works from anywhere. The examples here
use `node scripts/...` so they work in a fresh clone with nothing installed.

### `schema-to-table` — a schema into the format

```bash
node scripts/schema-to-table.js <schema.json>... [-o <dir>|-]
```

Handles draft-3 through 2020-12. Writes `<name>.table.json`.

```bash
# one schema
node scripts/schema-to-table.js openapi.json -o out/

# several at once
node scripts/schema-to-table.js schemas/*.json -o out/

# to stdout
node scripts/schema-to-table.js openapi.json -o - > openapi.table.json
```

### `table-to-html` — the format into a page

```bash
node scripts/table-to-html.js <name.table.json>... [-o <dir>|-]
```

Writes `<name>.html`. No scripting, no JSON on screen, no pointers, no raw
regular expressions. Reads only the `doc` half.

### `table-to-markdown` — the format into Markdown

```bash
node scripts/table-to-markdown.js <name.table.json>... [-o <dir>|-]
```

Writes `<name>.md`. This exists to prove the format is not secretly a
description of our HTML: it is written against the same `doc` half, in a medium
with no colour, no nesting and no expanding rows.

### `table-to-schema` — the format back into a schema

```bash
node scripts/table-to-schema.js <name.table.json>... [-o <dir>|-] [--compare]
```

Writes `<name>.rebuilt.json`. **The format alone is enough** — the original
schema is not needed and is not read.

Pass `--compare` to also check the rebuild against the original named in the
format's `source` field and report what differs. That is the only mode that
opens the original file, and it must be run from the directory the format was
built in.

```bash
node scripts/table-to-schema.js out/my-schema.table.json --compare
# schema      places   same   lost  changed   kept
# my-schema      453    452      1        0  99.6%
```

Set `VERBOSE=1` to list example differences.

### `validate-format` — check a format document

```bash
node scripts/validate-format.js <name.table.json>...
```

Checks it against `patterns/table-format.schema.json`. Exits 1 if anything is
wrong, naming each problem.

---

## The format

Defined in [`patterns/table-format.schema.json`](patterns/table-format.schema.json),
which is itself a JSON Schema, so the format checks its own output.

- **`root`** is what a whole file looks like. **`shapes`** are the named things
  it is built from, most pointed-at first.
- A shape exists when the schema itself named it, meaning it sits in `$defs` or
  `definitions`, or when something points at it more than once. There is no
  length rule and no nesting heuristic; everything else is drawn inline. This
  keeps the split reproducible and survives the trip back to a schema.
- **A field's name is not always a name.** It may be `fixed`, `any` (the writer
  chooses it), `pattern` (it has to look a certain way), or `condition`.
- **`dropped`** lists rules with no honest short reading. Listing them is what
  stops a page quietly claiming to be complete.
- **`containers`** and **`rules`** are the validating half. A renderer never
  reads either.

A pointer to another file becomes kind `elsewhere`, keeps its URL, and renders
as a link out. A pointer inside a schema that carries its own `$id` is resolved
against that `$id`, not against the top of the file.

---

## Checking it

```bash
npm run build        # the pipeline over every real schema
npm test             # 93 checks. add --list to see each one by name
npm run stress       # the pipeline over 23 real schemas
npm run cli          # every command, every flag, 62 of them
npm run matrix       # every keyword of every dialect
npm run behaviour    # do the rebuilt schemas behave like the originals
npm run simplicity   # is any field in the format redundant
npm run provenance   # are the schemas here the ones we say they are
```

Each is also a plain script under `checks/`, if you would rather not use npm.
`npm run examples` regenerates everything in `examples/`.

`npm run behaviour` needs a validator that is not ours, so that neither schema
is judged by our own code. Install it first; it is deliberately not saved as a
dependency:

```bash
npm install --no-save ajv@8 ajv-draft-04@1 ajv-formats@3
```

Several of these rewrite files in `reports/`: `stress`, `cli`, `matrix`,
`behaviour` and `simplicity`. `npm run examples` rewrites `examples/`. That is
intended, and the results are meant to be committed.

`npm run provenance` checks the 23 schemas against `samples/PINNED.json`, which
records what each hashed to when it was pinned. Add `--online` to also ask each
source what it serves today. Two of them have changed upstream since; that is
reported as news rather than as a failure, because our copies are the ones every
number was measured against and they are intact.

### What the selftest actually covers

| Check | Scope |
|---|---|
| No `<script>`, event handler or `javascript:` URL in the markup | all six |
| No JSON and no local pointer shown to a reader | all six, page and Markdown |
| No raw pattern shown to a reader | all six, **page only, not Markdown** |
| No repeated id, no link that lands nowhere | all six |
| Every built format validates against the format spec | all six |
| Both renderers ignore the `rules` half entirely | all six, both renderers |
| Every exclusion the format holds reaches the page | all six, **exclusions only** |
| The command line tools behave as this README says | 20 checks here; `npm run cli` runs 62 more |
| The round trip keeps meaning | all six, threshold 99.5% |
| The repository still holds the files it describes | package.json, README, scripts |

---

## Where the numbers come from

`samples/real/` holds five of the six schemas every reported number is measured
against, with `PROVENANCE.md` recording each source. The sixth is OMC, the
largest, which lives at `patterns/omc/omc-v2.6.json`. `samples/stress/` holds
seventeen more chosen to break things rather than to be quoted: four
meta-schemas including draft-04 and draft-06, two whose entire root is a pointer
to another file, and several large enough to be uncomfortable.

Every report in `reports/` is regenerated by a command in this repository, and
nothing else is kept there. A report nothing here can reproduce is an assertion
rather than evidence.

| Report | Made by |
|---|---|
| `stress-test.md` | `npm run stress` |
| `keyword-coverage.md` | `npm run matrix` |
| `behaviour.md` | `npm run behaviour` |
| `simplicity.md` | `npm run simplicity` |
| `cli-matrix.md` | `npm run cli` |

The same rule applies to `examples/`: every file in it is produced by
`npm run examples`, including the 23 rendered pages.

| | |
|---|---|
| Meaning kept on rebuild, six schemas | 99.9% average, lowest 99.6% |
| Meaning kept, all 23 | 98.9% average |
| Documents where the original and rebuild agreed | 777 of 777 |
| Keywords surviving the round trip | 74 of 74 |

Start with [`examples/`](examples/README.md) to see the output, then
[`reports/behaviour.md`](reports/behaviour.md) for the strongest evidence.
