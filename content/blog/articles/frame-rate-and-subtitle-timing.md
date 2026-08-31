---
{
  "title": "Frame Rates and Subtitle Timing: Why Your Captions Drift",
  "slug": "frame-rate-and-subtitle-timing",
  "category": "Technical Guides",
  "primaryKeyword": "frame rate subtitle timing",
  "metaDescription": "Why subtitles drift out of sync, how 23.976 and 25 fps conversions cause it, and how to diagnose and correct timing problems across formats.",
  "excerpt": "Subtitles that start in sync and end a second and a half late are not badly timed. They are timed to a different frame rate.",
  "publishedAt": "2026-08-27T15:00:00Z",
  "updatedAt": "2026-08-27T15:00:00Z",
  "heroImage": "/assets/blog/images/staged-glass-timeline.png",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

[![Video editing timeline on a monitor](https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Two Kinds of Drift

Subtitle sync problems come in exactly two shapes, and telling them apart takes ten seconds and determines the entire fix.

**Constant offset.** Subtitles are wrong by the same amount throughout. The first line is 1.4 seconds early and so is the last. This comes from a difference in where the content starts — a version with a longer distributor logo, a trimmed opening, an ad break inserted — and is fixed by shifting every timecode by a fixed amount.

**Progressive drift.** Subtitles start close and get steadily worse. In sync at the start, half a second out at ten minutes, two seconds out at the end. This is almost always a frame rate mismatch, and shifting will not fix it. It needs scaling.

The diagnostic: check sync at the beginning and at the end. Same error at both ends means offset. Growing error means drift. Both together means a file that was converted and then shifted, needing scaling first and then offsetting.

## Where 23.976 Comes From

Progressive drift is dominated by one conversion, and understanding why it exists makes it easier to spot.

Film runs at 24 frames per second. North American colour television, for reasons rooted in the introduction of colour into an existing black-and-white broadcast standard, runs at 29.97 frames per second rather than a round 30 — a factor of exactly 1000/1001 slower. Getting 24 fps film onto that system involves a pulldown process, and the associated video frame rate is 24 × 1000/1001, or 23.976.

European television standardised on 25 frames per second. Getting 24 fps film onto a 25 fps system was traditionally done by simply running it faster — the whole film plays 4% quicker and finishes about four minutes earlier for a feature length. This is why the same film can have measurably different runtimes in different territories, and why the pitch of the audio is slightly higher in the sped-up version unless it has been corrected.

The consequences for subtitles:

**23.976 to 25** speeds content up by a factor of 25/23.976, roughly 1.0427. Subtitles timed for the 23.976 version run progressively late against the 25 fps video by about 4.3%. Over an hour that is more than two and a half minutes.

**25 to 23.976** is the inverse, and subtitles run progressively early.

**23.976 to 24** and **29.97 to 30** are the 1000/1001 factor, a 0.1% difference. Over a three-minute video that is under a fifth of a second and invisible. Over a two-hour film it is more than seven seconds, which is not.

The correction in every case is multiplying every timecode by the ratio of the two frame rates. Getting the direction right matters; getting the ratio right matters more.

## Time-Based Versus Frame-Based Formats

Whether a format is vulnerable to this depends on how it stores time.

**Time-based formats** — SRT and WebVTT — store hours, minutes, seconds, and milliseconds. They contain no frame rate information at all. A time-based file is timed for one specific version of the content, and nothing in the file records which.

This is a mixed blessing. It means a time-based file is immune to frame rate misinterpretation, because there is nothing to misinterpret. It also means that if the file was authored against a different version, nothing warns you.

**Frame-based formats** — EBU-STL, some Cinema and broadcast profiles, and the frame-based variant of TTML — store timecodes as hours, minutes, seconds, and frames. Interpreting them requires knowing the frame rate. The format usually declares it, and problems arise when the declaration is wrong or when a converter assumes a default.

**Drop-frame timecode** is the additional complication in the 29.97 world. Because 29.97 fps means timecode counting at 30 fps drifts against wall clock time, drop-frame notation skips certain frame numbers to keep long-run timecode approximately accurate. It is written with semicolons rather than colons — `01;00;00;00` — and confusing drop-frame with non-drop-frame produces an error that accumulates at roughly 3.6 seconds per hour. It is a numbering convention, not a change to the video.

**Conversion between them** is where errors are introduced. Converting frame-based to time-based bakes in whatever frame rate was assumed. If that assumption was wrong, the resulting SRT is wrong and carries no record of why.

[![Film reel and editing equipment](https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Diagnosing a Sync Problem

A systematic procedure, in order of how often each step finds the answer.

**Measure the error at three points.** The first spoken line, a line near the middle, and the last spoken line. Note the actual media time of the speech and the subtitle's time.

**Constant error at all three** means an offset. Determine the amount and shift.

**Error growing linearly** means a rate mismatch. Divide the error at the end by the total duration; the resulting fraction identifies the ratio. A figure near 4.3% is a 23.976/25 conversion. Near 0.1% is a 1000/1001 conversion. Near 3.6 seconds per hour is drop-frame confusion.

**Error growing non-linearly, or jumping at a point** means the versions differ structurally — a scene cut, an inserted ad break, a different edit. Scaling will not fix it; the file needs re-synchronisation section by section, and often the honest answer is that it was authored against a different cut.

**Error present at the start but zero later**, or vice versa, means the file was partially corrected already, usually by someone shifting a file that needed scaling.

**Check the media's actual frame rate** rather than trusting the filename or the delivery paperwork. Media inspection tools report it directly, and it is frequently not what the metadata around the file claims.

## Correcting Properly

**Scale, then offset, in that order.** Scaling changes the start time as well, so an offset applied first will be scaled along with everything else and end up wrong.

**Scale by the exact ratio.** 25/23.976 is not 1.042; use the full precision. Rounding produces residual drift that reappears in long content.

**Apply to both start and end times.** Halving cue durations by scaling only start times is a real and easily made mistake.

**Re-check reading speed after scaling.** A 4.3% speed-up shortens every cue's display duration by 4.3%, which can push cues that were at the reading speed limit past it. Scaling is not purely a timing operation; it has a quality consequence.

**Round to the frame where the target format requires it**, after scaling, not before.

**Record what was done in the asset metadata.** A file that has been rate-converted should say so, because the next person to encounter it will otherwise repeat the diagnosis.

## Preventing It

Correction is straightforward and the real win is not needing it.

**Author against the delivery master.** Subtitles timed against the exact version that ships do not drift. Timing against a preview cut, a screener, or a differently converted version guarantees rework.

**Record the frame rate as asset metadata.** Since time-based formats cannot carry it, carry it alongside. This single practice eliminates most of the diagnosis burden.

**Use one frame rate through the pipeline.** Convert at the edges if you must deliver in several, and keep the internal working rate fixed.

**Prefer time-based formats internally.** They cannot be misinterpreted, and converting to frame-based at delivery with a known rate is safer than the reverse.

**Automate a sync check.** Comparing the first and last cue times against speech detected in the audio catches drift before publication and takes seconds.

**Treat any re-cut as invalidating timing.** A new master means re-verification, not an assumption that the old file still fits.

**Keep the reviewed transcript with word-level timings.** Regenerating subtitle timing from a word-aligned transcript against a new master is fast, accurate, and preserves the reviewed text — far better than scaling an old file and hoping.

[![Editor working with video software](https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## A Working Checklist

- Check sync at the start, middle, and end before attempting any fix.
- Constant error means offset; growing error means a rate mismatch; jumps mean a different cut.
- Verify the media's real frame rate with an inspection tool rather than trusting metadata.
- Identify the ratio from the drift percentage — 4.3% for 23.976/25, 0.1% for the 1000/1001 pairs.
- Watch for 3.6 seconds per hour, which indicates drop-frame timecode confusion.
- Scale before offsetting, never the other way round.
- Use the exact ratio at full precision, not a rounded approximation.
- Scale both start and end times.
- Re-check reading speed after scaling, since display durations change.
- Record any rate conversion in the asset metadata.
- Author subtitles against the delivery master, not a preview or screener.
- Store frame rate as metadata alongside time-based subtitle files.
- Keep one working frame rate internally and convert only at delivery.
- Automate a first-and-last-cue sync check as a publication gate.
- Re-verify timing after any re-cut rather than assuming the old file fits.
- Retain a word-aligned reviewed transcript so timing can be regenerated cleanly.

## Frequently Asked Questions

**My subtitles start in sync and end two seconds late. What is wrong?**

A frame rate mismatch. Progressive drift means the subtitle file was timed against a version of the content running at a different rate than the one you are playing. Divide the end error by the total duration to identify the ratio — around 4.3% points to a 23.976 versus 25 fps conversion, around 0.1% to a 24/23.976 or 30/29.97 pair. Fix it by scaling every timecode, not by shifting.

**Do SRT files contain frame rate information?**

No. SRT and WebVTT store absolute time in hours, minutes, seconds, and milliseconds, with nothing recording which version of the content they were timed against. That makes them immune to frame rate misinterpretation but also means nothing warns you when a file was authored against a different master. Store the frame rate as separate asset metadata.

**What is drop-frame timecode?**

A numbering convention for 29.97 fps content that skips certain frame numbers so long-running timecode stays close to wall clock time. It is written with semicolons rather than colons. It changes nothing about the video, only how frames are labelled. Confusing drop-frame with non-drop-frame produces an error accumulating at roughly 3.6 seconds per hour.

**Can I just shift subtitles until they line up?**

Only if the error is constant. Shifting a file that needs scaling makes it correct at exactly one point and wrong everywhere else, which is worse than the original problem because it masks the real cause. Check the error at the start and the end before deciding — if the two differ, shifting is the wrong operation.

**Why does the same film have different runtimes in different countries?**

Because 24 fps film shown on a 25 fps television system was traditionally run 4% faster, finishing about four minutes earlier for a feature. The audio pitch rises slightly unless corrected. This is the same conversion that produces the 4.3% subtitle drift, and it is why subtitle files sourced from one territory rarely fit another territory's master without scaling.

**Does variable frame rate video cause subtitle drift?**

It can, and it is increasingly common because screen recorders and phone cameras often produce variable frame rate output. The subtitles themselves are time-based and unaffected, but any tool in the chain that assumes a constant rate — a transcoder, an editor, a burn-in renderer — can introduce timing error when it conforms the video. The reliable fix is to transcode variable frame rate source to a constant rate before anything else touches it, and to do the transcode once at ingest rather than repeatedly downstream.

**How do I avoid this happening in the first place?**

Time subtitles against the exact master that ships, keep one internal frame rate, store the rate as metadata alongside every time-based file, and automate a sync check comparing the first and last cues against detected speech. Where content is re-cut, regenerate timing from a word-aligned reviewed transcript rather than scaling the old file.

---

Related reading: [SRT and VTT Subtitle Formats Explained](/blog/srt-vtt-subtitle-formats-explained) | [Building a Subtitle Parser](/blog/building-a-subtitle-parser) | [Subtitle Reading Speed Guide](/blog/subtitle-reading-speed-guide)
