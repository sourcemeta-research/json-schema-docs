# openapi31

The description of OpenAPI v3.1.x documents without schema validation, as defined by https://spec.openapis.org/oas/v3.1.0

## What this file holds

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format *(borrowed)* | anything | no |  |
| openapi | text; in an exact set format | yes, always |  |
| info | info | yes, always |  |
| jsonSchemaDialect | a web address; left out means https://spec.openapis.org/oas/3.1/dialect/base | no |  |
| servers | a list, each one server; left out means a group of details | no |  |
| paths | paths | no |  |
| webhooks | a group of fields | no |  |
| webhooks.any name you choose | path-item-or-reference | no |  |
| components | components | no |  |
| security | a list, each one security-requirement | no |  |
| tags | a list, each one tag | no |  |
| externalDocs | external-documentation | no |  |

## All 54 shapes

Most used first, because everything else is built on them.

- **specification-extensions** (used 28)
- **reference** (used 9)
- **operation** (used 8)
- **map-of-strings** (used 5)
- **server** (used 4)
- **content** (used 4)
- **path-item-or-reference** (used 3)
- **external-documentation** (used 3)
- **parameter-or-reference** (used 3)
- **response-or-reference** (used 3)
- **header-or-reference** (used 3)
- **examples** (used 3)
- **path-item** (used 2)
- **request-body-or-reference** (used 2)
- **callbacks-or-reference** (used 2)
- **example-or-reference** (used 2)
- **link-or-reference** (used 2)
- **security-requirement** (used 2)
- **info** (used 1)
- **contact** (used 1)
- **license** (used 1)
- **server-variable** (used 1)
- **components** (used 1)
- **paths** (used 1)
- **parameter** (used 1)
- **request-body** (used 1)
- **media-type** (used 1)
- **encoding** (used 1)
- **responses** (used 1)
- **response** (used 1)
- **callbacks** (used 1)
- **example** (used 1)
- **link** (used 1)
- **header** (used 1)
- **tag** (used 1)
- **security-scheme** (used 1)
- **security-scheme-or-reference** (used 1)
- **oauth-flows** (used 1)
- **styles-for-path** (used 1)
- **styles-for-header** (used 1)
- **styles-for-query** (used 1)
- **styles-for-cookie** (used 1)
- **styles-for-form** (used 1)
- **explode-default** (used 1)
- **type-apikey** (used 1)
- **type-http** (used 1)
- **type-http-bearer** (used 1)
- **type-oauth2** (used 1)
- **type-oidc** (used 1)
- **implicit** (used 1)
- **password** (used 1)
- **client-credentials** (used 1)
- **authorization-code** (used 1)
- **schema**

### specification-extensions

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format | anything | no |  |

### reference

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| $ref | a web address | no |  |
| summary | text | no |  |
| description | text | no |  |

### operation

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format *(borrowed)* | anything | no |  |
| tags | a list, each one text | no |  |
| summary | text | no |  |
| description | text | no |  |
| externalDocs | external-documentation | no |  |
| operationId | text | no |  |
| parameters | a list, each one parameter-or-reference | no |  |
| requestBody | request-body-or-reference | no |  |
| responses | responses | no |  |
| callbacks | a group of fields | no |  |
| callbacks.any name you choose | callbacks-or-reference | no |  |
| deprecated | yes or no; left out means no | no |  |
| security | a list, each one security-requirement | no |  |
| servers | a list, each one server | no |  |

### map-of-strings

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name you choose | text | no |  |

### server

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format *(borrowed)* | anything | no |  |
| url | a web address | yes, always |  |
| description | text | no |  |
| variables | a group of fields | no |  |
| variables.any name you choose | server-variable | no |  |

### content

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name you choose | media-type | no |  |

### path-item-or-reference

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| when $ref is filled in |  | only in certain cases |  |
| when $ref is filled in then.$ref | a web address | no |  |
| when $ref is filled in then.summary | text | no |  |
| when $ref is filled in then.description | text | no |  |
| when $ref is filled in otherwise.any name in a set format *(borrowed)* | anything | no |  |
| when $ref is filled in otherwise.summary | text | no |  |
| when $ref is filled in otherwise.description | text | no |  |
| when $ref is filled in otherwise.servers | a list, each one server | no |  |
| when $ref is filled in otherwise.parameters | a list, each one parameter-or-reference | no |  |
| when $ref is filled in otherwise.get | operation | no |  |
| when $ref is filled in otherwise.put | operation | no |  |
| when $ref is filled in otherwise.post | operation | no |  |
| when $ref is filled in otherwise.delete | operation | no |  |
| when $ref is filled in otherwise.options | operation | no |  |
| when $ref is filled in otherwise.head | operation | no |  |
| when $ref is filled in otherwise.patch | operation | no |  |
| when $ref is filled in otherwise.trace | operation | no |  |

### external-documentation

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format *(borrowed)* | anything | no |  |
| description | text | no |  |
| url | a web address | yes, always |  |

### parameter-or-reference

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| when $ref is filled in |  | only in certain cases |  |
| when $ref is filled in then.$ref | a web address | no |  |
| when $ref is filled in then.summary | text | no |  |
| when $ref is filled in then.description | text | no |  |
| when $ref is filled in otherwise.any name in a set format *(borrowed)* | anything | no |  |
| when $ref is filled in otherwise.name | text | yes, always |  |
| when $ref is filled in otherwise.in | one of: query, header, path, cookie | yes, always |  |
| when $ref is filled in otherwise.description | text | no |  |
| when $ref is filled in otherwise.required | yes or no; left out means no | no |  |
| when $ref is filled in otherwise.deprecated | yes or no; left out means no | no |  |
| when $ref is filled in otherwise.schema | anything | no |  |
| when $ref is filled in otherwise.schema brings.example *(borrowed)* | anything | no |  |
| when $ref is filled in otherwise.schema brings.examples *(borrowed)* | a group of fields | no |  |
| when $ref is filled in otherwise.schema brings.examples.any name you choose | example-or-reference | no |  |
| when $ref is filled in otherwise.schema brings.when in is "path" *(borrowed)* |  | only in certain cases |  |
| when $ref is filled in otherwise.schema brings.when in is "path" then.name | anything; in an exact set format | no |  |
| when $ref is filled in otherwise.schema brings.when in is "path" then.style | one of: matrix, label, simple | no |  |
| when $ref is filled in otherwise.schema brings.when in is "path" then.required | one of: yes | yes, always |  |
| when $ref is filled in otherwise.schema brings.when in is "path" then | required becomes required | yes | |
| when $ref is filled in otherwise.schema brings.when in is "header" *(borrowed)* |  | only in certain cases |  |
| when $ref is filled in otherwise.schema brings.when in is "header" then.style | one of: simple | no |  |
| when $ref is filled in otherwise.schema brings.when in is "query" *(borrowed)* |  | only in certain cases |  |
| when $ref is filled in otherwise.schema brings.when in is "query" then.style | one of: form, spaceDelimited, pipeDelimited, deepObject | no |  |
| when $ref is filled in otherwise.schema brings.when in is "query" then.allowReserved | yes or no; left out means no | no |  |
| when $ref is filled in otherwise.schema brings.when in is "cookie" *(borrowed)* |  | only in certain cases |  |
| when $ref is filled in otherwise.schema brings.when in is "cookie" then.style | one of: form | no |  |
| when $ref is filled in otherwise.schema brings.when style is "form" *(borrowed)* |  | only in certain cases |  |
| when $ref is filled in otherwise.schema brings.when style is "form" then.explode | anything; left out means yes | no |  |
| when $ref is filled in otherwise.schema brings.when style is "form" otherwise.explode | anything; left out means no | no |  |
| when $ref is filled in otherwise.schema brings.style | text | no |  |
| when $ref is filled in otherwise.schema brings.explode | yes or no | no |  |
| when $ref is filled in otherwise.content | content | no |  |
| when $ref is filled in otherwise.when in is "query" |  | only in certain cases |  |
| when $ref is filled in otherwise.when in is "query" then.allowEmptyValue | yes or no; left out means no | no |  |

### response-or-reference

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| when $ref is filled in |  | only in certain cases |  |
| when $ref is filled in then.$ref | a web address | no |  |
| when $ref is filled in then.summary | text | no |  |
| when $ref is filled in then.description | text | no |  |
| when $ref is filled in otherwise.any name in a set format *(borrowed)* | anything | no |  |
| when $ref is filled in otherwise.description | text | yes, always |  |
| when $ref is filled in otherwise.headers | a group of fields | no |  |
| when $ref is filled in otherwise.headers.any name you choose | header-or-reference | no |  |
| when $ref is filled in otherwise.content | content | no |  |
| when $ref is filled in otherwise.links | a group of fields | no |  |
| when $ref is filled in otherwise.links.any name you choose | link-or-reference | no |  |

### header-or-reference

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| when $ref is filled in |  | only in certain cases |  |
| when $ref is filled in then.$ref | a web address | no |  |
| when $ref is filled in then.summary | text | no |  |
| when $ref is filled in then.description | text | no |  |
| when $ref is filled in otherwise.any name in a set format *(borrowed)* | anything | no |  |
| when $ref is filled in otherwise.description | text | no |  |
| when $ref is filled in otherwise.required | yes or no; left out means no | no |  |
| when $ref is filled in otherwise.deprecated | yes or no; left out means no | no |  |
| when $ref is filled in otherwise.schema | anything | no |  |
| when $ref is filled in otherwise.schema brings.example *(borrowed)* | anything | no |  |
| when $ref is filled in otherwise.schema brings.examples *(borrowed)* | a group of fields | no |  |
| when $ref is filled in otherwise.schema brings.examples.any name you choose | example-or-reference | no |  |
| when $ref is filled in otherwise.schema brings.style | one of: simple | no |  |
| when $ref is filled in otherwise.schema brings.explode | yes or no; left out means no | no |  |
| when $ref is filled in otherwise.content | content | no |  |

### examples

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| example | anything | no |  |
| examples | a group of fields | no |  |
| examples.any name you choose | example-or-reference | no |  |

### path-item

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format *(borrowed)* | anything | no |  |
| summary | text | no |  |
| description | text | no |  |
| servers | a list, each one server | no |  |
| parameters | a list, each one parameter-or-reference | no |  |
| get | operation | no |  |
| put | operation | no |  |
| post | operation | no |  |
| delete | operation | no |  |
| options | operation | no |  |
| head | operation | no |  |
| patch | operation | no |  |
| trace | operation | no |  |

### request-body-or-reference

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| when $ref is filled in |  | only in certain cases |  |
| when $ref is filled in then.$ref | a web address | no |  |
| when $ref is filled in then.summary | text | no |  |
| when $ref is filled in then.description | text | no |  |
| when $ref is filled in otherwise.any name in a set format *(borrowed)* | anything | no |  |
| when $ref is filled in otherwise.description | text | no |  |
| when $ref is filled in otherwise.content | content | yes, always |  |
| when $ref is filled in otherwise.required | yes or no; left out means no | no |  |

### callbacks-or-reference

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| when $ref is filled in |  | only in certain cases |  |
| when $ref is filled in then.$ref | a web address | no |  |
| when $ref is filled in then.summary | text | no |  |
| when $ref is filled in then.description | text | no |  |
| when $ref is filled in otherwise.any name you choose | path-item-or-reference | no |  |

### example-or-reference

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| when $ref is filled in |  | only in certain cases |  |
| when $ref is filled in then.$ref | a web address | no |  |
| when $ref is filled in then.summary | text | no |  |
| when $ref is filled in then.description | text | no |  |
| when $ref is filled in otherwise.any name in a set format *(borrowed)* | anything | no |  |
| when $ref is filled in otherwise.summary | text | no |  |
| when $ref is filled in otherwise.description | text | no |  |
| when $ref is filled in otherwise.value | anything | no |  |
| when $ref is filled in otherwise.externalValue | a web address | no |  |

### link-or-reference

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| when $ref is filled in |  | only in certain cases |  |
| when $ref is filled in then.$ref | a web address | no |  |
| when $ref is filled in then.summary | text | no |  |
| when $ref is filled in then.description | text | no |  |
| when $ref is filled in otherwise.any name in a set format *(borrowed)* | anything | no |  |
| when $ref is filled in otherwise.operationRef | a web address | no |  |
| when $ref is filled in otherwise.operationId | text | no |  |
| when $ref is filled in otherwise.parameters | map-of-strings | no |  |
| when $ref is filled in otherwise.requestBody | anything | no |  |
| when $ref is filled in otherwise.description | text | no |  |
| when $ref is filled in otherwise.body | server | no |  |

### security-requirement

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name you choose | a list, each one text | no |  |

### info

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format *(borrowed)* | anything | no |  |
| title | text | yes, always |  |
| summary | text | no |  |
| description | text | no |  |
| termsOfService | a web address | no |  |
| contact | contact | no |  |
| license | license | no |  |
| version | text | yes, always |  |

### contact

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format *(borrowed)* | anything | no |  |
| name | text | no |  |
| url | a web address | no |  |
| email | an email address | no |  |

### license

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format *(borrowed)* | anything | no |  |
| name | text | yes, always |  |
| identifier | text | no |  |
| url | a web address | no |  |

### server-variable

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format *(borrowed)* | anything | no |  |
| enum | a list, each one text; from 1 to any entries | no |  |
| default | text | yes, always |  |
| description | text | no |  |

### components

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format *(borrowed)* | anything | no |  |
| schemas | a group of fields | no |  |
| schemas.any name you choose | anything | no |  |
| responses | a group of fields | no |  |
| responses.any name you choose | response-or-reference | no |  |
| parameters | a group of fields | no |  |
| parameters.any name you choose | parameter-or-reference | no |  |
| examples | a group of fields | no |  |
| examples.any name you choose | example-or-reference | no |  |
| requestBodies | a group of fields | no |  |
| requestBodies.any name you choose | request-body-or-reference | no |  |
| headers | a group of fields | no |  |
| headers.any name you choose | header-or-reference | no |  |
| securitySchemes | a group of fields | no |  |
| securitySchemes.any name you choose | security-scheme-or-reference | no |  |
| links | a group of fields | no |  |
| links.any name you choose | link-or-reference | no |  |
| callbacks | a group of fields | no |  |
| callbacks.any name you choose | callbacks-or-reference | no |  |
| pathItems | a group of fields | no |  |
| pathItems.any name you choose | path-item-or-reference | no |  |
| any name in a set format | anything | no |  |

### paths

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format *(borrowed)* | anything | no |  |
| any name in a set format | path-item | no |  |

### parameter

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format *(borrowed)* | anything | no |  |
| name | text | yes, always |  |
| in | one of: query, header, path, cookie | yes, always |  |
| description | text | no |  |
| required | yes or no; left out means no | no |  |
| deprecated | yes or no; left out means no | no |  |
| schema | anything | no |  |
| schema brings.example *(borrowed)* | anything | no |  |
| schema brings.examples *(borrowed)* | a group of fields | no |  |
| schema brings.examples.any name you choose | example-or-reference | no |  |
| schema brings.when in is "path" *(borrowed)* |  | only in certain cases |  |
| schema brings.when in is "path" then.name | anything; in an exact set format | no |  |
| schema brings.when in is "path" then.style | one of: matrix, label, simple | no |  |
| schema brings.when in is "path" then.required | one of: yes | yes, always |  |
| schema brings.when in is "path" then | required becomes required | yes | |
| schema brings.when in is "header" *(borrowed)* |  | only in certain cases |  |
| schema brings.when in is "header" then.style | one of: simple | no |  |
| schema brings.when in is "query" *(borrowed)* |  | only in certain cases |  |
| schema brings.when in is "query" then.style | one of: form, spaceDelimited, pipeDelimited, deepObject | no |  |
| schema brings.when in is "query" then.allowReserved | yes or no; left out means no | no |  |
| schema brings.when in is "cookie" *(borrowed)* |  | only in certain cases |  |
| schema brings.when in is "cookie" then.style | one of: form | no |  |
| schema brings.when style is "form" *(borrowed)* |  | only in certain cases |  |
| schema brings.when style is "form" then.explode | anything; left out means yes | no |  |
| schema brings.when style is "form" otherwise.explode | anything; left out means no | no |  |
| schema brings.style | text | no |  |
| schema brings.explode | yes or no | no |  |
| content | content | no |  |
| when in is "query" |  | only in certain cases |  |
| when in is "query" then.allowEmptyValue | yes or no; left out means no | no |  |

### request-body

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format *(borrowed)* | anything | no |  |
| description | text | no |  |
| content | content | yes, always |  |
| required | yes or no; left out means no | no |  |

### media-type

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format *(borrowed)* | anything | no |  |
| example *(borrowed)* | anything | no |  |
| examples *(borrowed)* | a group of fields | no |  |
| examples.any name you choose | example-or-reference | no |  |
| schema | anything | no |  |
| encoding | a group of fields | no |  |
| encoding.any name you choose | encoding | no |  |

### encoding

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format *(borrowed)* | anything | no |  |
| when style is "form" *(borrowed)* |  | only in certain cases |  |
| when style is "form" then.explode | anything; left out means yes | no |  |
| when style is "form" otherwise.explode | anything; left out means no | no |  |
| contentType | text | no |  |
| headers | a group of fields | no |  |
| headers.any name you choose | header-or-reference | no |  |
| style | one of: form, spaceDelimited, pipeDelimited, deepObject | no |  |
| explode | yes or no | no |  |
| allowReserved | yes or no; left out means no | no |  |

### responses

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format *(borrowed)* | anything | no |  |
| default | response-or-reference | no |  |
| any name in a set format | response-or-reference | no |  |

### response

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format *(borrowed)* | anything | no |  |
| description | text | yes, always |  |
| headers | a group of fields | no |  |
| headers.any name you choose | header-or-reference | no |  |
| content | content | no |  |
| links | a group of fields | no |  |
| links.any name you choose | link-or-reference | no |  |

### callbacks

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name you choose | path-item-or-reference | no |  |

### example

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format *(borrowed)* | anything | no |  |
| summary | text | no |  |
| description | text | no |  |
| value | anything | no |  |
| externalValue | a web address | no |  |

### link

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format *(borrowed)* | anything | no |  |
| operationRef | a web address | no |  |
| operationId | text | no |  |
| parameters | map-of-strings | no |  |
| requestBody | anything | no |  |
| description | text | no |  |
| body | server | no |  |

### header

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format *(borrowed)* | anything | no |  |
| description | text | no |  |
| required | yes or no; left out means no | no |  |
| deprecated | yes or no; left out means no | no |  |
| schema | anything | no |  |
| schema brings.example *(borrowed)* | anything | no |  |
| schema brings.examples *(borrowed)* | a group of fields | no |  |
| schema brings.examples.any name you choose | example-or-reference | no |  |
| schema brings.style | one of: simple | no |  |
| schema brings.explode | yes or no; left out means no | no |  |
| content | content | no |  |

### tag

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format *(borrowed)* | anything | no |  |
| name | text | yes, always |  |
| description | text | no |  |
| externalDocs | external-documentation | no |  |

### security-scheme

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format *(borrowed)* | anything | no |  |
| when type is "apiKey" *(borrowed)* |  | only in certain cases |  |
| when type is "apiKey" then.name | text | yes, always |  |
| when type is "apiKey" then.in | one of: query, header, cookie | yes, always |  |
| when type is "apiKey" then | name and in become required | yes | |
| when type is "http" *(borrowed)* |  | only in certain cases |  |
| when type is "http" then.scheme | text | yes, always |  |
| when type is "http" then | scheme becomes required | yes | |
| when type is "oauth2" *(borrowed)* |  | only in certain cases |  |
| when type is "oauth2" then.flows | oauth-flows | yes, always |  |
| when type is "oauth2" then | flows becomes required | yes | |
| when type is "openIdConnect" *(borrowed)* |  | only in certain cases |  |
| when type is "openIdConnect" then.openIdConnectUrl | a web address | yes, always |  |
| when type is "openIdConnect" then | openIdConnectUrl becomes required | yes | |
| type | one of: apiKey, http, mutualTLS, oauth2, openIdConnect | yes, always |  |
| description | text | no |  |

### security-scheme-or-reference

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| when $ref is filled in |  | only in certain cases |  |
| when $ref is filled in then.$ref | a web address | no |  |
| when $ref is filled in then.summary | text | no |  |
| when $ref is filled in then.description | text | no |  |
| when $ref is filled in otherwise.any name in a set format *(borrowed)* | anything | no |  |
| when $ref is filled in otherwise.when type is "apiKey" *(borrowed)* |  | only in certain cases |  |
| when $ref is filled in otherwise.when type is "apiKey" then.name | text | yes, always |  |
| when $ref is filled in otherwise.when type is "apiKey" then.in | one of: query, header, cookie | yes, always |  |
| when $ref is filled in otherwise.when type is "apiKey" then | name and in become required | yes | |
| when $ref is filled in otherwise.when type is "http" *(borrowed)* |  | only in certain cases |  |
| when $ref is filled in otherwise.when type is "http" then.scheme | text | yes, always |  |
| when $ref is filled in otherwise.when type is "http" then | scheme becomes required | yes | |
| when $ref is filled in otherwise.when type is "oauth2" *(borrowed)* |  | only in certain cases |  |
| when $ref is filled in otherwise.when type is "oauth2" then.flows | oauth-flows | yes, always |  |
| when $ref is filled in otherwise.when type is "oauth2" then | flows becomes required | yes | |
| when $ref is filled in otherwise.when type is "openIdConnect" *(borrowed)* |  | only in certain cases |  |
| when $ref is filled in otherwise.when type is "openIdConnect" then.openIdConnectUrl | a web address | yes, always |  |
| when $ref is filled in otherwise.when type is "openIdConnect" then | openIdConnectUrl becomes required | yes | |
| when $ref is filled in otherwise.type | one of: apiKey, http, mutualTLS, oauth2, openIdConnect | yes, always |  |
| when $ref is filled in otherwise.description | text | no |  |

### oauth-flows

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format *(borrowed)* | anything | no |  |
| implicit | implicit | no |  |
| password | password | no |  |
| clientCredentials | client-credentials | no |  |
| authorizationCode | authorization-code | no |  |

### styles-for-path

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| when in is "path" |  | only in certain cases |  |
| when in is "path" then.name | anything; in an exact set format | no |  |
| when in is "path" then.style | one of: matrix, label, simple | no |  |
| when in is "path" then.required | one of: yes | yes, always |  |
| when in is "path" then | required becomes required | yes | |

### styles-for-header

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| when in is "header" |  | only in certain cases |  |
| when in is "header" then.style | one of: simple | no |  |

### styles-for-query

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| when in is "query" |  | only in certain cases |  |
| when in is "query" then.style | one of: form, spaceDelimited, pipeDelimited, deepObject | no |  |
| when in is "query" then.allowReserved | yes or no; left out means no | no |  |

### styles-for-cookie

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| when in is "cookie" |  | only in certain cases |  |
| when in is "cookie" then.style | one of: form | no |  |

### styles-for-form

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| when style is "form" |  | only in certain cases |  |
| when style is "form" then.explode | anything; left out means yes | no |  |
| when style is "form" otherwise.explode | anything; left out means no | no |  |

### explode-default

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| when style is "form" |  | only in certain cases |  |
| when style is "form" then.explode | anything; left out means yes | no |  |
| when style is "form" otherwise.explode | anything; left out means no | no |  |

### type-apikey

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| when type is "apiKey" |  | only in certain cases |  |
| when type is "apiKey" then.name | text | yes, always |  |
| when type is "apiKey" then.in | one of: query, header, cookie | yes, always |  |
| when type is "apiKey" then | name and in become required | yes | |

### type-http

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| when type is "http" |  | only in certain cases |  |
| when type is "http" then.scheme | text | yes, always |  |
| when type is "http" then | scheme becomes required | yes | |

### type-http-bearer

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| when type is "http" |  | only in certain cases |  |
| when type is "http" then.bearerFormat | text | no |  |

### type-oauth2

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| when type is "oauth2" |  | only in certain cases |  |
| when type is "oauth2" then.flows | oauth-flows | yes, always |  |
| when type is "oauth2" then | flows becomes required | yes | |

### type-oidc

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| when type is "openIdConnect" |  | only in certain cases |  |
| when type is "openIdConnect" then.openIdConnectUrl | a web address | yes, always |  |
| when type is "openIdConnect" then | openIdConnectUrl becomes required | yes | |

### implicit

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format *(borrowed)* | anything | no |  |
| authorizationUrl | a web address | yes, always |  |
| refreshUrl | a web address | no |  |
| scopes | map-of-strings | yes, always |  |

### password

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format *(borrowed)* | anything | no |  |
| tokenUrl | a web address | yes, always |  |
| refreshUrl | a web address | no |  |
| scopes | map-of-strings | yes, always |  |

### client-credentials

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format *(borrowed)* | anything | no |  |
| tokenUrl | a web address | yes, always |  |
| refreshUrl | a web address | no |  |
| scopes | map-of-strings | yes, always |  |

### authorization-code

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| any name in a set format *(borrowed)* | anything | no |  |
| authorizationUrl | a web address | yes, always |  |
| tokenUrl | a web address | yes, always |  |
| refreshUrl | a web address | no |  |
| scopes | map-of-strings | yes, always |  |

### schema

A single value.

## What this page does not show

- a rule limiting what names may be used (propertyNames)
