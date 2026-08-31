---
{
  "title": "SDH Captions Explained: What Sound Description Actually Adds",
  "slug": "sdh-captions-explained",
  "category": "Accessibility",
  "primaryKeyword": "SDH captions",
  "metaDescription": "What SDH captions are, how they differ from ordinary subtitles, and how to produce them correctly across languages without doubling review effort.",
  "excerpt": "SDH is not subtitles with a few sound effects bolted on. It is a different deliverable with a different reader in mind.",
  "publishedAt": "2026-08-27T09:00:00Z",
  "updatedAt": "2026-08-27T09:00:00Z",
  "heroImage": "/assets/blog/images/floating-caption-blocks.png",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

[![Close-up of an audio mixing desk](https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## The Distinction Most Teams Get Wrong

SDH stands for Subtitles for the Deaf and Hard of Hearing. The acronym is unhelpful, because it suggests a variant of subtitles rather than what it actually is: a text track built on the assumption that the viewer receives no information from the audio at all.

Ordinary same-language subtitles assume the viewer can hear. They exist for people watching in a noisy room, in a language they are still learning, or with the sound off on a train. Those viewers can hear the doorbell, register the tension in a voice, and tell which of two people on screen is speaking. Subtitles only need to carry the words.

SDH assumes none of that. If the doorbell matters to the story, SDH says so. If the character's voice is shaking, SDH may say so. If the speaker is off screen, SDH identifies them.

The distinction matters commercially because platforms, broadcasters, and procurement teams increasingly ask for SDH specifically, and a supplier who delivers ordinary subtitles relabelled as SDH is delivering the wrong asset. It matters practically because SDH costs more to produce and review, and budgeting it as subtitles produces a shortfall on every job.

## SDH Versus Closed Captions

There is a third term in circulation and the overlap causes confusion.

**Closed captions** in the North American broadcast tradition are a technical format — CEA-608 and CEA-708 — carried inside the video signal or stream, styled and positioned by the caption authoring, and toggled by the player. They were designed for deaf and hard-of-hearing viewers from the beginning, so they include sound description by default.

**SDH** emerged from the DVD and home video world, where the broadcast caption formats were not available. It is delivered as a subtitle track — the same technical container as any other subtitle — but carries caption-style content.

**Ordinary subtitles** are a subtitle track carrying dialogue only.

In practice, the terms have blurred. Streaming platforms often label their accessible track "English [CC]" while delivering something technically identical to SDH. The useful mental model is: closed captions and SDH differ in delivery format and styling capability; SDH and ordinary subtitles differ in content.

For a localization programme, the content distinction is the one that drives cost and workflow. The format distinction is a delivery detail settled by the platform's specification.

## What Goes Into an SDH Track

Four categories of information beyond dialogue.

**Speaker identification.** When the speaker is not visible, or when several people are speaking and the visual does not make attribution obvious, the track names who is speaking. Conventions vary: a name in square brackets, a name followed by a colon, or coloured text where the format supports it. Pick one convention and hold it across the whole catalogue.

**Non-speech sounds that carry meaning.** A phone ringing, a door slamming, a gunshot, a car approaching, music starting. The test is narrative relevance, not audibility. A room with ambient traffic noise throughout does not need captioning every few seconds; a single car horn that makes a character turn around does.

**Manner of speech where it changes meaning.** Whispering, shouting, sarcasm carried entirely by tone, a voice on the other end of a phone line, speech in a language the audience is not expected to understand. These are descriptions, not transcriptions, and they should be used sparingly. Over-annotation is a real failure mode.

**Music.** Whether music is playing, what kind, and — where lyrics matter and rights permit — the lyrics themselves. A music note symbol is the common convention for instrumental passages.

What does not go in: everything else. SDH is not an audio description track. It does not narrate what is visible on screen. A viewer who is deaf can see the screen; describing the visual is redundant and pushes real information off the display.

## The Over-Annotation Problem

The most common quality failure in SDH is not missing information. It is too much of it.

An inexperienced captioner, told to describe non-speech audio, describes all of it. The result is a track that flickers with `[wind blowing]`, `[footsteps]`, `[background chatter]`, `[door creaks]` between every line of dialogue, consuming reading time that the viewer needs for the words that actually matter.

Reading speed is a hard constraint. A viewer reads at a finite rate, and every character of sound description competes with dialogue for that budget. When a scene is dialogue-dense, sound description should thin out to near nothing. When a scene is silent and something audible happens, description carries the whole scene.

The discipline is editorial: ask what the hearing viewer learns from this sound that they could not learn from the picture. If the answer is nothing, leave it out.

[![Person watching video on a laptop](https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## SDH Across Languages

This is where SDH stops being a single deliverable and becomes a matrix.

A Spanish viewer who is deaf needs Spanish SDH, not Spanish subtitles. Producing that means translating the sound descriptions as well as the dialogue, and sound description does not translate mechanically.

**Conventions differ by market.** Bracket styles, whether speaker names are capitalised, how music is marked, and whether manner-of-speech annotations are common at all vary between territories. Broadcasters in some markets publish detailed caption style guides; others have de facto norms carried by the captioning community.

**Sound words are language-specific.** Onomatopoeia does not carry across languages, and a description that reads naturally in English can read as childish or absurd translated literally. `[Thud]` is a description in English; its literal equivalent may be a comic-book noise elsewhere. Describing the event rather than imitating the sound translates more reliably.

**Reading speed limits differ.** Text expansion means a Spanish or German rendering of the same sound description runs longer than the English, and a track that was already at its reading-speed ceiling in English will breach it in translation. Sound descriptions are usually the first thing to cut when this happens, which is the correct instinct as long as the cut is deliberate.

**The dialogue and the description should be revised together.** Splitting the work — translating the dialogue with an automated pipeline and hand-writing the descriptions — produces tracks with two voices in them. Keep the whole track in one reviewer's hands.

The practical approach for a multilingual catalogue is to produce a clean, correctly annotated source-language SDH track first, treat it as the master, and derive every other language from it. The annotation decisions — what to describe, what to leave out — are made once and inherited. Only the wording is redone.

## Production Workflow

A workable sequence for a catalogue rather than a single asset.

**Start from a verified transcript.** The dialogue must be correct before anything is annotated. Automated transcription gets close on clean audio and needs review on anything with overlap, accents, or noise.

**Add speaker labels from diarization.** Automatic speaker separation identifies who spoke when. Mapping those anonymous speaker turns to actual names is a short manual step, and once mapped, speaker identification through the whole asset is mechanical.

**Annotate non-speech audio in one deliberate pass.** Watch the asset with the sound on and the picture visible, and mark the moments where the audio carries something the picture does not. This is the step that cannot be automated well, and it is short — most assets have far fewer genuinely meaningful non-speech events than people expect.

**Check reading speed with annotations included.** Run the full track against your reading-speed limit and resolve breaches by shortening or cutting descriptions before shortening dialogue.

**Translate from the annotated master.** Each target language inherits the annotation decisions and gets its own wording and its own reading-speed pass.

**Verify format compliance last.** Bracket conventions, character limits per line, line counts, and positioning are platform requirements. Validate against the target platform's specification rather than assuming a generic SRT is acceptable.

## Formats and Delivery

SDH is delivered in ordinary subtitle containers, most often SRT, WebVTT, or TTML depending on the platform.

**SRT** is universal and carries no styling. Speaker identification and sound description are plain text inside the caption body. It is the lowest common denominator and works everywhere.

**WebVTT** is the web standard and supports positioning and basic styling, which allows a caption to be moved off burned-in on-screen text and allows speaker colour coding where a house style calls for it.

**TTML and its broadcast profiles** carry full styling and positioning and are what most broadcast and premium streaming specifications require.

**Burned-in SDH** — rendered permanently into the picture — should be avoided for accessibility tracks. A viewer who needs SDH cannot turn it off if it is wrong, and a viewer who does not need it cannot turn it off at all.

The practical guidance is to author once in the richest format your workflow supports and derive the simpler formats from it. Deriving a rich format from a plain SRT means reinstating positioning decisions by hand.

[![Recording studio microphone and headphones](https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## A Working Checklist

- Confirm which deliverable is actually being requested — SDH, closed captions, or ordinary subtitles — before quoting or scheduling.
- Verify the dialogue transcript is correct before annotating anything.
- Identify speakers whenever the speaker is off screen or attribution is visually ambiguous.
- Annotate non-speech audio only where it carries information the picture does not.
- Keep manner-of-speech annotations rare and reserved for cases where tone changes meaning.
- Mark music presence and include lyrics where they matter and rights permit.
- Never describe what is visible on screen — that is audio description, a different track.
- Check reading speed with annotations included, and cut descriptions rather than dialogue when over.
- Build a source-language annotated master and derive every other language from it.
- Translate descriptions as events rather than as onomatopoeia.
- Validate bracket conventions, line length, and line count against the target platform's specification.
- Deliver SDH as a toggleable track, not burned into the picture.

## Frequently Asked Questions

**Is SDH the same as closed captions?**

Not exactly, though the content overlap is nearly complete. Closed captions are a broadcast delivery format — CEA-608 and CEA-708 — carried inside the video signal. SDH is caption-style content delivered in an ordinary subtitle container such as SRT or TTML. Both include speaker identification and non-speech sound description. Which one you deliver is usually determined by the platform specification rather than by editorial choice.

**Can SDH be generated automatically?**

The dialogue and speaker separation can be. Automatic transcription plus diarization produces a correctly attributed dialogue track with very little manual work on clean audio. The non-speech annotation is the part that still needs a person, because deciding which sounds carry narrative information is an editorial judgement about the specific asset rather than a detection problem. That pass is short — most assets have fewer meaningful non-speech events than teams expect.

**Do I need SDH in every language I dub into?**

If you are meeting accessibility obligations in those markets, yes. A deaf viewer in a Spanish-speaking market gets nothing from Spanish audio, and English SDH does not serve them. Localized audio without localized accessible captions leaves the accessibility gap exactly where it was. The cost is manageable if the annotated source-language track is treated as a master that other languages inherit.

**How much extra does SDH cost compared with subtitles?**

The dialogue portion costs the same. The additional cost is the annotation pass and the extra review time, which in practice runs a modest premium over plain subtitles for dialogue-heavy content and a larger one for content with significant non-speech audio — drama, documentary, anything with a score. Budgeting SDH at subtitle rates produces a shortfall on every job.

**Should sound descriptions be translated or rewritten?**

Rewritten within the annotation decisions already made. The choice of which sounds to describe should be inherited from the source-language master so the whole catalogue is consistent. The wording should be produced natively in the target language, because sound description conventions and vocabulary differ by market and literal translation of onomatopoeia reads badly almost everywhere.

**What is the most common SDH quality problem?**

Over-annotation. Captioners told to describe non-speech audio often describe all of it, producing tracks that consume the viewer's reading budget with ambient detail and push dialogue past comfortable reading speed. The correcting question is whether a hearing viewer learns something from this sound that the picture does not already show.

---

Related reading: [Video Accessibility Guide](/blog/video-accessibility-guide) | [Captions vs Subtitles vs Transcripts](/blog/captions-vs-subtitles-vs-transcripts) | [Subtitle Reading Speed Guide](/blog/subtitle-reading-speed-guide)
