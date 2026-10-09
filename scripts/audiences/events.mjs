// /for/events
export default {
  slug: 'events',
  nav: 'Events & Conferences',
  icon: 'lucide:presentation',
  title: 'Octavia for Events & Conferences — Session Libraries in Every Language',
  description: 'Turn keynotes, panels and breakout recordings into a session library in your attendees’ languages after the event, with every panellist kept distinct.',
  eyebrow: 'For events & conferences',
  h1: 'The keynote was in English. <em>Much of the audience was not.</em>',
  lede: 'An event lasts a few days; its recordings are where much of the audience actually meets the content. Octavia turns keynotes, panels and breakouts into a session library in attendees’ languages once the event is over — every speaker kept distinct, and voiced in their own voice only where they have agreed to it.',
  pains: [
    ['The library stays in the stage language', 'Recordings go up in whatever language was spoken on stage, so the attendees who struggled in the room struggle again on replay.'],
    ['Panels are four people and a roaming mic', 'Moderators, interruptions and audience questions are exactly where automated workflows lose track of who said what.'],
    ['Speakers agreed to be filmed, not re-voiced', 'Most speaker agreements cover recording and distributing a talk — not a synthetic version of the speaker presenting it in another language.'],
  ],
  caps: [
    ['lucide:users', 'Every panellist on their own voice', 'Diarization separates moderator, panellists and audience questions, so a dubbed panel still plays as a discussion rather than a monologue.'],
    ['lucide:subtitles', 'Subtitles across the whole programme', 'Translated subtitle tracks for every session, with reading-speed and line-length rules applied — the economical way to make the full library usable in each language.'],
    ['lucide:mic', 'Keynotes in the speaker’s voice, with consent', 'Where a speaker agrees, their voice carries into the translated version under their control; otherwise a professional voice per language, or subtitles alone.'],
    ['lucide:tag', 'Sponsor and speaker names held', 'Sponsors, speakers, product names and session titles pinned in a glossary, so the partner who paid for the stage is named correctly in every language.'],
    ['lucide:layout-grid', 'Every track in one batch', 'Submit every breakout from every track together, so the library launches complete in each language instead of trickling out over months.'],
    ['lucide:audio-lines', 'The room stays in the recording', 'Magic Mode separates speech from applause, walk-on music and room tone, so a dubbed session still sounds as if it happened in front of an audience.'],
  ],
  steps: [
    ['Collect recordings and releases', 'Session files, plus a list of which speakers agreed to voice translation and which are subtitled only.'],
    ['Load the event glossary', 'Sponsor names, speaker names, product names and session titles, pinned before translation.'],
    ['Prioritise the sessions', 'Dub the keynotes and most-watched tracks; subtitle the long tail across the board.'],
    ['Publish the library', 'Dubbed sessions, subtitle tracks and transcripts per language on the event platform or channel.'],
  ],
  outputs: ['Dubbed keynotes', 'Subtitled breakouts', 'Dubbed panel sessions', 'Translated transcripts', 'Captioned highlight clips', 'Subtitle tracks per session'],
  faq: [
    ['Can it translate the event live?', 'No. Octavia works on recordings, after the session has happened. For people in the room or watching the stream, you still need simultaneous interpreters or a live captioning service. Where Octavia helps is everything afterwards: the session library, the highlight clips and the on-demand catalogue that attendees and non-attendees rely on long after the event. Plan the two as separate budget lines.'],
    ['Do we need speakers’ permission to dub them?', 'To voice them in their own voice, yes — and most standard speaker agreements do not cover it, because they were written for filming and distribution. Add a clear, optional clause to next year’s speaker agreement. For this year’s recordings, voice the speakers who say yes and subtitle the rest; a subtitled keynote is still a perfectly good keynote.'],
    ['How does it cope with panels and audience Q&A?', 'Structured panels with a moderator and individual microphones work well: each speaker is separated and voiced on their own. Two things degrade results, as they would in any workflow — sustained crosstalk, and audience questions picked up only by a distant room mic. A question that is inaudible on the recording cannot be translated reliably, so have moderators repeat questions on mic.'],
    ['What about accents, jargon and slide-heavy talks?', 'Non-native speech, strong accents and dense jargon all lower transcription accuracy, and an error in the transcript carries into every language. That is why the transcript is reviewed before translation: fix names, terms and misheard phrases once in the source and every language benefits. Octavia does not translate text on slides, so slide-heavy sessions need their decks localized separately.'],
  ],
  reads: [
    ['Conference and Event Video Translation', '/blog/conference-video-translation'],
    ['Dubbing Panels and Roundtables', '/blog/dubbing-multi-speaker-panels'],
    ['Repurposing Translated Video Into Clips', '/blog/repurposing-translated-video-into-clips'],
  ],
  closeH2: 'Let the session library outlast the event.',
  closeP: 'Start with last year’s three most-watched sessions, in the language your registrations show growing fastest.',
};
