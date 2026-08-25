---
{
  "title": "Building a Translation Glossary for Video: The Highest-Leverage Hour",
  "slug": "video-translation-glossary-building",
  "category": "Technical Guides",
  "primaryKeyword": "translation glossary for video",
  "metaDescription": "How to build a video translation glossary: term extraction, entry structure, handling inflected languages, pronunciation overrides, and maintenance.",
  "excerpt": "The glossary is the artifact that determines whether a localized library reads as coherent or assembled, and most programs build it too late.",
  "publishedAt": "2026-08-20T13:05:00Z",
  "updatedAt": "2026-08-20T13:05:00Z",
  "heroImage": "/assets/blog/images/transcript-glass-block.png",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

[![Building a translation glossary for video localization](https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Why the Glossary Comes First

In a single video, terminology is either right or wrong, and a reviewer catches it. Across a library, the same term rendered three different ways is a defect that no individual asset contains and that no individual review will surface.

The glossary is what prevents this, and its value compounds. Once terminology is settled, review time drops sharply — reviewers stop re-litigating the same word choices on every project and focus on genuine issues.

The common mistake is building it reactively, adding terms as reviewers flag them. This means early assets use different terminology than later ones, and the inconsistency is permanent unless earlier work is reprocessed.

Build it before processing anything.

## Extracting the Terms

Systematic extraction beats intuition. A team asked to list the terms in their content will produce the obvious ones and miss the ones that cause problems.

**Run term extraction over the source corpus.** Frequency-based extraction over the full set of transcripts surfaces the vocabulary that actually recurs, including terms nobody would have thought to list.

**Pull from existing localized assets.** If your product ships a localized interface, if you have translated documentation, or if you have a help centre in the target language, terminology decisions have already been made. Extracting from those sources produces a base consistent with what customers already see, which is more important than any independent judgment about the best rendering.

**Inventory proper nouns exhaustively.** Company names, product names, feature names, personal names, place names. These are the highest-frequency source of errors in both transcription and audio generation.

**Add domain vocabulary.** Technical, industry, and specialized terms specific to your subject.

**Collect from the content owners.** Subject matter experts know the terms that matter and the renderings that would be wrong, and asking them takes minutes.

Aim for validated coverage of what recurs rather than exhaustive coverage of everything. A glossary with two hundred validated entries is worth more than one with a thousand unvalidated ones, because unvalidated entries applied across a batch propagate errors at scale.

## What an Entry Contains

A useful entry holds more than a source term and a target term.

**Source term** in its base form.

**Target rendering** per language, in base form.

**Do-not-translate flag** where the term stays in the source language. This is a decision, not an omission, and recording it prevents someone translating it later.

**Forbidden alternatives** with reasons. A rendering that looks natural but carries the wrong meaning, or that belongs to a competitor, or that was superseded, should be explicitly excluded. Recording why prevents it being reintroduced.

**Register or context note** where a term's correct rendering depends on the content type or audience.

**Pronunciation guidance** for audio generation — phonetic hints or markup for terms the generated voice will otherwise get wrong.

**Inflection or agreement information** for languages that need it. In Slavic languages, the declension pattern. In Swahili, the noun class. In German, the gender. Without this, a translator or reviewer cannot produce correct agreement from the base form alone.

**Source and approver.** Where the decision came from and who signed off, which is what allows a later reviewer to evaluate rather than relitigate.

**Version and date**, so that assets can be linked to the glossary version they used.

## Inflected and Agreement-Heavy Languages

For languages with extensive inflection, a base-form glossary is incomplete in a way that causes real problems.

The term will appear throughout the content in multiple surface forms. Automated consistency checking by exact string matching produces unreliable results — it will report a term as absent when it is present in an inflected form, and it will miss genuine inconsistencies that appear only in one case form.

Two practical responses:

**Record the pattern**, not just the form. The declension class, gender, or noun class lets a reviewer verify that agreement is correct rather than only that the base form appears.

**Rely on human review for consistency verification** in these languages, or use tooling with morphological awareness. Treating exact-match results as authoritative in Polish, Czech, Russian, Ukrainian, or Swahili will produce false confidence.

For borrowed terms and brand names, decide explicitly whether inflection is permitted. Speakers of these languages inflect borrowed words naturally, and an invariant brand name reads as slightly stilted while an inflected one varies in appearance. Both are defensible; the decision should be recorded.

## Deciding Translate Versus Retain

The recurring question for technical vocabulary is whether a term takes a target-language form or stays in the source language.

The answer is not derivable from first principles. It depends on what practitioners in that market actually say, and it varies by language, by domain, and by audience seniority.

Some patterns hold broadly:

Technology, marketing, and finance vocabulary borrows English heavily in most languages, and constructing native equivalents for established borrowings reads as artificially purist.

Legal, administrative, medical, and educational terminology is well developed in most languages and is jurisdiction-specific. Using source-language terms here reads as careless, and the correct terms cannot be derived by translation because the underlying institutions differ.

Scientific vocabulary frequently has established international forms.

Product names and trademarks normally stay in source form, subject to the inflection question above.

The reliable method is to ask a native reviewer who works in the domain, and to check against any existing localized material you already ship. Both beat any general rule.

## Pronunciation Overrides

For programs producing audio, pronunciation entries are what prevent the same correction being rediscovered on every project.

The categories that need them: proper nouns of all kinds, acronyms where the spell-out-versus-pronounce decision matters, technical vocabulary, loanwords where the source or adapted pronunciation must be chosen, and numbers in contexts where they are read non-standardly — years, versions, model identifiers.

Record the override in whatever form your platform accepts, and attach it to the glossary entry rather than to a project. A name corrected in the first video should stay correct in the two-hundredth.

Pronunciation entries need per-language treatment, since the correct pronunciation of a borrowed term differs by target language.

## Maintenance

A glossary that is six months stale actively causes errors, because reviewers trust it.

**Assign an owner per language.** Someone who decides contested questions rather than leaving each reviewer to decide independently. This is a small time commitment and a large quality lever.

**Version it.** Record which version each batch used, so that when a term changes you can determine exactly what needs reprocessing.

**Freeze during a batch.** Changing terminology mid-batch produces exactly the inconsistency the glossary exists to prevent. Collect proposed changes and apply them at a batch boundary.

**Require additions before use.** New product or policy terminology should enter the glossary before the first content using it enters translation, not after a reviewer flags it.

**Review periodically.** Terminology drifts, products get renamed, and language usage shifts. An annual pass over high-frequency entries catches decay.

**Propagate changes.** When a term changes, the change should reach translation memory as well as the glossary, or stored segments will continue suggesting the old form indefinitely.

## Common Glossary Failures

**Built too late**, so early and later assets differ.

**Unvalidated entries** applied at scale, propagating an error rather than preventing one.

**No owner**, so contested terms are decided differently by each reviewer.

**Base forms only** in inflected languages, leaving reviewers without the information needed to verify agreement.

**No forbidden list**, so rejected renderings reappear.

**No reasoning recorded**, so every decision is relitigated when a reviewer changes.

**Not connected to review**, so reviewers work without it and re-decide settled questions.

**Not connected to the product**, so video terminology diverges from what the customer sees on screen.

## Starting

Extract terms from the source corpus systematically, and pull from any existing localized material you own.

Draft the entries with the fields above, marking each as validated or provisional.

Have a native reviewer with domain knowledge validate the set before it is applied at volume, and record the reasoning for contested choices.

Assign an owner per language.

Version it, freeze it during batches, and require additions before new terminology enters production.

The glossary is genuinely the highest-leverage hour in a localization program. It is also the least visible work, which is why it gets deferred — and why programs that defer it spend the equivalent time repeatedly, in fragments, across every subsequent project, without ever getting the consistency that doing it once would have produced.

## Connecting the Glossary to the Workflow

A glossary that exists and is not used is a document rather than a control, and the connection points determine which it is.

**Translation stage.** Where the tooling supports term injection or constrained decoding, apply the glossary automatically rather than relying on the translation to happen to match. Where it does not, supply the glossary as context.

**Review stage.** Give reviewers the glossary with the brief. Reviewers working without it re-decide settled questions, which produces churn that looks like a quality problem.

**Automated checking.** Verify glossary term presence and absence of forbidden alternatives as a mechanical gate before human review, with the caveat about inflected languages. This catches a meaningful error class at no marginal cost.

**Audio generation.** Apply pronunciation overrides from the glossary rather than per project.

**Translation memory.** Let the glossary override memory matches. A stored segment containing superseded terminology will otherwise propagate the old term indefinitely, carrying the authority of a high-confidence match.

**Product and content systems.** Where the video glossary derives from product strings, regenerate it on a schedule rather than maintaining it by hand, so it does not drift from what the customer sees.

Each connection removes a place where the glossary can be bypassed. A program where the glossary is applied at three stages and skippable at two will produce inconsistency at the two.

## Scale and Diminishing Returns

Glossaries do not need to be exhaustive, and pursuing exhaustiveness wastes effort that is better spent on validation.

The terms that matter are those that recur, those that are error-prone, and those where a wrong rendering has consequence. A term appearing once in one video, with no particular risk attached, does not need an entry.

Frequency-ranked extraction gives a natural prioritization: the top tier covers most occurrences, and the long tail contributes little.

Proper nouns are the exception to frequency ranking. A product name appearing three times still needs an entry, because getting it wrong is conspicuous.

For programs with many languages, consider whether every term needs an entry in every language. Terms that stay in the source language everywhere need one decision rather than one per language.

Review the glossary against actual review findings periodically. Terms that reviewers never flag may not need entries; terms that reviewers flag repeatedly need better entries or clearer reasoning attached.

## Starting From Nothing

For a program with no existing glossary and content already in production, the useful sequence is different from a greenfield start.

Extract from what has already been translated rather than from the source alone. Existing localized assets encode decisions, and surfacing them shows both what has been decided and where the same concept has been rendered inconsistently.

Those inconsistencies are the priority list. A term rendered three ways across the library is exactly the entry that needs a decision, and resolving it prevents the fourth variant appearing.

Decide whether to retrofit. Correcting existing assets to match a newly settled glossary is a reprocessing job, and whether it is worth doing depends on the assets' remaining life and visibility. High-traffic durable content usually justifies it; a long tail of low-traffic assets usually does not.

Freeze the glossary before the next batch regardless of whether earlier work is corrected, so that the inconsistency stops growing.

Record which assets predate the glossary, so that a future reader of the library understands why older content differs.

## What Good Looks Like

A glossary that is working has a few recognizable properties.

Reviewers stop flagging terminology except for genuinely new terms. When terminology findings drop to near zero on established vocabulary, the glossary is doing its job.

New languages onboard faster, because the source-side decisions — which terms are proper nouns, which are technical, which must not be translated — are already made and only the target renderings need deciding.

Contested questions get decided once. A term that generated debate has an entry with reasoning attached, and the debate does not recur when a new reviewer arrives.

Audio pronunciation stays correct across assets without anyone re-reporting the same name.

Library consistency is visible: a viewer moving between assets encounters the same vocabulary throughout, which is the outcome the whole exercise exists to produce.

If none of these are true after several batches, the glossary is probably not connected to the workflow at the points where it would need to be.
