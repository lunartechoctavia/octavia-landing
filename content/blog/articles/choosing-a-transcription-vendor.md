---
{
  "title": "Choosing a Transcription Vendor Independent of Your Translation Vendor",
  "slug": "choosing-a-transcription-vendor",
  "category": "Localization",
  "primaryKeyword": "transcription vendor selection",
  "metaDescription": "Why the best transcription provider and the best translation provider are not always the same company, and how to evaluate them as separate decisions.",
  "excerpt": "Transcription accuracy is a ceiling on everything downstream. Buying it bundled with translation means you rarely get to evaluate it on its own merits.",
  "publishedAt": "2026-08-29T00:30:00Z",
  "updatedAt": "2026-08-29T00:30:00Z",
  "heroImage": "/assets/blog/images/adjacent-glass-monoliths.png",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

[![Person reviewing a terminology list on screen](https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Why This Is Worth Treating as Two Decisions

Most organisations selecting a video localization provider evaluate transcription, translation, and dubbing as one bundled decision, because most vendors sell them as one bundled product, and the natural procurement path of least resistance is to evaluate the whole package together against another whole package rather than decomposing it into its actual component parts.

This is not automatically the wrong approach — for many organisations, particularly smaller ones without the volume or specialisation needs to justify managing multiple relationships, a good bundled provider is entirely the right choice. But it is worth recognising as a choice rather than a default, because transcription and translation are genuinely different technical capabilities with different determinants of quality, and a vendor's strength in one does not reliably predict strength in the other.

The core reason this matters is that transcription accuracy functions as a hard ceiling on everything downstream. A translation, however skilled, cannot correct a transcription error it never sees, because the translator is working from the transcript, not from the original audio, in the overwhelming majority of production workflows. An error introduced at the transcription stage propagates silently through translation, subtitling, and dubbing, and it is frequently invisible to anyone reviewing the final output in a language they do not share with the reviewer checking transcription accuracy, since the translated output can read perfectly fluently while being a perfectly fluent rendering of something the speaker never actually said.

## What Actually Determines Transcription Quality

**Acoustic model quality for your specific language and, critically, your specific audio conditions**, which is not a single uniform capability across a vendor's whole language portfolio — a vendor can have excellent English transcription and considerably weaker performance in a lower-resource language, or excellent performance on clean studio audio and considerably weaker performance on the specific noisy, accented, or technical audio that actually makes up your content.

**Domain and vocabulary adaptation capability**, meaning whether the vendor's system can be configured with your specific proper nouns, technical terminology, and product names to improve recognition of exactly the vocabulary a general-purpose model is least likely to get right by default — this capability varies significantly between vendors and matters disproportionately for technical, specialised, or brand-heavy content.

**Speaker diarization accuracy**, which is a distinct capability from raw word-level transcription accuracy and is particularly important for any multi-speaker content — a vendor can transcribe words accurately while attributing them to the wrong speaker, which is a different and separately evaluable failure mode.

**Handling of disfluencies, overlapping speech, and genuinely difficult audio conditions**, which is where transcription quality differences between vendors tend to be most visible and most consequential, since clean single-speaker studio audio is a solved problem for essentially every credible vendor at this point, while degraded, accented, overlapping, or noisy audio is where real differentiation actually exists.

**Confidence scoring quality and usability**, meaning whether the vendor's confidence output is actually well-calibrated and granular enough to support efficient review routing, rather than a single coarse aggregate score that does not usefully distinguish which specific parts of a long transcript most need human attention.

[![Terminal window with text output](https://images.unsplash.com/photo-1551288049-a23a13c4a2e0?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Why a Bundled Vendor May Not Be Optimal for Both

**Translation quality is dominated by different factors than transcription quality** — linguistic and cultural fluency in the target language, terminology management capability, reviewer network quality and availability in specific languages — and a vendor's investment and specialisation in these areas does not necessarily correlate with equivalent investment in the underlying speech recognition technology that determines transcription quality.

**Some vendors specialise deliberately in one layer of the stack and license or partner for the other**, which is a legitimate and common business model, but it means evaluating such a vendor's translation quality tells you little to nothing about the transcription quality of whatever underlying technology they are actually using, and it is worth explicitly asking rather than assuming a vendor's own transcription and their own translation are equally representative of their own specific investment and expertise.

**A vendor bundling transcription and translation as one product has a structural disincentive to be transparent about which is genuinely their own core strength**, since unbundling that information in a sales conversation is not typically in their commercial interest, and this is precisely why an independent, hands-on evaluation of transcription accuracy specifically, on your own actual content, matters more than a vendor's own characterisation of their transcription capability.

**Where transcription is being licensed or sourced by your translation vendor from a third party, this may not even be disclosed as a distinct fact unless specifically asked about**, and it is a reasonable and useful question to raise explicitly in vendor evaluation, since a translation vendor that is transparent and confident about their transcription sourcing, whatever it is, is generally a better sign than one that is evasive about the question.

## When Separating the Two Makes Sense

**For high volume, where the cost difference between a specialised transcription-only vendor and a bundled full-service vendor's transcription component can be material at scale**, particularly if your content has audio characteristics — heavy accent variation, significant background noise, extensive technical vocabulary — that specifically reward specialisation over a generalist bundled offering.

**For content in a language where transcription quality varies unusually widely between vendors**, which is more common for lower-resource languages where the underlying acoustic and language model quality genuinely differs more between providers than it does for extremely well-resourced languages like English or Mandarin, where most credible vendors have reached a broadly comparable baseline level of performance.

**Where you already have an existing, working, reviewed transcript from another source — an existing internal transcription team, a separate accessibility captioning vendor already producing accurate transcripts for other reasons — and want to supply it directly to a translation vendor rather than paying for transcription you do not actually need**, which is a straightforward efficiency case rather than a quality-driven reason, but a real and common one, and worth explicitly asking any translation vendor whether they support and discount for a client-supplied transcript input.

**Where regulatory, security, or data residency requirements constrain where audio can actually be processed, in ways that a specific specialised transcription vendor satisfies but your preferred translation vendor's own bundled transcription infrastructure does not**, which is a genuine and sometimes decisive reason to decouple the two regardless of any quality consideration.

[![Automated dashboard with charts](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Evaluating Transcription Independently

**Test with your actual audio, not a vendor's demo content or a clean benchmark sample**, since the entire point of independent evaluation is surfacing performance on the specific conditions — your accents, your background noise levels, your technical vocabulary — that a general benchmark or a vendor-selected demo sample is specifically designed not to expose.

**Measure word error rate on a genuinely representative sample of your own content, including your worst realistic audio quality, not only your best**, since a vendor comparison based only on your cleanest content will not predict performance on the harder material that a real production volume inevitably includes, and the harder material is exactly where vendor differences tend to be largest and most consequential.

**Evaluate diarization accuracy separately from word-level transcription accuracy on any multi-speaker sample content**, since these are genuinely distinct capabilities that can vary independently between vendors, and a vendor comparison that only measures word accuracy on single-speaker content tells you nothing about diarization performance on the panel or interview content that may actually make up a meaningful share of your real volume.

**Check whether vocabulary customisation genuinely improves recognition of your specific terms**, by testing the same content with and without your custom vocabulary list supplied, since a vendor's vocabulary customisation feature existing in principle is a different question from it actually producing a measurable accuracy improvement on your specific proper nouns and technical terms in practice.

## Practical Integration if You Do Separate Them

**Establish a clear, documented handoff format and quality bar between the transcription and translation stages**, specifying exactly what the translation vendor should expect to receive — timing precision, speaker labelling format, punctuation and formatting conventions — so that a genuinely separate transcription vendor's output integrates cleanly into the translation vendor's workflow rather than requiring ad hoc reformatting that introduces its own errors and delay.

**Confirm your translation vendor will actually accept and appropriately discount for a client-supplied transcript**, since some vendors' pricing and workflow assumes they will always perform transcription themselves and may not have a clean, discounted path for accepting external transcript input — this needs to be confirmed explicitly during vendor selection rather than assumed to be a standard, frictionless option every vendor supports equally well.

**Decide who owns the review and correction responsibility for transcript accuracy when the two vendors are separate**, since ambiguity about whether transcription errors are caught and corrected by the transcription vendor, the translation vendor, or an internal reviewer is a specific and avoidable coordination gap that a single bundled vendor relationship does not have to explicitly resolve, precisely because one party bears end-to-end responsibility by default in that arrangement.

## A Working Checklist

- Recognise transcription and translation as separate technical capabilities with different determinants of quality.
- Evaluate transcription accuracy independently, on your own representative audio, rather than trusting a vendor's own characterisation.
- Test with your worst realistic audio quality, not only your cleanest sample content.
- Evaluate diarization accuracy separately from word-level transcription accuracy on multi-speaker content.
- Ask explicitly whether a translation vendor's transcription is genuinely their own or licensed from a third party.
- Test whether vocabulary customisation actually improves recognition on your specific proper nouns and terms.
- Consider a specialised transcription vendor for high volume, lower-resource languages, or unusually demanding audio conditions.
- Ask whether translation vendors accept and discount for a client-supplied, already-reviewed transcript.
- Establish a clear handoff format and quality bar if separating transcription and translation across vendors.
- Assign explicit ownership for transcript accuracy review when transcription and translation are handled by separate vendors.
- Factor regulatory, security, or data residency constraints into the decision to separate the two, independent of quality considerations.

## Frequently Asked Questions

**Does a vendor with great translation quality also have great transcription?**

Not necessarily. Translation quality depends on linguistic fluency, terminology management, and reviewer network strength in the target language, while transcription quality depends on acoustic model performance, vocabulary adaptation, and diarization accuracy — genuinely different capabilities. Some vendors specialise deliberately in one and license or partner for the other, which is a legitimate business model but means their strength in translation tells you little about their actual transcription performance on your specific audio.

**How do I actually test transcription quality before committing to a vendor?**

Test with your own representative audio, including your worst realistic recording conditions, not a vendor's polished demo content or a generic clean benchmark. Measure word error rate on that sample, evaluate diarization separately if you have multi-speaker content, and check whether supplying your own custom vocabulary list actually improves recognition of your specific proper nouns and technical terms in practice, rather than trusting that the customisation feature exists.

**Is it worth using a separate transcription vendor from my translation vendor?**

It can be, particularly at high volume where a specialised vendor's cost or accuracy advantage becomes material, for lower-resource languages where transcription quality genuinely varies more between providers, or where you already have an existing reviewed transcript source and want to avoid paying for transcription you do not need. For many organisations, particularly smaller ones, a good bundled provider remains the simpler and entirely reasonable choice — the point is making this decision deliberately rather than by default.

**Will my translation vendor accept a transcript I already have?**

Ask explicitly rather than assuming. Some vendors' pricing and workflow assume they will always perform transcription themselves and may not have a clean, appropriately discounted path for accepting an externally supplied transcript. This is worth confirming during vendor selection if you already have a working transcription source you would prefer to keep using.

**What is the risk of bundling transcription and translation with one vendor?**

The main risk is reduced visibility into transcription quality specifically, since a vendor's translation output can read fluently even when it is a fluent rendering of a transcription error, and this can go unnoticed by a reviewer checking the target language who does not have visibility into whether the transcript itself matched the original audio accurately. A vendor bundling the two also has limited commercial incentive to disclose whether their transcription is genuinely their own core strength or a licensed third-party component.

**Does this matter for every content type equally?**

Less so for clean, single-speaker, well-resourced-language content, where most credible vendors have reached a broadly comparable transcription performance level. It matters considerably more for lower-resource languages, heavily accented or noisy audio, technical or brand-heavy vocabulary, and multi-speaker content where diarization accuracy is a real and separately evaluable factor — these are the conditions where genuine differentiation between vendors actually shows up.

---

Related reading: [Writing a Video Localization RFP](/blog/video-localization-rfp-guide) | [Video Localization Vendor Management](/blog/video-localization-vendor-management) | [Forced Alignment Explained](/blog/forced-alignment-explained)
