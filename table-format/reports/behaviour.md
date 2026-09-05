# Do the rebuilt schemas behave like the originals

Every other measurement in this project compares two schemas as text. This
one runs documents past both and compares the verdicts, which is the only
question that finally matters.

The validator is Ajv. It knows nothing about this project, and it compiles
both schemas with identical settings, so neither side is judged by our own
code. What is measured is **agreement**, not validity: if the original
rejects a document and the rebuild rejects it too, that is a pass. Only a
difference of opinion counts against us.

- Documents judged by both schemas: **777**
- The two agreed: **777** (100.00%)
- The two disagreed: **0**
- Schemas exercised: **22**, of which 22 with no disagreement at all
- Both accepted: 359, both rejected: 418

Both numbers matter. Agreeing only to accept everything would be worthless,
so the rejections are the half that shows the two schemas draw the line in
the same place.

## Would this test notice if something were wrong

Perfect agreement means nothing unless the same setup would have caught a
difference. One rebuild is damaged on purpose, four different ways, and put
through the identical comparison. Each one has to be noticed.

| The rebuild is damaged so that | Documents that changed verdict |
|---|---|
| package: every field becomes required | 13 of 15 |
| package: a field loses all its rules | 1 of 15 |
| package: a field changes type | 10 of 15 |
| package: the open shape is closed | 8 of 15 |
| package: the required list is removed | not applicable, this schema has nothing to damage that way |
| compose-spec: every field becomes required | 5 of 15 |
| compose-spec: a field loses all its rules | **none. The damage is real, so no document here tells the difference** |
| compose-spec: a field changes type | 1 of 15 |
| compose-spec: the closed shape is opened | 9 of 15 |
| compose-spec: the required list is removed | not applicable, this schema has nothing to damage that way |

Every damage but 1 was caught, which is what makes the agreement above a result rather than an absence of measurement. The ones that were not caught are not blind spots in the comparison: the damage really was applied, and no document in this set happens to distinguish it. That is a statement about how thin the document corpus is for that schema, and it is the first thing to improve.

## By schema

| Schema | Documents | Agreed | Disagreed | Both said yes | Both said no |
|---|---|---|---|---|---|
| `metaschema-draft07` | 124 | 124 | 0 | 61 | 63 |
| `metaschema-2019-09` | 124 | 124 | 0 | 62 | 62 |
| `metaschema-2020-12` | 124 | 124 | 0 | 56 | 68 |
| `metaschema-draft04` | 124 | 124 | 0 | 68 | 56 |
| `metaschema-draft06` | 124 | 124 | 0 | 63 | 61 |
| `package` | 77 | 77 | 0 | 38 | 39 |
| `compose-spec` | 5 | 5 | 0 | 0 | 5 |
| `github-workflow` | 5 | 5 | 0 | 0 | 5 |
| `openapi31` | 5 | 5 | 0 | 0 | 5 |
| `chrome-manifest` | 5 | 5 | 0 | 0 | 5 |
| `dependabot-2.0` | 5 | 5 | 0 | 0 | 5 |
| `eslintrc` | 5 | 5 | 0 | 0 | 5 |
| `geojson-stub` | 5 | 5 | 0 | 5 | 0 |
| `geojson` | 5 | 5 | 0 | 0 | 5 |
| `gitlab-ci` | 5 | 5 | 0 | 0 | 5 |
| `openapi30` | 5 | 5 | 0 | 0 | 5 |
| `prettierrc` | 5 | 5 | 0 | 1 | 4 |
| `renovate-stub` | 5 | 5 | 0 | 5 | 0 |
| `resume` | 5 | 5 | 0 | 0 | 5 |
| `sarif-2.1.0` | 5 | 5 | 0 | 0 | 5 |
| `tsconfig` | 5 | 5 | 0 | 0 | 5 |
| `omc-v2.6` | 5 | 5 | 0 | 0 | 5 |

## Where they disagreed

Nowhere. Every document got the same verdict from both schemas.

## What this does not cover

1 schemas could not be put through this test at all:

- `asyncapi-2.6`: could not compile: reference "http://asyncapi.com/definitions/2.6.0/openapiSchema_3_0.json" resolves to more than one schema

- A schema that points at files we do not have cannot be fully compiled.
  Those pointers are answered with a stub that accepts anything, the same
  stub on both sides. Rules behind such a pointer are therefore not tested.
- The documents are real where real ones exist, and mutations of them
  otherwise. This is not the same as a large corpus of genuine files for
  every one of these formats.

