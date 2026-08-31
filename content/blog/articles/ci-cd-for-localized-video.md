---
{
  "title": "CI/CD for Localized Video: Treating Language Assets Like Code",
  "slug": "ci-cd-for-localized-video",
  "category": "Developer Guides",
  "primaryKeyword": "CI/CD for localized video",
  "metaDescription": "How to put localized video and subtitle assets under version control, automated validation, and continuous delivery without inventing a bespoke pipeline.",
  "excerpt": "Subtitle tracks are text files with a strict grammar. There is no good reason they live in a shared drive instead of a repository.",
  "publishedAt": "2026-08-27T12:00:00Z",
  "updatedAt": "2026-08-27T12:00:00Z",
  "heroImage": "/assets/blog/images/sequential-glass-gears.png",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

[![Code repository view on a laptop screen](https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## The Problem With Shared Drives

Most localized video programmes store assets the way the first person to need somewhere to put them decided. A folder per language, a folder per project, filenames with versions in them, and an implicit convention that everyone half-remembers.

This holds up until roughly the point where three things are true at once: more than a handful of languages, more than one person editing, and content that gets revised after release. Then the characteristic failures start.

Nobody can tell which subtitle file matches which cut of the video. Two people edit the same track and one set of corrections is lost. A reviewer's fix is applied to a file that has already been superseded. A track is published with the wrong language code and nobody notices for a month. A regenerated dub silently replaces a version that had manual corrections in it.

None of these are localization problems. They are version control problems, and software teams solved them decades ago. Subtitle files are plain text with a strict grammar, translation memories are structured data, glossaries are key-value stores, and rendering pipelines are build steps. The whole shape of the problem is familiar.

The reason it does not get treated that way is usually organisational — the assets belong to a content team, not an engineering team — rather than technical.

## What Belongs in the Repository

Not everything. The distinction is between things that are authored and things that are produced.

**Author, and version:**

- Source transcripts, after review
- Translated subtitle tracks, including manual corrections
- Terminology glossaries and do-not-translate lists
- Voice assignment and speaker mapping configuration
- Per-language style settings: formality, reading speed limits, line length caps
- Job configuration: which languages, which outputs, which quality gates
- The review brief for each language

**Produce, and do not version:**

- Rendered video files
- Generated audio tracks
- Burned-in subtitle renders
- Thumbnails and derived images

Media files are large, binary, and reproducible from their inputs. Putting them in a repository makes clones slow and diffs meaningless. They belong in object storage, keyed by a content hash or a build identifier that ties them back to the commit that produced them.

Large-file extensions to version control exist and can be made to work, but the better instinct is to keep the repository small and text-only and treat rendered media as build artefacts. If you can regenerate it deterministically from what is in the repository, it does not need to be in the repository.

The source video itself is the edge case. It is an input, not an output, and it is large. Store it in object storage with a stable identifier, and version the identifier.

## Validation as a Pull Request Check

This is the part that pays for itself fastest, because subtitle problems are cheap to detect automatically and expensive to find after publication.

Checks worth running on every change:

**Format validity.** Does every file parse? Are timecodes well-formed, monotonic, and non-overlapping? Is the encoding UTF-8 without a BOM?

**Reading speed.** Does any cue exceed the characters-per-second limit for its language? This is the single most common quality failure and it is trivially checkable.

**Line length and count.** Are cues within the configured character-per-line and lines-per-cue limits?

**Timing bounds.** Any cue shorter than the minimum display duration, longer than the maximum, or extending past the end of the media?

**Language identification.** Does the content of a file tagged `de` actually look like German? A cheap language detector catches the mislabelled-file class of error, which is otherwise found by a customer.

**Terminology compliance.** Do the locked glossary terms appear in their approved forms? Do any do-not-translate terms appear translated?

**Track parity.** Does every language in the target list have a track? Does every track have the same number of cues as the source, within a tolerance, or has a segment been dropped?

**Placeholder and markup integrity.** Do variable placeholders, inline tags, and positioning tags survive intact and in the right count?

These run in seconds on text files and catch a large share of what would otherwise reach a human reviewer or, worse, a viewer. The reviewer's time then goes to judgement questions — register, tone, terminology choice — rather than mechanical defects.

[![Automated dashboard with charts](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Branching and Review

The workflow that works is unremarkable, which is the point.

**A branch per change.** A new language, a content revision, a terminology update, a batch of reviewer corrections. Each is a branch with a clear scope.

**Automated checks on the branch.** Everything above, run on push, blocking merge on failure.

**Human review as pull request review.** The linguistic reviewer looks at a diff. This is a substantial improvement over reviewing a whole file, because on a revision they see only what changed. Corrections are comments; the discussion stays attached to the line.

**Merge to a main branch that represents publishable state.** Whatever is on main is what should be live.

**Deploy on merge.** Merging triggers the render and publish pipeline.

The reviewer-facing part of this is the piece that needs care. Linguistic reviewers are not usually comfortable with git, and demanding that they learn it will fail. The workable arrangements are either a web interface over the repository — most hosted git platforms have adequate in-browser editing and review — or a lightweight review tool that reads and writes the repository on their behalf. The version control is for the system's benefit; the reviewer should experience a review queue.

## The Build Pipeline

What runs on merge, in order:

**Resolve inputs.** Fetch the source media by identifier, load configuration, load glossaries.

**Generate what is missing.** Any language without an existing reviewed track gets translated and, where required, voiced. Anything already reviewed is used as-is — this is the critical rule, because a pipeline that regenerates everything on every run destroys manual corrections.

**Render outputs.** Burn-in variants, muxed audio tracks, platform-specific packages.

**Validate outputs.** Duration match, audio track presence, loudness compliance, subtitle track language tagging in the container.

**Publish.** Upload to platforms and CDN, update metadata, register the build identifier against the commit.

**Record provenance.** What was generated, from what commit, with what configuration, at what time. This is what makes "which version of the German track is live" answerable.

The idempotency requirement deserves emphasis. Running the pipeline twice on an unchanged commit must produce the same result and must not regenerate reviewed assets. The natural implementation is content-addressed caching: hash the inputs to each stage, and skip stages whose inputs are unchanged.

## Handling Source Changes

The hardest recurring problem in a localized video programme is not the initial translation. It is what happens when the source video is re-cut.

Thirty seconds of a ten-minute video changes. Every language track is now partially wrong. Regenerating all of them discards reviewed work; leaving them alone ships incorrect content.

Treating assets as versioned text makes the good answer available:

**Diff the source transcript.** Determine exactly which segments changed. Segment-level diffing on a reviewed transcript is precise in a way that comparing media files is not.

**Invalidate only affected segments** in each target track.

**Regenerate those segments**, keeping everything else.

**Send only the changed segments for review.** The reviewer sees a small diff, not a whole track.

**Re-render and republish.**

This is the same incremental-build logic a compiler uses, and it turns a re-cut from a full re-localization into a proportionate change. The prerequisite is stable segment identifiers that survive across versions, which is a modelling decision worth making early.

[![Developers collaborating at a workstation](https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Environments and Rollback

**A staging environment** where builds are published to a private location for review before going live. For video this matters more than for text, because problems like audio sync and burn-in collision are only visible in the rendered output.

**Rollback by redeploying a previous commit.** Because outputs are reproducible from inputs, reverting is a git revert and a rebuild rather than a scramble to find the old file.

**Retention of build artefacts** for long enough to roll back without rebuilding. Rendering a large catalogue takes real time; keeping the previous build available makes rollback immediate.

**Per-language deployment gates** where markets have different approval requirements. Regulated markets often need sign-off that others do not, and holding the whole release for one market's legal review is a bad default. Language-level gating lets approved languages ship.

## A Working Checklist

- Put transcripts, translated tracks, glossaries, and configuration in version control.
- Keep rendered media out of the repository; store it in object storage keyed to a build identifier.
- Validate format, timing, reading speed, line limits, and encoding on every change.
- Run automatic language identification to catch mislabelled tracks.
- Check terminology compliance and placeholder integrity automatically.
- Verify track parity across languages before merge.
- Give reviewers a diff, not a whole file, and a web interface rather than a git client.
- Never regenerate a reviewed asset automatically.
- Make the pipeline idempotent with content-addressed caching.
- Record provenance linking every published asset to a commit and configuration.
- Diff source transcripts at segment level and regenerate only affected segments after a re-cut.
- Use stable segment identifiers that survive source revisions.
- Publish to staging and review rendered output before going live.
- Keep previous build artefacts so rollback does not require a rebuild.
- Gate deployment per language where market approval requirements differ.

## Frequently Asked Questions

**Should video files go in version control?**

No. They are large, binary, and reproducible from their inputs, so versioning them makes clones slow and diffs useless. Store rendered media in object storage keyed by a build identifier that ties back to the commit that produced it. Source media is an input rather than an output, so store it in object storage too and version the stable identifier that points at it.

**Will linguistic reviewers accept a git-based workflow?**

Not if you hand them a git client. They will accept a review queue that shows what changed and lets them comment or correct in place. Most hosted git platforms provide adequate in-browser review, and a thin tool over the repository works where they do not. Version control is an implementation detail that should not surface in the reviewer's experience.

**How do we stop the pipeline overwriting manual corrections?**

Make reviewed status an explicit property of each asset, and have the generation step skip anything marked reviewed. Combine that with content-addressed caching so unchanged inputs never trigger regeneration. The failure mode of a pipeline that regenerates everything on every run is that corrections silently disappear, and it usually goes unnoticed until a customer reports the same error twice.

**What is the highest-value automated check?**

Reading speed. It is the most common subtitle quality failure, it is objectively measurable, it varies by language in ways reviewers do not always internalise, and it takes milliseconds to compute. Language identification on the track content is a close second, because it catches mislabelled files that are otherwise found in production.

**How do we handle a re-cut of the source video?**

Diff the reviewed source transcript at segment level to find exactly what changed, invalidate only the corresponding segments in each target language, regenerate those, and send only the changed segments for review. This requires stable segment identifiers that persist across source versions — a modelling decision worth making before you need it.

**Is this overkill for a small catalogue?**

For a handful of videos in two languages, probably. The threshold where it starts paying is roughly when you have more languages than you can hold in your head, more than one person editing, or content that gets revised after release. Below that, a disciplined folder structure is fine. Above it, the failures the folder structure produces are the ones that cost most to unwind.

---

Related reading: [Localization Automation Guide](/blog/localization-automation-guide) | [Video Translation Batch Workflow](/blog/video-translation-batch-workflow) | [Video Translation Maintenance](/blog/video-translation-maintenance)
