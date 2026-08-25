---
{
  "title": "Subtitle Reading Speed and Segmentation",
  "slug": "subtitle-reading-speed-guide",
  "category": "Technical Guides",
  "primaryKeyword": "subtitle reading speed",
  "metaDescription": "How characters-per-second limits, line length, and segmentation determine whether subtitles are readable, and how to fix output that exceeds them.",
  "excerpt": "Most bad subtitles are not mistranslated. They are unreadable, which is a different problem with a different fix.",
  "publishedAt": "2026-08-26T18:30:00Z",
  "updatedAt": "2026-08-26T18:30:00Z",
  "heroImage": "/assets/blog/images/metered-glass-lines.jpg",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

[![Video player displaying subtitles on screen](https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## The Failure Nobody Names

Ask why a set of subtitles is bad and most people will say the translation was poor. Frequently it was not. The translation was accurate, complete, and faithful — and there was too much of it on screen for too little time.

Reading speed is the quality dimension that determines whether subtitles work, and it is the one most often absent from review processes. A reviewer reading a subtitle file as a document sees correct sentences. A viewer watching the video sees text vanish before they finish it.

This matters more in localized video than in same-language captioning, because translation expands text while the display duration stays fixed to the original audio. Accurate translation plus fixed timing produces unreadable subtitles as a matter of arithmetic, not as a matter of quality.

## Characters Per Second

The standard measure is characters per second — the subtitle's character count divided by its display duration. It is a proxy for reading effort, and it is what broadcasters, streaming platforms, and accessibility regulators specify.

Common working figures, which vary by market and platform:

**Around 12 to 15 characters per second** is a widely used comfortable range for adult viewers in Latin-script languages. Many broadcast specifications sit near the lower end.

**Around 17 characters per second** is a common upper bound for adult content on streaming platforms, above which readability degrades noticeably.

**Around 9 to 12 characters per second** is typical for children's content, where reading is slower and comprehension matters more.

**CJK languages use different scales** because each character carries more information. Limits are expressed in characters per second at much lower numbers, and comparing a Japanese figure to an English one directly is meaningless.

Two practical cautions. First, always check the specification your platform or client actually requires rather than assuming a general figure; requirements differ and non-compliance is a delivery failure regardless of quality. Second, characters per second is a proxy, not a truth — a dense technical sentence at 14 characters per second is harder than a conversational one at 16.

## Minimum and Maximum Durations

Reading speed is bounded on both sides.

**Minimum duration** exists because the eye needs time to register that a subtitle appeared at all. Subtitles flashing for under roughly a second are perceived as flicker rather than text, even when the character count is tiny. A common floor is around one second, sometimes a little less for very short cues.

**Maximum duration** exists because a subtitle left on screen after the viewer has read it becomes a distraction, and because it can outlive the shot it belongs to. Around six to seven seconds is a common ceiling.

**Gaps between subtitles** matter too. Consecutive cues with no gap can read as one continuous block, and a minimum gap of a couple of frames helps the viewer register the change.

These constraints interact with reading speed in ways that force decisions. A short line with a long display duration wastes screen time; a long line with a short duration is unreadable. Where both problems appear in sequence, the fix is usually resegmentation rather than adjustment of individual cues.

[![Editor reviewing subtitle timing on a timeline](https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Line Length and Line Count

Two lines is the conventional maximum for subtitles, with a per-line character limit commonly set around 37 to 42 characters for Latin scripts depending on the specification.

The reasoning is spatial and cognitive. Three lines occupy too much of the frame and obscure the image. Lines longer than about 42 characters require horizontal eye movement that slows reading and pushes text toward the frame edges where it may be cropped on some displays.

Practical points:

**Balance the two lines.** A first line of 40 characters and a second of 6 reads worse than two lines of 23. Rough balance, with the first line slightly longer or equal, is the convention.

**Never let a line break fall inside a syntactic unit.** Breaking between an article and its noun, between a preposition and its object, or inside a name forces the reader to hold an incomplete phrase across the break. Break at clause boundaries, before conjunctions, or between complete phrases.

**Non-Latin scripts need their own limits.** CJK subtitles use far fewer characters per line. Scripts with combining marks above and below the baseline — Devanagari, Tamil, Thai, Yoruba with tone marks — need increased line height rather than more characters.

**Right-to-left scripts need alignment and break-order handling** that many rendering paths get wrong by default.

## Segmentation

Segmentation — deciding where one subtitle ends and the next begins — is where most readability is won or lost, and it is the thing automated systems handle least well by default.

The naive approach segments on sentence boundaries or on audio pauses. That produces subtitles that are correct and frequently unreadable, because sentence length and reading capacity are unrelated.

Better principles:

**Segment on meaning, not on punctuation.** Each subtitle should be a coherent chunk the viewer can process as a unit.

**Respect shot boundaries.** A subtitle spanning a cut makes the viewer re-read, because the visual change signals new information. Where possible, end subtitles at cuts.

**Split long sentences across cues at natural syntactic joints**, keeping each cue independently parseable.

**Merge short exchanges** where two brief cues in quick succession would each fall below the minimum duration.

**Do not preserve source segmentation blindly.** Translated text has different length and different syntax, and the segmentation that worked for the source frequently does not work for the target. Resegmenting during translation is legitimate and often necessary.

That last point is the one that most often needs stating explicitly. Many workflows treat the source subtitle file's timing as fixed and translate cue by cue. That guarantees reading-speed failures in any expanding language, because the text grew and the container did not.

## Fixing Output That Exceeds the Limits

When a subtitle set fails reading speed, there are four fixes in rough order of preference.

**Condense the text.** Subtitling is a compression discipline. Good subtitles routinely drop redundancy that dubbing would keep — filler, repeated names, hedges, discourse markers, and information already carried by the picture. Condensing is not a loss of fidelity; it is the form working as intended.

**Resegment.** Redistribute text across cues, extend a cue into an adjacent gap, or split a dense cue in two. This often solves clusters of violations without touching wording.

**Extend timing into available gaps.** Where silence follows a line, a cue can often run longer than the speech it accompanies.

**Reduce line count by rewording** so the content fits two balanced lines rather than needing three.

What not to do: shrink the font to fit more characters, which trades one readability problem for another; drop content silently, which is different from condensing; or exceed the specification and hope nobody measures, which fails delivery QC.

[![Person watching video with captions on a laptop](https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Reviewing for Readability

The core discipline is that subtitles must be reviewed in playback, not as a document.

A practical review approach:

**Run an automated check first.** Characters per second, line length, line count, minimum and maximum duration, and gap compliance are all mechanically measurable. Fix every violation before human review begins, so the reviewer spends their attention on judgement rather than arithmetic.

**Watch at normal speed without pausing.** If you need to pause to finish reading, the viewer will too.

**Check the worst segments specifically.** Violations cluster. Sort by characters per second and inspect the top decile rather than sampling randomly.

**Verify line breaks visually.** Break-point problems are invisible in a spreadsheet and obvious on screen.

**Check against picture, not just audio.** Subtitles spanning cuts, colliding with on-screen text, or obscuring important image areas only reveal themselves in playback.

**Test on the smallest target screen.** Text that reads comfortably on a monitor may be marginal on a phone.

## Accessibility Considerations

Same-language captions for deaf and hard-of-hearing viewers carry additional requirements that interact with reading speed.

They typically include speaker identification and non-speech audio information, which adds characters without adding display time — making reading speed tighter than for translated subtitles of the same content. Some accessibility specifications therefore set lower characters-per-second limits, and some allow a third line where speaker labels require it.

It is also worth restating that translated subtitles do not satisfy accessibility captioning obligations, and that accessibility requirements apply to each language version. A localized video generally needs both translated subtitles and same-language captions in that language.

## A Working Checklist

- Confirm the characters-per-second, line length, line count, and duration limits your platform or client actually specifies.
- Do not translate cue-by-cue against fixed source timing; resegment for the target language.
- Condense rather than translate literally; drop redundancy the picture already carries.
- Balance two lines rather than filling one and stubbing the other.
- Break lines at syntactic boundaries, never inside a phrase.
- End cues at shot boundaries where possible.
- Enforce minimum duration so short cues do not flicker, and a minimum gap between cues.
- Use script-appropriate limits and line heights for non-Latin and marked scripts.
- Run mechanical compliance checks before human review.
- Review in playback at normal speed on the smallest target screen.

## Building Reading Speed Into the Workflow

Reading speed compliance is far cheaper to enforce continuously than to remediate at the end.

**Check at translation, not at delivery.** Running the reading speed calculation while the text is still being edited means violations are fixed as part of the work rather than as a rework pass.

**Give translators the constraint.** A translator who knows the character budget for each cue produces compliant output naturally. One who receives only the source text will produce accurate text that fails.

**Automate the mechanical pass.** Characters per second, line length, line count, minimum and maximum duration, and gap compliance are all measurable without human judgement, and clearing them before review lets reviewers spend attention on meaning.

**Report violations by severity.** A cue marginally over the limit and one at double the limit need different responses, and a flat pass-fail list obscures that.

**Track the violation rate over time.** A rising rate usually indicates source content getting denser rather than translation getting worse.

**Handle the recurring offenders structurally.** If a particular content type consistently fails, the fix is usually in how the source is scripted rather than in how it is translated.

Teams that build this into the workflow find compliance stops being a delivery risk and becomes an invisible property of the output.

## Frequently Asked Questions

**What characters-per-second limit should I use?**

Whatever your platform or client specifies — requirements vary and non-compliance is a delivery failure regardless of translation quality. As general guidance, around 12 to 15 characters per second is comfortable for adult Latin-script content, roughly 17 is a common upper bound, and 9 to 12 suits children's content. CJK languages use entirely different scales and cannot be compared directly.

**Why do accurate subtitles still fail quality checks?**

Because translation expands text while display duration stays fixed to the original audio. Correct, faithful translation plus unchanged timing produces reading speeds above the limit as a matter of arithmetic. The fix is condensing and resegmenting for the target language, not improving translation accuracy.

**Is it acceptable to shorten meaning to fit subtitles?**

Condensing is the form working as intended, not a compromise. Subtitles routinely drop filler, repeated names, hedges, discourse markers, and information the picture already conveys. That differs from silently dropping content — the meaning must survive, the words need not all be there.

**Where should a subtitle line break?**

At a syntactic boundary — between complete phrases, before a conjunction, at a clause edge. Never between an article and its noun, a preposition and its object, or inside a name. Balance the two lines roughly rather than filling the first and stubbing the second, and keep to two lines unless the specification permits more.

**Do translated subtitles meet accessibility requirements?**

No. Accessibility captions for deaf and hard-of-hearing viewers typically require speaker identification and non-speech audio information, which translated subtitles omit, and those requirements apply to each language version. A localized video generally needs translated subtitles and same-language captions in that language as separate deliverables.

---

Related reading: [Text Expansion in Translation](/blog/text-expansion-in-translation) | [Multilingual Subtitles Guide](/blog/multilingual-subtitles-guide) | [SRT and VTT Subtitle Formats Explained](/blog/srt-vtt-subtitle-formats-explained)
