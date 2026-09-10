#!/usr/bin/env node
/**
 * Octavia blog agent.
 *
 * Generates full-length articles with DeepSeek and writes them into
 * content/blog/articles/ in the exact shape scripts/blog/build.mjs expects.
 *
 * Per topic the agent runs: draft -> validate -> repair (up to N rounds) ->
 * metadata -> validate -> write. Nothing is written until the article clears
 * the same checks the build validator applies, so a run either produces a
 * publishable file or fails that topic and leaves the collection untouched.
 *
 * Usage:
 *   DEEPSEEK_API_KEY=... node scripts/blog/agent/run.mjs [options]
 *
 *   --limit=N          only process the first N pending topics
 *   --only=slug,slug   only process these slugs
 *   --concurrency=N    parallel topics (default 4)
 *   --repairs=N        repair rounds per article (default 3)
 *   --force            regenerate topics whose file already exists
 *   --dry-run          run the pipeline but do not write article files
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import { chat, modelName } from './deepseek.mjs';
import { SYSTEM_PROMPT, draftPrompt, expandPrompt, metaPrompt } from './prompts.mjs';
import { checkBody, checkMeta, score } from './validate.mjs';
import { buildImagePool } from './images.mjs';
import { toAmericanEnglish } from './american.mjs';
import { TOPICS } from './topics.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const ARTICLES_DIR = path.join(ROOT, 'content', 'blog', 'articles');
const LOG_DIR = path.join(ROOT, 'scripts', 'blog', 'agent', 'logs');

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
  return hit ? hit.split('=').slice(1).join('=') : fallback;
};
const has = (name) => argv.includes(`--${name}`);

const LIMIT = Number(flag('limit', 0)) || Infinity;
const ONLY_RAW = flag('only', '');
const ONLY = ONLY_RAW ? new Set(ONLY_RAW.split(',').map((value) => value.trim())) : null;
const CONCURRENCY = Number(flag('concurrency', 4));
const MAX_REPAIRS = Number(flag('repairs', 3));
const FORCE = has('force');
const DRY_RUN = has('dry-run');

const stamp = () => new Date().toISOString().slice(11, 19);
const log = (slug, message) => console.log(`[${stamp()}] ${String(slug).padEnd(44)} ${message}`);

const FENCE = '`'.repeat(3);
const FENCED_BODY = new RegExp(`^${FENCE}(?:markdown|md)?\\s*\\n([\\s\\S]*?)\\n${FENCE}\\s*$`);
const FENCED_JSON = new RegExp(`${FENCE}(?:json)?\\s*\\n([\\s\\S]*?)\\n${FENCE}`);

/** Strips code fences, a stray title heading, model preamble, and curly quotes. */
export function cleanBody(raw) {
  let body = String(raw).trim();
  const fenced = body.match(FENCED_BODY);
  if (fenced) body = fenced[1].trim();
  body = body.replace(/^#\s+[^\n]*\n+/, '');
  body = body.replace(/^(?:here(?:'s| is)[^\n]*|sure[^\n]*|certainly[^\n]*)\n+/i, '');
  return toAmericanEnglish(body)
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function parseJsonObject(raw) {
  let text = String(raw).trim();
  const fenced = text.match(FENCED_JSON);
  if (fenced) text = fenced[1];
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('no JSON object in response');
  return JSON.parse(text.slice(start, end + 1));
}

function frontmatter(topic, meta) {
  return {
    title: topic.title,
    slug: topic.slug,
    category: topic.category,
    primaryKeyword: topic.primaryKeyword,
    metaDescription: meta.metaDescription,
    excerpt: meta.excerpt,
    publishedAt: topic.publishedAt,
    updatedAt: topic.publishedAt,
    heroImage: topic.heroImage,
    heroImageAlt: meta.heroImageAlt || topic.title,
    featured: false,
    author: 'Octavia Editorial Team',
  };
}

async function generateMeta(topic, body, track) {
  let lastIssues = [];
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const response = track(await chat(
      [
        { role: 'system', content: 'You write precise SEO metadata as strict JSON. You return only a JSON object.' },
        { role: 'user', content: metaPrompt(topic, body) },
      ],
      { maxTokens: 4000, temperature: 0.4 },
    ));

    let meta;
    try {
      const parsed = parseJsonObject(response.content);
      meta = Object.fromEntries(Object.entries(parsed).map(([key, value]) => [
        key,
        typeof value === 'string' ? toAmericanEnglish(value).replace(/[‘’]/g, "'").replace(/[“”]/g, '"').trim() : value,
      ]));
    } catch (error) {
      lastIssues = [`unparseable JSON: ${error.message}`];
      continue;
    }

    const issues = checkMeta(meta);
    if (!issues.length) return meta;
    lastIssues = issues;

    // Rather than fail a finished article, trim an over-long description on the last try.
    if (attempt === 3 && typeof meta.metaDescription === 'string') {
      meta.metaDescription = `${meta.metaDescription.slice(0, 156).replace(/[\s,;:-]+\S*$/, '')}.`;
      if (!checkMeta(meta).length) return meta;
    }
    log(topic.slug, `meta retry ${attempt}: ${issues.join(' ')}`);
  }
  throw new Error(`could not produce valid metadata (${lastIssues.join(' ')})`);
}

async function generateArticle(topic) {
  const started = Date.now();
  const usage = { prompt: 0, completion: 0, calls: 0 };
  const track = (response) => {
    usage.prompt += response.usage?.prompt_tokens || 0;
    usage.completion += response.usage?.completion_tokens || 0;
    usage.calls += 1;
    return response;
  };

  log(topic.slug, 'drafting');
  const draft = track(await chat(
    [{ role: 'system', content: SYSTEM_PROMPT }, { role: 'user', content: draftPrompt(topic) }],
    {
      maxTokens: 20_000,
      temperature: 0.75,
      onRetry: ({ attempt, error }) => log(topic.slug, `draft retry ${attempt}: ${error.message}`),
    },
  ));

  let body = cleanBody(draft.content);
  let check = checkBody(body, topic);
  log(topic.slug, `draft ${check.wordCount}w, ${check.issues.length} issue(s)`);

  for (let round = 1; round <= MAX_REPAIRS && check.issues.length; round += 1) {
    if (check.fatal.length) throw new Error(check.fatal.join('; '));
    log(topic.slug, `repair ${round}: ${check.issues[0]}`);

    const repaired = track(await chat(
      [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: draftPrompt(topic) },
        { role: 'assistant', content: body },
        { role: 'user', content: expandPrompt(topic, body, check.wordCount, check.issues) },
      ],
      {
        maxTokens: 24_000,
        temperature: 0.6,
        onRetry: ({ attempt, error }) => log(topic.slug, `repair retry ${attempt}: ${error.message}`),
      },
    ));

    const candidate = cleanBody(repaired.content);
    const candidateCheck = checkBody(candidate, topic);
    // Never accept a revision that scores worse than what we already have.
    if (score(candidateCheck) < score(check)) {
      body = candidate;
      check = candidateCheck;
    }
    log(topic.slug, `after repair ${round}: ${check.wordCount}w, ${check.issues.length} issue(s)`);
  }

  if (check.wordCount < 2000) throw new Error(`body is ${check.wordCount} words; the build requires 2000`);
  if (check.issues.length) log(topic.slug, `WARN accepted with: ${check.issues.join(' | ')}`);

  const meta = await generateMeta(topic, body, track);
  const file = `---\n${JSON.stringify(frontmatter(topic, meta), null, 2)}\n---\n\n${body}\n`;
  if (!DRY_RUN) fs.writeFileSync(path.join(ARTICLES_DIR, `${topic.slug}.md`), file, 'utf8');

  const seconds = Math.round((Date.now() - started) / 1000);
  log(topic.slug, `DONE ${check.wordCount}w in ${seconds}s (${usage.calls} calls, ${usage.completion} completion tokens)`);
  return { slug: topic.slug, wordCount: check.wordCount, seconds, usage, residualIssues: check.issues };
}

async function pool(items, size, worker) {
  const results = [];
  let cursor = 0;
  const runners = Array.from({ length: Math.max(1, Math.min(size, items.length)) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await worker(items[index]);
    }
  });
  await Promise.all(runners);
  return results;
}

async function main() {
  if (!process.env.DEEPSEEK_API_KEY) {
    console.error('DEEPSEEK_API_KEY is not set. Put it in scripts/blog/.env or export it.');
    process.exit(1);
  }

  const imagePool = buildImagePool(ROOT);
  const topics = TOPICS.map((topic, index) => ({
    ...topic,
    heroImage: topic.heroImage || imagePool[index % imagePool.length],
  }));

  let pending = topics
    .filter((topic) => (ONLY ? ONLY.has(topic.slug) : true))
    .filter((topic) => FORCE || !fs.existsSync(path.join(ARTICLES_DIR, `${topic.slug}.md`)));
  if (LIMIT !== Infinity) pending = pending.slice(0, LIMIT);

  console.log(`Octavia blog agent | model=${modelName} | ${pending.length} topic(s) | concurrency=${CONCURRENCY}${DRY_RUN ? ' | DRY RUN' : ''}`);
  if (!pending.length) {
    console.log('Nothing to do.');
    return;
  }

  const outcomes = await pool(pending, CONCURRENCY, async (topic) => {
    try {
      return { ok: true, ...(await generateArticle(topic)) };
    } catch (error) {
      log(topic.slug, `FAILED ${error.message}`);
      return { ok: false, slug: topic.slug, error: error.message };
    }
  });

  const ok = outcomes.filter((outcome) => outcome.ok);
  const failed = outcomes.filter((outcome) => !outcome.ok);

  console.log(`\n${ok.length} written, ${failed.length} failed.`);
  if (ok.length) {
    const counts = ok.map((outcome) => outcome.wordCount);
    const mean = Math.round(counts.reduce((a, b) => a + b, 0) / counts.length);
    console.log(`Words: min ${Math.min(...counts)}, max ${Math.max(...counts)}, mean ${mean}`);
    console.log(`Tokens: ${ok.reduce((sum, o) => sum + o.usage.prompt, 0)} prompt, ${ok.reduce((sum, o) => sum + o.usage.completion, 0)} completion`);
  }
  for (const failure of failed) console.log(`  FAILED ${failure.slug}: ${failure.error}`);

  fs.mkdirSync(LOG_DIR, { recursive: true });
  const logFile = path.join(LOG_DIR, `run-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
  fs.writeFileSync(logFile, JSON.stringify({ model: modelName, at: new Date().toISOString(), outcomes }, null, 2));
  console.log(`Report: ${path.relative(ROOT, logFile)}`);

  if (failed.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
