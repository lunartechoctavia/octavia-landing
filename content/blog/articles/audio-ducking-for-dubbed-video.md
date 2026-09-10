---
{
  "title": "Audio Ducking in Dubbing: Balancing Voice, Music, and Effects",
  "slug": "audio-ducking-for-dubbed-video",
  "category": "Technical Guides",
  "primaryKeyword": "audio ducking in dubbing",
  "metaDescription": "Learn how audio ducking in dubbing balances voice, music, and effects, with practical tips on offsets, attack, release, stems, and normalization.",
  "excerpt": "This guide explains how to rebuild the balance between dubbed dialogue, music, and effects. You will learn when a static offset beats a dynamic envelope, how attack and release shape artifacts, and what stems and normalization make possible.",
  "publishedAt": "2026-09-08T19:00:00Z",
  "updatedAt": "2026-09-08T19:00:00Z",
  "heroImage": "/assets/blog/images/congregation-light-nave.jpg",
  "heroImageAlt": "Abstract dark-glass panels with waveforms and fader lines for dubbing.",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

A dubbed episode can pass every intelligibility check and still sound wrong. The new voice is clean, the sync lands on the mouth shapes, the pronunciation is right, and yet the moment a scene opens into score, the dialogue either disappears under the strings or the music collapses to a thin pad the instant anyone speaks. Both failures come from one place: the balance between the replacement voice and the original soundscape.

The original mix was built around a performance recorded in the room, with a particular voice, microphone distance, and dynamic range, edited by someone who heard the whole scene and rode faders by hand. Replacing that performance with one recorded elsewhere, at a different level, with a narrower range invalidates the balance the mix encoded. Audio ducking in dubbing is the work of rebuilding that balance deliberately rather than inheriting it.

This guide covers when a static offset beats a dynamic envelope, how attack and release produce audible artifacts, what separated stems make possible, how to handle residual original dialogue under the new voice, how to protect a lyric that collides with speech, and how ducking interacts with normalization.

## What audio ducking in dubbing actually controls

### The three signal groups
Every dub mix resolves into three groups. Dialogue carries meaning. Music carries emotion and pacing. Effects carry the physical reality of the scene, from doors and footsteps to room tone. Ducking is a level relationship between groups, almost always music and effects reduced under dialogue. It is the coarse balance that keeps words intelligible without gutting the score.

### Why a dubbed voice does not sit like an original one
Original dialogue was tracked against a score written to picture, and the mixer could ride individual words, breathe the music into pauses, and let a cue bloom the moment a line ended. A dubbed voice arrives as a finished performance, usually compressed and narrow in dynamic range, cut to length. Talent delivering hundreds of lines in a session holds a steady level, and a voice produced by a [speech generation](/features/speech-generation) system holds it even more tightly, so the variation the original mix depended on is missing. Meanwhile the music and effects stem is fixed: no alternate take, no composer available to thin a string section under a dense line. That pressure lands entirely on level control.

### Ducking, EQ carving, and sidechain compression are separate tools
Gain reduction lowers the whole music and effects bus. Narrow-band carving opens a pocket around 1 to 4 kHz so the voice has room without the music dropping overall. Sidechain compression is the mechanism that makes dynamic ducking automatic. A durable dub uses all three in moderation. Deep gain reduction alone makes the score feel absent. Deep carving alone makes it hollow and phase-smeared. A few dB of ducking plus a gentle wide carve usually beats either extreme.

## Static ducking versus dynamic, envelope-following ducking

### Static ducking
A static duck applies a fixed offset: music and effects down 3 dB for a dialogue scene, or down 6 dB whenever any dialogue is present. The cost is musical. During pauses the score stays suppressed at the moment it should carry the scene, and over an episode the soundtrack flattens, so action beats, comedic timing, and emotional swells all arrive at the same reduced level.

### Dynamic ducking
Dynamic ducking follows the dialogue's actual level. The dialogue bus feeds a sidechain input, and gain reduction on the music and effects bus rises and falls with it. A quiet line ducks less than a shouted one, and a pause lets the music return. Executed well, it is invisible; executed poorly, it becomes the most audible element in the mix.

### Hybrid approaches
Most professional dubs sit between the extremes. A common pattern is a scene-level static offset as the baseline plus a small dynamic range on top: a 2 dB static reduction with a dynamic stage adding up to 3 dB more on loud lines. When a deliverable is built by [converting subtitle timing into speech](/features/subtitle-to-audio), cue boundaries are known before the mix starts and often make more stable sidechain triggers than the waveform itself.

## Attack and release timing, and the artifacts of getting them wrong

### Attack
Attack is how quickly gain reduction engages once dialogue crosses the threshold. Set too fast, the music's transient gets clipped mid-note and produces a click or a suck that reads as a technical fault. Set too slow, the first syllable or two of each line sits under the music. That swallowed opening consonant is the most common viewer complaint, and it is nearly always an attack setting rather than a level problem. A reasonable starting range is 5 to 20 milliseconds, faster for dense rapid dialogue, slower for sparse lines over sustained music.

### Release and hold
Release is how quickly the music returns once dialogue drops below threshold. Too fast, and the music pumps back up at every comma and breath, a breathing effect that becomes fatiguing over an hour-long program. Too slow, and the music stays suppressed through a pause written to land, or bleeds into a music-only moment that should have been untouched. Releases between 150 and 400 milliseconds are a fair starting point, though hold time solves intra-line pumping more cleanly, because it delays the return between lines without smearing the moment the music is supposed to come back.

### Depth, threshold, and hysteresis
Three settings decide how much ducking happens and how stable it is.
- Threshold sets the dialogue level at which ducking engages.
- Depth, or range, sets the maximum reduction applied.
- Hysteresis raises the disengage threshold above the engage threshold so gain does not chatter around a steady voice.

Without hysteresis, a voice sitting near the threshold produces a faint flutter that is easy to miss in a loud studio and obvious on headphones.

## Stems versus a mixed track: what becomes possible

### Working from separated dialogue, music, and effects
Separated stems are the difference between solving the problem and negotiating with it. With clean music and effects, the original dialogue can be removed entirely and the new performance placed against an untouched score. Ducking then operates on material containing no competing speech, which permits shallower depth and fewer artifacts. Separation also makes speaker diarization useful, because individual speakers can be treated independently instead of as one undifferentiated bus. This is the standard arrangement when material passes through a full [video dubbing](/features/video-dubbing) workflow rather than being assembled by hand.

### When only a mixed track exists
If the only source is a finished stereo or 5.1 mix, the options narrow sharply. Center-channel extraction helps only when dialogue was mixed to center. Spectral subtraction leaves smearing artifacts worse than the bleed it removes. Notch filtering around the original voice's fundamentals damages the music permanently. In that situation, accept a shallower duck, place the new voice slightly lower relative to the music than you otherwise would, document the compromise, and request stems for the next title.

### Stem hygiene before mixing
Verify the stems before building anything.
- Confirm sample-accurate alignment between dialogue and music and effects. A few milliseconds of offset smears stereo imaging and confuses sidechain timing.
- Check polarity.
- Solo the music and effects and confirm they contain no intelligible speech.
- Confirm consistent stem lengths so nothing drops out mid-scene.

## Residual original dialogue under the new voice

### Where bleed comes from
Bleed is any audible trace of the original performance surviving under the new one. It arrives from three places: imperfect separation leaving a ghost of the original voice in the effects stem, a dub laid directly over a mixed track, and untranslated material such as crowd walla, a television playing in the background, or a public address announcement where the original language is kept deliberately. That last category is a creative decision, but it still needs to sit below the new dialogue so viewers do not try to parse it.

### How to catch it
Solo the music and effects bus and listen through every dialogue section louder than you would normally monitor. An intelligible word in the source language will be audible there. A second pass at reduced playback speed makes short fragments stand out. A third check is language-based: if you do not speak the source language, have someone who does listen to the effects stem alone and flag anything they understand. Bleed is easy to miss when you are fluent in the language you are monitoring, because the new performance holds your attention.

### Treatment
Minor bleed can be handled with a narrow automated EQ cut or a short gain dip covering only the bleed duration, far less destructive than filtering an entire stem. Severe bleed usually warrants replacement: rebuild the effect from a library, or mute the region and let dialogue and score cover the gap. Where the bleed comes from an unseparated mixed track, there is no repair, only a request for better source material.

## Preserving music intent when a lyric collides with dialogue

### Lyrics under dialogue
When songs are not translated, the vocal sits inside the music and effects stem and gets ducked with everything else. That is usually correct, but a lyric line can vanish under a dialogue line. If the production intends the lyric to stay legible, reduce duck depth for that passage and absorb the intelligibility loss elsewhere, or move the dub line into a gap in the phrase. These are editorial calls, and they belong in a conversation with the director rather than in a surprise during final QC.

### Lyrics that have been translated
If a song's lyric was carried into the target language by an [audio translation](/features/audio-translation) pass and rerecorded, it stops behaving like music and starts behaving like dialogue. Give it its own ducking treatment against the score rather than burying it in the music stem, or the translated vocal will fight both the score and the spoken lines around it.

### Musical moments that must not be ducked
Some moments carry a scene: a needle drop reveal, a solo entrance, a button ending that lands the joke. The levers are timing and level, and timing is better. If a line can be nudged into the preceding or following rest without breaking lip sync, do that instead of suppressing the cue. Where timing is immovable, automate the duck depth down by hand rather than through the sidechain, so the rest of the scene keeps its envelope. Ask for a cue sheet before mixing; knowing where cues start and end converts guesswork into a short schedule of planned exceptions.

## Loudness targets and how ducking interacts with normalization

### The order of operations
Duck first, then normalize. Normalization applies program-level gain, so if it runs first, later ducking moves the program off target. Linear gain applied afterward preserves the relationship between dialogue and music. The complication is a limiter. If the normalization stage limits rather than applies pure gain, loud moments, usually dialogue over music, are controlled differently from quiet ones and the ducking balance shifts unpredictably. Check whether the delivery specification permits a limiter or requires gain-only normalization.

### Why deep ducking partly undoes itself
Ducking removes energy from the program. Deeper ducking produces a lower integrated loudness reading, which forces more makeup gain at normalization to reach the target. That gain raises dialogue along with everything else, and the music ends up closer to its original relationship with speech than the duck depth implied. Set depth by ear and measure short-term loudness in dialogue-dense scenes instead of trusting the program figure alone.

### Integrated, short-term, and true peak
Integrated loudness describes the whole program. Short-term loudness describes a few seconds and is the better instrument for judging whether one scene's dialogue-to-music relationship works. True peak matters because lossy codecs can push peaks above the sample ceiling during encoding, so a dub that measures at target but clips after encoding usually has a true-peak problem rather than a loudness one. Measure all three, and measure the encoded deliverable rather than only the session.

## Checking the mix on phone speakers, headphones, and television

### Phone speakers
A phone driver reproduces almost no low end and emphasizes the band where dialogue lives. Ducking that sounds restrained in the studio can sound heavy there, because the reduced music has nothing left to fill the spectrum. Check at least one dialogue-dense scene on a phone at moderate volume.

### Headphones
Headphones reveal what studio monitors forgive.
- Release pumping and threshold chatter
- Clicks at attack
- Bleed fragments
- Level jumps between lines

They are the best tool for finding artifacts and the worst for judging whether a scene feels balanced in a room, so use them diagnostically rather than for final approval.

### Television and soundbars
Television playback often applies its own dynamic range compression and dialogue enhancement. That processing masks small problems and exaggerates large ones, particularly deep ducking that leaves the music thin once the set's own compression has reduced it further. Test with dialogue enhancement enabled, because a meaningful share of the audience will leave it on.

### Print a reference and check the translation
Export a stereo reference at final loudness and listen to the entire program in order without stopping. Then have a native speaker of the target language review that reference for intelligibility and for any passage where the new performance feels buried or exposed.

## A repeatable mix checklist for a dubbing pipeline

1. Confirm deliverables before opening the session: target language, loudness target, true-peak ceiling, channel format, and whether stems or a mixed track will be supplied.
2. Audit source stems for alignment, polarity, length, and a speech-free music and effects check.
3. Confirm the dub conforms to picture, including lines deliberately left in the source language.
4. Solo the music and effects and log every timestamp where source-language words are intelligible.
5. Choose a ducking architecture per scene type, static, dynamic, or hybrid, and write it down so the approach stays consistent across the episode.
6. Set a baseline static offset per scene type, then add dynamic range on top.
7. Tune attack, release, hold, threshold, depth, and hysteresis per scene rather than per line.
8. Carve a gentle wide EQ pocket around 1 to 4 kHz if the voice still fights the music after level control.
9. Automate exceptions by hand: musical moments, translated lyrics, and bleed repairs.
10. Measure short-term loudness in dialogue-dense scenes before running program normalization.
11. Normalize to target, then verify true peak on the encoded deliverable rather than the session.
12. Review the full program on phone, headphones, and television, with a native-speaker intelligibility pass.

Where a step runs through automation rather than a person, keep it as an explicit gate with logged output, so a scene that fails becomes visible instead of silent. The platform [documentation](/docs) covers how those stages map onto programmatic workflows.

## Frequently asked questions

### How much ducking is too much?
When the music becomes noticeably absent rather than supportive, the depth is excessive. Mute the dialogue for a few seconds and ask whether the score still sounds like a score. If it sounds thin or hollow, reduce depth and lean on EQ carving instead.

### Should ducking happen before or after normalization?
Before. Normalization applies program-level gain, and running it first means later ducking moves the program off target. Ducking first also lets you hear the mix at a realistic level while making decisions.

### Why does the music sound like it is breathing?
Release is set too fast, or hold time is too short, so gain returns between words rather than between lines. Increase hold first, then lengthen release if the problem persists.

### Can a dub be ducked if only a finished mix exists?
Technically yes, but the available tools damage the music. Expect to accept a shallower duck and a slightly lower dialogue level, and request separated stems for subsequent titles.

### Does ducking change the loudness measurement?
Yes. Because ducking removes energy, deeper ducking lowers the integrated loudness reading and increases the makeup gain required at normalization, which pushes the music back toward its original relationship with speech.

### How do you find original dialogue left under the new voice?
Solo the music and effects bus, monitor louder than usual, and listen through every dialogue section, ideally with a native speaker of the source language involved. Short fragments surface more easily at reduced playback speed.

### Is static ducking ever the better choice?
Yes, in short-form content, heavily compressed deliverables, or scenes where music is nearly continuous. It is predictable and artifact-free, which matters more than musical shape when there is no room for the score to breathe anyway.

## Conclusion

Ducking is not a single setting. It is a per-scene decision about how much of the original soundscape the new voice is allowed to displace, and the answer changes with the music, the pace of dialogue, and the deliverable. The mixers who get it right are not using better plugins; they are deciding deliberately, documenting the decision, and measuring the result on more than one playback system.

A practical next step is to fix the architecture before the next title. Choose a default ducking approach per scene type, define the attack, release, hold, and hysteresis ranges that go with each, and put the checklist above into the pipeline as a set of gates. That converts a subjective balance problem into a repeatable one and makes exceptions visible while they are still cheap to fix.

Where a title's source audio cannot support the result the deliverable requires, [raise it with the team](/contact) before the mix is signed off rather than rebuilding after delivery, and treat the mix as finished only when a native speaker has heard it on a phone.
