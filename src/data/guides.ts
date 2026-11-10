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
  {
    slug: 'product-org-structure',
    title: 'How should you structure a product org?',
    summary: 'Every org chart is a bet: organise around customer value, start any reorg with a goal statement, and look beyond the trio.',
    published: '2026-11-10',
  },
  {
    slug: 'research-to-roadmap',
    title: "Why doesn't our research change what we build?",
    summary: 'Shape insights so they are easy to act on, reward evidence over ideas, and plan for the politics around every finding.',
    published: '2026-11-10',
  },  {
    slug: 'choosing-a-fractional-product-leader',
    title: 'How do you choose a fractional product leader?',
    summary: 'Define the role first, ask every candidate the same questions, check references you can reach, and plan the handover.',
    published: '2026-11-10',
  },

];

export const guideHref = (g: Guide) => `/guides/${g.slug}/`;
