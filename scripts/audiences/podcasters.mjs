// /for/podcasters
export default {
  slug: 'podcasters',
  nav: 'Podcasters',
  icon: 'lucide:mic',
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
};
