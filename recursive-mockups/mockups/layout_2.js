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

  const columns = {
    backlog: [],
    todo: [],
    inProgress: [],
    done: []
  };

  rows.forEach((r, idx) => {
    const hasConstraints = Object.keys(r.constraints).length > 0;
    const isObjectOrArray = r.type.includes('object') || r.type.includes('array');
    
    let status = 'todo';
    if (r.required) {
      status = 'done';
    } else if (isObjectOrArray) {
      status = 'inProgress';
    } else if (!hasConstraints) {
      status = 'backlog';
    }

    const priorityIcon = r.required ? '🔴' : hasConstraints ? '🟡' : '⚪';
    const cardHtml = `
      <div class="linear-card" id="card-${idx}" onclick="focusLinearCard(${idx})" data-status="${status}">
        <div class="card-meta-row">
          <span class="card-id">SCH-${idx + 101}</span>
          <span class="card-priority">${priorityIcon}</span>
        </div>
        <div class="card-title">${r.path}</div>
        <div class="card-tags-row">
          <span class="tag-badge">${r.type}</span>
          <span class="tag-depth">L${r.depth}</span>
        </div>
      </div>
    `;

    columns[status].push(cardHtml);
  });

  let inspectorHtml = '';
  rows.forEach((r, idx) => {
    let constraintsHtml = '';
    const constraintEntries = Object.entries(r.constraints);
    if (constraintEntries.length > 0) {
      constraintsHtml = '<div class="c-grid">';
      constraintEntries.forEach(([key, val]) => {
        if (typeof val === 'object' && val !== null) {
          constraintsHtml += `
            <div class="c-item nested" style="grid-column: 1 / -1;">
              <span class="c-k">${key}:</span>
              <span class="nested-toggle" style="color: #5E6AD2; cursor: pointer; font-weight: bold; margin-left: 10px;" onclick="const el = this.nextElementSibling; el.style.display = el.style.display === 'none' ? 'block' : 'none'; this.innerText = el.style.display === 'none' ? '▶ expand' : '▼ collapse';">▶ expand</span>
              <div class="nested-detail-box" style="display:none; margin-top: 5px;">
                <pre style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; background: #080808; border-left: 2px solid #5E6AD2; padding: 5px; color: #E2E8F0; overflow-x: auto;">${JSON.stringify(val, null, 2)}</pre>
              </div>
            </div>
          `;
        } else {
          constraintsHtml += `
            <div class="c-item">
              <span class="c-k">${key}:</span>
              <span class="c-v">${JSON.stringify(val)}</span>
            </div>
          `;
        }
      });
      constraintsHtml += '</div>';
    }

    inspectorHtml += `
      <div id="inspector-${idx}" class="linear-inspector ${idx === 0 ? 'active' : ''}">
        <div class="ins-header">
          <h3>SCH-${idx + 101}</h3>
          <span class="ins-status-badge">${r.required ? 'Done' : 'Todo'}</span>
        </div>
        
        <h2>${r.path}</h2>
        
        <div class="ins-property-row">
          <span class="prop-lbl">Assignee</span>
          <span class="prop-val">Compiler Bot</span>
        </div>
        <div class="ins-property-row">
          <span class="prop-lbl">Type</span>
          <span class="prop-val active-val">${r.type.toUpperCase()}</span>
        </div>
        <div class="ins-property-row">
          <span class="prop-lbl">Depth</span>
          <span class="prop-val">${r.depth} Levels</span>
        </div>

        <div class="ins-section">
          <h4>Description</h4>
          <p class="ins-desc">${r.description || 'No description provided.'}</p>
        </div>

        <div class="ins-section">
          <h4>Validation Rules</h4>
          ${constraintsHtml || '<span style="color:#666; font-style:italic;">None</span>'}
        </div>
      </div>
    `;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} - Linear Board</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #080808; /* Linear Void Black */
      color: #E2E8F0;
      font-family: 'Plus Jakarta Sans', sans-serif;
      display: flex;
      height: 100vh;
      overflow: hidden;
    }

    .board-pane {
      flex: 1;
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 2rem;
      overflow-x: auto;
    }
    
    .board-header {
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .board-header h1 { font-size: 1.25rem; font-weight: 700; letter-spacing: -0.02em; color: #FFF; }
    
    .board-columns {
      display: flex;
      gap: 1.25rem;
      flex: 1;
      min-width: 900px;
    }
    
    .board-col {
      flex: 1;
      background-color: #121315; /* Linear Column Gray */
      border: 1px solid #1F2023;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      height: 100%;
      max-height: calc(100vh - 150px);
    }
    .col-header {
      padding: 1rem;
      border-bottom: 1px solid #1F2023;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.8rem;
      font-weight: 600;
      color: #8E9196;
    }
    .col-count { background-color: #1F2023; color: #FFF; padding: 0.15rem 0.4rem; border-radius: 4px; font-size: 0.7rem; }
    
    .cards-list {
      flex: 1;
      overflow-y: auto;
      padding: 0.75rem;
    }
    
    .linear-card {
      background-color: #161719;
      border: 1px solid #202226;
      border-radius: 6px;
      padding: 0.85rem;
      margin-bottom: 0.5rem;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0,0,0,0.15);
      transition: all 0.15s ease;
    }
    .linear-card:hover { border-color: #3b3d42; background-color: #1a1c1f; }
    .linear-card.active { border-color: #5E6AD2; box-shadow: 0 0 10px rgba(94, 106, 210, 0.25); }

    .card-meta-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
    .card-id { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #5E6AD2; }
    .card-priority { font-size: 0.7rem; }

    .card-title {
      font-size: 0.85rem;
      font-weight: 600;
      color: #FFF;
      margin-bottom: 0.75rem;
      font-family: 'JetBrains Mono', monospace;
      word-break: break-all;
    }

    .card-tags-row { display: flex; gap: 0.35rem; }
    .tag-badge { background-color: #202226; color: #8E9196; font-size: 0.65rem; padding: 0.15rem 0.35rem; border-radius: 4px; font-family: monospace; }
    .tag-depth { background-color: rgba(94, 106, 210, 0.1); color: #5E6AD2; font-size: 0.65rem; padding: 0.15rem 0.35rem; border-radius: 4px; }

    .resizer { width: 4px; cursor: col-resize; background-color: #1F2023; z-index: 10; }
    .resizer:hover { background-color: #5E6AD2; }

    .inspector-pane {
      width: 320px;
      min-width: 250px;
      max-width: 480px;
      background-color: #0E0F11;
      border-left: 1px solid #1F2023;
      height: 100%;
      overflow-y: auto;
      padding: 2rem;
    }
    
    .linear-inspector { display: none; }
    .linear-inspector.active { display: block; }
    
    .ins-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
    .ins-header h3 { font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: #5E6AD2; }
    
    .ins-status-badge { font-size: 0.7rem; font-weight: 700; background-color: #202226; color: #FFF; padding: 0.2rem 0.5rem; border-radius: 4px; }
    
    .linear-inspector h2 { font-size: 1.25rem; font-weight: 700; color: #FFF; margin-bottom: 2rem; font-family: 'JetBrains Mono', monospace; word-break: break-all; }
    
    .ins-property-row { display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.75rem; border-bottom: 1px solid #161719; padding-bottom: 0.5rem; }
    .prop-lbl { color: #8E9196; }
    .prop-val { color: #FFF; font-weight: 600; }
    .prop-val.active-val { color: #5E6AD2; font-family: 'JetBrains Mono', monospace; }

    .ins-section { margin-top: 2rem; }
    .ins-section h4 { font-size: 0.75rem; color: #8E9196; text-transform: uppercase; margin-bottom: 0.75rem; font-weight: 700; }
    .ins-desc { font-size: 0.85rem; color: #C2C2C6; line-height: 1.5; }

    .c-grid { display: grid; grid-template-columns: 1fr; gap: 0.5rem; }
    .c-item { background-color: #121315; border: 1px solid #1F2023; padding: 0.5rem 0.75rem; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; }
    .c-k { color: #8E9196; }
    .c-v { color: #5E6AD2; font-weight: 600; }
  </style>
</head>
<body>

  <div class="board-pane">
    <div class="board-header">
      <h1>Project Board: ${title}</h1>
      <span style="font-size: 0.8rem; color:#8E9196;">Active sprint settings</span>
    </div>
    
    <div class="board-columns">
      <div class="board-col">
        <div class="col-header">
          <span>Backlog</span>
          <span class="col-count">${columns.backlog.length}</span>
        </div>
        <div class="cards-list">${columns.backlog.join('')}</div>
      </div>
      
      <div class="board-col">
        <div class="col-header">
          <span>Todo</span>
          <span class="col-count">${columns.todo.length}</span>
        </div>
        <div class="cards-list">${columns.todo.join('')}</div>
      </div>

      <div class="board-col">
        <div class="col-header">
          <span>In Progress</span>
          <span class="col-count">${columns.inProgress.length}</span>
        </div>
        <div class="cards-list">${columns.inProgress.join('')}</div>
      </div>

      <div class="board-col">
        <div class="col-header">
          <span>Done</span>
          <span class="col-count">${columns.done.length}</span>
        </div>
        <div class="cards-list">${columns.done.join('')}</div>
      </div>
    </div>
  </div>

  <div class="resizer" id="pane-resizer"></div>

  <div class="inspector-pane" id="inspector-pane">
    ${inspectorHtml}
  </div>

  <script>
    document.querySelector('.linear-card')?.classList.add('active');

    function focusLinearCard(idx) {
      document.querySelectorAll('.linear-card').forEach(c => c.classList.remove('active'));
      document.getElementById('card-' + idx).classList.add('active');

      document.querySelectorAll('.linear-inspector').forEach(ins => ins.classList.remove('active'));
      document.getElementById('inspector-' + idx).classList.add('active');
    }

    const insPane = document.getElementById('inspector-pane');
    const resizer = document.getElementById('pane-resizer');
    let isResizing = false;

    resizer.addEventListener('mousedown', () => {
      isResizing = true;
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isResizing) return;
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth > 250 && newWidth < 480) {
        insPane.style.width = newWidth + 'px';
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
};
