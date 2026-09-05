# openapi30

The description of OpenAPI v3.0.x documents, as defined by https://spec.openapis.org/oas/v3.0.3

## What this file holds

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| openapi | text; in an exact set format | yes, always |  |
| info | Info | yes, always |  |
| externalDocs | ExternalDocumentation | no |  |
| servers | a list, each one Server | no |  |
| security | a list, each one SecurityRequirement | no |  |
| tags | a list, each one Tag | no |  |
| paths | Paths | yes, always |  |
| components | Components | no |  |
| any name in a set format | anything | no |  |

## All 39 shapes

Most used first, because everything else is built on them.

- **Reference** (used 31)
- **Schema** (used 11)
- **Server** (used 4)
- **MediaType** (used 4)
- **Example** (used 4)
- **ExternalDocumentation** (used 4)
- **Response** (used 3)
- **Header** (used 3)
- **ExampleXORExamples** (used 3)
- **Parameter** (used 3)
- **PathItem** (used 2)
- **SecurityRequirement** (used 2)
- **SchemaXORContent** (used 2)
- **RequestBody** (used 2)
- **Link** (used 2)
- **Callback** (used 2)
- **Info** (used 1)
- **Contact** (used 1)
- **License** (used 1)
- **ServerVariable** (used 1)
- **Components** (used 1)
- **Discriminator** (used 1)
- **XML** (used 1)
- **Paths** (used 1)
- **Operation** (used 1)
- **Responses** (used 1)
- **Tag** (used 1)
- **ParameterLocation** (used 1)
- **SecurityScheme** (used 1)
- **APIKeySecurityScheme** (used 1)
- **HTTPSecurityScheme** (used 1)
- **OAuth2SecurityScheme** (used 1)
- **OpenIdConnectSecurityScheme** (used 1)
- **OAuthFlows** (used 1)
- **ImplicitOAuthFlow** (used 1)
- **PasswordOAuthFlow** (used 1)
- **ClientCredentialsFlow** (used 1)
- **AuthorizationCodeOAuthFlow** (used 1)
- **Encoding** (used 1)

### Reference

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format | a web address | no |  |

### Schema

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| title | text | no |  |
| multipleOf | a number; from 0 to any | no |  |
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
| not | either Schema or Reference | no |  |
| allOf | a list, each entry either Schema or Reference | no |  |
| oneOf | a list, each entry either Schema or Reference | no |  |
| anyOf | a list, each entry either Schema or Reference | no |  |
| items | either Schema or Reference | no |  |
| properties | a group of fields | no |  |
| properties.any name you choose | either Schema or Reference | no |  |
| additionalProperties | one of 3 forms: Schema; Reference; yes or no; left out means yes | no |  |
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

### Server

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| url | text | yes, always |  |
| description | text | no |  |
| variables | a group of fields | no |  |
| variables.any name you choose | ServerVariable | no |  |
| any name in a set format | anything | no |  |

### MediaType

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schema | either Schema or Reference | no |  |
| example | anything | no |  |
| examples | a group of fields | no |  |
| examples.any name you choose | either Example or Reference | no |  |
| encoding | a group of fields | no |  |
| encoding.any name you choose | Encoding | no |  |
| any name in a set format | anything | no |  |

### Example

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| summary | text | no |  |
| description | text | no |  |
| value | anything | no |  |
| externalValue | a web address | no |  |
| any name in a set format | anything | no |  |

### ExternalDocumentation

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| description | text | no |  |
| url | a web address | yes, always |  |
| any name in a set format | anything | no |  |

### Response

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| description | text | yes, always |  |
| headers | a group of fields | no |  |
| headers.any name you choose | either Header or Reference | no |  |
| content | a group of fields | no |  |
| content.any name you choose | MediaType | no |  |
| links | a group of fields | no |  |
| links.any name you choose | either Link or Reference | no |  |
| any name in a set format | anything | no |  |

### Header

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| description | text | no |  |
| required | yes or no; left out means no | no |  |
| deprecated | yes or no; left out means no | no |  |
| allowEmptyValue | yes or no; left out means no | no |  |
| style | one of: simple | no |  |
| explode | yes or no | no |  |
| allowReserved | yes or no; left out means no | no |  |
| schema | either Schema or Reference | no |  |
| content | a group of fields; between 1 and 1 fields | no |  |
| content.any name you choose | MediaType | no |  |
| example | anything | no |  |
| examples | a group of fields | no |  |
| examples.any name you choose | either Example or Reference | no |  |
| any name in a set format | anything | no |  |

### ExampleXORExamples

Example and examples are mutually exclusive

A single value.

### Parameter

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| name | text | yes, always |  |
| in | text | yes, always |  |
| description | text | no |  |
| required | yes or no; left out means no | no |  |
| deprecated | yes or no; left out means no | no |  |
| allowEmptyValue | yes or no; left out means no | no |  |
| style | text | no |  |
| explode | yes or no | no |  |
| allowReserved | yes or no; left out means no | no |  |
| schema | either Schema or Reference | no |  |
| content | a group of fields; between 1 and 1 fields | no |  |
| content.any name you choose | MediaType | no |  |
| example | anything | no |  |
| examples | a group of fields | no |  |
| examples.any name you choose | either Example or Reference | no |  |
| any name in a set format | anything | no |  |

### PathItem

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| $ref | text | no |  |
| summary | text | no |  |
| description | text | no |  |
| servers | a list, each one Server | no |  |
| parameters | a list, each entry either Parameter or Reference | no |  |
| any name in a set format | Operation | no |  |
| any name in a set format | anything | no |  |

### SecurityRequirement

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name you choose | a list, each one text | no |  |

### SchemaXORContent

Schema and content are mutually exclusive, at least one is required

A single value.

### RequestBody

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| description | text | no |  |
| content | a group of fields | yes, always |  |
| content.any name you choose | MediaType | no |  |
| required | yes or no; left out means no | no |  |
| any name in a set format | anything | no |  |

### Link

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| operationId | text | no |  |
| operationRef | a web address | no |  |
| parameters | a group of fields | no |  |
| parameters.any name you choose | anything | no |  |
| requestBody | anything | no |  |
| description | text | no |  |
| server | Server | no |  |
| any name in a set format | anything | no |  |

### Callback

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format | anything | no |  |
| any name you choose | PathItem | no |  |

### Info

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| title | text | yes, always |  |
| description | text | no |  |
| termsOfService | a web address | no |  |
| contact | Contact | no |  |
| license | License | no |  |
| version | text | yes, always |  |
| any name in a set format | anything | no |  |

### Contact

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| name | text | no |  |
| url | a web address | no |  |
| email | an email address | no |  |
| any name in a set format | anything | no |  |

### License

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| name | text | yes, always |  |
| url | a web address | no |  |
| any name in a set format | anything | no |  |

### ServerVariable

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| enum | a list, each one text | no |  |
| default | text | yes, always |  |
| description | text | no |  |
| any name in a set format | anything | no |  |

### Components

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemas | a group of fields | no |  |
| schemas.any name made of letters, numbers, dots, underscores, dashes | either Schema or Reference | no |  |
| responses | a group of fields | no |  |
| responses.any name made of letters, numbers, dots, underscores, dashes | either Reference or Response | no |  |
| parameters | a group of fields | no |  |
| parameters.any name made of letters, numbers, dots, underscores, dashes | either Reference or Parameter | no |  |
| examples | a group of fields | no |  |
| examples.any name made of letters, numbers, dots, underscores, dashes | either Reference or Example | no |  |
| requestBodies | a group of fields | no |  |
| requestBodies.any name made of letters, numbers, dots, underscores, dashes | either Reference or RequestBody | no |  |
| headers | a group of fields | no |  |
| headers.any name made of letters, numbers, dots, underscores, dashes | either Reference or Header | no |  |
| securitySchemes | a group of fields | no |  |
| securitySchemes.any name made of letters, numbers, dots, underscores, dashes | either Reference or SecurityScheme | no |  |
| links | a group of fields | no |  |
| links.any name made of letters, numbers, dots, underscores, dashes | either Reference or Link | no |  |
| callbacks | a group of fields | no |  |
| callbacks.any name made of letters, numbers, dots, underscores, dashes | either Reference or Callback | no |  |
| any name in a set format | anything | no |  |

### Discriminator

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| propertyName | text | yes, always |  |
| mapping | a group of fields | no |  |
| mapping.any name you choose | text | no |  |

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

### Paths

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format | PathItem | no |  |
| any name in a set format | anything | no |  |

### Operation

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| tags | a list, each one text | no |  |
| summary | text | no |  |
| description | text | no |  |
| externalDocs | ExternalDocumentation | no |  |
| operationId | text | no |  |
| parameters | a list, each entry either Parameter or Reference | no |  |
| requestBody | either RequestBody or Reference | no |  |
| responses | Responses | yes, always |  |
| callbacks | a group of fields | no |  |
| callbacks.any name you choose | either Callback or Reference | no |  |
| deprecated | yes or no; left out means no | no |  |
| security | a list, each one SecurityRequirement | no |  |
| servers | a list, each one Server | no |  |
| any name in a set format | anything | no |  |

### Responses

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| default | either Response or Reference | no |  |
| any name in a set format | either Response or Reference | no |  |
| any name in a set format | anything | no |  |

### Tag

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| name | text | yes, always |  |
| description | text | no |  |
| externalDocs | ExternalDocumentation | no |  |
| any name in a set format | anything | no |  |

### ParameterLocation

Parameter location

A single value.

### SecurityScheme

A single value.

### APIKeySecurityScheme

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| type | one of: apiKey | yes, always |  |
| name | text | yes, always |  |
| in | one of: header, query, cookie | yes, always |  |
| description | text | no |  |
| any name in a set format | anything | no |  |

### HTTPSecurityScheme

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| scheme | text | yes, always |  |
| bearerFormat | text | no |  |
| description | text | no |  |
| type | one of: http | yes, always |  |
| any name in a set format | anything | no |  |

### OAuth2SecurityScheme

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| type | one of: oauth2 | yes, always |  |
| flows | OAuthFlows | yes, always |  |
| description | text | no |  |
| any name in a set format | anything | no |  |

### OpenIdConnectSecurityScheme

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| type | one of: openIdConnect | yes, always |  |
| openIdConnectUrl | a web address | yes, always |  |
| description | text | no |  |
| any name in a set format | anything | no |  |

### OAuthFlows

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| implicit | ImplicitOAuthFlow | no |  |
| password | PasswordOAuthFlow | no |  |
| clientCredentials | ClientCredentialsFlow | no |  |
| authorizationCode | AuthorizationCodeOAuthFlow | no |  |
| any name in a set format | anything | no |  |

### ImplicitOAuthFlow

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| authorizationUrl | a web address | yes, always |  |
| refreshUrl | a web address | no |  |
| scopes | a group of fields | yes, always |  |
| scopes.any name you choose | text | no |  |
| any name in a set format | anything | no |  |

### PasswordOAuthFlow

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| tokenUrl | a web address | yes, always |  |
| refreshUrl | a web address | no |  |
| scopes | a group of fields | yes, always |  |
| scopes.any name you choose | text | no |  |
| any name in a set format | anything | no |  |

### ClientCredentialsFlow

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| tokenUrl | a web address | yes, always |  |
| refreshUrl | a web address | no |  |
| scopes | a group of fields | yes, always |  |
| scopes.any name you choose | text | no |  |
| any name in a set format | anything | no |  |

### AuthorizationCodeOAuthFlow

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| authorizationUrl | a web address | yes, always |  |
| tokenUrl | a web address | yes, always |  |
| refreshUrl | a web address | no |  |
| scopes | a group of fields | yes, always |  |
| scopes.any name you choose | text | no |  |
| any name in a set format | anything | no |  |

### Encoding

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| contentType | text | no |  |
| headers | a group of fields | no |  |
| headers.any name you choose | either Header or Reference | no |  |
| style | one of: form, spaceDelimited, pipeDelimited, deepObject | no |  |
| explode | yes or no | no |  |
| allowReserved | yes or no; left out means no | no |  |

## What this page does not show

- a rule saying the value must not match a whole shape ((unnamed))
