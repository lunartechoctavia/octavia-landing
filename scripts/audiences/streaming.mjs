// /for/streaming
export default {
  slug: 'streaming',
  nav: 'Streaming & FAST Channels',
  icon: 'lucide:monitor-play',
  title: 'Octavia for Streaming & FAST Channels — Catalogue Depth in Every Territory',
  description: 'Localize library series and films at catalogue scale through batch and API, so each territory has depth and each FAST channel has hours to programme.',
  eyebrow: 'For streaming & FAST channels',
  h1: 'Available in every territory. <em>Watchable in a handful.</em>',
  lede: 'A service is judged in each territory by how much a viewer can actually watch in their own language, and a FAST channel by whether it can fill a day without looping. Octavia localizes library at the volume that arithmetic demands — submitted by batch or API, reviewed in proportion to risk, and repeatable title after title.',
  pains: [
    ['A thin catalogue reads as “not for us”', 'A dozen dubbed titles and a wall of subtitle-only library feels like a service built for somewhere else.'],
    ['A language channel needs hours', 'A new-language FAST channel has twenty-four hours a day to fill; with too few localized hours, the same episodes loop.'],
    ['Per-title procurement doesn’t scale', 'A quote, a schedule and a QC cycle per title is workable for twenty titles and unmanageable for two thousand.'],
  ],
  caps: [
    ['lucide:code-xml', 'Localization as a pipeline stage', 'Titles go in by API from your asset management or supply chain and outputs come back the same way, with no per-title project to run.'],
    ['lucide:map', 'Built territory by territory', 'Work down a ranked list per market — the series each territory looks for first — instead of spreading one title thinly across every language.'],
    ['lucide:speech', 'Unscripted formats hold together', 'Reality, food and true-crime series fill much of a FAST line-up and are crowded with speakers; diarization keeps each on a distinct voice.'],
    ['lucide:subtitles', 'Dub the head, subtitle the tail', 'Translated subtitles alone take a title from unavailable to watchable; dubs follow where viewing justifies them — one pipeline for both.'],
    ['lucide:list-checks', 'Review in proportion to risk', 'Transcripts and translations are editable before audio exists, so teams approve flagship titles line by line and sample the long tail.'],
    ['lucide:shield-check', 'Ready for a licensor’s questions', 'Encryption in transit and at rest, configurable retention, roles and no training on your content — what a content-security review asks first.'],
  ],
  steps: [
    ['Rank the catalogue per territory', 'Viewing and search data decide which titles get a dub, which get subtitles, and which wait.'],
    ['Connect the supply chain', 'Masters in by API or batch, with M&E stems where you have them and separation where you don’t.'],
    ['Set review depth by tier', 'Full script approval for flagship titles; sampled checks for the long tail.'],
    ['Package per destination', 'Your service, each FAST distributor and each device partner want different specs — check every batch against each.'],
  ],
  outputs: ['Dubbed audio tracks', 'Dubbed episodes', 'Translated subtitle tracks', 'Accessibility captions', 'Transcripts', 'Translated transcripts'],
  faq: [
    ['Should this replace studio dubbing for our originals?', 'No, and we would not pitch it that way. Tentpole originals and scripted drama where the performance is the product belong with a dubbing studio and a director. Octavia’s place is the long tail — library series, unscripted formats, documentary and older seasons — the hundreds of hours that will never get a studio budget in a given territory but decide whether its catalogue feels deep.'],
    ['Do our licences let us create dubbed versions?', 'Check before you batch anything. Acquisition deals often grant territory and window rights while reserving dubbing or versioning rights to the licensor, or require the licensor to approve each localized version. Owned and commissioned titles are simpler. Rights clearance is the one step in this pipeline that sits entirely with you.'],
    ['How many hours does a new-language FAST channel need?', 'There is no fixed number, but the failure is always the same: too few hours and episodes repeat within the day, which viewers notice quickly. Localize whole series and complete seasons rather than a sampler from many shows, because schedules are built from runs. Start with the genres that already perform on your source-language channels.'],
    ['Does Octavia localize titles, synopses and artwork?', 'No. Octavia produces the dubbed audio, subtitles and transcripts. Titles, synopses, keywords and key art are a separate metadata job, and they matter as much as the dub — a localized series that surfaces under an untranslated title in a territory’s search will rarely be found. Plan metadata and media as one release.'],
  ],
  reads: [
    ['Global Content Distribution', '/blog/global-content-distribution-guide'],
    ['Batch Video Translation', '/blog/video-translation-batch-workflow'],
    ['Localizing Video Metadata', '/blog/localizing-video-metadata'],
  ],
  closeH2: 'Give every territory a catalogue worth staying for.',
  closeP: 'Start with one territory and one genre that already performs there — complete seasons, not samplers.',
};
