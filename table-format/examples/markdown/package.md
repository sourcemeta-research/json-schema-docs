# JSON schema for NPM package.json files

## What this file holds

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| name | text; from 1 to 214 characters | no | The name of the package. |
| version | text | no | Version must be parsable by node-semver, which is bundled with npm as a dependency. |
| description | text | no | This helps people discover your package, as it's listed in 'npm search'. |
| keywords | a list, each one text | no | This helps people discover your package as it's listed in 'npm search'. |
| homepage | text | no | The url to the project homepage. |
| bugs | a group of fields | no | The url to your project's issue tracker and / or the email address to which issues should be reported. These are helpful for people who encounter issues with your package. |
| bugs.url | a web address | no | The url to your project's issue tracker. |
| bugs.email | an email address | no | The email address to which issues should be reported. |
| license | license | no | You should specify a license for your package so that people know how they are permitted to use it, and any restrictions you're placing on it. |
| licenses | a list, each one a group of fields | no | DEPRECATED: Instead, use SPDX expressions, like this: { "license": "ISC" } or { "license": "(MIT OR Apache-2.0)" } see: 'https://docs.npmjs.com/files/package.json#license'. |
| licenses[].type | license | no |  |
| licenses[].url | a web address | no |  |
| author | person | no |  |
| contributors | a list, each one person | no | A list of people who contributed to this package. |
| maintainers | a list, each one person | no | A list of people who maintains this package. |
| files | a list, each one text | no | The 'files' field is an array of files to include in your project. If you name a folder in the array, then it will also include the files inside that folder. |
| main | text | no | The main field is a module ID that is the primary entry point to your program. |
| exports | one of 4 forms: packageExportsEntryPath; a group of fields; packageExportsEntryObject; packageExportsFallback | no | The "exports" field is used to restrict external access to non-exported module files, also enables a module to import itself using "name". |
| imports | a group of fields; nothing else may be added here | no | The "imports" field is used to create private mappings that only apply to import specifiers from within the package itself. |
| imports.any name in a set format | packageImportsEntryOrFallback | no | The module path that is resolved when this environment matches the property name. |
| bin | a group of fields | no |  |
| bin.any name you choose | text | no |  |
| type | one of: commonjs, module | no | When set to "module", the type field allows a package to specify all .js files within are ES modules. If the "type" field is omitted or set to "commonjs", all .js files are treated as CommonJS. |
| types | text | no | Set the types property to point to your bundled declaration file. |
| typings | text | no | Note that the "typings" field is synonymous with "types", and could be used as well. |
| typesVersions | a group of fields | no | The "typesVersions" field is used since TypeScript 3.1 to support features that were only made available in newer TypeScript versions. |
| typesVersions.any name you choose | a group of fields; nothing else may be added here | no | Contains overrides for the TypeScript version that matches the version range matching the property key. |
| typesVersions.any name you choose.* | a list, each one text | no | Maps all file paths to the file paths specified in the array. |
| typesVersions.any name you choose.any name in a set format | a list, each one text | no | Maps the file path matching the property key to the file paths specified in the array. |
| typesVersions.any name you choose.any name in a set format | a list, each one text | no | Maps file paths matching the pattern specified in property key to file paths specified in the array. |
| man | a list, each one text | no | Specify either a single file or an array of filenames to put in place for the man program to find. |
| directories | a group of fields | no |  |
| directories.bin | text | no | If you specify a 'bin' directory, then all the files in that folder will be used as the 'bin' hash. |
| directories.doc | text | no | Put markdown files in here. Eventually, these will be displayed nicely, maybe, someday. |
| directories.example | text | no | Put example scripts in here. Someday, it might be exposed in some clever way. |
| directories.lib | text | no | Tell people where the bulk of your library is. Nothing special is done with the lib folder in any way, but it's useful meta info. |
| directories.man | text | no | A folder that is full of man pages. Sugar to generate a 'man' array by walking the folder. |
| directories.test | text | no |  |
| repository | a group of fields | no | Specify the place where your code lives. This is helpful for people who want to contribute. |
| repository.type | text | no |  |
| repository.url | text | no |  |
| repository.directory | text | no |  |
| funding | one of 3 forms: fundingUrl; fundingWay; a list | no |  |
| scripts | a group of fields | no | The 'scripts' member is an object hash of script commands that are run at various times in the lifecycle of your package. The key is the lifecycle event, and the value is the command to run at that point. |
| scripts.lint | text | no | Run code quality tools, e.g. ESLint, TSLint, etc. |
| scripts.prepublish | text | no | Run BEFORE the package is published (Also run on local npm install without any arguments). |
| scripts.prepare | text | no | Runs BEFORE the package is packed, i.e. during "npm publish" and "npm pack", and on local "npm install" without any arguments. This is run AFTER "prepublish", but BEFORE "prepublishOnly". |
| scripts.prepublishOnly | text | no | Run BEFORE the package is prepared and packed, ONLY on npm publish. |
| scripts.prepack | text | no | run BEFORE a tarball is packed (on npm pack, npm publish, and when installing git dependencies). |
| scripts.postpack | text | no | Run AFTER the tarball has been generated and moved to its final destination. |
| scripts.publish | text | no | Publishes a package to the registry so that it can be installed by name. See https://docs.npmjs.com/cli/v8/commands/npm-publish |
| scripts.postpublish | scriptsPublishAfter | no |  |
| scripts.preinstall | text | no | Run BEFORE the package is installed. |
| scripts.install | scriptsInstallAfter | no |  |
| scripts.postinstall | scriptsInstallAfter | no |  |
| scripts.preuninstall | scriptsUninstallBefore | no |  |
| scripts.uninstall | scriptsUninstallBefore | no |  |
| scripts.postuninstall | text | no | Run AFTER the package is uninstalled. |
| scripts.preversion | scriptsVersionBefore | no |  |
| scripts.version | scriptsVersionBefore | no |  |
| scripts.postversion | text | no | Run AFTER bump the package version. |
| scripts.pretest | scriptsTest | no |  |
| scripts.test | scriptsTest | no |  |
| scripts.posttest | scriptsTest | no |  |
| scripts.prestop | scriptsStop | no |  |
| scripts.stop | scriptsStop | no |  |
| scripts.poststop | scriptsStop | no |  |
| scripts.prestart | scriptsStart | no |  |
| scripts.start | scriptsStart | no |  |
| scripts.poststart | scriptsStart | no |  |
| scripts.prerestart | scriptsRestart | no |  |
| scripts.restart | scriptsRestart | no |  |
| scripts.postrestart | scriptsRestart | no |  |
| scripts.serve | text | no | Start dev server to serve application files |
| scripts.any name you choose | text | no |  |
| config | a group of fields | no | A 'config' hash can be used to set configuration parameters used in package scripts that persist across upgrades. |
| dependencies | dependency | no |  |
| devDependencies | devDependency | no |  |
| optionalDependencies | optionalDependency | no |  |
| peerDependencies | peerDependency | no |  |
| peerDependenciesMeta | peerDependencyMeta | no |  |
| bundleDependencies | one of 2 forms: a list; yes or no | no | Array of package names that will be bundled when publishing the package. |
| bundledDependencies | one of 2 forms: a list; yes or no | no | DEPRECATED: This field is honored, but "bundleDependencies" is the correct field name. Ignored if "bundleDependencies" is also present. |
| resolutions | a group of fields | no | Resolutions is used to support selective version resolutions using yarn, which lets you define custom package versions or ranges inside your dependencies. For npm, use overrides instead. See: https://yarnpkg.com/configuration/manifest#resolutions |
| overrides | a group of fields | no | Overrides is used to support selective version overrides using npm, which lets you define custom package versions or ranges inside your dependencies. For yarn, use resolutions instead. See: https://docs.npmjs.com/cli/v9/configuring-npm/package-json#overrides |
| packageManager | text | no | Defines which package manager is expected to be used when working on the current project. This field is currently experimental and needs to be opted-in; see https://nodejs.org/api/corepack.html |
| engines | a group of fields | no |  |
| engines.node | text | no |  |
| engines.runtime | one of 2 forms: runtimeEngineDependency; a list | no | Specifies which JavaScript runtimes (like Node.js, Deno, Bun) are supported. Values should use WinterCG Runtime Keys (see https://runtime-keys.proposal.wintercg.org/). |
| engines.any name you choose | text | no |  |
| volta | a group of fields | no | Defines which tools and versions are expected to be used when Volta is installed. |
| volta.extends | text | no | The value of that entry should be a path to another JSON file which also has a "volta" section |
| volta.any name in a set format | text | no |  |
| engineStrict | yes or no | no |  |
| os | a list, each one text | no | Specify which operating systems your module will run on. |
| cpu | a list, each one text | no | Specify that your code only runs on certain cpu architectures. |
| devEngines | a group of fields | no | Define the runtime and package manager for developing the current project. |
| devEngines.os | one of 2 forms: devEngineDependency; a list | no | Specifies which operating systems are supported for development |
| devEngines.cpu | one of 2 forms: devEngineDependency; a list | no | Specifies which CPU architectures are supported for development |
| devEngines.libc | one of 2 forms: devEngineDependency; a list | no | Specifies which C standard libraries are supported for development |
| devEngines.runtime | one of 2 forms: devEngineDependency; a list | no | Specifies which JavaScript runtimes (like Node.js, Deno, Bun) are supported for development. Values should use WinterCG Runtime Keys (see https://runtime-keys.proposal.wintercg.org/) |
| devEngines.packageManager | one of 2 forms: devEngineDependency; a list | no | Specifies which package managers are supported for development |
| preferGlobal | yes or no | no | DEPRECATED: This option used to trigger an npm warning, but it will no longer warn. It is purely there for informational purposes. It is now recommended that you install any binaries as local devDependencies wherever possible. |
| private | one of 2 forms: yes or no; one of these | no | If set to true, then npm will refuse to publish it. |
| publishConfig | a group of fields | no | Values applied at publish time. npm: publish-time config values (tag, registry, access, provenance), see https://docs.npmjs.com/cli/v12/configuring-npm/package-json#publishconfig. pnpm: also overrides manifest fields (main, exports, types, etc.) before packing, plus pnpm-specific fields (directory, linkDirectory, executableFiles), see https://pnpm.io/package_json#publishconfig. |
| publishConfig.access | one of: public, restricted | no | Access level for scoped packages at publish time (defaults to "restricted"). Supported by npm, honored by pnpm. |
| publishConfig.tag | text | no | Distribution tag to publish under (defaults to "latest"). Supported by npm, honored by pnpm. |
| publishConfig.registry | a web address | no | Registry to publish the package to. Supported by npm, honored by pnpm. |
| publishConfig.provenance | yes or no | no | npm only: generate and publish a provenance attestation (requires a supported CI provider). |
| publishConfig.directory | text | no | pnpm only: subdirectory (relative to this package.json) to publish from; it must contain its own package.json. |
| publishConfig.linkDirectory | yes or no | no | pnpm only: symlink the project from publishConfig.directory during local development (default: true). |
| publishConfig.executableFiles | a list, each one text | no | pnpm only: additional files to mark executable (+x) in the package archive. |
| dist | a group of fields | no |  |
| dist.shasum | text | no |  |
| dist.tarball | text | no |  |
| readme | text | no |  |
| module | text | no | An ECMAScript module ID that is the primary entry point to your program. |
| esnext | a group of fields | no | A module ID with untranspiled code that is the primary entry point to your program. |
| esnext.main | text | no |  |
| esnext.browser | text | no |  |
| esnext.any name you choose | text | no |  |
| workspaces | one of 2 forms: a list; a group of fields | no | Allows packages within a directory to depend on one another using direct linking of local files. Additionally, dependencies within a workspace are hoisted to the workspace root when possible to reduce duplication. Note: It's also a good idea to set "private" to true when using this feature. |
| jspm | JSON schema for NPM package.json files | no |  |
| eslintConfig | rules kept in another file, eslintrc.json | no |  |
| prettier | rules kept in another file, https://www.schemastore.org/prettierrc.json | no |  |
| stylelint | rules kept in another file, stylelintrc.json | no |  |
| ava | rules kept in another file, ava.json | no |  |
| release | rules kept in another file, semantic-release.json | no |  |
| jscpd | rules kept in another file, jscpd.json | no |  |
| madge | rules kept in another file, madge.json | no |  |
| nodemonConfig | rules kept in another file, nodemon.json | no |  |
| quikrun | rules kept in another file, https://www.schemastore.org/quikrun.json | no |  |
| pnpm | a group of fields; nothing else may be added here | no | Defines pnpm specific configuration. |
| pnpm.overrides | a group of fields | no | Used to override any dependency in the dependency graph. |
| pnpm.packageExtensions | a group of fields; nothing else may be added here | no | Used to extend the existing package definitions with additional information. |
| pnpm.packageExtensions.any name in a set format | a group of fields; nothing else may be added here | no |  |
| pnpm.packageExtensions.any name in a set format.dependencies | dependency | no |  |
| pnpm.packageExtensions.any name in a set format.optionalDependencies | optionalDependency | no |  |
| pnpm.packageExtensions.any name in a set format.peerDependencies | peerDependency | no |  |
| pnpm.packageExtensions.any name in a set format.peerDependenciesMeta | peerDependencyMeta | no |  |
| pnpm.peerDependencyRules | a group of fields; nothing else may be added here | no |  |
| pnpm.peerDependencyRules.ignoreMissing | a list, each one text | no | pnpm will not print warnings about missing peer dependencies from this list. |
| pnpm.peerDependencyRules.allowedVersions | a group of fields | no | Unmet peer dependency warnings will not be printed for peer dependencies of the specified range. |
| pnpm.peerDependencyRules.allowAny | a list, each one text | no | Any peer dependency matching the pattern will be resolved from any version, regardless of the range specified in "peerDependencies". |
| pnpm.neverBuiltDependencies | a list, each one text | no | A list of dependencies to run builds for. |
| pnpm.onlyBuiltDependencies | a list, each one text | no | A list of package names that are allowed to be executed during installation. |
| pnpm.onlyBuiltDependenciesFile | text | no | Specifies a JSON file that lists the only packages permitted to run installation scripts during the pnpm install process. |
| pnpm.ignoredBuiltDependencies | a list, each one text | no | A list of package names that should not be built during installation. |
| pnpm.allowedDeprecatedVersions | a group of fields | no | A list of deprecated versions that the warnings are suppressed. |
| pnpm.patchedDependencies | a group of fields | no | A list of dependencies that are patched. |
| pnpm.allowNonAppliedPatches | yes or no | no | When true, installation won't fail if some of the patches from the "patchedDependencies" field were not applied. |
| pnpm.allowUnusedPatches | yes or no | no | When true, installation won't fail if some of the patches from the "patchedDependencies" field were not applied. |
| pnpm.updateConfig | a group of fields; nothing else may be added here | no |  |
| pnpm.updateConfig.ignoreDependencies | a list, each one text | no | A list of packages that should be ignored when running "pnpm outdated" or "pnpm update --latest". |
| pnpm.configDependencies | a group of fields | no | Configurational dependencies are installed before all the other types of dependencies (before 'dependencies', 'devDependencies', 'optionalDependencies'). |
| pnpm.auditConfig | a group of fields; nothing else may be added here | no |  |
| pnpm.auditConfig.ignoreCves | a list, each one text | no | A list of CVE IDs that will be ignored by "pnpm audit". |
| pnpm.auditConfig.ignoreGhsas | a list, each one text | no | A list of GHSA Codes that will be ignored by "pnpm audit". |
| pnpm.requiredScripts | a list, each one text | no | A list of scripts that must exist in each project. |
| pnpm.supportedArchitectures | a group of fields; nothing else may be added here | no | Specifies architectures for which you'd like to install optional dependencies, even if they don't match the architecture of the system running the install. |
| pnpm.supportedArchitectures.os | a list, each one text | no |  |
| pnpm.supportedArchitectures.cpu | a list, each one text | no |  |
| pnpm.supportedArchitectures.libc | a list, each one text | no |  |
| pnpm.ignoredOptionalDependencies | a list, each one text | no | A list of optional dependencies that the install should be skipped. |
| pnpm.executionEnv | a group of fields; nothing else may be added here | no |  |
| pnpm.executionEnv.nodeVersion | text | no | Specifies which exact Node.js version should be used for the project's runtime. |
| stackblitz | a group of fields; nothing else may be added here | no | Defines the StackBlitz configuration for the project. |
| stackblitz.installDependencies | yes or no | no | StackBlitz automatically installs npm dependencies when opening a project. |
| stackblitz.startCommand | yes or no | no | A terminal command to be executed when opening the project, after installing npm dependencies. |
| stackblitz.compileTrigger | one of 1 forms: one of these | no | The compileTrigger option controls how file changes in the editor are written to the WebContainers in-memory filesystem. |
| stackblitz.env | a group of fields | no | A map of default environment variables that will be set in each top-level shell process. |
| allowScripts | a group of fields | no | Records which dependencies are permitted to run install scripts (preinstall, install, postinstall, and prepare for non-registry sources). Maintained via the "npm approve-scripts" command, which enforces a default-deny policy: install scripts for any dependency without a matching entry are silently skipped. Keys are package identifiers — either name-only (e.g. "pkg") or pinned with a version (e.g. "pkg@1.2.3"); by default entries are pinned so approval is version-specific. A value of true allows the dependency's install scripts to run, while false explicitly denies them (existing false entries are never silently overridden). |
| allowScripts.any name you choose | yes or no | no |  |
| sideEffects | one of 2 forms: yes or no; a list | no | Provides hints to the Webpack compiler, denoting which files in your project are "pure" and therefore safe to prune if unused. |
| any name in a set format | anything | no | Any property starting with _ is valid. |

## All 30 shapes

Most used first, because everything else is built on them.

- **packageExportsEntryOrFallback** (used 10)
- **devEngineDependency** (used 10)
- **packageImportsEntryOrFallback** (used 8)
- **person** (used 3)
- **scriptsRestart** (used 3)
- **scriptsStart** (used 3)
- **scriptsStop** (used 3)
- **scriptsTest** (used 3)
- **fundingUrl** (used 3)
- **dependency** (used 2)
- **optionalDependency** (used 2)
- **peerDependency** (used 2)
- **peerDependencyMeta** (used 2)
- **license** (used 2)
- **scriptsInstallAfter** (used 2)
- **scriptsUninstallBefore** (used 2)
- **scriptsVersionBefore** (used 2)
- **packageExportsEntryPath** (used 2)
- **packageExportsEntryObject** (used 2)
- **packageExportsEntry** (used 2)
- **packageExportsFallback** (used 2)
- **packageImportsEntry** (used 2)
- **fundingWay** (used 2)
- **runtimeEngineDependency** (used 2)
- **devDependency** (used 1)
- **scriptsPublishAfter** (used 1)
- **packageImportsEntryPath** (used 1)
- **packageImportsEntryObject** (used 1)
- **packageImportsFallback** (used 1)
- **JSON schema for NPM package.json files** (used 1)

### packageExportsEntryOrFallback

A single value.

### devEngineDependency

Specifies requirements for development environment components such as operating systems, runtimes, or package managers. Used to ensure consistent development environments across the team.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| name | text | yes, always | The name of the dependency, with allowed values depending on the parent field |
| version | text | no | The version range for the dependency |
| onFail | one of: ignore, warn, error, download | no | What action to take if validation fails |

### packageImportsEntryOrFallback

A single value.

### person

A person who has been involved in creating or maintaining this package.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| name | text | yes, always |  |
| url | a web address | no |  |
| email | an email address | no |  |

### scriptsRestart

Run by the 'npm restart' command. Note: 'npm restart' will run the stop and start scripts if no restart script is provided.

A single value.

### scriptsStart

Run by the 'npm start' command.

A single value.

### scriptsStop

Run by the 'npm stop' command.

A single value.

### scriptsTest

Run by the 'npm test' command.

A single value.

### fundingUrl

URL to a website with details about how to fund the package.

A single value.

### dependency

Dependencies are specified with a simple hash of package name to version range. The version range is a string which has one or more space-separated descriptors. Dependencies can also be identified with a tarball or git URL.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name you choose | text | no |  |

### optionalDependency

Specifies dependencies that are optional for your project. These dependencies are attempted to be installed during the npm install process, but if they fail to install, the installation process will not fail.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name you choose | text | no |  |

### peerDependency

Specifies dependencies that are required by the package but are expected to be provided by the consumer of the package.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name you choose | text | no |  |

### peerDependencyMeta

When a user installs your package, warnings are emitted if packages specified in "peerDependencies" are not already installed. The "peerDependenciesMeta" field serves to provide more information on how your peer dependencies are utilized. Most commonly, it allows peer dependencies to be marked as optional. Metadata for this field is specified with a simple hash of the package name to a metadata object.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name you choose | a group of fields | no |  |
| any name you choose.optional | yes or no | no | Specifies that this peer dependency is optional and should not be installed automatically. |

### license

A single value.

### scriptsInstallAfter

Run AFTER the package is installed.

A single value.

### scriptsUninstallBefore

Run BEFORE the package is uninstalled.

A single value.

### scriptsVersionBefore

Run BEFORE bump the package version.

A single value.

### packageExportsEntryPath

The module path that is resolved when this specifier is imported. Set to `null` to disallow importing this module.

A single value.

### packageExportsEntryObject

Used to specify conditional exports, note that Conditional exports are unsupported in older environments, so it's recommended to use the fallback array option if support for those environments is a concern.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| require | packageExportsEntryOrFallback | no | The module path that is resolved when this specifier is imported as a CommonJS module using the `require(...)` function. |
| import | packageExportsEntryOrFallback | no | The module path that is resolved when this specifier is imported as an ECMAScript module using an `import` declaration or the dynamic `import(...)` function. |
| module-sync | packageExportsEntryOrFallback | no | The same as `import`, but can be used with require(esm) in Node 20+. This requires the files to not use any top-level awaits. |
| node | packageExportsEntryOrFallback | no | The module path that is resolved when this environment is Node.js. |
| default | packageExportsEntryOrFallback | no | The module path that is resolved when no other export type matches. |
| types | packageExportsEntryOrFallback | no | The module path that is resolved for TypeScript types when this specifier is imported. Should be listed before other conditions. Additionally, versioned "types" condition in the form "types@{selector}" are supported. |
| any name made of numbers, dots, dashes | packageExportsEntryOrFallback | no | The module path that is resolved when this environment matches the property name. |
| any name in a set format | packageExportsEntryOrFallback | no | The module path that is resolved for TypeScript types when this specifier is imported. Should be listed before other conditions. Additionally, versioned "types" condition in the form "types@{selector}" are supported. |

### packageExportsEntry

A single value.

### packageExportsFallback

Used to allow fallbacks in case this environment doesn't support the preceding entries.

This one is a list. The fields below describe a single entry.

A single value.

### packageImportsEntry

A single value.

### fundingWay

Used to inform about ways to help fund development of the package.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| url | fundingUrl | yes, always |  |
| type | text | no | The type of funding or the platform through which funding can be provided, e.g. patreon, opencollective, tidelift or github. |

### runtimeEngineDependency

Specifies a supported JavaScript runtime.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| name | text | yes, always | The runtime name |
| version | text | no | The version range for the runtime |
| onFail | one of: ignore, warn, error, download | no | What action to take if runtime validation fails |

### devDependency

Specifies dependencies that are required for the development and testing of the project. These dependencies are not needed in the production environment.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name you choose | text | no |  |

### scriptsPublishAfter

Run AFTER the package is published.

A single value.

### packageImportsEntryPath

The module path that is resolved when this specifier is imported. Set to `null` to disallow importing this module.

A single value.

### packageImportsEntryObject

Used to specify conditional exports, note that Conditional exports are unsupported in older environments, so it's recommended to use the fallback array option if support for those environments is a concern.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| require | packageImportsEntryOrFallback | no | The module path that is resolved when this specifier is imported as a CommonJS module using the `require(...)` function. |
| import | packageImportsEntryOrFallback | no | The module path that is resolved when this specifier is imported as an ECMAScript module using an `import` declaration or the dynamic `import(...)` function. |
| node | packageImportsEntryOrFallback | no | The module path that is resolved when this environment is Node.js. |
| default | packageImportsEntryOrFallback | no | The module path that is resolved when no other export type matches. |
| types | packageImportsEntryOrFallback | no | The module path that is resolved for TypeScript types when this specifier is imported. Should be listed before other conditions. Additionally, versioned "types" condition in the form "types@{selector}" are supported. |
| any name made of numbers, dots, dashes | packageImportsEntryOrFallback | no | The module path that is resolved when this environment matches the property name. |
| any name in a set format | packageImportsEntryOrFallback | no | The module path that is resolved for TypeScript types when this specifier is imported. Should be listed before other conditions. Additionally, versioned "types" condition in the form "types@{selector}" are supported. |

### packageImportsFallback

Used to allow fallbacks in case this environment doesn't support the preceding entries.

This one is a list. The fields below describe a single entry.

A single value.
