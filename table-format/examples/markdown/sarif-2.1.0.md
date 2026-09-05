# Static Analysis Results Format (SARIF) Version 2.1.0 JSON Schema

Static Analysis Results Format (SARIF) Version 2.1.0 JSON Schema: a standard format for the output of static analysis tools.

## What this file holds

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| $schema | a web address | no | The URI of the JSON schema corresponding to the version. |
| version | one of: 2.1.0 | yes, always | The SARIF format version of this log file. |
| runs | a list, each one run; from 0 to any entries | yes, always | The set of runs contained in this log file. |
| inlineExternalProperties | a list, each one externalProperties; from 0 to any entries | no | References to external property files that share data between runs. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the log file. |

## All 52 shapes

Most used first, because everything else is built on them.

- **propertyBag** (used 54)
- **message** (used 20)
- **artifactLocation** (used 18)
- **externalPropertyFileReference** (used 16)
- **multiformatMessageString** (used 16)
- **toolComponent** (used 10)
- **location** (used 7)
- **reportingDescriptorReference** (used 7)
- **artifactContent** (used 5)
- **region** (used 5)
- **webRequest** (used 4)
- **webResponse** (used 4)
- **address** (used 3)
- **graph** (used 3)
- **invocation** (used 3)
- **logicalLocation** (used 3)
- **reportingDescriptor** (used 3)
- **stack** (used 3)
- **threadFlowLocation** (used 3)
- **toolComponentReference** (used 3)
- **artifact** (used 2)
- **configurationOverride** (used 2)
- **conversion** (used 2)
- **exception** (used 2)
- **node** (used 2)
- **notification** (used 2)
- **physicalLocation** (used 2)
- **reportingConfiguration** (used 2)
- **result** (used 2)
- **runAutomationDetails** (used 2)
- **tool** (used 2)
- **artifactChange** (used 1)
- **attachment** (used 1)
- **codeFlow** (used 1)
- **edge** (used 1)
- **edgeTraversal** (used 1)
- **externalProperties** (used 1)
- **externalPropertyFileReferences** (used 1)
- **fix** (used 1)
- **graphTraversal** (used 1)
- **locationRelationship** (used 1)
- **rectangle** (used 1)
- **replacement** (used 1)
- **reportingDescriptorRelationship** (used 1)
- **resultProvenance** (used 1)
- **run** (used 1)
- **specialLocations** (used 1)
- **stackFrame** (used 1)
- **suppression** (used 1)
- **threadFlow** (used 1)
- **translationMetadata** (used 1)
- **versionControlDetails** (used 1)

### propertyBag

Key/value pairs that provide additional information about the object.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| tags | a list, each one text; from 0 to any entries; left out means | no | A set of distinct strings that provide additional information. |

### message

Encapsulates a message intended to be read by the end user.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| text | text | no | A plain text message string. |
| markdown | text | no | A Markdown message string. |
| id | text | no | The identifier for this message. |
| arguments | a list, each one text; from 0 to any entries; left out means | no | An array of strings to substitute into the message string. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the message. |

### artifactLocation

Specifies the location of an artifact.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| uri | a web address | no | A string containing a valid relative or absolute URI. |
| uriBaseId | text | no | A string which indirectly specifies the absolute URI with respect to which a relative URI in the "uri" property is interpreted. |
| index | a whole number; from -1 to any; left out means -1 | no | The index within the run artifacts array of the artifact object associated with the artifact location. |
| description | message | no | A short description of the artifact location. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the artifact location. |

### externalPropertyFileReference

Contains information that enables a SARIF consumer to locate the external property file that contains the value of an externalized property associated with the run.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| location | artifactLocation | no | The location of the external property file. |
| guid | text; in an exact set format | no | A stable, unique identifier for the external property file in the form of a GUID. |
| itemCount | a whole number; from -1 to any; left out means -1 | no | A non-negative integer specifying the number of items contained in the external property file. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the external property file. |

### multiformatMessageString

A message string or message format string rendered in multiple formats.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| text | text | yes, always | A plain text message string or format string. |
| markdown | text | no | A Markdown message string or format string. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the message. |

### toolComponent

A component, such as a plug-in or the driver, of the analysis tool that was run.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| guid | text; in an exact set format | no | A unique identifier for the tool component in the form of a GUID. |
| name | text | yes, always | The name of the tool component. |
| organization | text | no | The organization or company that produced the tool component. |
| product | text | no | A product suite to which the tool component belongs. |
| productSuite | text | no | A localizable string containing the name of the suite of products to which the tool component belongs. |
| shortDescription | multiformatMessageString | no | A brief description of the tool component. |
| fullDescription | multiformatMessageString | no | A comprehensive description of the tool component. |
| fullName | text | no | The name of the tool component along with its version and any other useful identifying information, such as its locale. |
| version | text | no | The tool component version, in whatever format the component natively provides. |
| semanticVersion | text | no | The tool component version in the format specified by Semantic Versioning 2.0. |
| dottedQuadFileVersion | text; in an exact set format | no | The binary version of the tool component's primary executable file expressed as four non-negative integers separated by a period (for operating systems that express file versions in this way). |
| releaseDateUtc | text | no | A string specifying the UTC date (and optionally, the time) of the component's release. |
| downloadUri | a web address | no | The absolute URI from which the tool component can be downloaded. |
| informationUri | a web address | no | The absolute URI at which information about this version of the tool component can be found. |
| globalMessageStrings | a group of fields | no | A dictionary, each of whose keys is a resource identifier and each of whose values is a multiformatMessageString object, which holds message strings in plain text and (optionally) Markdown format. The strings can include placeholders, which can be used to construct a message in combination with an arbitrary number of additional string arguments. |
| globalMessageStrings.any name you choose | multiformatMessageString | no |  |
| notifications | a list, each one reportingDescriptor; from 0 to any entries; left out means | no | An array of reportingDescriptor objects relevant to the notifications related to the configuration and runtime execution of the tool component. |
| rules | a list, each one reportingDescriptor; from 0 to any entries; left out means | no | An array of reportingDescriptor objects relevant to the analysis performed by the tool component. |
| taxa | a list, each one reportingDescriptor; from 0 to any entries; left out means | no | An array of reportingDescriptor objects relevant to the definitions of both standalone and tool-defined taxonomies. |
| locations | a list, each one artifactLocation; from 0 to any entries; left out means | no | An array of the artifactLocation objects associated with the tool component. |
| language | text; in an exact set format; left out means en-US | no | The language of the messages emitted into the log file during this run (expressed as an ISO 639-1 two-letter lowercase language code) and an optional region (expressed as an ISO 3166-1 two-letter uppercase subculture code associated with a country or region). The casing is recommended but not required (in order for this data to conform to RFC5646). |
| contents | a list, each one one of these; left out means localizedData, nonLocalizedData | no | The kinds of data contained in this object. |
| isComprehensive | yes or no; left out means no | no | Specifies whether this object contains a complete definition of the localizable and/or non-localizable data for this component, as opposed to including only data that is relevant to the results persisted to this log file. |
| localizedDataSemanticVersion | text | no | The semantic version of the localized strings defined in this component; maintained by components that provide translations. |
| minimumRequiredLocalizedDataSemanticVersion | text | no | The minimum value of localizedDataSemanticVersion required in translations consumed by this component; used by components that consume translations. |
| associatedComponent | toolComponentReference | no | The component which is strongly associated with this component. For a translation, this refers to the component which has been translated. For an extension, this is the driver that provides the extension's plugin model. |
| translationMetadata | translationMetadata | no | Translation metadata, required for a translation, not populated by other component types. |
| supportedTaxonomies | a list, each one toolComponentReference; from 0 to any entries; left out means | no | An array of toolComponentReference objects to declare the taxonomies supported by the tool component. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the tool component. |

### location

A location within a programming artifact.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| id | a whole number; from -1 to any; left out means -1 | no | Value that distinguishes this location from all other locations within a single result object. |
| physicalLocation | physicalLocation | no | Identifies the artifact and region. |
| logicalLocations | a list, each one logicalLocation; from 0 to any entries; left out means | no | The logical locations associated with the result. |
| message | message | no | A message relevant to the location. |
| annotations | a list, each one region; from 0 to any entries; left out means | no | A set of regions relevant to the location. |
| relationships | a list, each one locationRelationship; from 0 to any entries; left out means | no | An array of objects that describe relationships between this location and others. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the location. |

### reportingDescriptorReference

Information about how to locate a relevant reporting descriptor.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| id | text | no | The id of the descriptor. |
| index | a whole number; from -1 to any; left out means -1 | no | The index into an array of descriptors in toolComponent.ruleDescriptors, toolComponent.notificationDescriptors, or toolComponent.taxonomyDescriptors, depending on context. |
| guid | text; in an exact set format | no | A guid that uniquely identifies the descriptor. |
| toolComponent | toolComponentReference | no | A reference used to locate the toolComponent associated with the descriptor. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the reporting descriptor reference. |

### artifactContent

Represents the contents of an artifact.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| text | text | no | UTF-8-encoded content from a text artifact. |
| binary | text | no | MIME Base64-encoded content from a binary artifact, or from a text artifact in its original encoding. |
| rendered | multiformatMessageString | no | An alternate rendered representation of the artifact (e.g., a decompiled representation of a binary region). |
| properties | propertyBag | no | Key/value pairs that provide additional information about the artifact content. |

### region

A region within an artifact where a result was detected.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| startLine | a whole number; from 1 to any | no | The line number of the first character in the region. |
| startColumn | a whole number; from 1 to any | no | The column number of the first character in the region. |
| endLine | a whole number; from 1 to any | no | The line number of the last character in the region. |
| endColumn | a whole number; from 1 to any | no | The column number of the character following the end of the region. |
| charOffset | a whole number; from -1 to any; left out means -1 | no | The zero-based offset from the beginning of the artifact of the first character in the region. |
| charLength | a whole number; from 0 to any | no | The length of the region in characters. |
| byteOffset | a whole number; from -1 to any; left out means -1 | no | The zero-based offset from the beginning of the artifact of the first byte in the region. |
| byteLength | a whole number; from 0 to any | no | The length of the region in bytes. |
| snippet | artifactContent | no | The portion of the artifact contents within the specified region. |
| message | message | no | A message relevant to the region. |
| sourceLanguage | text | no | Specifies the source language, if any, of the portion of the artifact specified by the region object. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the region. |

### webRequest

Describes an HTTP request.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| index | a whole number; from -1 to any; left out means -1 | no | The index within the run.webRequests array of the request object associated with this result. |
| protocol | text | no | The request protocol. Example: 'http'. |
| version | text | no | The request version. Example: '1.1'. |
| target | text | no | The target of the request. |
| method | text | no | The HTTP method. Well-known values are 'GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS', 'TRACE', 'CONNECT'. |
| headers | a group of fields | no | The request headers. |
| headers.any name you choose | text | no |  |
| parameters | a group of fields | no | The request parameters. |
| parameters.any name you choose | text | no |  |
| body | artifactContent | no | The body of the request. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the request. |

### webResponse

Describes the response to an HTTP request.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| index | a whole number; from -1 to any; left out means -1 | no | The index within the run.webResponses array of the response object associated with this result. |
| protocol | text | no | The response protocol. Example: 'http'. |
| version | text | no | The response version. Example: '1.1'. |
| statusCode | a whole number | no | The response status code. Example: 451. |
| reasonPhrase | text | no | The response reason. Example: 'Not found'. |
| headers | a group of fields | no | The response headers. |
| headers.any name you choose | text | no |  |
| body | artifactContent | no | The body of the response. |
| noResponseReceived | yes or no; left out means no | no | Specifies whether a response was received from the server. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the response. |

### address

A physical or virtual address, or a range of addresses, in an 'addressable region' (memory or a binary file).

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| absoluteAddress | a whole number; from -1 to any; left out means -1 | no | The address expressed as a byte offset from the start of the addressable region. |
| relativeAddress | a whole number | no | The address expressed as a byte offset from the absolute address of the top-most parent object. |
| length | a whole number | no | The number of bytes in this range of addresses. |
| kind | text | no | An open-ended string that identifies the address kind. 'data', 'function', 'header','instruction', 'module', 'page', 'section', 'segment', 'stack', 'stackFrame', 'table' are well-known values. |
| name | text | no | A name that is associated with the address, e.g., '.text'. |
| fullyQualifiedName | text | no | A human-readable fully qualified name that is associated with the address. |
| offsetFromParent | a whole number | no | The byte offset of this address from the absolute or relative address of the parent object. |
| index | a whole number; from -1 to any; left out means -1 | no | The index within run.addresses of the cached object for this address. |
| parentIndex | a whole number; from -1 to any; left out means -1 | no | The index within run.addresses of the parent object. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the address. |

### graph

A network of nodes and directed edges that describes some aspect of the structure of the code (for example, a call graph).

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| description | message | no | A description of the graph. |
| nodes | a list, each one node; from 0 to any entries; left out means | no | An array of node objects representing the nodes of the graph. |
| edges | a list, each one edge; from 0 to any entries; left out means | no | An array of edge objects representing the edges of the graph. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the graph. |

### invocation

The runtime environment of the analysis tool run.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| commandLine | text | no | The command line used to invoke the tool. |
| arguments | a list, each one text; from 0 to any entries | no | An array of strings, containing in order the command line arguments passed to the tool from the operating system. |
| responseFiles | a list, each one artifactLocation; from 0 to any entries | no | The locations of any response files specified on the tool's command line. |
| startTimeUtc | a date and time | no | The Coordinated Universal Time (UTC) date and time at which the invocation started. See "Date/time properties" in the SARIF spec for the required format. |
| endTimeUtc | a date and time | no | The Coordinated Universal Time (UTC) date and time at which the invocation ended. See "Date/time properties" in the SARIF spec for the required format. |
| exitCode | a whole number | no | The process exit code. |
| ruleConfigurationOverrides | a list, each one configurationOverride; from 0 to any entries; left out means | no | An array of configurationOverride objects that describe rules related runtime overrides. |
| notificationConfigurationOverrides | a list, each one configurationOverride; from 0 to any entries; left out means | no | An array of configurationOverride objects that describe notifications related runtime overrides. |
| toolExecutionNotifications | a list, each one notification; from 0 to any entries; left out means | no | A list of runtime conditions detected by the tool during the analysis. |
| toolConfigurationNotifications | a list, each one notification; from 0 to any entries; left out means | no | A list of conditions detected by the tool that are relevant to the tool's configuration. |
| exitCodeDescription | text | no | The reason for the process exit. |
| exitSignalName | text | no | The name of the signal that caused the process to exit. |
| exitSignalNumber | a whole number | no | The numeric value of the signal that caused the process to exit. |
| processStartFailureMessage | text | no | The reason given by the operating system that the process failed to start. |
| executionSuccessful | yes or no | yes, always | Specifies whether the tool's execution completed successfully. |
| machine | text | no | The machine on which the invocation occurred. |
| account | text | no | The account under which the invocation occurred. |
| processId | a whole number | no | The id of the process in which the invocation occurred. |
| executableLocation | artifactLocation | no | An absolute URI specifying the location of the executable that was invoked. |
| workingDirectory | artifactLocation | no | The working directory for the invocation. |
| environmentVariables | a group of fields | no | The environment variables associated with the analysis tool process, expressed as key/value pairs. |
| environmentVariables.any name you choose | text | no |  |
| stdin | artifactLocation | no | A file containing the standard input stream to the process that was invoked. |
| stdout | artifactLocation | no | A file containing the standard output stream from the process that was invoked. |
| stderr | artifactLocation | no | A file containing the standard error stream from the process that was invoked. |
| stdoutStderr | artifactLocation | no | A file containing the interleaved standard output and standard error stream from the process that was invoked. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the invocation. |

### logicalLocation

A logical location of a construct that produced a result.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| name | text | no | Identifies the construct in which the result occurred. For example, this property might contain the name of a class or a method. |
| index | a whole number; from -1 to any; left out means -1 | no | The index within the logical locations array. |
| fullyQualifiedName | text | no | The human-readable fully qualified name of the logical location. |
| decoratedName | text | no | The machine-readable name for the logical location, such as a mangled function name provided by a C++ compiler that encodes calling convention, return type and other details along with the function name. |
| parentIndex | a whole number; from -1 to any; left out means -1 | no | Identifies the index of the immediate parent of the construct in which the result was detected. For example, this property might point to a logical location that represents the namespace that holds a type. |
| kind | text | no | The type of construct this logical location component refers to. Should be one of 'function', 'member', 'module', 'namespace', 'parameter', 'resource', 'returnType', 'type', 'variable', 'object', 'array', 'property', 'value', 'element', 'text', 'attribute', 'comment', 'declaration', 'dtd' or 'processingInstruction', if any of those accurately describe the construct. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the logical location. |

### reportingDescriptor

Metadata that describes a specific report produced by the tool, as part of the analysis it provides or its runtime reporting.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| id | text | yes, always | A stable, opaque identifier for the report. |
| deprecatedIds | a list, each one text; from 0 to any entries | no | An array of stable, opaque identifiers by which this report was known in some previous version of the analysis tool. |
| guid | text; in an exact set format | no | A unique identifier for the reporting descriptor in the form of a GUID. |
| deprecatedGuids | a list, each one text; from 0 to any entries | no | An array of unique identifies in the form of a GUID by which this report was known in some previous version of the analysis tool. |
| name | text | no | A report identifier that is understandable to an end user. |
| deprecatedNames | a list, each one text; from 0 to any entries | no | An array of readable identifiers by which this report was known in some previous version of the analysis tool. |
| shortDescription | multiformatMessageString | no | A concise description of the report. Should be a single sentence that is understandable when visible space is limited to a single line of text. |
| fullDescription | multiformatMessageString | no | A description of the report. Should, as far as possible, provide details sufficient to enable resolution of any problem indicated by the result. |
| messageStrings | a group of fields | no | A set of name/value pairs with arbitrary names. Each value is a multiformatMessageString object, which holds message strings in plain text and (optionally) Markdown format. The strings can include placeholders, which can be used to construct a message in combination with an arbitrary number of additional string arguments. |
| messageStrings.any name you choose | multiformatMessageString | no |  |
| defaultConfiguration | reportingConfiguration | no | Default reporting configuration information. |
| helpUri | a web address | no | A URI where the primary documentation for the report can be found. |
| help | multiformatMessageString | no | Provides the primary documentation for the report, useful when there is no online documentation. |
| relationships | a list, each one reportingDescriptorRelationship; from 0 to any entries; left out means | no | An array of objects that describe relationships between this reporting descriptor and others. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the report. |

### stack

A call stack that is relevant to a result.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| message | message | no | A message relevant to this call stack. |
| frames | a list, each one stackFrame; from 0 to any entries | yes, always | An array of stack frames that represents a sequence of calls, rendered in reverse chronological order, that comprise the call stack. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the stack. |

### threadFlowLocation

A location visited by an analysis tool while simulating or monitoring the execution of a program.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| index | a whole number; from -1 to any; left out means -1 | no | The index within the run threadFlowLocations array. |
| location | location | no | The code location. |
| stack | stack | no | The call stack leading to this location. |
| kinds | a list, each one text; from 0 to any entries; left out means | no | A set of distinct strings that categorize the thread flow location. Well-known kinds include 'acquire', 'release', 'enter', 'exit', 'call', 'return', 'branch', 'implicit', 'false', 'true', 'caution', 'danger', 'unknown', 'unreachable', 'taint', 'function', 'handler', 'lock', 'memory', 'resource', 'scope' and 'value'. |
| taxa | a list, each one reportingDescriptorReference; from 0 to any entries; left out means | no | An array of references to rule or taxonomy reporting descriptors that are applicable to the thread flow location. |
| module | text | no | The name of the module that contains the code that is executing. |
| state | a group of fields | no | A dictionary, each of whose keys specifies a variable or expression, the associated value of which represents the variable or expression value. For an annotation of kind 'continuation', for example, this dictionary might hold the current assumed values of a set of global variables. |
| state.any name you choose | multiformatMessageString | no |  |
| nestingLevel | a whole number; from 0 to any | no | An integer representing a containment hierarchy within the thread flow. |
| executionOrder | a whole number; from -1 to any; left out means -1 | no | An integer representing the temporal order in which execution reached this location. |
| executionTimeUtc | a date and time | no | The Coordinated Universal Time (UTC) date and time at which this location was executed. |
| importance | one of: important, essential, unimportant | no | Specifies the importance of this location in understanding the code flow in which it occurs. The order from most to least important is "essential", "important", "unimportant". Default: "important". |
| webRequest | webRequest | no | A web request associated with this thread flow location. |
| webResponse | webResponse | no | A web response associated with this thread flow location. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the threadflow location. |

### toolComponentReference

Identifies a particular toolComponent object, either the driver or an extension.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| name | text | no | The 'name' property of the referenced toolComponent. |
| index | a whole number; from -1 to any; left out means -1 | no | An index into the referenced toolComponent in tool.extensions. |
| guid | text; in an exact set format | no | The 'guid' property of the referenced toolComponent. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the toolComponentReference. |

### artifact

A single artifact. In some cases, this artifact might be nested within another artifact.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| description | message | no | A short description of the artifact. |
| location | artifactLocation | no | The location of the artifact. |
| parentIndex | a whole number; from -1 to any; left out means -1 | no | Identifies the index of the immediate parent of the artifact, if this artifact is nested. |
| offset | a whole number; from 0 to any | no | The offset in bytes of the artifact within its containing artifact. |
| length | a whole number; from -1 to any; left out means -1 | no | The length of the artifact in bytes. |
| roles | a list, each one one of these; from 0 to any entries; left out means | no | The role or roles played by the artifact in the analysis. |
| mimeType | text; in an exact set format | no | The MIME type (RFC 2045) of the artifact. |
| contents | artifactContent | no | The contents of the artifact. |
| encoding | text | no | Specifies the encoding for an artifact object that refers to a text file. |
| sourceLanguage | text | no | Specifies the source language for any artifact object that refers to a text file that contains source code. |
| hashes | a group of fields | no | A dictionary, each of whose keys is the name of a hash function and each of whose values is the hashed value of the artifact produced by the specified hash function. |
| hashes.any name you choose | text | no |  |
| lastModifiedTimeUtc | a date and time | no | The Coordinated Universal Time (UTC) date and time at which the artifact was most recently modified. See "Date/time properties" in the SARIF spec for the required format. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the artifact. |

### configurationOverride

Information about how a specific rule or notification was reconfigured at runtime.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| configuration | reportingConfiguration | yes, always | Specifies how the rule or notification was configured during the scan. |
| descriptor | reportingDescriptorReference | yes, always | A reference used to locate the descriptor whose configuration was overridden. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the configuration override. |

### conversion

Describes how a converter transformed the output of a static analysis tool from the analysis tool's native output format into the SARIF format.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| tool | tool | yes, always | A tool object that describes the converter. |
| invocation | invocation | no | An invocation object that describes the invocation of the converter. |
| analysisToolLogFiles | a list, each one artifactLocation; from 0 to any entries; left out means | no | The locations of the analysis tool's per-run log files. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the conversion. |

### exception

Describes a runtime exception encountered during the execution of an analysis tool.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| kind | text | no | A string that identifies the kind of exception, for example, the fully qualified type name of an object that was thrown, or the symbolic name of a signal. |
| message | text | no | A message that describes the exception. |
| stack | stack | no | The sequence of function calls leading to the exception. |
| innerExceptions | a list, each one exception; from 0 to any entries; left out means | no | An array of exception objects each of which is considered a cause of this exception. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the exception. |

### node

Represents a node in a graph.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| id | text | yes, always | A string that uniquely identifies the node within its graph. |
| label | message | no | A short description of the node. |
| location | location | no | A code location associated with the node. |
| children | a list, each one node; from 0 to any entries; left out means | no | Array of child nodes. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the node. |

### notification

Describes a condition relevant to the tool itself, as opposed to being relevant to a target being analyzed by the tool.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| locations | a list, each one location; from 0 to any entries; left out means | no | The locations relevant to this notification. |
| message | message | yes, always | A message that describes the condition that was encountered. |
| level | one of: none, note, warning, error | no | A value specifying the severity level of the notification. |
| threadId | a whole number | no | The thread identifier of the code that generated the notification. |
| timeUtc | a date and time | no | The Coordinated Universal Time (UTC) date and time at which the analysis tool generated the notification. |
| exception | exception | no | The runtime exception, if any, relevant to this notification. |
| descriptor | reportingDescriptorReference | no | A reference used to locate the descriptor relevant to this notification. |
| associatedRule | reportingDescriptorReference | no | A reference used to locate the rule descriptor associated with this notification. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the notification. |

### physicalLocation

A physical location relevant to a result. Specifies a reference to a programming artifact together with a range of bytes or characters within that artifact.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| address | address | no | The address of the location. |
| artifactLocation | artifactLocation | no | The location of the artifact. |
| region | region | no | Specifies a portion of the artifact. |
| contextRegion | region | no | Specifies a portion of the artifact that encloses the region. Allows a viewer to display additional context around the region. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the physical location. |

### reportingConfiguration

Information about a rule or notification that can be configured at runtime.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| enabled | yes or no; left out means yes | no | Specifies whether the report may be produced during the scan. |
| level | one of: none, note, warning, error | no | Specifies the failure level for the report. |
| rank | a number; from -1 to 100; left out means -1 | no | Specifies the relative priority of the report. Used for analysis output only. |
| parameters | propertyBag | no | Contains configuration information specific to a report. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the reporting configuration. |

### result

A result produced by an analysis tool.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| ruleId | text | no | The stable, unique identifier of the rule, if any, to which this result is relevant. |
| ruleIndex | a whole number; from -1 to any; left out means -1 | no | The index within the tool component rules array of the rule object associated with this result. |
| rule | reportingDescriptorReference | no | A reference used to locate the rule descriptor relevant to this result. |
| kind | one of: notApplicable, pass, fail, review, open, informational | no | A value that categorizes results by evaluation state. |
| level | one of: none, note, warning, error | no | A value specifying the severity level of the result. |
| message | message | yes, always | A message that describes the result. The first sentence of the message only will be displayed when visible space is limited. |
| analysisTarget | artifactLocation | no | Identifies the artifact that the analysis tool was instructed to scan. This need not be the same as the artifact where the result actually occurred. |
| locations | a list, each one location; from 0 to any entries; left out means | no | The set of locations where the result was detected. Specify only one location unless the problem indicated by the result can only be corrected by making a change at every specified location. |
| guid | text; in an exact set format | no | A stable, unique identifier for the result in the form of a GUID. |
| correlationGuid | text; in an exact set format | no | A stable, unique identifier for the equivalence class of logically identical results to which this result belongs, in the form of a GUID. |
| occurrenceCount | a whole number; from 1 to any | no | A positive integer specifying the number of times this logically unique result was observed in this run. |
| partialFingerprints | a group of fields | no | A set of strings that contribute to the stable, unique identity of the result. |
| partialFingerprints.any name you choose | text | no |  |
| fingerprints | a group of fields | no | A set of strings each of which individually defines a stable, unique identity for the result. |
| fingerprints.any name you choose | text | no |  |
| stacks | a list, each one stack; from 0 to any entries; left out means | no | An array of 'stack' objects relevant to the result. |
| codeFlows | a list, each one codeFlow; from 0 to any entries; left out means | no | An array of 'codeFlow' objects relevant to the result. |
| graphs | a list, each one graph; from 0 to any entries; left out means | no | An array of zero or more unique graph objects associated with the result. |
| graphTraversals | a list, each one graphTraversal; from 0 to any entries; left out means | no | An array of one or more unique 'graphTraversal' objects. |
| relatedLocations | a list, each one location; from 0 to any entries; left out means | no | A set of locations relevant to this result. |
| suppressions | a list, each one suppression; from 0 to any entries | no | A set of suppressions relevant to this result. |
| baselineState | one of: new, unchanged, updated, absent | no | The state of a result relative to a baseline of a previous run. |
| rank | a number; from -1 to 100; left out means -1 | no | A number representing the priority or importance of the result. |
| attachments | a list, each one attachment; from 0 to any entries; left out means | no | A set of artifacts relevant to the result. |
| hostedViewerUri | a web address | no | An absolute URI at which the result can be viewed. |
| workItemUris | a list, each one a web address; from 0 to any entries | no | The URIs of the work items associated with this result. |
| provenance | resultProvenance | no | Information about how and when the result was detected. |
| fixes | a list, each one fix; from 0 to any entries; left out means | no | An array of 'fix' objects, each of which represents a proposed fix to the problem indicated by the result. |
| taxa | a list, each one reportingDescriptorReference; from 0 to any entries; left out means | no | An array of references to taxonomy reporting descriptors that are applicable to the result. |
| webRequest | webRequest | no | A web request associated with this result. |
| webResponse | webResponse | no | A web response associated with this result. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the result. |

### runAutomationDetails

Information that describes a run's identity and role within an engineering system process.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| description | message | no | A description of the identity and role played within the engineering system by this object's containing run object. |
| id | text | no | A hierarchical string that uniquely identifies this object's containing run object. |
| guid | text; in an exact set format | no | A stable, unique identifier for this object's containing run object in the form of a GUID. |
| correlationGuid | text; in an exact set format | no | A stable, unique identifier for the equivalence class of runs to which this object's containing run object belongs in the form of a GUID. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the run automation details. |

### tool

The analysis tool that was run.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| driver | toolComponent | yes, always | The analysis tool that was run. |
| extensions | a list, each one toolComponent; from 0 to any entries; left out means | no | Tool extensions that contributed to or reconfigured the analysis tool that was run. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the tool. |

### artifactChange

A change to a single artifact.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| artifactLocation | artifactLocation | yes, always | The location of the artifact to change. |
| replacements | a list, each one replacement; from 1 to any entries | yes, always | An array of replacement objects, each of which represents the replacement of a single region in a single artifact specified by 'artifactLocation'. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the change. |

### attachment

An artifact relevant to a result.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| description | message | no | A message describing the role played by the attachment. |
| artifactLocation | artifactLocation | yes, always | The location of the attachment. |
| regions | a list, each one region; from 0 to any entries; left out means | no | An array of regions of interest within the attachment. |
| rectangles | a list, each one rectangle; from 0 to any entries; left out means | no | An array of rectangles specifying areas of interest within the image. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the attachment. |

### codeFlow

A set of threadFlows which together describe a pattern of code execution relevant to detecting a result.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| message | message | no | A message relevant to the code flow. |
| threadFlows | a list, each one threadFlow; from 1 to any entries | yes, always | An array of one or more unique threadFlow objects, each of which describes the progress of a program through a thread of execution. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the code flow. |

### edge

Represents a directed edge in a graph.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| id | text | yes, always | A string that uniquely identifies the edge within its graph. |
| label | message | no | A short description of the edge. |
| sourceNodeId | text | yes, always | Identifies the source node (the node at which the edge starts). |
| targetNodeId | text | yes, always | Identifies the target node (the node at which the edge ends). |
| properties | propertyBag | no | Key/value pairs that provide additional information about the edge. |

### edgeTraversal

Represents the traversal of a single edge during a graph traversal.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| edgeId | text | yes, always | Identifies the edge being traversed. |
| message | message | no | A message to display to the user as the edge is traversed. |
| finalState | a group of fields | no | The values of relevant expressions after the edge has been traversed. |
| finalState.any name you choose | multiformatMessageString | no |  |
| stepOverEdgeCount | a whole number; from 0 to any | no | The number of edge traversals necessary to return from a nested graph. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the edge traversal. |

### externalProperties

The top-level element of an external property file.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schema | a web address | no | The URI of the JSON schema corresponding to the version of the external property file format. |
| version | one of: 2.1.0 | no | The SARIF format version of this external properties object. |
| guid | text; in an exact set format | no | A stable, unique identifier for this external properties object, in the form of a GUID. |
| runGuid | text; in an exact set format | no | A stable, unique identifier for the run associated with this external properties object, in the form of a GUID. |
| conversion | conversion | no | A conversion object that will be merged with a separate run. |
| graphs | a list, each one graph; from 0 to any entries; left out means | no | An array of graph objects that will be merged with a separate run. |
| externalizedProperties | propertyBag | no | Key/value pairs that provide additional information that will be merged with a separate run. |
| artifacts | a list, each one artifact; from 0 to any entries | no | An array of artifact objects that will be merged with a separate run. |
| invocations | a list, each one invocation; from 0 to any entries; left out means | no | Describes the invocation of the analysis tool that will be merged with a separate run. |
| logicalLocations | a list, each one logicalLocation; from 0 to any entries; left out means | no | An array of logical locations such as namespaces, types or functions that will be merged with a separate run. |
| threadFlowLocations | a list, each one threadFlowLocation; from 0 to any entries; left out means | no | An array of threadFlowLocation objects that will be merged with a separate run. |
| results | a list, each one result; from 0 to any entries; left out means | no | An array of result objects that will be merged with a separate run. |
| taxonomies | a list, each one toolComponent; from 0 to any entries; left out means | no | Tool taxonomies that will be merged with a separate run. |
| driver | toolComponent | no | The analysis tool object that will be merged with a separate run. |
| extensions | a list, each one toolComponent; from 0 to any entries; left out means | no | Tool extensions that will be merged with a separate run. |
| policies | a list, each one toolComponent; from 0 to any entries; left out means | no | Tool policies that will be merged with a separate run. |
| translations | a list, each one toolComponent; from 0 to any entries; left out means | no | Tool translations that will be merged with a separate run. |
| addresses | a list, each one address; from 0 to any entries; left out means | no | Addresses that will be merged with a separate run. |
| webRequests | a list, each one webRequest; from 0 to any entries; left out means | no | Requests that will be merged with a separate run. |
| webResponses | a list, each one webResponse; from 0 to any entries; left out means | no | Responses that will be merged with a separate run. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the external properties. |

### externalPropertyFileReferences

References to external property files that should be inlined with the content of a root log file.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| conversion | externalPropertyFileReference | no | An external property file containing a run.conversion object to be merged with the root log file. |
| graphs | a list, each one externalPropertyFileReference; from 0 to any entries; left out means | no | An array of external property files containing a run.graphs object to be merged with the root log file. |
| externalizedProperties | externalPropertyFileReference | no | An external property file containing a run.properties object to be merged with the root log file. |
| artifacts | a list, each one externalPropertyFileReference; from 0 to any entries; left out means | no | An array of external property files containing run.artifacts arrays to be merged with the root log file. |
| invocations | a list, each one externalPropertyFileReference; from 0 to any entries; left out means | no | An array of external property files containing run.invocations arrays to be merged with the root log file. |
| logicalLocations | a list, each one externalPropertyFileReference; from 0 to any entries; left out means | no | An array of external property files containing run.logicalLocations arrays to be merged with the root log file. |
| threadFlowLocations | a list, each one externalPropertyFileReference; from 0 to any entries; left out means | no | An array of external property files containing run.threadFlowLocations arrays to be merged with the root log file. |
| results | a list, each one externalPropertyFileReference; from 0 to any entries; left out means | no | An array of external property files containing run.results arrays to be merged with the root log file. |
| taxonomies | a list, each one externalPropertyFileReference; from 0 to any entries; left out means | no | An array of external property files containing run.taxonomies arrays to be merged with the root log file. |
| addresses | a list, each one externalPropertyFileReference; from 0 to any entries; left out means | no | An array of external property files containing run.addresses arrays to be merged with the root log file. |
| driver | externalPropertyFileReference | no | An external property file containing a run.driver object to be merged with the root log file. |
| extensions | a list, each one externalPropertyFileReference; from 0 to any entries; left out means | no | An array of external property files containing run.extensions arrays to be merged with the root log file. |
| policies | a list, each one externalPropertyFileReference; from 0 to any entries; left out means | no | An array of external property files containing run.policies arrays to be merged with the root log file. |
| translations | a list, each one externalPropertyFileReference; from 0 to any entries; left out means | no | An array of external property files containing run.translations arrays to be merged with the root log file. |
| webRequests | a list, each one externalPropertyFileReference; from 0 to any entries; left out means | no | An array of external property files containing run.requests arrays to be merged with the root log file. |
| webResponses | a list, each one externalPropertyFileReference; from 0 to any entries; left out means | no | An array of external property files containing run.responses arrays to be merged with the root log file. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the external property files. |

### fix

A proposed fix for the problem represented by a result object. A fix specifies a set of artifacts to modify. For each artifact, it specifies a set of bytes to remove, and provides a set of new bytes to replace them.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| description | message | no | A message that describes the proposed fix, enabling viewers to present the proposed change to an end user. |
| artifactChanges | a list, each one artifactChange; from 1 to any entries | yes, always | One or more artifact changes that comprise a fix for a result. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the fix. |

### graphTraversal

Represents a path through a graph.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| runGraphIndex | a whole number; from -1 to any; left out means -1 | no | The index within the run.graphs to be associated with the result. |
| resultGraphIndex | a whole number; from -1 to any; left out means -1 | no | The index within the result.graphs to be associated with the result. |
| description | message | no | A description of this graph traversal. |
| initialState | a group of fields | no | Values of relevant expressions at the start of the graph traversal that may change during graph traversal. |
| initialState.any name you choose | multiformatMessageString | no |  |
| immutableState | a group of fields | no | Values of relevant expressions at the start of the graph traversal that remain constant for the graph traversal. |
| immutableState.any name you choose | multiformatMessageString | no |  |
| edgeTraversals | a list, each one edgeTraversal; from 0 to any entries; left out means | no | The sequences of edges traversed by this graph traversal. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the graph traversal. |

### locationRelationship

Information about the relation of one location to another.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| target | a whole number; from 0 to any | yes, always | A reference to the related location. |
| kinds | a list, each one text; left out means relevant | no | A set of distinct strings that categorize the relationship. Well-known kinds include 'includes', 'isIncludedBy' and 'relevant'. |
| description | message | no | A description of the location relationship. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the location relationship. |

### rectangle

An area within an image.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| top | a number | no | The Y coordinate of the top edge of the rectangle, measured in the image's natural units. |
| left | a number | no | The X coordinate of the left edge of the rectangle, measured in the image's natural units. |
| bottom | a number | no | The Y coordinate of the bottom edge of the rectangle, measured in the image's natural units. |
| right | a number | no | The X coordinate of the right edge of the rectangle, measured in the image's natural units. |
| message | message | no | A message relevant to the rectangle. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the rectangle. |

### replacement

The replacement of a single region of an artifact.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| deletedRegion | region | yes, always | The region of the artifact to delete. |
| insertedContent | artifactContent | no | The content to insert at the location specified by the 'deletedRegion' property. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the replacement. |

### reportingDescriptorRelationship

Information about the relation of one reporting descriptor to another.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| target | reportingDescriptorReference | yes, always | A reference to the related reporting descriptor. |
| kinds | a list, each one text; left out means relevant | no | A set of distinct strings that categorize the relationship. Well-known kinds include 'canPrecede', 'canFollow', 'willPrecede', 'willFollow', 'superset', 'subset', 'equal', 'disjoint', 'relevant', and 'incomparable'. |
| description | message | no | A description of the reporting descriptor relationship. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the reporting descriptor reference. |

### resultProvenance

Contains information about how and when a result was detected.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| firstDetectionTimeUtc | a date and time | no | The Coordinated Universal Time (UTC) date and time at which the result was first detected. See "Date/time properties" in the SARIF spec for the required format. |
| lastDetectionTimeUtc | a date and time | no | The Coordinated Universal Time (UTC) date and time at which the result was most recently detected. See "Date/time properties" in the SARIF spec for the required format. |
| firstDetectionRunGuid | text; in an exact set format | no | A GUID-valued string equal to the automationDetails.guid property of the run in which the result was first detected. |
| lastDetectionRunGuid | text; in an exact set format | no | A GUID-valued string equal to the automationDetails.guid property of the run in which the result was most recently detected. |
| invocationIndex | a whole number; from -1 to any; left out means -1 | no | The index within the run.invocations array of the invocation object which describes the tool invocation that detected the result. |
| conversionSources | a list, each one physicalLocation; from 0 to any entries; left out means | no | An array of physicalLocation objects which specify the portions of an analysis tool's output that a converter transformed into the result. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the result. |

### run

Describes a single run of an analysis tool, and contains the reported output of that run.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| tool | tool | yes, always | Information about the tool or tool pipeline that generated the results in this run. A run can only contain results produced by a single tool or tool pipeline. A run can aggregate results from multiple log files, as long as context around the tool run (tool command-line arguments and the like) is identical for all aggregated files. |
| invocations | a list, each one invocation; from 0 to any entries; left out means | no | Describes the invocation of the analysis tool. |
| conversion | conversion | no | A conversion object that describes how a converter transformed an analysis tool's native reporting format into the SARIF format. |
| language | text; in an exact set format; left out means en-US | no | The language of the messages emitted into the log file during this run (expressed as an ISO 639-1 two-letter lowercase culture code) and an optional region (expressed as an ISO 3166-1 two-letter uppercase subculture code associated with a country or region). The casing is recommended but not required (in order for this data to conform to RFC5646). |
| versionControlProvenance | a list, each one versionControlDetails; from 0 to any entries; left out means | no | Specifies the revision in version control of the artifacts that were scanned. |
| originalUriBaseIds | a group of fields | no | The artifact location specified by each uriBaseId symbol on the machine where the tool originally ran. |
| originalUriBaseIds.any name you choose | artifactLocation | no |  |
| artifacts | a list, each one artifact; from 0 to any entries | no | An array of artifact objects relevant to the run. |
| logicalLocations | a list, each one logicalLocation; from 0 to any entries; left out means | no | An array of logical locations such as namespaces, types or functions. |
| graphs | a list, each one graph; from 0 to any entries; left out means | no | An array of zero or more unique graph objects associated with the run. |
| results | a list, each one result; from 0 to any entries | no | The set of results contained in an SARIF log. The results array can be omitted when a run is solely exporting rules metadata. It must be present (but may be empty) if a log file represents an actual scan. |
| automationDetails | runAutomationDetails | no | Automation details that describe this run. |
| runAggregates | a list, each one runAutomationDetails; from 0 to any entries; left out means | no | Automation details that describe the aggregate of runs to which this run belongs. |
| baselineGuid | text; in an exact set format | no | The 'guid' property of a previous SARIF 'run' that comprises the baseline that was used to compute result 'baselineState' properties for the run. |
| redactionTokens | a list, each one text; from 0 to any entries; left out means | no | An array of strings used to replace sensitive information in a redaction-aware property. |
| defaultEncoding | text | no | Specifies the default encoding for any artifact object that refers to a text file. |
| defaultSourceLanguage | text | no | Specifies the default source language for any artifact object that refers to a text file that contains source code. |
| newlineSequences | a list, each one text; from 1 to any entries; left out means  , | no | An ordered list of character sequences that were treated as line breaks when computing region information for the run. |
| columnKind | one of: utf16CodeUnits, unicodeCodePoints | no | Specifies the unit in which the tool measures columns. |
| externalPropertyFileReferences | externalPropertyFileReferences | no | References to external property files that should be inlined with the content of a root log file. |
| threadFlowLocations | a list, each one threadFlowLocation; from 0 to any entries; left out means | no | An array of threadFlowLocation objects cached at run level. |
| taxonomies | a list, each one toolComponent; from 0 to any entries; left out means | no | An array of toolComponent objects relevant to a taxonomy in which results are categorized. |
| addresses | a list, each one address; from 0 to any entries; left out means | no | Addresses associated with this run instance, if any. |
| translations | a list, each one toolComponent; from 0 to any entries; left out means | no | The set of available translations of the localized data provided by the tool. |
| policies | a list, each one toolComponent; from 0 to any entries; left out means | no | Contains configurations that may potentially override both reportingDescriptor.defaultConfiguration (the tool's default severities) and invocation.configurationOverrides (severities established at run-time from the command line). |
| webRequests | a list, each one webRequest; from 0 to any entries; left out means | no | An array of request objects cached at run level. |
| webResponses | a list, each one webResponse; from 0 to any entries; left out means | no | An array of response objects cached at run level. |
| specialLocations | specialLocations | no | A specialLocations object that defines locations of special significance to SARIF consumers. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the run. |

### specialLocations

Defines locations of special significance to SARIF consumers.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| displayBase | artifactLocation | no | Provides a suggestion to SARIF consumers to display file paths relative to the specified location. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the special locations. |

### stackFrame

A function call within a stack trace.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| location | location | no | The location to which this stack frame refers. |
| module | text | no | The name of the module that contains the code of this stack frame. |
| threadId | a whole number | no | The thread identifier of the stack frame. |
| parameters | a list, each one text; from 0 to any entries; left out means | no | The parameters of the call that is executing. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the stack frame. |

### suppression

A suppression that is relevant to a result.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| guid | text; in an exact set format | no | A stable, unique identifier for the suppression in the form of a GUID. |
| kind | one of: inSource, external | yes, always | A string that indicates where the suppression is persisted. |
| status | one of: accepted, underReview, rejected | no | A string that indicates the review status of the suppression. |
| justification | text | no | A string representing the justification for the suppression. |
| location | location | no | Identifies the location associated with the suppression. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the suppression. |

### threadFlow

Describes a sequence of code locations that specify a path through a single thread of execution such as an operating system or fiber.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| id | text | no | An string that uniquely identifies the threadFlow within the codeFlow in which it occurs. |
| message | message | no | A message relevant to the thread flow. |
| initialState | a group of fields | no | Values of relevant expressions at the start of the thread flow that may change during thread flow execution. |
| initialState.any name you choose | multiformatMessageString | no |  |
| immutableState | a group of fields | no | Values of relevant expressions at the start of the thread flow that remain constant. |
| immutableState.any name you choose | multiformatMessageString | no |  |
| locations | a list, each one threadFlowLocation; from 1 to any entries | yes, always | A temporally ordered array of 'threadFlowLocation' objects, each of which describes a location visited by the tool while producing the result. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the thread flow. |

### translationMetadata

Provides additional metadata related to translation.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| name | text | yes, always | The name associated with the translation metadata. |
| fullName | text | no | The full name associated with the translation metadata. |
| shortDescription | multiformatMessageString | no | A brief description of the translation metadata. |
| fullDescription | multiformatMessageString | no | A comprehensive description of the translation metadata. |
| downloadUri | a web address | no | The absolute URI from which the translation metadata can be downloaded. |
| informationUri | a web address | no | The absolute URI from which information related to the translation metadata can be downloaded. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the translation metadata. |

### versionControlDetails

Specifies the information necessary to retrieve a desired revision from a version control system.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| repositoryUri | a web address | yes, always | The absolute URI of the repository. |
| revisionId | text | no | A string that uniquely and permanently identifies the revision within the repository. |
| branch | text | no | The name of a branch containing the revision. |
| revisionTag | text | no | A tag that has been applied to the revision. |
| asOfTimeUtc | a date and time | no | A Coordinated Universal Time (UTC) date and time that can be used to synchronize an enlistment to the state of the repository at that time. |
| mappedTo | artifactLocation | no | The location in the local file system to which the root of the repository was mapped at the time of the analysis. |
| properties | propertyBag | no | Key/value pairs that provide additional information about the version control details. |
