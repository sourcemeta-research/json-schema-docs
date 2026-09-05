# The command line tools, exercised

62 commands run. 62 behaved as documented, 0 did not.

Every row below is a command that was actually run, with the exit code it
returned and the first line it said. Nothing here is asserted.

| What | Command | Exit | What it said | As documented |
|---|---|---|---|---|
| schema-to-table: --help | `schema-to-table --help` | 0 | usage: schema-to-table <schema.json>... [-o <dir>\|-] | yes |
| schema-to-table: no arguments | `schema-to-table` | 1 | usage: schema-to-table <schema.json>... [-o <dir>\|-] | yes |
| schema-to-table: unknown option | `schema-to-table --nope x.json` | 1 | unknown option --nope | yes |
| schema-to-table: missing file | `schema-to-table nope.json` | 1 | cannot read nope.json: no such file | yes |
| schema-to-table: a directory | `schema-to-table samples` | 1 | cannot read samples: that is a directory, not a file | yes |
| schema-to-table: -o with no value | `schema-to-table <in> -o` | 1 | -o needs a directory after it, or - for stdout | yes |
| schema-to-table: -o twice | `schema-to-table <in> -o a -o b` | 1 | -o was given twice (<tmp> and then <tmp>) | yes |
| table-to-html: --help | `table-to-html --help` | 0 | usage: table-to-html <name.table.json>... [-o <dir>\|-] | yes |
| table-to-html: no arguments | `table-to-html` | 1 | usage: table-to-html <name.table.json>... [-o <dir>\|-] | yes |
| table-to-html: unknown option | `table-to-html --nope x.json` | 1 | unknown option --nope | yes |
| table-to-html: missing file | `table-to-html nope.json` | 1 | cannot read nope.json: no such file | yes |
| table-to-html: a directory | `table-to-html samples` | 1 | cannot read samples: that is a directory, not a file | yes |
| table-to-html: -o with no value | `table-to-html <in> -o` | 1 | -o needs a directory after it, or - for stdout | yes |
| table-to-html: -o twice | `table-to-html <in> -o a -o b` | 1 | -o was given twice (<tmp> and then <tmp>) | yes |
| table-to-markdown: --help | `table-to-markdown --help` | 0 | usage: table-to-markdown <name.table.json>... [-o <dir>\|-] | yes |
| table-to-markdown: no arguments | `table-to-markdown` | 1 | usage: table-to-markdown <name.table.json>... [-o <dir>\|-] | yes |
| table-to-markdown: unknown option | `table-to-markdown --nope x.json` | 1 | unknown option --nope | yes |
| table-to-markdown: missing file | `table-to-markdown nope.json` | 1 | cannot read nope.json: no such file | yes |
| table-to-markdown: a directory | `table-to-markdown samples` | 1 | cannot read samples: that is a directory, not a file | yes |
| table-to-markdown: -o with no value | `table-to-markdown <in> -o` | 1 | -o needs a directory after it, or - for stdout | yes |
| table-to-markdown: -o twice | `table-to-markdown <in> -o a -o b` | 1 | -o was given twice (<tmp> and then <tmp>) | yes |
| table-to-schema: --help | `table-to-schema --help` | 0 | usage: table-to-schema <name.table.json>... [-o <dir>\|-] [--compare] | yes |
| table-to-schema: no arguments | `table-to-schema` | 1 | usage: table-to-schema <name.table.json>... [-o <dir>\|-] [--compare] | yes |
| table-to-schema: unknown option | `table-to-schema --nope x.json` | 1 | unknown option --nope | yes |
| table-to-schema: missing file | `table-to-schema nope.json` | 1 | cannot read nope.json: no such file | yes |
| table-to-schema: a directory | `table-to-schema samples` | 1 | cannot read samples: that is a directory, not a file | yes |
| table-to-schema: -o with no value | `table-to-schema <in> -o` | 1 | -o needs a directory after it, or - for stdout | yes |
| table-to-schema: -o twice | `table-to-schema <in> -o a -o b` | 1 | -o was given twice (<tmp> and then <tmp>) | yes |
| validate-format: --help | `validate-format --help` | 0 | usage: validate-format <name.table.json>... | yes |
| validate-format: no arguments | `validate-format` | 1 | usage: validate-format <name.table.json>... | yes |
| validate-format: unknown option | `validate-format --nope x.json` | 1 | unknown option --nope | yes |
| validate-format: missing file | `validate-format nope.json` | 1 | cannot read nope.json: no such file | yes |
| validate-format: a directory | `validate-format samples` | 1 | cannot read samples: that is a directory, not a file | yes |
| validate-format: -o with no value | `validate-format <in> -o` | 1 | -o needs a directory after it, or - for stdout | yes |
| validate-format: -o twice | `validate-format <in> -o a -o b` | 1 | -o was given twice (<tmp> and then <tmp>) | yes |
| schema-to-table: -o <dir> | `schema-to-table samples/real/package.json -o <dir>` | 0 | package                    30 shapes    161 rows    0 dropped | yes |
| schema-to-table: -o - is JSON on stdout | `schema-to-table <in> -o -` | 0 | { | yes |
| schema-to-table: two inputs, one -o | `schema-to-table a.json b.json -o <dir>` | 0 | package                    30 shapes    161 rows    0 dropped | yes |
| schema-to-table: stdout refuses two inputs | `schema-to-table a.json b.json -o -` | 1 | writing to stdout needs exactly one input file | yes |
| schema-to-table: same basename twice | `schema-to-table a/x.json b/x.json` | 1 | ./samples/real/package.json and samples/real/package.json would both be written as package | yes |
| table-to-html: -o <dir> | `table-to-html <table> -o <dir>` | 0 | package                     98KB    251 rows | yes |
| table-to-html: -o - | `table-to-html <table> -o -` | 0 | <!doctype html><meta charset="utf-8"><title>JSON schema for NPM package.json files</title> | yes |
| table-to-html: refuses a schema | `table-to-html <schema> -o -` | 1 | samples/real/package.json is not the table format. | yes |
| table-to-markdown: -o <dir> | `table-to-markdown <table> -o <dir>` | 0 | package                     29KB    231 table lines | yes |
| table-to-markdown: -o - | `table-to-markdown <table> -o -` | 0 | # JSON schema for NPM package.json files | yes |
| table-to-markdown: refuses a schema | `table-to-markdown <schema> -o -` | 1 | samples/real/package.json is not the table format. | yes |
| table-to-schema: rebuild without the original | `table-to-schema <table> -o -` | 0 | { | yes |
| table-to-schema: --compare against the original | `table-to-schema <table> --compare` | 0 | schema                    places    same    lost  changed   kept | yes |
| table-to-schema: works with the original absent | `cd elsewhere; table-to-schema <table> -o -` | 0 | { | yes |
| table-to-schema: --compare says why it cannot | `cd elsewhere; table-to-schema <table> --compare` | 1 | schema                    places    same    lost  changed   kept | yes |
| validate-format: a valid format | `validate-format <table>` | 0 | package                  valid | yes |
| validate-format: catches a broken one | `validate-format <broken>` | 1 | broken: 2 problems | yes |
| pipe: schema-to-table | table-to-html | `schema-to-table <in> -o - | table-to-html - -o -` | 0 | <!doctype html><meta charset="utf-8"><title>JSON schema for NPM package.json files</title> | yes |
| pipe: schema-to-table | table-to-schema | `schema-to-table <in> -o - | table-to-schema - -o -` | 0 | { | yes |
| pipe: broken JSON on stdin | `echo "not json" | table-to-html - -o -` | 1 | the input is not valid JSON: Unexpected token 'o', "not json at all" is not valid JSON | yes |
| stdout carries only the result | `table-to-html <table> -o - (stdout is pure)` | 0 | <!doctype html><meta charset="utf-8"><title>JSON schema for NPM package.json files</title> | yes |
| a filename starting with a dash, after -- | `schema-to-table -o <dir> -- -o.json` | 0 | -o                         30 shapes    161 rows    0 dropped | yes |
| after --, a flag is treated as a filename | `schema-to-table -- -o <dir>` | 1 | cannot read -o: no such file | yes |
| a filename with spaces | `schema-to-table "a name with spaces.json"` | 0 | a name with spaces         30 shapes    161 rows    0 dropped | yes |
| -o at a path that is a file | `schema-to-table <in> -o <existing file>` | 1 | cannot write into <tmp>\-o.json: there is already a file with that name | yes |
| no -o writes under the working directory | `cd elsewhere; schema-to-table thing.json` | 0 | thing                      30 shapes    161 rows    0 dropped | yes |
| the full chain over all 17 stress schemas | `schema-to-table -> html, markdown, schema, validate` | 0 | 17 of 17 went through every tool | yes |

