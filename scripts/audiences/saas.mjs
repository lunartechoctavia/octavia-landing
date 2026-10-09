// /for/saas
export default {
  slug: 'saas',
  nav: 'SaaS & Product Teams',
  icon: 'lucide:app-window',
  title: 'Octavia for SaaS & Product Teams — Product Video That Matches Your UI',
  description: 'Localize demos, onboarding, help-centre and release videos in 60+ languages, with narration that uses the exact strings your localized product ships.',
  eyebrow: 'For SaaS & product teams',
  h1: 'The UI is localized. <em>The videos that teach it are not.</em>',
  lede: 'Most SaaS teams translate the interface and leave onboarding, help-centre and release videos in English — so a user reads “Einstellungen” on screen and hears “Settings” in the walkthrough. Octavia localizes product video against the terminology your product already ships, and makes re-localizing after a UI change a routine job rather than a project.',
  pains: [
    ['The narration and the screen disagree', 'A walkthrough that says “click Billing” over a menu labelled “Facturation” teaches users to distrust both.'],
    ['Video goes stale on every release', 'A renamed button or a moved menu quietly breaks the help-centre video in every language at once, and nobody owns noticing.'],
    ['Tickets arrive in the gap', 'Users who cannot follow the onboarding video file exactly the support tickets the video was made to prevent.'],
  ],
  caps: [
    ['lucide:file-code', 'A glossary built from your string files', 'Build the locked glossary from the product’s own localization files, so the narration names each button and menu exactly as users see it in their language.'],
    ['lucide:mouse-pointer-click', 'Walkthroughs that keep pace', 'Speech is not sped up to fit the source timing. Where a language runs long, the script is tightened at review so the voice still describes the click that is on screen.'],
    ['lucide:git-branch', 'API and batch on your release cadence', 'Submit videos programmatically from the pipeline that ships the release, so localization runs on your schedule rather than an agency’s.'],
    ['lucide:life-buoy', 'The help centre, not just the launch', 'Batch the whole help-video library, with translated subtitles and transcripts that give the help centre’s search something to index.'],
    ['lucide:list-checks', 'Reviewed by people who use the product', 'Support or in-market product staff approve the translated script before audio is generated; they know which terms customers actually use.'],
    ['lucide:mic', 'One product voice per language', 'A consistent professional voice per language across demos, onboarding and help content, so the library sounds like one product rather than a dozen narrators.'],
  ],
  steps: [
    ['Pull the strings', 'Export UI labels from the localization files and load them as the locked glossary for each language.'],
    ['Submit with the release', 'Send demos, onboarding and release videos through the API as part of shipping, not a sprint after it.'],
    ['Review against the build', 'Someone using the localized product checks the script against what is on screen before audio is generated.'],
    ['Publish, then re-run on change', 'Push to the help centre and in-app; when the UI changes, re-run the affected clips rather than the library.'],
  ],
  outputs: ['Dubbed product demos', 'Onboarding videos', 'Help-centre videos', 'Release-note videos', 'Translated subtitles', 'Searchable transcripts'],
  faq: [
    ['The screen still shows the source-language UI. Does that matter?', 'Sometimes. For a high-level demo, translated narration over the source UI is usually fine, especially with subtitles. For onboarding and help videos that tell users which button to press, it is a real problem: they are looking for a label that does not exist in their interface. Octavia localizes what is spoken and subtitled; it does not re-render the screen. For those videos, re-record the capture against the localized build and have Octavia voice it.'],
    ['How do we stop videos drifting out of date?', 'Treat each video’s transcript as the source of truth and tie it to the feature it documents. Keep volatile walkthroughs short and separate from stable concept videos, so a UI change means re-running a ninety-second clip rather than a twenty-minute tour. Submit through the API from the same pipeline as the release, and re-localization becomes part of shipping instead of a backlog item.'],
    ['Do we need to localize every release video?', 'No. Localize what blocks activation and what drives support load first — onboarding, setup, and the handful of help videos behind your most common tickets in each market. Release-note and marketing videos for minor features can go out with translated subtitles only. Dubbing earns its cost where a user is trying to complete a task while watching.'],
    ['Can we send it unreleased features?', 'Yes, with the controls you would expect for roadmap material: team workspaces with role-based access and SSO, encryption in transit and at rest, configurable retention, and customer content that is not used to train models. If your security team needs a particular processing region or specific contractual terms, raise that with Octavia before uploading anything under embargo.'],
  ],
  reads: [
    ['SaaS Product Video Localization', '/blog/saas-product-video-localization'],
    ['Dubbing Screen Recordings and Tutorials', '/blog/dubbing-screen-recordings-and-tutorials'],
    ['Customer Onboarding Video Localization', '/blog/customer-onboarding-video-localization'],
  ],
  closeH2: 'Make the video match the product they see.',
  closeP: 'Start with the onboarding video behind your most common support ticket in your second-largest market.',
};
