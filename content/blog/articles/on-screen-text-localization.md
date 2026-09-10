---
{
  "title": "On-Screen Text Localization: Titles, Lower Thirds, and Burned-In Graphics",
  "slug": "on-screen-text-localization",
  "category": "Localization",
  "primaryKeyword": "on-screen text localization",
  "metaDescription": "Learn how on-screen text localization handles titles, lower thirds, and burned-in graphics, from scoping and fonts to overlays and re-renders.",
  "excerpt": "Learn how to spot recoverable text versus burned-in pixels, plan graphic layers that survive translation, and manage expansion, font fallback, and overlays in nine languages. You get a practical workflow for titles, lower thirds, and burned-in graphics that avoids last-minute rework.",
  "publishedAt": "2026-09-08T14:00:00Z",
  "updatedAt": "2026-09-08T14:00:00Z",
  "heroImage": "/assets/blog/images/cohort-glass-risers.png",
  "heroImageAlt": "Abstract dark-glass panel with layered title bars, subtitle lines, and glowing text.",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

A one-hour documentary arrives for localization. The dialogue is clean, the music sits on its own stem, and the narration was recorded in a treated room. At 00:04:12 a lower third fades up reading "Chief Financial Officer, Northwind Group." It holds for six seconds over the subject's shoulder, then dissolves. Nowhere in the delivered package do those words exist as text. They are pixels, and they have just become work in nine languages.

On-screen text localization is the part of a project that gets scoped last and costs the most. The reason is structural. Dialogue and narration are nearly always recoverable from a transcript, a script, or an isolated stem. Graphics are frequently flattened into the master before anyone asks whether a title will need to be French. The practical split is between text a pipeline can replace programmatically and text that exists only as an image.

This article covers how to tell those two cases apart, how to plan graphic layers so the second case stops occurring, what a longer German or Russian string does to a lower third sized for English, how font fallback quietly ruins a design in Arabic or Thai, when an overlay beats a re-render, how to handle collisions between burned-in text and subtitles, and how to triage a back catalog whose project files are gone. It closes with a handover specification you can attach to a delivery checklist.

## Replaceable text versus burned-in text

### Three conditions for replaceable text

Text can be replaced programmatically only when three conditions hold together: the words sit on an editable text layer in a project file, a typeface covering the target script is licensed and installed, and the position, maximum line count, and hold duration are documented well enough for someone who did not build the graphic to change it safely. Miss any one condition and the text is effectively burned in, whatever the file name suggests. A project that opens is not proof of anything. The real test is whether the Arabic and Thai versions render in the intended typeface rather than a substitute.

### What burned-in actually means

Burned-in text is any text rasterized into the picture: social exports, screen recordings, archival footage, and motion graphics rendered to a delivery codec with no alpha channel. It also includes projects that technically survive but were authored in a software version nobody has installed. The diagnostic is simple: if you cannot select the words in an editor at the source frame rate, treat them as pixels and price the work accordingly. A [video translation](/features/video-translation) workflow reaches the dialogue, the transcript, and the subtitle track without difficulty; it cannot reach a lower third that was flattened during the grade.

### Why the cost gap is structural

Replacing a lower third from a live project takes minutes: swap the string, adjust the container, re-render the graphics pass. Reconstructing the same lower third from a finished master means painting out the original over moving footage, rebuilding the animation to match the entry and exit, matching grain and motion blur, and licensing a typeface you may not have. The two paths differ by an order of magnitude in effort, and the second cannot be estimated from a single viewing.

## Planning for on-screen text localization at edit time

Everything expensive about this work is decided before the first export. A handful of choices during the edit determine whether localization becomes a re-render or a reconstruction.

### Keep graphics on their own layers

Titles, lower thirds, chyrons, end cards, and disclaimers belong in a composition that is not merged with the graded plate. Deliver a textless master plus a graphics pass with an alpha channel at matching frame rate and timecode. Export the text as data too: a table of timecode in and out, the original string, and the intended position. That table is what a translator actually needs, and producing it costs an afternoon.

### Reserve space for expansion

Design the plate to fit the longest realistic string, not the English one. Reserve extra width on whichever side the text grows toward, and keep the entry and exit animation independent of string length so a longer word does not push it off its marks. For vertical and square deliveries, keep the bottom of the frame clear of decorative graphics unless you intend to burn captions there.

### Build timing headroom into the animation

A lower third animated as a single keyframed unit is hard to extend. Build it in three parts: an in, a hold, and an out. The hold can then stretch without redoing the motion. Reading speed varies by language and by string, and a hold that feels generous in English can be tight in a language that needs more syllables to carry the same meaning.

## Text expansion and the fixed lower third

Expansion is often described as though every language were longer than English. That is not the pattern. German frequently compresses, while French, Spanish, Polish, and Russian tend to run longer, and the variance is per string rather than per language. Because you cannot predict which strings grow, the container has to tolerate the maximum rather than the average.

### Overflow, wrap, and auto-shrink

Three failures show up repeatedly:

- Overflow: the string runs past the background plate, so the final words sit on raw footage with no contrast behind them.
- Wrap: auto-wrap pushes a second line into the next element or off the plate entirely, and the break lands mid-term.
- Auto-shrink: the template reduces type size to force a fit, so the same graphic uses three sizes across three languages and the design hierarchy collapses.

### Fix the container, not the string

Let the plate resize with the text, anchor it to one edge so it grows in a predictable direction, cap the width at two lines with fixed leading, and turn auto-shrink off. Where a string genuinely will not fit, solve it editorially with a documented rule. Role titles can usually be shortened to the function, and long legal strings can move to a full-frame card with a longer hold.

### Test before you commission

Pull the five longest strings out of the script, get those translated first, and drop them into the template at delivery resolution. This takes under an hour and surfaces container problems before the rest of the translation budget is committed.

## Font coverage and the fallback that ruins the design

### What a renderer does when a glyph is missing

When the specified typeface lacks a glyph, the renderer substitutes one from a fallback stack, often the operating system default. The substitute carries different weight, width, and vertical metrics, so the graphic ships with two typefaces in a single line. Diacritics are the common case: Vietnamese stacked marks, Polish ogonek, Turkish dotless i, and Romanian comma-below all fail in Latin fonts cut for English only.

### Scripts that break a Latin-centric template

Arabic and Hebrew need shaping and joining behavior a static layout will not provide. Devanagari uses conjuncts and vowel marks above and below the baseline, which requires leading a design tuned to Latin capitals will not have. Thai stacks marks and does not separate words with spaces, so line-breaking rules matter. CJK characters are full width, so a line holds fewer of them, and their punctuation is set differently.

### Preventing fallback before render

- License and install typefaces for every target script at the start of the project, not after the first delivery.
- Specify an explicit fallback stack and test it deliberately rather than accepting whatever the system picks.
- Increase leading for scripts with marks above or below the cap height, and check the glyph extremes rather than the average line.
- Render a coverage string containing every target-script character used in the video and read it at 100%.

## Right-to-left layouts and mirrored graphics

### What flips and what does not

For Arabic, Hebrew, Persian, and Urdu, the primary element moves to the right, the accent bar moves to the left, and the entry animation reverses so text slides in from the right. Directional icons flip: arrows, chevrons, progress indicators, and the reading order of a two-column layout. Do not flip logos, numerals, clocks, maps, faces, photographs, checkmarks, or anything whose left-to-right meaning is the content itself, such as a timeline or a before-and-after comparison.

### Repositioning without redesigning

Most lower thirds localize by mirroring the anchor point and reversing the animation direction, leaving plate dimensions and timing untouched. Where a graphic places a portrait on the left and text on the right, a mirrored version usually beats keeping the layout and right-aligning the text, because the text block's own alignment should follow reading direction.

### Bidirectional strings

A Latin brand name inside an Arabic sentence is a bidirectional run. Without isolation, punctuation and adjacent numerals land on the wrong side. Wrap embedded Latin runs in direction marks, and treat phone numbers, percentages, and version numbers as isolated runs of their own. Verify by reading the rendered graphic, never the text field.

## Overlay a translated caption instead of re-rendering

Not every graphic deserves a rebuild. The decision turns on how much information the text carries and how long it holds on screen.

### Choose an overlay when

The graphic is decorative, repeats what the speaker is saying, or holds for roughly two seconds or less. Also when the source project is unavailable, the typeface is not licensed for the target script, or reproducing the motion design would cost more than the graphic is worth. Overlays suit chapter markers, location stamps, and stylized title treatments that appear briefly.

### Choose a re-render when

The text carries information absent from the audio: legal disclaimers, prices, addresses, sponsor obligations, medical or financial disclosures. Also when the graphic is a stable, long-held card such as an opening title, an end card, or a data figure the viewer is meant to read and retain. These are the places where a mismatched substitute reads as an error rather than a compromise.

### Doing an overlay well

Place the translated text in a consistent band with the same type size and background treatment each time it appears, so viewers learn where to look. Covering the original with a scrim is usually uglier than placing the translation nearby, and covering means tracking the original through any movement. Keep the overlay clear of the subtitle zone, or you will create the collision described next.

## When burned-in text collides with subtitles

### Why the collision is predictable

Broadcast conventions put subtitles bottom-centered and lower thirds bottom-left or across the lower third. Add a translated [subtitle track](/features/subtitle-translation) to a program with burned-in graphics and the two occupy the same band. This is the default outcome of localizing any program that was captioned for a domestic audience, not an edge case.

### Repositioning options, ranked by effort

- Raise the subtitle band while a graphic is on screen and drop it when the graphic clears. Most precise, most work, and the change must land at a cut rather than mid-shot or the movement reads as a glitch.
- Move subtitles to the top for the entire program. Simple and consistent, though viewers unfamiliar with the convention need time to adjust.
- Cover the original graphic and place the translation in the subtitle track at the same position. This collapses two text layers into one, giving you consistency for free and removing the collision entirely.
- Re-render the graphic with the translated string and leave subtitles where they are. Best result when the project survives, and the only option when the graphic must remain a design element.

### Checking the result

Watch every graphic at 100% on the delivery aspect ratio, paying attention to the first and last frames, where a fade leaves partial text at reduced contrast. Look for doubled text: original English visible beneath a translated caption. Then check transitions, where the subtitle band moves while a graphic enters or leaves at the same moment. If the program has no subtitle track yet, [subtitle generation](/features/subtitle-generation) from the finished audio is a reasonable starting point, but review the output against the graphics log before you lock timings.

## Triaging a back catalog with no source files

When the project files are gone, work proceeds in a fixed order. Skipping a step produces a catalog that looks inconsistent between titles.

1. Inventory every text event. Log timecode in and out, the string, the duration, and whether the text is informational, decorative, or redundant with the audio.
2. Rank by cost of being wrong. Regulatory text, prices, safety information, and legal disclaimers sit at the top. Decorative titles and location stamps sit at the bottom.
3. Decide per class, not per video. Every informational lower third across the catalog receives the same treatment, so a viewer moving between episodes sees one visual language.
4. Assign a method per class. Cover and subtitle, overlay caption, re-render where a project survives, or leave untranslated where the graphic is decorative and the text is repeated in the audio.
5. Build reusable components. One caption band style, one cover element, and one font kit per target script mean the two-hundredth title card costs almost nothing.
6. Batch by language, not by asset. A single pass per language keeps terminology consistent and hands the linguist the full glossary in one sitting. A [video dubbing](/features/video-dubbing) pass over the same catalog can be scheduled alongside it so audio and text ship together.
7. Spot-check a sample per language at full duration, not from a screenshot. Text problems appear in motion: fades, wipes, and cuts.

## The handover spec that stops this recurring

Every item below is cheap to produce during a production and expensive to reconstruct afterward.

- A textless master at source resolution, in the highest-quality codec available, with matching frame rate and timecode.
- A graphics pass with an alpha channel, matched to the master.
- Editable project files, or a packaged composition listing every font and plugin version.
- A text data file: timecode in and out, original string, informational or decorative flag, maximum characters per line, and intended position.
- A font manifest: typefaces used, license terms, permitted installs, and which target scripts each one covers.
- A localization style guide: rules for shortening titles, whether legal text is translated, capitalization conventions, and a project glossary.
- A named contact who can answer graphics questions after delivery.

If part of the pipeline is automated, keep the text data file in a format your tooling can consume, and check the [API documentation](/docs) for the supported subtitle and timing formats so the handoff does not require manual reconciliation.

## Frequently asked questions

### What is on-screen text localization?

It is the process of replacing or supplementing text inside the picture: titles, lower thirds, chyrons, end cards, disclaimers, and labels. It is handled separately from subtitle and audio work because the source text may exist only as pixels rather than as an editable layer.

### Can burned-in text be translated without the original project?

Yes, but the method changes. The original can be covered and the translation placed as a styled caption, or the area can be painted out and the graphic rebuilt. Rebuilding costs considerably more and rarely reproduces the original motion exactly.

### How much extra room should a lower third reserve for translation?

There is no universal figure, and treating one as a rule causes as many problems as it solves. Size the plate against the longest string in the target set, let it resize with the text, and cap it at two lines with fixed leading.

### Why does translated text render in a different font?

The specified typeface is missing a glyph for that script, so the renderer substituted one from a fallback stack. The result often looks acceptable to someone who cannot read the script and obviously wrong to someone who can. License and install target-script fonts before the first render.

### Should directional graphics be mirrored for Arabic and Hebrew?

Icons that indicate direction should mirror: arrows, chevrons, progress bars, and the reading order of multi-column layouts. Logos, numerals, clocks, maps, faces, and photographs should not. A timeline or before-and-after comparison keeps its original orientation because direction is the content.

### What if subtitles cover a burned-in lower third?

Either raise the subtitle band while the graphic is on screen, move subtitles to the top for the whole program, or cover the graphic and place the translation in the subtitle track at the same position. The last option removes the collision entirely and leaves one consistent text layer.

### Where does automated video translation fit into this?

Automated pipelines handle the audio, the transcript, and the subtitle track reliably and remove a large share of the manual work. Graphics are the boundary: anything flattened into the picture still needs a human decision about whether to overlay, cover, or rebuild.

## Conclusion

Treat the graphics inventory as a deliverable rather than a discovery. Before a project is quoted, someone should be able to hand over a list of every text event with timecodes, a note on whether each is informational or decorative, and a statement of whether an editable source exists. If that list takes four hours to produce and saves four days of reconstruction, the trade is obvious.

For the next production, the fix is entirely upstream: separate graphics layers, an alpha pass, a text data file, and licensed fonts for every target script. Teams that adopt that handover once stop paying for the same problem on each subsequent title, and effort shifts back to the audio and subtitle work where automation, including converting [subtitles back to audio](/features/subtitle-to-audio) for a dubbed mix, does most of the lifting.

For a back catalog, resist the urge to treat every graphic identically. Classify first, assign a method per class, then batch by language so terminology holds across the catalog. Where a graphic carries legal or commercial meaning, rebuild it properly even at the higher cost. Where it is decorative, an overlay or an untouched original is a defensible decision, provided you document it rather than leave it to be rediscovered on the next delivery.
