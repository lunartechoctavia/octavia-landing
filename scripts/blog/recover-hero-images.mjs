#!/usr/bin/env node
// Recovers already-generated hero art whose download failed, without re-spending credits.
// Walks the credit ledger for recent generation tasks, matches each task's prompt back to a
// missing hero name, and downloads the asset using its real format (the API returns PNG or JPEG).
//
//   EIGHTY_API_KEY=sk-... node scripts/blog/recover-hero-images.mjs

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT_DIR = path.join(ROOT, 'assets', 'blog', 'images');
const API = 'https://api.80ai.net';
const API_KEY = process.env.EIGHTY_API_KEY;
if (!API_KEY) { console.error('EIGHTY_API_KEY is not set.'); process.exit(1); }

// Distinctive phrase from each subject prompt -> hero name. Used to map a task back to its file.
const FINGERPRINTS = {
  'staggered heights': 'relay-glass-columns',
  'ruled ledger lines': 'ledger-glass-monolith',
  'narrowing toward a single brilliant point': 'pitch-light-corridor',
  'tapering glass lattice tower': 'broadcast-tower-glass',
  'colonnade of wide transparent glass arches': 'civic-glass-arches',
  'freestanding glass gateway frame': 'horizon-glass-gateway',
  'orthogonal lattice of thin glass rods': 'clinical-glass-lattice',
  'mixing console surface': 'studio-glass-console',
  'tiered arrangement of rectangular glass risers': 'cohort-glass-risers',
  'parallel horizontal glass plates': 'slate-glass-stack',
  'single isolated glass plane resting on slender supports': 'solo-glass-workbench',
  'grid of upright glass panes in even rows': 'classroom-glass-panes',
  'elliptical rings of light': 'stadium-light-rings',
  'skeletal rectangular glass frame': 'chassis-glass-frame',
  'transparent glass conduit tube': 'platform-glass-conduit',
  'glass plinths of varying heights': 'gallery-glass-plinths',
  'fanned open like the spreads of a book': 'edition-glass-spreads',
  'stepped increasing height': 'quarterly-glass-columns',
  'glass lattice sphere': 'lattice-precision-glass',
  'accordion pleats': 'policy-glass-folds',
  'nested inside a larger open glass frame': 'embedded-glass-module',
  'glass nave': 'congregation-light-nave',
  'industrial glass pylons': 'field-glass-pylons',
  'face to face in perfect symmetry': 'paired-language-panes',
  'glass shelving units': 'archive-glass-vault',
};

async function api(p) {
  const res = await fetch(`${API}${p}`, { headers: { 'X-API-Key': API_KEY } });
  if (!res.ok) throw new Error(`${p} -> ${res.status}`);
  return res.json();
}

function alreadyHave(name) {
  return ['png', 'jpg'].some((ext) => fs.existsSync(path.join(OUT_DIR, `${name}.${ext}`)));
}

// Collect candidate task ids from the credit ledger (each generation logs a consume entry).
const taskIds = [];
for (let page = 1; page <= 6; page += 1) {
  const log = await api(`/api/credits/logs?page=${page}&page_size=50`);
  for (const item of log.items || []) if (item.task_id) taskIds.push(item.task_id);
  if (!log.items?.length) break;
}
console.log(`scanning ${taskIds.length} recent tasks`);

const recovered = [];
const stillMissing = new Set(Object.values(FINGERPRINTS).filter((n) => !alreadyHave(n)));

for (const id of taskIds) {
  if (!stillMissing.size) break;
  let task;
  try { task = await api(`/api/tasks/${id}`); } catch { continue; }
  if (task.status !== 'success') continue;

  const hit = Object.entries(FINGERPRINTS).find(([phrase]) => (task.prompt || '').includes(phrase));
  if (!hit) continue;
  const name = hit[1];
  if (!stillMissing.has(name)) continue;

  const image = task.images?.[0];
  if (!image?.image_url) continue;

  // Retry the download; the CDN intermittently drops connections.
  let bytes = null;
  for (let attempt = 0; attempt < 4 && !bytes; attempt += 1) {
    try {
      const res = await fetch(image.image_url);
      if (!res.ok) throw new Error(`http ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      const isPng = buf.subarray(1, 4).toString() === 'PNG';
      const isJpg = buf[0] === 0xff && buf[1] === 0xd8;
      if (!isPng && !isJpg) throw new Error('not an image');
      bytes = { buf, ext: isPng ? 'png' : 'jpg' };
    } catch (error) {
      if (attempt === 3) console.error(`  retry exhausted for ${name}: ${error.message}`);
      else await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
    }
  }
  if (!bytes) continue;

  const file = path.join(OUT_DIR, `${name}.${bytes.ext}`);
  fs.writeFileSync(file, bytes.buf);
  stillMissing.delete(name);
  recovered.push({ name, ext: bytes.ext });
  console.log(`recovered ${name}.${bytes.ext} (${(bytes.buf.length / 1024 / 1024).toFixed(1)} MB)`);
}

console.log(`\nrecovered ${recovered.length}`);
const jpgs = recovered.filter((r) => r.ext === 'jpg').map((r) => r.name);
if (jpgs.length) console.log(`JPEG (frontmatter must use .jpg): ${jpgs.join(', ')}`);
if (stillMissing.size) console.log(`still missing: ${[...stillMissing].join(', ')}`);
