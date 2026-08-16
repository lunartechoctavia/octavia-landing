#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const catalog = JSON.parse(fs.readFileSync(path.join(ROOT, 'content', 'blog', 'catalog.json'), 'utf8'));
const errors = [];
const canonicals = new Set();

function words(value) {
  return (value.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu) || []).length;
}

function inspect(relative, minimumBodyWords = 0) {
  const file = path.join(ROOT, relative);
  if (!fs.existsSync(file)) { errors.push(`${relative}: file is missing`); return; }
  const html = fs.readFileSync(file, 'utf8');
  if (!html.includes('OCTAVIA_BLOG_GENERATED')) errors.push(`${relative}: generated marker is missing`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)">/)?.[1];
  if (!canonical) errors.push(`${relative}: canonical URL is missing`);
  else if (canonicals.has(canonical)) errors.push(`${relative}: duplicate canonical ${canonical}`);
  else canonicals.add(canonical);
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(match[1]); } catch (error) { errors.push(`${relative}: invalid JSON-LD (${error.message})`); }
  }
  for (const match of html.matchAll(/<(?:img|script|link)[^>]+(?:src|href)="([^"]*assets\/[^"]+)"/g)) {
    const reference = match[1].split('?')[0];
    const asset = reference.startsWith('/') ? path.join(ROOT, reference.slice(1)) : path.resolve(path.dirname(file), reference);
    if (!fs.existsSync(asset) && !reference.includes('iconify')) errors.push(`${relative}: missing asset ${match[1]}`);
  }
  if (minimumBodyWords) {
    const articleBody = html.match(/<article class="article-body" data-article-body>([\s\S]*?)<\/article>/)?.[1] || '';
    const count = words(articleBody);
    if (count < minimumBodyWords) errors.push(`${relative}: rendered article contains ${count} words`);
  }
}

inspect('blog.html');
inspect('blog/page/2/index.html');
inspect('blog/page/3/index.html');
for (const article of catalog) inspect(`blog/${article.slug}/index.html`, 2000);
for (const slug of new Set(catalog.map((article) => article.categorySlug))) inspect(`blog/category/${slug}/index.html`);

const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
const feed = fs.readFileSync(path.join(ROOT, 'blog', 'feed.xml'), 'utf8');
for (const article of catalog) {
  if (!sitemap.includes(`/blog/${article.slug}`)) errors.push(`sitemap.xml: missing ${article.slug}`);
  if (!feed.includes(`/blog/${article.slug}`)) errors.push(`blog/feed.xml: missing ${article.slug}`);
}

if (errors.length) {
  console.error(`Blog verification failed:\n- ${errors.join('\n- ')}`);
  process.exitCode = 1;
} else {
  console.log(`Verified ${catalog.length} article pages, 3 index pages, ${new Set(catalog.map((article) => article.categorySlug)).size} category pages, structured data, assets, RSS, and sitemap.`);
}
