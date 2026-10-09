// /for/audiobooks
export default {
  slug: 'audiobooks',
  nav: 'Audiobook Publishers',
  icon: 'lucide:book-headphones',
  title: 'Octavia for Audiobook Publishers — Narrated Editions in 60+ Languages',
  description: 'Produce audio editions of licensed translations, or translate existing narration with consent, in 60+ languages — reviewed chapter by chapter.',
  eyebrow: 'For audiobook publishers',
  h1: 'The translation is in print. <em>The audio edition never got made.</em>',
  lede: 'Most translated editions never get an audiobook, because narration in a smaller market rarely recovers its studio cost. Octavia produces narration from a licensed translation, or carries existing narration into another language with the narrator’s consent — chapter by chapter, with every line reviewable before it is voiced.',
  pains: [
    ['Narration costs don’t scale down', 'A studio, narrator and director cost much the same for a small edition as for a bestseller, so smaller-language editions stay silent.'],
    ['Contracts predate synthetic voices', 'Narrator and author agreements were written for a recorded performance, and most say nothing about a voice model built from it.'],
    ['Long listening exposes everything', 'A name read two ways, a chapter brighter than the last — over nine hours, small inconsistencies become the reviews.'],
  ],
  caps: [
    ['lucide:file-audio', 'Narration from the translated text', 'Speech generation voices a licensed translation chapter by chapter, in one professional voice per language held for the whole book.'],
    ['lucide:mic-vocal', 'The narrator, in another language', 'With a narrator’s written consent, their own voice carries into the translated edition, with control over what may be produced in it.'],
    ['lucide:whole-word', 'Chapter thirty matches chapter one', 'Custom vocabulary keeps character, place and invented names from being translated or respelt, however often they occur.'],
    ['lucide:scan-text', 'Proof against the manuscript', 'Transcribe the finished narration and check it against the text, so dropped lines and misreads are found by search, not by re-listening.'],
    ['lucide:list-checks', 'Text approved before it’s voiced', 'Each chapter’s translation is editable and approvable before audio is generated — where an editor’s change is a text edit, not a retake.'],
    ['lucide:audio-lines', 'Full-cast and scored productions', 'Diarization keeps each performer distinct in full-cast titles; Magic Mode lifts narration off music and sound design.'],
  ],
  steps: [
    ['Clear the rights first', 'Translation rights, audio rights and any voice consent confirmed per title and language.'],
    ['Prepare chapter files', 'Work chapter by chapter, with house rules for headings, numbers and footnotes set up front.'],
    ['Lock names, approve text', 'Pin recurring names; a native-speaking editor approves each chapter before it is voiced.'],
    ['Proof and package', 'Listen closely to the opening chapters, proof the rest against the transcript, then assemble per retailer.'],
  ],
  outputs: ['Narrated chapter audio', 'Translated narration', 'Author-voiced editions', 'Full-cast dubs', 'Narration transcripts', 'Translated transcripts'],
  faq: [
    ['Does our narration contract cover a synthetic version?', 'Probably not, so read it before assuming. A licence to record and distribute a performance is not a licence to build a voice model from it. Get written consent naming the titles, languages and term, what happens if consent is withdrawn, and whether the model may be reused — and expect narrators and their agents to ask first how listeners will be told.'],
    ['Will retailers accept AI-narrated titles?', 'Policies differ between retailers and are still changing, and some require synthetic narration to be disclosed in metadata or credits. Check the current terms of every store you distribute through before production rather than at upload. Whatever the rules say, state it in the credits: listeners accept disclosure far more readily than discovering it afterwards.'],
    ['Can Octavia translate the book itself?', 'It can translate narration, but the right to translate the text is a separate licence from the audio rights, and you need it either way. For fiction, have the translation written or line-edited by a literary translator — a flat rendering is far more audible over nine hours than on the page. Where a licensed translation already exists, voice that rather than translating the audio again.'],
    ['How do we proof nine hours without hearing every minute?', 'Proof the text wherever you can. Approve the translation chapter by chapter, search the script for every pinned name to confirm it appears consistently, then compare a transcript of the finished audio with the text to catch dropped or misread lines. Save close listening for the opening chapters, dialogue-heavy scenes and the first appearance of each name.'],
  ],
  reads: [
    ['Audiobook Localization', '/blog/audiobook-localization-guide'],
    ['Synthetic Voice Disclosure', '/blog/synthetic-voice-disclosure'],
    ['Pronunciation Dictionaries for Dubbing', '/blog/pronunciation-dictionaries-for-dubbing'],
  ],
  closeH2: 'Give the translated edition a voice.',
  closeP: 'Start with one backlist title that already has a licensed translation and a clear rights position, and proof it chapter by chapter.',
};
