# JSON schema for ESLint configuration files

## What this file holds

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| ecmaFeatures | a group of fields | no | By default, ESLint supports only ECMAScript 5 syntax. You can override that setting to enable support for ECMAScript 6 as well as JSX by using configuration settings. |
| ecmaFeatures.arrowFunctions | yes or no | no |  |
| ecmaFeatures.binaryLiterals | yes or no | no |  |
| ecmaFeatures.blockBindings | yes or no | no |  |
| ecmaFeatures.classes | yes or no | no |  |
| ecmaFeatures.defaultParams | yes or no | no |  |
| ecmaFeatures.destructuring | yes or no | no |  |
| ecmaFeatures.experimentalObjectRestSpread | yes or no | no | Enables support for the experimental object rest/spread properties (IMPORTANT: This is an experimental feature that may change significantly in the future. It's recommended that you do not write rules relying on this functionality unless you are willing to incur maintenance cost when it changes.) |
| ecmaFeatures.forOf | yes or no | no |  |
| ecmaFeatures.generators | yes or no | no |  |
| ecmaFeatures.globalReturn | yes or no | no | allow return statements in the global scope |
| ecmaFeatures.impliedStrict | yes or no | no | enable global strict mode (if ecmaVersion is 5 or greater) |
| ecmaFeatures.jsx | yes or no | no | enable JSX |
| ecmaFeatures.modules | yes or no | no |  |
| ecmaFeatures.objectLiteralComputedProperties | yes or no | no |  |
| ecmaFeatures.objectLiteralDuplicateProperties | yes or no | no |  |
| ecmaFeatures.objectLiteralShorthandMethods | yes or no | no |  |
| ecmaFeatures.objectLiteralShorthandProperties | yes or no | no |  |
| ecmaFeatures.octalLiterals | yes or no | no |  |
| ecmaFeatures.regexUFlag | yes or no | no |  |
| ecmaFeatures.regexYFlag | yes or no | no |  |
| ecmaFeatures.restParams | yes or no | no |  |
| ecmaFeatures.spread | yes or no | no |  |
| ecmaFeatures.superInFunctions | yes or no | no |  |
| ecmaFeatures.templateStrings | yes or no | no |  |
| ecmaFeatures.unicodeCodePointEscapes | yes or no | no |  |
| env | a group of fields | no | An environment defines global variables that are predefined. |
| env.amd | yes or no | no | defines require() and define() as global variables as per the amd spec |
| env.applescript | yes or no | no | AppleScript global variables |
| env.atomtest | yes or no | no | Atom test helper globals |
| env.browser | yes or no | no | browser global variables |
| env.commonjs | yes or no | no | CommonJS global variables and CommonJS scoping (use this for browser-only code that uses Browserify/WebPack) |
| env.shared-node-browser | yes or no | no | Globals common to both Node and Browser |
| env.embertest | yes or no | no | Ember test helper globals |
| env.es6 | yes or no | no | enable all ECMAScript 6 features except for modules |
| env.greasemonkey | yes or no | no | GreaseMonkey globals |
| env.jasmine | yes or no | no | adds all of the Jasmine testing global variables for version 1.3 and 2.0 |
| env.jest | yes or no | no | Jest global variables |
| env.jquery | yes or no | no | jQuery global variables |
| env.meteor | yes or no | no | Meteor global variables |
| env.mocha | yes or no | no | adds all of the Mocha test global variables |
| env.mongo | yes or no | no | MongoDB global variables |
| env.nashorn | yes or no | no | Java 8 Nashorn global variables |
| env.node | yes or no | no | Node.js global variables and Node.js scoping |
| env.phantomjs | yes or no | no | PhantomJS global variables |
| env.prototypejs | yes or no | no | Prototype.js global variables |
| env.protractor | yes or no | no | Protractor global variables |
| env.qunit | yes or no | no | QUnit global variables |
| env.serviceworker | yes or no | no | Service Worker global variables |
| env.shelljs | yes or no | no | ShellJS global variables |
| env.webextensions | yes or no | no | WebExtensions globals |
| env.worker | yes or no | no | web workers global variables |
| extends | stringOrStringArray | no | If you want to extend a specific configuration file, you can use the extends property and specify the path to the file. The path can be either relative or absolute. |
| globals | a group of fields | no | Set each global variable name equal to true to allow the variable to be overwritten or false to disallow overwriting. |
| globals.any name you choose | one of 2 forms: one of these; yes or no | no |  |
| noInlineConfig | yes or no | no | Prevent comments from changing config or rules |
| reportUnusedDisableDirectives | yes or no | no | Report unused eslint-disable comments |
| parser | text | no |  |
| parserOptions | a group of fields | no | The JavaScript language options to be supported |
| parserOptions.ecmaFeatures | ecmaFeatures | no |  |
| parserOptions.ecmaVersion | one of: 3, 5, 6, 2015, 7, 2016, 8, 2017, 9, 2018, 10, 2019, 11, 2020, 12, 2021, 13, 2022, 14, 2023, 15, 2024, latest | no | Set to 3, 5 (default), 6, 7, 8, 9, 10, 11, 12, 13, 14, or 15 to specify the version of ECMAScript syntax you want to use. You can also set it to 2015 (same as 6), 2016 (same as 7), 2017 (same as 8), 2018 (same as 9), 2019 (same as 10), 2020 (same as 11), 2021 (same as 12), 2022 (same as 13), 2023 (same as 14), or 2024 (same as 15) to use the year-based naming. You can also set "latest" to use the most recently supported version. |
| parserOptions.sourceType | one of: script, module, commonjs | no | set to "script" (default), "commonjs", or "module" if your code is in ECMAScript modules |
| plugins | a list, each one text | no | ESLint supports the use of third-party plugins. Before using the plugin, you have to install it using npm. |
| root | yes or no | no | By default, ESLint will look for configuration files in all parent folders up to the root directory. This can be useful if you want all of your projects to follow a certain convention, but can sometimes lead to unexpected results. To limit ESLint to a specific project, set this to `true` in a configuration in the root of your project. |
| ignorePatterns | stringOrStringArray | no | Tell ESLint to ignore specific files and directories. Each value uses the same pattern as the `.eslintignore` file. |
| rules | a group of fields | no | ESLint comes with a large number of rules. You can modify which rules your project uses either using configuration comments or configuration files. |
| rules.comma-dangle *(borrowed)* | rule | no | Require or disallow trailing commas |
| rules.for-direction *(borrowed)* | rule | no | Enforce "for" loop update clause moving the counter in the right direction |
| rules.getter-return *(borrowed)* | rule | no | Enforce return statements in getters |
| rules.no-await-in-loop *(borrowed)* | rule | no | Disallow await inside of loops |
| rules.no-compare-neg-zero *(borrowed)* | rule | no | Disallow comparing against -0 |
| rules.no-cond-assign *(borrowed)* | rule | no | Disallow assignment operators in conditional expressions |
| rules.no-console *(borrowed)* | rule | no | Disallow the use of console |
| rules.no-constant-condition *(borrowed)* | rule | no | Disallow constant expressions in conditions |
| rules.no-control-regex *(borrowed)* | rule | no | Disallow control characters in regular expressions |
| rules.no-debugger *(borrowed)* | rule | no | Disallow the use of debugger |
| rules.no-dupe-args *(borrowed)* | rule | no | Disallow duplicate arguments in function definitions |
| rules.no-dupe-keys *(borrowed)* | rule | no | Disallow duplicate keys in object literals |
| rules.no-duplicate-case *(borrowed)* | rule | no | Disallow duplicate case labels |
| rules.no-empty *(borrowed)* | rule | no | Disallow empty block statements |
| rules.no-empty-character-class *(borrowed)* | rule | no | Disallow empty character classes in regular expressions |
| rules.no-ex-assign *(borrowed)* | rule | no | Disallow reassigning exceptions in catch clauses |
| rules.no-extra-boolean-cast *(borrowed)* | rule | no | Disallow unnecessary boolean casts |
| rules.no-extra-parens *(borrowed)* | rule | no | Disallow unnecessary parentheses |
| rules.no-extra-semi *(borrowed)* | rule | no | Disallow unnecessary semicolons |
| rules.no-func-assign *(borrowed)* | rule | no | Disallow reassigning function declarations |
| rules.no-inner-declarations *(borrowed)* | rule | no | Disallow function or var declarations in nested blocks |
| rules.no-invalid-regexp *(borrowed)* | rule | no | Disallow invalid regular expression strings in RegExp constructors |
| rules.no-irregular-whitespace *(borrowed)* | rule | no | Disallow irregular whitespace outside of strings and comments |
| rules.no-negated-in-lhs *(borrowed)* | rule | no | Disallow negating the left operand in in expressions (deprecated) |
| rules.no-obj-calls *(borrowed)* | rule | no | Disallow calling global object properties as functions |
| rules.no-prototype-builtins *(borrowed)* | rule | no | Disallow calling some Object.prototype methods directly on objects |
| rules.no-regex-spaces *(borrowed)* | rule | no | Disallow multiple spaces in regular expressions |
| rules.no-sparse-arrays *(borrowed)* | rule | no | Disallow sparse arrays |
| rules.no-template-curly-in-string *(borrowed)* | rule | no | Disallow template literal placeholder syntax in regular strings |
| rules.no-unexpected-multiline *(borrowed)* | rule | no | Disallow confusing multiline expressions |
| rules.no-unreachable *(borrowed)* | rule | no | Disallow unreachable code after return, throw, continue, and break statements |
| rules.no-unsafe-finally *(borrowed)* | rule | no | Disallow control flow statements in finally blocks |
| rules.no-unsafe-negation *(borrowed)* | rule | no | Disallow negating the left operand of relational operators |
| rules.use-isnan *(borrowed)* | rule | no | Require calls to isNaN() when checking for NaN |
| rules.valid-jsdoc *(borrowed)* | rule | no | Enforce valid JSDoc comments |
| rules.valid-typeof *(borrowed)* | rule | no | Enforce comparing typeof expressions against valid strings |
| rules.accessor-pairs *(borrowed)* | rule | no | Enforce getter and setter pairs in objects |
| rules.array-callback-return *(borrowed)* | rule | no | Enforce return statements in callbacks of array methods |
| rules.block-scoped-var *(borrowed)* | rule | no | Enforce the use of variables within the scope they are defined |
| rules.class-methods-use-this *(borrowed)* | rule | no | Enforce that class methods utilize this |
| rules.complexity *(borrowed)* | rule | no | Enforce a maximum cyclomatic complexity allowed in a program |
| rules.consistent-return *(borrowed)* | rule | no | Require return statements to either always or never specify values |
| rules.curly *(borrowed)* | rule | no | Enforce consistent brace style for all control statements |
| rules.default-case *(borrowed)* | rule | no | Require default cases in switch statements |
| rules.dot-location *(borrowed)* | rule | no | Enforce consistent newlines before and after dots |
| rules.dot-notation *(borrowed)* | rule | no | Enforce dot notation whenever possible |
| rules.eqeqeq *(borrowed)* | rule | no | Require the use of === and !== |
| rules.guard-for-in *(borrowed)* | rule | no | Require for-in loops to include an if statement |
| rules.no-alert *(borrowed)* | rule | no | Disallow the use of alert, confirm, and prompt |
| rules.no-caller *(borrowed)* | rule | no | Disallow the use of arguments.caller or arguments.callee |
| rules.no-case-declarations *(borrowed)* | rule | no | Disallow lexical declarations in case clauses |
| rules.no-div-regex *(borrowed)* | rule | no | Disallow division operators explicitly at the beginning of regular expressions |
| rules.no-else-return *(borrowed)* | rule | no | Disallow else blocks after return statements in if statements |
| rules.no-empty-function *(borrowed)* | rule | no | Disallow empty functions |
| rules.no-empty-pattern *(borrowed)* | rule | no | Disallow empty destructuring patterns |
| rules.no-eq-null *(borrowed)* | rule | no | Disallow null comparisons without type-checking operators |
| rules.no-eval *(borrowed)* | rule | no | Disallow the use of eval() |
| rules.no-extend-native *(borrowed)* | rule | no | Disallow extending native types |
| rules.no-extra-bind *(borrowed)* | rule | no | Disallow unnecessary calls to .bind() |
| rules.no-extra-label *(borrowed)* | rule | no | Disallow unnecessary labels |
| rules.no-fallthrough *(borrowed)* | rule | no | Disallow fallthrough of case statements |
| rules.no-floating-decimal *(borrowed)* | rule | no | Disallow leading or trailing decimal points in numeric literals |
| rules.no-global-assign *(borrowed)* | rule | no | Disallow assignments to native objects or read-only global variables |
| rules.no-implicit-coercion *(borrowed)* | rule | no | Disallow shorthand type conversions |
| rules.no-implicit-globals *(borrowed)* | rule | no | Disallow var and named function declarations in the global scope |
| rules.no-implied-eval *(borrowed)* | rule | no | Disallow the use of eval()-like methods |
| rules.no-invalid-this *(borrowed)* | rule | no | Disallow this keywords outside of classes or class-like objects |
| rules.no-iterator *(borrowed)* | rule | no | Disallow the use of the __iterator__ property |
| rules.no-labels *(borrowed)* | rule | no | Disallow labeled statements |
| rules.no-lone-blocks *(borrowed)* | rule | no | Disallow unnecessary nested blocks |
| rules.no-loop-func *(borrowed)* | rule | no | Disallow function declarations and expressions inside loop statements |
| rules.no-magic-numbers *(borrowed)* | rule | no | Disallow magic numbers |
| rules.no-multi-spaces *(borrowed)* | rule | no | Disallow multiple spaces |
| rules.no-multi-str *(borrowed)* | rule | no | Disallow multiline strings |
| rules.no-native-reassign *(borrowed)* | rule | no |  |
| rules.no-new *(borrowed)* | rule | no | Disallow new operators outside of assignments or comparisons |
| rules.no-new-func *(borrowed)* | rule | no | Disallow new operators with the Function object |
| rules.no-new-wrappers *(borrowed)* | rule | no | Disallow new operators with the String, Number, and Boolean objects |
| rules.no-octal *(borrowed)* | rule | no | Disallow octal literals |
| rules.no-octal-escape *(borrowed)* | rule | no | Disallow octal escape sequences in string literals |
| rules.no-param-reassign *(borrowed)* | rule | no | Disallow reassigning function parameters |
| rules.no-proto *(borrowed)* | rule | no | Disallow the use of the __proto__ property |
| rules.no-redeclare *(borrowed)* | rule | no | Disallow var redeclaration |
| rules.no-restricted-properties *(borrowed)* | rule | no | Disallow certain properties on certain objects |
| rules.no-return-assign *(borrowed)* | rule | no | Disallow assignment operators in return statements |
| rules.no-return-await *(borrowed)* | rule | no | Disallow unnecessary return await |
| rules.no-script-url *(borrowed)* | rule | no | Disallow javascript: urls |
| rules.no-self-assign *(borrowed)* | rule | no | Disallow assignments where both sides are exactly the same |
| rules.no-self-compare *(borrowed)* | rule | no | Disallow comparisons where both sides are exactly the same |
| rules.no-sequences *(borrowed)* | rule | no | Disallow comma operators |
| rules.no-throw-literal *(borrowed)* | rule | no | Disallow throwing literals as exceptions |
| rules.no-unmodified-loop-condition *(borrowed)* | rule | no | Disallow unmodified loop conditions |
| rules.no-unused-expressions *(borrowed)* | rule | no | Disallow unused expressions |
| rules.no-unused-labels *(borrowed)* | rule | no | Disallow unused labels |
| rules.no-useless-call *(borrowed)* | rule | no | Disallow unnecessary calls to .call() and .apply() |
| rules.no-useless-concat *(borrowed)* | rule | no | Disallow unnecessary concatenation of literals or template literals |
| rules.no-useless-escape *(borrowed)* | rule | no | Disallow unnecessary escape characters |
| rules.no-useless-return *(borrowed)* | rule | no | Disallow redundant return statements |
| rules.no-void *(borrowed)* | rule | no | Disallow void operators |
| rules.no-warning-comments *(borrowed)* | rule | no | Disallow specified warning terms in comments |
| rules.no-with *(borrowed)* | rule | no | Disallow with statements |
| rules.prefer-promise-reject-errors *(borrowed)* | rule | no | Require using Error objects as Promise rejection reasons |
| rules.radix *(borrowed)* | rule | no | Enforce the consistent use of the radix argument when using parseInt() |
| rules.require-await *(borrowed)* | rule | no | Disallow async functions which have no await expression |
| rules.vars-on-top *(borrowed)* | rule | no | Require var declarations be placed at the top of their containing scope |
| rules.wrap-iife *(borrowed)* | rule | no | Require parentheses around immediate function invocations |
| rules.yoda *(borrowed)* | rule | no | Require or Disallow "Yoda" conditions |
| rules.strict *(borrowed)* | rule | no | require or disallow strict mode directives |
| rules.init-declarations *(borrowed)* | rule | no | Require or disallow initialization in var declarations |
| rules.no-catch-shadow *(borrowed)* | rule | no | Disallow catch clause parameters from shadowing variables in the outer scope |
| rules.no-delete-var *(borrowed)* | rule | no | Disallow deleting variables |
| rules.no-label-var *(borrowed)* | rule | no | Disallow labels that share a name with a variable |
| rules.no-restricted-globals *(borrowed)* | rule | no | Disallow specified global variables |
| rules.no-shadow *(borrowed)* | rule | no | Disallow var declarations from shadowing variables in the outer scope |
| rules.no-shadow-restricted-names *(borrowed)* | rule | no | Disallow identifiers from shadowing restricted names |
| rules.no-undef *(borrowed)* | rule | no | Disallow the use of undeclared variables unless mentioned in /*global */ comments |
| rules.no-undefined *(borrowed)* | rule | no | Disallow the use of undefined as an identifier |
| rules.no-undef-init *(borrowed)* | rule | no | Disallow initializing variables to undefined |
| rules.no-unused-vars *(borrowed)* | rule | no | Disallow unused variables |
| rules.no-use-before-define *(borrowed)* | rule | no | Disallow the use of variables before they are defined |
| rules.callback-return *(borrowed)* | rule | no | Require return statements after callbacks |
| rules.global-require *(borrowed)* | rule | no | Require require() calls to be placed at top-level module scope |
| rules.handle-callback-err *(borrowed)* | rule | no | Require error handling in callbacks |
| rules.no-buffer-constructor *(borrowed)* | rule | no | Disallow use of the Buffer() constructor |
| rules.no-mixed-requires *(borrowed)* | rule | no | Disallow require calls to be mixed with regular var declarations |
| rules.no-new-require *(borrowed)* | rule | no | Disallow new operators with calls to require |
| rules.no-path-concat *(borrowed)* | rule | no | Disallow string concatenation with __dirname and __filename |
| rules.no-process-env *(borrowed)* | rule | no | Disallow the use of process.env |
| rules.no-process-exit *(borrowed)* | rule | no | Disallow the use of process.exit() |
| rules.no-restricted-modules *(borrowed)* | rule | no | Disallow specified modules when loaded by require |
| rules.no-sync *(borrowed)* | rule | no | Disallow synchronous methods |
| rules.array-bracket-newline *(borrowed)* | rule | no | Enforce line breaks after opening and before closing array brackets |
| rules.array-bracket-spacing *(borrowed)* | rule | no | Enforce consistent spacing inside array brackets |
| rules.array-element-newline *(borrowed)* | rule | no | Enforce line breaks after each array element |
| rules.block-spacing *(borrowed)* | rule | no | Enforce consistent spacing inside single-line blocks |
| rules.brace-style *(borrowed)* | rule | no | Enforce consistent brace style for blocks |
| rules.camelcase *(borrowed)* | rule | no | Enforce camelcase naming convention |
| rules.capitalized-comments *(borrowed)* | rule | no | Enforce or disallow capitalization of the first letter of a comment |
| rules.comma-spacing *(borrowed)* | rule | no | Enforce consistent spacing before and after commas |
| rules.comma-style *(borrowed)* | rule | no | Enforce consistent comma style |
| rules.computed-property-spacing *(borrowed)* | rule | no | Enforce consistent spacing inside computed property brackets |
| rules.consistent-this *(borrowed)* | rule | no | Enforce consistent naming when capturing the current execution context |
| rules.eol-last *(borrowed)* | rule | no | Enforce at least one newline at the end of files |
| rules.func-call-spacing *(borrowed)* | rule | no | Require or disallow spacing between function identifiers and their invocations |
| rules.func-name-matching *(borrowed)* | rule | no | Require function names to match the name of the variable or property to which they are assigned |
| rules.func-names *(borrowed)* | rule | no | Require or disallow named function expressions |
| rules.func-style *(borrowed)* | rule | no | Enforce the consistent use of either function declarations or expressions |
| rules.function-call-argument-newline *(borrowed)* | rule | no | Enforce line breaks between arguments of a function call |
| rules.function-paren-newline *(borrowed)* | rule | no | Enforce consistent line breaks inside function parentheses |
| rules.id-blacklist *(borrowed)* | rule | no | Disallow specified identifiers |
| rules.id-length *(borrowed)* | rule | no | Enforce minimum and maximum identifier lengths |
| rules.id-match *(borrowed)* | rule | no | Require identifiers to match a specified regular expression |
| rules.implicit-arrow-linebreak *(borrowed)* | rule | no | Enforce the location of arrow function bodies |
| rules.indent *(borrowed)* | rule | no | Enforce consistent indentation |
| rules.indent-legacy *(borrowed)* | rule | no | Enforce consistent indentation (legacy, deprecated) |
| rules.jsx-quotes *(borrowed)* | rule | no | Enforce the consistent use of either double or single quotes in JSX attributes |
| rules.key-spacing *(borrowed)* | rule | no | Enforce consistent spacing between keys and values in object literal properties |
| rules.keyword-spacing *(borrowed)* | rule | no | Enforce consistent spacing before and after keywords |
| rules.line-comment-position *(borrowed)* | rule | no | Enforce position of line comments |
| rules.lines-between-class-members *(borrowed)* | rule | no | Require or disallow an empty line between class members |
| rules.linebreak-style *(borrowed)* | rule | no | Enforce consistent linebreak style |
| rules.lines-around-comment *(borrowed)* | rule | no | Require empty lines around comments |
| rules.lines-around-directive *(borrowed)* | rule | no | Require or disallow newlines around directives |
| rules.max-depth *(borrowed)* | rule | no | Enforce a maximum depth that blocks can be nested |
| rules.max-len *(borrowed)* | rule | no | Enforce a maximum line length |
| rules.max-lines *(borrowed)* | rule | no | Enforce a maximum number of lines per file |
| rules.max-nested-callbacks *(borrowed)* | rule | no | Enforce a maximum depth that callbacks can be nested |
| rules.max-params *(borrowed)* | rule | no | Enforce a maximum number of parameters in function definitions |
| rules.max-statements *(borrowed)* | rule | no | Enforce a maximum number of statements allowed in function blocks |
| rules.max-statements-per-line *(borrowed)* | rule | no | Enforce a maximum number of statements allowed per line |
| rules.multiline-comment-style *(borrowed)* | rule | no | Enforce a particular style for multiline comments |
| rules.multiline-ternary *(borrowed)* | rule | no | Enforce newlines between operands of ternary expressions |
| rules.new-cap *(borrowed)* | rule | no | Require constructor function names to begin with a capital letter |
| rules.newline-after-var *(borrowed)* | rule | no | Require or disallow an empty line after var declarations |
| rules.newline-before-return *(borrowed)* | rule | no | Require an empty line before return statements |
| rules.newline-per-chained-call *(borrowed)* | rule | no | Require a newline after each call in a method chain |
| rules.new-parens *(borrowed)* | rule | no | Require parentheses when invoking a constructor with no arguments |
| rules.no-array-constructor *(borrowed)* | rule | no | Disallow Array constructors |
| rules.no-bitwise *(borrowed)* | rule | no | Disallow bitwise operators |
| rules.no-continue *(borrowed)* | rule | no | Disallow continue statements |
| rules.no-inline-comments *(borrowed)* | rule | no | Disallow inline comments after code |
| rules.no-lonely-if *(borrowed)* | rule | no | Disallow if statements as the only statement in else blocks |
| rules.no-mixed-operators *(borrowed)* | rule | no | Disallow mixed binary operators |
| rules.no-mixed-spaces-and-tabs *(borrowed)* | rule | no | Disallow mixed spaces and tabs for indentation |
| rules.no-multi-assign *(borrowed)* | rule | no | Disallow use of chained assignment expressions |
| rules.no-multiple-empty-lines *(borrowed)* | rule | no | Disallow multiple empty lines |
| rules.no-negated-condition *(borrowed)* | rule | no | Disallow negated conditions |
| rules.no-nested-ternary *(borrowed)* | rule | no | Disallow nested ternary expressions |
| rules.no-new-object *(borrowed)* | rule | no | Disallow Object constructors |
| rules.no-plusplus *(borrowed)* | rule | no | Disallow the unary operators ++ and -- |
| rules.no-restricted-syntax *(borrowed)* | rule | no | Disallow specified syntax |
| rules.no-spaced-func *(borrowed)* | rule | no |  |
| rules.no-tabs *(borrowed)* | rule | no | Disallow tabs in file |
| rules.no-ternary *(borrowed)* | rule | no | Disallow ternary operators |
| rules.no-trailing-spaces *(borrowed)* | rule | no | Disallow trailing whitespace at the end of lines |
| rules.no-underscore-dangle *(borrowed)* | rule | no | Disallow dangling underscores in identifiers |
| rules.no-unneeded-ternary *(borrowed)* | rule | no | Disallow ternary operators when simpler alternatives exist |
| rules.no-whitespace-before-property *(borrowed)* | rule | no | Disallow whitespace before properties |
| rules.nonblock-statement-body-position *(borrowed)* | rule | no | Enforce the location of single-line statements |
| rules.object-curly-newline *(borrowed)* | rule | no | Enforce consistent line breaks inside braces |
| rules.object-curly-spacing *(borrowed)* | rule | no | Enforce consistent spacing inside braces |
| rules.object-property-newline *(borrowed)* | rule | no | Enforce placing object properties on separate lines |
| rules.object-shorthand *(borrowed)* | rule | no |  |
| rules.one-var *(borrowed)* | rule | no | Enforce variables to be declared either together or separately in functions |
| rules.one-var-declaration-per-line *(borrowed)* | rule | no | Require or disallow newlines around var declarations |
| rules.operator-assignment *(borrowed)* | rule | no | Require or disallow assignment operator shorthand where possible |
| rules.operator-linebreak *(borrowed)* | rule | no | Enforce consistent linebreak style for operators |
| rules.padded-blocks *(borrowed)* | rule | no | Require or disallow padding within blocks |
| rules.padding-line-between-statements *(borrowed)* | rule | no | Require or disallow padding lines between statements |
| rules.quote-props *(borrowed)* | rule | no | Require quotes around object literal property names |
| rules.quotes *(borrowed)* | rule | no | Enforce the consistent use of either backticks, double, or single quotes |
| rules.require-jsdoc *(borrowed)* | rule | no | Require JSDoc comments |
| rules.semi *(borrowed)* | rule | no | Require or disallow semicolons instead of ASI |
| rules.semi-spacing *(borrowed)* | rule | no | Enforce consistent spacing before and after semicolons |
| rules.semi-style *(borrowed)* | rule | no | Enforce location of semicolons |
| rules.sort-keys *(borrowed)* | rule | no | Requires object keys to be sorted |
| rules.sort-vars *(borrowed)* | rule | no | Require variables within the same declaration block to be sorted |
| rules.space-before-blocks *(borrowed)* | rule | no | Enforce consistent spacing before blocks |
| rules.space-before-function-paren *(borrowed)* | rule | no | Enforce consistent spacing before function definition opening parenthesis |
| rules.spaced-comment *(borrowed)* | rule | no | Enforce consistent spacing after the // or /* in a comment |
| rules.space-infix-ops *(borrowed)* | rule | no | Require spacing around operators |
| rules.space-in-parens *(borrowed)* | rule | no | Enforce consistent spacing inside parentheses |
| rules.space-unary-ops *(borrowed)* | rule | no | Enforce consistent spacing before or after unary operators |
| rules.switch-colon-spacing *(borrowed)* | rule | no | Enforce spacing around colons of switch statements |
| rules.template-tag-spacing *(borrowed)* | rule | no | Require or disallow spacing between template tags and their literals |
| rules.unicode-bom *(borrowed)* | rule | no | Require or disallow Unicode byte order mark (BOM) |
| rules.wrap-regex *(borrowed)* | rule | no | Require parenthesis around regex literals |
| rules.arrow-body-style *(borrowed)* | rule | no | Require braces around arrow function bodies |
| rules.arrow-parens *(borrowed)* | rule | no | Require parentheses around arrow function arguments |
| rules.arrow-spacing *(borrowed)* | rule | no | Enforce consistent spacing before and after the arrow in arrow functions |
| rules.constructor-super *(borrowed)* | rule | no | Require super() calls in constructors |
| rules.generator-star-spacing *(borrowed)* | rule | no | Enforce consistent spacing around * operators in generator functions |
| rules.no-class-assign *(borrowed)* | rule | no | Disallow reassigning class members |
| rules.no-confusing-arrow *(borrowed)* | rule | no | Disallow arrow functions where they could be confused with comparisons |
| rules.no-const-assign *(borrowed)* | rule | no | Disallow reassigning const variables |
| rules.no-dupe-class-members *(borrowed)* | rule | no | Disallow duplicate class members |
| rules.no-duplicate-imports *(borrowed)* | rule | no | Disallow duplicate module imports |
| rules.no-new-symbol *(borrowed)* | rule | no | Disallow new operators with the Symbol object |
| rules.no-restricted-imports *(borrowed)* | rule | no | Disallow specified modules when loaded by import |
| rules.no-this-before-super *(borrowed)* | rule | no | Disallow this/super before calling super() in constructors |
| rules.no-useless-computed-key *(borrowed)* | rule | no | Disallow unnecessary computed property keys in object literals |
| rules.no-useless-constructor *(borrowed)* | rule | no | Disallow unnecessary constructors |
| rules.no-useless-rename *(borrowed)* | rule | no | Disallow renaming import, export, and destructured assignments to the same name |
| rules.no-var *(borrowed)* | rule | no | Require let or const instead of var |
| rules.prefer-arrow-callback *(borrowed)* | rule | no | Require arrow functions as callbacks |
| rules.prefer-const *(borrowed)* | rule | no | Require const declarations for variables that are never reassigned after declared |
| rules.prefer-destructuring *(borrowed)* | rule | no | Require destructuring from arrays and/or objects |
| rules.prefer-numeric-literals *(borrowed)* | rule | no | Disallow parseInt() in favor of binary, octal, and hexadecimal literals |
| rules.prefer-reflect *(borrowed)* | rule | no | Require Reflect methods where applicable |
| rules.prefer-rest-params *(borrowed)* | rule | no | Require rest parameters instead of arguments |
| rules.prefer-spread *(borrowed)* | rule | no | Require spread operators instead of .apply() |
| rules.prefer-template *(borrowed)* | rule | no | Require template literals instead of string concatenation |
| rules.require-yield *(borrowed)* | rule | no | Require generator functions to contain yield |
| rules.rest-spread-spacing *(borrowed)* | rule | no | Enforce spacing between rest and spread operators and their expressions |
| rules.sort-imports *(borrowed)* | rule | no | Enforce sorted import declarations within modules |
| rules.symbol-description *(borrowed)* | rule | no | Require symbol descriptions |
| rules.template-curly-spacing *(borrowed)* | rule | no | Require or disallow spacing around embedded expressions of template strings |
| rules.yield-star-spacing *(borrowed)* | rule | no | Require or disallow spacing around the * in yield* expressions |
| settings | a group of fields | no | ESLint supports adding shared settings into configuration file. You can add settings object to ESLint configuration file and it will be supplied to every rule that will be executed. This may be useful if you are adding custom rules and want them to have access to the same information and be easily configurable. |
| overrides | a list, each one a group of fields | no | Allows to override configuration for files and folders, specified by glob patterns |
| overrides[].files | one of 2 forms: text; a list | yes, always | Glob pattern for files to apply 'overrides' configuration, relative to the directory of the config file |
| overrides[].extends | stringOrStringArray | no | If you want to extend a specific configuration file, you can use the extends property and specify the path to the file. The path can be either relative or absolute. |
| overrides[].excludedFiles | stringOrStringArray | no | If a file matches any of the 'excludedFiles' glob patterns, the 'overrides' configuration won't apply |
| overrides[].ecmaFeatures | ecmaFeatures | no |  |
| overrides[].env | env | no |  |
| overrides[].globals | globals | no |  |
| overrides[].parser | parser | no |  |
| overrides[].parserOptions | parserOptions | no |  |
| overrides[].plugins | plugins, itself a list | no |  |
| overrides[].processor | text | no | To specify a processor, specify the plugin name and processor name joined by a forward slash |
| overrides[].rules | rules | no |  |
| overrides[].settings | settings | no |  |
| overrides[].overrides | overrides, itself a list | no |  |

## All 19 shapes

Most used first, because everything else is built on them.

- **rule** (used 266)
- **stringOrStringArray** (used 4)
- **ecmaFeatures** (used 2)
- **possibleErrors** (used 1)
- **bestPractices** (used 1)
- **strictMode** (used 1)
- **variables** (used 1)
- **nodeAndCommonJs** (used 1)
- **stylisticIssues** (used 1)
- **ecmaScript6** (used 1)
- **legacy** (used 1)
- **env** (used 1)
- **globals** (used 1)
- **parser** (used 1)
- **parserOptions** (used 1)
- **plugins** (used 1)
- **rules** (used 1)
- **settings** (used 1)
- **overrides** (used 1)

### rule

A single value.

### stringOrStringArray

A single value.

### ecmaFeatures

By default, ESLint supports only ECMAScript 5 syntax. You can override that setting to enable support for ECMAScript 6 as well as JSX by using configuration settings.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| arrowFunctions | yes or no | no |  |
| binaryLiterals | yes or no | no |  |
| blockBindings | yes or no | no |  |
| classes | yes or no | no |  |
| defaultParams | yes or no | no |  |
| destructuring | yes or no | no |  |
| experimentalObjectRestSpread | yes or no | no | Enables support for the experimental object rest/spread properties (IMPORTANT: This is an experimental feature that may change significantly in the future. It's recommended that you do not write rules relying on this functionality unless you are willing to incur maintenance cost when it changes.) |
| forOf | yes or no | no |  |
| generators | yes or no | no |  |
| globalReturn | yes or no | no | allow return statements in the global scope |
| impliedStrict | yes or no | no | enable global strict mode (if ecmaVersion is 5 or greater) |
| jsx | yes or no | no | enable JSX |
| modules | yes or no | no |  |
| objectLiteralComputedProperties | yes or no | no |  |
| objectLiteralDuplicateProperties | yes or no | no |  |
| objectLiteralShorthandMethods | yes or no | no |  |
| objectLiteralShorthandProperties | yes or no | no |  |
| octalLiterals | yes or no | no |  |
| regexUFlag | yes or no | no |  |
| regexYFlag | yes or no | no |  |
| restParams | yes or no | no |  |
| spread | yes or no | no |  |
| superInFunctions | yes or no | no |  |
| templateStrings | yes or no | no |  |
| unicodeCodePointEscapes | yes or no | no |  |

### possibleErrors

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| comma-dangle | rule | no | Require or disallow trailing commas |
| for-direction | rule | no | Enforce "for" loop update clause moving the counter in the right direction |
| getter-return | rule | no | Enforce return statements in getters |
| no-await-in-loop | rule | no | Disallow await inside of loops |
| no-compare-neg-zero | rule | no | Disallow comparing against -0 |
| no-cond-assign | rule | no | Disallow assignment operators in conditional expressions |
| no-console | rule | no | Disallow the use of console |
| no-constant-condition | rule | no | Disallow constant expressions in conditions |
| no-control-regex | rule | no | Disallow control characters in regular expressions |
| no-debugger | rule | no | Disallow the use of debugger |
| no-dupe-args | rule | no | Disallow duplicate arguments in function definitions |
| no-dupe-keys | rule | no | Disallow duplicate keys in object literals |
| no-duplicate-case | rule | no | Disallow duplicate case labels |
| no-empty | rule | no | Disallow empty block statements |
| no-empty-character-class | rule | no | Disallow empty character classes in regular expressions |
| no-ex-assign | rule | no | Disallow reassigning exceptions in catch clauses |
| no-extra-boolean-cast | rule | no | Disallow unnecessary boolean casts |
| no-extra-parens | rule | no | Disallow unnecessary parentheses |
| no-extra-semi | rule | no | Disallow unnecessary semicolons |
| no-func-assign | rule | no | Disallow reassigning function declarations |
| no-inner-declarations | rule | no | Disallow function or var declarations in nested blocks |
| no-invalid-regexp | rule | no | Disallow invalid regular expression strings in RegExp constructors |
| no-irregular-whitespace | rule | no | Disallow irregular whitespace outside of strings and comments |
| no-negated-in-lhs | rule | no | Disallow negating the left operand in in expressions (deprecated) |
| no-obj-calls | rule | no | Disallow calling global object properties as functions |
| no-prototype-builtins | rule | no | Disallow calling some Object.prototype methods directly on objects |
| no-regex-spaces | rule | no | Disallow multiple spaces in regular expressions |
| no-sparse-arrays | rule | no | Disallow sparse arrays |
| no-template-curly-in-string | rule | no | Disallow template literal placeholder syntax in regular strings |
| no-unexpected-multiline | rule | no | Disallow confusing multiline expressions |
| no-unreachable | rule | no | Disallow unreachable code after return, throw, continue, and break statements |
| no-unsafe-finally | rule | no | Disallow control flow statements in finally blocks |
| no-unsafe-negation | rule | no | Disallow negating the left operand of relational operators |
| use-isnan | rule | no | Require calls to isNaN() when checking for NaN |
| valid-jsdoc | rule | no | Enforce valid JSDoc comments |
| valid-typeof | rule | no | Enforce comparing typeof expressions against valid strings |

### bestPractices

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| accessor-pairs | rule | no | Enforce getter and setter pairs in objects |
| array-callback-return | rule | no | Enforce return statements in callbacks of array methods |
| block-scoped-var | rule | no | Enforce the use of variables within the scope they are defined |
| class-methods-use-this | rule | no | Enforce that class methods utilize this |
| complexity | rule | no | Enforce a maximum cyclomatic complexity allowed in a program |
| consistent-return | rule | no | Require return statements to either always or never specify values |
| curly | rule | no | Enforce consistent brace style for all control statements |
| default-case | rule | no | Require default cases in switch statements |
| dot-location | rule | no | Enforce consistent newlines before and after dots |
| dot-notation | rule | no | Enforce dot notation whenever possible |
| eqeqeq | rule | no | Require the use of === and !== |
| guard-for-in | rule | no | Require for-in loops to include an if statement |
| no-alert | rule | no | Disallow the use of alert, confirm, and prompt |
| no-caller | rule | no | Disallow the use of arguments.caller or arguments.callee |
| no-case-declarations | rule | no | Disallow lexical declarations in case clauses |
| no-div-regex | rule | no | Disallow division operators explicitly at the beginning of regular expressions |
| no-else-return | rule | no | Disallow else blocks after return statements in if statements |
| no-empty-function | rule | no | Disallow empty functions |
| no-empty-pattern | rule | no | Disallow empty destructuring patterns |
| no-eq-null | rule | no | Disallow null comparisons without type-checking operators |
| no-eval | rule | no | Disallow the use of eval() |
| no-extend-native | rule | no | Disallow extending native types |
| no-extra-bind | rule | no | Disallow unnecessary calls to .bind() |
| no-extra-label | rule | no | Disallow unnecessary labels |
| no-fallthrough | rule | no | Disallow fallthrough of case statements |
| no-floating-decimal | rule | no | Disallow leading or trailing decimal points in numeric literals |
| no-global-assign | rule | no | Disallow assignments to native objects or read-only global variables |
| no-implicit-coercion | rule | no | Disallow shorthand type conversions |
| no-implicit-globals | rule | no | Disallow var and named function declarations in the global scope |
| no-implied-eval | rule | no | Disallow the use of eval()-like methods |
| no-invalid-this | rule | no | Disallow this keywords outside of classes or class-like objects |
| no-iterator | rule | no | Disallow the use of the __iterator__ property |
| no-labels | rule | no | Disallow labeled statements |
| no-lone-blocks | rule | no | Disallow unnecessary nested blocks |
| no-loop-func | rule | no | Disallow function declarations and expressions inside loop statements |
| no-magic-numbers | rule | no | Disallow magic numbers |
| no-multi-spaces | rule | no | Disallow multiple spaces |
| no-multi-str | rule | no | Disallow multiline strings |
| no-native-reassign | rule | no |  |
| no-new | rule | no | Disallow new operators outside of assignments or comparisons |
| no-new-func | rule | no | Disallow new operators with the Function object |
| no-new-wrappers | rule | no | Disallow new operators with the String, Number, and Boolean objects |
| no-octal | rule | no | Disallow octal literals |
| no-octal-escape | rule | no | Disallow octal escape sequences in string literals |
| no-param-reassign | rule | no | Disallow reassigning function parameters |
| no-proto | rule | no | Disallow the use of the __proto__ property |
| no-redeclare | rule | no | Disallow var redeclaration |
| no-restricted-properties | rule | no | Disallow certain properties on certain objects |
| no-return-assign | rule | no | Disallow assignment operators in return statements |
| no-return-await | rule | no | Disallow unnecessary return await |
| no-script-url | rule | no | Disallow javascript: urls |
| no-self-assign | rule | no | Disallow assignments where both sides are exactly the same |
| no-self-compare | rule | no | Disallow comparisons where both sides are exactly the same |
| no-sequences | rule | no | Disallow comma operators |
| no-throw-literal | rule | no | Disallow throwing literals as exceptions |
| no-unmodified-loop-condition | rule | no | Disallow unmodified loop conditions |
| no-unused-expressions | rule | no | Disallow unused expressions |
| no-unused-labels | rule | no | Disallow unused labels |
| no-useless-call | rule | no | Disallow unnecessary calls to .call() and .apply() |
| no-useless-concat | rule | no | Disallow unnecessary concatenation of literals or template literals |
| no-useless-escape | rule | no | Disallow unnecessary escape characters |
| no-useless-return | rule | no | Disallow redundant return statements |
| no-void | rule | no | Disallow void operators |
| no-warning-comments | rule | no | Disallow specified warning terms in comments |
| no-with | rule | no | Disallow with statements |
| prefer-promise-reject-errors | rule | no | Require using Error objects as Promise rejection reasons |
| radix | rule | no | Enforce the consistent use of the radix argument when using parseInt() |
| require-await | rule | no | Disallow async functions which have no await expression |
| vars-on-top | rule | no | Require var declarations be placed at the top of their containing scope |
| wrap-iife | rule | no | Require parentheses around immediate function invocations |
| yoda | rule | no | Require or Disallow "Yoda" conditions |

### strictMode

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| strict | rule | no | require or disallow strict mode directives |

### variables

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| init-declarations | rule | no | Require or disallow initialization in var declarations |
| no-catch-shadow | rule | no | Disallow catch clause parameters from shadowing variables in the outer scope |
| no-delete-var | rule | no | Disallow deleting variables |
| no-label-var | rule | no | Disallow labels that share a name with a variable |
| no-restricted-globals | rule | no | Disallow specified global variables |
| no-shadow | rule | no | Disallow var declarations from shadowing variables in the outer scope |
| no-shadow-restricted-names | rule | no | Disallow identifiers from shadowing restricted names |
| no-undef | rule | no | Disallow the use of undeclared variables unless mentioned in /*global */ comments |
| no-undefined | rule | no | Disallow the use of undefined as an identifier |
| no-undef-init | rule | no | Disallow initializing variables to undefined |
| no-unused-vars | rule | no | Disallow unused variables |
| no-use-before-define | rule | no | Disallow the use of variables before they are defined |

### nodeAndCommonJs

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| callback-return | rule | no | Require return statements after callbacks |
| global-require | rule | no | Require require() calls to be placed at top-level module scope |
| handle-callback-err | rule | no | Require error handling in callbacks |
| no-buffer-constructor | rule | no | Disallow use of the Buffer() constructor |
| no-mixed-requires | rule | no | Disallow require calls to be mixed with regular var declarations |
| no-new-require | rule | no | Disallow new operators with calls to require |
| no-path-concat | rule | no | Disallow string concatenation with __dirname and __filename |
| no-process-env | rule | no | Disallow the use of process.env |
| no-process-exit | rule | no | Disallow the use of process.exit() |
| no-restricted-modules | rule | no | Disallow specified modules when loaded by require |
| no-sync | rule | no | Disallow synchronous methods |

### stylisticIssues

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| array-bracket-newline | rule | no | Enforce line breaks after opening and before closing array brackets |
| array-bracket-spacing | rule | no | Enforce consistent spacing inside array brackets |
| array-element-newline | rule | no | Enforce line breaks after each array element |
| block-spacing | rule | no | Enforce consistent spacing inside single-line blocks |
| brace-style | rule | no | Enforce consistent brace style for blocks |
| camelcase | rule | no | Enforce camelcase naming convention |
| capitalized-comments | rule | no | Enforce or disallow capitalization of the first letter of a comment |
| comma-dangle | rule | no | Require or disallow trailing commas |
| comma-spacing | rule | no | Enforce consistent spacing before and after commas |
| comma-style | rule | no | Enforce consistent comma style |
| computed-property-spacing | rule | no | Enforce consistent spacing inside computed property brackets |
| consistent-this | rule | no | Enforce consistent naming when capturing the current execution context |
| eol-last | rule | no | Enforce at least one newline at the end of files |
| func-call-spacing | rule | no | Require or disallow spacing between function identifiers and their invocations |
| func-name-matching | rule | no | Require function names to match the name of the variable or property to which they are assigned |
| func-names | rule | no | Require or disallow named function expressions |
| func-style | rule | no | Enforce the consistent use of either function declarations or expressions |
| function-call-argument-newline | rule | no | Enforce line breaks between arguments of a function call |
| function-paren-newline | rule | no | Enforce consistent line breaks inside function parentheses |
| id-blacklist | rule | no | Disallow specified identifiers |
| id-length | rule | no | Enforce minimum and maximum identifier lengths |
| id-match | rule | no | Require identifiers to match a specified regular expression |
| implicit-arrow-linebreak | rule | no | Enforce the location of arrow function bodies |
| indent | rule | no | Enforce consistent indentation |
| indent-legacy | rule | no | Enforce consistent indentation (legacy, deprecated) |
| jsx-quotes | rule | no | Enforce the consistent use of either double or single quotes in JSX attributes |
| key-spacing | rule | no | Enforce consistent spacing between keys and values in object literal properties |
| keyword-spacing | rule | no | Enforce consistent spacing before and after keywords |
| line-comment-position | rule | no | Enforce position of line comments |
| lines-between-class-members | rule | no | Require or disallow an empty line between class members |
| linebreak-style | rule | no | Enforce consistent linebreak style |
| lines-around-comment | rule | no | Require empty lines around comments |
| lines-around-directive | rule | no | Require or disallow newlines around directives |
| max-depth | rule | no | Enforce a maximum depth that blocks can be nested |
| max-len | rule | no | Enforce a maximum line length |
| max-lines | rule | no | Enforce a maximum number of lines per file |
| max-nested-callbacks | rule | no | Enforce a maximum depth that callbacks can be nested |
| max-params | rule | no | Enforce a maximum number of parameters in function definitions |
| max-statements | rule | no | Enforce a maximum number of statements allowed in function blocks |
| max-statements-per-line | rule | no | Enforce a maximum number of statements allowed per line |
| multiline-comment-style | rule | no | Enforce a particular style for multiline comments |
| multiline-ternary | rule | no | Enforce newlines between operands of ternary expressions |
| new-cap | rule | no | Require constructor function names to begin with a capital letter |
| newline-after-var | rule | no | Require or disallow an empty line after var declarations |
| newline-before-return | rule | no | Require an empty line before return statements |
| newline-per-chained-call | rule | no | Require a newline after each call in a method chain |
| new-parens | rule | no | Require parentheses when invoking a constructor with no arguments |
| no-array-constructor | rule | no | Disallow Array constructors |
| no-bitwise | rule | no | Disallow bitwise operators |
| no-continue | rule | no | Disallow continue statements |
| no-inline-comments | rule | no | Disallow inline comments after code |
| no-lonely-if | rule | no | Disallow if statements as the only statement in else blocks |
| no-mixed-operators | rule | no | Disallow mixed binary operators |
| no-mixed-spaces-and-tabs | rule | no | Disallow mixed spaces and tabs for indentation |
| no-multi-assign | rule | no | Disallow use of chained assignment expressions |
| no-multiple-empty-lines | rule | no | Disallow multiple empty lines |
| no-negated-condition | rule | no | Disallow negated conditions |
| no-nested-ternary | rule | no | Disallow nested ternary expressions |
| no-new-object | rule | no | Disallow Object constructors |
| no-plusplus | rule | no | Disallow the unary operators ++ and -- |
| no-restricted-syntax | rule | no | Disallow specified syntax |
| no-spaced-func | rule | no |  |
| no-tabs | rule | no | Disallow tabs in file |
| no-ternary | rule | no | Disallow ternary operators |
| no-trailing-spaces | rule | no | Disallow trailing whitespace at the end of lines |
| no-underscore-dangle | rule | no | Disallow dangling underscores in identifiers |
| no-unneeded-ternary | rule | no | Disallow ternary operators when simpler alternatives exist |
| no-whitespace-before-property | rule | no | Disallow whitespace before properties |
| nonblock-statement-body-position | rule | no | Enforce the location of single-line statements |
| object-curly-newline | rule | no | Enforce consistent line breaks inside braces |
| object-curly-spacing | rule | no | Enforce consistent spacing inside braces |
| object-property-newline | rule | no | Enforce placing object properties on separate lines |
| object-shorthand | rule | no |  |
| one-var | rule | no | Enforce variables to be declared either together or separately in functions |
| one-var-declaration-per-line | rule | no | Require or disallow newlines around var declarations |
| operator-assignment | rule | no | Require or disallow assignment operator shorthand where possible |
| operator-linebreak | rule | no | Enforce consistent linebreak style for operators |
| padded-blocks | rule | no | Require or disallow padding within blocks |
| padding-line-between-statements | rule | no | Require or disallow padding lines between statements |
| quote-props | rule | no | Require quotes around object literal property names |
| quotes | rule | no | Enforce the consistent use of either backticks, double, or single quotes |
| require-jsdoc | rule | no | Require JSDoc comments |
| semi | rule | no | Require or disallow semicolons instead of ASI |
| semi-spacing | rule | no | Enforce consistent spacing before and after semicolons |
| semi-style | rule | no | Enforce location of semicolons |
| sort-keys | rule | no | Requires object keys to be sorted |
| sort-vars | rule | no | Require variables within the same declaration block to be sorted |
| space-before-blocks | rule | no | Enforce consistent spacing before blocks |
| space-before-function-paren | rule | no | Enforce consistent spacing before function definition opening parenthesis |
| spaced-comment | rule | no | Enforce consistent spacing after the // or /* in a comment |
| space-infix-ops | rule | no | Require spacing around operators |
| space-in-parens | rule | no | Enforce consistent spacing inside parentheses |
| space-unary-ops | rule | no | Enforce consistent spacing before or after unary operators |
| switch-colon-spacing | rule | no | Enforce spacing around colons of switch statements |
| template-tag-spacing | rule | no | Require or disallow spacing between template tags and their literals |
| unicode-bom | rule | no | Require or disallow Unicode byte order mark (BOM) |
| wrap-regex | rule | no | Require parenthesis around regex literals |

### ecmaScript6

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| arrow-body-style | rule | no | Require braces around arrow function bodies |
| arrow-parens | rule | no | Require parentheses around arrow function arguments |
| arrow-spacing | rule | no | Enforce consistent spacing before and after the arrow in arrow functions |
| constructor-super | rule | no | Require super() calls in constructors |
| generator-star-spacing | rule | no | Enforce consistent spacing around * operators in generator functions |
| no-class-assign | rule | no | Disallow reassigning class members |
| no-confusing-arrow | rule | no | Disallow arrow functions where they could be confused with comparisons |
| no-const-assign | rule | no | Disallow reassigning const variables |
| no-dupe-class-members | rule | no | Disallow duplicate class members |
| no-duplicate-imports | rule | no | Disallow duplicate module imports |
| no-new-symbol | rule | no | Disallow new operators with the Symbol object |
| no-restricted-imports | rule | no | Disallow specified modules when loaded by import |
| no-this-before-super | rule | no | Disallow this/super before calling super() in constructors |
| no-useless-computed-key | rule | no | Disallow unnecessary computed property keys in object literals |
| no-useless-constructor | rule | no | Disallow unnecessary constructors |
| no-useless-rename | rule | no | Disallow renaming import, export, and destructured assignments to the same name |
| no-var | rule | no | Require let or const instead of var |
| object-shorthand | rule | no | Require or disallow method and property shorthand syntax for object literals |
| prefer-arrow-callback | rule | no | Require arrow functions as callbacks |
| prefer-const | rule | no | Require const declarations for variables that are never reassigned after declared |
| prefer-destructuring | rule | no | Require destructuring from arrays and/or objects |
| prefer-numeric-literals | rule | no | Disallow parseInt() in favor of binary, octal, and hexadecimal literals |
| prefer-reflect | rule | no | Require Reflect methods where applicable |
| prefer-rest-params | rule | no | Require rest parameters instead of arguments |
| prefer-spread | rule | no | Require spread operators instead of .apply() |
| prefer-template | rule | no | Require template literals instead of string concatenation |
| require-yield | rule | no | Require generator functions to contain yield |
| rest-spread-spacing | rule | no | Enforce spacing between rest and spread operators and their expressions |
| sort-imports | rule | no | Enforce sorted import declarations within modules |
| symbol-description | rule | no | Require symbol descriptions |
| template-curly-spacing | rule | no | Require or disallow spacing around embedded expressions of template strings |
| yield-star-spacing | rule | no | Require or disallow spacing around the * in yield* expressions |

### legacy

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| max-depth | rule | no |  |
| max-len | rule | no |  |
| max-params | rule | no |  |
| max-statements | rule | no |  |
| no-bitwise | rule | no |  |
| no-plusplus | rule | no |  |

### env

An environment defines global variables that are predefined.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| amd | yes or no | no | defines require() and define() as global variables as per the amd spec |
| applescript | yes or no | no | AppleScript global variables |
| atomtest | yes or no | no | Atom test helper globals |
| browser | yes or no | no | browser global variables |
| commonjs | yes or no | no | CommonJS global variables and CommonJS scoping (use this for browser-only code that uses Browserify/WebPack) |
| shared-node-browser | yes or no | no | Globals common to both Node and Browser |
| embertest | yes or no | no | Ember test helper globals |
| es6 | yes or no | no | enable all ECMAScript 6 features except for modules |
| greasemonkey | yes or no | no | GreaseMonkey globals |
| jasmine | yes or no | no | adds all of the Jasmine testing global variables for version 1.3 and 2.0 |
| jest | yes or no | no | Jest global variables |
| jquery | yes or no | no | jQuery global variables |
| meteor | yes or no | no | Meteor global variables |
| mocha | yes or no | no | adds all of the Mocha test global variables |
| mongo | yes or no | no | MongoDB global variables |
| nashorn | yes or no | no | Java 8 Nashorn global variables |
| node | yes or no | no | Node.js global variables and Node.js scoping |
| phantomjs | yes or no | no | PhantomJS global variables |
| prototypejs | yes or no | no | Prototype.js global variables |
| protractor | yes or no | no | Protractor global variables |
| qunit | yes or no | no | QUnit global variables |
| serviceworker | yes or no | no | Service Worker global variables |
| shelljs | yes or no | no | ShellJS global variables |
| webextensions | yes or no | no | WebExtensions globals |
| worker | yes or no | no | web workers global variables |

### globals

Set each global variable name equal to true to allow the variable to be overwritten or false to disallow overwriting.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name you choose | one of 2 forms: one of these; yes or no | no |  |

### parser

A single value.

### parserOptions

The JavaScript language options to be supported

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| ecmaFeatures | ecmaFeatures | no |  |
| ecmaVersion | one of: 3, 5, 6, 2015, 7, 2016, 8, 2017, 9, 2018, 10, 2019, 11, 2020, 12, 2021, 13, 2022, 14, 2023, 15, 2024, latest | no | Set to 3, 5 (default), 6, 7, 8, 9, 10, 11, 12, 13, 14, or 15 to specify the version of ECMAScript syntax you want to use. You can also set it to 2015 (same as 6), 2016 (same as 7), 2017 (same as 8), 2018 (same as 9), 2019 (same as 10), 2020 (same as 11), 2021 (same as 12), 2022 (same as 13), 2023 (same as 14), or 2024 (same as 15) to use the year-based naming. You can also set "latest" to use the most recently supported version. |
| sourceType | one of: script, module, commonjs | no | set to "script" (default), "commonjs", or "module" if your code is in ECMAScript modules |

### plugins

ESLint supports the use of third-party plugins. Before using the plugin, you have to install it using npm.

This one is a list. The fields below describe a single entry.

A single value.

### rules

ESLint comes with a large number of rules. You can modify which rules your project uses either using configuration comments or configuration files.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| comma-dangle *(borrowed)* | rule | no | Require or disallow trailing commas |
| for-direction *(borrowed)* | rule | no | Enforce "for" loop update clause moving the counter in the right direction |
| getter-return *(borrowed)* | rule | no | Enforce return statements in getters |
| no-await-in-loop *(borrowed)* | rule | no | Disallow await inside of loops |
| no-compare-neg-zero *(borrowed)* | rule | no | Disallow comparing against -0 |
| no-cond-assign *(borrowed)* | rule | no | Disallow assignment operators in conditional expressions |
| no-console *(borrowed)* | rule | no | Disallow the use of console |
| no-constant-condition *(borrowed)* | rule | no | Disallow constant expressions in conditions |
| no-control-regex *(borrowed)* | rule | no | Disallow control characters in regular expressions |
| no-debugger *(borrowed)* | rule | no | Disallow the use of debugger |
| no-dupe-args *(borrowed)* | rule | no | Disallow duplicate arguments in function definitions |
| no-dupe-keys *(borrowed)* | rule | no | Disallow duplicate keys in object literals |
| no-duplicate-case *(borrowed)* | rule | no | Disallow duplicate case labels |
| no-empty *(borrowed)* | rule | no | Disallow empty block statements |
| no-empty-character-class *(borrowed)* | rule | no | Disallow empty character classes in regular expressions |
| no-ex-assign *(borrowed)* | rule | no | Disallow reassigning exceptions in catch clauses |
| no-extra-boolean-cast *(borrowed)* | rule | no | Disallow unnecessary boolean casts |
| no-extra-parens *(borrowed)* | rule | no | Disallow unnecessary parentheses |
| no-extra-semi *(borrowed)* | rule | no | Disallow unnecessary semicolons |
| no-func-assign *(borrowed)* | rule | no | Disallow reassigning function declarations |
| no-inner-declarations *(borrowed)* | rule | no | Disallow function or var declarations in nested blocks |
| no-invalid-regexp *(borrowed)* | rule | no | Disallow invalid regular expression strings in RegExp constructors |
| no-irregular-whitespace *(borrowed)* | rule | no | Disallow irregular whitespace outside of strings and comments |
| no-negated-in-lhs *(borrowed)* | rule | no | Disallow negating the left operand in in expressions (deprecated) |
| no-obj-calls *(borrowed)* | rule | no | Disallow calling global object properties as functions |
| no-prototype-builtins *(borrowed)* | rule | no | Disallow calling some Object.prototype methods directly on objects |
| no-regex-spaces *(borrowed)* | rule | no | Disallow multiple spaces in regular expressions |
| no-sparse-arrays *(borrowed)* | rule | no | Disallow sparse arrays |
| no-template-curly-in-string *(borrowed)* | rule | no | Disallow template literal placeholder syntax in regular strings |
| no-unexpected-multiline *(borrowed)* | rule | no | Disallow confusing multiline expressions |
| no-unreachable *(borrowed)* | rule | no | Disallow unreachable code after return, throw, continue, and break statements |
| no-unsafe-finally *(borrowed)* | rule | no | Disallow control flow statements in finally blocks |
| no-unsafe-negation *(borrowed)* | rule | no | Disallow negating the left operand of relational operators |
| use-isnan *(borrowed)* | rule | no | Require calls to isNaN() when checking for NaN |
| valid-jsdoc *(borrowed)* | rule | no | Enforce valid JSDoc comments |
| valid-typeof *(borrowed)* | rule | no | Enforce comparing typeof expressions against valid strings |
| accessor-pairs *(borrowed)* | rule | no | Enforce getter and setter pairs in objects |
| array-callback-return *(borrowed)* | rule | no | Enforce return statements in callbacks of array methods |
| block-scoped-var *(borrowed)* | rule | no | Enforce the use of variables within the scope they are defined |
| class-methods-use-this *(borrowed)* | rule | no | Enforce that class methods utilize this |
| complexity *(borrowed)* | rule | no | Enforce a maximum cyclomatic complexity allowed in a program |
| consistent-return *(borrowed)* | rule | no | Require return statements to either always or never specify values |
| curly *(borrowed)* | rule | no | Enforce consistent brace style for all control statements |
| default-case *(borrowed)* | rule | no | Require default cases in switch statements |
| dot-location *(borrowed)* | rule | no | Enforce consistent newlines before and after dots |
| dot-notation *(borrowed)* | rule | no | Enforce dot notation whenever possible |
| eqeqeq *(borrowed)* | rule | no | Require the use of === and !== |
| guard-for-in *(borrowed)* | rule | no | Require for-in loops to include an if statement |
| no-alert *(borrowed)* | rule | no | Disallow the use of alert, confirm, and prompt |
| no-caller *(borrowed)* | rule | no | Disallow the use of arguments.caller or arguments.callee |
| no-case-declarations *(borrowed)* | rule | no | Disallow lexical declarations in case clauses |
| no-div-regex *(borrowed)* | rule | no | Disallow division operators explicitly at the beginning of regular expressions |
| no-else-return *(borrowed)* | rule | no | Disallow else blocks after return statements in if statements |
| no-empty-function *(borrowed)* | rule | no | Disallow empty functions |
| no-empty-pattern *(borrowed)* | rule | no | Disallow empty destructuring patterns |
| no-eq-null *(borrowed)* | rule | no | Disallow null comparisons without type-checking operators |
| no-eval *(borrowed)* | rule | no | Disallow the use of eval() |
| no-extend-native *(borrowed)* | rule | no | Disallow extending native types |
| no-extra-bind *(borrowed)* | rule | no | Disallow unnecessary calls to .bind() |
| no-extra-label *(borrowed)* | rule | no | Disallow unnecessary labels |
| no-fallthrough *(borrowed)* | rule | no | Disallow fallthrough of case statements |
| no-floating-decimal *(borrowed)* | rule | no | Disallow leading or trailing decimal points in numeric literals |
| no-global-assign *(borrowed)* | rule | no | Disallow assignments to native objects or read-only global variables |
| no-implicit-coercion *(borrowed)* | rule | no | Disallow shorthand type conversions |
| no-implicit-globals *(borrowed)* | rule | no | Disallow var and named function declarations in the global scope |
| no-implied-eval *(borrowed)* | rule | no | Disallow the use of eval()-like methods |
| no-invalid-this *(borrowed)* | rule | no | Disallow this keywords outside of classes or class-like objects |
| no-iterator *(borrowed)* | rule | no | Disallow the use of the __iterator__ property |
| no-labels *(borrowed)* | rule | no | Disallow labeled statements |
| no-lone-blocks *(borrowed)* | rule | no | Disallow unnecessary nested blocks |
| no-loop-func *(borrowed)* | rule | no | Disallow function declarations and expressions inside loop statements |
| no-magic-numbers *(borrowed)* | rule | no | Disallow magic numbers |
| no-multi-spaces *(borrowed)* | rule | no | Disallow multiple spaces |
| no-multi-str *(borrowed)* | rule | no | Disallow multiline strings |
| no-native-reassign *(borrowed)* | rule | no |  |
| no-new *(borrowed)* | rule | no | Disallow new operators outside of assignments or comparisons |
| no-new-func *(borrowed)* | rule | no | Disallow new operators with the Function object |
| no-new-wrappers *(borrowed)* | rule | no | Disallow new operators with the String, Number, and Boolean objects |
| no-octal *(borrowed)* | rule | no | Disallow octal literals |
| no-octal-escape *(borrowed)* | rule | no | Disallow octal escape sequences in string literals |
| no-param-reassign *(borrowed)* | rule | no | Disallow reassigning function parameters |
| no-proto *(borrowed)* | rule | no | Disallow the use of the __proto__ property |
| no-redeclare *(borrowed)* | rule | no | Disallow var redeclaration |
| no-restricted-properties *(borrowed)* | rule | no | Disallow certain properties on certain objects |
| no-return-assign *(borrowed)* | rule | no | Disallow assignment operators in return statements |
| no-return-await *(borrowed)* | rule | no | Disallow unnecessary return await |
| no-script-url *(borrowed)* | rule | no | Disallow javascript: urls |
| no-self-assign *(borrowed)* | rule | no | Disallow assignments where both sides are exactly the same |
| no-self-compare *(borrowed)* | rule | no | Disallow comparisons where both sides are exactly the same |
| no-sequences *(borrowed)* | rule | no | Disallow comma operators |
| no-throw-literal *(borrowed)* | rule | no | Disallow throwing literals as exceptions |
| no-unmodified-loop-condition *(borrowed)* | rule | no | Disallow unmodified loop conditions |
| no-unused-expressions *(borrowed)* | rule | no | Disallow unused expressions |
| no-unused-labels *(borrowed)* | rule | no | Disallow unused labels |
| no-useless-call *(borrowed)* | rule | no | Disallow unnecessary calls to .call() and .apply() |
| no-useless-concat *(borrowed)* | rule | no | Disallow unnecessary concatenation of literals or template literals |
| no-useless-escape *(borrowed)* | rule | no | Disallow unnecessary escape characters |
| no-useless-return *(borrowed)* | rule | no | Disallow redundant return statements |
| no-void *(borrowed)* | rule | no | Disallow void operators |
| no-warning-comments *(borrowed)* | rule | no | Disallow specified warning terms in comments |
| no-with *(borrowed)* | rule | no | Disallow with statements |
| prefer-promise-reject-errors *(borrowed)* | rule | no | Require using Error objects as Promise rejection reasons |
| radix *(borrowed)* | rule | no | Enforce the consistent use of the radix argument when using parseInt() |
| require-await *(borrowed)* | rule | no | Disallow async functions which have no await expression |
| vars-on-top *(borrowed)* | rule | no | Require var declarations be placed at the top of their containing scope |
| wrap-iife *(borrowed)* | rule | no | Require parentheses around immediate function invocations |
| yoda *(borrowed)* | rule | no | Require or Disallow "Yoda" conditions |
| strict *(borrowed)* | rule | no | require or disallow strict mode directives |
| init-declarations *(borrowed)* | rule | no | Require or disallow initialization in var declarations |
| no-catch-shadow *(borrowed)* | rule | no | Disallow catch clause parameters from shadowing variables in the outer scope |
| no-delete-var *(borrowed)* | rule | no | Disallow deleting variables |
| no-label-var *(borrowed)* | rule | no | Disallow labels that share a name with a variable |
| no-restricted-globals *(borrowed)* | rule | no | Disallow specified global variables |
| no-shadow *(borrowed)* | rule | no | Disallow var declarations from shadowing variables in the outer scope |
| no-shadow-restricted-names *(borrowed)* | rule | no | Disallow identifiers from shadowing restricted names |
| no-undef *(borrowed)* | rule | no | Disallow the use of undeclared variables unless mentioned in /*global */ comments |
| no-undefined *(borrowed)* | rule | no | Disallow the use of undefined as an identifier |
| no-undef-init *(borrowed)* | rule | no | Disallow initializing variables to undefined |
| no-unused-vars *(borrowed)* | rule | no | Disallow unused variables |
| no-use-before-define *(borrowed)* | rule | no | Disallow the use of variables before they are defined |
| callback-return *(borrowed)* | rule | no | Require return statements after callbacks |
| global-require *(borrowed)* | rule | no | Require require() calls to be placed at top-level module scope |
| handle-callback-err *(borrowed)* | rule | no | Require error handling in callbacks |
| no-buffer-constructor *(borrowed)* | rule | no | Disallow use of the Buffer() constructor |
| no-mixed-requires *(borrowed)* | rule | no | Disallow require calls to be mixed with regular var declarations |
| no-new-require *(borrowed)* | rule | no | Disallow new operators with calls to require |
| no-path-concat *(borrowed)* | rule | no | Disallow string concatenation with __dirname and __filename |
| no-process-env *(borrowed)* | rule | no | Disallow the use of process.env |
| no-process-exit *(borrowed)* | rule | no | Disallow the use of process.exit() |
| no-restricted-modules *(borrowed)* | rule | no | Disallow specified modules when loaded by require |
| no-sync *(borrowed)* | rule | no | Disallow synchronous methods |
| array-bracket-newline *(borrowed)* | rule | no | Enforce line breaks after opening and before closing array brackets |
| array-bracket-spacing *(borrowed)* | rule | no | Enforce consistent spacing inside array brackets |
| array-element-newline *(borrowed)* | rule | no | Enforce line breaks after each array element |
| block-spacing *(borrowed)* | rule | no | Enforce consistent spacing inside single-line blocks |
| brace-style *(borrowed)* | rule | no | Enforce consistent brace style for blocks |
| camelcase *(borrowed)* | rule | no | Enforce camelcase naming convention |
| capitalized-comments *(borrowed)* | rule | no | Enforce or disallow capitalization of the first letter of a comment |
| comma-spacing *(borrowed)* | rule | no | Enforce consistent spacing before and after commas |
| comma-style *(borrowed)* | rule | no | Enforce consistent comma style |
| computed-property-spacing *(borrowed)* | rule | no | Enforce consistent spacing inside computed property brackets |
| consistent-this *(borrowed)* | rule | no | Enforce consistent naming when capturing the current execution context |
| eol-last *(borrowed)* | rule | no | Enforce at least one newline at the end of files |
| func-call-spacing *(borrowed)* | rule | no | Require or disallow spacing between function identifiers and their invocations |
| func-name-matching *(borrowed)* | rule | no | Require function names to match the name of the variable or property to which they are assigned |
| func-names *(borrowed)* | rule | no | Require or disallow named function expressions |
| func-style *(borrowed)* | rule | no | Enforce the consistent use of either function declarations or expressions |
| function-call-argument-newline *(borrowed)* | rule | no | Enforce line breaks between arguments of a function call |
| function-paren-newline *(borrowed)* | rule | no | Enforce consistent line breaks inside function parentheses |
| id-blacklist *(borrowed)* | rule | no | Disallow specified identifiers |
| id-length *(borrowed)* | rule | no | Enforce minimum and maximum identifier lengths |
| id-match *(borrowed)* | rule | no | Require identifiers to match a specified regular expression |
| implicit-arrow-linebreak *(borrowed)* | rule | no | Enforce the location of arrow function bodies |
| indent *(borrowed)* | rule | no | Enforce consistent indentation |
| indent-legacy *(borrowed)* | rule | no | Enforce consistent indentation (legacy, deprecated) |
| jsx-quotes *(borrowed)* | rule | no | Enforce the consistent use of either double or single quotes in JSX attributes |
| key-spacing *(borrowed)* | rule | no | Enforce consistent spacing between keys and values in object literal properties |
| keyword-spacing *(borrowed)* | rule | no | Enforce consistent spacing before and after keywords |
| line-comment-position *(borrowed)* | rule | no | Enforce position of line comments |
| lines-between-class-members *(borrowed)* | rule | no | Require or disallow an empty line between class members |
| linebreak-style *(borrowed)* | rule | no | Enforce consistent linebreak style |
| lines-around-comment *(borrowed)* | rule | no | Require empty lines around comments |
| lines-around-directive *(borrowed)* | rule | no | Require or disallow newlines around directives |
| max-depth *(borrowed)* | rule | no | Enforce a maximum depth that blocks can be nested |
| max-len *(borrowed)* | rule | no | Enforce a maximum line length |
| max-lines *(borrowed)* | rule | no | Enforce a maximum number of lines per file |
| max-nested-callbacks *(borrowed)* | rule | no | Enforce a maximum depth that callbacks can be nested |
| max-params *(borrowed)* | rule | no | Enforce a maximum number of parameters in function definitions |
| max-statements *(borrowed)* | rule | no | Enforce a maximum number of statements allowed in function blocks |
| max-statements-per-line *(borrowed)* | rule | no | Enforce a maximum number of statements allowed per line |
| multiline-comment-style *(borrowed)* | rule | no | Enforce a particular style for multiline comments |
| multiline-ternary *(borrowed)* | rule | no | Enforce newlines between operands of ternary expressions |
| new-cap *(borrowed)* | rule | no | Require constructor function names to begin with a capital letter |
| newline-after-var *(borrowed)* | rule | no | Require or disallow an empty line after var declarations |
| newline-before-return *(borrowed)* | rule | no | Require an empty line before return statements |
| newline-per-chained-call *(borrowed)* | rule | no | Require a newline after each call in a method chain |
| new-parens *(borrowed)* | rule | no | Require parentheses when invoking a constructor with no arguments |
| no-array-constructor *(borrowed)* | rule | no | Disallow Array constructors |
| no-bitwise *(borrowed)* | rule | no | Disallow bitwise operators |
| no-continue *(borrowed)* | rule | no | Disallow continue statements |
| no-inline-comments *(borrowed)* | rule | no | Disallow inline comments after code |
| no-lonely-if *(borrowed)* | rule | no | Disallow if statements as the only statement in else blocks |
| no-mixed-operators *(borrowed)* | rule | no | Disallow mixed binary operators |
| no-mixed-spaces-and-tabs *(borrowed)* | rule | no | Disallow mixed spaces and tabs for indentation |
| no-multi-assign *(borrowed)* | rule | no | Disallow use of chained assignment expressions |
| no-multiple-empty-lines *(borrowed)* | rule | no | Disallow multiple empty lines |
| no-negated-condition *(borrowed)* | rule | no | Disallow negated conditions |
| no-nested-ternary *(borrowed)* | rule | no | Disallow nested ternary expressions |
| no-new-object *(borrowed)* | rule | no | Disallow Object constructors |
| no-plusplus *(borrowed)* | rule | no | Disallow the unary operators ++ and -- |
| no-restricted-syntax *(borrowed)* | rule | no | Disallow specified syntax |
| no-spaced-func *(borrowed)* | rule | no |  |
| no-tabs *(borrowed)* | rule | no | Disallow tabs in file |
| no-ternary *(borrowed)* | rule | no | Disallow ternary operators |
| no-trailing-spaces *(borrowed)* | rule | no | Disallow trailing whitespace at the end of lines |
| no-underscore-dangle *(borrowed)* | rule | no | Disallow dangling underscores in identifiers |
| no-unneeded-ternary *(borrowed)* | rule | no | Disallow ternary operators when simpler alternatives exist |
| no-whitespace-before-property *(borrowed)* | rule | no | Disallow whitespace before properties |
| nonblock-statement-body-position *(borrowed)* | rule | no | Enforce the location of single-line statements |
| object-curly-newline *(borrowed)* | rule | no | Enforce consistent line breaks inside braces |
| object-curly-spacing *(borrowed)* | rule | no | Enforce consistent spacing inside braces |
| object-property-newline *(borrowed)* | rule | no | Enforce placing object properties on separate lines |
| object-shorthand *(borrowed)* | rule | no |  |
| one-var *(borrowed)* | rule | no | Enforce variables to be declared either together or separately in functions |
| one-var-declaration-per-line *(borrowed)* | rule | no | Require or disallow newlines around var declarations |
| operator-assignment *(borrowed)* | rule | no | Require or disallow assignment operator shorthand where possible |
| operator-linebreak *(borrowed)* | rule | no | Enforce consistent linebreak style for operators |
| padded-blocks *(borrowed)* | rule | no | Require or disallow padding within blocks |
| padding-line-between-statements *(borrowed)* | rule | no | Require or disallow padding lines between statements |
| quote-props *(borrowed)* | rule | no | Require quotes around object literal property names |
| quotes *(borrowed)* | rule | no | Enforce the consistent use of either backticks, double, or single quotes |
| require-jsdoc *(borrowed)* | rule | no | Require JSDoc comments |
| semi *(borrowed)* | rule | no | Require or disallow semicolons instead of ASI |
| semi-spacing *(borrowed)* | rule | no | Enforce consistent spacing before and after semicolons |
| semi-style *(borrowed)* | rule | no | Enforce location of semicolons |
| sort-keys *(borrowed)* | rule | no | Requires object keys to be sorted |
| sort-vars *(borrowed)* | rule | no | Require variables within the same declaration block to be sorted |
| space-before-blocks *(borrowed)* | rule | no | Enforce consistent spacing before blocks |
| space-before-function-paren *(borrowed)* | rule | no | Enforce consistent spacing before function definition opening parenthesis |
| spaced-comment *(borrowed)* | rule | no | Enforce consistent spacing after the // or /* in a comment |
| space-infix-ops *(borrowed)* | rule | no | Require spacing around operators |
| space-in-parens *(borrowed)* | rule | no | Enforce consistent spacing inside parentheses |
| space-unary-ops *(borrowed)* | rule | no | Enforce consistent spacing before or after unary operators |
| switch-colon-spacing *(borrowed)* | rule | no | Enforce spacing around colons of switch statements |
| template-tag-spacing *(borrowed)* | rule | no | Require or disallow spacing between template tags and their literals |
| unicode-bom *(borrowed)* | rule | no | Require or disallow Unicode byte order mark (BOM) |
| wrap-regex *(borrowed)* | rule | no | Require parenthesis around regex literals |
| arrow-body-style *(borrowed)* | rule | no | Require braces around arrow function bodies |
| arrow-parens *(borrowed)* | rule | no | Require parentheses around arrow function arguments |
| arrow-spacing *(borrowed)* | rule | no | Enforce consistent spacing before and after the arrow in arrow functions |
| constructor-super *(borrowed)* | rule | no | Require super() calls in constructors |
| generator-star-spacing *(borrowed)* | rule | no | Enforce consistent spacing around * operators in generator functions |
| no-class-assign *(borrowed)* | rule | no | Disallow reassigning class members |
| no-confusing-arrow *(borrowed)* | rule | no | Disallow arrow functions where they could be confused with comparisons |
| no-const-assign *(borrowed)* | rule | no | Disallow reassigning const variables |
| no-dupe-class-members *(borrowed)* | rule | no | Disallow duplicate class members |
| no-duplicate-imports *(borrowed)* | rule | no | Disallow duplicate module imports |
| no-new-symbol *(borrowed)* | rule | no | Disallow new operators with the Symbol object |
| no-restricted-imports *(borrowed)* | rule | no | Disallow specified modules when loaded by import |
| no-this-before-super *(borrowed)* | rule | no | Disallow this/super before calling super() in constructors |
| no-useless-computed-key *(borrowed)* | rule | no | Disallow unnecessary computed property keys in object literals |
| no-useless-constructor *(borrowed)* | rule | no | Disallow unnecessary constructors |
| no-useless-rename *(borrowed)* | rule | no | Disallow renaming import, export, and destructured assignments to the same name |
| no-var *(borrowed)* | rule | no | Require let or const instead of var |
| prefer-arrow-callback *(borrowed)* | rule | no | Require arrow functions as callbacks |
| prefer-const *(borrowed)* | rule | no | Require const declarations for variables that are never reassigned after declared |
| prefer-destructuring *(borrowed)* | rule | no | Require destructuring from arrays and/or objects |
| prefer-numeric-literals *(borrowed)* | rule | no | Disallow parseInt() in favor of binary, octal, and hexadecimal literals |
| prefer-reflect *(borrowed)* | rule | no | Require Reflect methods where applicable |
| prefer-rest-params *(borrowed)* | rule | no | Require rest parameters instead of arguments |
| prefer-spread *(borrowed)* | rule | no | Require spread operators instead of .apply() |
| prefer-template *(borrowed)* | rule | no | Require template literals instead of string concatenation |
| require-yield *(borrowed)* | rule | no | Require generator functions to contain yield |
| rest-spread-spacing *(borrowed)* | rule | no | Enforce spacing between rest and spread operators and their expressions |
| sort-imports *(borrowed)* | rule | no | Enforce sorted import declarations within modules |
| symbol-description *(borrowed)* | rule | no | Require symbol descriptions |
| template-curly-spacing *(borrowed)* | rule | no | Require or disallow spacing around embedded expressions of template strings |
| yield-star-spacing *(borrowed)* | rule | no | Require or disallow spacing around the * in yield* expressions |

### settings

ESLint supports adding shared settings into configuration file. You can add settings object to ESLint configuration file and it will be supplied to every rule that will be executed. This may be useful if you are adding custom rules and want them to have access to the same information and be easily configurable.

A single value.

### overrides

Allows to override configuration for files and folders, specified by glob patterns

This one is a list. The fields below describe a single entry. Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| files | one of 2 forms: text; a list | yes, always | Glob pattern for files to apply 'overrides' configuration, relative to the directory of the config file |
| extends | stringOrStringArray | no | If you want to extend a specific configuration file, you can use the extends property and specify the path to the file. The path can be either relative or absolute. |
| excludedFiles | stringOrStringArray | no | If a file matches any of the 'excludedFiles' glob patterns, the 'overrides' configuration won't apply |
| ecmaFeatures | ecmaFeatures | no |  |
| env | env | no |  |
| globals | globals | no |  |
| parser | parser | no |  |
| parserOptions | parserOptions | no |  |
| plugins | plugins, itself a list | no |  |
| processor | text | no | To specify a processor, specify the plugin name and processor name joined by a forward slash |
| rules | rules | no |  |
| settings | settings | no |  |
| overrides | overrides, itself a list | no |  |
