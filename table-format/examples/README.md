# What the tools actually produce

Every file here was made by the tools in `scripts/`. Regenerate the lot with
`npm run examples`.

## Start with the small one

`hello.schema.json` is thirty lines. Its four outputs are small enough to read
side by side, which is the fastest way to understand the format.

| File | What it is |
|---|---|
| [`hello.schema.json`](hello.schema.json) | the schema you start with |
| [`hello.schema.table.json`](hello.schema.table.json) | **the format**, what the schema becomes |
| [`hello.schema.html`](hello.schema.html) | the page a person reads |
| [`hello.schema.md`](hello.schema.md) | the same thing as Markdown |
| [`hello.schema.rebuilt.json`](hello.schema.rebuilt.json) | a working schema, rebuilt from the format alone |

The schema says this about one field:

```json
"id": {
  "type": "string",
  "pattern": "^[a-z0-9-]+$",
  "description": "How this order is referred to everywhere else."
}
```

The Markdown says this:

```
| id | text; made of letters, numbers, dashes | yes, always |
  How this order is referred to everywhere else. |
```

No pattern, no keyword names, no JSON. The page says the same thing with the
length drawn as a bar and any shape name as a link.

## Every schema in the corpus, rendered

All 23 of them. The Markdown is worth clicking first, because GitHub renders
it here in the browser; the HTML is the real output and needs downloading.

| Schema | Dialect | Schema size | Shapes | Page | Markdown |
|---|---|---|---|---|---|
| `omc-v2.6` | 2019-09 | 197KB | 91 | [438KB](pages/omc-v2.6.html) | [120KB](markdown/omc-v2.6.md) |
| `compose-spec` | 2020-12 | 75KB | 26 | [133KB](pages/compose-spec.html) | [33KB](markdown/compose-spec.md) |
| `github-workflow` | draft-07 | 111KB | 30 | [131KB](pages/github-workflow.html) | [31KB](markdown/github-workflow.md) |
| `metaschema-draft07` | draft-07 | 5KB | 6 | [23KB](pages/metaschema-draft07.html) | [3KB](markdown/metaschema-draft07.md) |
| `openapi31` | 2020-12 | 33KB | 54 | [167KB](pages/openapi31.html) | [31KB](markdown/openapi31.md) |
| `package` | draft-07 | 47KB | 30 | [98KB](pages/package.html) | [29KB](markdown/package.md) |
| `asyncapi-2.6` | draft-07 | 129KB | 73 | [200KB](pages/asyncapi-2.6.html) | [45KB](markdown/asyncapi-2.6.md) |
| `chrome-manifest` | draft-07 | 33KB | 14 | [68KB](pages/chrome-manifest.html) | [20KB](markdown/chrome-manifest.md) |
| `dependabot-2.0` | draft-07 | 50KB | 45 | [116KB](pages/dependabot-2.0.html) | [27KB](markdown/dependabot-2.0.md) |
| `eslintrc` | draft-07 | 54KB | 19 | [277KB](pages/eslintrc.html) | [86KB](markdown/eslintrc.md) |
| `geojson-stub` | draft-07 | 0KB | 0 | [7KB](pages/geojson-stub.html) | [0KB](markdown/geojson-stub.md) |
| `geojson` | draft-07 | 45KB | 0 | [7KB](pages/geojson.html) | [0KB](markdown/geojson.md) |
| `gitlab-ci` | draft-07 | 125KB | 58 | [160KB](pages/gitlab-ci.html) | [26KB](markdown/gitlab-ci.md) |
| `metaschema-2019-09` | 2019-09 | 2KB | 0 | [9KB](pages/metaschema-2019-09.html) | [1KB](markdown/metaschema-2019-09.md) |
| `metaschema-2020-12` | 2020-12 | 2KB | 0 | [9KB](pages/metaschema-2020-12.html) | [1KB](markdown/metaschema-2020-12.md) |
| `metaschema-draft04` | draft-04 | 4KB | 6 | [22KB](pages/metaschema-draft04.html) | [3KB](markdown/metaschema-draft04.md) |
| `metaschema-draft06` | draft-06 | 4KB | 6 | [21KB](pages/metaschema-draft06.html) | [3KB](markdown/metaschema-draft06.md) |
| `openapi30` | draft-04 | 35KB | 39 | [104KB](pages/openapi30.html) | [17KB](markdown/openapi30.md) |
| `prettierrc` | draft-07 | 13KB | 2 | [21KB](pages/prettierrc.html) | [5KB](markdown/prettierrc.md) |
| `renovate-stub` | none declared | 0KB | 0 | [7KB](pages/renovate-stub.html) | [0KB](markdown/renovate-stub.md) |
| `resume` | draft-07 | 15KB | 1 | [33KB](pages/resume.html) | [7KB](markdown/resume.md) |
| `sarif-2.1.0` | draft-07 | 109KB | 52 | [213KB](pages/sarif-2.1.0.html) | [69KB](markdown/sarif-2.1.0.md) |
| `tsconfig` | draft-07 | 458KB | 14 | [379KB](pages/tsconfig.html) | [15KB](markdown/tsconfig.md) |

Every page here has no scripting, and shows no JSON, no pointers and no regular
expressions. That is checked on every build by `npm test`.

## Why both HTML and Markdown

The Markdown renderer exists to prove the format is not secretly a description
of our HTML. It is written against the same half of the format, never touches
the validating half, and produces the same facts in a medium with no colour, no
nesting and no expanding rows. If the format were HTML-shaped, that second
renderer could not have been written.

