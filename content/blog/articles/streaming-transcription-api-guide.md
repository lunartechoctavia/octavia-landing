---
{
  "title": "Streaming Transcription APIs: Partial Results, Endpointing, and Backpressure",
  "slug": "streaming-transcription-api-guide",
  "category": "Developer Guides",
  "primaryKeyword": "streaming transcription API",
  "metaDescription": "How to build against a streaming transcription API: audio framing, partial versus final results, endpointing, reconnection, and handling backpressure.",
  "excerpt": "Batch transcription returns an answer. Streaming transcription returns a sequence of guesses that keep changing, and your UI has to cope.",
  "publishedAt": "2026-08-28T14:30:00Z",
  "updatedAt": "2026-08-28T14:30:00Z",
  "heroImage": "/assets/blog/images/platform-glass-conduit.png",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

[![Code on a monitor in a dark room](https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## How Streaming Differs

Batch transcription is a request-response operation over a complete file. The system sees all the audio, can use context from later in the recording to disambiguate earlier parts, and returns one answer.

Streaming transcription is a persistent bidirectional connection. You push audio as it arrives; the service pushes text back before the utterance is finished. The system has only the audio it has received so far, and it revises its output as more arrives.

That revision behaviour is the defining property and the source of most integration difficulty. What the service sent you two hundred milliseconds ago may be replaced by something different. A design that treats each message as an append-only fact will produce duplicated and contradictory text.

Streaming exists because latency matters: live captioning, real-time translation, voice interfaces, and live event workflows all need text before the speaker has finished. Where latency does not matter, batch transcription is more accurate, cheaper, and considerably simpler to integrate. Choosing streaming for a workflow that could tolerate a delay is a common and avoidable complication.

## Partial and Final Results

Most streaming services distinguish two kinds of result.

**Partial results** — sometimes called interim or hypothesis results — are the system's current best guess for an utterance in progress. They arrive frequently, they are unstable, and they will be superseded. Words can appear, change, and disappear as more audio arrives and the decoder revises its path.

**Final results** — sometimes called stable or committed results — are the system's settled output for a completed segment. They will not change.

The correct handling is different for each:

**Render partials as provisional.** Display them if low latency matters, and make clear in the interface that they are provisional — many live captioning implementations show partial text in a lighter weight or without punctuation.

**Never persist partials.** They are display state, not data. Writing them to a transcript store produces a record full of superseded fragments.

**Replace, do not append, on each partial.** A partial for an utterance in progress replaces the previous partial for the same utterance entirely. Appending produces duplicated text — the single most common streaming integration bug.

**Append only on final.** Finals are the append-only sequence that constitutes the transcript.

**Track utterance identity.** Services generally supply a segment or result index. Use it to know which partial replaces which, rather than assuming the most recent message relates to the most recent one you displayed.

Some services also offer stability scores on partials, indicating how likely a prefix is to survive revision. Where available, these let a caption display commit the stable prefix and keep only the unstable tail provisional, which reduces visible churn considerably.

## Audio Framing and Format

**Send the format the service wants.** Most accept linear PCM at a specified sample rate, and many accept compressed formats. Converting to the service's preferred format once at your edge is cheaper than having them transcode every stream.

**Sample rate matters for accuracy.** Sending eight kilohertz telephone-quality audio when sixteen is available loses information that affects consonant discrimination. Sending forty-eight when the model works at sixteen wastes bandwidth without improving anything.

**Frame size is a latency-versus-overhead trade.** Small frames — twenty to a hundred milliseconds — reduce latency and increase per-message overhead. Large frames do the reverse. Most services publish a recommended range; start there.

**Send audio in real time, not faster.** It is tempting to push a buffered backlog at maximum speed after a reconnection. Many services rate-limit or degrade under this, and some bill by connection duration in ways that make it counterproductive. Pace to real time unless the service explicitly supports faster-than-real-time streaming.

**Do not send silence unnecessarily.** Where you have voice activity detection at the edge, suppressing long silences reduces cost and can improve endpointing. Be careful not to clip speech onsets — a detector tuned too aggressively removes the beginning of words.

**Handle sample rate and channel mismatches explicitly.** A stereo stream sent to a mono-expecting endpoint may be interpreted as double-rate audio, producing output that is fast, high-pitched, and wrong in a way that looks like a model failure.

[![Terminal window with text output](https://images.unsplash.com/photo-1551288049-a23a13c4a2e0?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Endpointing

Endpointing is the determination of where an utterance ends. It is what converts a continuous stream into discrete segments, and it drives when finals are emitted.

Most services endpoint on silence, with a configurable threshold. The threshold is a genuine trade-off:

**Short thresholds** produce faster finals and lower latency, and they split utterances at natural pauses mid-sentence. For live captioning this can be acceptable; for anything that feeds translation it is a problem, because translating a fragment produces worse results than translating a sentence.

**Long thresholds** produce more complete utterances and higher latency, and they can merge separate utterances when a speaker pauses briefly between them.

**Different content wants different settings.** Dictation, conversation, presentation, and interview content all have different natural pause structures. A single global setting will be wrong for some of them.

**Manual endpointing** is supported by some services, letting the client signal an utterance boundary explicitly. Where your application knows something the service does not — a push-to-talk release, a turn change in a structured conversation — this is more reliable than silence detection.

**Downstream translation prefers complete sentences.** Where the stream feeds translation, buffering finals into sentence units before translating produces noticeably better output than translating each endpointed fragment. The cost is latency, and the trade should be made deliberately.

## Connection Management

Long-lived connections fail, and the failure handling is most of the production work.

**Reconnect with backoff and jitter.** The same discipline as any retry, and the jitter matters more here because a service disruption disconnects many clients simultaneously.

**Buffer audio during reconnection.** A short buffer — a few seconds — bridges brief disconnections without losing speech. A long one accumulates a backlog you cannot send at real-time pace.

**Decide what happens to the backlog.** Options are to send it faster than real time if the service allows, to send it at real time and accept growing lag, or to drop it and resume live. For live captioning, dropping and resuming is usually correct: stale captions are worse than missing ones. For recording workflows, losing audio is worse than lag.

**Expect connection duration limits.** Many services cap stream duration and require a fresh connection periodically. Handle this as a planned rotation rather than as an error, and rotate before the limit rather than after.

**Preserve context across reconnection where supported.** Some services accept a session identifier that carries context forward. Where they do not, expect a brief accuracy dip after each reconnection while the decoder rebuilds context.

**Distinguish idle from broken.** A connection with no audio flowing and one that has silently died look similar. Use whatever keepalive the protocol provides, and treat a missing keepalive as a disconnection rather than waiting for a write to fail.

## Backpressure

If your consumer cannot keep up with results, something has to give.

**Results arrive faster than a naive UI can render.** Partial results at high frequency can overwhelm a display that re-renders on every message. Coalesce partials and render at a fixed rate — several times per second is more than enough for human reading.

**Downstream processing may be slower than the stream.** Where finals feed translation, storage, or publication, that pipeline can fall behind. Queue finals rather than processing them inline on the receive path, and monitor queue depth as a health signal.

**Do not block the receive loop.** A handler that does work synchronously on the socket read path will eventually cause the transport to buffer, then to drop, then to disconnect. Read, enqueue, return.

**Shed partials before finals.** If something must be dropped under load, partials are provisional display state and finals are data. Never drop finals.

[![Server racks in a data centre](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## A Working Checklist

- Use batch transcription unless latency genuinely requires streaming.
- Replace, never append, on each partial result for the same utterance.
- Append to the transcript only on final results.
- Never persist partials; they are display state.
- Track segment identity from the service's index rather than assuming ordering.
- Use stability scores where available to commit stable prefixes and reduce visible churn.
- Convert audio to the service's preferred format and sample rate at your edge.
- Choose a frame size within the service's recommended range.
- Pace audio at real time unless faster streaming is explicitly supported.
- Verify channel count and sample rate match what the endpoint expects.
- Tune the endpointing threshold per content type rather than globally.
- Use manual endpointing where your application knows the turn boundary.
- Buffer finals into sentences before translating downstream.
- Reconnect with backoff and jitter, and buffer only a few seconds of audio.
- Decide explicitly whether to drop or replay backlog after a reconnection.
- Rotate connections before the service's duration limit rather than after.
- Treat a missing keepalive as a disconnection.
- Never block the receive loop; read, enqueue, and return.
- Coalesce partials and render at a fixed rate.
- Shed partials under load, never finals.

## Frequently Asked Questions

**Why is my transcript full of duplicated text?**

Because partial results are being appended rather than replacing the previous partial for the same utterance. A partial is the system's current guess for an in-progress utterance and will be superseded, sometimes several times per second. Track the service's segment index, replace the current partial on each update, and append to the transcript only when a final arrives.

**Should I use streaming or batch transcription?**

Batch, unless latency genuinely requires otherwise. Batch transcription sees the whole recording, can use later context to disambiguate earlier audio, is more accurate, is cheaper, and is far simpler to integrate. Streaming exists for live captioning, real-time translation, and voice interfaces where text is needed before the speaker finishes. Choosing it for a workflow that could tolerate a delay adds substantial complexity for nothing.

**What is endpointing and how should I configure it?**

The determination of where an utterance ends, usually from silence duration, which drives when final results are emitted. Short thresholds give lower latency and split sentences at mid-utterance pauses; long thresholds give more complete utterances and higher latency. Different content types have different natural pause structures, so tune per content type. Where your application knows the turn boundary — a push-to-talk release, for instance — manual endpointing beats silence detection.

**How should I handle a dropped connection mid-stream?**

Reconnect with exponential backoff and jitter, and buffer only a few seconds of audio. Then decide deliberately what to do with the backlog: for live captioning, drop it and resume live, since stale captions are worse than missing ones; for recording workflows, replay it and accept lag, since losing audio is worse. Also expect planned connection duration limits and rotate before reaching them rather than treating the cutoff as an error.

**Why did accuracy drop after reconnecting?**

The decoder lost its context. Streaming models use preceding audio to disambiguate, and a fresh connection starts without it, producing a brief accuracy dip while context rebuilds. Some services accept a session identifier that carries context across reconnection; where yours does not, the dip is expected and is another reason to prefer planned rotation at a natural pause over reconnection mid-utterance.

**What should I do if my application cannot keep up with the result stream?**

Never block the receive loop — read, enqueue, and return, doing all real work on a separate queue whose depth you monitor. For rendering, coalesce partials and update at a fixed rate a few times per second rather than on every message. If something has to be dropped under load, drop partials, which are provisional display state, and never drop finals, which are your data.

---

Related reading: [Real-Time Video Translation](/blog/real-time-video-translation) | [Video Translation API Guide](/blog/video-translation-api-guide) | [Speaker Diarization Explained](/blog/speaker-diarization-explained)
