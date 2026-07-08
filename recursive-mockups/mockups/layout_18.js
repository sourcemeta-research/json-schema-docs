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

  let sidebarHtml = '';
  let contentHtml = '';

  rows.forEach((r, idx) => {
    sidebarHtml += `
      <li class="json-nav-item" id="json-nav-${idx}" onclick="focusJsonDoc(${idx})">
        <span class="nav-bracket">{</span>
        <span class="nav-text">${r.path}</span>
        <span class="nav-bracket">}</span>
      </li>
    `;

    let constraintsHtml = '';
    const constraintEntries = Object.entries(r.constraints);
    if (constraintEntries.length > 0) {
      constraintsHtml = '<div class="json-spec-block"><h4>Validation Properties</h4><pre><code>';
      constraintEntries.forEach(([key, val]) => {
        if (typeof val === 'object' && val !== null) {
          constraintsHtml += `  "${key}": <span class="nested-toggle" style="color:#2aa198; cursor:pointer; font-weight:bold;" onclick="const el = this.nextElementSibling; el.style.display = el.style.display === 'none' ? 'block' : 'none'; this.innerText = el.style.display === 'none' ? '▶ expand' : '▼ collapse';">▶ expand</span><div class="nested-detail-box" style="display:none; padding-left:15px; border-left: 2px solid #2aa198; margin-top:5px; color:#268bd2;">${JSON.stringify(val, null, 2)}</div>,\n`;
        } else {
          constraintsHtml += `  "${key}": ${JSON.stringify(val)},\n`;
        }
      });
      constraintsHtml += '</code></pre></div>';
    }

    contentHtml += `
      <div class="json-doc-card ${idx === 0 ? 'active' : ''}" id="json-card-${idx}">
        <div class="card-meta">
          <span class="type-badge">${r.type}</span>
          <span class="req-badge ${r.required ? 'required' : 'optional'}">${r.required ? 'REQUIRED' : 'OPTIONAL'}</span>
        </div>
        
        <h2>${r.path}</h2>
        <p class="card-desc">${r.description || 'No supplementary comments logged.'}</p>
        
        ${constraintsHtml}
      </div>
    `;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} - JSON Schema Reference</title>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #002b36; /* Solarized Dark */
      color: #93a1a1;
      font-family: 'Fira Sans', sans-serif;
      display: flex;
      height: 100vh;
      overflow: hidden;
    }

    /* Left pane: File directory tree */
    .json-sidebar {
      width: 280px;
      background-color: #073642;
      border-right: 1px solid #586e75;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .sidebar-header {
      padding: 1.5rem;
      border-bottom: 1px solid #586e75;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .logo-bracket { color: #859900; font-weight: bold; font-family: 'Fira Code', monospace; }
    .sidebar-header h2 { font-size: 1.15rem; color: #fdf6e3; font-weight: 500; }
    
    .json-nav-list { list-style: none; overflow-y: auto; flex: 1; padding: 1rem 0.5rem; }
    .json-nav-item {
      padding: 0.5rem 1rem;
      cursor: pointer;
      display: flex;
      gap: 0.25rem;
      font-size: 0.85rem;
      color: #93a1a1;
      border-radius: 4px;
      margin-bottom: 0.25rem;
      transition: background-color 0.1s;
    }
    .json-nav-item:hover { background-color: rgba(255,255,255,0.03); color: #fdf6e3; }
    .json-nav-item.active {
      background-color: #002b36;
      color: #2aa198; /* Green */
      font-weight: 600;
      border-left: 3px solid #268bd2;
    }
    .nav-bracket { color: #586e75; font-family: 'Fira Code', monospace; }
    .nav-text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 180px; font-family: 'Fira Code', monospace; }

    .json-content {
      flex: 1;
      overflow-y: auto;
      padding: 3rem 4rem;
      background-color: #002b36;
    }
    
    .doc-header {
      max-width: 800px;
      margin-bottom: 3rem;
      border-bottom: 1px solid #586e75;
      padding-bottom: 1.5rem;
    }
    .doc-header h1 { font-size: 2.2rem; color: #fdf6e3; font-weight: 600; }
    .doc-header p { color: #93a1a1; font-size: 0.95rem; margin-top: 0.5rem; }

    .json-doc-card {
      display: none;
      background-color: #073642;
      border: 1px solid #586e75;
      border-radius: 8px;
      padding: 2rem;
      max-width: 800px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .json-doc-card.active { display: block; }

    .card-meta { display: flex; gap: 0.75rem; margin-bottom: 1rem; }
    .type-badge {
      background-color: #002b36;
      border: 1px solid #586e75;
      color: #268bd2;
      font-family: 'Fira Code', monospace;
      font-size: 0.75rem;
      padding: 0.15rem 0.4rem;
      font-weight: 600;
    }
    .req-badge { font-size: 0.7rem; font-weight: 600; padding: 0.15rem 0.4rem; }
    .req-badge.required { background-color: rgba(220, 50, 47, 0.15); color: #dc322f; }
    .req-badge.optional { background-color: rgba(147, 161, 161, 0.1); color: #93a1a1; }

    .json-doc-card h2 { font-family: 'Fira Code', monospace; font-size: 1.3rem; color: #fdf6e3; margin-bottom: 0.75rem; word-break: break-all; }
    .card-desc { font-size: 0.9rem; color: #93a1a1; line-height: 1.5; margin-bottom: 1.5rem; }

    .json-spec-block {
      border: 1px solid #586e75;
      background-color: #002b36;
      border-radius: 6px;
      overflow: hidden;
    }
    .json-spec-block h4 { background-color: #073642; padding: 0.5rem 1rem; font-size: 0.75rem; color: #fdf6e3; border-bottom: 1px solid #586e75; }
    .json-spec-block pre { padding: 1rem; overflow-x: auto; }
    .json-spec-block code { font-family: 'Fira Code', monospace; font-size: 0.8rem; color: #859900; }
  </style>
</head>
<body>

  <div class="json-sidebar">
    <div class="sidebar-header">
      <span class="logo-bracket">{ }</span>
      <h2>JSON Schema Ref</h2>
    </div>
    <ul class="json-nav-list">
      ${sidebarHtml}
    </ul>
  </div>

  <div class="json-content">
    <header class="doc-header">
      <h1>${title} Specification</h1>
      <p>${desc}</p>
    </header>
    
    <div class="cards-container">
      ${contentHtml}
    </div>
  </div>

  <script>
    function focusJsonDoc(idx) {
      document.querySelectorAll('.json-nav-item').forEach(i => i.classList.remove('active'));
      document.querySelectorAll('.json-doc-card').forEach(c => c.classList.remove('active'));

      document.getElementById('json-nav-' + idx).classList.add('active');
      document.getElementById('json-card-' + idx).classList.add('active');
    }

    focusJsonDoc(0);
  </script>
</body>
</html>`;
};
