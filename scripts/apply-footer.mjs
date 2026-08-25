#!/usr/bin/env node
// Replaces the <footer> block on every page with the shared Octavia footer and
// ensures each page links assets/octavia-footer.css.
//
//   node scripts/apply-footer.mjs [--check]
//
// --check reports what would change without writing.

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const checkOnly = process.argv.includes('--check');

const PAGES = [
  ...fs.readdirSync(ROOT).filter((f) => f.endsWith('.html')),
  ...fs.readdirSync(path.join(ROOT, 'features')).filter((f) => f.endsWith('.html')).map((f) => `features/${f}`),
];

const SOCIAL = [
  ['Octavia on LinkedIn', 'https://www.linkedin.com/company/octavia-lunartech/', 'simple-icons:linkedin'],
  ['LunarTech on LinkedIn', 'https://www.linkedin.com/company/lunartechai/', 'simple-icons:linkedin'],
  ['LunarTech on Instagram', 'https://www.instagram.com/lunartech.ai/', 'simple-icons:instagram'],
  ['LunarTech on X', 'https://x.com/lunartechlabs', 'simple-icons:x'],
  ['LunarTech on Substack', 'https://substack.com/@lunartech', 'simple-icons:substack'],
];

const COLUMNS = [
  ['Product', [
    ['All features', '/features'],
    ['Video translation', '/features/video-translation'],
    ['Audio translation', '/features/audio-translation'],
    ['Speech generation', '/features/speech-generation'],
    ['Subtitle generation', '/features/subtitle-generation'],
    ['Subtitle translation', '/features/subtitle-translation'],
    ['Subtitle to audio', '/features/subtitle-to-audio'],
  ]],
  ['Explore', [
    ['Solutions', '/solutions'],
    ['Pricing', '/pricing'],
    ['Translations', '/translations'],
    ['Inspiration', '/inspiration'],
  ]],
  ['Resources', [
    ['Blog', '/blog'],
    ['Documentation', '/docs'],
    ['FAQ', '/faq'],
    ['Translation guides', '/blog/category/translation-guides'],
    ['AI dubbing', '/blog/category/ai-dubbing'],
    ['Enterprise', '/blog/category/enterprise'],
  ]],
  ['Company', [
    ['Team', '/team'],
    ['Contact', '/contact'],
    ['Log in', 'https://app.octavia.lunartech.ai/login'],
    ['Sign up', 'https://app.octavia.lunartech.ai/signup'],
  ]],
];

const ext = (href) => (href.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : '');

const socialHtml = SOCIAL.map(([label, href, icon]) =>
  `        <li><a href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${label}"><iconify-icon icon="${icon}" width="17" aria-hidden="true"></iconify-icon></a></li>`
).join('\n');

const columnsHtml = COLUMNS.map(([heading, links]) => `      <div class="oc-foot-col">
        <h3>${heading}</h3>
        <ul>
${links.map(([label, href]) => `          <li><a href="${href}"${ext(href)}>${label}</a></li>`).join('\n')}
        </ul>
      </div>`).join('\n');

const FOOTER = `<footer class="oc-foot">

    <div class="oc-foot-signup">
      <form action="https://app.octavia.lunartech.ai/signup" method="get">
        <label for="oc-foot-email" class="oc-foot-sr">Email address</label>
        <input id="oc-foot-email" name="email" type="email" autocomplete="email" required
          placeholder="Get started for early access...">
        <button type="submit" aria-label="Get early access">
          <iconify-icon icon="lucide:arrow-right" width="16" aria-hidden="true"></iconify-icon>
        </button>
      </form>
    </div>

    <div class="oc-foot-inner">

      <div class="oc-foot-top">
        <div>
          <p class="oc-foot-wordmark">Translate. <span>Dub.</span> Reach.</p>
          <p class="oc-foot-blurb">
            Octavia turns one upload into every language — translated video, audio, subtitles and
            transcripts in 60+ languages, with the original voice, timing and atmosphere intact.
          </p>
          <ul class="oc-foot-social">
${socialHtml}
          </ul>
        </div>

        <a class="oc-foot-card" href="https://app.octavia.lunartech.ai/signup">
          <iconify-icon class="oc-foot-card-glyph" icon="lucide:languages" width="128" aria-hidden="true"></iconify-icon>
          <div class="oc-foot-card-body">
            <h3>Start translating now</h3>
            <p>Break language barriers instantly. Reach global audiences with AI-powered dubbing.</p>
            <div class="oc-foot-card-meta">
              <span>60+ languages</span>
              <iconify-icon icon="lucide:arrow-up-right" width="20" aria-hidden="true"></iconify-icon>
            </div>
          </div>
        </a>
      </div>

      <nav class="oc-foot-nav" aria-label="Footer">
${columnsHtml}
      </nav>

    </div>

    <div class="oc-foot-mark" aria-hidden="true"><span>OCTAVIA</span></div>

    <div class="oc-foot-inner">
      <div class="oc-foot-bottom">
        <p class="oc-foot-copy">&copy; 2026 Octavia by LunarTech</p>
        <ul class="oc-foot-legal">
          <li><a href="/privacy">Privacy</a></li>
          <li><a href="/terms">Terms</a></li>
          <li><a href="/contact">Support</a></li>
        </ul>
      </div>
    </div>
  </footer>`;

// Every other local asset on this site is linked relatively (assets/octavia-tailwind.css,
// assets/octavia-mobile.css) so that pages still render when opened straight off disk over
// file://, where a root-relative /assets/... would resolve to the filesystem root and 404.
// Match that convention, adjusting depth for pages under features/.
const stylesheetFor = (page) =>
  `<link rel="stylesheet" href="${'../'.repeat(page.split('/').length - 1)}assets/octavia-footer.css?v=1">`;
let changed = 0;
const report = [];

for (const page of PAGES) {
  const file = path.join(ROOT, page);
  const original = fs.readFileSync(file, 'utf8');
  let text = original;

  const start = text.indexOf('<footer');
  const end = text.indexOf('</footer>');
  if (start === -1 || end === -1) { report.push(`${page}: NO FOOTER — skipped`); continue; }

  // Preserve the page's own indentation for the opening tag.
  const lineStart = text.lastIndexOf('\n', start) + 1;
  const indent = text.slice(lineStart, start);
  text = text.slice(0, start) + FOOTER.replace(/\n/g, `\n${indent}`) + text.slice(end + '</footer>'.length);

  // Link the footer stylesheet once, right before </head>. Replace any earlier
  // (root-relative) version of the link rather than leaving a broken duplicate.
  const link = stylesheetFor(page);
  if (text.includes('octavia-footer.css')) {
    text = text.replace(/[ \t]*<link[^>]*octavia-footer\.css[^>]*>\n?/g, '');
  }
  const head = text.indexOf('</head>');
  if (head === -1) report.push(`${page}: NO </head> — stylesheet not linked`);
  else text = `${text.slice(0, head)}  ${link}\n${text.slice(head)}`;

  if (text === original) { report.push(`${page}: unchanged`); continue; }
  if (!checkOnly) fs.writeFileSync(file, text);
  changed += 1;
  report.push(`${page}: updated`);
}

for (const line of report) console.log(line);
console.log(`\n${checkOnly ? 'would update' : 'updated'} ${changed} of ${PAGES.length} pages`);
