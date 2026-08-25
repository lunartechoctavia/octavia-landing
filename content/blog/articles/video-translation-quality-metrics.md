---
{
  "title": "Video Translation Quality Metrics: Measuring What Actually Matters",
  "slug": "video-translation-quality-metrics",
  "category": "Localization",
  "primaryKeyword": "video translation quality metrics",
  "metaDescription": "How to measure video translation quality: error typology, sampling methodology, automated checks, audience signals, and building a defensible quality score.",
  "excerpt": "Most localization programs measure whether work was delivered, not whether it was good. The two are easy to confuse and produce very different decisions.",
  "publishedAt": "2026-08-20T11:25:00Z",
  "updatedAt": "2026-08-20T11:25:00Z",
  "heroImage": "/assets/blog/images/twin-quality-panels.png",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

[![Measuring video translation quality](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Delivery Is Not Quality

Ask a localization program how it is performing and the answer is usually a volume figure: assets completed, languages covered, minutes processed.

These measure activity. They say nothing about whether the output serves its audience, and a program can post excellent volume figures while producing content that native speakers find awkward or that viewers abandon.

The gap persists because quality is harder to measure than volume. Volume is counted automatically; quality requires either human judgment, which is expensive, or proxy signals, which are indirect. Faced with this, many programs measure what is easy and describe it as performance.

A workable quality measurement approach combines three layers: structured human evaluation on a sample, automated checks across everything, and audience behaviour signals. Each has blind spots the others cover.

## An Error Typology

Structured evaluation requires a shared vocabulary for what is wrong. Without one, reviewer feedback is inconsistent and cannot be aggregated.

A workable typology for video translation covers these categories:

**Accuracy errors.** The translation says something the source did not, omits something the source said, or reverses meaning. This includes mistranslation, omission, addition, and untranslated content left in the source language.

**Terminology errors.** A term is rendered incorrectly, inconsistently, or against the approved glossary entry.

**Language errors.** Grammar, spelling, punctuation, and syntax faults in the target language.

**Register and style errors.** The formality level is wrong for the audience, the tone does not match the content type, or the text reads as translated rather than natural.

**Locale errors.** Numbers, dates, currency, units, addresses, or formats do not follow target-market convention.

**Timing errors.** Audio does not align with video, subtitles appear or clear at the wrong moment, or reading speed exceeds limits.

**Audio errors.** Mispronunciation, wrong emphasis, inappropriate prosody, level inconsistency, or artifacts.

**Technical errors.** Encoding problems, missing glyphs, malformed files, broken line breaks, or rendering faults.

**Completeness errors.** On-screen text untranslated, missing segments, or absent accessibility tracks.

Each error should also carry a severity: **critical** where it changes meaning, creates legal or safety risk, or makes content unusable; **major** where it noticeably damages quality or credibility; **minor** where it is a polish issue that most viewers would not notice.

Severity matters more than count. Twenty minor style preferences are less significant than one critical accuracy error, and a scoring system that weights them equally produces misleading conclusions.

## Sampling Methodology

Full review does not scale, so quality measurement depends on sampling — and sampling done badly produces confident wrong answers.

**Sample randomly.** Reviewing the assets that are convenient, recent, or already suspected of problems produces a biased estimate. Random selection within each batch is what makes the result generalizable.

**Sample enough.** A single asset tells you almost nothing. The sample needs to be large enough that the error rate estimate is meaningful, which depends on how variable the output is. Start larger and reduce as the process demonstrates stability.

**Sample per language.** Quality varies substantially by language pair, and an aggregate figure hides a language that is performing badly. Each language needs its own estimate.

**Sample per content type.** Technical content and marketing content have different error profiles, and mixing them produces an average that describes neither.

**Review whole assets, not fragments.** Some error classes — timing drift, register inconsistency, terminology variation — only appear across a full asset. Reviewing the first two minutes of many assets misses them systematically.

**Re-sample after changes.** Any change to glossary, voice, pipeline, or provider invalidates prior quality estimates. Raise the sampling rate after a change and reduce it once stability is re-established.

Record the sampling rate alongside the quality figure. A quality score without the sample size and method behind it is not interpretable.

## Automated Checks

Some quality dimensions can be checked mechanically across every asset, and these should be, because they catch a meaningful error class at near-zero marginal cost.

**Glossary compliance.** Whether approved terms appear and whether forbidden ones do. For inflected languages this requires morphological awareness rather than string matching.

**Reading speed.** Characters or words per second against the target limit, flagged per subtitle cue.

**Line length and count.** Against platform specification.

**Timing validity.** Overlapping cues, negative durations, gaps, and cues extending beyond the video duration.

**Duration comparison.** Translated audio duration against source duration, flagging assets that deviate beyond a threshold — a strong signal of timing problems.

**Encoding and character validity.** Correct encoding, absence of replacement characters, and glyph coverage for the target script.

**Completeness.** Segment count against source, presence of expected tracks, and detection of untranslated source-language text remaining in the output.

**Level consistency.** Audio loudness against target and variation across the asset.

These checks should run as a gate before human review, so that reviewers spend their attention on judgment rather than on catching mechanical faults. An asset failing automated checks should not consume reviewer time until it passes.

Automated checks do not measure whether a translation is good. They measure whether it is malformed, which is a different and cheaper question.

## Audience Signals

Behavioural data from viewers measures something human review cannot: whether the content actually worked.

**Completion rate relative to the source version** is the most informative single signal. A localized asset completing substantially below its source has a problem, and the shape of the drop-off indicates what kind.

**Early drop-off** points to an opening problem — a weak hook, an off-putting voice, or an immediately visible quality issue.

**Steady mid-content drop-off** suggests sustained comprehension difficulty or register mismatch.

**Rewind and replay behaviour** where available indicates passages viewers found unclear, which localizes the problem precisely.

**Subtitle toggle behaviour** on dubbed content is informative: viewers turning subtitles on during dubbed audio may be struggling with the audio.

**Support contacts and comments** in the target language surface specific complaints, and terminology complaints in particular tend to be reported by audiences who care.

**Task outcomes** where applicable — completion of a course, successful use of a product, conversion — measure whether the content achieved its purpose rather than whether it was watched.

Audience signals lag and are noisy, and they conflate content quality with translation quality. A localized asset that performs poorly may have a translation problem or may simply be content that does not interest that market. Compare against the source baseline and look for divergence rather than absolute performance.

## Building a Composite View

No single number captures translation quality honestly, but a small dashboard can.

Track, per language and per content type:

**Error rate by severity** from sampled review, expressed per unit of content rather than per asset so that assets of different lengths are comparable.

**Automated check pass rate**, which should approach complete and where any failure indicates a process gap.

**Completion rate ratio** against the source version.

**Post-publication error rate** — errors found after release, which measures how well the sampling is working. A large gap between sampled error rate and post-publication error rate means the sampling is missing things.

**Cycle time**, which is not a quality measure but correlates with one: programs under time pressure cut review.

Report these together. A program with low sampled error rate, high automated pass rate, and completion parity with source is performing. One with low sampled error rate and poor completion has a problem the sampling is not detecting — usually register, voice, or cultural fit, which reviewers focused on accuracy do not flag.

## Reviewer Calibration

Human evaluation is only consistent if reviewers apply the same standard, and they will not by default.

Reviewers differ in strictness, in what they consider an error versus a preference, and in how they assign severity. Two reviewers assessing the same asset can produce error counts differing by a factor of three.

Calibration practices that help:

Give reviewers the typology and severity definitions explicitly, with examples of each.

Have multiple reviewers assess the same asset periodically and compare results. Divergence indicates that the standard is not shared and needs clarifying.

Distinguish errors from preferences explicitly in the review form. Reviewers frequently flag stylistic preferences as errors, which inflates counts and obscures real problems.

Provide the glossary and the register decision, so reviewers are not re-litigating settled questions.

Ask for severity on every finding. Reviewers who are not asked will not distinguish, and the resulting data cannot be triaged.

## Using the Data

Quality measurement is only worth its cost if it changes decisions.

**Rising error rate in a language** indicates a problem with that language pair — the reviewer, the voice, the terminology, or the underlying translation quality. It should trigger investigation rather than more review.

**Errors clustering in a category** point to a systematic cause. Terminology errors concentrated in one area mean the glossary is incomplete there. Timing errors concentrated in one content type mean the segmentation approach does not suit it.

**Post-publication errors escaping sampling** mean the checks need adjusting, and the specific escape should become a new check.

**Completion divergence without corresponding review findings** means the review is measuring the wrong thing, usually accuracy when the problem is register or voice.

Feed every finding back into the process. A quality programme that produces reports nobody acts on is a cost centre; one where findings change the glossary, the checks, or the reviewer brief pays for itself.

## Comparing Providers and Approaches

Quality measurement earns its keep most clearly when it is used to make a comparison decision rather than to monitor an ongoing process.

To compare providers, process the same content through each, using the same glossary and the same specification. Then have the same reviewers assess the outputs blind — without knowing which provider produced which — using the shared typology and severity scale.

Blinding matters more than it might appear. Reviewers who know which output came from which source find more errors in the one they expect to be worse, and the effect is large enough to reverse a genuine quality difference.

Use enough content to be meaningful. A single asset produces a result that reflects the asset as much as the provider, and content varies enough that one sample is not informative.

Include the content types you actually produce rather than a generic sample, since providers differ in where their strengths lie and a comparison on unrepresentative material predicts nothing.

Weight by severity rather than counting errors. A provider producing more minor style flags and fewer critical accuracy errors is the better choice, and raw error counts would rank it lower.

Factor in the cost of correction, not just the error count. Output that is wrong in easily fixable ways is more valuable than output that is wrong in ways requiring rework, even at similar error rates.

The same method applies to comparing approaches rather than vendors — machine output versus post-edited output, one voice versus another, or a change in the glossary.

## Starting Simple

A full measurement programme is not the place to begin.

Start with automated checks, which are cheap and catch the mechanical error class immediately.

Add a modest random sample with a simple typology and severity ratings, reviewed per language.

Add completion rate comparison against source, which requires no additional review effort.

Establish the baseline, then look for divergence rather than absolute targets. The useful question is whether quality is improving or degrading relative to where it was, not whether it hits an externally defined score.

Report honestly upward. Quality data is frequently requested by stakeholders who want reassurance rather than information, and there is pressure to present a figure that looks good. A quality programme that reports only favourable numbers stops being a control and becomes a formality, and the errors it was built to catch reach audiences instead.

Resist the pull toward a single score. Composite quality scores are appealing because they compress the picture into one number that can be tracked and reported, and they mislead for the same reason. A score that combines accuracy, timing, and audience signal into one figure moves for reasons the figure cannot explain, and the response to it is guesswork. Keep the components visible.

Expand the programme only where the data suggests a blind spot. Measurement that does not change a decision is overhead, and the goal is a small set of numbers that reliably tell you when something has gone wrong.
