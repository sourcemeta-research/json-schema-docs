# gitlab-ci

## What this file holds

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| $schema | a web address | no |  |
| spec | a group of fields; nothing else may be added here | no |  |
| spec.inputs | configInputs | no |  |
| spec.include | a list, each one spec_include_item | no |  |
| spec.component | a list, each one one of these | no |  |
| spec.description | text; from any to 256 characters | no |  |
| image | image | no |  |
| services | services, itself a list | no |  |
| before_script | before_script | no |  |
| after_script | after_script | no |  |
| variables | globalVariables | no |  |
| cache | cache | no |  |
| !reference | !reference, itself a list | no |  |
| default | a group of fields; nothing else may be added here | no |  |
| default.after_script | after_script | no |  |
| default.artifacts | artifacts | no |  |
| default.before_script | before_script | no |  |
| default.hooks | hooks | no |  |
| default.cache | cache | no |  |
| default.image | image | no |  |
| default.interruptible | interruptible | no |  |
| default.id_tokens | id_tokens | no |  |
| default.identity | identity | no |  |
| default.retry | retry | no |  |
| default.services | services, itself a list | no |  |
| default.tags | tags, itself a list | no |  |
| default.timeout | timeout | no |  |
| default.!reference | !reference, itself a list | no |  |
| stages | a list, each one one of 2 forms; from 1 to any entries; left out means build, test, deploy | no |  |
| include | one of 2 forms: include_item; a list | no |  |
| pages | job | no |  |
| workflow | a group of fields | no |  |
| workflow.name | workflowName | no |  |
| workflow.auto_cancel | workflowAutoCancel | no |  |
| workflow.rules | a list, each one one of 2 forms | no |  |
| any name in a set format | one of 2 forms: job_template; anything | no | Hidden keys. |
| any name you choose | job | no |  |

## All 58 shapes

Most used first, because everything else is built on them.

- **string_file_list** (used 19)
- **inputs** (used 12)
- **includeRules** (used 5)
- **!reference** (used 3)
- **image** (used 3)
- **services** (used 3)
- **optional_script** (used 3)
- **before_script** (used 3)
- **after_script** (used 3)
- **if** (used 3)
- **changes** (used 3)
- **exists** (used 3)
- **parallel_matrix** (used 3)
- **cache** (used 3)
- **interruptible** (used 3)
- **artifacts** (used 2)
- **baseInput** (used 2)
- **include_item** (used 2)
- **include_cache** (used 2)
- **id_tokens** (used 2)
- **identity** (used 2)
- **script** (used 2)
- **workflowAutoCancel** (used 2)
- **jobVariables** (used 2)
- **rulesVariables** (used 2)
- **timeout** (used 2)
- **start_in** (used 2)
- **when** (used 2)
- **cache_item** (used 2)
- **filter_refs** (used 2)
- **filter** (used 2)
- **retry** (used 2)
- **retry_max** (used 2)
- **retry_errors** (used 2)
- **job** (used 2)
- **job_template** (used 2)
- **tags** (used 2)
- **hooks** (used 2)
- **stepName** (used 2)
- **stepNamedStrings** (used 2)
- **stepFuncReference** (used 2)
- **configInputs** (used 1)
- **jobInputs** (used 1)
- **spec_include_item** (used 1)
- **dast_configuration** (used 1)
- **secrets** (used 1)
- **steps** (used 1)
- **rules** (used 1)
- **workflowName** (used 1)
- **globalVariables** (used 1)
- **rulesNeeds** (used 1)
- **allow_failure** (used 1)
- **rulesAllowFailure** (used 1)
- **parallel** (used 1)
- **step** (used 1)
- **stepNamedValues** (used 1)
- **stepGitReference** (used 1)
- **stepOciReference** (used 1)

### string_file_list

A single value.

### inputs

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name made of letters, numbers, underscores, dashes | one of 5 forms: text; a number; yes or no; a list; a group of fields; the value itself may be empty | no | Input parameter value that matches parameter names defined in spec:inputs of the included configuration. |

### includeRules

This one is a list. The fields below describe a single entry.

A single value.

### !reference

This one is a list. The fields below describe a single entry.

A single value.

### image

A single value.

### services

This one is a list. The fields below describe a single entry.

A single value.

### optional_script

A single value.

### before_script

A single value.

### after_script

A single value.

### if

A single value.

### changes

A single value.

### exists

A single value.

### parallel_matrix

Use the `needs:parallel:matrix` keyword to specify parallelized jobs needed to be completed for the job to run. [Learn More](https://docs.gitlab.com/ci/yaml/#needsparallelmatrix)

A single value.

### cache

A single value.

### interruptible

A single value.

### artifacts

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| paths | a list, each one text; from 1 to any entries | no |  |
| exclude | a list, each one text; from 1 to any entries | no |  |
| expose_as | text | no |  |
| name | text | no |  |
| untracked | yes or no; left out means no | no |  |
| when | one of: on_success, on_failure, always | no |  |
| access | one of: none, developer, maintainer, all | no |  |
| public | yes or no; left out means yes | no |  |
| expire_in | text; left out means 30 days | no |  |
| reports | a group of fields; nothing else may be added here | no |  |
| reports.accessibility | text | no | Path to JSON file with accessibility report. |
| reports.annotations | text | no | Path to JSON file with annotations report. |
| reports.api_fuzzing | string_file_list | no |  |
| reports.junit | one of 2 forms: text; a list | no | Path for file(s) that should be parsed as JUnit XML result |
| reports.browser_performance | text | no | Path to a single file with browser performance metric report(s). |
| reports.coverage_report | a group of fields; the value itself may be empty | no | Used to collect coverage reports from the job. |
| reports.coverage_report.coverage_format | one of: cobertura, jacoco | no | Code coverage format used by the test framework. |
| reports.coverage_report.path | text; from 1 to any characters | no | Path to the coverage report file that should be parsed. |
| reports.coverage_fuzzing | string_file_list | no |  |
| reports.codequality | string_file_list | no | Path to file or list of files with code quality report(s) (such as Code Climate). |
| reports.dotenv | string_file_list | no | Path to file or list of files containing runtime-created variables for this job. |
| reports.lsif | string_file_list | no | Path to file or list of files containing code intelligence (Language Server Index Format). |
| reports.sast | string_file_list | no | Path to file or list of files with SAST vulnerabilities report(s). |
| reports.dependency_scanning | string_file_list | no | Path to file or list of files with Dependency scanning vulnerabilities report(s). |
| reports.container_scanning | string_file_list | no | Path to file or list of files with Container scanning vulnerabilities report(s). |
| reports.dast | string_file_list | no | Path to file or list of files with DAST vulnerabilities report(s). |
| reports.license_management | string_file_list | no | Deprecated in 12.8: Path to file or list of files with license report(s). |
| reports.license_scanning | string_file_list | no | Path to file or list of files with license report(s). |
| reports.requirements | string_file_list | no | Path to file or list of files with requirements report(s). |
| reports.secret_detection | string_file_list | no | Path to file or list of files with secret detection report(s). |
| reports.metrics | string_file_list | no | Path to file or list of files with custom metrics report(s). |
| reports.terraform | string_file_list | no | Path to file or list of files with terraform plan(s). |
| reports.cyclonedx | string_file_list | no |  |
| reports.sarif | string_file_list | no |  |
| reports.load_performance | string_file_list | no |  |
| reports.repository_xray | string_file_list | no | Path to file or list of files with Repository X-Ray report(s). |

### baseInput

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| type | one of: array, boolean, number, string | no |  |
| description | text; from any to 1024 characters | no |  |
| options | a list, each one one of 3 forms | no |  |
| regex | text | no |  |
| default | anything | no |  |

### include_item

A single value.

### include_cache

A single value.

### id_tokens

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format | a group of fields; nothing else may be added here | no |  |
| any name in a set format.aud | one of 2 forms: text; a list | yes, always |  |

### identity

A single value.

### script

A single value.

### workflowAutoCancel

Define the rules for when pipeline should be automatically cancelled.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| on_job_failure | one of: none, all | no |  |
| on_new_commit | one of: conservative, interruptible, none | no |  |

### jobVariables

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format | one of 2 forms: yes or no; a group of fields | no |  |

### rulesVariables

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format | yes or no | no |  |

### timeout

A single value.

### start_in

A single value.

### when

A single value.

### cache_item

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| key | one of 2 forms: text; a group of fields | no |  |
| paths | a list, each one text | no |  |
| policy | text; in an exact set format; left out means pull-push | no |  |
| unprotect | yes or no; left out means no | no |  |
| untracked | yes or no; left out means no | no |  |
| when | one of: on_success, on_failure, always | no |  |
| fallback_keys | a list, each one text; from 0 to 5 entries | no |  |

### filter_refs

Filter job by different keywords that determine origin or state, or by supplying string/regex to check against branch/tag names.

This one is a list. The fields below describe a single entry.

A single value.

### filter

A single value.

### retry

A single value.

### retry_max

The number of times the job will be retried if it fails. Defaults to 0 and can max be retried 2 times (3 times total).

A single value.

### retry_errors

A single value.

### job

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| image *(borrowed)* | image | no |  |
| services *(borrowed)* | services, itself a list | no |  |
| before_script *(borrowed)* | before_script | no |  |
| after_script *(borrowed)* | after_script | no |  |
| hooks *(borrowed)* | hooks | no |  |
| rules *(borrowed)* | rules, itself a list | no |  |
| variables *(borrowed)* | jobVariables | no |  |
| cache *(borrowed)* | cache | no |  |
| id_tokens *(borrowed)* | id_tokens | no |  |
| identity *(borrowed)* | identity | no |  |
| dast_configuration *(borrowed)* | dast_configuration | no |  |
| inputs *(borrowed)* | jobInputs | no |  |
| secrets *(borrowed)* | secrets | no |  |
| script *(borrowed)* | script | no |  |
| run *(borrowed)* | steps, itself a list | no |  |
| stage *(borrowed)* | one of 2 forms: text; a list | no | Define what stage the job will run in. |
| only *(borrowed)* | filter | no | Job will run *only* when these filtering options match. |
| extends *(borrowed)* | one of 2 forms: text; a list | no | The name of one or more jobs to inherit configuration from. |
| needs *(borrowed)* | a list, each one one of 5 forms | no | The list of jobs in previous stages whose sole completion is needed to start the current job. |
| except *(borrowed)* | filter | no | Job will run *except* for when these filtering options match. |
| tags *(borrowed)* | tags, itself a list | no |  |
| allow_failure *(borrowed)* | allow_failure | no |  |
| timeout *(borrowed)* | timeout | no |  |
| when *(borrowed)* | when | no |  |
| start_in *(borrowed)* | start_in | no |  |
| manual_confirmation *(borrowed)* | text | no |  |
| dependencies *(borrowed)* | a list, each one text | no | Specify a list of job names from earlier stages from which artifacts should be loaded. By default, all previous artifacts are passed. Use an empty array to skip downloading artifacts. |
| artifacts *(borrowed)* | artifacts | no |  |
| environment *(borrowed)* | one of 2 forms: text; a group of fields | no | Used to associate environment metadata with a deploy. Environment can have a name and URL attached to it, and will be displayed under /environments under the project. |
| release *(borrowed)* | a group of fields; nothing else may be added here | no | Indicates that the job creates a Release. |
| release.tag_name | text; from 1 to any characters | yes, always | The tag_name must be specified. It can refer to an existing Git tag or can be specified by the user. |
| release.tag_message | text | no | Message to use if creating a new annotated tag. |
| release.description | text; from 1 to any characters | yes, always | Specifies the longer description of the Release. |
| release.name | text | no | The Release name. If omitted, it is populated with the value of release: tag_name. |
| release.ref | text | no | If the release: tag_name doesn’t exist yet, the release is created from ref. ref can be a commit SHA, another tag name, or a branch name. |
| release.milestones | a list, each one text | no | The title of each milestone the release is associated with. |
| release.released_at | a date and time; in an exact set format | no | The date and time when the release is ready. Defaults to the current date and time if not defined. Should be enclosed in quotes and expressed in ISO 8601 format. |
| release.assets | a group of fields; nothing else may be added here | no |  |
| release.assets.links | a list, each one a group of fields; from 1 to any entries | yes, always | Include asset links in the release. |
| release.assets.links[].name | text; from 1 to any characters | yes, always | The name of the link. |
| release.assets.links[].url | text; from 1 to any characters | yes, always | The URL to download a file. |
| release.assets.links[].filepath | text | no | The redirect link to the url. |
| release.assets.links[].link_type | one of: runbook, package, image, other | no | The content kind of what users can download via url. |
| coverage *(borrowed)* | a search pattern; in an exact set format | no | Must be a regular expression, optionally but recommended to be quoted, and must be surrounded with '/'. Example: '/Code coverage: \d+\.\d+/' |
| retry *(borrowed)* | retry | no |  |
| parallel *(borrowed)* | parallel | no |  |
| interruptible *(borrowed)* | interruptible | no |  |
| resource_group *(borrowed)* | text | no | Limit job concurrency. Can be used to ensure that the Runner will not run certain jobs simultaneously. |
| trigger *(borrowed)* | one of 3 forms: a group of fields; a group of fields; text | no |  |
| inherit *(borrowed)* | a group of fields; nothing else may be added here | no |  |
| inherit.default | one of 2 forms: yes or no; a list | no |  |
| inherit.variables | one of 2 forms: yes or no; a list | no |  |
| publish *(borrowed)* | text | no | Deprecated. Use `pages.publish` instead. A path to a directory that contains the files to be published with Pages. |
| pages *(borrowed)* | one of 2 forms: a group of fields; yes or no | no |  |

### job_template

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| image | image | no |  |
| services | services, itself a list | no |  |
| before_script | before_script | no |  |
| after_script | after_script | no |  |
| hooks | hooks | no |  |
| rules | rules, itself a list | no |  |
| variables | jobVariables | no |  |
| cache | cache | no |  |
| id_tokens | id_tokens | no |  |
| identity | identity | no |  |
| dast_configuration | dast_configuration | no |  |
| inputs | jobInputs | no |  |
| secrets | secrets | no |  |
| script | script | no |  |
| run | steps, itself a list | no |  |
| stage | one of 2 forms: text; a list | no | Define what stage the job will run in. |
| only | filter | no | Job will run *only* when these filtering options match. |
| extends | one of 2 forms: text; a list | no | The name of one or more jobs to inherit configuration from. |
| needs | a list, each one one of 5 forms | no | The list of jobs in previous stages whose sole completion is needed to start the current job. |
| except | filter | no | Job will run *except* for when these filtering options match. |
| tags | tags, itself a list | no |  |
| allow_failure | allow_failure | no |  |
| timeout | timeout | no |  |
| when | when | no |  |
| start_in | start_in | no |  |
| manual_confirmation | text | no |  |
| dependencies | a list, each one text | no | Specify a list of job names from earlier stages from which artifacts should be loaded. By default, all previous artifacts are passed. Use an empty array to skip downloading artifacts. |
| artifacts | artifacts | no |  |
| environment | one of 2 forms: text; a group of fields | no | Used to associate environment metadata with a deploy. Environment can have a name and URL attached to it, and will be displayed under /environments under the project. |
| release | a group of fields; nothing else may be added here | no | Indicates that the job creates a Release. |
| release.tag_name | text; from 1 to any characters | yes, always | The tag_name must be specified. It can refer to an existing Git tag or can be specified by the user. |
| release.tag_message | text | no | Message to use if creating a new annotated tag. |
| release.description | text; from 1 to any characters | yes, always | Specifies the longer description of the Release. |
| release.name | text | no | The Release name. If omitted, it is populated with the value of release: tag_name. |
| release.ref | text | no | If the release: tag_name doesn’t exist yet, the release is created from ref. ref can be a commit SHA, another tag name, or a branch name. |
| release.milestones | a list, each one text | no | The title of each milestone the release is associated with. |
| release.released_at | a date and time; in an exact set format | no | The date and time when the release is ready. Defaults to the current date and time if not defined. Should be enclosed in quotes and expressed in ISO 8601 format. |
| release.assets | a group of fields; nothing else may be added here | no |  |
| release.assets.links | a list, each one a group of fields; from 1 to any entries | yes, always | Include asset links in the release. |
| release.assets.links[].name | text; from 1 to any characters | yes, always | The name of the link. |
| release.assets.links[].url | text; from 1 to any characters | yes, always | The URL to download a file. |
| release.assets.links[].filepath | text | no | The redirect link to the url. |
| release.assets.links[].link_type | one of: runbook, package, image, other | no | The content kind of what users can download via url. |
| coverage | a search pattern; in an exact set format | no | Must be a regular expression, optionally but recommended to be quoted, and must be surrounded with '/'. Example: '/Code coverage: \d+\.\d+/' |
| retry | retry | no |  |
| parallel | parallel | no |  |
| interruptible | interruptible | no |  |
| resource_group | text | no | Limit job concurrency. Can be used to ensure that the Runner will not run certain jobs simultaneously. |
| trigger | one of 3 forms: a group of fields; a group of fields; text | no |  |
| inherit | a group of fields; nothing else may be added here | no |  |
| inherit.default | one of 2 forms: yes or no; a list | no |  |
| inherit.variables | one of 2 forms: yes or no; a list | no |  |
| publish | text | no | Deprecated. Use `pages.publish` instead. A path to a directory that contains the files to be published with Pages. |
| pages | one of 2 forms: a group of fields; yes or no | no |  |

### tags

This one is a list. The fields below describe a single entry.

A single value.

### hooks

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| pre_get_sources_script | optional_script | no |  |

### stepName

A single value.

### stepNamedStrings

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format | text | no |  |

### stepFuncReference

A single value.

### configInputs

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format | one of 1 forms: a group of fields; the value itself may be empty | no |  |

### jobInputs

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format | a group of fields | no |  |
| any name in a set format.type *(borrowed)* | one of: array, boolean, number, string | no |  |
| any name in a set format.description *(borrowed)* | text; from any to 1024 characters | no |  |
| any name in a set format.options *(borrowed)* | a list, each one one of 3 forms | no |  |
| any name in a set format.regex *(borrowed)* | text | no |  |
| any name in a set format.default *(borrowed)* | anything | no |  |
| any name in a set format.when type is "string" *(borrowed)* |  | only in certain cases |  |
| any name in a set format.when type is "string" then.default | text | no |  |
| any name in a set format.when type is "number" *(borrowed)* |  | only in certain cases |  |
| any name in a set format.when type is "number" then.default | a number | no |  |
| any name in a set format.when type is "boolean" *(borrowed)* |  | only in certain cases |  |
| any name in a set format.when type is "boolean" then.default | yes or no | no |  |
| any name in a set format.when type is "array" *(borrowed)* |  | only in certain cases |  |
| any name in a set format.when type is "array" then.default | a list | no |  |
| any name in a set format.in one case *(borrowed)* |  | only in certain cases |  |
| any name in a set format.in one case then.default | text | no |  |

### spec_include_item

A single value.

### dast_configuration

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| site_profile | text | no | The name of the site profile to use in the job. |
| scanner_profile | text | no | The name of the scanner profile to use in the job. |

### secrets

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format | one of 5 forms: anything; anything; anything; anything; anything; nothing else may be added here | no |  |
| any name in a set format.vault | one of 2 forms: text; a group of fields | no |  |
| any name in a set format.gcp_secret_manager | a group of fields; nothing else may be added here | no |  |
| any name in a set format.gcp_secret_manager.name | text | yes, always |  |
| any name in a set format.gcp_secret_manager.version | one of 2 forms: text; a whole number; left out means version | no |  |
| any name in a set format.azure_key_vault | a group of fields; nothing else may be added here | no |  |
| any name in a set format.azure_key_vault.name | text | yes, always |  |
| any name in a set format.azure_key_vault.version | text | no |  |
| any name in a set format.aws_secrets_manager | one of 2 forms: text; a group of fields | no |  |
| any name in a set format.gitlab_secrets_manager | a group of fields; nothing else may be added here | no |  |
| any name in a set format.gitlab_secrets_manager.name | text; made of letters, numbers, underscores, dashes | yes, always | Name of the secret. Only letters, digits, and underscores are allowed. |
| any name in a set format.gitlab_secrets_manager.source | text | no | Source of the secret. Defaults to the current project if not given. For fetching a secret from a group, provide group/<full_path_of_the_group> |
| any name in a set format.file | yes or no; left out means yes | no |  |
| any name in a set format.token | text | no | Specifies the JWT variable that should be used to authenticate with the secret provider. |

### steps

This one is a list. The fields below describe a single entry.

A single value.

### rules

This one is a list. The fields below describe a single entry.

A single value.

### workflowName

A single value.

### globalVariables

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format | one of 2 forms: yes or no; a group of fields | no |  |

### rulesNeeds

This one is a list. The fields below describe a single entry.

A single value.

### allow_failure

A single value.

### rulesAllowFailure

A single value.

### parallel

Splits up a single job into multiple that run in parallel. Provides `CI_NODE_INDEX` and `CI_NODE_TOTAL` environment variables to the jobs.

A single value.

### step

Any of these function use cases are valid.

A single value.

### stepNamedValues

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format | a list; the value itself may be empty | no |  |

### stepGitReference

GitReference is a reference to a function in a Git repository.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| git | a group of fields; nothing else may be added here | yes, always |  |
| git.url | text | yes, always |  |
| git.dir | text | no |  |
| git.rev | text | yes, always |  |
| git.file | text | no |  |

### stepOciReference

OCIReference is a reference to a function hosted in an OCI repository.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| oci | a group of fields; nothing else may be added here | yes, always |  |
| oci.registry | text; for example registry.gitlab.com | yes, always | The <host>[:<port>] of the container registry server. |
| oci.repository | text; for example my_group/my_project/image | yes, always | A path within the registry containing related OCI images. Typically the namespace, project, and image name. |
| oci.tag | text; for example latest | yes, always | A pointer to the image manifest hosted in the OCI repository. |
| oci.dir | text; for example /my_steps/hello_world | no | A directory inside the OCI image where the function can be found. |
| oci.file | text; for example func.yml | no | The name of the file that defines the function, defaults to func.yml. |

## What this page does not show

- a condition with nothing to show on either side ((unnamed))
- a rule saying the value must not match a whole shape ((unnamed))
