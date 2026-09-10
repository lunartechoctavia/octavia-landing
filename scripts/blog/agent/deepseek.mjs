#!/usr/bin/env node
/**
 * Minimal DeepSeek chat client for the blog agent.
 *
 * deepseek-flash is a reasoning model: it spends completion tokens on
 * `reasoning_content` before emitting `content`, so max_tokens has to cover
 * both. Calls that end with finish_reason "length" and an empty content field
 * burned the whole budget on reasoning and are retried with a larger one.
 */

const API_URL = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com';
const MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-flash';

export class DeepSeekError extends Error {
  constructor(message, { status, retryable = false } = {}) {
    super(message);
    this.name = 'DeepSeekError';
    this.status = status;
    this.retryable = retryable;
  }
}

function apiKey() {
  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) throw new DeepSeekError('DEEPSEEK_API_KEY is not set');
  return key;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function once(messages, { maxTokens, temperature, timeoutMs }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  let response;
  try {
    response = await fetch(`${API_URL}/chat/completions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey()}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: MODEL, messages, max_tokens: maxTokens, temperature, stream: false }),
      signal: controller.signal,
    });
  } catch (error) {
    throw new DeepSeekError(`request failed: ${error.message}`, { retryable: true });
  } finally {
    clearTimeout(timer);
  }

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    const retryable = response.status === 429 || response.status >= 500;
    throw new DeepSeekError(`HTTP ${response.status}: ${body.slice(0, 300)}`, { status: response.status, retryable });
  }

  const payload = await response.json();
  const choice = payload.choices?.[0];
  const content = (choice?.message?.content || '').trim();
  const finish = choice?.finish_reason;
  if (!content) {
    throw new DeepSeekError(`empty content (finish_reason=${finish})`, { retryable: true, truncated: finish === 'length' });
  }
  return { content, finish, usage: payload.usage || {} };
}

/** Chat with retry + backoff. Grows max_tokens when a call is cut off mid-reasoning. */
export async function chat(messages, options = {}) {
  const { attempts = 4, temperature = 0.7, timeoutMs = 600_000, onRetry } = options;
  let maxTokens = options.maxTokens ?? 16_000;
  let last;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await once(messages, { maxTokens, temperature, timeoutMs });
    } catch (error) {
      last = error;
      if (!(error instanceof DeepSeekError) || !error.retryable || attempt === attempts) throw error;
      if (error.truncated) maxTokens = Math.min(Math.round(maxTokens * 1.5), 64_000);
      const backoff = Math.min(2 ** attempt * 1500, 30_000) + Math.floor(Math.random() * 1000);
      onRetry?.({ attempt, error, backoff, maxTokens });
      await sleep(backoff);
    }
  }
  throw last;
}

export const modelName = MODEL;
