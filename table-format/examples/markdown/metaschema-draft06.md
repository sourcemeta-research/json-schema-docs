# Core schema meta-schema

## What this file holds

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| $id | a web address | no |  |
| $schema | a web address | no |  |
| $ref | a web address | no |  |
| title | text | no |  |
| description | text | no |  |
| default | anything | no |  |
| examples | a list, each one anything | no |  |
| multipleOf | a number | no |  |
| maximum | a number | no |  |
| exclusiveMaximum | a number | no |  |
| minimum | a number | no |  |
| exclusiveMinimum | a number | no |  |
| maxLength | nonNegativeInteger | no |  |
| minLength | nonNegativeIntegerDefault0 | no |  |
| pattern | a search pattern | no |  |
| additionalItems | Core schema meta-schema | no |  |
| items | either Core schema meta-schema or schemaArray; left out means a group of details | no |  |
| maxItems | nonNegativeInteger | no |  |
| minItems | nonNegativeIntegerDefault0 | no |  |
| uniqueItems | yes or no; left out means no | no |  |
| contains | Core schema meta-schema | no |  |
| maxProperties | nonNegativeInteger | no |  |
| minProperties | nonNegativeIntegerDefault0 | no |  |
| required | stringArray, itself a list | no |  |
| additionalProperties | Core schema meta-schema | no |  |
| definitions | a group of fields; left out means a group of details | no |  |
| definitions.any name you choose | Core schema meta-schema | no |  |
| properties | a group of fields; left out means a group of details | no |  |
| properties.any name you choose | Core schema meta-schema | no |  |
| patternProperties | a group of fields; left out means a group of details | no |  |
| patternProperties.any name you choose | Core schema meta-schema | no |  |
| dependencies | a group of fields | no |  |
| dependencies.any name you choose | either Core schema meta-schema or stringArray | no |  |
| propertyNames | Core schema meta-schema | no |  |
| const | anything | no |  |
| enum | a list; from 1 to any entries | no |  |
| type | one of 2 forms: simpleTypes; a list | no |  |
| format | text | no |  |
| allOf | schemaArray, itself a list | no |  |
| anyOf | schemaArray, itself a list | no |  |
| oneOf | schemaArray, itself a list | no |  |
| not | Core schema meta-schema | no |  |

## All 6 shapes

Most used first, because everything else is built on them.

- **Core schema meta-schema** (used 11)
- **schemaArray** (used 4)
- **nonNegativeInteger** (used 4)
- **nonNegativeIntegerDefault0** (used 3)
- **simpleTypes** (used 2)
- **stringArray** (used 2)

### schemaArray

This one is a list. The fields below describe a single entry.

A single value.

### nonNegativeInteger

A single value.

### nonNegativeIntegerDefault0

A single value.

### simpleTypes

A single value.

### stringArray

This one is a list. The fields below describe a single entry.

A single value.

## What this page does not show

- a rule limiting what names may be used (propertyNames)
