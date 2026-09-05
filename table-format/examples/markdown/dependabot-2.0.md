# GitHub Dependabot v2 config

## What this file holds

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| version | one of: 2 | yes, always | Dependabot configuration files require this key, and its value must be 2 |
| enable-beta-ecosystems | yes or no | no | Enable ecosystems that have beta-level support |
| updates | a list, each one update | yes, always |  |
| registries | registry | no |  |
| multi-ecosystem-groups | a group of fields; at least 1 fields | no | Define groups that span multiple package ecosystems, allowing consolidated pull requests across different ecosystems |
| multi-ecosystem-groups.any name you choose | multi-ecosystem-group | no |  |
| when enable-beta-ecosystems is "true" |  | only in certain cases |  |
| when enable-beta-ecosystems is "true" otherwise.updates | a list, each one a group of fields | no |  |
| when enable-beta-ecosystems is "true" otherwise.updates[].package-ecosystem | package-ecosystem-values | no |  |

## All 45 shapes

Most used first, because everything else is built on them.

- **timezone** (used 2)
- **dependency-type** (used 2)
- **update-types** (used 2)
- **package-ecosystem-values** (used 2)
- **schedule-day** (used 2)
- **schedule-interval** (used 2)
- **insecure-external-code-execution** (used 1)
- **versioning-strategy** (used 1)
- **directories** (used 1)
- **directory** (used 1)
- **schedule** (used 1)
- **registry** (used 1)
- **multi-ecosystem-group** (used 1)
- **dependency-name** (used 1)
- **prefix** (used 1)
- **prefix-development** (used 1)
- **include** (used 1)
- **dependency-name** (used 1)
- **update-types** (used 1)
- **versions** (used 1)
- **prefix** (used 1)
- **prefix-development** (used 1)
- **include** (used 1)
- **update** (used 1)
- **allow**
- **assignees**
- **commit-message**
- **cooldown**
- **exclude-paths**
- **groups**
- **ignore**
- **insecure-external-code-execution**
- **labels**
- **milestone**
- **name**
- **open-pull-requests-limit**
- **package-ecosystem**
- **pull-request-branch-name**
- **rebase-strategy**
- **registries**
- **target-branch**
- **vendor**
- **versioning-strategy**
- **patterns**
- **multi-ecosystem-group**

### timezone

A single value.

### dependency-type

A single value.

### update-types

This one is a list. The fields below describe a single entry.

A single value.

### package-ecosystem-values

A single value.

### schedule-day

A single value.

### schedule-interval

A single value.

### insecure-external-code-execution

A single value.

### versioning-strategy

A single value.

### directories

Locations of package manifests

This one is a list. The fields below describe a single entry.

A single value.

### directory

Location of package manifests

A single value, for example /.

### schedule

Schedule preferences

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| interval | schedule-interval | yes, always |  |
| day | schedule-day | no | Specify an alternative day to check for updates |
| time | text; in an exact set format | no | Specify an alternative time of day to check for updates (format: hh:mm) |
| timezone | timezone | no | The time zone identifier must be from the Time Zone database maintained by IANA |
| when interval is "cron" |  | only in certain cases |  |
| when interval is "cron" then.cronjob | text | yes, always | Specify a valid cron expression for updates |
| when interval is "cron" then | cronjob becomes required | yes | |

### registry

The top-level registries key is optional. It allows you to specify authentication details that Dependabot can use to access private package registries.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name you choose | a group of fields; nothing else may be added here | no |  |
| any name you choose.type | one of: cargo-registry, composer-repository, docker-registry, git, goproxy-server, hex-organization, hex-repository, helm-registry, maven-repository, npm-registry, nuget-feed, pub-repository, python-index, rubygems-server, terraform-registry | yes, always | Identifies the type of registry. |
| any name you choose.url | text | yes, always | The URL to use to access the dependencies in this registry. The protocol is optional. If not specified, 'https://' is assumed. Dependabot adds or ignores trailing slashes as required. |
| any name you choose.username | text | no | The username that Dependabot uses to access the registry. |
| any name you choose.password | text | no | A reference to a Dependabot secret containing the password for the specified user. |
| any name you choose.key | text | no | A reference to a Dependabot secret containing an access key for this registry. |
| any name you choose.token | text | no | A reference to a Dependabot secret containing an access token for this registry. |
| any name you choose.replaces-base | yes or no | no | For registries with type: python-index, if the boolean value is true, pip resolves dependencies by using the specified URL rather than the base URL of the Python Package Index (by default https://pypi.org/simple). |
| any name you choose.scope | one of 2 forms: a list; text | no | For registries with type: npm-registry, the npm scope or scopes served by this registry, for example '@my-org'. Dependabot binds only the listed scopes to this registry when generating the .npmrc, so packages outside those scopes continue to resolve from the base registry. This value takes precedence over scope inference from an existing .npmrc or from the lockfile. |
| any name you choose.organization | text | no |  |
| any name you choose.repo | text | no |  |
| any name you choose.auth-key | text | no |  |
| any name you choose.public-key-fingerprint | text | no |  |
| any name you choose.registry | text | no | The name of the cargo registry. |
| any name you choose.tenant-id | text | no | The tenant ID for Azure OIDC authentication. |
| any name you choose.client-id | text | no | The client ID for Azure OIDC authentication. |
| any name you choose.jfrog-oidc-provider-name | text | no | The JFrog OIDC provider name for authentication. |
| any name you choose.identity-mapping-name | text | no | The identity mapping name for JFrog OIDC authentication. |
| any name you choose.audience | text | no | The audience for OIDC or AWS authentication. |
| any name you choose.aws-region | text | no | The AWS region for AWS CodeArtifact authentication. |
| any name you choose.account-id | text | no | The AWS account ID for AWS CodeArtifact authentication. |
| any name you choose.role-name | text | no | The AWS role name for AWS CodeArtifact authentication. |
| any name you choose.domain | text | no | The domain for AWS CodeArtifact authentication. |
| any name you choose.domain-owner | text | no | The domain owner for AWS CodeArtifact authentication. |

### multi-ecosystem-group

Define a group that spans multiple package ecosystems, allowing consolidated pull requests across different ecosystems

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schedule | a group of fields | yes, always | Schedule preferences for the group |
| schedule.interval | schedule-interval | yes, always |  |
| schedule.day | schedule-day | no | Specify an alternative day to check for updates |
| schedule.time | text; in an exact set format | no | Specify an alternative time of day to check for updates (format: hh:mm) |
| schedule.timezone | timezone | no | The time zone identifier must be from the Time Zone database maintained by IANA |
| schedule.when interval is "cron" |  | only in certain cases |  |
| schedule.when interval is "cron" then.cronjob | text | yes, always | Specify a valid cron expression for updates |
| schedule.when interval is "cron" then | cronjob becomes required | yes | |
| labels | a list, each one text; from 0 to any entries | no | Labels to set on pull requests (additive - merges with ecosystem-level labels) |
| assignees | a list, each one text; from 1 to any entries | no | Assignees to set on pull requests (additive - merges with ecosystem-level assignees) |
| milestone | a whole number; from 1 to any | no | Associate all pull requests raised for this group with a milestone. You need to specify the numeric identifier of the milestone and not its label. |
| target-branch | text; from 1 to any characters | no | Specify a different branch for manifest files and for pull requests. |
| commit-message | one of 3 forms: a group of fields; a group of fields; a group of fields; nothing else may be added here | no | Commit message preferences for the group |
| commit-message.prefix | text; from any to 50 characters | no | A prefix for all commit messages |
| commit-message.prefix-development | text; from any to 50 characters | no | A separate prefix for all commit messages that update dependencies in the Development dependency group |
| commit-message.include | one of: scope | no | Specifies that any prefix is followed by a list of the dependencies updated in the commit |
| pull-request-branch-name | a group of fields; nothing else may be added here | no | Pull request branch name preferences for the group |
| pull-request-branch-name.separator | one of: -, _, / | yes, always | Change separator for PR branch name |
| open-pull-requests-limit | a whole number; from 0 to any; left out means 5 | no | Limit number of open pull requests for version updates. |
| update-types | a list, each one one of these; from 1 to any entries | no | Specify the semantic versioning update types for the group. |
| dependency-type | one of: production, development | no | Specify a dependency type to be included in the group. |
| exclude-patterns | a list, each one text; from 1 to any entries | no | Exclude certain dependencies from the group. |

### dependency-name

A single value.

### prefix

A prefix for all commit messages. When you specify a prefix for commit messages, GitHub will automatically add a colon between the defined prefix and the commit message provided the defined prefix ends with a letter, number, closing parenthesis, or closing bracket. This means that, for example, if you end the prefix with a whitespace, there will be no colon added between the prefix and the commit message.

A single value.

### prefix-development

A separate prefix for all commit messages that update dependencies in the Development dependency group. When you specify a value for this option, the prefix is used only for updates to dependencies in the Production dependency group. This is not supported by all package ecosystems.

A single value.

### include

Specifies that any prefix is followed by a list of the dependencies updated in the commit.

A single value.

### dependency-name

Use to ignore updates for dependencies with matching names, optionally using * to match zero or more characters.

A single value.

### update-types

Use to ignore types of updates. You can combine this with 'dependency-name: "*"' to ignore particular update-types for all dependencies.

A single value.

### versions

Use to ignore specific versions or ranges of versions. If you want to define a range, use the standard pattern for the package manager.

A single value.

### prefix

A prefix for all commit messages

A single value.

### prefix-development

A separate prefix for all commit messages that update dependencies in the Development dependency group

A single value.

### include

Specifies that any prefix is followed by a list of the dependencies updated in the commit

A single value.

### update

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| allow | a list, each one one of 2 forms | no | Customize which updates are allowed |
| allow[].dependency-name | text | no |  |
| allow[].dependency-type | dependency-type | no |  |
| allow[].update-types | update-types, itself a list | no | Use to allow specific types of updates. You can combine this with 'dependency-name: "*"' to allow particular update-types for all dependencies. |
| assignees | a list, each one text; from 1 to any entries | no | Assignees to set on pull requests |
| commit-message | one of 3 forms: a group of fields; a group of fields; a group of fields; nothing else may be added here | no | Dependabot attempts to detect your commit message preferences and use similar patterns. Use this option to specify your preferences explicitly. |
| commit-message.prefix | text; from any to 50 characters | no | A prefix for all commit messages. When you specify a prefix for commit messages, GitHub will automatically add a colon between the defined prefix and the commit message provided the defined prefix ends with a letter, number, closing parenthesis, or closing bracket. This means that, for example, if you end the prefix with a whitespace, there will be no colon added between the prefix and the commit message. |
| commit-message.prefix-development | text; from any to 50 characters | no | A separate prefix for all commit messages that update dependencies in the Development dependency group. When you specify a value for this option, the prefix is used only for updates to dependencies in the Production dependency group. This is not supported by all package ecosystems. |
| commit-message.include | one of: scope | no | Specifies that any prefix is followed by a list of the dependencies updated in the commit. |
| cooldown | a group of fields; nothing else may be added here | no | Defines a cooldown period for dependency updates, allowing updates to be delayed for a configurable number of days. This feature enables users to customize how often Dependabot generates new version updates, offering greater control over update frequency. |
| cooldown.default-days | a whole number; from 1 to 90 | no | Default cooldown period for dependencies without specific rules (optional). |
| cooldown.semver-major-days | a whole number; from 1 to 90 | no | Cooldown period for major version updates (optional, applies only to package managers supporting SemVer). |
| cooldown.semver-minor-days | a whole number; from 1 to 90 | no | Cooldown period for minor version updates (optional, applies only to package managers supporting SemVer). |
| cooldown.semver-patch-days | a whole number; from 0 to 90 | no | Cooldown period for patch version updates (optional, applies only to package managers supporting SemVer). |
| cooldown.include | a list, each one text; from 0 to 100 entries | no | List of dependencies to apply cooldown. Supports wildcards (`*`). |
| cooldown.exclude | a list, each one text; from 0 to 100 entries | no | List of dependencies excluded from cooldown. Supports wildcards (`*`). |
| directories | a list, each one text; from 1 to any entries | no | Locations of package manifests |
| directory | text; for example / | no | Location of package manifests |
| exclude-paths | a list, each one text; from 0 to any entries | no | List of file paths to exclude from dependency updates |
| groups | a group of fields; at least 1 fields | no | Configure groups for dependencies. Each 'groups' property is arbitrary will appear in pull request titles and branch names. For example, the code snippet '{"groups": {"NPM dependencies": {"patterns": ["*"]}}}' sets the group name to 'NPM dependencies'. |
| groups.any name you choose | a group of fields; nothing else may be added here | no |  |
| groups.any name you choose.applies-to | one of: version-updates, security-updates | no | Use to specify a whether the rules in the group apply to version updates or security updates. |
| groups.any name you choose.dependency-type | one of: development, production | no | Specify a dependency type to be included in the group. |
| groups.any name you choose.patterns | a list, each one text; from 1 to any entries | no | Define strings of characters that match with a dependency name (or multiple dependency names) to include those dependencies in the group. |
| groups.any name you choose.exclude-patterns | a list, each one text; from 1 to any entries | no | Exclude certain dependencies from the group. If a dependency is excluded from a group, Dependabot will continue to raise single pull requests to update the dependency to its latest version. |
| groups.any name you choose.update-types | a list, each one one of these; from 1 to any entries | no | Specify the semantic versioning level to include in the group |
| groups.any name you choose.group-by | one of: dependency-name | no | Configure how dependencies are grouped within this group. |
| ignore | a list, each one one of 3 forms | no | Ignore certain dependencies or versions |
| ignore[].dependency-name | text | no | Use to ignore updates for dependencies with matching names, optionally using * to match zero or more characters. |
| ignore[].update-types | update-types, itself a list | no | Use to ignore types of updates. You can combine this with 'dependency-name: "*"' to ignore particular update-types for all dependencies. |
| ignore[].versions | one of 2 forms: text; a list | no | Use to ignore specific versions or ranges of versions. If you want to define a range, use the standard pattern for the package manager. |
| insecure-external-code-execution | insecure-external-code-execution | no | Allow or deny code execution in manifest files |
| labels | a list, each one text; from 0 to any entries; left out means dependencies | no | Labels to set on pull requests |
| milestone | a whole number; from 1 to any | no | Associate all pull requests raised for a package manager with a milestone. You need to specify the numeric identifier of the milestone and not its label. |
| name | text; from 3 to 100 characters | no | A name for the update configuration. |
| open-pull-requests-limit | a whole number; from 0 to any; left out means 5 | no | Limit number of open pull requests for version updates |
| package-ecosystem | text | yes, always | Package manager to use |
| pull-request-branch-name | a group of fields; nothing else may be added here | no | Pull request branch name preferences |
| pull-request-branch-name.separator | one of: -, _, / | yes, always | Change separator for PR branch name |
| rebase-strategy | one of: auto, disabled | no | Disable automatic rebasing. 'auto' is the default and Dependabot will rebase open pull requests when changes are detected. 'disabled' will disable automatic rebasing. |
| registries | one of 2 forms: a list; a fixed value | no |  |
| schedule | a group of fields | no | Schedule preferences |
| schedule.interval | schedule-interval | yes, always |  |
| schedule.day | schedule-day | no | Specify an alternative day to check for updates |
| schedule.time | text; in an exact set format | no | Specify an alternative time of day to check for updates (format: hh:mm) |
| schedule.timezone | timezone | no | The time zone identifier must be from the Time Zone database maintained by IANA |
| schedule.when interval is "cron" |  | only in certain cases |  |
| schedule.when interval is "cron" then.cronjob | text | yes, always | Specify a valid cron expression for updates |
| schedule.when interval is "cron" then | cronjob becomes required | yes | |
| target-branch | text; from 1 to any characters | no | Specify a different branch for manifest files and for pull requests. |
| vendor | yes or no | no | Tell Dependabot to vendor dependencies when updating them. Don't use this option if you're using 'gomod'. |
| versioning-strategy | versioning-strategy | no | How to update manifest version requirements |
| patterns | a list, each one text; from 1 to any entries | no | Array of dependency patterns to include in a multi-ecosystem group. Required when using multi-ecosystem-group. Use '*' to include all dependencies. |
| multi-ecosystem-group | text; from 1 to any characters | no | String identifier linking this ecosystem to a multi-ecosystem group |
| in one case |  | only in certain cases |  |
| in one case then.schedule | schedule | yes, always |  |
| in one case then | schedule becomes required | yes | |

### allow

Customize which updates are allowed

This one is a list. The fields below describe a single entry. Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| dependency-name | text | no |  |
| dependency-type | dependency-type | no |  |
| update-types | update-types, itself a list | no | Use to allow specific types of updates. You can combine this with 'dependency-name: "*"' to allow particular update-types for all dependencies. |

### assignees

Assignees to set on pull requests

This one is a list. The fields below describe a single entry.

A single value.

### commit-message

Dependabot attempts to detect your commit message preferences and use similar patterns. Use this option to specify your preferences explicitly.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| prefix | text; from any to 50 characters | no | A prefix for all commit messages. When you specify a prefix for commit messages, GitHub will automatically add a colon between the defined prefix and the commit message provided the defined prefix ends with a letter, number, closing parenthesis, or closing bracket. This means that, for example, if you end the prefix with a whitespace, there will be no colon added between the prefix and the commit message. |
| prefix-development | text; from any to 50 characters | no | A separate prefix for all commit messages that update dependencies in the Development dependency group. When you specify a value for this option, the prefix is used only for updates to dependencies in the Production dependency group. This is not supported by all package ecosystems. |
| include | one of: scope | no | Specifies that any prefix is followed by a list of the dependencies updated in the commit. |

### cooldown

Defines a cooldown period for dependency updates, allowing updates to be delayed for a configurable number of days. This feature enables users to customize how often Dependabot generates new version updates, offering greater control over update frequency.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| default-days | a whole number; from 1 to 90 | no | Default cooldown period for dependencies without specific rules (optional). |
| semver-major-days | a whole number; from 1 to 90 | no | Cooldown period for major version updates (optional, applies only to package managers supporting SemVer). |
| semver-minor-days | a whole number; from 1 to 90 | no | Cooldown period for minor version updates (optional, applies only to package managers supporting SemVer). |
| semver-patch-days | a whole number; from 0 to 90 | no | Cooldown period for patch version updates (optional, applies only to package managers supporting SemVer). |
| include | a list, each one text; from 0 to 100 entries | no | List of dependencies to apply cooldown. Supports wildcards (`*`). |
| exclude | a list, each one text; from 0 to 100 entries | no | List of dependencies excluded from cooldown. Supports wildcards (`*`). |

### exclude-paths

List of file paths to exclude from dependency updates

This one is a list. The fields below describe a single entry.

A single value.

### groups

Configure groups for dependencies. Each 'groups' property is arbitrary will appear in pull request titles and branch names. For example, the code snippet '{"groups": {"NPM dependencies": {"patterns": ["*"]}}}' sets the group name to 'NPM dependencies'.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name you choose | a group of fields; nothing else may be added here | no |  |
| any name you choose.applies-to | one of: version-updates, security-updates | no | Use to specify a whether the rules in the group apply to version updates or security updates. |
| any name you choose.dependency-type | one of: development, production | no | Specify a dependency type to be included in the group. |
| any name you choose.patterns | a list, each one text; from 1 to any entries | no | Define strings of characters that match with a dependency name (or multiple dependency names) to include those dependencies in the group. |
| any name you choose.exclude-patterns | a list, each one text; from 1 to any entries | no | Exclude certain dependencies from the group. If a dependency is excluded from a group, Dependabot will continue to raise single pull requests to update the dependency to its latest version. |
| any name you choose.update-types | a list, each one one of these; from 1 to any entries | no | Specify the semantic versioning level to include in the group |
| any name you choose.group-by | one of: dependency-name | no | Configure how dependencies are grouped within this group. |

### ignore

Ignore certain dependencies or versions

This one is a list. The fields below describe a single entry. Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| dependency-name | text | no | Use to ignore updates for dependencies with matching names, optionally using * to match zero or more characters. |
| update-types | update-types, itself a list | no | Use to ignore types of updates. You can combine this with 'dependency-name: "*"' to ignore particular update-types for all dependencies. |
| versions | one of 2 forms: text; a list | no | Use to ignore specific versions or ranges of versions. If you want to define a range, use the standard pattern for the package manager. |

### insecure-external-code-execution

Allow or deny code execution in manifest files

A single value.

### labels

Labels to set on pull requests

This one is a list. The fields below describe a single entry.

A single value.

### milestone

Associate all pull requests raised for a package manager with a milestone. You need to specify the numeric identifier of the milestone and not its label.

A single value.

### name

A name for the update configuration.

A single value.

### open-pull-requests-limit

Limit number of open pull requests for version updates

A single value.

### package-ecosystem

Package manager to use

A single value.

### pull-request-branch-name

Pull request branch name preferences

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| separator | one of: -, _, / | yes, always | Change separator for PR branch name |

### rebase-strategy

Disable automatic rebasing. 'auto' is the default and Dependabot will rebase open pull requests when changes are detected. 'disabled' will disable automatic rebasing.

A single value.

### registries

A single value.

### target-branch

Specify a different branch for manifest files and for pull requests.

A single value.

### vendor

Tell Dependabot to vendor dependencies when updating them. Don't use this option if you're using 'gomod'.

A single value.

### versioning-strategy

How to update manifest version requirements

A single value.

### patterns

Array of dependency patterns to include in a multi-ecosystem group. Required when using multi-ecosystem-group. Use '*' to include all dependencies.

This one is a list. The fields below describe a single entry.

A single value.

### multi-ecosystem-group

String identifier linking this ecosystem to a multi-ecosystem group

A single value.
