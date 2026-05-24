// DERS-16 Scoring — Bjureberg et al. (2016)
//
// KEY RULES enforced here:
//  • 5 subscales only — NO Awareness subscale
//  • NO reverse scoring — every item is summed as-is
//  • Total range 16–80 (floor = 16, not 0)
//  • Higher score = greater difficulty with emotion regulation

export type SubscaleKey = 'clarity' | 'goals' | 'impulse' | 'strategies' | 'nonAcceptance';

export interface SubscaleDef {
  label: string;
  description: string;
  items: number[];   // 1-indexed item numbers
  min: number;       // items.length × 1
  max: number;       // items.length × 5
}

// Canonical item → subscale mapping
export const SUBSCALE_DEFS: Record<SubscaleKey, SubscaleDef> = {
  clarity: {
    label: 'Lack of Emotional Clarity',
    description: 'Knowing and understanding the emotions being felt',
    items: [1, 2],
    min: 2,
    max: 10,
  },
  goals: {
    label: 'Difficulties Engaging in Goal-Directed Behavior',
    description: 'Concentrating and getting things done when upset',
    items: [3, 7, 15],
    min: 3,
    max: 15,
  },
  impulse: {
    label: 'Impulse Control Difficulties',
    description: 'Staying in control of behaviour when upset',
    items: [4, 8, 11],
    min: 3,
    max: 15,
  },
  strategies: {
    label: 'Limited Access to Emotion Regulation Strategies',
    description: 'Belief that little can be done to feel better when upset',
    items: [5, 6, 12, 14, 16],
    min: 5,
    max: 25,
  },
  nonAcceptance: {
    label: 'Nonacceptance of Emotional Responses',
    description: 'Negative, self-judging reactions to one\'s own distress',
    items: [9, 10, 13],
    min: 3,
    max: 15,
  },
};

// Total range
export const TOTAL_MIN = 16;
export const TOTAL_MAX = 80;

export type DersBand = 'Low' | 'Mild–Moderate' | 'Elevated' | 'High';

// Bands quarter the real 16–80 range (not 0–80)
export function getBand(total: number): DersBand {
  if (total <= 31) return 'Low';
  if (total <= 47) return 'Mild–Moderate';
  if (total <= 63) return 'Elevated';
  return 'High';
}

export function getBandDescription(band: DersBand): string {
  switch (band) {
    case 'Low':
      return 'Minimal difficulty with emotion regulation';
    case 'Mild–Moderate':
      return 'Some difficulty with emotion regulation';
    case 'Elevated':
      return 'Elevated difficulty with emotion regulation';
    case 'High':
      return 'Significant difficulty with emotion regulation';
  }
}

export interface SubscaleScore {
  key: SubscaleKey;
  label: string;
  description: string;
  raw: number;
  min: number;
  max: number;
  /** raw / max — useful for a simple progress bar */
  pctOfMax: number;
  /** position within [min, max] — more honest for interpretation */
  pctOfRange: number;
}

export interface ScoreResult {
  // Flat fields kept for DB compatibility
  totalScore: number;
  clarityScore: number;
  goalsScore: number;
  impulseScore: number;
  strategiesScore: number;
  nonAcceptanceScore: number;
  // Rich breakdown for UI
  band: DersBand;
  bandDescription: string;
  pctOfRange: number;
  subscales: SubscaleScore[];
}

const round1 = (n: number) => Math.round(n * 10) / 10;

export function calculateScores(responses: Record<number, number>): ScoreResult {
  const subscales: SubscaleScore[] = (Object.keys(SUBSCALE_DEFS) as SubscaleKey[]).map((key) => {
    const def = SUBSCALE_DEFS[key];
    // No reverse scoring — sum items as-is
    const raw = def.items.reduce((sum, itemNum) => {
      const val = responses[itemNum];
      return sum + (val ?? 0);
    }, 0);
    return {
      key,
      label: def.label,
      description: def.description,
      raw,
      min: def.min,
      max: def.max,
      pctOfMax: round1((raw / def.max) * 100),
      pctOfRange: round1(((raw - def.min) / (def.max - def.min)) * 100),
    };
  });

  const totalScore = subscales.reduce((sum, s) => sum + s.raw, 0);
  const band = getBand(totalScore);

  return {
    totalScore,
    clarityScore:       subscales.find(s => s.key === 'clarity')!.raw,
    goalsScore:         subscales.find(s => s.key === 'goals')!.raw,
    impulseScore:       subscales.find(s => s.key === 'impulse')!.raw,
    strategiesScore:    subscales.find(s => s.key === 'strategies')!.raw,
    nonAcceptanceScore: subscales.find(s => s.key === 'nonAcceptance')!.raw,
    band,
    bandDescription: getBandDescription(band),
    pctOfRange: round1(((totalScore - TOTAL_MIN) / (TOTAL_MAX - TOTAL_MIN)) * 100),
    subscales,
  };
}

// Dev-time integrity guard — call once at boot in development
export function assertScoringIntegrity(): void {
  const allItems = (Object.keys(SUBSCALE_DEFS) as SubscaleKey[])
    .flatMap(k => SUBSCALE_DEFS[k].items);
  const unique = new Set(allItems);

  if (allItems.length !== 16 || unique.size !== 16)
    throw new Error(`Item mapping must contain 16 unique items; got ${allItems.length} (${unique.size} unique).`);

  for (let i = 1; i <= 16; i++)
    if (!unique.has(i)) throw new Error(`Item ${i} is not mapped to any subscale.`);

  const sumMax = (Object.keys(SUBSCALE_DEFS) as SubscaleKey[])
    .reduce((s, k) => s + SUBSCALE_DEFS[k].max, 0);
  if (sumMax !== TOTAL_MAX)
    throw new Error(`Subscale maxes sum to ${sumMax}, expected ${TOTAL_MAX}.`);

  if ('awareness' in SUBSCALE_DEFS)
    throw new Error('DERS-16 must not include an Awareness subscale.');
}
