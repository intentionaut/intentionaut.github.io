// Which design-system icon (src/assets/icons/) marks each offer, by its page.
// One map, so an offer wears the same icon wherever it is listed.
// Never an icon made of the letters "AI".
export const offerIcon: Record<string, string> = {
  '/workshops/': 'strategy',
  '/ai-product-audit/': 'magnifying-glass',
  '/product-strategy-sprint/': 'compass',
  '/fractional/': 'lighthouse',
  '/forward-deployed/': 'hammer',
  '/office-hours/': 'coffee',
  '/mentoring/': 'plant',
  '/keynote-speaker/': 'microphone-ribbon',
  '/ai-pilot-to-production/': 'airplane-takeoff',
  '/workshops/ai-strategy/': 'path',
  '/workshops/ai-opportunity-mapping/': 'squares-choose',
  '/workshops/product-maturity-model/': 'stairs',
  '/workshops/data-informed-decisions/': 'chart-line',
  '/workshops/data-culture/': 'users-three',
};

export function iconFor(href: string): string {
  const name = offerIcon[href];
  if (!name) throw new Error(`No icon for ${href}: add it to src/data/icons.ts`);
  return name;
}
