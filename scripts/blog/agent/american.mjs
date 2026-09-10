/**
 * Normalizes British spellings to American English.
 *
 * The existing collection is mixed, but "localize" beats "localise" 98 to 0,
 * so the new batch standardizes on American English. This runs mechanically
 * after generation rather than as a validator issue, because a spelling drift
 * is not worth spending a repair round (and another API call) on.
 */

/**
 * Verb stems, matched only when followed by a real inflection. Requiring a
 * suffix is what keeps "emphasis" and "analysis" (nouns) from being mangled
 * while "emphasise" and "analyse" are corrected.
 */
const STEMS = [
  'analys', 'apologis', 'authoris', 'capitalis', 'categoris', 'centralis', 'characteris',
  'criticis', 'customis', 'digitis', 'emphasis', 'familiaris', 'finalis', 'formalis',
  'generalis', 'harmonis', 'hospitalis', 'itemis', 'localis', 'maximis', 'minimis',
  'modernis', 'nationalis', 'naturalis', 'normalis', 'optimis', 'organis', 'penalis',
  'prioritis', 'randomis', 'realis', 'recognis', 'specialis', 'stabilis',
  'standardis', 'summaris', 'synchronis', 'utilis', 'visualis',
];
// "practise" is deliberately absent: its American form is "practice", not
// "practize", so it is handled by WORDS below and must not be stem-generated.
const SUFFIXES = ['e', 'es', 'ed', 'ing', 'ation', 'ations', 'er', 'ers', 'able'];

/** Whole words with no shared-stem risk. */
const WORDS = {
  artefact: 'artifact', artefacts: 'artifacts',
  behaviour: 'behavior', behaviours: 'behaviors', behavioural: 'behavioral', behaviourally: 'behaviorally',
  colour: 'color', colours: 'colors', coloured: 'colored', colouring: 'coloring', colourful: 'colorful',
  favour: 'favor', favours: 'favors', favoured: 'favored', favourable: 'favorable',
  labour: 'labor', labours: 'labors', laboured: 'labored',
  neighbour: 'neighbor', neighbours: 'neighbors', neighbouring: 'neighboring',
  rumour: 'rumor', rumours: 'rumors',
  centre: 'center', centres: 'centers', centred: 'centered', centring: 'centering',
  metre: 'meter', metres: 'meters', theatre: 'theater', theatres: 'theaters',
  defence: 'defense', defences: 'defenses', offence: 'offense', offences: 'offenses',
  licence: 'license', licences: 'licenses',
  programme: 'program', programmes: 'programs',
  catalogue: 'catalog', catalogues: 'catalogs', catalogued: 'cataloged',
  grey: 'gray', greyed: 'grayed',
  sceptical: 'skeptical', sceptic: 'skeptic', scepticism: 'skepticism',
  judgement: 'judgment', judgements: 'judgments',
  fulfil: 'fulfill', fulfils: 'fulfills', fulfilment: 'fulfillment',
  enrol: 'enroll', enrols: 'enrolls', enrolment: 'enrollment',
  labelled: 'labeled', labelling: 'labeling',
  modelled: 'modeled', modelling: 'modeling',
  travelled: 'traveled', travelling: 'traveling', traveller: 'traveler', travellers: 'travelers',
  cancelled: 'canceled', cancelling: 'canceling', cancellation: 'cancellation',
  signalled: 'signaled', signalling: 'signaling',
  towards: 'toward', amongst: 'among', whilst: 'while',
  ageing: 'aging', storey: 'story', storeys: 'stories',
  practise: 'practice', practised: 'practiced', practising: 'practicing',
};

function buildMap() {
  const map = new Map(Object.entries(WORDS));
  for (const stem of STEMS) {
    for (const suffix of SUFFIXES) {
      // "analyse" -> "analyze": the s in the stem becomes a z.
      map.set(stem + suffix, `${stem.slice(0, -1)}z${suffix}`);
    }
  }
  return map;
}

const MAP = buildMap();
const PATTERN = new RegExp(`\\b(${[...MAP.keys()].join('|')})\\b`, 'gi');

/** Preserves the original capitalization of the matched word. */
function matchCase(source, replacement) {
  if (source === source.toUpperCase() && source.length > 1) return replacement.toUpperCase();
  if (source[0] === source[0].toUpperCase()) return replacement[0].toUpperCase() + replacement.slice(1);
  return replacement;
}

export function toAmericanEnglish(text) {
  return String(text).replace(PATTERN, (match) => {
    const replacement = MAP.get(match.toLowerCase());
    return replacement ? matchCase(match, replacement) : match;
  });
}
