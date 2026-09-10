---
{
  "title": "How to Translate Video to Cantonese: Spoken Register and Written Chinese",
  "slug": "translate-video-to-cantonese",
  "category": "Translation Guides",
  "primaryKeyword": "translate video to Cantonese",
  "metaDescription": "Learn how to translate video to Cantonese with the right spoken register and written Chinese choices, including subtitles, fonts, and timing fixes.",
  "excerpt": "This guide explains how to translate video to Cantonese without treating it as a Mandarin checkbox. You get practical guidance on spoken register, Traditional versus Cantonese characters, subtitle timing, fonts, and platform-ready delivery.",
  "publishedAt": "2026-09-02T19:00:00Z",
  "updatedAt": "2026-09-02T19:00:00Z",
  "heroImage": "/assets/blog/images/particle-terrain-wave.png",
  "heroImageAlt": "Abstract dark-glass panels with glowing Cantonese speech and subtitle waveform lines.",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

Cantonese is usually treated as a checkbox on a language list. A creator has a library of English videos, a translation budget, and a platform that accepts a language code, so the assumption forms that a Mandarin version with Traditional Chinese subtitles will serve Cantonese viewers. It will not. A viewer in Hong Kong hearing Mandarin is hearing a different language, and a subtitle track written in Standard Written Chinese does not match the words in a Cantonese dub.

The difficult part of this work is not the model. It is the decisions around the model. To translate video to Cantonese, you produce two artifacts that do not fully share a written form: a spoken track in Cantonese and a text track in Traditional Chinese that may follow either written Cantonese or Standard Written Chinese. Those are independent choices, and the most common failure is letting them drift apart without noticing.

This guide covers the Cantonese audience across Hong Kong, Macau, Guangdong, and the diaspora; the linguistic traits that break naive dubbing and subtitling; how Traditional and Cantonese-only characters affect fonts and line length; what to do when translated text outgrows its timecode; the register and glossary decisions to settle before the first run; voice selection and cloning for a recurring presenter; and a review process a non-speaker can run. The last section gives a first-project plan with a measurement scheme.

## Who you are actually publishing for when you translate video to Cantonese

### Hong Kong and Macau

Hong Kong is the largest and most commercially relevant Cantonese media market. Spoken Cantonese is the everyday language, Traditional Chinese is the written standard, and English exposure is high. Subtitling conventions split by genre: casual content often uses written Cantonese, while news, documentaries, and corporate material lean on Standard Written Chinese. Macau is similar in language and writing but much smaller, with Portuguese confined largely to administration.

### Guangdong and the mainland Cantonese belt

Guangzhou, Foshan, Dongguan, and parts of Shenzhen maintain spoken Cantonese in daily life, but written media is Simplified Chinese and broadcast is dominated by Mandarin. Many viewers there read Simplified characters and Standard Written Chinese comfortably. A Traditional, written-Cantonese track reads as specifically Hong Kong, which is neutral for entertainment and less suitable for training or regulated content.

### Cantonese-speaking diaspora communities

Toronto, Vancouver, London, Sydney, San Francisco, Kuala Lumpur, and Singapore all hold substantial Cantonese-speaking populations, with literacy varying sharply by generation. Older viewers often read Traditional characters. Younger viewers may understand spoken Cantonese but read Simplified or English more easily, and many use the audio and turn subtitles off.

### What that means for a single deliverable

- One Cantonese audio track, mixed once and reused everywhere.
- Two subtitle tracks: Traditional with written Cantonese for Hong Kong and Macau, Simplified in Standard Written Chinese for Guangdong and part of the diaspora.
- Correct language tags, because platforms treat zh-HK, zh-Hant, zh-Hans, and yue differently and may route viewers by tag alone.
- Separate localization for titles, descriptions, and thumbnails, which are not part of the subtitle files.

If the budget supports only one subtitle track, choose Traditional written Cantonese and accept a smaller mainland audience, or choose Simplified Standard Written Chinese and accept that Hong Kong viewers will read text that does not match what they hear.

## Linguistic traits that affect dubbing and subtitling

### Six tones

Cantonese distinguishes six tones, and tone carries meaning rather than inflection. The syllable si becomes 詩 (poem) at tone one, 史 (history) at tone two, 試 (to try) at tone three, 時 (time) at tone four, 市 (market) at tone five, and 事 (matter) at tone six. A wrong tone is not an accent; it is a different word. Tone accuracy is the first thing a native listener notices, and the hardest thing for a non-speaker to verify by ear.

### Spoken Cantonese and Standard Written Chinese are different systems

Written Cantonese uses characters that barely appear in Standard Written Chinese: 係 for "to be," 唔 for "not," 嘅 as the possessive, 咗 as the perfective marker, 佢 for "he" or "she," 睇 for "watch," 喺 for "at," and 啲 for "some." A subtitle track written in Standard Written Chinese reads as a translation rather than a transcript of the audio. Decide deliberately, because a pipeline that defaults to one while the dub follows the other produces a mismatch Hong Kong viewers detect within seconds.

### Sentence-final particles carry meaning

Particles such as 呀, 啦, 喇, 囉, 㗎, 咩, 呢, and 嘛 mark mood, politeness, question type, and whether a speaker is asserting or checking. Dropping them makes a casual dub sound robotic and slightly cold. Overusing them in formal narration sounds flippant. They also add syllables, so particle policy is a timing decision as much as a tone decision.

### Code-switching is normal, not an error

Hong Kong Cantonese borrows English freely in speech. Purging every English word makes dialogue stiffer than the source material. Brand names, product terms, and technical vocabulary frequently stay in English, so the glossary should say so per term rather than applying one global rule.

## Traditional Chinese subtitles: characters, fonts, line length, reading speed

### Cantonese-only characters and font coverage

Written Cantonese relies on characters that rarely appear in Standard Written Chinese: 嘅, 咗, 喺, 冇, 嗰, 唔, 嚟, 睇, and 嘥 among them. If the font lacks them, the player substitutes a different face mid-line or renders empty boxes. Choose a font with broad CJK coverage, then test on the devices your audience uses: smart TV browsers, iOS, Android, and your web player. Burned-in subtitles avoid the font problem but lock the track permanently.

### Line length and reading speed

Work in characters per line and characters per second, not words per minute. A common working limit in Hong Kong subtitling is roughly 13 to 15 Traditional characters per line, with two lines maximum. Because each character corresponds to a syllable, a fast speaker can outrun the reading limit, and dense technical content needs a lower ceiling than casual conversation. Set a house limit and check every segment against it rather than eyeballing the file. Translating an existing track can preserve good timing, so the [subtitle translation workflow](/features/subtitle-translation) is worth understanding before you commit to a format.

### Punctuation, spacing, and embedded Latin text

Chinese subtitles often omit commas and periods, relying on line breaks for rhythm. Full-width punctuation occupies a full character cell, which changes how many characters fit. Latin terms inside Chinese lines need consistent spacing and should not break across a line boundary. Consistency matters more than the specific rule you pick.

### Technical checks before delivery

Confirm UTF-8 encoding, the correct language tag, and that your sidecar file does not reflow on the target player. Render a preview at the smallest supported text size. If you [generate subtitles](/features/subtitle-generation) from the finished Cantonese audio rather than from the English script, the text matches what is actually spoken, which removes an entire class of mismatch.

## Timing: expansion, contraction, and lines that no longer fit

### Measure per segment, not with a global ratio

English to Cantonese is not a single conversion factor. Spoken Cantonese syllable counts often run close to English for the same meaning, while the written form is far shorter in characters. The audio can therefore overflow a segment while the subtitle has room to spare, or the reverse. A first pass with [video translation](/features/video-translation) gives you segment-level timings; inspect duration and character count per segment and flag the outliers instead of trusting an average.

### Fixes in priority order

1. Rewrite the line. Remove hedges, repeated subjects, and honorifics that Cantonese would drop anyway.
2. Rebalance across segments. If a pause follows, move a clause into it.
3. Adjust the performance. Ask for a faster or slower read; keep the final particle and trim elsewhere instead of deleting it.
4. Extend the subtitle display. Push into a following pause, but stay inside the reading-speed limit.
5. Change the edit or accept a compromise. This is the last resort, and it should be documented so the decision is not repeated by accident.

### When the audio has to carry the timing

On-camera dubbing is constrained by lip synchronization, so if the video cannot move, the script must. For audio-only source material the same logic applies through [audio translation](/features/audio-translation), where the mix sets the timing and the text must follow it. If the Cantonese audio is the primary artifact, generate the subtitle from that final mix so the two agree by construction.

## What to decide before you translate video to Cantonese for the first time

### Register axes you actually have to choose

- Formality level: broadcast, corporate, vlog, or children's content.
- Subtitle language: written Cantonese or Standard Written Chinese.
- Particle policy: full in conversation, reduced, or absent.
- Address and pronouns: 你 rather than the rare 您, and 佢 without gender marking in speech.
- Humor and idiom: literal rendering or adapted equivalents.

### Where register failures show up

A vlog subtitle written in Standard Written Chinese reads like a news bulletin. A corporate training video full of casual particles sounds unserious. Missing particles make a warm host sound cold. Retaining every English slang term reads as authentic to one audience and careless to another. These failures are invisible in a back-translation and obvious to a viewer, which is why register must be specified before translation starts rather than fixed afterward.

### Build the glossary first

Names need a decision: Cantonese romanization such as Chan Tai Man, or Mandarin pinyin such as Chen Daming. Brands either stay in Latin script or get a transliteration, decided per term. Units are metric, currency includes HK$ and MOP, the clock is generally 24-hour, and date order should be fixed rather than inherited from the source file. Numbers stay as digits for prices, years, and measurements, while small counts in dialogue are spelled out. Store the glossary in project settings so every run applies it.

### Keep a one-page style sheet

Record the variant, register, particle policy, term list, number and date formats, typography rules, and the reviewer who approved it. Version the sheet. A change after publication implies either a full rerun or a patched pass, and knowing which is cheaper is a decision worth making once.

## Voice selection and voice cloning for a recurring presenter

### Casting for register and tone accuracy

Voice age, gender presentation, and energy all matter, but tone accuracy matters most. Animation tolerates a more expressive, higher-energy read; corporate content usually needs a neutral one. Test each candidate on two lines: one ending in a particle, and one containing an English loanword inside a Chinese sentence. Those two cases expose most problems before you commit to a full run.

### Preserving a presenter's voice with authorization

A speaker's voice can be preserved across languages when you have the right to use it. For a series with the same host, this keeps continuity: the Cantonese version sounds like the same person rather than a replacement. It requires a clean reference recording with one speaker, a consistent microphone, no music bed, and sufficient duration. Get written authorization from the speaker. If you are working with a hired voice actor, the contract needs to cover the clone, the languages it may be used in, the term, and reuse rights.

### Disclosure and credit

State plainly that the audio is dubbed or synthesized, in the description or the credits. Do not clone a voice you do not have rights to, and treat a public figure's voice with more caution than an internal one. Disclosure is a trust decision as much as a compliance one, and audiences react badly to discovering it later.

### Quality signals worth listening for

Tone errors, dropped particles, mangled English words inside Cantonese sentences, abrupt loudness changes, an absence of breath sounds, and lip-sync drift on close-ups. The [video dubbing](/features/video-dubbing) workflow handles the mechanics; the listening check is still yours.

## Reviewing work you cannot read, and a realistic first project

### Checks a non-speaker can run

- Duration and drift: audio length matches the video, no accumulating offset at the end, no truncated final line.
- Accidental English: sample the middle of segments, not just the openings.
- Encoding and glyphs: UTF-8 throughout, no empty boxes on TV, phone, or web player.
- Variant alignment: Traditional and Simplified tracks share timecodes and line counts.
- Glossary compliance: names, dates, currency, and product terms match the sheet.
- Loudness and clipping: consistent level, no digital peaks.
- Speaker turns: the correct speaker is voiced in multi-person dialogue.
- Particles: present in conversation, absent or reduced in narration.
- Lip sync: acceptable on close-ups, with the usual small offset.

### Briefing a native reviewer

1. State the variant and register in one line at the top.
2. Attach the glossary and style sheet.
3. First pass, audio only: mark meaning errors, register errors, tone errors, and particle problems.
4. Second pass, subtitles on: mark mismatches between audio and text, bad line breaks, and unreadable segments.
5. Require categorized comments and a per-segment verdict rather than a general impression.
6. Ask for the ten worst segments. A ranked list is more actionable than an average score.

### A realistic first project

Start with three to five videos from a single series, three to eight minutes each. Good candidates are talking-head explainers, product demonstrations, interviews, and single-speaker tutorials. Avoid songs, heavy wordplay, overlapping dialogue, baked-in on-screen text, and regulated claims in the first run. Produce one audio track and both subtitle variants for the same clips so the comparison is controlled.

### What to measure

- Retention on the Cantonese version against the original over the same window.
- Share of viewers who select a Chinese subtitle track rather than none.
- Comment volume and whether comments arrive in Cantonese.
- The reviewer's count of meaning errors per ten minutes.
- Cost per finished minute, including review time.
- Support messages asking what a line meant.

Set the threshold before you start. If the reviewer finds no meaning errors that change a claim, and retention holds near the original, the pipeline works and can be extended across the series. If retention collapses while comments praise the audio, the problem is usually typography or subtitle timing rather than the translation.

## Frequently asked questions

### Can I use Mandarin audio with Traditional Chinese subtitles for Cantonese viewers?

No. Mandarin and Cantonese are not mutually intelligible in speech, and Traditional subtitles do not repair that. A Hong Kong viewer will identify the audio as Mandarin and treat the video as a foreign-language asset.

### Should the subtitles be written Cantonese or Standard Written Chinese?

For Hong Kong and Macau entertainment, written Cantonese matches the audio and reads naturally. For Guangdong, mainland distribution, and formal content, Standard Written Chinese in Simplified characters is the safer default. Producing both tracks is the cleanest answer when budget allows.

### How many characters should fit on a subtitle line?

Treat roughly 13 to 15 Traditional characters per line as a working limit and verify it on the target player. Reading speed matters more than raw count, so a dense line displayed for one second is unreadable however few characters it holds.

### Do I need a native Cantonese reviewer?

Yes for anything customer-facing, humorous, or claim-bearing. A reviewer catches tone errors, particle mistakes, and register drift that no automated check detects. For internal or low-stakes content, a targeted review of the worst segments may be sufficient.

### Can the presenter's own voice be kept in the Cantonese version?

Yes, with authorization. Voice cloning preserves a speaker's voice across languages when you have a clean reference recording and explicit consent. Disclose the dubbing in the description or credits so viewers are not misled.

### Why do Chinese subtitles sometimes display as empty boxes?

The font in use lacks some Traditional or Cantonese-specific characters, and the player substitutes a face that does not contain them. Choose a font with broad CJK coverage and test on the devices your audience uses.

### Is machine translation enough on its own?

It is enough for a first draft and for testing demand. It is not enough for published customer-facing content without native review, because register and particle choice are where output fails, and those are what automated metrics do not measure.

## Conclusion

Before publishing anything, settle three things: variant and register, a glossary, and a named reviewer. Choose Traditional written Cantonese if Hong Kong and Macau are your priority, or Simplified Standard Written Chinese if reach across Guangdong and the wider diaspora matters more. Do not attempt both on the first run. Write the style sheet and the glossary in the same sitting, because a term you cannot define is a term your reviewer will flag on every video.

Then treat the first batch as a measurement rather than a launch. Produce three to five clips from one series, one Cantonese audio track, and two subtitle variants, and have a native reviewer run the two-pass process. Compare retention against the original, count the meaning errors per ten minutes, and note where the reviewer's attention concentrated. Those notes tell you whether the next problem to solve is the voice, the subtitles, or the script.

The next step is concrete: pick the series, record a clean reference clip if you intend to preserve the presenter's voice, write the style sheet, and book the reviewer before the first render. If it helps to see what a run includes first, check the [pricing page](/pricing), and you can [contact the team](/contact) about a specific library.
