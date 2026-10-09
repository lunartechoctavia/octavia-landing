// /for/osint
export default {
  slug: 'osint',
  nav: 'OSINT & Research Analysts',
  icon: 'lucide:scan-search',
  title: 'Octavia for OSINT & Research Analysts — Triage Foreign-Language Video',
  description: 'Transcribe and translate open-source video and audio in 60+ languages for triage and search, source kept alongside, with linguists verifying what matters.',
  eyebrow: 'For OSINT & research analysts',
  h1: 'Hours of footage arrived. <em>Nobody on the team speaks the language.</em>',
  lede: 'Open-source research runs on video and audio in languages the team does not speak, and linguist time is the scarcest resource it has. Octavia transcribes and translates at volume so analysts can search, triage and decide what deserves a linguist — with the source kept alongside every line, and nothing treated as verified until a person has checked it.',
  pains: [
    ['Linguists are the bottleneck', 'Every minute of foreign-language footage queues for the same few people, so most of it is never reviewed at all.'],
    ['Video cannot be searched', 'A name or a place mentioned forty minutes into a recording is invisible until someone sits through the forty minutes.'],
    ['Open-source audio is the hard case', 'Regional dialect, code-switching, slang, phone microphones and street noise — the opposite of what translation is usually tested on.'],
  ],
  caps: [
    ['lucide:file-search', 'Transcripts you can search', 'Source-language transcripts and translations into your working language make hours of footage searchable by name, place and phrase.'],
    ['lucide:columns-2', 'Source and translation side by side', 'You get the original-language transcript as well as the translation, both timecoded, so any line can be checked against the audio and quoted in the original.'],
    ['lucide:book-marked', 'One spelling per name', 'A locked glossary fixes how people, places and organisations are transliterated across languages and scripts, so one name does not become four search terms.'],
    ['lucide:users', 'Speakers kept apart', 'Diarization separates voices in interviews, panels and street recordings, so a translated line stays with the speaker who said it.'],
    ['lucide:layers', 'Volume through batch and API', 'Submit large sets of files programmatically and route the results into your own search and case tools, rather than uploading one file at a time.'],
    ['lucide:languages', 'A first pass across 60+ languages', 'One workflow across 60+ languages, so the decision about what needs a specialist linguist is made on content rather than guesswork.'],
  ],
  steps: [
    ['Check terms and law first', 'Confirm the platform’s terms and the privacy law that applies before bulk-downloading anyone’s content.'],
    ['Transcribe and translate in bulk', 'Batch or API submission across the set, with names and places pinned in the glossary.'],
    ['Search and triage', 'Analysts search the translated text, flag relevant passages and send those, with the original audio, to a linguist.'],
    ['Verify before it counts', 'Anything a finding, publication or decision rests on is checked by a human linguist against the source.'],
  ],
  outputs: ['Source-language transcripts', 'Translated transcripts', 'Source subtitle files', 'Translated subtitle files', 'Speaker-separated text', 'Subtitled review clips'],
  faq: [
    ['Can we rely on the translation for a finding?', 'Not on its own. Machine translation of unscripted open-source material is a triage tool: it tells you where to look and what to send to a linguist. Anything a published finding, an attribution or a decision rests on should be verified by a human linguist against the original audio, and quoted with the original-language text alongside. Treat the translation as a lead, not as the evidence.'],
    ['How does it handle dialect, slang and low-resource languages?', 'Unevenly, and you should plan for that. Accuracy is strongest on widely spoken standard varieties and clear audio, and falls with regional dialect, code-switching, in-group slang, background noise and languages with less training data. A fluent-looking translation can still be wrong. Sample each new source type with a linguist before trusting it at volume, and weight your triage accordingly.'],
    ['Are there limits on what we should run through it?', 'Yes. Use it on open-source material you are entitled to process, respecting platform terms, copyright and the privacy and data-protection law that covers the people in the footage — which often still applies when content is public. It is for researching public information, not for covert surveillance of individuals. Do not clone or synthesise the voice of anyone in the material; transcripts and subtitles are the right output.'],
    ['What happens to the material we upload?', 'Customer content is not used to train models, is encrypted in transit and at rest, and retention is configurable, so working copies need not outlive the project. Role-based workspaces keep one investigation’s material away from another team, and a defined processing region is available where you require one. If your work involves sensitive sources or legally restricted material, raise your requirements with us before uploading.'],
  ],
  reads: [
    ['Confidence Scores Explained', '/blog/translation-confidence-scores-explained'],
    ['Code-Switching in Video Translation', '/blog/code-switching-in-video-translation'],
    ['User-Generated Content Translation', '/blog/user-generated-content-translation'],
  ],
  closeH2: 'Spend linguist time where it matters.',
  closeP: 'Start with a backlog you already hold, transcribe it in one pass, and see how much of it your linguists actually needed to hear.',
};
