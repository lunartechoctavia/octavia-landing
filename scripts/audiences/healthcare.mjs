// /for/healthcare
export default {
  slug: 'healthcare',
  nav: 'Healthcare & Hospitals',
  icon: 'lucide:hospital',
  title: 'Octavia for Healthcare & Hospitals — Patient Video in Every Patient’s Language',
  description: 'Localize patient education, discharge and procedure explainers and staff training in 60+ languages, with clinician review before anything reaches a patient.',
  eyebrow: 'For healthcare & hospitals',
  h1: 'The patient nodded. <em>That is not the same as understanding.</em>',
  lede: 'Discharge instructions, procedure preparation and medication technique are where a language gap becomes a missed appointment or a return visit. Octavia localizes patient education and staff training video, with clinicians approving every translated script before any audio is made. It does not replace an interpreter at the bedside.',
  pains: [
    ['Patient education exists in one language', 'The bowel-prep video and the inhaler-technique explainer are in English, while a significant share of patients on the ward follow another language best.'],
    ['Interpreters are booked for encounters', 'Interpreter hours rightly go to consultations and consent conversations, which leaves recorded education untouched.'],
    ['A mistranslated instruction is a safety event', 'Units, frequencies and drug names that drift in translation are not a style problem; they reach the patient as instructions.'],
  ],
  caps: [
    ['lucide:clipboard-check', 'Clinician sign-off before audio', 'Transcript and translation are editable and approvable first, so a clinician or qualified medical translator approves the words before any voice is generated.'],
    ['lucide:pill', 'One name for every medicine', 'A locked glossary pins drug, device and procedure names to a single approved rendering, so they are never paraphrased.'],
    ['lucide:gauge', 'Paced for patients', 'Natural timing rather than compressed speech, so an anxious or elderly patient is not racing to keep up with instructions.'],
    ['lucide:volume-2', 'A consistent voice per language', 'Assign one professional synthetic voice per language across a pathway, so patients hear the same calm voice from pre-op to discharge.'],
    ['lucide:captions', 'Captions and take-home text', 'Captions for patients with hearing loss and a transcript that can be printed and taken home, in each language you publish.'],
    ['lucide:graduation-cap', 'Staff training across the workforce', 'Induction, infection-control and equipment training for staff who work best in another language, through the same review route.'],
  ],
  steps: [
    ['Start with approved content', 'Patient education already signed off clinically, with no patient-identifiable material in it.'],
    ['Pin the clinical terms', 'Medication, device and procedure names, and your own service names, locked in the glossary.'],
    ['Clinician review per language', 'A clinician or qualified medical translator fluent in the language approves the script before audio.'],
    ['Publish where patients are', 'Voiced video, captions and take-home transcripts for the patient portal, waiting areas and discharge packs.'],
  ],
  outputs: ['Patient education videos', 'Discharge explainers', 'Procedure prep guides', 'Captions per language', 'Take-home transcripts', 'Staff training versions'],
  faq: [
    ['Can this replace our medical interpreters?', 'No. Consultations, consent conversations, diagnoses and anything where a patient needs to ask questions require a qualified medical interpreter, in person or remote. Octavia is for recorded content prepared in advance — the education a patient watches before or after the encounter. Used well, it frees interpreter time for the conversations that need it; it does not replace the interpreter.'],
    ['What about HIPAA and patient data?', 'Octavia does not claim HIPAA compliance, and you should not assume a business associate agreement is available — raise it with us before uploading anything containing protected health information, or its equivalent under your local law. The safer pattern is not to need one: education and training content should carry no patient-identifiable material. In place: encryption in transit and at rest, configurable retention, role-based access with SSO, no training on your content.'],
    ['Who should review the translations?', 'Someone with both clinical knowledge and native fluency — a clinician who speaks the language or a qualified medical translator — not a bilingual colleague from another department. Give reviewers the glossary and the source script, ask them to check numbers, units, frequencies and warnings first, and record who approved each language version. Content that changes clinical behaviour deserves the rigour of the source.'],
    ['What should a hospital localize first?', 'High-volume, stable patient education where misunderstanding has a clear cost: procedure preparation, discharge instructions, medication technique and appointment guidance. Start with the two or three languages your interpreter bookings show are requested most. Leave anything that changes often, or depends on an individual’s care plan, to the clinical conversation.'],
  ],
  reads: [
    ['Healthcare Video Translation', '/blog/healthcare-video-translation'],
    ['Plain Language Video', '/blog/plain-language-video-accessibility'],
    ['Writing a Review Brief', '/blog/video-translation-review-brief'],
  ],
  closeH2: 'Instructions only work if they are understood.',
  closeP: 'Start with one procedure-prep video in the language your interpreter service is booked for most often.',
};
