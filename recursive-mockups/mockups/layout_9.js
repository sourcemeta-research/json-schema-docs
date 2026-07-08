module.exports = function render(title, desc, schema) {
  // Reconstruct rows by traversing the canonical schema directly
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

  // Render HTML
  let assetRowsHtml = '';
  let detailsHtml = '';

  rows.forEach((r, idx) => {
    assetRowsHtml += `
      <div class="kraken-asset-row ${idx === 0 ? 'active' : ''}" id="asset-row-${idx}" onclick="focusKrakenAsset(${idx})">
        <div class="asset-left">
          <span class="asset-logo">⟠</span>
          <div class="asset-names">
            <span class="asset-ticker">${r.name.toUpperCase()}</span>
            <span class="asset-path">${r.path}</span>
          </div>
        </div>
        <span class="asset-type-badge">${r.type}</span>
      </div>
    `;

    let constraintsHtml = '';
    const constraintEntries = Object.entries(r.constraints);
    if (constraintEntries.length > 0) {
      constraintsHtml = '<div class="kraken-order-book"><h4>Validation Order Book</h4>';
      constraintEntries.forEach(([key, val]) => {
        if (typeof val === 'object' && val !== null) {
          constraintsHtml += `
            <div class="book-row nested">
              <span class="b-bid">${key}</span>
              <span class="nested-toggle" style="color: #7132f5; cursor: pointer; font-weight: bold; font-size: 0.75rem;" onclick="const el = this.nextElementSibling; el.style.display = el.style.display === 'none' ? 'block' : 'none'; this.innerText = el.style.display === 'none' ? '▶' : '▼';">▶</span>
              <div class="nested-detail-box" style="display:none; width: 100%; margin-top: 5px;">
                <pre style="font-family: monospace; font-size: 0.75rem; background: #F4F4F6; border-left: 2px solid #7132f5; padding: 5px; color: #000; overflow-x: auto;">${JSON.stringify(val, null, 2)}</pre>
              </div>
            </div>
          `;
        } else {
          constraintsHtml += `
            <div class="book-row">
              <span class="b-bid">${key}</span>
              <span class="b-ask">${JSON.stringify(val)}</span>
            </div>
          `;
        }
      });
      constraintsHtml += '</div>';
    }

    detailsHtml += `
      <div id="asset-details-${idx}" class="kraken-detail-pane ${idx === 0 ? 'active' : ''}">
        <div class="detail-header-row">
          <h2>${r.path}</h2>
          <span class="required-tag ${r.required ? 'req' : 'opt'}">${r.required ? 'REQUIRED' : 'OPTIONAL'}</span>
        </div>
        
        <p class="asset-description">${r.description || 'No descriptive specifications logged.'}</p>
        
        <div class="kraken-trade-panel">
          <div class="trade-box">
            <span class="trade-lbl">Limit Price</span>
            <input type="text" value="${r.type.toUpperCase()}" readonly>
          </div>
          <div class="trade-box">
            <span class="trade-lbl">Depth Level</span>
            <input type="text" value="LEVEL ${r.depth}" readonly>
          </div>
        </div>

        ${constraintsHtml}
      </div>
    `;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} - Kraken Exchange</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #FAF9FC;
      color: #1A1A1E;
      font-family: 'Inter', sans-serif;
      display: flex;
      height: 100vh;
      overflow: hidden;
    }

    .kraken-sidebar {
      width: 290px;
      background-color: #FFFFFF;
      border-right: 1px solid #E4E3EB;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .sidebar-header {
      padding: 1.5rem;
      border-bottom: 1px solid #E4E3EB;
      font-weight: 700;
      color: #7132f5; /* Kraken Purple */
      font-size: 1rem;
    }
    .assets-list { list-style: none; overflow-y: auto; flex: 1; padding: 0.75rem; }
    .kraken-asset-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      cursor: pointer;
      border-radius: 8px;
      margin-bottom: 0.25rem;
      border: 1px solid transparent;
    }
    .kraken-asset-row:hover { background-color: #F3F1FB; }
    .kraken-asset-row.active {
      background-color: rgba(113, 50, 245, 0.08);
      border-color: rgba(113, 50, 245, 0.2);
    }
    
    .asset-left { display: flex; align-items: center; gap: 0.75rem; overflow: hidden; }
    .asset-logo { font-size: 1.25rem; color: #7132f5; }
    .asset-names { display: flex; flex-direction: column; overflow: hidden; }
    .asset-ticker { font-weight: 700; font-size: 0.85rem; color: #1A1A1E; }
    .asset-path { font-size: 0.75rem; color: #7C7A84; font-family: 'JetBrains Mono', monospace; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; max-width: 150px; }
    
    .asset-type-badge { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #7132f5; background-color: #F3F1FB; padding: 0.15rem 0.35rem; border-radius: 4px; }

    .kraken-content {
      flex: 1;
      overflow-y: auto;
      padding: 3rem 4rem;
      background-color: #FAF9FC;
    }
    .content-header { margin-bottom: 2.5rem; border-bottom: 1px solid #E4E3EB; padding-bottom: 1.5rem; }
    .content-header h1 { font-size: 1.8rem; font-weight: 700; color: #000; }
    
    .kraken-detail-pane { display: none; }
    .kraken-detail-pane.active { display: block; max-width: 800px; }
    
    .detail-header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
    .detail-header-row h2 { font-size: 1.4rem; font-weight: 700; font-family: 'JetBrains Mono', monospace; word-break: break-all; }
    
    .required-tag { font-size: 0.7rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 4px; }
    .required-tag.req { background-color: #E2FCEF; color: #0A8243; }
    .required-tag.opt { background-color: #F1F0F5; color: #5B5766; }

    .asset-description { font-size: 0.9rem; color: #5B5766; line-height: 1.5; margin-bottom: 2rem; }

    .kraken-trade-panel { display: flex; gap: 1rem; margin-bottom: 2.5rem; }
    .trade-box { flex: 1; background: #FFF; border: 1px solid #E4E3EB; padding: 0.75rem 1rem; border-radius: 6px; display: flex; flex-direction: column; }
    .trade-lbl { font-size: 0.7rem; font-weight: 700; color: #7C7A84; text-transform: uppercase; margin-bottom: 0.25rem; }
    .trade-box input { border: none; font-size: 1rem; font-weight: 700; color: #1A1A1E; outline: none; background: none; }

    .kraken-order-book { background: #FFF; border: 1px solid #E4E3EB; border-radius: 8px; overflow: hidden; }
    .kraken-order-book h4 { background-color: #F8F7FA; padding: 0.75rem 1.25rem; font-size: 0.8rem; font-weight: 700; border-bottom: 1px solid #E4E3EB; }
    
    .book-row { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1.25rem; border-bottom: 1px dashed #E4E3EB; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; }
    .book-row:last-child { border-bottom: none; }
    .b-bid { color: #0A8243; font-weight: 600; }
    .b-ask { color: #D62F2F; font-weight: 600; }
  </style>
</head>
<body>

  <div class="kraken-sidebar">
    <div class="sidebar-header">Kraken Assets Portal</div>
    <div class="assets-list">
      ${assetRowsHtml}
    </div>
  </div>

  <div class="kraken-content">
    <div class="content-header">
      <h1>${title} Specifications</h1>
      <p style="color:#5B5766; font-size:0.85rem; margin-top:0.25rem;">${desc}</p>
    </div>
    
    <div class="details-container">
      ${detailsHtml}
    </div>
  </div>

  <script>
    function focusKrakenAsset(idx) {
      document.querySelectorAll('.kraken-asset-row').forEach(r => r.classList.remove('active'));
      document.querySelectorAll('.kraken-detail-pane').forEach(p => p.classList.remove('active'));

      document.getElementById('asset-row-' + idx).classList.add('active');
      document.getElementById('asset-details-' + idx).classList.add('active');
    }
  </script>
</body>
</html>`;
};
