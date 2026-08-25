#!/usr/bin/env node
// Generates blog hero art in the Octavia house style (monochrome glass / volumetric fog / black void).
//
//   EIGHTY_API_KEY=sk-... node scripts/blog/generate-hero-images.mjs [--only=name,name] [--force]
//
// The API key is read from the environment only. Never commit it.

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT_DIR = path.join(ROOT, 'assets', 'blog', 'images');
const API = 'https://api.80ai.net';
const MODEL = 'banana_pro';
const CONCURRENCY = 5;

const API_KEY = process.env.EIGHTY_API_KEY;
if (!API_KEY) {
  console.error('EIGHTY_API_KEY is not set. Export it before running; do not hard-code it.');
  process.exit(1);
}

const args = process.argv.slice(2);
const force = args.includes('--force');
const only = args.find((a) => a.startsWith('--only='))?.split('=')[1]?.split(',').map((s) => s.trim());

// Shared style contract so every hero reads as one set.
const STYLE = 'Cinematic monochrome black-and-white studio photograph. Pure black seamless void background with soft volumetric fog drifting low across a dark polished reflective floor. Extremely high contrast, deep crushed blacks, thin brilliant white glowing light edges, dramatic directional light, minimalist abstract sculptural composition, ultra-wide cinematic framing, subtle mirror reflection on the floor. No text, no letters, no numbers, no people, no faces, no logos, no watermarks.';

const SUBJECTS = {
  'relay-glass-columns': 'A row of tall slender transparent glass columns of staggered heights, each catching a thin glowing rim of light, arranged like a relay passing light down the line.',
  'ledger-glass-monolith': 'A single massive upright glass monolith with fine horizontal etched striations running across its face like ruled ledger lines, lit from one edge.',
  'pitch-light-corridor': 'A converging corridor of angled glass panels narrowing toward a single brilliant point of light at the far end.',
  'broadcast-tower-glass': 'A tall tapering glass lattice tower with concentric rings of light expanding outward from its peak into the fog.',
  'civic-glass-arches': 'A symmetrical colonnade of wide transparent glass arches receding into fog, each arch edge glowing faintly.',
  'horizon-glass-gateway': 'A broad freestanding glass gateway frame opening onto a distant glowing horizon line, fog pouring through the opening.',
  'clinical-glass-lattice': 'A precise orthogonal lattice of thin glass rods forming a clean three-dimensional grid, each intersection catching a pinpoint of light.',
  'studio-glass-console': 'A long low horizontal glass slab like a mixing console surface, its leading edge lit brilliantly, fine vertical glass fins rising from it.',
  'cohort-glass-risers': 'A tiered arrangement of rectangular glass risers ascending in steps, each tread edge glowing.',
  'slate-glass-stack': 'A stack of parallel horizontal glass plates floating in alignment, separated by thin bands of glowing light.',
  'solo-glass-workbench': 'A single isolated glass plane resting on slender supports, one bright light source raking across its surface.',
  'classroom-glass-panes': 'A grid of upright glass panes in even rows, some tilted slightly out of alignment, catching light at different angles.',
  'stadium-light-rings': 'Concentric elliptical rings of light suspended in fog above a dark reflective plane, like a stadium bowl seen abstractly.',
  'chassis-glass-frame': 'A skeletal rectangular glass frame structure with precise internal cross-bracing, lit from below.',
  'platform-glass-conduit': 'A long transparent glass conduit tube running horizontally into the distance, light travelling through its interior.',
  'gallery-glass-plinths': 'A scattered arrangement of glass plinths of varying heights on a reflective floor, each topped with a soft glow.',
  'edition-glass-spreads': 'Multiple thin glass sheets fanned open like the spreads of a book, each leaf edge catching light.',
  'quarterly-glass-columns': 'Four tall glass columns of clearly stepped increasing height standing in a precise row, lit from behind.',
  'lattice-precision-glass': 'An intricate fine-grained glass lattice sphere suspended in fog, its filaments catching light.',
  'policy-glass-folds': 'A large sheet of glass folded into soft accordion pleats standing upright, light raking across the folds.',
  'embedded-glass-module': 'A small dense glass cube nested inside a larger open glass frame, the inner cube glowing brightly.',
  'congregation-light-nave': 'A soaring narrow glass nave of tall pointed arches receding into fog, brilliant light at the far end.',
  'field-glass-pylons': 'A line of heavy industrial glass pylons receding across a dark plane, connected by faint catenary threads of light.',
  'paired-language-panes': 'Two identical upright glass panes standing face to face in perfect symmetry, a bright band of light between them.',
  'archive-glass-vault': 'Deep receding rows of glass shelving units forming a vast vault interior, light falling between the rows.',
};

const targets = Object.entries(SUBJECTS).filter(([name]) => !only || only.includes(name));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(pathName, init = {}) {
  const res = await fetch(`${API}${pathName}`, {
    ...init,
    headers: { 'X-API-Key': API_KEY, 'Content-Type': 'application/json', ...(init.headers || {}) },
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${pathName} -> ${res.status} ${text.slice(0, 200)}`);
  return JSON.parse(text);
}

async function generate(name, subject) {
  const file = path.join(OUT_DIR, `${name}.png`);
  if (!force && fs.existsSync(file)) {
    console.log(`skip   ${name} (exists)`);
    return { name, status: 'skipped' };
  }

  const prompt = `${STYLE} ${subject}`;
  const submitted = await api('/api/tasks/submit', {
    method: 'POST',
    body: JSON.stringify({ model: MODEL, size: '16:9', resolution: '2K', prompt }),
  });
  const taskId = submitted.task_id || submitted.task_ids?.[0];
  if (!taskId) throw new Error(`no task id for ${name}`);
  console.log(`submit ${name} -> ${taskId}`);

  for (let i = 0; i < 90; i += 1) {
    await sleep(5000);
    const task = await api(`/api/tasks/${taskId}`);
    if (task.status === 'processing' || task.status === 'pending' || task.status === 'queued') continue;
    if (task.status !== 'success') throw new Error(`${name}: ${task.status} ${task.error_message || ''}`);

    const url = task.images?.[0]?.image_url;
    if (!url) throw new Error(`${name}: succeeded with no image url`);

    // The API returns PNG or JPEG depending on the run, and the CDN drops connections
    // intermittently — accept either format and retry the transfer.
    let asset = null;
    for (let attempt = 0; attempt < 4 && !asset; attempt += 1) {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`http ${res.status}`);
        const buf = Buffer.from(await res.arrayBuffer());
        const isPng = buf.subarray(1, 4).toString() === 'PNG';
        const isJpg = buf[0] === 0xff && buf[1] === 0xd8;
        if (!isPng && !isJpg) throw new Error('downloaded file is not an image');
        asset = { buf, ext: isPng ? 'png' : 'jpg' };
      } catch (error) {
        if (attempt === 3) throw new Error(`${name}: download failed - ${error.message}`);
        await sleep(2000 * (attempt + 1));
      }
    }

    const outFile = path.join(OUT_DIR, `${name}.${asset.ext}`);
    fs.writeFileSync(outFile, asset.buf);
    console.log(`done   ${name}.${asset.ext} (${(asset.buf.length / 1024 / 1024).toFixed(1)} MB)`);
    return { name, status: 'ok', ext: asset.ext };
  }
  throw new Error(`${name}: timed out waiting for generation`);
}

const queue = [...targets];
const results = [];
const failures = [];

async function worker() {
  while (queue.length) {
    const [name, subject] = queue.shift();
    try {
      results.push(await generate(name, subject));
    } catch (error) {
      console.error(`FAIL   ${name}: ${error.message}`);
      failures.push({ name, error: error.message });
    }
  }
}

await Promise.all(Array.from({ length: Math.min(CONCURRENCY, targets.length) }, worker));

const made = results.filter((r) => r.status === 'ok').length;
console.log(`\n${made} generated, ${results.length - made} skipped, ${failures.length} failed`);
if (failures.length) {
  for (const f of failures) console.log(`  - ${f.name}: ${f.error}`);
  process.exit(1);
}
