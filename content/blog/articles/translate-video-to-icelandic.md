---
{
  "title": "Translate Video to Icelandic: Purism, Four Cases, and a Small Market Worth Serving",
  "slug": "translate-video-to-icelandic",
  "category": "Translation Guides",
  "primaryKeyword": "translate video to Icelandic",
  "metaDescription": "How to translate and dub video into Icelandic: neologism policy, four-case grammar, patronymic names, and why high English fluency isn't a reason to skip it.",
  "excerpt": "Icelandic coins its own words for new things rather than borrowing them. That policy is national, deliberate, and your terminology problem.",
  "publishedAt": "2026-08-28T11:00:00Z",
  "updatedAt": "2026-08-28T11:00:00Z",
  "heroImage": "/assets/blog/images/cascade-light-prism.png",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

[![Dramatic northern landscape](https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Why Icelandic Comes Up

Icelandic has roughly 370,000 speakers, almost all of them in Iceland. By any conventional market-sizing exercise this is below the threshold at which localization is considered.

It gets localized anyway, for reasons that are worth understanding because they generalise to other small language markets.

**Public sector and institutional requirements.** Government, health, education, and public service content is expected in Icelandic, and in many contexts required.

**Tourism-adjacent commerce.** Iceland receives visitor numbers many times its population, and the businesses serving them are Icelandic-operating.

**High digital engagement and purchasing power.** Per-capita consumption of digital services is high, and the market is small enough that being the only provider offering Icelandic is a genuine differentiator rather than a marginal improvement.

**Language preservation as public policy.** There is explicit and widely supported policy concern about digital language death — the risk that a small language becomes unusable in technology contexts because nothing supports it. Companies that support Icelandic receive disproportionate goodwill, and those that conspicuously do not receive disproportionate criticism.

The counterargument is always English proficiency, which is very high. It is a weak counterargument. High English proficiency describes capability, not preference, and in a market this engaged with its own language the preference is strong and openly expressed.

## The Purism Policy

Icelandic is the clearest case in Europe of deliberate, institutionally supported linguistic purism, and it is the single most important thing to understand before commissioning translation.

Where most languages absorb international vocabulary for new concepts, Icelandic policy is to coin native words from existing Icelandic roots. The word for computer is a compound built from the words for number and prophetess. The word for telephone is built from native elements. This is not a historical curiosity; it is ongoing practice, and new terms are actively coined for new technology.

The Árni Magnússon Institute for Icelandic Studies and associated terminology committees do this work and publish results. There is a public terminology database covering technical and specialist vocabulary across many domains.

What this means practically:

**Do not assume international terms are acceptable.** A term that is used unchanged across twenty European languages may have an established Icelandic native form, and using the international word instead reads as lazy or foreign.

**Do not invent terms.** If an official coinage exists, use it. Coining an alternative because the official one seems unfamiliar produces divergence from what the audience reads elsewhere.

**Check the terminology database before translating technical content.** This is a real step in an Icelandic workflow, not an optional refinement.

**Accept that usage varies by register.** Spoken and informal Icelandic borrows more freely than written and formal Icelandic. Younger speakers use more English loanwords in casual speech. Published and institutional content follows the native forms.

**Brand names are retained** and are not translated, though they will be declined grammatically.

## Grammar

Icelandic is conservative morphologically, retaining a case and gender system that its Scandinavian relatives largely lost.

**Four cases** — nominative, accusative, dative, and genitive — across three genders and two numbers, applied to nouns, adjectives, pronouns, and numerals, with multiple declension classes and substantial irregularity.

**Definiteness is marked with a suffix** attached to the noun, in addition to the case ending, rather than with a preceding article. English article usage maps onto this imperfectly and definiteness errors are common and subtle.

**Strong and weak adjective declensions**, selected by definiteness and syntactic context.

**Verb conjugation** for person, number, tense, mood, and voice, with a large inventory of irregular strong verbs.

**Middle voice** verb forms carrying reflexive, reciprocal, and passive senses, with no clean English equivalent.

**Grammatical gender is not predictable from meaning** and propagates through agreement, so an error in gender assignment cascades through the sentence.

**No formality distinction in address.** This is a genuine simplification and worth knowing: Icelandic uses the same second person form universally. The formal plural form exists historically and is effectively obsolete. Content that agonises over formality in other Nordic languages needs no such decision here.

[![Sound engineer at a recording console](https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Script and Rendering

Icelandic uses the Latin alphabet with á, é, í, ó, ú, ý, ð, þ, æ, and ö.

**Thorn and eth are the characters that break things.** þ and ð are not present in most Latin-1 coverage assumptions and are missing from a surprising number of fonts that otherwise look adequate. Verify both explicitly in every font used for burned-in text, lower thirds, and player-rendered captions.

**Do not substitute.** Replacing þ with "th" or ð with "d" is not an acceptable fallback; it produces text that is wrong rather than degraded.

**Æ and ö** are also worth verifying, as is the acute-accented vowel set, which are distinct letters rather than accented variants.

**Encoding.** UTF-8 throughout, and check any legacy material carefully — thorn and eth are exactly the characters that corrupt first.

**Collation.** Icelandic alphabetical order places þ, æ, and ö at the end of the alphabet, after z, and the accented vowels have their own positions. Sorted lists on screen will be wrong if collated with a default locale.

**Text expansion** runs roughly ten to fifteen percent longer than English, driven by compounding and case marking.

## Names and Address

Icelandic naming convention is patronymic rather than familial. A person's second name is derived from a parent's given name with a suffix indicating son or daughter. It is not a surname and is not shared across a family in the way a surname is.

The practical consequences:

**People are addressed and referred to by their given name**, including in formal and professional contexts and including public figures. Referring to someone by their patronymic alone is wrong.

**Alphabetical listing is by given name.** Any on-screen credit list, index, or directory sorted by the second name is sorted incorrectly.

**Do not apply a first-name/last-name data model naively.** Systems that assume a family surname produce incorrect display and incorrect sorting.

**Patronymics decline grammatically** like other nouns.

This affects credits, contributor lists, speaker identification in captions, and any interface element displaying names.

## Timing and Dubbing

Icelandic default order is subject-verb-object with verb-second constraints in main clauses, similar to the other Germanic languages.

- Ten to fifteen percent text expansion means narration runs longer than the source.
- Compounding produces long single words, which affects subtitle line breaking. Icelandic compounds should not be broken across lines arbitrarily.
- Case and definiteness suffixes attach to word ends; verify they survive subtitle segment boundaries.
- Confirm speaker separation before generating multi-speaker audio.
- Verify that þ and ð are pronounced correctly in generated audio — they are distinct sounds and a system falling back to a near-equivalent is immediately audible.

Iceland subtitles most adult content and dubs children's programming, with Icelandic dubbing of children's material being a well-established industry and an area of particular public expectation.

[![Person watching content on a laptop at a desk](https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Terminology

**Consult the official terminology resources first.** Icelandic terminology committees publish domain vocabulary, and using their forms is what makes content read as properly Icelandic rather than as translated.

**Technology vocabulary has established native forms** for most core concepts. Check rather than assuming.

**Where no coinage exists**, practice varies. Some translators adapt the international term with Icelandic orthography and inflection; some leave it. Decide once and record it.

**Numbers and dates.** Comma as decimal separator, period as thousands separator, day-month-year date order. Verify conversion.

**Currency** is the Icelandic króna, and figures in foreign currency should generally be converted or at least clearly labelled.

## A Working Checklist

- Do not skip Icelandic on the basis of high English proficiency; preference differs from capability.
- Verify þ, ð, æ, ö, and the accented vowels render in every font used.
- Never substitute "th" or "d" for thorn and eth.
- Confirm UTF-8 encoding end to end and check legacy material carefully.
- Use Icelandic collation order for any sorted on-screen list.
- Consult official terminology resources before translating technical content.
- Use established native coinages rather than international borrowings in published register.
- Do not invent alternative coinages where an official form exists.
- Address and list people by given name, not patronymic.
- Do not apply a family-surname data model to Icelandic names.
- Note that there is no formality distinction to decide.
- Have a native reviewer check case, gender, and definiteness suffixes.
- Budget ten to fifteen percent text expansion.
- Avoid breaking compounds across subtitle lines.
- Verify thorn and eth pronunciation in generated audio.

## Frequently Asked Questions

**Is Icelandic worth localizing for 370,000 speakers?**

More often than the population suggests. Public sector and institutional content is expected in Icelandic and frequently required; per-capita digital engagement and purchasing power are high; and the market is small enough that being the only provider offering Icelandic is a genuine differentiator. There is also explicit public concern about digital language death, which means supporting Icelandic generates goodwill disproportionate to the market size.

**Everyone in Iceland speaks English. Why translate at all?**

High English proficiency describes capability, not preference, and in a market this engaged with its own language the preference is strong and openly stated. The argument also cuts the other way: because English is available, choosing to provide Icelandic is legible as a deliberate act of respect rather than a baseline expectation.

**What is the Icelandic purism policy?**

A deliberate, institutionally supported practice of coining new words from native roots rather than borrowing international vocabulary. Terminology committees publish official coinages for technical and specialist domains. Using the international word where an official native form exists reads as foreign, and inventing your own alternative produces divergence from what your audience reads everywhere else. Consult the published terminology before translating technical content.

**What breaks most often in Icelandic rendering?**

Thorn and eth — þ and ð. They fall outside common Latin-1 coverage assumptions and are missing from many fonts that otherwise look adequate, and they are the first characters to corrupt in a bad encoding conversion. Verify both explicitly in every font used for burned-in text and captions, and never accept "th" or "d" as a substitution.

**How should Icelandic names be handled?**

By given name. The second name is a patronymic derived from a parent's given name, not a shared family surname, so people are addressed and listed by their first name including in formal contexts. Alphabetical sorting is by given name, and any system applying a first-name/last-name model with surname sorting will display and order names incorrectly.

**How does Icelandic differ from the other Nordic languages for localization purposes?**

More than the shared regional grouping suggests. Danish, Norwegian, and Swedish have lost most of their historical case system and are mutually intelligible to a meaningful degree among fluent speakers, which lets some localization decisions be made together across the three. Icelandic retained the full four-case Germanic system its neighbours shed, is not mutually intelligible with any of them, and follows its own separate purism and naming conventions. Treat it as fully independent rather than as a variant to fold into a general Nordic localization plan.

**Do Icelandic speakers expect subtitles or dubbing for adult content?**

Subtitles, strongly, for anything aimed at an adult audience. Iceland has a long-standing convention of subtitling imported film and television rather than dubbing it, reinforced by high English proficiency and a small enough market that dubbing every imported title was never commercially standard practice. Dubbing is reserved almost entirely for children's content, where the audience cannot yet read subtitles fast enough to follow them, and applying an adult dubbing convention imported from a larger dubbing-culture market will read as unfamiliar to Icelandic viewers.

**Is there a formal and informal "you" in Icelandic?**

Effectively no. The historical formal plural form is obsolete in current usage, and the same second person form is used universally. This is a real simplification relative to the other Nordic languages and removes a decision that has to be made carefully elsewhere.

---

Related reading: [Translate Video to Norwegian](/blog/translate-video-to-norwegian) | [Translate Video to Danish](/blog/translate-video-to-danish) | [Choosing Languages to Localize](/blog/choosing-languages-to-localize)
