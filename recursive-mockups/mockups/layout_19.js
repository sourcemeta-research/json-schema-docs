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

  let cardsHtml = '';
  
  rows.forEach((r, idx) => {
    let constraintsHtml = '';
    const constraintEntries = Object.entries(r.constraints);
    if (constraintEntries.length > 0) {
      constraintsHtml = '<div class="excali-constraints">';
      constraintEntries.forEach(([key, val]) => {
        if (typeof val === 'object' && val !== null) {
          constraintsHtml += `
            <div class="excali-c-item nested" style="width: 100%; margin-bottom: 5px;">
              <strong>${key}:</strong>
              <span class="nested-toggle" style="color: #9C40FF; cursor: pointer; text-decoration: underline;" onclick="const el = this.nextElementSibling; el.style.display = el.style.display === 'none' ? 'block' : 'none'; this.innerText = el.style.display === 'none' ? '▶ show' : '▼ hide';">▶ show</span>
              <div class="nested-detail-box" style="display:none; margin-top: 5px; font-family: monospace;">
                <pre style="font-family: inherit; font-size: 0.75rem; background: #FFF; border: 1px solid #000; padding: 5px; color: #000; overflow-x: auto;">${JSON.stringify(val, null, 2)}</pre>
              </div>
            </div>
          `;
        } else {
          constraintsHtml += `
            <div class="excali-c-item">
              <strong>${key}:</strong> <span>${JSON.stringify(val)}</span>
            </div>
          `;
        }
      });
      constraintsHtml += '</div>';
    }

    // Skew values for organic handwritten card positions
    const angle = (idx % 2 === 0 ? -1 : 1) * (1 + (idx % 3) * 0.5);

    cardsHtml += `
      <div class="excali-card" style="transform: rotate(${angle}deg);" onclick="focusExcaliCard(${idx})" id="excali-card-${idx}">
        <div class="excali-card-header">
          <span class="excali-badge ${r.required ? 'critical' : 'stable'}">${r.required ? 'REQUIRED' : 'OPTIONAL'}</span>
          <span class="excali-type">${r.type.toUpperCase()}</span>
        </div>
        
        <h3 class="excali-title">${r.path}</h3>
        <p class="excali-desc">${r.description || 'No descriptive comments sketched.'}</p>
        
        ${constraintsHtml}
      </div>
    `;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} - Excalidraw</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #FFFFFF;
      background-image: radial-gradient(#e0e0e0 1.2px, transparent 1.2px);
      background-size: 24px 24px;
      color: #000000;
      font-family: "Comic Sans MS", "Chalkboard SE", "Comic Neue", cursive, sans-serif;
      padding: 3rem;
      overflow-x: hidden;
    }

    header {
      margin-bottom: 3rem;
      border-bottom: 2px dashed #000;
      padding-bottom: 1.5rem;
    }
    h1 { font-size: 2rem; font-weight: 700; text-transform: uppercase; }
    .subtitle { font-size: 1rem; color: #555; margin-top: 0.25rem; }

    /* Excalidraw toolbar mockup */
    .excali-toolbar {
      display: inline-flex;
      background-color: #FFFFFF;
      border: 2px solid #000000;
      border-radius: 8px;
      padding: 0.25rem;
      margin-bottom: 2.5rem;
      box-shadow: 3px 3px 0px #000000;
    }
    .tool-btn {
      background: none;
      border: none;
      padding: 0.5rem 0.85rem;
      font-size: 1.1rem;
      cursor: pointer;
      border-radius: 4px;
    }
    .tool-btn:hover, .tool-btn.active {
      background-color: #E8F0FE;
    }

    .excali-canvas {
      display: flex;
      flex-wrap: wrap;
      gap: 2.5rem;
      align-items: flex-start;
    }
    
    .excali-card {
      background-color: #FFFFFF;
      border: 2.5px solid #000000;
      border-radius: 4px;
      padding: 1.5rem;
      width: 320px;
      min-height: 250px;
      box-shadow: 4px 4px 0px #000000;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.15s, box-shadow 0.15s;
    }
    .excali-card:hover {
      box-shadow: 6px 6px 0px #000000;
    }
    .excali-card.active {
      border-color: #9C40FF;
      box-shadow: 4px 4px 0px #9C40FF;
    }

    .excali-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
    .excali-badge { font-size: 0.7rem; font-weight: 700; border: 1.5px solid #000; padding: 0.15rem 0.4rem; border-radius: 4px; }
    .excali-badge.critical { background-color: #FFE3E3; color: #D62F2F; border-color: #D62F2F; }
    .excali-badge.stable { background-color: #E2FCEF; color: #1E8E5A; border-color: #1E8E5A; }
    
    .excali-type { font-size: 0.8rem; font-weight: 700; color: #555; }

    .excali-title { font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem; word-break: break-all; }
    .excali-desc { font-size: 0.85rem; color: #333; line-height: 1.4; margin-bottom: 1rem; }

    .excali-constraints {
      border-top: 1px dashed #000;
      padding-top: 0.75rem;
      font-size: 0.75rem;
    }
    .excali-c-item { margin-bottom: 0.25rem; }
  </style>
</head>
<body>

  <header>
    <h1>Excalidraw Whiteboard: ${title}</h1>
    <div class="subtitle">${desc}</div>
  </header>

  <div class="excali-toolbar">
    <button class="tool-btn">🔲</button>
    <button class="tool-btn">⚪</button>
    <button class="tool-btn">➡️</button>
    <button class="tool-btn">✏️</button>
    <button class="tool-btn active">📄 Card</button>
  </div>

  <div class="excali-canvas">
    ${cardsHtml}
  </div>

  <script>
    function focusExcaliCard(idx) {
      document.querySelectorAll('.excali-card').forEach(c => c.classList.remove('active'));
      document.getElementById('excali-card-' + idx).classList.add('active');
    }
  </script>
</body>
</html>`;
};
