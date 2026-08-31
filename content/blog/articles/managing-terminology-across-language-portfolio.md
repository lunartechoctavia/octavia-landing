---
{
  "title": "Managing Terminology Across a Growing Language Portfolio",
  "slug": "managing-terminology-across-language-portfolio",
  "category": "Localization",
  "primaryKeyword": "terminology management across languages",
  "metaDescription": "How to keep product and brand terminology consistent as a video localization program scales from a few languages to dozens without a coordination collapse.",
  "excerpt": "A glossary that works fine at four languages becomes unmanageable at twenty unless the structure underneath it changes first.",
  "publishedAt": "2026-08-29T00:00:00Z",
  "updatedAt": "2026-08-29T00:00:00Z",
  "heroImage": "/assets/blog/images/classroom-glass-panes.jpg",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

[![Team reviewing a project plan on a shared screen](https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Why This Breaks as Programs Scale

A terminology glossary covering four or five languages, maintained by one person in a spreadsheet, is a perfectly workable system. The same approach at twenty or thirty languages, with several people across different teams and vendors touching it, reliably breaks down, and it breaks down in a specific, predictable way: not through any single dramatic failure, but through a gradual accumulation of small inconsistencies that nobody individually notices until a customer or an internal reviewer happens to compare content across several languages at once and finds a term rendered three different ways.

The reason a spreadsheet-based approach that worked at small scale stops working is structural, not a matter of insufficient diligence by whoever maintains it. A single flat list of terms and their translations does not represent the actual relationships that matter at scale: which terms are locked and which are guidance, which have different correct renderings in different registers or content types, which language's rendering was actually reviewed and approved versus provisionally translated, and who has authority to change a given entry. Without that structure, a growing glossary becomes harder to trust exactly as it grows larger, which is the opposite of what you need from it.

## What Changes as Language Count Grows

**Update propagation time increases linearly with language count if the process is manual**, since a terminology change decided today has to be reviewed and applied by a native speaker in every language the term appears in, and a process that worked fine when this meant coordinating with four people becomes a genuine bottleneck when it means coordinating with thirty, each potentially in a different time zone and with different availability.

**The likelihood of an undetected inconsistency rises non-linearly with language count**, not linearly, because the number of pairs of languages that could disagree with each other grows much faster than the number of languages itself, and a spot-check process that catches most problems at five languages catches a much smaller proportion of actual problems at thirty, simply because there are far more pairwise comparisons where a divergence could be hiding.

**Coordination overhead between the terminology function and content-producing teams increases as more teams, more vendors, and more content types are added to a growing program**, and what was an informal conversation between two people managing a small operation becomes, at scale, something that genuinely needs an explicit process and defined ownership, or it reliably stops happening consistently once the people involved change or get busier with other priorities.

**The cost of getting a term wrong also rises with scale**, since a wrong or inconsistent term in a program covering thirty languages and years of accumulated content represents a larger correction and re-review effort if caught late than the same error would in a smaller, newer program — which is itself an argument for investing in structure earlier rather than waiting until the pain of an unstructured approach becomes undeniable.

[![Compliance team reviewing documentation in a meeting room](https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Structuring the Glossary Itself

**Separate locked terms, which must be rendered exactly as specified with no acceptable variation, from guidance terms, which suggest a preferred rendering but allow contextual judgement**, since treating every entry as equally rigid produces unnecessary friction and pushback from translators on entries that were never actually meant to be absolute, while treating every entry as equally flexible loses the actual enforcement value of the entries that genuinely need to be locked.

**Record status per entry per language explicitly** — approved, provisional, under review, deprecated — rather than treating the glossary as a single uniform list where every entry is implicitly assumed to carry the same level of confidence and finality, since a translator or reviewer working from the glossary needs to know whether a given entry represents a settled decision or a placeholder awaiting confirmation.

**Tag entries by domain, register, or content type where a term genuinely has different correct renderings in different contexts** — a term that is rendered one way in formal institutional content and differently in casual creator content is not an inconsistency to resolve but a legitimate contextual distinction that the glossary structure needs to actually represent, rather than forcing a single flattened entry that is wrong in one context or the other.

**Version the glossary and retain history, not just current state**, so that a change made to a term's approved rendering last year is traceable — what it was, when it changed, why, and who approved it — which is what makes it possible to answer "which content used the old rendering and needs review" rather than only knowing the current state with no visibility into what changed underneath already-published content.

**Assign clear per-language ownership for glossary entries, distinct from ownership of the glossary structure and process itself**, since the person responsible for deciding the correct Portuguese rendering of a term is not necessarily the same person responsible for the glossary's overall governance, and conflating these roles as language count grows produces a bottleneck at whoever happens to hold both responsibilities.

## Propagation and Change Management

**Establish an explicit process for how a terminology change propagates**, covering who can propose a change, who approves it, which languages and which existing content are affected, and what happens to content already published using the old rendering — this process needs to exist and be documented well before it is needed under pressure, for the same reason any process that only gets designed reactively during an actual incident tends to be worse than one designed calmly in advance.

**Decide deliberately, as a matter of policy rather than case by case, whether terminology changes propagate retroactively to already-published content or only apply going forward**, since this is exactly the same tension discussed in the context of translation memory corrections, and it deserves the same explicit, documented policy rather than being decided freshly and potentially inconsistently each time a change actually comes up.

**Track which specific pieces of content used which version of a given term**, which is what makes retroactive propagation decisions tractable in practice rather than requiring an exhaustive manual search through the entire catalogue every time a term changes — this tracking capability needs to be built into the underlying content and terminology infrastructure rather than assumed to be reconstructable after the fact from memory or from scattered project records.

**Batch and schedule terminology updates rather than propagating every change immediately and individually**, particularly for a large, actively growing program, since a steady drip of individual urgent terminology changes each demanding immediate propagation across dozens of languages is both harder to manage well and harder for reviewers and vendors to actually keep up with than a periodic, planned batch of accumulated changes reviewed and applied together on a predictable schedule.

[![Person reviewing dashboards on a monitor](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Governance and Ownership as Scale Grows

**A single terminology owner with informal authority, which works reasonably at small scale, needs to become an explicit governance structure with defined decision rights as the program grows**, since informal authority that depended on one person's accumulated knowledge and relationships does not survive that person changing roles, going on leave, or simply becoming too busy to personally review every proposed change once the volume of proposed changes has grown along with the language count.

**Establish a lightweight but real approval process for new locked terms, rather than either full committee review for every entry or fully decentralised individual translator discretion**, since the former does not scale to the volume of terminology decisions a large, active program actually generates, while the latter reproduces exactly the inconsistency problem that structured terminology management exists to solve in the first place.

**Where multiple vendors are involved, as covered in more detail elsewhere, the terminology governance structure needs to sit above and be genuinely independent of any single vendor relationship**, contractually required of every vendor rather than voluntarily observed, since a governance structure that any one vendor can simply choose not to follow is not actually governance in any meaningful sense, regardless of how well-designed the glossary structure itself is.

**Periodically audit actual content against the glossary, not just trust that the glossary is being followed because a process document says it should be**, since the gap between a documented process and actual practice tends to widen gradually and invisibly as a program scales, personnel change, and the people currently doing the work were not necessarily the people who originally designed and bought into the process.

## Tooling Considerations at Scale

**A spreadsheet or simple flat-file glossary is genuinely adequate for a small number of languages and a small, stable team**, and there is no need to over-engineer tooling for a program that has not yet actually experienced the scale-driven problems described above — premature tooling investment ahead of an actual demonstrated need is its own form of waste.

**As the program scales, the specific capabilities worth prioritising in more structured tooling are per-entry status and versioning, per-language ownership assignment, searchability and cross-referencing against actual content, and integration with the translation and review workflow itself**, so that terminology enforcement happens as a natural part of producing and reviewing content rather than as a separate, easily-skipped manual verification step layered on top of an otherwise disconnected production process.

**Whatever tooling is chosen, ensure the underlying terminology data itself is exportable in a standard, non-proprietary format**, for exactly the same reasons asset portability matters in any vendor relationship — a terminology management tool that locks your accumulated terminology decisions into a proprietary format you cannot readily export is a real constraint on your future flexibility, regardless of how good the tool's day-to-day functionality currently is.

## A Working Checklist

- Separate locked terms from guidance terms rather than treating every glossary entry as equally rigid.
- Record approval status per entry per language, not just a single flat current value.
- Tag entries by domain or register where a term legitimately has different correct renderings in different contexts.
- Version the glossary and retain change history rather than only current state.
- Assign explicit per-language ownership for terminology decisions, distinct from overall governance ownership.
- Document an explicit change-propagation process before it is needed under pressure.
- Decide as policy, not case by case, whether terminology changes apply retroactively or only going forward.
- Track which published content used which version of a given term to make retroactive decisions tractable.
- Batch and schedule terminology updates on a predictable cadence rather than propagating every change immediately.
- Establish a lightweight but real approval process for new locked terms as volume grows.
- Make terminology governance contractually binding across every vendor, not voluntarily observed.
- Periodically audit actual published content against the glossary rather than assuming process compliance.
- Prioritise status tracking, versioning, and workflow integration in tooling as scale increases.
- Ensure terminology data is exportable in a standard, non-proprietary format regardless of tooling choice.

## Frequently Asked Questions

**At what point does a spreadsheet glossary stop working?**

There is no fixed language count where this happens uniformly, but the underlying pattern is consistent: the likelihood of an undetected inconsistency grows faster than the language count itself, since the number of language pairs that could disagree grows much faster than the number of languages. A spot-check process that catches most problems at five languages catches a meaningfully smaller share of actual problems at thirty, simply because there are far more places for a divergence to hide.

**Should every terminology change apply retroactively to already-published content?**

This should be a deliberate, documented policy decision rather than something decided case by case each time a change comes up. Retroactive propagation risks overwriting content that was already reviewed and approved under the old rendering; forward-only application means an inconsistency persists indefinitely in existing content. Whichever policy you choose, tracking which content used which version of a given term is what makes either decision actually tractable to execute.

**Who should have authority to change a locked terminology entry?**

A defined, lightweight approval process, distinct from both full committee review of every proposed entry and fully decentralised individual translator discretion. The former does not scale to the volume of decisions an active multi-language program generates; the latter reproduces exactly the inconsistency problem structured terminology management is meant to solve. Per-language ownership should sit with someone who has actual linguistic authority for that language, separate from whoever owns the overall governance process.

**How do we keep terminology consistent across multiple vendors?**

The governance structure needs to sit above and be genuinely independent of any single vendor relationship, and every vendor needs to be contractually required to consult and follow it rather than voluntarily choosing to. A governance process any one vendor can simply opt out of is not actually functioning as governance, regardless of how well-designed the underlying glossary structure is.

**Do we need dedicated terminology management software?**

Not necessarily at small scale — a well-structured spreadsheet is genuinely adequate for a small number of languages and a small, stable team, and investing in more sophisticated tooling ahead of an actual demonstrated need is its own form of waste. As scale grows, the specific capabilities worth prioritising are per-entry status and versioning, per-language ownership tracking, and integration with the actual translation and review workflow, rather than a general feature-for-feature comparison of available tools.

**How do we know if our terminology process is actually being followed?**

Periodically audit real published content directly against the glossary rather than trusting that a documented process is being followed simply because it exists on paper. The gap between documented process and actual day-to-day practice tends to widen gradually as a program scales and personnel change, and this gap is generally invisible until an explicit audit or an external comparison — a customer or reviewer comparing content across languages — surfaces it.

---

Related reading: [Video Translation Glossary Building](/blog/video-translation-glossary-building) | [Video Localization Vendor Management](/blog/video-localization-vendor-management) | [Translation Memory Database Design](/blog/translation-memory-database-design)
