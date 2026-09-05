# Where the stress schemas came from

Downloaded 2026-09-03. These are not the schemas the reports quote: those are
the six in `samples/real`. These exist to break things, and they are chosen for
awkwardness rather than for being representative.

| File | From |
|---|---|
| metaschema-draft04.json | https://json-schema.org/draft-04/schema |
| metaschema-draft06.json | https://json-schema.org/draft-06/schema |
| metaschema-2019-09.json | https://json-schema.org/draft/2019-09/schema |
| metaschema-2020-12.json | https://json-schema.org/draft/2020-12/schema |
| sarif-2.1.0.json | https://json.schemastore.org/sarif-2.1.0.json |
| tsconfig.json | https://json.schemastore.org/tsconfig.json |
| eslintrc.json | https://json.schemastore.org/eslintrc.json |
| prettierrc.json | https://json.schemastore.org/prettierrc.json |
| dependabot-2.0.json | https://json.schemastore.org/dependabot-2.0.json |
| chrome-manifest.json | https://json.schemastore.org/chrome-manifest.json |
| openapi30.json | https://spec.openapis.org/oas/3.0/schema/2021-09-28 |
| asyncapi-2.6.json | https://raw.githubusercontent.com/asyncapi/spec-json-schemas/master/schemas/2.6.0.json |
| geojson.json | https://geojson.org/schema/GeoJSON.json |
| gitlab-ci.json | https://gitlab.com/gitlab-org/gitlab/-/raw/master/app/assets/javascripts/editor/schema/ci.json |
| resume.json | https://raw.githubusercontent.com/jsonresume/resume-schema/master/schema.json |
| geojson-stub.json | https://json.schemastore.org/geojson.json |
| renovate-stub.json | https://json.schemastore.org/renovate.json |

## Why each awkward one is here

- **Four meta-schemas.** Draft-04 and draft-06 are exercised by no sample schema
  at all, so without these two dialects were only covered by the minimal cases
  in the keyword matrix.
- **`asyncapi-2.6`** embeds the whole draft-07 meta-schema inside itself under
  its own `$id`, 49 nested identities in all. It is the schema that proved
  pointers were being read against the wrong document, and it names its
  definitions by URL, which proved pointer segments were not being decoded.
- **`renovate-stub` and `geojson-stub`** are schemas whose entire root is a
  pointer to another file. Renovate's is literally `{"$ref": "https://..."}`.
  These proved that such a document was being converted into one that said
  nothing at all.
- **`tsconfig`** is 458KB, the largest thing here, and its descriptions contain
  fenced code blocks and the word "JavaScript:", which is what showed the
  scripting check was reading prose rather than markup.
- **`eslintrc`** has a rule whose description is "Disallow javascript: urls",
  for the same reason.
- **`sarif-2.1.0`** and **`gitlab-ci`** are large and deeply cross-referenced.
- **`geojson`** is nine alternatives at the root with no named shapes anywhere,
  which is a layout none of the six use.

These are not checked by `verify-provenance.js`, which covers `samples/real`
only. They are pinned copies and the URLs above are where they came from.
