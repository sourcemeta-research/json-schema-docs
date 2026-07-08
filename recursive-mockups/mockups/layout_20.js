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
    const sectionNum = `3.${idx + 1}`;
    tocHtml += `
      <div class="rfc-toc-row">
        <span>${sectionNum}.  ${r.path}</span>
        <span class="toc-dots">...................................................</span>
        <span>${idx + 4}</span>
      </div>
    `;

    let constraintsHtml = '';
    const constraintEntries = Object.entries(r.constraints);
    if (constraintEntries.length > 0) {
      constraintsHtml = '<div class="rfc-constraints">|  VALIDATION CONSTRAINTS:<br>';
      constraintEntries.forEach(([key, val]) => {
        if (typeof val === 'object' && val !== null) {
          constraintsHtml += `|  - ${key}: <span class="nested-toggle" style="text-decoration: underline; cursor: pointer; color: blue;" onclick="const el = this.nextElementSibling; el.style.display = el.style.display === 'none' ? 'block' : 'none'; this.innerText = el.style.display === 'none' ? '[expand]' : '[collapse]';">[expand]</span><div class="nested-detail-box" style="display:none; margin-top: 5px; padding-left:10px; border-left: 2px solid #000;">${JSON.stringify(val, null, 2)}</div><br>`;
        } else {
          constraintsHtml += `|  - ${key}: ${JSON.stringify(val)}<br>`;
        }
      });
      constraintsHtml += '</div>';
    }

    sectionsHtml += `
      <div class="rfc-section" id="rfc-sec-${idx}">
        <h3>${sectionNum}.  The "${r.path}" Parameter</h3>
        
        <p class="rfc-text">
          Type representation: "${r.type.toUpperCase()}" (Required: ${r.required ? 'YES' : 'NO'})
        </p>

        <p class="rfc-text">
          DESCRIPTION:
          ${r.description || 'No descriptive text was supplied in this section.'}
        </p>

        ${constraintsHtml}
      </div>
    `;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} - RFC Documentation</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #FFFFFF;
      color: #000000;
      font-family: "Courier New", Courier, monospace;
      font-size: 14px;
      line-height: 1.5;
      padding: 3rem;
      max-width: 720px;
      margin: 0 auto;
    }
    
    .rfc-header-block {
      border-bottom: 1.5px solid #000;
      padding-bottom: 1.5rem;
      margin-bottom: 2.5rem;
      display: flex;
      justify-content: space-between;
    }
    .header-left, .header-right { display: flex; flex-direction: column; }
    .header-right { text-align: right; }

    .rfc-title {
      font-size: 1.5rem;
      font-weight: bold;
      text-align: center;
      margin-bottom: 2rem;
      text-transform: uppercase;
    }

    .rfc-intro { margin-bottom: 3rem; }
    .rfc-intro h2 { font-size: 1.1rem; font-weight: bold; margin-bottom: 0.75rem; text-transform: uppercase; }
    
    .rfc-toc { margin-bottom: 4rem; }
    .rfc-toc h2 { font-size: 1.1rem; font-weight: bold; margin-bottom: 1rem; text-transform: uppercase; }
    .rfc-toc-row { display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 0.35rem; }
    .toc-dots { flex: 1; text-align: center; overflow: hidden; white-space: nowrap; margin: 0 0.5rem; color: #888; }

    .rfc-section { margin-bottom: 3rem; padding-left: 2rem; }
    .rfc-section h3 { font-size: 1.05rem; font-weight: bold; margin-left: -2rem; margin-bottom: 0.75rem; text-transform: uppercase; }
    
    .rfc-text { margin-bottom: 1rem; text-align: justify; text-indent: 2rem; }

    .rfc-constraints {
      font-family: monospace;
      margin-top: 1rem;
      margin-bottom: 1.5rem;
      border-left: 3px double #000;
      padding-left: 1rem;
      font-size: 0.85rem;
    }
  </style>
</head>
<body>

  <div class="rfc-header-block">
    <div class="header-left">
      <span>Network Working Group</span>
      <span>Request for Comments: 2026</span>
      <span>Category: Standards Track</span>
    </div>
    <div class="header-right">
      <span>Sourcemeta Research</span>
      <span>July 2026</span>
    </div>
  </div>

  <div class="rfc-title">${title} Specification</div>

  <div class="rfc-intro">
    <h2>1.  Status of this Memo</h2>
    <p class="rfc-text">
      This document specifies an Internet standards track protocol for the Internet community, and requests discussion and suggestions for improvements.
      Please refer to the current edition of the "Internet Official Protocol Standards" for the standardization state and status of this protocol.
    </p>
    
    <h2>2.  Overview & Description</h2>
    <p class="rfc-text">
      ${desc}
    </p>
  </div>

  <div class="rfc-toc">
    <h2>Table of Contents</h2>
    ${tocHtml}
  </div>

  <div class="rfc-sections-container">
    <h2>3.  Parameter Definitions</h2>
    <br>
    ${sectionsHtml}
  </div>

</body>
</html>`;
};
