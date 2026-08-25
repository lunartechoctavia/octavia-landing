---
{
  "title": "Video and Audio File Formats for Translation Workflows",
  "slug": "video-translation-file-formats-guide",
  "category": "Technical Guides",
  "primaryKeyword": "video file formats for translation",
  "metaDescription": "Which video, audio, and subtitle formats to use at each stage of a localization workflow, why generation loss matters, and what to archive for reuse.",
  "excerpt": "Most format problems in localization are not compatibility failures. They are quality losses nobody noticed until the ninth language.",
  "publishedAt": "2026-08-26T21:00:00Z",
  "updatedAt": "2026-08-26T21:00:00Z",
  "heroImage": "/assets/blog/images/container-glass-formats.jpg",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

[![Storage drives and media production equipment](https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Containers and Codecs Are Different Things

A recurring source of confusion is worth clearing first, because it explains most format conversations.

A **container** is the wrapper — the file format that holds streams together and describes how they relate. MP4, MOV, MKV, and WebM are containers. The extension on the file tells you the container.

A **codec** is the compression scheme applied to the actual audio or video data inside. H.264, H.265, ProRes, AAC, and Opus are codecs. The container does not tell you which codec is inside.

This is why "we need MP4" is an incomplete specification. An MP4 can contain video encoded a dozen different ways at wildly different quality levels. Two files with the same extension can be a pristine master and a heavily compressed social upload.

For localization work, the codec and its settings determine quality; the container mostly determines compatibility. Specify both.

## Generation Loss and Why It Matters Here

Lossy compression discards information permanently. Encode a file, decode it, and encode it again, and you lose more each time. This is generation loss, and localization workflows are unusually prone to it because they involve multiple processing stages.

A typical bad path: a camera original is edited and exported as a compressed delivery file; that file is uploaded to a platform which re-encodes it; someone downloads it from the platform to localize it; the localization workflow decodes it, replaces the audio, and re-encodes; the result is uploaded and re-encoded again.

Each step compounds. The final localized version may be several generations removed from the original, and the degradation shows up as soft picture, audible audio artefacts, and — importantly for this workflow — reduced transcription accuracy, because the detail transcription depends on has been progressively discarded.

The practical rule is to work from the highest-quality source available and minimise the number of lossy encodes. Specifically:

- Localize from the edit master, not from a platform download.
- Keep the audio path as short as possible; extract audio once and reuse it.
- Avoid re-encoding video at all where you can — if only the audio changes, remux rather than re-encode.

That last point is genuinely valuable and frequently missed. Replacing an audio track does not require touching the video stream. A remux copies the video stream untouched into a new container with the new audio, which is fast and lossless. Re-encoding the video to change the audio is pure waste and pure quality loss.

## Source Formats for Localization

What you want arriving at the start of the workflow.

**Video:** the edit master or mezzanine. An intermediate codec such as ProRes or DNxHD is ideal. Where that is unavailable, a high-bitrate H.264 or H.265 file is workable. Avoid platform downloads, screen recordings of the finished video, and anything that has been through a social platform.

**Audio:** uncompressed or losslessly compressed, at the original sample rate. WAV or FLAC. Extract from the master rather than from a compressed delivery file.

**Stems, where they exist:** separate dialogue, music, and effects tracks. This is the single most valuable thing a production can supply, because it removes the need for separation entirely.

**Textless version:** the video without on-screen text burned in, which makes graphics localization possible rather than a reconstruction exercise.

**Project files:** for work involving graphics localization, access to the editing or motion graphics project makes the difference between an hour and a day.

**Existing subtitle or transcript files:** where they exist and are accurate, they save a transcription pass and are usually better than regenerating.

[![Video editing timeline with multiple media tracks](https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Subtitle Formats

Subtitle formats differ in what they can express, which matters more than it appears.

**SRT** is the simplest and most widely supported. Plain text with timecodes. It carries no positioning, no styling beyond limited markup, and no metadata. Its ubiquity makes it the safe interchange format, and its limitations make it insufficient for broadcast delivery.

**WebVTT** is the web standard, supported natively in browsers. It adds positioning, basic styling, and metadata over SRT, and supports cue settings that matter for avoiding collisions with on-screen elements.

**TTML and its broadcast profiles** are XML-based and considerably more expressive, supporting precise positioning, styling, regions, and the metadata that broadcast delivery specifications require. Several markets mandate a specific profile.

**Broadcast and cinema formats** exist for specific delivery chains and are usually specified by the recipient rather than chosen.

Practical guidance:

- Keep your authoritative subtitle data in the most expressive format your workflow needs, and generate simpler formats from it. Converting up from SRT means inventing information that was never there.
- Confirm the required format per destination rather than defaulting to SRT and discovering a rejection at QC.
- Check frame rate and timecode base explicitly. Subtitle timing referenced to the wrong frame rate drifts progressively, and the drift is invisible at the start of a programme and obvious at the end.
- Verify encoding is UTF-8. Legacy encodings in subtitle files are a persistent source of corrupted characters in non-Latin scripts.

## Audio Delivery Formats

For the generated dialogue and the final mix.

**Working format:** uncompressed WAV at the project sample rate. Do not introduce lossy compression into the middle of the chain.

**Delivery:** depends entirely on the destination. Web and platform delivery typically wants AAC at a reasonable bitrate. Broadcast delivery specifies its own requirements including channel layout and loudness targets.

**Loudness compliance** deserves specific mention because it is a common delivery failure. Broadcast and increasingly streaming platforms mandate integrated loudness targets and true-peak ceilings. Generated dialogue mixed into a bed without normalising to the applicable standard will be rejected regardless of how good it sounds. Measure and normalise as a final step.

**Channel layout** must match the specification. A stereo delivery where 5.1 was required, or dialogue placed in the wrong channel, fails QC.

**Sample rate consistency.** Mixing assets at different sample rates without proper conversion introduces artefacts.

## Video Delivery Formats

Broadly determined by the destination, with a few general points.

**Match the source specification** where you are producing a localized version of an existing asset. The localized version should sit alongside the original in the same delivery format, not in whatever the localization tool defaulted to.

**Remux rather than re-encode** where only audio changed. This preserves picture quality exactly and is much faster.

**Where re-encoding is unavoidable** — because burned-in subtitles or localized graphics changed the picture — encode from the highest-quality source available, not from an already-compressed version.

**Preserve frame rate exactly.** Frame rate conversion introduces judder and breaks subtitle timing. If the source is 23.976, the localized version should be 23.976.

**Preserve resolution and aspect ratio.** Scaling introduces softness for no benefit.

**Check colour handling** where re-encoding, since colour space and range metadata are easy to lose and produce visibly wrong output.

[![Server storage racks in a media facility](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## What to Archive

The archive decision determines how expensive your next localization job is.

Worth keeping, indefinitely:

- The edit master or mezzanine, in an intermediate codec.
- Separated audio stems: dialogue, music, effects.
- The textless video version.
- Project files for the edit and any motion graphics.
- The reviewed source transcript, which is the input to every future language.
- Subtitle files in your most expressive working format.
- The terminology and glossary used, versioned.
- Any localized assets already produced, with their language and version clearly identified.

The transcript deserves particular emphasis. Once reviewed and corrected, it is the single most reusable artefact in the whole process — the source for every translation, every subtitle track, every published transcript, and every search index entry. Regenerating it from audio each time discards the correction work that was already done.

File naming is also worth systematising. Language codes in filenames, using standard codes rather than ad-hoc abbreviations, prevents the wrong language reaching the wrong market — a genuinely common and embarrassing failure at scale.

## A Working Checklist

- Specify container and codec together; the extension alone is not a specification.
- Localize from the edit master, never from a platform download.
- Remux rather than re-encode when only the audio changes.
- Extract audio once, as uncompressed WAV, and reuse it.
- Request stems and a textless version from production wherever possible.
- Keep authoritative subtitle data in the most expressive format needed, and generate simpler ones from it.
- Verify subtitle frame rate and timecode base explicitly to prevent progressive drift.
- Confirm UTF-8 encoding on every subtitle file.
- Normalise loudness to the destination specification as a final step.
- Archive the reviewed transcript, stems, textless version, project files, and glossary.

## Establishing a Delivery Specification

Organisations localizing regularly benefit from writing down what they send and receive, rather than negotiating it per project.

A useful specification covers:

**Inbound requirements.** What you need from production or from a client: master format and codec, audio format and sample rate, stems where available, textless version, project files, and any existing transcript or subtitle files.

**Working formats.** What the pipeline uses internally, which should be lossless for audio and avoid unnecessary video re-encodes.

**Outbound deliverables per destination.** Container, codec, bitrate, resolution, frame rate, audio channel layout, loudness target, subtitle format, and naming convention.

**Naming convention.** Standard language codes in filenames, applied consistently. This single discipline prevents the wrong language reaching the wrong market, which is a genuinely common failure once a library passes a few dozen assets.

**Archive requirements.** What is kept, where, and for how long.

Writing this once and attaching it to project briefs removes an entire category of avoidable rework — files arriving in the wrong format, deliverables rejected at QC, and assets that turn out to be unlocalizable because nobody asked for a textless version at the right moment.

It also makes onboarding a new vendor or a new internal team member substantially faster, because the requirements are documented rather than held informally by whoever has done it before.

## Frequently Asked Questions

**Does the file extension tell me the quality?**

No. The extension identifies the container — MP4, MOV, MKV — not the codec or its settings. An MP4 can hold anything from a pristine high-bitrate master to a heavily compressed social upload. Specify both container and codec, along with bitrate or quality settings, when requesting source material.

**Do I need to re-encode the video to change the audio?**

No, and you should not. A remux copies the video stream untouched into a new container alongside the new audio. It is fast and lossless. Re-encoding the video to swap an audio track discards picture quality for no reason, and across a large library that loss compounds.

**Which subtitle format should I use?**

Keep your authoritative data in the most expressive format your workflow requires — typically WebVTT for web or a TTML profile for broadcast — and generate simpler formats like SRT from it. Converting upward from SRT means inventing positioning and styling information that was never captured. Confirm the required format per destination rather than assuming.

**Why do subtitles drift out of sync toward the end of a programme?**

Almost always a frame rate mismatch. Subtitle timing referenced to the wrong frame rate — commonly 25 against 23.976 — accumulates error progressively, so the start looks fine and the end is visibly wrong. Verify frame rate and timecode base explicitly rather than trusting that the file will carry it.

**What is the most valuable thing to archive?**

The reviewed source transcript, alongside separated audio stems and a textless video version. The transcript is the input to every future translation, subtitle track, published transcript, and search index entry, and regenerating it from audio each time throws away correction work already paid for. Stems and textless versions determine whether future localization is straightforward or a reconstruction job.

---

Related reading: [SRT and VTT Subtitle Formats Explained](/blog/srt-vtt-subtitle-formats-explained) | [Improving Source Audio Quality Before Translation](/blog/improving-source-audio-for-translation) | [Burned-In vs Soft Subtitles](/blog/burned-in-vs-soft-subtitles)
