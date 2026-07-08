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

  let sidebarLinksHtml = '';
  let mainContentHtml = '';

  rows.forEach((r, idx) => {
    sidebarLinksHtml += `
      <li class="nav-item" id="nav-item-${idx}" onclick="scrollToSection('${idx}')">
        <span>${r.path}</span>
        ${r.required ? '<span class="req-dot"></span>' : ''}
      </li>
    `;

    let constraintsHtml = '';
    const constraintEntries = Object.entries(r.constraints);
    if (constraintEntries.length > 0) {
      constraintsHtml = '<div class="stripe-constraints">';
      constraintEntries.forEach(([key, val]) => {
        if (typeof val === 'object' && val !== null) {
          constraintsHtml += `
            <div class="constraint-row nested" style="flex-wrap: wrap;">
              <span class="c-key">${key}</span>
              <span class="nested-toggle" style="color: var(--accent); cursor: pointer; font-weight: bold; margin-left: 10px;" onclick="event.stopPropagation(); const el = this.nextElementSibling; el.style.display = el.style.display === 'none' ? 'block' : 'none'; this.innerText = el.style.display === 'none' ? '▶ expand' : '▼ collapse';">▶ expand</span>
              <div class="nested-detail-box" style="display:none; width: 100%; padding-left: 10px; margin-top: 5px;">
                <pre style="font-family: monospace; font-size: 0.75rem; background: #fafafa; border-left: 2px solid #ccc; padding: 5px; color: #333;">${JSON.stringify(val, null, 2)}</pre>
              </div>
            </div>
          `;
        } else {
          constraintsHtml += `
            <div class="constraint-row">
              <span class="c-key">${key}</span>
              <span class="c-val">${JSON.stringify(val)}</span>
            </div>
          `;
        }
      });
      constraintsHtml += '</div>';
    }

    mainContentHtml += `
      <section id="sec-${idx}" class="stripe-section" data-idx="${idx}">
        <div class="section-header">
          <h2>${r.path}</h2>
          <span class="type-badge">${r.type}</span>
          ${r.required ? '<span class="status-badge required">REQUIRED</span>' : '<span class="status-badge optional">OPTIONAL</span>'}
        </div>
        <p class="section-desc">${r.description || 'No descriptive comments are provided for this parameter.'}</p>
        ${constraintsHtml}
      </section>
    `;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} - Stripe API Docs</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #FFFFFF;
      --side-bg: #F8F9FA;
      --border: #E3E8EE;
      --text: #1F2937;
      --text-dim: #6B7280;
      --accent: #635BFF;
      --code-bg: #0A101D;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', sans-serif;
      background-color: var(--bg);
      color: var(--text);
      display: flex;
      height: 100vh;
      overflow: hidden;
    }

    .sidebar {
      width: 250px;
      min-width: 180px;
      max-width: 400px;
      background-color: var(--side-bg);
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .sidebar-header {
      padding: 1.5rem;
      border-bottom: 1px solid var(--border);
    }
    .sidebar-header h3 { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: var(--text); }
    .nav-list { list-style: none; overflow-y: auto; flex: 1; padding: 1rem 0.5rem; }
    .nav-item {
      padding: 0.5rem 1rem;
      font-size: 0.8rem;
      color: var(--text-dim);
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 4px;
      margin-bottom: 0.15rem;
      font-family: 'JetBrains Mono', monospace;
    }
    .nav-item:hover { color: var(--text); background-color: rgba(0,0,0,0.02); }
    .nav-item.active { color: var(--accent); background-color: rgba(99, 91, 255, 0.08); font-weight: 600; }
    .req-dot { width: 5px; height: 5px; background: #EF4444; border-radius: 50%; }

    .resizer {
      width: 4px;
      cursor: col-resize;
      background-color: var(--border);
      transition: background-color 0.2s;
      z-index: 10;
    }
    .resizer:hover, .resizer.resizing { background-color: var(--accent); }

    .doc-column {
      flex: 1;
      overflow-y: auto;
      padding: 3rem 4rem;
      scroll-behavior: smooth;
    }
    .doc-header {
      max-width: 700px;
      margin-bottom: 3rem;
      border-bottom: 1px solid var(--border);
      padding-bottom: 1.5rem;
    }
    .doc-header h1 { font-size: 2rem; font-weight: 700; color: #111827; }
    .doc-header p { color: var(--text-dim); margin-top: 0.5rem; font-size: 0.9rem; }

    .stripe-section {
      max-width: 700px;
      padding: 2.5rem 0;
      border-bottom: 1px solid var(--border);
    }
    .section-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; }
    .section-header h2 { font-family: 'JetBrains Mono', monospace; font-size: 1.1rem; font-weight: 600; color: #111827; }
    .type-badge { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--accent); background: rgba(99, 91, 255, 0.08); padding: 0.15rem 0.4rem; font-weight: 600; }
    
    .status-badge { font-size: 0.65rem; font-weight: bold; padding: 0.15rem 0.35rem; }
    .status-badge.required { color: #DC2626; background: rgba(220, 38, 38, 0.08); }
    .status-badge.optional { color: var(--text-dim); background: rgba(0, 0, 0, 0.04); }
    
    .section-desc { font-size: 0.9rem; color: #374151; line-height: 1.6; margin-bottom: 1rem; }

    .stripe-constraints { background: var(--side-bg); border: 1px solid var(--border); padding: 0.75rem 1rem; }
    .constraint-row { display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 0.25rem; }
    .constraint-row:last-child { margin-bottom: 0; }
    .c-key { color: var(--text-dim); font-family: 'JetBrains Mono', monospace; }
    .c-val { color: var(--text); font-family: 'JetBrains Mono', monospace; font-weight: 600; }

    .code-column {
      width: 380px;
      min-width: 250px;
      max-width: 600px;
      background-color: var(--code-bg);
      border-left: 1px solid #1E293B;
      color: #94A3B8;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .code-tabs {
      display: flex;
      background-color: #0E1626;
      border-bottom: 1px solid #1E293B;
      padding: 0 1rem;
    }
    .code-tab-btn {
      background: none;
      border: none;
      color: #64748B;
      padding: 0.75rem 1rem;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
    }
    .code-tab-btn.active {
      color: #FFF;
      border-bottom: 2px solid var(--accent);
    }
    
    .code-box {
      flex: 1;
      padding: 1.5rem;
      overflow-y: auto;
    }
    .code-block { font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #34D399; line-height: 1.5; white-space: pre-wrap; }
  </style>
</head>
<body>

  <div class="sidebar" id="sidebar">
    <div class="sidebar-header">
      <h3>Schema Paths</h3>
    </div>
    <ul class="nav-list">
      ${sidebarLinksHtml}
    </ul>
  </div>

  <div class="resizer" id="resizer-1"></div>

  <div class="doc-column" id="doc-pane">
    <header class="doc-header">
      <h1>${title} API</h1>
      <p>${desc}</p>
    </header>
    <div class="sections-list">
      ${mainContentHtml}
    </div>
  </div>

  <div class="resizer" id="resizer-2"></div>

  <div class="code-column" id="code-pane">
    <div class="code-tabs">
      <button class="code-tab-btn active" onclick="changeLang('curl')">cURL</button>
      <button class="code-tab-btn" onclick="changeLang('node')">Node.js</button>
      <button class="code-tab-btn" onclick="changeLang('python')">Python</button>
    </div>
    <div class="code-box">
      <pre class="code-block" id="json-code-box"></pre>
    </div>
  </div>

  <script>
    const rows = ${JSON.stringify(rows)};
    let activeIdx = 0;
    let activeLang = 'curl';

    function scrollToSection(idx) {
      const target = document.getElementById('sec-' + idx);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      highlightActive(idx);
    }

    function highlightActive(idx) {
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
      document.getElementById('nav-item-' + idx)?.classList.add('active');
      activeIdx = idx;
      updateCodeBlock();
    }

    function changeLang(lang) {
      document.querySelectorAll('.code-tab-btn').forEach(b => b.classList.remove('active'));
      event.target.classList.add('active');
      activeLang = lang;
      updateCodeBlock();
    }

    function updateCodeBlock() {
      const match = rows[activeIdx];
      if (!match) return;

      let code = '';
      if (activeLang === 'curl') {
        code = \`curl https://api.stripe.com/v1/spec \\\\\\\\n  -u key_live_123: \\\\\\\\n  -d "\${match.path}"="\${match.type}"\`;
      } else if (activeLang === 'node') {
        code = \`const stripe = require('stripe')('key_live_123');\\n\\nawait stripe.schemas.validate({\\n  path: "\${match.path}",\\n  type: "\${match.type}",\\n  constraints: \${JSON.stringify(match.constraints)}\\n});\`;
      } else if (activeLang === 'python') {
        code = \`import stripe\\nstripe.api_key = "key_live_123"\\n\\nstripe.Schema.validate(\\n  path="\${match.path}",\\n  type="\${match.type}",\\n  constraints=\${JSON.stringify(match.constraints)}\\n)\`;
      }

      document.getElementById('json-code-box').innerText = code;
    }

    // Scrollspy
    const docPane = document.getElementById('doc-pane');
    docPane.addEventListener('scroll', () => {
      const sections = document.querySelectorAll('.stripe-section');
      let currentActive = 0;
      
      sections.forEach(sec => {
        const top = sec.offsetTop - docPane.scrollTop;
        if (top < 150) {
          currentActive = sec.getAttribute('data-idx');
        }
      });
      
      if (currentActive !== activeIdx) {
        highlightActive(currentActive);
      }
    });

    highlightActive(0);

    const sidebar = document.getElementById('sidebar');
    const resizer1 = document.getElementById('resizer-1');
    const codePane = document.getElementById('code-pane');
    const resizer2 = document.getElementById('resizer-2');

    let currentResizer = null;

    resizer1.addEventListener('mousedown', () => {
      currentResizer = 1;
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    });

    resizer2.addEventListener('mousedown', () => {
      currentResizer = 2;
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => {
      if (currentResizer === null) return;
      if (currentResizer === 1) {
        if (e.clientX > 180 && e.clientX < 400) sidebar.style.width = e.clientX + 'px';
      } else if (currentResizer === 2) {
        const newWidth = window.innerWidth - e.clientX;
        if (newWidth > 250 && newWidth < 600) codePane.style.width = newWidth + 'px';
      }
    });

    document.addEventListener('mouseup', () => {
      currentResizer = null;
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    });
  </script>
</body>
</html>`;
};
