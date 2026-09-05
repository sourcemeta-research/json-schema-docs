# Keyword coverage 

**74 keywords tested across six dialects.**

- Rebuilt without losing meaning: 74 of 74
- Reached the reader on the page: 74 of 74 (5 of those are machine identifiers, checked for being absent rather than present)
- Crashed the pipeline: 0
- Cases that actually depend on their keyword: 73 of 74

| Keyword | Dialects | Rebuild | On the page | Test depends on it | Dropped |
|---|---|---|---|---|---|
| `type (string)` | draft 3, draft 4, draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `type (list of types)` | draft 3, draft 4, draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `properties` | draft 3, draft 4, draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `title` | draft 3, draft 4, draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `description` | draft 3, draft 4, draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `default` | draft 3, draft 4, draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `enum` | draft 3, draft 4, draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `format` | draft 3, draft 4, draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `required (array)` | draft 4, draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `required (draft 3 boolean)` | draft 3 | kept | yes | yes | - |
| `minimum / maximum` | draft 3, draft 4, draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `exclusiveMinimum (number)` | draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `exclusiveMinimum (draft 4 boolean)` | draft 4 | kept | yes | yes | - |
| `multipleOf` | draft 4, draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `divisibleBy (draft 3)` | draft 3 | kept | yes | yes | - |
| `minLength / maxLength` | draft 3, draft 4, draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `pattern` | draft 3, draft 4, draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `items (single schema)` | draft 3, draft 4, draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `items (tuple form)` | draft 3, draft 4, draft 6, draft 7, 2019-09 | kept | yes | yes | - |
| `prefixItems` | 2020-12 | kept | yes | yes | - |
| `additionalItems` | draft 3, draft 4, draft 6, draft 7, 2019-09 | kept | yes | yes | - |
| `minItems / maxItems` | draft 3, draft 4, draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `uniqueItems` | draft 3, draft 4, draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `contains` | draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | a rule about what a list must contain somewhere |
| `minContains / maxContains` | 2019-09, 2020-12 | kept | yes | yes | a rule about what a list must contain somewhere |
| `additionalProperties: false` | draft 3, draft 4, draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `additionalProperties: schema` | draft 3, draft 4, draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `patternProperties` | draft 3, draft 4, draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `propertyNames` | draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | a rule limiting what names may be used |
| `minProperties / maxProperties` | draft 4, draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `unevaluatedProperties` | 2019-09, 2020-12 | kept | yes | yes | - |
| `allOf` | draft 4, draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `anyOf` | draft 4, draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `oneOf` | draft 4, draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `not (as exclusion)` | draft 4, draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `not (whole shape)` | draft 4, draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | a rule saying the value must not match a whole shape |
| `extends (draft 3)` | draft 3 | kept | yes | yes | - |
| `disallow (draft 3)` | draft 3 | kept | yes | yes | a rule saying the value must not match a whole shape |
| `if / then / else` | draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `dependencies (draft 4 to 7)` | draft 4, draft 6, draft 7 | kept | yes | yes | - |
| `dependentRequired` | 2019-09, 2020-12 | kept | yes | yes | - |
| `dependentSchemas` | 2019-09, 2020-12 | kept | yes | yes | - |
| `$ref (local)` | draft 4, draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `$ref (external URL)` | draft 4, draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `$ref (to the whole document)` | draft 4, draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `$ref beside other keywords` | 2019-09, 2020-12 | kept | yes | yes | - |
| `definitions drawer` | draft 3, draft 4, draft 6, draft 7 | kept | yes | yes | - |
| `$defs drawer` | 2019-09, 2020-12 | kept | yes | yes | - |
| `$anchor` | 2019-09, 2020-12 | kept | yes | yes | - |
| `$dynamicRef / $dynamicAnchor` | 2020-12 | kept | yes | yes | - |
| `$recursiveRef / $recursiveAnchor` | 2019-09 | kept | yes | yes | - |
| `const` | draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `examples` | draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `readOnly / writeOnly` | draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `deprecated` | 2019-09, 2020-12 | kept | yes | yes | - |
| `$comment` | draft 7, 2019-09, 2020-12 | kept | not shown, on purpose | yes | - |
| `contentMediaType / contentEncoding` | draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `true as a schema` | draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `false as a schema` | draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `empty schema {}` | draft 3, draft 4, draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `$id` | draft 6, draft 7, 2019-09, 2020-12 | kept | not shown, on purpose | yes | - |
| `id (draft 3 and 4)` | draft 3, draft 4 | kept | not shown, on purpose | yes | - |
| `$schema` | draft 4, draft 6, draft 7, 2019-09, 2020-12 | kept | not shown, on purpose | n/a, every case declares a dialect, so there is no version of this one without it | - |
| `$vocabulary` | 2019-09, 2020-12 | kept | not shown, on purpose | yes | - |
| `exclusiveMaximum (number)` | draft 6, draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `exclusiveMaximum (draft 4 boolean)` | draft 4 | kept | yes | yes | - |
| `maxContains` | 2019-09, 2020-12 | kept | yes | yes | a rule about what a list must contain somewhere |
| `unevaluatedItems` | 2019-09, 2020-12 | kept | yes | yes | - |
| `contentSchema` | 2019-09, 2020-12 | kept | yes | yes | - |
| `contentEncoding` | draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `writeOnly` | draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `else branch` | draft 7, 2019-09, 2020-12 | kept | yes | yes | - |
| `dependencies (schema form)` | draft 4, draft 6, draft 7 | kept | yes | yes | - |
| `dependencies (draft 3)` | draft 3 | kept | yes | yes | - |
