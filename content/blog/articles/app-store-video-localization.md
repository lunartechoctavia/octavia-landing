---
{
  "title": "App Store Video Localization: Preview Videos That Convert in Every Market",
  "slug": "app-store-video-localization",
  "category": "Localization",
  "primaryKeyword": "app store video localization",
  "metaDescription": "Learn how app store video localization turns silent previews into installs across markets, from runtime budgets to overlay copy that survives translation.",
  "excerpt": "This guide explains how to localize app store preview videos without losing the install trigger. You will learn runtime budgeting, when to re-capture versus overlay, and how to write on-screen copy that survives translation.",
  "publishedAt": "2026-09-03T16:30:00Z",
  "updatedAt": "2026-09-03T16:30:00Z",
  "heroImage": "/assets/blog/images/smoke-wave-flow.png",
  "heroImageAlt": "Abstract dark-glass app preview screens with localized interface overlays and soft light.",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

An app preview video is the only asset in a store listing that moves, plays without sound, and passes through human review before it goes live. Add a cap on how many previews you can attach per locale and the format has hard edges. App store video localization is the work of fitting a short, silent, reviewed artifact into a dozen or more markets without losing the reason someone taps Install.

Teams usually discover this late. A campaign video gets localized by swapping a subtitle file and re-recording narration, and that works because the visuals carry the story. In a preview, the visuals are a screen recording of your own interface, and the meaning sits in the UI strings and the overlay copy, both rendered at sizes that leave little slack for a translation that runs long. When the German overlay wraps to three lines and covers the button you are demonstrating, the video has failed before anyone hears a word of narration.

This piece covers the decisions that differ from ordinary marketing-video localization: how to budget runtime across slots, what to re-capture rather than overlay, how to write on-screen strings that survive translation, when narration earns its place, how right-to-left layouts change the capture, how to keep previews in step with a UI that ships every two weeks, and how to read per-locale conversion well enough to decide where the next investment goes.

## Why app store video localization follows different rules

### Silent playback makes the text track the script

Most store browse surfaces autoplay previews muted, and a share of viewers never unmute. Assume the whole proposition has to land through motion plus on-screen text. The test: play the localized preview with the sound off, watching once without pausing. If you cannot say in one sentence what the app does and why it differs from the alternatives, the text track failed and no narration will repair it. The overlay copy is the primary script.

### Runtime is counted in seconds

Preview slots run roughly fifteen to thirty seconds each, with a small cap on how many you may attach in a locale. That budget has to hold the hook, the core mechanic, and the proof. Localization cannot add runtime for a longer sentence, so the source edit has to be built with the shortest target language in mind. Check the current upload specification before you design, because these rules change and the tightest platform in your portfolio sets the ceiling for everyone; the [Octavia documentation](/docs) lists the current requirements.

Two consequences follow. The first slot appears in the most surfaces, so its opening seconds carry disproportionate weight; keep them locale-neutral, built from a shape, a gesture, or a before-and-after rather than a headline. And three short previews beat one long one, because each slot is a separate chance to match a different search intent.

### The review gate changes how you iterate

Every localized asset passes review, and a rejection costs a cycle rather than a re-render, so the goal is first-pass approval in all locales at once. Four habits prevent most problems:

- Do not make the video look interactive; buttons that appear tappable read as a broken promise.
- Do not imply rankings, awards, or popularity you cannot substantiate in that market.
- Do not reproduce the store's own chrome or another platform's hardware.
- Do not let the preview promise something the localized listing copy does not.

## Localizing the in-app UI, not just the caption track

The interface inside the capture is content. If the German preview shows an English "Add to cart" button, the viewer learns the product is not really for them, however good the overlay copy is.

### Re-capture the localized build rather than overpainting the original

There are two ways to get localized UI into a preview: record the app running in that language, or composite translated text over the original recording. Compositing is faster and looks wrong. Rendered text sits inside layout boxes, wraps to the app's own rules, and shifts everything around it. A patch over a button will be the wrong width, will not inherit the platform font's metrics, and will break the moment the UI animates.

Capture against a dedicated demo account with seeded, realistic data in the target language. Empty states and truncated names are the clearest giveaway that nobody reviewed the capture. The pipeline differs from marketing-asset [video translation](/features/video-translation): you are localizing an application session, not a filmed scene.

### Text expansion inside a rendered layout

String length varies by language, and the preview inherits every constraint the app already has. A two-word English button can become four in French, and German compounds push a single label past its box. Shoot the demo flow so critical text lands on screens with generous space, and settle the app's own line limits and truncation rules before you capture rather than in the edit.

### Numbers, dates, currency, and units

A pricing screen reading "9.99 USD/month" is not localizable by caption. In the localized build, currency, decimal separator, date format, and first day of the week all change. Japan shows prices without decimals; France writes 9,99. If the capture includes a chart, a streak counter, or a booking calendar, seed the demo data so those formats render correctly. This is the most common reason a listing still looks foreign after localization.

## Writing overlay text that survives translation

### Build a text spec before you build the edit

Write every on-screen string in a table with columns for timecode in and out, source character budget, source string, translator draft, reviewed final, and reviewer notes. This is what you hand to reviewers and what you diff when the preview changes. Sorting strings out inside an editing timeline is how three previews in the same locale end up with three different voices.

Give the translator the constraint, not just the sentence. "Maximum 28 characters including spaces, on screen for 2.5 seconds, must fit two lines" produces a usable answer. "Make it punchy" produces a line that wraps.

### Character budgets are per-locale

Set the budget against the longest realistic target, then verify in the render. Some pairs compress sharply (English to Chinese) and others expand (English to German or Finnish, where compounds and case endings add length). Translate the source strings first, render a test frame per language at final resolution, and review it on a phone. Text that reads comfortably on a 27-inch monitor can be unreadable on a 6-inch device held at arm's length.

### Keep preview text aligned with the listing copy and screenshots

The preview is one of several localized assets: title, subtitle, description, screenshot captions, preview overlays. Users and reviewers read them as one voice. If the screenshots say the app is for freelancers and the preview says it is for small teams, the listing reads as machine-assembled. Lock terminology in a short glossary per locale, and reuse the listing's caption track for the preview's text pass so the wording stays identical between the two; that work runs through [subtitle translation](/features/subtitle-translation). Check that the app name, feature names, and any quoted figure, whether a trial length or a plan name, match the localized listing copy and the localized in-app strings.

## When a voiceover earns its runtime

### Where narration helps

Narration helps when the proposition is hard to show inside the runtime: a multi-step workflow, a service with no visible outcome, an abstract category. It also helps where a localized voice signals investment, because a viewer hearing a natural voice in their own language reads the app as supported rather than ported. Keep it to two or three lines and make sure it says something the overlay text does not. Narration that reads the text aloud wastes the channel.

### Where it is wasted effort

Narration is wasted when the audio is off, which describes most browse traffic, so you are paying to record lines a large share of viewers never hear. It is equally wasted when the voice is the only localized element: a dubbed English interface with German narration is worse than a German interface with no narration. A middle path is to localize one voice line in the first preview slot and ship the rest text-only, concentrating cost where it most affects the install decision.

### Splitting dialogue from music before you dub

Dubbing over a capture that already carries a music bed requires separating narration from music, or the new voice fights the track. Separation gives you a clean bed to place localized narration against, and it lets you keep the same music across locales so the preview feels like one campaign rather than a dozen. Converting your text track to audio is useful here, because the text spec becomes the source for the voice instead of a separate script that drifts from the on-screen copy; that path runs through [subtitle to audio](/features/subtitle-to-audio). Where you want a consistent presenter across markets, cloned speech with speaker authorization keeps the same identity in every language rather than a different narrator per locale.

## Right-to-left markets and mirrored layouts

### Decide what mirrors and what must not

Interface mirroring flips navigation, toolbars, and reading order. It does not flip logos, photographs of people, clocks, media controls, or progress indicators. A capture recorded on a correctly mirrored Arabic build gets this right automatically, which is another argument for recording rather than compositing. Composite instead and you will find a back chevron on the wrong side and a play button pointing the wrong way.

### Rendering Arabic and Hebrew in the overlay

Overlay text in Arabic needs the right font, correct shaping, and bidirectional handling when a Latin brand name or a number sits inside an Arabic sentence. Test the exact render at final resolution: a font missing the right glyphs falls back to something that looks close on a desktop preview and obviously wrong on a device. Keep lines shorter than in Latin locales, because Arabic script is cursive and dense. If you export the preview's text as a caption file for other channels, check that bidirectional markup survives the export; an embedded Latin phrase in an Arabic line is a common place for reading order to invert.

### Check the frame, not the timeline

Review right-to-left previews as rendered video, at phone size, in sequence with the other locales. Timeline review hides the errors that matter: a card sliding in from the wrong side, an icon pointing backward, a progress bar filling right to left while the surrounding copy reads right to left. Watch once at normal speed without pausing. If your eye catches a jump, viewers will too.

## A re-capture workflow for app store video localization

The UI ships; the preview does not update itself. Without a workflow, localized previews drift into showing a version of the app that no longer exists and the listing starts contradicting itself.

### A sequence that holds up

1. Tag the build. Record the commit hash or build number behind each capture in the asset tracker, alongside the locale list.
2. Diff the UI. When a new build ships, compare only the screens that appear in the previews. Most releases touch none of them.
3. Choose re-capture or reuse. If a changed screen is background context, reuse the existing frames. If it carries overlay text, re-capture that segment in every locale.
4. Re-run the text spec. Pull the affected strings, re-translate, and re-review them against the frame they sit in.
5. Re-render every locale from one timeline, keeping per-locale text and voice layers so timing never diverges between markets.
6. Re-check the listing. Update screenshots and copy in the same release window so the listing does not mix old UI with a new preview.

### Version the source, not just the exports

Keep the capture project, the text spec, and the master timeline beside the app's release notes. When someone asks in eight months why the Japanese preview shows a screen removed in a redesign, the answer has to be findable. Name exports with build number and locale rather than a date and the word "final."

### When a full re-shoot is unavoidable

A navigation redesign, a rebrand, or a change to the primary flow means every locale is re-shot. Budget for that event instead of discovering it mid-quarter. If the preview uses narration, a re-shoot means re-recording unless the voice is reusable; a [video dubbing](/features/video-dubbing) workflow with persistent voice profiles keeps the same speaker across the update rather than auditioning a new narrator per market.

## Measuring conversion by locale

### Build a comparison that means something

Store analytics will give you impressions, product page views, and installs per country. The number that matters is conversion from product page view to install, split by locale, because impressions are driven by spend and featuring rather than by the asset. Compare each locale against itself over time, before and after the preview change, rather than against other locales that differ in competition, device mix, and price sensitivity.

Hold as much constant as you can. Change the preview in a subset of locales, leave the rest untouched as a control, and give the change enough time to clear normal week-to-week noise. A two-day window after a featuring event tells you nothing.

### Separate reach from rate

A market can look weak because the preview converts poorly or because the listing gets almost no traffic, and those need different responses. Low traffic with good conversion means the asset works and the constraint is upstream, in acquisition or in the surrounding listing. High traffic with poor conversion points at the preview: check the opening seconds, the text density, and whether the localized UI in the capture matches the market's language and payment conventions.

### Sequence the next market

Rank candidate locales by traffic, multiplied by the conversion gap, divided by the cost to fix. Localizing for a market with steady traffic and an obvious gap usually beats opening a new locale with no traffic. Where the gap is a text problem rather than a capture problem, a text pass tests the hypothesis before you commit to a full re-capture. Cost scales with how much of the workflow runs per locale, which is worth understanding before a twenty-market rollout; [pricing](/pricing) reflects that scaling.

## Common rejection and rework causes

- Text that does not match the listing: a localized overlay quoting a feature name the description translates differently invites a question and a delay.
- Device frames and chrome that mimic the store's own presentation, or show another platform's hardware.
- Claims that cannot be substantiated locally, including awards and rankings that do not hold in that market.
- Prices and trial terms that do not match the localized store listing.
- Text that is unreadable at phone size, or UI text rendered too small after downscaling.
- Cropping from a capture made for one device size, leaving UI elements cut off at the frame edges.
- Audio that clips or fights the music bed, usually a sign narration was placed without separating the original track.
- Contradictions between slots, with preview one and preview three showing different interface versions.

## Frequently asked questions

### How long should a localized app preview be?

Within the store's allowed window, aim for the shortest runtime that carries the hook, the core mechanic, and one proof point. If a translated line does not fit, cut the line rather than extend the slot.

### Do I need to re-record the app in every language?

For any locale whose interface appears legibly on screen, yes. Overpainting translated text onto an original recording is visible, breaks during animation, and rarely matches the app's own layout rules.

### Is a voiceover necessary in every locale?

No. Silent playback is the default in most browse surfaces, so on-screen text carries the proposition. Narration earns its cost where a localized voice signals real support or where the workflow is hard to show visually.

### How do I keep previews in sync with listing screenshots?

Update both in the same release window, from the same build, using the same glossary. Treat preview, screenshots, and listing copy as one artifact with one review pass rather than three separate projects.

### What should I check before submitting for review?

Watch the preview muted, at phone size, in each locale. Confirm the UI language matches, the text is legible, no claim or price contradicts the localized listing, and the opening seconds make sense with no audio and no context.

### Can one localized preview cover several countries?

Only where the language variant and payment conventions match. Spanish for Spain and Spanish for Mexico differ in currency, date format, and idiom, so a single asset reads as foreign in one of them. Group markets by variant, not by language name.

## Conclusion

Start with the constraint rather than the translation. Pick the three locales that carry the most listing traffic, watch your current previews muted at phone size, and write down every point where the meaning depends on audio or on English UI. That list tells you whether you need a full re-capture, a text pass, or nothing.

Then build the text spec and the master timeline before a translator touches a string. The spec is what makes the work repeatable: the artifact you re-translate when the UI shifts, the artifact reviewers check the frame against, and the artifact that keeps three preview slots sounding like one product.

If the capture workflow is the part that stalls, find out how much of it can be automated per locale before you scale to every market. Walking through your locale list is a faster route to a realistic plan than guessing at it, and you can [talk to the team](/contact) about where to start.
