# Octavia blog agent

Generates full-length blog articles with DeepSeek and writes them directly into
`content/blog/articles/` in the shape `scripts/blog/build.mjs` expects.

The build validator hard-fails the **entire** collection on one bad article, so
the agent's job is not "produce text" — it is "produce a file that cannot break
the build". Everything below exists to make that true.

## Pipeline

For each topic:

```
draft ──▶ validate ──▶ repair (≤3 rounds) ──▶ metadata ──▶ validate ──▶ write
             │              │                                   │
             └── issues ────┘                                   └── retry ≤3
```

Nothing is written until the body clears the same checks the build applies. A
topic that cannot be made publishable fails on its own and leaves the rest of
the collection untouched.

## Files

| File | Role |
| --- | --- |
| `run.mjs` | Orchestrator: concurrency pool, repair loop, resume, reporting |
| `topics.mjs` | The topic briefs — slug, title, keyword, category, audience, angle, required coverage |
| `prompts.mjs` | House-style system prompt and the draft / repair / metadata prompts |
| `validate.mjs` | Quality gate; mirrors `build.mjs` and adds style and structure rules |
| `deepseek.mjs` | API client with retry, backoff, and truncation recovery |
| `images.mjs` | Assigns hero images, least-reused first |
| `american.mjs` | Mechanical British → American spelling normalization |
| `check-topics.mjs` | Pre-flight: catches slug/title/keyword collisions before spending tokens |
| `logs/` | Per-run JSON reports |

## Usage

```bash
# Pre-flight: verify the topic list against the existing collection
node scripts/blog/agent/check-topics.mjs

# Generate every topic that does not already have a file
node scripts/blog/agent/run.mjs --concurrency=6

# Options
--limit=N          only the first N pending topics
--only=slug,slug   only these slugs
--concurrency=N    parallel topics (default 4)
--repairs=N        repair rounds per article (default 3)
--force            regenerate topics whose file already exists
--dry-run          run the pipeline without writing files
```

The run is **resumable**: topics whose `.md` file already exists are skipped, so
an interrupted run can simply be re-invoked.

Then build the site as usual:

```bash
node scripts/blog/build.mjs --source=local --validate
```

Remember to update `EXPECTED_ARTICLES` at the top of `build.mjs` to the new
article count — the validator fails if it does not match.

## Configuration

`DEEPSEEK_API_KEY` is read from `scripts/blog/.env` (gitignored) or the
environment. `DEEPSEEK_MODEL` defaults to `deepseek-flash`.

`deepseek-flash` is a reasoning model: it spends completion tokens on
`reasoning_content` before emitting any `content`, so `max_tokens` has to cover
both. A response that ends with `finish_reason: "length"` and empty content
burned its whole budget on reasoning; the client detects this and retries with a
larger budget rather than failing.

## What the validator enforces

Mirrored from `build.mjs`, and therefore non-negotiable:

- body ≥ 2000 words (the agent targets 2500–2900 for margin)
- unique `slug`, `title`, `primaryKeyword` across the whole collection
- `metaDescription` ≤ 160 characters
- every required frontmatter field present, hero image exists on disk

Added by the agent, to keep the batch consistent with the existing corpus:

- 6+ `##` sections, 8+ `###` subsections, 6+ bullet points
- a `## Frequently asked questions` section and a `## Conclusion`
- 4–7 internal links, each path used at most once, from an allowlist
- no banned marketing phrases, no code fences, no `#` heading, no external links
- the primary keyword actually appears

## Design notes

**Revisions are scored, not counted.** An earlier version accepted a revision
whenever it had no more issues *or more words*, which meant an over-long article
could never be trimmed — every shorter revision was rejected. Acceptance now
uses `score()`: non-length issues dominate, with distance from the word band as
the tiebreak, so a revision is only kept when it is genuinely closer to
publishable.

**Repairs used to drop the internal links.** Asking the model to tighten a draft
reliably lost the links it had already placed, costing an extra round to put
them back. The repair prompt now lists the existing links, with their anchor
text, as things the revision must preserve.

**Spelling is fixed mechanically, not by the model.** British spellings are
normalized in `american.mjs` after generation. Routing them through the repair
loop would spend an API call on something a deterministic replacement handles
for free. Note that `practise` → `practice`, not `practize`, which is why it is
a word-list entry rather than a stem rule.
