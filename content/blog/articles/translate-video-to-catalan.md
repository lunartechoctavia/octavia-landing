---
{
  "title": "Translate Video to Catalan: A Language, Not a Dialect of Spanish",
  "slug": "translate-video-to-catalan",
  "category": "Translation Guides",
  "primaryKeyword": "translate video to Catalan",
  "metaDescription": "How to translate and dub video into Catalan: why Spanish is not a substitute, the Valencian question, TERMCAT terminology, and a strong dubbing tradition.",
  "excerpt": "Catalan has ten million speakers, a state language status, and a dubbing industry. It is not a regional variant of anything.",
  "publishedAt": "2026-08-28T11:30:00Z",
  "updatedAt": "2026-08-28T11:30:00Z",
  "heroImage": "/assets/blog/images/civic-glass-arches.jpg",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

[![Mediterranean architecture in warm light](https://images.unsplash.com/photo-1601751818941-571144562ff8?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Why Catalan Comes Up

Catalan has roughly ten million speakers across Catalonia, the Valencian Community, the Balearic Islands, Andorra, parts of Aragon, the Roussillon region of France, and the Sardinian city of Alghero.

That is a larger speaker population than several languages that nobody questions localizing into — more than Swedish, Danish, or Finnish. It is also concentrated in one of the wealthier regions of southern Europe, with Barcelona as a significant technology and business centre.

It reaches localization lists through a few routes. Andorra's sole official language is Catalan, so public-facing content there requires it. Catalan is co-official in Catalonia, the Valencian Community, and the Balearic Islands, which brings public sector requirements and, in some sectors, consumer-facing obligations. There is a well-funded institutional and broadcast ecosystem that produces and expects Catalan content. And for consumer brands, Catalan provision is read as a signal about how the company regards the market.

The persistent obstacle is a misconception: that Catalan is a dialect of Spanish and that Spanish content therefore serves Catalan speakers.

## Not a Dialect, and Spanish Is Not a Substitute

Catalan is a distinct Romance language. It descends from Latin independently, and its closest relative is Occitan rather than Spanish. It differs from Spanish in phonology, morphology, vocabulary, and syntax throughout.

Essentially all Catalan speakers are also fluent in Spanish, which is why the substitution is tempting and why it is a poor decision.

**Comprehension is universal; preference is not.** Catalan speakers understand Spanish content perfectly. Providing only Spanish is legible as a decision about which audience matters, and it is read that way.

**The linguistic and political context is charged.** Language provision in this region is not a neutral technical choice, and organisations that ignore that tend to discover it publicly rather than privately.

**Institutional expectations are concrete.** Public sector, education, and health content is expected in Catalan in the co-official territories, and Andorra's requirements are unambiguous.

**There is an audience that actively seeks Catalan media.** The Catalan broadcast and publishing ecosystem is substantial, and Catalan-language content has a committed viewership rather than a residual one.

The counterargument that Catalan speakers do not need it is accurate and beside the point, in the same way it is for Icelandic or Welsh. Need and preference are different questions.

## The Valencian Question

This requires care and is easy to get wrong.

Valencian is the name used in the Valencian Community for what linguists and the principal standardisation bodies treat as the same language as Catalan. There is an official Valencian standard with its own normative body, and there are orthographic and lexical differences from the Catalan standard used in Catalonia — real but limited.

The naming is politically contested. Some Valencian speakers regard Valencian as a separate language; the academic and institutional consensus, including that of the Valencian normative body, treats it as the same language under a different name.

Practical guidance:

**Do not tell your audience which position is correct.** It is not your argument to settle in a product interface or a video description.

**Use the local name in the local market.** Label the track Valencian in the Valencian Community and Catalan in Catalonia, even where the underlying content is largely or entirely shared.

**Decide whether to produce a distinct Valencian variant.** For high-volume institutional and consumer content in the Valencian Community, a Valencian-standard version is expected. For lower-stakes content, a Catalan-standard version labelled appropriately is usually accepted. Ask a local reviewer rather than deciding remotely.

**Balearic usage** has its own features and generally accepts the Catalan standard, with local vocabulary preferences in less formal content.

[![Sound engineer at a recording console](https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Script and Rendering

Catalan uses the Latin alphabet with à, è, é, í, ï, ò, ó, ú, ü, and ç, plus one distinctive typographic element.

**The interpunct in l·l.** Catalan uses a raised dot between two l characters to mark a geminate consonant, distinguishing it from the digraph ll, which is a different sound. This is a genuine orthographic requirement, not a decoration.

It is also the single most common Catalan rendering failure. Systems substitute a period, a middle dot of the wrong code point, a hyphen, or nothing at all. Any of these is a spelling error. Verify the correct character survives your pipeline end to end, and check that the font renders it at the right height.

**Both grave and acute accents** appear on e and o, and they are contrastive. A pipeline that normalises accents will produce wrong words.

**Encoding.** UTF-8 throughout.

**Do not apply Spanish autocorrection or Spanish spellchecking.** Catalan text checked against a Spanish dictionary produces a large volume of false corrections, and if any are accepted automatically the result is corrupted text.

**Text expansion** relative to English runs roughly fifteen to twenty percent, similar to Spanish and slightly less verbose in practice.

## Grammar Notes

Catalan is a Romance language and its structural profile is familiar, with specific features that differ from Spanish and that automated systems trained more heavily on Spanish get wrong.

**Weak pronoun system.** Catalan has a notably rich set of unstressed pronouns, including forms with no Spanish equivalent that stand in for prepositional phrases and partitives. These combine into clusters with complex ordering and contraction rules. This is the most distinctive syntactic feature of the language and a reliable source of errors in output produced by systems that have learned Spanish patterns.

**Two grammatical genders** with agreement propagating through noun phrases, as in Spanish.

**Periphrastic past tense.** Catalan forms a common past tense using an auxiliary construction that looks like a future tense in Spanish. Systems translating structurally from Spanish get this wrong in a way that is immediately visible.

**Definite article varies by region** and by whether it precedes a personal name, with a distinct personal article in some varieties.

**Verb conjugation** is extensive, with a substantial irregular inventory that does not align with Spanish irregularity.

**Formality distinction** exists, with a formal second person used in institutional and business contexts, though Catalan usage is somewhat less formal than Spanish convention in commercial communication.

## Timing and Dubbing

Catalonia has one of the more developed dubbing traditions among Europe's co-official languages, supported by public broadcasting and by legislation encouraging Catalan-language audiovisual provision. This means audience expectations for dubbing quality are informed rather than tolerant.

- Fifteen to twenty percent text expansion means narration runs longer than English source.
- Confirm the pronunciation variety matches the target territory; Central Catalan, Valencian, and Balearic differ audibly, particularly in vowel reduction patterns.
- Verify that l·l is pronounced correctly rather than as ll in generated audio.
- Weak pronoun clusters carry prosodic weight and should not be broken across subtitle line breaks.
- Confirm speaker separation before generating multi-speaker audio.

Catalan audiences are accustomed to both dubbing and subtitling, with dubbed children's content a strong expectation and dubbed general entertainment well established through public broadcasting.

[![Person watching content on a laptop at a desk](https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Terminology

**TERMCAT is the reference.** The Catalan terminology centre publishes normalised terminology across technical, scientific, and commercial domains, and its forms are what institutional and published Catalan uses. Consult it before coining or borrowing.

**Do not derive terminology from Spanish.** Catalan technical vocabulary is not Spanish vocabulary with modified endings, and output produced that way is recognisable.

**Institutional and legal vocabulary** has established Catalan forms, including for the institutions of the autonomous communities and for EU concepts, since Catalan has official standing in some EU contexts.

**Brand names** are retained.

**Numbers and dates.** Comma as decimal separator, period or space as thousands separator, day-month-year date order. Verify conversion.

## A Working Checklist

- Treat Catalan as a distinct language, not a variant of Spanish, and do not substitute Spanish content.
- Use the local name — Valencian in the Valencian Community, Catalan in Catalonia — regardless of the underlying standard.
- Ask a local reviewer whether a distinct Valencian variant is needed for your content type.
- Verify the l·l interpunct renders with the correct character and at the correct height.
- Do not normalise or strip grave and acute accents.
- Never apply Spanish spellchecking or autocorrection to Catalan text.
- Confirm UTF-8 encoding end to end.
- Have a native reviewer check weak pronoun clusters specifically.
- Watch for Spanish-derived tense structures, particularly in the past.
- Use TERMCAT terminology for technical and institutional vocabulary.
- Match the spoken variety to the target territory in generated audio.
- Budget fifteen to twenty percent text expansion.
- Provide Catalan captions alongside Catalan audio.

## Frequently Asked Questions

**Is Catalan a dialect of Spanish?**

No. It is a distinct Romance language descending independently from Latin, and its closest relative is Occitan rather than Spanish. It differs in phonology, morphology, vocabulary, and syntax. Nearly all Catalan speakers are also fluent in Spanish, which is why the substitution is tempting — but comprehension and preference are different things, and in this region the choice is read as a statement about which audience matters.

**Should I label the track Catalan or Valencian?**

Use the local name in the local market: Valencian in the Valencian Community, Catalan in Catalonia and the Balearics. The academic and institutional consensus treats them as one language under two names, but the naming is politically contested and a product interface is not the place to adjudicate it. Whether you also need a distinct Valencian-standard version depends on content type — ask a local reviewer.

**What is the most common Catalan rendering error?**

The l·l interpunct. Catalan uses a raised dot between two l characters to mark a geminate consonant, distinguishing it from the digraph ll. Pipelines substitute a period, a wrong-codepoint middle dot, a hyphen, or nothing, and every one of those is a spelling error. Verify the correct character survives end to end and that the font renders it at the right height.

**Does Catalan need its own voice cast, or can Spanish voices be adapted?**

Its own cast. Catalan phonology differs enough from Spanish — different vowel inventory, the distinctive l·l geminate, different stress and intonation patterns — that a voice trained primarily on Spanish will carry an audible accent into Catalan output rather than sounding native. This is a separate consideration from the pronunciation-variety question covered above for matching Central Catalan, Valencian, or Balearic speech specifically, and both should be checked independently with a native listener before committing to a voice for a series.

**Can I translate Catalan from Spanish rather than from English?**

It is done, and it produces recognisable output. Catalan technical vocabulary is not Spanish vocabulary with altered endings, the weak pronoun system has no Spanish equivalent, and the common past tense uses a construction that looks like a Spanish future. Systems trained more heavily on Spanish make all three errors. Translate from the source and have a Catalan reviewer check pronoun clusters specifically.

**Do Catalan audiences expect dubbing?**

Yes, more than in many co-official language markets. Catalonia has a developed dubbing tradition supported by public broadcasting and by legislation encouraging Catalan audiovisual provision, so audiences are informed rather than merely tolerant. Dubbed children's content is a strong expectation, and dubbed general entertainment is well established.

**Is Andorra's requirement different from Catalonia's?**

Yes, and it is worth distinguishing clearly. Catalan is co-official alongside Spanish in Catalonia, the Valencian Community, and the Balearic Islands, which brings public sector and some sector-specific consumer obligations. In Andorra, Catalan is the sole official language of the state, which is a stronger and simpler requirement for any content genuinely aimed at that market — there is no Spanish-language public sector fallback in the way there is in the Spanish autonomous communities, so Andorra-facing official and consumer content should be treated as Catalan-first rather than Catalan-alongside.

**Is Catalan worth localizing for compared with Spanish?**

They serve different purposes rather than competing. Spanish reaches the whole market; Catalan signals how you regard part of it. With roughly ten million speakers — more than Swedish, Danish, or Finnish — concentrated in a wealthy region with a strong institutional media ecosystem, the audience is large enough to justify itself even before the goodwill effect.

---

Related reading: [Translate Video to Spanish](/blog/translate-video-to-spanish) | [Translate Video to Portuguese](/blog/translate-video-to-portuguese) | [Choosing Languages to Localize](/blog/choosing-languages-to-localize)
