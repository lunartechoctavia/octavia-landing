// /for/emergency-management
export default {
  slug: 'emergency-management',
  nav: 'Emergency Management',
  icon: 'lucide:siren',
  title: 'Octavia for Emergency Management — Multilingual Warnings Prepared in Advance',
  description: 'Preparedness video, evacuation guidance and crisis updates in residents’ languages — translated and approved before the emergency, not during it.',
  eyebrow: 'For emergency management',
  h1: 'Translate the warning <em>before you need to send it.</em>',
  lede: 'In an emergency, the minutes spent finding a translator are minutes some residents spend without instructions. Octavia lets you build multilingual preparedness content and pre-approved core messages in calm conditions, then turn recorded crisis updates around quickly — text and subtitles first, with human review on anything life-safety.',
  pains: [
    ['Translation is the step that gets skipped', 'Under pressure, the first update goes out in one language and the others follow hours later, or not at all.'],
    ['Evacuation details tolerate no paraphrase', 'Zone names, routes, shelter addresses and times must arrive exactly as issued, and general-purpose translation paraphrases.'],
    ['Bandwidth and power fail first', 'Video is the hardest format to receive during an incident, which is exactly when residents need the instructions most.'],
  ],
  caps: [
    ['lucide:file-check', 'Core messages approved in advance', 'Evacuation, shelter-in-place and boil-water messages translated and reviewed per language now, so in an incident your team checks changed details rather than starting from nothing.'],
    ['lucide:subtitles', 'Text first, voice when there is time', 'Translated subtitles and transcripts are the quickest to produce and review and travel on any connection; dubbed audio follows once the text is approved.'],
    ['lucide:map-pin', 'Zones and shelters pinned', 'A locked glossary keeps zone names, routes, shelters and agency names exactly as they appear on your maps, signs and alerts.'],
    ['lucide:volume-2', 'Spoken versions from approved text', 'Subtitle-to-audio and text-to-speech turn an approved message into spoken audio per language, for radio, phone lines and residents who do not read well.'],
    ['lucide:accessibility', 'Readable with the sound off', 'Burned-in captions for social feeds watched without sound, and same-language captions for deaf and hard-of-hearing residents.'],
    ['lucide:calendar-check', 'Preparedness library before the season', 'Translate the whole preparedness series — flood, heat, wildfire smoke, go-bags — in batch, so it exists in every language before it is needed.'],
  ],
  steps: [
    ['Map the languages now', 'Use census and service data to decide which languages every message ships in, before any incident.'],
    ['Pre-approve the core messages', 'Evacuation, shelter-in-place and water notices translated and checked by native speakers in calm conditions.'],
    ['Send text first', 'During the incident, update the changed details, have subtitles and transcript reviewed, and publish.'],
    ['Follow with voice', 'Dubbed briefings and spoken audio for broadcast, radio and phone lines once the text is out.'],
  ],
  outputs: ['Burned-in subtitles', 'Subtitle tracks', 'Dubbed press briefings', 'Spoken audio messages', 'Translated transcripts', 'Preparedness video'],
  faq: [
    ['Is it fast enough to use during an incident?', 'For recorded briefings and short updates, the text comes back quickly — but review sets the pace, and it should. Anything about evacuation, shelter or medical action needs a human check before release, ideally by a native speaker. That is why the real speed comes from preparation: approved messages only need their changed details checked. Do not plan on live interpretation of a press conference; put an interpreter at the podium and localize the recording afterwards.'],
    ['Should we dub or subtitle crisis updates?', 'Subtitle first. Text is the quickest format to produce and review, works muted, survives poor connections and can be copied into SMS and social posts. Add dubbed or spoken audio for broadcast, radio and residents with low literacy once the text is approved — generated from that approved text rather than translated a second time. If an official’s own voice is used, it needs their consent and should be disclosed as synthetic.'],
    ['Which languages should we prepare?', 'Every language your community data shows a meaningful number of residents rely on — not only the largest two or three. Speakers of less widely spoken languages depend more on official channels and are least likely to find a translation elsewhere. Quality also varies more in less-resourced languages, which is one more reason to prepare those messages early and have native speakers approve them before an incident.'],
    ['What if the platform is unavailable during an emergency?', 'Do not make any single online service a dependency for life-safety messaging. Export approved translations of your core messages and keep them in your own systems and alerting tools, so they are available whatever happens to a connection or a vendor. For the content you do process, there is encryption in transit and at rest, configurable retention, role-based access with SSO, and no use of your content to train models.'],
  ],
  reads: [
    ['Multilingual Crisis Communication', '/blog/video-localization-crisis-communication'],
    ['Plain Language Video', '/blog/plain-language-video-accessibility'],
    ['Video Accessibility on Low Bandwidth', '/blog/low-bandwidth-video-accessibility'],
  ],
  closeH2: 'Have the warning ready in every language.',
  closeP: 'Start with your evacuation and shelter-in-place messages, approved in each community language before the season begins.',
};
