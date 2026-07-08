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

  let tableRowsHtml = '';
  let sidebarTablesHtml = '';
  
  // Group elements by root namespace to simulate database tables
  const namespaces = {};
  rows.forEach(r => {
    const parts = r.path.split('.');
    const ns = parts[0];
    if (!namespaces[ns]) namespaces[ns] = [];
    namespaces[ns].push(r);
  });

  Object.keys(namespaces).forEach((ns, idx) => {
    sidebarTablesHtml += `
      <li class="table-tab ${idx === 0 ? 'active' : ''}" id="tab-${ns}" onclick="showSupabaseTable('${ns}')">
        <span class="table-icon">田</span>
        <span class="table-name">${ns}</span>
      </li>
    `;
  });

  Object.entries(namespaces).forEach(([ns, nsRows], idx) => {
    let innerRows = '';
    nsRows.forEach(r => {
      innerRows += `
        <tr class="db-row">
          <td class="cell-name"><code>${r.path}</code></td>
          <td class="cell-type"><span class="db-type-badge">${r.type}</span></td>
          <td class="cell-req">${r.required ? '★ NOT NULL' : 'NULL'}</td>
          <td class="cell-constraints">
            <span class="nested-toggle" style="color: #3ECF8E; cursor: pointer; font-weight: bold;" onclick="const el = this.nextElementSibling; el.style.display = el.style.display === 'none' ? 'block' : 'none'; this.innerText = el.style.display === 'none' ? '▶ show rules' : '▼ hide rules';">▶ show rules</span>
            <div class="nested-detail-box" style="display:none; margin-top: 5px;">
              <pre style="font-family: monospace; font-size: 0.75rem; background: #141414; border-left: 2px solid #3ECF8E; padding: 5px; color: #3ECF8E; overflow-x: auto;">${JSON.stringify(r.constraints, null, 2)}</pre>
            </div>
          </td>
          <td class="cell-desc">${r.description || 'No description comments.'}</td>
        </tr>
      `;
    });

    tableRowsHtml += `
      <div class="db-grid-container ${idx === 0 ? 'active' : ''}" id="grid-${ns}">
        <div class="table-stats-bar">
          <span>Table: <strong>${ns}</strong></span>
          <span>Columns: <strong>${nsRows.length}</strong></span>
        </div>
        <table class="db-table">
          <thead>
            <tr>
              <th>Column Name</th>
              <th>Data Type</th>
              <th>Nullable</th>
              <th>Validation Constraints</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            ${innerRows}
          </tbody>
        </table>
      </div>
    `;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} - Supabase Table Editor</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #1c1c1c; /* Supabase Carbon */
      color: #EDEDED;
      font-family: 'Plus Jakarta Sans', sans-serif;
      display: flex;
      height: 100vh;
      overflow: hidden;
    }

    .supa-sidebar {
      width: 250px;
      background-color: #141414;
      border-right: 1px solid #2e2e2e;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .sidebar-brand {
      padding: 1.5rem;
      border-bottom: 1px solid #2e2e2e;
      font-weight: 700;
      color: #3ECF8E; /* Emerald Green */
      font-size: 0.95rem;
    }
    .table-list { list-style: none; padding: 1rem 0.5rem; overflow-y: auto; flex: 1; }
    .table-tab {
      padding: 0.6rem 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: #8E8E8E;
      font-size: 0.85rem;
      border-radius: 6px;
      margin-bottom: 0.2rem;
    }
    .table-tab:hover { background-color: #1f1f1f; color: #FFF; }
    .table-tab.active {
      background-color: rgba(62, 207, 142, 0.1);
      color: #3ECF8E;
      font-weight: 600;
      border: 1px solid rgba(62, 207, 142, 0.25);
    }
    
    .table-icon { font-size: 1rem; }

    .supa-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      height: 100%;
      background-color: #1c1c1c;
      overflow: hidden;
    }
    .content-header {
      padding: 1.5rem;
      border-bottom: 1px solid #2e2e2e;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .content-header h2 { font-size: 1.25rem; font-weight: 700; color: #FFF; }
    
    .db-grid-container {
      display: none;
      flex: 1;
      flex-direction: column;
      overflow: hidden;
    }
    .db-grid-container.active { display: flex; }

    .table-stats-bar {
      padding: 0.75rem 1.5rem;
      background-color: #171717;
      border-bottom: 1px solid #2e2e2e;
      font-size: 0.8rem;
      color: #8E8E8E;
      display: flex;
      justify-content: space-between;
    }

    .db-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.85rem;
      text-align: left;
    }
    .db-table th {
      background-color: #171717;
      border-bottom: 1px solid #2e2e2e;
      border-right: 1px solid #2e2e2e;
      padding: 0.75rem 1rem;
      color: #8E8E8E;
      font-weight: 600;
    }
    .db-table td {
      border-bottom: 1px solid #2e2e2e;
      border-right: 1px solid #2e2e2e;
      padding: 0.75rem 1rem;
      vertical-align: top;
    }
    .db-row:hover { background-color: #222222; }

    code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      background-color: #141414;
      padding: 0.15rem 0.35rem;
      border-radius: 4px;
      color: #3ECF8E;
    }
    .db-type-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: #8C8CFF;
    }
    
    .cell-req { font-size: 0.75rem; font-weight: 600; color: #E5A15C; }
    .cell-desc { color: #8E8E8E; }
  </style>
</head>
<body>

  <div class="supa-sidebar">
    <div class="sidebar-brand">Supabase Table Editor</div>
    <ul class="table-list">
      ${sidebarTablesHtml}
    </ul>
  </div>

  <div class="supa-content">
    <div class="content-header">
      <h2>${title} Database Tables</h2>
      <span style="font-family: monospace; font-size:0.8rem; color:#8E8E8E;">schema: public</span>
    </div>
    
    ${tableRowsHtml}
  </div>

  <script>
    function showSupabaseTable(ns) {
      document.querySelectorAll('.table-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.db-grid-container').forEach(g => g.classList.remove('active'));

      document.getElementById('tab-' + ns).classList.add('active');
      document.getElementById('grid-' + ns).classList.add('active');
    }
  </script>
</body>
</html>`;
};
