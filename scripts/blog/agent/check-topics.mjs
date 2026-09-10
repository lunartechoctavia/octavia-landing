#!/usr/bin/env node
/**
 * Verifies the topic list before a run spends any tokens.
 *
 * The build validator rejects the whole collection if any slug, title or
 * primaryKeyword repeats, so collisions have to be caught here rather than
 * after fifty articles have been generated.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { TOPICS } from './topics.mjs';
import { buildImagePool } from './images.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const ARTICLES_DIR = path.join(ROOT, 'content', 'blog', 'articles');

const CATEGORIES = new Set([
  'Translation Guides', 'AI Dubbing', 'Creator Growth', 'Enterprise',
  'Localization', 'Voice AI', 'Technical Guides', 'Accessibility', 'Developer Guides',
]);

const existing = { slug: new Set(), title: new Set(), primaryKeyword: new Set() };
for (const file of fs.readdirSync(ARTICLES_DIR).filter((name) => name.endsWith('.md'))) {
  const source = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf8');
  const front = source.split('\n---')[0].replace(/^---\n/, '');
  let data;
  try {
    data = JSON.parse(front);
  } catch {
    console.error(`Could not parse frontmatter in ${file}`);
    continue;
  }
  for (const field of Object.keys(existing)) {
    if (data[field]) existing[field].add(String(data[field]).toLowerCase());
  }
}

const errors = [];
const seen = { slug: new Set(), title: new Set(), primaryKeyword: new Set() };

for (const topic of TOPICS) {
  for (const field of Object.keys(seen)) {
    const value = String(topic[field] || '').toLowerCase();
    if (!value) errors.push(`${topic.slug}: missing ${field}`);
    else if (existing[field].has(value)) errors.push(`${topic.slug}: ${field} "${topic[field]}" already exists in the collection`);
    else if (seen[field].has(value)) errors.push(`${topic.slug}: duplicate ${field} within the topic list`);
    seen[field].add(value);
  }
  if (!/^[a-z0-9-]+$/.test(topic.slug)) errors.push(`${topic.slug}: slug must be lowercase kebab-case`);
  if (!CATEGORIES.has(topic.category)) errors.push(`${topic.slug}: unknown category "${topic.category}"`);
  if (!topic.angle || !topic.audience) errors.push(`${topic.slug}: missing angle or audience`);
  if (!Array.isArray(topic.mustCover) || topic.mustCover.length < 6) errors.push(`${topic.slug}: mustCover needs at least six points`);
  if (Number.isNaN(Date.parse(topic.publishedAt))) errors.push(`${topic.slug}: invalid publishedAt`);
  if (Date.parse(topic.publishedAt) > Date.now()) errors.push(`${topic.slug}: publishedAt is in the future`);
}

const pool = buildImagePool(ROOT);
if (pool.length < TOPICS.length) {
  console.log(`Note: ${pool.length} images for ${TOPICS.length} topics; images will be reused.`);
}
for (const [index, topic] of TOPICS.entries()) {
  const hero = topic.heroImage || pool[index % pool.length];
  if (!fs.existsSync(path.join(ROOT, hero.replace(/^\//, '')))) errors.push(`${topic.slug}: hero image ${hero} does not exist`);
}

const byCategory = TOPICS.reduce((acc, topic) => ({ ...acc, [topic.category]: (acc[topic.category] || 0) + 1 }), {});

if (errors.length) {
  console.error(`${errors.length} problem(s):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(`${TOPICS.length} topics OK. No collisions with ${existing.slug.size} existing articles.`);
console.log('Categories:', byCategory);
console.log(`Publish window: ${TOPICS[0].publishedAt} -> ${TOPICS.at(-1).publishedAt}`);
console.log(`Hero images assigned from a pool of ${pool.length}; least-used first.`);
