---
{
  "title": "360 Video Localization: Subtitles and Audio for Immersive Content",
  "slug": "vr-360-video-localization",
  "category": "Technical Guides",
  "primaryKeyword": "360 video localization",
  "metaDescription": "360 video localization must rethink subtitles and spatial audio for immersive viewers, from head-locked placement to off-screen dialogue cues.",
  "excerpt": "This guide explains why flat subtitle placement fails on a 360 sphere, how head-locked and world-locked captions trade off, and how to cue viewers toward off-view speakers. It also covers rebuilding spatial audio and managing metadata across immersive delivery formats.",
  "publishedAt": "2026-09-05T16:30:00Z",
  "updatedAt": "2026-09-05T16:30:00Z",
  "heroImage": "/assets/blog/images/aligned-glass-pillars.png",
  "heroImageAlt": "Abstract dark-glass sphere with glowing subtitle panels and spatial audio waves.",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

In a headset, the frame is not the picture. A 360 video renders a sphere around the viewer, and the viewer decides which part of it is on screen by turning their head. Every subtitle convention inherited from flat video assumes the opposite: a fixed rectangle, a known bottom third, and a gaze already pointed at the action. 360 video localization has to solve for a viewport that no one in the edit suite controls.

Centering the problem on text placement undersells it. Dialogue arriving from behind the viewer has to be findable without forcing a turn. Ambisonic beds and spatialized object audio carry the room and the direction of every voice, so replacing one language of dialogue means rebuilding that spatial picture rather than swapping a track. Head motion adds a comfort dimension flat captioning never had to consider, and the delivery formats are less settled than broadcast or streaming, so metadata tends to disappear between the creative tool, the localization pass, and the player.

This guide covers why flat placement fails on a sphere, how head-locked and world-locked subtitles trade off, how to cue a viewer toward an off-view speaker, what happens to spatial audio when dialogue is replaced, which files and metadata must survive the round trip, and how to test in the headset rather than on a monitor. It closes with a first project scoped small enough to finish.

## Why flat subtitle placement fails in 360 video localization

### The rectangle no longer exists

Flat subtitle design rests on assumptions a sphere breaks. There is a fixed frame, so there is a known safe area, and the viewer's gaze sits broadly inside it, putting text near the bottom center close to where attention already is. Screen size is known, so type size maps to a predictable visual angle.

None of that holds in a 360 player. The screen is a window the viewer moves with their neck. Head-locked captions hold a constant visual angle but ignore what the scene is doing. Captions anchored in the scene have an apparent size that depends on distance, so the same cue can be legible from four meters and unreadable from twenty.

### The gaze is not where the director put it

A 360 shot has no enforced framing; the director's composition is a suggestion. A viewer may be examining a doorway behind them while the only line of dialogue comes from someone to their left. Bottom-center captions are bottom-center of the current view, which may have no relationship to the speaker. On flat video, a caption that misses its subject is a stylistic problem. In a headset it is a comprehension problem.

### Failure modes that appear only in the headset

- Text clipped by the viewport edge during head rotation, because the caption sat outside the comfortable central band.
- Stereo disparity errors from captions rendered per eye without correct separation, producing double images or eye strain.
- Vergence and accommodation mismatch when text renders at a depth far from the focal plane, which reads as blur or fatigue rather than as an obvious defect.
- Text anchored in the scene drifting across the retina while the viewer turns, which is hard to read and can trigger an involuntary head chase.
- Captions bound to a speaker who leaves the view, so the text vanishes or hangs in empty space.

## Head-locked versus world-locked subtitle placement

### Head-locked captions

Text is parented to the camera, holding the same angular position and size wherever the viewer looks, which makes it the easiest thing to read. Most early 360 players shipped this behavior, and it remains the reliable fallback. Its cost is presence: a fixed overlay is a flat rectangle inside a spherical world, occluding the scene where it sits.

### World-locked and spatially anchored captions

Text is placed at a coordinate in the scene, either on the sphere for three-degrees-of-freedom playback or in the room for tracked six-degrees-of-freedom playback. It sits near the speaker, rotates with the camera, and behaves like an object. This preserves the sense of space but imports three problems: angular size varies with distance, the caption is invisible when the viewer faces away, and in tracked playback the anchor has to follow the subject or the text swims against the picture.

### Hybrid placement and the comfort trade-offs

Most shipping work lands on a hybrid. A caption panel is anchored near the speaker but clamped so it never falls below a minimum angular size or rises above a maximum. When the viewer turns away, it either fades to a peripheral indicator or migrates to a head-locked position at reduced prominence.

The governing comfort rule is that text should not move across the retina while it is being read. Movement before and after a cue is tolerable; movement during reading is not. That rule usually decides the design: head-locked placement suits dense dialogue, anchored placement suits sparse dialogue in a scene the viewer already watches.

## Directing attention to an off-view speaker

### The cue hierarchy

Spatial audio is the strongest cue and the cheapest to produce. A voice placed behind the viewer prompts a turn without any visual element, provided the mix preserves direction and the headset renders it faithfully. Visual cues should support audio rather than replace it, because a viewer using captions without sound has no equivalent signal. When a visual cue is needed, prefer one already in the scene: a character glancing toward the off-view speaker, or the speaker entering the frame edge. Arrows and edge indicators are the last resort.

### Rules for non-diegetic overlays

Keep indicators small in visual angle, low in contrast, and near the periphery of the current view rather than at the center. Fade them in and out over a few hundred milliseconds; abrupt appearance reads as a flash. Remove the indicator the moment the speaker enters the central field of view, or the viewer keeps chasing a cue that no longer applies. Never require a saccade to a moving target.

### Multiple simultaneous speakers

With two or more speakers, a single bottom-center caption track becomes ambiguous. Two approaches work: a consistent label or color per speaker carried in the caption text, or a small anchor that sits at each speaker's position and moves with them. In crowded scenes, collapse overlapping lines into one and let the audio mix carry who is speaking.

## Spatial audio and what changes when dialogue is replaced

### Ambisonics, objects, and what has to be separated

Ambisonic audio encodes an entire sound field as spherical harmonic channels, commonly first order across four channels. Object audio stores each source with position metadata and lets the player render it against the headset. Either way, dialogue is part of a spatial picture, not a layer floating above it.

Replacement dialogue therefore starts with separation. Swapping a language is routine work in [audio translation](/features/audio-translation) and standard [video dubbing](/features/video-dubbing); what changes in 360 is that the replacement has a position. Isolated stems are the clean path. Without them, source separation can isolate the dialogue, but reverb and bleed remain, and the replacement sits over a ghost of the original. Re-mixing from effects and ambience is cleaner and more expensive. Music and effects rarely need translation, which is the practical argument for keeping stems intact through the localization pass.

### Placing a dubbed line in space

A replacement line must occupy the same azimuth and elevation as the original, and roughly the same distance. A dub placed at center when the original speaker was behind-left collapses the scene and forces the viewer to hunt for the source. Plan for per-line placement metadata or a spatialized render rather than a mono file dropped into the center channel.

### Voice, performance, and room matching

A dry studio recording dropped into a reverberant 360 scene is audible immediately. Match early reflections and decay with a convolution reverb built from the original space, or record the dub with matching room character. Where the original speaker is available and has authorized it, voice cloning preserves that voice across languages so both identity and spatial placement survive the language change. Where the speaker is not available, speech generation can produce one consistent replacement voice per character across an entire series.

## Reading load, comfort, and motion sickness

### Angular size, line length, and depth

Readability in a headset is a function of visual angle, not pixels. A line spanning a wide angle forces saccades across a large arc and, past a certain width, actual head movement. Flat captioning practice has long worked within roughly 32 to 42 characters per line and two lines per cue. Treat those figures as a ceiling: a headset offers no peripheral margin and no stable bottom third.

Depth matters as well. Render captions near the focal plane the headset is already using, or the eye has to converge and accommodate to two distances at once. That mismatch surfaces as fatigue after several minutes rather than as a visible defect.

### Timing against head motion

Caption duration is normally set by reading speed against a fixed screen. In 360, add the head: a caption appearing mid-turn competes with a vestibular and visual event. Hold captions longer when the camera pans, when a new speaker has just started off-view, and when the previous cue was dense. Shorten the text rather than stretching the duration.

### Placement rules that reduce discomfort

- Keep captions inside a central band roughly at eye level; the top and bottom of the field require neck strain.
- Avoid fast fades, blinking, and any pulsing element near the periphery.
- Keep one caption on screen at a time in most scenes.
- When the viewer's head is likely to be moving, use head-locked placement and accept the presence cost.
- Never let caption motion and scene motion run in opposite directions.

## Accessibility in 360 video localization

### Captions for non-speech sound

Direction is information, and in 360 it can be described rather than lost. "[footsteps approach from behind]" is more useful than "[footsteps]", and "[door closes to the left]" preserves something a hearing viewer gets for free from the spatial mix. Include direction consistently, and keep the vocabulary small so it stays readable at head-turn speed.

### Caption-only and audio-only paths

A viewer who cannot hear the audio has no way to know a voice is behind them, so visual cues carry the full load. A viewer who cannot see captions relies on spatial audio to locate speakers. Test the two paths separately, because a combined test hides failures in both. A [subtitle-to-audio pass](/features/subtitle-to-audio) adds a third path for viewers who cannot read while turning their head, and it needs its own timing review, since generated speech runs at a different pace than the text it replaces.

### The standards gap

WebVTT and SRT describe text with timing, not position on a sphere. No broadly deployed format handles spatially anchored captions, so practical work carries a flat caption track for compatibility plus position metadata the player can use when it supports it. Deliver both and document which is authoritative for each platform.

## Formats, projection, and metadata that survive a round trip

### Projection types and burned-in text

Equirectangular is the most common 360 projection. Cubemap and equi-angular cubemap variants reduce distortion at the poles. A caption burned into an equirectangular master is distorted when a platform reprojects, and it cannot be restyled for a viewer who needs larger text. Deliver captions as a separate track or sidecar and let the player composite them in screen space.

Localized captions usually begin as [subtitle translation](/features/subtitle-translation) from a locked transcript, so the transcript and the speaker labels are part of the asset set, not a convenience.

### Metadata to carry through the handoff

A localization vendor receiving "the 360 video" is missing most of what they need. The handoff should include:

- Video: projection type, stereoscopic layout, per-eye resolution, frame rate.
- Audio: channel layout, ambisonic order, channel ordering convention, and whether dialogue is a separate stem.
- Dialogue: a transcript with speaker labels, timecodes, and azimuth and elevation per line where known.
- Captions: sidecar files, position metadata, and the original-language track.
- Player assumptions: starting yaw, and whether the target platform reads a separate caption track.

Ambisonic channel ordering and normalization conventions differ between tools, and a mismatched convention produces no obvious error. It produces audio that localizes to the wrong place. Check the convention in the [documentation](/docs) for the tool that will render it, and record it in the manifest.

### The return trip

Localization should return the same asset set it received: video tracks, separated stems with dialogue replaced and ambience untouched, per-language caption files, and an updated manifest. The most common failure is a single mixed stereo file, which discards the spatial work and forces a re-upload whose speakers no longer match the picture. Write the required asset list into the contract before the first delivery.

## Testing in-headset and scoping a first project

### What monitor testing cannot tell you

A flat preview shows captions laid out correctly in a rectangle. It cannot show angular size, vergence strain, drift under head rotation, or whether a spatialized dub localizes to the right place. Every comfort and placement problem in this article is invisible on a monitor. Budget headset time as a production cost, not a final check.

### A test plan that covers the real variables

Test on the headsets your audience actually has, at minimum one wide-field model and one older, narrower one, because field of view changes how far captions sit from center. Cover legibility at the extreme yaw and pitch a viewer might reach, caption duration against the fastest camera move in the piece, speaker localization for every dubbed line, stereoscopic rendering per eye, a continuous session long enough to surface fatigue, and separate accessibility passes with captions only and audio only.

### A first project small enough to finish

For a team new to immersive localization, scope down before adding languages.

1. Choose a single scene of two to four minutes with one or two speakers and a camera that pans slowly or not at all.
2. Confirm the master has separated stems, or accept that you will re-mix rather than replace.
3. Localize one language through your ordinary [video translation](/features/video-translation) pipeline instead of building a custom one.
4. Start with head-locked single-line captions at a fixed angular size and fixed duration, then change one variable at a time.
5. Deliver captions as both a sidecar and an embedded track, and confirm which one the target platform reads.
6. Test with a handful of viewers, including one who uses captions only, and note where they look when a caption appears.
7. Turn the results into a one-page delivery spec before accepting a second language.

## Frequently asked questions

### Can 360 subtitles be burned into the video?

They can, and it is usually a mistake. Burned text is distorted by reprojection, cannot be resized by a viewer who needs larger captions, and cannot be corrected without re-encoding the master.

### Should subtitles be head-locked or world-locked?

Head-locked is easier to read and breaks presence; world-locked preserves the scene and fails when the viewer looks away. Use a hybrid: anchor near the speaker, clamp the angular size, and fall back to a head-locked position when the viewer turns.

### How do you caption a sound that comes from behind the viewer?

Describe the direction in the caption text using a small, consistent vocabulary such as behind, to the left, above, and below. Direction is the part of the sound a caption-only viewer cannot recover from the mix.

### Does voice cloning work for 360 dialogue?

Yes. Where a speaker has authorized it, their voice can be preserved across languages so the dubbed line keeps both the speaker's identity and the original spatial placement. It does not solve room acoustics, so the replacement still has to match the scene's reverb.

### What audio should be delivered to a localization vendor?

Separated stems rather than a single mix, plus the channel layout, ambisonic order, and channel ordering convention. If dialogue is baked into the spatial bed, a vendor can only separate it approximately, and the replacement will sit over the remains of the original.

### Do 360 players support separate caption tracks?

Support varies by platform and by headset browser. Some read a caption sidecar, some require captions embedded as a selectable track, and some ignore position metadata entirely. Confirm the behavior of your target players before finalizing the delivery format.

### How long should a caption stay on screen in a headset?

Longer than flat-screen timing would suggest for the same word count, particularly when the camera is panning or the viewer is likely to be turning. Shorten the text rather than extending the cue past the point where the audio has moved on.

## Conclusion

The decision that determines most of the outcome is the placement model, and it should be settled before translation begins. Head-locked captions are the safe default: readable, predictable, inexpensive. Anchored captions suit scenes that reward looking around and dialogue that is sparse. Choose one for the first pass, record the angular size, line length, and duration you settled on, and hold them constant as you add languages.

The second decision is asset discipline. Spatial audio only survives localization if the stems survive it, so the handoff has to specify separated audio, channel conventions, projection type, and caption files rather than a single rendered video. Write that list into the delivery spec now; retrofitting it after a language has shipped costs more than producing it correctly the first time.

Then test in the headset with viewers who use captions only and viewers who use audio only, changing one variable per round. If the scope is unclear or the formats are unfamiliar, [talk to the team](/contact) before committing to a delivery spec, and bring your headset test notes with you. A short scene localized into one language and measured properly tells you more than a full series localized into five.
