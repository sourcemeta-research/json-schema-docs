# metaschema-draft04

Core schema meta-schema

## What this file holds

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| id | text | no |  |
| $schema | text | no |  |
| title | text | no |  |
| description | text | no |  |
| default | anything | no |  |
| multipleOf | a number; from 0 to any | no |  |
| maximum | a number | no |  |
| exclusiveMaximum | yes or no; left out means no | no |  |
| minimum | a number | no |  |
| exclusiveMinimum | yes or no; left out means no | no |  |
| maxLength | positiveInteger | no |  |
| minLength | positiveIntegerDefault0 | no |  |
| pattern | a search pattern | no |  |
| additionalItems | one of 2 forms: yes or no; this whole document; left out means a group of details | no |  |
| items | either this whole document or schemaArray; left out means a group of details | no |  |
| maxItems | positiveInteger | no |  |
| minItems | positiveIntegerDefault0 | no |  |
| uniqueItems | yes or no; left out means no | no |  |
| maxProperties | positiveInteger | no |  |
| minProperties | positiveIntegerDefault0 | no |  |
| required | stringArray, itself a list | no |  |
| additionalProperties | one of 2 forms: yes or no; this whole document; left out means a group of details | no |  |
| definitions | a group of fields; left out means a group of details | no |  |
| definitions.any name you choose | this whole document | no |  |
| properties | a group of fields; left out means a group of details | no |  |
| properties.any name you choose | this whole document | no |  |
| patternProperties | a group of fields; left out means a group of details | no |  |
| patternProperties.any name you choose | this whole document | no |  |
| dependencies | a group of fields | no |  |
| dependencies.any name you choose | either this whole document or stringArray | no |  |
| enum | a list; from 1 to any entries | no |  |
| type | one of 2 forms: simpleTypes; a list | no |  |
| format | text | no |  |
| allOf | schemaArray, itself a list | no |  |
| anyOf | schemaArray, itself a list | no |  |
| oneOf | schemaArray, itself a list | no |  |
| not | this whole document | no |  |

## All 6 shapes

Most used first, because everything else is built on them.

- **this whole document** (used 9)
- **schemaArray** (used 4)
- **positiveInteger** (used 4)
- **positiveIntegerDefault0** (used 3)
- **simpleTypes** (used 2)
- **stringArray** (used 2)

### schemaArray

This one is a list. The fields below describe a single entry.

A single value.

### positiveInteger

A single value.

### positiveIntegerDefault0

A single value.

### simpleTypes

A single value.

### stringArray

This one is a list. The fields below describe a single entry.

A single value.
