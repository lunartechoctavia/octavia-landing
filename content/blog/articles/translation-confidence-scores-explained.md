---
{
  "title": "Confidence Scores in Transcription and Translation: What the Number Actually Means",
  "slug": "translation-confidence-scores-explained",
  "category": "Technical Guides",
  "primaryKeyword": "translation confidence scores",
  "metaDescription": "What confidence scores from transcription and translation systems actually measure, why high confidence doesn't mean correct, and how to route review with them.",
  "excerpt": "A confidence score is not a correctness score. Confusing the two is how obviously wrong output ends up published without review.",
  "publishedAt": "2026-08-28T19:00:00Z",
  "updatedAt": "2026-08-28T19:00:00Z",
  "heroImage": "/assets/blog/images/gauge-glass-dials.jpg",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

[![Person analysing metrics on a dashboard](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## What a Confidence Score Actually Measures

Most transcription and translation systems output a confidence score alongside their result — a number, usually presented as a percentage or a value between zero and one, that is widely and reasonably assumed to mean "how likely this is to be correct." That assumption is close enough to be a useful starting point and precise enough in its wrongness to cause real production problems if it goes unexamined.

**What the score actually reflects is the model's own estimate of its certainty given its internal representation of the input**, not an independent, ground-truth assessment of correctness. A model can be highly confident and simply wrong, particularly on inputs that resemble its training data in surface form but differ in the specific content that matters — a name it has never encountered rendered fluently but incorrectly, or a sentence structure it has seen many times applied to a meaning it has not.

**Confidence is calibrated against the training distribution, not against your specific content.** A model trained predominantly on broadcast news audio will produce confidence scores that are well calibrated for broadcast news and poorly calibrated for a noisy field recording or a domain-specific technical discussion, even if its actual accuracy on the latter is also lower — the model may not "know that it doesn't know," producing confidently wrong output on exactly the content types furthest from what it was trained on.

**For translation specifically, confidence often reflects fluency more than accuracy.** A translation system can be very confident about a grammatically fluent, natural-sounding sentence that is a subtly or completely incorrect rendering of the source meaning, because fluency is closer to what the underlying model was optimised to produce than meaning preservation is, and the two frequently but not always align.

## Where Confidence Scores Come From

Understanding the mechanism helps calibrate how much to trust the number in a given context.

**For transcription, confidence typically derives from the acoustic model's certainty about which sounds were spoken and the language model's certainty about which word sequence is likely**, combined into a per-word or per-segment score. Low acoustic confidence usually indicates genuinely ambiguous or degraded audio. Low language model confidence can indicate an unusual word sequence — which might be a transcription error, or might simply be unusual but entirely correct content, such as a technical term or a name.

**For translation, confidence generally derives from the model's estimated probability of the specific output sequence it generated**, which is a measure of how strongly the model favoured this output over alternatives it considered, not a measure of how well that output matches the source meaning. A model that has essentially one plausible way to phrase something will show high confidence regardless of whether that one way happens to be accurate.

**Some systems produce a single aggregate confidence per segment or per sentence; more sophisticated systems produce a score per word or per token**, which is considerably more useful for routing review effort, since it identifies specifically which parts of a sentence to check rather than flagging or clearing an entire segment uniformly based on one blended number.

[![Automated dashboard with charts](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Where Confidence Is Reliable and Where It Isn't

**Confidence scores are reasonably reliable at identifying genuine acoustic ambiguity** — audio that is quiet, noisy, overlapping, or otherwise degraded — because this is close to what the underlying models are actually measuring uncertainty about, and this is the case they were most directly designed to flag.

**Confidence scores are considerably less reliable at catching errors involving correctly-heard but incorrectly-transcribed or incorrectly-translated content** — a word substituted for a similar-sounding one, a name transcribed as a common word that sounds similar, a mistranslation that happens to be fluent — precisely the error categories most likely to produce genuinely wrong, published content that nobody flagged for review, because the model was confident about the wrong output for reasons unrelated to its actual correctness.

**Confidence is particularly unreliable on out-of-domain content**: names, technical terminology, brand names, and domain-specific jargon frequently produce high-confidence wrong output, because the model substitutes something plausible and common from its training distribution for something rare and specific that it has not seen enough to recognise reliably, and it does so with the same apparent certainty it would show for genuinely correct output on more familiar content.

**Confidence tends to correlate reasonably well with accuracy in aggregate across a large volume of content**, which is why it remains useful for statistical review routing at scale, even though it is a poor predictor of correctness for any single specific segment. This distinction — useful in aggregate, unreliable individually — is the single most important thing to understand about how to actually use these scores operationally.

## Using Confidence for Review Routing

This is the practical payoff, and it works well when the aggregate-versus-individual distinction above is respected.

**Route the lowest-confidence segments in a batch to human review first**, on the reasonable assumption that across a large volume, low-confidence segments as a group contain a meaningfully higher error rate than high-confidence segments as a group, even though any individual high-confidence segment could still be wrong and any individual low-confidence one could still be fine.

**Set a threshold based on measured outcomes on your own content, not a vendor default.** A threshold that works well for one content type and one language pair may route far too much or far too little for review on a different type and pair, and the only way to know is checking review outcomes against the confidence scores that triggered them for your specific pipeline.

**Never treat a high aggregate confidence score as a substitute for any review at all**, for content where an error has real consequences. Confidence-based routing is a way to prioritise limited review capacity toward where it is statistically more likely to be needed — it is not a certification that unreviewed high-confidence content is correct.

**Combine confidence with independent signals rather than relying on it alone.** Named entity detection flagging proper nouns for a specific check regardless of confidence, terminology matching flagging deviations from a locked glossary regardless of confidence, and length-ratio checks flagging translations that are implausibly short or long relative to the source are all signals that catch different error categories than confidence does, and layering them catches considerably more than confidence alone.

**Track your own calibration over time.** Periodically sample content across the confidence range — not just the low end — and measure actual error rates at each confidence band on your specific content, since this tells you whether your chosen threshold is actually doing what you assume it is doing, and whether it needs adjustment as your content mix shifts.

[![Person reviewing dashboards on a monitor](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Displaying Confidence to Reviewers

**Word or token-level confidence, shown visually — often as highlighting or underlining of lower-confidence spans within an otherwise normal-looking transcript or translation — lets a reviewer focus attention efficiently** rather than reading every word with equal scrutiny, which is both slower and, for long content, prone to the reviewer's own attention lapsing evenly across a whole passage regardless of where the actual risk is concentrated.

**Be careful the visual treatment does not train reviewers to only check flagged spans.** A reviewer who learns that unhighlighted text is reliably correct will, over time, stop meaningfully checking unhighlighted text at all, which reintroduces exactly the risk that confidence alone is unreliable for — the specific case of a confident, fluent, wrong result in unflagged text. Periodic full reviews independent of confidence flagging are worth maintaining specifically to counteract this learned inattention.

**Present the number itself cautiously if you show it at all to a non-technical reviewer.** A raw confidence percentage invites a misleading precision — "94% confident" sounds like a specific, well-founded probability of correctness in a way the underlying number does not actually support given everything above. A simpler categorical treatment — flagged for review versus not — that is derived from the number, rather than the raw number itself, often communicates the actual intended meaning more honestly.

## Confidence Scores and Automated Quality Gates

**Using an aggregate confidence threshold as an automated pass/fail gate for content going straight to publication without human review** is a defensible practice for low-stakes content at scale, provided the threshold has been validated against actual measured error rates on your content and is periodically re-validated, but it should be treated as a calculated risk decision made explicitly, not as a default assumption that high confidence equals acceptable quality.

**For higher-stakes content — anything regulated, brand-critical, or where an error has real consequences for a viewer** — a confidence gate should route content toward human review, not away from it, regardless of how high the score is, since the actual failure mode of concern for this content category is exactly the confident-but-wrong case that confidence scores are least reliable at catching.

**Document the threshold and its validation basis, not just its value**, so that a decision made based on a specific measured error rate on a specific content type at a specific point in time does not silently persist unchanged as your content mix, languages, or underlying models change in ways that would have justified revisiting it.

## A Working Checklist

- Understand that a confidence score reflects a model's estimated certainty, not an independent measure of correctness.
- Recognise that confidence is calibrated against the training distribution, which may not match your actual content.
- Expect confidence to be unreliable specifically on names, technical terms, and out-of-domain content.
- Use confidence scores for statistical review routing across a batch, not as a correctness verdict on any single segment.
- Set review thresholds based on measured error rates on your own content, not vendor defaults.
- Never treat high confidence as a substitute for any review on content where errors have real consequences.
- Combine confidence with independent signals: named entity checks, terminology matching, length-ratio checks.
- Periodically sample across the full confidence range to validate your threshold is still doing what you assume.
- Show word or token-level confidence to reviewers where possible, rather than one blended segment score.
- Guard against reviewers learning to only check visually flagged spans by maintaining periodic full reviews.
- Present confidence to non-technical reviewers as a category, not a falsely precise raw percentage.
- Treat any automated confidence-based publish gate as an explicit, documented, and periodically revalidated risk decision.
- Route higher-stakes content toward review regardless of confidence score, rather than using confidence to skip review.

## Frequently Asked Questions

**If a transcription or translation shows 95% confidence, does that mean it's 95% likely to be correct?**

Not directly, and treating it that way is a common and costly misreading. The number reflects the model's own estimated certainty given its internal representation, calibrated against its training data, not an independent measurement of accuracy on your specific content. It correlates with accuracy in aggregate across large volumes, which makes it useful for prioritising review, but any single high-confidence result can still be wrong, particularly on names, technical terms, or content that differs from what the model was trained on.

**Why does my transcription system show high confidence for names it clearly got wrong?**

Because the model substituted a common, plausible word from its training distribution for a rare one it has not seen enough to recognise reliably, and it can do so with the same apparent certainty it shows for genuinely correct output on familiar content. This is one of the most consistent blind spots in confidence scoring — out-of-domain content, especially proper nouns, frequently produces confidently wrong results that confidence-based review routing alone will not catch.

**How should I use confidence scores to decide what to review?**

Route the lowest-confidence segments in a batch to review first, since across large volumes they contain a meaningfully higher error rate as a group. Set the actual threshold from measured outcomes on your own content rather than a vendor default, and combine it with independent checks — terminology matching, named entity flagging, length-ratio checks — that catch error categories confidence alone misses. Never let a high aggregate score substitute for any review on content where errors carry real consequences.

**Should I ever publish content based purely on a confidence score with no human review?**

Only as an explicit, documented risk decision for low-stakes content, with the threshold validated against actual measured error rates on your specific content and revisited periodically as your content mix or underlying models change. For regulated, brand-critical, or otherwise consequential content, a confidence gate should route toward human review rather than away from it, because confident-but-wrong output is precisely the failure mode confidence scores are least reliable at catching.

**Is confidence scoring different for transcription versus translation?**

The mechanism differs but the core limitation is the same. Transcription confidence derives largely from acoustic and language model certainty about the word sequence, and is fairly reliable at flagging genuine audio ambiguity. Translation confidence generally reflects how strongly the model favoured its chosen output over alternatives, which tracks fluency more closely than it tracks meaning preservation — so a fluent, confident, subtly wrong translation is a real and common failure mode that confidence scores do not reliably surface.

**How do I know if my confidence threshold is actually working?**

Periodically sample content across the full confidence range, not just near your threshold, and measure actual error rates at each band against your specific content and languages. This tells you whether flagged content genuinely has a higher error rate than unflagged content in practice, and by how much, which is the only way to know if the threshold you set is doing what you assumed rather than just producing a comfortable-looking review queue.

---

Related reading: [Forced Alignment Explained](/blog/forced-alignment-explained) | [Localization Quality Assurance Checklist](/blog/localization-quality-assurance-checklist) | [Video Translation Quality Metrics](/blog/video-translation-quality-metrics)
