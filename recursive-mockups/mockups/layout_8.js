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

  let listHtml = '';
  let detailPanelsHtml = '';
  
  rows.forEach((r, idx) => {
    let constraintsHtml = '';
    const constraintEntries = Object.entries(r.constraints);
    if (constraintEntries.length > 0) {
      constraintsHtml = '<div class="cal-constraints">';
      constraintEntries.forEach(([key, val]) => {
        if (typeof val === 'object' && val !== null) {
          constraintsHtml += `
            <div class="c-badge nested" style="width: 100%; margin-bottom: 5px;">
              <span class="c-k">${key}:</span>
              <span class="nested-toggle" style="color: #4F46E5; cursor: pointer; font-weight: bold; margin-left: 10px;" onclick="const el = this.nextElementSibling; el.style.display = el.style.display === 'none' ? 'block' : 'none'; this.innerText = el.style.display === 'none' ? '▶ expand' : '▼ collapse';">▶ expand</span>
              <div class="nested-detail-box" style="display:none; margin-top: 5px;">
                <pre style="font-family: monospace; font-size: 0.75rem; background: #F3F4F6; border-left: 2px solid #4F46E5; padding: 5px; color: #111827; overflow-x: auto;">${JSON.stringify(val, null, 2)}</pre>
              </div>
            </div>
          `;
        } else {
          constraintsHtml += `
            <div class="c-badge">
              <span class="c-k">${key}:</span> <span class="c-v">${JSON.stringify(val)}</span>
            </div>
          `;
        }
      });
      constraintsHtml += '</div>';
    }

    listHtml += `
      <div class="cal-event-card" onclick="openCalEventDrawer(${idx})" id="event-card-${idx}">
        <div class="event-card-top">
          <div class="card-left">
            <span class="event-icon">📅</span>
            <div class="event-details">
              <h4>${r.path}</h4>
              <p>/settings/spec/${r.name.toLowerCase()}</p>
            </div>
          </div>
          <span class="event-duration-badge">${r.type.toUpperCase()}</span>
        </div>
        <p class="event-desc-preview">${r.description || 'No scheduling description comments logged.'}</p>
        <div class="event-card-footer">
          <span class="event-badge ${r.required ? 'req' : 'opt'}">${r.required ? '★ Mandatory' : 'Optional'}</span>
          <span>Depth: L${r.depth}</span>
        </div>
      </div>
    `;

    detailPanelsHtml += `
      <div id="drawer-${idx}" class="cal-drawer-panel">
        <div class="drawer-header">
          <h3>Edit Booking Type</h3>
          <button class="close-drawer-btn" onclick="closeCalEventDrawer(${idx}, event)">×</button>
        </div>
        
        <div class="drawer-body">
          <div class="field-group">
            <label>EVENT PATH</label>
            <input type="text" value="${r.path}" readonly>
          </div>
          
          <div class="field-group">
            <label>PARAMETER TYPE</label>
            <input type="text" value="${r.type.toUpperCase()}" readonly style="font-family: monospace; color: #4F46E5;">
          </div>

          <div class="field-group">
            <label>DESCRIPTION STORY</label>
            <textarea readonly>${r.description || 'No descriptive comments available.'}</textarea>
          </div>

          <div class="field-group">
            <label>SCHEDULING CONSTRAINTS (VALIDATION)</label>
            ${constraintsHtml || '<span style="color:#6B7280; font-size:0.8rem; font-style:italic;">No restrictions</span>'}
          </div>
          
          <div style="margin-top: 2rem;">
            <button class="save-btn" onclick="closeCalEventDrawer(${idx}, event)">Update Event Type</button>
          </div>
        </div>
      </div>
    `;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} - Cal.com Bookings</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #F3F4F6;
      color: #111827;
      font-family: 'Plus Jakarta Sans', sans-serif;
      padding: 3rem;
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
    }
    
    header {
      margin-bottom: 2.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    h1 { font-size: 1.5rem; font-weight: 700; color: #111827; letter-spacing: -0.03em; }
    .header-desc { font-size: 0.85rem; color: #4B5563; }
    .new-btn { background-color: #111827; color: #FFF; border: none; padding: 0.5rem 1rem; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 0.8rem; }
    .new-btn:hover { background-color: #000; }

    .cal-workspace {
      flex: 1;
      display: flex;
      overflow: hidden;
      gap: 2rem;
      position: relative;
    }
    
    .cal-grid-pane {
      flex: 1.3;
      overflow-y: auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.25rem;
      padding-right: 0.5rem;
      height: 100%;
    }
    
    .cal-event-card {
      background-color: #FFFFFF;
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      padding: 1.25rem;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: border-color 0.15s, box-shadow 0.15s;
      height: 200px;
    }
    .cal-event-card:hover { border-color: #111827; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
    .cal-event-card.active { border-color: #111827; background-color: #FAFAFA; }
    
    .event-card-top { display: flex; justify-content: space-between; align-items: flex-start; }
    .card-left { display: flex; gap: 0.75rem; }
    .event-icon { font-size: 1.2rem; }
    .event-details h4 { font-size: 0.9rem; font-weight: 700; color: #111827; word-break: break-all; }
    .event-details p { font-size: 0.75rem; color: #6B7280; font-family: monospace; }
    
    .event-duration-badge { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; background-color: #F3F4F6; padding: 0.15rem 0.4rem; border-radius: 4px; font-weight: 600; }

    .event-desc-preview { font-size: 0.8rem; color: #4B5563; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; margin-top: 0.5rem; }

    .event-card-footer { display: flex; justify-content: space-between; font-size: 0.75rem; color: #6B7280; border-top: 1px solid #F3F4F6; padding-top: 0.75rem; margin-top: auto; }
    .event-badge { font-weight: 600; }
    .event-badge.req { color: #E11D48; }
    .event-badge.opt { color: #4B5563; }

    .cal-constraints { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.5rem; }
    .c-badge { background-color: #F3F4F6; border: 1px solid #E5E7EB; border-radius: 4px; padding: 0.1rem 0.35rem; font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; }
    .c-k { color: #6B7280; }
    .c-v { color: #111827; font-weight: 600; }

    /* Slide-Over Drawer Pane */
    .cal-drawer-pane {
      width: 380px;
      background-color: #FFFFFF;
      border-left: 1px solid #E5E7EB;
      height: 100%;
      overflow-y: auto;
      box-shadow: -4px 0 15px rgba(0,0,0,0.02);
      position: relative;
    }
    
    .cal-drawer-panel { display: none; padding: 2rem; }
    .cal-drawer-panel.active { display: block; }
    
    .drawer-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F3F4F6; padding-bottom: 1rem; margin-bottom: 1.5rem; }
    .drawer-header h3 { font-size: 1.1rem; font-weight: 700; }
    .close-drawer-btn { background: none; border: none; font-size: 1.5rem; color: #9CA3AF; cursor: pointer; }
    .close-drawer-btn:hover { color: #111827; }

    .field-group { margin-bottom: 1.5rem; }
    .field-group label { font-size: 0.7rem; font-weight: 700; color: #4B5563; letter-spacing: 0.05em; display: block; margin-bottom: 0.5rem; }
    .field-group input, .field-group textarea { width: 100%; border: 1px solid #D1D5DB; border-radius: 6px; padding: 0.5rem 0.75rem; font-size: 0.85rem; outline: none; font-family: inherit; }
    .field-group input:focus, .field-group textarea:focus { border-color: #111827; }
    .field-group textarea { height: 100px; resize: none; }
    
    .save-btn { background-color: #111827; color: white; border: none; width: 100%; padding: 0.65rem; border-radius: 6px; font-weight: 600; font-size: 0.85rem; cursor: pointer; }
    .save-btn:hover { background-color: #000; }
  </style>
</head>
<body>

  <header>
    <div>
      <h1>${title} Event Types</h1>
      <p class="header-desc">${desc}</p>
    </div>
    <button class="new-btn">+ Create Event Type</button>
  </header>

  <div class="cal-workspace">
    <div class="cal-grid-pane" id="events-grid">
      ${listHtml}
    </div>
    
    <div class="cal-drawer-pane" id="drawer-pane">
      <div id="drawer-placeholder" style="color:#9CA3AF; padding: 2rem; font-style: italic; text-align: center; margin-top: 4rem;">
        Select an event card to edit schedule constraints.
      </div>
      ${detailPanelsHtml}
    </div>
  </div>

  <script>
    function openCalEventDrawer(idx) {
      document.getElementById('drawer-placeholder').style.display = 'none';
      document.querySelectorAll('.cal-event-card').forEach(c => c.classList.remove('active'));
      document.querySelectorAll('.cal-drawer-panel').forEach(d => d.classList.remove('active'));

      document.getElementById('event-card-' + idx).classList.add('active');
      document.getElementById('drawer-' + idx).classList.add('active');
    }

    function closeCalEventDrawer(idx, evt) {
      evt.stopPropagation();
      document.getElementById('event-card-' + idx).classList.remove('active');
      document.getElementById('drawer-' + idx).classList.remove('active');
      document.getElementById('drawer-placeholder').style.display = 'block';
    }
  </script>
</body>
</html>`;
};
