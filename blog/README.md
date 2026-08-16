# Octavia editorial system

The blog is a statically generated part of the existing Octavia site. It keeps the shared navbar and footer from `blog.html`, while the content and CMS machinery live outside the project root.

## Directory map

```text
assets/blog/                    Blog CSS, browser JavaScript, and images
content/blog/articles/         Deterministic Markdown source (22 articles)
content/blog/catalog.json      Generated content inventory
content/blog/sanity-seed.ndjson Generated Sanity import file
scripts/blog/                  Generator, validation, and environment settings
sanity-studio/                 Independent Sanity Studio project
blog/<slug>/index.html         Generated article pages
blog/page/<number>/index.html  Generated pagination
blog/category/<slug>/index.html Generated category indexes
blog/feed.xml                  Generated RSS feed
blog.html                      Generated first index page and shared HTML shell
sitemap.xml                    Generated blog sitemap
```

Generated URLs use Vercel's clean URL behavior: `/blog`, `/blog/page/2`, `/blog/<slug>`, and `/blog/category/<slug>`.

## Local content workflow

From the repository root:

```powershell
node scripts/blog/build.mjs --source=local --validate
node scripts/blog/build.mjs --source=local
```

The build stops if the collection does not contain exactly 22 articles, a body is shorter than 2,000 words, metadata is incomplete, a primary keyword is duplicated, a description exceeds 160 characters, or a local hero image is missing.

`blog.html` contains `BLOG_SEO` and `BLOG_CONTENT` marker pairs. The generator replaces only those blocks, leaving the site navbar, mobile navigation, footer, and their behavior intact.

## Sanity Studio setup

1. Copy `sanity-studio/.env.example` to `sanity-studio/.env.local` and add the project ID and dataset.
2. From `sanity-studio`, run `npm install` and `npm run dev`.
3. Build the local seed with `node ../scripts/blog/build.mjs --source=local`.
4. Import it with `npm run import:seed`. The command uses `--replace` so the stable seed document IDs can be updated safely on repeat imports.

The Studio article schema requires a title, slug, author, category, publication date, excerpt, SEO fields, and at least 2,000 Portable Text words. It also supports image alt text, hotspot cropping, related articles, feature selection, and updated dates.

## Building from Sanity

Copy `scripts/blog/.env.example` to `scripts/blog/.env`, or configure the same variables in the deployment environment:

```powershell
node scripts/blog/build.mjs --source=sanity
```

`--source=auto` tries Sanity when a project ID exists and otherwise falls back to the checked-in Markdown. A read token is necessary only for a private dataset. The token is read server-side by the generator and must never be shipped to browser JavaScript.

For publishing automation, create a Sanity webhook that triggers the site's Vercel deploy hook when an article, author, category, or site-setting document is published. Configure the deployment build command as:

```text
node scripts/blog/build.mjs --source=auto
```

The generated pages include canonical URLs, page-to-page `prev`/`next` links, Open Graph and Twitter metadata, `BlogPosting`, `BreadcrumbList`, and `ItemList` structured data, an RSS feed, and a sitemap.

## Editorial update rules

- Keep image files in `assets/blog/images/` with lowercase kebab-case names.
- Use one primary search phrase per article and avoid overlapping intent.
- Do not add an H1 inside Markdown; the template supplies it from the title.
- Use H2 and H3 headings, short paragraphs, meaningful link text, a practical checklist, and an FAQ where it helps the reader.
- Update `updatedAt` only for substantive changes and preserve the original `publishedAt`.
- Run validation before committing generated output.
