# Where these came from

Every file here was downloaded from the address it declares as its own identity.
None of them were written by us. The mock schemas we wrote live in `samples/`
and are never used as evidence about the real world.

Re-check at any time with `node scripts/verify-provenance.js`, which downloads
each one again and compares the bytes.

| File | Downloaded from | Declares itself as |
|---|---|---|
| github-workflow.json | https://json.schemastore.org/github-workflow.json | `https://json.schemastore.org/github-workflow.json` |
| package.json | https://json.schemastore.org/package.json | `https://json.schemastore.org/package.json` |
| openapi31.json | https://spec.openapis.org/oas/3.1/schema/2022-10-07 | `https://spec.openapis.org/oas/3.1/schema/2022-10-07` |
| compose-spec.json | https://raw.githubusercontent.com/compose-spec/compose-spec/master/schema/compose-spec.json | `compose_spec.json`, titled "Compose Specification" |
| metaschema-draft07.json | https://json-schema.org/draft-07/schema | `http://json-schema.org/draft-07/schema#` |

OMC v2.6 lives at `patterns/omc/omc-v2.6.json` and came from MovieLabs. The six
published MovieLabs ontology PDFs are in `patterns/omc/movielabs-docs/`.

## Two of these have moved upstream since we downloaded them

Checked 2026-09-03. `github-workflow.json` and `compose-spec.json` no longer
match what their URLs serve today. Our copies have not changed: they are
byte-identical to the ones the first set of results was produced from, which is
checkable with `git diff v1-sent-to-juan -- samples/real/`.

Both are living documents. Schemastore updates the GitHub workflow schema
whenever Actions gains a feature, and the Compose schema is tracked on a branch
that moves. So `verify-provenance.js` reporting them as changed is the check
working, not a problem with the files.

Every number in `reports/` is against the pinned copies in this folder. Pulling
the newer upstream versions would be a different measurement, and one worth
making deliberately rather than by accident.
