// /for/law-enforcement
export default {
  slug: 'law-enforcement',
  nav: 'Law Enforcement',
  icon: 'lucide:shield-user',
  title: 'Octavia for Law Enforcement — Training, Appeals and Outreach in 60+ Languages',
  description: 'Officer training, public appeals and community outreach in residents’ languages, plus draft transcripts of recorded media for triage — reviewed before use.',
  eyebrow: 'For law enforcement',
  h1: 'An appeal for witnesses <em>only works if witnesses understand it.</em>',
  lede: 'Public appeals, safety campaigns and community meetings mostly reach residents who already speak the agency’s language. Octavia localizes outreach and officer training into the languages your residents use, and turns foreign-language recordings into working-draft transcripts — with a clear line where a qualified human interpreter takes over.',
  pains: [
    ['Appeals miss the people they concern', 'A witness appeal or scam warning in one language skips the residents most likely to have seen something, or to have been targeted.'],
    ['Recordings queue for an interpreter', 'Foreign-language media in a case file can sit for weeks before anyone knows whether it matters, because every minute waits for a scarce linguist.'],
    ['Accuracy carries legal weight', 'A mistranslated statement can undermine a case, so many agencies avoid machine translation entirely — including where it would safely help.'],
  ],
  caps: [
    ['lucide:megaphone', 'Appeals in residents’ languages', 'Witness appeals, missing-person notices and fraud warnings subtitled and dubbed, with street and neighbourhood names pinned so nobody is sent to the wrong place.'],
    ['lucide:file-search', 'Draft transcripts for triage', 'Foreign-language interviews and recorded media transcribed and translated as a working draft, so investigators can see what needs a qualified linguist first.'],
    ['lucide:users', 'Interviews kept speaker by speaker', 'Diarization separates the officer, the interviewee and any interpreter on the recording, so the draft shows who said what.'],
    ['lucide:graduation-cap', 'Training in the officer’s language', 'Policy updates, procedure and scenario training localized for officers and civilian staff, with approved policy wording locked in the glossary.'],
    ['lucide:messages-square', 'Community meetings shared afterwards', 'Recorded town halls and community meetings subtitled into the languages of the residents who could not attend or could not follow.'],
    ['lucide:lock', 'Casework kept apart from outreach', 'Role-based workspaces with SSO keep investigative recordings to the case team, with encryption in transit and at rest and retention set to your policy.'],
  ],
  steps: [
    ['Separate outreach from casework', 'Public material and investigative recordings go to different workspaces, with different people and retention settings.'],
    ['Lock local and policy terms', 'Place names, agency names and approved policy wording pinned once.'],
    ['Put humans where it counts', 'Community reviewers for appeals; a qualified linguist for anything a case will rely on.'],
    ['Publish or hand over', 'Subtitled and dubbed outreach to the public; draft transcripts to investigators, marked as drafts.'],
  ],
  outputs: ['Subtitled appeals', 'Dubbed safety campaigns', 'Draft interview transcripts', 'Draft translations', 'Officer training modules', 'Accessibility captions'],
  faq: [
    ['Can the output be used as evidence?', 'Not as it stands. An AI transcript or translation is a working draft for triage — deciding what to prioritise and what to send to a linguist. Anything relied on as evidence, put to a suspect or witness, or used to advise someone of their rights needs a qualified human interpreter or translator, certified where your jurisdiction requires it. Label drafts as drafts so they are never mistaken for a verified translation.'],
    ['Can we upload case material?', 'Check before you do. Octavia does not claim CJIS compliance or any equivalent police-data certification, so raise your agency’s requirements with us and your information security lead before uploading anything from a case file. The controls available are encryption in transit and at rest, configurable retention, role-based access with SSO, customer content not used to train models, and a defined processing region where you require one.'],
    ['Can we use voice cloning on interview recordings?', 'No. Do not clone the voice of a suspect, victim or witness for any purpose. Translated interview material should stay as text — transcripts and subtitles — so the original recording remains the only version of that person’s voice. Voice preservation belongs on outreach, and only with the consent of the officer or official whose voice it is; many agencies use a disclosed professional synthetic voice per language instead.'],
    ['How reliable is it on body-worn camera and phone audio?', 'Less reliable than on clean audio, and you should expect that. Body-worn camera, phone and street recordings bring wind, sirens, crosstalk and distance from the microphone, and any transcription degrades with them. Dialect and code-switching add further error. Use the draft to find passages, not to settle what was said, and put anything contested in front of a qualified linguist with the original audio.'],
  ],
  reads: [
    ['Legal Video Translation', '/blog/legal-video-translation'],
    ['How to Translate a Video Interview', '/blog/interview-translation-guide'],
    ['Choosing Languages to Localize', '/blog/choosing-languages-to-localize'],
  ],
  closeH2: 'Be heard in every language on your beat.',
  closeP: 'Start with one recurring public-safety campaign in the two languages your call-takers hear most after your own.',
};
