const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CLI_PATH = path.resolve(__dirname, '../blaze/build/bin/Debug/sourcemeta_blaze_contrib_canonicalize.exe');
const DOCS_DIR = path.join(__dirname, 'draft-3-docs');

console.log('--- Batch Canonicalizing Draft 3 Schemas ---');
console.log(`Using CLI: ${CLI_PATH}`);

if (!fs.existsSync(CLI_PATH)) {
  console.error('[Error] Compiled C++ canonicalizer CLI not found! Please build the target first.');
  process.exit(1);
}

const files = fs.readdirSync(DOCS_DIR);
files.forEach(file => {
  if (file.endsWith('.json') && !file.endsWith('-canonical.json')) {
    const inputPath = path.join(DOCS_DIR, file);
    const baseName = path.basename(file, '.json');
    const outputPath = path.join(DOCS_DIR, `${baseName}-canonical.json`);
    
    console.log(`Canonicalizing: ${file}...`);
    try {
      // Run the C++ CLI tool and capture stdout directly into buffer
      const stdout = execSync(`"${CLI_PATH}" "${inputPath}"`, { encoding: 'utf8' });
      
      // Write the stdout clean buffer to the canonical file (automatically UTF-8)
      fs.writeFileSync(outputPath, stdout, 'utf8');
      console.log(`[Success] Written: ${baseName}-canonical.json`);
    } catch (err) {
      console.error(`[Error] Failed to canonicalize ${file}:`, err.message);
    }
  }
});
console.log('--- Batch Canonicalization Complete! ---');
