#!/usr/bin/env node
// Recovers already-generated hero art whose download failed or whose poll timed out,
// without re-spending credits. Walks the credit ledger for recent generation tasks, matches
// each task's prompt back to a missing hero, and downloads using the asset's real format
// (the API returns PNG or JPEG per run).
//
//   EIGHTY_API_KEY=sk-... node scripts/blog/recover-hero-images.mjs

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const OUT_DIR = path.join(ROOT, 'assets', 'blog', 'images');
const API = 'https://api.80ai.net';
const API_KEY = process.env.EIGHTY_API_KEY;
if (!API_KEY) { console.error('EIGHTY_API_KEY is not set.'); process.exit(1); }

// Derive name -> subject-prompt pairs from the generator so the two stay in sync.
// Each task prompt is the shared STYLE string followed by the subject, so the subject
// text is a reliable fingerprint for matching a ledger task back to its hero name.
const generatorSource = fs.readFileSync(path.join(HERE, 'generate-hero-images.mjs'), 'utf8');
const subjectsBlock = generatorSource.match(/const SUBJECTS = \{([\s\S]*?)\n\};/);
if (!subjectsBlock) { console.error('Could not read SUBJECTS from generate-hero-images.mjs'); process.exit(1); }

const FINGERPRINTS = [];
for (const line of subjectsBlock[1].split('\n')) {
  const entry = line.match(/^\s*'([a-z0-9-]+)':\s*'(.+)',\s*$/);
  if (entry) FINGERPRINTS.push({ name: entry[1], subject: entry[2].replace(/\\'/g, "'") });
}
console.log(`tracking ${FINGERPRINTS.length} heroes`);

async function api(p) {
  const res = await fetch(`${API}${p}`, { headers: { 'X-API-Key': API_KEY } });
  if (!res.ok) throw new Error(`${p} -> ${res.status}`);
  return res.json();
}

const have = (name) => ['png', 'jpg'].some((ext) => fs.existsSync(path.join(OUT_DIR, `${name}.${ext}`)));
const missing = new Set(FINGERPRINTS.filter((f) => !have(f.name)).map((f) => f.name));
if (!missing.size) { console.log('nothing missing'); process.exit(0); }
console.log(`missing: ${[...missing].join(', ')}`);

// Collect candidate task ids from the credit ledger (each generation logs a consume entry).
const taskIds = [];
for (let page = 1; page <= 8; page += 1) {
  const log = await api(`/api/credits/logs?page=${page}&page_size=50`);
  if (!log.items?.length) break;
  for (const item of log.items) if (item.task_id) taskIds.push(item.task_id);
}
console.log(`scanning ${taskIds.length} recent tasks`);

const recovered = [];
for (const id of taskIds) {
  if (!missing.size) break;
  let task;
  try { task = await api(`/api/tasks/${id}`); } catch { continue; }
  if (task.status !== 'success') continue;

  const hit = FINGERPRINTS.find((f) => (task.prompt || '').includes(f.subject));
  if (!hit || !missing.has(hit.name)) continue;

  const url = task.images?.[0]?.image_url;
  if (!url) continue;

  // The CDN intermittently drops connections; retry before giving up on this task.
  let asset = null;
  for (let attempt = 0; attempt < 4 && !asset; attempt += 1) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`http ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      const isPng = buf.subarray(1, 4).toString() === 'PNG';
      const isJpg = buf[0] === 0xff && buf[1] === 0xd8;
      if (!isPng && !isJpg) throw new Error('not an image');
      asset = { buf, ext: isPng ? 'png' : 'jpg' };
    } catch (error) {
      if (attempt === 3) console.error(`  retries exhausted for ${hit.name}: ${error.message}`);
      else await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
    }
  }
  if (!asset) continue;

  fs.writeFileSync(path.join(OUT_DIR, `${hit.name}.${asset.ext}`), asset.buf);
  missing.delete(hit.name);
  recovered.push({ name: hit.name, ext: asset.ext });
  console.log(`recovered ${hit.name}.${asset.ext} (${(asset.buf.length / 1024 / 1024).toFixed(1)} MB)`);
}

console.log(`\nrecovered ${recovered.length}`);
const jpgs = recovered.filter((r) => r.ext === 'jpg').map((r) => r.name);
if (jpgs.length) console.log(`JPEG (frontmatter must use .jpg): ${jpgs.join(', ')}`);
if (missing.size) console.log(`still missing: ${[...missing].join(', ')}`);
