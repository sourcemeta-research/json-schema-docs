# Schema for .prettierrc

## All 2 shapes

Most used first, because everything else is built on them.

- **optionsDefinition** (used 2)
- **overridesDefinition** (used 1)

### optionsDefinition

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| arrowParens | one of 2 forms: a fixed value; a fixed value; left out means always | no | Include parentheses around a sole arrow function parameter. |
| bracketSameLine | yes or no; left out means no | no | Put > of opening tags on the last line instead of on a new line. |
| bracketSpacing | yes or no; left out means yes | no | Print spaces between brackets. |
| checkIgnorePragma | yes or no; left out means no | no | Check whether the file's first docblock comment contains '@noprettier' or '@noformat' to determine if it should be formatted. |
| cursorOffset | a whole number; left out means -1 | no | Print (to stderr) where a cursor at the given position would move to after formatting. |
| embeddedLanguageFormatting | one of 2 forms: a fixed value; a fixed value; left out means auto | no | Control how Prettier formats quoted code embedded in the file. |
| endOfLine | one of 4 forms: a fixed value; a fixed value; a fixed value; a fixed value; left out means lf | no | Which end of line characters to apply. |
| experimentalOperatorPosition | one of 2 forms: a fixed value; a fixed value; left out means end | no | Where to print operators when binary expressions wrap lines. |
| experimentalTernaries | yes or no; left out means no | no | Use curious ternaries, with the question mark after the condition. |
| filepath | text | no | Specify the input filepath. This will be used to do parser inference. |
| htmlWhitespaceSensitivity | one of 3 forms: a fixed value; a fixed value; a fixed value; left out means css | no | How to handle whitespaces in HTML. |
| insertPragma | yes or no; left out means no | no | Insert @format pragma into file's first docblock comment. |
| jsxSingleQuote | yes or no; left out means no | no | Use single quotes in JSX. |
| objectWrap | one of 2 forms: a fixed value; a fixed value; left out means preserve | no | How to wrap object literals. |
| parser | one of 26 forms: a fixed value; a fixed value; a fixed value; a fixed value; a fixed value; a fixed value; a fixed value; a fixed value; a fixed value; a fixed value; a fixed value; a fixed value; a fixed value; a fixed value; a fixed value; a fixed value; a fixed value; a fixed value; a fixed value; a fixed value; a fixed value; a fixed value; a fixed value; a fixed value; a fixed value; text | no | Which parser to use. |
| plugins | a list, each one text; left out means | no | Add a plugin. Multiple plugins can be passed as separate `--plugin`s. |
| printWidth | a whole number; left out means 80 | no | The line length where Prettier will try wrap. |
| proseWrap | one of 3 forms: a fixed value; a fixed value; a fixed value; left out means preserve | no | How to wrap prose. |
| quoteProps | one of 3 forms: a fixed value; a fixed value; a fixed value; left out means as-needed | no | Change when properties in objects are quoted. |
| rangeEnd | a whole number; left out means nothing | no | Format code ending at a given character offset (exclusive). The range will extend forwards to the end of the selected statement. |
| rangeStart | a whole number; left out means 0 | no | Format code starting at a given character offset. The range will extend backwards to the start of the first line containing the selected statement. |
| requirePragma | yes or no; left out means no | no | Require either '@prettier' or '@format' to be present in the file's first docblock comment in order for it to be formatted. |
| semi | yes or no; left out means yes | no | Print semicolons. |
| singleAttributePerLine | yes or no; left out means no | no | Enforce single attribute per line in HTML, Vue and JSX. |
| singleQuote | yes or no; left out means no | no | Use single quotes instead of double quotes. |
| tabWidth | a whole number; left out means 2 | no | Number of spaces per indentation level. |
| trailingComma | one of 3 forms: a fixed value; a fixed value; a fixed value; left out means all | no | Print trailing commas wherever possible when multi-line. |
| useTabs | yes or no; left out means no | no | Indent with tabs instead of spaces. |
| vueIndentScriptAndStyle | yes or no; left out means no | no | Indent script and style tags in Vue files. |

### overridesDefinition

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| overrides | a list, each one a group of fields | no | Provide a list of patterns to override prettier configuration. |
| overrides[].files | one of 2 forms: text; a list | yes, always | Include these files in this override. |
| overrides[].excludeFiles | one of 2 forms: text; a list | no | Exclude these files from this override. |
| overrides[].options | a group of fields; and follows optionsDefinition as well | no | The options to apply for this override. |
