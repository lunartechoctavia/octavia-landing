---
{
  "title": "Pronunciation Dictionaries for Dubbing: Getting Names and Terms Right",
  "slug": "pronunciation-dictionaries-for-dubbing",
  "category": "Technical Guides",
  "primaryKeyword": "pronunciation dictionary for dubbing",
  "metaDescription": "A pronunciation dictionary for dubbing keeps names and terms consistent across languages, voices, and episodes. Learn to build and maintain one.",
  "excerpt": "Learn how to treat a pronunciation dictionary for dubbing as a versioned production artifact. The guide covers entry design, phonetic notation, per-language variants, ownership, review, and testing to stop recurring name errors.",
  "publishedAt": "2026-09-07T16:30:00Z",
  "updatedAt": "2026-09-07T16:30:00Z",
  "heroImage": "/assets/blog/images/civic-glass-arches.jpg",
  "heroImageAlt": "abstract dark-glass hero image of layered waveform and phonetic symbols",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

A viewer will forgive a slightly flat delivery, a minor timing drift, or a voice that sits a little lower in the mix than the original. They will not forgive the host mispronouncing the guest's name in the first ten seconds. Dubbing systems have become good at the broad strokes of a script: syntax, prosody, turn-taking, the shape of a sentence in a target language. The defects that still reach an audience are lexical, and they cluster around a small set of tokens the engine has never seen in context and has no reason to guess correctly.

A producer who fixes those tokens one at a time, per episode, is doing work that evaporates when the job closes. A producer who maintains a pronunciation dictionary for dubbing is doing work that compounds. Every entry added this week is an error that cannot recur next month, in any target language, in any episode, for any voice the pipeline uses.

This guide treats the dictionary as what it is: a versioned production artifact with an owner, a review process, and a test step. It covers what belongs in an entry and what does not, how to notate sounds without making the file unmaintainable, why one name needs different entries per target language, how to resolve collisions with ordinary words, how to validate an entry on a short sample before committing to a full render, and how to make every job in a batch inherit the current dictionary without an operator remembering to attach it.

## What belongs in a pronunciation dictionary for dubbing

The dictionary is not a glossary. It holds no meanings, no translations, no style preferences. Each entry answers one narrow question: given this exact string in this exact target language, which sequence of sounds should the system produce?

### The categories worth an entry

Six categories account for nearly all audible defects in a [video dubbing](/features/video-dubbing) pipeline:

- Proper names of people, including presenters, interviewees, and anyone named in a credit sequence, plus any inflected form the script uses.
- Organizations and brand names, especially names that were coined rather than derived, where spelling carries no pronunciation clue.
- Place names: domestic places with irregular local pronunciations, and foreign places filtered through a target-language reading system.
- Acronyms and initialisms, split into those read letter by letter and those read as a word, because the two need opposite treatment.
- Product, model, and SKU terminology: part numbers, version strings, and internal codenames that appear in spoken lines.
- Numbers in constrained formats: years, currency, measurements, and phone-like strings where the reading follows convention rather than digits.

### What does not belong

Ordinary vocabulary needs no entry. If a common word is being misread, the cause is almost always a language or locale setting on the job, not a lexical gap, and adding it to the dictionary hides the real problem behind a patch that will never generalize. Slang, idiom, and register are style decisions made upstream in the script or in voice direction. Punctuation and pause behavior belong to the text normalization layer.

Keep the file narrow. A dictionary with four hundred entries that are all genuinely irregular can be audited in an afternoon. A dictionary with four thousand entries, most of them compensating for a misconfigured job, cannot be audited at all.

## Choosing a notation: precision against maintainability

An entry has two halves: the match string, which is what the script contains, and the pronunciation, which is what the [speech generation](/features/speech-generation) stage should produce. The second half is where teams argue.

### Phonetic notation

The International Phonetic Alphabet is unambiguous and complete. X-SAMPA and ARPABET cover similar ground using ASCII, which matters when the dictionary lives in a repository where reviewers read it as a diff and non-ASCII characters attract encoding bugs. All three describe sound at a level of detail that many voice models do not independently expose, and all three require a reviewer who reads them fluently.

The cost is not writing the first entry. It is reviewing the four hundredth, six months later, by a producer without phonetic training. A dictionary nobody dares edit decays into a list of exceptions everyone routes around.

### Plain respelling

Respelling uses the orthography of the target language to approximate the sound: "KOV-uh-nen", "shuh-NEL". Anyone on the team can read it, it survives copy-paste between tools, and it is fast to write. Its weakness is that respelling is only as precise as the target language's spelling rules allow, and those rules are least reliable exactly where problems occur. English respelling is the worst offender, because English spelling maps to sound inconsistently.

### A convention that holds up

Most production dictionaries work best as a two-tier file. The default tier is plain respelling, written by whoever owns the script, covering the large majority of entries. The second tier is reserved for names where respelling has been tried and failed, written in IPA by a reviewer qualified to do it. State the split in the file header so nobody has to guess which tier an entry belongs to. Whichever notation you choose, keep the pronunciation field inside the script of the target language, since mixing writing systems in one field is a common cause of silent render failures.

## Per-language entries: one name, several pronunciations

A name is not pronounced identically in every target language, and a single global entry guarantees errors in most of them.

### Native pronunciation against target-language adaptation

Two policies are defensible, and they produce different dictionaries. Under a native policy, a name is rendered as close to its source pronunciation as the target language's phonology permits. Under an assimilation policy, the name is rendered the way a fluent speaker of the target language would naturally say it, inside that language's own sound system. Broadcasters in most markets use assimilation for places and native for people; corporate communications usually want native for both. Decide the policy per category, write it down, then generate entries per language rather than sharing one. A dictionary with a single entry for a French city name is already wrong in half the languages you ship.

### Acronyms that behave differently per language

This case surprises teams more than any other. An initialism may be read letter by letter in one language and as a word in another, and the split is not always predictable.

- In English, some well-known agency names are read as words and others are spelled out letter by letter.
- In languages with different letter names, a string is read as a word only if it is pronounceable under local rules.
- A product name that is an acronym in the source market may function as a brand word in a target market, spoken as a word by every customer there.

The entry must therefore be defined per target language even when the source string is identical, and it must state whether the engine should spell or say.

### Numbers, dates, and units

Numeric strings are read by convention, not by arithmetic. A four-digit year, a range, a version string, a price, and a measurement each have distinct readings, and the readings differ across languages. Most pipelines handle common number formats correctly by default. The entries worth writing are the exceptions: model numbers containing letters, dashed identifiers, and anything the script intends as digits rather than as a quantity.

## Resolving conflicts with ordinary words

The most damaging entry class is the one that collides with an existing word. If a product line shares its name with a color, a global rule forcing the product reading corrupts every ordinary use of the color in the same script.

### Diagnose before you patch

Confirm the miss is steady. Play three instances from different positions in a script. If the engine gets the word right sometimes, the problem is contextual handling rather than the lexicon, and a dictionary entry will overcorrect.

### Three resolutions, in order of preference

1. Define the entry at the narrowest scope the platform supports, using phrase-level match strings such as the two-word product name rather than the bare token.
2. Where the platform matches on an exact string only, add entries for the inflected and adjacent forms that actually occur in your scripts, and accept that the bare token stays unpinned.
3. Where neither is possible, move the problem into the script: use the full product name on first mention and keep bare uses out of spoken lines.

Renaming is the fourth option and often the correct one. If a term cannot be pinned without breaking an ordinary word, and the term sits in narrated copy a writer controls, a small wording change in the source costs less over time than a permanent maintenance liability.

## Testing a pronunciation dictionary for dubbing entry before a full render

Never apply a new entry to a full episode as its first test. A render that takes an hour to expose a bad entry costs that hour plus a re-render, and across a series with many episodes in flight the cost multiplies quickly.

### The short probe

Generate a short sample containing the entry plus a control sentence. Ten to twenty seconds is enough. Include one instance of the target term and one sentence of surrounding natural speech, so you can hear whether the entry changes the delivery or the timing of adjacent words.

### What to listen for

- Segment accuracy: are the individual sounds the ones you wrote, or did the engine approximate them?
- Stress placement: wrong stress is more noticeable than a wrong vowel, and it is the most common respelling error.
- Duration: a respelled entry can stretch a word until it no longer fits the shot, which matters most in lip-synced work.
- Prosody spillover: a forced pronunciation sometimes flattens the intonation of the following clause.

### Record the verdict with the entry

Store the sample reference and a one-line verdict alongside the entry, in a comment or a neighboring field. When a reviewer asks six months from now whether an entry was checked, the answer should live in the file rather than in someone's memory.

## Ownership, review, and change control

A dictionary without an owner becomes a shared folder of contradictions.

### Who owns it

One named owner, plus two supporting roles. The owner approves changes and is accountable for the file's coherence. A contributor, usually the localization engineer or script supervisor, adds entries as production surfaces them. A reviewer with phonetic competence adjudicates the small IPA tier. On a small team the owner and the reviewer may be the same person, but the accountability should still be written down.

### Change control

Every entry carries at minimum an author, a date, and a reason. The reason field is what prevents the same term from being added twice with conflicting readings six months apart. Review on a fixed cadence rather than continuously: a monthly pass over newly added entries, and a quarterly pass that looks for duplicates, contradictions, and entries that no longer occur in any current script.

### Deprecate rather than delete

When a product line retires or a campaign ends, mark the entry inactive instead of removing it. Deletion destroys the record of a decision that may need revisiting, and it makes older deliverables impossible to reproduce against the dictionary version that produced them.

## Making a batch pipeline inherit the dictionary

The dictionary pays off only when it applies automatically. If an operator has to remember to attach it, it will be attached inconsistently.

### Inheritance and overrides

Attach the dictionary at the project or organization level so every job inherits it, and allow job-level overrides for one-off work such as a guest voice or a single-title release. Keep the override surface small and log every use, because an override that persists is a dictionary change that never went through review.

### Validation before the render

Run a gate before synthesis that checks the file for structural problems: duplicate match strings within the same language, entries with an empty pronunciation field, mixed scripts inside a field, and entries whose match string never occurs in the current script. That last check is informational rather than blocking, but it shows which entries are dead weight.

### Version the dictionary with the deliverable

Record the dictionary version in job metadata and ship it with the deliverable. When a client requests a change months later, a re-render against the same version produces the same output, and a diff between two versions explains exactly what changed. The request shape for attaching a dictionary, overriding at job level, and querying the version in use is covered in the [platform documentation](/docs). The same inheritance model applies whether the output is a full dubbed mix or a standalone [audio translation](/features/audio-translation) delivered without video.

## A starter template you can populate in an afternoon

The goal is not completeness. It is a file that already covers the terms your next ten episodes will contain.

1. Pull the last three scripts the team produced and extract every capitalized token that is not sentence-initial, plus every all-caps token.
2. De-duplicate, then remove anything that is ordinary vocabulary in its target language.
3. Sort what remains into the six categories above.
4. Write a plain respelling entry for each term in every target language you ship, not only the source.
5. Mark acronyms explicitly as spelled or spoken, per language.
6. Run the short probe on the twenty entries most likely to be heard by an audience, and record each verdict.
7. Name an owner and a reviewer, and put the file under version control with authors and dates on every row.

Fields per entry: match string, target language, pronunciation, notation tier, category, status, author, date, reason, sample reference. Ten fields is enough. Anything beyond that tends to go unused, and unused fields decay first.

## Frequently asked questions

### How large should a pronunciation dictionary be?

As small as possible while covering the terms that actually occur. A few hundred well-chosen entries for a long-running series is typical, and the count matters less than whether every entry is irregular enough to justify itself.

### Should entries be shared across target languages?

No. Share the source string, but define the pronunciation per target language, because letter names, stress rules, and adaptation conventions all differ.

### What if the client pronounces a name inconsistently?

Ask which form is authoritative and record the answer in the reason field. If the client genuinely alternates, pin the form used in the most prominent placement and treat the rest as acceptable variation.

### Do I need IPA at all?

Only for the small tier of entries where respelling has demonstrably failed. Most teams run entirely on respelling and add IPA for a handful of names per language.

### How do I handle a term that is also a common word?

Narrow the match to a phrase, add entries for the forms that actually occur, or change the wording in the source. Do not force the reading on the bare token across an entire catalog.

### Who should approve changes?

A single named owner, supported by a reviewer with phonetic competence. The owner's job is coherence, not volume.

### Does the dictionary affect timing in a lip-synced dub?

It can. A forced pronunciation may run longer or shorter than the engine's default, so probe any entry destined for on-camera dialogue rather than assuming it fits.

## Conclusion

Start with the last three scripts your team produced, not with an aspirational list of every term the organization uses. Extract the irregular tokens, write entries per target language, run the short probe on the twenty that reach an audience most often, and put the file under version control with an owner's name at the top. That is already a working pronunciation dictionary for dubbing, and it will prevent a meaningful share of the defects that currently make it into finished output.

From there the discipline is maintenance rather than construction. Attach the file at the project level so every job inherits it, gate renders on a structural validation pass, and review new entries on a fixed cadence. Treat the dictionary as infrastructure rather than as a per-episode fix, and the cost of each new term drops toward zero.

If the dictionary sits inside a pipeline you do not control, or if you need a reviewer with phonetic competence to sign off on the IPA tier, that is worth raising directly rather than working around. Bring the scripts and the current file, and [talk to the Octavia team](/contact) about where the dictionary should live and who should own it.
