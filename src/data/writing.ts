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
    url: 'https://saielle.beehiiv.com',
    themes: ['ai', 'leadership'],
  },
  {
    title: 'The $610M Browser Bet: How Atlassian Plans to Own the Future of Work',
    date: '2026-07-01',
    dateLabel: '2026',
    source: 'The Second Draft',
    url: 'https://saielle.beehiiv.com',
    themes: ['ai'],
  },
  {
    title: 'The Coming Shift in Enterprise Metadata',
    date: '2026-06-15',
    dateLabel: '2026',
    source: 'The Second Draft',
    url: 'https://saielle.beehiiv.com',
    themes: ['ai'],
  },
  {
    title: 'Leading Data Transformation in the Age of AI',
    date: '2026-06-01',
    dateLabel: '2026',
    source: 'The Second Draft',
    url: 'https://saielle.beehiiv.com',
    themes: ['ai', 'leadership'],
  },
  {
    title: 'When Everyone Has AI: Building Execution Advantages That Last',
    date: '2026-05-01',
    dateLabel: '2026',
    source: 'The Second Draft',
    url: 'https://saielle.beehiiv.com',
    themes: ['ai', 'leadership'],
  },
  {
    title: 'The Enterprise Guide to AI Economics',
    date: '2026-04-01',
    dateLabel: '2026',
    source: 'The Second Draft',
    url: 'https://saielle.beehiiv.com',
    themes: ['ai'],
  },
  {
    title: 'The New Architecture of Software Quality',
    date: '2026-03-01',
    dateLabel: '2026',
    source: 'The Second Draft',
    url: 'https://saielle.beehiiv.com',
    themes: ['craft', 'ai'],
  },
  {
    title: 'Building AI That Actually Helps',
    date: '2026-02-01',
    dateLabel: '2026',
    source: 'The Second Draft',
    url: 'https://saielle.beehiiv.com',
    themes: ['ai', 'ethics'],
  },
  {
    title: 'Beyond human-centered design',
    date: '2022-04-22',
    source: 'Mind the Product',
    url: 'https://www.mindtheproduct.com/beyond-human-centered-design-by-saielle-dasilva/',
    themes: ['leadership', 'storytelling'],
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
