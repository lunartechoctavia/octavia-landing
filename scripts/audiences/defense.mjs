// /for/defense
export default {
  slug: 'defense',
  nav: 'Defense & Military',
  icon: 'lucide:shield',
  title: 'Octavia for Defense & Military — Training That Allied Forces Understand',
  description: 'Localize training, recorded briefings, recruitment and family communications in 60+ languages, with acronyms locked and every script reviewed before audio.',
  eyebrow: 'For defense & military',
  h1: 'Coalitions train together. <em>Not all of them in English.</em>',
  lede: 'Joint exercises and partner-force training run on a working language that many participants speak as a second or third. Octavia localizes the recorded side of that work — training video, pre-recorded briefings, recruitment and family communications — with acronyms pinned and every script reviewed before any audio is generated.',
  pains: [
    ['A working language is not fluency', 'Partner forces follow the slides and miss the qualifiers — the “unless”, the “only after” — that a safety or procedural brief depends on.'],
    ['Acronyms defeat generic translation', 'Defense writing is dense with acronyms, designations and doctrinal terms that a general-purpose translator expands, guesses at or renders three ways in one video.'],
    ['What may be uploaded comes first', 'Before quality, the question is releasability. Much of a training library is restricted, and the answer differs item by item, not programme by programme.'],
  ],
  caps: [
    ['lucide:book-marked', 'Acronyms and designations locked', 'A locked glossary keeps acronyms, equipment designations and doctrinal terms exactly as approved — left in the source language, or rendered one sanctioned way.'],
    ['lucide:layers', 'One master, every partner language', 'Each partner nation’s version is produced from the same approved master, with the same voice per language across a whole course, so versions do not drift apart.'],
    ['lucide:gauge', 'Paced for a demonstration', 'Natural timing rather than compressed speech, so a narrated procedure is not rushed past the step the instructor is demonstrating.'],
    ['lucide:users', 'Recorded briefings with many briefers', 'Diarization keeps each briefer distinct across a recorded brief or panel, so the translated version still shows who gave which instruction.'],
    ['lucide:badge-check', 'Partner linguists approve the text', 'Transcript and translation are reviewed by your own or partner-nation linguists before generation, where an error is cheapest to catch.'],
    ['lucide:heart-handshake', 'Families and recruitment', 'Family readiness, relocation and recruitment content in the languages spoken at home and in the communities you recruit from.'],
  ],
  steps: [
    ['Triage the library first', 'Decide item by item what is releasable to a commercial service. Everything else stays on the systems accredited for it.'],
    ['Build the acronym list', 'Acronyms, designations and doctrinal terms pinned, with the partner-nation equivalents your doctrine already agrees.'],
    ['Review with the people who use it', 'In-house or partner-nation linguists approve each language’s text before any audio exists.'],
    ['Deliver per audience', 'Dubbed training, subtitle tracks and transcripts for the unit, the family or the recruit who needs them.'],
  ],
  outputs: ['Dubbed training modules', 'Translated subtitles', 'Briefing transcripts', 'Translated transcripts', 'Accessibility captions', 'Recruitment versions'],
  faq: [
    ['Can Octavia run on a classified or air-gapped network?', 'Do not plan on it. Octavia is a hosted service and does not claim on-premises, air-gapped or classified-network deployment, or any defense accreditation. Classified and controlled material belongs only on systems accredited for it. For material releasable to a commercial service, the controls are encryption in transit and at rest, configurable retention, role-based access with SSO, no training on your content and a defined processing region — raise your requirements with us before uploading.'],
    ['Can we use a commander’s voice in the localized version?', 'Only with that person’s informed consent, for scripts they have approved in each language, and disclosed as synthetic. Never use a cloned voice to make anyone appear to say something they did not say. This is a tool for training and communication; it is not for deception, impersonation or influence operations. For most training, a professional synthetic voice per language avoids the question entirely.'],
    ['How does it cope with acronyms and doctrinal terms?', 'Only as well as the glossary you give it. Unconstrained, any translator will expand some acronyms, guess at others and render a doctrinal term differently from one module to the next. Build the list once — what stays in the source, what has an agreed partner-nation equivalent — lock it, and review the first modules closely. Spoken acronyms in noisy recordings are where transcription errs most, so check those first.'],
    ['Can it translate briefings as they happen?', 'Plan on recorded material only. Live briefings, planning conferences and anywhere a misunderstanding has operational consequences need human interpreters in the room. Octavia’s place is before and after: orientation and safety briefings localized ahead of an exercise, and recordings transcribed and subtitled afterwards for lessons learned and for partners who could not attend.'],
  ],
  reads: [
    ['Video Translation Security and Privacy', '/blog/video-translation-security-and-privacy'],
    ['Ethical Voice Cloning', '/blog/ethical-voice-cloning'],
    ['Building a Translation Glossary', '/blog/video-translation-glossary-building'],
  ],
  closeH2: 'Brief once. Be understood by every partner.',
  closeP: 'Start with a publicly releasable safety or orientation module that partner forces already struggle to follow.',
};
