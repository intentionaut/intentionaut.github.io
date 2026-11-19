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
export type Placement = 'contact' | 'home' | 'speaking' | 'fractional' | 'workshops' | 'for-ceos' | 'for-cpos-ctos' | 'for-scale-ups' | 'interim-cpo' | 'impact-chain' | 'talk-agents-2026';

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
    id: 'james-gadsby-peet',
    quote:
      'Even better, mapping the impact chain early highlights your weakest assumptions – such as testing whether a real society can import its register in under an hour before building complex extra features.',
    name: 'James Gadsby Peet',
    role: '',
    org: 'William Joseph',
    url: 'https://www.williamjoseph.co.uk/blog/how-to-connect-mural-and-claude-to-build-digital-products-that-people-actually-need',
    enabled: true,
    placements: ['impact-chain'],
    source: "William Joseph blog article, 'How to connect Mural and Claude to build digital products that people actually need'",
    receivedAt: '2026-11-19',
    note: 'He agreed by message on 2026-11-19 to this article quote on the Impact Chain page, credited "James Gadsby Peet, William Joseph" with the article link. Not agreed for other pages or channels. url is the article, not a profile.',
  },
  {
    id: 'susan-standiford',
    quote:
      'Saielle is an amazing leader. She has brought strong product and design skills and perspective to our organization. As a true 360-degree leader she has been able to listen, lead and influence her team, her peers and the broader organization. I highly recommend her to elevate product thinking and capabilities.',
    name: 'Susan Standiford',
    role: 'Former CTPO',
    org: 'IKEA, Stepstone',
    url: 'https://www.linkedin.com/in/susanstandiford/',
    enabled: true,
    placements: ['contact', 'home', 'fractional', 'interim-cpo', 'workshops', 'for-ceos', 'for-scale-ups'],
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
    placements: ['contact', 'home', 'workshops'],
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
    enabled: false,
    placements: ['contact', 'workshops'],
    source: 'LinkedIn recommendation',
    receivedAt: '2024-01-01',
    note: 'Temporarily off at Saielle\'s request, 2026-08-27. Expected back — not removed for any problem with the quote.',
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
    placements: ['contact', 'home', 'workshops'],
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
    placements: ['contact', 'home', 'workshops'],
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
    placements: ['contact', 'workshops'],
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
    placements: ['contact', 'workshops'],
    source: 'LinkedIn recommendation',
    receivedAt: '2024-01-01',
  },
  {
    id: 'jon-cockle',
    quote:
      '…Saielle has a knack for getting to the underlying decision and articulating the options in a way that makes the consequences clear.',
    name: 'Jon Cockle',
    role: 'Software Delivery Consultant',
    org: "former Head of Delivery, Sainsbury's",
    url: 'https://www.linkedin.com/in/jon-cockle-75a78867/',
    enabled: true,
    placements: ['contact', 'fractional', 'interim-cpo', 'home', 'workshops', 'for-cpos-ctos', 'for-scale-ups'],
    source: 'LinkedIn recommendation',
    receivedAt: '2026-08-28',
    note: 'Excerpt, trimmed further 2026-09-27 at Saielle\'s request: it opened "She is also particularly strong at framing choices and trade-offs for senior leaders. Rather than allowing discussions to become lost in detail," which read oddly out of context. The full recommendation is on his LinkedIn.',
  },
  {
    id: 'louise-taylor',
    quote:
      'Clear, accessible information delivered by a knowledgeable expert - useful even for a total AI novice!',
    name: 'Louise Taylor',
    role: 'Attendee',
    org: 'ProductTank Global 2026',
    enabled: true,
    placements: ['talk-agents-2026'],
    source: "ProductTank Global talk survey (Tally form Arpx5e), ticked 'You can quote this on intentionaut.com, with my name'",
    receivedAt: '2026-11-18',
  },
  {
    id: 'chris-producttank',
    quote:
      'The Openness and \'real world\' tone it had. The speaker was great and she handled the tech issues brilliantly.',
    name: 'Chris',
    role: 'Attendee',
    org: 'ProductTank Global 2026',
    enabled: true,
    placements: ['talk-agents-2026'],
    source: "ProductTank Global talk survey (Tally form Arpx5e), ticked 'You can quote this on intentionaut.com, with my name'",
    receivedAt: '2026-11-18',
  },
  {
    id: 'sebastian-producttank',
    quote:
      'It was a very honest and down-to-earth session. Very helpful to get into the topic and not be scared about starting.',
    name: 'Sebastian',
    role: 'Attendee',
    org: 'ProductTank Global 2026',
    enabled: true,
    placements: ['talk-agents-2026'],
    source: "ProductTank Global talk survey (Tally form Arpx5e), ticked 'You can quote this on intentionaut.com, with my name'",
    receivedAt: '2026-11-18',
  },
  {
    id: 'katy-producttank',
    quote:
      'I loved how human and relatable you talked through everything, so refreshing against a lot of buzzwords on podcasts or AI generated content elsewhere!',
    name: 'Katy',
    role: 'Attendee',
    org: 'ProductTank Global 2026',
    enabled: true,
    placements: ['talk-agents-2026'],
    source: "ProductTank Global talk survey (Tally form Arpx5e), ticked 'You can quote this on intentionaut.com, with my name'",
    receivedAt: '2026-11-18',
    note: 'Trailing space trimmed; words unchanged.',
  },
  {
    id: 'amy-wells',
    quote:
      'I’ve just got Claud through terminal and this was perfect timing on how to use this and more insight in how to help me as a senior product manager.',
    name: 'Amy Wells',
    role: 'Attendee',
    org: 'ProductTank Global 2026',
    enabled: true,
    placements: ['talk-agents-2026'],
    source: "ProductTank Global talk survey (Tally form Arpx5e), ticked 'You can quote this on intentionaut.com, with my name'",
    receivedAt: '2026-11-18',
    note: 'Verbatim, including "Claud".',
  },
  {
    id: 'mtp-2022-senior-pm',
    quote:
      'Best talk of the conference, you owned that stage!',
    name: 'Senior product manager',
    role: '',
    org: 'mtpcon London 2022',
    enabled: true,
    placements: ['speaking'],
    source: "Mind the Product feedback, moved from the talk archive entry (src/content/talks/mtp-f-words-2022.md)",
    receivedAt: '2022-10-14',
  },
  {
    id: 'pk-producttank',
    quote:
      'Saielle’s authenticity - I honestly wished it went longer/wish I could have a 1:1!',
    name: 'PK',
    role: 'Attendee',
    org: 'ProductTank Global 2026',
    enabled: true,
    placements: ['speaking'],
    source: "ProductTank Global talk survey (Tally form Arpx5e), ticked 'You can quote this on intentionaut.com, with my name'",
    receivedAt: '2026-11-18',
  },
  {
    id: 'fiona-macneill',
    quote:
      'I love how authentic, clear, and open Saielle is – she really inspired me to get into product.',
    name: 'Fiona MacNeill',
    role: 'Attendee',
    org: 'ProductTank Global 2026',
    enabled: true,
    placements: ['speaking'],
    source: "ProductTank Global talk survey (Tally form Arpx5e), ticked 'You can quote this on intentionaut.com, with my name'",
    receivedAt: '2026-11-18',
  },
  {
    id: 'mtp-2022-pm',
    quote:
      'You were excellent, I needed a reminder to give a fuck, thank you.',
    name: 'Product manager',
    role: '',
    org: 'mtpcon London 2022',
    enabled: true,
    placements: ['speaking'],
    source: "Mind the Product feedback, moved from the talk archive entry (src/content/talks/mtp-f-words-2022.md)",
    receivedAt: '2022-10-14',
  },
  {
    id: 'paul-producttank',
    quote:
      'I think the scope was well set. Not going too deep in to details, but focussing on the overall concept.',
    name: 'Paul',
    role: 'Attendee',
    org: 'ProductTank Global 2026',
    enabled: true,
    placements: ['speaking'],
    source: "ProductTank Global talk survey (Tally form Arpx5e), ticked 'You can quote this on intentionaut.com, with my name'",
    receivedAt: '2026-11-18',
  },
  {
    id: 'mtp-2022-leader',
    quote:
      'What I loved about your talk was that it was truly original content, on an important topic, delivered with passion and energy, and contextualised in your personal experience in a way that felt very visceral. You created a connection with the audience that was unique to that room, on that day.',
    name: 'Product leader, mtpcon attendee since 2015',
    role: '',
    org: 'mtpcon London 2022',
    enabled: true,
    placements: ['speaking'],
    source: "Mind the Product feedback, moved from the talk archive entry (src/content/talks/mtp-f-words-2022.md)",
    receivedAt: '2022-10-14',
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
