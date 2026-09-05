# JSON schema for Google Chrome extension manifest files

## What this file holds

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| manifest_version | one of: 2, 3 | yes, always | One integer specifying the version of the manifest file format your package requires. |
| name | text; from any to 45 characters | yes, always | The name of the extension |
| version | version_string | yes, always | One to four dot-separated integers identifying the version of this extension. |
| default_locale | text; left out means en | no | Specifies the subdirectory of _locales that contains the default strings for this extension. |
| description | text; from any to 132 characters | no | A plain text description of the extension |
| icons | a group of fields; at least 1 fields | no | One or more icons that represent the extension, app, or theme. Recommended format: PNG; also BMP, GIF, ICO, JPEG. |
| icons.16 | icon | no | Used as the favicon for an extension's pages and infobar. |
| icons.48 | icon | no | Used on the extension management page (chrome://extensions). |
| icons.128 | icon | no | Used during installation and in the Chrome Web Store. |
| icons.256 | icon | no | Used during installation and in the Chrome Web Store. |
| chrome_url_overrides | a group of fields; at most 1 fields; nothing else may be added here | no | Override pages are a way to substitute an HTML file from your extension for a page that Google Chrome normally provides. |
| chrome_url_overrides.bookmarks | page | no | The page that appears when the user chooses the Bookmark Manager menu item from the Chrome menu or, on Mac, the Bookmark Manager item from the Bookmarks menu. You can also get to this page by entering the URL chrome://bookmarks. |
| chrome_url_overrides.history | page | no | The page that appears when the user chooses the History menu item from the Chrome menu or, on Mac, the Show Full History item from the History menu. You can also get to this page by entering the URL chrome://history. |
| chrome_url_overrides.newtab | page | no | The page that appears when the user creates a new tab or window. You can also get to this page by entering the URL chrome://newtab. |
| commands | a group of fields | no | Use the commands API to add keyboard shortcuts that trigger actions in your extension, for example, an action to open the browser action or send a command to the extension. |
| commands.any name in a set format | command | no |  |
| commands.any name in a set format | command | no |  |
| commands.any name in a set format | command | no |  |
| content_scripts | a list, each one a group of fields; from 1 to any entries | no | Content scripts are JavaScript files that run in the context of web pages. |
| content_scripts[].matches | a list, each one match_pattern; from 1 to any entries | yes, always | Specifies which pages this content script will be injected into. |
| content_scripts[].exclude_matches | a list, each one match_pattern | no | Excludes pages that this content script would otherwise be injected into. |
| content_scripts[].css | a list, each one uri | no | The list of CSS files to be injected into matching pages. These are injected in the order they appear in this array, before any DOM is constructed or displayed for the page. |
| content_scripts[].js | scripts, itself a list | no | The list of JavaScript files to be injected into matching pages. These are injected in the order they appear in this array. |
| content_scripts[].world | one of: ISOLATED, MAIN | no | The JavaScript world for a script to execute within. |
| content_scripts[].run_at | one of: document_start, document_end, document_idle | no | Controls when the files in js are injected. |
| content_scripts[].all_frames | yes or no; left out means no | no | Controls whether the content script runs in all frames of the matching page, or only the top frame. |
| content_scripts[].include_globs | a list, each one glob_pattern | no | Applied after matches to include only those URLs that also match this glob. Intended to emulate the @include Greasemonkey keyword. |
| content_scripts[].exclude_globs | a list, each one glob_pattern | no | Applied after matches to exclude URLs that match this glob. Intended to emulate the @exclude Greasemonkey keyword. |
| content_scripts[].match_about_blank | yes or no; left out means no | no | Whether to insert the content script on about:blank and about:srcdoc. |
| devtools_page | page | no | A DevTools extension adds functionality to the Chrome DevTools. It can add new UI panels and sidebars, interact with the inspected page, get information about network requests, and more. |
| externally_connectable | a group of fields; nothing else may be added here | no | Declares which extensions, apps, and web pages can connect to your extension via runtime.connect and runtime.sendMessage. |
| externally_connectable.ids | a list, each one text | no |  |
| externally_connectable.matches | a list, each one text | no |  |
| externally_connectable.accepts_tls_channel_id | yes or no; left out means no | no | Indicates that the extension would like to make use of the TLS channel ID of the web page connecting to it. The web page must also opt to send the TLS channel ID to the extension via setting includeTlsChannelId to true in runtime.connect's connectInfo or runtime.sendMessage's options. |
| file_browser_handlers | a list, each one a group of fields; from 1 to any entries | no | You can use this API to enable users to upload files to your website. |
| file_browser_handlers[].id | text | yes, always | Used by event handling code to differentiate between multiple file handlers |
| file_browser_handlers[].default_title | text | yes, always | What the button will display. |
| file_browser_handlers[].file_filters | a list, each one text; from 1 to any entries | yes, always | Filetypes to match. |
| homepage_url | uri | no | The URL of the homepage for this extension. |
| incognito | one of: spanning, split, not_allowed | no | Specify how this extension will behave if allowed to run in incognito mode. |
| input_components | a list, each one a group of fields | no | Allows your extension to handle keystrokes, set the composition, and manage the candidate window. |
| input_components[].name | text | yes, always |  |
| input_components[].type | text | yes, always |  |
| input_components[].id | text | yes, always |  |
| input_components[].description | text | yes, always |  |
| input_components[].language | text | yes, always |  |
| input_components[].layouts | a list | yes, always |  |
| key | text | no | This value can be used to control the unique ID of an extension, app, or theme when it is loaded during development. |
| minimum_chrome_version | version_string | no | The version of Chrome that your extension, app, or theme requires, if any. |
| nacl_modules | a list, each one a group of fields; from 1 to any entries | no | One or more mappings from MIME types to the Native Client module that handles each type. |
| nacl_modules[].path | uri | yes, always | The location of a Native Client manifest (a .nmf file) within the extension directory. |
| nacl_modules[].mime_type | mime_type | yes, always | The MIME type for which the Native Client module will be registered as content handler. |
| oauth2 | a group of fields; nothing else may be added here | no | Use the Chrome Identity API to authenticate users: the getAuthToken for users logged into their Google Account and the launchWebAuthFlow for users logged into a non-Google account. |
| oauth2.client_id | text | yes, always | You need to register your app in the Google APIs Console to get the client ID. |
| oauth2.scopes | a list, each one text; from 1 to any entries | yes, always |  |
| offline_enabled | yes or no | no | Whether the app or extension is expected to work offline. When Chrome detects that it is offline, apps with this field set to true will be highlighted on the New Tab page. |
| omnibox | a group of fields; nothing else may be added here | no | The omnibox API allows you to register a keyword with Google Chrome's address bar, which is also known as the omnibox. |
| omnibox.keyword | text | yes, always | The keyword that will trigger your extension. |
| optional_permissions | permissions, itself a list | no | Use the chrome.permissions API to request declared optional permissions at run time rather than install time, so users understand why the permissions are needed and grant only those that are necessary. |
| options_page | page | no | To allow users to customize the behavior of your extension, you may wish to provide an options page. If you do, a link to it will be provided from the extensions management page at chrome://extensions. Clicking the Options link opens a new tab pointing at your options page. |
| options_ui | a group of fields | no | To allow users to customize the behavior of your extension, you may wish to provide an options page. If you do, an Options link will be shown on the extensions management page at chrome://extensions which opens a dialogue containing your options page. |
| options_ui.page | text | yes, always | The path to your options page, relative to your extension's root. |
| options_ui.chrome_style | yes or no; left out means yes | no | If true, a Chrome user agent stylesheet will be applied to your options page. The default value is false, but we recommend you enable it for a consistent UI with Chrome. |
| options_ui.open_in_tab | yes or no; left out means no | no | If true, your extension's options page will be opened in a new tab rather than embedded in chrome://extensions. The default is false, and we recommend that you don't change it. This is only useful to delay the inevitable deprecation of the old options UI! It will be removed soon, so try not to use it. It will break. |
| permissions | permissions, itself a list | no | Permissions help to limit damage if your extension or app is compromised by malware. Some permissions are also displayed to users before installation, as detailed in Permission Warnings. |
| requirements | a group of fields; nothing else may be added here | no | Technologies required by the app or extension. Hosting sites such as the Chrome Web Store may use this list to dissuade users from installing apps or extensions that will not work on their computer. |
| requirements.plugins | a group of fields; nothing else may be added here | no | Indicates if an app or extension requires NPAPI to run. This requirement is enabled by default when the manifest includes the 'plugins' field. |
| requirements.plugins.npapi | yes or no; left out means yes | yes, always |  |
| requirements.3D | a group of fields; nothing else may be added here | no | The '3D' requirement denotes GPU hardware acceleration. |
| requirements.3D.features | a list, each one a fixed value; from 1 to any entries | yes, always | List of the 3D-related features your app requires. |
| sandbox | a group of fields; nothing else may be added here | no | Defines an collection of app or extension pages that are to be served in a sandboxed unique origin, and optionally a Content Security Policy to use with them. |
| sandbox.pages | a list, each one page; from 1 to any entries | yes, always |  |
| sandbox.content_security_policy | content_security_policy | no |  |
| short_name | text; from any to 12 characters | no | The short name is typically used where there is insufficient space to display the full name. |
| update_url | uri | no | If you publish using the Chrome Developer Dashboard, ignore this field. If you host your own extension or app: URL to an update manifest XML file. |
| tts_engine | a group of fields; nothing else may be added here | no | Register itself as a speech engine. |
| tts_engine.voices | a list, each one a group of fields; from 1 to any entries | yes, always | Voices the extension can synthesize. |
| tts_engine.voices[].voice_name | text | yes, always | Identifies the name of the voice and the engine used. |
| tts_engine.voices[].lang | text | no | Almost always, a voice can synthesize speech in just a single language. When an engine supports more than one language, it can easily register a separate voice for each language. |
| tts_engine.voices[].gender | text | no | If your voice corresponds to a male or female voice, you can use this parameter to help clients choose the most appropriate voice for their application. |
| tts_engine.voices[].event_types | a list, each one one of these; from 1 to any entries | yes, always | Events sent to update the client on the progress of speech synthesis. |
| version_name | text | no | In addition to the version field, which is used for update purposes, version_name can be set to a descriptive version string and will be used for display purposes if present. |
| chrome_settings_overrides | anything | no |  |
| content_pack | anything | no |  |
| current_locale | anything | no |  |
| import | anything | no |  |
| platforms | anything | no |  |
| signature | anything | no |  |
| spellcheck | anything | no |  |
| storage | anything | no |  |
| system_indicator | anything | no |  |
| when manifest_version is "3" |  | only in certain cases |  |
| when manifest_version is "3" then.background | a group of fields | no | The background page is an HTML page that runs in the extension process. It exists for the lifetime of your extension, and only one instance of it at a time is active. |
| when manifest_version is "3" then.background.service_worker | text | no | The service worker js file. |
| when manifest_version is "3" then.background.type | one of: module | no |  |
| when manifest_version is "3" then.host_permissions | permissions, itself a list | no |  |
| when manifest_version is "3" then.action | action_v3 | no | Used to control the toolbar button for your extension in Chrome's UI. |
| when manifest_version is "3" then.content_security_policy | a group of fields | no |  |
| when manifest_version is "3" then.content_security_policy.extension_pages | content_security_policy | no | This policy covers pages in your extension, including html files and service workers. |
| when manifest_version is "3" then.content_security_policy.sandbox | content_security_policy | no | This policy covers any sandboxed extension pages that your extension uses. |
| when manifest_version is "3" then.web_accessible_resources | a list, each one web_resource; from 1 to any entries | no | An array of objects that declare resource access rules. Each object maps an array of extension resources to an array of URLs and/or extension IDs that can access those resources. |
| when manifest_version is "3" otherwise.background | a group of fields | no | The background page is an HTML page that runs in the extension process. It exists for the lifetime of your extension, and only one instance of it at a time is active. |
| when manifest_version is "3" otherwise.background.persistent | yes or no; left out means yes | no | When false, makes the background page an event page (loaded only when needed). |
| when manifest_version is "3" otherwise.background.page | page | no | Specify the HTML of the background page. |
| when manifest_version is "3" otherwise.background.scripts | scripts, itself a list | no | A background page will be generated by the extension system that includes each of the files listed in the scripts property. |
| when manifest_version is "3" otherwise.browser_action | action_v2 | no | Use browser actions to put icons in the main Google Chrome toolbar, to the right of the address bar. In addition to its icon, a browser action can also have a tooltip, a badge, and a popup. |
| when manifest_version is "3" otherwise.page_action | action_v2 | no | Use the chrome.pageAction API to put icons inside the address bar. Page actions represent actions that can be taken on the current page, but that aren't applicable to all pages. |
| when manifest_version is "3" otherwise.content_security_policy | content_security_policy | no |  |
| when manifest_version is "3" otherwise.web_accessible_resources | a list, each one uri; from 1 to any entries | no | An array of strings specifying the paths (relative to the package root) of packaged resources that are expected to be usable in the context of a web page. |

## All 14 shapes

Most used first, because everything else is built on them.

- **uri** (used 10)
- **icon** (used 9)
- **page** (used 7)
- **content_security_policy** (used 4)
- **command** (used 3)
- **glob_pattern** (used 3)
- **match_pattern** (used 3)
- **permissions** (used 3)
- **action_v2** (used 2)
- **scripts** (used 2)
- **version_string** (used 2)
- **action_v3** (used 1)
- **mime_type** (used 1)
- **web_resource** (used 1)

### uri

A single value.

### icon

A single value.

### page

A single value.

### content_security_policy

This introduces some fairly strict policies that will make extensions more secure by default, and provides you with the ability to create and enforce rules governing the types of content that can be loaded and executed by your extensions and applications.

A single value.

### command

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| when global is "true" |  | only in certain cases |  |
| when global is "true" then.description | text | no |  |
| when global is "true" then.global | yes or no | no | Whether this command should work while Chrome does not have focus. Keyboard shortcut suggestions for global commands are limited to Ctrl+Shift+[0..9] |
| when global is "true" then.suggested_key | a group of fields; nothing else may be added here | no |  |
| when global is "true" then.suggested_key.any name in a set format | text; in an exact set format | no |  |
| when global is "true" otherwise.description | text | no |  |
| when global is "true" otherwise.global | yes or no | no | Whether this command should work while Chrome does not have focus. Keyboard shortcut suggestions for global commands are limited to Ctrl+Shift+[0..9] |
| when global is "true" otherwise.suggested_key | a group of fields; nothing else may be added here | no |  |
| when global is "true" otherwise.suggested_key.any name in a set format | text; in an exact set format | no |  |

### glob_pattern

A single value.

### match_pattern

A single value.

### permissions

This one is a list. The fields below describe a single entry.

A single value.

### action_v2

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| default_title | text | no | Tooltip for the main toolbar icon. |
| default_popup | uri | no | The popup appears when the user clicks the icon. |
| default_icon | one of 2 forms: text; a group of fields | no |  |

### scripts

This one is a list. The fields below describe a single entry.

A single value.

### version_string

A single value.

### action_v3

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| default_title | text | no | Tooltip for the main toolbar icon. |
| default_popup | uri | no | The popup appears when the user clicks the icon. |
| default_icon | a group of fields | no |  |
| default_icon.16 | icon | no |  |
| default_icon.24 | icon | no |  |
| default_icon.32 | icon | no |  |

### mime_type

A single value.

### web_resource

| Field | What goes in it | Needed? | What it means |
|---|---|---|---|
| resources | a list, each one glob_pattern | yes, always | An array of resources to be exposed. Resources are specified as strings and may contain * for wildcard matches. For example, "/images/*" exposes everything in the extension's /images directory recursively while "*.png" exposes all PNG files. |
| matches | a list, each one match_pattern | no | A list of URL match patterns specifying which pages can access the resources. Only the origin is used to match URLs; subdomains patterns (*.google.com) and paths are ignored. |
| extension_ids | a list, each one text | no | A list of extension IDs, specifying which extensions can access the resources. |
| use_dynamic_url | yes or no | no | If true, only allow resources to be accessible through dynamic ID. The dynamic ID is generated per session. It's regenerated on browser restart or extension reload. |
