---
{
  "title": "Caption Accuracy Standards: FCC, Ofcom, and Other Regulatory Benchmarks",
  "slug": "caption-accuracy-regulatory-standards",
  "category": "Accessibility",
  "primaryKeyword": "caption accuracy regulatory standards",
  "metaDescription": "How broadcast regulators in the US, UK, and elsewhere actually measure caption accuracy, what counts as an error, and how these standards differ from WCAG.",
  "excerpt": "WCAG says captions must be accurate. Broadcast regulators actually define what accuracy means, in numbers, and audit against it.",
  "publishedAt": "2026-08-30T14:00:00Z",
  "updatedAt": "2026-08-30T14:00:00Z",
  "heroImage": "/assets/blog/images/gauge-glass-dials.jpg",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

[![Compliance team reviewing documentation in a meeting room](https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Why This Is a Different Standard From WCAG

WCAG, covered in more detail elsewhere in this series, states that captions must be equivalent to the audio they represent, but it does not define a specific numeric accuracy threshold or a specific error-counting methodology. Broadcast regulators in several jurisdictions go considerably further, defining explicit accuracy benchmarks, specific error-classification schemes, and in some cases active complaint and enforcement mechanisms with real regulatory consequences for persistent non-compliance.

This matters for any organisation whose content is actually broadcast, rather than only streamed on a platform the organisation itself controls, since broadcast-specific regulatory obligations are frequently distinct from, and sit alongside, the more general web-accessibility-oriented WCAG framework. An organisation that has carefully implemented WCAG-compliant captioning for its web content can still be out of compliance with a broadcast regulator's specific accuracy requirements for the same content aired on television, because these are genuinely separate regulatory regimes with separate specific requirements, even where both are pursuing the same underlying goal of accessible captioning.

## The United States: FCC Requirements

**The Federal Communications Commission requires that captions be accurate, synchronous, complete, and properly placed**, four distinct criteria that together define compliance rather than accuracy alone being sufficient, and each is worth understanding as its own specific requirement rather than treating "accurate captions" as a single undifferentiated standard.

**Accuracy specifically refers to captions matching the spoken words as closely as possible, including proper representation of the words actually said**, and while the FCC's own standard does not impose one single rigid numeric error-rate threshold applicable uniformly to all content in all circumstances, industry practice and FCC guidance have converged around a widely cited ninety-nine percent accuracy benchmark as a practical, though not always literally regulatorily binding, quality target that most professional captioning services measure themselves against.

**Synchronicity requires that captions coincide with their corresponding spoken words and sounds to the greatest extent possible**, addressing the timing dimension separately from the content-accuracy dimension, since a caption can be word-for-word accurate and still fail this requirement if it appears too far ahead of or behind the actual corresponding audio.

**Completeness requires that captions run from the beginning to the end of a program to the fullest extent possible**, addressing coverage rather than accuracy of individual captions, and this specifically catches the failure mode of captions dropping out partway through a program or failing to start promptly at the beginning.

**Proper placement requires that captions not obscure other important visual content on the screen**, including other on-screen text, and not run off the edge of the screen or overlap in a way that makes them unreadable, which is a visual layout requirement distinct from the linguistic accuracy of the caption text itself.

**Live programming has a somewhat different practical standard than pre-recorded programming**, in recognition of the genuine additional difficulty of producing captions for content in real time with no opportunity for review before broadcast, though the fundamental expectation of accuracy, synchronicity, completeness, and placement still applies, with the practical error tolerance and the methods used to measure compliance calibrated somewhat differently for the live case.

## The United Kingdom: Ofcom Guidelines

**Ofcom sets caption, or subtitling, quality standards for UK broadcasters, with specific quantitative targets for both coverage and quality that differ somewhat in structure from the FCC's approach**, and organisations producing content for UK broadcast need to understand this as its own distinct regulatory framework rather than assuming FCC compliance automatically satisfies UK requirements or vice versa.

**Ofcom's framework has historically included specific quantitative benchmarks for subtitling speed, measured in words per minute, alongside accuracy and latency measures**, reflecting a similar underlying concern to the reading-speed considerations covered extensively elsewhere in this series for general subtitle quality, but codified here as a specific regulatory requirement for broadcast content rather than only a best-practice recommendation.

**Latency, meaning the delay between when something is spoken and when the corresponding caption actually appears, is measured and reported as a distinct metric under Ofcom's framework**, particularly relevant for live subtitling produced through real-time respeaking or automated methods, where some latency is inherent to the production method but excessive latency degrades the viewing experience regardless of how accurate the eventual caption text turns out to be.

**Broadcasters are generally required to meet minimum overall subtitling provision quotas for their programming as a whole**, a coverage requirement operating at the level of a broadcaster's overall output rather than only at the level of any single individual program, distinct from and additional to the per-program quality standards discussed above.

[![Person analysing metrics on a dashboard](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## How Accuracy Is Actually Measured

**The most widely referenced formal accuracy measurement methodology in professional captioning is the NER model, evaluating captions against three categories: correct, edited, and recognized errors**, distinguishing between an error that changes meaning and one that does not, which matters because a purely mechanical word-error-rate count, treating every deviation from a verbatim transcript equally, does not actually reflect what matters most to a viewer relying on captions for comprehension.

**Errors are typically weighted by severity rather than counted uniformly**, since a caption that substitutes a similar but genuinely wrong word changing the actual meaning of a sentence is a more serious error than one using a slightly different but meaning-equivalent phrasing of the same underlying content, or than a caption reasonably and appropriately editing out a genuine disfluency, as covered in more detail in the discussion of disfluency handling in dubbing elsewhere in this series, which applies with a related but distinct set of considerations to captioning specifically.

**This severity-weighted approach is why a naive automated word-error-rate calculation, comparing a caption transcript against a reference transcript mechanically word by word, does not directly correspond to the regulatory accuracy standards discussed here**, even though both are attempting to measure a related underlying concept, and an organisation relying purely on an automated word-error-rate metric as a proxy for actual regulatory compliance may be systematically over- or under-estimating their genuine compliance status relative to how a regulator or an actual trained human evaluator using the formal weighted methodology would assess the same content.

**Sampling methodology matters for any organisation self-auditing against these standards**, since evaluating a small, potentially unrepresentative sample of content and extrapolating a compliance conclusion from it risks missing genuine problems concentrated in specific content types, specific caption vendors, or specific technical conditions not well represented in the sample actually evaluated, and a more genuinely representative sampling approach across content types and conditions produces a more reliable overall compliance picture.

## What This Means for a Localization Program

**Non-English caption tracks are generally subject to the same underlying regulatory accuracy principles as English captions where regulatory frameworks apply**, though enforcement emphasis and specific quantitative benchmarks in practice have historically concentrated more heavily on English-language broadcast captioning in markets like the US and UK, and an organisation should not assume a lower practical bar applies to non-English tracks simply because regulatory enforcement attention has historically been less concentrated there — the underlying accessibility need and the reasonable expectation of equivalent quality do not diminish for a non-English audience.

**Automated caption generation, covered extensively elsewhere in this series, can meet these accuracy standards on favorable audio conditions but needs a human review pass to reliably meet them on the kind of degraded, overlapping, or accented audio conditions that push automated accuracy below the relevant threshold**, and an organisation relying on unreviewed automated captions for regulated broadcast content is taking on genuine regulatory risk proportional to how far their actual typical audio conditions diverge from the clean, favorable conditions under which automated systems perform best.

**Document your actual measured accuracy against a recognized methodology as a matter of ongoing practice, not only reactively in response to a specific complaint or audit**, since having this evidence already prepared and current, in the same spirit as the crisis-communication and rights-documentation preparedness discussed elsewhere in this series, is considerably more useful than needing to reconstruct a compliance case retroactively under the time pressure of an actual regulatory inquiry or a specific viewer complaint that has already been escalated.

**Build accuracy measurement into your ongoing quality assurance process as a standing, repeated practice rather than a one-time certification exercise**, since caption accuracy for a given pipeline, vendor, or content type can genuinely drift over time as underlying automated systems change, as vendor teams turn over, or as your content itself shifts toward more challenging audio conditions than whatever was originally used to validate the pipeline's accuracy.

[![Automated dashboard with charts](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Beyond the US and UK

**Other jurisdictions have their own specific broadcast captioning frameworks, generally sharing the same underlying accuracy, synchronicity, completeness, and placement concepts discussed above, but codified through their own distinct specific regulatory mechanisms and enforcement bodies**, and an organisation operating across multiple broadcast markets needs to verify current specific requirements for each jurisdiction individually rather than assuming that meeting one country's standard automatically satisfies another's, even where the underlying principles are conceptually quite similar across jurisdictions.

**Regulatory frameworks in this specific area continue to evolve, particularly as automated captioning technology has matured and become more widely used for content that was previously captioned entirely manually**, and treating any specific set of numeric thresholds or specific requirements described in general guidance, including this piece, as a snapshot worth periodically re-verifying against current official regulatory guidance is the correct posture, rather than treating any single specific figure as a permanently fixed and unchanging requirement.

## A Working Checklist

- Recognise broadcast caption regulatory standards as separate from, and additional to, WCAG's general web accessibility framework.
- Understand FCC's four distinct criteria — accuracy, synchronicity, completeness, and placement — as separate compliance dimensions.
- Verify current UK Ofcom requirements separately, including subtitling speed and latency measures, for UK broadcast content.
- Use a severity-weighted accuracy evaluation methodology like NER rather than a naive uniform word-error-rate count.
- Do not treat automated word-error-rate as a direct proxy for actual regulatory compliance status.
- Sample representatively across content types and conditions when self-auditing accuracy.
- Apply the same accuracy expectations to non-English caption tracks as to English tracks.
- Add human review to automated captioning for regulated broadcast content, particularly on challenging audio.
- Document measured accuracy against a recognized methodology as ongoing practice, not only reactively.
- Treat accuracy measurement as a repeated, standing quality assurance practice rather than a one-time certification.
- Verify current specific requirements separately for each broadcast jurisdiction you operate in.
- Periodically re-verify any specific regulatory thresholds against current official guidance rather than treating them as permanently fixed.

## Frequently Asked Questions

**Is meeting WCAG caption requirements the same as meeting broadcast regulatory caption standards?**

Not necessarily. WCAG states that captions must be accurate and equivalent to the audio but does not define a specific numeric accuracy threshold or error-counting methodology. Broadcast regulators like the FCC and Ofcom go further, defining explicit quantitative benchmarks, specific error-classification schemes, and active enforcement mechanisms. Content that is both broadcast and streamed on the web may need to satisfy both frameworks separately, since they are distinct regulatory regimes even though they share the same underlying accessibility goal.

**What does the FCC actually require for caption accuracy?**

Four distinct criteria: captions must be accurate, synchronous with the corresponding audio, complete from the beginning to the end of a program, and properly placed so they do not obscure other important visual content. A ninety-nine percent accuracy figure is widely cited as an industry quality benchmark, though the FCC's actual standard is not one single rigid numeric threshold applied uniformly — it evaluates compliance against the four criteria together.

**How is caption accuracy actually measured for regulatory purposes?**

The most widely referenced formal methodology, known as the NER model, evaluates captions against correct, edited, and recognized-error categories, weighting errors by whether they actually change meaning rather than counting every deviation from a verbatim transcript equally. This is why a naive automated word-error-rate calculation does not directly correspond to how a regulator or trained human evaluator would assess the same content using the formal weighted methodology.

**Do non-English caption tracks need to meet the same accuracy standards?**

The underlying accessibility principles apply equally, though enforcement attention has historically concentrated more heavily on English-language broadcast captioning in markets like the US and UK. This does not mean a lower practical quality bar is appropriate for non-English tracks — the reasonable expectation of equivalent caption quality for a non-English-speaking deaf or hard-of-hearing audience does not diminish simply because regulatory enforcement has historically focused elsewhere.

**Can automated captioning alone meet these regulatory accuracy standards?**

On clean, favorable audio conditions, often yes. On degraded, overlapping, accented, or otherwise challenging audio, automated accuracy frequently falls below the relevant threshold without a human review pass. An organisation relying on unreviewed automated captions for regulated broadcast content is taking on regulatory risk proportional to how far their actual typical audio conditions diverge from the clean conditions automated systems perform best under.

**Should I prepare compliance documentation before I'm actually asked for it?**

Yes. Documenting measured accuracy against a recognized methodology as an ongoing, standing practice, rather than only reactively when a specific complaint or audit arises, means the evidence is already current and organized when it is actually needed. Reconstructing a compliance case retroactively under the time pressure of a real regulatory inquiry is considerably harder and less reliable than having it prepared in advance.

---

Related reading: [WCAG Video Compliance](/blog/wcag-video-compliance-guide) | [SDH Captions Explained](/blog/sdh-captions-explained) | [Subtitle Reading Speed Guide](/blog/subtitle-reading-speed-guide)
