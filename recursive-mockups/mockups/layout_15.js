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

  let issuesHtml = '';
  
  rows.forEach((r, idx) => {
    let tagBadges = `
      <span class="sentry-tag">type:${r.type}</span>
      <span class="sentry-tag sentry-req-tag ${r.required ? 'req' : 'opt'}">${r.required ? 'required:true' : 'required:false'}</span>
    `;

    Object.entries(r.constraints).forEach(([k, v]) => {
      tagBadges += `<span class="sentry-tag">${k}:${JSON.stringify(v)}</span>`;
    });

    issuesHtml += `
      <div class="sentry-issue" data-path="${r.path}">
        <div class="issue-main" onclick="toggleSentryStackTrace(${idx})">
          <div class="issue-left">
            <span class="sentry-checkbox"></span>
            <div class="issue-details">
              <h3 class="issue-title">${r.path}</h3>
              <p class="issue-message">${r.description || 'No detailed stack trace description has been logged.'}</p>
              <div class="sentry-tags-row">
                ${tagBadges}
              </div>
            </div>
          </div>
          
          <div class="issue-right">
            <div class="mock-sparkline">
              <div class="spark-bar" style="height: 12px;"></div>
              <div class="spark-bar" style="height: 18px;"></div>
              <div class="spark-bar" style="height: 8px;"></div>
              <div class="spark-bar" style="height: 22px;"></div>
              <div class="spark-bar" style="height: 15px;"></div>
            </div>
            <span class="arrow-indicator">▼</span>
          </div>
        </div>
        
        <div id="stack-trace-${idx}" class="sentry-stack-trace">
          <div class="trace-header">PROPERTY METADATA & SCHEMA DECLARATION</div>
          <div class="trace-frame">
            <div class="trace-line"><span class="line-num">1</span> <span class="line-code">"path": "${r.path}",</span></div>
            <div class="trace-line"><span class="line-num">2</span> <span class="line-code">"name": "${r.name}",</span></div>
            <div class="trace-line"><span class="line-num">3</span> <span class="line-code">"type": "${r.type}",</span></div>
            <div class="trace-line"><span class="line-num">4</span> <span class="line-code">"required": ${r.required},</span></div>
            <div class="trace-line"><span class="line-num">5</span> <span class="line-code">"constraints":
              <span class="nested-toggle" style="color: #E1567C; cursor: pointer; font-weight: bold; margin-left: 5px;" onclick="const el = this.nextElementSibling; el.style.display = el.style.display === 'none' ? 'block' : 'none'; this.innerText = el.style.display === 'none' ? '▶ expand' : '▼ collapse';">▶ expand</span>
              <div class="nested-detail-box" style="display:none; margin-top: 5px; width: 100%;">
                <pre style="font-family: monospace; font-size: 0.75rem; background: #0E0E10; border-left: 2px solid #E1567C; padding: 5px; color: #FFF; overflow-x: auto;">${JSON.stringify(r.constraints, null, 2)}</pre>
              </div>
            </span></div>
          </div>
        </div>
      </div>
    `;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} - Sentry Exception Log</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #18121E; /* Sentry Slate Purple */
      color: #E2DDF0;
      font-family: 'Plus Jakarta Sans', sans-serif;
      padding: 3rem;
    }
    
    header {
      border-bottom: 1px solid #2B2238;
      padding-bottom: 2rem;
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    h1 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #FFF;
      letter-spacing: -0.02em;
    }
    
    .sentry-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #1F1727;
      border: 1px solid #2B2238;
      padding: 0.75rem 1.5rem;
      margin-bottom: 1.5rem;
    }
    .sentry-search {
      background-color: #18121E;
      border: 1px solid #3E3352;
      color: #FFF;
      padding: 0.5rem 1rem;
      font-size: 0.8rem;
      width: 320px;
      outline: none;
    }
    .sentry-search:focus { border-color: #E1567C; } /* Sentry Pink */

    .sentry-list {
      border: 1px solid #2B2238;
      background-color: #1F1727;
      display: flex;
      flex-direction: column;
    }
    
    .sentry-issue {
      border-bottom: 1px solid #2B2238;
    }
    .sentry-issue:last-child { border-bottom: none; }
    
    .issue-main {
      padding: 1rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
    }
    .issue-main:hover { background-color: #241C2E; }
    
    .issue-left { display: flex; align-items: flex-start; gap: 1rem; overflow: hidden; }
    .sentry-checkbox {
      width: 14px;
      height: 14px;
      border: 2px solid #5C4B75;
      margin-top: 0.25rem;
      display: inline-block;
      flex-shrink: 0;
    }
    .issue-details { overflow: hidden; }
    .issue-title {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.9rem;
      font-weight: 700;
      color: #E1567C; /* Sentry Exception color */
      margin-bottom: 0.25rem;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .issue-message { font-size: 0.8rem; color: #B3A9C9; margin-bottom: 0.5rem; }

    .sentry-tags-row { display: flex; flex-wrap: wrap; gap: 0.35rem; }
    .sentry-tag {
      background-color: rgba(255,255,255,0.04);
      border: 1px solid #3E3352;
      color: #B3A9C9;
      font-size: 0.65rem;
      font-weight: 600;
      padding: 0.15rem 0.4rem;
      font-family: 'JetBrains Mono', monospace;
    }
    .sentry-tag.sentry-req-tag.req { background-color: rgba(225, 86, 124, 0.1); color: #E1567C; border-color: rgba(225, 86, 124, 0.25); }

    .issue-right { display: flex; align-items: center; gap: 2rem; }
    .mock-sparkline { display: flex; align-items: flex-end; gap: 2px; width: 40px; }
    .spark-bar { width: 6px; background-color: #5C4B75; }
    .arrow-indicator { font-size: 0.75rem; color: #5C4B75; }

    .sentry-stack-trace {
      display: none;
      background-color: #150F1A;
      border-top: 1px solid #2B2238;
      padding: 1.5rem;
    }
    .sentry-stack-trace.open { display: block; }
    
    .trace-header { font-size: 0.7rem; color: #5C4B75; font-weight: 700; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
    .trace-frame {
      border: 1px solid #2D223B;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
    }
    .trace-line { display: flex; padding: 0.25rem 0.75rem; border-bottom: 1px solid #231B2D; }
    .trace-line:last-child { border-bottom: none; }
    .line-num { width: 30px; color: #5C4B75; flex-shrink: 0; }
    .line-code { color: #FFF; white-space: pre-wrap; }
  </style>
</head>
<body>

  <header>
    <h1>Project: ${title} Issue Exceptions</h1>
    <span style="font-size: 0.85rem; color: #B3A9C9;">Environment: production</span>
  </header>

  <div class="sentry-toolbar">
    <input type="text" class="sentry-search" placeholder="Search exceptions..." oninput="filterSentry(this.value)">
    <span style="font-size:0.75rem; color:#B3A9C9;">All Issues logged</span>
  </div>

  <div class="sentry-list" id="issue-list">
    ${issuesHtml}
  </div>

  <script>
    function toggleSentryStackTrace(idx) {
      const trace = document.getElementById('stack-trace-' + idx);
      trace.classList.toggle('open');
    }

    function filterSentry(val) {
      const filter = val.toLowerCase();
      document.querySelectorAll('.sentry-issue').forEach(issue => {
        const path = issue.getAttribute('data-path').toLowerCase();
        if (path.includes(filter)) {
          issue.style.display = 'block';
        } else {
          issue.style.display = 'none';
        }
      });
    }
  </script>
</body>
</html>`;
};
