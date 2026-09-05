# OMC-JSON Schema v2.6

## All 91 shapes

Most used first, because everything else is built on them.

- **reference** (used 146)
- **baseEntity** (used 30)
- **Context** (used 26)
- **Asset** (used 23)
- **Depiction** (used 15)
- **Composition** (used 15)
- **Participant** (used 14)
- **AssetSC** (used 11)
- **CreativeWork** (used 11)
- **Sequence** (used 11)
- **customData** (used 11)
- **ProductionScene** (used 9)
- **Character** (used 8)
- **NarrativeLocation** (used 8)
- **NarrativeObject** (used 8)
- **NarrativeScene** (used 8)
- **NarrativeStyling** (used 8)
- **NarrativeWardrobe** (used 8)
- **NarrativeAudio** (used 7)
- **SpecialAction** (used 7)
- **Location** (used 7)
- **Effect** (used 6)
- **ProductionLocation** (used 6)
- **Slate** (used 6)
- **annotation** (used 6)
- **Infrastructure** (used 5)
- **contact** (used 5)
- **Role** (used 4)
- **basicName** (used 4)
- **provenance** (used 4)
- **date** (used 4)
- **InfrastructureSC** (used 3)
- **Person** (used 3)
- **Department** (used 3)
- **Organization** (used 3)
- **Service** (used 3)
- **TaskSC** (used 3)
- **language** (used 3)
- **baseVersion** (used 3)
- **dateTime** (used 3)
- **Task** (used 2)
- **identifier** (used 2)
- **country** (used 2)
- **gender** (used 2)
- **completeName** (used 2)
- **boundingBox** (used 2)
- **coordinateOrientation** (used 2)
- **levelOfDetail** (used 2)
- **point3** (used 2)
- **scale** (used 2)
- **purpose** (used 2)
- **audioContent** (used 2)
- **soundfield** (used 2)
- **rootEntity** (used 2)
- **linearDistance** (used 2)
- **infrastructureFC** (used 1)
- **taskFC** (used 1)
- **tag** (used 1)
- **address** (used 1)
- **coordinates** (used 1)
- **email** (used 1)
- **telephone** (used 1)
- **codec** (used 1)
- **rootObject** (used 1)
- **audioChannelName** (used 1)
- **audioMixType** (used 1)
- **audioProcessingAction** (used 1)
- **cameraMetadata** (used 1)
- **isSelfContained** (used 1)
- **lensMetadata** (used 1)
- **mapFormat** (used 1)
- **mapType** (used 1)
- **recorderMetadata** (used 1)
- **timing** (used 1)
- **scd** (used 1)
- **audioTrackName** (used 1)
- **assetGroup** (used 1)
- **audioBitRate** (used 1)
- **audioSampleRate** (used 1)
- **audioSampleSize** (used 1)
- **dimensions** (used 1)
- **fileDetails** (used 1)
- **geometryType** (used 1)
- **linkset** (used 1)
- **weight** (used 1)
- **shootDay** (used 1)
- **durationTime** (used 1)
- **time**
- **unitOfMeasurement**
- **point2**
- **materialType**

### reference

An identifier that references another entity in the graph

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| identifier | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | no |  |

### baseEntity

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaVersion | one of: https://movielabs.com/omc/json/schema/v2.0, https://movielabs.com/omc/json/schema/v2.1, https://movielabs.com/omc/json/schema/v2.6 | yes, always | Describes the version of OMC-JSON schema that was used to create this instance. |
| identifier | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | yes, always | Identifier |
| name | text; the value itself may be empty | no | A name for the entity, this is primarily for human consumption in things like user interfaces. It should not be considered a canonical name. |
| description | text; the value itself may be empty | no | A brief description of the entity, primarily for human consumption. |
| customData | customData | no |  |
| annotation | annotation, itself a list | no |  |
| tag | tag, itself a list | no |  |
| entityInfo | a group of fields; the value itself may be empty | no | Reserved for future use to describe specific details about the instance of the entity |
| instanceInfo | a group of fields; nothing else may be added here; the value itself may be empty | no | Properties that describe information about this particular instance of an entity. |
| instanceInfo.createdOn | either date or dateTime | no |  |
| instanceInfo.CreatedBy | either reference or Participant | no |  |
| instanceInfo.lastUpdateOn | either date or dateTime | no |  |
| instanceInfo.LastUpdateBy | either reference or Participant | no |  |
| instanceInfo.customData | customData | no |  |

### Context

Informs scope within the construction process of a Creative Work.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaVersion *(borrowed)* | one of: https://movielabs.com/omc/json/schema/v2.0, https://movielabs.com/omc/json/schema/v2.1, https://movielabs.com/omc/json/schema/v2.6 | yes, always | Describes the version of OMC-JSON schema that was used to create this instance. |
| identifier *(borrowed)* | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | yes, always | Identifier |
| name *(borrowed)* | text; the value itself may be empty | no | A name for the entity, this is primarily for human consumption in things like user interfaces. It should not be considered a canonical name. |
| description *(borrowed)* | text; the value itself may be empty | no | A brief description of the entity, primarily for human consumption. |
| customData *(borrowed)* | customData | no |  |
| annotation *(borrowed)* | annotation, itself a list | no |  |
| tag *(borrowed)* | tag, itself a list | no |  |
| entityInfo *(borrowed)* | a group of fields; the value itself may be empty | no | Reserved for future use to describe specific details about the instance of the entity |
| instanceInfo *(borrowed)* | a group of fields; nothing else may be added here; the value itself may be empty | no | Properties that describe information about this particular instance of an entity. |
| instanceInfo.createdOn | either date or dateTime | no |  |
| instanceInfo.CreatedBy | either reference or Participant | no |  |
| instanceInfo.lastUpdateOn | either date or dateTime | no |  |
| instanceInfo.LastUpdateBy | either reference or Participant | no |  |
| instanceInfo.customData | customData | no |  |
| entityType | one of: Context | yes, always | Entity Type |
| contextType | text; the value itself may be empty | no | A classification of the type of context represented |
| contextCategory | text; the value itself may be empty | no | Provides an additional level of categorization of the Context beyond it's type. |
| contextProperties | one of 1 forms: a group of fields; the value itself may be empty | no |  |
| Context | a list, each one one of 2 forms; the value itself may be empty | no |  |
| For | a list, each entry either reference or Asset or Character or Context or CreativeWork or Depiction or Participant or SpecialAction or NarrativeAudio or Effect or NarrativeLocation or NarrativeObject or NarrativeScene or NarrativeStyling or NarrativeWardrobe or ProductionLocation or ProductionScene or Sequence or Slate; the value itself may be empty | no | The entities for which this Context is applicable |
| ForEntity | a list, each entry either reference or Asset or Character or Context or CreativeWork or Depiction or Participant or SpecialAction or NarrativeAudio or Effect or NarrativeLocation or NarrativeObject or NarrativeScene or NarrativeStyling or NarrativeWardrobe or ProductionLocation or ProductionScene or Sequence or Slate; the value itself may be empty | no | The entities for which this Context is applicable. |
| contributor | a group of fields; the value itself may be empty | no |  |
| contributor.Participant | a list, each one one of 2 forms; the value itself may be empty | no |  |
| contributesTo | a group of fields; the value itself may be empty | no |  |
| contributesTo.CreativeWork | a list, each one one of 2 forms; the value itself may be empty | no |  |
| features | a group of fields; the value itself may be empty | no |  |
| features.Character | a list, each entry either Character or reference; the value itself may be empty | no |  |
| features.SpecialAction | a list, each entry either SpecialAction or reference; the value itself may be empty | no |  |
| features.NarrativeAudio | a list, each entry either NarrativeAudio or reference; the value itself may be empty | no |  |
| features.Effect | a list, each entry either Effect or reference; the value itself may be empty | no |  |
| features.NarrativeLocation | a list, each entry either NarrativeLocation or reference; the value itself may be empty | no |  |
| features.NarrativeObject | a list, each entry either NarrativeObject or reference; the value itself may be empty | no |  |
| features.NarrativeStyling | a list, each entry either NarrativeStyling or reference; the value itself may be empty | no |  |
| features.NarrativeWardrobe | a list, each entry either NarrativeWardrobe or reference; the value itself may be empty | no |  |
| featuresIn | a group of fields; the value itself may be empty | no |  |
| featuresIn.NarrativeScene | a list, each one one of 2 forms; the value itself may be empty | no |  |
| for | a group of fields; the value itself may be empty | no |  |
| for.Asset | a list, each entry either Asset or reference; the value itself may be empty | no |  |
| for.Composition | a list, each one one of 2 forms; the value itself may be empty | no |  |
| for.CreativeWork | a list, each entry either CreativeWork or reference; the value itself may be empty | no |  |
| for.NarrativeScene | a list, each entry either NarrativeScene or reference; the value itself may be empty | no |  |
| for.ProductionScene | a list, each entry either ProductionScene or reference; the value itself may be empty | no |  |
| for.Sequence | a list, each entry either Sequence or reference; the value itself may be empty | no |  |
| for.Slate | a list, each entry either Slate or reference; the value itself may be empty | no |  |
| has | a group of fields; the value itself may be empty | no |  |
| has.Asset | a list, each entry either Asset or reference; the value itself may be empty | no |  |
| has.Composition | a list, each one one of 2 forms; the value itself may be empty | no |  |
| has.Infrastructure | a list, each one one of 2 forms; the value itself may be empty | no |  |
| has.SpecialAction | a list, each entry either SpecialAction or reference; the value itself may be empty | no |  |
| has.NarrativeLocation | a list, each entry either NarrativeLocation or reference; the value itself may be empty | no |  |
| has.NarrativeScene | a list, each entry either NarrativeScene or reference; the value itself may be empty | no |  |
| has.Participant | a list, each one one of 2 forms; the value itself may be empty | no |  |
| has.ProductionScene | a list, each entry either ProductionScene or reference; the value itself may be empty | no |  |
| has.Sequence | a list, each one one of 2 forms; the value itself may be empty | no |  |
| has.Slate | a list, each one one of 2 forms; the value itself may be empty | no |  |
| neededBy | a group of fields; the value itself may be empty | no |  |
| neededBy.Character | a list, each one one of 2 forms; the value itself may be empty | no |  |
| needs | a group of fields; the value itself may be empty | no |  |
| needs.NarrativeAudio | a list, each one one of 2 forms; the value itself may be empty | no |  |
| needs.SpecialAction | a list, each one one of 2 forms; the value itself may be empty | no |  |
| needs.Effect | a list, each one one of 2 forms; the value itself may be empty | no |  |
| needs.NarrativeObject | a list, each one one of 2 forms; the value itself may be empty | no |  |
| needs.NarrativeStyling | a list, each one one of 2 forms; the value itself may be empty | no |  |
| needs.NarrativeWardrobe | a list, each one one of 2 forms; the value itself may be empty | no |  |
| related | a group of fields; the value itself may be empty | no |  |
| related.ProductionScene | a list, each one one of 2 forms; the value itself may be empty | no |  |
| represents | a group of fields; the value itself may be empty | no |  |
| represents.NarrativeScene | a list, each one one of 2 forms; the value itself may be empty | no |  |
| representedBy | a group of fields; the value itself may be empty | no |  |
| representedBy.ProductionScene | a list, each one one of 2 forms; the value itself may be empty | no |  |
| usedIn | a group of fields; the value itself may be empty | no |  |
| usedIn.Depiction | a list, each one one of 2 forms; the value itself may be empty | no |  |
| usedIn.ProductionLocation | a list, each one one of 2 forms; the value itself may be empty | no |  |
| usedIn.ProductionScene | a list, each one one of 2 forms; the value itself may be empty | no |  |
| uses | a group of fields; the value itself may be empty | no |  |
| uses.Asset | a list, each one one of 2 forms; the value itself may be empty | no |  |
| uses.Composition | a list, each one one of 2 forms; the value itself may be empty | no |  |
| uses.Depiction | a list, each one one of 2 forms; the value itself may be empty | no |  |
| uses.Infrastructure | a list, each one one of 2 forms; the value itself may be empty | no |  |
| uses.ProductionLocation | a list, each one one of 2 forms; the value itself may be empty | no |  |
| idea | a group of fields; the value itself may be empty | no |  |
| idea.Asset | a list, each one one of 2 forms; the value itself may be empty | no |  |
| idea.Composition | a list, each one one of 2 forms; the value itself may be empty | no |  |
| subject | a group of fields; the value itself may be empty | no |  |
| subject.Character | a list, each entry either Character or reference; the value itself may be empty | no |  |
| subject.NarrativeAudio | a list, each entry either NarrativeAudio or reference; the value itself may be empty | no |  |
| subject.NarrativeLocation | a list, each entry either NarrativeLocation or reference; the value itself may be empty | no |  |
| subject.NarrativeObject | a list, each entry either NarrativeObject or reference; the value itself may be empty | no |  |
| subject.NarrativeStyling | a list, each entry either NarrativeStyling or reference; the value itself may be empty | no |  |
| subject.NarrativeWardrobe | a list, each entry either NarrativeWardrobe or reference; the value itself may be empty | no |  |
| subject.CreativeWork | a list, each entry either CreativeWork or reference; the value itself may be empty | no |  |

### Asset

A physical or digital object or collection of objects specific to the creation of the Creative Work.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaVersion *(borrowed)* | one of: https://movielabs.com/omc/json/schema/v2.0, https://movielabs.com/omc/json/schema/v2.1, https://movielabs.com/omc/json/schema/v2.6 | yes, always | Describes the version of OMC-JSON schema that was used to create this instance. |
| identifier *(borrowed)* | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | yes, always | Identifier |
| name *(borrowed)* | text; the value itself may be empty | no | A name for the entity, this is primarily for human consumption in things like user interfaces. It should not be considered a canonical name. |
| description *(borrowed)* | text; the value itself may be empty | no | A brief description of the entity, primarily for human consumption. |
| customData *(borrowed)* | customData | no |  |
| annotation *(borrowed)* | annotation, itself a list | no |  |
| tag *(borrowed)* | tag, itself a list | no |  |
| entityInfo *(borrowed)* | a group of fields; the value itself may be empty | no | Reserved for future use to describe specific details about the instance of the entity |
| instanceInfo *(borrowed)* | a group of fields; nothing else may be added here; the value itself may be empty | no | Properties that describe information about this particular instance of an entity. |
| instanceInfo.createdOn | either date or dateTime | no |  |
| instanceInfo.CreatedBy | either reference or Participant | no |  |
| instanceInfo.lastUpdateOn | either date or dateTime | no |  |
| instanceInfo.LastUpdateBy | either reference or Participant | no |  |
| instanceInfo.customData | customData | no |  |
| entityType | one of: Asset | yes, always | Entity Type |
| version | a group of fields; nothing else may be added here; the value itself may be empty | no | A particular form, variant, or representation of an Asset that differs in some way from its source Asset. |
| version.versionNumber *(borrowed)* | text or a number; the value itself may be empty | no | A designation indicating a place in a sequence of versions |
| version.name *(borrowed)* | text; the value itself may be empty | no | A name for this specific version of the Asset |
| version.description *(borrowed)* | text; the value itself may be empty | no | A human readable description of the version |
| version.annotation *(borrowed)* | annotation, itself a list | no |  |
| version.customData *(borrowed)* | customData | no |  |
| version.DerivationOf | either reference or Asset | no |  |
| version.RevisionOf | either reference or Asset | no |  |
| version.VariantOf | either reference or Asset | no |  |
| version.Alternative | a list, each entry either reference or Asset; the value itself may be empty | no |  |
| version.Derivation | a list, each entry either reference or Asset; the value itself may be empty | no |  |
| version.Revision | a list, each entry either reference or Asset; the value itself may be empty | no |  |
| version.Variant | a list, each entry either reference or Asset; the value itself may be empty | no |  |
| provenance | provenance | no | Provenance |
| Asset | a list, each entry either reference or Asset; the value itself may be empty | no | The set of Assets that make up an an asset group and has a structuralType of 'assetGroup' |
| AssetSC | either reference or AssetSC; the value itself may be empty | no | Structural Characteristics |
| assetFC | a group of fields; the value itself may be empty | no |  |
| assetFC.functionalType | text; the value itself may be empty | no |  |
| assetFC.functionalProperties | a group of fields; the value itself may be empty | no |  |
| assetFC.functionalProperties.audioChannelName | audioChannelName, itself a list | no |  |
| assetFC.functionalProperties.audioContent | audioContent, itself a list | no |  |
| assetFC.functionalProperties.audioMixType | audioMixType | no |  |
| assetFC.functionalProperties.audioProcessingAction | audioProcessingAction | no |  |
| assetFC.functionalProperties.cameraMetadata | cameraMetadata | no |  |
| assetFC.functionalProperties.isSelfContained | isSelfContained | no |  |
| assetFC.functionalProperties.lensMetadata | lensMetadata | no |  |
| assetFC.functionalProperties.mapFormat | mapFormat | no |  |
| assetFC.functionalProperties.mapType | mapType | no |  |
| assetFC.functionalProperties.recorderMetadata | recorderMetadata | no |  |
| assetFC.functionalProperties.soundfield | soundfield | no |  |
| assetFC.functionalProperties.timing | timing | no |  |
| assetFC.functionalProperties.scd | scd | no |  |
| assetFC.functionalProperties.audioTrackName | audioTrackName | no |  |
| assetFC.customData | customData | no |  |
| Context | a list, each entry either reference or Context; the value itself may be empty | no |  |
| Depiction | a list, each entry either reference or Depiction; the value itself may be empty | no |  |

### Depiction

The representation of something from a narrative entity by a production entity in the Creative Work, specified or implied by the Script.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaVersion *(borrowed)* | one of: https://movielabs.com/omc/json/schema/v2.0, https://movielabs.com/omc/json/schema/v2.1, https://movielabs.com/omc/json/schema/v2.6 | yes, always | Describes the version of OMC-JSON schema that was used to create this instance. |
| identifier *(borrowed)* | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | yes, always | Identifier |
| name *(borrowed)* | text; the value itself may be empty | no | A name for the entity, this is primarily for human consumption in things like user interfaces. It should not be considered a canonical name. |
| description *(borrowed)* | text; the value itself may be empty | no | A brief description of the entity, primarily for human consumption. |
| customData *(borrowed)* | customData | no |  |
| annotation *(borrowed)* | annotation, itself a list | no |  |
| tag *(borrowed)* | tag, itself a list | no |  |
| entityInfo *(borrowed)* | a group of fields; the value itself may be empty | no | Reserved for future use to describe specific details about the instance of the entity |
| instanceInfo *(borrowed)* | a group of fields; nothing else may be added here; the value itself may be empty | no | Properties that describe information about this particular instance of an entity. |
| instanceInfo.createdOn | either date or dateTime | no |  |
| instanceInfo.CreatedBy | either reference or Participant | no |  |
| instanceInfo.lastUpdateOn | either date or dateTime | no |  |
| instanceInfo.LastUpdateBy | either reference or Participant | no |  |
| instanceInfo.customData | customData | no |  |
| entityType | one of: Depiction | yes, always | Entity Type |
| depictionType | one of: depiction, portrayal | no | A categorization of the type of depiction |
| Depicts | either reference or Character or NarrativeLocation or NarrativeObject or NarrativeStyling or NarrativeWardrobe; the value itself may be empty | no |  |
| Depicter | either reference or Asset or Participant or Composition; the value itself may be empty | no |  |
| Depictor | either reference or Asset or Participant; the value itself may be empty | no |  |
| Context | a list, each entry either reference or Context; the value itself may be empty | no |  |

### Composition

A set of Assets or other Compositions that can be combined to produce a new Asset.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaVersion *(borrowed)* | one of: https://movielabs.com/omc/json/schema/v2.0, https://movielabs.com/omc/json/schema/v2.1, https://movielabs.com/omc/json/schema/v2.6 | yes, always | Describes the version of OMC-JSON schema that was used to create this instance. |
| identifier *(borrowed)* | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | yes, always | Identifier |
| name *(borrowed)* | text; the value itself may be empty | no | A name for the entity, this is primarily for human consumption in things like user interfaces. It should not be considered a canonical name. |
| description *(borrowed)* | text; the value itself may be empty | no | A brief description of the entity, primarily for human consumption. |
| customData *(borrowed)* | customData | no |  |
| annotation *(borrowed)* | annotation, itself a list | no |  |
| tag *(borrowed)* | tag, itself a list | no |  |
| entityInfo *(borrowed)* | a group of fields; the value itself may be empty | no | Reserved for future use to describe specific details about the instance of the entity |
| instanceInfo *(borrowed)* | a group of fields; nothing else may be added here; the value itself may be empty | no | Properties that describe information about this particular instance of an entity. |
| instanceInfo.createdOn | either date or dateTime | no |  |
| instanceInfo.CreatedBy | either reference or Participant | no |  |
| instanceInfo.lastUpdateOn | either date or dateTime | no |  |
| instanceInfo.LastUpdateBy | either reference or Participant | no |  |
| instanceInfo.customData | customData | no |  |
| entityType | one of: Composition | yes, always | Entity Type |
| version | a group of fields; nothing else may be added here; the value itself may be empty | no |  |
| version.versionNumber *(borrowed)* | text or a number; the value itself may be empty | no | A designation indicating a place in a sequence of versions |
| version.name *(borrowed)* | text; the value itself may be empty | no | A name for this specific version of the Asset |
| version.description *(borrowed)* | text; the value itself may be empty | no | A human readable description of the version |
| version.annotation *(borrowed)* | annotation, itself a list | no |  |
| version.customData *(borrowed)* | customData | no |  |
| version.DerivationOf | either reference or Composition | no |  |
| version.RevisionOf | either reference or Composition | no |  |
| version.VariantOf | either reference or Composition | no |  |
| version.Alternative | a list, each entry either reference or Composition; the value itself may be empty | no |  |
| version.Derivation | a list, each entry either reference or Composition; the value itself may be empty | no |  |
| version.Revision | a list, each entry either reference or Composition; the value itself may be empty | no |  |
| version.Variant | a list, each entry either reference or Composition; the value itself may be empty | no |  |
| provenance | provenance | no | Provenance |
| compositionType | text; the value itself may be empty | no | The type, or sub-class, that this specific Composition represents. |
| compositionProperties | a group of fields; the value itself may be empty | no | Composition Properties |
| compositionProperties.audioContent | audioContent, itself a list | no |  |
| compositionProperties.boundingBox | boundingBox | no |  |
| compositionProperties.coordinateOrientation | coordinateOrientation | no |  |
| compositionProperties.levelOfDetail | levelOfDetail | no |  |
| compositionProperties.purpose | purpose | no |  |
| compositionProperties.scale | scale | no |  |
| compositionProperties.soundfield | soundfield | no |  |
| Asset | a list, each entry either reference or Asset; the value itself may be empty | no | A set of Assets that are included in this Composition. |
| AssetSC | a list, each entry either reference or AssetSC; the value itself may be empty | no | A set of Asset Structural Characteristics that are included in this Composition. |
| Composition | a list, each entry either reference or Composition; the value itself may be empty | no | The set of Compositions that are included in this Composition. |
| StartHere | either reference or Asset or AssetSC; the value itself may be empty | no | Start point for assembling the Composition, the Asset that contains the instructions for the Composition. |
| Depiction | a list, each entry either reference or Depiction; the value itself may be empty | no |  |
| Context | a list, each entry either reference or Context; the value itself may be empty | no |  |

### Participant

The entities (people, organizations, and services) that are responsible for the production of the Creative Work.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaVersion *(borrowed)* | one of: https://movielabs.com/omc/json/schema/v2.0, https://movielabs.com/omc/json/schema/v2.1, https://movielabs.com/omc/json/schema/v2.6 | yes, always | Describes the version of OMC-JSON schema that was used to create this instance. |
| identifier *(borrowed)* | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | yes, always | Identifier |
| name *(borrowed)* | text; the value itself may be empty | no | A name for the entity, this is primarily for human consumption in things like user interfaces. It should not be considered a canonical name. |
| description *(borrowed)* | text; the value itself may be empty | no | A brief description of the entity, primarily for human consumption. |
| customData *(borrowed)* | customData | no |  |
| annotation *(borrowed)* | annotation, itself a list | no |  |
| tag *(borrowed)* | tag, itself a list | no |  |
| entityInfo *(borrowed)* | a group of fields; the value itself may be empty | no | Reserved for future use to describe specific details about the instance of the entity |
| instanceInfo *(borrowed)* | a group of fields; nothing else may be added here; the value itself may be empty | no | Properties that describe information about this particular instance of an entity. |
| instanceInfo.createdOn | either date or dateTime | no |  |
| instanceInfo.CreatedBy | either reference or Participant | no |  |
| instanceInfo.lastUpdateOn | either date or dateTime | no |  |
| instanceInfo.LastUpdateBy | either reference or Participant | no |  |
| instanceInfo.customData | customData | no |  |
| entityType | one of: Participant | yes, always | Entity Type |
| ParticipantSC | either reference or Person or Department or Organization or Service; the value itself may be empty | no | Describes the form of a Participant along with the attributes specific to that Participant’s form. |
| participantFC | a group of fields; nothing else may be added here; the value itself may be empty | no | The use or purpose of a Participant within the production process |
| participantFC.functionalType | text; the value itself may be empty | no | Functional Type |
| participantFC.jobTitle | text; the value itself may be empty | no | A formal name for the position a Person holds in relation to the production, usually associated with a specific set of responsibilities. |
| participantFC.Role | a list, each entry either reference or Role; the value itself may be empty | no | The combination of a Task and the Participant responsible for it. |
| participantFC.customData | customData | no |  |
| contact | contact | no | Contact information for the Participant |
| Participant | a list, each entry either reference or Participant; the value itself may be empty | no | Any Participants that are members of this Participant group |
| Context | a list, each entry either reference or Context; the value itself may be empty | no |  |
| Depiction | a list, each entry either reference or Depiction; the value itself may be empty | no |  |

### AssetSC

Describes the form of an Asset along with the attributes specific to that asset’s form.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaVersion *(borrowed)* | one of: https://movielabs.com/omc/json/schema/v2.0, https://movielabs.com/omc/json/schema/v2.1, https://movielabs.com/omc/json/schema/v2.6 | yes, always | Describes the version of OMC-JSON schema that was used to create this instance. |
| identifier *(borrowed)* | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | yes, always | Identifier |
| name *(borrowed)* | text; the value itself may be empty | no | A name for the entity, this is primarily for human consumption in things like user interfaces. It should not be considered a canonical name. |
| description *(borrowed)* | text; the value itself may be empty | no | A brief description of the entity, primarily for human consumption. |
| customData *(borrowed)* | customData | no |  |
| annotation *(borrowed)* | annotation, itself a list | no |  |
| tag *(borrowed)* | tag, itself a list | no |  |
| entityInfo *(borrowed)* | a group of fields; the value itself may be empty | no | Reserved for future use to describe specific details about the instance of the entity |
| instanceInfo *(borrowed)* | a group of fields; nothing else may be added here; the value itself may be empty | no | Properties that describe information about this particular instance of an entity. |
| instanceInfo.createdOn | either date or dateTime | no |  |
| instanceInfo.CreatedBy | either reference or Participant | no |  |
| instanceInfo.lastUpdateOn | either date or dateTime | no |  |
| instanceInfo.LastUpdateBy | either reference or Participant | no |  |
| instanceInfo.customData | customData | no |  |
| entityType | one of: AssetSC | yes, always | Entity Type |
| version | a group of fields; nothing else may be added here; the value itself may be empty | no | A particular form, variant, or representation of an Asset that differs in some way from its source Asset. |
| version.versionNumber *(borrowed)* | text or a number; the value itself may be empty | no | A designation indicating a place in a sequence of versions |
| version.name *(borrowed)* | text; the value itself may be empty | no | A name for this specific version of the Asset |
| version.description *(borrowed)* | text; the value itself may be empty | no | A human readable description of the version |
| version.annotation *(borrowed)* | annotation, itself a list | no |  |
| version.customData *(borrowed)* | customData | no |  |
| version.DerivationOf | either reference or AssetSC | no |  |
| version.RepresentationOf | either reference or AssetSC | no |  |
| version.RevisionOf | either reference or AssetSC | no |  |
| version.Deriviation | a list, each entry either reference or AssetSC; the value itself may be empty | no |  |
| version.Representation | a list, each entry either reference or AssetSC; the value itself may be empty | no |  |
| version.Revision | a list, each entry either reference or AssetSC; the value itself may be empty | no |  |
| provenance | provenance | no | Provenance |
| structuralType | text; the value itself may be empty | no | A cannonical description of the the assets form. |
| structuralProperties | a group of fields; nothing else may be added here; the value itself may be empty | no | A set of properties that describe the asset in this form. |
| structuralProperties.assetGroup | assetGroup | no |  |
| structuralProperties.audioBitRate | audioBitRate | no |  |
| structuralProperties.audioSampleRate | audioSampleRate | no |  |
| structuralProperties.audioSampleSize | audioSampleSize | no |  |
| structuralProperties.dimensions | dimensions; for example 100m | no |  |
| structuralProperties.boundingBox | boundingBox | no |  |
| structuralProperties.codec | codec | no |  |
| structuralProperties.coordinateOrientation | coordinateOrientation | no |  |
| structuralProperties.fileDetails | fileDetails | no |  |
| structuralProperties.geometryType | geometryType | no |  |
| structuralProperties.levelOfDetail | levelOfDetail | no |  |
| structuralProperties.linkset | linkset | no |  |
| structuralProperties.purpose | purpose | no |  |
| structuralProperties.scale | scale | no |  |
| isAnalog | yes or no; the value itself may be empty | no | True if the Asset is an Analog Asset. |
| Carrier | either reference or Infrastructure | no | For describing the physical storage device on which the digital essence is stored. |

### CreativeWork

A uniquely identified production.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaVersion *(borrowed)* | one of: https://movielabs.com/omc/json/schema/v2.0, https://movielabs.com/omc/json/schema/v2.1, https://movielabs.com/omc/json/schema/v2.6 | yes, always | Describes the version of OMC-JSON schema that was used to create this instance. |
| identifier *(borrowed)* | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | yes, always | Identifier |
| name *(borrowed)* | text; the value itself may be empty | no | A name for the entity, this is primarily for human consumption in things like user interfaces. It should not be considered a canonical name. |
| description *(borrowed)* | text; the value itself may be empty | no | A brief description of the entity, primarily for human consumption. |
| customData *(borrowed)* | customData | no |  |
| annotation *(borrowed)* | annotation, itself a list | no |  |
| tag *(borrowed)* | tag, itself a list | no |  |
| entityInfo *(borrowed)* | a group of fields; the value itself may be empty | no | Reserved for future use to describe specific details about the instance of the entity |
| instanceInfo *(borrowed)* | a group of fields; nothing else may be added here; the value itself may be empty | no | Properties that describe information about this particular instance of an entity. |
| instanceInfo.createdOn | either date or dateTime | no |  |
| instanceInfo.CreatedBy | either reference or Participant | no |  |
| instanceInfo.lastUpdateOn | either date or dateTime | no |  |
| instanceInfo.LastUpdateBy | either reference or Participant | no |  |
| instanceInfo.customData | customData | no |  |
| entityType | one of: CreativeWork | yes, always | Entity Type |
| creativeWorkType | one of: creativeWork, series, season, episode | no | Creative Work Type |
| creativeWorkCategory | one of: nothing, movie, tv, short, supplemental | no | The type or form of a Creative Work. |
| seasonNumber | text or a number; the value itself may be empty | no | Season Number |
| episodeSequence | a group of fields; the value itself may be empty | no | Episode Sequence |
| episodeSequence.houseSequence | text or a number; the value itself may be empty | no | The internal Episode number assigned by the producer or commissioning broadcaster. |
| episodeSequence.distributionNumber | a list, each one a group of fields; the value itself may be empty | no | The position number of the Episode within its parent Season (or parent Series, if the Episode is directly in a Series) during initial broadcast or distribution. |
| episodeSequence.distributionNumber[].value | text or a number; the value itself may be empty | no |  |
| episodeSequence.distributionNumber[].domain | text; the value itself may be empty | no |  |
| title | a group of fields | no | A name for a Creative Work. |
| title.workingTitle | text; the value itself may be empty | no | The working title of the work |
| title.officialTitle | text; the value itself may be empty | no | The official title of the work |
| title.internalTitle | text; the value itself may be empty | no | The internal title of the work |
| creativeWorkTitle | a list, each one a group of fields; the value itself may be empty | no |  |
| creativeWorkTitle[].titleName | text; the value itself may be empty | no |  |
| creativeWorkTitle[].titleType | one of: nothing, working, internal, regional, release | no |  |
| creativeWorkTitle[].titleLanguage | language | no |  |
| approximateLength | durationTime; for example P2Y12M3D | no | Approximate Length |
| originalLanguage | a list, each one language; the value itself may be empty | no | The language of languages spoken in the creative work. |
| countryOfOrigin | a list, each one country; the value itself may be empty | no | The home country of the companies that had primary creative control of the creation of the Creative Work, generally the producers. |
| Context | a list, each entry either reference or Context; the value itself may be empty | no |  |
| Series | a list, each entry either reference or CreativeWork; the value itself may be empty | no | Series to which this Creative Work belongs |
| Season | a list, each entry either reference or CreativeWork; the value itself may be empty | no | Seasons to which this instance of Episode belongs, or that are part are part of this instance of Series. |
| Episode | a list, each entry either reference or CreativeWork; the value itself may be empty | no | Episodes that belong to this Series or Season described by the instance Creative Work |
| ProductionCompany | a list, each entry either reference or Participant; the value itself may be empty | no | The Production companies responsible for the production of this Creative Work |

### Sequence

A sequence of shots linked to creative intent.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaVersion *(borrowed)* | one of: https://movielabs.com/omc/json/schema/v2.0, https://movielabs.com/omc/json/schema/v2.1, https://movielabs.com/omc/json/schema/v2.6 | yes, always | Describes the version of OMC-JSON schema that was used to create this instance. |
| identifier *(borrowed)* | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | yes, always | Identifier |
| name *(borrowed)* | text; the value itself may be empty | no | A name for the entity, this is primarily for human consumption in things like user interfaces. It should not be considered a canonical name. |
| description *(borrowed)* | text; the value itself may be empty | no | A brief description of the entity, primarily for human consumption. |
| customData *(borrowed)* | customData | no |  |
| annotation *(borrowed)* | annotation, itself a list | no |  |
| tag *(borrowed)* | tag, itself a list | no |  |
| entityInfo *(borrowed)* | a group of fields; the value itself may be empty | no | Reserved for future use to describe specific details about the instance of the entity |
| instanceInfo *(borrowed)* | a group of fields; nothing else may be added here; the value itself may be empty | no | Properties that describe information about this particular instance of an entity. |
| instanceInfo.createdOn | either date or dateTime | no |  |
| instanceInfo.CreatedBy | either reference or Participant | no |  |
| instanceInfo.lastUpdateOn | either date or dateTime | no |  |
| instanceInfo.LastUpdateBy | either reference or Participant | no |  |
| instanceInfo.customData | customData | no |  |
| entityType | one of: Sequence | yes, always | Entity Type |
| provenance | provenance | no | Provenance |
| version | a group of fields; nothing else may be added here | no | A particular form, variant, or representation of an Asset that differs in some way from its source Asset. |
| version.versionNumber | text or a number; the value itself may be empty | no | A designation indicating a place in a sequence of versions |
| version.name | text | no | A name for this specific version of the Asset |
| version.description | text; the value itself may be empty | no | A human readable description of the version |
| version.annotation | annotation, itself a list | no |  |
| version.VariantOf | either reference or Sequence | no |  |
| version.RevisionOf | either reference or Sequence | no |  |
| version.Variant | a list, each entry either reference or Sequence | no |  |
| version.Alternative | a list, each entry either reference or Sequence | no |  |
| version.Revision | a list, each entry either reference or Sequence | no |  |
| version.customData | customData | no |  |
| sequenceType | one of: vfx, editorial, image, animation, color | no | Sequence Type |
| SCD | either reference or Asset | no | Sequence Chronology Descriptor |
| Context | a list, each entry either reference or Context; the value itself may be empty | no |  |

### customData

A user defined set of custom data in the payload of the instance, used where the formal schema lacks required properties.

A single value.

### ProductionScene

Defined either by explicit divisions in the structure of the Script, e.g., by a Slugline, or by additional capture for use in the Creative Work that is not tied to any particular Scene in the Script.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaVersion *(borrowed)* | one of: https://movielabs.com/omc/json/schema/v2.0, https://movielabs.com/omc/json/schema/v2.1, https://movielabs.com/omc/json/schema/v2.6 | yes, always | Describes the version of OMC-JSON schema that was used to create this instance. |
| identifier *(borrowed)* | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | yes, always | Identifier |
| name *(borrowed)* | text; the value itself may be empty | no | A name for the entity, this is primarily for human consumption in things like user interfaces. It should not be considered a canonical name. |
| description *(borrowed)* | text; the value itself may be empty | no | A brief description of the entity, primarily for human consumption. |
| customData *(borrowed)* | customData | no |  |
| annotation *(borrowed)* | annotation, itself a list | no |  |
| tag *(borrowed)* | tag, itself a list | no |  |
| entityInfo *(borrowed)* | a group of fields; the value itself may be empty | no | Reserved for future use to describe specific details about the instance of the entity |
| instanceInfo *(borrowed)* | a group of fields; nothing else may be added here; the value itself may be empty | no | Properties that describe information about this particular instance of an entity. |
| instanceInfo.createdOn | either date or dateTime | no |  |
| instanceInfo.CreatedBy | either reference or Participant | no |  |
| instanceInfo.lastUpdateOn | either date or dateTime | no |  |
| instanceInfo.LastUpdateBy | either reference or Participant | no |  |
| instanceInfo.customData | customData | no |  |
| entityType | one of: ProductionScene | yes, always | Entity Type |
| sceneName | basicName | no | Scene Name |
| sceneHeader | text; the value itself may be empty | no | Used when referring to the Production Scene. It is generally synonymous with Slugline and is used to divide a Script into scenes. |
| sceneDescriptor | text; the value itself may be empty | no | An alphanumeric reference to a Production Scene. |
| sceneNumber | text; the value itself may be empty | no | A number tied to a Slugline when a Script is locked |
| Context | a list, each entry either reference or Context; the value itself may be empty | no |  |

### Character

A sentient entity (usually a person but not always) in the script whose specific identity is consequential to the narrative. A Character is generally identified by a specific name.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaVersion *(borrowed)* | one of: https://movielabs.com/omc/json/schema/v2.0, https://movielabs.com/omc/json/schema/v2.1, https://movielabs.com/omc/json/schema/v2.6 | yes, always | Describes the version of OMC-JSON schema that was used to create this instance. |
| identifier *(borrowed)* | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | yes, always | Identifier |
| name *(borrowed)* | text; the value itself may be empty | no | A name for the entity, this is primarily for human consumption in things like user interfaces. It should not be considered a canonical name. |
| description *(borrowed)* | text; the value itself may be empty | no | A brief description of the entity, primarily for human consumption. |
| customData *(borrowed)* | customData | no |  |
| annotation *(borrowed)* | annotation, itself a list | no |  |
| tag *(borrowed)* | tag, itself a list | no |  |
| entityInfo *(borrowed)* | a group of fields; the value itself may be empty | no | Reserved for future use to describe specific details about the instance of the entity |
| instanceInfo *(borrowed)* | a group of fields; nothing else may be added here; the value itself may be empty | no | Properties that describe information about this particular instance of an entity. |
| instanceInfo.createdOn | either date or dateTime | no |  |
| instanceInfo.CreatedBy | either reference or Participant | no |  |
| instanceInfo.lastUpdateOn | either date or dateTime | no |  |
| instanceInfo.LastUpdateBy | either reference or Participant | no |  |
| instanceInfo.customData | customData | no |  |
| entityType | one of: Character | yes, always | Entity Type |
| characterType | one of: character, extra | no | Describes the specific type of Character, equivalent to the sub-class used in OMC-RDF. |
| characterName | completeName; for example Mrs | no | Character Name |
| profile | a group of fields; nothing else may be added here; the value itself may be empty | no | Specific details describing the character. |
| profile.physicalCharacteristics | a group of fields; the value itself may be empty | no | Allows for the the description of certain physical characteristics on a character, things that might be useful to an art department, wardrobe or casting for example. |
| profile.physicalCharacteristics.species | text; for example Human; the value itself may be empty | no | A species to which this character belongs |
| profile.physicalCharacteristics.hairColor | text; for example Brown; the value itself may be empty | no | The hair color of the character |
| profile.physicalCharacteristics.hairLength | text; the value itself may be empty | no | The length of hair of the character. |
| profile.physicalCharacteristics.eyeColor | text; the value itself may be empty | no | The color of the characters eyes. |
| profile.physicalCharacteristics.weight | weight; for example 3kg7g | no | weight |
| profile.physicalCharacteristics.height | linearDistance; for example 100m | no | height |
| profile.gender | gender | no |  |
| profile.background | one of 2 forms: a group of fields; annotation | no | Additional annotations on a characters background |
| quantity | text or a number; the value itself may be empty | no | Used to indicate a number of 'extra' characters when required. |
| Depiction | a list, each entry either reference or Depiction; the value itself may be empty | no |  |
| Context | a list, each entry either reference or Context; the value itself may be empty | no |  |

### NarrativeLocation

A location specified or implied by the narrative.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaVersion *(borrowed)* | one of: https://movielabs.com/omc/json/schema/v2.0, https://movielabs.com/omc/json/schema/v2.1, https://movielabs.com/omc/json/schema/v2.6 | yes, always | Describes the version of OMC-JSON schema that was used to create this instance. |
| identifier *(borrowed)* | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | yes, always | Identifier |
| name *(borrowed)* | text; the value itself may be empty | no | A name for the entity, this is primarily for human consumption in things like user interfaces. It should not be considered a canonical name. |
| description *(borrowed)* | text; the value itself may be empty | no | A brief description of the entity, primarily for human consumption. |
| customData *(borrowed)* | customData | no |  |
| annotation *(borrowed)* | annotation, itself a list | no |  |
| tag *(borrowed)* | tag, itself a list | no |  |
| entityInfo *(borrowed)* | a group of fields; the value itself may be empty | no | Reserved for future use to describe specific details about the instance of the entity |
| instanceInfo *(borrowed)* | a group of fields; nothing else may be added here; the value itself may be empty | no | Properties that describe information about this particular instance of an entity. |
| instanceInfo.createdOn | either date or dateTime | no |  |
| instanceInfo.CreatedBy | either reference or Participant | no |  |
| instanceInfo.lastUpdateOn | either date or dateTime | no |  |
| instanceInfo.LastUpdateBy | either reference or Participant | no |  |
| instanceInfo.customData | customData | no |  |
| entityType | one of: NarrativeLocation | yes, always | Entity Type |
| narrativeType | one of: narrativeLocation | no | Describes the specific type of Narrative Location, equivalent to the sub-class used in OMC-RDF. |
| Location | either reference or Location; the value itself may be empty | no |  |
| Context | a list, each entry either reference or Context; the value itself may be empty | no |  |
| Depiction | a list, each entry either reference or Depiction; the value itself may be empty | no |  |

### NarrativeObject

A named object related to or interacting with characters that is implied or understood to be necessary for the narrative. Includes items like props, wardrobe, set dressing and vehicles.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaVersion *(borrowed)* | one of: https://movielabs.com/omc/json/schema/v2.0, https://movielabs.com/omc/json/schema/v2.1, https://movielabs.com/omc/json/schema/v2.6 | yes, always | Describes the version of OMC-JSON schema that was used to create this instance. |
| identifier *(borrowed)* | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | yes, always | Identifier |
| name *(borrowed)* | text; the value itself may be empty | no | A name for the entity, this is primarily for human consumption in things like user interfaces. It should not be considered a canonical name. |
| description *(borrowed)* | text; the value itself may be empty | no | A brief description of the entity, primarily for human consumption. |
| customData *(borrowed)* | customData | no |  |
| annotation *(borrowed)* | annotation, itself a list | no |  |
| tag *(borrowed)* | tag, itself a list | no |  |
| entityInfo *(borrowed)* | a group of fields; the value itself may be empty | no | Reserved for future use to describe specific details about the instance of the entity |
| instanceInfo *(borrowed)* | a group of fields; nothing else may be added here; the value itself may be empty | no | Properties that describe information about this particular instance of an entity. |
| instanceInfo.createdOn | either date or dateTime | no |  |
| instanceInfo.CreatedBy | either reference or Participant | no |  |
| instanceInfo.lastUpdateOn | either date or dateTime | no |  |
| instanceInfo.LastUpdateBy | either reference or Participant | no |  |
| instanceInfo.customData | customData | no |  |
| entityType | one of: NarrativeObject | yes, always | Entity Type |
| narrativeType | one of: narrativeObject, narrativeProp, narrativeGreenery, narrativeVehicle, narrativeSetDressing | no | Describes the specific type of Narrative Object, equivalent to the sub-class used in OMC-RDF. |
| size | text; the value itself may be empty | no | Size |
| quantity | text or a number; the value itself may be empty | no | Quantity |
| Context | a list, each entry either reference or Context; the value itself may be empty | no |  |
| Depiction | a list, each entry either reference or Depiction; the value itself may be empty | no |  |

### NarrativeScene

Taken from the narrative itself and traditionally defined by creative intent and typically a unity of time, place, action, or theme.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaVersion *(borrowed)* | one of: https://movielabs.com/omc/json/schema/v2.0, https://movielabs.com/omc/json/schema/v2.1, https://movielabs.com/omc/json/schema/v2.6 | yes, always | Describes the version of OMC-JSON schema that was used to create this instance. |
| identifier *(borrowed)* | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | yes, always | Identifier |
| name *(borrowed)* | text; the value itself may be empty | no | A name for the entity, this is primarily for human consumption in things like user interfaces. It should not be considered a canonical name. |
| description *(borrowed)* | text; the value itself may be empty | no | A brief description of the entity, primarily for human consumption. |
| customData *(borrowed)* | customData | no |  |
| annotation *(borrowed)* | annotation, itself a list | no |  |
| tag *(borrowed)* | tag, itself a list | no |  |
| entityInfo *(borrowed)* | a group of fields; the value itself may be empty | no | Reserved for future use to describe specific details about the instance of the entity |
| instanceInfo *(borrowed)* | a group of fields; nothing else may be added here; the value itself may be empty | no | Properties that describe information about this particular instance of an entity. |
| instanceInfo.createdOn | either date or dateTime | no |  |
| instanceInfo.CreatedBy | either reference or Participant | no |  |
| instanceInfo.lastUpdateOn | either date or dateTime | no |  |
| instanceInfo.LastUpdateBy | either reference or Participant | no |  |
| instanceInfo.customData | customData | no |  |
| entityType | one of: NarrativeScene | yes, always | Entity Type |
| narrativeType | one of: narrativeScene | no | Describes the specific type of Narrative Scene, equivalent to the sub-class used in OMC-RDF. |
| sceneName | a group of fields; the value itself may be empty | no | A human readable name for the scene |
| sceneName.fullName | text; the value itself may be empty | no | A full descriptive name for the scene |
| sceneName.altName | text; the value itself may be empty | no | An alternate, often shorter, name used in applications to identify the scenes. |
| sceneNumber | text or a number; the value itself may be empty | no | A number used in the script to refer to the scene |
| slugline | annotation, itself a list | no | A note describing the slugline or seperate parts of the slugline |
| Context | a list, each entry either reference or Context; the value itself may be empty | no |  |

### NarrativeStyling

Styling required to prepare an actor for their role.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaVersion *(borrowed)* | one of: https://movielabs.com/omc/json/schema/v2.0, https://movielabs.com/omc/json/schema/v2.1, https://movielabs.com/omc/json/schema/v2.6 | yes, always | Describes the version of OMC-JSON schema that was used to create this instance. |
| identifier *(borrowed)* | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | yes, always | Identifier |
| name *(borrowed)* | text; the value itself may be empty | no | A name for the entity, this is primarily for human consumption in things like user interfaces. It should not be considered a canonical name. |
| description *(borrowed)* | text; the value itself may be empty | no | A brief description of the entity, primarily for human consumption. |
| customData *(borrowed)* | customData | no |  |
| annotation *(borrowed)* | annotation, itself a list | no |  |
| tag *(borrowed)* | tag, itself a list | no |  |
| entityInfo *(borrowed)* | a group of fields; the value itself may be empty | no | Reserved for future use to describe specific details about the instance of the entity |
| instanceInfo *(borrowed)* | a group of fields; nothing else may be added here; the value itself may be empty | no | Properties that describe information about this particular instance of an entity. |
| instanceInfo.createdOn | either date or dateTime | no |  |
| instanceInfo.CreatedBy | either reference or Participant | no |  |
| instanceInfo.lastUpdateOn | either date or dateTime | no |  |
| instanceInfo.LastUpdateBy | either reference or Participant | no |  |
| instanceInfo.customData | customData | no |  |
| entityType | one of: NarrativeStyling | yes, always | Entity Type |
| narrativeType | one of: narrativeStyling, narrativeHair, narrativeMakeup, narrativeProsthetics | no | Describes the specific type of Narrative Styling, equivalent to the sub-class used in OMC-RDF. |
| Context | a list, each entry either reference or Context; the value itself may be empty | no |  |
| Depiction | a list, each entry either reference or Depiction; the value itself may be empty | no |  |

### NarrativeWardrobe

The clothing for a Character in the narrative.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaVersion *(borrowed)* | one of: https://movielabs.com/omc/json/schema/v2.0, https://movielabs.com/omc/json/schema/v2.1, https://movielabs.com/omc/json/schema/v2.6 | yes, always | Describes the version of OMC-JSON schema that was used to create this instance. |
| identifier *(borrowed)* | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | yes, always | Identifier |
| name *(borrowed)* | text; the value itself may be empty | no | A name for the entity, this is primarily for human consumption in things like user interfaces. It should not be considered a canonical name. |
| description *(borrowed)* | text; the value itself may be empty | no | A brief description of the entity, primarily for human consumption. |
| customData *(borrowed)* | customData | no |  |
| annotation *(borrowed)* | annotation, itself a list | no |  |
| tag *(borrowed)* | tag, itself a list | no |  |
| entityInfo *(borrowed)* | a group of fields; the value itself may be empty | no | Reserved for future use to describe specific details about the instance of the entity |
| instanceInfo *(borrowed)* | a group of fields; nothing else may be added here; the value itself may be empty | no | Properties that describe information about this particular instance of an entity. |
| instanceInfo.createdOn | either date or dateTime | no |  |
| instanceInfo.CreatedBy | either reference or Participant | no |  |
| instanceInfo.lastUpdateOn | either date or dateTime | no |  |
| instanceInfo.LastUpdateBy | either reference or Participant | no |  |
| instanceInfo.customData | customData | no |  |
| entityType | one of: NarrativeWardrobe | yes, always | Entity Type |
| narrativeType | one of: narrativeWardrobe | no | Describes the specific type of Narrative Wardrobe, equivalent to the sub-class used in OMC-RDF. |
| Context | a list, each entry either reference or Context; the value itself may be empty | no |  |
| Depiction | a list, each entry either reference or Depiction; the value itself may be empty | no |  |

### NarrativeAudio

A named piece of audio significant to the narrative.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaVersion *(borrowed)* | one of: https://movielabs.com/omc/json/schema/v2.0, https://movielabs.com/omc/json/schema/v2.1, https://movielabs.com/omc/json/schema/v2.6 | yes, always | Describes the version of OMC-JSON schema that was used to create this instance. |
| identifier *(borrowed)* | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | yes, always | Identifier |
| name *(borrowed)* | text; the value itself may be empty | no | A name for the entity, this is primarily for human consumption in things like user interfaces. It should not be considered a canonical name. |
| description *(borrowed)* | text; the value itself may be empty | no | A brief description of the entity, primarily for human consumption. |
| customData *(borrowed)* | customData | no |  |
| annotation *(borrowed)* | annotation, itself a list | no |  |
| tag *(borrowed)* | tag, itself a list | no |  |
| entityInfo *(borrowed)* | a group of fields; the value itself may be empty | no | Reserved for future use to describe specific details about the instance of the entity |
| instanceInfo *(borrowed)* | a group of fields; nothing else may be added here; the value itself may be empty | no | Properties that describe information about this particular instance of an entity. |
| instanceInfo.createdOn | either date or dateTime | no |  |
| instanceInfo.CreatedBy | either reference or Participant | no |  |
| instanceInfo.lastUpdateOn | either date or dateTime | no |  |
| instanceInfo.LastUpdateBy | either reference or Participant | no |  |
| instanceInfo.customData | customData | no |  |
| entityType | one of: NarrativeAudio | yes, always | Entity Type |
| narrativeType | one of: narrativeAudio, narrativeMusic, narrativeSoundEffect | no | Describes the specific type of Narrative Audio, equivalent to the sub-class used in OMC-RDF. |
| Depiction | a list, each entry either reference or Depiction; the value itself may be empty | no |  |
| Context | a list, each entry either reference or Context; the value itself may be empty | no |  |

### SpecialAction

An action or set of actions that are performed and require additional choreography or supervision.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaVersion *(borrowed)* | one of: https://movielabs.com/omc/json/schema/v2.0, https://movielabs.com/omc/json/schema/v2.1, https://movielabs.com/omc/json/schema/v2.6 | yes, always | Describes the version of OMC-JSON schema that was used to create this instance. |
| identifier *(borrowed)* | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | yes, always | Identifier |
| name *(borrowed)* | text; the value itself may be empty | no | A name for the entity, this is primarily for human consumption in things like user interfaces. It should not be considered a canonical name. |
| description *(borrowed)* | text; the value itself may be empty | no | A brief description of the entity, primarily for human consumption. |
| customData *(borrowed)* | customData | no |  |
| annotation *(borrowed)* | annotation, itself a list | no |  |
| tag *(borrowed)* | tag, itself a list | no |  |
| entityInfo *(borrowed)* | a group of fields; the value itself may be empty | no | Reserved for future use to describe specific details about the instance of the entity |
| instanceInfo *(borrowed)* | a group of fields; nothing else may be added here; the value itself may be empty | no | Properties that describe information about this particular instance of an entity. |
| instanceInfo.createdOn | either date or dateTime | no |  |
| instanceInfo.CreatedBy | either reference or Participant | no |  |
| instanceInfo.lastUpdateOn | either date or dateTime | no |  |
| instanceInfo.LastUpdateBy | either reference or Participant | no |  |
| instanceInfo.customData | customData | no |  |
| entityType | one of 2 forms: a fixed value; a fixed value | yes, always |  |
| specialActionType | one of: stunt, choreography, fight, motionCapture, marine, aerial, specialAction | no | A categorization of the type action. |
| Context | a list, each entry either reference or Context; the value itself may be empty | no |  |

### Location

A particular place or position either in either the real world or the narrative world.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaVersion *(borrowed)* | one of: https://movielabs.com/omc/json/schema/v2.0, https://movielabs.com/omc/json/schema/v2.1, https://movielabs.com/omc/json/schema/v2.6 | yes, always | Describes the version of OMC-JSON schema that was used to create this instance. |
| identifier *(borrowed)* | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | yes, always | Identifier |
| name *(borrowed)* | text; the value itself may be empty | no | A name for the entity, this is primarily for human consumption in things like user interfaces. It should not be considered a canonical name. |
| description *(borrowed)* | text; the value itself may be empty | no | A brief description of the entity, primarily for human consumption. |
| customData *(borrowed)* | customData | no |  |
| annotation *(borrowed)* | annotation, itself a list | no |  |
| tag *(borrowed)* | tag, itself a list | no |  |
| entityInfo *(borrowed)* | a group of fields; the value itself may be empty | no | Reserved for future use to describe specific details about the instance of the entity |
| instanceInfo *(borrowed)* | a group of fields; nothing else may be added here; the value itself may be empty | no | Properties that describe information about this particular instance of an entity. |
| instanceInfo.createdOn | either date or dateTime | no |  |
| instanceInfo.CreatedBy | either reference or Participant | no |  |
| instanceInfo.lastUpdateOn | either date or dateTime | no |  |
| instanceInfo.LastUpdateBy | either reference or Participant | no |  |
| instanceInfo.customData | customData | no |  |
| entityType | one of: Location | yes, always | Entity Type |
| address | address; for example 1600 Amphitheater Parkway | no | Address |
| coordinates | coordinates | no | Coordinates |
| Context | a list, each entry either reference or Context; the value itself may be empty | no |  |

### Effect

An on screen visual effect considered essential to the narrative.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaVersion *(borrowed)* | one of: https://movielabs.com/omc/json/schema/v2.0, https://movielabs.com/omc/json/schema/v2.1, https://movielabs.com/omc/json/schema/v2.6 | yes, always | Describes the version of OMC-JSON schema that was used to create this instance. |
| identifier *(borrowed)* | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | yes, always | Identifier |
| name *(borrowed)* | text; the value itself may be empty | no | A name for the entity, this is primarily for human consumption in things like user interfaces. It should not be considered a canonical name. |
| description *(borrowed)* | text; the value itself may be empty | no | A brief description of the entity, primarily for human consumption. |
| customData *(borrowed)* | customData | no |  |
| annotation *(borrowed)* | annotation, itself a list | no |  |
| tag *(borrowed)* | tag, itself a list | no |  |
| entityInfo *(borrowed)* | a group of fields; the value itself may be empty | no | Reserved for future use to describe specific details about the instance of the entity |
| instanceInfo *(borrowed)* | a group of fields; nothing else may be added here; the value itself may be empty | no | Properties that describe information about this particular instance of an entity. |
| instanceInfo.createdOn | either date or dateTime | no |  |
| instanceInfo.CreatedBy | either reference or Participant | no |  |
| instanceInfo.lastUpdateOn | either date or dateTime | no |  |
| instanceInfo.LastUpdateBy | either reference or Participant | no |  |
| instanceInfo.customData | customData | no |  |
| entityType | one of: Effect | yes, always | Entity Type |
| effectType | one of: effect, specialEffect, visualEffect | no | A categorization of the type of effect. |
| Context | a list, each entry either reference or Context; the value itself may be empty | no |  |

### ProductionLocation

A real place that is used to depict the Narrative Location or used for creating the production.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaVersion *(borrowed)* | one of: https://movielabs.com/omc/json/schema/v2.0, https://movielabs.com/omc/json/schema/v2.1, https://movielabs.com/omc/json/schema/v2.6 | yes, always | Describes the version of OMC-JSON schema that was used to create this instance. |
| identifier *(borrowed)* | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | yes, always | Identifier |
| name *(borrowed)* | text; the value itself may be empty | no | A name for the entity, this is primarily for human consumption in things like user interfaces. It should not be considered a canonical name. |
| description *(borrowed)* | text; the value itself may be empty | no | A brief description of the entity, primarily for human consumption. |
| customData *(borrowed)* | customData | no |  |
| annotation *(borrowed)* | annotation, itself a list | no |  |
| tag *(borrowed)* | tag, itself a list | no |  |
| entityInfo *(borrowed)* | a group of fields; the value itself may be empty | no | Reserved for future use to describe specific details about the instance of the entity |
| instanceInfo *(borrowed)* | a group of fields; nothing else may be added here; the value itself may be empty | no | Properties that describe information about this particular instance of an entity. |
| instanceInfo.createdOn | either date or dateTime | no |  |
| instanceInfo.CreatedBy | either reference or Participant | no |  |
| instanceInfo.lastUpdateOn | either date or dateTime | no |  |
| instanceInfo.LastUpdateBy | either reference or Participant | no |  |
| instanceInfo.customData | customData | no |  |
| entityType | one of: ProductionLocation | yes, always | Entity Type |
| locationType | one of: production, shooting | no | Describes whether this is production location or more specifically a shooting location |
| Location | either reference or Location; the value itself may be empty | no |  |
| Context | a list, each entry either reference or Context; the value itself may be empty | no |  |

### Slate

Used to capture key identifying information about what is being recorded on any given setup and take.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaVersion *(borrowed)* | one of: https://movielabs.com/omc/json/schema/v2.0, https://movielabs.com/omc/json/schema/v2.1, https://movielabs.com/omc/json/schema/v2.6 | yes, always | Describes the version of OMC-JSON schema that was used to create this instance. |
| identifier *(borrowed)* | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | yes, always | Identifier |
| name *(borrowed)* | text; the value itself may be empty | no | A name for the entity, this is primarily for human consumption in things like user interfaces. It should not be considered a canonical name. |
| description *(borrowed)* | text; the value itself may be empty | no | A brief description of the entity, primarily for human consumption. |
| customData *(borrowed)* | customData | no |  |
| annotation *(borrowed)* | annotation, itself a list | no |  |
| tag *(borrowed)* | tag, itself a list | no |  |
| entityInfo *(borrowed)* | a group of fields; the value itself may be empty | no | Reserved for future use to describe specific details about the instance of the entity |
| instanceInfo *(borrowed)* | a group of fields; nothing else may be added here; the value itself may be empty | no | Properties that describe information about this particular instance of an entity. |
| instanceInfo.createdOn | either date or dateTime | no |  |
| instanceInfo.CreatedBy | either reference or Participant | no |  |
| instanceInfo.lastUpdateOn | either date or dateTime | no |  |
| instanceInfo.LastUpdateBy | either reference or Participant | no |  |
| instanceInfo.customData | customData | no |  |
| entityType | one of: Slate | yes, always | Entity Type |
| slateUID | text; the value itself may be empty | no | Slate Unique Identifier |
| cameraLabel | text; the value itself may be empty | no | Label for the Camera responsible for the Capture, usually related to the role and responsibility of the group operating it and usually a single upper-case letter starting with A. |
| cameraUnit | text; the value itself may be empty | no | A group of Participants responsible for shooting some element of a Scene, e.g., a Main Unit or Second Unit. |
| cameraRoll | text; the value itself may be empty | no | Identifier for a group of events captured together on the same camera on the same media. |
| soundRoll | text; the value itself may be empty | no | Identifier for a group of audio events captured together on the same recording device and same media. |
| shootDate | date; for example 2020-11-21 | no | The date of capture or creation |
| shootDay | a number or text; the value itself may be empty | no | The number of the day on the shooting schedule. |
| recordingFPS | a number; the value itself may be empty | no | Frames per second recorded by the camera. |
| CreativeWork | either reference or CreativeWork | no | Creative Work |
| Director | a list, each entry either reference or Participant; the value itself may be empty | no | Director |
| Context | a list, each entry either reference or Context; the value itself may be empty | no |  |

### annotation

Human readable commentary, explanation, or information.

This one is a list. The fields below describe a single entry. Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| author | text; the value itself may be empty | no | Who wrote or added this annotation. |
| title | text; the value itself may be empty | no | A title for the note or annotation. |
| text | text; the value itself may be empty | no | The text of the note or annotation. |

### Infrastructure

The underlying systems and framework required for the production of the Creative Work; it is generally not specific to a particular Creative Work.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaVersion *(borrowed)* | one of: https://movielabs.com/omc/json/schema/v2.0, https://movielabs.com/omc/json/schema/v2.1, https://movielabs.com/omc/json/schema/v2.6 | yes, always | Describes the version of OMC-JSON schema that was used to create this instance. |
| identifier *(borrowed)* | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | yes, always | Identifier |
| name *(borrowed)* | text; the value itself may be empty | no | A name for the entity, this is primarily for human consumption in things like user interfaces. It should not be considered a canonical name. |
| description *(borrowed)* | text; the value itself may be empty | no | A brief description of the entity, primarily for human consumption. |
| customData *(borrowed)* | customData | no |  |
| annotation *(borrowed)* | annotation, itself a list | no |  |
| tag *(borrowed)* | tag, itself a list | no |  |
| entityInfo *(borrowed)* | a group of fields; the value itself may be empty | no | Reserved for future use to describe specific details about the instance of the entity |
| instanceInfo *(borrowed)* | a group of fields; nothing else may be added here; the value itself may be empty | no | Properties that describe information about this particular instance of an entity. |
| instanceInfo.createdOn | either date or dateTime | no |  |
| instanceInfo.CreatedBy | either reference or Participant | no |  |
| instanceInfo.lastUpdateOn | either date or dateTime | no |  |
| instanceInfo.LastUpdateBy | either reference or Participant | no |  |
| instanceInfo.customData | customData | no |  |
| entityType | one of: Infrastructure | yes, always | Entity Type |
| InfrastructureSC | either reference or InfrastructureSC | no | Structural Characteristics |
| infrastructureFC | infrastructureFC | no | Functional Characteristics |
| Context | a list, each entry either reference or Context; the value itself may be empty | no |  |

### contact

Means by which the subject of an entity may be contacted in the production.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| email | email | no | Email |
| telephone | telephone | no | Telephone |

### Role

A set of properties that define the role of a participant within the production

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaVersion *(borrowed)* | one of: https://movielabs.com/omc/json/schema/v2.0, https://movielabs.com/omc/json/schema/v2.1, https://movielabs.com/omc/json/schema/v2.6 | yes, always | Describes the version of OMC-JSON schema that was used to create this instance. |
| identifier *(borrowed)* | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | yes, always | Identifier |
| name *(borrowed)* | text; the value itself may be empty | no | A name for the entity, this is primarily for human consumption in things like user interfaces. It should not be considered a canonical name. |
| description *(borrowed)* | text; the value itself may be empty | no | A brief description of the entity, primarily for human consumption. |
| customData *(borrowed)* | customData | no |  |
| annotation *(borrowed)* | annotation, itself a list | no |  |
| tag *(borrowed)* | tag, itself a list | no |  |
| entityInfo *(borrowed)* | a group of fields; the value itself may be empty | no | Reserved for future use to describe specific details about the instance of the entity |
| instanceInfo *(borrowed)* | a group of fields; nothing else may be added here; the value itself may be empty | no | Properties that describe information about this particular instance of an entity. |
| instanceInfo.createdOn | either date or dateTime | no |  |
| instanceInfo.CreatedBy | either reference or Participant | no |  |
| instanceInfo.lastUpdateOn | either date or dateTime | no |  |
| instanceInfo.LastUpdateBy | either reference or Participant | no |  |
| instanceInfo.customData | customData | no |  |
| entityType | one of: Role | yes, always | Entity Type |
| roleType | text | no | The specific role, typically used in authorization systems |

### basicName

A canonical name and alternative name for the entity.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| fullName | text; the value itself may be empty | no | The full an complete name of the entity. |
| altName | text; the value itself may be empty | no | An alternate, often shortened name for the entity. |

### provenance

A record of when something was changed and by whom.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| CreatedBy | either reference or Participant | no |  |
| createdOn | dateTime; for example 2023-08-24T20:51:15Z 2023-08-24T20:51:15.56Z 2023-08-24T20:51:15+08:00 2023-08-24T20:51:15.23-04:00 | no |  |
| Role | either reference or Role | no |  |
| Origin | either reference or Asset | no |  |
| reason | text; the value itself may be empty | no |  |
| annotation | annotation, itself a list | no |  |

### date

Should be formatted to comply with ISO 8601

A single value, for example 2020-11-21.

### InfrastructureSC

Describes the form of the Infrastructure along with the attributes specific to that infrastructure's form

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaVersion *(borrowed)* | one of: https://movielabs.com/omc/json/schema/v2.0, https://movielabs.com/omc/json/schema/v2.1, https://movielabs.com/omc/json/schema/v2.6 | yes, always | Describes the version of OMC-JSON schema that was used to create this instance. |
| identifier *(borrowed)* | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | yes, always | Identifier |
| name *(borrowed)* | text; the value itself may be empty | no | A name for the entity, this is primarily for human consumption in things like user interfaces. It should not be considered a canonical name. |
| description *(borrowed)* | text; the value itself may be empty | no | A brief description of the entity, primarily for human consumption. |
| customData *(borrowed)* | customData | no |  |
| annotation *(borrowed)* | annotation, itself a list | no |  |
| tag *(borrowed)* | tag, itself a list | no |  |
| entityInfo *(borrowed)* | a group of fields; the value itself may be empty | no | Reserved for future use to describe specific details about the instance of the entity |
| instanceInfo *(borrowed)* | a group of fields; nothing else may be added here; the value itself may be empty | no | Properties that describe information about this particular instance of an entity. |
| instanceInfo.createdOn | either date or dateTime | no |  |
| instanceInfo.CreatedBy | either reference or Participant | no |  |
| instanceInfo.lastUpdateOn | either date or dateTime | no |  |
| instanceInfo.LastUpdateBy | either reference or Participant | no |  |
| instanceInfo.customData | customData | no |  |
| entityType | one of: InfrastructureSC | yes, always | Entity Type |
| structuralType | text; the value itself may be empty | no | A structured description of the the Infrastructures form |
| structuralProperties | a group of fields; the value itself may be empty | no | A set of properties that describe the infrastructure in this form |

### Person

People are the individuals that are associated with the production

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaVersion *(borrowed)* | one of: https://movielabs.com/omc/json/schema/v2.0, https://movielabs.com/omc/json/schema/v2.1, https://movielabs.com/omc/json/schema/v2.6 | yes, always | Describes the version of OMC-JSON schema that was used to create this instance. |
| identifier *(borrowed)* | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | yes, always | Identifier |
| name *(borrowed)* | text; the value itself may be empty | no | A name for the entity, this is primarily for human consumption in things like user interfaces. It should not be considered a canonical name. |
| description *(borrowed)* | text; the value itself may be empty | no | A brief description of the entity, primarily for human consumption. |
| customData *(borrowed)* | customData | no |  |
| annotation *(borrowed)* | annotation, itself a list | no |  |
| tag *(borrowed)* | tag, itself a list | no |  |
| entityInfo *(borrowed)* | a group of fields; the value itself may be empty | no | Reserved for future use to describe specific details about the instance of the entity |
| instanceInfo *(borrowed)* | a group of fields; nothing else may be added here; the value itself may be empty | no | Properties that describe information about this particular instance of an entity. |
| instanceInfo.createdOn | either date or dateTime | no |  |
| instanceInfo.CreatedBy | either reference or Participant | no |  |
| instanceInfo.lastUpdateOn | either date or dateTime | no |  |
| instanceInfo.LastUpdateBy | either reference or Participant | no |  |
| instanceInfo.customData | customData | no |  |
| entityType | one of: Person | yes, always | Entity Type |
| structuralType | one of: person | no | Person's Structural Type |
| jobTitle | text; the value itself may be empty | no | A persons job title (as distinct from a specific role). |
| Location | either reference or Location; the value itself may be empty | no |  |
| gender | gender | no | Person's Gender |
| contact | contact | no | Contact information for the Person |
| personName | completeName; for example Mrs | no | The canonical name or set of names and titles for the Person |

### Department

Part of a larger Organization with a particular set of responsibilities on the production.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaVersion *(borrowed)* | one of: https://movielabs.com/omc/json/schema/v2.0, https://movielabs.com/omc/json/schema/v2.1, https://movielabs.com/omc/json/schema/v2.6 | yes, always | Describes the version of OMC-JSON schema that was used to create this instance. |
| identifier *(borrowed)* | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | yes, always | Identifier |
| name *(borrowed)* | text; the value itself may be empty | no | A name for the entity, this is primarily for human consumption in things like user interfaces. It should not be considered a canonical name. |
| description *(borrowed)* | text; the value itself may be empty | no | A brief description of the entity, primarily for human consumption. |
| customData *(borrowed)* | customData | no |  |
| annotation *(borrowed)* | annotation, itself a list | no |  |
| tag *(borrowed)* | tag, itself a list | no |  |
| entityInfo *(borrowed)* | a group of fields; the value itself may be empty | no | Reserved for future use to describe specific details about the instance of the entity |
| instanceInfo *(borrowed)* | a group of fields; nothing else may be added here; the value itself may be empty | no | Properties that describe information about this particular instance of an entity. |
| instanceInfo.createdOn | either date or dateTime | no |  |
| instanceInfo.CreatedBy | either reference or Participant | no |  |
| instanceInfo.lastUpdateOn | either date or dateTime | no |  |
| instanceInfo.LastUpdateBy | either reference or Participant | no |  |
| instanceInfo.customData | customData | no |  |
| entityType | one of: Department | yes, always | Entity Type |
| structuralType | one of: department | no | Department's Structural Type |
| departmentName | basicName | no | Department's Name |
| contact | contact | no | Department's Contact |
| Location | either reference or Location; the value itself may be empty | no |  |

### Organization

A legal entity or groups of people associated with the production.. with a particular purpose relative to the production.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaVersion *(borrowed)* | one of: https://movielabs.com/omc/json/schema/v2.0, https://movielabs.com/omc/json/schema/v2.1, https://movielabs.com/omc/json/schema/v2.6 | yes, always | Describes the version of OMC-JSON schema that was used to create this instance. |
| identifier *(borrowed)* | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | yes, always | Identifier |
| name *(borrowed)* | text; the value itself may be empty | no | A name for the entity, this is primarily for human consumption in things like user interfaces. It should not be considered a canonical name. |
| description *(borrowed)* | text; the value itself may be empty | no | A brief description of the entity, primarily for human consumption. |
| customData *(borrowed)* | customData | no |  |
| annotation *(borrowed)* | annotation, itself a list | no |  |
| tag *(borrowed)* | tag, itself a list | no |  |
| entityInfo *(borrowed)* | a group of fields; the value itself may be empty | no | Reserved for future use to describe specific details about the instance of the entity |
| instanceInfo *(borrowed)* | a group of fields; nothing else may be added here; the value itself may be empty | no | Properties that describe information about this particular instance of an entity. |
| instanceInfo.createdOn | either date or dateTime | no |  |
| instanceInfo.CreatedBy | either reference or Participant | no |  |
| instanceInfo.lastUpdateOn | either date or dateTime | no |  |
| instanceInfo.LastUpdateBy | either reference or Participant | no |  |
| instanceInfo.customData | customData | no |  |
| entityType | one of: Organization | yes, always | Entity Type |
| structuralType | one of: organization | no | Organization's Structural Type |
| organizationName | basicName | no | Organization's Name |
| contact | contact | no | Organization's Contact |
| Location | either reference or Location; the value itself may be empty | no |  |

### Service

A computer driven agent that can perform tasks given the proper context and structured data.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaVersion *(borrowed)* | one of: https://movielabs.com/omc/json/schema/v2.0, https://movielabs.com/omc/json/schema/v2.1, https://movielabs.com/omc/json/schema/v2.6 | yes, always | Describes the version of OMC-JSON schema that was used to create this instance. |
| identifier *(borrowed)* | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | yes, always | Identifier |
| name *(borrowed)* | text; the value itself may be empty | no | A name for the entity, this is primarily for human consumption in things like user interfaces. It should not be considered a canonical name. |
| description *(borrowed)* | text; the value itself may be empty | no | A brief description of the entity, primarily for human consumption. |
| customData *(borrowed)* | customData | no |  |
| annotation *(borrowed)* | annotation, itself a list | no |  |
| tag *(borrowed)* | tag, itself a list | no |  |
| entityInfo *(borrowed)* | a group of fields; the value itself may be empty | no | Reserved for future use to describe specific details about the instance of the entity |
| instanceInfo *(borrowed)* | a group of fields; nothing else may be added here; the value itself may be empty | no | Properties that describe information about this particular instance of an entity. |
| instanceInfo.createdOn | either date or dateTime | no |  |
| instanceInfo.CreatedBy | either reference or Participant | no |  |
| instanceInfo.lastUpdateOn | either date or dateTime | no |  |
| instanceInfo.LastUpdateBy | either reference or Participant | no |  |
| instanceInfo.customData | customData | no |  |
| entityType | one of: Service | yes, always | Entity Type |
| structuralType | one of: service | no | Service's Structural Type |
| serviceName | basicName | no | Service's Name |
| contact | contact | no | Service's Contact |

### TaskSC

Describes the form of Task along with the attributes specific to that task’s form

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaVersion *(borrowed)* | one of: https://movielabs.com/omc/json/schema/v2.0, https://movielabs.com/omc/json/schema/v2.1, https://movielabs.com/omc/json/schema/v2.6 | yes, always | Describes the version of OMC-JSON schema that was used to create this instance. |
| identifier *(borrowed)* | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | yes, always | Identifier |
| name *(borrowed)* | text; the value itself may be empty | no | A name for the entity, this is primarily for human consumption in things like user interfaces. It should not be considered a canonical name. |
| description *(borrowed)* | text; the value itself may be empty | no | A brief description of the entity, primarily for human consumption. |
| customData *(borrowed)* | customData | no |  |
| annotation *(borrowed)* | annotation, itself a list | no |  |
| tag *(borrowed)* | tag, itself a list | no |  |
| entityInfo *(borrowed)* | a group of fields; the value itself may be empty | no | Reserved for future use to describe specific details about the instance of the entity |
| instanceInfo *(borrowed)* | a group of fields; nothing else may be added here; the value itself may be empty | no | Properties that describe information about this particular instance of an entity. |
| instanceInfo.createdOn | either date or dateTime | no |  |
| instanceInfo.CreatedBy | either reference or Participant | no |  |
| instanceInfo.lastUpdateOn | either date or dateTime | no |  |
| instanceInfo.LastUpdateBy | either reference or Participant | no |  |
| instanceInfo.customData | customData | no |  |
| entityType | one of: TaskSC | yes, always | Entity Type |
| structuralType | text; the value itself may be empty | no | A structured description of the the Tasks form |
| structuralProperties | a group of fields; the value itself may be empty | no | A set of properties that describe the Task in this form |
| structuralProperties.customData | customData | no |  |

### language

An IETF BCP 47 language code.

A single value.

### baseVersion

The base properties that describe a version of something (Asset or Composition).

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| versionNumber | text or a number; the value itself may be empty | no | A designation indicating a place in a sequence of versions |
| name | text; the value itself may be empty | no | A name for this specific version of the Asset |
| description | text; the value itself may be empty | no | A human readable description of the version |
| annotation | annotation, itself a list | no |  |
| customData | customData | no |  |

### dateTime

Should be formatted to comply with ISO 8601

A single value, for example 2023-08-24T20:51:15Z
2023-08-24T20:51:15.56Z
2023-08-24T20:51:15+08:00
2023-08-24T20:51:15.23-04:00.

### Task

A piece of work to be done and completed as a step in the production process.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| schemaVersion *(borrowed)* | one of: https://movielabs.com/omc/json/schema/v2.0, https://movielabs.com/omc/json/schema/v2.1, https://movielabs.com/omc/json/schema/v2.6 | yes, always | Describes the version of OMC-JSON schema that was used to create this instance. |
| identifier *(borrowed)* | identifier, itself a list; for example URN:ID:IdentifierScope:IdentifierValue | yes, always | Identifier |
| name *(borrowed)* | text; the value itself may be empty | no | A name for the entity, this is primarily for human consumption in things like user interfaces. It should not be considered a canonical name. |
| description *(borrowed)* | text; the value itself may be empty | no | A brief description of the entity, primarily for human consumption. |
| customData *(borrowed)* | customData | no |  |
| annotation *(borrowed)* | annotation, itself a list | no |  |
| tag *(borrowed)* | tag, itself a list | no |  |
| entityInfo *(borrowed)* | a group of fields; the value itself may be empty | no | Reserved for future use to describe specific details about the instance of the entity |
| instanceInfo *(borrowed)* | a group of fields; nothing else may be added here; the value itself may be empty | no | Properties that describe information about this particular instance of an entity. |
| instanceInfo.createdOn | either date or dateTime | no |  |
| instanceInfo.CreatedBy | either reference or Participant | no |  |
| instanceInfo.lastUpdateOn | either date or dateTime | no |  |
| instanceInfo.LastUpdateBy | either reference or Participant | no |  |
| instanceInfo.customData | customData | no |  |
| entityType | one of: Task | yes, always | Entity Type |
| TaskSC | either reference or TaskSC | no | Task Structural Characteristics |
| taskFC | taskFC | no | Task Functional Characteristics |
| Context | a list, each entry either reference or Context; the value itself may be empty | no |  |

### identifier

An identifier uniquely identifies an entity within a particular scope.

This one is a list. The fields below describe a single entry. Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| identifierScope | text | yes, always | The universe within which an identifier is valid and unique. |
| identifierValue | text | yes, always | A string of characters that uniquely identifies an object within a particular scope. |
| combinedForm | text; for example URN:ID:IdentifierScope:IdentifierValue | no | A combination of the Identifier Scope and Value that is useful for utilizing the identifier in a system. |
| url | text | no | A URL or IRI that can be used for resolving the Identifier Value within the Identifier Scope. |

### country

An ISO 3166-1 alpha-2 country code.

A single value, for example US.

### gender

A person, or others, expressed or preferred gender and pronoun.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| gender | one of: nothing, male, female, other, unknown | no | The gender by which an individual identifies |
| genderPronoun | one of: he/him, she/her, ze/hir, they/their, nothing | no | An individuals pronoun of choice. |

### completeName

A detailed description of a person, or others, name and variants of their name.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| firstGivenName | text; the value itself may be empty | no | A person's first name, also referred to as given name. |
| secondGivenName | text; the value itself may be empty | no | A persons second given name, also referred to as middle name. |
| familyName | text; the value itself may be empty | no | A persons family name, also referred to as surname. |
| fullName | text; the value itself may be empty | no | A complete name, typically a conjunction of familyName, firstGivenName and possibly other fields. |
| birthName | text; the value itself may be empty | no | A persons name at birth, also referred to as maiden name. |
| primaryName | text; the value itself may be empty | no | A persons primary name, one they typically use, also often a combination of first, second and family name. |
| pseudonym | text; the value itself may be empty | no | Pseudonym |
| altName | text; the value itself may be empty | no | Alternate Name |
| translatedName | text; the value itself may be empty | no | Translated Name |
| nickname | text; the value itself may be empty | no | Nickname |
| moniker | text; the value itself may be empty | no | Moniker |
| alias | text; the value itself may be empty | no | An alias being used by a person often used to disguise someones real identity, sometimes used when booking hotel rooms or restaurants. |
| contractualName | text; the value itself may be empty | no | Contractual Name |
| displayName | text; the value itself may be empty | no | Display Name |
| sortName | text; the value itself may be empty | no | Sort Name |
| scriptName | text; the value itself may be empty | no | Script Name |
| prefix | text; for example Mrs; the value itself may be empty | no | A prefix that can indicate a persons gender or title |
| suffix | text; for example MBE; the value itself may be empty | no | A suffix, often used to indicate a title or classification |

### boundingBox

The minimum axis-aligned right rectangular prism in the local space of the Geometry that fully encloses the Geometry.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| corner1 | point3 | no |  |
| corner2 | point3 | no |  |

### coordinateOrientation

The direction and handedness of the axes used in the geometry.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| handedness | one of: nothing, left, right | no |  |
| upAxis | one of: nothing, y-up, z-up | no |  |

### levelOfDetail

Percentage of the screen that an object can reasonably take up.

A single value.

### point3

A point with three coordinates.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| x | a number | no |  |
| y | a number | no |  |
| z | a number | no |  |

### scale

The number of “real” units represented by a single unit in the coordinate space of the Geometry.

A single value.

### purpose

A suggested or intended use for the object in a pipeline.

A single value.

### audioContent

Identification of the content type in a particular Audio Asset.

This one is a list. The fields below describe a single entry.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| mcaContent | text; the value itself may be empty | no | Indicates the nature of the content. |
| mcaContentSubtype | text; the value itself may be empty | no | Granular indication of the nature of the content if required. |
| language | language | no |  |

### soundfield

The acoustical space created by simultaneously reproducing one or more Audio Channels.

A single value.

### rootEntity

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| entityType *(borrowed)* | one of: Asset, AssetSC, Infrastructure, InfrastructureSC, Character, Context, CreativeWork, Depiction, Effect, NarrativeAction, NarrativeAudio, NarrativeLocation, NarrativeObject, NarrativeScene, NarrativeStyling, NarrativeWardrobe, ProductionLocation, ProductionScene, Sequence, Slate, SpecialAction, Department, Organization, Participant, Person, Role, Service, Task, TaskSC, Composition, Location | yes, always |  |

### linearDistance

Encode a measurement of distance using the imperial or metric system

A single value, for example 100m.

### infrastructureFC

Describes the use or purpose of an Infrastructure within the production process

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| functionalType | text; the value itself may be empty | no | The use or purpose of a Task within the production process. |
| functionalProperties | a group of fields; the value itself may be empty | no | A set of properties that describe the tasks functional use |
| customData | customData | no |  |

### taskFC

Describes the purpose of the Task within the production process

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| functionalType | text; the value itself may be empty | no | The use or purpose of a Task within the production process. |
| functionalProperties | a group of fields; the value itself may be empty | no | A set of properties that describe the tasks functional use |
| functionalProperties.customData | customData | no |  |
| customData | customData | no |  |

### tag

A short string from a particular set, used for categorization and description

This one is a list. The fields below describe a single entry. Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| domain | text; the value itself may be empty | no | An indication of the set or system in which the tag values are relevant or defined. |
| value | a list, each one text or a number; the value itself may be empty | no | A set of tags taken from the domain. |

### address

A postal address or identifiable location of a place or building

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| street | text; for example 1600 Amphitheater Parkway; the value itself may be empty | no | The street address |
| locality | text; for example Mountain View; the value itself may be empty | no | The locality in which the street address is, and which is in the region. |
| region | text; for example California; the value itself may be empty | no | The region in which the locality is, and which is in the country. |
| postalCode | text; for example 94534; the value itself may be empty | no | A zip or postal code. |
| country | country; for example US | no | Country |

### coordinates

A global positioning coordinate in compliance with WGS 84

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| latitude | a number; from -90 to 90; the value itself may be empty | no | Latitude |
| longitude | a number; from -180 to 180; the value itself may be empty | no | Longitude |

### email

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| business | text; the value itself may be empty | no | Business |
| personal | text; the value itself may be empty | no | Personal |

### telephone

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| business | text; the value itself may be empty | no | Business |
| personal | text; the value itself may be empty | no | Personal |

### codec

The specific codec used to encode the Asset.

A single value.

### rootObject

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| Asset | a list, each one Asset | no | Asset |
| AssetSC | a list, each one AssetSC | no | Asset Structural Characteristics |
| Infrastructure | a list, each one Infrastructure | no | Infrastructure |
| InfrastructureSC | a list, each one InfrastructureSC | no | InfrastructureSC |
| Character | a list, each one Character | no | Character |
| Context | a list, each one Context | no | Context |
| CreativeWork | a list, each one CreativeWork | no | Creative Work |
| Depiction | a list, each one Depiction | no | Context |
| NarrativeAudio | a list, each one NarrativeAudio | no | Narrative Audio |
| NarrativeLocation | a list, each one NarrativeLocation | no | Narrative Location |
| NarrativeObject | a list, each one NarrativeObject | no | Narrative Object |
| NarrativeScene | a list, each one NarrativeScene | no | Narrative Scene |
| NarrativeStyling | a list, each one NarrativeStyling | no | Narrative Styling |
| NarrativeWardrobe | a list, each one NarrativeWardrobe | no | Narrative Wardrobe |
| ProductionLocation | a list, each one ProductionLocation | no | Production Location |
| ProductionScene | a list, each one ProductionScene | no | Production Scene |
| Sequence | a list, each one Sequence | no | Sequence |
| Slate | a list, each one Slate | no | Slate |
| SpecialAction | a list, each one SpecialAction | no | Special Action |
| Effect | a list, each one Effect | no | Effect |
| Participant | a list, each one Participant | no | Participant |
| Person | a list, each one Person | no | Person |
| Department | a list, each one Department | no | Department |
| Organization | a list, each one Organization | no | Organization |
| Service | a list, each one Service | no | Service |
| Role | a list, each one Role | no | Service |
| Task | a list, each one Task | no | Task |
| TaskSC | a list, each one TaskSC | no | TaskSC |
| Composition | a list, each one Composition | no | Composition |
| Location | a list, each one Location | no | Location |

### audioChannelName

A formalization of the name of the loudspeaker the Audio Channel in intended to drive.

This one is a list. The fields below describe a single entry.

A single value.

### audioMixType

A description of the type or use for this mix.

A single value.

### audioProcessingAction

Indication of what was done to the audio in an Audio Session.

A single value.

### cameraMetadata

Capture-specific details and information about the Camera itself.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| activeSensorPhysicalDimensions | text; the value itself may be empty | no | Height and width of the active area of the camera sensor |
| cameraLabel | text; the value itself may be empty | no | Human readable ID assigned to each production camera. |
| cameraMake | text; the value itself may be empty | no | The manufacturer or vendor of the camera. |
| cameraModel | text; the value itself may be empty | no | The manufacturer's name for the camera model. For example, the name of the camera family followed by the name of the variant. |
| cameraUID | text; the value itself may be empty | no | An alphanumeric code that uniquely identifies the camera among all cameras from all vendors. |
| cameraSerialNumber | text; the value itself may be empty | no | An alphanumeric code assigned by the manufacturer to a camera. |
| cameraFirmwareVersion | text; the value itself may be empty | no | An alphanumeric code that identifies the firmware installed in the camera at the time of recording |
| captureRate | text; the value itself may be empty | no | The number of individual images captured per second. |
| circleTake | text; the value itself may be empty | no | Indicating whether a recorded sequence of images is considered a candidate for use. |
| exposureIndex | text; the value itself may be empty | no | Exposure index is the ISO rating used to determine exposure when the recording was made. |
| fdlLink | text; the value itself may be empty | no | Unique identifier of the FDL used by the camera |
| flipX | text; the value itself may be empty | no | The flip-X factor indicates whether the image is flipped horizontally. |
| flipY | text; the value itself may be empty | no | The flip-Y factor indicates whether the image is flipped vertically. |
| frameHeight | text; the value itself may be empty | no | The height of the intended image in pixels. This may or may not be the height of the recorded image or the sensor |
| frameWidth | text; the value itself may be empty | no | The width of the intended image in pixels. This may or may not be the width of the recorded image or the sensor |
| isoSpeed | text; the value itself may be empty | no | Arithmetic ISO scale as defined in ISO 12232 |
| lutUID | text; the value itself may be empty | no | An alphanumeric code that uniquely identifies the LUT loaded into the camera and applied to the monitor output during shooting. |
| pixelAspectRatio | text; the value itself may be empty | no | Describes how the pixels are to be interpreted to correctly display the image. |
| playbackRate | text; the value itself may be empty | no | The number of individual images per second of the intended playback speed. |
| roll | text; the value itself may be empty | no | The angle of the camera off of the roll axis, measured in degrees when the camera is level. |
| shutterAngle | text; the value itself may be empty | no | A measure of the exposure time of an image relative to the frame rate. 0 < shutter angle <= 360. |
| tilt | text; the value itself may be empty | no | The angle of a camera off its pitch axis, measured in degrees when the camera is level. |
| timecode | text; the value itself may be empty | no | A linear sequence of numeric codes generated at a regular interview and usually recorded in the format: <hour>:<minute>:<second>:<frame>. |
| timecodeEnd | text; the value itself may be empty | no | Timecode when recording stopped |
| timecodeStart | text; the value itself may be empty | no | Timecode when recording started |
| tint | text; the value itself may be empty | no | Defines the R/B white points against the green channel. |
| whiteBalance | text; the value itself may be empty | no | The color temperature of white expressed in degrees Kelvin. |
| reelName | text; the value itself may be empty | no | A name assigned to a sequence of recorded images |
| cameraRoll | text; the value itself may be empty | no | Identifier for a group of events captured together on the same camera and recording media. |

### isSelfContained

Indicates the Asset does not depend on other Assets to perform its functional use.

A single value.

### lensMetadata

Capture-specific details and information about the Lens itself.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| tStop | text; the value itself may be empty | no | The linear T-number of the lens, equal to the f-number of the lens divided by the square root of the transmittance of the lens. |
| fStop | text; the value itself may be empty | no | The linear f-number of the lens, equal to the focal length divided by the diameter of the entrance pupil. |
| entrancePupilPosition | text; the value itself may be empty | no |  |
| focusPosition | text; the value itself may be empty | no | Focus distance/position of the lens. |
| focalLength | text; the value itself may be empty | no | The actual focal length of the lens, in millimeters, when the image was captured. With a zoom lens this may be change frame by frame. |
| lensMake | text; the value itself may be empty | no | The lens manufacturer or vendor. |
| lensModel | text; the value itself may be empty | no | The lens model identifier assigned by the lens manufacturer or vendor |
| anamorphicSqueeze | text; the value itself may be empty | no | Nominal ratio of height to width of the image of an axis-aligned square captured by the camera sensor |
| lensSerialNumber | text; the value itself may be empty | no | A number unique to each lens from the same manufacturer or vendor and of the same model. |
| lensFirmwareVersion | text; the value itself may be empty | no | Version identifier for the firmware of the lens |

### mapFormat

The data layout of a Map.

A single value.

### mapType

Guidance about the intended use of a Map in a Material.

A single value.

### recorderMetadata

Information about a Recorder and the recording media.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| recorderFirmwareVersion | text; the value itself may be empty | no | An alphanumeric code that identifies the firmware installed in the recorder at the time of recording. |
| recorderMake | text; the value itself may be empty | no | The recorder manufacturer or vendor. |
| recorderModel | text; the value itself may be empty | no | The recorder model identifier assigned by the lens manufacturer or vendor. |
| recorderSerialNumber | text; the value itself may be empty | no | A number unique to each recorder from the same manufacturer or vendor and of the same model. |
| storageMediaUID | text; the value itself may be empty | no | An alphanumeric code that uniquely identifies the storage media (i.e., mag) the footage was recorded on to. |

### timing

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| sourceStart | text; the value itself may be empty | no |  |
| sourceEnd | text; the value itself may be empty | no |  |
| recordStart | text; the value itself may be empty | no |  |
| recordEnd | text; the value itself may be empty | no |  |
| duration | text; the value itself may be empty | no |  |

### scd

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| component | a list, each one a group of fields | no |  |
| component[].sourceStart | text; the value itself may be empty | no |  |
| component[].sourceEnd | text; the value itself may be empty | no |  |
| component[].recordStart | text; the value itself may be empty | no |  |
| component[].recordEnd | text; the value itself may be empty | no |  |
| component[].duration | text; the value itself may be empty | no |  |
| component[].Shot | either reference or Asset | no |  |

### audioTrackName

Further differentiation for the Audio Track.

A single value.

### assetGroup

Properties of the Asset Group.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| isOrdered | yes or no | no |  |

### audioBitRate

The number of bits in one second of sampled audio, expressed in Kbits per second.

A single value.

### audioSampleRate

The average number of samples per second taken from the source audio input in KHz.

A single value.

### audioSampleSize

The number of bits per audio sample.

A single value.

### dimensions

Encode a set of measurements to describe a 2 or 3 dimensional object (metric, imperial or pixels)

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| height | one of 3 forms: text (100m); text (2000ft); text (250px); the value itself may be empty | no | The height or X axis of the object |
| width | one of 3 forms: text (100m); text (2000ft); text (250px); the value itself may be empty | no | The width or X axis of the object |
| depth | one of 3 forms: text (100m); text (2000ft); text (250px); the value itself may be empty | no | The depth or Z axis of the object |

### fileDetails

Where opaque identifiers are used it can be useful to express naming for use in traditional file systems

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| fileName | text; the value itself may be empty | no |  |
| filePath | text; the value itself may be empty | no |  |
| fileExtension | text; the value itself may be empty | no |  |
| mediaType | text; the value itself may be empty | no |  |

### geometryType

A description of the general underlying form of a three-dimensional shape.

A single value.

### linkset

When used with resolution system returning a linkset additional information can help disambiguate multiple linksets in the response.

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| recordType | text; the value itself may be empty | no |  |
| mediaType | text; the value itself may be empty | no |  |

### weight

Encode a measurement of weight using the imperial or metric system

A single value, for example 3kg7g.

### shootDay

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| shootDay | text or a number; the value itself may be empty | no |  |
| shootDate | a group of fields; and follows date as well; the value itself may be empty | no |  |

### durationTime

Should be formatted to comply with ISO 8601

A single value, for example P2Y12M3D.

### time

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| timestamp | a number; the value itself may be empty | no | Timestamp |
| periodInTime | a group of fields; nothing else may be added here; the value itself may be empty | no | Period in Time |
| periodInTime.startTime | text | yes, always | Start Time |
| periodInTime.durationTime | text; the value itself may be empty | no | Duration of Time |
| periodInTime.endTime | text; the value itself may be empty | no | End Time |
| descriptiveTime | a group of fields; nothing else may be added here; the value itself may be empty | no | Descriptive Time |
| descriptiveTime.periodInDay | text; for example Morning; the value itself may be empty | no | Period in Day |
| descriptiveTime.relativeTime | text; for example Later; the value itself may be empty | no | Relative Time |
| descriptiveTime.periodInTime | text; for example Ming dynasty; the value itself may be empty | no | Period in Time |
| descriptiveTime.eventInTime | text; for example Hindenburg disaster; the value itself may be empty | no | Describes a specific event that occurred |
| dateTime | text; written like "2023-08-24T20:51:15Z 2023-08-24T20:51:15.56Z 2023-08-24T20:51:15+08:00 2023-08-24T20:51:15.23-04:00"; the value itself may be empty | no | Should be formatted to comply with ISO 8601 |
| date | text; written like "2020-11-21"; the value itself may be empty | no | Should be formatted to comply with ISO 8601 |
| durationTime | text; written like "P2Y12M3D"; the value itself may be empty | no | Should be formatted to comply with ISO 8601 |
| timecode | text; written like "00:03:43:12"; the value itself may be empty | no | SMPTE Timecode in the format HH:MM:SS:FF.  Assumes the frame rate is 23.98, 24, 25, 29.97 NDF, or 30 |

### unitOfMeasurement

Nothing else may be added to it.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| weight | one of 2 forms: text (3kg7g); text (12lb14oz); the value itself may be empty | no | Encode a measurement of weight using the imperial or metric system |
| dimensions | a group of fields; the value itself may be empty | no | Encode a set of measurements to describe a 2 or 3 dimensional object (metric, imperial or pixels) |
| dimensions.height | one of 3 forms: text (100m); text (2000ft); text (250px); the value itself may be empty | no | The height or X axis of the object |
| dimensions.width | one of 3 forms: text (100m); text (2000ft); text (250px); the value itself may be empty | no | The width or X axis of the object |
| dimensions.depth | one of 3 forms: text (100m); text (2000ft); text (250px); the value itself may be empty | no | The depth or Z axis of the object |
| linearDistance | one of 2 forms: text (100m); text (2000ft); the value itself may be empty | no | Encode a measurement of distance using the imperial or metric system |

### point2

A point with two coordinates.

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| x | a number | no |  |
| y | a number | no |  |

### materialType

Data values and relationships required to describe the look of a CG Asset.

A single value.
