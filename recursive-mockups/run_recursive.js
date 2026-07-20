const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.resolve(__dirname, '../draft-3-docs');
const BUILD_DIR = path.resolve(__dirname, 'build');
const MOCKUPS_DIR = path.resolve(__dirname, 'mockups');

if (!fs.existsSync(BUILD_DIR)) {
  fs.mkdirSync(BUILD_DIR, { recursive: true });
}

// Load recursive layouts
const layouts = {};
for (let i = 1; i <= 5; i++) {
  const fileKey = `layout_${i}`;
  const filePath = path.join(MOCKUPS_DIR, `${fileKey}.js`);
  if (fs.existsSync(filePath)) {
    layouts[fileKey] = require(filePath);
  } else {
    console.warn(`[Warning] Recursive layout file not found: ${filePath}`);
  }
}

// Compile
const docsFiles = fs.readdirSync(DOCS_DIR);
console.log('Compiling recursive tree mockups...');
docsFiles.forEach(file => {
  if (file.endsWith('-canonical.json')) {
    const filePath = path.join(DOCS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const schema = JSON.parse(content);
    
    const baseName = file.replace('-canonical.json', '');
    const title = schema.title || baseName;
    const desc = schema.description || 'API Schema Specification';

    Object.entries(layouts).forEach(([layoutName, renderFunc]) => {
      try {
        const html = renderFunc(title, desc, schema);
        const outputFilename = `${baseName}_${layoutName}.html`;
        fs.writeFileSync(path.join(BUILD_DIR, outputFilename), html, 'utf8');
      } catch (err) {
        console.error(`[Error] Failed to render recursive layout ${layoutName} for schema ${baseName}:`, err.stack);
      }
    });
  }
});
console.log(`[Success] Recursive tree mockups compiled. Outputs in: ${BUILD_DIR}`);
