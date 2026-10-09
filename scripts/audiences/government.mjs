// /for/government
export default {
  slug: 'government',
  nav: 'Government & Public Agencies',
  icon: 'lucide:landmark',
  title: 'Octavia for Government & Public Agencies — Language Access for Every Resident',
  description: 'Public service announcements, service explainers and meeting recordings in residents’ languages, with captions, transcripts and review before publishing.',
  eyebrow: 'For government & public agencies',
  h1: 'Published in one language <em>is published to some residents.</em>',
  lede: 'Language access duties do not stop at the printed form. Public service announcements, benefits explainers and council meeting recordings are now how many residents meet an agency. Octavia puts them into the languages your community speaks, with captions and transcripts alongside, and nothing goes public until your reviewers approve it.',
  pains: [
    ['The obligation outgrew the budget', 'Language access was scoped around printed forms and phone interpreters. Video explainers, PSAs and meeting recordings arrived later and were never funded per language.'],
    ['Meeting recordings run for hours', 'Council and committee sessions carry dozens of speakers, run past three hours and are posted in one language with automatic captions nobody checked.'],
    ['One error costs public trust', 'A mistranslated eligibility rule, or a synthetic voice residents were not told about, spends credibility the agency took years to earn.'],
  ],
  caps: [
    ['lucide:languages', 'Chosen by who lives here', 'Pick from 60+ languages using your census and service-request data, rather than the handful a vendor finds commercially interesting.'],
    ['lucide:book-marked', 'Programme names held steady', 'A locked glossary pins department, programme and benefit names, so the video calls a service exactly what the form residents fill in calls it.'],
    ['lucide:users', 'Council sessions, speaker by speaker', 'Diarization keeps the chair, members and public speakers distinct across a long session, so transcripts and translated subtitles follow who said what.'],
    ['lucide:accessibility', 'Accessibility and language access together', 'Same-language captions and transcripts for deaf and hard-of-hearing residents, produced alongside translated subtitles and audio from the same upload.'],
    ['lucide:badge-check', 'Community review before release', 'Transcript and translation are approved by staff or trusted community reviewers before any audio is generated or anything is published.'],
    ['lucide:archive', 'Retention set to your records schedule', 'Configurable retention, encryption in transit and at rest, role-based access with SSO, and content that is not used to train models.'],
  ],
  steps: [
    ['Start from your language data', 'Choose languages from census and service data, and content from what residents most need: eligibility, deadlines, how to get help.'],
    ['Lock the official terms', 'Department, programme and benefit names pinned once, matched to the wording on your forms and website.'],
    ['Review with the community', 'Staff or community reviewers approve each language’s text before any audio exists.'],
    ['Publish with disclosure', 'Captions, transcripts and dubbed versions per language, with synthetic voices labelled as synthetic.'],
  ],
  outputs: ['Dubbed PSAs', 'Translated subtitles', 'Accessibility captions', 'Meeting transcripts', 'Translated transcripts', 'Spoken versions of notices'],
  faq: [
    ['Does Octavia hold a government security authorisation?', 'Do not assume one — Octavia does not claim any government security authorisation or accreditation. What it does provide is encryption in transit and at rest, configurable retention, role-based access with SSO, customer content not used to train models, and a defined processing region where you require one. Raise your agency’s hosting and data-handling requirements with us before uploading anything that is not already public.'],
    ['Is AI translation acceptable for statutory language access?', 'It depends on the content. For general information, AI translation reviewed by staff or community members is a reasonable standard. For vital documents — eligibility decisions, legal notices, anything with a deadline or a penalty — have a qualified human translator review every language before publication. And a translated video never replaces the interpreter services residents are entitled to in person or by phone.'],
    ['Can we dub the mayor or a minister in their own voice?', 'Only with their documented consent, for scripts they have approved in each language, and with the voice disclosed to residents as synthetic. During election and pre-election periods, check your rules and consider pausing cloned-voice content of anyone standing for office entirely — routine service information in a candidate’s voice can be read as campaigning. Many agencies use a disclosed professional voice per language and subtitle the official instead.'],
    ['Can it handle a four-hour council meeting?', 'Yes, as a transcript and translated subtitles — the formats that matter for public access and search. Diarization keeps speakers distinct, and a glossary of members’ names, wards and agenda items prevents most errors before they happen. The approved minutes remain the official record; a translated transcript is an access aid and should say so. Poor room microphones and crosstalk degrade any workflow, so test one meeting first.'],
  ],
  reads: [
    ['Government Video Translation', '/blog/government-video-translation'],
    ['WCAG Video Compliance', '/blog/wcag-video-compliance-guide'],
    ['Synthetic Voice Disclosure', '/blog/synthetic-voice-disclosure'],
  ],
  closeH2: 'Reach every resident the service was built for.',
  closeP: 'Start with one high-demand service explainer in your two most-requested languages, reviewed by people from those communities.',
};
