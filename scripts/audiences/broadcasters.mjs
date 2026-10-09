// /for/broadcasters
export default {
  slug: 'broadcasters',
  nav: 'Broadcasters & TV Networks',
  icon: 'lucide:tv',
  title: 'Octavia for Broadcasters & TV Networks — Localize to the Transmission Schedule',
  description: 'Factual strands, news packages and archive in 60+ languages — subtitled, dubbed and captioned, sorted by how long you have until transmission.',
  eyebrow: 'For broadcasters & TV networks',
  h1: 'The transmission date is fixed. <em>Localization has to fit inside it.</em>',
  lede: 'A broadcaster cannot hold a slot while a dub catches up — a localized version that misses transmission has no value at all. Octavia works where the volume sits: factual strands, news packages and decades of archive, with a deliverable matched to how long you have before each one airs.',
  pains: [
    ['The vendor’s clock isn’t yours', 'A three-week dubbing quote is no use to a programme airing on Thursday — so most of the schedule stays in one language.'],
    ['The archive can’t be searched', 'Thousands of hours sit on tape and servers with no transcript, so nobody can find what is worth versioning.'],
    ['Files fail at QC, not at translation', 'A well-translated programme still bounces if the dialogue sits at the wrong loudness or a subtitle breaks the reading-speed limit.'],
  ],
  caps: [
    ['lucide:newspaper', 'Packages with every voice placed', 'Diarization separates anchor, correspondent and interviewees inside a two-minute package, so viewers can still tell who is speaking.'],
    ['lucide:archive', 'An archive you can search', 'Batch transcription makes the back catalogue findable by researchers, schedulers and clip sales before anyone decides what to version.'],
    ['lucide:volume-2', 'Studio formats keep their audience', 'Magic Mode lifts speech out of the mix, so audience reaction, stings and library music stay where the director put them.'],
    ['lucide:captions', 'Captions for each transmitted language', 'A second-language service brings its own access duties: same-language captions per language, produced separately from translated subtitles.'],
    ['lucide:spell-check', 'Spelt right in every bulletin', 'Custom vocabulary pins presenters, politicians, places and strand titles, so a minister’s name appears one way in every language.'],
    ['lucide:lock', 'Unaired content kept close', 'Unaired episodes sit in role-based workspaces, encrypted in transit and at rest, with configurable retention and no training on your content.'],
  ],
  steps: [
    ['Sort the schedule by time to air', 'Subtitles where hours count, a reviewed dub where days do, batch for the archive.'],
    ['Load what recurs', 'Presenter voices, regular names and programme titles set once per strand and reused every episode.'],
    ['Sign off the script', 'An editor approves the translation before any audio exists, when a compliance note is still a line edit.'],
    ['Check against the channel spec', 'Loudness, audio layout, frame rate and caption format confirmed per channel before playout.'],
  ],
  outputs: ['Dubbed programmes', 'Voiced news packages', 'Translated subtitles', 'Same-language captions', 'Archive transcripts', 'Translated transcripts'],
  faq: [
    ['Can it localize a live or simulcast feed?', 'No. Octavia works on recorded files, not live output, and we would not suggest building a simulcast around it — live programming needs live subtitling or interpretation. Where it fits is everything after transmission: the catch-up version, the repeat, the package re-cut for the next bulletin, and the factual strand that airs in a second language the following week.'],
    ['Will our playout and QC accept the files?', 'Test it rather than take it on trust. Send one representative programme through first and run it through your normal QC: loudness against the channel’s target, audio layout, frame rate and start timecode on the subtitles, and the caption format your chain ingests. Settle those once per channel and every later delivery is checked against the same list. A 25 versus 29.97 frame-rate mismatch is the classic source of drift.'],
    ['Should we clone our presenters’ voices?', 'Only with the presenter’s written agreement, scoped to languages, programmes and term, and with their agent involved where there is one — most talent contracts predate synthetic voices. Many networks use a consistent professional voice per language for presenters instead, and keep interviewees and members of the public subtitled: their release covered the broadcast, not a synthetic version of their voice.'],
    ['How does it cope with old archive audio?', 'Archive is where the clearest wins are and where source quality varies most. Tape hiss, mono mixes and music laid hard under narration all reduce transcription accuracy, and everything downstream inherits it. Sample a programme from each decade or format rather than just one, and expect some older material to be better served by subtitles from a corrected transcript than by a dub.'],
  ],
  reads: [
    ['Broadcast Video Localization', '/blog/broadcast-video-localization'],
    ['Audio Loudness Standards for Dubbing', '/blog/audio-loudness-standards-for-dubbing'],
    ['Dubbing Archival Footage', '/blog/dubbing-archival-footage'],
  ],
  closeH2: 'Put the archive back on air.',
  closeP: 'Start with one factual strand from the archive in one language — no transmission date at risk, and a cost per finished hour you can measure.',
};
