#!/usr/bin/env node
// Generates the /for/<audience> landing pages.
//
//   node scripts/build-audience-pages.mjs
//
// The page shell (head, navbar, footer, scripts) is lifted from an existing
// one-level-deep page so the nav, footer and relative asset paths stay in sync
// automatically. Only the SEO block and the main content are generated here.

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TEMPLATE = path.join(ROOT, 'features', 'video-translation.html');
const OUT_DIR = path.join(ROOT, 'for');
const SITE = 'https://octavia.lunartech.ai';

export const AUDIENCES = [
  {
    slug: 'creators',
    nav: 'Creators',
    title: 'Octavia for Creators — Publish Every Video in Every Language',
    description: 'Turn one upload into a global channel. Keep your own voice, your pacing and your soundtrack across 60+ languages.',
    eyebrow: 'For creators',
    h1: 'Your channel already travels. <em>Your language doesn’t.</em>',
    lede: 'Most of the people who would love your work will never find it, because it only exists in one language. Octavia takes the video you already made and gives it back to you in 60+ languages — in your own voice, at your own pace, with your soundtrack intact.',
    pains: [
      ['Subtitles cap your ceiling', 'A large share of viewers will not watch a video they have to read. Subtitles widen the door; they do not open it.'],
      ['Re-recording does not scale', 'Nobody is re-shooting a twelve-minute video eight times. That is why most channels stay in one language forever.'],
      ['A second channel starts at zero', 'Launching a language with three videos looks abandoned. Depth is what makes a new-language channel look alive.'],
    ],
    caps: [
      ['lucide:mic', 'Your voice, not a stand-in', 'Voice preservation carries your tone, energy and delivery into every language, so subscribers still hear you rather than a narrator.'],
      ['lucide:music', 'Keep your soundtrack', 'Magic Mode separates dialogue from music and effects, so the track and atmosphere you chose survive the dub instead of being replaced by silence.'],
      ['lucide:gauge', 'Never sped up to fit', 'Character-aware timing keeps speech natural rather than compressing it into the original duration, which is what makes most dubs sound rushed.'],
      ['lucide:users', 'Collabs stay legible', 'Multi-speaker diarization gives each person their own voice, so podcasts, interviews and guest videos still play as conversations.'],
      ['lucide:subtitles', 'Captions that pass', 'Styled, word-level subtitles for muted feeds, plus translated tracks and transcripts for search.'],
      ['lucide:layers', 'Back catalogue in batches', 'Process a whole library at once and release it on a schedule, so a new-language channel launches with depth rather than three videos.'],
    ],
    steps: [
      ['Upload the finished cut', 'Start from the master you already exported. No re-shooting, no re-recording.'],
      ['Check the transcript', 'Fix names, product terms and channel in-jokes once, before anything is translated.'],
      ['Pick your languages', 'Choose from 60+. Review the translation before a single second of audio is generated.'],
      ['Export and publish', 'Dubbed audio, subtitle tracks and transcripts, ready for every platform.'],
    ],
    outputs: ['Dubbed video', 'Dubbed audio', 'Translated subtitles', 'Same-language captions', 'Transcripts', 'Subtitle-to-voice'],
    faq: [
      ['Will it still sound like me?', 'Voice preservation is built to carry your tone, pacing and delivery rather than substitute a generic narrator. You can also assign a professional voice per language if you would rather not use a synthetic version of your own — some creators prefer that, particularly for languages they do not speak at all.'],
      ['What happens to my background music?', 'Magic Mode separates dialogue from music and effects, so the new narration sits over your original bed. This matters more than people expect: strip the soundtrack and the localized version feels cheaper than the original, even when the translation is perfect.'],
      ['Should I dub or just add subtitles?', 'Both, ideally. Subtitles are cheap, improve discovery because platforms index caption text, and work in muted feeds. Dubbed audio is what actually lifts watch time in a market, because viewers can watch instead of read. Most creators subtitle everything and dub the videos that matter.'],
      ['Do I need a separate channel per language?', 'For anything beyond a couple of languages, yes. A dedicated channel or feed per language can be discovered by people browsing in that language and accumulates its own audience, which multi-track audio hidden behind a selector cannot do.'],
    ],
    reads: [
      ['AI Dubbing for Creators', '/blog/ai-dubbing-for-creators-guide'],
      ['Building a Multilingual YouTube Channel', '/blog/multilingual-youtube-channel'],
      ['Best Languages to Translate YouTube Videos', '/blog/best-languages-to-translate-youtube-videos'],
    ],
    closeH2: 'One upload. Every subscriber you never had.',
    closeP: 'Start with a single video and one language. See what it does to your watch time before you commit a library.',
  },

  {
    slug: 'music',
    nav: 'Artists & Labels',
    title: 'Octavia for Artists & Labels — Localize Music Content Worldwide',
    description: 'Interviews, documentaries, lyric explainers and campaign content in 60+ languages, with the master untouched.',
    eyebrow: 'For artists & labels',
    h1: 'The music crosses borders. <em>Everything around it stops at one.</em>',
    lede: 'Streaming made the songs global overnight. The interviews, documentaries, behind-the-scenes and campaign content around them are still made for one market. Octavia localizes everything that is not the record, without ever touching the record.',
    pains: [
      ['The story stays domestic', 'Fans in every market stream the release. Only one market gets the interview, the studio breakdown and the tour film.'],
      ['Campaign windows are short', 'A release cycle does not wait weeks for localized assets. Content that arrives after the moment has no commercial value.'],
      ['Archives sit unused', 'Years of interviews and documentary footage generate nothing, because localizing them was never economic.'],
    ],
    caps: [
      ['lucide:disc-3', 'The master is never touched', 'Magic Mode separates speech from music, so dialogue is replaced while the track underneath stays exactly as mastered.'],
      ['lucide:mic-vocal', 'The artist still sounds like the artist', 'Voice preservation carries an artist’s delivery into other languages, with consent and control over what may be produced in that voice.'],
      ['lucide:users', 'Interviews stay conversations', 'Diarization separates interviewer from artist, so each keeps a distinct voice instead of collapsing into one narrator.'],
      ['lucide:zap', 'Fast enough for a release week', 'Turnaround measured against a campaign calendar rather than a dubbing studio’s schedule.'],
      ['lucide:subtitles', 'Styled captions for social', 'Burned-in, word-level captions for muted feeds, where most music content is actually discovered.'],
      ['lucide:library', 'Back catalogue at volume', 'Batch-process an archive of interviews and documentaries that has never earned anything in a second language.'],
    ],
    steps: [
      ['Send the asset', 'Interview, documentary, EPK or campaign cut — the finished file is enough.'],
      ['Lock the names', 'Artist names, track titles and label terms are pinned so no pass tries to translate them.'],
      ['Choose the markets', 'Prioritise by where the streaming numbers already are, not by population.'],
      ['Ship to every channel', 'Dubbed audio, subtitle tracks and captioned social cuts.'],
    ],
    outputs: ['Dubbed interviews', 'Documentary dubs', 'Translated subtitles', 'Social captions', 'Transcripts', 'Press transcripts'],
    faq: [
      ['Does this translate lyrics or alter songs?', 'No. Octavia localizes spoken content — interviews, narration, commentary, documentary and campaign material. The music itself is preserved, not translated. Magic Mode exists precisely so the mastered track passes through untouched while speech is replaced.'],
      ['Can we use an artist’s own voice in other languages?', 'Technically yes, and it should be governed rather than assumed. Get written consent covering the specific languages and content types, decide internally who may authorise content in that voice, and settle whether audiences are told it is synthesised. Many labels use the artist’s voice for owned channels and a professional voice for paid media.'],
      ['What about music playing under an interview?', 'That is the normal case and it is handled by dialogue separation. Verify the result on passages where the music is loudest, since that is where any artefact would be audible — but for typical interview and documentary beds it is clean.'],
      ['Which markets should we localize first?', 'Follow your streaming and social data rather than intuition. The markets already consuming the music are the ones where the surrounding content converts, and they are frequently not the largest countries by population.'],
    ],
    reads: [
      ['Music Video Translation', '/blog/music-video-translation'],
      ['Dialogue and Music Separation Explained', '/blog/dialogue-music-separation-explained'],
      ['Ethical Voice Cloning', '/blog/ethical-voice-cloning'],
    ],
    closeH2: 'Give every market the story, not just the song.',
    closeP: 'Start with one interview and two markets, and measure it against the streaming numbers you already have.',
  },

  {
    slug: 'film',
    nav: 'Filmmakers & Studios',
    title: 'Octavia for Filmmakers & Studios — Dub Film and TV at Catalogue Scale',
    description: 'Localize features, series and back catalogue in 60+ languages, with the music and effects bed preserved.',
    eyebrow: 'For filmmakers & studios',
    h1: 'Most catalogues are dark <em>in most of the world.</em>',
    lede: 'Traditional dubbing costs are why the majority of film and television libraries have never been localized beyond a handful of territories. Octavia changes what is economic — which mostly means it changes what gets released at all.',
    pains: [
      ['The back catalogue earns nothing abroad', 'Titles that would sell in a dozen territories sit undistributed because per-language dubbing never paid back.'],
      ['No M&E stem, no dub', 'Older and independent titles frequently lack a music-and-effects track, which historically ended the conversation.'],
      ['Territory windows move faster than studios', 'A dubbing schedule measured in months does not fit a streaming window measured in weeks.'],
    ],
    caps: [
      ['lucide:audio-lines', 'Recover a usable M&E', 'Where no stem exists, dialogue separation reconstructs a music-and-effects bed from the full mix, making unlocalizable titles viable.'],
      ['lucide:users-round', 'Full cast separation', 'Diarization keeps each character on a distinct voice, so ensemble scenes remain followable.'],
      ['lucide:languages', '60+ territories', 'One master, every language you have distribution for, including the long-tail markets no studio would fund individually.'],
      ['lucide:film', 'Catalogue in batch', 'Process an entire library rather than negotiating a title at a time.'],
      ['lucide:subtitles', 'Broadcast-grade subtitles', 'Reading-speed, line-length and timing rules applied at generation, not remediated at QC.'],
      ['lucide:shield-check', 'Review before release', 'Transcript and translation are editable and approvable before any audio is generated.'],
    ],
    steps: [
      ['Deliver the master', 'With an M&E stem where you have one; separation covers the titles where you do not.'],
      ['Approve the script', 'Review the transcript and translation before generation — the cheapest point to fix anything.'],
      ['Cast the voices', 'Assign a voice per character, held consistent across every episode in a series.'],
      ['Deliver to spec', 'Loudness, channel layout and subtitle format matched to each platform.'],
    ],
    outputs: ['Dubbed masters', 'M&E reconstruction', 'Translated subtitles', 'Accessibility captions', 'Dialogue lists', 'Transcripts'],
    faq: [
      ['Can this replace studio dubbing for a flagship feature?', 'Honestly, no — and we would rather say so. Premium scripted drama where the dub is itself a creative work, and comedy where timing is the product, remain studio jobs. The clear wins are factual, documentary, educational, archive and secondary-language service, which is where most catalogue volume and almost none of the current budget sits.'],
      ['What if a title has no music and effects stem?', 'Dialogue separation reconstructs a usable bed from the full mix. It is an estimate rather than a recovered stem, and a supervising mixer will hear the difference on a dense feature mix. For a factual series from 2011 that will otherwise never be localized, it is the difference between an asset and a dead file.'],
      ['Does it handle ensemble casts and overlapping dialogue?', 'Distinct speakers are separated and voiced individually, and that works well for structured dialogue. Sustained overlapping speech is genuinely hard in any workflow — for those titles subtitles often produce a better viewer experience than a dub, regardless of budget.'],
      ['Can you meet broadcast delivery specifications?', 'Audio is normalised to the applicable loudness and true-peak targets and subtitles are generated against reading-speed and line-length rules rather than remediated afterwards. Confirm the exact profile per channel — requirements differ by market and delivery chain.'],
    ],
    reads: [
      ['How Movies Get Dubbed', '/blog/how-movies-get-dubbed'],
      ['Broadcast Video Localization', '/blog/broadcast-video-localization'],
      ['How Lip Sync Dubbing Works', '/blog/how-lip-sync-dubbing-works'],
    ],
    closeH2: 'Light up the catalogue you already own.',
    closeP: 'Start with archive titles in one territory. No deadline pressure, and the clearest commercial case you have.',
  },

  {
    slug: 'documentary',
    nav: 'Documentary Teams',
    title: 'Octavia for Documentary Teams — Localize Narration and Field Interviews',
    description: 'Dub narration, keep location atmosphere, and subtitle contributors — in 60+ languages.',
    eyebrow: 'For documentary teams',
    h1: 'The film travels. <em>The subjects should still sound like themselves.</em>',
    lede: 'Documentary has a split problem: scripted narration localizes cleanly, and field interviews carry a person’s testimony that should not be casually replaced. Octavia handles both, differently and deliberately.',
    pains: [
      ['Atmosphere is half the film', 'Replace the whole audio track and the location, the weather and the room all disappear with it.'],
      ['Field audio is unforgiving', 'Interviews recorded in wind, traffic and crowds are exactly where automated workflows usually fall apart.'],
      ['Festival and broadcast versions multiply', 'Every territory wants a different combination of dubbed narration, subtitles and accessibility captions.'],
    ],
    caps: [
      ['lucide:wind', 'Location sound survives', 'Dialogue separation replaces narration while the ambience, score and field recording stay in place.'],
      ['lucide:message-square', 'Subtitle the people, dub the narrator', 'The pattern most documentaries want: contributors keep their real voices, the narration carries the film.'],
      ['lucide:users', 'Multiple contributors separated', 'Diarization keeps each interviewee distinct across a feature-length edit.'],
      ['lucide:file-text', 'Transcripts for the whole rushes library', 'Searchable text across archive and interview material, which is a research tool as much as a delivery format.'],
      ['lucide:badge-check', 'Accuracy you can check', 'Review transcript and translation before generation, which matters when a contributor’s words carry weight.'],
      ['lucide:accessibility', 'Accessibility versions', 'Same-language captions and transcripts alongside translated subtitles, per language.'],
    ],
    steps: [
      ['Bring the locked cut', 'Plus stems if the mix has them; separation covers the archive material that does not.'],
      ['Split narration from testimony', 'Decide per element what gets dubbed and what stays subtitled.'],
      ['Verify the words', 'Contributor speech is checked against source before anything is generated.'],
      ['Deliver every version', 'Dubbed narration, subtitle tracks and accessibility captions per territory.'],
    ],
    outputs: ['Dubbed narration', 'Translated subtitles', 'Accessibility captions', 'Transcripts', 'Dialogue lists', 'Audio description script'],
    faq: [
      ['Should contributors be dubbed or subtitled?', 'Subtitled, in most cases. A synthetic version of a real person’s voice speaking translated words is a meaningful step beyond what most release forms contemplate, and audiences read testimony as more credible in the speaker’s own voice. The common pattern is to dub narration and subtitle the people.'],
      ['Will the location audio survive?', 'Yes, where the workflow separates dialogue from everything else rather than replacing the full mix. This matters more in documentary than almost any genre, because ambience is doing narrative work rather than sitting behind it.'],
      ['How well does it handle poor field audio?', 'Output quality is bounded by input quality, and heavy wind, crowd noise or overlapping speech will degrade results in any workflow. Run a two-minute sample through transcription before committing — if the sample is broadly accurate, the film is fine; if it is largely wrong, subtitles from a manual transcript are the realistic route.'],
      ['Can we get accessibility versions in each language?', 'Yes, and they are a separate deliverable from translated subtitles. Accessibility captions carry speaker identification and non-speech audio information, and the requirement applies to each language version — a Spanish dub needs Spanish captions too.'],
    ],
    reads: [
      ['AI Dubbing for Documentaries', '/blog/ai-dubbing-for-documentaries'],
      ['Documentary Dubbing with AI', '/blog/documentary-dubbing-ai'],
      ['Audio Description and Translation', '/blog/audio-description-and-translation'],
    ],
    closeH2: 'Take the film further than the festival circuit.',
    closeP: 'Start with narration in two languages and keep every contributor exactly as they were recorded.',
  },

  {
    slug: 'podcasters',
    nav: 'Podcasters',
    title: 'Octavia for Podcasters — Turn One Show into Feeds in 60+ Languages',
    description: 'Localize episodes and back catalogue with host voices preserved and each speaker kept distinct.',
    eyebrow: 'For podcasters',
    h1: 'Podcasting is intimate. <em>That should survive translation.</em>',
    lede: 'People follow a podcast because of a voice. Octavia carries that voice into other languages and keeps every speaker distinct, so a translated episode still plays as a conversation rather than a summary.',
    pains: [
      ['Eight episodes is not a feed', 'Listeners who discover a show with a handful of episodes have nothing to build a habit around.'],
      ['Interviews collapse into one voice', 'Without real speaker separation, a two-hander becomes one narrator arguing with itself.'],
      ['Ads are baked to one market', 'Episodes with host-read spots in the source language are commercially useless everywhere else.'],
    ],
    caps: [
      ['lucide:mic', 'Host voices carried over', 'The parasocial connection that drives podcast retention is preserved rather than replaced by a stranger.'],
      ['lucide:users', 'Every speaker separated', 'Diarization keeps hosts, co-hosts and guests on distinct voices across long unscripted episodes.'],
      ['lucide:rss', 'A real feed per language', 'Separate output per language so each show can be discovered by listeners browsing in their own language.'],
      ['lucide:library', 'Back catalogue first', 'Batch-process hundreds of episodes so a new-language feed launches as a library rather than a stub.'],
      ['lucide:file-text', 'Transcripts and show notes', 'Per-language transcripts, which are the main way podcast content gets found in search.'],
      ['lucide:scissors', 'Clip-ready captions', 'Styled captions for the short social cuts that actually drive discovery.'],
    ],
    steps: [
      ['Send the episodes', 'Ideally with separate tracks per speaker, which makes separation trivial.'],
      ['Confirm who is who', 'Speaker labels are checked once and reused across the series.'],
      ['Localize the archive', 'Build depth first, then keep pace with the weekly release.'],
      ['Publish per language', 'Audio, transcripts and captioned clips per feed.'],
    ],
    outputs: ['Dubbed episodes', 'Per-language feeds', 'Transcripts', 'Show notes', 'Social captions', 'Video versions'],
    faq: [
      ['Do I need my guests’ permission?', 'This is the most commonly overlooked issue in podcast localization. A standard guest release usually covers distributing the recording, not synthesising the guest’s voice speaking translated words. Update your release language going forward, and for back catalogue consider dubbing the host and subtitling or re-voicing guests instead.'],
      ['What if we record on one microphone in a room?', 'That is the hardest case. Speaker separation depends on acoustic distinction, and a single shared mic with overlapping speech limits how good any dub can be. If you record anything you might localize later, separate tracks per speaker is the single highest-value change you can make.'],
      ['How do we handle host-read ads?', 'Set up dynamic insertion before launching a localized feed. Baked-in source-market ads make episodes commercially worthless elsewhere, and dynamic insertion also keeps back catalogue monetisable indefinitely. Host-read spots in the localized voice are a distinct premium product you can sell.'],
      ['Should each language be its own feed?', 'Yes. A separate feed per language gets its own directory listing, its own subscribers and its own rankings. Multi-language tracks inside one feed are poorly supported and effectively hide the localized version from the listeners it was made for.'],
    ],
    reads: [
      ['How to Translate a Podcast', '/blog/how-to-translate-a-podcast'],
      ['Podcast Network Localization', '/blog/podcast-network-localization'],
      ['Speaker Diarization Explained', '/blog/speaker-diarization-explained'],
    ],
    closeH2: 'Launch a feed, not a fragment.',
    closeP: 'Localize enough back catalogue to be worth subscribing to, then keep pace weekly.',
  },

  {
    slug: 'gaming',
    nav: 'Game Studios',
    title: 'Octavia for Game Studios — Localize Trailers, Cinematics and Community Video',
    description: 'Dub trailers, cinematics, dev diaries and tutorials in 60+ languages without touching the build.',
    eyebrow: 'For game studios',
    h1: 'Players are everywhere. <em>Your video is not.</em>',
    lede: 'Games ship globally on day one while the video around them — trailers, cinematics, dev diaries, tutorials, community updates — usually ships in one language. Octavia localizes all of it without touching the build.',
    pains: [
      ['Launch beats localization', 'Trailer cycles move in days. A localized asset that lands a fortnight later has missed the moment entirely.'],
      ['Community content never gets localized', 'Dev diaries and patch videos are high-volume and high-affinity, and almost always English-only.'],
      ['Tutorials are where players churn', 'A player who cannot follow onboarding in their own language is a player who refunds.'],
    ],
    caps: [
      ['lucide:swords', 'Cinematics keep their score', 'Dialogue separation preserves the music and sound design that carry a trailer.'],
      ['lucide:users', 'Multi-character dialogue', 'Distinct voices per character across cinematics and narrative content.'],
      ['lucide:zap', 'Fast enough for a beat', 'Turnaround that fits a marketing calendar rather than a localization vendor’s queue.'],
      ['lucide:book-open', 'Tutorials that reduce churn', 'Onboarding and how-to video in the languages your players actually play in.'],
      ['lucide:subtitles', 'Styled captions for socials', 'Word-level captions for the muted feeds where trailers get discovered.'],
      ['lucide:code', 'API and batch', 'Programmatic submission for studios shipping content continuously rather than per release.'],
    ],
    steps: [
      ['Send the cut', 'Trailer, cinematic, dev diary or tutorial — the finished export is enough.'],
      ['Lock the glossary', 'Character names, item names, ability names and UI strings pinned to match the localized build.'],
      ['Generate per market', 'Dubbed audio and subtitle tracks in the languages your player base uses.'],
      ['Ship everywhere', 'Store pages, storefront trailers, socials and community channels.'],
    ],
    outputs: ['Dubbed trailers', 'Cinematic dubs', 'Dev diary dubs', 'Translated subtitles', 'Social captions', 'Transcripts'],
    faq: [
      ['Does this localize the game itself?', 'No. Octavia localizes video and audio — trailers, cinematics, dev diaries, tutorials, community and support content. In-game text and voice lines are a separate pipeline. What matters is that the video terminology matches the localized build, which is why the glossary should come from whoever localized the game.'],
      ['Can terminology stay consistent with the shipped build?', 'Yes, and it should be sourced rather than invented. Load character, item, ability and UI names from the game’s own localization so a tutorial never calls something differently from the menu the player is looking at.'],
      ['What about long unscripted dev diaries?', 'They localize well when audio is clean and turn-taking is reasonably structured. Two developers talking over each other on a shared microphone is the hard case — separate tracks per speaker at capture makes an enormous difference to what is achievable later.'],
      ['Which languages should a studio start with?', 'Follow your own telemetry rather than general market size. Player language settings, storefront traffic and support ticket languages tell you exactly where comprehension is currently costing you, which is usually not the list a marketing plan would guess.'],
    ],
    reads: [
      ['Gaming Video Localization', '/blog/gaming-video-localization'],
      ['Video Translation API Guide', '/blog/video-translation-api-guide'],
      ['Choosing Languages to Localize', '/blog/choosing-languages-to-localize'],
    ],
    closeH2: 'Ship the video as globally as the game.',
    closeP: 'Start with the launch trailer and the first hour of onboarding, in the languages your players already play in.',
  },

  {
    slug: 'educators',
    nav: 'Educators & Trainers',
    title: 'Octavia for Educators & Trainers — Teach in Every Learner’s Language',
    description: 'Localize courses, lectures and training in 60+ languages with terminology kept exact.',
    eyebrow: 'For educators & trainers',
    h1: 'Comprehension is the product. <em>Language is the gate.</em>',
    lede: 'A learner who follows seventy percent of a lesson has not learned it. Octavia localizes courses, lectures and training so the teaching lands, while keeping the technical vocabulary learners need to work professionally.',
    pains: [
      ['Second-language learning is slower', 'Learners working in a second language carry a cognitive tax that shows up as drop-off, not as complaints.'],
      ['Translating the terms breaks the skill', 'Render code, commands or clinical terms into the learner’s language and they cannot read the documentation afterwards.'],
      ['Courses go stale in every language at once', 'One update to the source leaves every localized version quietly wrong.'],
    ],
    caps: [
      ['lucide:graduation-cap', 'Explain in their language', 'Concepts and reasoning translated, so the teaching is actually understood rather than decoded.'],
      ['lucide:code', 'Keep the terms they need', 'Code, commands, error strings and technical vocabulary pass through untranslated so learners can still use the real tools.'],
      ['lucide:gauge', 'Paced for learning', 'Natural timing rather than compressed speech, which matters when a learner is reading a slide while listening.'],
      ['lucide:file-text', 'Transcripts as study aids', 'Per-language transcripts for review, search and accessibility.'],
      ['lucide:layers', 'Whole course in batch', 'Process an entire course at once so terminology and voice stay consistent module to module.'],
      ['lucide:refresh-cw', 'Update once, propagate', 'Change the source and every language version flags for refresh rather than drifting silently.'],
    ],
    steps: [
      ['Upload the course', 'Whole modules at a time, so terminology and voice stay consistent.'],
      ['Set the glossary', 'Decide what is translated and what stays in the source language — the decision that defines quality here.'],
      ['Review and generate', 'Approve the translation before audio, then produce every language together.'],
      ['Publish to your platform', 'Audio, subtitles and transcripts for your LMS or marketplace.'],
    ],
    outputs: ['Dubbed lessons', 'Translated subtitles', 'Accessibility captions', 'Transcripts', 'Study notes', 'Assessment text'],
    faq: [
      ['Should technical terms be translated?', 'No — translate the explanation and keep the term. Learners need the source-language vocabulary to read documentation, search for errors and work professionally. Introduce each term with a plain description in their language on first use, then use the source term consistently. A locked glossary is what makes this reliable rather than accidental.'],
      ['What happens to code and error messages on screen?', 'They stay exactly as they are. Code, commands, file paths and error strings must match what the learner sees on screen and will meet in practice, so they are pinned rather than translated. This needs configuring explicitly — an unconstrained pass will render them as prose.'],
      ['Is dubbed content enough, or do we need local instructors?', 'For recorded content, localization does the heavy lifting. What it does not solve is the learner who wants to ask a question. Localized recordings plus a teaching assistant who speaks the language delivers most of the outcome benefit — learners disengage when they cannot be understood, more than when a recording is imperfect.'],
      ['How do we keep localized courses current?', 'Version the source transcript as the authoritative artefact so every language flags stale when it changes, batch updates at a cohort or release boundary, and segment volatile tool walkthroughs away from stable fundamentals so a UI change re-localizes a clip rather than a module.'],
    ],
    reads: [
      ['Course Translation Software Guide', '/blog/course-translation-software-guide'],
      ['Bootcamp and Certification Course Localization', '/blog/bootcamp-course-localization'],
      ['eLearning Translation Guide', '/blog/elearning-translation-guide'],
    ],
    closeH2: 'Teach the learner, not the language barrier.',
    closeP: 'Start with the module where your drop-off is worst. That is usually where comprehension is the cause.',
  },

  {
    slug: 'enterprise',
    nav: 'Enterprise Teams',
    title: 'Octavia for Enterprise Teams — Localize Training and Comms at Scale',
    description: 'Training, onboarding and internal communication in 60+ languages, with SSO, roles and no training on your data.',
    eyebrow: 'For enterprise teams',
    h1: 'Every employee got the message. <em>Not every employee understood it.</em>',
    lede: 'Mandatory training completed in a second language is attendance, not comprehension. Octavia localizes training, onboarding and internal communication at volume, under the controls a security review expects.',
    pains: [
      ['Completion is not comprehension', 'A signature sheet proves a video was played, not that the instruction landed.'],
      ['Volume defeats vendor pricing', 'Per-minute agency rates mean most internal content is never localized at all.'],
      ['Content is sensitive', 'Pre-announcement material and real case examples cannot go just anywhere.'],
    ],
    caps: [
      ['lucide:building-2', 'Workspaces and roles', 'Separate workspaces with role-based access, so teams and regions do not share a namespace.'],
      ['lucide:shield-check', 'Built for procurement', 'SSO, encryption in transit and at rest, configurable retention, and content that is not used to train models.'],
      ['lucide:book-marked', 'Terminology governance', 'One approved glossary applied everywhere, so a policy or system name never renders two different ways.'],
      ['lucide:layers', 'Batch and API', 'Programmatic submission for libraries measured in hundreds of hours rather than single assets.'],
      ['lucide:badge-check', 'Review before release', 'Transcript and translation approved before generation, with the artefacts an audit expects.'],
      ['lucide:accessibility', 'Accessibility per language', 'Captions and transcripts alongside translated audio, in each language you publish.'],
    ],
    steps: [
      ['Connect the library', 'Upload or submit programmatically from the systems you already use.'],
      ['Apply the glossary', 'Approved terminology, product names and regulated phrasing pinned across every job.'],
      ['Route for review', 'In-market reviewers approve text before any audio is generated.'],
      ['Distribute and evidence', 'Deliver to your LMS and record what was delivered, in which language, to whom.'],
    ],
    outputs: ['Dubbed training', 'Translated subtitles', 'Accessibility captions', 'Transcripts', 'Assessment text', 'SCORM-ready audio'],
    faq: [
      ['Is our content used to train models?', 'No. That position is documented rather than verbal, which is what a security review will ask for. Alongside it: configurable retention, encryption in transit and at rest, role-based access with single sign-on, and a defined processing region where you require one.'],
      ['How do we prove comprehension rather than completion?', 'Record the language of delivery in the training record, assess in the language of instruction rather than the source language, and revalidate assessment items per language — translation can make a distractor obviously wrong or accidentally correct. In an investigation the question is whether that individual received comprehensible instruction.'],
      ['Can this handle a library of several hundred hours?', 'Yes, through batch processing and API submission. The practical constraint at that scale is rarely processing — it is review capacity, terminology maturity and versioning. Expect review effort per hour to fall substantially as the glossary matures.'],
      ['What should we localize first?', 'Internal training, onboarding and safety content. It carries real volume, has no external brand exposure, and its effect is measurable in completion rates, assessment scores and incident data. Regulated customer-facing material should come last, once terminology and review are proven.'],
    ],
    reads: [
      ['Enterprise Video Localization', '/blog/enterprise-video-localization'],
      ['Localize Employee Training Videos', '/blog/localize-employee-training-videos'],
      ['Video Translation Security and Privacy', '/blog/video-translation-security-and-privacy'],
    ],
    closeH2: 'Say it once. Have it understood everywhere.',
    closeP: 'Start with the training that carries the most risk if it is misunderstood.',
  },
];

const esc = (s) => String(s).replace(/&(?!#?\w+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function content(a) {
  const siblings = AUDIENCES.map((o) => `        <a class="oc-a-sibling" href="/for/${o.slug}"${o.slug === a.slug ? ' aria-current="page"' : ''}>${esc(o.nav)}</a>`).join('\n');

  return `<div class="oc-a">

    <section class="oc-a-hero">
      <div class="oc-a-wrap">
        <p class="oc-a-eyebrow"><iconify-icon icon="lucide:sparkles" width="13" aria-hidden="true"></iconify-icon>${esc(a.eyebrow)}</p>
        <h1>${a.h1}</h1>
        <p class="oc-a-lede">${esc(a.lede)}</p>
        <div class="oc-a-cta">
          <a class="oc-a-btn oc-a-btn-primary" href="https://app.octavia.lunartech.ai/signup">Start free<iconify-icon icon="lucide:arrow-right" width="15" aria-hidden="true"></iconify-icon></a>
          <a class="oc-a-btn oc-a-btn-ghost" href="/pricing">See pricing</a>
        </div>
      </div>
    </section>

    <section class="oc-a-sec">
      <div class="oc-a-wrap">
        <h2>What gets in the way</h2>
        <p class="oc-a-sec-lede">The specific reasons this content usually stays in one language.</p>
        <div class="oc-a-pains">
${a.pains.map(([h, p]) => `          <div class="oc-a-pain"><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('\n')}
        </div>
      </div>
    </section>

    <section class="oc-a-sec">
      <div class="oc-a-wrap">
        <h2>What Octavia does about it</h2>
        <p class="oc-a-sec-lede">The capabilities that matter for this work, rather than the full feature list.</p>
        <div class="oc-a-caps">
${a.caps.map(([icon, h, p]) => `          <div class="oc-a-cap"><iconify-icon icon="${icon}" width="22" aria-hidden="true"></iconify-icon><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('\n')}
        </div>
      </div>
    </section>

    <section class="oc-a-sec">
      <div class="oc-a-wrap">
        <h2>How it runs</h2>
        <p class="oc-a-sec-lede">Four steps from the file you already have to every language you need.</p>
        <div class="oc-a-steps">
${a.steps.map(([h, p]) => `          <div class="oc-a-step"><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('\n')}
        </div>
      </div>
    </section>

    <section class="oc-a-sec">
      <div class="oc-a-wrap">
        <h2>What you get back</h2>
        <p class="oc-a-sec-lede">One upload, every output format you need to publish.</p>
        <div class="oc-a-outputs">
${a.outputs.map((o) => `          <span class="oc-a-output">${esc(o)}</span>`).join('\n')}
        </div>
      </div>
    </section>

    <section class="oc-a-sec">
      <div class="oc-a-wrap">
        <h2>Questions worth asking</h2>
        <p class="oc-a-sec-lede">Including the ones where the honest answer is a limitation.</p>
        <div class="oc-a-faq">
${a.faq.map(([q, ans]) => `          <details><summary>${esc(q)}</summary><p>${esc(ans)}</p></details>`).join('\n')}
        </div>
      </div>
    </section>

    <section class="oc-a-sec">
      <div class="oc-a-wrap">
        <h2>Go deeper</h2>
        <p class="oc-a-sec-lede">Practical guides from the Octavia editorial team.</p>
        <div class="oc-a-reads">
${a.reads.map(([label, href]) => `          <a class="oc-a-read" href="${href}"><span>${esc(label)}</span><iconify-icon icon="lucide:arrow-up-right" width="16" aria-hidden="true"></iconify-icon></a>`).join('\n')}
        </div>
      </div>
    </section>

    <section class="oc-a-sec">
      <div class="oc-a-wrap">
        <h2>Who else uses Octavia</h2>
        <p class="oc-a-sec-lede">The same engine, pointed at a different kind of work.</p>
        <div class="oc-a-siblings">
${siblings}
        </div>
      </div>
    </section>

    <section class="oc-a-close">
      <div class="oc-a-wrap">
        <h2>${esc(a.closeH2)}</h2>
        <p>${esc(a.closeP)}</p>
        <div class="oc-a-cta">
          <a class="oc-a-btn oc-a-btn-primary" href="https://app.octavia.lunartech.ai/signup">Start free<iconify-icon icon="lucide:arrow-right" width="15" aria-hidden="true"></iconify-icon></a>
          <a class="oc-a-btn oc-a-btn-ghost" href="/contact">Talk to us</a>
        </div>
      </div>
    </section>

  </div>

  `;
}

// --- shell -----------------------------------------------------------------

const src = fs.readFileSync(TEMPLATE, 'utf8');
const mainAt = src.indexOf('<main');
const footAt = src.indexOf('<footer class="oc-foot">');
if (mainAt === -1 || footAt === -1) { console.error('Could not locate shell boundaries in the template page.'); process.exit(1); }

const shellTop = src.slice(0, mainAt);
const shellBottom = src.slice(footAt);

fs.mkdirSync(OUT_DIR, { recursive: true });

for (const a of AUDIENCES) {
  const canonical = `${SITE}/for/${a.slug}`;
  let head = shellTop
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(a.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(a.description)}">`);

  // These pages carry canonical and Open Graph tags; the older marketing pages do not.
  const seo = [
    `  <link rel="canonical" href="${canonical}">`,
    `  <meta property="og:type" content="website">`,
    `  <meta property="og:url" content="${canonical}">`,
    `  <meta property="og:title" content="${esc(a.title)}">`,
    `  <meta property="og:description" content="${esc(a.description)}">`,
    `  <meta name="twitter:card" content="summary_large_image">`,
    `  <meta name="twitter:title" content="${esc(a.title)}">`,
    `  <meta name="twitter:description" content="${esc(a.description)}">`,
    `  <link rel="stylesheet" href="../assets/octavia-audience.css?v=1">`,
  ].join('\n');
  head = head.replace('</head>', `${seo}\n</head>`);

  fs.writeFileSync(path.join(OUT_DIR, `${a.slug}.html`), head + content(a) + shellBottom);
  console.log(`wrote for/${a.slug}.html  — ${a.nav}`);
}

console.log(`\n${AUDIENCES.length} audience pages generated`);
