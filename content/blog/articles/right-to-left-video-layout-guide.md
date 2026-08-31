---
{
  "title": "Right-to-Left Video Layout: Subtitles, Titles, and UI for Arabic and Hebrew",
  "slug": "right-to-left-video-layout-guide",
  "category": "Technical Guides",
  "primaryKeyword": "right-to-left video layout",
  "metaDescription": "How bidirectional text breaks video layouts, why numbers and brand names misplace in Arabic and Hebrew subtitles, and how to render RTL content correctly.",
  "excerpt": "Bidirectional text does not fail loudly. It fails by putting the closing bracket on the wrong side, and only your readers notice.",
  "publishedAt": "2026-08-27T16:00:00Z",
  "updatedAt": "2026-08-27T16:00:00Z",
  "heroImage": "/assets/blog/images/opposing-crescent-glass.png",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

[![Quality control review station with waveform display](https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Which Languages, and What Changes

Arabic, Hebrew, Persian, Urdu, Pashto, Dhivehi, and several others are written right to left. Between them they cover markets with several hundred million speakers, and they are frequently among the higher-value additions to a localization programme.

What changes is not simply the reading direction of the text. It is the direction of the entire layout: where things start, how they flow, which side is the beginning.

**Text flows right to left**, so the first word of a line sits at the right edge.

**Line order is unchanged.** Lines still stack top to bottom. This surprises people expecting everything to mirror.

**Numbers run left to right** even inside right-to-left text. A phone number, a price, a date, a version number — all read left to right, embedded in a right-to-left sentence. This is why the term is *bidirectional* rather than simply right-to-left.

**Latin-script content runs left to right too.** Brand names, product names, URLs, and code all keep their direction inside an Arabic or Hebrew sentence.

**Punctuation position depends on context.** A question mark ends a sentence, and in right-to-left text that means it appears at the left. Brackets, quotes, and other paired marks mirror: the character that opens is the one on the right.

**Interface layout mirrors.** Progress bars fill right to left, back and forward controls swap, and content alignment flips. This applies to the player surrounding your video as much as to the video itself.

## Why Bidirectional Text Is Hard

Unicode defines an algorithm — the Unicode Bidirectional Algorithm — that determines display order from the logical order of characters. Text is stored in the order it is read; the renderer works out where each run goes.

The algorithm assigns each character a directional property. Arabic and Hebrew letters are strongly right-to-left. Latin letters are strongly left-to-right. Digits are weak. Punctuation and spaces are neutral, taking direction from their surroundings.

Neutral characters are where the problems concentrate. A punctuation mark between an Arabic word and a Latin word has no inherent direction, and the algorithm resolves it by rules that produce the right answer most of the time and the wrong answer in specific, common cases.

The classic failure: an Arabic sentence ending with a Latin brand name followed by a full stop. The full stop is neutral, its neighbours pull in different directions, and it can render at the wrong end of the line. The text is stored correctly. It displays incorrectly. No error is raised anywhere.

Unicode provides explicit control characters — marks and isolates — that force the resolution. The modern recommended ones are the isolate characters, which cleanly separate a run of one direction embedded in another. Using them correctly fixes most bidirectional rendering problems.

Two operational consequences follow. First, these control characters are invisible and must survive your entire pipeline; any cleanup step that strips non-printing characters will silently corrupt the layout. Second, the same string can render differently in different players, because bidirectional support varies in quality, so verification must happen in the actual target player.

## Subtitles in Right-to-Left Languages

**Set the base direction explicitly.** Do not rely on the renderer inferring it from content. WebVTT and TTML support direction attributes; use them. SRT does not, which means direction is determined by the player's guess, and players guess differently.

**Line breaks and word order interact.** Breaking a line changes where each run sits. A cue that reads correctly on one line can render confusingly when broken, particularly where a Latin brand name lands at a break. Check every multi-line cue rather than assuming.

**Numbers need attention.** Arabic uses two digit sets — the Western digits familiar in Europe, and Eastern Arabic-Indic digits — and preference varies by region. Persian uses a further variant. Pick per market and be consistent, since mixing them within a track looks careless.

**Punctuation has distinct characters.** Arabic has its own comma, semicolon, and question mark with their own code points and mirrored shapes. Using the Latin characters instead produces text that reads as unpolished.

**Brand names and technical terms** left in Latin script are the most common source of bidirectional problems. Wrap them in isolate characters and verify.

**Alignment and positioning.** A subtitle positioned to avoid on-screen text may need a different position in the right-to-left version, because the burned-in text it was avoiding is on the other side in the localized picture.

[![Person reading text on a tablet](https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Typography and Fonts

Arabic script has requirements that Latin-focused pipelines do not anticipate.

**Letters are cursive and contextual.** Each letter has different forms depending on whether it is isolated, initial, medial, or final, and the correct form is selected by the shaping engine. A pipeline that renders text without proper shaping produces disconnected letterforms that are close to unreadable — a well-known and immediately visible failure.

**Diacritics sit above and below.** Vowel marks are optional in most contexts but appear in religious, educational, and children's content, and they need vertical space that tightly-set subtitle layouts do not always provide.

**Line height needs more room.** Arabic script has larger effective vertical extent than Latin at the same nominal size. Layouts tuned for Latin will look cramped.

**Effective size differs.** Arabic at the same point size as Latin often reads smaller, and a modest size increase improves legibility.

**Font support is uneven.** Many fonts that claim Arabic coverage support it minimally, with poor shaping and no support for the extended characters Persian and Urdu need. Urdu conventionally uses the Nastaliq style, which is calligraphically distinct and supported by relatively few fonts; rendering Urdu in a Naskh font is legible but reads as foreign to Urdu readers.

**Persian and Urdu have additional letters** beyond the Arabic set. A font covering Arabic does not necessarily cover them.

**Test with real text.** Placeholder text and machine-generated samples do not exercise shaping and diacritics the way real content does.

## Video Layout Beyond Subtitles

**Lower thirds and titles.** These must be redesigned, not merely translated. A name plate anchored to the left of frame with text flowing right belongs on the right in a right-to-left version. Simply replacing the text inside the existing graphic produces a layout that fights itself.

**On-screen graphics with directional meaning.** Arrows, timelines, before-and-after comparisons, and process diagrams carry directional semantics. A left-to-right progression reads as backwards to a right-to-left reader. Some of these should mirror and some should not — a clock face does not mirror, and a photograph of a real place should not — so it is a judgement call per graphic rather than a global transform.

**Logos never mirror.** Nor do images of text in the source language, nor anything where mirroring would misrepresent reality.

**Text expansion.** Arabic is often more concise than English in character count while occupying comparable width, and Persian and Urdu vary. Do not assume shorter text means a looser fit.

**Player interface.** The controls around the video should mirror for a right-to-left interface locale, including the seek bar direction. A mirrored interface with an unmirrored seek bar is more confusing than either consistent choice.

**Burned-in text is a trap.** Text rendered permanently into the picture cannot be re-laid-out for a right-to-left version. Keep titles as separate assets that can be regenerated per language.

## Verification

Bidirectional problems evade automated checking because the text is technically correct. Verification has to be visual, and it has to be done by someone who reads the language.

**Review rendered output, not source files.** The bug is in rendering.

**Review in the actual target player**, ideally more than one, since bidirectional support quality varies.

**Have a native reader check it.** A non-reader cannot see a misplaced full stop or a wrongly-formed letter. This is not optional.

**Check every cue containing Latin text or digits**, which is where problems concentrate.

**Check every multi-line cue**, since breaking changes layout.

**Check the first and last frames of titles and lower thirds.**

**Verify that invisible control characters survive** the full pipeline through to delivery. A round-trip test through every processing stage catches the cleanup step that strips them.

[![Designer reviewing layouts on a screen](https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## A Working Checklist

- Set base text direction explicitly rather than letting the player infer it.
- Prefer WebVTT or TTML over SRT for right-to-left subtitles, since they carry direction attributes.
- Wrap Latin brand names, URLs, and technical terms in Unicode isolate characters.
- Never strip invisible control characters in cleanup steps.
- Choose a digit set per market and use it consistently.
- Use Arabic punctuation characters rather than Latin equivalents.
- Verify text shaping produces connected contextual letterforms.
- Allow extra line height and consider a modest size increase for Arabic script.
- Choose fonts with genuine coverage, including Persian and Urdu extended letters.
- Use a Nastaliq-style font for Urdu where the audience expects it.
- Redesign lower thirds and titles for right-to-left anchoring rather than swapping the text.
- Decide per graphic whether directional imagery should mirror; never mirror logos or real-world photography.
- Keep on-screen text as separate assets rather than burning it into the picture.
- Mirror the player interface including seek bar direction for right-to-left locales.
- Verify visually, in the real player, with a native reader, on every cue containing Latin text or digits.

## Frequently Asked Questions

**Why does the punctuation appear on the wrong side of my Arabic subtitles?**

Because punctuation marks are directionally neutral and take their direction from the surrounding text. When neighbours pull in different directions — typically an Arabic word next to a Latin brand name — the Unicode bidirectional algorithm can resolve them to the wrong end of the line. The text is stored correctly and displays incorrectly. Wrapping the embedded Latin run in Unicode isolate characters resolves it.

**Do I need to mirror everything for right-to-left languages?**

No. Text direction and layout anchoring mirror; line stacking does not. Logos never mirror, and photographs of real scenes should not. Directional graphics such as arrows and process diagrams usually should, because a left-to-right progression reads as backwards, but this is a judgement per graphic rather than a global transform.

**Can I use SRT for Arabic and Hebrew subtitles?**

You can, and you will get inconsistent results. SRT has no way to declare base text direction, so each player infers it from content and they infer differently. WebVTT and TTML both support explicit direction attributes, which removes the guesswork. If SRT is unavoidable, verify in every player you actually deliver to.

**Why do the Arabic letters look disconnected?**

The rendering pipeline is not performing text shaping. Arabic is cursive, and each letter takes a different form depending on its position in the word. Without shaping, letters render in isolated form and the result is close to unreadable. This is a font or renderer capability problem rather than a data problem — the underlying text is correct.

**Which digits should I use in Arabic subtitles?**

It depends on the market. Western digits are standard in much of North Africa and increasingly common elsewhere; Eastern Arabic-Indic digits are conventional in parts of the Gulf and the Levant; Persian uses a further variant. Decide per market, record it in the style guide, and use it consistently — mixing sets within one track reads as careless.

**Does Hebrew need different handling from Arabic?**

Some of it overlaps and some does not. Both are right to left, both embed left-to-right runs, and both need explicit base direction and isolate characters around Latin text. Hebrew is not cursive, so the contextual shaping requirement that makes Arabic rendering fragile does not apply, and font coverage is generally simpler. Hebrew has its own punctuation conventions and its own optional vowel pointing, and it uses Western digits rather than offering a choice of digit sets. Treat them as related but separate configurations rather than one right-to-left setting.

**How do I test right-to-left rendering without reading the language?**

You cannot, fully. Automated checks catch missing control characters and font coverage gaps, but the characteristic failures — a misplaced full stop, an incorrectly shaped letter, a lower third anchored to the wrong side — are visible only to someone who reads the script. Budget a native reader review for the first assets in each right-to-left language and spot checks thereafter.

---

Related reading: [Translate Video to Arabic](/blog/translate-video-to-arabic) | [Translate Video to Hebrew](/blog/translate-video-to-hebrew) | [Multilingual Subtitles Guide](/blog/multilingual-subtitles-guide)
