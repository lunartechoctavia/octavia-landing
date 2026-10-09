#!/usr/bin/env node
// Wires the Daylight theme into every hand-authored page: the pre-paint script,
// the theme stylesheet, the navbar toggle, the switch script, and a data-page id
// that page-specific light rules are scoped to. Idempotent: every block sits
// between markers and is replaced in place on a re-run.
//
// Generated pages inherit the wiring from their shells, so rebuild them after
// running this:
//   blog pages      <- blog.html                      node scripts/blog/build.mjs --source=local
//   audience pages  <- features/video-translation.html node scripts/build-audience-pages.mjs
//
// usage: node scripts/apply-theme.mjs [--check]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const THEME_VERSION = '20261009-soft3';
const CHECK = process.argv.includes('--check');

// page -> data-page id. Pages built from the same template share an id.
const PAGES = {
  'index.html': 'home',
  'features.html': 'features',
  'pricing.html': 'pricing',
  'team.html': 'team',
  'inspiration.html': 'inspiration',
  'solutions.html': 'solutions',
  'translations.html': 'translations',
  'docs.html': 'docs',
  'faq.html': 'faq',
  'contact.html': 'contact',
  'privacy.html': 'legal',
  'terms.html': 'legal',
  'blog.html': 'blog-list',
};
for (const f of fs.readdirSync(path.join(ROOT, 'features')).filter((f) => f.endsWith('.html'))) {
  PAGES[`features/${f}`] = 'feature-detail';
}

const PREPAINT = [
  '<script>',
  '  /* Apply the saved theme before first paint. Default stays dark. */',
  '  (function () {',
  '    try {',
  "      var t = localStorage.getItem('octavia-theme');",
  "      if (t === 'light' || t === 'dark') {",
  "        document.documentElement.setAttribute('data-theme', t);",
  "        if (t === 'light') document.documentElement.style.backgroundColor = '#ffffff';",
  '      }',
  '    } catch (e) {}',
  '  })();',
  '</script>',
];

const TOGGLE = [
  '<button id="theme-toggle" class="theme-toggle" type="button" aria-label="Switch colour theme"',
  '  title="Switch colour theme" aria-pressed="false">',
  '  <iconify-icon class="ti-sun" icon="lucide:sun" width="15" aria-hidden="true"></iconify-icon>',
  '  <iconify-icon class="ti-moon" icon="lucide:moon" width="15" aria-hidden="true"></iconify-icon>',
  '</button>',
];

// The switch itself (the wave transition, the fallbacks) lives in
// assets/octavia-theme.js so it can change without re-wiring every page; only
// the pre-paint step has to be inline.
const switchScript = (prefix) => [
  `<script src="${prefix}assets/octavia-theme.js?v=${THEME_VERSION}" defer></script>`,
];

// Unmarked wiring from before this tool existed (index.html only).
const LEGACY = [
  /[ \t]*<script>\s*\/\* Apply the saved theme before first paint\. Default stays dark\. \*\/[\s\S]*?<\/script>\r?\n/,
  /[ \t]*<link rel="stylesheet" href="[^"]*octavia-theme\.css[^"]*">\r?\n/,
  /[ \t]*<button id="theme-toggle"[\s\S]*?<\/button>\r?\n/,
  /[ \t]*<script>\s*\/\* Theme switch\.[\s\S]*?<\/script>\r?\n/,
];

const marker = (name) => [`<!-- theme:${name} -->`, `<!-- /theme:${name} -->`];
const block = (name, lines, indent, eol) => {
  const [open, close] = marker(name);
  return [open, ...lines, close].map((l) => (l ? indent + l : '')).join(eol) + eol;
};
const blockRe = (name) => {
  const [open, close] = marker(name);
  return new RegExp(`[ \\t]*${open}[\\s\\S]*?${close}[ \\t]*\\r?\\n`, 'g');
};

// Insert `text` at the start of the line holding `anchor` (before) or after it.
function insertAtLine(html, anchor, text, where) {
  const i = html.search(anchor);
  if (i < 0) return null;
  if (where === 'before') {
    const lineStart = html.lastIndexOf('\n', i) + 1;
    return html.slice(0, lineStart) + text + html.slice(lineStart);
  }
  const lineEnd = html.indexOf('\n', i);
  return html.slice(0, lineEnd + 1) + text + html.slice(lineEnd + 1);
}
const indentOf = (html, anchor) => {
  const i = html.search(anchor);
  const lineStart = html.lastIndexOf('\n', i) + 1;
  return html.slice(lineStart, i).match(/^[ \t]*/)[0];
};

function wire(file, pageId) {
  const abs = path.join(ROOT, file);
  const before = fs.readFileSync(abs, 'utf8');
  const eol = before.includes('\r\n') ? '\r\n' : '\n';
  const prefix = '../'.repeat(file.split('/').length - 1);
  const problems = [];
  let html = before;

  // 1. clear any previous wiring, marked or legacy
  for (const name of ['prepaint', 'link', 'toggle', 'switch']) html = html.replace(blockRe(name), '');
  for (const re of LEGACY) html = html.replace(re, '');

  // 2. data-page on <html>
  html = html.replace(/<html\b([^>]*)>/, (tag, attrs) => {
    const cleaned = attrs.replace(/\s+data-page="[^"]*"/, '');
    return `<html${cleaned} data-page="${pageId}">`;
  });

  // 3. pre-paint script, straight after the viewport meta so it runs before paint
  const viewport = /<meta\b[^>]*\bname="viewport"[^>]*>/;
  let next = insertAtLine(html, viewport, block('prepaint', PREPAINT, indentOf(html, viewport), eol), 'after');
  if (next) html = next; else problems.push('no viewport meta');

  // 4. theme stylesheet, last thing in <head> so it follows every other sheet
  const headEnd = /<\/head>/;
  const linkIndent = indentOf(html, headEnd) + '  ';
  const link = `${linkIndent}<!-- theme:link --><link rel="stylesheet" href="${prefix}assets/octavia-theme.css?v=${THEME_VERSION}"><!-- /theme:link -->${eol}`;
  next = insertAtLine(html, headEnd, link, 'before');
  if (next) html = next; else problems.push('no </head>');

  // 5. toggle, first in the navbar's right-hand action group
  const actions = /<div class="flex items-center gap-2 z-20 shrink-0">/;
  const actionsIndent = indentOf(html, actions);
  next = insertAtLine(html, actions, block('toggle', TOGGLE, actionsIndent + '          ', eol), 'after');
  if (next) html = next; else problems.push('no navbar action group');

  // 6. switch script, just before </body>
  const bodyEnd = /<\/body>/;
  next = insertAtLine(html, bodyEnd, block('switch', switchScript(prefix), indentOf(html, bodyEnd) + '  ', eol), 'before');
  if (next) html = next; else problems.push('no </body>');

  // sanity: exactly one of each
  for (const name of ['prepaint', 'link', 'toggle', 'switch']) {
    const n = (html.match(new RegExp(`<!-- theme:${name} -->`, 'g')) || []).length;
    if (n !== 1) problems.push(`${name} x${n}`);
  }
  if ((html.match(/id="theme-toggle"/g) || []).length !== 1) problems.push('toggle id count');

  return { abs, before, html, changed: html !== before, problems };
}

let changed = 0, failed = 0;
for (const [file, pageId] of Object.entries(PAGES)) {
  const r = wire(file, pageId);
  const status = r.problems.length ? `PROBLEM: ${r.problems.join(', ')}` : r.changed ? (CHECK ? 'needs update' : 'wired') : 'up to date';
  console.log(`${file.padEnd(36)} ${pageId.padEnd(15)} ${status}`);
  if (r.problems.length) { failed++; continue; }
  if (r.changed) {
    changed++;
    if (!CHECK) fs.writeFileSync(r.abs, r.html, 'utf8');
  }
}
console.log(`\n${Object.keys(PAGES).length} pages, ${changed} ${CHECK ? 'out of date' : 'updated'}, ${failed} with problems`);
if (!CHECK && changed) console.log('Rebuild generated pages: node scripts/blog/build.mjs --source=local && node scripts/build-audience-pages.mjs');
if (failed || (CHECK && changed)) process.exitCode = 1;
