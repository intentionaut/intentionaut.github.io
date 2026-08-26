export type Theme =
  | 'craft'
  | 'storytelling'
  | 'research'
  | 'ethics'
  | 'leadership'
  | 'ai'
  | 'career';

export const themeLabels: Record<Theme, string> = {
  craft: 'Design Craft',
  storytelling: 'Storytelling',
  research: 'Research',
  ethics: 'Ethics & Inclusion',
  leadership: 'Leadership',
  ai: 'AI & Data',
  career: 'Career',
};

export interface WritingEntry {
  title: string;
  url?: string;
  /** ISO date; year-only entries use Jan 1 and render as just the year */
  date: string;
  dateLabel?: string;
  source: string;
  themes: Theme[];
}

export const writingEntries: WritingEntry[] = [
  {
    title: 'The AI Agent Reality Check',
    date: '2026-08-01',
    dateLabel: '2026',
    source: 'The Second Draft',
    url: '/writing/the-ai-agent-reality-check',
    themes: ['ai', 'leadership'],
  },
  {
    title: 'The $610M Browser Bet: How Atlassian Plans to Own the Future of Work',
    date: '2026-07-01',
    dateLabel: '2026',
    source: 'The Second Draft',
    url: '/writing/the-610m-browser-bet-how-atlassian-plans-to-own-the-future-of-work',
    themes: ['ai'],
  },
  {
    title: 'The Coming Shift in Enterprise Metadata',
    date: '2026-06-15',
    dateLabel: '2026',
    source: 'The Second Draft',
    url: '/writing/the-coming-shift-in-enterprise-metadata',
    themes: ['ai'],
  },
  {
    title: 'Leading Data Transformation in the Age of AI',
    date: '2026-06-01',
    dateLabel: '2026',
    source: 'The Second Draft',
    url: '/writing/leading-data-transformation-in-the-age-of-ai',
    themes: ['ai', 'leadership'],
  },
  {
    title: 'When Everyone Has AI: Building Execution Advantages That Last',
    date: '2026-05-01',
    dateLabel: '2026',
    source: 'The Second Draft',
    url: '/writing/execution-vs-data-moats',
    themes: ['ai', 'leadership'],
  },
  {
    title: 'The Enterprise Guide to AI Economics',
    date: '2026-04-01',
    dateLabel: '2026',
    source: 'The Second Draft',
    url: '/writing/the-enterprise-guide-to-ai-economics',
    themes: ['ai'],
  },
  {
    title: 'The New Architecture of Software Quality',
    date: '2026-03-01',
    dateLabel: '2026',
    source: 'The Second Draft',
    url: '/writing/the-new-architecture-of-software-quality',
    themes: ['craft', 'ai'],
  },
  {
    title: 'Building AI That Actually Helps',
    date: '2026-02-01',
    dateLabel: '2026',
    source: 'The Second Draft',
    url: '/writing/building-ai-that-actually-helps',
    themes: ['ai', 'ethics'],
  },
  {
    title: 'Good Product Decisions Need Velocity',
    date: '2023-03-29',
    source: 'Blossom',
    url: '/writing/good-product-decisions-need-speed/',
    themes: ['leadership', 'research'],
  },
  {
    title: 'Good Product Decisions Need Principles',
    date: '2023-03-15',
    source: 'Blossom',
    url: '/writing/designing-good-decisions/',
    themes: ['leadership', 'research'],
  },
  {
    title: 'Org Design for Product Orgs',
    date: '2023-01-10',
    source: 'Blossom',
    url: '/writing/org-design-for-product-orgs/',
    themes: ['leadership'],
  },
  {
    title: 'Beyond human-centered design',
    date: '2022-04-22',
    source: 'Mind the Product',
    url: 'https://www.mindtheproduct.com/beyond-human-centered-design-by-saielle-dasilva/',
    themes: ['leadership', 'storytelling'],
  },
  {
    title: 'How to Hack the Culture Stack',
    date: '2022-04-05',
    source: 'Blossom',
    url: '/writing/how-to-hack-the-culture-stack/',
    themes: ['leadership'],
  },
  {
    title: 'Building Stronger Product Cultures',
    date: '2021-11-03',
    source: 'Blossom',
    url: '/writing/building-stronger-product-cultures-turingfest-edition/',
    themes: ['leadership'],
  },
  {
    title: 'Meet Saielle DaSilva',
    date: '2021-06-21',
    source: 'Blossom',
    url: '/writing/a-personal-note/',
    themes: ['career'],
  },
  {
    title: 'Getting the most out of product discovery',
    date: '2021-05-22',
    source: 'Blossom',
    url: '/writing/insights-to-actions/',
    themes: ['research', 'craft'],
  },
  {
    title: 'Mental health as a product person',
    date: '2021-05-15',
    source: 'Blossom',
    url: '/writing/mental-health-as-a-product-person/',
    themes: ['career'],
  },
  {
    title: '5 reasons not to hire a product or design candidate',
    date: '2021-04-26',
    source: 'Blossom',
    url: '/writing/5-reasons-to-reject-a-design-candidate/',
    themes: ['career', 'craft'],
  },
  {
    title: "Hire disabled people, for fuck's sake",
    date: '2021-04-22',
    source: 'Blossom',
    url: '/writing/hire-disabled-people-for-fucks-sake/',
    themes: ['ethics'],
  },
  {
    title: 'Depression, anxiety, politics at work, and product leadership',
    date: '2021-04-18',
    source: 'Blossom',
    url: '/writing/depression-and-work/',
    themes: ['career', 'leadership'],
  },
  {
    title: 'Content is a product discipline',
    date: '2021-04-12',
    source: 'Blossom',
    url: '/writing/content-is-a-product-discipline/',
    themes: ['craft'],
  },
  {
    title: 'There is bias in your hiring process',
    date: '2021-04-07',
    source: 'Blossom',
    url: '/writing/bias-in-hiring/',
    themes: ['ethics', 'career'],
  },
  {
    title: 'Welcome to Blossom',
    date: '2021-03-31',
    source: 'Blossom',
    url: '/writing/welcome-to-blossom/',
    themes: ['career'],
  },
  {
    title: '7 ways a product leader needs to advocate for user research',
    date: '2021-03-31',
    source: 'Blossom',
    url: '/writing/seven-ways-product-and-research-work-together/',
    themes: ['research', 'leadership'],
  },
  {
    title: 'User research for decision making',
    date: '2019-04-04',
    source: 'UX Collective · Medium',
    url: 'https://uxdesign.cc/user-research-for-decision-making-d370e1afa245',
    themes: ['research'],
  },
  {
    title: 'Strategic Storytelling for Designers',
    date: '2017-11-30',
    source: 'UX Collective · Medium',
    url: 'https://uxdesign.cc/strategic-storytelling-for-designers-e6fdc6a9cbfc',
    themes: ['storytelling', 'craft'],
  },
  {
    title: 'Letter to a Junior Designer',
    date: '2017-09-30',
    source: 'UX Collective · Medium',
    url: 'https://uxdesign.cc/letter-to-a-junior-designer-29b5c4471978',
    themes: ['career', 'craft'],
  },
  {
    title: 'Seizing the Means of Seduction',
    date: '2017-05-23',
    source: 'Designing for Diversity · Medium',
    url: 'https://medium.com/designing-for-diversity/seizing-the-means-of-seduction-6e2da9c6cc1e',
    themes: ['ethics', 'craft'],
  },
];
