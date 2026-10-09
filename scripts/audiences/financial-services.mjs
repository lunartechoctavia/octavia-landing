// /for/financial-services
export default {
  slug: 'financial-services',
  nav: 'Financial Services',
  icon: 'lucide:chart-candlestick',
  title: 'Octavia for Financial Services — Investor and Customer Video in Every Market',
  description: 'Localize earnings video, investor updates, customer explainers and compliance training in 60+ languages, with figures checked and product names locked.',
  eyebrow: 'For financial services',
  h1: 'The numbers were right. <em>The translated risk warning was not.</em>',
  lede: 'Results commentary, shareholder updates, product explainers and mandatory training all carry figures, product names and disclosures that cannot drift between languages. Octavia localizes them with terminology locked and every script approvable before audio exists, so compliance reviews the wording for each market before anyone hears it.',
  pains: [
    ['Disclosures are market-specific', 'A risk warning approved for one regulator is not automatically the right wording in another market — even one that shares the language.'],
    ['Figures break quietly', 'Decimal commas, “billion” versus “milliard”, basis points and fiscal-year labels change meaning when they are rendered carelessly.'],
    ['Some shareholders hear it later', 'Investors who read in another language often get a summary days after the webcast — a service gap, and a fair-disclosure question.'],
  ],
  caps: [
    ['lucide:lock', 'Fund and entity names fixed', 'Product names, share classes, fund names and legal entities pinned in a glossary, so they are never translated or paraphrased.'],
    ['lucide:file-check', 'Compliance sees the script first', 'Transcript and translation are editable and approvable before any audio is generated, so disclosures are reviewed as text, market by market.'],
    ['lucide:presentation', 'Earnings and AGM video', 'Results commentary, executive updates and AGM recordings subtitled or voiced, with analysts and executives kept distinct through the Q&A.'],
    ['lucide:mic', 'Executive voices, with consent', 'A chief executive’s own voice carried into other languages only on their written approval — or a professional synthetic voice per language instead.'],
    ['lucide:book-open-check', 'Conduct training that lands', 'Conduct, financial-crime and sanctions training in the languages staff work in, with regulated phrasing held consistent across the curriculum.'],
    ['lucide:shield-check', 'Controls for material not yet public', 'Role-based access with SSO, encryption in transit and at rest, configurable retention, and no training on your content.'],
  ],
  steps: [
    ['Load the terminology', 'Product, fund and entity names, plus defined terms such as “capital at risk”, entered before translation.'],
    ['Check every figure', 'Each number, date, currency and percentage is compared with the source before anything else is reviewed.'],
    ['Compliance approves per market', 'Each market’s compliance reviewer signs off the wording, including disclaimers and risk warnings, as text.'],
    ['Release together', 'Audio, subtitles and transcripts generated from the approved script and published to every market at the same time.'],
  ],
  outputs: ['Earnings call subtitles', 'Investor update versions', 'Customer explainers', 'Conduct training', 'Translated transcripts', 'AGM and webcast replays'],
  faq: [
    ['Who is responsible for translated disclosures?', 'You are, and your compliance function should review them per market. Octavia translates and keeps product names and defined terms consistent, but it does not know which regulator’s wording applies to a given product or audience, and the right risk warning can differ between two markets that share a language. Treat approved local disclosure text as source material to be reused, not retranslated each time.'],
    ['Is Octavia approved or certified for regulated firms?', 'Do not assume any certification or regulatory status — ask us for current security documentation, and note that using Octavia implies no regulatory approval of your content. What is in place: encryption in transit and at rest, configurable retention, no training on customer content, role-based access with SSO, and a defined processing region where you require one. Clear your vendor-risk review before uploading anything not yet public, such as results ahead of release.'],
    ['How are numbers and currencies handled?', 'With a human check, every time. Translation has to change number formatting for each locale — decimal commas, thousands separators, currency position — without ever changing the value. Scale words are the classic trap: an English billion is a milliard in French, and a German Billion is a trillion. Have a reviewer check every figure against the source before approval, and make sure on-screen charts and tables match the localized narration.'],
    ['Should our chief executive’s voice be cloned for results video?', 'Only with the executive’s explicit written consent, scoped to the languages and content it covers, and only from an approved script. Many issuers prefer subtitles for results commentary, because the executive’s real voice is part of the record and a synthetic one invites the question of what was actually said. Where you do use a synthetic voice, say so on the video.'],
  ],
  reads: [
    ['Financial Services Video Translation', '/blog/financial-services-video-translation'],
    ['Investor Relations Video Translation', '/blog/investor-relations-video-translation'],
    ['Numbers, Dates and Units in Subtitles', '/blog/numbers-dates-units-in-subtitles'],
  ],
  closeH2: 'Same figures. Same disclosures. Every market.',
  closeP: 'Start with internal conduct training — real volume, no market-facing disclosure risk — and build the glossary there.',
};
