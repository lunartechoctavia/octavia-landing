#!/usr/bin/env node
/**
 * Condense over-length articles into the 2000-3000 word brief.
 *
 * This works one "##" section at a time rather than on the whole article.
 * Whole-article condensing failed badly: holding 3,500 words in mind exhausted
 * the model's reasoning budget, so calls returned empty with
 * finish_reason "length" no matter how large max_tokens grew. Per-section
 * prompts stay small, bound the reasoning, and preserve document structure by
 * construction, because the headings are reassembled here rather than by the
 * model.
 *
 * Usage: node scripts/blog/agent/trim.mjs [--max=3000] [--target=2850] [--concurrency=4]
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import { chat } from './deepseek.mjs';
import { checkBody, words } from './validate.mjs';
import { toAmericanEnglish } from './american.mjs';
import { TOPICS } from './topics.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const ARTICLES_DIR = path.join(ROOT, 'content', 'blog', 'articles');

function readEnvFile(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  }
}
readEnvFile(path.join(ROOT, '.env'));
readEnvFile(path.join(ROOT, 'scripts', 'blog', '.env'));

const argv = process.argv.slice(2);
const flag = (name, fallback) => {
  const hit = argv.find((arg) => arg.startsWith(`--${name}=`));
  return hit ? Number(hit.split('=')[1]) : fallback;
};
const MAX = flag('max', 3000);
const TARGET = flag('target', 2850);
const CONCURRENCY = flag('concurrency', 4);
const MIN_SECTION = 200; // Sections smaller than this are left alone.

const stamp = () => new Date().toISOString().slice(11, 19);
const log = (slug, message) => console.log(`[${stamp()}] ${String(slug).padEnd(44)} ${message}`);

function splitArticle(source) {
  const end = source.indexOf('\n---\n', 4);
  return { front: source.slice(0, end + 5), body: source.slice(end + 5).replace(/^\n+/, '') };
}

/** Splits a body into the intro plus one entry per "##" section. */
function parseSections(body) {
  const lines = body.split('\n');
  const sections = [];
  let current = { heading: null, lines: [] };
  for (const line of lines) {
    if (/^##\s+\S/.test(line) && !/^###/.test(line)) {
      sections.push(current);
      current = { heading: line, lines: [] };
    } else {
      current.lines.push(line);
    }
  }
  sections.push(current);
  return sections.map((section) => ({ ...section, text: section.lines.join('\n'), count: words(section.lines.join('\n')) }));
}

function assemble(sections) {
  return sections
    .map((section) => (section.heading ? `${section.heading}\n${section.text}` : section.text))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function sectionPrompt(section, target) {
  const links = [...section.text.matchAll(/\[[^\]]+\]\(\/[^)\s]+\)/g)].map((match) => match[0]);
  const subheads = [...section.text.matchAll(/^###\s+.*$/gm)].map((match) => match[0]);
  return `Condense this section of an article from ${section.count} words to about ${target} words. Remove roughly ${section.count - target} words.

RULES:
- Do not add new information, new claims, or new subsections.
- Cut sentences that restate the heading, repeat an earlier point, or hedge ("it is worth noting", "generally speaking", "that said", "in other words").
- Merge short consecutive paragraphs about one idea. Cut adverbs and qualifiers that add nothing.
- Where two examples make the same point, keep only the stronger one.
- Keep the writing calm, specific and professional. American English spelling.
${subheads.length ? `- Keep every one of these subheadings, unchanged and in this order:\n${subheads.map((head) => `  ${head}`).join('\n')}` : ''}
${links.length ? `- Keep these Markdown links verbatim, each exactly once:\n${links.map((link) => `  ${link}`).join('\n')}` : ''}
${/^-\s/m.test(section.text) ? '- Keep the bulleted list as a bulleted list.' : ''}

Return ONLY the condensed section text. Do NOT include the "##" heading line. No code fences, no commentary.

--- SECTION ---
${section.text.trim()}`;
}

function clean(text) {
  return toAmericanEnglish(String(text).trim())
    .replace(/^```(?:markdown|md)?\s*\n?/, '')
    .replace(/\n?```\s*$/, '')
    .replace(/^##\s+.*\n+/, '')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

async function trimArticle(topic, file) {
  const source = fs.readFileSync(file, 'utf8');
  const { front, body } = splitArticle(source);
  const original = words(body);
  const sections = parseSections(body);

  // Spread the required cut across the trimmable sections in proportion to size.
  const trimmable = sections.filter((section) => section.count >= MIN_SECTION);
  const trimmableWords = trimmable.reduce((sum, section) => sum + section.count, 0);
  const toRemove = original - TARGET;
  if (toRemove <= 0 || !trimmableWords) return { slug: topic.slug, original, final: original };

  const results = await Promise.all(sections.map(async (section) => {
    if (section.count < MIN_SECTION) return section;
    const share = Math.round((section.count / trimmableWords) * toRemove);
    const target = Math.max(MIN_SECTION, section.count - share);
    if (section.count - target < 30) return section;

    try {
      const response = await chat(
        [
          { role: 'system', content: 'You are a precise copy editor. You condense text without adding to it, and you return only the edited text.' },
          { role: 'user', content: sectionPrompt(section, target) },
        ],
        { maxTokens: 8000, temperature: 0.3 },
      );
      const text = clean(response.content);
      const count = words(text);
      // Reject a section that collapsed or lost its subheadings.
      const keptSubheads = (text.match(/^###\s/gm) || []).length === (section.text.match(/^###\s/gm) || []).length;
      if (count < section.count * 0.5 || !keptSubheads || count >= section.count) return section;
      return { ...section, text, count };
    } catch (error) {
      log(topic.slug, `section "${section.heading || 'intro'}" kept as-is: ${error.message}`);
      return section;
    }
  }));

  const candidate = assemble(results);
  const check = checkBody(candidate, topic);
  if (check.otherIssues > 0 || check.wordCount < 2300 || check.wordCount >= original) {
    log(topic.slug, `rejected (${check.wordCount}w, ${check.otherIssues} structural issue(s)); left at ${original}w`);
    return { slug: topic.slug, original, final: original };
  }

  fs.writeFileSync(file, `${front}\n${candidate}\n`, 'utf8');
  log(topic.slug, `${original}w -> ${check.wordCount}w${check.wordCount > MAX ? ' (still over)' : ''}`);
  return { slug: topic.slug, original, final: check.wordCount };
}

async function pool(items, size, worker) {
  let cursor = 0;
  const results = [];
  await Promise.all(Array.from({ length: Math.max(1, Math.min(size, items.length)) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      // A single failure must never take down the pool.
      try {
        results[index] = await worker(items[index]);
      } catch (error) {
        log(items[index].topic.slug, `FAILED ${error.message}`);
        results[index] = { slug: items[index].topic.slug, original: items[index].count, final: items[index].count };
      }
    }
  }));
  return results;
}

const over = TOPICS
  .map((topic) => ({ topic, file: path.join(ARTICLES_DIR, `${topic.slug}.md`) }))
  .filter(({ file }) => fs.existsSync(file))
  .map((entry) => ({ ...entry, count: words(splitArticle(fs.readFileSync(entry.file, 'utf8')).body) }))
  .filter((entry) => entry.count > MAX)
  .sort((a, b) => b.count - a.count);

console.log(`${over.length} article(s) over ${MAX} words; target ${TARGET}.`);
if (over.length) {
  const results = await pool(over, CONCURRENCY, ({ topic, file }) => trimArticle(topic, file));
  const remaining = results.filter((result) => result.final > MAX);
  console.log(`\nProcessed ${results.length}; ${remaining.length} still over ${MAX}.`);
  for (const result of remaining) console.log(`  ${result.slug}: ${result.final}w`);
}
