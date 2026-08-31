---
{
  "title": "Translation Memory Database Design: Storing Segments You Can Actually Reuse",
  "slug": "translation-memory-database-design",
  "category": "Developer Guides",
  "primaryKeyword": "translation memory database design",
  "metaDescription": "How to design a translation memory store for video localization: segment matching, fuzzy match scoring, versioning, and schema choices that scale.",
  "excerpt": "A translation memory that only ever gives you exact matches is a lookup table. The value is entirely in the fuzzy matching, and that is the hard part to design.",
  "publishedAt": "2026-08-28T15:30:00Z",
  "updatedAt": "2026-08-28T15:30:00Z",
  "heroImage": "/assets/blog/images/gallery-glass-plinths.png",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

[![Server racks in a data centre](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## What a Translation Memory Actually Is

A translation memory is a store of previously translated segments, each paired with its source, kept so that the next time a similar segment appears it does not have to be translated from scratch.

For video localization specifically, the segments are usually subtitle cues or sentence-level transcript units, and the store accumulates across every video a channel or organisation produces. The value compounds: a recurring introduction, a repeated disclaimer, a product name used in every video, a phrase your presenter says in nearly every episode — each of these gets translated once and reused indefinitely rather than re-translated, and re-reviewed, every time it appears.

The distinction that matters for design is between an exact match and a fuzzy match. An exact match is character-for-character identical to something already translated, and reuse is trivial — a lookup. A fuzzy match is similar but not identical, and reuse requires judgement about whether the existing translation still applies and how much of it needs to change. Most of the design difficulty, and most of the value, is in fuzzy matching.

## Schema Fundamentals

**Store source and target as a linked pair, not as separate tables joined by a foreign key that can drift.** A translation unit is source text, target text, source language, target language, and metadata, kept together as one immutable record once approved.

**Segment at a stable granularity.** Sentence or subtitle-cue level is the usual choice, small enough to be reusable across contexts, large enough to carry meaningful matching signal. Word-level storage loses too much context to match usefully; paragraph-level storage rarely finds an exact repeat.

**Keep a context window, not just the isolated segment.** Storing the preceding and following segment alongside each unit lets you disambiguate matches where the same source sentence has legitimately different correct translations depending on what surrounds it — a common situation with short, generic phrases.

**Version every record.** A translation approved a year ago, corrected six months ago, and corrected again last week should have that history retrievable, not just the current state. When a terminology decision changes, you need to know what to re-review, and that requires knowing which segments used the old rendering and when.

**Store provenance.** Whether a unit came from human translation, machine translation with human review, or machine translation alone, and who approved it. Fuzzy match ranking should weight a human-reviewed unit more heavily than an unreviewed one, which requires the field to exist.

**Separate the memory from the glossary.** A translation memory holds sentence-level units; a glossary holds term-level entries with locked renderings. They serve different matching purposes and conflating them in one table produces awkward queries for both.

**Scope by domain and by project, but allow cross-scope search.** A term translated one way in marketing content and another way in legal content are both legitimate, and the memory needs to let a match come from the right scope by default while still surfacing a cross-scope match when nothing closer exists.

## Matching Strategy

**Exact match on normalised text first.** Normalise whitespace, punctuation variants, and case before comparing, since two segments differing only in a trailing space should count as identical.

**Fuzzy match needs a similarity metric appropriate to the content.** Edit distance at the character or token level is the traditional approach and works reasonably for short segments. For longer segments, token-level Jaccard or cosine similarity over a bag-of-words or n-gram representation scales better and is less sensitive to minor reordering.

**Embedding-based semantic similarity catches what edit distance misses.** Two sentences that are worded completely differently but mean the same thing will not match on edit distance at all, and will match well on embedding similarity. This is worth adding as a second signal rather than a replacement, because embedding similarity can also produce false positives — semantically close sentences that need genuinely different translations because of subtle differences in scope or emphasis.

**Set and expose a match threshold rather than hiding it.** A common convention is to bucket matches: above roughly 95% is treated as near-exact and needs minimal review, 75 to 95% is a fuzzy match worth showing to a reviewer with the differences highlighted, and below that the match is not useful enough to surface and a fresh translation is faster than editing it. These thresholds are conventions from the broader translation industry and are a reasonable starting point rather than a fixed rule — tune them against your own reviewers' judgement of what saves them time.

**Highlight the difference, not just the match.** A fuzzy match is only useful to a reviewer if they can see immediately what changed between the stored source and the new one. Computing and displaying a diff at the point of match is what makes a 90% match actually save time rather than requiring the reviewer to read both versions in full to find the difference themselves.

**Rank multiple candidate matches, do not just return the top one.** Where several stored segments are close matches, surfacing the best two or three with their scores lets a reviewer pick the one whose surrounding context best fits, particularly useful where the context window reveals that one candidate is a better fit than its raw similarity score suggests.

[![Automated dashboard with charts](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Indexing for Scale

**Exact match is a straightforward indexed lookup** on the normalised source text, and should stay fast regardless of memory size with an ordinary database index.

**Fuzzy match at scale needs approximate search, not brute-force comparison.** Comparing a new segment against every stored segment does not scale past a modest memory size. Token-based approaches can use inverted indexes, similar to search engines, to narrow candidates before computing exact similarity. Embedding-based approaches need a vector index supporting approximate nearest-neighbour search.

**Two-stage retrieval is the standard pattern.** Use a cheap, broad first pass — an inverted index or an approximate vector search — to retrieve a candidate set quickly, then apply the more expensive exact similarity computation only to that narrowed set. This keeps latency low without sacrificing match quality.

**Reindex incrementally, not in a full rebuild, as new segments are approved.** A memory that only picks up new content on a nightly batch rebuild means the segment translated an hour ago is not yet available to match against, which matters in an active production pipeline.

**Partition by language pair at minimum.** There is no value in searching English-to-French memory when translating English to German, and keeping them in separate indexes or partitions keeps each one smaller and faster.

## Handling Updates and Corrections

**A correction to an approved translation should not silently overwrite history.** Insert a new version, mark the old one superseded, and keep both queryable. This is what makes "which videos used the old rendering of this term" an answerable question rather than a forensic exercise.

**Propagating a correction is a deliberate operation, not automatic.** When a reviewer fixes a translation memory entry, decide explicitly whether that fix should retroactively flag every prior use of the old version for re-review, or apply only going forward. Silent retroactive application can overwrite content a customer has already approved; silent forward-only application means an error persists in workflows that happen to reuse an old cached match rather than querying the memory fresh.

**Track which finished assets consumed which memory version.** This is what makes retroactive updates tractable — without it, applying a terminology fix means searching every delivered asset for the old text rather than looking up a recorded dependency.

**Support merging memories from different sources** — an agency handover, an acquired product line's existing translations, a legacy system export — without silently overwriting better internal data with worse external data or vice versa. A merge needs the same provenance and quality signals as ordinary ingestion so the ranking logic can prefer the better source.

## Quality Signals to Store

**Reviewer identity and review date**, not just a boolean reviewed flag, so a stale review from a departed reviewer can be distinguished from a recent one from a trusted specialist.

**Usage count.** A segment reused successfully forty times is more trustworthy than one used once, and this is a useful tie-breaker when two candidates have similar similarity scores.

**Rejection history.** If a fuzzy match was previously surfaced to a reviewer and rejected in favour of a fresh translation, recording that discourages surfacing the same match again for a very similar segment, and can indicate the stored unit has a quality problem worth investigating.

**Domain and register tags.** A segment approved for casual creator content and one approved for formal enterprise training content may share source text and require different target text, and tagging by register lets matching respect that rather than treating all past translations as interchangeable.

[![Person reviewing dashboards on a monitor](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Integration With the Translation Pipeline

**Query the memory before invoking translation, not after.** Checking for a match first and only falling through to fresh translation for segments without a usable match is both cheaper and produces more consistent output, since the memory match is by definition consistent with prior approved work.

**Write back only approved output.** Machine-translated segments that have not been reviewed should either not enter the memory at all, or enter it explicitly flagged as unreviewed, so the ranking and threshold logic can treat them differently from human-approved content.

**Make the memory queryable independent of any single project's pipeline.** A memory embedded inside one video's processing job is not reusable across the organisation. Treat it as a shared service other projects and other content types can query, not as pipeline-local state.

**Export in a standard interchange format.** TMX is the established interchange format for translation memory and is worth supporting for import and export even if your internal storage is a different schema, because it is what lets you move data between an agency, a CAT tool, and your own system without a bespoke conversion each time.

## A Working Checklist

- Store source and target as a linked immutable pair per segment version.
- Segment at sentence or subtitle-cue granularity, with a stored context window.
- Version every record and keep superseded versions queryable, not deleted.
- Record provenance — human-translated, reviewed machine translation, or unreviewed — on every unit.
- Keep the translation memory and the terminology glossary as separate structures.
- Scope by project and domain while allowing cross-scope fallback search.
- Normalise text before exact matching.
- Combine token-level similarity with embedding-based semantic similarity for fuzzy matching.
- Bucket match quality into thresholds and tune them against reviewer feedback.
- Compute and display a diff alongside every fuzzy match.
- Return multiple ranked candidates, not only the top match.
- Use two-stage retrieval — cheap candidate generation, then precise scoring — for scale.
- Reindex incrementally as new segments are approved.
- Partition indexes by language pair.
- Decide explicitly, per correction, whether to propagate retroactively or only forward.
- Track which delivered assets consumed which memory version.
- Store reviewer identity, review date, usage count, and rejection history as ranking signals.
- Query the memory before invoking fresh translation.
- Write back only approved output, flagging unreviewed content distinctly.
- Support TMX import and export for interoperability.

## Frequently Asked Questions

**What is the difference between a translation memory and a glossary?**

A translation memory stores sentence or segment-level translations for reuse when similar text recurs. A glossary stores term-level entries — specific words or short phrases with a locked, approved rendering that should be used consistently wherever they appear. They serve different matching purposes: memory suggests whole reusable translations, glossary enforces specific vocabulary within any translation. Keep them as separate structures rather than one conflated table.

**What fuzzy match threshold should I use?**

Common industry convention treats above roughly 95% as a near-exact match needing minimal review, 75 to 95% as worth surfacing to a reviewer with differences highlighted, and below that as not useful enough to bother showing. These are starting points rather than fixed rules — the right threshold depends on your content and your reviewers, and it is worth tuning against actual feedback about which matches saved time and which wasted it.

**Should I use edit distance or embeddings for fuzzy matching?**

Both, as complementary signals. Edit distance and token-level similarity catch segments that are worded almost identically, which covers most real reuse in video content — recurring intros, disclaimers, product references. Embedding-based semantic similarity catches sentences that mean the same thing with completely different wording, which edit distance misses entirely. Neither alone is sufficient; together they cover more of the genuine reuse opportunity.

**How do I handle correcting a translation that has already been used in published content?**

Insert a new version rather than overwriting, and decide explicitly whether the correction propagates retroactively or applies only going forward — this should never happen silently either way. Retroactive propagation without review can overwrite content a customer already approved; forward-only application means the error persists wherever a cached match was already applied. Tracking which delivered assets consumed which memory version is what makes this decision tractable rather than a search through your entire catalogue.

**Does translation memory scale to a large catalogue?**

Yes, with the right indexing. Exact match is a straightforward lookup regardless of size. Fuzzy match needs approximate search rather than brute-force comparison against every stored segment — an inverted index for token-based similarity, a vector index for embedding-based similarity — retrieving a narrow candidate set cheaply before applying precise scoring only to that set. Partitioning by language pair keeps each index smaller and faster.

**Should unreviewed machine translation go into the memory?**

Only if explicitly flagged as such, and many teams choose to exclude it entirely. Feeding unreviewed output into the memory risks propagating an error every time that segment recurs, compounding rather than reducing the review burden. If you do include it, store provenance clearly enough that ranking logic can prefer human-reviewed matches over machine-only ones when both are available.

---

Related reading: [Video Translation Glossary Building](/blog/video-translation-glossary-building) | [Video Translation Terminology Extraction](/blog/video-translation-terminology-extraction) | [Localization Automation Guide](/blog/localization-automation-guide)
