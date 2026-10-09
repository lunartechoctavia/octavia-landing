// The /for/<audience> pages, grouped and ordered as they appear on the /for hub
// and in every page's "More audiences" list. Each audience's copy lives in its
// own module next to this one (scripts/audiences/<slug>.mjs).

const GROUP_SLUGS = [
  {
    id: 'media',
    label: 'Media & entertainment',
    lede: 'Studios, channels and shows taking finished work into every market.',
    slugs: ['creators', 'music', 'film', 'documentary', 'podcasters', 'gaming', 'broadcasters', 'streaming', 'animation', 'audiobooks', 'sports', 'events', 'faith'],
  },
  {
    id: 'public',
    label: 'Public sector & security',
    lede: 'Agencies, newsrooms and organisations whose message has to reach everyone it concerns.',
    slugs: ['government', 'defense', 'law-enforcement', 'emergency-management', 'journalists', 'osint', 'legal', 'ngos', 'diplomacy'],
  },
  {
    id: 'business',
    label: 'Business teams',
    lede: 'The functions inside a company that publish video to customers, partners and staff.',
    slugs: ['enterprise', 'marketing', 'sales', 'saas', 'ecommerce', 'hr', 'financial-services'],
  },
  {
    id: 'learning',
    label: 'Education & health',
    lede: 'Work where comprehension is the outcome, not a nice-to-have.',
    slugs: ['educators', 'healthcare', 'pharma'],
  },
];

export const GROUPS = await Promise.all(GROUP_SLUGS.map(async ({ slugs, ...group }) => ({
  ...group,
  audiences: await Promise.all(slugs.map(async (slug) => (await import(`./${slug}.mjs`)).default)),
})));

export const AUDIENCES = GROUPS.flatMap((g) => g.audiences);
