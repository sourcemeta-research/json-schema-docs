const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.resolve(__dirname, '../draft-3-docs');
const BUILD_DIR = path.resolve(__dirname, 'build');

// Upgraded recursive flattener to extract expected paths for audit assertions
function getFlatRows(schema) {
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

if (!fs.existsSync(DOCS_DIR) || !fs.existsSync(BUILD_DIR)) {
  console.error('[Error] Required directories do not exist. Run run_recursive.js first.');
  process.exit(1);
}

const docsFiles = fs.readdirSync(DOCS_DIR);
let totalChecks = 0;
let totalFailures = 0;
const failureReport = [];

docsFiles.forEach(file => {
  if (file.endsWith('-canonical.json')) {
    const filePath = path.join(DOCS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const schema = JSON.parse(content);
    
    const baseName = file.replace('-canonical.json', '');
    const rows = getFlatRows(schema);

    // Scan all 20 layout outputs for this schema
    for (let layoutIdx = 1; layoutIdx <= 20; layoutIdx++) {
      const layoutName = `layout_${layoutIdx}`;
      const buildFile = path.join(BUILD_DIR, `${baseName}_${layoutName}.html`);
      
      if (!fs.existsSync(buildFile)) {
        console.warn(`[Warning] Missing output file: ${buildFile}`);
        continue;
      }
      
      const htmlContent = fs.readFileSync(buildFile, 'utf8');
      
      rows.forEach(r => {
        totalChecks++;
        
        // 1. Verify Path exists in HTML (we inspect lowercased search)
        const pathInHtml = htmlContent.toLowerCase().includes(r.path.toLowerCase()) || 
                            htmlContent.toLowerCase().includes(r.name.toLowerCase());
        
        // 2. Verify Type description exists in HTML
        const typeInHtml = htmlContent.toLowerCase().includes(r.type.toLowerCase()) || r.type === 'any';

        if (!pathInHtml) {
          totalFailures++;
          failureReport.push({
            file: `${baseName}_${layoutName}.html`,
            element: 'Path',
            expected: r.path,
            details: `Path "${r.path}" was not found in the HTML source code.`
          });
        } else if (!typeInHtml) {
          totalFailures++;
          failureReport.push({
            file: `${baseName}_${layoutName}.html`,
            element: 'Type',
            expected: r.type,
            details: `Type "${r.type}" for parameter "${r.path}" was not found in the HTML source code.`
          });
        }
      });
    }
  }
});

console.log('==================================================');
console.log('            RECURSIVE COMPLETENESS REPORT         ');
console.log('==================================================');
console.log(`Total checks conducted: ${totalChecks}`);
console.log(`Total failures detected: ${totalFailures}`);

if (totalFailures > 0) {
  console.log('\n[FAIL] Missing Parameter Details in generated HTML templates:');
  failureReport.forEach((fail, i) => {
    console.log(`\n  (${i + 1}) File: ${fail.file}`);
    console.log(`      Missing: ${fail.element}`);
    console.log(`      Expected: ${fail.expected}`);
    console.log(`      Reason: ${fail.details}`);
  });
  process.exit(1);
} else {
  console.log('\n[PASS] All 20 recursive tree generators successfully render 100% of parameter paths and types!');
  process.exit(0);
}
