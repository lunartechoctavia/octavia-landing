---
{
  "title": "Subtitle Positioning: Avoiding Overlap With Graphics, Faces, and Captions",
  "slug": "subtitle-positioning-and-overlap",
  "category": "Accessibility",
  "primaryKeyword": "subtitle positioning",
  "metaDescription": "Learn how subtitle positioning prevents captions from covering graphics, faces, and lower thirds across mobile, social, and vertical video.",
  "excerpt": "Subtitle positioning is a deliberate choice, not a default. This practical guide shows how to place captions around graphics, faces, lower thirds, and player controls across broadcast, mobile, social, and vertical video so text stays readable.",
  "publishedAt": "2026-09-08T16:30:00Z",
  "updatedAt": "2026-09-08T16:30:00Z",
  "heroImage": "/assets/blog/images/condensing-particle-frame.png",
  "heroImageAlt": "Dark glass layers with floating subtitle bars avoiding a face, graphic, and caption block",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

Subtitle positioning is usually inherited rather than chosen. A captioning tool opens with a default, the default is bottom center, and every cue lands there for the length of the program. On a clean interview shot in 16:9 with the subject in the upper third, that placement works well enough that nobody notices it. On a phone, inside a social feed, over a lower third, or inside a vertical crop, the same default drops text across something the viewer needs to see.

Most readability complaints do not trace back to font choice. They trace back to placement. A cue sits on a speaker's mouth during the one exchange where lip reading carries meaning. An end card's URL disappears behind a two-line caption. A burned-in chyron collides with translated dialogue. A progress bar slices through the second line because the player's own interface occupies the bottom of the screen.

The bottom-center default exists because broadcast television was a single delivery context: one aspect ratio, one safe area, one screen, a viewer seated at a distance. None of those conditions hold across streaming services, social feeds, mobile players, and vertical crops. Subtitle positioning is a decision that has to be made per delivery target, and it leaves evidence: caption files carry position data, players render that data inconsistently, and a placement that looks correct in an editing timeline can be wrong on the device a viewer actually holds.

## Where the bottom-center default breaks down

### The assumptions behind the default

Bottom-center placement assumes four things at once: the lower portion of the frame is empty, the viewer sees the full frame without interface elements on top of it, nothing in the program itself occupies that region, and the speaker's face sits above the cue. A single cue can violate all four and still pass a spot check on a desktop monitor with the transport controls hidden.

### When the lower third is already occupied

The most common conflicts are predictable once you list them:

- Burned-in lower thirds and name supers identifying a speaker, location, or job title
- Score bugs, clocks, and news tickers that sit in the lower band by design
- Legal disclaimers, sponsor cards, and contest rules placed in the lower portion of the frame
- Watermarks and network logos anchored to a lower corner
- On-screen sign language interpreters, who occupy the same space and carry equal accessibility weight
- End cards carrying a URL, QR code, or call to action

Burned-in material is the harder case because it is part of the video image. You cannot toggle it off or reflow it. If the graphic comes from a template you control, the cleaner fix is often to move the graphic and leave the captions where viewers expect them. If the graphic is locked, the caption has to move.

### The cost of leaving it alone

A collision caught in review costs a re-export. A collision caught after delivery costs a re-upload, a re-index, and a fresh round of platform processing, and by then the caption file may already be cached by a player or attached to a syndicated copy. Placement decisions also multiply across languages: a cue that sits badly in the source sits badly in every translated version, and translated lines tend to run longer than the source, so a placement that barely fits will not survive localization.

## Reading the frame before placing a cue

### Protecting the mouth and eyes

For deaf and hard-of-hearing viewers, the mouth is functional information, not decoration. A cue that touches the chin during dialogue removes the one region that supports lip reading. Keep the caption box clear of the mouth whenever the active speaker is on screen and the shot is close enough that the mouth is legible.

The second protected region is the eyeline. On reaction shots and two-shots, a caption running across the middle of the frame severs the visual connection between two speakers, which changes how the scene reads. When you must choose between covering a face and covering the bottom of a wide shot, cover the wide shot.

### Burned-in graphics versus platform overlays

Burn-in graphics sit inside the video file and travel with it to every destination. Platform overlays, such as like buttons and progress bars, are drawn by the app at playback time and differ by app, version, and device. Burned-in conflicts are solved in the edit. Overlay conflicts are solved by leaving margin, since you cannot control what a given app draws.

### Action that matters more than the face

Faces are not always the priority. Cooking demonstrations, surgical footage, sign language, dance, sports, and instructional screen recordings all carry critical information in the lower half of the frame. The standard move is to raise the caption band for the duration of the sequence, then return it, provided the move is motivated by the content and not by a single cue's timing.

## Platform chrome, aspect ratios, and safe zones

### The mobile lower third

In a vertical feed, the lower fifth of the screen is frequently covered by the caption toggle, username, audio track label, and action buttons, and the right edge carries a stack of icons. In a full-screen mobile player, a progress bar and scrubber appear on interaction and often persist. Designing for the full frame and assuming the interface will stay out of the way is the most reliable way to ship captions that are technically present and practically unreadable. Because these overlays change without notice, treat any specific measurement as a hypothesis to verify on the current version of the app rather than a fixed constant.

### Safe zones by aspect ratio

- 16:9 (1.78:1): the widest safe band. Bottom placement works when the lower frame is clear; keep cues inside roughly the central 90 percent horizontally.
- 9:16 vertical: the crop usually cuts a wide frame at the center, so faces that were off-center move inward and the lower band fills with interface. Captions commonly sit higher, often in the lower-middle third.
- 1:1 square: little horizontal room for long lines, so line count matters more than position. Two short lines beat one long one.
- 4:5: popular in feeds because it uses more vertical space than square. Bottom placement competes with the same chrome as 9:16.
- 2.39:1 scope: the image is short and wide, so a bottom band takes proportionally more of the picture. Captions can sit in the lower letterbox area only if the letterbox is part of the delivered frame.

### One master, many crops

A single placement cannot serve both a 16:9 master and a 9:16 crop, because the crop changes what is beneath the text. Repositioning at render time is more predictable than hoping one file works everywhere. If you are generating caption files for each target ratio, the workflow in [subtitle generation](/features/subtitle-generation) lets you produce separate sets rather than hand-editing a copy per platform. The same logic applies to multi-language delivery: translated lines carry different character counts, so each language deserves its own placement pass rather than a shared template.

## Line breaking, line count, and placement

### Reading speed sets the line count

Line count and placement are one decision, not two. A cue placed in a narrow band forces shorter lines, which forces more cues per minute, which raises the reading load. Many captioning style guides cap a line in the range of 32 to 42 characters and hold cues to two lines, with reading speed targets in the high teens to low twenties of characters per second for adult audiences and lower for children's programming. Those numbers are conventions, not laws, but they explain why a placement decision cascades into timing.

### Where the line break falls

Break at clause boundaries and at natural pauses. Avoid separating an article from its noun, a preposition from its object, or a first name from a last name. Do not split a hyphenated word across lines, and avoid leaving a single short word alone on the second line. If a break produces an orphan, re-time the cue or shorten the text rather than shrinking the font.

### Stability across cues

A caption that jumps between the top and the bottom of the frame is harder to follow than one that stays in an imperfect but consistent position. Choose a region per scene or per program segment, not per cue. If a lower third appears for eight seconds, the captions can move up for eight seconds; if graphics appear on and off throughout, pick a permanent height and stay there. Motion in captions should signal a change in the video, not the other way around.

## Speaker identification in multi-speaker scenes

### Labels, dashes, and color

Three approaches dominate. A leading dash per speaker is compact and language-neutral. A name label is explicit and helps viewers who join mid-scene. Color is fast to parse but fails for viewers with color vision deficiency and disappears entirely in monochrome or high-contrast display modes, so it should never be the only signal. Pair color with either a label or a position.

### Positional attribution

Positional attribution places a speaker's cue near that speaker in the frame, or consistently on one side. It works well when the composition is stable and speakers occupy fixed halves of a two-shot. It breaks when speakers move, when the shot cuts to singles, or when three or more people share the frame. Positional schemes also fight with placement constraints: a speaker on the right may sit exactly where the platform's action buttons live.

### Knowing when to stop

In rapid back-and-forth dialogue, repositioning every cue produces a strobe effect that costs more readability than it buys in attribution. Above roughly two speaker changes per second of screen time, hold one region and rely on labels. When captions cannot carry the distinction cleanly, an audio mix that keeps voices distinct does more work than any on-screen marker, which is where [subtitle-to-audio](/features/subtitle-to-audio) becomes a reasonable companion to the caption file.

## Legibility over unpredictable footage

### Boxes versus outlines

An outline preserves the image and works over most footage, but it thins out over bright, high-detail backgrounds such as snow, confetti, or a white kitchen. A background box guarantees contrast because it controls the pixels behind the text, at the cost of occluding more of the frame. For documentary and interview footage with varied backgrounds, a semi-transparent box is usually the safer default. For narrative work where the image matters, an outline plus a soft shadow is less intrusive.

### Shadow, fill, and opacity

A drop shadow with no blur reads as a second outline and can muddy thin strokes. A large blur radius softens the text edge instead of separating it. Keep shadows tight and offset slightly downward. Box opacity in the range of roughly 75 to 100 percent keeps text readable while letting some of the underlying image show through; below that, contrast becomes dependent on the footage again. Avoid pure white text on pure black boxes with hard corners if the rest of the program uses rounded, softer graphics, but do not trade legibility for stylistic consistency.

## What SRT, VTT, and ASS can express

### SRT: timing and text

SRT carries a cue number, a start and end time, and text. That is the whole specification. It cannot express position, alignment, line breaks beyond literal newlines, font, color, or a background box. When a platform accepts only SRT, every placement decision has to be made in the renderer or the player, and you should assume the renderer will apply its own default: bottom center.

### WebVTT: position and regions

WebVTT extends the cue to include alignment, line position, text position, size, and named regions. A cue can be told to sit at a given line, aligned to a given edge, inside a defined region that holds a consistent box across many cues. Support varies by player, and browsers handle some settings differently, so a VTT that positions correctly in one player may fall back to default in another. Test the fallback, not just the intended result.

### ASS and SSA

ASS and SSA were built for subtitling with typography and layout control: named styles, margins, absolute positioning, alignment anchors, fonts, outlines, shadows, and per-cue overrides. For burned-in captions, where the text becomes part of the video image, ASS gives you the closest match between what you designed and what ships. The trade-off is portability: ASS is poorly supported as a sidecar format in most modern players, so it is typically a rendering format rather than a delivery format.

### Choosing a format

- Burned-in or fully controlled delivery: ASS, rendered at export.
- Web and streaming playback: WebVTT, with a verified fallback.
- Legacy pipelines and simple sidecar delivery: SRT, with placement handled downstream.
- Programmatic pipelines: check the format and positioning parameters available in the [API documentation](/docs) before assuming a setting will survive the round trip.

If captions are translated into multiple languages, run each language through its own placement check rather than reusing the source layout. Character expansion between languages changes line breaks and can push a two-line cue into three. A [subtitle translation](/features/subtitle-translation) pass that preserves timing still needs a layout pass afterward, and for programs rebuilt in another language entirely, the same review applies to [video translation](/features/video-translation) outputs where burned-in graphics may be regenerated.

## Reviewing on the target device

### A device pass checklist

1. Export the caption file at the target aspect ratio, not the editing ratio.
2. Play the program on the actual device or the closest emulator, not in the editing timeline.
3. Leave platform interface visible. Do not review in full-screen mode with chrome hidden if viewers will see chrome.
4. Toggle the platform's own auto-captions on, since two caption layers can stack.
5. Set the device to its largest supported text size or display zoom and watch for reflow.
6. Watch with audio muted, which is how a large share of feed viewers experience the program.
7. Check the first ten seconds and every end card separately, since those are the segments most likely to carry graphics.

### What to record

Log the device, the operating system version, the app version, the aspect ratio, and the timecode of each collision. Screenshots are faster to act on than descriptions, and a version number turns a subjective complaint into a reproducible bug. If the same collision appears in three languages, it is a placement problem, not a translation problem. If it appears on one platform only, it is a chrome problem and belongs in the safe-zone margin rather than the cue file. A placement review that produces no written record gets repeated on the next delivery.

## Frequently asked questions

### Should subtitles always be at the bottom?

No. Bottom placement is a reasonable default for 16:9 content with a clear lower frame, and it matches viewer expectation. It fails when graphics, faces, or interface elements already occupy that band, and it fails more often on mobile and vertical delivery than on television.

### How do I stop captions from covering faces?

Define a protected region around the mouth and eyes before placement, then choose a caption band that avoids it. On close shots, raise the band rather than letting it clip the chin. On wide shots where the face is small, bottom placement is usually safe.

### Where should captions go in vertical video?

Higher than the bottom edge, typically in the lower-middle third, because the bottom fifth and the right edge are commonly covered by app interface. Because those overlays change between app versions, verify on the current build rather than trusting a fixed measurement.

### Can I set caption position in an SRT file?

No. SRT has no position field. Placement has to come from the renderer, the player, or a conversion to a format that supports positioning, such as WebVTT or ASS.

### How many lines should a subtitle have?

Two is the working maximum for most content. Three lines force the viewer's eye to travel further and consume more of the frame, which is especially costly in vertical and scope aspect ratios. If a cue needs three lines, split it into two cues or shorten the text.

### Do I need a separate caption file for each aspect ratio?

Yes, if placement matters. A 9:16 crop changes what sits beneath the text and how much horizontal room a line has, so a file positioned for 16:9 will not hold up in the crop.

### How do I identify speakers without moving captions?

Use labels or leading dashes in a single fixed region. Reserve positional attribution for stable two-shots where the composition genuinely supports it, and drop it entirely in fast exchanges.

## Conclusion

Treat placement as a per-delivery decision and document it. Before the first cue is placed, list the delivery targets, the aspect ratios, and the graphics that occupy the frame. Then pick a caption region for each target, verify it against the protected regions in the actual footage, and write the choice down so the next editor on the project does not re-litigate it.

Run the device pass before you call a file finished. The editing timeline hides more placement errors than any other part of the workflow, because it rarely shows platform chrome, rarely shows the true crop, and never shows the device at arm's length in daylight.

If placement is currently a per-project improvisation, the fix is process, not software: a safe-zone reference per aspect ratio, a format decision documented per delivery target, and one reviewer who checks the final artifact on real hardware. Teams that want caption sets generated and repositioned per target rather than hand-edited can review the available [plans](/pricing) or [talk to the team](/contact) about how the pipeline handles multi-ratio and multilingual output.
