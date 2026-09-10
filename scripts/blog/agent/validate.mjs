/** Local quality gate. Mirrors scripts/blog/build.mjs so the build can never be the first thing to fail. */

import { LINK_TARGETS } from './prompts.mjs';

/** Identical word counter to build.mjs. */
export function words(value = '') {
  return (String(value).replace(/<[^>]*>/g, ' ').match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu) || []).length;
}

const BANNED_PHRASES = [
  "today's fast-paced", 'fast-paced world', 'digital age', 'game-changer', 'game changer',
  'revolutionary', 'unlock the', 'unleash', 'delve into', 'dive into', 'landscape of',
  "it's important to note", 'at the end of the day', 'seamlessly', 'cutting-edge',
  'harness the power', 'best-in-class', 'industry-leading', 'effortless', 'in conclusion,',
];

// The build hard-floor is 2000 words. The agent aims for a band inside that so
// there is margin, and caps the top end because the brief is a 2000-3000 word post.
export const MIN_WORDS = 2300;
export const MAX_WORDS = 3000;

/**
 * @returns {{issues: string[], fatal: string[], wordCount: number}}
 *   `fatal` blocks publication; `issues` are fed back to the model for repair.
 */
export function checkBody(body, topic) {
  const issues = [];
  const fatal = [];
  const wordCount = words(body);

  // Length is tracked apart from the other issues so a revision can be scored
  // on how much closer it gets to the band, not just on issue count.
  let lengthPenalty = 0;
  if (wordCount < MIN_WORDS) {
    lengthPenalty = MIN_WORDS - wordCount;
    issues.push(`The body is ${wordCount} words. It must reach at least 2,400. Add roughly ${lengthPenalty + 150} more words of genuine substance.`);
  } else if (wordCount > MAX_WORDS) {
    lengthPenalty = wordCount - MAX_WORDS;
    issues.push(`The body is ${wordCount} words, which is over the limit. Cut it to between 2,500 and 2,900 words by removing repetition and tightening prose, not by deleting sections.`);
  }
  const lengthIssues = issues.length;

  if (/^#\s/m.test(body)) issues.push('The body contains a top-level "# " heading. Remove it; the title lives in frontmatter.');
  if (/```/.test(body)) issues.push('The body contains a code fence. Remove all code fences.');
  if (/^\s*(here is|here\u2019s|sure,|certainly)/i.test(body)) issues.push('The body opens with a preamble to the reader. Start directly with the article.');

  const h2 = (body.match(/^##\s+\S/gm) || []).length;
  const h3 = (body.match(/^###\s+\S/gm) || []).length;
  if (h2 < 6) issues.push(`The body has ${h2} "##" sections. It needs at least six.`);
  if (h3 < 8) issues.push(`The body has ${h3} "###" subsections. It needs at least eight.`);

  const bullets = (body.match(/^-\s+\S/gm) || []).length;
  if (bullets < 6) issues.push(`The body has ${bullets} bullet points across all lists. Add at least two real bulleted lists.`);

  if (!/^##\s+Frequently asked questions\s*$/mi.test(body)) {
    issues.push('The body is missing a "## Frequently asked questions" section (that exact heading).');
  }
  if (!/^##\s+Conclusion\s*$/mi.test(body)) issues.push('The body is missing a "## Conclusion" section (that exact heading).');

  const links = [...body.matchAll(/\]\((\/[^)\s]*)\)/g)].map((match) => match[1]);
  const invalid = [...new Set(links.filter((link) => !LINK_TARGETS.includes(link)))];
  if (invalid.length) issues.push(`These link paths are not allowed: ${invalid.join(', ')}. Use only: ${LINK_TARGETS.join(', ')}.`);
  const duplicates = [...new Set(links.filter((link, index) => links.indexOf(link) !== index))];
  if (duplicates.length) issues.push(`These link paths are used more than once: ${duplicates.join(', ')}. Each path may appear at most once.`);
  if (links.length < 4) issues.push(`The body has ${links.length} internal links. It needs four to seven.`);
  if (/\]\((https?:)?\/\//.test(body)) issues.push('The body contains an external link. Remove it.');

  const lower = body.toLowerCase();
  const banned = BANNED_PHRASES.filter((phrase) => lower.includes(phrase));
  if (banned.length) issues.push(`Remove these banned phrases and rewrite the sentences around them: ${banned.join(', ')}.`);

  const keyword = topic.primaryKeyword.toLowerCase();
  if (!lower.includes(keyword)) issues.push(`The primary keyword "${topic.primaryKeyword}" never appears. Work it in naturally.`);

  // Unrecoverable structural damage rather than a style miss.
  if (wordCount < 700) fatal.push(`body collapsed to ${wordCount} words`);

  return { issues, fatal, wordCount, lengthPenalty, otherIssues: issues.length - lengthIssues };
}

/**
 * Lower is better. Non-length issues dominate, with distance from the word
 * band as the tiebreak, so a revision is only accepted when it is genuinely
 * closer to publishable.
 */
export function score(check) {
  return check.otherIssues * 100_000 + check.lengthPenalty;
}

export function checkMeta(meta) {
  const issues = [];
  if (!meta.metaDescription) issues.push('metaDescription is missing.');
  else if (meta.metaDescription.length > 158) issues.push(`metaDescription is ${meta.metaDescription.length} characters; rewrite it to 158 or fewer.`);
  else if (meta.metaDescription.length < 90) issues.push(`metaDescription is only ${meta.metaDescription.length} characters; expand it toward 150.`);
  if (!meta.excerpt || meta.excerpt.length < 140) issues.push('excerpt is missing or too short; write 220-300 characters.');
  return issues;
}
