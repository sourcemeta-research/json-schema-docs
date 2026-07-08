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
  
  rows.forEach((r, idx) => {
    let constraintsHtml = '';
    const constraintEntries = Object.entries(r.constraints);
    if (constraintEntries.length > 0) {
      constraintsHtml = '<div class="carbon-constraints">';
      constraintEntries.forEach(([key, val]) => {
        if (typeof val === 'object' && val !== null) {
          constraintsHtml += `
            <div class="carbon-tag nested" style="width: 100%; margin-bottom: 5px;">
              <span class="t-k">${key}:</span>
              <span class="nested-toggle" style="color: #0F62FE; cursor: pointer; font-weight: bold; margin-left: 10px;" onclick="const el = this.nextElementSibling; el.style.display = el.style.display === 'none' ? 'block' : 'none'; this.innerText = el.style.display === 'none' ? '▶ expand' : '▼ collapse';">▶ expand</span>
              <div class="nested-detail-box" style="display:none; margin-top: 5px;">
                <pre style="font-family: monospace; font-size: 0.75rem; background: #F4F4F4; border-left: 2px solid #0F62FE; padding: 5px; color: #161616; overflow-x: auto;">${JSON.stringify(val, null, 2)}</pre>
              </div>
            </div>
          `;
        } else {
          constraintsHtml += `
            <div class="carbon-tag">
              <span class="t-k">${key}:</span> <span class="t-v">${JSON.stringify(val)}</span>
            </div>
          `;
        }
      });
      constraintsHtml += '</div>';
    }

    tableRowsHtml += `
      <tr class="carbon-row" id="row-${idx}" data-path="${r.path}">
        <td class="carbon-cell-checkbox">
          <input type="checkbox" class="bx--checkbox" id="checkbox-${idx}" onchange="toggleBatchToolbar()">
        </td>
        <td class="carbon-cell-expand" onclick="toggleCarbonExpand(${idx})">
          <span class="expand-icon" id="icon-${idx}">▶</span>
        </td>
        <td class="carbon-cell-path"><code>${r.path}</code></td>
        <td class="carbon-cell-type"><span class="type-mono">${r.type}</span></td>
        <td class="carbon-cell-req">${r.required ? '<strong class="req-alert">REQUIRED</strong>' : '<span class="opt-alert">OPTIONAL</span>'}</td>
        <td class="carbon-cell-validation">${constraintsHtml || '<span style="color:#8d8d8d;">None</span>'}</td>
      </tr>
      
      <tr class="carbon-expand-row" id="expand-${idx}">
        <td colspan="6">
          <div class="expand-wrapper">
            <h4>Description</h4>
            <p>${r.description || 'No descriptive comments available.'}</p>
            <h4 style="margin-top: 1rem;">Raw constraints mapping</h4>
            <pre><code>${JSON.stringify(r.constraints, null, 2)}</code></pre>
          </div>
        </td>
      </tr>
    `;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} - IBM Carbon Data Table</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #FFFFFF;
      color: #161616;
      font-family: 'IBM Plex Sans', sans-serif;
      padding: 3rem;
    }
    
    header {
      border-bottom: 1px solid #E0E0E0;
      padding-bottom: 1.5rem;
      margin-bottom: 2rem;
    }
    h1 { font-size: 2.2rem; font-weight: 300; letter-spacing: -0.02em; }
    .desc { font-size: 0.9rem; color: #525252; margin-top: 0.25rem; }

    /* Carbon Table Container */
    .carbon-table-container {
      border: 1px solid #E0E0E0;
      position: relative;
    }
    
    /* Batch Actions Toolbar */
    .carbon-batch-actions {
      display: none;
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 48px;
      background-color: #0F62FE; /* Carbon Active Blue */
      color: #FFFFFF;
      align-items: center;
      justify-content: space-between;
      padding: 0 1.5rem;
      z-index: 20;
    }
    .carbon-batch-actions.active { display: flex; }
    .batch-btn {
      background: none;
      border: none;
      color: white;
      font-weight: 600;
      cursor: pointer;
      font-size: 0.85rem;
      padding: 0 1rem;
      height: 100%;
    }
    .batch-btn:hover { background-color: #0353E9; }

    /* Table Toolbar */
    .carbon-toolbar {
      height: 48px;
      background-color: #F4F4F4;
      border-bottom: 1px solid #E0E0E0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1rem;
    }
    .search-input {
      background: none;
      border: none;
      border-bottom: 1px solid #8D8D8D;
      color: #161616;
      padding: 0.25rem 0.5rem;
      font-family: inherit;
      font-size: 0.85rem;
      outline: none;
      width: 250px;
    }
    .search-input:focus { border-bottom: 2px solid #0F62FE; }

    .bx--data-table { width: 100%; border-collapse: collapse; }
    .bx--data-table th {
      background-color: #F4F4F4;
      border-bottom: 1px solid #E0E0E0;
      padding: 0.75rem 1rem;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      text-align: left;
    }
    
    .bx--data-table td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #E0E0E0;
      font-size: 0.85rem;
      vertical-align: middle;
    }
    .carbon-row:hover { background-color: #E5E5E5; }
    
    .carbon-cell-checkbox { width: 40px; text-align: center; }
    .carbon-cell-expand { width: 40px; text-align: center; cursor: pointer; color: #0F62FE; }
    .carbon-cell-path { font-weight: 600; }
    
    code { font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; background-color: #F4F4F4; padding: 0.15rem 0.35rem; }
    .type-mono { font-family: 'IBM Plex Mono', monospace; color: #0F62FE; font-weight: 600; }
    
    .req-alert { color: #DA1E28; font-size: 0.75rem; }
    .opt-alert { color: #525252; font-size: 0.75rem; }

    .carbon-constraints { display: flex; flex-direction: column; gap: 0.25rem; }
    .carbon-tag {
      background-color: #E8F0FE;
      border: 1px solid #C2DBFF;
      color: #0F62FE;
      padding: 0.15rem 0.35rem;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 0.7rem;
      display: inline-block;
    }
    .t-k { color: #525252; }
    .t-v { font-weight: 600; }

    /* Expanded Details Drawer */
    .carbon-expand-row { display: none; background-color: #FCFCFC; }
    .carbon-expand-row.open { display: table-row; }
    .expand-wrapper { padding: 1.5rem 3rem; border-bottom: 1px solid #E0E0E0; }
    .expand-wrapper h4 { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; color: #525252; margin-bottom: 0.5rem; }
    .expand-wrapper p { font-size: 0.85rem; color: #161616; line-height: 1.5; }
    .expand-wrapper pre { margin-top: 1rem; background-color: #F4F4F4; padding: 1rem; overflow-x: auto; }
  </style>
</head>
<body>

  <header>
    <h1>${title} Specification</h1>
    <p class="desc">${desc}</p>
  </header>

  <div class="carbon-table-container">
    <div class="carbon-batch-actions" id="batch-actions-bar">
      <span><span id="selected-count">0</span> items selected</span>
      <div>
        <button class="batch-btn" onclick="exportSelected()">Export Selected</button>
        <button class="batch-btn" onclick="clearSelection()">Cancel</button>
      </div>
    </div>
    
    <div class="carbon-toolbar">
      <input type="text" class="search-input" placeholder="Search carbon rows..." oninput="filterCarbon(this.value)">
      <span style="font-family: monospace; font-size:0.75rem; color:#525252;">Data Grid Spec</span>
    </div>

    <table class="bx--data-table">
      <thead>
        <tr>
          <th class="carbon-cell-checkbox"><input type="checkbox" id="check-all" onchange="toggleCheckAll(this)"></th>
          <th class="carbon-cell-expand"></th>
          <th>Name</th>
          <th>Type</th>
          <th>Status</th>
          <th>Validation Constraints</th>
        </tr>
      </thead>
      <tbody id="table-body">
        ${tableRowsHtml}
      </tbody>
    </table>
  </div>

  <script>
    function toggleCarbonExpand(idx) {
      const row = document.getElementById('expand-' + idx);
      const icon = document.getElementById('icon-' + idx);
      row.classList.toggle('open');
      if (row.classList.contains('open')) {
        icon.innerText = '▼';
      } else {
        icon.innerText = '▶';
      }
    }

    function toggleBatchToolbar() {
      const checkboxes = document.querySelectorAll('.bx--checkbox');
      let count = 0;
      checkboxes.forEach(c => { if (c.checked) count++; });

      const bar = document.getElementById('batch-actions-bar');
      if (count > 0) {
        bar.classList.add('active');
        document.getElementById('selected-count').innerText = count;
      } else {
        bar.classList.remove('active');
      }
    }

    function toggleCheckAll(master) {
      document.querySelectorAll('.bx--checkbox').forEach(c => {
        c.checked = master.checked;
      });
      toggleBatchToolbar();
    }

    function clearSelection() {
      document.getElementById('check-all').checked = false;
      document.querySelectorAll('.bx--checkbox').forEach(c => c.checked = false);
      toggleBatchToolbar();
    }

    function exportSelected() {
      const selectedPaths = [];
      document.querySelectorAll('.bx--checkbox').forEach((c, idx) => {
        if (c.checked) {
          const row = document.getElementById('row-' + idx);
          selectedPaths.push(row.getAttribute('data-path'));
        }
      });
      alert('Exported:\\n' + selectedPaths.join('\\n'));
    }

    function filterCarbon(val) {
      const filter = val.toLowerCase();
      document.querySelectorAll('.carbon-row').forEach((row, idx) => {
        const path = row.getAttribute('data-path').toLowerCase();
        const expandRow = document.getElementById('expand-' + idx);
        if (path.includes(filter)) {
          row.style.display = 'table-row';
        } else {
          row.style.display = 'none';
          expandRow.classList.remove('open');
          document.getElementById('icon-' + idx).innerText = '▶';
        }
      });
    }
  </script>
</body>
</html>`;
};
