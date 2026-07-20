// Shared row-walking and constraint-rendering logic for the Carbon-style layouts.
// Each layout_N.js supplies only its own CSS skin and calls these functions to build
// the table body, so a fix here doesn't need to be hand-copied into 5 files.

function buildRows(schema) {
  const rows = [];
  const visited = new Map();

  function walk(node, parentPath = [], isRequired = false) {
    if (!node || typeof node !== 'object') return;

    if (visited.has(node)) {
      const targetPath = visited.get(node);
      rows.push({
        path: parentPath.join('.'),
        name: parentPath[parentPath.length - 1],
        depth: parentPath.length,
        type: 'recursiveRef',
        targetPath: targetPath,
        required: isRequired,
        description: 'Recursive reference back to ' + targetPath + '.',
        constraints: {}
      });
      return;
    }
    visited.set(node, parentPath.join('.'));

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
  return rows;
}

function renderRowsHtml(rows) {
  let tableRowsHtml = '';

  rows.forEach((r, idx) => {
    let constraintsHtml = '';
    const constraintEntries = Object.entries(r.constraints);
    if (constraintEntries.length > 0) {
      constraintsHtml = '<div class="carbon-constraints">';
      constraintEntries.forEach(([key, val]) => {
        if (typeof val === 'object' && val !== null) {
          constraintsHtml += `
            <details class="carbon-nested-details" style="margin-bottom: 4px;">
              <summary style="cursor: pointer; color: #0F62FE; font-size: 0.75rem; font-weight: 600; outline: none; list-style: none;">${key} [+ expand]</summary>
              <pre style="font-family: monospace; font-size: 0.7rem; background: #F4F4F4; border-left: 2px solid #0F62FE; padding: 5px; color: #161616; overflow-x: auto; margin-top: 2px;">${JSON.stringify(val, null, 2)}</pre>
            </details>
          `;
        } else {
          constraintsHtml += `
            <div class="carbon-tag">
              <span class="t-k">${key}:</span> <span class="t-v">${JSON.stringify(val)}</span>
            </div>
          `;
        }
      });
      constraintsHtml += '</div>';
    }

    tableRowsHtml += `
      <tr class="carbon-row" id="node-${r.path}" data-path="${r.path}">
        <td class="carbon-cell-checkbox">
          <input type="checkbox" class="bx--checkbox" id="checkbox-${idx}">
        </td>
        <td class="carbon-cell-path">
          <code style="font-weight: 700; color: #161616; font-size: 0.8rem;">${r.path}</code>
          ${r.description ? `
          <details class="carbon-description-details" style="margin-top: 4px; font-size: 0.8rem; color: #525252;">
            <summary style="cursor: pointer; outline: none; color: #0F62FE; font-weight: 500; list-style: none;">Description &amp; Details</summary>
            <div style="padding: 8px; margin-top: 4px; background: #F4F4F4; border-left: 2px solid #0F62FE;">
              <p style="margin-bottom: 8px; line-height: 1.4;">${r.description}</p>
              <pre style="font-size: 0.7rem; font-family: monospace; overflow-x: auto; padding: 4px; background: #EAEAEA;">${JSON.stringify(r.constraints, null, 2)}</pre>
            </div>
          </details>` : ''}
        </td>
        <td class="carbon-cell-type">
          <span class="type-mono">
            ${r.type === 'recursiveRef' ? `recursiveRef to <a href="#node-${r.targetPath}" style="color: #0F62FE; font-weight: 600; text-decoration: underline;">${r.targetPath}</a>` : r.type}
          </span>
        </td>
        <td class="carbon-cell-req">${r.required ? '<strong class="req-alert">REQUIRED</strong>' : '<span class="opt-alert">OPTIONAL</span>'}</td>
        <td class="carbon-cell-validation">${constraintsHtml || '<span style="color:#8d8d8d;">None</span>'}</td>
      </tr>
    `;
  });

  return tableRowsHtml;
}

module.exports = { buildRows, renderRowsHtml };
