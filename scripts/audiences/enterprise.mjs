// /for/enterprise
export default {
  slug: 'enterprise',
  nav: 'Enterprise Teams',
  icon: 'lucide:building-2',
  title: 'Octavia for Enterprise Teams — Localize Training and Comms at Scale',
  description: 'Training, onboarding and internal communication in 60+ languages, with SSO, roles and no training on your data.',
  eyebrow: 'For enterprise teams',
  h1: 'Every employee got the message. <em>Not every employee understood it.</em>',
  lede: 'Mandatory training completed in a second language is attendance, not comprehension. Octavia localizes training, onboarding and internal communication at volume, under the controls a security review expects.',
  pains: [
    ['Completion is not comprehension', 'A signature sheet proves a video was played, not that the instruction landed.'],
    ['Volume defeats vendor pricing', 'Per-minute agency rates mean most internal content is never localized at all.'],
    ['Content is sensitive', 'Pre-announcement material and real case examples cannot go just anywhere.'],
  ],
  caps: [
    ['lucide:building-2', 'Workspaces and roles', 'Separate workspaces with role-based access, so teams and regions do not share a namespace.'],
    ['lucide:shield-check', 'Built for procurement', 'SSO, encryption in transit and at rest, configurable retention, and content that is not used to train models.'],
    ['lucide:book-marked', 'Terminology governance', 'One approved glossary applied everywhere, so a policy or system name never renders two different ways.'],
    ['lucide:layers', 'Batch and API', 'Programmatic submission for libraries measured in hundreds of hours rather than single assets.'],
    ['lucide:badge-check', 'Review before release', 'Transcript and translation approved before generation, with the artefacts an audit expects.'],
    ['lucide:accessibility', 'Accessibility per language', 'Captions and transcripts alongside translated audio, in each language you publish.'],
  ],
  steps: [
    ['Connect the library', 'Upload or submit programmatically from the systems you already use.'],
    ['Apply the glossary', 'Approved terminology, product names and regulated phrasing pinned across every job.'],
    ['Route for review', 'In-market reviewers approve text before any audio is generated.'],
    ['Distribute and evidence', 'Deliver to your LMS and record what was delivered, in which language, to whom.'],
  ],
  outputs: ['Dubbed training', 'Translated subtitles', 'Accessibility captions', 'Transcripts', 'Assessment text', 'SCORM-ready audio'],
  faq: [
    ['Is our content used to train models?', 'No. That position is documented rather than verbal, which is what a security review will ask for. Alongside it: configurable retention, encryption in transit and at rest, role-based access with single sign-on, and a defined processing region where you require one.'],
    ['How do we prove comprehension rather than completion?', 'Record the language of delivery in the training record, assess in the language of instruction rather than the source language, and revalidate assessment items per language — translation can make a distractor obviously wrong or accidentally correct. In an investigation the question is whether that individual received comprehensible instruction.'],
    ['Can this handle a library of several hundred hours?', 'Yes, through batch processing and API submission. The practical constraint at that scale is rarely processing — it is review capacity, terminology maturity and versioning. Expect review effort per hour to fall substantially as the glossary matures.'],
    ['What should we localize first?', 'Internal training, onboarding and safety content. It carries real volume, has no external brand exposure, and its effect is measurable in completion rates, assessment scores and incident data. Regulated customer-facing material should come last, once terminology and review are proven.'],
  ],
  reads: [
    ['Enterprise Video Localization', '/blog/enterprise-video-localization'],
    ['Localize Employee Training Videos', '/blog/localize-employee-training-videos'],
    ['Video Translation Security and Privacy', '/blog/video-translation-security-and-privacy'],
  ],
  closeH2: 'Say it once. Have it understood everywhere.',
  closeP: 'Start with the training that carries the most risk if it is misunderstood.',
};
