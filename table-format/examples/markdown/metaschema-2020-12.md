# Core and Validation specifications meta-schema

## What this file holds

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| definitions | a group of fields; left out means a group of details | no |  |
| definitions.any name you choose | anything | no |  |
| dependencies | a group of fields; left out means a group of details | no |  |
| dependencies.any name you choose | one of 2 forms: anything; follows rules kept in another file | no |  |
| $recursiveAnchor | rules kept in another file, meta/core#/$defs/anchorString | no |  |
| $recursiveRef | rules kept in another file, meta/core#/$defs/uriReferenceString | no |  |

## All 0 shapes

Most used first, because everything else is built on them.


