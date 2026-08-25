---
{
  "title": "Text Expansion: Why Translated Video Runs Long",
  "slug": "text-expansion-in-translation",
  "category": "Technical Guides",
  "primaryKeyword": "text expansion in translation",
  "metaDescription": "Why translated text and speech run longer than the source, typical expansion rates by language, and how to design video and subtitles that absorb it.",
  "excerpt": "Every localized video runs into the same wall: the same meaning takes a different amount of time to say.",
  "publishedAt": "2026-08-26T18:00:00Z",
  "updatedAt": "2026-08-26T18:00:00Z",
  "heroImage": "/assets/blog/images/expanding-glass-bars.png",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

[![Abstract measurement and scale visualisation](https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## The Constraint Nobody Designs For

Every video localization project eventually hits the same problem. The English narration is forty-two seconds. The German version of the same content, spoken naturally, is fifty-one. The video is still forty-two seconds long.

Something has to give, and the choice made at that moment determines whether the localized version sounds professional or obviously compromised.

This is text expansion — the phenomenon whereby the same meaning requires different amounts of text and different amounts of speaking time in different languages. It is entirely predictable, it is measurable, and it is almost never accounted for at the point where it could be cheaply solved: the design and scripting of the source video.

Understanding it properly changes three things: how you write source content, how you design layouts, and what you do when the target language genuinely will not fit.

## Two Different Expansions

It helps to separate two related but distinct measurements, because they behave differently and constrain different things.

**Character expansion** is how much longer the written text becomes. It constrains subtitle line length, on-screen text, lower thirds, button labels, and any layout with a fixed box.

**Duration expansion** is how much longer the spoken content takes. It constrains dubbing sync, narration timing, and anything where audio must align to picture.

These do not track each other reliably. A language can be substantially longer in characters and roughly equivalent in speaking time, because its words are longer but fewer, or because it is spoken at a faster syllable rate.

Agglutinative languages illustrate this clearly. Finnish, Turkish, Tamil, and Telugu build long words by stacking affixes, producing dramatic character expansion while the syllable count and speaking time stay closer to the source. Conversely, some languages that look compact in writing — particularly those with dense scripts — take longer to say than their character count implies.

The practical lesson: use character expansion to design layouts and duration expansion to plan audio. Estimating one from the other produces errors in both directions.

## Typical Expansion Ranges

These are working approximations from English source. They vary by content type — technical content, marketing copy, and conversational speech expand differently — and should be treated as planning figures rather than guarantees.

**Substantial expansion, roughly 25 to 40 percent in characters:** German, Finnish, Polish, Hungarian, Greek, Russian, Portuguese, Spanish, French, Italian.

Romance languages expand consistently and predictably. German expands through compound nouns and longer function words. Finnish and Hungarian expand through heavy case marking.

**Moderate expansion, roughly 10 to 25 percent:** Dutch, Swedish, Norwegian, Danish, Czech, Romanian, Turkish, Indonesian, Malay, Vietnamese, Hindi, Marathi, Nepali, Bulgarian.

**Roughly equivalent or modest expansion:** Arabic and Hebrew are usually comparable to English in characters despite dense scripts, partly because short vowels are unwritten. Persian similarly.

**Contraction, roughly 20 to 40 percent shorter in characters:** Chinese, Japanese, and Korean. Each character carries more information, so the same content occupies far less horizontal space.

The contraction case is worth dwelling on because it is frequently mishandled. Shorter text does not mean shorter speaking time. Japanese in particular often takes longer to say than English despite occupying less space on screen, because its syllable structure and honorific constructions add length in speech that the writing system compresses. A subtitle layout designed around Japanese character counts may look sparse while the dubbing runs over.

[![Subtitle text displayed over video content](https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Designing Source Video That Absorbs Expansion

The cheapest place to solve this is before the source video exists. A few decisions at scripting and design stage remove most of the downstream pain.

**Leave headroom in every text container.** Lower thirds, title cards, callouts, and button labels should be designed so the English fills roughly two-thirds of the available space. A box sized exactly to the English string will break in most European languages.

**Avoid text baked into picture.** Composited on-screen text forces a re-render for every language and, where the clean plate is unavailable, may make localization impossible. Keep text as separate layers.

**Design for reflow, not just for length.** A single-line lower third that becomes two lines in German needs somewhere for the second line to go without colliding with other elements.

**Script with pauses.** Natural breathing room between sentences gives the target language somewhere to expand into without compressing. A densely packed English narration with no gaps has no slack at all.

**Avoid tight visual sync where you can.** Narration that must land exactly as something appears on screen is the hardest thing to localize. Where the visual can tolerate a second either way, it will survive translation far better.

**Watch the last line before a cut.** A sentence that ends precisely at a hard cut in English will overrun the cut in an expanding language.

**Prefer shorter source sentences.** Long complex English sentences expand more in absolute terms and are harder to restructure to fit.

## What to Do When It Does Not Fit

Sometimes the target language genuinely will not fit the available time. There are four responses, and they are not equally good.

**Compress the speech.** Speed up the delivery to fit. This is the default in many workflows and it is usually the worst option. Compressed narration sounds rushed and unnatural, and past a modest threshold it becomes genuinely harder to understand. It is also the single most common reason dubbed content sounds artificial.

**Shorten the translation.** Rewrite the target-language script to convey the same meaning in fewer words. This is often the best option and it is real editorial work, not something a translation pass does automatically. It requires someone willing to change wording rather than translate faithfully, which is why it needs to be commissioned explicitly.

**Extend the video.** Hold shots slightly longer, extend a pause, or add a frame or two at a cut. For content where the edit is not tightly locked to music or action, this is clean and invisible. It requires access to the project rather than just the master.

**Let the audio run longer than the segment.** For narration not tied to specific visuals, allowing the localized audio to run slightly past the original segment boundary is frequently unnoticeable and much better than compression.

The rough hierarchy: extend the video where possible, shorten the translation where it is not, let audio run over where the visual permits, and compress only as a last resort and only slightly.

A useful working rule is that compression beyond a small percentage is a signal that the source content was too dense, not that the target language is unreasonable.

## Subtitles: A Different Constraint

Subtitles face expansion as a reading-speed problem rather than a timing problem.

A subtitle has a fixed display duration determined by the audio it accompanies. If the translated text is longer, the reading speed required increases. Past a threshold — commonly expressed as characters per second — viewers cannot finish reading before the subtitle changes.

This is why accurate subtitle translation can still fail quality standards. The words are right and there are too many of them for the time available.

Practical responses:

**Condense rather than translate literally.** Subtitling is a distinct discipline precisely because it requires compressing meaning to fit reading constraints. Good subtitles routinely omit redundancy that dubbing would retain.

**Respect line length and line count limits.** Two lines is the conventional maximum, with a per-line character limit that varies by market and script.

**Break lines at syntactic boundaries.** A line break in the middle of a phrase forces re-reading and effectively slows comprehension further.

**Merge and split segments deliberately.** Where the source segmentation produces impossible reading speeds in the target, resegmenting is legitimate and often necessary.

**Check the worst case, not the average.** Reading speed problems cluster in the densest few segments, and an average that looks fine can hide a dozen unreadable subtitles.

[![Video editing timeline with layered tracks](https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Layout and Interface Text

The same problem affects on-screen text and any interface shown in the video.

**Lower thirds and name plates.** Titles and role descriptions expand, and a two-line name plate in one language may need three in another.

**Callouts and annotations.** Text pointing at something on screen must stay near the thing it points at while growing.

**Button and control labels** in product demos, which expand and may wrap or truncate.

**End cards and calls to action**, which are typically tightly designed and frequently break.

**Numbers and units**, which change format and sometimes length across locales.

The general principle is to test the longest expected language early rather than at the end. If your layout survives German or Finnish, it will survive most things. Designing against English and discovering the problem during the eighth language is the expensive path.

## Planning Figures

For estimation purposes:

- Budget layout space assuming roughly 35 percent character expansion unless you know your target set is limited to compact languages.
- Budget audio duration assuming roughly 15 to 20 percent expansion for most European targets from English.
- Expect CJK languages to contract in characters while potentially expanding in duration.
- Treat agglutinative languages as high character expansion and moderate duration expansion.
- Add contingency for content that is already dense; expansion percentages compound on tight source material.

Measure your own content rather than relying on generic figures, since technical documentation, conversational speech, and marketing copy behave quite differently. After a handful of jobs you will have real numbers for your content type and language set, which is far more useful than any published table.

## A Working Checklist

- Separate character expansion from duration expansion; plan layouts with one and audio with the other.
- Design text containers so English fills about two-thirds of the space.
- Keep on-screen text as editable layers, never baked into picture.
- Script with natural pauses so target languages have room to expand.
- Avoid narration that must land exactly on a visual event.
- Prefer extending the video or shortening the translation over compressing speech.
- Commission translation-for-length explicitly; it is editorial work, not a translation setting.
- For subtitles, condense to reading-speed limits rather than translating literally.
- Check worst-case segments, not averages.
- Test your longest target language early in the design process.

## Frequently Asked Questions

**How much longer does translated video usually run?**

For most European targets from English, plan on roughly 15 to 20 percent additional speaking time and up to 35 percent additional characters. German, Finnish, Polish, and the Romance languages sit at the higher end. Chinese, Japanese, and Korean contract in character count but may still expand in speaking duration, which is a common trap when designing from character counts alone.

**Why does text get shorter in Japanese but the audio still runs long?**

Because character count and speaking duration measure different things. Japanese writing is information-dense so it occupies less horizontal space, while its syllable structure and honorific constructions add length in speech. Use character expansion to size layouts and duration expansion to plan audio; estimating either from the other produces errors.

**Is it acceptable to speed up dubbed audio to fit?**

Only slightly, and it should be the last resort. Compressed narration sounds rushed and becomes measurably harder to understand past a modest threshold, and it is the most common reason dubbed content sounds artificial. Prefer extending the video, shortening the translated script, or letting audio run past the segment boundary where the visual permits.

**Why do accurate subtitles still fail quality checks?**

Because subtitles are constrained by reading speed, not just accuracy. A correct translation that produces too many characters for the display duration exceeds the market's characters-per-second limit and viewers cannot finish reading. Subtitling requires condensing meaning to fit, which is a different discipline from translating for dubbing.

**What is the cheapest way to reduce expansion problems?**

Design the source for it. Size text containers so English fills about two-thirds of the space, keep on-screen text as editable layers, script with natural pauses, and avoid narration that must land precisely on a visual event. These cost nothing at production time and remove most of the downstream difficulty across every target language.

---

Related reading: [Subtitle Reading Speed and Segmentation](/blog/subtitle-reading-speed-guide) | [Multilingual Subtitles Guide](/blog/multilingual-subtitles-guide) | [Video Translation Common Mistakes](/blog/video-translation-common-mistakes)
