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

  let fileTreeHtml = '';
  let terminalBlocksHtml = '';

  rows.forEach((r, idx) => {
    fileTreeHtml += `
      <div class="tree-item" onclick="focusWarpBlock(${idx})">
        <span class="tree-icon">📄</span>
        <span class="tree-name">${r.name}</span>
      </div>
    `;

    let constraintsHtml = '';
    const constraintEntries = Object.entries(r.constraints);
    if (constraintEntries.length > 0) {
      constraintsHtml = '<div class="warp-console-specs">';
      constraintEntries.forEach(([key, val]) => {
        if (typeof val === 'object' && val !== null) {
          constraintsHtml += `  "${key}": <span class="nested-toggle" style="color: #FF5E00; cursor: pointer; font-weight: bold;" onclick="const el = this.nextElementSibling; el.style.display = el.style.display === 'none' ? 'block' : 'none'; this.innerText = el.style.display === 'none' ? '▶ expand' : '▼ collapse';">▶ expand</span><div class="nested-detail-box" style="display:none; padding-left: 10px; border-left: 1px solid #FF5E00; color: #34D399; margin-top: 5px;">${JSON.stringify(val, null, 2)}</div>,\n`;
        } else {
          constraintsHtml += `  "${key}": ${JSON.stringify(val)},\n`;
        }
      });
      constraintsHtml += '</div>';
    }

    terminalBlocksHtml += `
      <div class="warp-terminal-block" id="block-${idx}">
        <div class="block-input-line">
          <span class="warp-prompt">▲ ~/projects/schema</span>
          <span class="warp-cmd">warp inspect --path <strong style="color:#FFF;">${r.path}</strong></span>
          <span class="block-badge ${r.required ? 'critical' : 'stable'}">${r.required ? 'REQUIRED' : 'OPTIONAL'}</span>
        </div>
        
        <div class="block-output">
          <div class="output-meta-row">
            <span>PARAMETER: <code>${r.name}</code></span>
            <span>TYPE: <code>${r.type.toUpperCase()}</code></span>
          </div>
          <p class="output-desc-p">${r.description || 'No descriptive comments logged in terminal.'}</p>
          
          <div class="output-code-section">
            <span class="output-code-header">validation constraints</span>
            <pre><code>{
${constraintsHtml || '  "noConstraints": true\n'}</code></pre>
          </div>
        </div>
      </div>
    `;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} - Warp IDE Console</title>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #121212; /* Warm near-black */
      color: #E6E6E6;
      font-family: 'Inter', sans-serif;
      display: flex;
      height: 100vh;
      overflow: hidden;
    }

    .warp-sidebar {
      width: 240px;
      min-width: 180px;
      max-width: 400px;
      background-color: #181818;
      border-right: 1px solid #2C2C2C;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .sidebar-header {
      padding: 1.5rem;
      border-bottom: 1px solid #2C2C2C;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .sidebar-header h2 {
      font-family: 'Instrument Serif', serif;
      font-style: italic;
      font-size: 1.5rem;
      font-weight: 400;
      color: #FFF;
    }
    
    .file-tree {
      flex: 1;
      overflow-y: auto;
      padding: 0.75rem;
    }
    .tree-item {
      padding: 0.4rem 0.75rem;
      font-size: 0.8rem;
      color: #8C8C8C;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border-radius: 4px;
    }
    .tree-item:hover { background-color: #242424; color: #FFF; }
    .tree-item.active { background-color: #2C2C2C; color: #FFF; font-weight: 600; }
    .tree-icon { font-size: 0.85rem; }

    .resizer {
      width: 4px;
      cursor: col-resize;
      background-color: #2C2C2C;
      z-index: 10;
    }
    .resizer:hover { background-color: #FF5E00; }

    .warp-main-pane {
      flex: 1;
      overflow-y: auto;
      padding: 3rem 4rem;
      scroll-behavior: smooth;
      height: 100%;
    }
    .main-header {
      margin-bottom: 3rem;
      border-bottom: 1px solid #2C2C2C;
      padding-bottom: 1.5rem;
    }
    .main-header h1 { font-family: 'Instrument Serif', serif; font-style: italic; font-size: 2.5rem; font-weight: 400; color: #FFF; }

    /* Warp Terminal Block layout */
    .warp-terminal-block {
      background-color: #1A1A1A;
      border: 1px solid #2C2C2C;
      border-radius: 8px;
      margin-bottom: 2.5rem;
      overflow: hidden;
      transition: border-color 0.15s;
    }
    .warp-terminal-block:hover { border-color: #444; }
    .warp-terminal-block.active { border-color: #FF5E00; }

    .block-input-line {
      background-color: #161616;
      padding: 0.75rem 1.25rem;
      border-bottom: 1px solid #2C2C2C;
      display: flex;
      align-items: center;
      gap: 1rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
    }
    .warp-prompt { color: #8C8C8C; }
    .warp-cmd { color: #FF5E00; flex: 1; }
    
    .block-badge { font-size: 0.65rem; font-weight: 700; padding: 0.15rem 0.4rem; border-radius: 3px; }
    .block-badge.critical { background-color: rgba(255, 94, 0, 0.15); color: #FF5E00; }
    .block-badge.stable { background-color: #2C2C2C; color: #8C8C8C; }

    .block-output { padding: 1.5rem 2rem; }
    .output-meta-row {
      display: flex;
      justify-content: space-between;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: #8C8C8C;
      margin-bottom: 0.75rem;
    }
    .output-desc-p { font-size: 0.85rem; color: #C2C2C6; line-height: 1.5; margin-bottom: 1.5rem; }

    .output-code-section {
      border: 1px solid #2C2C2C;
      background-color: #121212;
      border-radius: 6px;
      overflow: hidden;
    }
    .output-code-header {
      background-color: #161616;
      display: block;
      padding: 0.35rem 0.75rem;
      font-size: 0.65rem;
      text-transform: uppercase;
      font-weight: 700;
      color: #8C8C8C;
      border-bottom: 1px solid #2C2C2C;
    }
    .output-code-section pre { padding: 0.75rem 1rem; overflow-x: auto; }
    .output-code-section code { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #34D399; }
  </style>
</head>
<body>

  <div class="warp-sidebar" id="warp-sidebar">
    <div class="sidebar-header">
      <h2>warp-spec-tree</h2>
      <span style="color:#8C8C8C; font-size: 0.75rem;">draft-3-specs</span>
    </div>
    <div class="file-tree" id="tree-list">
      ${fileTreeHtml}
    </div>
  </div>

  <div class="resizer" id="tree-resizer"></div>

  <div class="warp-main-pane" id="main-pane">
    <div class="main-header">
      <h1>${title} Terminal Console</h1>
      <p style="color:#8C8C8C; font-size:0.85rem; margin-top:0.25rem;">${desc}</p>
    </div>
    
    <div class="blocks-container">
      ${terminalBlocksHtml}
    </div>
  </div>

  <script>
    function focusWarpBlock(idx) {
      document.querySelectorAll('.tree-item').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.warp-terminal-block').forEach(b => b.classList.remove('active'));

      const treeItems = document.querySelectorAll('.tree-item');
      treeItems[idx]?.classList.add('active');

      const target = document.getElementById('block-' + idx);
      target?.classList.add('active');
      target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    focusWarpBlock(0);

    const sidebar = document.getElementById('warp-sidebar');
    const resizer = document.getElementById('tree-resizer');
    let isResizing = false;

    resizer.addEventListener('mousedown', () => {
      isResizing = true;
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isResizing) return;
      if (e.clientX > 180 && e.clientX < 400) {
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
  // Fix minor syntax issue in pre code injection from raw JS template
};
