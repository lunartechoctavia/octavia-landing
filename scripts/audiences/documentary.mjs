// /for/documentary
export default {
  slug: 'documentary',
  nav: 'Documentary Teams',
  icon: 'lucide:camera',
  title: 'Octavia for Documentary Teams — Localize Narration and Field Interviews',
  description: 'Dub narration, keep location atmosphere, and subtitle contributors — in 60+ languages.',
  eyebrow: 'For documentary teams',
  h1: 'The film travels. <em>The subjects should still sound like themselves.</em>',
  lede: 'Documentary has a split problem: scripted narration localizes cleanly, and field interviews carry a person’s testimony that should not be casually replaced. Octavia handles both, differently and deliberately.',
  pains: [
    ['Atmosphere is half the film', 'Replace the whole audio track and the location, the weather and the room all disappear with it.'],
    ['Field audio is unforgiving', 'Interviews recorded in wind, traffic and crowds are exactly where automated workflows usually fall apart.'],
    ['Festival and broadcast versions multiply', 'Every territory wants a different combination of dubbed narration, subtitles and accessibility captions.'],
  ],
  caps: [
    ['lucide:wind', 'Location sound survives', 'Dialogue separation replaces narration while the ambience, score and field recording stay in place.'],
    ['lucide:message-square', 'Subtitle the people, dub the narrator', 'The pattern most documentaries want: contributors keep their real voices, the narration carries the film.'],
    ['lucide:users', 'Multiple contributors separated', 'Diarization keeps each interviewee distinct across a feature-length edit.'],
    ['lucide:file-text', 'Transcripts for the whole rushes library', 'Searchable text across archive and interview material, which is a research tool as much as a delivery format.'],
    ['lucide:badge-check', 'Accuracy you can check', 'Review transcript and translation before generation, which matters when a contributor’s words carry weight.'],
    ['lucide:accessibility', 'Accessibility versions', 'Same-language captions and transcripts alongside translated subtitles, per language.'],
  ],
  steps: [
    ['Bring the locked cut', 'Plus stems if the mix has them; separation covers the archive material that does not.'],
    ['Split narration from testimony', 'Decide per element what gets dubbed and what stays subtitled.'],
    ['Verify the words', 'Contributor speech is checked against source before anything is generated.'],
    ['Deliver every version', 'Dubbed narration, subtitle tracks and accessibility captions per territory.'],
  ],
  outputs: ['Dubbed narration', 'Translated subtitles', 'Accessibility captions', 'Transcripts', 'Dialogue lists', 'Audio description script'],
  faq: [
    ['Should contributors be dubbed or subtitled?', 'Subtitled, in most cases. A synthetic version of a real person’s voice speaking translated words is a meaningful step beyond what most release forms contemplate, and audiences read testimony as more credible in the speaker’s own voice. The common pattern is to dub narration and subtitle the people.'],
    ['Will the location audio survive?', 'Yes, where the workflow separates dialogue from everything else rather than replacing the full mix. This matters more in documentary than almost any genre, because ambience is doing narrative work rather than sitting behind it.'],
    ['How well does it handle poor field audio?', 'Output quality is bounded by input quality, and heavy wind, crowd noise or overlapping speech will degrade results in any workflow. Run a two-minute sample through transcription before committing — if the sample is broadly accurate, the film is fine; if it is largely wrong, subtitles from a manual transcript are the realistic route.'],
    ['Can we get accessibility versions in each language?', 'Yes, and they are a separate deliverable from translated subtitles. Accessibility captions carry speaker identification and non-speech audio information, and the requirement applies to each language version — a Spanish dub needs Spanish captions too.'],
  ],
  reads: [
    ['AI Dubbing for Documentaries', '/blog/ai-dubbing-for-documentaries'],
    ['Documentary Dubbing with AI', '/blog/documentary-dubbing-ai'],
    ['Audio Description and Translation', '/blog/audio-description-and-translation'],
  ],
  closeH2: 'Take the film further than the festival circuit.',
  closeP: 'Start with narration in two languages and keep every contributor exactly as they were recorded.',
};
