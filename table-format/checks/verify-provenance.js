#!/usr/bin/env node
// Are the schemas in this repository the ones we say they are?
//
// There are two different questions here and the first version of this script
// only asked the second one, which is why it could never pass.
//
//   1. Has anything changed our copies since the numbers were measured?
//      This is the integrity claim that actually matters, it needs no network,
//      and it is what runs by default.
//
//   2. Do our copies still match what those URLs serve today?
//      Interesting, but not something we control. GitHub's workflow schema and
//      the Compose spec are living documents on a moving branch; they changed
//      after we pinned them. That is upstream moving, not us drifting, and
//      reporting it as a failure made a passing repository look broken.
//
// So the checksums below are the record, `--online` asks the second question,
// and a difference there is reported as news rather than as an error.
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const sha = b => crypto.createHash('sha256').update(b).digest('hex');

// file -> where it came from, and what it hashed to when it was pinned.
const PINNED = require('../samples/PINNED.json');

const online = process.argv.includes('--online');
let changed = 0, moved = 0, missing = 0;

console.log(online
  ? 'Checking the pinned copies, then asking each source what it serves today.'
  : 'Checking that the pinned copies are unchanged. Add --online to also ask\neach source what it serves today.');
console.log();

for (const [rel, entry] of Object.entries(PINNED)) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) {
    console.log(`GONE     ${rel}`);
    missing++;
    continue;
  }
  const local = fs.readFileSync(file);
  const local_sha = sha(local);
  const ok = local_sha === entry.sha256;
  if (!ok) changed++;

  let note = '';
  if (online) {
    try {
      const fetched = execFileSync('curl', ['-sS', '-m', '60', '-L', entry.url], { maxBuffer: 64 * 1024 * 1024 });
      if (sha(fetched) !== entry.sha256) { note = '   upstream has moved on since we pinned it'; moved++; }
      else note = '   still matches upstream';
    } catch { note = '   could not reach the source'; }
  }

  console.log(`${ok ? 'ok  ' : 'DIFF'}     ${rel.padEnd(42)} ${String(local.length).padStart(8)} bytes${note}`);
}

console.log();
if (changed || missing) {
  console.log(`${changed} file(s) differ from what was pinned, ${missing} missing.`);
  console.log('The numbers in reports/ were measured against the pinned copies, so they');
  console.log('no longer describe what is here.');
  process.exit(1);
}
console.log(`All ${Object.keys(PINNED).length} schemas match what was pinned.`);
if (online && moved) {
  console.log(`${moved} of them have since changed at their source. That is upstream moving,`);
  console.log('not this repository drifting. Our copies are the ones every number was');
  console.log('measured against, and they are intact.');
}
