// /for/legal
export default {
  slug: 'legal',
  nav: 'Courts & Legal',
  icon: 'lucide:scale',
  title: 'Octavia for Courts & Legal — First-Pass Review of Foreign-Language Recordings',
  description: 'Working transcripts and translations of depositions, recorded evidence and client video in 60+ languages, for review and triage — not certified translation.',
  eyebrow: 'For courts & legal teams',
  h1: 'Hundreds of hours of recordings. <em>A handful of minutes that matter.</em>',
  lede: 'Recorded interviews, depositions, voicemails and video evidence — in discovery, much of it arrives in a language nobody on the matter speaks. Octavia produces working transcripts and translations so the team can find what matters, then hand those passages to a certified translator or interpreter for anything a court will see.',
  pains: [
    ['Foreign-language productions sit unreviewed', 'Commissioning a qualified translator for every hour in a production is rarely proportionate, so material goes unread until a deadline forces the question.'],
    ['Multi-party recordings blur attribution', 'In a recorded meeting with several participants, a translation that does not track who said what is close to useless for review.'],
    ['Privileged material cannot go just anywhere', 'Client communications and work product carry confidentiality obligations that a consumer translation app was never built to respect.'],
  ],
  caps: [
    ['lucide:file-search', 'First-pass review in 60+ languages', 'Working transcripts and translations of recorded evidence, so reviewers can tag relevance and privilege before deciding what goes to a qualified translator.'],
    ['lucide:users', 'Who said what, kept straight', 'Diarization separates witnesses, counsel and interpreters in a recording, so the transcript follows each speaker rather than merging them into one block.'],
    ['lucide:book-marked', 'Defined terms stay defined', 'Party names, entities, products and defined terms locked in a glossary, so they render one way across every recording in the matter.'],
    ['lucide:subtitles', 'Back to the passage in seconds', 'Timecoded subtitle files tie each translated line to its point in the recording, so a reviewer can go straight to it and listen.'],
    ['lucide:lock', 'Controls for confidential matters', 'Encryption in transit and at rest, configurable retention, role-based access by workspace, and content that is not used to train models.'],
    ['lucide:message-square-text', 'Client explainers in their language', 'Process explainers, intake guidance and firm updates voiced or subtitled for clients who follow them best in another language.'],
  ],
  steps: [
    ['Set up the matter', 'One workspace per matter, with access limited to the people on it and retention set to your policy.'],
    ['Load the glossary', 'Parties, entities, places and defined terms pinned before the first recording is processed.'],
    ['Triage the recordings', 'Working transcripts and translations let the team flag what is relevant, privileged or worth a closer listen.'],
    ['Escalate what matters', 'Passages that will be relied on go to a certified translator or interpreter; the rest stays as review notes.'],
  ],
  outputs: ['Working transcripts', 'Translated transcripts', 'Speaker-separated text', 'Timecoded subtitle files', 'Translated subtitle tracks', 'Client explainer videos'],
  faq: [
    ['Is this a certified translation we can file?', 'No. Octavia produces working transcripts and translations; it does not certify them, and nothing it exports should be filed, served or relied on as a certified translation. Where a translation will go before a court or tribunal, or be relied on as evidence, use a qualified translator who can attest to it. The value comes earlier: knowing which twenty minutes of a forty-hour production need that work.'],
    ['Can it interpret at a hearing or deposition?', 'No. Proceedings need a qualified court interpreter, present or remote, who can be sworn, questioned and corrected on the record. Octavia works on recordings after the fact. It can help counsel prepare — reviewing a recorded prior statement before a deposition, for example — but it does not stand in for the interpreter, and its transcript is not a substitute for the official record.'],
    ['What about privilege and client confidentiality?', 'Treat it as you would any vendor that will hold client material, and review the data handling terms before uploading. Content is encrypted in transit and at rest, retention is configurable, customer content is not used to train models, access is controlled by role, and processing can stay in a defined region where a client requires it. Raise specific engagement or protective-order constraints with Octavia first, and keep restricted material on the systems that order permits.'],
    ['How far can we rely on it for review?', 'Far enough to find and prioritise material in clear recordings; less so with poor audio, strong dialect, slang, code-switching or crosstalk — the same conditions that trouble human transcribers. Have a fluent reviewer spot-check each type of recording early, and treat any passage a decision turns on as unverified until a qualified linguist has checked it against the audio.'],
  ],
  reads: [
    ['Legal Video Translation', '/blog/legal-video-translation'],
    ['Speaker Diarization Explained', '/blog/speaker-diarization-explained'],
    ['Video Translation Security and Privacy', '/blog/video-translation-security-and-privacy'],
  ],
  closeH2: 'Find the minutes that matter first.',
  closeP: 'Start with a closed matter: run its recordings through and compare the working translation with the professional one already on file.',
};
