---
{
  "title": "Video Translation Quality Checklist: 25 Checks Before You Publish",
  "slug": "video-translation-quality-checklist",
  "category": "Localization",
  "primaryKeyword": "video translation quality checklist",
  "metaDescription": "A 25-point quality checklist for video translation, covering source prep, transcription, translation, audio, subtitles, and publishing.",
  "excerpt": "Catching errors before you publish a translated video is far cheaper than correcting them after. These 25 checks cover the full pipeline from source preparation to final export.",
  "publishedAt": "2026-08-23T09:00:00Z",
  "updatedAt": "2026-08-23T09:00:00Z",
  "heroImage": "/assets/blog/images/floating-shard-array.png",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

[![Video translation quality review process](https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Why a Systematic Checklist Saves Time

Most video translation errors are caught too late. The translator reviews the transcript, the platform generates subtitles or dubbed audio, and the reviewer checks what they can in the time available — which is rarely enough. Then the video goes live and someone in the target market spots a terminology error in the third subtitle, or the audio drops out at a scene cut, or the subtitle text overflows its box on a mobile screen.

Systematic quality checking is not a luxury reserved for high-budget productions. It is a workflow discipline that catches predictable failure modes before they reach an audience. Each of the 25 checks in this guide targets a specific type of error at a specific stage of the translation pipeline. Working through them in order — source preparation first, publishing last — ensures that problems are found when they are cheapest to fix.

The checks are organized into six categories: Source Preparation, Transcription, Translation, Audio and Dubbing Quality, Subtitle Quality, and Publishing. Some checks apply to every project; others apply only to specific output types. Where a check applies selectively, that is noted. Use this list as a working document: assign each check to a responsible person, set a completion status, and do not move to the next category until the current one is closed.

## Category 1: Source Preparation (5 Checks)

Getting the source material right before translation begins eliminates a significant proportion of downstream problems. Errors in the source compound at every stage: a misheard word becomes a mistranslated word in the transcript, which becomes a wrong subtitle, which persists in the published video. Source-stage fixes cost almost nothing; the same fix after publication costs multiples of the original production time.

**Check 1: Verify audio quality throughout the source file.** Listen to the source from start to finish, paying specific attention to moments where speech is difficult to understand — not just the overall quality, but individual problem moments. Background noise, multiple overlapping speakers, significant volume variation, and low-bitrate audio all degrade transcription accuracy. If you can identify problem sections before submission, you can flag them for extra review or, ideally, source a cleaner audio version. AI transcription accuracy is directly correlated with source audio clarity.

**Check 2: Confirm the source file is the final locked edit.** In projects with multiple production stages, it is common to submit a near-final rather than final version for translation. If the edit is subsequently changed — a scene shortened, a clip replaced, a title card updated — the translated audio and subtitles will be misaligned with the video. Before beginning any translation work, confirm in writing that the edit is locked. Note the source file's modification date or version number in your project record.

**Check 3: Identify and list all on-screen text.** Text that appears visually — lower thirds, title cards, slide text, watermarks — is not handled by audio or subtitle translation. Make a complete list of every text element that appears on screen, decide which require translation for the target market, and plan the production work to replace them. Catching this in the source-preparation stage prevents schedule surprises when QA discovers untranslated text three days before the publish date.

**Check 4: Confirm the target language and regional variant.** Latin American Spanish and Castilian Spanish differ in vocabulary, pronunciation, and formality conventions. Brazilian and European Portuguese differ enough that speakers notice immediately. Simplified and Traditional Chinese serve different markets. Confirm the specific variant, not just the language, before any translation work begins — changing it later means starting over.

**Check 5: Assemble the terminology glossary.** List every proper noun, product name, technical term, and industry-specific phrase in the content, with the correct spelling of each. Decide which terms remain untranslated and what the approved translation is for the rest. This glossary is the single highest-leverage artifact in the pipeline: it prevents the same error from recurring in transcription, translation, and audio generation.

## Category 2: Transcription (4 Checks)

The transcript is the foundation for everything downstream. An error here propagates through translation, subtitles, and generated audio, and becomes progressively more expensive to correct at each stage.

**Check 6: Verify all proper nouns against the glossary.** Automatic transcription renders unfamiliar names phonetically. Company names, personal names, place names, and product names are the most frequent casualties. Search the transcript for each glossary term and confirm correct rendering. This check takes minutes and prevents errors that would otherwise reach the published video.

**Check 7: Confirm numbers, dates, units, and currencies.** Spoken numbers are transcribed inconsistently, particularly when delivered quickly. Verify every figure against the audio. Pay attention to units and currency, which will also need conversion decisions during translation — whether to convert measurements and prices for the target market or retain source values is a decision to make deliberately, not by default.

**Check 8: Check speaker attribution in multi-speaker content.** Confirm that each speaker's lines are correctly attributed and that no two speakers have been merged into a single block. Misattribution here produces wrong voice assignment during audio generation, which is expensive to fix after the fact.

**Check 9: Review sentence boundaries and segmentation.** Automatic transcription places sentence breaks based on pauses, which does not always match grammatical structure. Poorly placed breaks produce awkward translation units and subtitle segments that split mid-thought. Correct obvious errors before translation.

## Category 3: Translation (5 Checks)

Translation quality determines whether the final output serves its audience. These checks require someone who reads the target language; they cannot be performed by the project owner working alone unless they are fluent.

**Check 10: Confirm glossary terms are applied consistently.** Search the translated script for each glossary term and verify that the approved translation is used every time. Inconsistent terminology is the most common quality complaint from in-market reviewers and the easiest to prevent systematically.

**Check 11: Verify register and formality are appropriate and consistent.** Many languages encode formality grammatically — *tú* versus *usted*, *du* versus *Sie*, *tu* versus *vous*, and the Japanese politeness levels. The correct choice depends on audience and content type, and it must be applied consistently throughout. Mixed register within a single video reads as careless.

**Check 12: Check idioms and cultural references for adaptation.** Literal translations of idiomatic expressions are the clearest marker of unreviewed machine translation. Identify every idiom, metaphor, sports reference, and culture-specific example in the source, and confirm that each has been either adapted to an equivalent target-language expression or restated plainly.

**Check 13: Have a native speaker review against the source.** A native speaker of the target language, ideally with subject-matter familiarity, should read the translation alongside the source. Give them a specific brief: flag terminology a practitioner would not use, register mismatches, sentences that read as translated, and anything that would not land culturally. Ask for severity ratings so you can triage blocking issues from preferences.

**Check 14: Assess translated length against timing constraints.** Compare the translated segment lengths against their allotted time ranges. Spanish, French, and German typically expand English by 15-30%; Japanese and Korean often contract it. Segments that expand significantly need condensing before audio generation, not speed adjustment afterward.

## Category 4: Audio and Dubbing Quality (5 Checks)

These checks apply to projects producing dubbed audio. Subtitle-only projects can skip to Category 5.

**Check 15: Verify voice selection matches speaker and content.** The voice should match the apparent age, gender, and energy of the original speaker, and the register should suit the content type. Generate a sixty-second sample and listen before processing the full video — a voice problem discovered after full generation costs a complete regeneration cycle. In multi-speaker content, confirm the assigned voices are distinguishable from each other.

**Check 16: Listen to the full generated track for pronunciation errors.** Play the complete dubbed audio and note every mispronounced proper noun, product name, and technical term. Most platforms accept phonetic overrides; apply them and add the correction to your glossary so it persists into future videos rather than being rediscovered each time.

**Check 17: Check prosody, emphasis, and sentence intonation.** Listen for statements delivered with question intonation, emphasis landing on the wrong word, and unnatural pauses mid-phrase. These errors do not affect literal accuracy but make the audio sound synthetic and reduce comprehension.

**Check 18: Verify audio and video stay synchronized throughout.** Timing drift accumulates. Check sync at the start, at several points in the middle, and — critically — at the end of the video, where drift concentrates. Pay attention to scene cuts, where misalignment is most visible.

**Check 19: Confirm consistent levels and clean transitions.** Dialogue should sit at a consistent loudness throughout, and segment boundaries should be free of clicks, abrupt level changes, and unnatural silence. Where the source has music and effects, confirm those elements are preserved beneath the new dialogue at appropriate levels.

## Category 5: Subtitle Quality (4 Checks)

These checks apply to projects producing subtitle tracks, whether as the primary output or alongside dubbed audio.

**Check 20: Verify reading speed is within acceptable limits.** Subtitles that display too briefly for the text they contain force viewers to choose between reading and watching. General guidance falls around 15-20 characters per second for Latin scripts and 4-6 characters per second for Chinese, with slower rates appropriate for dense technical content and for audiences reading in a second language.

**Check 21: Check line length, line count, and line breaks.** Confirm lines stay within platform limits — typically around 42 characters for Latin scripts — and that no subtitle exceeds two lines. Line breaks should fall at natural phrase boundaries rather than mid-clause. For languages without word spacing, verify that breaks do not land mid-word.

**Check 22: Confirm subtitle timing aligns with speech and scene cuts.** Subtitles should appear as speech begins and clear shortly after it ends. Subtitles that persist across a scene cut are visually jarring; where possible, align subtitle boundaries with shot changes.

**Check 23: Verify rendering on the target display sizes.** Check subtitles on a phone screen, not only on a desktop monitor. Text that reads comfortably at desktop size may overflow, truncate, or become unreadable on mobile — where the majority of viewing happens. Confirm character encoding renders correctly and that the chosen font contains glyphs for every character used.

## Category 6: Publishing (2 Checks)

The final checks confirm that the finished asset is correctly packaged and described for its destination.

**Check 24: Localize metadata, thumbnails, and on-screen text.** Titles, descriptions, tags, and chapter markers should be written for the target market rather than translated literally from the source — search behavior differs by language, and a direct translation often produces a phrase nobody searches for. Confirm that on-screen text identified in Check 3 has been handled consistently, and that thumbnails carrying text have localized versions.

**Check 25: Complete a full-length final watch-through.** Watch the entire finished video at normal speed without pausing, in conditions resembling how the audience will view it. This catches problems that segment-level review misses: cumulative drift, missing or duplicated sections, inconsistent quality between the first and last third. Then verify the exported file plays correctly on the destination platform before publishing.

## Making the Checklist Operational

A checklist only works if it is used the same way every time. Three practices make the difference between a document that improves quality and one that gets acknowledged and ignored.

**Assign ownership per check.** Each check should have a named responsible person, not a team. Checks 10 through 13 require target-language fluency and cannot be completed by a project owner who does not read the language. Checks 15 through 19 require careful listening in the target language. Identify who performs each check before the project starts, not when it reaches that stage.

**Gate progression between categories.** Do not begin translation until source preparation and transcription are closed. Do not generate audio until translation review is complete. The categories are ordered by cost of correction, and skipping ahead reliably produces rework.

**Record outcomes and feed them back.** Log which checks catch errors on each project. Over time this reveals where your particular pipeline is weak — perhaps transcription consistently fails on technical vocabulary, or a specific language routinely has register problems. That pattern tells you where to invest: a better glossary, a different reviewer, a change in voice selection. A checklist that generates this data becomes a quality improvement mechanism rather than just a gate.

## Scaling the Checklist to the Project

Not every video warrants all twenty-five checks. A two-minute internal announcement and a forty-minute compliance course sit at opposite ends of a spectrum, and applying identical rigor to both wastes effort on one and under-serves the other.

For low-stakes, short-lived content, a reduced set covering source quality, glossary application, native-speaker review, and a final watch-through captures most of the value. For high-stakes content — regulated training, customer-facing material, anything with a long shelf life — run the full list and document completion.

The deciding factors are audience size, content lifespan, and the cost of an error reaching the public. A video that will be watched by thousands of employees for the next two years justifies several hours of quality work. One that will be watched by forty people this week does not.

What should never be skipped, regardless of scale, is native-speaker review of the translation. It is the check with the highest catch rate for the errors that damage credibility most, and no amount of downstream polish compensates for a translation that a native speaker would have flagged in twenty minutes.
