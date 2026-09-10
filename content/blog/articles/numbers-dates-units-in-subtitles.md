---
{
  "title": "Numbers, Dates, and Units in Subtitles: Localization Details That Break Trust",
  "slug": "numbers-dates-units-in-subtitles",
  "category": "Technical Guides",
  "primaryKeyword": "number and date localization in subtitles",
  "metaDescription": "Learn how number and date localization in subtitles prevents costly trust breaks, with practical rules for separators, units, QA, and review.",
  "excerpt": "This guide explains how numbers, dates, and units break subtitle trust across markets, then gives editors and QA reviewers a repeatable system for catching errors. You get separator and unit rules, failure modes, and a spot-check method that works on a full deliverable without reading every cue.",
  "publishedAt": "2026-09-07T19:00:00Z",
  "updatedAt": "2026-09-07T19:00:00Z",
  "heroImage": "/assets/blog/images/classroom-glass-panes.jpg",
  "heroImageAlt": "Dark-glass abstract hero with subtitle lines, numeric glyphs, and decimal separator split",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

A subtitle that renders 1.500 where the audience expects 1,500 carries a thousandfold error, and it passes every spell check, character limit, and reading-speed check in the pipeline. Numeric defects are the smallest class of localization error by character count and among the largest by consequence, because a viewer who catches one stops trusting the track.

Numbers, dates, and units are compressed notation for conventions that differ between markets, and the compression is what makes them fragile. A decimal comma and a decimal point trade roles between English and most of continental Europe. A date written 04/05/2025 is two different days depending on where it is read. A billion is a different quantity in English and in French.

This guide treats number and date localization in subtitles as a system rather than a list of trivia. Each section covers the mechanism, the failure mode, and the decision an editor or QA reviewer has to make, closing with a rule set and a spot-check method that can be applied to a full deliverable without reading every cue.

## Decimal separators and digit grouping: the first place number and date localization in subtitles breaks
### The separator inversion

English writes 1,234.56: comma for grouping, period for the decimal. German inverts both to 1.234,56, French uses a space and a comma, and Swiss German uses an apostrophe in 1'234.56.

A separator followed by three digits is dangerous. In English, 1.500 means one thousand five hundred; in German it means one and a half. Below one, en-US writes 0.5 where several locales write ,5, and the dropped zero can parse as a list item or a typo.

### Grouping is not universal

Three-digit grouping is a default, not a rule. Indian English groups the first three digits then pairs: 12,34,567. ISO and SI style prefer thin spaces, and Chinese and Japanese count in units of ten thousand, so the grouping rhythm is four digits.

Negatives vary: English writes -5, accounting (5). In right-to-left scripts, a leading minus can render on the wrong side unless bidi-isolated, turning a debit into a credit.

### The ambiguity test

For every numeric string, ask whether another convention would change the value. Only a few formats fail: a separator followed by three digits, a date with two components below thirteen, and a number word such as billion or crore. Extraction cannot resolve the ambiguous set, so review survives automation. Good [subtitle translation](/features/subtitle-translation) work flags these classes before the language pass; the reviewer works from that list.
## Date order, month names, and the dates that are genuinely dangerous

### Order conventions and the ambiguous middle

The United States writes month-day-year. Most of Europe, Latin America, Africa, and much of Asia write day-month-year. China, Japan, Korea, Hungary, and Sweden use year-month-day, matching ISO 8601. When both leading components are twelve or below, the string is genuinely ambiguous: 04/05/2025 is April 5 in one market and May 4 in another. A two-line subtitle offers nothing to disambiguate it.

### Where an ambiguous date is dangerous

Most date confusion is cosmetic. These categories are not, and they justify spelling the month regardless of house convention:

- Statutory and contractual deadlines, filing windows, visa validity, notice periods
- Travel dates on itineraries, boarding passes, and check-in captions
- Medical schedules, dosage intervals, and appointment reminders
- Release, embargo, expiry, and renewal dates
- Payroll, settlement, and billing dates
- Any date inside a safety instruction or legal disclosure

For these, write "May 4, 2025" or "4 May 2025" as the target locale requires; where the audience accepts ISO form, 2025-05-04 removes the ambiguity outright. Spelling the month costs roughly eight characters on one cue. Getting it wrong costs a missed deadline or a missed flight, and no reviewer catches it later, because the subtitle looks correct in both readings.

### Month names, ordinals, and other calendars

Abbreviations are locale-specific: Jan, Ene, janv., Gen., 1月. Slavic month names inflect, so the form used in a date differs from the form used in a heading, and a find-and-replace produces grammatically wrong output. Ordinal markers differ too: English 1st, French 1er, Spanish 1.º, German 1 followed by a period that is not stray punctuation.

Non-Gregorian calendars appear in real deliverables. Thai Buddhist Era years run 543 ahead of the Gregorian count, so a production for a Thai audience may legitimately show a year in the 2500s. Taiwan's Minguo calendar counts from 1912, Japanese era names sit alongside Gregorian years in broadcast, and Hijri dates are lunar and do not map by a fixed offset. Normalizing all of these to the Gregorian calendar can be technically defensible and culturally wrong. Decide per deliverable, then confirm the export path preserves the formatted artifact that reaches the encoder, since not every [subtitle generation](/features/subtitle-generation) pipeline handles non-Gregorian strings the same way.

## Clocks, time zones, and time spoken aloud
### Twelve-hour and twenty-four-hour systems

American broadcasting uses twelve-hour with a.m. and p.m. Most of Europe, Latin America, aviation, and military contexts use twenty-four-hour notation; Japan uses it widely. Rendering 21:00 as "9 p.m." is correct for a US audience and wrong for a German one—the source convention leaking into the target.

"Half" constructions survive careful editing. English "half seven" means 7:30; German "halb sieben" means 6:30, as does Dutch. In dubs or synthesized tracks, avoid the construction and write digits.

### Time zones spoken aloud

"Three o'clock Eastern" is underspecified for roughly half the year, because Eastern Standard and Eastern Daylight differ by an hour. A caption for an event needs the zone named unambiguously, with an offset, a context-dated abbreviation, or both. UTC is an offset standard, not a time zone, so treating it as GMT introduces inaccuracy.

Offsets are not all whole hours: India UTC+5:30, Nepal UTC+5:45, parts of Australia UTC+9:30. Daylight transitions duplicate an hour in autumn and remove one in spring, affecting scheduling and live programming. For live captions, give absolute and local time together.

### Durations and the colon

A colon can be a clock time or a duration: "1:30" is either half past one or ninety minutes. In locales where the colon is a decimal separator, it can read as 1.3. Write durations as "1 hr 30 min" or "90 minutes" where confusion is possible; never let source timecode reach subtitle text. [Audio translation](/features/audio-translation) workflows producing a spoken track face the same constraint, because a performer reading "1:30" commits to one interpretation throughout.
## Currency: symbol placement, conversion, and when not to convert
### Placement, spacing, and shared symbols

Symbol placement is a locale setting: the United States writes $5, most of Europe 5 €, Japan ¥5, Poland 5 zł. Wrong placement is visible but rarely dangerous. Shared symbols are common: the dollar sign covers the United States, Canada, Australia, and more, so write USD, CAD, or AUD where a figure could be misattributed. Check minor units: yen has no practical subdivision, so ¥1,200 should not become ¥1,200.00; currencies with three decimals should not be truncated to two.

### When conversion helps and when it destroys

Convert when the number is contextual and the audience needs scale. Do not convert in dialogue subtitles: the audio says the original figure, and a subtitle showing a different number contradicts it. Do not convert anything transactional, contractual, or regulatory, because the converted number is not the governing number.

Conversion has a shelf life. A figure accurate at translation drifts as markets move, while video is long-lived. An unmarked conversion becomes a stale claim nobody corrects. A marked conversion, with rate and date, records what was true when the work was done.

### Working currency rules

- Dialogue: keep currency and amount as spoken, in the audience's numeral convention.
- Captions and graphics: convert only when marked, with rate and date, or approximate.
- Contracts, salaries, prices, fines, tax figures: never convert or round.
- Rhetorical amounts: "a million dollars" is emphasis, not data; conversion strips it.
- Zero-decimal currencies: omit decimals rather than pad them.
## Measurement units and the rounding decision
### Convert or leave the unit alone

Conversion is not always right. A twelve-inch pizza is a product name; a six-foot fence is a description. The test is whether the number identifies or measures. Identifiers stay; measurements convert, with a gloss rather than a replacement.

Some units have no clean equivalent. Cups and sticks of butter convert to grams only under assumptions about density, producing false precision in a recipe. Stone is standard in the UK and Ireland but meaningless elsewhere. A US gallon and an imperial gallon differ by roughly a fifth. Ton has three units: US short ton, UK long ton, metric tonne. Fuel economy is harder: miles per gallon and liters per 100 kilometers run opposite, so larger numbers mean better economy in one and worse in the other.

### Rounding instead of precision

A source saying "about twenty miles" does not license "32.1869 kilometers". Match its significant figures, or reduce them. Extra precision implies accuracy that does not exist and reads as machine output.

Rounding breaks exact equality; sometimes that is correct. A fever threshold of 100.4 °F maps to 38 °C, the figure a metric-market clinician recognizes; 38.0 °C is a different statement. Speed limits, blood alcohol limits, and safety margins are legislated as round local numbers, so use the local legal figure, not a converted approximation. Where no recognized local equivalent exists, mark the figure approximate. At
## Large numbers, lakh and crore, and scripts with their own digits

### Short scale, long scale, and the word billion

English uses the short scale: billion is 10^9, trillion is 10^12. French uses billion for 10^12 and milliard for 10^9. Spanish expresses 10^9 as mil millones and reserves billón for 10^12. Rendering "billion" as the cognate overstates the quantity by a factor of a thousand, and the reverse direction is equally wrong. A terminology database should carry per-locale entries for million, billion, and trillion with the exponent stated, not just the word.

### The Indian numbering system

Lakh is 100,000. Crore is 10,000,000, or one hundred lakh. Arab, less common in speech but frequent in finance and news, is 1,000,000,000, or one hundred crore. Hindi and other South Asian languages use these words as ordinary vocabulary, and Indian English subtitles leave them untranslated. Grouping follows the same system: 12,34,567, not 1,234,567.

The decision is audience-based. A domestic audience hearing "two crore" should read two crore. An international audience needs twenty million if the figure is informational. If the figure is rhetorical, keep the speaker's form; converting it produces a subtitle that is arithmetically correct and rhetorically dead.

### Scripts with their own digit forms

Arabic-Indic digits ٠١٢٣٤٥٦٧٨٩ are standard across much of the Arab world, and Persian, Urdu, and Pashto use extended forms ۰۱۲۳۴۵۶۷۸۹. Devanagari digits ० to ९ appear in Hindi, Marathi, and Nepali, and Bengali, Tamil, Thai, Burmese, Khmer, and Lao each maintain their own sets. Japanese and Korean use Western digits in most modern contexts while retaining kanji numerals in formal settings. Broadcast style guides often override the language default: Arabic-language news subtitles frequently use Western digits for legibility and font coverage even where print publications use Arabic-Indic. The deciding document is the outlet's style guide, not the script's historical form.

Two technical failures sit underneath. Bidirectional text can reorder punctuation around a number, so digit sequences embedded in Arabic or Hebrew need bidi isolation. Font fallback can substitute a missing glyph, which renders as a box in the burned-in video even though the text file contains the right character. Both are render-time defects, so check a frame of burned-in video for every locale that uses a non-Latin digit set.

## Percentages, ranges, ratios, and how they are read aloud in a dub
### Percentages and the percentage-point trap

Percentage spacing varies: English writes 12%, French inserts a space, 12 %. Either is defensible if internally consistent. A change from 4% to 6% is two percentage points, also a fifty percent relative increase. Rendering one as the other misstates the data, and a dubbed track will speak the wrong claim confidently, since the performer cannot know the subtitle was wrong.

Spoken forms add a layer written subtitles do not face. "Up five percent" and "up five points" are different claims, and a script rendering both as 5% erases the distinction. Basis points are worse: 100 basis points is 1%, so "100 bp" read as a percentage is off by two orders of magnitude. If the speaker said basis points, keep the words. Building the spoken track through [subtitle-to-audio](/features/subtitle-to-audio) from the same approved text keeps the artifacts aligned.

### Ranges, spans, and dashes

Ranges use a dash, an en dash, or the words "to" and "and". An en dash at small size can read as a minus sign, so "1–3" and "1-3" are fragile. In subtitles, prefer the spoken form: "ten to fifteen percent". It removes ambiguity and lets a performer read it without deciding which mark is on the page.

Open-ended ranges follow conventions: 10+, up to 50, 50 and above. Date spans crossing a year boundary read more clearly with both years written out. Some locales repeat the unit on both ends, some do not—a style-sheet decision, not a translation one.

### Ratios and odds

Ratios are written with a colon: 3:1, 16:9. Where the colon is a decimal separator, 1:5 can be misread as 1.5. For mixed audiences, write "three to one".

Odds are a separate hazard. Bookmaker odds of 3:1 and a probability of 3:1 describe different things, and markets use each convention without labels. Follow the local sports style guide rather than translating notation, and never silently convert one into the other. Scores use a dash, not a ratio; set as a ratio, a score reads as a comparison, not a result. IP addresses, phone numbers, and version strings look like ratios; carry them through verbatim.
## A QA rule set for number and date localization in subtitles

### The rules

1. Write the locale pair's conventions on the work order before touching a cue: decimal symbol, grouping symbol, date order, clock system, currency placement.
2. Extract every numeric string. Separators followed by three digits, two-component dates below thirteen, and number words such as billion get individual review.
3. Resolve every date against context. If context does not resolve it, spell the month.
4. Read every colon-bearing value twice, once as a clock and once as a duration.
5. Treat currency as unconvertible unless the style sheet names the exception and the rate date.
6. Match the source's significant figures on any converted measurement, then reduce if the audience uses a rounder local figure.
7. Check the burned-in video, not the text file, for every locale with a non-Latin digit set.
8. Record every judgment call in one shared style sheet. A convention kept in a reviewer's head is lost at the next handoff.

### Severity classes and the spot-check method

Not every numeric defect deserves the same response. Classify them so the fix pass has an order.

- Blocking: a wrong day, a thousandfold magnitude error, a currency mismatch, or a time that contradicts the audio.
- Major: an inconsistent separator within one deliverable, a clock system that does not match the target market, or a converted threshold that no longer matches the local legal figure.
- Minor: spacing before a percent sign, symbol placement, or a grouping choice that is internally consistent but differs from a house preference.

For the spot check, work in a fixed sequence:

1. Segment the deliverable into blocks of roughly one hundred cues.
2. Run the numeric extraction over the whole file, which takes minutes and requires no reading.
3. Sample ten percent of the blocks, plus the first cue of every scene, since scene starts carry the highest density of on-screen dates and figures.
4. Review every cue in the flagged set, and the first and last cue of each block whether or not it was flagged.
5. Log each finding by severity and locale, then read the log rather than the subtitles when deciding whether the next deliverable needs a heavier pass.

Two consecutive clean blocks at blocking severity is a reasonable signal to move from full review to sampling. One blocking finding resets the count.

## Frequently asked questions
### Why is 1.500 more dangerous than 1234.567?

The glyph string is valid in two conventions, meaning different quantities. A separator followed by exactly three digits lets both readings survive a reader's habits; consistency cannot resolve it.

### Should currency be converted in subtitles at all?

In dialogue, no: audio and converted subtitle conflict. In captions and graphics, conversion is acceptable if rate and date are marked; avoid it for contractual, regulatory, or transactional.

### How should an ambiguous date be handled when context gives nothing?

Spell the month: "May 4" or "4 May" removes the ambiguity. Where ISO form is accepted, the year-first format does the same.

### Do Arabic subtitles need Arabic-Indic digits?

Not by default. Broadcast style in the Arab world uses Western digits for legibility; print uses Arabic-Indic forms. The outlet's style guide decides.

### How much rounding is acceptable in a converted measurement?

Match source precision or reduce it. "About twenty miles" cannot support four decimal places; a legislated round number should use that number.

### Can automated tooling find these errors?

It can extract numeric strings and flag ambiguous formats. It cannot decide if a date is a deadline, a figure rhetorical, or the audience expects lakh or million.

### What belongs in a shared style sheet?

Locale pair's decimal and grouping symbols, date order, clock system, currency placement, conversion policy with rate dates, unit policy, and figures never to be converted.
## Conclusion

Number and date localization in subtitles is not a matter of learning every convention. It is a matter of identifying the small set of formats where a wrong reading is possible and treating those as blocking defects rather than cosmetic ones. Separators followed by three digits, two-component dates below thirteen, number words such as billion, colon-bearing time values, and unconverted currency are the whole list. Everything else can be settled by a style sheet and a consistency check.

The practical next step is to write that style sheet before the next deliverable, not after the first review round. Put the locale pair's decimal symbol, date order, clock system, currency policy, and rounding rule on one page, add the eight rules above as the reviewer's checklist, and keep the severity classes so a fix pass has an order. If a locale pair is new to the team, [contact](/contact) the localization lead before the first episode rather than at delivery.

Run the extraction, sample the blocks, log findings by severity, and carry the log into the next episode. That sequence takes less time than reading the deliverable twice, and it catches the failures a careful read-through misses precisely because the wrong number looks right.
