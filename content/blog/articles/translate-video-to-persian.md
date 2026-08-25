---
{
  "title": "Translate Video to Persian: Farsi, Dari, and Right-to-Left Video",
  "slug": "translate-video-to-persian",
  "category": "Translation Guides",
  "primaryKeyword": "translate video to Persian",
  "metaDescription": "How to translate and dub video into Persian: Farsi and Dari variants, right-to-left subtitle handling, formal and Tehrani spoken registers, and rendering.",
  "excerpt": "Right-to-left text breaks more video pipelines than any other single factor, and Persian is where most teams discover it.",
  "publishedAt": "2026-08-26T10:00:00Z",
  "updatedAt": "2026-08-26T10:00:00Z",
  "heroImage": "/assets/blog/images/arched-glass-iwan.png",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

[![Ornate architectural arch with geometric detail](https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## One Language, Several Names

Persian is spoken by well over a hundred million people and carries different names in different countries, which causes a surprising amount of confusion in localization projects.

**Farsi** is the variety spoken in Iran and the name most commonly used for the language in English. It is written in a modified Arabic script and is the standard for the largest single Persian-speaking population.

**Dari** is the variety spoken in Afghanistan, written in the same script, with differences in vocabulary, pronunciation, and some formal terminology. Speakers of Farsi and Dari understand each other readily, but the differences are audible and content produced in one is recognisably not produced in the other.

**Tajik** is Persian written in Cyrillic script in Tajikistan, with Russian loan vocabulary. Despite being the same language historically, the different script means content is not interchangeable at all in written form.

The practical consequence is that "translate this into Persian" needs qualifying. For most commercial content, Iranian Farsi is the intended target and serves the largest audience, including a substantial global diaspora. For humanitarian, governmental, or development content aimed at Afghanistan, Dari is the correct target and using Farsi is noticeable. For Tajikistan, the script difference makes it effectively a separate deliverable.

## Right-to-Left Is the Technical Hurdle

Persian is written right to left, and this breaks more video localization pipelines than any other single characteristic. The failures are systematic and predictable, which means they can be tested for.

**Bidirectional text.** Persian sentences frequently contain Latin-script elements — brand names, product names, URLs, technical terms, numbers in some contexts. These run left to right inside a right-to-left sentence, and correct display requires proper bidirectional algorithm support. Systems without it produce text that is scrambled in ways a non-reader will not notice but a Persian speaker will find unreadable.

**Punctuation direction.** Persian uses mirrored punctuation — the question mark and comma have their own forms, and parentheses and brackets reverse. Software that inserts Latin punctuation into Persian text produces output that looks wrong.

**Subtitle alignment.** Persian subtitles should align right, not centre or left, and multi-line subtitles must break in the correct reading order. Many subtitle rendering paths default to layout assumptions that are wrong for right-to-left scripts.

**Character shaping.** The Persian alphabet is cursive, with letters taking different forms depending on position within a word — initial, medial, final, or isolated. Fonts and renderers without proper shaping support produce disconnected letterforms that are technically the right characters and effectively illegible.

**Numerals.** Persian uses its own digit forms, distinct from both Western and standard Arabic-Indic digits. Which set to use is a content decision, and mixing them within one video looks careless.

The practical requirement is to test right-to-left rendering explicitly on every output surface — burned-in subtitles, each soft subtitle format you deliver, titles, thumbnails, player metadata, and any platform description field. Verifying it in one place and assuming the rest is the most common way these errors reach publication.

## Register: Written Persian Versus Tehrani Speech

Persian maintains a substantial gap between its formal written form and everyday spoken usage, particularly the colloquial Tehrani variety that functions as the informal standard.

The differences are systematic rather than stylistic. Colloquial Persian contracts verb forms, shortens common words, drops certain endings, and uses different pronouns from formal written Persian. Written Persian read aloud sounds distinctly formal — appropriate for news and official announcement, wrong for a creator talking to camera.

Practical positions:

**Formal written Persian** for news, official communication, documentary narration in a traditional register, and institutional content.

**Colloquial Tehrani Persian** for creator content, advertising, entertainment, tutorials, and conversational material.

**A neutral middle register** for most corporate, educational, and explanatory content — recognisably speech rather than writing, without the most casual contractions.

As with other diglossic languages, the register must be specified before translation rather than adjusted afterwards, and drift between registers within a single video is the most common naturalness failure.

[![Sound engineer working at a mixing desk](https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Timing, Expansion, and Dubbing

Persian has characteristics that affect dubbing duration and sync.

Word order is typically subject-object-verb, so the verb resolves at the end of the clause. As with other SOV languages, this means the semantic payload of a sentence lands at a different moment than in an English original, and narration timed to an on-screen event may need restructuring rather than direct translation.

Text length in Persian is often comparable to or slightly shorter than English in character count, helped by the script's compactness and the absence of written short vowels. Spoken duration, however, tends to run somewhat longer, particularly in formal register where compound verb constructions are common. Budget for narration that exceeds the source duration.

Practical guidance:

- Let pacing be natural rather than compressing Persian to fit English segment lengths.
- Verify clause-final verbs are not split across segment boundaries.
- Check alignment explicitly where narration refers to visible on-screen elements.
- For multi-speaker content, confirm diarization before generating voices.
- Where the source contains English terms retained in the Persian, verify their bidirectional rendering in the generated subtitle file, not just in the transcript.

## Terminology and Cultural Handling

Persian has an active tradition of coining native equivalents for foreign technical terms, alongside everyday usage that borrows English freely. The gap between official terminology and street usage is real.

Working positions:

**Technical and product vocabulary** is commonly borrowed from English in everyday speech and in most media, even where an official Persian coinage exists. For content aimed at general audiences, the borrowed term is usually the comprehensible choice.

**Official and institutional vocabulary** frequently has established Persian equivalents that are genuinely in use and should be preferred in formal content.

**Brand names** should be retained. Pay attention to whether they appear in Latin script inside Persian text, which triggers the bidirectional handling discussed above.

**Dari-specific vocabulary** differs from Farsi in a set of common administrative, technical, and everyday terms. Content targeting Afghanistan should use Dari forms rather than assuming Farsi vocabulary transfers.

Cultural handling deserves care in this language pair. Persian-language content circulates across countries with very different media environments, legal frameworks, and social norms. Material that is unremarkable in one Persian-speaking context may be sensitive in another. This is a content decision that should be made before localization rather than discovered afterwards, and it is worth involving someone familiar with the specific target market.

Calendar systems are a concrete example of the same issue. Iran uses the Solar Hijri calendar officially, Afghanistan uses a related system, and diaspora audiences frequently use the Gregorian calendar. Dates in content should be handled deliberately rather than converted mechanically.

[![Person watching streaming content on a laptop](https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Subtitles or Dubbing

Persian-speaking audiences have a strong tradition of consuming dubbed and subtitled foreign content, and both are well accepted.

**Dub when** the content is instructional and the viewer needs their attention on a demonstration, when reaching audiences with lower script literacy, or when the content is long-form.

**Subtitle when** preserving the original speaker's voice matters, when the content is short-form social video, or when the audience is likely to be reading comfortably.

**Consider both** for diaspora audiences, where a substantial proportion of second-generation speakers have strong listening comprehension and weaker reading ability in Persian script. Dubbed audio reaches this group in a way subtitles do not.

One practical caution specific to right-to-left content: burned-in subtitles remove the rendering risk entirely, because you control the output at render time rather than relying on an unknown player to handle bidirectional layout correctly. For platforms where you cannot verify the subtitle renderer, burned-in Persian subtitles are the lower-risk option.

## A Working Checklist

- Confirm the target variety: Iranian Farsi, Afghan Dari, or Tajik.
- Specify the register — formal written, neutral, or colloquial Tehrani — before translation.
- Test right-to-left rendering on every output surface separately: burned-in subtitles, each soft subtitle format, titles, thumbnails, and metadata fields.
- Verify bidirectional handling wherever Latin-script brand names, URLs, or technical terms appear inside Persian sentences.
- Confirm the renderer supports contextual letter shaping, not just correct characters.
- Set subtitle alignment to right and confirm multi-line break order.
- Choose a digit set deliberately and apply it consistently.
- Handle dates according to the calendar system your audience actually uses.
- Allow Persian narration to run longer than the source rather than compressing it.
- Have a native speaker of the specific target variety review the output.

## Planning a First Project

A first localization project into Persian goes more smoothly with a few decisions made deliberately rather than discovered mid-way.

**Pick content that suits the language, not just the market.** Evergreen explanatory content with clean single-speaker audio is the right starting point. Content dense with overlapping speech, heavy idiom, or tight narration-to-visual sync will expose every weakness in the workflow at once and teach you less.

**Budget review time honestly.** Expect the first assets in a new language to need substantially more review than the tenth, because the recurring corrections have not yet become locked terminology. Pricing or scheduling on first-job effort will overstate your steady-state cost considerably.

**Recruit the reviewer before you need them.** A native speaker who knows the subject matter is worth considerably more than a general translator, and finding one under deadline pressure produces a worse choice than finding one in advance.

**Run a short sample end to end first.** Two minutes of representative content through the full pipeline — transcript, terminology, translation, generation, delivery — surfaces rendering, timing, and register problems while they are cheap to fix.

**Keep the reviewed transcript.** It is the input to every future language and every future subtitle track, and regenerating it each time discards correction work already paid for.

**Prove right-to-left rendering on every surface first.** Bidirectional layout and cursive shaping are the dominant technical risk, and they must be verified separately on burned-in subtitles, each soft subtitle format, titles, and platform metadata fields.

## Frequently Asked Questions

**What is the difference between Farsi, Dari, and Tajik?**

They are varieties of the same language. Farsi is the Iranian variety and serves the largest audience. Dari is the Afghan variety, written in the same script but differing in vocabulary and pronunciation — content produced in Farsi is recognisably not Dari and vice versa. Tajik is Persian written in Cyrillic in Tajikistan, which makes it a separate written deliverable entirely. For most commercial content, Iranian Farsi is the correct target.

**Why does Persian text appear scrambled in my subtitles?**

Almost always a bidirectional text handling failure. Persian runs right to left, but Latin-script brand names, URLs, and numbers inside a Persian sentence run left to right, and correct display requires proper bidirectional algorithm support. Combined with cursive letter shaping — where letters change form by position — a renderer without full support produces text that is technically correct in character terms and unreadable in practice.

**Should Persian subtitles be burned in or delivered as a separate track?**

Burned-in subtitles eliminate the rendering risk, because you control bidirectional layout and letter shaping at render time rather than depending on an unknown player. Where you can verify that the target platform's subtitle renderer handles right-to-left correctly, soft tracks are fine and more flexible. Where you cannot, burn them in.

**How formal should Persian video narration be?**

It depends on content type, and the gap matters. Formal written Persian read aloud sounds appropriately authoritative for news and official communication but stilted for conversational content. Colloquial Tehrani Persian suits creator content and advertising. Most corporate and educational content sits in a neutral middle register. Specify the choice before translation, because register drift within a video is immediately obvious.

**How should dates and numerals be handled?**

Deliberately, not mechanically. Iran uses the Solar Hijri calendar, Afghanistan a related system, and diaspora audiences often the Gregorian calendar. Persian also has its own digit forms, distinct from Western and standard Arabic-Indic digits. Choose one digit set and one calendar convention appropriate to your target audience and apply them consistently across the whole video.

---

Related reading: [Translate Video to Arabic](/blog/translate-video-to-arabic) | [Translate Video to Hebrew](/blog/translate-video-to-hebrew) | [Multilingual Subtitles Guide](/blog/multilingual-subtitles-guide)
