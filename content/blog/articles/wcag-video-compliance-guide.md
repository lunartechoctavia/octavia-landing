---
{
  "title": "WCAG Video Compliance: What Captions and Audio Description Actually Require",
  "slug": "wcag-video-compliance-guide",
  "category": "Accessibility",
  "primaryKeyword": "WCAG video compliance",
  "metaDescription": "A practical read of what WCAG requires for video: which success criteria apply, what Level AA actually demands, and how to meet it without guesswork.",
  "excerpt": "Most teams treat WCAG as a wall of criteria. For video, only a handful apply, and they are more specific than people expect.",
  "publishedAt": "2026-08-27T09:30:00Z",
  "updatedAt": "2026-08-27T09:30:00Z",
  "heroImage": "/assets/blog/images/policy-glass-folds.png",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

[![Person working at a desk with documents](https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Why This Comes Up Now

Accessibility requirements for video have moved from good practice to procurement gate in most of the markets that matter commercially. Public sector buyers in Europe and North America require conformance statements. Enterprise buyers increasingly ask for them in vendor security and compliance questionnaires. Legislation in the European Union has phased in obligations that reach private-sector services, not only government.

Behind almost all of it sits one document: the Web Content Accessibility Guidelines. Regulations rarely write accessibility requirements from scratch — they reference WCAG at a conformance level, usually Level AA, and inherit its definitions.

That is good news for anyone producing video, because it means there is one specification to read rather than a dozen jurisdictional variants. It is also a narrower reading task than the size of the document suggests. WCAG covers everything on a web page. The criteria that apply to time-based media are a small, specific subset.

## The Criteria That Apply to Video

WCAG organises requirements as success criteria, each assigned a level: A, AA, or AAA. Conformance at a level means meeting every criterion at that level and every level below it.

For prerecorded video with audio — the ordinary case for marketing video, training content, courses, and recorded webinars — these are the ones that bite.

**Captions for prerecorded audio content (Level A).** Captions must be provided for all prerecorded audio in synchronised media. This is the captions requirement, and at Level A it is not optional for any video with speech.

**Audio description or media alternative (Level A).** An alternative for time-based media, or audio description, must be provided for prerecorded video. At Level A this can be satisfied by a full text alternative describing the visual content.

**Audio description for prerecorded media (Level AA).** At AA, the text alternative is no longer sufficient. Audio description itself must be provided where the visual track carries information not available in the audio.

**Captions for live audio (Level AA).** Live synchronised media requires live captions.

**Audio control (Level A).** Any audio that plays automatically for more than three seconds must have a mechanism to pause, stop, or control its volume independently of the system volume.

**Contrast and text presentation criteria** apply to any text rendered into the video frame or displayed by the player, including burned-in subtitles and on-screen titles.

**Keyboard accessibility and focus criteria** apply to the player controls, which is a front-end concern rather than a content one but is frequently what fails an audit.

Level AAA adds sign language interpretation and extended audio description. Very few organisations target AAA, and most regulations do not require it.

## What Level AA Actually Demands

The gap between Level A and Level AA for video is one thing: real audio description rather than a text alternative.

This is the requirement that surprises teams. Captions are well understood and widely produced. Audio description — a spoken narration track describing what is visible on screen, inserted into the gaps in the dialogue — is produced far less often, costs more, and requires a production step most video workflows do not have.

The scope condition matters and is often misread. Audio description is required where the video track presents information that is not already available in the audio. A talking-head video where the speaker says everything the viewer needs to know does not need description of the speaker's face. A software demonstration where the narrator says "click here" while the cursor moves to an unnamed button absolutely does, because the audio alone leaves the viewer without the information.

The practical consequence is that the requirement can often be designed away. Content scripted so the narration describes what it shows carries its own description. This is cheaper than producing a separate track and produces better content for everyone, including people listening rather than watching.

Where the visual genuinely carries independent information and cannot be rescripted, a described track is needed.

[![Team collaborating around a laptop](https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Captions: Meeting the Criterion Properly

The criterion says captions must be provided. It does not say the captions must be good, which is why auto-generated captions with substantial errors technically produce a caption track and practically fail the user.

WCAG's supporting documentation is clear that captions must be synchronised, equivalent, and accessible — equivalent meaning they convey the same information as the audio. An error-riddled automatic track is not equivalent.

What a conforming caption track requires in practice:

**Accurate dialogue.** Automatic transcription on clean audio gets close and needs a review pass. On accented speech, overlapping speakers, technical vocabulary, or poor source audio, it needs a substantial one.

**Speaker identification** where the speaker is not visually obvious, which is a caption requirement rather than a subtitle one.

**Non-speech audio** where it carries meaning. Captions in the accessibility sense are what the industry calls SDH — the sound-description content is part of the requirement, not an enhancement.

**Synchronisation.** Captions must appear with the audio they represent. Drift is a conformance failure as well as an irritation.

**Correct language tagging.** Related criteria require the language of the page and of any passages in another language to be identified programmatically. Caption tracks carry a language attribute and it should be correct.

## Transcripts: Useful but Not a Substitute

A transcript is not a caption track and does not satisfy the caption criterion. It is genuinely useful — it serves screen reader users, search engines, and anyone who would rather read than watch — but it is unsynchronised, which is precisely what the caption criterion requires.

Where a transcript does carry conformance weight is as the media alternative for the Level A video criterion. A full text alternative that describes the visual content as well as transcribing the audio satisfies the Level A requirement for a text alternative to prerecorded video.

At Level AA it stops being sufficient for the audio description requirement, though it remains a good thing to publish.

The practical position: produce transcripts as a matter of course. They are cheap once the caption track exists, they carry Level A weight, they improve discoverability, and they are the input to every subsequent translation.

## The Multilingual Dimension

WCAG says nothing about which languages content must be available in. Providing English content only is not a WCAG failure.

But the moment content exists in a second language, the accessibility obligations attach to that version too. Spanish audio needs Spanish captions. A localized course needs localized captions and, where applicable, localized audio description.

This is where accessibility and localization programmes should be run as one workstream rather than two. The natural failure mode is a localization programme that ships dubbed audio in eight languages and captions in one, which leaves the accessibility gap in every market except the original.

The efficient structure:

- Produce a verified source-language transcript once and treat it as the master.
- Derive source-language captions with sound description from it.
- Translate the annotated master into each target language, carrying the annotation decisions forward.
- Where audio description is required, script it once in the source language and localize the description script alongside the dialogue.

Done this way, the accessible tracks are a modest increment on the localization work rather than a parallel programme.

## Conformance Statements and Evidence

Buyers rarely ask whether content is accessible. They ask for a conformance statement, usually in the form of an accessibility conformance report — the VPAT template is the common vehicle in North American procurement, and the European equivalent references the harmonised standard EN 301 549, which itself incorporates WCAG.

Answering these honestly requires knowing which criteria you actually meet, per product area, with evidence. Claiming full AA conformance for a video library that has captions but no audio description is a claim that will not survive scrutiny, and overstating conformance is a worse commercial position than stating a gap with a remediation date.

What to keep as evidence:

- The caption specification your tracks are produced against, and the review step that enforces it.
- Sample tracks with reading speed and accuracy measurements.
- The rule you apply for deciding when audio description is required, and the assets where it has been produced.
- Player conformance results, including keyboard operation and control labelling.
- Language tagging in your delivery pipeline.

[![Person taking notes beside a laptop](https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## A Working Checklist

- Provide captions for every prerecorded video with speech — this is Level A and has no exceptions.
- Make captions equivalent, not merely present: accurate dialogue, speaker identification, meaningful non-speech audio, correct synchronisation.
- Publish transcripts as a matter of course; they carry Level A weight as a media alternative and cost little once captions exist.
- Determine per asset whether the visual track carries information the audio does not — that is the audio description trigger.
- Where it does, either rescript the narration to carry the information or produce a described track.
- Provide live captions for live synchronised media if you are targeting Level AA.
- Ensure autoplaying audio longer than three seconds has independent pause, stop, or volume control.
- Check contrast and legibility for any text burned into the frame.
- Verify the player itself is keyboard operable with labelled controls.
- Tag caption track languages correctly, including for localized versions.
- Extend every accessibility obligation to every localized version, not only the source language.
- State conformance honestly, with gaps and remediation dates rather than optimistic claims.

## Frequently Asked Questions

**Do automatic captions satisfy WCAG?**

Only if they are accurate. The criterion requires captions that are equivalent to the audio, and an automatic track with substantial transcription errors is not equivalent. Automatic transcription is a legitimate and efficient starting point — on clean audio it gets most of the way — but a review pass is what turns it into a conforming track. Publishing unreviewed automatic captions is a common and well-recognised failure.

**Is a transcript enough instead of captions?**

No. Transcripts are unsynchronised, and the caption criterion specifically requires synchronised text. A transcript does satisfy the separate Level A requirement for a text alternative to prerecorded video, provided it describes the visual content as well as transcribing the audio, so it is worth producing — but it does not replace captions.

**When is audio description actually required?**

At Level AA, whenever the video track presents information not available from the audio alone. A talking-head video where the speaker says everything relevant does not trigger it. A demonstration, a chart walkthrough, or anything where the narration says "this one" while pointing does. Often the cheapest compliance route is rescripting the narration so it carries the information itself, which also improves the content for listeners.

**Does WCAG require content in multiple languages?**

No. Providing content in one language only is not a WCAG failure. But once a localized version exists, the accessibility criteria apply to it — Spanish audio requires Spanish captions. The common failure is dubbing into many languages while captioning only the original, which leaves every localized market without accessible content.

**What conformance level should we target?**

Level AA. It is the level referenced by essentially every regulation that incorporates WCAG, and it is what procurement questionnaires ask about. Level AAA adds sign language interpretation and extended audio description and is rarely required; treat it as an aspiration for specific high-impact content rather than a catalogue-wide target.

**Does WCAG apply to video embedded in a native mobile app?**

WCAG itself is written for web content, but the criteria are referenced by the standards that do cover apps — EN 301 549 in Europe explicitly extends to non-web software, and procurement questionnaires routinely ask about mobile alongside web. In practice the content obligations are identical: captions, transcripts, and audio description where required. What differs is the player conformance work, since a native player has its own control labelling and focus behaviour to verify.

**How do we answer a procurement questionnaire honestly if we have gaps?**

State the gap, state the scope it affects, and state a remediation date. Buyers are used to partial conformance and generally accept a credible plan. What damages a relationship is claiming full conformance and being found out during an audit or after a user complaint, which converts a manageable procurement conversation into a legal one.

---

Related reading: [Video Accessibility Guide](/blog/video-accessibility-guide) | [SDH Captions Explained](/blog/sdh-captions-explained) | [Audio Description and Translation](/blog/audio-description-and-translation)
