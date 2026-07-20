module.exports = function render(title, desc, schema) {

  const rows = [];
  const visited = new Map(); // Use Map to track paths of visited nodes

  function walk(node, parentPath = [], isRequired = false) {
    if (!node || typeof node !== 'object') return;
    
    if (visited.has(node)) {
      const targetPath = visited.get(node);
      rows.push({
        path: parentPath.join('.'),
        name: parentPath[parentPath.length - 1],
        depth: parentPath.length,
        type: 'recursiveRef',
        targetPath: targetPath, // Save target path for anchor navigation!
        required: isRequired,
        description: 'Recursive reference back to ' + targetPath + '.',
        constraints: {}
      });
      return;
    }
    visited.set(node, parentPath.join('.'));

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

      if (n.type && Array.isArray(n.type)) {
        n.type.forEach(subSchema => {
          if (typeof subSchema === 'object') {
            extract(subSchema);
          }
        });
      }
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
            <details class="carbon-nested-details" style="margin-bottom: 4px;">
              <summary style="cursor: pointer; color: #0F62FE; font-size: 0.75rem; font-weight: 600; outline: none; list-style: none;">${key} [+ expand]</summary>
              <pre style="font-family: monospace; font-size: 0.7rem; background: #F4F4F4; border-left: 2px solid #0F62FE; padding: 5px; color: #161616; overflow-x: auto; margin-top: 2px;">${JSON.stringify(val, null, 2)}</pre>
            </details>
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
      <tr class="carbon-row" id="node-${r.path}" data-path="${r.path}">
        <td class="carbon-cell-checkbox">
          <input type="checkbox" class="bx--checkbox" id="checkbox-${idx}">
        </td>
        <td class="carbon-cell-path">
          <code style="font-weight: 700; color: #161616; font-size: 0.8rem;">${r.path}</code>
          ${r.description ? `
          <details class="carbon-description-details" style="margin-top: 4px; font-size: 0.8rem; color: #525252;">
            <summary style="cursor: pointer; outline: none; color: #0F62FE; font-weight: 500; list-style: none;">Description &amp; Details</summary>
            <div style="padding: 8px; margin-top: 4px; background: #F4F4F4; border-left: 2px solid #0F62FE;">
              <p style="margin-bottom: 8px; line-height: 1.4;">${r.description}</p>
              <pre style="font-size: 0.7rem; font-family: monospace; overflow-x: auto; padding: 4px; background: #EAEAEA;">${JSON.stringify(r.constraints, null, 2)}</pre>
            </div>
          </details>` : ''}
        </td>
        <td class="carbon-cell-type">
          <span class="type-mono">
            ${r.type === 'recursiveRef' ? `recursiveRef to <a href="#node-${r.targetPath}" style="color: #0F62FE; font-weight: 600; text-decoration: underline;">${r.targetPath}</a>` : r.type}
          </span>
        </td>
        <td class="carbon-cell-req">${r.required ? '<strong class="req-alert">REQUIRED</strong>' : '<span class="opt-alert">OPTIONAL</span>'}</td>
        <td class="carbon-cell-validation">${constraintsHtml || '<span style="color:#8d8d8d;">None</span>'}</td>
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
      padding: 2rem;
    }

    header { margin-bottom: 2rem; border-bottom: 1px solid #E0E0E0; padding-bottom: 1rem; }
    header h1 { font-size: 1.5rem; font-weight: 300; color: #161616; }
    header .desc { font-size: 0.875rem; color: #525252; margin-top: 0.25rem; }

    .carbon-table-container {
      border: 1px solid #E0E0E0;
      background-color: #F4F4F4;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    /* CSS-Only Batch Actions Bar */
    .carbon-batch-actions {
      display: none;
      position: absolute;
      top: 0; left: 0; right: 0; height: 48px;
      background-color: #0F62FE;
      color: #FFFFFF;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      font-size: 0.875rem;
      z-index: 10;
    }
    body:has(.bx--checkbox:checked) .carbon-batch-actions {
      display: flex;
    }
    
    .batch-btn {
      background: none;
      border: none;
      color: #FFFFFF;
      cursor: pointer;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 600;
    }
    .batch-btn:hover { background-color: #0353E9; }

    .carbon-toolbar {
      height: 48px;
      background-color: #FFFFFF;
      border-bottom: 1px solid #E0E0E0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
    }
    .search-input {
      border: none;
      background-color: #F4F4F4;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      width: 280px;
      outline: none;
    }
    .search-input:focus { border-bottom: 2px solid #0F62FE; }

    .bx--data-table {
      width: 100%;
      border-collapse: collapse;
      background-color: #FFFFFF;
    }
    .bx--data-table th {
      background-color: #F4F4F4;
      border-bottom: 1px solid #E0E0E0;
      padding: 0.75rem 1rem;
      text-align: left;
      font-size: 0.85rem;
      font-weight: 600;
      color: #161616;
    }
    .bx--data-table td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #E0E0E0;
      font-size: 0.85rem;
      vertical-align: top;
    }
    .carbon-row:hover { background-color: #E5E5E5; }
    
    .carbon-cell-checkbox { width: 40px; text-align: center; }
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
  </style>
</head>
<body>

  <header>
    <h1>${title} Specification</h1>
    <p class="desc">${desc}</p>
  </header>

  <div class="carbon-table-container">
    <div class="carbon-batch-actions">
      <span>Dynamic Batch Selected</span>
      <div>
        <button class="batch-btn" onclick="alert('Export completed')">Export Selected</button>
      </div>
    </div>
    
    <div class="carbon-toolbar">
      <span style="font-family: monospace; font-size:0.75rem; color:#525252;">Data Grid Spec</span>
    </div>

    <table class="bx--data-table">
      <thead>
        <tr>
          <th class="carbon-cell-checkbox"></th>
          <th>Name</th>
          <th>Type</th>
          <th>Status</th>
          <th>Validation Constraints</th>
        </tr>
      </thead>
      <tbody>
        ${tableRowsHtml}
      </tbody>
    </table>
  </div>

</body>
</html>`;
};
