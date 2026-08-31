---
{
  "title": "Forced Alignment Explained: How Text Gets Matched to Audio",
  "slug": "forced-alignment-explained",
  "category": "Technical Guides",
  "primaryKeyword": "forced alignment",
  "metaDescription": "What forced alignment does, how it differs from transcription, where it fails, and why word-level timing underpins subtitles, dubbing, and lip sync.",
  "excerpt": "Transcription asks what was said. Alignment asks when. The second question is the one most video workflows actually depend on.",
  "publishedAt": "2026-08-27T15:30:00Z",
  "updatedAt": "2026-08-27T15:30:00Z",
  "heroImage": "/assets/blog/images/parallel-audio-strands.png",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

[![Audio waveform display on a screen](https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## The Problem It Solves

You have an audio recording. You have a transcript of exactly what is said in it. What you do not have is any information about when each word occurs.

That missing information turns out to be the foundation of most video language work. Subtitles need cue boundaries at natural speech points. Dubbing needs to know where each phrase sits so the replacement can occupy the same space. Lip sync needs phoneme-level detail. Editing tools that let you cut video by deleting words from a transcript need every word's position. Karaoke-style caption highlighting needs it too.

Forced alignment produces that timing. Given audio and a known transcript, it determines the start and end time of every word — and, usually, every phoneme.

The name comes from what the algorithm does: it forces the recognition process to follow a known word sequence rather than choosing freely from a vocabulary. The search space collapses from "which of a hundred thousand words is this" to "where in this known sequence are we now." That constraint is what makes alignment substantially more accurate and far cheaper than recognition.

## How It Works

The classical implementation, still the conceptual basis of most systems:

**Convert the transcript to a phoneme sequence.** A pronunciation dictionary maps each word to its constituent sounds. Words not in the dictionary go through a grapheme-to-phoneme model that predicts pronunciation from spelling.

**Extract acoustic features from the audio.** The signal is divided into short frames — typically ten milliseconds — and each is reduced to a feature vector describing its spectral content.

**Build an acoustic model.** A statistical model, historically a hidden Markov model with Gaussian mixtures and now generally a neural network, that scores how well a given frame matches a given phoneme.

**Search for the best path.** The Viterbi algorithm finds the most probable alignment between the frame sequence and the phoneme sequence, subject to the constraint that phonemes must occur in the transcript's order. Each phoneme can occupy one or many frames but cannot be skipped or reordered.

**Map back to words.** Phoneme boundaries aggregate into word boundaries, and word boundaries into phrase boundaries.

Modern neural approaches vary the mechanism — connectionist temporal classification and attention-based models produce alignments differently — but the constraint that makes it "forced" is the same, and so are the failure modes.

## Alignment Versus Recognition

The distinction matters when deciding what to run.

**Recognition** takes audio and produces text. It must choose among all possible words, so it makes lexical errors, and it produces timing as a by-product that is usually adequate at the segment level and imprecise at the word level.

**Alignment** takes audio and known text and produces timing. It cannot make lexical errors because the words are given. It can only make timing errors.

The practical consequence: where an accurate transcript exists — because it was reviewed, because it was scripted, because it came from a caption file — alignment gives better timing than recognition, faster and cheaper.

Where no transcript exists, recognition comes first. And the strongest pattern in production workflows is to combine them: recognise to get a draft, have a human correct the words, then align the corrected text back to the audio to recover accurate timing. The correction step usually damages the original timing — inserted words have no timestamps — and alignment restores it.

[![Person editing audio at a workstation](https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## What Alignment Enables

**Subtitle segmentation at natural boundaries.** With word timings, cues can be split at syntactic boundaries rather than at arbitrary durations. This is the difference between subtitles that read naturally and subtitles that break mid-phrase.

**Reading speed enforcement with real numbers.** Characters per second requires knowing exactly how long a cue is displayed and exactly how many characters it holds. Alignment supplies the first.

**Dub timing that respects the original.** Knowing where each source phrase begins and ends defines the space a translated phrase must occupy. Without it, the dub can only be aligned at the segment level, which is where drift originates.

**Lip sync.** Phoneme-level alignment on the source identifies where visible mouth movements occur, and matching the target language's phonemes to that structure is the basis of visual synchronisation.

**Speaker turn boundaries.** Combined with diarization, alignment produces precise turn boundaries rather than approximate ones.

**Transcript-driven editing.** Cutting video by editing text requires every word's exact position.

**Search and navigation.** Jumping to the moment a term is spoken requires word-level timing.

**Quality measurement.** Comparing the timing of a dub against the source, or a revised track against its predecessor, needs a common time reference at word level.

## Where It Fails

Alignment is more robust than recognition, and it is not infallible. The failures are specific and mostly diagnosable.

**Transcript mismatch.** The single largest cause. If the transcript does not match the audio — a word omitted, a sentence paraphrased, a section missing — the algorithm still produces an alignment, because it must produce a path. That alignment will be wrong, often catastrophically, and it will be silently wrong. Sanity checks on confidence scores and on implausible word durations catch most cases.

**Disfluencies.** Repetitions, false starts, filled pauses, and stammers appear in the audio and not in a cleaned transcript. Each unaccounted-for sound must be absorbed by neighbouring phonemes, distorting local timing.

**Overlapping speech.** Two people talking at once cannot be aligned to a linear transcript. Alignment on unseparated overlapping speech produces poor results in the overlap and often for some distance after it.

**Non-speech audio.** Music, applause, laughter, and noise between speech regions are absorbed into adjacent words, stretching them implausibly.

**Out-of-dictionary words.** Names, technical terms, brand names, and words in another language get predicted pronunciations that may be wrong, producing local misalignment. Supplying a custom pronunciation dictionary for known domain terms is the direct fix.

**Long silences.** Extended gaps must be modelled explicitly, and systems that do not handle them well distribute the silence into surrounding words.

**Poor audio quality.** Heavy reverberation, low bandwidth, and background noise degrade the acoustic scoring and widen boundary error.

**Very long files.** Numerical stability and memory constrain search over hours of audio. Systems handle this by chunking, and chunk boundaries can introduce local errors if the chunking is naive.

**Code switching.** Speech alternating between languages needs either a multilingual model or per-language segmentation, and monolingual alignment degrades on the passages in the other language.

## Practical Guidance

**Feed alignment the cleanest audio you have.** The isolated dialogue stem, if separation has been done, rather than the full mix. This is the highest-leverage single change.

**Match the transcript to the audio, including disfluencies**, if you want maximum timing accuracy. Where the transcript is cleaned for readability, expect boundary error around the removed material and accept it.

**Supply a pronunciation dictionary** for proper nouns, product names, and domain terminology. It is a short file and it removes a whole error class.

**Separate speakers first.** Diarization before alignment, alignment per speaker turn, produces better results on multi-speaker content than aligning a single interleaved transcript.

**Segment long audio at natural pauses**, not at fixed intervals, when chunking is required.

**Check confidence and duration plausibility.** Words with very low alignment confidence, implausibly long durations, or zero duration are the markers of a transcript-audio mismatch. Flag them for review rather than trusting the output.

**Align after human correction, not before.** The corrected transcript is the one worth having accurate timing for.

**Store word-level timings as a durable asset.** They are the input to subtitle regeneration, dub timing, search indexing, and any future re-cut. Regenerating them each time discards work and invites inconsistency.

[![Studio monitors and audio interface](https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## A Working Checklist

- Use alignment rather than recognition whenever an accurate transcript already exists.
- Run recognition, correct the text, then re-align to recover timing damaged by editing.
- Feed alignment the isolated dialogue stem rather than the full mix where separation is available.
- Include disfluencies in the transcript when timing accuracy matters most.
- Supply a custom pronunciation dictionary for names and domain terms.
- Diarize before aligning and align per speaker turn on multi-speaker content.
- Chunk long audio at natural pauses rather than fixed intervals.
- Flag low-confidence words, zero-length words, and implausibly long durations for review.
- Treat a wholesale alignment failure as evidence of transcript-audio mismatch, not of a bad algorithm.
- Handle code-switched content with a multilingual model or per-language segmentation.
- Store word-level timings as a durable asset alongside the reviewed transcript.
- Regenerate subtitle segmentation from stored word timings rather than re-running the whole pipeline.

## Frequently Asked Questions

**What is the difference between forced alignment and transcription?**

Transcription takes audio and produces text, choosing among all possible words and therefore capable of lexical errors. Alignment takes audio plus a known transcript and produces timing only. Because the words are given, alignment cannot get them wrong — it can only misplace boundaries — which makes it more accurate, faster, and cheaper than recognition when the text already exists.

**Why is my alignment completely wrong in one section?**

Almost always because the transcript does not match the audio there. A missing sentence, a paraphrase, or an unmarked cut forces the algorithm to distribute a wrong word sequence across the audio, and it will produce an alignment regardless because it must produce a path. Check the transcript against the audio at the point where confidence drops.

**How accurate is word-level timing?**

On clean single-speaker audio with a matching transcript, boundary error is typically in the tens of milliseconds — well below perceptual thresholds for subtitle timing and adequate for dub segment placement. Accuracy degrades with background noise, overlapping speech, reverberation, and out-of-dictionary words, and phoneme-level precision for lip sync is more demanding than word-level precision for subtitles.

**Do I need alignment if my transcription tool already returns timestamps?**

Often not for the raw output, since most modern recognition systems return usable word timings. You do need it after human correction: edits insert words that have no timestamps and shift the ones around them. Re-aligning the corrected transcript restores accurate timing across the whole file, which is what subsequent subtitle and dub work depends on.

**Can alignment handle two people talking over each other?**

Poorly. A linear transcript cannot represent simultaneous speech, so the overlap region aligns badly and errors often propagate past it. Run speaker separation first and align each speaker's turns individually. On content with heavy overlap, source separation into per-speaker stems before alignment produces substantially better results.

**Can I align a translated script to the original audio?**

No, and it is a common misunderstanding. Alignment matches a phoneme sequence to the acoustic signal that produced it. A translation is a different phoneme sequence entirely, so there is nothing for the algorithm to match and the output is meaningless. What you can do is align the source transcript to the source audio, establish where each source phrase sits, and use those boundaries as the timing targets the translated phrases must fit into. The alignment is always source-to-source; the translation inherits the timing structure it produces.

**Does alignment work on singing?**

Poorly with general models. Sung speech stretches vowels far beyond spoken durations, alters phoneme realisation, and sits over instrumentation that masks consonants. Specialised lyric alignment models exist and perform considerably better than general speech models. Where the requirement is lyric timing for captions, use a purpose-built tool and expect to correct boundaries by hand at phrase level rather than trusting word-level output.

**What should I do with the word timings once I have them?**

Store them. They are the input to subtitle segmentation, reading-speed enforcement, dub phrase placement, lip sync, search indexing, and re-timing after a re-cut. Treating them as a transient intermediate means regenerating them repeatedly and getting slightly different results each time.

---

Related reading: [How Lip Sync Dubbing Works](/blog/how-lip-sync-dubbing-works) | [Speaker Diarization Explained](/blog/speaker-diarization-explained) | [How to Generate Accurate Subtitles](/blog/how-to-generate-accurate-subtitles)
