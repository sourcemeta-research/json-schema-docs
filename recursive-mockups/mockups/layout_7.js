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

  let chatBubblesHtml = '';
  
  rows.forEach((r, idx) => {
    let constraintsHtml = '';
    const constraintEntries = Object.entries(r.constraints);
    if (constraintEntries.length > 0) {
      constraintsHtml = '<pre class="grok-code"><code>';
      constraintEntries.forEach(([key, val]) => {
        if (typeof val === 'object' && val !== null) {
          constraintsHtml += `"${key}": <span class="nested-toggle" style="color: #FF3366; cursor: pointer; font-weight: bold;" onclick="const el = this.nextElementSibling; el.style.display = el.style.display === 'none' ? 'block' : 'none'; this.innerText = el.style.display === 'none' ? '▶ expand' : '▼ collapse';">▶ expand</span><div class="nested-detail-box" style="display:none; margin-top: 5px; margin-left: 10px; border-left: 1px solid #FF3366; padding-left: 5px; color: #FFF;">${JSON.stringify(val, null, 2)}</div>\n`;
        } else {
          constraintsHtml += `"${key}": ${JSON.stringify(val)}\n`;
        }
      });
      constraintsHtml += '</code></pre>';
    }

    chatBubblesHtml += `
      <div class="chat-bubble user">
        <span class="bubble-lbl">User</span>
        <p>Explain configuration path: <strong>${r.path}</strong></p>
      </div>
      
      <div class="chat-bubble grok">
        <span class="bubble-lbl glow-text">Grok</span>
        <div class="grok-answer">
          <h3>// ${r.path.toUpperCase()}</h3>
          <div class="grok-meta">
            <span class="meta-badge">${r.type.toUpperCase()}</span>
            <span class="meta-badge ${r.required ? 'critical' : 'stable'}">${r.required ? 'CRITICAL' : 'STABLE'}</span>
          </div>
          <p class="grok-desc">${r.description || 'No descriptive comments logged in transmission.'}</p>
          ${constraintsHtml}
        </div>
      </div>
    `;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} - Grok Console</title>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #070707; /* Void Black */
      color: #FFFFFF;
      font-family: 'Space Grotesk', sans-serif;
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
    }
    
    header {
      background-color: #0F0F0F;
      border-bottom: 1px solid #222;
      padding: 1.25rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    h1 { font-size: 1.15rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; }
    .grok-modes { display: flex; gap: 0.5rem; }
    .mode-btn {
      background: none;
      border: 1px solid #333;
      color: #888;
      padding: 0.35rem 1rem;
      font-size: 0.75rem;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .mode-btn.active {
      border-color: #FFF;
      color: #FFF;
    }

    .chat-stream {
      flex: 1;
      overflow-y: auto;
      padding: 3rem 15%;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .chat-bubble {
      display: flex;
      flex-direction: column;
      max-width: 750px;
      position: relative;
    }
    .chat-bubble.user { align-self: flex-end; align-items: flex-end; }
    .chat-bubble.grok { align-self: flex-start; align-items: flex-start; width: 100%; }

    .bubble-lbl {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
    }
    .glow-text {
      color: #FF3366;
      text-shadow: 0 0 8px rgba(255, 51, 102, 0.4);
    }
    
    .chat-bubble.user p {
      background-color: #161616;
      border: 1px solid #333;
      padding: 0.85rem 1.25rem;
      border-radius: 20px 20px 0 20px;
      font-size: 0.9rem;
      color: #FFF;
      font-family: 'JetBrains Mono', monospace;
    }

    .grok-answer {
      background-color: #0C0C0C;
      border: 1px solid #222;
      padding: 2rem;
      border-radius: 20px 20px 20px 0;
      width: 100%;
      position: relative;
      transition: border-color 0.2s;
    }
    .grok-answer:hover { border-color: #444; }
    .grok-answer::before {
      content: " ";
      position: absolute;
      top: -1px; left: -1px; right: -1px; bottom: -1px;
      border: 1px solid rgba(255, 255, 255, 0.02);
      border-radius: 20px 20px 20px 0;
      pointer-events: none;
    }
    
    .grok-answer h3 { font-family: 'JetBrains Mono', monospace; font-size: 1.05rem; font-weight: 700; margin-bottom: 0.75rem; word-break: break-all; }
    
    .grok-meta { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
    .meta-badge { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; padding: 0.15rem 0.4rem; border: 1px solid #333; color: #888; }
    .meta-badge.critical { border-color: rgba(255, 51, 102, 0.3); color: #FF3366; }
    .meta-badge.stable { border-color: rgba(0, 224, 150, 0.3); color: #00E096; }

    .grok-desc { font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #CCC; line-height: 1.5; margin-bottom: 1rem; }
    
    .grok-code {
      background-color: #030303;
      border: 1px solid #222;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      overflow-x: auto;
    }
    .grok-code code { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #34D399; }

    .prompt-footer {
      background-color: #0F0F0F;
      border-top: 1px solid #222;
      padding: 1.5rem 15%;
    }
    .prompt-input-wrapper {
      border: 1px solid #333;
      background-color: #050505;
      padding: 0.75rem 1.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 30px;
    }
    .prompt-input-wrapper input {
      flex: 1;
      background: none;
      border: none;
      color: white;
      font-size: 0.85rem;
      outline: none;
    }
    .prompt-input-wrapper input::placeholder { color: #555; }
    .ask-btn { background: none; border: none; color: #FF3366; font-weight: 700; font-size: 0.85rem; cursor: pointer; }
  </style>
</head>
<body>

  <header>
    <h1>Grok Chat Console // ${title}</h1>
    <div class="grok-modes">
      <button class="mode-btn active">Fun Mode</button>
      <button class="mode-btn">Standard</button>
    </div>
  </header>

  <div class="chat-stream">
    <div class="chat-bubble grok">
      <span class="bubble-lbl glow-text">Grok</span>
      <div class="grok-answer">
        <h3>// SYSTEM TRANSMISSION LOADED</h3>
        <p class="grok-desc">${desc}</p>
      </div>
    </div>

    ${chatBubblesHtml}
  </div>

  <div class="prompt-footer">
    <div class="prompt-input-wrapper">
      <input type="text" placeholder="Ask Grok to audit configuration parameters...">
      <button class="ask-btn">ASK GROK</button>
    </div>
  </div>
</body>
</html>`;
};
