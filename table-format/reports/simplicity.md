# Is the format as simple as it could be

Every value object the converter emits, from the six real schemas and from
the minimal schema behind each keyword in the coverage matrix.
21701 observations over 49 document-half fields.

The ablation already shows no single field is dead. This asks the harder
question: is any field simply a restatement of another one.

## Fields not compared

These hold a nested object rather than a value of their own. What is inside
them is judged by the same rules, one level down.

`brings.names`, `brings.rows`, `document.dropped`, `document.exclusiveSets`, `document.root`, `document.rows`, `document.shapes`, `document.value`, `row.brings`, `row.name`, `row.needed`, `row.value`, `shape.exclusiveSets`, `shape.rows`, `shape.value`, `value.elseRequires`, `value.elseRows`, `value.exclusiveSets`, `value.holds`, `value.howManyFields`, `value.item`, `value.options`, `value.range`, `value.refs`, `value.restItem`, `value.rows`, `value.slots`, `value.thenRequires`, `value.thenRows`

## Fields that never vary

| Field | Always | Seen |
|---|---|---|
| `document.format` | "json-docs-table/1" | 80 |
| `document.picks` | null | 80 |
| `pick.field` | "entityType" | 30 |
| `row.borrowed` | true | 699 |
| `value.closed` | true | 360 |
| `value.itemClosed` | true | 13 |
| `value.max` | null | 10 |
| `value.min` | 1 | 10 |
| `value.nullable` | true | 999 |
| `value.slotsOnly` | true | 2 |
| `value.uniqueItems` | true | 44 |
| `value.url` | "/" | 2 |

## Fields that another field always predicts

Read "A from B" as: wherever both appear, B's value has always implied A's.
Only pairs seen together at least 8 times, where B varies but is
not close to unique, and where A is not one of the present-means-true flags
listed above. Without those guards an identifier predicts everything and the
table fills with findings that are true and meaningless.

| Derivable | From | Seen together | Distinct values of the source |
|---|---|---|---|
| `name.kind` | `name.text` | 4911 | 866 |
| `value.kind` | `value.ref` | 1490 | 201 |
| `name.kind` | `name.pattern` | 222 | 19 |
| `name.text` | `name.pattern` | 222 | 19 |
| `value.kind` | `value.patternWords` | 99 | 2 |
| `document.description` | `document.source` | 80 | 7 |
| `document.description` | `document.title` | 80 | 9 |
| `document.source` | `document.title` | 80 | 9 |
| `range.unit` | `range.max` | 64 | 9 |
| `value.kind` | `value.href` | 38 | 10 |
| `value.words` | `value.href` | 38 | 10 |
| `dropped.where` | `dropped.why` | 18 | 3 |
| `dropped.why` | `dropped.where` | 18 | 3 |

## How to read this

A pair listed here is a candidate for merging, not proof that merging is
right. Storing something a renderer could compute is a real cost only if the
computation belongs to the renderer. Where the sentence is the point, as with
wording meant for a person, holding it in the format is what lets a second
renderer say the same thing without reinventing it.

What this cannot show is a field that should exist and does not. That is what
the keyword coverage matrix is for.

