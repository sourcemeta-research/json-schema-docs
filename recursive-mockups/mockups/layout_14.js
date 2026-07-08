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

  let listHtml = '';
  let inspectorPanelsHtml = '';
  
  rows.forEach((r, idx) => {
    listHtml += `
      <div class="ray-row ${idx === 0 ? 'active' : ''}" id="ray-row-${idx}" onclick="focusRayRow(${idx})" data-path="${r.path}">
        <div class="row-left">
          <span class="ray-icon">⌘</span>
          <span class="ray-label">${r.path}</span>
        </div>
        <div class="row-right">
          <span class="ray-type-tag">${r.type}</span>
          ${r.required ? '<span class="ray-req-dot"></span>' : ''}
        </div>
      </div>
    `;

    inspectorPanelsHtml += `
      <div id="inspector-${idx}" class="ray-inspector-panel ${idx === 0 ? 'active' : ''}">
        <h3>${r.path}</h3>
        <span class="badge ${r.required ? 'req' : 'opt'}">${r.required ? 'REQUIRED' : 'OPTIONAL'}</span>
        
        <div class="sec-meta">
          <div class="meta-item">
            <span class="meta-k">Type</span>
            <span class="meta-v">${r.type.toUpperCase()}</span>
          </div>
          <div class="meta-item">
            <span class="meta-k">Depth</span>
            <span class="meta-v">${r.depth} LEVELS</span>
          </div>
        </div>

        <div class="sec-body">
          <h4>DESCRIPTION</h4>
          <p>${r.description || 'No documentation comments available.'}</p>
        </div>

        <div class="sec-body">
          <h4>CONSTRAINTS</h4>
          <span class="nested-toggle" style="color: #FF66A0; cursor: pointer; font-weight: bold; font-size: 0.75rem;" onclick="const el = this.nextElementSibling; el.style.display = el.style.display === 'none' ? 'block' : 'none'; this.innerText = el.style.display === 'none' ? '▶ show constraints' : '▼ hide constraints';">▶ show constraints</span>
          <pre style="display:none; margin-top:5px;"><code>${JSON.stringify(r.constraints, null, 2)}</code></pre>
        </div>

        <div class="ray-actions">
          <div class="action-shortcut">
            <span>Copy Parameter Name</span>
            <kbd>⌘ C</kbd>
          </div>
          <div class="action-shortcut">
            <span>Toggle Inspector Drawer</span>
            <kbd>↵</kbd>
          </div>
        </div>
      </div>
    `;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} - Raycast Command Palette</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #0E0E10;
      color: #E2E8F0;
      font-family: 'Plus Jakarta Sans', sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      overflow: hidden;
      padding: 1.5rem;
    }
    
    .raycast-panel {
      width: 100%;
      max-width: 900px;
      height: 520px;
      background-color: #17171A; /* Raycast Charcoal */
      border: 1px solid #2D2D30;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 30px 60px rgba(0,0,0,0.5);
    }
    
    .ray-search-bar {
      display: flex;
      align-items: center;
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid #2D2D30;
    }
    .ray-search-icon { font-size: 1.2rem; color: #8E8E93; margin-right: 1rem; }
    .ray-input {
      flex: 1;
      background: none;
      border: none;
      color: #FFF;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 1rem;
      outline: none;
    }
    .ray-input::placeholder { color: #5B5B5E; }

    .ray-workspace {
      flex: 1;
      display: flex;
      overflow: hidden;
    }
    
    .ray-list-pane {
      flex: 1.2;
      overflow-y: auto;
      padding: 0.75rem;
      border-right: 1px solid #2D2D30;
    }
    .ray-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1rem;
      cursor: pointer;
      border-radius: 8px;
      margin-bottom: 0.25rem;
      transition: background-color 0.1s;
    }
    .ray-row:hover { background-color: rgba(255,255,255,0.03); }
    .ray-row.active {
      background-color: rgba(255, 255, 255, 0.08);
      border: 1px solid #3d3d42;
    }
    .ray-row.active .ray-label { color: #FFF; }
    
    .row-left { display: flex; align-items: center; gap: 0.75rem; overflow: hidden; }
    .ray-icon { font-family: monospace; font-size: 0.85rem; color: #8E8E93; }
    .ray-label { font-size: 0.85rem; color: #C2C2C6; font-family: 'JetBrains Mono', monospace; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; max-width: 250px; }
    
    .row-right { display: flex; align-items: center; gap: 0.5rem; }
    .ray-type-tag { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #FF66A0; text-transform: lowercase; }
    .ray-req-dot { width: 6px; height: 6px; background-color: #FF5252; border-radius: 50%; }

    .ray-inspector-pane {
      flex: 0.8;
      background-color: #121214;
      padding: 1.5rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }
    .ray-inspector-panel { display: none; height: 100%; flex-direction: column; }
    .ray-inspector-panel.active { display: flex; }
    
    .ray-inspector-panel h3 { font-size: 1.15rem; font-weight: 700; color: #FFF; margin-bottom: 0.5rem; word-break: break-all; }
    
    .badge { font-size: 0.65rem; font-weight: 700; padding: 0.15rem 0.4rem; border-radius: 4px; display: inline-block; margin-bottom: 1.5rem; }
    .badge.req { background-color: rgba(255, 82, 82, 0.15); color: #FF5252; }
    .badge.opt { background-color: rgba(255,255,255,0.05); color: #8E8E93; }

    .sec-meta { display: flex; justify-content: space-between; border-bottom: 1px solid #2D2D30; padding-bottom: 1rem; margin-bottom: 1rem; }
    .meta-item { display: flex; flex-direction: column; }
    .meta-k { font-size: 0.75rem; color: #5B5B5E; text-transform: uppercase; }
    .meta-v { font-size: 0.8rem; font-weight: 600; color: #FFF; }

    .sec-body { margin-bottom: 1.5rem; }
    .sec-body h4 { font-size: 0.7rem; color: #5B5B5E; margin-bottom: 0.5rem; font-weight: 700; letter-spacing: 0.05em; }
    .sec-body p { font-size: 0.8rem; color: #C2C2C6; line-height: 1.4; }
    .sec-body pre { background: #0E0E10; border: 1px solid #2D2D30; padding: 0.5rem; border-radius: 6px; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #34D399; overflow-x: auto; }

    .ray-actions { border-top: 1px solid #2D2D30; padding-top: 1rem; margin-top: auto; }
    .action-shortcut { display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: #8E8E93; margin-bottom: 0.5rem; }
    kbd { background-color: #2D2D30; border-radius: 4px; padding: 0.1rem 0.4rem; font-size: 0.7rem; color: #FFF; font-family: inherit; }
  </style>
</head>
<body>

  <div class="raycast-panel">
    <div class="ray-search-bar">
      <span class="ray-search-icon">🔍</span>
      <input type="text" class="ray-input" placeholder="Search commands, properties or paths..." oninput="filterRaycast(this.value)">
    </div>
    
    <div class="ray-workspace">
      <div class="ray-list-pane" id="ray-list">
        ${listHtml}
      </div>
      
      <div class="ray-inspector-pane">
        ${inspectorPanelsHtml}
      </div>
    </div>
  </div>

  <script>
    let focusedIndex = 0;

    function focusRayRow(idx) {
      document.querySelectorAll('.ray-row').forEach(r => r.classList.remove('active'));
      document.querySelectorAll('.ray-inspector-panel').forEach(p => p.classList.remove('active'));

      document.getElementById('ray-row-' + idx).classList.add('active');
      document.getElementById('inspector-' + idx).classList.add('active');
      focusedIndex = idx;
    }

    function filterRaycast(val) {
      const filter = val.toLowerCase();
      let firstVisible = null;

      document.querySelectorAll('.ray-row').forEach((row, idx) => {
        const path = row.getAttribute('data-path').toLowerCase();
        if (path.includes(filter)) {
          row.style.display = 'flex';
          if (firstVisible === null) firstVisible = idx;
        } else {
          row.style.display = 'none';
        }
      });

      if (firstVisible !== null) {
        focusRayRow(firstVisible);
      }
    }
  </script>
</body>
</html>`;
};
