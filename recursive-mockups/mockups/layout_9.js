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

  let feeBreakdownHtml = '';
  
  rows.forEach((r, idx) => {
    let constraintsHtml = '';
    const constraintEntries = Object.entries(r.constraints);
    if (constraintEntries.length > 0) {
      constraintsHtml = '<div class="wise-calc-specs">';
      constraintEntries.forEach(([key, val]) => {
        if (typeof val === 'object' && val !== null) {
          constraintsHtml += `
            <div class="spec-row nested" style="flex-wrap: wrap;">
              <span class="s-k">${key}:</span>
              <span class="nested-toggle" style="color: #9FE870; cursor: pointer; font-weight: bold; margin-left: 10px;" onclick="const el = this.nextElementSibling; el.style.display = el.style.display === 'none' ? 'block' : 'none'; this.innerText = el.style.display === 'none' ? '▶ expand' : '▼ collapse';">▶ expand</span>
              <div class="nested-detail-box" style="display:none; width: 100%; margin-top: 5px;">
                <pre style="font-family: monospace; font-size: 0.75rem; background: #F4F6F2; border-left: 2px solid #9FE870; padding: 5px; color: #1A1D1A; overflow-x: auto;">${JSON.stringify(val, null, 2)}</pre>
              </div>
            </div>
          `;
        } else {
          constraintsHtml += `
            <div class="spec-row">
              <span class="s-k">${key}:</span>
              <span class="s-v">${JSON.stringify(val)}</span>
            </div>
          `;
        }
      });
      constraintsHtml += '</div>';
    }

    feeBreakdownHtml += `
      <div class="calculator-step" onclick="toggleWiseCalcRow(${idx})">
        <div class="step-connector">
          <div class="step-circle ${r.required ? 'critical' : 'stable'}"></div>
          <div class="step-line"></div>
        </div>
        
        <div class="step-main">
          <div class="step-top-row">
            <span class="step-path">${r.path}</span>
            <span class="step-type-badge">${r.type}</span>
          </div>
          <p class="step-desc-p">${r.description || 'No transfer description available.'}</p>
          
          <div id="calc-drawer-${idx}" class="wise-step-drawer">
            ${constraintsHtml || '<span style="color:#666; font-style:italic;">No transfer boundary rules.</span>'}
            <div style="margin-top:0.75rem; font-size:0.75rem; color:#888;">
              Status: <strong>${r.required ? 'REQUIRED TRANSACTION LAYER' : 'OPTIONAL LAYER'}</strong>
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
  <title>${title} - Wise Calculator</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #F4F6F2;
      color: #1A1D1A;
      font-family: 'Plus Jakarta Sans', sans-serif;
      padding: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    
    .wise-widget {
      width: 100%;
      max-width: 580px;
      background-color: #FFFFFF;
      border: 1px solid #E4E8E1;
      border-radius: 16px;
      padding: 2.5rem;
      box-shadow: 0 10px 30px rgba(0,0,0,0.02);
    }
    
    .widget-header {
      margin-bottom: 2rem;
      border-bottom: 1.5px solid #F4F6F2;
      padding-bottom: 1.5rem;
    }
    h1 {
      font-size: 2.2rem;
      font-weight: 900;
      color: #000;
      letter-spacing: -0.04em;
      line-height: 1;
    }
    .widget-header p { font-size: 0.85rem; color: #555855; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em; margin-top: 0.5rem; }

    /* Sender Inputs */
    .wise-inputs { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem; }
    .input-box {
      border: 1px solid #D1D5DB;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1.25rem;
    }
    .input-left { display: flex; flex-direction: column; }
    .input-left label { font-size: 0.7rem; color: #666; font-weight: 600; text-transform: uppercase; }
    .input-left input { border: none; font-size: 1.2rem; font-weight: 700; outline: none; background: none; margin-top: 0.25rem; width: 150px; }
    
    .input-right {
      background-color: #1A1D1A;
      color: #FFF;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-weight: 700;
      font-size: 0.95rem;
    }
    .input-right.lime { background-color: #9FE870; color: #1A1D1A; }

    /* Fee list connector */
    .breakdown-list { display: flex; flex-direction: column; margin-bottom: 2rem; }
    .calculator-step { display: flex; cursor: pointer; }
    
    .step-connector { display: flex; flex-direction: column; align-items: center; margin-right: 1.25rem; width: 20px; }
    .step-circle { width: 10px; height: 10px; border-radius: 50%; background-color: #9FE870; margin-top: 0.35rem; }
    .step-circle.critical { background-color: #FF5E00; }
    .step-circle.stable { background-color: #9FE870; }
    .step-line { width: 2px; flex: 1; background-color: #E4E8E1; min-height: 40px; }
    .calculator-step:last-child .step-line { display: none; }
    
    .step-main { flex: 1; padding-bottom: 1.5rem; }
    .step-top-row { display: flex; justify-content: space-between; align-items: center; }
    .step-path { font-weight: 700; font-size: 0.95rem; color: #000; font-family: 'JetBrains Mono', monospace; }
    .step-type-badge { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #666; background-color: #F4F6F2; padding: 0.15rem 0.4rem; font-weight: 600; }
    .step-desc-p { font-size: 0.85rem; color: #555855; line-height: 1.4; margin-top: 0.25rem; }
    
    .wise-step-drawer {
      display: none;
      background-color: #F4F6F2;
      border: 1px solid #E4E8E1;
      padding: 1rem;
      border-radius: 8px;
      margin-top: 0.75rem;
    }
    .wise-step-drawer.open { display: block; }
    
    .wise-calc-specs { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; }
    .spec-row { display: flex; justify-content: space-between; padding: 0.15rem 0; border-bottom: 1px dashed #E4E8E1; }
    .spec-row:last-child { border-bottom: none; }
    .s-k { color: #666; }
    .s-v { color: #000; font-weight: 700; }
  </style>
</head>
<body>

  <div class="wise-widget">
    <div class="widget-header">
      <h1>Wise Transfer</h1>
      <p>${title} // Conversion Calculator</p>
    </div>
    
    <div class="wise-inputs">
      <div class="input-box">
        <div class="input-left">
          <label>You send</label>
          <input type="text" value="1,000">
        </div>
        <div class="input-right">USD</div>
      </div>
    </div>

    <div class="breakdown-list">
      ${feeBreakdownHtml}
    </div>

    <div class="wise-inputs">
      <div class="input-box">
        <div class="input-left">
          <label>Recipient Gets</label>
          <input type="text" value="984.50" readonly>
        </div>
        <div class="input-right lime">EUR</div>
      </div>
    </div>
  </div>

  <script>
    function toggleWiseCalcRow(idx) {
      const drawer = document.getElementById('calc-drawer-' + idx);
      drawer.classList.toggle('open');
    }
  </script>
</body>
</html>`;
};
