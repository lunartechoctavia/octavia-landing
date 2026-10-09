// /for/educators
export default {
  slug: 'educators',
  nav: 'Educators & Trainers',
  icon: 'lucide:graduation-cap',
  title: 'Octavia for Educators & Trainers — Teach in Every Learner’s Language',
  description: 'Localize courses, lectures and training in 60+ languages with terminology kept exact.',
  eyebrow: 'For educators & trainers',
  h1: 'Comprehension is the product. <em>Language is the gate.</em>',
  lede: 'A learner who follows seventy percent of a lesson has not learned it. Octavia localizes courses, lectures and training so the teaching lands, while keeping the technical vocabulary learners need to work professionally.',
  pains: [
    ['Second-language learning is slower', 'Learners working in a second language carry a cognitive tax that shows up as drop-off, not as complaints.'],
    ['Translating the terms breaks the skill', 'Render code, commands or clinical terms into the learner’s language and they cannot read the documentation afterwards.'],
    ['Courses go stale in every language at once', 'One update to the source leaves every localized version quietly wrong.'],
  ],
  caps: [
    ['lucide:graduation-cap', 'Explain in their language', 'Concepts and reasoning translated, so the teaching is actually understood rather than decoded.'],
    ['lucide:code', 'Keep the terms they need', 'Code, commands, error strings and technical vocabulary pass through untranslated so learners can still use the real tools.'],
    ['lucide:gauge', 'Paced for learning', 'Natural timing rather than compressed speech, which matters when a learner is reading a slide while listening.'],
    ['lucide:file-text', 'Transcripts as study aids', 'Per-language transcripts for review, search and accessibility.'],
    ['lucide:layers', 'Whole course in batch', 'Process an entire course at once so terminology and voice stay consistent module to module.'],
    ['lucide:refresh-cw', 'Update once, propagate', 'Change the source and every language version flags for refresh rather than drifting silently.'],
  ],
  steps: [
    ['Upload the course', 'Whole modules at a time, so terminology and voice stay consistent.'],
    ['Set the glossary', 'Decide what is translated and what stays in the source language — the decision that defines quality here.'],
    ['Review and generate', 'Approve the translation before audio, then produce every language together.'],
    ['Publish to your platform', 'Audio, subtitles and transcripts for your LMS or marketplace.'],
  ],
  outputs: ['Dubbed lessons', 'Translated subtitles', 'Accessibility captions', 'Transcripts', 'Study notes', 'Assessment text'],
  faq: [
    ['Should technical terms be translated?', 'No — translate the explanation and keep the term. Learners need the source-language vocabulary to read documentation, search for errors and work professionally. Introduce each term with a plain description in their language on first use, then use the source term consistently. A locked glossary is what makes this reliable rather than accidental.'],
    ['What happens to code and error messages on screen?', 'They stay exactly as they are. Code, commands, file paths and error strings must match what the learner sees on screen and will meet in practice, so they are pinned rather than translated. This needs configuring explicitly — an unconstrained pass will render them as prose.'],
    ['Is dubbed content enough, or do we need local instructors?', 'For recorded content, localization does the heavy lifting. What it does not solve is the learner who wants to ask a question. Localized recordings plus a teaching assistant who speaks the language delivers most of the outcome benefit — learners disengage when they cannot be understood, more than when a recording is imperfect.'],
    ['How do we keep localized courses current?', 'Version the source transcript as the authoritative artefact so every language flags stale when it changes, batch updates at a cohort or release boundary, and segment volatile tool walkthroughs away from stable fundamentals so a UI change re-localizes a clip rather than a module.'],
  ],
  reads: [
    ['Course Translation Software Guide', '/blog/course-translation-software-guide'],
    ['Bootcamp and Certification Course Localization', '/blog/bootcamp-course-localization'],
    ['eLearning Translation Guide', '/blog/elearning-translation-guide'],
  ],
  closeH2: 'Teach the learner, not the language barrier.',
  closeP: 'Start with the module where your drop-off is worst. That is usually where comprehension is the cause.',
};
