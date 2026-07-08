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
      <div class="google-nav-item" id="google-nav-${idx}" onclick="focusGoogleDoc(${idx})">
        <span class="nav-icon">📁</span>
        <span class="nav-text">${r.path}</span>
      </div>
    `;

    let constraintsHtml = '';
    const constraintEntries = Object.entries(r.constraints);
    if (constraintEntries.length > 0) {
      constraintsHtml = '<div class="google-constraints-box">';
      constraintEntries.forEach(([key, val]) => {
        if (typeof val === 'object' && val !== null) {
          constraintsHtml += `
            <div class="google-c-row">
              <span class="c-k">${key}:</span>
              <span class="nested-toggle" style="color: #1A73E8; cursor: pointer; font-weight: 500;" onclick="const el = this.nextElementSibling; el.style.display = el.style.display === 'none' ? 'block' : 'none'; this.innerText = el.style.display === 'none' ? '▶ show' : '▼ hide';">▶ show</span>
              <div class="nested-detail-box" style="display:none; margin-top: 5px; width: 100%;">
                <pre style="font-family: monospace; font-size: 0.75rem; background: #F8F9FA; border-left: 3px solid #1A73E8; padding: 5px; color: #3C4043; overflow-x: auto;">${JSON.stringify(val, null, 2)}</pre>
              </div>
            </div>
          `;
        } else {
          constraintsHtml += `
            <div class="google-c-row">
              <span class="c-k">${key}:</span>
              <span class="c-v">${JSON.stringify(val)}</span>
            </div>
          `;
        }
      });
      constraintsHtml += '</div>';
    }

    contentHtml += `
      <div class="google-card ${idx === 0 ? 'active' : ''}" id="google-card-${idx}">
        <div class="card-header">
          <span class="type-badge">${r.type.toUpperCase()}</span>
          <h2>${r.path}</h2>
        </div>
        
        <p class="card-desc">${r.description || 'No descriptive comments are logged for this field.'}</p>
        
        <div class="metadata-row">
          <span class="meta-label">Required:</span>
          <span class="meta-value">${r.required ? 'Yes' : 'No'}</span>
          <span class="meta-separator">|</span>
          <span class="meta-label">Depth:</span>
          <span class="meta-value">Level ${r.depth}</span>
        </div>

        ${constraintsHtml}
      </div>
    `;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} - Google Developers</title>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Product+Sans&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #F8F9FA;
      color: #3C4043;
      font-family: 'Roboto', sans-serif;
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
    }

    header {
      background-color: #FFFFFF;
      border-bottom: 1px solid #DADCE0;
      padding: 0.75rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 64px;
      z-index: 100;
    }
    .brand { display: flex; align-items: center; gap: 1rem; }
    .brand img { height: 24px; }
    .brand h1 { font-family: 'Product Sans', sans-serif; font-size: 1.25rem; font-weight: 400; color: #5F6368; }
    .search-box input {
      border: 1px solid #DADCE0;
      border-radius: 8px;
      padding: 0.5rem 1rem;
      font-size: 0.85rem;
      width: 320px;
      background-color: #F1F3F4;
      outline: none;
    }
    .search-box input:focus { background-color: #FFFFFF; border-color: #1A73E8; }

    .main-container { display: flex; flex: 1; overflow: hidden; }

    .google-drawer {
      width: 280px;
      background-color: #FFFFFF;
      border-right: 1px solid #DADCE0;
      overflow-y: auto;
      padding: 1rem 0;
    }
    .google-nav-item {
      padding: 0.75rem 1.5rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 0.85rem;
      color: #3C4043;
      font-weight: 500;
      border-radius: 0 24px 24px 0;
      margin-right: 0.5rem;
    }
    .google-nav-item:hover { background-color: #F1F3F4; }
    .google-nav-item.active {
      background-color: #E8F0FE;
      color: #1A73E8;
    }
    
    .nav-icon { font-size: 1rem; }
    .nav-text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-family: 'JetBrains Mono', monospace; }

    .google-content {
      flex: 1;
      overflow-y: auto;
      padding: 3rem 4rem;
    }
    .doc-intro { max-width: 800px; margin-bottom: 2.5rem; }
    .doc-intro h1 { font-size: 2rem; font-weight: 400; color: #202124; margin-bottom: 0.5rem; }
    .doc-intro p { font-size: 0.95rem; color: #5F6368; }

    .google-card {
      display: none;
      background-color: #FFFFFF;
      border: 1px solid #DADCE0;
      border-radius: 8px;
      padding: 2rem;
      max-width: 800px;
      box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
    }
    .google-card.active { display: block; }
    
    .card-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
    .type-badge {
      background-color: #E8F0FE;
      color: #1A73E8;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-family: 'JetBrains Mono', monospace;
    }
    .card-header h2 { font-size: 1.4rem; font-weight: 500; color: #202124; font-family: 'JetBrains Mono', monospace; word-break: break-all; }
    
    .card-desc { font-size: 0.95rem; color: #3C4043; line-height: 1.6; margin-bottom: 1.5rem; }

    .metadata-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.85rem;
      color: #5F6368;
      border-top: 1px solid #DADCE0;
      padding-top: 1rem;
      margin-bottom: 1.5rem;
    }
    .meta-value { font-weight: 700; color: #202124; }
    .meta-separator { color: #DADCE0; }

    .google-constraints-box {
      background-color: #F8F9FA;
      border: 1px solid #DADCE0;
      border-radius: 4px;
      padding: 1rem;
    }
    .google-c-row { display: flex; flex-wrap: wrap; font-size: 0.8rem; margin-bottom: 0.5rem; border-bottom: 1px dashed #DADCE0; padding-bottom: 0.5rem; }
    .google-c-row:last-child { margin-bottom: 0; border-bottom: none; padding-bottom: 0; }
    .c-k { font-weight: 700; color: #3C4043; font-family: 'JetBrains Mono', monospace; margin-right: 0.5rem; }
    .c-v { color: #1A73E8; font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body>

  <header>
    <div class="brand">
      <h1>Google Developers</h1>
    </div>
    <div class="search-box">
      <input type="text" placeholder="Search API Reference...">
    </div>
  </header>

  <div class="main-container">
    <div class="google-drawer">
      <div class="left-header" style="padding: 0 1.5rem 1rem; font-size: 0.75rem; color: #70757a; font-weight: 700; border-bottom: 1px solid #dadce0;">Paths Reference</div>
      <div style="margin-top: 1rem;">
        ${sidebarHtml}
      </div>
    </div>
    
    <div class="google-content">
      <div class="doc-intro">
        <h1>${title} Schema</h1>
        <p>${desc}</p>
      </div>
      
      <div class="cards-list">
        ${contentHtml}
      </div>
    </div>
  </div>

  <script>
    function focusGoogleDoc(idx) {
      document.querySelectorAll('.google-nav-item').forEach(i => i.classList.remove('active'));
      document.querySelectorAll('.google-card').forEach(c => c.classList.remove('active'));

      document.getElementById('google-nav-' + idx).classList.add('active');
      document.getElementById('google-card-' + idx).classList.add('active');
    }

    focusGoogleDoc(0);
  </script>
</body>
</html>`;
};
