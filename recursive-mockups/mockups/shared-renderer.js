// Shared row-walking and constraint-rendering logic for the Carbon-style layouts.
// Each layout_N.js supplies only its own CSS skin and calls these functions to build
// the table body, so a fix here doesn't need to be hand-copied into 5 files.

function variantTypeLabel(v) {
  if (!v || typeof v !== 'object') return 'any';
  if (Array.isArray(v.type)) return v.type.map(variantTypeLabel).join(' | ');
  return v.type || 'any';
}

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
    let typeVariants = null;

    function extract(n) {
      if (!n || typeof n !== 'object') return;

      if (n.type && Array.isArray(n.type)) {
        // Draft 3 union type: these are alternatives, not something to merge.
        // Each variant keeps its own properties instead of being flattened onto
        // this node (the old behavior made e.g. "bugs: string | object" look like
        // it always had .url/.email, even in the plain-string case).
        typeVariants = n.type.filter(v => typeof v === 'object');
        type = typeVariants.map(variantTypeLabel).join(' | ');
      } else if (n.type) {
        type = n.type;
      }

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

    if (typeVariants) {
      constraints.typeVariants = typeVariants;
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

function renderSubSchemaTable(subSchema) {
  if (!subSchema || typeof subSchema !== 'object') return '';
  const subRows = [];
  const subVisited = new Map();

  function subWalk(node, parentPath = [], isRequired = false) {
    if (!node || typeof node !== 'object') return;
    if (subVisited.has(node)) return;
    subVisited.set(node, parentPath.join('.'));

    let type = 'any';
    let description = '';
    let constraints = {};
    let properties = {};
    let patternProperties = {};
    let additionalProperties = null;
    let items = null;

    function extract(n) {
      if (!n || typeof n !== 'object') return;
      if (n.type && Array.isArray(n.type)) {
        type = n.type.map(variantTypeLabel).join(' | ');
      } else if (n.type) {
        type = n.type;
      }
      description = n.description || description || '';
      for (const [key, val] of Object.entries(n)) {
        if (!['type', 'description', 'properties', 'patternProperties', 'additionalProperties', 'items', 'extends', 'allOf', 'anyOf', 'oneOf', 'not', 'if', 'then', 'else'].includes(key)) {
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
      subRows.push({
        path: parentPath.join('.'),
        type: type,
        constraints: constraints,
        description: description
      });
    }

    const requiredList = node.required || [];
    for (const [name, childNode] of Object.entries(properties)) {
      const childRequired = childNode.required === true || (Array.isArray(requiredList) && requiredList.includes(name));
      subWalk(childNode, [...parentPath, name], childRequired);
    }
    for (const [pattern, childNode] of Object.entries(patternProperties)) {
      subWalk(childNode, [...parentPath, `/${pattern}/`], false);
    }
    if (additionalProperties && typeof additionalProperties === 'object') {
      subWalk(additionalProperties, [...parentPath, '*'], false);
    }
    if (items && typeof items === 'object') {
      if (Array.isArray(items)) {
        items.forEach((itemNode, idx) => {
          subWalk(itemNode, [...parentPath, `[${idx}]`], false);
        });
      } else {
        subWalk(items, [...parentPath, '*'], false);
      }
    }
    subVisited.delete(node);
  }

  subWalk(subSchema);
  if (subRows.length === 0) {
    return `<pre style="font-size:0.7rem; background:#F4F4F4; padding:4px; margin:0; border:1px solid #E0E0E0;">${JSON.stringify(subSchema, null, 2)}</pre>`;
  }

  let html = '<table style="width:100%; border-collapse:collapse; margin-top:4px; font-size:0.75rem; border:1px solid #E0E0E0; background:#FFF;">';
  html += '<thead style="background:#F4F4F4;"><tr><th style="padding:4px; border:1px solid #E0E0E0; text-align:left;">Path</th><th style="padding:4px; border:1px solid #E0E0E0; text-align:left;">Type</th><th style="padding:4px; border:1px solid #E0E0E0; text-align:left;">Details</th></tr></thead><tbody>';
  subRows.forEach(r => {
    const cStr = Object.entries(r.constraints).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join(', ');
    html += `<tr>
      <td style="padding:4px; border:1px solid #E0E0E0;"><code>${r.path}</code></td>
      <td style="padding:4px; border:1px solid #E0E0E0; color:#0F62FE; font-weight:600;">${r.type}</td>
      <td style="padding:4px; border:1px solid #E0E0E0; color:#525252;">
        ${r.description ? `<p style="margin-bottom:2px;">${r.description}</p>` : ''}
        ${cStr ? `<code>${cStr}</code>` : ''}
      </td>
    </tr>`;
  });
  html += '</tbody></table>';
  return html;
}

function renderConstraintsHtml(constraints) {
  const entries = Object.entries(constraints);
  if (entries.length === 0) return '';
  let html = '<div class="carbon-constraints">';
  entries.forEach(([key, val]) => {
    if (['allOf', 'anyOf', 'oneOf'].includes(key) && Array.isArray(val)) {
      html += `
        <details class="carbon-nested-details" style="margin-bottom: 4px; width: 100%;">
          <summary style="cursor: pointer; color: #0F62FE; font-size: 0.75rem; font-weight: 600; outline: none; list-style: none;">${key} [${val.length} branches] [+ expand]</summary>
          <div style="padding: 8px; border-left: 2px solid #0F62FE; background: #FAF9FC; margin-top: 2px;">
      `;
      val.forEach((sub, bIdx) => {
        html += `
          <div style="margin-bottom: 8px; border-bottom: 1px dashed #E0E0E0; padding-bottom: 8px;">
            <strong style="font-size: 0.7rem; color: #525252; display: block; margin-bottom: 2px;">Branch ${bIdx + 1}:</strong>
            ${renderSubSchemaTable(sub)}
          </div>
        `;
      });
      html += `</div></details>`;
    } else if (key === 'typeVariants' && Array.isArray(val)) {
      html += `
        <details class="carbon-nested-details" style="margin-bottom: 4px; width: 100%;">
          <summary style="cursor: pointer; color: #0F62FE; font-size: 0.75rem; font-weight: 600; outline: none; list-style: none;">type variants [${val.length} branches] [+ expand]</summary>
          <div style="padding: 8px; border-left: 2px solid #0F62FE; background: #FAF9FC; margin-top: 2px;">
      `;
      val.forEach((sub, bIdx) => {
        html += `
          <div style="margin-bottom: 8px; border-bottom: 1px dashed #E0E0E0; padding-bottom: 8px;">
            <strong style="font-size: 0.7rem; color: #525252; display: block; margin-bottom: 2px;">Variant ${bIdx + 1}:</strong>
            ${renderSubSchemaTable(sub)}
          </div>
        `;
      });
      html += `</div></details>`;
    } else if (key === 'not' && typeof val === 'object' && val !== null) {
      html += `
        <details class="carbon-nested-details" style="margin-bottom: 4px; width: 100%;">
          <summary style="cursor: pointer; color: #D12727; font-size: 0.75rem; font-weight: 600; outline: none; list-style: none;">not (Must NOT Match) [+ expand]</summary>
          <div style="padding: 8px; border-left: 2px solid #D12727; background: #FFF0F0; margin-top: 2px;">
            ${renderSubSchemaTable(val)}
          </div>
        </details>
      `;
    } else if ((key === 'if' || key === 'then' || key === 'else') && typeof val === 'object' && val !== null) {
      const labels = { if: 'if (Condition)', then: 'then (Applies When True)', else: 'else (Applies When False)' };
      html += `
        <details class="carbon-nested-details" style="margin-bottom: 4px; width: 100%;">
          <summary style="cursor: pointer; color: #8A3FFC; font-size: 0.75rem; font-weight: 600; outline: none; list-style: none;">${labels[key]} [+ expand]</summary>
          <div style="padding: 8px; border-left: 2px solid #8A3FFC; background: #F6F2FF; margin-top: 2px;">
            ${renderSubSchemaTable(val)}
          </div>
        </details>
      `;
    } else if (key === '$ref' && typeof val === 'string') {
      html += `
        <div class="carbon-tag" style="background-color: #FFF1E0; border-color: #FFD9A8; color: #8A4B00;">
          <span class="t-k">$ref:</span> <span class="t-v" style="font-weight: 600;"><a href="${val}" style="color:#8A4B00; text-decoration: underline;">${val}</a></span>
        </div>
      `;
    } else if ((key === '$dynamicRef' || key === '$dynamicAnchor') && typeof val === 'string') {
      html += `
        <div class="carbon-tag" style="background-color: #E8DAFF; border-color: #D4BBFF; color: #6929C4;">
          <span class="t-k">${key}:</span> <span class="t-v" style="font-weight: 600;">${val}</span>
        </div>
      `;
    } else if (key.startsWith('x-')) {
      html += `
        <div class="carbon-tag" style="background-color: #E2FCEF; border-color: #A3F1C9; color: #0A8243;">
          <span class="t-k">${key}:</span> <span class="t-v" style="font-weight: 600;">${JSON.stringify(val)}</span>
        </div>
      `;
    } else if (typeof val === 'object' && val !== null) {
      html += `
        <details class="carbon-nested-details" style="margin-bottom: 4px;">
          <summary style="cursor: pointer; color: #0F62FE; font-size: 0.75rem; font-weight: 600; outline: none; list-style: none;">${key} [+ expand]</summary>
          <pre style="font-family: monospace; font-size: 0.7rem; background: #F4F4F4; border-left: 2px solid #0F62FE; padding: 5px; color: #161616; overflow-x: auto; margin-top: 2px;">${JSON.stringify(val, null, 2)}</pre>
        </details>
      `;
    } else {
      html += `
        <div class="carbon-tag">
          <span class="t-k">${key}:</span> <span class="t-v">${JSON.stringify(val)}</span>
        </div>
      `;
    }
  });
  html += '</div>';
  return html;
}

function renderRowsHtml(rows) {
  let tableRowsHtml = '';
  rows.forEach(r => {
    const constraintsHtml = renderConstraintsHtml(r.constraints);
    tableRowsHtml += `
      <tr class="carbon-row" id="node-${r.path}" data-path="${r.path}">
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

module.exports = { buildRows, renderConstraintsHtml, renderRowsHtml, renderSubSchemaTable, variantTypeLabel };
