---
{
  "title": "Error Handling for Video Translation APIs: Retries, Backoff, and Partial Failure",
  "slug": "video-translation-api-error-handling",
  "category": "Developer Guides",
  "primaryKeyword": "video translation API error handling",
  "metaDescription": "How to build resilient video translation integrations: which errors to retry, how to back off, handling partial batch failure, and budgeting for long jobs.",
  "excerpt": "Long-running media jobs fail differently from ordinary API calls. Retrying them the same way makes things worse.",
  "publishedAt": "2026-08-27T12:30:00Z",
  "updatedAt": "2026-08-27T12:30:00Z",
  "heroImage": "/assets/blog/images/fork-glass-path.jpg",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

[![Engineer reviewing logs on a screen](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Why Media Jobs Break the Usual Rules

The standard advice for API resilience — retry on failure with exponential backoff — was written for requests that are cheap, fast, and idempotent. A failed call costs a few milliseconds and retrying it costs a few more.

A video translation job is none of those things. It runs for minutes, consumes real compute, and often costs money per invocation. Retrying it blindly can duplicate work you have already paid for, and retrying a batch of fifty because one item failed multiplies that by fifty.

The distinctions that matter are ones the generic advice glosses over: which failures are transient, which stage of a multi-stage job failed, whether a retry resumes or restarts, and whether a partially successful batch should be resubmitted whole.

## Classify Before You Retry

The first decision on any error is whether retrying can possibly help. Three categories.

**Permanent failures.** Something about the request is wrong and will be wrong again. Invalid authentication, malformed parameters, an unsupported language pair, a media file in an unsupported codec, a corrupt upload, a request for a feature not enabled on the account. Retrying wastes time and hides the real problem. Surface these immediately with the detail needed to fix them.

**Transient failures.** The request was fine and the system was temporarily unable to serve it. Network timeouts, connection resets, 502 and 503 responses, rate limits. These are worth retrying and usually succeed.

**Ambiguous failures.** You do not know whether the request was processed. A timeout after the request was sent is the classic case: the job may be running, or the submission may never have landed. These need idempotency rather than retry logic.

The mapping from HTTP status to category is mostly conventional and occasionally wrong. `429` is transient with a specified wait. `5xx` is usually transient, but a `500` that reproduces on every attempt with the same input is a permanent failure being reported badly. `4xx` other than `429` is permanent, except that some services return `409` for a temporary conflict that will clear.

Read the error body rather than switching on the status code alone. Most services return a machine-readable error code that is more precise than the status, and a `retryable` flag where they are being helpful.

## Idempotency Keys Solve the Ambiguous Case

The ambiguous failure is the one that costs money, because the natural response — resubmit — duplicates a job that may already be running.

The standard solution is an idempotency key: a unique value you generate per logical operation and send with the request. If the service receives two requests with the same key, it processes the first and returns the first one's result for the second.

Using them correctly:

**Generate the key from your side of the operation, deterministically.** A hash of the source asset identifier, target language list, and configuration works well, because a genuine retry produces the same key and a genuinely new job produces a different one. A random UUID stored alongside the pending request also works, but must be persisted before the request is sent — a key generated in memory and lost in the crash you are recovering from provides nothing.

**Persist the key before sending, not after.** The whole point is surviving a failure between send and response.

**Reuse the key for every retry of the same logical submission**, including retries that happen days later after a manual intervention.

**Change the key when the request changes.** Adding a language makes it a different operation.

Where a service does not support idempotency keys, the fallback is to query before submitting: look for an existing job matching your parameters, and submit only if none exists. This is racy and weaker, but it converts the common case from duplicate work to no duplicate work.

[![Network cables and switches](https://images.unsplash.com/photo-1551288049-a23a13c4a2e0?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Backoff That Behaves Under Load

Exponential backoff with jitter is the correct default, and the jitter is not optional.

Without it, a group of clients that failed simultaneously — because the service had a brief outage — will retry simultaneously, at the same intervals, indefinitely. The synchronised retry wave is often what keeps a recovering service down. Full jitter, where each delay is a random value between zero and the current exponential ceiling, spreads the load and resolves this.

Other parameters worth thinking about rather than copying:

**Base delay** should reflect the operation. A submission call can retry in a second. A status poll on a job that takes ten minutes should not.

**Maximum delay** caps the ceiling so a long-lived process does not end up waiting an hour between attempts.

**Maximum attempts or maximum elapsed time.** Elapsed time is usually the better bound for user-facing work, because it maps to a promise you can make. Attempt counts are easier to reason about for background work.

**Respect `Retry-After`.** When the service tells you when to come back, that is authoritative and better than your own calculation. Ignoring it on rate limit responses is a common cause of prolonged throttling.

**Do not retry inside a retry.** Layered retry logic — an HTTP client retrying, wrapped by a service client retrying, wrapped by a job runner retrying — multiplies. Three layers of three attempts is twenty-seven requests for one logical call. Decide which layer owns retries and disable it elsewhere.

## Circuit Breakers for Sustained Failure

Retries handle brief failures. They handle sustained failures badly, because every request adds load to a service that is already struggling and every caller waits through the full retry schedule before failing.

A circuit breaker tracks the failure rate and, once it crosses a threshold, stops sending requests entirely for a cooling period. Calls fail immediately during that window. After it, a small number of probe requests test whether the service has recovered, and success restores normal operation.

For a video translation integration, the breaker should sit around submission and status calls, and its open state should mean "queue the work locally" rather than "fail the user's request." A job that cannot be submitted now can almost always be submitted in five minutes, and the user's expectation for a job measured in minutes is tolerant of that.

Keep the breaker's state observable. An open circuit is an incident, and it should be visible as one rather than showing up as unexplained latency.

## Partial Failure in Batches

Submitting thirty languages as one batch and receiving one error is the case that most often gets handled badly.

The wrong response is resubmitting the batch. Twenty-nine languages that completed are regenerated, at cost, and any reviewed corrections in them are at risk.

Correct handling depends on the batch semantics, which you should confirm before designing around them:

**Per-item results.** Well-designed batch endpoints return a result per item, each with its own status. Retry only the failed items. This is the case to hope for and to check for in the documentation.

**All-or-nothing.** The batch either succeeds or fails as a unit. Retrying the whole thing is correct, and the mitigation is smaller batches.

**Undefined.** The response reports an error without saying what happened to the other items. Query each item's state before deciding anything.

The general design guidance is to submit work at the granularity you want to retry at. If a per-language failure should be retried per language, submit per language and manage the group yourself. The batching convenience is rarely worth the coupling.

Where a job fails partway through its own internal stages — transcription succeeded, voice generation failed — check whether the service supports resuming from the completed stage. Where it does, resuming is dramatically cheaper than restarting, and where it does not, caching your own intermediate outputs makes a resubmission cheaper: supply the reviewed transcript rather than the raw media.

## Error Messages Worth Reading

Media jobs fail for reasons that are specific and fixable, and generic error handling loses that specificity.

Common permanent failures worth mapping to actionable messages:

- **Unsupported or corrupt media.** Wrong container, unsupported codec, truncated upload, zero-length audio stream.
- **No detectable speech.** Silent track, music-only content, wrong audio stream selected on a multi-track file.
- **Source language mismatch.** The declared source language does not match the audio, which produces either an error or, worse, plausible nonsense.
- **Unsupported language pair.** Direction not available, or a language variant not offered.
- **Duration or size limits.** Above the account or endpoint ceiling.
- **Quota exhausted.** Distinct from rate limiting; retrying will not help until quota resets or is raised.

Each of these has a different fix and a different owner. Collapsing them into "translation failed" guarantees a support ticket.

[![Person analysing metrics on a dashboard](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## A Working Checklist

- Classify every error as permanent, transient, or ambiguous before deciding whether to retry.
- Read the machine-readable error code in the body rather than switching on HTTP status alone.
- Never retry permanent failures; surface them with enough detail to act on.
- Use deterministic idempotency keys and persist them before sending the request.
- Reuse the same key for every retry of the same logical submission.
- Apply exponential backoff with full jitter on every retry path.
- Honour `Retry-After` when the service supplies it.
- Bound retries by elapsed time for user-facing work and by attempts for background work.
- Own retries at exactly one layer of the stack and disable them elsewhere.
- Put a circuit breaker around submission and status calls, and queue locally when it opens.
- Make circuit breaker state visible in monitoring.
- Confirm batch failure semantics before designing around them.
- Submit work at the granularity you want to retry at.
- Resume from completed stages where supported, and cache intermediate outputs where not.
- Map common media failures to specific, actionable messages rather than a generic error.

## Frequently Asked Questions

**Should I retry a failed video translation job automatically?**

Only if the failure is transient. Network errors, timeouts, 429s, and 502/503 responses are worth retrying. Unsupported media, unsupported language pairs, quota exhaustion, and validation errors will fail identically every time, and retrying them wastes time and obscures the actual problem. The error body usually distinguishes them more reliably than the status code.

**How do I avoid paying twice for a duplicated job?**

Idempotency keys. Generate one deterministically from the source asset, target languages, and configuration, persist it before sending, and reuse it on every retry. The service then returns the original job for any repeat submission. Where keys are not supported, query for an existing matching job before submitting — weaker, but it prevents the common case.

**What retry schedule should I use for status polling?**

Not the same one as for submissions. Polling a job that typically takes ten minutes every second is wasteful and can trip rate limits. Start at an interval informed by observed completion times, back off gradually, and cap the interval so you do not end up checking a finished job an hour late. Webhooks are better where available, with polling as reconciliation.

**One language in my batch failed. Should I resubmit the batch?**

Almost never. Check whether the endpoint returns per-item results — most well-designed ones do — and retry only the failed item. Resubmitting the whole batch regenerates work you already paid for and risks overwriting reviewed corrections in the languages that succeeded. If the batch really is all-or-nothing, use smaller batches.

**Why do I keep getting rate limited even though I back off?**

Usually one of three things: retries at multiple layers of the stack multiplying request counts, missing jitter causing synchronised retry waves across your workers, or ignoring `Retry-After` and coming back sooner than the service asked. Check the layering first — nested retry logic is the most common and the least visible.

**How should a failure partway through a job be handled?**

Find out whether the service can resume from the last completed stage. Transcription is often the most expensive stage, and a failure in voice generation should not require redoing it. Where resume is unsupported, cache the intermediate outputs you can supply back — a reviewed transcript submitted with the retry skips the stage that already succeeded.

---

Related reading: [Video Translation API Guide](/blog/video-translation-api-guide) | [Webhooks for Video Translation](/blog/video-translation-webhooks-guide) | [Video Translation Batch Workflow](/blog/video-translation-batch-workflow)
