/**
 * What other people have said about working with me.
 *
 * These were hand-written as HTML inside contact.astro, which meant taking one
 * down was surgery on twenty lines of nested markup in a 730-line page -
 * fiddly enough to put off, on exactly the kind of request you want to action
 * the same day. Now it is one word.
 *
 * **These are other people's words, not copy.** Two things follow from that:
 *
 *  - Every entry records where it came from and roughly when, so if someone
 *    ever asks "where did you get this", the answer is in the file rather than
 *    in memory.
 *  - `enabled: false` is the way to take one down. Prefer it to deleting the
 *    entry: it keeps the provenance, makes the change visible in the diff, and
 *    means putting it back later is the same one word. Delete outright only if
 *    someone asks you to erase it entirely - and then the git history is the
 *    honest record that it was removed rather than lost.
 */

/** Where a testimonial may appear. Add to this as pages need them. */
export type Placement = 'contact' | 'home' | 'speaking';

export interface Testimonial {
  /** Stable, human-readable. Used as a key and to talk about one in a commit. */
  id: string;

  /** Their words, unedited. If it needs trimming, use an ellipsis and keep the sense. */
  quote: string;

  name: string;
  /** Job title. Kept separate from `org` so the markup can style them differently. */
  role: string;
  /** Where they were when they said it, or are best known for. */
  org: string;
  /** Their profile or site. Both name and org link here. Omit for no link. */
  url?: string;

  /** The switch. false takes it off every page immediately. */
  enabled: boolean;

  /** Which pages it may appear on. Empty means nowhere, same as disabled. */
  placements: Placement[];

  /** Where it came from - 'LinkedIn recommendation', 'email, Mar 2024', etc. */
  source: string;
  /** Roughly when it was given. ISO date; the day doesn't have to be exact. */
  receivedAt: string;

  /**
   * Stop showing it automatically after this date (ISO). For permission that
   * was given for a period, or a role that will go stale. Omit for no expiry.
   */
  showUntil?: string;

  /** Anything future-you needs to know. Never rendered. */
  note?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'susan-standiford',
    quote:
      'Saielle is an amazing leader. She has brought strong product and design skills and perspective to our organization. As a true 360-degree leader she has been able to listen, lead and influence her team, her peers and the broader organization. I highly recommend her to elevate product thinking and capabilities.',
    name: 'Susan Standiford',
    role: 'Former CTPO',
    org: 'IKEA, Stepstone',
    url: 'https://www.linkedin.com/in/susanstandiford/',
    enabled: true,
    placements: ['contact'],
    source: 'LinkedIn recommendation',
    receivedAt: '2024-01-01',
  },
  {
    id: 'bruce-mccarthy',
    quote:
      "Saielle helped a new product team choose the right product management tool for their needs. She offered her experience generously, asked the right questions, and saved them a lot of heartache. I can't thank her enough.",
    name: 'Bruce McCarthy',
    role: 'Co-Author',
    org: 'Product Roadmaps Relaunched',
    url: 'https://www.goroadmaps.com/',
    enabled: true,
    placements: ['contact'],
    source: 'LinkedIn recommendation',
    receivedAt: '2024-01-01',
  },
  {
    id: 'scott-erkkila',
    quote:
      "Saielle brings a rare willingness to both teach and learn in her work with the teams she's a part of. Her unique ability to spot value and identify relevant problems that aren't immediately obvious lifts the business, her team, and the experience for users.",
    name: 'Scott Erkkila',
    role: 'Senior Director, Software Engineering',
    org: 'Ford Motor Company',
    url: 'https://www.linkedin.com/in/scott-erkkila/',
    enabled: true,
    placements: ['contact'],
    source: 'LinkedIn recommendation',
    receivedAt: '2024-01-01',
  },
  {
    id: 'emily-tate',
    quote:
      'Saielle has a great talent for listening to problems, quickly understanding the situation, and helping others unpack ways to get through blockers and to the next phase in decision making.',
    name: 'Emily Tate',
    role: 'VP of Product, former MD',
    org: 'Mind the Product',
    url: 'https://www.linkedin.com/in/thedailyem/',
    enabled: true,
    placements: ['contact'],
    source: 'LinkedIn recommendation',
    receivedAt: '2024-01-01',
  },
  {
    id: 'wes-galliher',
    quote:
      'Saielle has the rare gift of uncovering the "why" in every situation. I\'ve watched her do this with stakeholder requests, product prioritization, and driving conversations toward the outcomes that actually matter.',
    name: 'Wes Galliher, PhD.',
    role: 'Director of Product Management',
    org: 'Weave',
    url: 'https://www.linkedin.com/in/wesgalliher/',
    enabled: true,
    placements: ['contact'],
    source: 'LinkedIn recommendation',
    receivedAt: '2024-01-01',
  },
  {
    id: 'randy-silver',
    quote:
      "Saielle is a design leader with a great mind for product, and she's also led product teams. Many of us claim expertise in either product or design, but it's the rare person who can speak with passion, expertise and curiosity to both. She is that rare person.",
    name: 'Randy Silver',
    role: 'Co-Host',
    org: 'The Product Experience Podcast',
    url: 'https://www.linkedin.com/in/randysilver/',
    enabled: true,
    placements: ['contact'],
    source: 'LinkedIn recommendation',
    receivedAt: '2024-01-01',
  },
  {
    id: 'alessandra-canella',
    quote:
      "Saielle hired for potential. I was not a profile ticking all the boxes, yet she believed I could make the jump from consultancy into the in-house world. That's a rare skill in a product leader: going beyond boxes and valuing people for what they can become, not just what they already are.",
    name: 'Alessandra Canella',
    role: 'Head of Design',
    org: 'Mega',
    url: 'https://www.linkedin.com/in/alessandracanella/',
    enabled: true,
    placements: ['contact'],
    source: 'LinkedIn recommendation',
    receivedAt: '2024-01-01',
  },
];

/**
 * The testimonials to show on a page, in file order.
 *
 * Order is deliberate rather than sorted: the sequence in the array is the
 * sequence on the page, so reordering is a cut and paste rather than a rule to
 * reverse-engineer.
 *
 * `showUntil` is compared at build time, not in the browser. The site is
 * static, so an expiry only takes effect on the next build - fine for a date
 * months out, and worth knowing if you ever set one for tomorrow.
 */
export function testimonialsFor(placement: Placement, now: Date = new Date()): Testimonial[] {
  return testimonials.filter((t) => {
    if (!t.enabled) return false;
    if (!t.placements.includes(placement)) return false;
    if (t.showUntil && new Date(t.showUntil) < now) return false;
    return true;
  });
}
