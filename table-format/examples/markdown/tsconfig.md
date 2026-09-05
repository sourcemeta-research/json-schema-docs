# JSON schema for the TypeScript compiler's configuration file

## What this file holds

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| compilerOptions *(borrowed)* | one of 1 forms: a group of fields; the value itself may be empty | no | Instructs the TypeScript compiler how to compile .ts files. |
| compileOnSave *(borrowed)* | one of 1 forms: yes or no; the value itself may be empty | no | Enable Compile-on-Save for this project. |
| typeAcquisition *(borrowed)* | one of 1 forms: a group of fields; the value itself may be empty | no | Auto type (.d.ts) acquisition options for this project. Requires TypeScript version 2.1 or later. |
| extends *(borrowed)* | one of 2 forms: text; a list | no | Path to base configuration file to inherit from. Requires TypeScript version 2.1 or later. --- The value of `extends` is a string which contains a path to another configuration file to inherit from. The path may use Node.js style resolution. The configuration from the base file are loaded first, then overridden by those in the inheriting config file. All relative paths found in the configuration file will be resolved relative to the configuration file they originated in. It's worth noting that [`files`](https://typescriptlang.org/tsconfig/#files), [`include`](https://typescriptlang.org/tsconfig/#include), and [`exclude`](https://typescriptlang.org/tsconfig/#exclude) from the inheriting config file _overwrite_ those from the base config file, and that circularity between configuration files is not allowed. Currently, the only top-level property that is excluded from inheritance is [`references`](https://typescriptlang.org/tsconfig/#references). ##### Example `configs/base.json`: ```json tsconfig {   "compilerOptions": {     "noImplicitAny": true,     "strictNullChecks": true   } } ``` `tsconfig.json`: ```json tsconfig {   "extends": "./configs/base",   "files": ["main.ts", "supplemental.ts"] } ``` `tsconfig.nostrictnull.json`: ```json tsconfig {   "extends": "./tsconfig",   "compilerOptions": {     "strictNullChecks": false   } } ``` Properties with relative paths found in the configuration file, which aren't excluded from inheritance, will be resolved relative to the configuration file they originated in. |
| watchOptions *(borrowed)* | one of 1 forms: a group of fields; the value itself may be empty | no | Settings for the watch mode in TypeScript. |
| buildOptions *(borrowed)* | a group of fields | no |  |
| buildOptions.dry | one of 1 forms: yes or no; the value itself may be empty; left out means no | no | ~ |
| buildOptions.force | one of 1 forms: yes or no; the value itself may be empty; left out means no | no | Build all projects, including those that appear to be up to date |
| buildOptions.verbose | one of 1 forms: yes or no; the value itself may be empty; left out means no | no | Enable verbose logging |
| buildOptions.incremental | one of 1 forms: yes or no; the value itself may be empty; left out means no | no | Tells TypeScript to save information about the project graph from the last compilation to files stored on disk. This creates a series of `.tsbuildinfo` files in the same folder as your compilation output. They are not used by your JavaScript at runtime and can be safely deleted. You can read more about the flag in the [3.4 release notes](https://typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#faster-subsequent-builds-with-the---incremental-flag). To control which folders you want to the files to be built to, use the config option [`tsBuildInfoFile`](https://typescriptlang.org/tsconfig/#tsBuildInfoFile). |
| buildOptions.assumeChangesOnlyAffectDirectDependencies | one of 1 forms: yes or no; the value itself may be empty; left out means no | no | When this option is enabled, TypeScript will avoid rechecking/rebuilding all truly possibly-affected files, and only recheck/rebuild files that have changed as well as files that directly import them. This can be considered a 'fast & loose' implementation of the watching algorithm, which can drastically reduce incremental rebuild times at the expense of having to run the full build occasionally to get all compiler error messages. |
| buildOptions.traceResolution | one of 1 forms: yes or no; the value itself may be empty; left out means no | no | When you are trying to debug why a module isn't being included. You can set `traceResolution` to `true` to have TypeScript print information about its resolution process for each processed file. |
| ts-node *(borrowed)* | one of 1 forms: a group of fields; the value itself may be empty | no | ts-node options.  See also: https://typestrong.org/ts-node/docs/configuration ts-node offers TypeScript execution and REPL for node.js, with source map support. |

## All 14 shapes

Most used first, because everything else is built on them.

- **filesDefinition** (used 1)
- **excludeDefinition** (used 1)
- **includeDefinition** (used 1)
- **compileOnSaveDefinition** (used 1)
- **extendsDefinition** (used 1)
- **buildOptionsDefinition** (used 1)
- **watchOptionsDefinition** (used 1)
- **compilerOptions** (used 1)
- **typeAcquisitionDefinition** (used 1)
- **referencesDefinition** (used 1)
- **tsNodeModuleTypes** (used 1)
- **tsNodeDefinition** (used 1)
- **compilerOptionsDefinition** (used 1)
- ****

### filesDefinition

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| files | one of 1 forms: a list; the value itself may be empty | no | If no 'files' or 'include' property is present in a tsconfig.json, the compiler defaults to including all files in the containing directory and subdirectories except those specified by 'exclude'. When a 'files' property is specified, only those files and those specified by 'include' are included. --- Specifies an allowlist of files to include in the program. An error occurs if any of the files can't be found. ```json tsconfig {   "compilerOptions": {},   "files": [     "core.ts",     "sys.ts",     "types.ts",     "scanner.ts",     "parser.ts",     "utilities.ts",     "binder.ts",     "checker.ts",     "tsc.ts"   ] } ``` This is useful when you only have a small number of files and don't need to use a glob to reference many files. If you need that then use [`include`](https://typescriptlang.org/tsconfig/#include). |

### excludeDefinition

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| exclude | one of 1 forms: a list; the value itself may be empty | no | Specifies a list of files to be excluded from compilation. The 'exclude' property only affects the files included via the 'include' property and not the 'files' property. Glob patterns require TypeScript version 2.0 or later. --- Specifies an array of filenames or patterns that should be skipped when resolving [`include`](https://typescriptlang.org/tsconfig/#include). **Important**: `exclude` _only_ changes which files are included as a result of the [`include`](https://typescriptlang.org/tsconfig/#include) setting. A file specified by `exclude` can still become part of your codebase due to an `import` statement in your code, a `types` inclusion, a `/// <reference` directive, or being specified in the [`files`](https://typescriptlang.org/tsconfig/#files) list. It is not a mechanism that **prevents** a file from being included in the codebase - it simply changes what the [`include`](https://typescriptlang.org/tsconfig/#include) setting finds. |

### includeDefinition

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| include | one of 1 forms: a list; the value itself may be empty | no | Specifies a list of glob patterns that match files to be included in compilation. If no 'files' or 'include' property is present in a tsconfig.json, the compiler defaults to including all files in the containing directory and subdirectories except those specified by 'exclude'. Requires TypeScript version 2.0 or later. --- Specifies an array of filenames or patterns to include in the program. These filenames are resolved relative to the directory containing the `tsconfig.json` file. ```json {   "include": ["src/**/*", "tests/**/*"] } ``` Which would include: <!-- TODO: #135 ```diff   . - ├── scripts - │   ├── lint.ts - │   ├── update_deps.ts - │   └── utils.ts + ├── src + │   ├── client + │   │    ├── index.ts + │   │    └── utils.ts + │   ├── server + │   │    └── index.ts + ├── tests + │   ├── app.test.ts + │   ├── utils.ts + │   └── tests.d.ts - ├── package.json - ├── tsconfig.json - └── yarn.lock ``` --> ``` . ├── scripts                ⨯ │   ├── lint.ts            ⨯ │   ├── update_deps.ts     ⨯ │   └── utils.ts           ⨯ ├── src                    ✓ │   ├── client             ✓ │   │    ├── index.ts      ✓ │   │    └── utils.ts      ✓ │   ├── server             ✓ │   │    └── index.ts      ✓ ├── tests                  ✓ │   ├── app.test.ts        ✓ │   ├── utils.ts           ✓ │   └── tests.d.ts         ✓ ├── package.json ├── tsconfig.json └── yarn.lock ``` `include` and `exclude` support wildcard characters to make glob patterns: - `*` matches zero or more characters (excluding directory separators) - `?` matches any one character (excluding directory separators) - `**/` matches any directory nested to any level If the last path segment in a pattern does not contain a file extension or wildcard character, then it is treated as a directory, and files with supported extensions inside that directory are included (e.g. `.ts`, `.tsx`, and `.d.ts` by default, with `.js` and `.jsx` if [`allowJs`](https://typescriptlang.org/tsconfig/#allowJs) is set to true). |

### compileOnSaveDefinition

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| compileOnSave | one of 1 forms: yes or no; the value itself may be empty | no | Enable Compile-on-Save for this project. |

### extendsDefinition

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| extends | one of 2 forms: text; a list | no | Path to base configuration file to inherit from. Requires TypeScript version 2.1 or later. --- The value of `extends` is a string which contains a path to another configuration file to inherit from. The path may use Node.js style resolution. The configuration from the base file are loaded first, then overridden by those in the inheriting config file. All relative paths found in the configuration file will be resolved relative to the configuration file they originated in. It's worth noting that [`files`](https://typescriptlang.org/tsconfig/#files), [`include`](https://typescriptlang.org/tsconfig/#include), and [`exclude`](https://typescriptlang.org/tsconfig/#exclude) from the inheriting config file _overwrite_ those from the base config file, and that circularity between configuration files is not allowed. Currently, the only top-level property that is excluded from inheritance is [`references`](https://typescriptlang.org/tsconfig/#references). ##### Example `configs/base.json`: ```json tsconfig {   "compilerOptions": {     "noImplicitAny": true,     "strictNullChecks": true   } } ``` `tsconfig.json`: ```json tsconfig {   "extends": "./configs/base",   "files": ["main.ts", "supplemental.ts"] } ``` `tsconfig.nostrictnull.json`: ```json tsconfig {   "extends": "./tsconfig",   "compilerOptions": {     "strictNullChecks": false   } } ``` Properties with relative paths found in the configuration file, which aren't excluded from inheritance, will be resolved relative to the configuration file they originated in. |

### buildOptionsDefinition

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| buildOptions | a group of fields | no |  |
| buildOptions.dry | one of 1 forms: yes or no; the value itself may be empty; left out means no | no | ~ |
| buildOptions.force | one of 1 forms: yes or no; the value itself may be empty; left out means no | no | Build all projects, including those that appear to be up to date |
| buildOptions.verbose | one of 1 forms: yes or no; the value itself may be empty; left out means no | no | Enable verbose logging |
| buildOptions.incremental | one of 1 forms: yes or no; the value itself may be empty; left out means no | no | Tells TypeScript to save information about the project graph from the last compilation to files stored on disk. This creates a series of `.tsbuildinfo` files in the same folder as your compilation output. They are not used by your JavaScript at runtime and can be safely deleted. You can read more about the flag in the [3.4 release notes](https://typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#faster-subsequent-builds-with-the---incremental-flag). To control which folders you want to the files to be built to, use the config option [`tsBuildInfoFile`](https://typescriptlang.org/tsconfig/#tsBuildInfoFile). |
| buildOptions.assumeChangesOnlyAffectDirectDependencies | one of 1 forms: yes or no; the value itself may be empty; left out means no | no | When this option is enabled, TypeScript will avoid rechecking/rebuilding all truly possibly-affected files, and only recheck/rebuild files that have changed as well as files that directly import them. This can be considered a 'fast & loose' implementation of the watching algorithm, which can drastically reduce incremental rebuild times at the expense of having to run the full build occasionally to get all compiler error messages. |
| buildOptions.traceResolution | one of 1 forms: yes or no; the value itself may be empty; left out means no | no | When you are trying to debug why a module isn't being included. You can set `traceResolution` to `true` to have TypeScript print information about its resolution process for each processed file. |

### watchOptionsDefinition

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| watchOptions | one of 1 forms: a group of fields; the value itself may be empty | no | Settings for the watch mode in TypeScript. |

### compilerOptions

Instructs the TypeScript compiler how to compile .ts files.

A single value.

### typeAcquisitionDefinition

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| typeAcquisition | one of 1 forms: a group of fields; the value itself may be empty | no | Auto type (.d.ts) acquisition options for this project. Requires TypeScript version 2.1 or later. |

### referencesDefinition

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| references | a list, each one a group of fields | no | Referenced projects. Requires TypeScript version 3.0 or later. --- Project references are a way to structure your TypeScript programs into smaller pieces. Using Project References can greatly improve build and editor interaction times, enforce logical separation between components, and organize your code in new and improved ways. You can read more about how references works in the [Project References](https://typescriptlang.org/docs/handbook/project-references.html) section of the handbook |
| references[].path | text; from 1 to any characters | no | Path to referenced tsconfig or to folder containing tsconfig. |

### tsNodeModuleTypes

A single value.

### tsNodeDefinition

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| ts-node | one of 1 forms: a group of fields; the value itself may be empty | no | ts-node options.  See also: https://typestrong.org/ts-node/docs/configuration ts-node offers TypeScript execution and REPL for node.js, with source map support. |

### compilerOptionsDefinition

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| compilerOptions | one of 1 forms: a group of fields; the value itself may be empty | no | Instructs the TypeScript compiler how to compile .ts files. |

### 

A single value.
