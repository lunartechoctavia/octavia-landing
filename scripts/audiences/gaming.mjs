// /for/gaming
export default {
  slug: 'gaming',
  nav: 'Game Studios',
  icon: 'lucide:gamepad-2',
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
};
