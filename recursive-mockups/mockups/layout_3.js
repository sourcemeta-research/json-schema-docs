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

  let sidebarListHtml = '';
  let topicsHtml = '';

  rows.forEach((r, idx) => {
    sidebarListHtml += `
      <li class="nav-item-apple" id="apple-nav-${idx}" onclick="showAppleDoc(${idx})">
        <span class="icon-cube">■</span>
        <span class="nav-name">${r.path}</span>
      </li>
    `;

    let constraintsHtml = '';
    const constraintEntries = Object.entries(r.constraints);
    if (constraintEntries.length > 0) {
      constraintsHtml = '<div class="apple-constraints-list">';
      constraintEntries.forEach(([key, val]) => {
        if (typeof val === 'object' && val !== null) {
          constraintsHtml += `
            <div class="constraint-row nested" style="flex-wrap: wrap;">
              <span class="c-key">${key}:</span>
              <span class="nested-toggle" style="color: var(--accent); cursor: pointer; font-weight: bold; margin-left: 10px;" onclick="const el = this.nextElementSibling; el.style.display = el.style.display === 'none' ? 'block' : 'none'; this.innerText = el.style.display === 'none' ? '▶ expand' : '▼ collapse';">▶ expand</span>
              <div class="nested-detail-box" style="display:none; width: 100%; margin-top: 5px;">
                <pre style="font-family: monospace; font-size: 0.75rem; background: #F5F5F7; border-left: 2px solid var(--accent); padding: 5px; color: #1D1D1F; overflow-x: auto;">${JSON.stringify(val, null, 2)}</pre>
              </div>
            </div>
          `;
        } else {
          constraintsHtml += `
            <div class="constraint-row">
              <span class="c-key">${key}:</span>
              <span class="c-val">${JSON.stringify(val)}</span>
            </div>
          `;
        }
      });
      constraintsHtml += '</div>';
    }

    topicsHtml += `
      <div id="apple-doc-${idx}" class="apple-doc-content ${idx === 0 ? 'active' : ''}">
        <span class="meta-label">PROPERTY</span>
        <h1 class="doc-title">${r.path}</h1>
        
        <div class="declaration-block">
          <h3>Declaration</h3>
          <pre><code><span class="decl-key">let</span> <span class="decl-name">${r.name}</span>: <span class="decl-type">${r.type}</span> <span class="decl-val">${r.required ? '= required' : '= optional'}</span></code></pre>
        </div>

        <div class="doc-section">
          <h3>Discussion</h3>
          <p class="desc-text">${r.description || 'No supplementary comments accompany this property.'}</p>
        </div>

        <div class="doc-section">
          <h3>Validation Constraints</h3>
          ${constraintsHtml || '<p class="none-text">No additional constraints defined.</p>'}
        </div>

        <div class="doc-section">
          <h3>Attributes</h3>
          <table class="attrib-table">
            <tr>
              <td>Required</td>
              <td><strong>${r.required ? 'YES' : 'NO'}</strong></td>
            </tr>
            <tr>
              <td>Depth Index</td>
              <td><code>Level ${r.depth}</code></td>
            </tr>
          </table>
        </div>
      </div>
    `;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} - Apple Developer Reference</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #FFFFFF;
      color: #1D1D1F;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      display: flex;
      height: 100vh;
      overflow: hidden;
    }

    .apple-sidebar {
      width: 260px;
      min-width: 180px;
      max-width: 450px;
      background-color: #F5F5F7;
      border-right: 1px solid #D2D2D7;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .sidebar-header { padding: 1.5rem; border-bottom: 1px solid #D2D2D7; }
    .sidebar-header h3 { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: #86868B; }
    
    .nav-list-apple { list-style: none; overflow-y: auto; flex: 1; padding: 0.5rem; }
    .nav-item-apple {
      padding: 0.5rem 1rem;
      font-size: 0.8rem;
      color: #1D1D1F;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border-radius: 6px;
      margin-bottom: 0.15rem;
    }
    .nav-item-apple:hover { background-color: rgba(0,0,0,0.04); }
    .nav-item-apple.active {
      background-color: #0071E3; /* Apple Blue */
      color: #FFFFFF;
      font-weight: 600;
    }
    .nav-item-apple.active .icon-cube { color: #FFFFFF; }
    .icon-cube { color: #86868B; font-size: 0.7rem; }
    .nav-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 170px; font-family: monospace; }

    .resizer {
      width: 4px;
      cursor: col-resize;
      background-color: #D2D2D7;
      z-index: 10;
    }
    .resizer:hover { background-color: #0071E3; }

    .doc-pane {
      flex: 1;
      overflow-y: auto;
      background-color: #FFFFFF;
      padding: 3rem 4rem;
      height: 100%;
    }
    
    .apple-breadcrumbs {
      font-size: 0.75rem;
      color: #86868B;
      margin-bottom: 2rem;
      display: flex;
      gap: 0.5rem;
    }
    .apple-breadcrumbs span { cursor: pointer; }
    .apple-breadcrumbs span:hover { color: #0071E3; }

    .apple-doc-content { display: none; max-width: 700px; }
    .apple-doc-content.active { display: block; }
    
    .meta-label { font-size: 0.7rem; font-weight: 700; color: #86868B; letter-spacing: 0.05em; text-transform: uppercase; }
    .doc-title { font-size: 2.2rem; font-weight: 700; color: #1D1D1F; margin-top: 0.25rem; margin-bottom: 1.5rem; letter-spacing: -0.03em; word-break: break-all; font-family: monospace; }

    .declaration-block { margin-bottom: 2.5rem; }
    .declaration-block h3 { font-size: 1.1rem; font-weight: 600; margin-bottom: 0.75rem; }
    .declaration-block pre {
      background-color: #F5F5F7;
      border: 1px solid #D2D2D7;
      padding: 1.25rem 1.5rem;
      border-radius: 8px;
      font-family: monospace;
      font-size: 0.85rem;
      overflow-x: auto;
    }
    .decl-key { color: #B31312; }
    .decl-name { color: #000; font-weight: bold; }
    .decl-type { color: #0071E3; }
    .decl-val { color: #86868B; }

    .doc-section { margin-bottom: 2.5rem; }
    .doc-section h3 { font-size: 1.1rem; font-weight: 600; margin-bottom: 0.75rem; border-bottom: 1px solid #D2D2D7; padding-bottom: 0.5rem; }
    .desc-text { font-size: 0.95rem; color: #1D1D1F; line-height: 1.5; }

    .apple-constraints-list { display: flex; flex-direction: column; gap: 0.5rem; }
    .constraint-row { display: flex; justify-content: space-between; font-size: 0.8rem; border-bottom: 1px dashed #E2E2E2; padding: 0.25rem 0; font-family: monospace; }
    .c-key { color: #86868B; }
    .c-val { color: #0071E3; font-weight: 600; }

    .attrib-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
    .attrib-table td { border-bottom: 1px solid #E2E2E2; padding: 0.5rem 0; }
    .attrib-table tr td:first-child { width: 30%; color: #86868B; }
    
    .none-text { font-size: 0.85rem; color: #86868B; font-style: italic; }
  </style>
</head>
<body>

  <div class="apple-sidebar" id="apple-sidebar">
    <div class="sidebar-header">
      <h3>API Reference</h3>
    </div>
    <ul class="nav-list-apple">
      ${sidebarListHtml}
    </ul>
  </div>

  <div class="resizer" id="sidebar-resizer"></div>

  <div class="doc-pane">
    <div class="apple-breadcrumbs">
      <span>Developer</span> &gt; <span>Documentation</span> &gt; <span>${title}</span> &gt; <span style="color:#1D1D1F; font-weight:600;">API Reference</span>
    </div>
    
    <div class="docs-list">
      ${topicsHtml}
    </div>
  </div>

  <script>
    function showAppleDoc(idx) {
      document.querySelectorAll('.nav-item-apple').forEach(item => item.classList.remove('active'));
      document.querySelectorAll('.apple-doc-content').forEach(doc => doc.classList.remove('active'));

      document.getElementById('apple-nav-' + idx).classList.add('active');
      document.getElementById('apple-doc-' + idx).classList.add('active');
    }

    showAppleDoc(0);

    const sidebar = document.getElementById('apple-sidebar');
    const resizer = document.getElementById('sidebar-resizer');
    let isResizing = false;

    resizer.addEventListener('mousedown', () => {
      isResizing = true;
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isResizing) return;
      if (e.clientX > 180 && e.clientX < 450) {
        sidebar.style.width = e.clientX + 'px';
      }
    });

    document.addEventListener('mouseup', () => {
      isResizing = false;
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    });
  </script>
</body>
</html>`;
};
