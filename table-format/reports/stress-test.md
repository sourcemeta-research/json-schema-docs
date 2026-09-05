# Stress test: every schema we could find

23 schemas. The six in `samples/real` are the ones the reports quote.
The rest are here to break things: four meta-schemas including draft-04 and
draft-06 which no sample schema exercises, two whose entire root is a pointer to
another file, and several large enough to be uncomfortable.

- Put through the whole pipeline without a crash: **23 of 23**
- No problem of any kind: **23 of 23**
- Average meaning kept on rebuild: **98.9%**
- Lowest: **88.7%**

## Every schema

| Schema | Dialect | Size | Shapes | Page | Meaning kept | Dropped | Problems |
|---|---|---|---|---|---|---|---|
| `omc-v2.6` | 2019-09 | 197KB | 91 | 438KB | 99.9% | 0 | none |
| `compose-spec` | 2020-12 | 75KB | 26 | 133KB | 100.0% | 0 | none |
| `github-workflow` | draft-07 | 111KB | 30 | 131KB | 99.8% | 0 | none |
| `metaschema-draft07` | draft-07 | 5KB | 6 | 23KB | 100.0% | 4 | none |
| `openapi31` | 2020-12 | 33KB | 54 | 167KB | 99.6% | 2 | none |
| `package` | draft-07 | 47KB | 30 | 98KB | 100.0% | 0 | none |
| `asyncapi-2.6` | draft-07 | 129KB | 73 | 200KB | 90.3% | 8 | none |
| `chrome-manifest` | draft-07 | 33KB | 14 | 68KB | 99.3% | 0 | none |
| `dependabot-2.0` | draft-07 | 50KB | 45 | 116KB | 88.7% | 0 | none |
| `eslintrc` | draft-07 | 54KB | 19 | 277KB | 98.5% | 0 | none |
| `geojson-stub` | draft-07 | 0KB | 0 | 7KB | 100.0% | 0 | none |
| `geojson` | draft-07 | 45KB | 0 | 7KB | 100.0% | 0 | none |
| `gitlab-ci` | draft-07 | 125KB | 58 | 160KB | 99.8% | 7 | none |
| `metaschema-2019-09` | 2019-09 | 2KB | 0 | 9KB | 100.0% | 0 | none |
| `metaschema-2020-12` | 2020-12 | 2KB | 0 | 9KB | 100.0% | 0 | none |
| `metaschema-draft04` | draft-04 | 4KB | 6 | 22KB | 100.0% | 0 | none |
| `metaschema-draft06` | draft-06 | 4KB | 6 | 21KB | 100.0% | 4 | none |
| `openapi30` | draft-04 | 35KB | 39 | 104KB | 99.8% | 2 | none |
| `prettierrc` | draft-07 | 13KB | 2 | 21KB | 100.0% | 0 | none |
| `renovate-stub` | none declared | 0KB | 0 | 7KB | 100.0% | 0 | none |
| `resume` | draft-07 | 15KB | 1 | 33KB | 100.0% | 0 | none |
| `sarif-2.1.0` | draft-07 | 109KB | 52 | 213KB | 100.0% | 0 | none |
| `tsconfig` | draft-07 | 458KB | 14 | 379KB | 99.6% | 0 | none |

## What went wrong

Nothing. Every schema converted, rendered, rebuilt and validated.

