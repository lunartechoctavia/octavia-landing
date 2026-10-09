// /for/diplomacy
export default {
  slug: 'diplomacy',
  nav: 'Diplomacy & International Organizations',
  icon: 'lucide:handshake',
  title: 'Octavia for Diplomacy & International Organizations — Outreach in 60+ Languages',
  description: 'Public diplomacy video, meeting recordings and member-state communications in 60+ languages, with protocol names and titles locked to approved forms.',
  eyebrow: 'For diplomacy & international organizations',
  h1: 'The meeting had interpreters. <em>The recording did not.</em>',
  lede: 'Embassies, foreign ministries and multilateral bodies now publish more video than their translation services were staffed for: ambassador messages, public diplomacy campaigns, side-event recordings, explainers for member states. Octavia localizes that surrounding material with names and titles locked, and leaves the official record to the services built for it.',
  pains: [
    ['The record comes first, the video waits', 'Official texts in the official languages are rightly prioritised; video, social content and recordings queue behind them, often indefinitely.'],
    ['Protocol errors are not small errors', 'A minister’s title rendered informally, a country named in a disputed form or an honorific dropped is read as a position, not a typo.'],
    ['Publics do not speak the working language', 'Public diplomacy reaches people in their own language, including regional and minority languages a mission’s small team cannot cover.'],
  ],
  caps: [
    ['lucide:book-marked', 'Protocol locked in the glossary', 'Names, titles, forms of address and agreed designations for countries and territories pinned exactly, so a translation cannot improvise on a sensitive name.'],
    ['lucide:users', 'Panels and side events', 'Diarization keeps each delegate and panellist distinct across a long recording, so subtitles and transcripts keep every statement with its speaker.'],
    ['lucide:megaphone', 'Campaigns in host-country languages', 'Ambassador messages, cultural programmes and consular explainers localized for host publics — subtitled for social feeds, dubbed where audiences expect to listen.'],
    ['lucide:languages', 'Beyond the official languages', '60+ languages, so member-state and host-country audiences outside an organisation’s official languages can be reached without a vendor per language.'],
    ['lucide:badge-check', 'Approved before it is heard', 'Transcript and translation go through your own approval chain — desk officer, press office, native-speaker reviewer — before any audio is generated.'],
    ['lucide:clock', 'Pre-release statements kept close', 'Role-based access with SSO, encryption in transit and at rest, configurable retention and no training on your content, for statements prepared ahead of an embargo lifting.'],
  ],
  steps: [
    ['Decide what is not yours to translate', 'Official texts stay with the translation service; Octavia takes the video and outreach around them.'],
    ['Lock the protocol list', 'Names, titles, honorifics and agreed designations in each target language, approved once by protocol.'],
    ['Approve each language', 'Desk, press office and a native-speaker reviewer sign off the text before any audio exists.'],
    ['Publish to each audience', 'Subtitled and dubbed versions for host publics, member states and the archive.'],
  ],
  outputs: ['Subtitled statements', 'Dubbed campaign video', 'Meeting transcripts', 'Translated transcripts', 'Side-event subtitles', 'Accessibility captions'],
  faq: [
    ['Can this replace our translation service for official texts?', 'No, and it should not try. Official texts in an organisation’s official languages — resolutions, communiqués, agreed conclusions — carry negotiated terminology and are produced and verified by the organisation’s own translation service. Octavia is for the material around that record: video statements, outreach, recordings and explainers. Where a video quotes an official text, use the published official translation rather than a fresh one.'],
    ['How do we stop a title or a country name being rendered wrongly?', 'Put it in the locked glossary before anything is translated: names, titles, forms of address and your agreed designations for countries and territories, in each target language. Locked entries are used exactly as approved rather than retranslated. What a glossary cannot catch is tone — the register of a condolence message, the weight of a qualifier — so a native-speaker reviewer who knows the context should still approve every language.'],
    ['Can it interpret meetings live?', 'Do not plan on it. Interpretation in the room is a professional discipline and, in formal meetings, part of the proceedings. Octavia’s place is afterwards: translated subtitles and transcripts of the recording for delegations, the public and the archive, and dubbed statements for audiences who would otherwise never watch them. Mark translated meeting transcripts as unofficial so they are never mistaken for the verbatim record.'],
    ['Can a head of mission be dubbed in their own voice?', 'Only with their explicit consent, on statements they have approved word for word in each language, and with the synthetic voice disclosed. A cloned voice delivering words a principal never cleared is an incident waiting to happen. Many missions use a professional synthetic voice per language and subtitle principals instead. Non-public or sensitive material should stay on systems your security office has approved for it.'],
  ],
  reads: [
    ['Conference and Event Video Translation', '/blog/conference-video-translation'],
    ['Pronunciation Dictionaries for Dubbing', '/blog/pronunciation-dictionaries-for-dubbing'],
    ['Pacing and Directness Across Cultures', '/blog/pacing-and-directness-across-cultures'],
  ],
  closeH2: 'Be understood well beyond the meeting room.',
  closeP: 'Start with one recorded statement, subtitled in the host country’s languages, with protocol names locked first.',
};
