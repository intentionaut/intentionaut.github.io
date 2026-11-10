/**
 * Guides: plain answers to buyer questions. The hub, the header and each
 * guide's "more guides" list all read this, so a new guide is one entry.
 */
export interface Guide {
  slug: string;
  /** The buyer's question, as they would type it. */
  title: string;
  summary: string;
  published: string;
}

export const guides: Guide[] = [
  {
    slug: 'product-decision-quality',
    title: 'How do you know if your product decisions are good?',
    summary: 'Judge the decision before the outcome: four signs of a good product decision, and five questions to test one.',
    published: '2026-11-10',
  },
];

export const guideHref = (g: Guide) => `/guides/${g.slug}/`;
