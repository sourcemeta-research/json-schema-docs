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

  let rowsHtml = '';
  
  rows.forEach((r, idx) => {
    let constraintsHtml = '';
    const constraintEntries = Object.entries(r.constraints);
    if (constraintEntries.length > 0) {
      constraintsHtml = '<div class="vercel-git-info"><h4>VALIDATION SPECS</h4>';
      constraintEntries.forEach(([key, val]) => {
        if (typeof val === 'object' && val !== null) {
          constraintsHtml += `
            <div class="git-meta nested" style="flex-wrap: wrap;">
              <span class="git-branch">● ${key}</span>
              <span class="nested-toggle" style="color: #000; cursor: pointer; font-weight: bold; margin-left: 10px;" onclick="event.stopPropagation(); const el = this.nextElementSibling; el.style.display = el.style.display === 'none' ? 'block' : 'none'; this.innerText = el.style.display === 'none' ? '▶ expand' : '▼ collapse';">▶ expand</span>
              <div class="nested-detail-box" style="display:none; width: 100%; margin-top: 5px;">
                <pre style="font-family: monospace; font-size: 0.75rem; background: #fafafa; border-left: 2px solid #000; padding: 5px; color: #000; overflow-x: auto;">${JSON.stringify(val, null, 2)}</pre>
              </div>
            </div>
          `;
        } else {
          constraintsHtml += `
            <div class="git-meta">
              <span class="git-branch">● ${key}</span>
              <span class="git-commit">${JSON.stringify(val)}</span>
            </div>
          `;
        }
      });
      constraintsHtml += '</div>';
    }

    rowsHtml += `
      <div class="vercel-row" onclick="toggleVercelRow(${idx})">
        <div class="row-top">
          <div class="col-main">
            <span class="status-dot ${r.required ? 'ready' : 'building'}"></span>
            <span class="vercel-path">${r.path}</span>
          </div>
          <div class="col-type"><code>${r.type}</code></div>
          <div class="col-date">${r.required ? 'REQUIRED' : 'OPTIONAL'}</div>
        </div>
        
        <div id="vercel-detail-${idx}" class="vercel-detail-drawer">
          <div class="detail-grid">
            <div class="detail-left">
              <h4>PARAMETER DEFINITION</h4>
              <p>${r.description || 'No descriptive summary provided.'}</p>
            </div>
            <div class="detail-right">
              <h4>JSON CONSTRAINTS</h4>
              ${constraintsHtml || '<span style="color:#666; font-size:0.75rem;">None</span>'}
            </div>
          </div>
        </div>
      </div>
    `;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} - Vercel Console</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #000000;
      color: #FFFFFF;
      font-family: 'Plus Jakarta Sans', sans-serif;
      padding: 3rem;
    }
    
    header {
      border-bottom: 1px solid #333;
      padding-bottom: 2rem;
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    h1 {
      font-size: 1.6rem;
      font-weight: 700;
      letter-spacing: -0.03em;
    }
    .vercel-tabs {
      display: flex;
      gap: 1.5rem;
      border-bottom: 1px solid #111;
      padding-bottom: 0.5rem;
      margin-bottom: 2rem;
    }
    .vercel-tab {
      background: none;
      border: none;
      color: #888;
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
    }
    .vercel-tab.active {
      color: #FFF;
      border-bottom: 2px solid #FFF;
      padding-bottom: 0.5rem;
    }

    .vercel-container {
      border: 1px solid #333;
      border-radius: 8px;
      background-color: #000;
      overflow: hidden;
    }
    .vercel-header-row {
      display: flex;
      background-color: #111;
      border-bottom: 1px solid #333;
      padding: 0.75rem 1.5rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .vercel-row {
      border-bottom: 1px solid #333;
      cursor: pointer;
      transition: background-color 0.15s;
    }
    .vercel-row:hover { background-color: #0A0A0A; }
    .vercel-row:last-child { border-bottom: none; }
    
    .row-top {
      display: flex;
      padding: 1rem 1.5rem;
      align-items: center;
      font-size: 0.85rem;
    }
    .col-main { flex: 2; display: flex; align-items: center; gap: 0.75rem; }
    .col-type { flex: 1; }
    .col-date { flex: 1; text-align: right; color: #888; font-size: 0.8rem; }
    
    .status-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
    .status-dot.ready { background-color: #50E3C2; }
    .status-dot.building { background-color: #F5A623; }
    
    .vercel-path { font-weight: 600; font-family: 'JetBrains Mono', monospace; }
    
    .vercel-detail-drawer {
      display: none;
      background-color: #0A0A0A;
      border-top: 1px solid #222;
      padding: 1.5rem;
    }
    .vercel-detail-drawer.open { display: block; }
    
    .detail-grid { display: flex; gap: 2.5rem; }
    .detail-left { flex: 1; }
    .detail-right { flex: 1; border-left: 1px solid #222; padding-left: 2.5rem; }
    
    h4 { font-size: 0.75rem; color: #888; letter-spacing: 0.05em; margin-bottom: 0.75rem; font-weight: 700; }
    p { font-size: 0.85rem; color: #CCC; line-height: 1.5; }
    
    .vercel-git-info { display: flex; flex-direction: column; gap: 0.5rem; }
    .git-meta { display: flex; justify-content: space-between; font-size: 0.8rem; font-family: 'JetBrains Mono', monospace; }
    .git-branch { color: #50E3C2; }
    .git-commit { color: #888; }
  </style>
</head>
<body>

  <header>
    <div>
      <h1>${title} Console</h1>
      <p style="color:#888; font-size: 0.85rem; margin-top:0.25rem;">${desc}</p>
    </div>
    <span style="font-family: monospace; font-size:0.8rem; color:#888;">project: active-schema</span>
  </header>

  <div class="vercel-tabs">
    <button class="vercel-tab active">Overview</button>
    <button class="vercel-tab">Deployments</button>
    <button class="vercel-tab">Settings</button>
  </div>

  <div class="vercel-container">
    <div class="vercel-header-row">
      <div class="col-main">Parameter Path</div>
      <div class="col-type">Type</div>
      <div class="col-date">Required</div>
    </div>
    ${rowsHtml}
  </div>

  <script>
    function toggleVercelRow(idx) {
      const drawer = document.getElementById('vercel-detail-' + idx);
      drawer.classList.toggle('open');
    }
  </script>
</body>
</html>`;
};
