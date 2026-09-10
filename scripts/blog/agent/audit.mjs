#!/usr/bin/env node
/**
 * Batch-level audit for agent-generated articles.
 *
 * The build validator checks each article in isolation. It cannot see the
 * failure mode that matters when one model writes fifty posts at once: every
 * article being structurally identical, opening the same way, or reusing the
 * same sentences. This checks the batch as a batch.
 *
 * Usage: node scripts/blog/agent/audit.mjs [--all]
 *   default: audits only the slugs in topics.mjs
 *   --all:   audits every article in the collection
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { TOPICS } from './topics.mjs';
import { words } from './validate.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const ARTICLES_DIR = path.join(ROOT, 'content', 'blog', 'articles');
const AUDIT_ALL = process.argv.includes('--all');

function load(slug) {
  const file = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const source = fs.readFileSync(file, 'utf8');
  const split = source.indexOf('\n---\n', 4);
  const front = JSON.parse(source.slice(4, split));
  return { ...front, body: source.slice(split + 5).trim() };
}

const slugs = AUDIT_ALL
  ? fs.readdirSync(ARTICLES_DIR).filter((name) => name.endsWith('.md')).map((name) => name.replace(/\.md$/, ''))
  : TOPICS.map((topic) => topic.slug);

const articles = slugs.map(load).filter(Boolean);
console.log(`Auditing ${articles.length} article(s).\n`);

const warnings = [];

// --- Length distribution ----------------------------------------------------
const counts = articles.map((article) => words(article.body)).sort((a, b) => a - b);
const mean = Math.round(counts.reduce((a, b) => a + b, 0) / counts.length);
console.log(`Words   min ${counts[0]}  median ${counts[Math.floor(counts.length / 2)]}  mean ${mean}  max ${counts.at(-1)}`);
const short = articles.filter((article) => words(article.body) < 2000);
for (const article of short) warnings.push(`${article.slug}: ${words(article.body)} words, under the build minimum of 2000`);

// --- Repeated sentences across articles -------------------------------------
// A sentence appearing verbatim in several articles is the clearest signal that
// the model fell back on a template rather than writing about the topic.
const sentenceOwners = new Map();
for (const article of articles) {
  const sentences = new Set(
    article.body
      .replace(/^#{2,4}\s.*$/gm, ' ')
      .split(/(?<=[.?!])\s+/)
      .map((sentence) => sentence.replace(/\s+/g, ' ').trim())
      .filter((sentence) => words(sentence) >= 9),
  );
  for (const sentence of sentences) {
    if (!sentenceOwners.has(sentence)) sentenceOwners.set(sentence, []);
    sentenceOwners.get(sentence).push(article.slug);
  }
}
const repeated = [...sentenceOwners.entries()].filter(([, owners]) => owners.length > 1).sort((a, b) => b[1].length - a[1].length);
console.log(`Repeated sentences (9+ words, in 2+ articles): ${repeated.length}`);
for (const [sentence, owners] of repeated.slice(0, 10)) {
  warnings.push(`repeated in ${owners.length} articles (${owners.slice(0, 3).join(', ')}...): "${sentence.slice(0, 90)}..."`);
}

// --- Opening-line similarity ------------------------------------------------
const openings = new Map();
for (const article of articles) {
  const first = article.body.split('\n')[0].split(/(?<=[.?!])\s+/)[0].toLowerCase().replace(/[^a-z ]/g, '').split(' ').slice(0, 6).join(' ');
  if (!openings.has(first)) openings.set(first, []);
  openings.get(first).push(article.slug);
}
for (const [opening, owners] of openings) {
  if (owners.length > 1) warnings.push(`${owners.length} articles open with "${opening}...": ${owners.join(', ')}`);
}

// --- Structural uniformity --------------------------------------------------
const shapes = new Map();
for (const article of articles) {
  const shape = `${(article.body.match(/^##\s/gm) || []).length}h2/${(article.body.match(/^###\s/gm) || []).length}h3`;
  shapes.set(shape, (shapes.get(shape) || 0) + 1);
}
const dominant = [...shapes.entries()].sort((a, b) => b[1] - a[1])[0];
console.log(`Section shapes: ${shapes.size} distinct; most common ${dominant[0]} in ${dominant[1]} article(s)`);
if (dominant[1] > articles.length * 0.5) {
  warnings.push(`${dominant[1]} of ${articles.length} articles share the identical section shape ${dominant[0]}`);
}

// --- Internal link distribution ---------------------------------------------
const linkUse = new Map();
for (const article of articles) {
  for (const match of article.body.matchAll(/\]\((\/[^)\s]+)\)/g)) {
    linkUse.set(match[1], (linkUse.get(match[1]) || 0) + 1);
  }
  const linkCount = [...article.body.matchAll(/\]\((\/[^)\s]+)\)/g)].length;
  if (linkCount < 4) warnings.push(`${article.slug}: only ${linkCount} internal links`);
}
console.log('Link usage:', Object.fromEntries([...linkUse.entries()].sort((a, b) => b[1] - a[1])));

// --- Hero image reuse -------------------------------------------------------
const heroUse = new Map();
for (const article of articles) heroUse.set(article.heroImage, (heroUse.get(article.heroImage) || 0) + 1);
const dupHeroes = [...heroUse.entries()].filter(([, count]) => count > 1);
for (const [hero, count] of dupHeroes) warnings.push(`hero image ${hero} used by ${count} articles in this batch`);

// --- Frontmatter ------------------------------------------------------------
for (const article of articles) {
  if (!article.metaDescription || article.metaDescription.length > 160) {
    warnings.push(`${article.slug}: metaDescription is ${article.metaDescription?.length ?? 0} characters`);
  }
  const hero = path.join(ROOT, String(article.heroImage || '').replace(/^\//, ''));
  if (!article.heroImage || !fs.existsSync(hero)) warnings.push(`${article.slug}: hero image missing on disk`);
}

console.log(`\n${warnings.length} warning(s):`);
for (const warning of warnings) console.log(`  - ${warning}`);
if (!warnings.length) console.log('  none');
