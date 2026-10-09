// /for/journalists
export default {
  slug: 'journalists',
  nav: 'Journalists & Newsrooms',
  icon: 'lucide:newspaper',
  title: 'Octavia for Journalists & Newsrooms — Translate Footage, Verify Every Quote',
  description: 'Transcribe and translate foreign-language footage and interviews, subtitle sources in their own voices, and publish editions in 60+ languages.',
  eyebrow: 'For journalists & newsrooms',
  h1: 'A quote is a fact. <em>Its translation has to be one too.</em>',
  lede: 'Footage from a stringer, an interview recorded in the field, an edition for readers in another language — each carries the same risk: a translated quote the source never said. Octavia gives the desk a working transcript and translation to start from, and keeps every line open to checking against the recording before it runs.',
  pains: [
    ['Tape nobody on shift can follow', 'Raw footage, social uploads and press conference recordings sit unused because no one on the desk can tell what is being said, let alone what is quotable.'],
    ['Quotes drift with every hand-off', 'Each relay through a fixer, an agency wire and a sub-editor smooths a line a little further from the words the speaker actually used.'],
    ['Editions multiply, desks do not', 'A story published in three languages needs three sets of subtitles, captions and corrections, usually from the same small team.'],
  ],
  caps: [
    ['lucide:file-search', 'Know what is on the tape', 'Working transcripts and translations of incoming footage, so the desk can judge news value before committing a linguist’s time.'],
    ['lucide:quote', 'Quotes checked, not assumed', 'Every transcript and translation line is editable and approvable before export, so a quote is confirmed against the recording rather than taken on trust.'],
    ['lucide:subtitles', 'Subtitle the source, not a stand-in', 'Interviewees keep their own voices on screen, with translated subtitles built to reading-speed and line-length rules for mobile and broadcast.'],
    ['lucide:book-marked', 'Names spelled one way', 'A locked glossary for people, places, organisations and transliterations, so a minister’s name is not rendered three ways in three editions.'],
    ['lucide:users', 'Press conferences, speaker by speaker', 'Diarization separates the spokesperson from the questions on the floor, so attribution survives into the transcript.'],
    ['lucide:languages', 'Explainers in 60+ languages', 'Your own narrated packages and explainers voiced per language, with the ambient sound of the scene kept under the new narration.'],
  ],
  steps: [
    ['Ingest the tape', 'Upload footage, interviews or a press conference recording as it comes in.'],
    ['Pin the names', 'Add the people, places and organisations in the story to the glossary before translation runs.'],
    ['Verify every quote', 'Someone who speaks the language checks each quoted line against the source audio before approval.'],
    ['Publish per edition', 'Subtitled interviews, voiced explainers and transcripts for each edition, with any AI voicing disclosed.'],
  ],
  outputs: ['Working transcripts', 'Translated transcripts', 'Subtitled interviews', 'Voiced explainers', 'Social captions', 'Per-edition subtitles'],
  faq: [
    ['Can we run a quote straight from the machine translation?', 'No, and no careful desk should. Treat the machine translation as a working draft that tells you what is on the tape and where. Any line you put inside quotation marks should be checked against the source audio by someone who speaks the language, with the timecode noted in your verification record. A paraphrase you can stand behind is better than a quote you cannot.'],
    ['Should we dub interviewees in a synthetic version of their voice?', 'As a rule, no. Subtitles keep a person’s real voice, tone and hesitation, which are part of the record of what they said, and a cloned voice speaking translated words is a step few sources ever agreed to. Keep synthetic voices for your own narration and explainers — and tell audiences when a voice is AI-generated, in the piece itself and in your published standards.'],
    ['Is it safe to upload sensitive raw material?', 'Think before uploading anything, anywhere. Octavia encrypts content in transit and at rest, lets you set retention, restricts access by role, does not use customer content to train models, and can process in a defined region where you require one. None of that replaces source-protection judgement: footage that could identify a confidential source or an at-risk contributor may be better transcribed by a trusted colleague on a device you control.'],
    ['Can it translate a broadcast or press conference as it happens?', 'Treat it as a tool for recorded material, not live output — on-air translation as it happens is a job for a simultaneous interpreter. Octavia fits the minutes and hours after: the press conference recording, the statement posted online, the interview a correspondent files from the field. On a fast-moving story, a subtitled clip usually reaches audiences sooner than a voiced package, and is easier to correct.'],
  ],
  reads: [
    ['News Video Translation', '/blog/news-video-translation'],
    ['How to Translate a Video Interview', '/blog/interview-translation-guide'],
    ['Synthetic Voice Disclosure', '/blog/synthetic-voice-disclosure'],
  ],
  closeH2: 'Report the world in its own words.',
  closeP: 'Start with archived interviews you have already verified, and compare the transcript against what you know was said.',
};
