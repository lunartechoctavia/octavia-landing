---
{
  "title": "Video Codec and Container Choices for Localization Pipelines",
  "slug": "video-codec-choices-for-localization",
  "category": "Technical Guides",
  "primaryKeyword": "video codec for localization",
  "metaDescription": "How codec and container choice affects a localization pipeline: mezzanine formats, subtitle and audio track muxing, re-encoding loss, and platform delivery.",
  "excerpt": "The codec decision made once, at ingest, determines how many times your video gets re-encoded before it reaches a viewer — and every re-encode costs quality.",
  "publishedAt": "2026-08-28T18:00:00Z",
  "updatedAt": "2026-08-28T18:00:00Z",
  "heroImage": "/assets/blog/images/lattice-precision-glass.jpg",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

[![Server racks in a data centre](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Why This Matters Specifically for Localization

Codec and container choices are usually a video engineering concern that content and localization teams do not think about directly. For a multilingual pipeline specifically, though, the choices made at ingest and during intermediate processing determine how many languages you can produce cheaply, how much quality is lost along the way, and how easy it is to make a change to one language without touching the others.

The core issue is that a localization pipeline processes the same video many times over — once per language, plus revisions — in ways a single-language production pipeline does not. Decisions that cost nothing for one output multiply across eight, twelve, or twenty language versions, and decisions that are invisible in a single pass compound visibly across repeated processing.

## Codec Versus Container: Getting the Terms Right

This distinction is worth being precise about because it affects which tools and which settings actually matter for which decision.

**A codec** — H.264, H.265/HEVC, AV1, ProRes, and others — is the compression algorithm that determines how the video and audio data are actually encoded, and it determines quality, file size, and encoding and decoding computational cost.

**A container** — MP4, MOV, MKV, WebM — is the wrapper format that holds the encoded video, audio, subtitle tracks, and metadata together, and determines what kinds of tracks can be included, how they are organised, and which platforms and players will accept the file.

The two are independent: an MP4 container can hold H.264 or H.265 video, and a given codec can be wrapped in more than one container format. Localization workflow questions about multiple audio and subtitle tracks are almost entirely container questions; questions about visual quality after multiple processing passes are almost entirely codec questions.

## The Mezzanine Format Decision

The single highest-leverage decision in a localization pipeline is what format the master or mezzanine file is kept in — the version everything else is generated from.

**Every re-encode of a lossy codec loses quality**, even at nominally identical settings, because lossy compression discards information on each pass and that loss accumulates with repeated encode-decode-re-encode cycles. A video encoded once from a high-quality source to a delivery codec loses relatively little. A video re-encoded five times as it passes through different processing stages accumulates generational loss that becomes visible, particularly in motion and in fine detail.

**A localization pipeline is exactly the scenario where this compounds**, because the source video may be transcoded for transcription, again for separation and dubbing preparation, again for burned-in subtitle rendering, and again for final delivery encoding — and if each of those stages re-encodes from the previous stage's lossy output rather than from a common high-quality source, quality degrades with every language produced.

**The correct pattern is to keep one high-quality mezzanine master and always encode delivery outputs from it**, rather than from a previously-encoded delivery output. Processing stages that only need to read the video — transcription, translation, most subtitle work — do not need to touch the video encoding at all and should work from extracted audio or from the mezzanine, never re-encoding the video track in the process.

**Choose a mezzanine codec designed for this purpose rather than a delivery codec.** Intermediate or mezzanine codecs — ProRes, DNxHD/DNxHR, or a high-bitrate intraframe format — are designed to tolerate repeated encode-decode cycles with minimal cumulative loss, at the cost of much larger file sizes than delivery codecs. This size cost is worth paying for a master that many delivery variants will be generated from, and is not worth paying for the final delivered files themselves.

**If a true mezzanine format is impractical for storage reasons**, at minimum use the highest reasonable bitrate delivery codec as the working master, and be disciplined about never re-encoding a re-encoded file — always branch new outputs from the single working master, not from a previously generated delivery file.

[![Editing suite with monitors and console](https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Audio-Only Processing Should Not Touch Video

**Transcription, translation, dubbing script generation, and voice generation only need the audio track**, and a pipeline that re-encodes or even re-muxes the full video file to pass it through these stages is doing unnecessary work and introducing unnecessary risk of quality loss or corruption.

**Extract audio once, in a lossless or high-quality format, and run all audio-only processing against that extracted file.** Only remux the final generated audio track back into the video at the delivery stage, keeping the video stream itself completely untouched — a stream copy rather than a re-encode — throughout every stage that does not need to modify the picture.

**Verify your tooling is actually doing a stream copy where it should be.** Some processing tools and libraries default to fully re-encoding both audio and video even when only the audio needs to change, silently introducing video quality loss that was entirely avoidable. This is worth checking explicitly in your pipeline rather than assuming.

## Multiple Audio and Subtitle Tracks in One Container

**Not every container supports multiple tracks equally well, and this affects whether you can deliver one file per video with all languages included, or need separate files per language.**

**MP4 supports multiple audio tracks and multiple subtitle tracks**, though platform support for actually exposing and switching between them varies, and subtitle support within MP4 specifically has some format fragmentation — some players expect timed text tracks in a specific format within the container, others do not support in-container subtitles at all and expect a separate file.

**MKV has broad and mature support for multiple audio tracks, multiple subtitle tracks in various formats, and rich metadata**, making it a strong choice for an internal working or archival master containing every language in one file, even where it is not the format ultimately delivered to end platforms.

**Streaming formats like HLS and DASH handle multi-language delivery through manifest-level track selection** — separate underlying media segments per language, referenced and switched by a manifest file — rather than through multiple tracks muxed into one physical file, which is a different mechanism from a downloadable MP4 or MKV and needs to be understood as such when building a delivery pipeline that targets adaptive streaming.

**Decide the delivery mechanism based on your actual distribution platforms, not based on what is technically possible in the abstract**, since a beautifully engineered multi-track MKV master is only useful if something downstream can actually consume and expose those tracks to a viewer, and most direct-to-consumer platforms have their own specific ingestion requirements that need to be checked rather than assumed.

## Subtitle Format Within the Pipeline

**Keep subtitles as a separate, editable text-based file throughout the pipeline for as long as possible**, in SRT, WebVTT, or a similar format, rather than burning them into the video image early. A text-based subtitle track can be corrected, re-timed, translated into additional languages, and re-styled without touching the video at all, whereas burned-in text requires re-rendering the entire video for even a single-word correction.

**Burn in only at final delivery, and only for platforms or use cases that specifically require it** — some social platforms and some viewing contexts where sound-off consumption is the norm benefit from burned-in captions, but this should be the last step applied to a final delivery encode, generated fresh from the mezzanine and the current subtitle file, never as an intermediate working state.

**If burned-in delivery is needed for multiple languages, this multiplies the number of final video renders needed**, since each language's burned-in version is a distinct video file rather than a shared video with a switchable track — a real cost difference from soft-subtitle delivery worth factoring into planning and pricing.

[![Terminal window with text output](https://images.unsplash.com/photo-1551288049-a23a13c4a2e0?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Codec Choice for Delivery

**H.264 remains the safest and most broadly compatible delivery codec** across the widest range of devices, browsers, and platforms, and is a reasonable default where compatibility matters more than achieving the smallest possible file size.

**H.265/HEVC and AV1 achieve meaningfully better compression at equivalent visual quality**, which matters for a large multilingual catalogue where storage and bandwidth costs scale with every additional language version, but both have less universal playback support than H.264 and licensing considerations that vary by use case, and AV1 encoding is considerably more computationally expensive.

**For a large-scale multilingual video operation, the storage and bandwidth savings of a more efficient codec compound significantly across a big catalogue**, and it is worth evaluating deliberately rather than defaulting to whatever codec a single-language pipeline happened to use, particularly for platforms where you control playback and are not constrained by the lowest-common-denominator compatibility requirement of open web delivery.

**Audio codec choice matters less for storage but still matters for quality**, particularly for dubbed content where multiple audio tracks accumulate: AAC is broadly compatible and efficient at a reasonable bitrate; avoid re-encoding already-lossy audio multiple times through a pipeline for the same generational-loss reasons that apply to video.

## Frame Rate and Resolution Consistency

**Keep frame rate and resolution consistent across the mezzanine and all delivery renders for a given video**, since converting frame rate introduces its own quality and, more critically for localization, subtitle timing risks discussed at length elsewhere — mismatched frame rates between a subtitle file's assumed timing and the actual delivered video is one of the most common causes of drifting subtitle sync.

**Where source material genuinely varies in frame rate or resolution across a catalogue** — footage shot at different times with different equipment — normalise to a single working standard during mezzanine creation rather than carrying the inconsistency through every subsequent processing stage, where it becomes a recurring source of errors for anyone downstream who assumes a consistent standard.

## A Working Checklist

- Understand codec and container as independent decisions serving different purposes.
- Keep one high-quality mezzanine master and generate every delivery output from it, never from a previous delivery output.
- Use an intermediate codec designed for repeated processing, such as ProRes or DNxHR, for the mezzanine where storage allows.
- Never re-encode a re-encoded file; always branch from the single working master.
- Extract audio once for all audio-only processing stages and keep the video stream untouched via stream copy.
- Verify your tooling performs stream copy rather than silently re-encoding video during audio-only steps.
- Choose a container based on which platforms will actually consume the multi-track file.
- Use MKV for internal multi-language working masters where broad multi-track support matters.
- Understand that adaptive streaming formats handle multi-language delivery through manifests, not in-file tracks.
- Keep subtitles as editable text files for as long as possible in the pipeline.
- Burn in subtitles only at final delivery and only where the destination specifically requires it.
- Budget for burned-in delivery multiplying the number of final video renders per video.
- Evaluate H.265 or AV1 against H.264 based on your actual catalogue scale and platform compatibility needs.
- Keep frame rate and resolution consistent across the mezzanine and every delivery render.
- Normalise inconsistent source material to one working standard during mezzanine creation.

## Frequently Asked Questions

**Does re-encoding video actually lose noticeable quality?**

Yes, cumulatively, even when each individual re-encode looks fine on its own. Lossy codecs discard information on every encode pass, and repeated encode-decode-re-encode cycles compound that loss in ways that become visible in motion and fine detail after several generations, even at nominally high quality settings each time. This matters specifically for localization pipelines because the same video often passes through several processing stages per language.

**What is a mezzanine file and do I actually need one?**

A mezzanine file is a high-quality intermediate master, typically in a codec designed to tolerate repeated processing with minimal loss, that every delivery output is generated from directly rather than from a previously encoded delivery file. You need one if you are producing more than a couple of language versions from the same source, because without it, quality degrades a little more with every additional language as outputs get generated from other outputs rather than from a common high-quality source.

**Can I put subtitles for eight languages into one video file?**

Technically yes, in containers like MKV or MP4 with sufficient subtitle track support, but whether your actual delivery platform can expose and let a viewer switch between that many tracks is a separate question that depends entirely on the destination. Adaptive streaming platforms typically handle this through manifest-level track references rather than tracks embedded in one physical file, which is a different delivery mechanism worth confirming against your specific platforms before building around either assumption.

**Should I burn subtitles into the video or keep them as a separate track?**

Keep them separate for as long as possible. A text-based subtitle file can be corrected, re-timed, or translated into additional languages without touching the video at all, while burned-in text requires re-rendering the entire video for even a single-word fix. Burn in only at the final delivery step, and only for the specific platforms or use cases that genuinely require it, generating that render fresh from the mezzanine rather than treating a burned-in version as a working intermediate.

**Does codec choice matter more for a large multilingual catalogue than for a single video?**

Yes, because storage and bandwidth costs from codec efficiency scale with every additional language version of every video, so a marginal efficiency gain compounds significantly across a large catalogue in a way it simply does not for one file. It is worth evaluating more efficient codecs like H.265 or AV1 deliberately for large-scale operations, balanced against the playback compatibility and encoding cost trade-offs each involves relative to the more universally compatible H.264.

**Why did my subtitle timing break after a video re-encode?**

Most likely a frame rate mismatch introduced during the re-encode, which is one of the most common causes of subtitle drift and is a separate and more detailed problem worth understanding on its own terms. Keeping frame rate consistent between your mezzanine, your subtitle timing, and every delivery render avoids this category of error entirely, and any legitimate frame rate conversion needs to be applied to the subtitle timecodes as well as to the video.

---

Related reading: [Frame Rates and Subtitle Timing](/blog/frame-rate-and-subtitle-timing) | [Video Translation File Formats Guide](/blog/video-translation-file-formats-guide) | [CI/CD for Localized Video](/blog/ci-cd-for-localized-video)
