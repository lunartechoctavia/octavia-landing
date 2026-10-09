#!/usr/bin/env node
// Generates the /for/<audience> landing pages and the /for hub that lists them.
//
//   node scripts/build-audience-pages.mjs
//
// The page shell (head, navbar, footer, scripts) is lifted from an existing
// one-level-deep page so the nav, footer and relative asset paths stay in sync
// automatically. Only the SEO block and the main content are generated here.
// Each audience's copy lives in scripts/audiences/<slug>.mjs; grouping and
// order are set in scripts/audiences/index.mjs.

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { GROUPS, AUDIENCES } from './audiences/index.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TEMPLATE = path.join(ROOT, 'features', 'video-translation.html');
const OUT_DIR = path.join(ROOT, 'for');
const SITE = 'https://octavia.lunartech.ai';

const esc = (s) => String(s).replace(/&(?!#?\w+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const LANGUAGES = ['English', 'Spanish', 'Mandarin', 'Hindi', 'Arabic', 'Portuguese', 'French', 'German', 'Japanese', 'Korean', 'Italian', 'Turkish', 'Vietnamese', 'Polish', 'Tamil', 'Indonesian', 'Dutch', 'Swedish', 'Thai', 'Ukrainian'];

function content(a) {
  const siblings = GROUPS.map((g) => `          <div class="oc-a-group">
            <h3 class="oc-a-group-label">${esc(g.label)}</h3>
            <div class="oc-a-siblings">
${g.audiences.map((o) => `              <a class="oc-a-sibling" href="/for/${o.slug}"${o.slug === a.slug ? ' aria-current="page"' : ''}>${esc(o.nav)}</a>`).join('\n')}
            </div>
          </div>`).join('\n');

  return `<div class="oc-a">

    <section class="oc-a-hero">
      <div class="oc-a-wrap">
        <p class="oc-a-pill">${esc(a.eyebrow)}</p>
        <h1>${a.h1}</h1>
        <p class="oc-a-lede">${esc(a.lede)}</p>
        <div class="oc-a-cta">
          <a class="oc-a-btn oc-a-btn-primary" href="https://app.octavia.lunartech.ai/signup">Start free<iconify-icon icon="lucide:arrow-right" width="15" aria-hidden="true"></iconify-icon></a>
          <a class="oc-a-btn oc-a-btn-ghost" href="/pricing">See pricing</a>
        </div>
        <ul class="oc-a-trust">
          <li><iconify-icon icon="lucide:languages" width="14" aria-hidden="true"></iconify-icon>60+ languages</li>
          <li><iconify-icon icon="lucide:upload" width="14" aria-hidden="true"></iconify-icon>One upload, every format</li>
          <li><iconify-icon icon="lucide:eye" width="14" aria-hidden="true"></iconify-icon>Review before anything ships</li>
        </ul>
      </div>

      <div class="oc-a-wrap">
        <div class="oc-a-stats">
          <div class="oc-a-stat"><b>60+</b><span>Studio-quality languages</span></div>
          <div class="oc-a-stat"><b>1</b><span>Upload, every output</span></div>
          <div class="oc-a-stat"><b>~4s</b><span>Subtitles for a 10-hour video</span></div>
          <div class="oc-a-stat"><b>100%</b><span>Reviewable before export</span></div>
        </div>
      </div>
    </section>

    <section class="oc-a-sec reveal-on-scroll">
      <div class="oc-a-wrap">
        <span class="oc-a-label">The problem</span>
        <h2>What gets in the way</h2>
        <p class="oc-a-sec-lede">The specific reasons this content usually stays in one language.</p>
        <div class="oc-a-pains">
${a.pains.map(([h, p], i) => `          <div class="oc-a-pain"><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('\n')}
        </div>
      </div>
    </section>

    <section class="oc-a-sec reveal-on-scroll">
      <div class="oc-a-wrap">
        <span class="oc-a-label">Capabilities</span>
        <h2>What Octavia does about it</h2>
        <p class="oc-a-sec-lede">The parts of the platform that matter for this work, rather than the full feature list.</p>
        <div class="oc-a-caps">
${a.caps.map(([icon, h, p], i) => `          <article class="oc-a-cap">
            <span class="oc-a-cap-icon"><iconify-icon icon="${icon}" width="20" aria-hidden="true"></iconify-icon></span>
            <h3>${esc(h)}</h3>
            <p>${esc(p)}</p>
          </article>`).join('\n')}
        </div>
      </div>
    </section>

    <section class="oc-a-sec reveal-on-scroll">
      <div class="oc-a-wrap">
        <span class="oc-a-label">Workflow</span>
        <h2>How it runs</h2>
        <p class="oc-a-sec-lede">Four steps from the file you already have to every language you need.</p>
        <div class="oc-a-steps">
${a.steps.map(([h, p], i) => `          <div class="oc-a-step"><b>Step 0${i + 1}</b><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('\n')}
        </div>
      </div>
    </section>

    <section class="oc-a-sec reveal-on-scroll">
      <div class="oc-a-wrap">
        <span class="oc-a-label">Deliverables</span>
        <h2>What you get back</h2>
        <p class="oc-a-sec-lede">One upload in, every format you need to publish out.</p>
        <div class="oc-a-outputs">
${a.outputs.map((o) => `          <span class="oc-a-output">${esc(o)}</span>`).join('\n')}
        </div>
      </div>
    </section>

    <section class="oc-a-sec reveal-on-scroll">
      <div class="oc-a-wrap">
        <span class="oc-a-label">FAQ</span>
        <h2>Questions worth asking</h2>
        <p class="oc-a-sec-lede">Including the ones where the honest answer is a limitation.</p>
        <div class="oc-a-faq">
${a.faq.map(([q, ans]) => `          <details><summary>${esc(q)}<i aria-hidden="true"></i></summary><p>${esc(ans)}</p></details>`).join('\n')}
        </div>
      </div>
    </section>

    <section class="oc-a-sec reveal-on-scroll">
      <div class="oc-a-wrap">
        <span class="oc-a-label">Further reading</span>
        <h2>Go deeper</h2>
        <p class="oc-a-sec-lede">Practical guides from the Octavia editorial team.</p>
        <div class="oc-a-reads">
${a.reads.map(([label, href], i) => `          <a class="oc-a-read" href="${href}"><span>${esc(label)}</span><iconify-icon icon="lucide:arrow-up-right" width="16" aria-hidden="true"></iconify-icon></a>`).join('\n')}
        </div>
      </div>
    </section>

    <section class="oc-a-sec reveal-on-scroll">
      <div class="oc-a-wrap">
        <span class="oc-a-label">More audiences</span>
        <h2>Who else uses Octavia</h2>
        <p class="oc-a-sec-lede">The same engine, pointed at a different kind of work.</p>
        <div class="oc-a-groups">
${siblings}
        </div>
        <a class="oc-a-all" href="/for">Browse all ${AUDIENCES.length} audiences<iconify-icon icon="lucide:arrow-right" width="15" aria-hidden="true"></iconify-icon></a>
      </div>
    </section>

    <section class="oc-a-close reveal-on-scroll">
      <div class="oc-a-wrap">
        <div class="oc-a-close-panel">
          <h2>${esc(a.closeH2)}</h2>
          <p>${esc(a.closeP)}</p>
          <div class="oc-a-cta">
            <a class="oc-a-btn oc-a-btn-primary" href="https://app.octavia.lunartech.ai/signup">Start free<iconify-icon icon="lucide:arrow-right" width="15" aria-hidden="true"></iconify-icon></a>
            <a class="oc-a-btn oc-a-btn-ghost" href="/contact">Talk to us</a>
          </div>
        </div>
      </div>
    </section>

  </div>

  `;
}

// The /for hub: every audience, by group, linking to its page.
function hub() {
  const jump = GROUPS.map((g) => `            <a class="oc-a-sibling" href="#${g.id}">${esc(g.label)}</a>`).join('\n');

  const groups = GROUPS.map((g, i) => `    <section class="oc-a-sec reveal-on-scroll" id="${g.id}">
      <div class="oc-a-wrap">
        <span class="oc-a-label">${String(i + 1).padStart(2, '0')} — ${g.audiences.length} audiences</span>
        <h2>${esc(g.label)}</h2>
        <p class="oc-a-sec-lede">${esc(g.lede)}</p>
        <div class="oc-a-dir">
${g.audiences.map((o) => `          <a class="oc-a-dir-card" href="/for/${o.slug}">
            <span class="oc-a-cap-icon"><iconify-icon icon="${o.icon}" width="20" aria-hidden="true"></iconify-icon></span>
            <iconify-icon class="oc-a-dir-go" icon="lucide:arrow-up-right" width="16" aria-hidden="true"></iconify-icon>
            <h3>${esc(o.nav)}</h3>
            <p>${esc(o.description)}</p>
          </a>`).join('\n')}
        </div>
      </div>
    </section>`).join('\n\n');

  return `<div class="oc-a">

    <section class="oc-a-hero">
      <div class="oc-a-wrap">
        <p class="oc-a-pill">Who it’s for</p>
        <h1>Every team has something to say. <em>Most say it in one language.</em></h1>
        <p class="oc-a-lede">Octavia takes the video and audio you already publish and returns it in 60+ languages — dubbed, subtitled and transcribed, and reviewed before anything ships. What changes from team to team is what has to survive the translation. Find yours below.</p>
        <div class="oc-a-cta">
          <a class="oc-a-btn oc-a-btn-primary" href="https://app.octavia.lunartech.ai/signup">Start free<iconify-icon icon="lucide:arrow-right" width="15" aria-hidden="true"></iconify-icon></a>
          <a class="oc-a-btn oc-a-btn-ghost" href="/contact">Talk to us</a>
        </div>
        <nav class="oc-a-jump" aria-label="Audience groups">
          <div class="oc-a-siblings">
${jump}
          </div>
        </nav>
      </div>
    </section>

${groups}

    <section class="oc-a-close reveal-on-scroll">
      <div class="oc-a-wrap">
        <div class="oc-a-close-panel">
          <h2>Don’t see your team here?</h2>
          <p>If you publish recorded speech, Octavia probably fits. Tell us what you make and we’ll tell you honestly where it works and where it doesn’t.</p>
          <div class="oc-a-cta">
            <a class="oc-a-btn oc-a-btn-primary" href="https://app.octavia.lunartech.ai/signup">Start free<iconify-icon icon="lucide:arrow-right" width="15" aria-hidden="true"></iconify-icon></a>
            <a class="oc-a-btn oc-a-btn-ghost" href="/contact">Talk to us</a>
          </div>
        </div>
      </div>
    </section>

  </div>

  `;
}

// --- shell -----------------------------------------------------------------

const src = fs.readFileSync(TEMPLATE, 'utf8');
const mainAt = src.indexOf('<main');
const footAt = src.indexOf('<footer class="oc-foot">');
if (mainAt === -1 || footAt === -1) { console.error('Could not locate shell boundaries in the template page.'); process.exit(1); }

const shellTop = src.slice(0, mainAt);

// The shell's inline script ends by touching `.content-wait-for-load`, an element that
// lived inside the <main> we replace — leaving an uncaught TypeError on every page.
// Make that last line null-safe, and load the page interactions.
const shellBottom = src
  .slice(footAt)
  .replace(
    "document.querySelector('.content-wait-for-load').classList.add('content-loaded');",
    "const waiting = document.querySelector('.content-wait-for-load'); if (waiting) waiting.classList.add('content-loaded');"
  );

function page({ urlPath, title, description, main }) {
  const canonical = `${SITE}${urlPath}`;
  let head = shellTop
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(description)}">`)
    // the shell is a feature page; audience pages carry their own theme scope
    .replace(/(<html\b[^>]*\bdata-page=")[^"]*(")/, '$1audience$2');

  // These pages carry canonical and Open Graph tags; the older marketing pages do not.
  const seo = [
    `  <link rel="canonical" href="${canonical}">`,
    `  <meta property="og:type" content="website">`,
    `  <meta property="og:url" content="${canonical}">`,
    `  <meta property="og:title" content="${esc(title)}">`,
    `  <meta property="og:description" content="${esc(description)}">`,
    `  <meta name="twitter:card" content="summary_large_image">`,
    `  <meta name="twitter:title" content="${esc(title)}">`,
    `  <meta name="twitter:description" content="${esc(description)}">`,
    `  <link rel="stylesheet" href="../assets/octavia-audience.css?v=2">`,
  ].join('\n');
  head = head.replace('</head>', `${seo}\n</head>`);

  return head + main + shellBottom;
}

// A broken "Go deeper" link would ship silently, so fail the build instead.
const missing = AUDIENCES.flatMap((a) => a.reads
  .filter(([, href]) => !fs.existsSync(path.join(ROOT, href.replace(/^\//, ''), 'index.html')))
  .map(([, href]) => `for/${a.slug}: ${href}`));
if (missing.length) { console.error(`Further-reading links point at missing articles:\n  ${missing.join('\n  ')}`); process.exit(1); }

fs.mkdirSync(OUT_DIR, { recursive: true });

for (const a of AUDIENCES) {
  fs.writeFileSync(path.join(OUT_DIR, `${a.slug}.html`), page({ urlPath: `/for/${a.slug}`, title: a.title, description: a.description, main: content(a) }));
  console.log(`wrote for/${a.slug}.html  — ${a.nav}`);
}

fs.writeFileSync(path.join(OUT_DIR, 'index.html'), page({
  urlPath: '/for',
  title: 'Who Octavia Is For — Video Localization for Every Kind of Team',
  description: `How ${AUDIENCES.length} kinds of teams, from studios and newsrooms to agencies and public services, use Octavia to publish video in 60+ languages.`,
  main: hub(),
}));
console.log('wrote for/index.html  — hub');

console.log(`\n${AUDIENCES.length} audience pages and the hub generated`);
