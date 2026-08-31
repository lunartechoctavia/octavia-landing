---
{
  "title": "Filler Words, Breath, and Disfluency in AI Dubbing: Clean Them or Keep Them?",
  "slug": "filler-words-and-breath-in-ai-dubbing",
  "category": "Voice AI",
  "primaryKeyword": "disfluency in AI dubbing",
  "metaDescription": "Whether to remove ums, false starts, and breath sounds when dubbing speech, and why the answer depends on content type more than on what technology allows.",
  "excerpt": "A dub with every um and false start removed sounds polished. A dub of an unscripted interview with every um removed sounds like a different person.",
  "publishedAt": "2026-08-29T01:00:00Z",
  "updatedAt": "2026-08-29T01:00:00Z",
  "heroImage": "/assets/blog/images/black-silk-wave.png",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

[![Person speaking into a studio microphone](https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Why This Question Even Comes Up

Unscripted human speech is full of disfluencies — filler words like "um" and "uh," false starts where a sentence begins and restarts, repeated words, trailing-off sentences, and audible breath — that a scripted, edited written translation naturally does not carry over unless someone deliberately puts them back in. A translated and dubbed transcript that faithfully renders only the actual content words of what was said produces speech that is, by construction, more fluent and more polished than the original ever was.

This might sound like a straightforward improvement, and for some content it genuinely is. For other content, it is a subtle but real misrepresentation of the source material, changing the character and authenticity of what the audience is actually experiencing in a way that matters more than it might initially seem to a team focused primarily on translation accuracy at the word level.

The right answer depends heavily on content type, and the mistake most workflows make is applying one default policy — almost always automatic disfluency removal, since that is what most transcription and translation pipelines do by default for cleaner text — uniformly across every content type without ever making the decision deliberately for the content that actually needed a different one.

## Where Removing Disfluencies Is Clearly Right

**Scripted narration and prepared presentations**, where any disfluency in the original recording represents a performance error rather than a meaningful characteristic of the content or the speaker, and removing it in the dub is simply correcting a mistake, exactly as a video editor would likely have cut a stumble from the original recording had they noticed it before publishing.

**Instructional and educational content**, where disfluencies add no value to the viewer and genuinely detract from clarity and from the efficient use of the viewer's attention, particularly for content already competing with translation-driven text expansion for available time and reading capacity.

**Corporate and formal communication**, where a certain level of polish is an expected and appropriate register regardless of how the original speaker actually delivered it, and a dubbed executive statement that faithfully reproduces every verbal hesitation from an unscripted original can read as a strange and unintended choice rather than as an authentic representation of anything the audience actually values.

**Content where the original recording itself will likely be lightly edited for disfluencies regardless of language**, since many content teams already clean up filler words and false starts in their own-language edit as standard production practice, and applying the equivalent cleanup consistently in every dubbed language is simply extending an editorial standard the content already follows in its original form.

[![Editing suite with monitors and console](https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Where Keeping Some Disfluency Matters

**Documentary and interview content, where the manner of speaking is itself part of what the content is documenting**, and a subject's hesitation, a pause before answering a difficult question, or a visible moment of uncertainty carries genuine informational and emotional content that a fully smoothed-over dub actively removes — the disfluency is not noise around the signal in this content type, it is frequently part of the signal itself.

**Content specifically valued by its audience for authenticity and unscripted, conversational feel** — much creator and influencer content, casual long-form conversation formats, reaction and commentary content — where the entire appeal to the audience is precisely the unpolished, spontaneous quality of the delivery, and a fully cleaned-up dub can feel disconnected from what audiences of this specific content type are actually there for, even if the words themselves are translated with perfect accuracy.

**Testimony, legal, and journalistic contexts where faithful representation of exactly how something was said, not only what was said, carries genuine evidentiary or ethical weight**, and smoothing disfluencies in these specific contexts risks being perceived as, or actually functioning as, an editorial alteration of the record rather than a neutral translation of it — this is a case where the disfluency-preservation decision has real ethical and potentially legal stakes beyond ordinary content quality preference.

**Content where a speaker's characteristic speech pattern, including their particular disfluencies, is part of their recognisable personal or brand identity to their existing audience**, and removing it in dubbed versions specifically, while leaving it intact in the original, produces an odd asymmetry where the international audience receives a subtly different and less authentic version of the same person than the original-language audience does.

## The Middle Ground: Selective Rather Than Binary

**Most experienced practice in this area is not a binary keep-everything or remove-everything choice, but a selective one**, removing disfluencies that add nothing and genuinely impede clarity — most filler words like "um" and "uh" fall cleanly into this category in almost any content type — while preserving disfluencies that carry genuine meaning or characteristic personality, such as a meaningful pause before a difficult answer or a speaker's genuinely characteristic verbal habit that their audience already recognises and associates with them.

**Meaningful pauses are worth preserving as pauses, even where the specific filler words around them are cleaned up**, since the pause itself — the silence before a considered answer — often carries the actual emotional or rhetorical weight, independent of whether the specific "um" that happened to fill it in the original recording is retained in the dubbed audio or not.

**False starts and self-corrections sometimes carry genuine meaning worth preserving, and sometimes do not**, and this is a judgement call best made per instance by someone reviewing the actual content and its likely audience impact, rather than resolved by a single blanket rule applied uniformly regardless of content — a false start that reveals a speaker changing their mind mid-sentence about how to phrase something sensitive is different from a false start that is simply a mechanical stumble with no content of its own.

**This selective approach requires a deliberate decision made at the project or content-type level, documented as an explicit brief for whoever is doing the translation and voice direction work**, rather than left to be decided inconsistently, instance by instance, by whoever happens to be doing the work on a given day without any stated policy to work from.

[![Person editing audio at a workstation](https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Technical Implementation

**Most transcription systems, by default, either fully retain or fully strip disfluencies depending on the transcription mode selected**, and it is worth checking specifically which mode your pipeline uses and whether you have deliberately chosen it, rather than accepting whatever the default happens to be without having actually made the choice consciously for your specific content.

**A "clean" or "smart" transcription mode, common in many transcription systems, automatically removes filler words and normalises false starts into a readable, edited-feeling transcript**, which is the right choice for content where disfluency removal is the correct default policy, but is the wrong default for content where preserving some disfluency actually matters, and using it uniformly regardless of content type applies the wrong policy to at least some real content.

**A "verbatim" transcription mode retains disfluencies, false starts, and repeated words exactly as spoken**, which gives you the option to selectively remove specific instances during script preparation for dubbing, rather than having them already irreversibly stripped before you ever get a chance to make a deliberate choice about which ones to keep.

**For voice generation specifically, natural-sounding breath and pause insertion by the synthesis system, independent of whether the source disfluencies themselves are retained, is a genuinely separate and valuable consideration** — even a fully cleaned dub script benefits from natural breath placement in the generated voice, since a complete absence of any breath sound at all reads as noticeably artificial in a way that has nothing to do with whether the original speaker's specific verbal fillers were preserved or removed.

**Where disfluencies are deliberately preserved in the translated script, they need to be translated or represented appropriately for the target language, not simply carried over as the same filler sound**, since filler words are genuinely language-specific — English "um" is not the natural filler sound in Spanish, Japanese, or Arabic, each of which has its own characteristic hesitation sounds — and a dub that inserts an English-sounding filler into otherwise fluent target-language speech produces an odd, foreign-sounding artefact rather than an authentic equivalent disfluency.

## Deciding the Policy for Your Content

**Make this decision explicitly per content type or per project, and document it as part of the translation and voice direction brief**, rather than leaving it as an unstated default that whoever happens to be doing the work resolves inconsistently based on their own individual judgement without any stated guidance to work from.

**Ask what the disfluency is actually doing in this specific piece of content** — is it noise that a viewer would not miss and that genuinely impedes clarity, or is it doing real work, conveying hesitation, authenticity, emotional weight, or characteristic personality that the audience would actually notice the absence of if it were removed — and let the answer to that specific question, rather than a general policy applied uniformly, guide the actual decision for that content.

**Test both approaches with actual target-language reviewers on representative content where the answer is genuinely unclear**, since this is ultimately a judgement call about audience perception that benefits from a real reaction from someone who is not the person who made the original editorial decision, rather than something to resolve purely through internal deliberation without any actual audience-side signal.

## A Working Checklist

- Decide disfluency handling explicitly per content type rather than accepting whatever a transcription tool defaults to.
- Remove filler words and false starts by default for scripted, instructional, and formal corporate content.
- Preserve meaningful disfluency for documentary, interview, testimony, and authenticity-driven creator content.
- Treat testimony, legal, and journalistic contexts as carrying real ethical and evidentiary stakes around disfluency preservation.
- Preserve meaningful pauses as pauses even where the specific filler word around them is cleaned up.
- Judge false starts and self-corrections per instance rather than with one blanket rule.
- Document the disfluency policy explicitly in the translation and voice direction brief for the project.
- Use verbatim transcription mode where selective disfluency preservation may be needed, rather than smart mode that strips them irreversibly upfront.
- Translate or represent preserved disfluencies with target-language-appropriate filler sounds, not literal source-language fillers.
- Ensure generated voice includes natural breath and pause placement regardless of the source disfluency policy chosen.
- Test genuinely unclear cases with actual target-language reviewers rather than resolving them by internal judgement alone.

## Frequently Asked Questions

**Should dubbed audio remove all the ums and uhs from the original?**

Depends entirely on content type, and applying one default uniformly across everything is the actual mistake, not either choice on its own. Removing them is correct for scripted narration, instructional content, and formal corporate communication, where disfluency adds no value and detracts from clarity. Preserving some is correct for documentary, interview, and authenticity-driven creator content, where hesitation and unscripted delivery can carry genuine meaning that a fully polished dub removes along with the filler words.

**Does removing disfluencies count as changing what someone said?**

For ordinary content, generally not in a way that matters — most audiences and most content types treat filler word removal as reasonable cleanup, similar to trimming a stumble in an edit. For testimony, legal, and journalistic contexts specifically, this changes, and faithful representation of exactly how something was said can carry real evidentiary or ethical weight, making disfluency removal a genuinely different and more consequential decision than in ordinary commercial or creative content.

**Can I keep the pause without keeping the specific filler word?**

Yes, and this is a common and reasonable middle ground. A meaningful pause before a considered answer often carries the actual emotional or rhetorical weight independent of whether the specific "um" that filled it in the original recording is retained in the dubbed audio, so cleaning up the filler word while preserving the pause length itself is a legitimate selective approach rather than an all-or-nothing choice.

**Should preserved disfluencies use the same filler sound as the original language?**

No. Filler words are language-specific — English "um" is not the natural hesitation sound in Spanish, Japanese, or Arabic, each of which has its own characteristic filler sounds — and inserting an English-sounding filler into otherwise fluent target-language speech produces an odd, foreign artefact rather than an authentic equivalent. Where disfluency is deliberately preserved, it should be translated or represented using the target language's own natural hesitation sounds.

**Which transcription mode should I use if I want to decide disfluency handling later rather than upfront?**

Verbatim transcription mode, which retains filler words, false starts, and repeated words exactly as spoken, giving you the option to selectively clean up specific instances during script preparation. A "smart" or "clean" transcription mode strips disfluencies automatically and irreversibly before you ever get the chance to make a deliberate, content-specific choice about which ones might actually be worth keeping.

**Does a fully cleaned-up dub sound artificial even without any of the original disfluencies?**

It can, if the synthesis itself does not insert natural breath and pause placement, which is a separate consideration from whether the source disfluencies were preserved. Even a fully cleaned dub script benefits from natural-sounding breath in the generated voice, since a complete absence of any breath sound at all reads as noticeably artificial regardless of what happened to the original speaker's specific verbal filler words during script preparation.

---

Related reading: [Emotion and Prosody in AI Voice](/blog/emotion-and-prosody-in-ai-voice) | [Video Dubbing Voice Direction](/blog/video-dubbing-voice-direction) | [Voice Consistency Across Episodes](/blog/voice-consistency-across-episodes)
