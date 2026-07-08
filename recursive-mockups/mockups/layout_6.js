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

  let tocHtml = '';
  let sectionsHtml = '';

  rows.forEach((r, idx) => {
    const slug = `prop-${idx}`;
    tocHtml += `
      <li class="toc-item" id="toc-item-${idx}">
        <a href="#${slug}" onclick="scrollToSection('${slug}', event)">// ${r.path.toUpperCase()}</a>
      </li>
    `;

    let constraintsHtml = '';
    const constraintEntries = Object.entries(r.constraints);
    if (constraintEntries.length > 0) {
      constraintsHtml = '<blockquote class="wired-quote">';
      constraintEntries.forEach(([key, val]) => {
        if (typeof val === 'object' && val !== null) {
          constraintsHtml += `
            <p>“The parameter strictly mandates <strong>${key}</strong> to match:
              <span class="nested-toggle" style="color: #FF3366; cursor: pointer; font-weight: bold; margin-left: 5px;" onclick="const el = this.nextElementSibling; el.style.display = el.style.display === 'none' ? 'block' : 'none'; this.innerText = el.style.display === 'none' ? '▶ show rules' : '▼ hide rules';">▶ show rules</span>
              <span class="nested-detail-box" style="display:none; margin-top: 5px; width: 100%; font-style: normal; display: block;">
                <pre style="font-family: monospace; font-size: 0.75rem; background: #EAE9E4; padding: 5px; border-left: 2px solid #FF3366; overflow-x: auto;">${JSON.stringify(val, null, 2)}</pre>
              </span>
            ”</p>
          `;
        } else {
          constraintsHtml += `<p>“The parameter strictly mandates <strong>${key}</strong> to match <code>${JSON.stringify(val)}</code>”</p>`;
        }
      });
      constraintsHtml += '</blockquote>';
    }

    // Drop cap styling for description
    const descText = r.description || 'No supplementary comments accompany this configuration parameter.';
    const dropCap = descText.charAt(0);
    const restText = descText.slice(1);

    sectionsHtml += `
      <section id="${slug}" class="wired-article" data-idx="${idx}">
        <div class="heading-row">
          <h2>${r.path}</h2>
          <span class="anchor-link" onclick="copyAnchor('${slug}')">¶</span>
        </div>
        
        <div class="wired-meta">
          <span>FORMAT: <strong class="m-val">${r.type.toUpperCase()}</strong></span>
          <span>REQUIRED: <strong class="m-val">${r.required ? 'YES' : 'NO'}</strong></span>
        </div>

        <p class="article-desc">
          <span class="drop-cap">${dropCap}</span>${restText}
        </p>
        ${constraintsHtml}
      </section>
    `;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} - Wired Editorial Spec</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Lora:ital,wght@0,400;0,600;1,400&family=Inter:wght@500;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #FAF9F6;
      color: #111111;
      font-family: 'Lora', Georgia, serif;
      display: flex;
      height: 100vh;
      overflow: hidden;
      line-height: 1.6;
    }
    
    .toc-pane {
      width: 300px;
      border-right: 2px solid #000;
      padding: 3rem 1.5rem;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .toc-header {
      font-family: 'Inter', sans-serif;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      border-bottom: 4px double #000;
      padding-bottom: 0.5rem;
      margin-bottom: 1.5rem;
    }
    .toc-list { list-style: none; overflow-y: auto; flex: 1; }
    .toc-item {
      font-family: 'Inter', sans-serif;
      font-size: 0.75rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
      letter-spacing: 0.02em;
    }
    .toc-item a {
      color: #555;
      text-decoration: none;
      transition: color 0.15s;
    }
    .toc-item a:hover { color: #000; }
    .toc-item.active a {
      color: #FF3366; /* Wired Red */
      border-bottom: 2px solid #FF3366;
    }

    .content-pane {
      flex: 1;
      overflow-y: auto;
      padding: 4rem 5rem;
      scroll-behavior: smooth;
    }
    
    .article-header {
      max-width: 650px;
      margin-bottom: 4rem;
      border-bottom: 4px double #000;
      padding-bottom: 2rem;
    }
    .article-header h1 {
      font-family: 'Playfair Display', serif;
      font-size: 3.2rem;
      font-weight: 700;
      line-height: 1.1;
      margin-bottom: 1rem;
      letter-spacing: -0.02em;
    }
    .article-header p {
      font-size: 1.15rem;
      color: #333;
      font-style: italic;
    }
    
    .wired-article {
      max-width: 650px;
      margin-bottom: 5rem;
      border-bottom: 1px solid #CCC;
      padding-bottom: 3rem;
    }
    .heading-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }
    .heading-row h2 {
      font-family: 'Playfair Display', serif;
      font-size: 2rem;
      font-weight: 700;
      color: #000;
      font-family: monospace;
      word-break: break-all;
    }
    .anchor-link {
      color: #999;
      cursor: pointer;
      font-size: 1.25rem;
    }
    .anchor-link:hover { color: #FF3366; }
    
    .wired-meta {
      font-family: 'Inter', sans-serif;
      font-size: 0.65rem;
      letter-spacing: 0.05em;
      color: #666;
      margin-bottom: 1.5rem;
      display: flex;
      gap: 1.5rem;
    }
    .m-val { color: #000; font-weight: 700; }

    .article-desc {
      font-size: 1rem;
      color: #222;
      margin-bottom: 1.5rem;
      text-align: justify;
    }
    
    /* Drop Cap */
    .drop-cap {
      font-family: 'Playfair Display', serif;
      font-size: 3.2rem;
      float: left;
      line-height: 0.8;
      margin-right: 0.5rem;
      margin-top: 0.15rem;
      font-weight: 700;
      color: #000;
    }

    .wired-quote {
      border-left: 3px solid #FF3366;
      padding-left: 1.5rem;
      margin: 1.5rem 0;
      font-style: italic;
      font-size: 1.05rem;
      color: #333;
    }
    .wired-quote code {
      font-family: monospace;
      background-color: #EAE9E4;
      padding: 0.1rem 0.3rem;
      font-style: normal;
    }
  </style>
</head>
<body>

  <div class="toc-pane">
    <div class="toc-header">Spec Index</div>
    <ul class="toc-list">
      ${tocHtml}
    </ul>
  </div>

  <div class="content-pane" id="article-scroll">
    <header class="article-header">
      <h1>${title}</h1>
      <p>${desc}</p>
    </header>
    
    <div class="articles-list">
      ${sectionsHtml}
    </div>
  </div>

  <script>
    function scrollToSection(id, evt) {
      evt.preventDefault();
      const target = document.getElementById(id);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = entry.target.getAttribute('data-idx');
          document.querySelectorAll('.toc-item').forEach(item => item.classList.remove('active'));
          document.getElementById('toc-item-' + idx)?.classList.add('active');
        }
      });
    }, {
      root: document.getElementById('article-scroll'),
      rootMargin: '0px 0px -50% 0px',
      threshold: 0
    });

    document.querySelectorAll('.wired-article').forEach(art => {
      observer.observe(art);
    });

    function copyAnchor(id) {
      const url = window.location.href.split('#')[0] + '#' + id;
      navigator.clipboard.writeText(url).then(() => {
        alert('Wired Spec Section anchor link copied!');
      });
    }
  </script>
</body>
</html>`;
};
