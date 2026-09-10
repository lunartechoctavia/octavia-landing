/** Assigns hero images to new articles, preferring the least-reused images already in the repo. */

import fs from 'node:fs';
import path from 'node:path';

const IMAGE_EXT = /\.(png|jpe?g|webp)$/i;

export function buildImagePool(root) {
  const dir = path.join(root, 'assets', 'blog', 'images');
  const available = fs.readdirSync(dir).filter((file) => IMAGE_EXT.test(file));

  const usage = new Map(available.map((file) => [file, 0]));
  const articlesDir = path.join(root, 'content', 'blog', 'articles');
  for (const file of fs.readdirSync(articlesDir).filter((name) => name.endsWith('.md'))) {
    const source = fs.readFileSync(path.join(articlesDir, file), 'utf8');
    const hero = source.match(/"heroImage"\s*:\s*"([^"]+)"/)?.[1];
    if (!hero) continue;
    const base = hero.split('/').pop();
    if (usage.has(base)) usage.set(base, usage.get(base) + 1);
  }

  // Least-used first, then alphabetical, so assignment is deterministic across runs.
  return [...usage.entries()]
    .sort((a, b) => a[1] - b[1] || a[0].localeCompare(b[0]))
    .map(([file]) => `/assets/blog/images/${file}`);
}
