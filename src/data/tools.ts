// Free tools (CC BY 4.0), grouped into families. /tools/ lists every family;
// each family has a page at /tools/<family>/ and each tool a page at
// /tools/<family>/<slug>/. Tool wording comes from the printed sheets; PDFs live
// in public/tools/<family>/ and page-one previews in public/images/tools/<family>/.
export interface Tool {
  slug: string;
  file: string;
  icon: string;
  question: string;
  /** Words an acronym title stands for; shown first so the caps read as an acronym. */
  expand?: string[];
  title: string;
  card: string;
  pages: string;
  lede: string;
  whatItIs: string[];
  useWhen: string[];
  steps: [string, string][];
  leaveWith: string[];
  room?: string[];
  bring?: string[];
  tips: string[];
}

const impactFirstAiTools: Tool[] = [
  {
    slug: 'first-ai-maturity-model',
    file: 'first-ai-maturity-model.pdf',
    icon: 'stairs',
    question: 'Where are we?',
    expand: ['Faster', 'Improved', 'Reshaped', 'Scaled', 'Transformed'],
    title: 'FIRST AI Maturity Model',
    card: 'Rate each way of working, and tie it to the impact it should make.',
    pages: 'PDF, two pages',
    lede: 'Rate each way of working, and tie it to the impact it should make.',
    whatItIs: [
      'A ladder of five kinds of change AI can make to the way a team works: Faster, Improved, Reshaped, Scaled and Transformed. Each rung has its own evidence.',
      'You rate a practice, such as discovery, planning or build and testing, not the whole organisation. The back page tracks one practice over time, one rung at a time.',
    ],
    useWhen: [
      'Your team uses AI but can’t say what has changed.',
      'You want to choose which way of working to improve next.',
      'You need a shared language for AI progress that isn’t a usage count.',
    ],
    steps: [
      ['Rate alone first', 'Each person writes where each practice is today, F, I, R, S or T, on their own.'],
      ['Compare', 'Where you disagree is the conversation. Ask what each rating rests on.'],
      ['Write the next rung', 'For each practice: the next rung, what would have to change to climb it, the number it should move, and an owner.'],
      ['Pick one to climb first', 'Track it on the back page, and test it as a bet on an Impact Chain.'],
      ['Check in every 2 to 4 weeks', 'Thirty minutes with the people doing the work. Show the evidence, agree the rung together, and leave with one next step, an owner and a date.'],
    ],
    leaveWith: [
      'A rating for each practice, with the reasons behind it',
      'One practice to climb first, with an owner and a target rung',
      'The number that practice should move',
    ],
    tips: [
      'Move up a rung only when the evidence on the front is true.',
    ],
  },
  {
    slug: 'impact-chain',
    file: 'impact-chain.pdf',
    icon: 'tree-structure',
    question: 'What has to be true?',
    title: 'The Impact Chain',
    card: 'Ten boxes from the job the AI takes on to the payoff. The first box you can’t fill with evidence is the weak link.',
    pages: 'PDF, one page',
    lede: 'A tool for teams shaping AI product strategy.',
    whatItIs: [
      'A one-page chain of ten boxes. Value flows from the job the AI takes on, through proof, trust, habit and retained value, to the number it moves and the payoff.',
      'The bottom row, consumption band, cost to serve and price, decides whether it pays.',
    ],
    useWhen: [
      'You’re planning a new AI product or feature.',
      'Something you’ve shipped is stuck and you need to find the weak link.',
      'You’re testing one practice you want to climb on the FIRST model.',
    ],
    steps: [
      ['Planning something new?', 'Start at the number and the payoff, boxes 6 and 7, then fill the rest.'],
      ['Something stuck?', 'Work through boxes 1 to 10 in order.'],
      ['Fill each box with evidence', 'The job, proof on real data, who catches it when it’s wrong, why someone would use it again tomorrow, what gets better with every use.'],
      ['Do the bottom row', 'How much use matters and how much costs too much, what one successful task costs, and whether you charge by seat, usage or outcome.'],
      ['Find the weak link', 'The first box you can’t fill with evidence is where to work next.'],
    ],
    leaveWith: [
      'A chain from the job to the payoff, in one view',
      'The weak link, named',
      'A first view of whether the work pays, not just whether it works',
    ],
    tips: ['Write the evidence, not the hope.'],
  },
];

export interface Family {
  slug: string;
  name: string;
  /** One line for cards and the hub. */
  card: string;
  lede: string;
  /** One third-person sentence naming the family and its author, so answer engines can quote and attribute it. */
  definition: string;
  /** The idea behind the family, a few short paragraphs. */
  idea: string[];
  /** How the tools fit together, in order. */
  path: string[];
  /** Paid help for running it, if any. */
  workshop?: { href: string; label: string };
  tools: Tool[];
}

export const families: Family[] = [
  {
    slug: 'impact-first-ai',
    name: 'Impact First AI',
    card: 'Start from the impact AI work should make, then work back to the work.',
    lede: 'Start from the impact the work should make, then work back to the work.',
    definition: 'Impact First AI is a set of free tools by Saielle DaSilva for showing the value of AI work, one practice at a time.',
    idea: [
      'Most teams have turned AI on. People have accounts, a few have built something clever, and someone senior is asking: now what?',
      'Impact First AI is a way to answer that one practice at a time. You don’t need a transformation first. Pick one way of working, change it with AI on purpose, and name the number that change should move.',
      'Name the number before you build. Building is cheap now, so it’s easy to ship a lot and never find out what any of it did. If nobody can name a number the business already tracks, that’s the finding.',
    ],
    path: [
      'Rate where each practice is today with the FIRST AI Maturity Model.',
      'Pick one to climb, and test it as a bet on the Impact Chain.',
      'Check in every two to four weeks, and move up a rung only when the evidence is true.',
    ],
    workshop: { href: '/workshops/ai-strategy/', label: 'Want someone outside the team to run it with you?' },
    tools: impactFirstAiTools,
  },
];

export const toolHref = (f: Family, t: Tool) => `/tools/${f.slug}/${t.slug}/`;
export const toolPdf = (f: Family, t: Tool) => `/tools/${f.slug}/${t.file}`;
export const toolPreview = (f: Family, t: Tool) => `/images/tools/${f.slug}/${t.slug}.png`;
