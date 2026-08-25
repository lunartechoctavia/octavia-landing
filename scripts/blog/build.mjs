#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const ARTICLES_DIR = path.join(ROOT, 'content', 'blog', 'articles');
const BLOG_DIR = path.join(ROOT, 'blog');
const EXPECTED_ARTICLES = 212;
const GENERATED_MARKER = '<!-- OCTAVIA_BLOG_GENERATED -->';
const args = new Set(process.argv.slice(2));
const validateOnly = args.has('--validate');
const sourceArg = [...args].find((arg) => arg.startsWith('--source='))?.split('=')[1] || 'auto';

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
readEnvFile(path.join(ROOT, 'sanity-studio', '.env.local'));

const SITE_URL = (process.env.SITE_URL || 'https://octavia.lunartech.ai').replace(/\/$/, '');
const PAGE_SIZE = Number(process.env.BLOG_PAGE_SIZE || 10);
const FOLLOW_LINKS = [
  { label: 'LunarTech', icon: 'simple-icons:linkedin', href: 'https://www.linkedin.com/company/lunartechai/' },
  { label: 'Octavia', icon: 'simple-icons:linkedin', href: 'https://www.linkedin.com/company/octavia-lunartech/' },
  { label: 'Instagram', icon: 'simple-icons:instagram', href: 'https://www.instagram.com/lunartech.ai/' },
  { label: 'X', icon: 'simple-icons:x', href: 'https://x.com/lunartechlabs' },
  { label: 'Substack', icon: 'simple-icons:substack', href: 'https://substack.com/@lunartech' },
];

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function escapeAttr(value = '') { return escapeHtml(value); }
function escapeXml(value = '') { return escapeHtml(value); }

function cleanText(value = '') {
  return String(value)
    .replaceAll('â€”', '—')
    .replaceAll('â€“', '–')
    .replaceAll('â€™', '’')
    .replaceAll('â€œ', '“')
    .replaceAll('â€\u009d', '”')
    .replaceAll('Â·', '·')
    .replaceAll('Â', '');
}

function slugify(value = '') {
  return cleanText(value).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function words(value = '') {
  return (cleanText(value).replace(/<[^>]*>/g, ' ').match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu) || []).length;
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(value));
}

function safeUrl(value = '') {
  const text = String(value).trim();
  if (text.startsWith('/') || text.startsWith('#')) return text;
  try {
    const url = new URL(text);
    return ['http:', 'https:', 'mailto:'].includes(url.protocol) ? text : '#';
  } catch { return '#'; }
}

function inlineMarkdown(value = '') {
  let text = escapeHtml(cleanText(value));
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => `<a href="${escapeAttr(safeUrl(href))}">${label}</a>`);
  return text;
}

function renderMarkdown(markdown) {
  const lines = cleanText(markdown).replace(/\r/g, '').split('\n');
  const html = [];
  const toc = [];
  let paragraph = [];
  let list = null;
  let quote = [];
  const usedIds = new Map();

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`);
    paragraph = [];
  };
  const flushList = () => {
    if (!list) return;
    html.push(`<${list.type}>${list.items.map((item) => `<li>${inlineMarkdown(item)}</li>`).join('')}</${list.type}>`);
    list = null;
  };
  const flushQuote = () => {
    if (!quote.length) return;
    html.push(`<blockquote><p>${inlineMarkdown(quote.join(' '))}</p></blockquote>`);
    quote = [];
  };
  const flush = () => { flushParagraph(); flushList(); flushQuote(); };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { flush(); continue; }
    if (line === '---') { flush(); html.push('<hr>'); continue; }
    const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (image) {
      flush();
      const alt = escapeAttr(image[1]);
      const src = escapeAttr(safeUrl(image[2]));
      html.push(`<p><img src="${src}" alt="${alt}"></p>`);
      continue;
    }
    const linkedImage = line.match(/^\[!\[([^\]]*)\]\(([^)]+)\)\]\(([^)]+)\)$/);
    if (linkedImage) {
      flush();
      const alt = escapeAttr(linkedImage[1]);
      const imgSrc = escapeAttr(safeUrl(linkedImage[2]));
      const linkHref = escapeAttr(safeUrl(linkedImage[3]));
      html.push(`<p><a href="${linkHref}"><img src="${imgSrc}" alt="${alt}"></a></p>`);
      continue;
    }
    const heading = line.match(/^(#{2,4})\s+(.+)$/);
    if (heading) {
      flush();
      const level = heading[1].length;
      const label = heading[2].replace(/[*`\[\]]/g, '');
      const base = slugify(label) || 'section';
      const count = usedIds.get(base) || 0;
      usedIds.set(base, count + 1);
      const id = count ? `${base}-${count + 1}` : base;
      html.push(`<h${level} id="${escapeAttr(id)}">${inlineMarkdown(heading[2])}</h${level}>`);
      if (level <= 3) toc.push({ level, id, label: cleanText(label) });
      continue;
    }
    const unordered = line.match(/^[-*]\s+(.+)$/);
    const ordered = line.match(/^\d+[.)]\s+(.+)$/);
    if (unordered || ordered) {
      flushParagraph(); flushQuote();
      const type = ordered ? 'ol' : 'ul';
      if (list && list.type !== type) flushList();
      if (!list) list = { type, items: [] };
      list.items.push((unordered || ordered)[1]);
      continue;
    }
    const quoted = line.match(/^>\s?(.*)$/);
    if (quoted) { flushParagraph(); flushList(); quote.push(quoted[1]); continue; }
    flushList(); flushQuote(); paragraph.push(line);
  }
  flush();
  return { html: html.join('\n'), toc };
}

function parseLocalArticles() {
  if (!fs.existsSync(ARTICLES_DIR)) throw new Error(`Missing ${ARTICLES_DIR}`);
  return fs.readdirSync(ARTICLES_DIR).filter((file) => file.endsWith('.md')).sort().map((file) => {
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf8');
    const match = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/);
    if (!match) throw new Error(`${file}: missing JSON front matter`);
    let metadata;
    try { metadata = JSON.parse(match[1]); }
    catch (error) { throw new Error(`${file}: invalid JSON front matter (${error.message})`); }
    const markdown = cleanText(raw.slice(match[0].length).trim());
    const rendered = renderMarkdown(markdown);
    return normalizeArticle({ ...metadata, markdown, bodyHtml: rendered.html, toc: rendered.toc, sourceFile: file });
  });
}

function portableTextPlain(blocks = []) {
  return blocks.filter((block) => block?._type === 'block').map((block) => (block.children || []).map((child) => child.text || '').join('')).join('\n\n');
}

function renderPortableText(blocks = []) {
  const lines = [];
  let previousWasList = false;
  for (const block of blocks) {
    if (block?._type !== 'block') continue;
    const definitions = new Map((block.markDefs || []).map((definition) => [definition._key, definition]));
    const text = (block.children || []).map((child) => {
      let value = child.text || '';
      for (const mark of child.marks || []) {
        const definition = definitions.get(mark);
        if (definition?._type === 'link' && definition.href) value = `[${value}](${safeUrl(definition.href)})`;
        else if (mark === 'strong') value = `**${value}**`;
        else if (mark === 'em') value = `*${value}*`;
      }
      return value;
    }).join('');
    const prefix = { h2: '## ', h3: '### ', h4: '#### ', blockquote: '> ' }[block.style] || '';
    const listPrefix = block.listItem === 'bullet' ? '- ' : block.listItem === 'number' ? '1. ' : '';
    const isList = Boolean(listPrefix);
    if (lines.length && !(isList && previousWasList)) lines.push('');
    lines.push(`${listPrefix || prefix}${text}`);
    previousWasList = isList;
  }
  const markdown = lines.join('\n');
  return { markdown, ...renderMarkdown(markdown) };
}

function normalizeArticle(article) {
  const categoryName = typeof article.category === 'string' ? article.category : article.category?.name;
  const authorName = typeof article.author === 'string' ? article.author : article.author?.name;
  const heroImage = article.heroImage || article.heroImageUrl || article.fallbackImage;
  const bodyWordCount = words(article.markdown || portableTextPlain(article.body));
  return {
    ...article,
    title: cleanText(article.title),
    slug: article.slug,
    category: cleanText(categoryName || 'Insights'),
    categorySlug: article.category?.slug || slugify(categoryName || 'Insights'),
    author: cleanText(authorName || 'Octavia Editorial Team'),
    excerpt: cleanText(article.excerpt || ''),
    metaDescription: cleanText(article.metaDescription || article.seo?.metaDescription || article.excerpt || ''),
    primaryKeyword: cleanText(article.primaryKeyword || article.seo?.focusKeyword || ''),
    heroImage,
    heroImageAlt: cleanText(article.heroImageAlt || article.title),
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt || article.publishedAt,
    featured: Boolean(article.featured),
    bodyWordCount,
    readingMinutes: Math.max(1, Math.ceil(bodyWordCount / 225)),
  };
}

async function fetchSanityArticles() {
  const projectId = process.env.SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production';
  if (!projectId) throw new Error('SANITY_PROJECT_ID is not configured');
  const query = `*[_type == "post" && defined(slug.current) && defined(publishedAt) && publishedAt <= now() && !(_id in path("drafts.**"))] | order(featured desc, publishedAt desc) {title, "slug": slug.current, excerpt, publishedAt, updatedAt, featured, fallbackImage, "heroImageUrl": coalesce(heroImage.asset->url, fallbackImage), "heroImageAlt": coalesce(heroImage.alt, title), body, seo, "author": author->{name, "slug": slug.current, role, bio}, "category": category->{name, "slug": slug.current, description}, "relatedSlugs": relatedPosts[]->slug.current}`;
  const endpoint = `https://${projectId}.api.sanity.io/v2026-03-01/data/query/${encodeURIComponent(dataset)}?query=${encodeURIComponent(query)}`;
  const headers = {};
  const token = process.env.SANITY_READ_TOKEN || process.env.SANITY_API_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(endpoint, { headers });
  if (!response.ok) throw new Error(`Sanity query failed (${response.status})`);
  const payload = await response.json();
  return (payload.result || []).map((article) => {
    const rendered = renderPortableText(article.body);
    return normalizeArticle({ ...article, markdown: rendered.markdown, bodyHtml: rendered.html, toc: rendered.toc });
  });
}

function validateArticles(articles) {
  const errors = [];
  if (articles.length !== EXPECTED_ARTICLES) errors.push(`Expected ${EXPECTED_ARTICLES} articles, found ${articles.length}`);
  const uniqueFields = ['slug', 'title', 'primaryKeyword'];
  for (const field of uniqueFields) {
    const seen = new Set();
    for (const article of articles) {
      const value = String(article[field] || '').toLowerCase();
      if (!value) errors.push(`${article.sourceFile || article.slug}: missing ${field}`);
      else if (seen.has(value)) errors.push(`${article.slug}: duplicate ${field} "${article[field]}"`);
      seen.add(value);
    }
  }
  for (const article of articles) {
    const label = article.sourceFile || article.slug;
    for (const field of ['title', 'slug', 'category', 'excerpt', 'metaDescription', 'publishedAt', 'heroImage']) {
      if (!article[field]) errors.push(`${label}: missing ${field}`);
    }
    if (article.bodyWordCount < 2000) errors.push(`${label}: ${article.bodyWordCount} words; minimum is 2000`);
    if (article.metaDescription.length > 160) errors.push(`${label}: meta description is ${article.metaDescription.length} characters; maximum is 160`);
    if (article.heroImage?.startsWith('/')) {
      const imagePath = path.join(ROOT, article.heroImage.replace(/^\//, ''));
      if (!fs.existsSync(imagePath)) errors.push(`${label}: missing image ${article.heroImage}`);
    }
  }
  if (errors.length) throw new Error(`Blog validation failed:\n- ${errors.join('\n- ')}`);
}

function jsonLd(data) {
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}

function listingSeo({ page, totalPages, pathName, title, description, articles }) {
  const canonical = `${SITE_URL}${pathName}`;
  const socialImage = articles[0]?.heroImage?.startsWith('http') ? articles[0].heroImage : `${SITE_URL}${articles[0]?.heroImage || '/assets/blog/images/ai-dubbing-core.png'}`;
  const previous = page > 1 ? (page === 2 ? `${SITE_URL}/blog` : `${SITE_URL}/blog/page/${page - 1}`) : null;
  const next = page < totalPages ? `${SITE_URL}/blog/page/${page + 1}` : null;
  const graph = {
    '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, description, url: canonical,
    mainEntity: { '@type': 'ItemList', itemListElement: articles.map((article, index) => ({ '@type': 'ListItem', position: (page - 1) * PAGE_SIZE + index + 1, url: `${SITE_URL}/blog/${article.slug}`, name: article.title })) },
  };
  return [
    `<link rel="canonical" href="${escapeAttr(canonical)}">`,
    previous ? `<link rel="prev" href="${escapeAttr(previous)}">` : '',
    next ? `<link rel="next" href="${escapeAttr(next)}">` : '',
    '<meta property="og:type" content="website">',
    `<meta property="og:title" content="${escapeAttr(title)}">`,
    `<meta property="og:description" content="${escapeAttr(description)}">`,
    `<meta property="og:url" content="${escapeAttr(canonical)}">`,
    `<meta property="og:image" content="${escapeAttr(socialImage)}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:image" content="${escapeAttr(socialImage)}">`, jsonLd(graph),
  ].filter(Boolean).join('\n    ');
}

function articleSeo(article) {
  const url = `${SITE_URL}/blog/${article.slug}`;
  const schema = {
    '@context': 'https://schema.org', '@type': 'BlogPosting', headline: article.title,
    description: article.metaDescription, image: article.heroImage?.startsWith('http') ? article.heroImage : `${SITE_URL}${article.heroImage}`,
    datePublished: article.publishedAt, dateModified: article.updatedAt, wordCount: article.bodyWordCount,
    timeRequired: `PT${article.readingMinutes}M`, mainEntityOfPage: url,
    author: { '@type': 'Organization', name: article.author }, publisher: { '@type': 'Organization', name: 'Octavia', url: SITE_URL },
  };
  const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
    { '@type': 'ListItem', position: 3, name: article.title, item: url },
  ] };
  return [
    `<link rel="canonical" href="${escapeAttr(url)}">`, '<meta property="og:type" content="article">',
    `<meta property="og:title" content="${escapeAttr(article.title)}">`, `<meta property="og:description" content="${escapeAttr(article.metaDescription)}">`,
    `<meta property="og:url" content="${escapeAttr(url)}">`, `<meta property="og:image" content="${escapeAttr(schema.image)}">`,
    `<meta property="article:published_time" content="${escapeAttr(article.publishedAt)}">`, `<meta property="article:modified_time" content="${escapeAttr(article.updatedAt)}">`,
    '<meta name="twitter:card" content="summary_large_image">', `<meta name="twitter:title" content="${escapeAttr(article.title)}">`,
    `<meta name="twitter:description" content="${escapeAttr(article.metaDescription)}">`, `<meta name="twitter:image" content="${escapeAttr(schema.image)}">`,
    jsonLd(schema), jsonLd(breadcrumb),
  ].join('\n    ');
}

function card(article) {
  return `<article class="blog-card">
    <a class="blog-card-link" href="/blog/${escapeAttr(article.slug)}" aria-label="Read ${escapeAttr(article.title)}"></a>
    <div class="blog-card-media"><img src="${escapeAttr(article.heroImage)}" alt="${escapeAttr(article.heroImageAlt)}" loading="lazy" decoding="async"></div>
    <div class="blog-card-body"><span class="blog-category">${escapeHtml(article.category)}</span><div class="blog-card-copy">
      <h2 class="blog-card-title">${escapeHtml(article.title)}</h2><p class="blog-card-description">${escapeHtml(article.excerpt)}</p>
      <time class="blog-card-date" datetime="${escapeAttr(article.publishedAt)}">${escapeHtml(formatDate(article.publishedAt))} · ${article.readingMinutes} min read</time>
    </div></div>
  </article>`;
}

function feature(article) {
  return `<section aria-label="Featured article"><article class="blog-featured">
    <div class="blog-featured-media"><img src="${escapeAttr(article.heroImage)}" alt="${escapeAttr(article.heroImageAlt)}" fetchpriority="high" decoding="async"></div>
    <div class="blog-featured-copy"><div class="blog-featured-meta"><span class="blog-category">${escapeHtml(article.category)}</span><time datetime="${escapeAttr(article.publishedAt)}">${escapeHtml(formatDate(article.publishedAt))} · ${article.readingMinutes} min read</time></div>
      <h2 class="blog-featured-title">${escapeHtml(article.title)}</h2><p class="blog-featured-description">${escapeHtml(article.excerpt)}</p>
      <a href="/blog/${escapeAttr(article.slug)}" class="blog-read-link">Read article <span aria-hidden="true">→</span></a>
    </div></article></section>`;
}

function filters(categories, active = '') {
  const items = [`<a class="blog-filter" href="/blog"${!active ? ' aria-current="page"' : ''}>All</a>`];
  for (const category of categories) items.push(`<a class="blog-filter" href="/blog/category/${escapeAttr(category.slug)}"${active === category.slug ? ' aria-current="page"' : ''}>${escapeHtml(category.name)}</a>`);
  return `<nav class="blog-filters" aria-label="Article categories">${items.join('')}</nav>`;
}

function pagination(page, totalPages) {
  if (totalPages <= 1) return '';
  const url = (number) => number === 1 ? '/blog' : `/blog/page/${number}`;
  const links = [];
  links.push(`<a class="pagination-link pagination-link-wide" href="${page > 1 ? url(page - 1) : '#'}"${page === 1 ? ' aria-disabled="true" tabindex="-1"' : ''} rel="prev">← Previous</a>`);
  for (let i = 1; i <= totalPages; i += 1) links.push(`<a class="pagination-link" href="${url(i)}"${i === page ? ' aria-current="page"' : ''}>${i}</a>`);
  links.push(`<a class="pagination-link pagination-link-wide" href="${page < totalPages ? url(page + 1) : '#'}"${page === totalPages ? ' aria-disabled="true" tabindex="-1"' : ''} rel="next">Next →</a>`);
  return `<nav class="blog-pagination" aria-label="Blog pagination">${links.join('')}</nav>`;
}

function listingMain({ pageArticles, allArticles, categories, page = 1, totalPages = 1, activeCategory = '', heading = 'Practical ideas for <em>global impact.</em>', intro = 'Clear, useful guides for teams creating multilingual video, audio, and learning experiences.' }) {
  const isMainFirst = !activeCategory && page === 1;
  const featureArticle = isMainFirst ? pageArticles[0] : null;
  const gridArticles = featureArticle ? pageArticles.slice(1) : pageArticles;
  return `${GENERATED_MARKER}
    <main class="blog-shell content-wait-for-load"><div class="blog-container">
      <header class="blog-hero"><span class="blog-kicker">Octavia editorial</span><h1 class="blog-heading">${heading}</h1><p class="blog-intro">${escapeHtml(intro)}</p></header>
      <div class="blog-index-bar"><p class="blog-index-count">${allArticles.length} in-depth articles${page > 1 ? ` · Page ${page} of ${totalPages}` : ''}</p>${filters(categories, activeCategory)}</div>
      ${featureArticle ? feature(featureArticle) : ''}
      <section class="blog-grid" aria-label="Articles">${gridArticles.map(card).join('\n')}</section>
      ${pagination(page, totalPages)}
    </div></main>`;
}

function articleMain(article, related) {
  const toc = article.toc || [];
  const articleUrl = `${SITE_URL}/blog/${article.slug}`;
  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedTitle = encodeURIComponent(article.title);
  const shareLinks = [
    { label: 'Share on LinkedIn', icon: 'simple-icons:linkedin', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { label: 'Share on X', icon: 'simple-icons:x', href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    { label: 'Share on Facebook', icon: 'simple-icons:facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
  ];
  return `${GENERATED_MARKER}
    <div class="article-progress" data-article-progress aria-hidden="true"></div>
    <main class="article-shell"><div class="article-container">
      <header class="article-header"><a class="article-category" href="/blog/category/${escapeAttr(article.categorySlug)}">${escapeHtml(article.category)}</a>
        <h1 class="article-title">${escapeHtml(article.title)}</h1><p class="article-deck">${escapeHtml(article.excerpt)}</p>
        <div class="article-meta"><span>${escapeHtml(article.author)}</span><span class="article-meta-dot"></span><time datetime="${escapeAttr(article.publishedAt)}">${escapeHtml(formatDate(article.publishedAt))}</time><span class="article-meta-dot"></span><span>${article.readingMinutes} min read</span></div>
      </header>
      <figure class="article-hero-image"><img src="${escapeAttr(article.heroImage)}" alt="${escapeAttr(article.heroImageAlt)}" fetchpriority="high" decoding="async"></figure>
      <div class="article-layout">
        <aside class="article-toc" aria-label="On this page"><p class="article-toc-label">On this page</p><ol class="article-toc-list">${toc.map((item) => `<li><a class="toc-h${item.level}" data-toc-link href="#${escapeAttr(item.id)}">${escapeHtml(item.label)}</a></li>`).join('')}</ol></aside>
        <article class="article-body" data-article-body>${article.bodyHtml}</article>
        <aside class="article-share-rail">
          <div class="article-share-group">
            <p class="article-share-label">Share</p>
            <div class="article-share-list">
              ${shareLinks.map((link) => `<a class="article-share-btn" href="${escapeAttr(link.href)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeAttr(link.label)}" title="${escapeAttr(link.label)}"><iconify-icon icon="${link.icon}" width="15"></iconify-icon></a>`).join('')}
              <button class="article-share-btn" type="button" data-copy-article-link aria-label="Copy link" title="Copy link"><iconify-icon icon="lucide:link" width="15"></iconify-icon></button>
            </div>
          </div>
          <div class="article-follow-group">
            <p class="article-share-label">Follow LunarTech</p>
            <ul class="article-follow-list">${FOLLOW_LINKS.map((link) => `<li><a class="article-follow-link" href="${escapeAttr(link.href)}" target="_blank" rel="noopener noreferrer"><iconify-icon icon="${link.icon}" width="14"></iconify-icon><span>${escapeHtml(link.label)}</span></a></li>`).join('')}</ul>
          </div>
        </aside>
      </div>
      <footer class="article-end"><div class="article-author"><div class="article-author-copy"><strong>${escapeHtml(article.author)}</strong><span>Research and practical guidance from the Octavia team.</span></div><a class="blog-read-link" href="/blog">All articles <span aria-hidden="true">→</span></a></div></footer>
    </div>
    <section class="related-articles" aria-label="Related articles"><div class="related-heading"><h2>Keep reading</h2><a class="blog-read-link" href="/blog/category/${escapeAttr(article.categorySlug)}">View category <span aria-hidden="true">→</span></a></div><div class="blog-grid">${related.map(card).join('\n')}</div></section>
    </main>`;
}

function normalizeShell(shell) {
  return shell
    .replace(/(src|href)="assets\//g, '$1="/assets/')
    .replace(/url\((['"]?)assets\//g, 'url($1/assets/');
}

function composePage(shell, { main, seo, title, description, assetPrefix = '/assets/' }) {
  let output = normalizeShell(shell);
  output = output.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  output = output.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escapeAttr(description)}">`);
  output = output.replace(/<!-- BLOG_SEO_START -->[\s\S]*?<!-- BLOG_SEO_END -->/, `<!-- BLOG_SEO_START -->\n    ${seo}\n    <!-- BLOG_SEO_END -->`);
  output = output.replace(/<!-- BLOG_CONTENT_START -->[\s\S]*?<!-- BLOG_CONTENT_END -->/, `<!-- BLOG_CONTENT_START -->\n    ${main}\n    <!-- BLOG_CONTENT_END -->`);
  output = output
    .replace(/(src|href)="\/assets\//g, `$1="${assetPrefix}`)
    .replace(/url\((['"]?)\/assets\//g, `url($1${assetPrefix}`);
  return output;
}

function writePage(relativePath, html) {
  const target = path.resolve(ROOT, relativePath);
  if (!target.startsWith(ROOT + path.sep)) throw new Error(`Unsafe output path: ${target}`);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html, 'utf8');
}

function generateFeed(articles) {
  const items = articles.map((article) => `<item><title>${escapeXml(article.title)}</title><link>${SITE_URL}/blog/${escapeXml(article.slug)}</link><guid>${SITE_URL}/blog/${escapeXml(article.slug)}</guid><pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate><description>${escapeXml(article.excerpt)}</description></item>`).join('');
  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Octavia Blog</title><link>${SITE_URL}/blog</link><description>Guides to AI dubbing and video localization.</description>${items}</channel></rss>`;
}

function generateSitemap(articles, categories, totalPages) {
  const rootPages = fs.readdirSync(ROOT, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.html') && entry.name !== 'blog.html')
    .map((entry) => ({ loc: entry.name === 'index.html' ? `${SITE_URL}/` : `${SITE_URL}/${entry.name.replace(/\.html$/, '')}` }));
  const dirPages = (dir) => (fs.existsSync(path.join(ROOT, dir))
    ? fs.readdirSync(path.join(ROOT, dir)).filter((file) => file.endsWith('.html')).map((file) => ({ loc: `${SITE_URL}/${dir}/${file.replace(/\.html$/, '')}` }))
    : []);
  const featurePages = dirPages('features');
  const audiencePages = dirPages('for');
  const urls = [...rootPages, ...featurePages, ...audiencePages, { loc: `${SITE_URL}/blog`, lastmod: articles[0].updatedAt }];
  for (let page = 2; page <= totalPages; page += 1) urls.push({ loc: `${SITE_URL}/blog/page/${page}`, lastmod: articles[0].updatedAt });
  for (const category of categories) urls.push({ loc: `${SITE_URL}/blog/category/${category.slug}`, lastmod: articles.find((article) => article.categorySlug === category.slug)?.updatedAt });
  for (const article of articles) urls.push({ loc: `${SITE_URL}/blog/${article.slug}`, lastmod: article.updatedAt });
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((item) => `<url><loc>${escapeXml(item.loc)}</loc>${item.lastmod ? `<lastmod>${String(item.lastmod).slice(0, 10)}</lastmod>` : ''}</url>`).join('')}</urlset>`;
}

function markdownToPortableText(markdown, slug) {
  let key = 0;
  const blocks = [];
  const chunks = markdown.replace(/\r/g, '').split(/\n\s*\n/).flatMap((chunk) => {
    const lines = chunk.split('\n').filter(Boolean);
    return lines.length > 1 && lines.every((line) => /^\s*(?:[-*]|\d+[.)])\s+/.test(line)) ? lines : [chunk];
  });
  for (const chunk of chunks) {
    const line = chunk.trim();
    if (!line || line === '---') continue;
    const heading = line.match(/^(#{2,4})\s+(.+)$/);
    const list = line.match(/^([-*]|\d+[.)])\s+(.+)$/s);
    const quote = line.match(/^>\s?(.+)$/s);
    const text = cleanText((heading?.[2] || list?.[2] || quote?.[1] || line).replace(/\n+/g, ' '));
    const blockKey = `${slug}-${key++}`;
    const markDefs = [];
    const children = [];
    const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
    let cursor = 0;
    let link;
    const addSpan = (spanText, marks = []) => {
      if (!spanText) return;
      children.push({ _type: 'span', _key: `${blockKey}-s${children.length}`, text: spanText.replace(/[*`]/g, ''), marks });
    };
    while ((link = linkPattern.exec(text))) {
      addSpan(text.slice(cursor, link.index));
      const markKey = `${blockKey}-link${markDefs.length}`;
      markDefs.push({ _key: markKey, _type: 'link', href: safeUrl(link[2]), blank: /^https?:/.test(link[2]) });
      addSpan(link[1], [markKey]);
      cursor = link.index + link[0].length;
    }
    addSpan(text.slice(cursor));
    blocks.push({ _type: 'block', _key: blockKey, style: heading ? `h${heading[1].length}` : quote ? 'blockquote' : 'normal', ...(list ? { listItem: /^\d/.test(list[1]) ? 'number' : 'bullet', level: 1 } : {}), markDefs, children });
  }
  return blocks;
}

function generateSeed(articles, categories) {
  const docs = [
    { _id: 'author-octavia-editorial-team', _type: 'author', name: 'Octavia Editorial Team', slug: { _type: 'slug', current: 'octavia-editorial-team' }, role: 'Editorial team' },
    ...categories.map((category) => ({ _id: `category-${category.slug}`, _type: 'category', name: category.name, slug: { _type: 'slug', current: category.slug } })),
    ...articles.map((article) => ({
      _id: `post-${article.slug}`, _type: 'post', title: article.title, slug: { _type: 'slug', current: article.slug }, excerpt: article.excerpt,
      author: { _type: 'reference', _ref: 'author-octavia-editorial-team' }, category: { _type: 'reference', _ref: `category-${article.categorySlug}` },
      publishedAt: article.publishedAt, updatedAt: article.updatedAt, featured: article.featured, fallbackImage: article.heroImage,
      body: markdownToPortableText(article.markdown, article.slug), seo: { _type: 'seo', metaTitle: article.title, metaDescription: article.metaDescription, focusKeyword: article.primaryKeyword },
    })),
  ];
  return docs.map((doc) => JSON.stringify(doc)).join('\n') + '\n';
}

async function main() {
  let articles;
  if (sourceArg === 'local') articles = parseLocalArticles();
  else {
    try {
      articles = await fetchSanityArticles();
      if (!articles.length) throw new Error('Sanity returned no published articles');
      console.log(`Loaded ${articles.length} articles from Sanity.`);
    } catch (error) {
      if (sourceArg === 'sanity') throw error;
      console.warn(`Sanity unavailable (${error.message}); using local Markdown.`);
      articles = parseLocalArticles();
    }
  }
  articles.sort((a, b) => Number(b.featured) - Number(a.featured) || new Date(b.publishedAt) - new Date(a.publishedAt));
  validateArticles(articles);
  console.log(`Validated ${articles.length} articles; ${articles.reduce((sum, article) => sum + article.bodyWordCount, 0).toLocaleString()} body words.`);
  if (validateOnly) return;

  const shell = fs.readFileSync(path.join(ROOT, 'blog.html'), 'utf8').replace(
    /\n\s*\/\* Blog editorial layout \*\/[\s\S]*?(?=\n\s*<\/style>\n\s*<link rel="stylesheet" href="\/assets\/octavia-mobile)/,
    ''
  );
  if (!shell.includes('BLOG_CONTENT_START') || !shell.includes('BLOG_SEO_START')) throw new Error('blog.html is missing generator markers');
  const categories = [...new Map(articles.map((article) => [article.categorySlug, { slug: article.categorySlug, name: article.category }])).values()].sort((a, b) => a.name.localeCompare(b.name));
  const totalPages = Math.ceil(articles.length / PAGE_SIZE);
  const description = 'Practical, in-depth guides to AI dubbing, video translation, voice technology, accessibility, and localization workflows.';

  for (let page = 1; page <= totalPages; page += 1) {
    const pageArticles = articles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    const pathName = page === 1 ? '/blog' : `/blog/page/${page}`;
    const title = page === 1 ? 'Octavia Blog | AI Dubbing & Video Localization' : `Octavia Blog — Page ${page}`;
    const html = composePage(shell, { title, description, seo: listingSeo({ page, totalPages, pathName, title, description, articles: pageArticles }), main: listingMain({ pageArticles, allArticles: articles, categories, page, totalPages }), assetPrefix: page === 1 ? 'assets/' : '../../../assets/' });
    writePage(page === 1 ? 'blog.html' : `blog/page/${page}/index.html`, html);
  }

  for (const category of categories) {
    const matches = articles.filter((article) => article.categorySlug === category.slug);
    const title = `${category.name} Articles | Octavia Blog`;
    const categoryDescription = `Practical ${category.name.toLowerCase()} guides for multilingual content teams.`;
    const seo = listingSeo({ page: 1, totalPages: 1, pathName: `/blog/category/${category.slug}`, title, description: categoryDescription, articles: matches });
    const mainHtml = listingMain({ pageArticles: matches, allArticles: matches, categories, activeCategory: category.slug, heading: `${escapeHtml(category.name)} <em>guides.</em>`, intro: categoryDescription });
    writePage(`blog/category/${category.slug}/index.html`, composePage(shell, { main: mainHtml, seo, title, description: categoryDescription, assetPrefix: '../../../assets/' }));
  }

  for (const article of articles) {
    const explicit = (article.relatedSlugs || []).map((slug) => articles.find((item) => item.slug === slug)).filter(Boolean);
    const fallback = articles.filter((item) => item.slug !== article.slug && item.categorySlug === article.categorySlug);
    const broader = articles.filter((item) => item.slug !== article.slug);
    const related = [...new Map([...explicit, ...fallback, ...broader].map((item) => [item.slug, item])).values()].slice(0, 3);
    writePage(`blog/${article.slug}/index.html`, composePage(shell, { main: articleMain(article, related), seo: articleSeo(article), title: `${article.title} | Octavia`, description: article.metaDescription, assetPrefix: '../../assets/' }));
  }

  fs.writeFileSync(path.join(BLOG_DIR, 'feed.xml'), generateFeed(articles), 'utf8');
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), generateSitemap(articles, categories, totalPages), 'utf8');
  fs.writeFileSync(path.join(ROOT, 'content', 'blog', 'catalog.json'), JSON.stringify(articles.map(({ bodyHtml, markdown, toc, ...article }) => article), null, 2) + '\n', 'utf8');
  fs.writeFileSync(path.join(ROOT, 'content', 'blog', 'sanity-seed.ndjson'), generateSeed(articles, categories), 'utf8');
  console.log(`Generated ${totalPages} index pages, ${categories.length} category pages, ${articles.length} article pages, RSS, sitemap, and Sanity seed data.`);
}

main().catch((error) => { console.error(error.message); process.exitCode = 1; });
