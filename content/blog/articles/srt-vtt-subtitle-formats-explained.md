---
{
  "title": "SRT, VTT, and ASS: Subtitle Formats Explained and When to Use Each",
  "slug": "srt-vtt-subtitle-formats-explained",
  "category": "Technical Guides",
  "primaryKeyword": "subtitle file formats",
  "metaDescription": "A technical comparison of subtitle file formats: SRT, WebVTT, ASS/SSA, TTML, and SCC, covering styling, positioning, platform support, and conversion.",
  "excerpt": "Choosing a subtitle format determines what styling you can apply, which platforms will accept your file, and how much information survives conversion.",
  "publishedAt": "2026-08-20T10:30:00Z",
  "updatedAt": "2026-08-20T10:30:00Z",
  "heroImage": "/assets/blog/images/modular-caption-stack.png",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

[![Subtitle file formats and technical specifications](https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Why Format Choice Matters

Subtitle formats are not interchangeable containers for the same information. Each supports a different set of capabilities, and converting between them is lossy in one direction and impossible to reverse.

A file that carries precise positioning, per-character styling, and karaoke timing in one format becomes plain timed text in another. If you author in a rich format and deliver in a simple one, you lose work. If you author in a simple format and need rich features later, you rebuild.

Format choice also determines platform compatibility. Some platforms accept only one format. Some accept several but silently discard features they do not support. Understanding what each format carries — and what each platform does with it — prevents a category of problems that surface only at publication.

## SRT: The Universal Baseline

SubRip Subtitle, almost universally called SRT, is the most widely supported subtitle format in existence.

Its structure is minimal: a sequence of numbered blocks, each containing an index, a start and end timecode, and one or more lines of text, separated by blank lines. Timecodes use hours, minutes, seconds, and milliseconds with a comma as the decimal separator.

**What it supports.** Timed text. That is essentially the whole feature set. Many players honor basic inline HTML-like tags for bold, italic, and underline, and some honor a font color tag, but none of this is part of any formal specification — support is conventional rather than guaranteed.

**What it does not support.** Positioning, alignment control, precise styling, vertical text, ruby annotations, or any structured metadata.

**Where it fits.** SRT is the correct default for interchange, for platform upload where the platform will apply its own styling, and for any situation where broad compatibility matters more than presentation control. Nearly every video platform, editor, and player accepts it.

**Practical cautions.** SRT has no encoding declaration, which means the file does not state its own character encoding. This is the single largest source of SRT problems: a file written in UTF-8 and interpreted as Latin-1, or vice versa, produces garbled non-ASCII characters. Always write SRT as UTF-8, and prefer including a byte order mark where the consuming system tolerates one, since it gives the reader a hint.

Line ending conventions also cause trouble. Some parsers are strict about carriage returns; others are not. When a file fails to parse for no visible reason, line endings are worth checking.

## WebVTT: The Web Standard

WebVTT is the subtitle format defined for HTML5 video, and it is the native choice for web delivery.

Structurally it resembles SRT — timed cues with text — but it is a specified format with real capabilities beyond plain text.

**What it supports.** A file signature identifying it as WebVTT. Cue settings controlling position, line placement, alignment, and size. Named cue identifiers. Region definitions for grouping cues. Styling through CSS, either embedded in a STYLE block or applied from the page. Semantic inline tags for voice, class, language, and timestamps. Comment blocks. Chapter and metadata tracks in addition to subtitle tracks.

Timecodes use a period as the decimal separator rather than SRT's comma, which is the most common gotcha when hand-converting between the two.

**Where it fits.** Any web-based playback using the HTML5 video element. WebVTT is what browsers expect, and it is the format to use when you control the player and want styling and positioning control.

The voice tag deserves specific mention for multi-speaker content: it allows marking which speaker a cue belongs to, which can then be styled differently through CSS. This is useful for dialogue-heavy content and for accessibility.

**Practical cautions.** WebVTT is always UTF-8, which removes SRT's encoding ambiguity. Browser support for the full feature set varies — positioning and basic styling are well supported, while regions and some advanced features are less consistently implemented. Test in the browsers you actually target.

## ASS and SSA: Full Presentation Control

Advanced SubStation Alpha, and its predecessor SubStation Alpha, are the formats used when subtitle appearance must be controlled precisely.

**What they support.** Named styles with full typographic control — font, size, weight, colors for fill, secondary, outline, and shadow, border width, shadow depth, spacing, and rotation. Absolute positioning anywhere in the frame. Per-character and per-word timing effects. Animation of position, color, and transparency over time. Vector drawing. Layering with explicit z-order. Karaoke timing.

The format separates style definitions from event lines, so a change to a named style propagates to every cue using it.

**Where it fits.** Content where subtitle presentation is part of the production rather than an accessibility layer: fansubbed animation, karaoke, signs and typesetting that must match on-screen text in the source, and any case where subtitles must be positioned to avoid obscuring specific visual elements.

It is also the working format of choice when subtitles will be burned in, because it gives the render exactly what it needs.

**Practical cautions.** Almost no streaming platform accepts ASS for upload. It is a production and burn-in format, not a delivery format. Rendering depends on the specific renderer and on font availability — a file that looks correct on the machine where it was authored may render differently elsewhere if fonts are missing.

Converting ASS to SRT or VTT discards essentially everything except the text and timing.

## TTML and Its Profiles

Timed Text Markup Language is an XML-based standard used primarily in broadcast and professional distribution.

**What it supports.** Structured styling and layout in XML, regions, comprehensive metadata, and multiple profiles targeting specific delivery contexts. IMSC is the profile most commonly encountered in modern streaming distribution. DFXP is an older designation still seen in some contexts.

**Where it fits.** Professional distribution pipelines, broadcast delivery, and streaming platforms that specify TTML or IMSC in their delivery requirements. If a distributor's specification names it, that is the reason to use it.

**Practical cautions.** TTML is verbose and not practical to hand-edit. Profiles differ in what they permit, and a file valid under one profile may be rejected under another. When a specification calls for TTML, get the exact profile and version requirement rather than assuming.

## SCC and Broadcast Caption Formats

Scenarist Closed Captions and related formats encode captions for broadcast television, following the constraints of legacy caption standards.

**What they support.** Caption data conforming to broadcast caption specifications, including positioning within a fixed grid, and modes such as pop-on, roll-up, and paint-on.

**Where they fit.** Broadcast delivery and any distribution requiring compliance with broadcast caption standards. Some platforms accept SCC specifically for closed caption tracks distinct from subtitle tracks.

**Practical cautions.** These formats have tight constraints inherited from the bandwidth limits of the original standards — restricted character sets, limited characters per line, and a fixed grid. Text that fits comfortably in SRT may not fit within these limits, and non-Latin scripts are frequently unsupported. Conversion into these formats often requires editorial condensation rather than mechanical transformation.

## Closed Captions Versus Subtitles

The terms are used loosely, but the distinction matters for compliance and for what content the file should contain.

**Subtitles** assume the viewer can hear the audio and need the dialogue rendered in text, typically for language reasons. They carry spoken content.

**Closed captions** assume the viewer cannot hear the audio. In addition to dialogue, they include speaker identification, relevant non-speech audio — sound effects, music cues, tone of voice where it changes meaning — and other information a hearing viewer would receive.

A translated subtitle track is not automatically an accessible caption track. Localizing into ten languages and providing only dialogue in each has served language access while leaving deaf and hard-of-hearing viewers in every one of those languages without the non-speech information.

Where accessibility is a requirement, produce caption tracks that include non-speech information in each language, not only in the source language.

## Conversion and What Survives

Conversion between formats is common and predictably lossy.

Converting from a rich format to a simple one — ASS to SRT, TTML to SRT — retains text and timing and discards styling, positioning, and effects. This is a one-way operation.

Converting between SRT and WebVTT is nearly lossless in the SRT-to-VTT direction, since VTT is a superset of what SRT carries. The reverse discards VTT-specific cue settings and styling.

Two mechanical details cause most conversion failures: the decimal separator in timecodes differs between SRT and VTT, and encoding assumptions differ where SRT has no declaration.

Frame rate is a subtler issue. Some formats express timing in frames rather than absolute time, and converting between frame-based and time-based formats requires knowing the frame rate. Getting it wrong produces drift that accumulates across the file — correct at the start, visibly off at the end. This is the classic cause of subtitles that gradually desynchronize.

## Sidecar Files Versus Burned-In

A separate consideration that interacts with format choice: whether subtitles are delivered as a separate file alongside the video, or rendered permanently into the picture.

**Sidecar files** can be toggled off, swapped per language without re-encoding, corrected cheaply, and used by assistive technology. They are the right default for most delivery.

**Burned-in subtitles** are guaranteed to appear regardless of player support, cannot be toggled off, and require a full re-render to change. They are appropriate for social platforms that do not reliably support caption tracks, for content viewed in environments where the player is unknown, and where styling must be exact.

For multi-language delivery, sidecar files are substantially cheaper: one video file with ten subtitle files versus ten separately rendered videos. Where burn-in is required, the render cost multiplies per language, and every text correction means re-rendering.

## Common Problems and How to Diagnose Them

A handful of symptoms account for most subtitle format failures, and each points to a specific cause.

**Garbled accented or non-Latin characters.** Almost always an encoding mismatch — a UTF-8 file being read as a single-byte encoding, or the reverse. Check that the file is UTF-8 and that the consuming system is told so. This is the classic SRT problem, since SRT carries no encoding declaration.

**Subtitles progressively drift out of sync.** Usually a frame rate mismatch. Timing that is correct at the start and increasingly wrong later indicates the file was authored against a different frame rate than the video is playing at. A constant offset, by contrast, indicates a start-time misalignment rather than a rate problem.

**File rejected on upload with no useful error.** Check line endings, the presence of a byte order mark where the platform does not expect one, and timecode format — particularly the comma versus period decimal separator, which is the most common hand-conversion error between SRT and VTT.

**Styling silently disappears.** The platform accepted the file and discarded features it does not support. This is expected behavior when delivering a rich format to a system that applies its own styling.

**Overlapping cues render unpredictably.** Two cues occupying the same time range is invalid in most contexts, and players handle it inconsistently. Validate for overlap before delivery.

**Text overflows or truncates.** Character-per-line limits differ by platform, and some enforce byte limits rather than character limits — which cuts multi-byte scripts at roughly a third of the expected length.

**Missing glyphs in burned-in output.** A font coverage problem rather than a format problem. The file is correct; the renderer lacks the characters.

## Multi-Language Delivery

Managing subtitle files across many languages introduces organizational problems that are separate from format questions.

Language identification should follow standard language tags rather than ad hoc naming. A file named for a language in plain words is ambiguous where a standard tag is not, and regional variants — European versus Brazilian Portuguese, Simplified versus Traditional Chinese — require the region or script subtag to be distinguishable at all.

Filename conventions should encode the video identifier and the language tag consistently, since most players and platforms infer the language from the filename or from an accompanying manifest.

Default track selection matters for viewer experience. A player that defaults to a language the viewer does not read, or that defaults to no subtitles when the audio is in a language they do not speak, produces a worse outcome than the localization warranted.

Keep source and translated tracks synchronized in segmentation where practical. When the source timing is corrected, every translated track needs the same correction, and tracks that have drifted apart structurally make this far more laborious.

## Practical Recommendations

For platform upload where the platform styles captions, use SRT as UTF-8. It is accepted everywhere and the platform will override styling anyway.

For web playback you control, use WebVTT and take advantage of positioning and CSS styling.

For production work that will be burned in, work in ASS and render from it.

For broadcast or professional distribution, use whatever the delivery specification names, and get the exact profile.

Keep the authoring format richer than the delivery format. It is easy to generate SRT from a richer source and impossible to recover the richness later.

Validate before delivery. Encoding, timecode format, line count, character limits, and overlapping cues are all checkable mechanically, and catching them before upload is far cheaper than discovering them after.

Verify visually on the actual destination player. Format validity does not guarantee correct appearance, particularly for non-Latin scripts where font coverage and rendering support vary independently of whether the file parses.
