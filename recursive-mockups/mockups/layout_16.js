module.exports = function render(title, desc, schema) {

  const rows = [];
  const visited = new Set();

  function walk(node, parentPath = [], isRequired = false) {
    if (!node || typeof node !== 'object') return;
    
    if (visited.has(node)) {
      rows.push({
        path: parentPath.join('.'),
        name: parentPath[parentPath.length - 1],
        depth: parentPath.length,
        type: 'recursiveRef',
        required: isRequired,
        description: 'Recursive reference back to parent definition.',
        constraints: {}
      });
      return;
    }
    visited.add(node);

    let type = 'any';
    let description = '';
    let constraints = {};
    let properties = {};
    let patternProperties = {};
    let additionalProperties = null;
    let items = null;

    function extract(n) {
      if (!n || typeof n !== 'object') return;
      type = n.type || type;
      description = n.description || description || '';
      
      for (const [key, val] of Object.entries(n)) {
        if (!['type', 'description', 'properties', 'patternProperties', 'additionalProperties', 'items', 'extends'].includes(key)) {
          constraints[key] = val;
        }
      }
      
      if (n.properties) Object.assign(properties, n.properties);
      if (n.patternProperties) Object.assign(patternProperties, n.patternProperties);
      if (n.additionalProperties !== undefined) additionalProperties = n.additionalProperties;
      if (n.items) items = n.items;
    }

    extract(node);

    if (node.extends && Array.isArray(node.extends)) {
      node.extends.forEach(ext => extract(ext));
    }

    if (parentPath.length > 0) {
      const typeStr = Array.isArray(type) ? type.join(' | ') : String(type);
      rows.push({
        path: parentPath.join('.'),
        name: parentPath[parentPath.length - 1],
        depth: parentPath.length,
        type: typeStr,
        required: isRequired,
        description: description,
        constraints: constraints
      });
    }

    const requiredList = node.required || [];

    for (const [name, childNode] of Object.entries(properties)) {
      const childRequired = childNode.required === true || (Array.isArray(requiredList) && requiredList.includes(name));
      walk(childNode, [...parentPath, name], childRequired);
    }

    for (const [pattern, childNode] of Object.entries(patternProperties)) {
      walk(childNode, [...parentPath, `/${pattern}/`], false);
    }

    if (additionalProperties && typeof additionalProperties === 'object') {
      walk(additionalProperties, [...parentPath, '*'], false);
    }

    if (items && typeof items === 'object') {
      if (Array.isArray(items)) {
        items.forEach((itemNode, idx) => {
          walk(itemNode, [...parentPath, `[${idx}]`], false);
        });
      } else {
        walk(items, [...parentPath, '*'], false);
      }
    }

    visited.delete(node);
  }

  walk(schema);

  let tocHtml = '';
  let articleContentHtml = '';
  let referencesHtml = '';

  rows.forEach((r, idx) => {
    const slug = `wiki-${r.path.replace(/\./g, '-')}`;
    tocHtml += `
      <li class="toc-level-1" onclick="scrollToWiki('${slug}')">
        <span class="toc-number">${idx + 1}</span>
        <span class="toc-text">${r.path}</span>
      </li>
    `;

    let constraintsHtml = '';
    const constraintEntries = Object.entries(r.constraints);
    if (constraintEntries.length > 0) {
      constraintsHtml = '<ul class="wiki-list">';
      constraintEntries.forEach(([key, val]) => {
        if (typeof val === 'object' && val !== null) {
          constraintsHtml += `
            <li class="nested" style="list-style-type: none; margin-left: -15px; margin-bottom: 5px;">
              <span class="nested-toggle" style="color: #0645AD; cursor: pointer; font-weight: bold;" onclick="const el = this.nextElementSibling; el.style.display = el.style.display === 'none' ? 'block' : 'none'; this.innerText = el.style.display === 'none' ? '▶ expand ' + '${key}' : '▼ collapse ' + '${key}';">▶ expand ${key}</span>
              <div class="nested-detail-box" style="display:none; margin-top: 5px;">
                <pre style="font-family: monospace; font-size: 0.75rem; background: #F8F9FA; border-left: 2px solid #A2A9B1; padding: 5px; color: #202122; overflow-x: auto;">"${key}": ${JSON.stringify(val, null, 2)}</pre>
              </div>
            </li>
          `;
        } else {
          constraintsHtml += `<li><strong>${key}</strong>: <code>${JSON.stringify(val)}</code></li>`;
        }
      });
      constraintsHtml += '</ul>';
    }

    articleContentHtml += `
      <div class="wiki-section" id="${slug}">
        <h2><span class="mw-headline">${r.path}</span></h2>
        
        <table class="wiki-metadata-table">
          <tr>
            <td>Type</td>
            <td><code>${r.type}</code></td>
          </tr>
          <tr>
            <td>Status</td>
            <td>${r.required ? '<strong>Required</strong>' : 'Optional'}</td>
          </tr>
          <tr>
            <td>Depth</td>
            <td>Level ${r.depth}</td>
          </tr>
        </table>

        <p class="wiki-paragraph">
          ${r.description || 'No supplementary description logged for this parameter.'}
          <sup class="reference-cite"><a href="#ref-${idx}">[${idx + 1}]</a></sup>
        </p>

        ${constraintsHtml ? `<h3>Constraints</h3>${constraintsHtml}` : ''}
      </div>
    `;

    referencesHtml += `
      <li id="ref-${idx}" class="reference-item">
        <span class="mw-cite-backlink"><a href="#${slug}">^</a></span>
        <span class="reference-text">
          Parameter <code>${r.path}</code> (${r.type}). Constraints: <code>${JSON.stringify(r.constraints)}</code>.
        </span>
      </li>
    `;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} - Wikipedia</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #FFFFFF;
      color: #202122;
      font-family: sans-serif;
      font-size: 14px;
      line-height: 1.6;
    }

    /* Wikipedia top header */
    .wiki-header {
      background-color: #F8F9FA;
      border-bottom: 1px solid #A2A9B1;
      padding: 0.5rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 48px;
    }
    .wiki-logo { font-size: 1.1rem; font-weight: bold; font-family: Georgia, serif; cursor: pointer; color: #000; }
    .wiki-search-box input {
      border: 1px solid #A2A9B1;
      padding: 0.25rem 0.5rem;
      font-size: 0.8rem;
      width: 240px;
    }

    .wiki-body {
      display: flex;
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
      gap: 3rem;
    }

    /* Left-aligned Table of Contents */
    .wiki-toc {
      width: 250px;
      background-color: #F8F9FA;
      border: 1px solid #A2A9B1;
      padding: 1rem;
      align-self: flex-start;
      position: sticky;
      top: 2rem;
      max-height: calc(100vh - 100px);
      overflow-y: auto;
    }
    .toc-title { font-weight: bold; font-size: 0.95rem; border-bottom: 1px solid #A2A9B1; padding-bottom: 0.25rem; margin-bottom: 0.75rem; text-align: center; }
    .toc-list { list-style: none; }
    .toc-level-1 { font-size: 0.85rem; margin-bottom: 0.5rem; cursor: pointer; display: flex; gap: 0.5rem; }
    .toc-level-1:hover { text-decoration: underline; color: #0645AD; }
    .toc-number { color: #54595D; }

    .wiki-content {
      flex: 1;
      min-width: 0;
    }
    
    .wiki-page-title {
      font-family: Georgia, serif;
      font-size: 2.2rem;
      border-bottom: 1px solid #A2A9B1;
      padding-bottom: 0.25rem;
      margin-bottom: 1rem;
      font-weight: 400;
    }

    /* Wikipedia infobox */
    .wiki-infobox {
      float: right;
      width: 280px;
      border: 1px solid #A2A9B1;
      background-color: #F8F9FA;
      padding: 0.75rem;
      margin-left: 1.5rem;
      margin-bottom: 1.5rem;
      font-size: 0.8rem;
    }
    .infobox-title { font-weight: bold; text-align: center; font-size: 0.95rem; border-bottom: 1px solid #A2A9B1; padding-bottom: 0.5rem; margin-bottom: 0.5rem; }
    .infobox-table { width: 100%; border-collapse: collapse; }
    .infobox-table td { padding: 0.25rem 0; border-bottom: 1px solid #EAECF0; }
    .infobox-table tr td:first-child { font-weight: bold; width: 45%; }

    .wiki-section { margin-bottom: 2.5rem; }
    .wiki-section h2 {
      font-family: Georgia, serif;
      font-size: 1.5rem;
      border-bottom: 1px solid #A2A9B1;
      padding-bottom: 0.25rem;
      margin-bottom: 0.75rem;
      font-weight: 400;
      word-break: break-all;
    }
    .wiki-section h3 { font-size: 1.1rem; margin-bottom: 0.5rem; font-weight: bold; }
    
    .wiki-paragraph { margin-bottom: 1rem; text-align: justify; }
    .reference-cite a { text-decoration: none; color: #0645AD; font-size: 0.75rem; font-weight: normal; }
    .reference-cite a:hover { text-decoration: underline; }

    .wiki-metadata-table {
      float: right;
      width: 220px;
      border: 1px solid #EAECF0;
      background-color: #FFF;
      font-size: 0.75rem;
      margin-left: 1rem;
      margin-bottom: 0.5rem;
    }
    .wiki-metadata-table td { padding: 0.25rem 0.5rem; border-bottom: 1px solid #EAECF0; }
    .wiki-metadata-table tr td:first-child { font-weight: bold; background: #F8F9FA; width: 40%; }

    .wiki-list { margin-left: 2rem; margin-bottom: 1rem; }
    
    /* References Section */
    .wiki-references-section { border-top: 1px solid #A2A9B1; padding-top: 1.5rem; margin-top: 4rem; }
    .wiki-references-section h2 { font-family: Georgia, serif; font-size: 1.3rem; margin-bottom: 1rem; font-weight: 400; }
    .references-list { list-style: decimal; margin-left: 2rem; font-size: 0.8rem; }
    .reference-item { margin-bottom: 0.5rem; }
    .mw-cite-backlink a { text-decoration: none; color: #0645AD; font-weight: bold; margin-right: 0.5rem; }

    code { font-family: monospace; background-color: #F8F9FA; padding: 0.1rem 0.3rem; border: 1px solid #EAECF0; }
  </style>
</head>
<body>

  <div class="wiki-header">
    <div class="wiki-logo">WIKIPEDIA</div>
    <div class="wiki-search-box">
      <input type="text" placeholder="Search Wikipedia Spec...">
    </div>
  </div>

  <div class="wiki-body">
    <div class="wiki-toc">
      <div class="toc-title">Contents</div>
      <ul class="toc-list">
        ${tocHtml}
      </ul>
    </div>

    <div class="wiki-content">
      <h1 class="wiki-page-title">${title}</h1>
      
      <div class="wiki-infobox">
        <div class="infobox-title">${title} Specification</div>
        <table class="infobox-table">
          <tr>
            <td>Dialect</td>
            <td>JSON Schema Draft 3</td>
          </tr>
          <tr>
            <td>Property Nodes</td>
            <td>${rows.length}</td>
          </tr>
          <tr>
            <td>Access</td>
            <td>Public API</td>
          </tr>
        </table>
      </div>

      <p class="wiki-paragraph" style="font-size: 1.1rem; margin-bottom: 2rem;">
        This article documents the configuration properties and schemas for the <strong>${title}</strong> system.
        ${desc}
      </p>

      <div class="sections-container">
        ${articleContentHtml}
      </div>

      <div class="wiki-references-section">
        <h2>References</h2>
        <ol class="references-list">
          ${referencesHtml}
        </ol>
      </div>
    </div>
  </div>

  <script>
    function scrollToWiki(id) {
      const target = document.getElementById(id);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  </script>
</body>
</html>`;
};
