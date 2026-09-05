# Compose Specification

The Compose file is a YAML file defining a multi-containers based application.

## What this file holds

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| version | text | no | declared for backward compatibility, ignored. Please remove it. |
| name | text | no | define the Compose project name, until user defines one explicitly. |
| include | a list, each one include | no | compose sub-projects to be included. |
| services | a group of fields; nothing else may be added here | no | The services that will be used by your application. |
| services.any name made of letters, numbers, dots, underscores, dashes | service | no |  |
| models | a group of fields | no | Language models that will be used by your application. |
| models.any name made of letters, numbers, dots, underscores, dashes | model | no |  |
| networks | a group of fields | no | Networks that are shared among multiple services. |
| networks.any name made of letters, numbers, dots, underscores, dashes | network | no |  |
| volumes | a group of fields; nothing else may be added here | no | Named volumes that are shared among multiple services. |
| volumes.any name made of letters, numbers, dots, underscores, dashes | volume | no |  |
| secrets | a group of fields; nothing else may be added here | no | Secrets that are shared among multiple services. |
| secrets.any name made of letters, numbers, dots, underscores, dashes | secret | no |  |
| configs | a group of fields; nothing else may be added here | no | Configurations that are shared among multiple services. |
| configs.any name made of letters, numbers, dots, underscores, dashes | config | no |  |
| any name in a set format | anything | no |  |

## All 26 shapes

Most used first, because everything else is built on them.

- **list_or_dict** (used 18)
- **list_of_strings** (used 12)
- **string_or_list** (used 8)
- **command** (used 4)
- **blkio_limit** (used 4)
- **service_hook** (used 3)
- **service_config_or_secret** (used 3)
- **extra_hosts** (used 2)
- **ulimits** (used 2)
- **service** (used 1)
- **healthcheck** (used 1)
- **development** (used 1)
- **deployment** (used 1)
- **generic_resources** (used 1)
- **devices** (used 1)
- **gpus** (used 1)
- **include** (used 1)
- **network** (used 1)
- **volume** (used 1)
- **secret** (used 1)
- **config** (used 1)
- **model** (used 1)
- **pre_start_hook** (used 1)
- **env_file** (used 1)
- **label_file** (used 1)
- **blkio_weight** (used 1)

### list_or_dict

Either a dictionary mapping keys to values, or a list of strings.

A single value.

### list_of_strings

A list of unique string values.

This one is a list. The fields below describe a single entry.

A single value.

### string_or_list

Either a single string or a list of strings.

A single value.

### command

Command to run in the container, which can be specified as a string (shell form) or array (exec form).

A single value.

### blkio_limit

Block IO limit for a specific device.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| path | text | no | Path to the device (e.g., '/dev/sda'). |
| rate | a whole number or text | no | Rate limit in bytes per second or IO operations per second. |

### service_hook

Configuration for service lifecycle hooks, which are commands executed at specific points in a container's lifecycle.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| command | command | yes, always | Command to execute as part of the hook. |
| user | text | no | User to run the command as. |
| privileged | yes or no | no | Whether to run the command with extended privileges. |
| working_dir | text | no | Working directory for the command. |
| environment | list_or_dict | no | Environment variables for the command. |
| any name in a set format | anything | no |  |

### service_config_or_secret

Configuration for service configs or secrets, defining how they are mounted in the container.

This one is a list. The fields below describe a single entry.

A single value.

### extra_hosts

Additional hostnames to be defined in the container's /etc/hosts file.

A single value.

### ulimits

Container ulimit options, controlling resource limits for processes inside the container.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name made of letters, dashes | one of 2 forms: a whole number or text; a group of fields | no |  |

### service

Configuration for a service.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| develop | development | no |  |
| deploy | deployment | no |  |
| annotations | list_or_dict | no |  |
| attach | yes or no | no |  |
| build | one of 2 forms: text; a group of fields | no | Configuration options for building the service's image. |
| blkio_config | a group of fields; nothing else may be added here | no | Block IO configuration for the service. |
| blkio_config.device_read_bps | a list, each one blkio_limit | no | Limit read rate (bytes per second) from a device. |
| blkio_config.device_read_iops | a list, each one blkio_limit | no | Limit read rate (IO per second) from a device. |
| blkio_config.device_write_bps | a list, each one blkio_limit | no | Limit write rate (bytes per second) to a device. |
| blkio_config.device_write_iops | a list, each one blkio_limit | no | Limit write rate (IO per second) to a device. |
| blkio_config.weight | a whole number or text | no | Block IO weight (relative weight) for the service, between 10 and 1000. |
| blkio_config.weight_device | a list, each one blkio_weight | no | Block IO weight (relative weight) for specific devices. |
| cap_add | a list, each one text | no | Add Linux capabilities. For example, 'CAP_SYS_ADMIN', 'SYS_ADMIN', or 'NET_ADMIN'. |
| cap_drop | a list, each one text | no | Drop Linux capabilities. For example, 'CAP_SYS_ADMIN', 'SYS_ADMIN', or 'NET_ADMIN'. |
| cgroup | one of: host, private | no | Specify the cgroup namespace to join. Use 'host' to use the host's cgroup namespace, or 'private' to use a private cgroup namespace. |
| cgroup_parent | text | no | Specify an optional parent cgroup for the container. |
| command | command | no | Override the default command declared by the container image, for example 'CMD' in Dockerfile. |
| configs | service_config_or_secret, itself a list | no | Grant access to Configs on a per-service basis. |
| container_name | text; in an exact set format | no | Specify a custom container name, rather than a generated default name. |
| cpu_count | one of 2 forms: text; a whole number | no | Number of usable CPUs. |
| cpu_percent | one of 2 forms: text; a whole number | no | Percentage of CPU resources to use. |
| cpu_shares | a number or text | no | CPU shares (relative weight) for the container. |
| cpu_quota | a number or text | no | Limit the CPU CFS (Completely Fair Scheduler) quota. |
| cpu_period | a number or text | no | Limit the CPU CFS (Completely Fair Scheduler) period. |
| cpu_rt_period | a number or text | no | Limit the CPU real-time period in microseconds or a duration. |
| cpu_rt_runtime | a number or text | no | Limit the CPU real-time runtime in microseconds or a duration. |
| cpus | a number or text | no | Number of CPUs to use. A floating-point value is supported to request partial CPUs. |
| cpuset | text | no | CPUs in which to allow execution (0-3, 0,1). |
| credential_spec | a group of fields; nothing else may be added here | no | Configure the credential spec for managed service account. |
| credential_spec.config | text | no | The name of the credential spec Config to use. |
| credential_spec.file | text | no | Path to a credential spec file. |
| credential_spec.registry | text | no | Path to a credential spec in the Windows registry. |
| credential_spec.any name in a set format | anything | no |  |
| depends_on | one of 2 forms: list_of_strings; a group of fields | no | Express dependency between services. Service dependencies cause services to be started in dependency order. The dependent service will wait for the dependency to be ready before starting. |
| device_cgroup_rules | list_of_strings, itself a list | no | Add rules to the cgroup allowed devices list. |
| devices | a list, each one one of 2 forms | no | List of device mappings for the container. |
| dns | string_or_list | no | Custom DNS servers to set for the service container. |
| dns_opt | a list, each one text | no | Custom DNS options to be passed to the container's DNS resolver. |
| dns_search | string_or_list | no | Custom DNS search domains to set on the service container. |
| domainname | text | no | Custom domain name to use for the service container. |
| entrypoint | command | no | Override the default entrypoint declared by the container image, for example 'ENTRYPOINT' in Dockerfile. |
| env_file | env_file | no | Add environment variables from a file or multiple files. Can be a single file path or a list of file paths. |
| label_file | label_file | no | Add metadata to containers using files containing Docker labels. |
| environment | list_or_dict | no | Add environment variables. You can use either an array or a list of KEY=VAL pairs. |
| expose | a list, each one text or a number | no | Expose ports without publishing them to the host machine - they'll only be accessible to linked services. |
| extends | one of 2 forms: text; a group of fields | no | Extend another service, in the current file or another file. |
| provider | a group of fields; nothing else may be added here | no | Specify a service which will not be manage by Compose directly, and delegate its management to an external provider. |
| provider.type | text | yes, always | External component used by Compose to manage setup and teardown lifecycle of the service. |
| provider.options | a group of fields | no | Provider-specific options. |
| provider.options.any name in a set format | one of 2 forms: yes or no; a list | no |  |
| provider.any name in a set format | anything | no |  |
| external_links | a list, each one text | no | Link to services started outside this Compose application. Specify services as <service_name>:<alias>. |
| extra_hosts | extra_hosts | no | Add hostname mappings to the container network interface configuration. |
| gpus | gpus | no | Define GPU devices to use. Can be set to 'all' to use all GPUs, or a list of specific GPU devices. |
| group_add | a list, each one text or a number | no | Add additional groups which user inside the container should be member of. |
| healthcheck | healthcheck | no | Configure a health check for the container to monitor its health status. |
| hostname | text | no | Define a custom hostname for the service container. |
| image | text | no | Specify the image to start the container from. Can be a repository/tag, a digest, or a local image ID. |
| init | yes or no | no | Run as an init process inside the container that forwards signals and reaps processes. |
| ipc | text | no | IPC sharing mode for the service container. Use 'host' to share the host's IPC namespace, 'service:[service_name]' to share with another service, or 'shareable' to allow other services to share this service's IPC namespace. |
| isolation | text | no | Container isolation technology to use. Supported values are platform-specific. |
| labels | list_or_dict | no | Add metadata to containers using Docker labels. You can use either an array or a list. |
| links | a list, each one text | no | Link to containers in another service. Either specify both the service name and a link alias (SERVICE:ALIAS), or just the service name. |
| logging | a group of fields; nothing else may be added here | no | Logging configuration for the service. |
| logging.driver | text | no | Logging driver to use, such as 'json-file', 'syslog', 'journald', etc. |
| logging.options | a group of fields | no | Options for the logging driver. |
| logging.options.any name in a set format | text or a number; the value itself may be empty | no |  |
| logging.any name in a set format | anything | no |  |
| mac_address | text | no | Container MAC address to set. |
| mem_limit | a number or text | no | Memory limit for the container. A string value can use suffix like '2g' for 2 gigabytes. |
| mem_reservation | text or a whole number | no | Memory reservation for the container. |
| mem_swappiness | a whole number or text | no | Container memory swappiness as percentage (0 to 100). |
| memswap_limit | a number or text | no | Amount of memory the container is allowed to swap to disk. Set to -1 to enable unlimited swap. |
| network_mode | text | no | Network mode. Values can be 'bridge', 'host', 'none', 'service:[service name]', or 'container:[container name]'. |
| models | one of 2 forms: list_of_strings; a group of fields | no | AI Models to use, referencing entries under the top-level models key. |
| networks | one of 2 forms: list_of_strings; a group of fields | no | Networks to join, referencing entries under the top-level networks key. Can be a list of network names or a mapping of network name to network configuration. |
| oom_kill_disable | yes or no | no | Disable OOM Killer for the container. |
| oom_score_adj | one of 2 forms: text; a whole number | no | Tune host's OOM preferences for the container (accepts -1000 to 1000). |
| pid | text; the value itself may be empty | no | PID mode for container. |
| pids_limit | a number or text | no | Tune a container's PIDs limit. Set to -1 for unlimited PIDs. |
| platform | text | no | Target platform to run on, e.g., 'linux/amd64', 'linux/arm64', or 'windows/amd64'. |
| ports | a list, each one one of 3 forms | no | Expose container ports. Short format ([HOST:]CONTAINER[/PROTOCOL]). |
| pre_start | a list, each one pre_start_hook | no | Init containers to run to completion before the service container is started. Each step runs in its own ephemeral container, in declared order; a non-zero exit fails the bring-up of the service and its dependents. |
| post_start | a list, each one service_hook | no | Commands to run after the container starts. If any command fails, the container stops. |
| pre_stop | a list, each one service_hook | no | Commands to run before the container stops. If any command fails, the container stop is aborted. |
| privileged | yes or no | no | Give extended privileges to the service container. |
| profiles | list_of_strings, itself a list | no | List of profiles for this service. When profiles are specified, services are only started when the profile is activated. |
| pull_policy | text; in an exact set format | no | Policy for pulling images. Options include: 'always', 'never', 'if_not_present', 'missing', 'build', or time-based refresh policies. |
| pull_refresh_after | text | no | Time after which to refresh the image. Used with pull_policy=refresh. |
| read_only | yes or no | no | Mount the container's filesystem as read only. |
| restart | text | no | Restart policy for the service container. Options include: 'no', 'always', 'on-failure', and 'unless-stopped'. |
| runtime | text | no | Runtime to use for this container, e.g., 'runc'. |
| scale | a whole number or text | no | Number of containers to deploy for this service. |
| security_opt | a list, each one text | no | Override the default labeling scheme for each container. |
| shm_size | a number or text | no | Size of /dev/shm. A string value can use suffix like '2g' for 2 gigabytes. |
| secrets | service_config_or_secret, itself a list | no | Grant access to Secrets on a per-service basis. |
| sysctls | list_or_dict | no | Kernel parameters to set in the container. You can use either an array or a list. |
| stdin_open | yes or no | no | Keep STDIN open even if not attached. |
| stop_grace_period | text | no | Time to wait for the container to stop gracefully before sending SIGKILL (e.g., '1s', '1m30s'). |
| stop_signal | text | no | Signal to stop the container (e.g., 'SIGTERM', 'SIGINT'). |
| storage_opt | a group of fields | no | Storage driver options for the container. |
| tmpfs | string_or_list | no | Mount a temporary filesystem (tmpfs) into the container. Can be a single value or a list. |
| tty | yes or no | no | Allocate a pseudo-TTY to service container. |
| ulimits | ulimits | no | Override the default ulimits for a container. |
| use_api_socket | yes or no | no | Bind mount Docker API socket and required auth. |
| user | text | no | Username or UID to run the container process as. |
| uts | text | no | UTS namespace to use. 'host' shares the host's UTS namespace. |
| userns_mode | text | no | User namespace to use. 'host' shares the host's user namespace. |
| volumes | a list, each one one of 2 forms | no | Mount host paths or named volumes accessible to the container. Short syntax (VOLUME:CONTAINER_PATH[:MODE]) |
| volumes_from | a list, each one text | no | Mount volumes from another service or container. Optionally specify read-only access (ro) or read-write (rw). |
| working_dir | text | no | The working directory in which the entrypoint or command will be run |
| any name in a set format | anything | no |  |

### healthcheck

Configuration options to determine whether the container is healthy.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| disable | yes or no | no | Disable any container-specified healthcheck. Set to true to disable. |
| interval | text | no | Time between running the check (e.g., '1s', '1m30s'). Default: 30s. |
| retries | a number or text | no | Number of consecutive failures needed to consider the container as unhealthy. Default: 3. |
| test | one of 2 forms: text; a list | no | The test to perform to check container health. Can be a string or a list. The first item is either NONE, CMD, or CMD-SHELL. If it's CMD, the rest of the command is exec'd. If it's CMD-SHELL, the rest is run in the shell. |
| timeout | text | no | Maximum time to allow one check to run (e.g., '1s', '1m30s'). Default: 30s. |
| start_period | text | no | Start period for the container to initialize before starting health-retries countdown (e.g., '1s', '1m30s'). Default: 0s. |
| start_interval | text | no | Time between running the check during the start period (e.g., '1s', '1m30s'). Default: interval value. |
| any name in a set format | anything | no |  |

### development

Development configuration for the service, used for development workflows.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| watch | a list, each one a group of fields | no | Configure watch mode for the service, which monitors file changes and performs actions in response. |
| watch[].ignore | string_or_list | no | Patterns to exclude from watching. |
| watch[].include | string_or_list | no | Patterns to include in watching. |
| watch[].path | text | yes, always | Path to watch for changes. |
| watch[].action | one of: rebuild, sync, restart, sync+restart, sync+exec | yes, always | Action to take when a change is detected: rebuild the container, sync files, restart the container, sync and restart, or sync and execute a command. |
| watch[].target | text | no | Target path in the container for sync operations. |
| watch[].exec | service_hook | no | Command to execute when a change is detected and action is sync+exec. |
| watch[].initial_sync | yes or no | no | Ensure that an initial synchronization is done before starting watch mode for sync+x triggers |
| watch[].any name in a set format | anything | no |  |
| any name in a set format | anything | no |  |

### deployment

Deployment configuration for the service.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| mode | text | no | Deployment mode for the service: 'replicated' (default) or 'global'. |
| endpoint_mode | text | no | Endpoint mode for the service: 'vip' (default) or 'dnsrr'. |
| replicas | a whole number or text | no | Number of replicas of the service container to run. |
| labels | list_or_dict | no | Labels to apply to the service. |
| rollback_config | a group of fields; nothing else may be added here | no | Configuration for rolling back a service update. |
| rollback_config.parallelism | a whole number or text | no | The number of containers to rollback at a time. If set to 0, all containers rollback simultaneously. |
| rollback_config.delay | text | no | The time to wait between each container group's rollback (e.g., '1s', '1m30s'). |
| rollback_config.failure_action | text | no | Action to take if a rollback fails: 'continue', 'pause'. |
| rollback_config.monitor | text | no | Duration to monitor each task for failures after it is created (e.g., '1s', '1m30s'). |
| rollback_config.max_failure_ratio | a number or text | no | Failure rate to tolerate during a rollback. |
| rollback_config.order | one of: start-first, stop-first | no | Order of operations during rollbacks: 'stop-first' (default) or 'start-first'. |
| rollback_config.any name in a set format | anything | no |  |
| update_config | a group of fields; nothing else may be added here | no | Configuration for updating a service. |
| update_config.parallelism | a whole number or text | no | The number of containers to update at a time. |
| update_config.delay | text | no | The time to wait between updating a group of containers (e.g., '1s', '1m30s'). |
| update_config.failure_action | text | no | Action to take if an update fails: 'continue', 'pause', 'rollback'. |
| update_config.monitor | text | no | Duration to monitor each updated task for failures after it is created (e.g., '1s', '1m30s'). |
| update_config.max_failure_ratio | a number or text | no | Failure rate to tolerate during an update (0 to 1). |
| update_config.order | one of: start-first, stop-first | no | Order of operations during updates: 'stop-first' (default) or 'start-first'. |
| update_config.any name in a set format | anything | no |  |
| resources | a group of fields; nothing else may be added here | no | Resource constraints and reservations for the service. |
| resources.limits | a group of fields; nothing else may be added here | no | Resource limits for the service containers. |
| resources.limits.cpus | a number or text | no | Limit for how much of the available CPU resources, as number of cores, a container can use. |
| resources.limits.memory | text | no | Limit on the amount of memory a container can allocate (e.g., '1g', '1024m'). |
| resources.limits.pids | a whole number or text | no | Maximum number of PIDs available to the container. |
| resources.limits.any name in a set format | anything | no |  |
| resources.reservations | a group of fields; nothing else may be added here | no | Resource reservations for the service containers. |
| resources.reservations.cpus | a number or text | no | Reservation for how much of the available CPU resources, as number of cores, a container can use. |
| resources.reservations.memory | text | no | Reservation on the amount of memory a container can allocate (e.g., '1g', '1024m'). |
| resources.reservations.generic_resources | generic_resources, itself a list | no | User-defined resources to reserve. |
| resources.reservations.devices | devices, itself a list | no | Device reservations for the container. |
| resources.reservations.any name in a set format | anything | no |  |
| resources.any name in a set format | anything | no |  |
| restart_policy | a group of fields; nothing else may be added here | no | Restart policy for the service containers. |
| restart_policy.condition | text | no | Condition for restarting the container: 'none', 'on-failure', 'any'. |
| restart_policy.delay | text | no | Delay between restart attempts (e.g., '1s', '1m30s'). |
| restart_policy.max_attempts | a whole number or text | no | Maximum number of restart attempts before giving up. |
| restart_policy.window | text | no | Time window used to evaluate the restart policy (e.g., '1s', '1m30s'). |
| restart_policy.any name in a set format | anything | no |  |
| placement | a group of fields; nothing else may be added here | no | Constraints and preferences for the platform to select a physical node to run service containers |
| placement.constraints | a list, each one text | no | Placement constraints for the service (e.g., 'node.role==manager'). |
| placement.preferences | a list, each one a group of fields | no | Placement preferences for the service. |
| placement.preferences[].spread | text | no | Spread tasks evenly across values of the specified node label. |
| placement.preferences[].any name in a set format | anything | no |  |
| placement.max_replicas_per_node | a whole number or text | no | Maximum number of replicas of the service. |
| placement.any name in a set format | anything | no |  |
| any name in a set format | anything | no |  |

### generic_resources

User-defined resources for services, allowing services to reserve specialized hardware resources.

This one is a list. The fields below describe a single entry. Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| discrete_resource_spec | a group of fields; nothing else may be added here | no | Specification for discrete (countable) resources. |
| discrete_resource_spec.kind | text | no | Type of resource (e.g., 'GPU', 'FPGA', 'SSD'). |
| discrete_resource_spec.value | a number or text | no | Number of resources of this kind to reserve. |
| discrete_resource_spec.any name in a set format | anything | no |  |
| any name in a set format | anything | no |  |

### devices

Device reservations for containers, allowing services to access specific hardware devices.

This one is a list. The fields below describe a single entry. Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| capabilities | list_of_strings, itself a list | yes, always | List of capabilities the device needs to have (e.g., 'gpu', 'compute', 'utility'). |
| count | text or a whole number | no | Number of devices of this type to reserve. |
| device_ids | list_of_strings, itself a list | no | List of specific device IDs to reserve. |
| driver | text | no | Device driver to use (e.g., 'nvidia'). |
| options | list_or_dict | no | Driver-specific options for the device. |
| any name in a set format | anything | no |  |

### gpus

A single value.

### include

Compose application or sub-projects to be included.

A single value.

### network

Network configuration for the Compose application.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| name | text | no | Custom name for this network. |
| driver | text | no | Specify which driver should be used for this network. Default is 'bridge'. |
| driver_opts | a group of fields | no | Specify driver-specific options defined as key/value pairs. |
| driver_opts.any name in a set format | text or a number | no |  |
| ipam | a group of fields; nothing else may be added here | no | Custom IP Address Management configuration for this network. |
| ipam.driver | text | no | Custom IPAM driver, instead of the default. |
| ipam.config | a list, each one a group of fields | no | List of IPAM configuration blocks. |
| ipam.config[].subnet | text | no | Subnet in CIDR format that represents a network segment. |
| ipam.config[].ip_range | text | no | Range of IPs from which to allocate container IPs. |
| ipam.config[].gateway | text | no | IPv4 or IPv6 gateway for the subnet. |
| ipam.config[].aux_addresses | a group of fields; nothing else may be added here | no | Auxiliary IPv4 or IPv6 addresses used by Network driver. |
| ipam.config[].aux_addresses.any name in a set format | text | no |  |
| ipam.config[].any name in a set format | anything | no |  |
| ipam.options | a group of fields; nothing else may be added here | no | Driver-specific options for the IPAM driver. |
| ipam.options.any name in a set format | text | no |  |
| ipam.any name in a set format | anything | no |  |
| external | a group of fields; nothing else may be added here | no | Specifies that this network already exists and was created outside of Compose. |
| external.name | text | no | Specifies the name of the external network. Deprecated: use the 'name' property instead. |
| external.any name in a set format | anything | no |  |
| internal | yes or no | no | Create an externally isolated network. |
| enable_ipv4 | yes or no | no | Enable IPv4 networking. |
| enable_ipv6 | yes or no | no | Enable IPv6 networking. |
| attachable | yes or no | no | If true, standalone containers can attach to this network. |
| labels | list_or_dict | no | Add metadata to the network using labels. |
| any name in a set format | anything | no |  |

### volume

Volume configuration for the Compose application.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| name | text | no | Custom name for this volume. |
| driver | text | no | Specify which volume driver should be used for this volume. |
| driver_opts | a group of fields | no | Specify driver-specific options. |
| driver_opts.any name in a set format | text or a number | no |  |
| external | a group of fields; nothing else may be added here | no | Specifies that this volume already exists and was created outside of Compose. |
| external.name | text | no | Specifies the name of the external volume. Deprecated: use the 'name' property instead. |
| external.any name in a set format | anything | no |  |
| labels | list_or_dict | no | Add metadata to the volume using labels. |
| any name in a set format | anything | no |  |

### secret

Secret configuration for the Compose application.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| name | text | no | Custom name for this secret. |
| environment | text | no | Name of an environment variable from which to get the secret value. |
| file | text | no | Path to a file containing the secret value. |
| external | a group of fields | no | Specifies that this secret already exists and was created outside of Compose. |
| external.name | text | no | Specifies the name of the external secret. |
| labels | list_or_dict | no | Add metadata to the secret using labels. |
| driver | text | no | Specify which secret driver should be used for this secret. |
| driver_opts | a group of fields | no | Specify driver-specific options. |
| driver_opts.any name in a set format | text or a number | no |  |
| template_driver | text | no | Driver to use for templating the secret's value. |
| any name in a set format | anything | no |  |

### config

Config configuration for the Compose application.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| name | text | no | Custom name for this config. |
| content | text | no | Inline content of the config. |
| environment | text | no | Name of an environment variable from which to get the config value. |
| file | text | no | Path to a file containing the config value. |
| external | a group of fields | no | Specifies that this config already exists and was created outside of Compose. |
| external.name | text | no | Specifies the name of the external config. Deprecated: use the 'name' property instead. |
| labels | list_or_dict | no | Add metadata to the config using labels. |
| template_driver | text | no | Driver to use for templating the config's value. |
| any name in a set format | anything | no |  |

### model

Language Model for the Compose application.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| name | text | no | Custom name for this model. |
| model | text | yes, always | Language Model to run. |
| context_size | a whole number | no |  |
| runtime_flags | a list, each one text | no | Raw runtime flags to pass to the inference engine. |
| any name in a set format | anything | no |  |

### pre_start_hook

Configuration for a pre_start init container, run to completion before the service container starts.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| command | command | no | Command to execute. Optional when the chosen image's entrypoint already runs the intended command. |
| image | text | no | Image used for the ephemeral container. If omitted, the parent service's image is used. |
| user | text | no | User to run the command as. Defaults to the user declared in image (or to the service's user when image is omitted). |
| privileged | yes or no | no | Whether to run the command with extended privileges. |
| working_dir | text | no | Working directory for the command. Defaults to the service's working directory. |
| environment | list_or_dict | no | Environment variables for the command. Appended to or overriding the service environment. |
| per_replica | yes or no | no | Whether the hook runs once per service replica (true), or once for the service as a whole before any replica starts (false, the default). |
| any name in a set format | anything | no |  |

### env_file

A single value.

### label_file

A single value.

### blkio_weight

Block IO weight for a specific device.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| path | text | no | Path to the device (e.g., '/dev/sda'). |
| weight | a whole number or text | no | Relative weight for the device, between 10 and 1000. |
