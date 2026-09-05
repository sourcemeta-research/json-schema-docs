# AsyncAPI 2.6.0 schema.

!!Auto generated!! 
 Do not manually edit. 

## What this file holds

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| asyncapi | one of: 2.6.0 | yes, always | The AsyncAPI specification version of this document. |
| id | a web address | no | A unique id representing the application. |
| info | rules kept in another file, http://asyncapi.com/definitions/2.6.0/info.json | yes, always |  |
| servers | rules kept in another file, http://asyncapi.com/definitions/2.6.0/servers.json | no |  |
| defaultContentType | text | no |  |
| channels | rules kept in another file, http://asyncapi.com/definitions/2.6.0/channels.json | yes, always |  |
| components | rules kept in another file, http://asyncapi.com/definitions/2.6.0/components.json | no |  |
| tags | a list, each one follows rules kept in another file | no |  |
| externalDocs | rules kept in another file, http://asyncapi.com/definitions/2.6.0/externalDocs.json | no |  |
| any name in a set format | rules kept in another file, http://asyncapi.com/definitions/2.6.0/specificationExtension.json | no |  |

## All 73 shapes

Most used first, because everything else is built on them.

- **http://json-schema.org/draft-07/schema** (used 14)
- **name** (used 13)
- **http://asyncapi.com/definitions/2.6.0/openapiSchema_3_0.json** (used 7)
- **Reference** (used 7)
- **namespace** (used 5)
- **nonNegativeInteger** (used 4)
- **schemaArray** (used 4)
- **types** (used 4)
- **nonNegativeIntegerDefault0** (used 3)
- **primitiveType** (used 3)
- **stringArray** (used 2)
- **simpleTypes** (used 2)
- **avroSchema** (used 2)
- **Discriminator** (used 1)
- **ExternalDocumentation** (used 1)
- **XML** (used 1)
- **primitiveTypeWithMetadata** (used 1)
- **customTypeReference** (used 1)
- **avroRecord** (used 1)
- **avroEnum** (used 1)
- **avroArray** (used 1)
- **avroMap** (used 1)
- **avroFixed** (used 1)
- **avroUnion** (used 1)
- **avroField** (used 1)
- **specificationExtension.json**
- **info.json**
- **contact.json**
- **license.json**
- **servers.json**
- **Reference.json**
- **ReferenceObject.json**
- **server.json**
- **serverVariables.json**
- **serverVariable.json**
- **SecurityRequirement.json**
- **bindingsObject.json**
- **tag.json**
- **externalDocs.json**
- **channels.json**
- **channelItem.json**
- **parameters.json**
- **parameter.json**
- **schema.json**
- **schema**
- **operation.json**
- **operationTrait.json**
- **message.json**
- **correlationId.json**
- **messageTrait.json**
- **openapiSchema_3_0.json**
- **avroSchema_v1.json**
- **components.json**
- **schemas.json**
- **messages.json**
- **SecurityScheme.json**
- **userPassword.json**
- **apiKey.json**
- **X509.json**
- **symmetricEncryption.json**
- **asymmetricEncryption.json**
- **HTTPSecurityScheme.json**
- **NonBearerHTTPSecurityScheme.json**
- **BearerHTTPSecurityScheme.json**
- **APIKeyHTTPSecurityScheme.json**
- **oauth2Flows.json**
- **oauth2Flow.json**
- **oauth2Scopes.json**
- **openIdConnect.json**
- **SaslSecurityScheme.json**
- **SaslPlainSecurityScheme.json**
- **SaslScramSecurityScheme.json**
- **SaslGssapiSecurityScheme.json**

### http://json-schema.org/draft-07/schema

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| $id | a web address | no |  |
| $schema | a web address | no |  |
| $ref | a web address | no |  |
| $comment | text | no |  |
| title | text | no |  |
| description | text | no |  |
| default | anything | no |  |
| readOnly | yes or no; left out means no | no |  |
| writeOnly | yes or no; left out means no | no |  |
| examples | a list, each one anything | no |  |
| multipleOf | a number | no |  |
| maximum | a number | no |  |
| exclusiveMaximum | a number | no |  |
| minimum | a number | no |  |
| exclusiveMinimum | a number | no |  |
| maxLength | nonNegativeInteger | no |  |
| minLength | nonNegativeIntegerDefault0 | no |  |
| pattern | a search pattern | no |  |
| additionalItems | http://json-schema.org/draft-07/schema | no |  |
| items | either http://json-schema.org/draft-07/schema or schemaArray; left out means yes | no |  |
| maxItems | nonNegativeInteger | no |  |
| minItems | nonNegativeIntegerDefault0 | no |  |
| uniqueItems | yes or no; left out means no | no |  |
| contains | http://json-schema.org/draft-07/schema | no |  |
| maxProperties | nonNegativeInteger | no |  |
| minProperties | nonNegativeIntegerDefault0 | no |  |
| required | stringArray, itself a list | no |  |
| additionalProperties | http://json-schema.org/draft-07/schema | no |  |
| definitions | a group of fields; left out means a group of details | no |  |
| definitions.any name you choose | http://json-schema.org/draft-07/schema | no |  |
| properties | a group of fields; left out means a group of details | no |  |
| properties.any name you choose | http://json-schema.org/draft-07/schema | no |  |
| patternProperties | a group of fields; left out means a group of details | no |  |
| patternProperties.any name you choose | http://json-schema.org/draft-07/schema | no |  |
| dependencies | a group of fields | no |  |
| dependencies.any name you choose | either http://json-schema.org/draft-07/schema or stringArray | no |  |
| propertyNames | http://json-schema.org/draft-07/schema | no |  |
| const | anything | no |  |
| enum | a list, each one anything; from 1 to any entries | no |  |
| type | one of 2 forms: simpleTypes; a list | no |  |
| format | text | no |  |
| contentMediaType | text | no |  |
| contentEncoding | text | no |  |
| if | http://json-schema.org/draft-07/schema | no |  |
| then | http://json-schema.org/draft-07/schema | no |  |
| else | http://json-schema.org/draft-07/schema | no |  |
| allOf | schemaArray, itself a list | no |  |
| anyOf | schemaArray, itself a list | no |  |
| oneOf | schemaArray, itself a list | no |  |
| not | http://json-schema.org/draft-07/schema | no |  |

### name

A single value.

### http://asyncapi.com/definitions/2.6.0/openapiSchema_3_0.json

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| title | text | no |  |
| multipleOf | a number | no |  |
| maximum | a number | no |  |
| exclusiveMaximum | yes or no; left out means no | no |  |
| minimum | a number | no |  |
| exclusiveMinimum | yes or no; left out means no | no |  |
| maxLength | a whole number; from 0 to any | no |  |
| minLength | a whole number; from 0 to any; left out means 0 | no |  |
| pattern | a search pattern | no |  |
| maxItems | a whole number; from 0 to any | no |  |
| minItems | a whole number; from 0 to any; left out means 0 | no |  |
| uniqueItems | yes or no; left out means no | no |  |
| maxProperties | a whole number; from 0 to any | no |  |
| minProperties | a whole number; from 0 to any; left out means 0 | no |  |
| required | a list, each one text; from 1 to any entries | no |  |
| enum | a list, each one anything; from 1 to any entries | no |  |
| type | one of: array, boolean, integer, number, object, string | no |  |
| not | either http://asyncapi.com/definitions/2.6.0/openapiSchema_3_0.json or Reference | no |  |
| allOf | a list, each entry either http://asyncapi.com/definitions/2.6.0/openapiSchema_3_0.json or Reference | no |  |
| oneOf | a list, each entry either http://asyncapi.com/definitions/2.6.0/openapiSchema_3_0.json or Reference | no |  |
| anyOf | a list, each entry either http://asyncapi.com/definitions/2.6.0/openapiSchema_3_0.json or Reference | no |  |
| items | either http://asyncapi.com/definitions/2.6.0/openapiSchema_3_0.json or Reference | no |  |
| properties | a group of fields | no |  |
| properties.any name you choose | either http://asyncapi.com/definitions/2.6.0/openapiSchema_3_0.json or Reference | no |  |
| additionalProperties | one of 3 forms: http://asyncapi.com/definitions/2.6.0/openapiSchema_3_0.json; Reference; yes or no; left out means yes | no |  |
| description | text | no |  |
| format | text | no |  |
| default | anything | no |  |
| nullable | yes or no; left out means no | no |  |
| discriminator | Discriminator | no |  |
| readOnly | yes or no; left out means no | no |  |
| writeOnly | yes or no; left out means no | no |  |
| example | anything | no |  |
| externalDocs | ExternalDocumentation | no |  |
| deprecated | yes or no; left out means no | no |  |
| xml | XML | no |  |
| any name in a set format | anything | no |  |

### Reference

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format | a web address | no |  |

### namespace

A single value.

### nonNegativeInteger

A single value.

### schemaArray

This one is a list. The fields below describe a single entry.

A single value.

### types

Allowed Avro types

A single value.

### nonNegativeIntegerDefault0

A single value.

### primitiveType

Basic type primitives.

A single value.

### stringArray

This one is a list. The fields below describe a single entry.

A single value.

### simpleTypes

A single value.

### avroSchema

Root Schema

A single value.

### Discriminator

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| propertyName | text | yes, always |  |
| mapping | a group of fields | no |  |
| mapping.any name you choose | text | no |  |

### ExternalDocumentation

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| description | text | no |  |
| url | a web address | yes, always |  |
| any name in a set format | anything | no |  |

### XML

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| name | text | no |  |
| namespace | a web address | no |  |
| prefix | text | no |  |
| attribute | yes or no; left out means no | no |  |
| wrapped | yes or no; left out means no | no |  |
| any name in a set format | anything | no |  |

### primitiveTypeWithMetadata

A primitive type with metadata attached.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| type | primitiveType | yes, always |  |

### customTypeReference

Reference to a ComplexType

A single value.

### avroRecord

A Record

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| type | one of: record | yes, always |  |
| name | name | yes, always |  |
| namespace | namespace | no |  |
| doc | text | no |  |
| aliases | a list, each one name | no |  |
| fields | a list, each one avroField | yes, always |  |

### avroEnum

An enumeration

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| type | one of: enum | yes, always |  |
| name | name | yes, always |  |
| namespace | namespace | no |  |
| doc | text | no |  |
| aliases | a list, each one name | no |  |
| symbols | a list, each one name | yes, always |  |

### avroArray

An array

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| type | one of: array | yes, always |  |
| name | name | no |  |
| namespace | namespace | no |  |
| doc | text | no |  |
| aliases | a list, each one name | no |  |
| items | types | yes, always |  |

### avroMap

A map of values

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| type | one of: map | yes, always |  |
| name | name | no |  |
| namespace | namespace | no |  |
| doc | text | no |  |
| aliases | a list, each one name | no |  |
| values | types | yes, always |  |

### avroFixed

A fixed sized array of bytes

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| type | one of: fixed | yes, always |  |
| name | name | yes, always |  |
| namespace | namespace | no |  |
| doc | text | no |  |
| aliases | a list, each one name | no |  |
| size | a number | yes, always |  |

### avroUnion

A Union of types

This one is a list. The fields below describe a single entry.

A single value.

### avroField

A field within a Record

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| name | name | yes, always |  |
| type | types | yes, always |  |
| doc | text | no |  |
| default | anything | no |  |
| order | one of: ascending, descending, ignore | no |  |
| aliases | a list, each one name | no |  |

### specificationExtension.json

Any property starting with x- is valid.

A single value.

### info.json

The object provides metadata about the API. The metadata can be used by the clients if needed.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| title | text | yes, always | A unique and precise title of the API. |
| version | text | yes, always | A semantic version number of the API. |
| description | text | no | A longer description of the API. Should be different from the title. CommonMark is allowed. |
| termsOfService | a web address | no | A URL to the Terms of Service for the API. MUST be in the format of a URL. |
| contact | rules kept in another file, http://asyncapi.com/definitions/2.6.0/contact.json | no |  |
| license | rules kept in another file, http://asyncapi.com/definitions/2.6.0/license.json | no |  |
| any name in a set format | rules kept in another file, http://asyncapi.com/definitions/2.6.0/specificationExtension.json | no |  |

### contact.json

Contact information for the exposed API.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| name | text | no | The identifying name of the contact person/organization. |
| url | a web address | no | The URL pointing to the contact information. |
| email | an email address | no | The email address of the contact person/organization. |
| any name in a set format | rules kept in another file, http://asyncapi.com/definitions/2.6.0/specificationExtension.json | no |  |

### license.json

License information for the exposed API.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| name | text | yes, always | The name of the license type. It's encouraged to use an OSI compatible license. |
| url | a web address | no | The URL pointing to the license. |
| any name in a set format | rules kept in another file, http://asyncapi.com/definitions/2.6.0/specificationExtension.json | no |  |

### servers.json

The Servers Object is a map of Server Objects.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name you choose | one of 2 forms: follows rules kept in another file; follows rules kept in another file | no |  |

### Reference.json

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| $ref | rules kept in another file, http://asyncapi.com/definitions/2.6.0/ReferenceObject.json | yes, always |  |

### ReferenceObject.json

A simple object to allow referencing other components in the specification, internally and externally.

A single value.

### server.json

An object representing a message broker, a server or any other kind of computer program capable of sending and/or receiving data

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| url | text | yes, always | A URL to the target host. This URL supports Server Variables and MAY be relative, to indicate that the host location is relative to the location where the AsyncAPI document is being served. |
| description | text | no | An optional string describing the host designated by the URL. CommonMark syntax MAY be used for rich text representation. |
| protocol | text | yes, always | The protocol this URL supports for connection. Supported protocol include, but are not limited to: amqp, amqps, http, https, ibmmq, jms, kafka, kafka-secure, anypointmq, mqtt, secure-mqtt, solace, stomp, stomps, ws, wss, mercure, googlepubsub. |
| protocolVersion | text | no | The version of the protocol used for connection. For instance: AMQP 0.9.1, HTTP 2.0, Kafka 1.0.0, etc. |
| variables | rules kept in another file, http://asyncapi.com/definitions/2.6.0/serverVariables.json | no | A map between a variable name and its value. The value is used for substitution in the server's URL template. |
| security | a list, each one follows rules kept in another file | no | A declaration of which security mechanisms can be used with this server. The list of values includes alternative security requirement objects that can be used. |
| bindings | rules kept in another file, http://asyncapi.com/definitions/2.6.0/bindingsObject.json | no | A map where the keys describe the name of the protocol and the values describe protocol-specific definitions for the server. |
| tags | a list, each one follows rules kept in another file | no | A list of tags for logical grouping and categorization of servers. |
| any name in a set format | rules kept in another file, http://asyncapi.com/definitions/2.6.0/specificationExtension.json | no |  |

### serverVariables.json

A map between a variable name and its value. The value is used for substitution in the server's URL template.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name you choose | one of 2 forms: follows rules kept in another file; follows rules kept in another file | no |  |

### serverVariable.json

An object representing a Server Variable for server URL template substitution.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| enum | a list, each one text | no | An enumeration of string values to be used if the substitution options are from a limited set. |
| default | text | no | The default value to use for substitution, and to send, if an alternate value is not supplied. |
| description | text | no | An optional description for the server variable. |
| examples | a list, each one text | no | An array of examples of the server variable. |
| any name in a set format | rules kept in another file, http://asyncapi.com/definitions/2.6.0/specificationExtension.json | no |  |

### SecurityRequirement.json

Lists of the required security schemes that can be used to execute an operation

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name you choose | a list, each one text | no |  |

### bindingsObject.json

Map describing protocol-specific definitions for a server.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| http | anything | no |  |
| ws | anything | no |  |
| amqp | anything | no |  |
| amqp1 | anything | no |  |
| mqtt | anything | no |  |
| mqtt5 | anything | no |  |
| kafka | anything | no |  |
| anypointmq | anything | no |  |
| nats | anything | no |  |
| jms | anything | no |  |
| sns | anything | no |  |
| sqs | anything | no |  |
| stomp | anything | no |  |
| redis | anything | no |  |
| ibmmq | anything | no |  |
| solace | anything | no |  |
| googlepubsub | anything | no |  |
| pulsar | anything | no |  |

### tag.json

Allows adding meta data to a single tag.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| name | text | yes, always | The name of the tag. |
| description | text | no | A short description for the tag. |
| externalDocs | rules kept in another file, http://asyncapi.com/definitions/2.6.0/externalDocs.json | no | Additional external documentation for this tag. |
| any name in a set format | rules kept in another file, http://asyncapi.com/definitions/2.6.0/specificationExtension.json | no |  |

### externalDocs.json

Allows referencing an external resource for extended documentation.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| description | text | no | A short description of the target documentation. |
| url | a web address | yes, always | The URL for the target documentation. This MUST be in the form of an absolute URL. |
| any name in a set format | rules kept in another file, http://asyncapi.com/definitions/2.6.0/specificationExtension.json | no |  |

### channels.json

Holds the relative paths to the individual channel and their operations. Channel paths are relative to servers.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name you choose | rules kept in another file, http://asyncapi.com/definitions/2.6.0/channelItem.json | no |  |

### channelItem.json

Describes the operations available on a single channel.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| $ref | rules kept in another file, http://asyncapi.com/definitions/2.6.0/ReferenceObject.json | no |  |
| parameters | rules kept in another file, http://asyncapi.com/definitions/2.6.0/parameters.json | no |  |
| description | text | no | A description of the channel. |
| servers | a list, each one text | no | The names of the servers on which this channel is available. If absent or empty then this channel must be available on all servers. |
| publish | rules kept in another file, http://asyncapi.com/definitions/2.6.0/operation.json | no |  |
| subscribe | rules kept in another file, http://asyncapi.com/definitions/2.6.0/operation.json | no |  |
| deprecated | yes or no; left out means no | no |  |
| bindings | rules kept in another file, http://asyncapi.com/definitions/2.6.0/bindingsObject.json | no |  |
| any name in a set format | rules kept in another file, http://asyncapi.com/definitions/2.6.0/specificationExtension.json | no |  |

### parameters.json

JSON objects describing reusable channel parameters.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name you choose | one of 2 forms: follows rules kept in another file; follows rules kept in another file | no |  |

### parameter.json

Describes a parameter included in a channel name.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| description | text | no | A brief description of the parameter. This could contain examples of use. GitHub Flavored Markdown is allowed. |
| schema | rules kept in another file, http://asyncapi.com/definitions/2.6.0/schema.json | no |  |
| location | text; in an exact set format | no | A runtime expression that specifies the location of the parameter value |
| any name in a set format | rules kept in another file, http://asyncapi.com/definitions/2.6.0/specificationExtension.json | no |  |

### schema.json

The Schema Object allows the definition of input and output data types. These types can be objects, but also primitives and arrays.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| additionalProperties *(borrowed)* | one of 2 forms: follows rules kept in another file; yes or no; left out means a group of details | no |  |
| items *(borrowed)* | one of 2 forms: follows rules kept in another file; a list; left out means a group of details | no |  |
| allOf *(borrowed)* | a list, each one follows rules kept in another file; from 1 to any entries | no |  |
| oneOf *(borrowed)* | a list, each one follows rules kept in another file; from 1 to any entries | no |  |
| anyOf *(borrowed)* | a list, each one follows rules kept in another file; from 1 to any entries | no |  |
| not *(borrowed)* | rules kept in another file, http://asyncapi.com/definitions/2.6.0/schema.json | no |  |
| properties *(borrowed)* | a group of fields; left out means a group of details | no |  |
| properties.any name you choose | rules kept in another file, http://asyncapi.com/definitions/2.6.0/schema.json | no |  |
| patternProperties *(borrowed)* | a group of fields; left out means a group of details | no |  |
| patternProperties.any name you choose | rules kept in another file, http://asyncapi.com/definitions/2.6.0/schema.json | no |  |
| propertyNames *(borrowed)* | rules kept in another file, http://asyncapi.com/definitions/2.6.0/schema.json | no |  |
| contains *(borrowed)* | rules kept in another file, http://asyncapi.com/definitions/2.6.0/schema.json | no |  |
| discriminator *(borrowed)* | text | no | Adds support for polymorphism. The discriminator is the schema property name that is used to differentiate between other schema that inherit this schema. |
| externalDocs *(borrowed)* | rules kept in another file, http://asyncapi.com/definitions/2.6.0/externalDocs.json | no | Additional external documentation for this schema. |
| deprecated *(borrowed)* | yes or no; left out means no | no | Specifies that a schema is deprecated and SHOULD be transitioned out of usage |
| any name in a set format *(borrowed)* | rules kept in another file, http://asyncapi.com/definitions/2.6.0/specificationExtension.json | no |  |

### schema

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| $id | a web address | no |  |
| $schema | a web address | no |  |
| $ref | a web address | no |  |
| $comment | text | no |  |
| title | text | no |  |
| description | text | no |  |
| default | anything | no |  |
| readOnly | yes or no; left out means no | no |  |
| writeOnly | yes or no; left out means no | no |  |
| examples | a list, each one anything | no |  |
| multipleOf | a number | no |  |
| maximum | a number | no |  |
| exclusiveMaximum | a number | no |  |
| minimum | a number | no |  |
| exclusiveMinimum | a number | no |  |
| maxLength | nonNegativeInteger | no |  |
| minLength | nonNegativeIntegerDefault0 | no |  |
| pattern | a search pattern | no |  |
| additionalItems | http://json-schema.org/draft-07/schema | no |  |
| items | either http://json-schema.org/draft-07/schema or schemaArray; left out means yes | no |  |
| maxItems | nonNegativeInteger | no |  |
| minItems | nonNegativeIntegerDefault0 | no |  |
| uniqueItems | yes or no; left out means no | no |  |
| contains | http://json-schema.org/draft-07/schema | no |  |
| maxProperties | nonNegativeInteger | no |  |
| minProperties | nonNegativeIntegerDefault0 | no |  |
| required | stringArray, itself a list | no |  |
| additionalProperties | http://json-schema.org/draft-07/schema | no |  |
| definitions | a group of fields; left out means a group of details | no |  |
| definitions.any name you choose | http://json-schema.org/draft-07/schema | no |  |
| properties | a group of fields; left out means a group of details | no |  |
| properties.any name you choose | http://json-schema.org/draft-07/schema | no |  |
| patternProperties | a group of fields; left out means a group of details | no |  |
| patternProperties.any name you choose | http://json-schema.org/draft-07/schema | no |  |
| dependencies | a group of fields | no |  |
| dependencies.any name you choose | either http://json-schema.org/draft-07/schema or stringArray | no |  |
| propertyNames | http://json-schema.org/draft-07/schema | no |  |
| const | anything | no |  |
| enum | a list, each one anything; from 1 to any entries | no |  |
| type | one of 2 forms: simpleTypes; a list | no |  |
| format | text | no |  |
| contentMediaType | text | no |  |
| contentEncoding | text | no |  |
| if | http://json-schema.org/draft-07/schema | no |  |
| then | http://json-schema.org/draft-07/schema | no |  |
| else | http://json-schema.org/draft-07/schema | no |  |
| allOf | schemaArray, itself a list | no |  |
| anyOf | schemaArray, itself a list | no |  |
| oneOf | schemaArray, itself a list | no |  |
| not | http://json-schema.org/draft-07/schema | no |  |

### operation.json

Describes a publish or a subscribe operation. This provides a place to document how and why messages are sent and received.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| traits | a list, each one one of 2 forms | no | A list of traits to apply to the operation object. |
| summary | text | no | A short summary of what the operation is about. |
| description | text | no | A verbose explanation of the operation. |
| security | a list, each one follows rules kept in another file | no | A declaration of which security mechanisms are associated with this operation. |
| tags | a list, each one follows rules kept in another file | no | A list of tags for logical grouping and categorization of operations. |
| externalDocs | rules kept in another file, http://asyncapi.com/definitions/2.6.0/externalDocs.json | no |  |
| operationId | text | no |  |
| bindings | rules kept in another file, http://asyncapi.com/definitions/2.6.0/bindingsObject.json | no |  |
| message | rules kept in another file, http://asyncapi.com/definitions/2.6.0/message.json | no |  |
| any name in a set format | rules kept in another file, http://asyncapi.com/definitions/2.6.0/specificationExtension.json | no |  |

### operationTrait.json

Describes a trait that MAY be applied to an Operation Object.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| summary | text | no | A short summary of what the operation is about. |
| description | text | no | A verbose explanation of the operation. |
| tags | a list, each one follows rules kept in another file | no | A list of tags for logical grouping and categorization of operations. |
| externalDocs | rules kept in another file, http://asyncapi.com/definitions/2.6.0/externalDocs.json | no |  |
| operationId | text | no | Unique string used to identify the operation. The id MUST be unique among all operations described in the API. |
| security | a list, each one follows rules kept in another file | no | A declaration of which security mechanisms are associated with this operation. |
| bindings | rules kept in another file, http://asyncapi.com/definitions/2.6.0/bindingsObject.json | no |  |
| any name in a set format | rules kept in another file, http://asyncapi.com/definitions/2.6.0/specificationExtension.json | no |  |

### message.json

Describes a message received on a given channel and operation.

A single value.

### correlationId.json

An object that specifies an identifier at design time that can used for message tracing and correlation.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| description | text | no | A optional description of the correlation ID. GitHub Flavored Markdown is allowed. |
| location | text; in an exact set format | yes, always | A runtime expression that specifies the location of the correlation ID |
| any name in a set format | rules kept in another file, http://asyncapi.com/definitions/2.6.0/specificationExtension.json | no |  |

### messageTrait.json

Describes a trait that MAY be applied to a Message Object.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaFormat | text | no | A string containing the name of the schema format/language used to define the message payload. |
| contentType | text | no | The content type to use when encoding/decoding a message's payload. |
| headers | a group of fields | no | Schema definition of the application headers. |
| headers.type *(borrowed)* | one of: object | no |  |
| messageId | text | no | Unique string used to identify the message. The id MUST be unique among all messages described in the API. |
| correlationId | one of 2 forms: follows rules kept in another file; follows rules kept in another file | no | Definition of the correlation ID used for message tracing or matching. |
| tags | a list, each one follows rules kept in another file | no | A list of tags for logical grouping and categorization of messages. |
| summary | text | no | A brief summary of the message. |
| name | text | no | Name of the message. |
| title | text | no | A human-friendly title for the message. |
| description | text | no | A longer description of the message. CommonMark is allowed. |
| externalDocs | rules kept in another file, http://asyncapi.com/definitions/2.6.0/externalDocs.json | no |  |
| deprecated | yes or no; left out means no | no |  |
| examples | a list, each one one of 2 forms | no | List of examples. |
| examples[].name | text | no | Machine readable name of the message example. |
| examples[].summary | text | no | A brief summary of the message example. |
| examples[].headers | a group of fields | no | Schema definition of the application headers. |
| examples[].payload | anything | no | Definition of the message payload. It can be of any type |
| bindings | rules kept in another file, http://asyncapi.com/definitions/2.6.0/bindingsObject.json | no |  |
| any name in a set format | rules kept in another file, http://asyncapi.com/definitions/2.6.0/specificationExtension.json | no |  |

### openapiSchema_3_0.json

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| title | text | no |  |
| multipleOf | a number | no |  |
| maximum | a number | no |  |
| exclusiveMaximum | yes or no; left out means no | no |  |
| minimum | a number | no |  |
| exclusiveMinimum | yes or no; left out means no | no |  |
| maxLength | a whole number; from 0 to any | no |  |
| minLength | a whole number; from 0 to any; left out means 0 | no |  |
| pattern | a search pattern | no |  |
| maxItems | a whole number; from 0 to any | no |  |
| minItems | a whole number; from 0 to any; left out means 0 | no |  |
| uniqueItems | yes or no; left out means no | no |  |
| maxProperties | a whole number; from 0 to any | no |  |
| minProperties | a whole number; from 0 to any; left out means 0 | no |  |
| required | a list, each one text; from 1 to any entries | no |  |
| enum | a list, each one anything; from 1 to any entries | no |  |
| type | one of: array, boolean, integer, number, object, string | no |  |
| not | either http://asyncapi.com/definitions/2.6.0/openapiSchema_3_0.json or Reference | no |  |
| allOf | a list, each entry either http://asyncapi.com/definitions/2.6.0/openapiSchema_3_0.json or Reference | no |  |
| oneOf | a list, each entry either http://asyncapi.com/definitions/2.6.0/openapiSchema_3_0.json or Reference | no |  |
| anyOf | a list, each entry either http://asyncapi.com/definitions/2.6.0/openapiSchema_3_0.json or Reference | no |  |
| items | either http://asyncapi.com/definitions/2.6.0/openapiSchema_3_0.json or Reference | no |  |
| properties | a group of fields | no |  |
| properties.any name you choose | either http://asyncapi.com/definitions/2.6.0/openapiSchema_3_0.json or Reference | no |  |
| additionalProperties | one of 3 forms: http://asyncapi.com/definitions/2.6.0/openapiSchema_3_0.json; Reference; yes or no; left out means yes | no |  |
| description | text | no |  |
| format | text | no |  |
| default | anything | no |  |
| nullable | yes or no; left out means no | no |  |
| discriminator | Discriminator | no |  |
| readOnly | yes or no; left out means no | no |  |
| writeOnly | yes or no; left out means no | no |  |
| example | anything | no |  |
| externalDocs | ExternalDocumentation | no |  |
| deprecated | yes or no; left out means no | no |  |
| xml | XML | no |  |
| any name in a set format | anything | no |  |

### avroSchema_v1.json

Json-Schema definition for Avro AVSC files.

A single value.

### components.json

Holds a set of reusable objects for different aspects of the AsyncAPI specification. All objects defined within the components object will have no effect on the API unless they are explicitly referenced from properties outside the components object.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemas | rules kept in another file, http://asyncapi.com/definitions/2.6.0/schemas.json | no |  |
| servers | rules kept in another file, http://asyncapi.com/definitions/2.6.0/servers.json | no |  |
| channels | rules kept in another file, http://asyncapi.com/definitions/2.6.0/channels.json | no |  |
| serverVariables | rules kept in another file, http://asyncapi.com/definitions/2.6.0/serverVariables.json | no |  |
| messages | rules kept in another file, http://asyncapi.com/definitions/2.6.0/messages.json | no |  |
| securitySchemes | a group of fields | no |  |
| securitySchemes.any name made of numbers, dots, underscores, dashes | one of 2 forms: follows rules kept in another file; follows rules kept in another file | no |  |
| parameters | rules kept in another file, http://asyncapi.com/definitions/2.6.0/parameters.json | no |  |
| correlationIds | a group of fields | no |  |
| correlationIds.any name made of numbers, dots, underscores, dashes | one of 2 forms: follows rules kept in another file; follows rules kept in another file | no |  |
| operationTraits | a group of fields | no |  |
| operationTraits.any name you choose | rules kept in another file, http://asyncapi.com/definitions/2.6.0/operationTrait.json | no |  |
| messageTraits | a group of fields | no |  |
| messageTraits.any name you choose | rules kept in another file, http://asyncapi.com/definitions/2.6.0/messageTrait.json | no |  |
| serverBindings | a group of fields | no |  |
| serverBindings.any name you choose | rules kept in another file, http://asyncapi.com/definitions/2.6.0/bindingsObject.json | no |  |
| channelBindings | a group of fields | no |  |
| channelBindings.any name you choose | rules kept in another file, http://asyncapi.com/definitions/2.6.0/bindingsObject.json | no |  |
| operationBindings | a group of fields | no |  |
| operationBindings.any name you choose | rules kept in another file, http://asyncapi.com/definitions/2.6.0/bindingsObject.json | no |  |
| messageBindings | a group of fields | no |  |
| messageBindings.any name you choose | rules kept in another file, http://asyncapi.com/definitions/2.6.0/bindingsObject.json | no |  |
| any name in a set format | rules kept in another file, http://asyncapi.com/definitions/2.6.0/specificationExtension.json | no |  |

### schemas.json

JSON objects describing schemas the API uses.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name you choose | rules kept in another file, http://asyncapi.com/definitions/2.6.0/schema.json | no |  |

### messages.json

JSON objects describing the messages being consumed and produced by the API.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name you choose | rules kept in another file, http://asyncapi.com/definitions/2.6.0/message.json | no |  |

### SecurityScheme.json

Defines a security scheme that can be used by the operations.

A single value.

### userPassword.json

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| type | one of: userPassword | yes, always | The type of the security scheme. |
| description | text | no | A short description for security scheme. |
| any name in a set format | rules kept in another file, http://asyncapi.com/definitions/2.6.0/specificationExtension.json | no |  |

### apiKey.json

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| type | one of: apiKey | yes, always | The type of the security scheme. |
| in | one of: user, password | yes, always | The location of the API key. |
| description | text | no | A short description for security scheme. |
| any name in a set format | rules kept in another file, http://asyncapi.com/definitions/2.6.0/specificationExtension.json | no |  |

### X509.json

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| type | one of: X509 | yes, always | The type of the security scheme. |
| description | text | no | A short description for security scheme. |
| any name in a set format | rules kept in another file, http://asyncapi.com/definitions/2.6.0/specificationExtension.json | no |  |

### symmetricEncryption.json

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| type | one of: symmetricEncryption | yes, always | The type of the security scheme. |
| description | text | no | A short description for security scheme. |
| any name in a set format | rules kept in another file, http://asyncapi.com/definitions/2.6.0/specificationExtension.json | no |  |

### asymmetricEncryption.json

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| type | one of: asymmetricEncryption | yes, always | The type of the security scheme. |
| description | text | no | A short description for security scheme. |
| any name in a set format | rules kept in another file, http://asyncapi.com/definitions/2.6.0/specificationExtension.json | no |  |

### HTTPSecurityScheme.json

A single value.

### NonBearerHTTPSecurityScheme.json

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| scheme | text | yes, always | The name of the HTTP Authorization scheme to be used in the Authorization header as defined in RFC7235. |
| description | text | no | A short description for security scheme. |
| type | one of: http | yes, always | The type of the security scheme. |
| any name in a set format | rules kept in another file, http://asyncapi.com/definitions/2.6.0/specificationExtension.json | no |  |

### BearerHTTPSecurityScheme.json

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| scheme | one of: bearer | yes, always | The name of the HTTP Authorization scheme to be used in the Authorization header as defined in RFC7235. |
| bearerFormat | text | no | A hint to the client to identify how the bearer token is formatted. |
| type | one of: http | yes, always | The type of the security scheme. |
| description | text | no | A short description for security scheme. |
| any name in a set format | rules kept in another file, http://asyncapi.com/definitions/2.6.0/specificationExtension.json | no |  |

### APIKeyHTTPSecurityScheme.json

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| type | one of: httpApiKey | yes, always | The type of the security scheme. |
| name | text | yes, always | The name of the header, query or cookie parameter to be used. |
| in | one of: header, query, cookie | yes, always | The location of the API key. |
| description | text | no | A short description for security scheme. |
| any name in a set format | rules kept in another file, http://asyncapi.com/definitions/2.6.0/specificationExtension.json | no |  |

### oauth2Flows.json

Allows configuration of the supported OAuth Flows.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| type | one of: oauth2 | yes, always | A short description for security scheme. |
| description | text | no | A short description for security scheme. |
| flows | a group of fields; nothing else may be added here | yes, always |  |
| flows.implicit | a group of fields | no | Configuration for the OAuth Implicit flow. |
| flows.password | a group of fields | no | Configuration for the OAuth Resource Owner Protected Credentials flow. |
| flows.clientCredentials | a group of fields | no | Configuration for the OAuth Client Credentials flow. |
| flows.authorizationCode | a group of fields | no | Configuration for the OAuth Authorization Code flow. |
| any name in a set format | rules kept in another file, http://asyncapi.com/definitions/2.6.0/specificationExtension.json | no |  |

### oauth2Flow.json

Configuration details for a supported OAuth Flow

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| authorizationUrl | a web address | no | The authorization URL to be used for this flow. This MUST be in the form of an absolute URL. |
| tokenUrl | a web address | no | The token URL to be used for this flow. This MUST be in the form of an absolute URL. |
| refreshUrl | a web address | no | The URL to be used for obtaining refresh tokens. This MUST be in the form of an absolute URL. |
| scopes | rules kept in another file, http://asyncapi.com/definitions/2.6.0/oauth2Scopes.json | no | The available scopes for the OAuth2 security scheme. A map between the scope name and a short description for it. |
| any name in a set format | rules kept in another file, http://asyncapi.com/definitions/2.6.0/specificationExtension.json | no |  |

### oauth2Scopes.json

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name you choose | text | no |  |

### openIdConnect.json

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| type | one of: openIdConnect | yes, always |  |
| description | text | no |  |
| openIdConnectUrl | a web address | yes, always |  |
| any name in a set format | rules kept in another file, http://asyncapi.com/definitions/2.6.0/specificationExtension.json | no |  |

### SaslSecurityScheme.json

A single value.

### SaslPlainSecurityScheme.json

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| type | one of: plain | yes, always | The type of the security scheme. Valid values |
| description | text | no | A short description for security scheme. |
| any name in a set format | rules kept in another file, http://asyncapi.com/definitions/2.6.0/specificationExtension.json | no |  |

### SaslScramSecurityScheme.json

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| type | one of: scramSha256, scramSha512 | yes, always | The type of the security scheme. |
| description | text | no | A short description for security scheme. |
| any name in a set format | rules kept in another file, http://asyncapi.com/definitions/2.6.0/specificationExtension.json | no |  |

### SaslGssapiSecurityScheme.json

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| type | one of: gssapi | yes, always | The type of the security scheme. |
| description | text | no | A short description for security scheme. |
| any name in a set format | rules kept in another file, http://asyncapi.com/definitions/2.6.0/specificationExtension.json | no |  |

## What this page does not show

- a rule limiting what names may be used (propertyNames)
- a rule saying the value must not match a whole shape ((unnamed))
- a rule saying the value must not match a whole shape (Custom Type)
