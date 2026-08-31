---
{
  "title": "Webhooks for Video Translation: Building Reliable Job Callbacks",
  "slug": "video-translation-webhooks-guide",
  "category": "Developer Guides",
  "primaryKeyword": "video translation webhooks",
  "metaDescription": "How to consume webhook callbacks from a video translation API reliably: signature verification, idempotency, ordering, retries, and polling fallbacks.",
  "excerpt": "Translation jobs take minutes, not milliseconds. Webhooks are how you find out they finished — and how integrations quietly break.",
  "publishedAt": "2026-08-27T11:00:00Z",
  "updatedAt": "2026-08-27T11:00:00Z",
  "heroImage": "/assets/blog/images/relay-glass-columns.png",
  "featured": false,
  "author": "Octavia Editorial Team"
}
---

[![Developer working at a screen with code](https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Why Video Translation Is Asynchronous

A text translation request returns in under a second and fits comfortably in a request-response cycle. A video translation job does not.

Transcription, speaker separation, translation, voice generation, timing alignment, and rendering are sequential stages operating on a media file. A ten-minute video is minutes of work, and a batch of forty is longer. No sensible API holds an HTTP connection open for that.

So the interface is: submit a job, get an identifier, and be told later that it finished. "Later" arrives by one of two mechanisms — you poll, or the service calls you. Webhooks are the second, and they are more efficient, more responsive, and considerably easier to get subtly wrong.

Most integration bugs in this area are not exotic. They are the same handful of failures appearing in different codebases: unverified payloads, non-idempotent handlers, assumptions about ordering, and no fallback when delivery fails.

## The Basic Shape

A webhook integration has four parts.

**A registered endpoint.** A publicly reachable HTTPS URL you control, registered with the service either in a dashboard or per job at submission time. Per-job registration is more flexible — different callers in your system can receive their own callbacks — but means the URL must be correct at submit time.

**An event payload.** A JSON body describing what happened: a job identifier, a status, a timestamp, and either the results or references to them.

**A signature.** A cryptographic header proving the payload came from the service and was not modified.

**Your response.** A 2xx status code, returned quickly, telling the service the delivery succeeded. Anything else, or a timeout, triggers a retry.

The entire contract is that last part. A 2xx means "I have taken responsibility for this event." Everything about handler design follows from taking that seriously.

## Verify Signatures Before Anything Else

An unauthenticated webhook endpoint is an unauthenticated write path into your system. If your handler updates job state, sends notifications, or triggers downstream publishing, anyone who discovers the URL can drive it.

The standard mechanism is an HMAC signature over the raw request body using a shared secret, delivered in a header alongside a timestamp.

The implementation details that matter:

**Compute over the raw body, not the parsed object.** Framework middleware that parses JSON before your handler sees it destroys the exact bytes that were signed. Re-serialising the parsed object produces different bytes — key order, whitespace, number formatting — and the signature will not match. Capture the raw body first.

**Use a constant-time comparison.** Comparing signature strings with ordinary equality leaks timing information. Every language's crypto library has a timing-safe comparison; use it.

**Check the timestamp.** Reject payloads older than a few minutes. Without this, a captured valid request can be replayed indefinitely.

**Fail closed.** A missing signature header is a rejection, not a pass-through. It is easy to write a check that silently skips verification when the header is absent, and that check protects nothing.

**Support secret rotation.** Accept two valid secrets during a rotation window so you can roll the secret without dropping deliveries.

[![Server racks in a data centre](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Assume Every Event Arrives More Than Once

At-least-once delivery is the norm. A retry happens whenever the service does not receive a timely 2xx, and that includes the case where your handler completed all its work and the response was lost on the way back. Duplicate delivery is not an error condition; it is expected operation.

If your handler is not idempotent, duplicates produce duplicate side effects: two notification emails, two downstream publishes, two rows, two charges against an internal budget.

Making handlers idempotent:

**Key on the event identifier, not the job identifier.** A job produces several events over its lifetime. Deduplicating by job would drop legitimate later events.

**Record processed event identifiers in a store with a uniqueness constraint.** Insert first, and treat a constraint violation as "already handled, return 200." Checking for existence and then inserting is a race that concurrent deliveries will find.

**Make state transitions monotonic.** A job that has reached `completed` should ignore a late-arriving `processing` event. Model status as an ordered progression and refuse backwards moves rather than blindly assigning whatever arrived.

**Expire deduplication records on a schedule.** Retries do not continue indefinitely. Keeping keys for a week is plenty and stops the table growing without bound.

## Do Not Trust Ordering

Webhook deliveries are independent HTTP requests over an unreliable network. They arrive in the order they arrive, which is usually but not always the order they were sent.

A `completed` event overtaking a `processing` event is entirely possible, particularly when the earlier one was retried after a transient failure. A handler that assumes sequence will occasionally write a completed job back to in-progress and leave it there.

Two defences, used together:

**Include and respect a monotonic field.** A sequence number or an event timestamp lets you discard anything older than what you have already applied to that job.

**Model status as a state machine with allowed transitions.** Define which moves are legal and reject the rest. This catches ordering problems and malformed events with one mechanism.

## Respond Fast, Work Later

The single most common cause of webhook retry storms is a handler that does the real work inline.

The service is waiting on your response with a short timeout — typically a handful of seconds. If your handler downloads a rendered video, writes it to object storage, updates a database, and notifies three internal systems before responding, you will exceed that timeout under load. The service retries. The retry does the same slow work. Your queue depth grows, latency rises, and more deliveries time out. The failure is self-reinforcing.

The correct shape:

1. Read the raw body.
2. Verify the signature.
3. Deduplicate on the event identifier.
4. Persist the event.
5. Return 200.
6. Process asynchronously from your own queue.

Everything after step five happens on your schedule, with your own retry policy and your own visibility. Failures in your processing become your problem to retry rather than a reason for the sender to redeliver.

This also fixes a subtler issue: what a non-2xx response means. If your handler returns 500 because your downstream storage was briefly unavailable, the sender retries an event that was structurally fine. Separating acceptance from processing means you only return a non-2xx when the event itself could not be accepted.

## Always Keep a Polling Fallback

Webhooks fail in ways you will not be notified about. Your endpoint is down during a deploy, a DNS change propagates badly, a certificate expires, a firewall rule changes, the sender exhausts its retries while you are still fixing things. In every case the event is gone and your job sits in `processing` forever.

The fix is not more webhook reliability. It is a reconciliation loop.

Run a periodic job that finds records stuck in a non-terminal state past a reasonable threshold and queries the API for their current status directly. This costs very little — most runs find nothing — and it converts silent permanent stalls into a delay of one reconciliation interval.

Set the threshold from observed completion times rather than guessing. If ninety-nine percent of jobs finish within twenty minutes, checking anything still open at forty-five is safe and unalarming.

The reconciliation loop is also what makes deploys uneventful. Missing a few deliveries during a rolling restart stops mattering when a sweep picks them up.

[![Person reviewing dashboards on a monitor](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80&fm=jpg&fit=crop)](https://octavia.lunartech.ai)

## Operating Webhooks in Practice

**Log every delivery with its event identifier, signature validity, and outcome.** When a customer reports a missing translation, the first question is whether the event ever arrived. Without a log you cannot answer it.

**Alert on the absence of events, not only on errors.** A webhook integration that has silently stopped receiving produces no errors at all. A check for zero deliveries in a window where you expected some catches this.

**Keep the endpoint boringly available.** No authentication redirect, no maintenance page that returns 503 for an hour, no rate limiter that treats a retry burst as an attack. Give it its own route with its own limits.

**Test with replayed real payloads.** Capture genuine deliveries in a staging environment and replay them. Hand-written fixtures drift from the real schema and hide field changes.

**Handle unknown event types gracefully.** Services add event types. An unrecognised type should be logged and acknowledged, not rejected — rejecting it triggers pointless retries of something you were never going to process.

**Watch payload size.** Some events carry results inline; others carry URLs. Where results are inline, they can be large, and a body size limit in front of your handler will reject them with a 413 that looks like your endpoint is broken.

**Treat result URLs as expiring.** Download and store what you need promptly rather than persisting a signed URL and expecting it to work next month.

## A Working Checklist

- Verify the HMAC signature over the raw request body before parsing anything.
- Use a timing-safe comparison and reject requests with a missing signature header.
- Reject payloads with timestamps older than a few minutes.
- Support two valid secrets during rotation windows.
- Deduplicate on the event identifier using a uniqueness constraint, not a check-then-insert.
- Ignore events older than the last applied state for a job.
- Model job status as a state machine with explicit allowed transitions.
- Acknowledge with 200 within a second or two, then process from your own queue.
- Return non-2xx only when the event itself cannot be accepted.
- Run a reconciliation sweep for jobs stuck in non-terminal states past a threshold.
- Log every delivery with event identifier, signature result, and outcome.
- Alert when expected deliveries stop arriving, not only when they error.
- Acknowledge unknown event types rather than rejecting them.
- Download result assets promptly rather than storing signed URLs long term.

## Frequently Asked Questions

**Should I use webhooks or polling?**

Both. Webhooks as the primary path because they are faster and cheaper than frequent polling, and a periodic reconciliation sweep as a safety net because webhook delivery has failure modes you will not otherwise detect. A webhook-only integration eventually strands jobs during a deploy or a certificate problem, and a polling-only integration either wastes requests or adds latency.

**What happens if my endpoint is down during a deploy?**

The service retries on a backoff schedule, so brief downtime usually resolves itself. Longer outages exhaust the retry budget and the event is lost permanently. This is exactly what the reconciliation sweep exists for — it finds jobs still open past a threshold and queries their status directly.

**How do I test webhooks locally?**

A tunnelling tool that exposes a local port on a public HTTPS URL is the standard approach for interactive development. For automated tests, capture real deliveries in staging and replay them against your handler, which keeps your fixtures honest as the payload schema evolves. Hand-written fixtures drift and hide field changes.

**Why is my signature verification failing intermittently?**

Almost always because something is parsing and re-serialising the body before verification. Framework JSON middleware is the usual culprit — key ordering, whitespace, and number formatting all change, and the recomputed HMAC no longer matches. Capture the raw bytes before any parsing. Intermittency comes from payloads whose round-trip happens to be byte-identical some of the time.

**Do I need to handle events arriving out of order?**

Yes. Deliveries are independent HTTP requests, and a retried earlier event can land after a later one. Without protection, a late `processing` event can overwrite a `completed` state and strand the job. Discard anything older than the last applied state and enforce allowed transitions explicitly.

**How long should my handler take to respond?**

Under a second is a good target and a few seconds is the practical ceiling before senders start timing out. Achieve it by doing nothing except verification, deduplication, persistence, and acknowledgement inside the request. All real work belongs on your own queue, where you control the retry policy and can see the failures.

---

Related reading: [Video Translation API Guide](/blog/video-translation-api-guide) | [Video Translation API Error Handling](/blog/video-translation-api-error-handling) | [Embedding Video Translation in Your Product](/blog/embedding-video-translation-in-your-product)
