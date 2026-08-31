---
{
  "title": "Building a Subtitle Parser: The Edge Cases That Break Everything",
  "slug": "building-a-subtitle-parser",
  "category": "Developer Guides",
  "primaryKeyword": "subtitle parser",
  "metaDescription": "What a production subtitle parser has to handle: encodings, BOMs, line endings, malformed timecodes, overlapping cues, and the SRT variants nobody documents.",
  "excerpt": "SRT looks like a format you can parse with a regex in ten minutes. That impression survives contact with about forty real files.",
  "publishedAt": "2026-08-27T11:30:00Z",
  "updatedAt": "2026-08-27T11:30:00Z",
  "heroImage": "/assets/blog/images/clinical-glass-lattice.png",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

[![Code on a monitor in a dark room](https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Why This Is Harder Than It Looks

SubRip — SRT — is the most widely used subtitle format in existence and has no specification. It was defined by the behaviour of one piece of Windows software in the late 1990s, and everything since has been reverse-engineered from files in the wild.

The consequence is that "valid SRT" means "whatever the consumer accepts." Media players are permissive because rejecting a file annoys users. Every permissive player teaches producers that their slightly-wrong output is fine, and the wrongness propagates.

If you are building anything that ingests subtitles from external sources — a translation pipeline, a player, a captioning tool, an asset management system — you will receive files that violate every assumption you make. This is a survey of what actually arrives, and what a parser should do about it.

## Encoding: The First Thing That Breaks

A subtitle file is bytes. Nothing in the format declares what those bytes mean.

**UTF-8 is the modern default** and covers most of what you will see. Assume it, but do not assume it exclusively.

**Legacy single-byte encodings persist.** Windows-1252 for Western European, Windows-1251 for Cyrillic, Windows-1250 for Central European, ISO-8859-x variants, Shift-JIS and GBK for East Asian. Older archives are full of them, and so are files produced by desktop tools with regional defaults.

**Byte order marks appear and cause trouble.** A UTF-8 BOM at the start of a file becomes an invisible character prefixed to your first cue index, which then fails to parse as an integer. Strip BOMs before anything else. UTF-16 BOMs indicate a genuinely different encoding — files exported from some Windows tools are UTF-16LE and look like alternating characters and nulls if read as UTF-8.

**Detection is heuristic and must be.** Try UTF-8 strictly; if it decodes without error, use it, because invalid UTF-8 sequences are common enough in legacy encodings that a clean decode is strong evidence. If it fails, fall back to a detection library, and bias the guess with any language hint you have from the filename or the job metadata.

**Mojibake is silent.** A Windows-1252 file read as UTF-8 with replacement characters produces text that parses fine and is wrong. A quick sanity check for a high density of replacement characters or unexpected control bytes catches most of it before it reaches a translator.

**Normalise on output.** Whatever came in, write UTF-8 without a BOM. Decide once and stop the variation propagating.

## Line Endings and Whitespace

SRT is a line-oriented format, which makes line endings structural rather than cosmetic.

CRLF, LF, and occasionally lone CR all appear, sometimes mixed inside a single file where it has been edited on multiple platforms. Normalise to LF immediately after decoding and work from there.

Blank-line separation between cues is the block delimiter, and it is unreliable. Files appear with two blank lines between cues, no blank line before the final cue, trailing whitespace on the "blank" line that makes it non-empty, and stray blank lines inside a cue's text. A parser that splits on exactly `\n\n` will fail on all of these.

The robust approach is a small state machine rather than a split: read lines, recognise a timecode line by its shape, and treat everything between timecode lines as belonging to the preceding cue. Timecode lines are distinctive enough to anchor on, which makes the parser insensitive to how many blank lines separate things.

Trailing whitespace on text lines should be stripped. Leading whitespace sometimes carries intent — indentation used for positioning in old files — but stripping it is almost always the right call.

[![Terminal window with text output](https://images.unsplash.com/photo-1551288049-a23a13c4a2e0?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Timecodes: The Variants

The canonical form is `HH:MM:SS,mmm --> HH:MM:SS,mmm`. What arrives is more varied.

**Decimal separator.** Comma is canonical for SRT, period for WebVTT. Files mix them freely, including within a single line. Accept both.

**Hours omitted.** `MM:SS,mmm` appears in files produced by tools that drop leading zeros for short content.

**Milliseconds truncated or extended.** Two-digit and four-digit fractional parts both appear. Interpret by position: two digits means hundredths, four means the last one is spurious precision.

**Hours exceeding 24.** Legitimate for long-form content and for files carrying broadcast timecode offsets. Do not assume a two-digit hour field.

**Arrow variants.** `-->` is canonical. `->`, `- >`, and extra spacing around the arrow all appear.

**Trailing position data.** WebVTT allows cue settings after the timecode — `line:`, `align:`, `position:`. These leak into files labelled SRT. Parse them if you can use them, ignore them if you cannot, but do not let them fail the timecode line.

**Frame-based timecodes.** `HH:MM:SS:FF` with a frame count instead of milliseconds appears in files converted from broadcast formats. Converting requires knowing the frame rate, which the file does not tell you. Detect the shape and either take a frame rate from job metadata or reject the file with a clear message — silently treating frames as milliseconds produces timing that is wrong by up to a second and looks almost plausible.

A single tolerant regular expression with optional groups handles the first six. The seventh needs its own branch.

## Cue Indices Are Not Trustworthy

The numeric index before each cue is, in practice, decorative. Nothing depends on it and almost every file has something wrong with it.

Indices start at zero instead of one, skip numbers where cues were deleted, repeat, run out of order after an edit, or are missing entirely for some cues. Files exist with no indices at all, which some players still handle.

Do not use the index for anything. Do not require it, do not validate its sequence, and do not fail on a duplicate. Parse it if present, ignore its value, and renumber sequentially on output.

The one place it matters is disambiguation: when a line could be either a cue index or the start of subtitle text, an integer alone on a line immediately before a timecode line is an index. Anchoring on the timecode line rather than the index avoids the question.

## Text Content

**Inline markup.** SRT commonly carries a small subset of HTML: `<i>`, `<b>`, `<u>`, and `<font color="...">`. Some files use curly-brace tags such as `{\i1}` inherited from the ASS format. Decide whether your pipeline preserves formatting or strips it, and do it consistently — the worst outcome is passing tags through translation, where they get reordered, mangled, or translated as text.

**Positioning tags.** `{\an8}` and similar move a cue to the top of the frame, usually to avoid burned-in text. Dropping them silently causes overlapping text in the output. Preserve or convert to the target format's equivalent.

**Line breaks within a cue** are meaningful. They are the segmentation the author chose and they affect reading. Preserve them through processing, and re-segment deliberately after translation rather than letting the original breaks land in the wrong places in a longer target-language string.

**Two-line convention, sometimes broken.** Most guidelines cap cues at two lines. Files with three, four, or more arrive regularly. Accept them on input and enforce your limit on output.

**Character escaping.** Ampersands and angle brackets appear both raw and HTML-escaped in the same file. Decode entities on input.

**Right-to-left content** brings bidirectional control characters that must survive intact. Stripping "invisible" characters as a cleanup step corrupts Arabic and Hebrew subtitles in ways that are hard to see and obvious to readers.

## Structural Problems Between Cues

Individual cues can parse perfectly and the track can still be broken.

**Overlapping cues.** Cue two starts before cue one ends. Sometimes intentional — simultaneous speakers in formats that support it — usually an authoring error. Detect and report; automatic correction guesses at intent.

**Zero-length and negative-length cues.** End time equal to or before start time. Zero-length cues appear as artefacts of automated tools. Negative-length ones indicate corruption.

**Out-of-order cues.** Cues not sorted by start time, usually after a manual edit. Sorting is generally safe and worth doing.

**Duplicate cues.** The same text and timing repeated, typically from a bad merge of two tracks.

**Very long cues.** A cue lasting thirty seconds usually means a missing end time was filled in with the next cue's start.

**Gaps and drift.** A track whose cues drift progressively later than the audio indicates a frame rate mismatch — commonly a 23.976 versus 25 conversion — which is a global correction rather than a per-cue one.

Report these as diagnostics rather than fixing them silently. A pipeline that quietly repairs structural problems hides source-file quality issues that the supplier should fix.

[![Person debugging code on a laptop](https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Parser Design Principles

**Be liberal on input, strict on output.** Accept every variant you can interpret unambiguously; emit exactly one canonical form.

**Never fail the whole file for one bad cue.** Collect errors, skip or repair the individual cue, and return both the parsed track and a diagnostics list. A single malformed timecode in a thousand-cue file should not lose the other 999.

**Preserve what you do not understand.** Unknown tags and cue settings should round-trip rather than vanish, unless you are deliberately normalising.

**Keep the original alongside the parsed model.** When something goes wrong three stages later, the byte-level original is what lets you diagnose it.

**Test against real files.** Hand-written fixtures encode your assumptions and therefore test nothing. Build a corpus from actual production files, including the ones that failed.

**Fuzz the timecode parser.** It is the component most likely to be handed something unexpected and the one whose failure is most confusing downstream.

## A Working Checklist

- Strip byte order marks before parsing anything.
- Try strict UTF-8 first, then fall back to encoding detection with a language hint.
- Check for mojibake signatures rather than trusting a clean decode.
- Normalise all line endings to LF immediately after decoding.
- Anchor parsing on timecode lines with a state machine rather than splitting on blank lines.
- Accept both comma and period as the millisecond separator.
- Accept missing hours, variable fractional digits, hours above 24, and arrow variants.
- Detect frame-based timecodes explicitly and refuse them without a known frame rate.
- Ignore cue index values entirely and renumber on output.
- Decode HTML entities and decide one policy for inline markup.
- Preserve positioning tags and bidirectional control characters.
- Detect overlapping, zero-length, negative-length, duplicate, and out-of-order cues and report them.
- Never fail an entire file because of one malformed cue.
- Emit UTF-8 without a BOM, LF line endings, and sequential indices.
- Build the test corpus from real files, not fixtures you wrote.

## Frequently Asked Questions

**Is there an official SRT specification?**

No. SubRip was defined by the behaviour of one Windows application in the late 1990s and never had a formal specification. Everything in circulation is reverse-engineered from files in the wild, which is precisely why the format has so many variants — permissive players accept malformed output, producers never learn it is malformed, and the variation compounds.

**Should I use a library or write my own parser?**

Use a well-maintained library if one exists for your language, and read its source before trusting it. Many subtitle libraries handle the happy path and fall over on encoding detection, frame-based timecodes, or malformed cue recovery. If you are building a pipeline that ingests third-party files at volume, expect to contribute fixes upstream or wrap the library with your own recovery layer.

**How do I handle files that are labelled SRT but are actually WebVTT?**

Detect by content, not extension. A `WEBVTT` header on the first line is definitive. Absent that, period-separated milliseconds and cue settings after the timecode are strong signals. Since a tolerant parser accepts both variants anyway, the practical requirement is knowing which format to emit rather than which to accept.

**What should happen when a cue fails to parse?**

Record a diagnostic with the line number and the raw content, skip that cue, and continue. Return the parsed track together with the list of problems. Failing the whole file loses valid work and produces an error message that tells the operator nothing about where to look.

**How do I deal with subtitles that drift out of sync progressively?**

Progressive drift is a frame rate mismatch, typically a 23.976 versus 25 conversion, not a per-cue timing error. It is corrected globally by scaling every timecode by the ratio between the two rates. If the drift is not linear, the file has been edited or spliced and needs a different fix.

**Should my pipeline repair structural problems automatically?**

Report by default, repair only where intent is unambiguous. Sorting out-of-order cues and renumbering indices are safe. Resolving overlaps, trimming long cues, and fixing negative durations all require guessing what the author meant, and silent repair hides quality problems that the file's supplier should be told about.

---

Related reading: [SRT and VTT Subtitle Formats Explained](/blog/srt-vtt-subtitle-formats-explained) | [How to Translate SRT Files](/blog/how-to-translate-srt-files) | [Video Translation File Formats Guide](/blog/video-translation-file-formats-guide)
