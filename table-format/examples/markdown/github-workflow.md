# github-workflow

## What this file holds

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| name | text | no | The name of your workflow. GitHub displays the names of your workflows on your repository's actions page. If you omit this field, GitHub sets the name to the workflow's filename. |
| on | one of 3 forms: event; a list; a group of fields | yes, always | The name of the GitHub event that triggers the workflow. You can provide a single event string, array of events, array of event types, or an event configuration map that schedules a workflow or restricts the execution of a workflow to specific files, tags, or branch changes. For a list of available events, see https://help.github.com/en/github/automating-your-workflow-with-github-actions/events-that-trigger-workflows. |
| env | env | no | A map of environment variables that are available to all jobs and steps in the workflow. |
| defaults | defaults | no | A map of default settings that will apply to all jobs in the workflow. |
| concurrency | one of 2 forms: text; concurrency | no | Concurrency ensures that only a single job or workflow using the same concurrency group will run at a time. A concurrency group can be any string or expression. The expression can use any context except for the secrets context.  You can also specify concurrency at the workflow level.  When a concurrent job or workflow is queued, if another job or workflow using the same concurrency group in the repository is in progress, the queued job or workflow will be pending. By default any previously pending job or workflow in the concurrency group will be canceled; this behavior can be changed with `queue`. To also cancel any currently running job or workflow in the same concurrency group, specify cancel-in-progress: true. |
| jobs | a group of fields; at least 1 fields; nothing else may be added here | yes, always | A workflow run is made up of one or more jobs. Jobs run in parallel by default. To run jobs sequentially, you can define dependencies on other jobs using the jobs.<job_id>.needs keyword. Each job runs in a fresh instance of the virtual environment specified by runs-on. You can run an unlimited number of jobs as long as you are within the workflow usage limits. For more information, see https://help.github.com/en/github/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#usage-limits. |
| jobs.any name in a set format | either normalJob or reusableWorkflowCallJob | no |  |
| run-name | text | no | The name for workflow runs generated from the workflow. GitHub displays the workflow run name in the list of workflow runs on your repository's 'Actions' tab. |
| permissions | permissions | no |  |

## All 30 shapes

Most used first, because everything else is built on them.

- **eventObject** (used 29)
- **types** (used 20)
- **permissions-level** (used 16)
- **branch** (used 12)
- **expressionSyntax** (used 10)
- **env** (used 8)
- **path** (used 6)
- **configuration** (used 4)
- **concurrency** (used 3)
- **permissions** (used 3)
- **defaults** (used 2)
- **event** (used 2)
- **stringContainingExpressionSyntax** (used 2)
- **globs** (used 2)
- **name** (used 2)
- **shell** (used 2)
- **step** (used 2)
- **working-directory** (used 2)
- **jobNeeds** (used 2)
- **matrix** (used 2)
- **jobContainer** (used 1)
- **serviceContainer** (used 1)
- **permissions-event** (used 1)
- **environment** (used 1)
- **snapshot** (used 1)
- **reusableWorkflowCallJob** (used 1)
- **normalJob** (used 1)
- **workflowDispatchInput** (used 1)
- **architecture**
- **machine**

### eventObject

A single value.

### types

Selects the types of activity that will trigger a workflow run. Most GitHub events are triggered by more than one type of activity. For example, the event for the release resource is triggered when a release is published, unpublished, created, edited, deleted, or prereleased. The types keyword enables you to narrow down activity that causes the workflow to run. When only one activity type triggers a webhook event, the types keyword is unnecessary.
You can use an array of event types. For more information about each event and their activity types, see https://help.github.com/en/articles/events-that-trigger-workflows#webhook-events.

A single value.

### permissions-level

A single value.

### branch

When using the push and pull_request events, you can configure a workflow to run on specific branches or tags. If you only define only tags or only branches, the workflow won't run for events affecting the undefined Git ref.
The branches, branches-ignore, tags, and tags-ignore keywords accept glob patterns that use the * and ** wildcard characters to match more than one branch or tag name. For more information, see https://help.github.com/en/github/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet.
The patterns defined in branches and tags are evaluated against the Git ref's name. For example, defining the pattern mona/octocat in branches will match the refs/heads/mona/octocat Git ref. The pattern releases/** will match the refs/heads/releases/10 Git ref.
You can use two types of filters to prevent a workflow from running on pushes and pull requests to tags and branches:
- branches or branches-ignore - You cannot use both the branches and branches-ignore filters for the same event in a workflow. Use the branches filter when you need to filter branches for positive matches and exclude branches. Use the branches-ignore filter when you only need to exclude branch names.
- tags or tags-ignore - You cannot use both the tags and tags-ignore filters for the same event in a workflow. Use the tags filter when you need to filter tags for positive matches and exclude tags. Use the tags-ignore filter when you only need to exclude tag names.
You can exclude tags and branches using the ! character. The order that you define patterns matters.
- A matching negative pattern (prefixed with !) after a positive match will exclude the Git ref.
- A matching positive pattern after a negative match will include the Git ref again.

A single value.

### expressionSyntax

A single value.

### env

To set custom environment variables, you need to specify the variables in the workflow file. You can define environment variables for a step, job, or entire workflow using the jobs.<job_id>.steps[*].env, jobs.<job_id>.env, and env keywords. For more information, see https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_idstepsenv

A single value.

### path

When using the push and pull_request events, you can configure a workflow to run when at least one file does not match paths-ignore or at least one modified file matches the configured paths. Path filters are not evaluated for pushes to tags.
The paths-ignore and paths keywords accept glob patterns that use the * and ** wildcard characters to match more than one path name. For more information, see https://help.github.com/en/github/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet.
You can exclude paths using two types of filters. You cannot use both of these filters for the same event in a workflow.
- paths-ignore - Use the paths-ignore filter when you only need to exclude path names.
- paths - Use the paths filter when you need to filter paths for positive matches and exclude paths.

A single value.

### configuration

A single value.

### concurrency

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| group | text | yes, always | When a concurrent job or workflow is queued, if another job or workflow using the same concurrency group in the repository is in progress, the queued job or workflow will be pending. By default any previously pending job or workflow in the concurrency group will be canceled; this behavior can be changed with `queue`. |
| cancel-in-progress | one of 2 forms: yes or no; expressionSyntax | no | To cancel any currently running job or workflow in the same concurrency group, specify cancel-in-progress: true. |
| queue | one of: single, max | no | Controls how pending jobs or workflow runs are queued within a concurrency group. With the default `single`, at most one run can be pending — additional pending runs cancel the previous one. With `max`, up to 100 runs can be pending and are processed in FIFO order. The combination of `queue: max` and `cancel-in-progress: true` is not allowed. |

### permissions

You can modify the default permissions granted to the GITHUB_TOKEN, adding or removing access as required, so that you only allow the minimum required access.

A single value.

### defaults

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| run | a group of fields; at least 1 fields; nothing else may be added here | no |  |
| run.shell | shell | no |  |
| run.working-directory | working-directory | no |  |

### event

A single value.

### stringContainingExpressionSyntax

A single value.

### globs

This one is a list. The fields below describe a single entry.

A single value.

### name

A single value.

### shell

You can override the default shell settings in the runner's operating system using the shell keyword. You can use built-in shell keywords, or you can define a custom set of shell options.

A single value.

### step

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| id | text | no | A unique identifier for the step. You can use the id to reference the step in contexts. For more information, see https://help.github.com/en/articles/contexts-and-expression-syntax-for-github-actions. |
| if | yes or no | no | You can use the if conditional to prevent a step from running unless a condition is met. You can use any supported context and expression to create a conditional. Expressions in an if conditional do not require the ${{ }} syntax. For more information, see https://help.github.com/en/articles/contexts-and-expression-syntax-for-github-actions. |
| name | text | no | A name for your step to display on GitHub. |
| uses | text | no | Selects an action to run as part of a step in your job. An action is a reusable unit of code. You can use an action defined in the same repository as the workflow, a public repository, or in a published Docker container image (https://hub.docker.com/). We strongly recommend that you include the version of the action you are using by specifying a Git ref, SHA, or Docker tag number. If you don't specify a version, it could break your workflows or cause unexpected behavior when the action owner publishes an update. - Using the commit SHA of a released action version is the safest for stability and security. - Using the specific major action version allows you to receive critical fixes and security patches while still maintaining compatibility. It also assures that your workflow should still work. - Using the master branch of an action may be convenient, but if someone releases a new major version with a breaking change, your workflow could break. Some actions require inputs that you must set using the with keyword. Review the action's README file to determine the inputs required. Actions are either JavaScript files or Docker containers. If the action you're using is a Docker container you must run the job in a Linux virtual environment. For more details, see https://help.github.com/en/articles/virtual-environments-for-github-actions. |
| run | text | no | Runs command-line programs using the operating system's shell. If you do not provide a name, the step name will default to the text specified in the run command. Commands run using non-login shells by default. You can choose a different shell and customize the shell used to run commands. For more information, see https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#using-a-specific-shell. Each run keyword represents a new process and shell in the virtual environment. When you provide multi-line commands, each line runs in the same shell. |
| working-directory | working-directory | no |  |
| shell | shell | no |  |
| with | a group of fields; and follows env as well | no | A map of the input parameters defined by the action. Each input parameter is a key/value pair. Input parameters are set as environment variables. The variable is prefixed with INPUT_ and converted to upper case. |
| with.args | text | no |  |
| with.entrypoint | text | no |  |
| env | env | no | Sets environment variables for steps to use in the virtual environment. You can also set environment variables for the entire workflow or a job. |
| continue-on-error | one of 2 forms: yes or no; expressionSyntax; left out means no | no | Prevents a job from failing when a step fails. Set to true to allow a job to pass when this step fails. |
| timeout-minutes | one of 2 forms: a number; expressionSyntax | no | The maximum number of minutes to run the step before killing the process. |
| background | yes or no | no | Runs a step asynchronously so the job continues to the next step without waiting for it to finish. You can use background on steps that use run or uses. To reference a background step from wait or cancel, give it an id. A maximum of 10 background steps can run concurrently in a single job. |
| wait | one of 2 forms: text; a list | no | Pauses the job until one or more background steps complete. Provide a single step id as a string, or multiple step ids as an array. After a wait step completes, the outputs of the referenced background steps become available to subsequent steps. |
| wait-all | yes or no; the value itself may be empty | no | Pauses the job until all active background steps complete. The wait-all keyword takes no arguments. |
| cancel | text | no | Gracefully terminates a running background step. The runner sends the step's process a termination signal (SIGTERM) so it can clean up. The cancel keyword targets a single background step by its id. |
| parallel | a list, each one step; from 1 to any entries | no | Runs a group of steps concurrently, then waits for all of them to finish before continuing. Every step in the group runs as a background step, with an implicit wait at the end of the group. |

### working-directory

Using the working-directory keyword, you can specify the working directory of where to run the command.

A single value.

### jobNeeds

Identifies any jobs that must complete successfully before this job will run. It can be a string or array of strings. If a job fails, all jobs that need it are skipped unless the jobs use a conditional statement that causes the job to continue.

A single value.

### matrix

A build matrix is a set of different configurations of the virtual environment. For example you might run a job against more than one supported version of a language, operating system, or tool. Each configuration is a copy of the job that runs and reports a status.
You can specify a matrix by supplying an array for the configuration options. For example, if the GitHub virtual environment supports Node.js versions 6, 8, and 10 you could specify an array of those versions in the matrix.
When you define a matrix of operating systems, you must set the required runs-on keyword to the operating system of the current job, rather than hard-coding the operating system name. To access the operating system name, you can use the matrix.os context parameter to set runs-on. For more information, see https://help.github.com/en/articles/contexts-and-expression-syntax-for-github-actions.

A single value.

### jobContainer

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| image | text | yes, always | The Docker image to use as the container to run the action. The value can be the Docker Hub image name or a registry name. |
| credentials | a group of fields | no | If the image's container registry requires authentication to pull the image, you can use credentials to set a map of the username and password. The credentials are the same values that you would provide to the `docker login` command. |
| credentials.username | text | no |  |
| credentials.password | text | no |  |
| env | env | no | Sets a map of environment variables in the container. |
| ports | a list, each one one of 2 forms; from 1 to any entries | no | Sets an array of ports to expose on the container. |
| volumes | a list, each one text; from 1 to any entries | no | Sets an array of volumes for the container to use. You can use volumes to share data between services or other steps in a job. You can specify named Docker volumes, anonymous Docker volumes, or bind mounts on the host. To specify a volume, you specify the source and destination path: <source>:<destinationPath> The <source> is a volume name or an absolute path on the host machine, and <destinationPath> is an absolute path in the container. |
| options | text | no | Additional Docker container resource options. For a list of options, see https://docs.docker.com/engine/reference/commandline/create/#options. |

### serviceContainer

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| image | text | yes, always | The Docker image to use as the service container to run the action. The value can be the Docker Hub image name or a registry name. |
| credentials | a group of fields | no | If the image's container registry requires authentication to pull the image, you can use credentials to set a map of the username and password. The credentials are the same values that you would provide to the `docker login` command. |
| credentials.username | text | no |  |
| credentials.password | text | no |  |
| env | env | no | Sets a map of environment variables in the service container. |
| ports | a list, each one one of 2 forms; from 1 to any entries | no | Sets an array of ports to expose on the service container. |
| volumes | a list, each one text; from 1 to any entries | no | Sets an array of volumes for the service container to use. You can use volumes to share data between services or other steps in a job. You can specify named Docker volumes, anonymous Docker volumes, or bind mounts on the host. To specify a volume, you specify the source and destination path: <source>:<destinationPath> The <source> is a volume name or an absolute path on the host machine, and <destinationPath> is an absolute path in the container. |
| options | text | no | Additional Docker container resource options. For a list of options, see https://docs.docker.com/engine/reference/commandline/create/#options. |
| command | text | no | Overrides the Docker image's default command (`CMD`). The value is passed as arguments after the image name in the `docker create` command. If you also specify `entrypoint`, `command` provides the arguments to that entrypoint. |
| entrypoint | text | no | Overrides the Docker image's default `ENTRYPOINT`. The value is a single string defining the executable to run. Use this when you need to replace the image's entrypoint entirely. You can combine `entrypoint` with `command` to pass arguments to the custom entrypoint. |

### permissions-event

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| actions | permissions-level | no |  |
| artifact-metadata | permissions-level | no |  |
| attestations | permissions-level | no |  |
| checks | permissions-level | no |  |
| code-quality | permissions-level | no |  |
| contents | permissions-level | no |  |
| deployments | permissions-level | no |  |
| discussions | permissions-level | no |  |
| id-token | permissions-level | no |  |
| issues | permissions-level | no |  |
| models | one of: read, none | no |  |
| packages | permissions-level | no |  |
| pages | permissions-level | no |  |
| pull-requests | permissions-level | no |  |
| repository-projects | permissions-level | no |  |
| security-events | permissions-level | no |  |
| statuses | permissions-level | no |  |
| copilot-requests | one of: write | no |  |

### environment

The environment that the job references

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| name | text | yes, always | The name of the environment configured in the repo. |
| url | text | no | A deployment URL |
| deployment | one of 2 forms: yes or no; expressionSyntax; left out means yes | no | Whether to create a deployment for this job. Setting to false lets the job use environment secrets and variables without creating a deployment record. Wait timers and required reviewers still apply. |

### snapshot

You can use `jobs.<job_id>.snapshot` to generate a custom image.
Add the snapshot keyword to the job, using either the string syntax or mapping syntax as shown in https://docs.github.com/en/actions/how-tos/manage-runners/larger-runners/use-custom-images#generating-a-custom-image.
Each job that includes the snapshot keyword creates a separate image. To generate only one image or image version, include all workflow steps in a single job. Each successful run of a job that includes the snapshot keyword creates a new version of that image.
For more information, see https://docs.github.com/en/actions/how-tos/manage-runners/larger-runners/use-custom-images.

A single value.

### reusableWorkflowCallJob

Each job must have an id to associate with the job. The key job_id is a string and its value is a map of the job's configuration data. You must replace <job_id> with a string that is unique to the jobs object. The <job_id> must start with a letter or _ and contain only alphanumeric characters, -, or _.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| name | text | no | The name of the job displayed on GitHub. |
| needs | jobNeeds | no |  |
| permissions | permissions | no |  |
| if | yes or no | no | You can use the if conditional to prevent a job from running unless a condition is met. You can use any supported context and expression to create a conditional. Expressions in an if conditional do not require the ${{ }} syntax. For more information, see https://help.github.com/en/articles/contexts-and-expression-syntax-for-github-actions. |
| uses | text; in an exact set format | yes, always | The location and version of a reusable workflow file to run as a job, of the form './{path/to}/{localfile}.yml' or '{owner}/{repo}/{path}/{filename}@{ref}'. {ref} can be a SHA, a release tag, or a branch name. Using the commit SHA is the safest for stability and security. |
| with | env | no | A map of inputs that are passed to the called workflow. Any inputs that you pass must match the input specifications defined in the called workflow. Unlike 'jobs.<job_id>.steps[*].with', the inputs you pass with 'jobs.<job_id>.with' are not be available as environment variables in the called workflow. Instead, you can reference the inputs by using the inputs context. |
| secrets | one of 2 forms: env; a fixed value | no | When a job is used to call a reusable workflow, you can use 'secrets' to provide a map of secrets that are passed to the called workflow. Any secrets that you pass must match the names defined in the called workflow. |
| strategy | a group of fields; nothing else may be added here | no | A strategy creates a build matrix for your jobs. You can define different variations of an environment to run each job in. |
| strategy.matrix | matrix | yes, always |  |
| strategy.fail-fast | yes or no; left out means yes | no | When set to true, GitHub cancels all in-progress jobs if any matrix job fails. Default: true |
| strategy.max-parallel | a number or text | no | The maximum number of jobs that can run simultaneously when using a matrix job strategy. By default, GitHub will maximize the number of jobs run in parallel depending on the available runners on GitHub-hosted virtual machines. |
| concurrency | one of 2 forms: text; concurrency | no | Concurrency ensures that only a single job or workflow using the same concurrency group will run at a time. A concurrency group can be any string or expression. The expression can use any context except for the secrets context.  You can also specify concurrency at the workflow level.  When a concurrent job or workflow is queued, if another job or workflow using the same concurrency group in the repository is in progress, the queued job or workflow will be pending. By default any previously pending job or workflow in the concurrency group will be canceled; this behavior can be changed with `queue`. To also cancel any currently running job or workflow in the same concurrency group, specify cancel-in-progress: true. |

### normalJob

Each job must have an id to associate with the job. The key job_id is a string and its value is a map of the job's configuration data. You must replace <job_id> with a string that is unique to the jobs object. The <job_id> must start with a letter or _ and contain only alphanumeric characters, -, or _.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| name | text | no | The name of the job displayed on GitHub. |
| needs | jobNeeds | no |  |
| snapshot | snapshot | no |  |
| permissions | permissions | no |  |
| runs-on | one of 5 forms: text; a list; a group of fields; stringContainingExpressionSyntax; expressionSyntax | yes, always | The type of machine to run the job on. The machine can be either a GitHub-hosted runner, or a self-hosted runner. |
| environment | one of 2 forms: text; environment | no | The environment that the job references. |
| outputs | a group of fields; at least 1 fields | no | A map of outputs for a job. Job outputs are available to all downstream jobs that depend on this job. |
| outputs.any name you choose | text | no |  |
| env | env | no | A map of environment variables that are available to all steps in the job. |
| defaults | defaults | no | A map of default settings that will apply to all steps in the job. |
| if | yes or no | no | You can use the if conditional to prevent a job from running unless a condition is met. You can use any supported context and expression to create a conditional. Expressions in an if conditional do not require the ${{ }} syntax. For more information, see https://help.github.com/en/articles/contexts-and-expression-syntax-for-github-actions. |
| steps | a list, each one step; from 1 to any entries | no | A job contains a sequence of tasks called steps. Steps can run commands, run setup tasks, or run an action in your repository, a public repository, or an action published in a Docker registry. Not all steps run actions, but all actions run as a step. Each step runs in its own process in the virtual environment and has access to the workspace and filesystem. Because steps run in their own process, changes to environment variables are not preserved between steps. GitHub provides built-in steps to set up and complete a job. Must contain either `uses` or `run` |
| timeout-minutes | one of 2 forms: a number; expressionSyntax; left out means 360 | no | The maximum number of minutes to let a workflow run before GitHub automatically cancels it. Default: 360 |
| strategy | a group of fields; nothing else may be added here | no | A strategy creates a build matrix for your jobs. You can define different variations of an environment to run each job in. |
| strategy.matrix | matrix | yes, always |  |
| strategy.fail-fast | yes or no; left out means yes | no | When set to true, GitHub cancels all in-progress jobs if any matrix job fails. Default: true |
| strategy.max-parallel | a number or text | no | The maximum number of jobs that can run simultaneously when using a matrix job strategy. By default, GitHub will maximize the number of jobs run in parallel depending on the available runners on GitHub-hosted virtual machines. |
| continue-on-error | one of 2 forms: yes or no; expressionSyntax | no | Prevents a workflow run from failing when a job fails. Set to true to allow a workflow run to pass when this job fails. |
| container | one of 2 forms: text; jobContainer | no | A container to run any steps in a job that don't already specify a container. If you have steps that use both script and container actions, the container actions will run as sibling containers on the same network with the same volume mounts. If you do not set a container, all steps will run directly on the host specified by runs-on unless a step refers to an action configured to run in a container. |
| services | a group of fields | no | Additional containers to host services for a job in a workflow. These are useful for creating databases or cache services like redis. The runner on the virtual machine will automatically create a network and manage the life cycle of the service containers. When you use a service container for a job or your step uses container actions, you don't need to set port information to access the service. Docker automatically exposes all ports between containers on the same network. When both the job and the action run in a container, you can directly reference the container by its hostname. The hostname is automatically mapped to the service name. When a step does not use a container action, you must access the service using localhost and bind the ports. |
| services.any name you choose | serviceContainer | no |  |
| concurrency | one of 2 forms: text; concurrency | no | Concurrency ensures that only a single job or workflow using the same concurrency group will run at a time. A concurrency group can be any string or expression. The expression can use any context except for the secrets context.  You can also specify concurrency at the workflow level.  When a concurrent job or workflow is queued, if another job or workflow using the same concurrency group in the repository is in progress, the queued job or workflow will be pending. By default any previously pending job or workflow in the concurrency group will be canceled; this behavior can be changed with `queue`. To also cancel any currently running job or workflow in the same concurrency group, specify cancel-in-progress: true. |

### workflowDispatchInput

A string identifier to associate with the input. The value of <input_id> is a map of the input's metadata. The <input_id> must be a unique identifier within the inputs object. The <input_id> must start with a letter or _ and contain only alphanumeric characters, -, or _.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| description | text | no | A string description of the input parameter. |
| deprecationMessage | text | no | A string shown to users using the deprecated input. |
| required | yes or no | no | A boolean to indicate whether the action requires the input parameter. Set to true when the parameter is required. |
| default | anything | no | A string representing the default value. The default value is used when an input parameter isn't specified in a workflow file. |
| type | one of: string, choice, boolean, number, environment | no | A string representing the type of the input. |
| options | a list, each one text; from 1 to any entries | no | The options of the dropdown list, if the type is a choice. |
| when type is "string" |  | only in certain cases |  |
| when type is "string" then.default | text | no |  |
| when type is "boolean" |  | only in certain cases |  |
| when type is "boolean" then.default | yes or no | no |  |
| when type is "number" |  | only in certain cases |  |
| when type is "number" then.default | a number | no |  |
| when type is "environment" |  | only in certain cases |  |
| when type is "environment" then.default | text | no |  |
| when type is "choice" |  | only in certain cases |  |
| when type is "choice" then | options becomes required | yes | |

### architecture

A single value.

### machine

A single value.
