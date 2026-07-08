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
  let stickiesHtml = '';
  let svgPathsHtml = '';

  // Simple layout engine to position stickies on a grid map
  rows.forEach((r, idx) => {
    const x = 50 + (idx % 3) * 320;
    const y = 80 + Math.floor(idx / 3) * 280;

    let constraintsHtml = '';
    const constraintEntries = Object.entries(r.constraints);
    if (constraintEntries.length > 0) {
      constraintsHtml = '<div class="miro-c-grid">';
      constraintEntries.forEach(([key, val]) => {
        if (typeof val === 'object' && val !== null) {
          constraintsHtml += `
            <div class="miro-c-item nested">
              <strong>${key}:</strong>
              <span class="nested-toggle" style="color: #7B2CBF; cursor: pointer; font-weight: bold; margin-left: 5px;" onclick="const el = this.nextElementSibling; el.style.display = el.style.display === 'none' ? 'block' : 'none'; this.innerText = el.style.display === 'none' ? '▶ expand' : '▼ collapse';">▶ expand</span>
              <div class="nested-detail-box" style="display:none; margin-top: 5px;">
                <pre style="font-family: monospace; font-size: 0.75rem; background: rgba(255,255,255,0.7); border-left: 2px solid #050038; padding: 5px; color: #050038; overflow-x: auto;">${JSON.stringify(val, null, 2)}</pre>
              </div>
            </div>
          `;
        } else {
          constraintsHtml += `
            <div class="miro-c-item">
              <strong>${key}:</strong> <code>${JSON.stringify(val)}</code>
            </div>
          `;
        }
      });
      constraintsHtml += '</div>';
    }

    // Determine sticky note color based on depth
    let stickyColor = '#FFF9D1'; // Pastel Yellow
    if (r.depth === 2) stickyColor = '#E8F0FE'; // Pastel Blue
    if (r.depth >= 3) stickyColor = '#FCE8E6'; // Pastel Red
    if (r.required) stickyColor = '#E6FFFA'; // Pastel Green

    stickiesHtml += `
      <div class="miro-sticky" id="sticky-${idx}" style="left: ${x}px; top: ${y}px; background-color: ${stickyColor};" onclick="focusSticky(${idx})">
        <div class="sticky-pin"></div>
        <div class="sticky-header">
          <span class="s-path">${r.path}</span>
          <span class="s-type">${r.type}</span>
        </div>
        
        <p class="s-desc">${r.description || 'No notes added yet.'}</p>
        ${constraintsHtml}
        
        <div class="sticky-footer">
          <span>Depth: L${r.depth}</span>
          <span>${r.required ? '★ REQUIRED' : 'Optional'}</span>
        </div>
      </div>
    `;

    // Connect node to previous node if it shares a parent prefix
    if (idx > 0) {
      const parentIdx = rows.findIndex(item => r.path.startsWith(item.path + '.') && r.depth === item.depth + 1);
      if (parentIdx !== -1) {
        const px = 50 + (parentIdx % 3) * 320 + 130;
        const py = 80 + Math.floor(parentIdx / 3) * 280 + 180;
        const cx = x + 130;
        const cy = y;
        svgPathsHtml += `<path d="M ${px} ${py} Q ${(px+cx)/2} ${(py+cy)/2} ${cx} ${cy}" stroke="#050038" stroke-width="2" fill="none" stroke-dasharray="4,4" />`;
      }
    }
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} - Miro Workspace Board</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #F8F9FA;
      color: #050038; /* Miro Deep Blue */
      font-family: 'Plus Jakarta Sans', sans-serif;
      overflow: hidden;
      width: 100vw;
      height: 100vh;
      position: relative;
    }
    
    header {
      background-color: #FFE135; /* Miro Yellow */
      border-bottom: 2px solid #050038;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 100;
      position: relative;
    }
    header h1 { font-size: 1.25rem; font-weight: 800; letter-spacing: -0.02em; }
    header p { font-size: 0.8rem; color: rgba(5,0,56,0.7); }

    /* Miro infinite canvas layout */
    .canvas-viewport {
      width: 100%;
      height: calc(100vh - 60px);
      position: relative;
      overflow: auto;
      padding: 50px;
    }
    .canvas-workspace {
      width: 3000px;
      height: 3000px;
      position: relative;
    }
    
    /* Stickies positioning */
    .miro-sticky {
      position: absolute;
      width: 260px;
      min-height: 200px;
      border: 2px solid #050038;
      padding: 1.25rem;
      box-shadow: 5px 5px 0px #050038;
      cursor: grab;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: box-shadow 0.15s ease, transform 0.15s;
    }
    .miro-sticky:hover {
      transform: translate(-2px, -2px);
      box-shadow: 7px 7px 0px #050038;
    }
    .miro-sticky:active { cursor: grabbing; }
    .miro-sticky.focused {
      box-shadow: 0 0 0 4px #00FFCC, 7px 7px 0px #050038;
    }

    .sticky-pin {
      width: 12px; height: 12px;
      background-color: #FF5A5F;
      border: 2px solid #050038;
      border-radius: 50%;
      position: absolute;
      top: -8px; left: 50%;
      transform: translateX(-50%);
    }

    .sticky-header {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px dashed #050038;
      padding-bottom: 0.5rem;
      margin-bottom: 0.75rem;
      font-size: 0.8rem;
      font-weight: 700;
    }
    .s-path { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 160px; font-family: 'JetBrains Mono', monospace; }
    .s-type { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #7B2CBF; }

    .s-desc { font-size: 0.8rem; line-height: 1.4; color: #050038; margin-bottom: 1rem; }

    .miro-c-grid {
      background: rgba(255, 255, 255, 0.4);
      border: 1px solid #050038;
      padding: 0.4rem;
      font-size: 0.7rem;
      margin-bottom: 0.75rem;
    }
    .miro-c-item { margin-bottom: 0.15rem; font-family: 'JetBrains Mono', monospace; }
    
    .sticky-footer {
      display: flex;
      justify-content: space-between;
      font-size: 0.7rem;
      color: rgba(5,0,56,0.6);
      font-weight: 700;
      border-top: 1px solid rgba(5,0,56,0.1);
      padding-top: 0.5rem;
      margin-top: auto;
    }

    /* Floating navigation controller */
    .miro-navigator-controls {
      position: fixed;
      bottom: 2rem; left: 2rem;
      background-color: #FFFFFF;
      border: 2px solid #050038;
      padding: 0.75rem;
      border-radius: 8px;
      display: flex;
      gap: 0.75rem;
      box-shadow: 4px 4px 0px #050038;
      z-index: 100;
    }
    .control-btn {
      background: none;
      border: 1px solid #050038;
      padding: 0.35rem 0.6rem;
      font-size: 0.8rem;
      cursor: pointer;
      font-weight: 700;
    }
    .control-btn:hover { background-color: #FFE135; }
  </style>
</head>
<body>

  <header>
    <h1>Miro Schema MindMap // ${title}</h1>
    <p>${desc}</p>
  </header>

  <div class="canvas-viewport" id="viewport">
    <div class="canvas-workspace">
      <svg style="position: absolute; top:0; left:0; width:3000px; height:3000px; pointer-events:none;">
        ${svgPathsHtml}
      </svg>
      
      ${stickiesHtml}
    </div>
  </div>

  <div class="miro-navigator-controls">
    <button class="control-btn" onclick="zoomCanvas(0.1)">+</button>
    <button class="control-btn" onclick="zoomCanvas(-0.1)">-</button>
    <button class="control-btn" onclick="resetZoom()">100%</button>
  </div>

  <script>
    let currentZoom = 1;
    const workspace = document.querySelector('.canvas-workspace');

    function focusSticky(idx) {
      document.querySelectorAll('.miro-sticky').forEach(s => s.classList.remove('focused'));
      document.getElementById('sticky-' + idx).classList.add('focused');
    }

    function zoomCanvas(factor) {
      currentZoom += factor;
      if (currentZoom < 0.5) currentZoom = 0.5;
      if (currentZoom > 1.5) currentZoom = 1.5;
      workspace.style.transform = 'scale(' + currentZoom + ')';
      workspace.style.transformOrigin = 'top left';
    }

    function resetZoom() {
      currentZoom = 1;
      workspace.style.transform = 'scale(1)';
    }

    // Scroll viewport to show first sticky center
    document.getElementById('viewport').scrollTop = 0;
    document.getElementById('viewport').scrollLeft = 0;
  </script>
</body>
</html>`;
};
