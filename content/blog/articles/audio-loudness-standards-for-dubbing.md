---
{
  "title": "Audio Loudness Standards for Dubbing: LUFS, True Peak, and Delivery Specs",
  "slug": "audio-loudness-standards-for-dubbing",
  "category": "Technical Guides",
  "primaryKeyword": "audio loudness standards for dubbing",
  "metaDescription": "What LUFS and true peak mean, which loudness targets platforms require, and how to keep dubbed audio consistent across languages and destinations.",
  "excerpt": "A dub that is technically perfect and four decibels louder than the original will be rejected, normalised, or noticed. Usually all three.",
  "publishedAt": "2026-08-27T14:30:00Z",
  "updatedAt": "2026-08-27T14:30:00Z",
  "heroImage": "/assets/blog/images/metered-glass-lines.jpg",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

[![Audio meters on a mixing console](https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Why Loudness Is a Specification, Not a Preference

Before loudness normalisation, broadcast audio was mixed to peak levels. Two programmes could both peak at the same maximum and be wildly different in perceived volume, because peak level says nothing about how loud something sounds. This is why advertisements used to be jarringly louder than the programmes around them: they were peak-legal and heavily compressed, so their average level was far higher.

Regulation and platform policy fixed this by shifting to loudness measurement, which models how humans perceive volume rather than what the waveform peaks at. The standards that came out of it — ITU-R BS.1770 for the measurement algorithm, EBU R128 and ATSC A/85 for the practice built on it — are now the basis of essentially every delivery specification you will encounter.

For dubbing, this matters more than for original production, because you are producing multiple audio tracks that must be interchangeable. A viewer switching from the English track to the German one should not reach for the volume control.

## The Measurements

**LUFS — Loudness Units relative to Full Scale.** The unit of loudness measurement. Also called LKFS in the North American standards; the two are identical in practice. Negative values, where closer to zero is louder. A programme measured at -16 LUFS is louder than one at -23 LUFS.

**Integrated loudness.** The loudness of the entire programme, measured over its full duration with a gating function that excludes silence and very quiet passages. This is the number delivery specifications refer to when they state a target.

**Short-term and momentary loudness.** Measured over three-second and 400-millisecond windows respectively. Useful for finding problem passages within a programme rather than for delivery compliance.

**Loudness range — LRA.** The spread between quiet and loud parts, in loudness units. High LRA means dynamic content; low LRA means heavily compressed. Some specifications set a maximum, because content with a very wide range is hard to listen to in noisy environments.

**True peak — dBTP.** The maximum level of the reconstructed analogue waveform, which can exceed the maximum sample value because the waveform passes between samples. Measuring sample peaks alone underestimates this. Specifications set a true peak ceiling to prevent distortion in downstream encoders and consumer devices.

**Dialogue loudness.** Some broadcast specifications measure loudness of the dialogue specifically rather than the full mix, on the reasoning that dialogue is what listeners anchor their volume setting to.

## The Targets You Will Encounter

Targets differ by destination, and there is no single correct number. The pattern is that broadcast is quieter and streaming is louder, with online video louder still.

**European broadcast, EBU R128:** -23 LUFS integrated, with a true peak ceiling of -1 dBTP. Tolerance is typically ±0.5 LU. This is the strictest and most widely enforced broadcast standard.

**North American broadcast, ATSC A/85:** -24 LKFS, true peak -2 dBTP. Effectively the same philosophy with a different anchor.

**Streaming platforms** generally normalise on playback rather than rejecting non-compliant files, and publish targets in the region of -14 to -16 LUFS for their normalisation reference. Delivering louder than the platform target means it turns you down; delivering quieter means it may turn you up or leave you quiet relative to everything else.

**Music streaming services** cluster around -14 LUFS with their own peak requirements.

**Podcast distribution** conventionally sits around -16 LUFS for stereo and -19 for mono, though platform practice varies.

**Cinema** works on a different system entirely, with reference level calibration rather than a LUFS target.

The critical practical point: deliver to the specification of the destination, and where content goes to multiple destinations, master to the strictest and let normalisation handle the rest. A file that meets -23 LUFS will be turned up by a streaming platform's normalisation and will sound correct. A file mastered at -9 LUFS to sound loud will be turned down, and everything the loudness was bought with — heavy compression, reduced dynamics — remains, so it sounds worse than the quieter master at the same playback volume.

[![Studio monitors and audio equipment](https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Loudness Problems Specific to Dubbing

**Cross-language mismatch.** The most consequential. Each language track is generated separately, and without a fixed target they land at different loudness. Viewers switching tracks encounter a level jump, and platforms that normalise per track can make the mismatch worse rather than better if one track's measurement is skewed by an unusual amount of silence.

**Dialogue-to-background balance drift.** The original mix had a relationship between dialogue and the music and effects bed. When dialogue is replaced, that relationship is rebuilt, and it is easy to end up with dialogue sitting further forward or further back than in the original. The full mix can measure correctly while the dialogue sits wrong.

**Compression stacking.** Generated speech is often already level-controlled. Adding a compressor and limiter in the mix stage on top of that flattens dynamics further, producing dialogue with no light and shade. The symptom is a track that measures fine and sounds relentless.

**True peak overshoot from limiting.** Pushing to hit a loudness target with a limiter set to sample peak rather than true peak produces inter-sample peaks above the ceiling. These survive as distortion after lossy encoding, which is exactly when they become audible.

**Silence gating artefacts.** Integrated loudness gating excludes silence. A dub with substantially more silence than the original — common where the target language is more concise — can measure differently from the original despite the speech itself being at the same level. Measure and adjust rather than assuming parity.

**Expansion pressure.** Where target language text is longer, there is a temptation to fit it by increasing pace, which raises the density of speech and with it the measured loudness. Loudness compliance and timing compliance interact.

## Building a Loudness Workflow

**Set the target once per project, from the primary destination.** Record it in the project configuration alongside the true peak ceiling and any loudness range constraint.

**Normalise every language track to the same integrated target.** This is the single most important step, and it is fully automatable.

**Measure dialogue separately from the full mix.** A dialogue-only loudness measurement, taken before the background is added, is the best guarantee that dialogue sits consistently across languages. Match dialogue loudness across tracks, then rebuild the mix around it.

**Limit to true peak, not sample peak.** Any modern limiter has a true peak mode. Use it, and leave the specified headroom rather than the last fraction of a decibel.

**Do not process to hit the number blindly.** If a track needs heavy compression to reach the target, the problem is usually in the mix rather than in the final stage. Loudness normalisation exists precisely so that you do not have to compress for level.

**Check loudness range as well as integrated loudness.** A track that meets its target with an LRA of one loudness unit is over-compressed regardless of what the integrated figure says.

**Automate compliance checking in the pipeline.** Measuring integrated loudness, true peak, and LRA on a rendered file takes seconds and can gate publication. This catches the whole class before anyone hears it.

**Keep the measurement report as delivery evidence.** Broadcast and platform delivery specifications frequently require it, and generating it after the fact is more work than capturing it during the render.

## Testing and Verification

Automated measurement catches specification breaches. It does not catch everything.

**Listen to the language switch.** Play the same passage on two language tracks back to back at a fixed system volume. Any perceptible jump is a problem regardless of what the meters say.

**Listen on a phone speaker.** A large share of the audience does. Dialogue that is clear on monitors can disappear under background on a small speaker, particularly where the dub's dialogue sits lower than the original's.

**Check the quietest passage.** Integrated loudness averages, and a track that meets its target overall can have passages that are unusably quiet.

**Check the loudest passage for peak compliance**, not just the whole-file maximum.

**Verify after encoding, not before.** Lossy encoding can push inter-sample peaks higher. Measurement on the mezzanine file does not guarantee compliance of the delivered file.

[![Person monitoring audio with headphones](https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## A Working Checklist

- Determine the loudness specification of the primary destination before mastering anything.
- Record the integrated target, true peak ceiling, and any LRA limit in project configuration.
- Normalise every language track to the same integrated loudness target.
- Measure dialogue loudness separately and match it across languages before mixing backgrounds.
- Preserve the original's dialogue-to-background balance rather than rebuilding it by ear per language.
- Use true peak limiting, not sample peak, and keep the specified headroom.
- Avoid stacking compression on speech that is already level-controlled.
- Check loudness range as well as integrated loudness to catch over-compression.
- Account for differing silence content between languages when comparing measurements.
- Automate loudness and peak compliance checks as a publication gate.
- Verify compliance on the encoded delivery file, not only on the mezzanine.
- Listen to a language switch at fixed volume to catch mismatches meters miss.
- Check dialogue intelligibility on a phone speaker.
- Retain measurement reports as delivery evidence.

## Frequently Asked Questions

**What loudness should I target for dubbed video?**

Whatever the primary destination specifies. European broadcast is -23 LUFS with a -1 dBTP ceiling; North American broadcast is -24 LKFS at -2 dBTP; streaming platforms normalise around -14 to -16 LUFS. When content goes to several destinations, master to the strictest and let platform normalisation handle the rest — a quieter compliant master turned up sounds better than a loud master turned down.

**Why do my language tracks sound like different volumes even though they measure the same?**

Usually the dialogue-to-background balance rather than the overall level. Integrated loudness measures the full mix, so a track with dialogue sitting lower and music sitting higher can measure identically to one with the opposite balance while sounding quieter in speech. Measure dialogue-only loudness separately and match that across languages.

**What is the difference between true peak and sample peak?**

Sample peak is the highest sample value in the digital file. True peak estimates the highest level of the analogue waveform reconstructed from those samples, which can be higher because the waveform passes between sample points. Limiting to sample peak leaves inter-sample peaks that survive as distortion after lossy encoding — which is precisely when the audience hears them.

**Should I compress dubbed dialogue to hit the loudness target?**

Rarely. Generated speech typically arrives already level-controlled, and adding compression on top flattens dynamics into something relentless. If a track cannot reach its target without heavy compression, the problem is in the mix. Loudness normalisation exists so that level can be achieved by gain rather than by dynamics processing.

**Does loudness compliance need checking on every language separately?**

Yes. Each track is generated and mixed independently, so each can drift. Automating integrated loudness, true peak, and loudness range measurement per track as a publication gate takes seconds per file and catches the entire class of failure before anyone hears it.

**Should short clips be measured the same way as full programmes?**

No, and this catches people out. Integrated loudness uses a gating function that needs enough material to settle, and on very short clips — a few seconds of speech cut from a longer video — the measurement becomes unstable and can be misleading. For short-form output, match the clip's loudness to the parent programme's measured level rather than measuring the clip in isolation, so that a set of clips cut from one video stays consistent with each other and with the source.

**Why does the same file measure differently before and after encoding?**

Lossy encoding alters the waveform, and inter-sample peaks can rise as a result. A file that measures at exactly the peak ceiling before encoding can exceed it afterwards. Leave the headroom the specification asks for rather than pushing to the limit, and verify compliance on the actual delivery file.

---

Related reading: [Improving Source Audio for Translation](/blog/improving-source-audio-for-translation) | [Dialogue and Music Separation Explained](/blog/dialogue-music-separation-explained) | [AI Video Dubbing Quality Guide](/blog/ai-video-dubbing-quality-guide)
