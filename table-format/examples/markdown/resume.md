# Resume Schema

## What this file holds

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| $schema | a web address | no | link to the version of the schema that can validate the resume |
| basics | a group of fields | no |  |
| basics.name | text | no |  |
| basics.label | text | no | e.g. Web Developer |
| basics.image | text | no | URL (as per RFC 3986) to a image in JPEG or PNG format |
| basics.email | an email address | no | e.g. thomas@gmail.com |
| basics.phone | text | no | Phone numbers are stored as strings so use any format you like, e.g. 712-117-2923 |
| basics.url | a web address | no | URL (as per RFC 3986) to your website, e.g. personal homepage |
| basics.summary | text | no | Write a short 2-3 sentence biography about yourself |
| basics.location | a group of fields | no |  |
| basics.location.address | text | no | To add multiple address lines, use  . For example, 1234 Glücklichkeit Straße Hinterhaus 5. Etage li. |
| basics.location.postalCode | text | no |  |
| basics.location.city | text | no |  |
| basics.location.countryCode | text | no | code as per ISO-3166-1 ALPHA-2, e.g. US, AU, IN |
| basics.location.region | text | no | The general region where you live. Can be a US state, or a province, for instance. |
| basics.profiles | a list, each one a group of fields | no | Specify any number of social networks that you participate in |
| basics.profiles[].network | text | no | e.g. Facebook or Twitter |
| basics.profiles[].username | text | no | e.g. neutralthoughts |
| basics.profiles[].url | a web address | no | e.g. http://twitter.example.com/neutralthoughts |
| work | a list, each one a group of fields | no |  |
| work[].name | text | no | e.g. Facebook |
| work[].location | text | no | e.g. Menlo Park, CA |
| work[].description | text | no | e.g. Social Media Company |
| work[].position | text | no | e.g. Software Engineer |
| work[].url | a web address | no | e.g. http://facebook.example.com |
| work[].startDate | iso8601 | no |  |
| work[].endDate | iso8601 | no |  |
| work[].summary | text | no | Give an overview of your responsibilities at the company |
| work[].highlights | a list, each one text | no | Specify multiple accomplishments |
| volunteer | a list, each one a group of fields | no |  |
| volunteer[].organization | text | no | e.g. Facebook |
| volunteer[].position | text | no | e.g. Software Engineer |
| volunteer[].url | a web address | no | e.g. http://facebook.example.com |
| volunteer[].startDate | iso8601 | no |  |
| volunteer[].endDate | iso8601 | no |  |
| volunteer[].summary | text | no | Give an overview of your responsibilities at the company |
| volunteer[].highlights | a list, each one text | no | Specify accomplishments and achievements |
| education | a list, each one a group of fields | no |  |
| education[].institution | text | no | e.g. Massachusetts Institute of Technology |
| education[].url | a web address | no | e.g. http://facebook.example.com |
| education[].area | text | no | e.g. Arts |
| education[].studyType | text | no | e.g. Bachelor |
| education[].startDate | iso8601 | no |  |
| education[].endDate | iso8601 | no |  |
| education[].score | text | no | grade point average, e.g. 3.67/4.0 |
| education[].courses | a list, each one text | no | List notable courses/subjects |
| awards | a list, each one a group of fields | no | Specify any awards you have received throughout your professional career |
| awards[].title | text | no | e.g. One of the 100 greatest minds of the century |
| awards[].date | iso8601 | no |  |
| awards[].awarder | text | no | e.g. Time Magazine |
| awards[].summary | text | no | e.g. Received for my work with Quantum Physics |
| certificates | a list, each one a group of fields | no | Specify any certificates you have received throughout your professional career |
| certificates[].name | text | no | e.g. Certified Kubernetes Administrator |
| certificates[].date | iso8601 | no |  |
| certificates[].url | a web address | no | e.g. http://example.com |
| certificates[].issuer | text | no | e.g. CNCF |
| publications | a list, each one a group of fields | no | Specify your publications through your career |
| publications[].name | text | no | e.g. The World Wide Web |
| publications[].publisher | text | no | e.g. IEEE, Computer Magazine |
| publications[].releaseDate | iso8601 | no |  |
| publications[].url | a web address | no | e.g. http://www.computer.org.example.com/csdl/mags/co/1996/10/rx069-abs.html |
| publications[].summary | text | no | Short summary of publication. e.g. Discussion of the World Wide Web, HTTP, HTML. |
| skills | a list, each one a group of fields | no | List out your professional skill-set |
| skills[].name | text | no | e.g. Web Development |
| skills[].level | text | no | e.g. Master |
| skills[].keywords | a list, each one text | no | List some keywords pertaining to this skill |
| languages | a list, each one a group of fields | no | List any other languages you speak |
| languages[].language | text | no | e.g. English, Spanish |
| languages[].fluency | text | no | e.g. Fluent, Beginner |
| interests | a list, each one a group of fields | no |  |
| interests[].name | text | no | e.g. Philosophy |
| interests[].keywords | a list, each one text | no |  |
| references | a list, each one a group of fields | no | List references you have received |
| references[].name | text | no | e.g. Timothy Cook |
| references[].reference | text | no | e.g. Joe blogs was a great employee, who turned up to work at least once a week. He exceeded my expectations when it came to doing nothing. |
| projects | a list, each one a group of fields | no | Specify career projects |
| projects[].name | text | no | e.g. The World Wide Web |
| projects[].description | text | no | Short summary of project. e.g. Collated works of 2017. |
| projects[].highlights | a list, each one text | no | Specify multiple features |
| projects[].keywords | a list, each one text | no | Specify special elements involved |
| projects[].startDate | iso8601 | no |  |
| projects[].endDate | iso8601 | no |  |
| projects[].url | a web address | no | e.g. http://www.computer.org/csdl/mags/co/1996/10/rx069-abs.html |
| projects[].roles | a list, each one text | no | Specify your role on this project or in company |
| projects[].entity | text | no | Specify the relevant company/entity affiliations e.g. 'greenpeace', 'corporationXYZ' |
| projects[].type | text | no | e.g. 'volunteering', 'presentation', 'talk', 'application', 'conference' |
| meta | a group of fields | no | The schema version and any other tooling configuration lives here |
| meta.canonical | a web address | no | URL (as per RFC 3986) to latest version of this document |
| meta.version | text | no | A version field which follows semver - e.g. v1.0.0 |
| meta.lastModified | text | no | Using ISO 8601 with YYYY-MM-DDThh:mm:ss |

## All 1 shapes

Most used first, because everything else is built on them.

- **iso8601** (used 11)

### iso8601

Similar to the standard date type, but each section after the year is optional. e.g. 2014-06-29 or 2023-04

A single value.
