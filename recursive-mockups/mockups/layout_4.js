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
  let editorLinesHtml = '';
  let chatSuggestionsHtml = '';

  rows.forEach((r, idx) => {
    fileTreeHtml += `
      <div class="cursor-tree-row ${idx === 0 ? 'active' : ''}" id="tree-row-${idx}" onclick="focusCursorElement(${idx})">
        <span class="tree-bullet">◇</span>
        <span class="tree-text">${r.path}</span>
      </div>
    `;

    let constraintLines = '';
    const constraintEntries = Object.entries(r.constraints);
    if (constraintEntries.length > 0) {
      constraintEntries.forEach(([k, v]) => {
        constraintLines += `  <span class="token key">"${k}"</span>: <span class="token val">${JSON.stringify(v)}</span>,\n`;
      });
    }

    editorLinesHtml += `
      <div id="editor-block-${idx}" class="cursor-code-block ${idx === 0 ? 'active' : ''}">
        <div class="line"><span class="l-num">1</span> <span class="token comment">// Property: ${r.path}</span></div>
        <div class="line"><span class="l-num">2</span> <span class="token comment">// Description: ${r.description || 'No notes available.'}</span></div>
        <div class="line"><span class="l-num">3</span> <span class="token key">"${r.name}"</span>: {</div>
        <div class="line"><span class="l-num">4</span>   <span class="token key">"type"</span>: <span class="token str">"${r.type}"</span>,</div>
        <div class="line"><span class="l-num">5</span>   <span class="token key">"required"</span>: <span class="token bool">${r.required}</span>,</div>
        ${constraintLines ? `<div class="line"><span class="l-num">6</span> ${constraintLines}</div>` : ''}
        <div class="line"><span class="l-num">7</span> }</div>
      </div>
    `;

    chatSuggestionsHtml += `
      <div id="chat-block-${idx}" class="cursor-chat-bubble ${idx === 0 ? 'active' : ''}">
        <div class="chat-agent">Cursor AI</div>
        <p>I audited the property <code>${r.path}</code>. Here is my analysis of the constraints:</p>
        
        <div class="ai-diff">
          <div class="diff-line plus">+ "type": "${r.type}"</div>
          <div class="diff-line plus">+ "required": ${r.required}</div>
          ${constraintEntries.map(([k, v]) => {
            if (typeof v === 'object' && v !== null) {
              return `
              <div class="diff-line plus nested" style="display:flex; flex-direction:column;">
                <span>+ "${k}": <span style="color:#f54e00; cursor:pointer; font-weight:bold;" onclick="const el = this.nextElementSibling; el.style.display = el.style.display === 'none' ? 'block' : 'none'; this.innerText = el.style.display === 'none' ? '▶ expand' : '▼ collapse';">▶ expand</span>
                  <pre style="display:none; margin-top:5px; padding-left:10px; background:#e5e5df; color:#26251e; font-size:0.75rem; border-left: 2px solid #f54e00; overflow-x:auto;">${JSON.stringify(v, null, 2)}</pre>
                </span>
              </div>`;
            }
            return `<div class="diff-line plus">+ "${k}": ${JSON.stringify(v)}</div>`;
          }).join('\n')}
        </div>

        <p style="margin-top: 1rem;">This property is <strong>${r.required ? 'strictly mandatory' : 'optional'}</strong>. Let me know if you want to modify this setting.</p>
        <button class="apply-btn" onclick="alert('Applied to editor')">Accept (Tab)</button>
      </div>
    `;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} - Cursor Editor</title>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #f7f7f4; /* Cursor warm cream background */
      color: #26251e; /* Cursor warm ink text */
      font-family: 'Plus Jakarta Sans', sans-serif;
      display: flex;
      height: 100vh;
      overflow: hidden;
    }

    .cursor-window {
      width: 100%;
      height: 100%;
      display: flex;
      border: 1px solid #ccd0c9;
    }

    /* Left pane: File directory tree */
    .cursor-left-pane {
      width: 250px;
      background-color: #f0f0eb;
      border-right: 1px solid #ccd0c9;
      display: flex;
      flex-direction: column;
    }
    .left-header {
      padding: 1rem;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px solid #ccd0c9;
      color: #72726b;
    }
    .left-tree { flex: 1; overflow-y: auto; padding: 0.5rem; }
    .cursor-tree-row {
      padding: 0.4rem 0.75rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8rem;
      border-radius: 4px;
      color: #5c5c56;
    }
    .cursor-tree-row:hover { background-color: rgba(0,0,0,0.03); }
    .cursor-tree-row.active {
      background-color: #e5e5df;
      color: #000;
      font-weight: 600;
    }
    .tree-bullet { color: #f54e00; }

    /* Middle pane: Editor workspace */
    .cursor-editor-pane {
      flex: 1.2;
      background-color: #f7f7f4;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .editor-header {
      padding: 0.75rem 1.5rem;
      border-bottom: 1px solid #ccd0c9;
      background-color: #f0f0eb;
      font-size: 0.8rem;
      color: #72726b;
      display: flex;
      justify-content: space-between;
    }
    .editor-body {
      flex: 1;
      overflow-y: auto;
      padding: 2rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
    }
    
    .cursor-code-block { display: none; }
    .cursor-code-block.active { display: block; }
    
    .line { display: flex; margin-bottom: 0.25rem; }
    .l-num { width: 30px; color: #ccd0c9; flex-shrink: 0; }
    .token.comment { color: #8e928a; }
    .token.key { color: #a626a4; }
    .token.val { color: #f54e00; }
    .token.str { color: #50a14f; }
    .token.bool { color: #4078f2; }

    /* Right pane: AI Chat sidebar */
    .cursor-chat-pane {
      width: 320px;
      background-color: #f0f0eb;
      border-left: 1px solid #ccd0c9;
      display: flex;
      flex-direction: column;
      padding: 1.5rem;
    }
    .chat-header {
      font-size: 0.8rem;
      font-weight: 700;
      color: #72726b;
      text-transform: uppercase;
      border-bottom: 1px solid #ccd0c9;
      padding-bottom: 0.5rem;
      margin-bottom: 1.5rem;
      display: flex;
      justify-content: space-between;
    }
    .chat-body { flex: 1; overflow-y: auto; }
    
    .cursor-chat-bubble { display: none; }
    .cursor-chat-bubble.active { display: block; }
    
    .chat-agent {
      font-weight: 700;
      color: #f54e00; /* Cursor Orange */
      font-size: 0.85rem;
      margin-bottom: 0.5rem;
    }
    .cursor-chat-bubble p { font-size: 0.85rem; line-height: 1.4; color: #5c5c56; }
    
    .ai-diff {
      background-color: #e5e5df;
      border: 1px solid #ccd0c9;
      padding: 0.75rem;
      border-radius: 6px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      margin-top: 0.75rem;
    }
    .diff-line.plus { color: #22863a; }
    
    .apply-btn {
      margin-top: 1rem;
      background-color: #f54e00;
      color: #FFF;
      border: none;
      padding: 0.5rem 1.25rem;
      font-weight: 700;
      font-size: 0.8rem;
      cursor: pointer;
      border-radius: 4px;
      width: 100%;
    }
    .apply-btn:hover { background-color: #d44300; }
  </style>
</head>
<body>

  <div class="cursor-window">
    <div class="cursor-left-pane">
      <div class="left-header">Editor Explorer</div>
      <div class="left-tree">
        ${fileTreeHtml}
      </div>
    </div>
    
    <div class="cursor-editor-pane">
      <div class="editor-header">
        <span>Active Tab: schema.json</span>
        <span>JSON Schema Draft 3</span>
      </div>
      <div class="editor-body">
        ${editorLinesHtml}
      </div>
    </div>
    
    <div class="cursor-chat-pane">
      <div class="chat-header">
        <span>Cursor Chat</span>
        <span style="color:#f54e00;">● Active</span>
      </div>
      <div class="chat-body">
        ${chatSuggestionsHtml}
      </div>
    </div>
  </div>

  <script>
    function focusCursorElement(idx) {
      document.querySelectorAll('.cursor-tree-row').forEach(r => r.classList.remove('active'));
      document.querySelectorAll('.cursor-code-block').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.cursor-chat-bubble').forEach(c => c.classList.remove('active'));

      document.getElementById('tree-row-' + idx).classList.add('active');
      document.getElementById('editor-block-' + idx).classList.add('active');
      document.getElementById('chat-block-' + idx).classList.add('active');
    }
  </script>
</body>
</html>`;
};
