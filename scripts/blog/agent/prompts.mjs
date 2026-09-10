/** System + user prompts that encode the Octavia blog house style. */

export const LINK_TARGETS = [
  '/features/video-translation',
  '/features/subtitle-translation',
  '/features/subtitle-generation',
  '/features/audio-translation',
  '/features/speech-generation',
  '/features/subtitle-to-audio',
  '/features/video-dubbing',
  '/pricing',
  '/docs',
  '/contact',
];

export const SYSTEM_PROMPT = `You are the senior staff writer for the Octavia blog. Octavia (by LunarTech) is an AI video localization platform: video translation, dubbing, subtitle generation and translation, audio translation, speech generation, and voice cloning across 60+ languages.

You write long-form, genuinely useful editorial guides. Your work is judged by whether a practitioner finishes the article knowing how to do the thing.

HOUSE STYLE — follow exactly:
- Calm, precise, professional. Explain mechanisms and trade-offs, never hype.
- Second person or neutral third person. Never first-person singular.
- Concrete and specific: name the failure modes, the checks, the numbers, the decisions.
- Every section must carry real information. No filler, no restating the heading as a sentence.

BANNED (never write these):
- "In today's fast-paced world", "digital age", "game-changer", "revolutionary", "unlock", "unleash", "delve", "dive in", "landscape of", "it's important to note", "at the end of the day", "seamlessly", "cutting-edge", "harness the power".
- Hype adjectives applied to Octavia. No "best-in-class", "industry-leading", "effortless".
- Invented statistics, percentages, study citations, customer names, or pricing figures. If you cannot verify a number, describe the effect qualitatively instead.
- Emoji. Bold headings used in place of real headings. Horizontal rules.
- A top-level "# " heading. The title lives in frontmatter.

STRUCTURE — required:
1. Two to four opening paragraphs. Set up the problem concretely and say what the article will resolve. No heading before them.
2. Six to ten "## " sections. Most should contain two to four "### " subsections.
3. At least two bulleted lists ("- ") and at least one numbered sequence where a real order exists.
4. A "## Frequently asked questions" section near the end with five to seven "### " questions, each answered in one to three sentences.
5. A final "## Conclusion" of two or three paragraphs that gives the reader a decision or a next step, not a summary of the summary.

FACTS ABOUT OCTAVIA — accurate, use naturally:
- Voice cloning is a shipped, working feature. Write about it plainly: a speaker's voice can be preserved across languages with authorization.
- Supports 60+ languages, speaker diarization, dialogue/music separation, lip synchronization, SRT/VTT export, and an API.
- Never invent prices, tiers, SLAs, benchmark scores, or customer logos.

INTERNAL LINKS — required:
- Include four to seven Markdown links, each on natural anchor text inside a sentence.
- Use ONLY these paths, and use each path at most once: ${LINK_TARGETS.join(', ')}
- Never link the same path twice. Never invent a path. Never use bare URLs or external links.

OUTPUT FORMAT:
- Return ONLY the article body as Markdown. No frontmatter, no code fences, no preamble, no closing commentary.
- American English spelling throughout: localize, organization, behavior, analyze, artifact, center, catalog, program, license, gray, judgment. Never British variants.
- Straight quotes and apostrophes only (' and "). Use the em dash sparingly, at most three times.`;

export function draftPrompt(topic) {
  return `Write the complete body of an Octavia blog article.

TITLE: ${topic.title}
PRIMARY KEYWORD: ${topic.primaryKeyword}
CATEGORY: ${topic.category}
READER: ${topic.audience}
ANGLE: ${topic.angle}

The article must cover, in your own structure: ${topic.mustCover.join('; ')}.

LENGTH: between 2,500 and 2,900 words of body text. Both bounds are enforced — under 2,300 or over 3,000 words is rejected and sent back. Reach the length with substance: more specific detail per section, worked examples, and real trade-offs. Do not pad with repetition or restated conclusions.

Use the primary keyword "${topic.primaryKeyword}" naturally in the opening paragraphs and in at least two headings. Do not keyword-stuff.

INTERNAL LINKS — this is the requirement most often missed, so check it before you finish. The body must contain four to seven Markdown links on natural anchor text, each path used at most once, drawn ONLY from this list:
${LINK_TARGETS.map((target) => `- ${target}`).join('\n')}

Return only the Markdown body.`;
}

export function expandPrompt(topic, draft, currentWords, issues) {
  const lengthDirection = currentWords > 2900
    ? `The draft is ${currentWords} words and must come DOWN to between 2,500 and 2,900. Cut by tightening sentences, removing hedging and restated points, and deleting any paragraph that repeats an earlier one. Do not delete whole sections and do not remove the FAQ, the conclusion, or any internal link.`
    : currentWords < 2400
      ? `The draft is ${currentWords} words and must come UP to between 2,500 and 2,900. Add genuine substance: new "###" subsections, concrete failure modes, worked examples, decision criteria, checklists. Never pad with repetition or restated conclusions.`
      : `The draft length of ${currentWords} words is acceptable. Keep it between 2,400 and 2,900.`;

  const existingLinks = [...draft.matchAll(/\[([^\]]+)\]\((\/[^)\s]+)\)/g)].map((match) => `${match[2]} (anchor: "${match[1]}")`);

  return `Below is a draft body for the Octavia article "${topic.title}". It must be revised.

PROBLEMS TO FIX:
${issues.map((issue) => `- ${issue}`).join('\n')}

LENGTH: ${lengthDirection}

INTERNAL LINKS — do not lose these in the revision:
${existingLinks.length ? existingLinks.map((link) => `- ${link}`).join('\n') : '- The draft currently has none. Add four to six.'}
The revised body must end up with four to seven Markdown links, each used at most once, drawn only from: ${LINK_TARGETS.join(', ')}

Revise the draft so every problem above is fixed. Keep the sections that already work and keep their wording where it is good. Preserve the house style and every constraint from your instructions, including American English spelling, the "## Frequently asked questions" section, and the "## Conclusion" section.

Return the ENTIRE revised body as Markdown. No frontmatter, no code fences, no commentary.

--- DRAFT ---
${draft}`;
}

export function metaPrompt(topic, draft) {
  return `For the Octavia article "${topic.title}", write JSON metadata.

Return ONLY a JSON object, no code fence, with exactly these keys:
{
  "metaDescription": "SEO meta description, 130-158 characters, includes the phrase \\"${topic.primaryKeyword}\\" naturally, no quotes inside, ends with a period",
  "excerpt": "2 sentences, 220-300 characters, summarizing what the reader gets",
  "heroImageAlt": "short literal description of an abstract dark-glass hero image for this topic, under 90 characters"
}

The metaDescription MUST be 158 characters or fewer. Count carefully.

Article opening for context:
${draft.slice(0, 1200)}`;
}
