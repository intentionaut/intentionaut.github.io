/**
 * Everything on intentionaut.com/open-source, in one place.
 *
 * Three tiers, so small things have a home too:
 *   flagship      a story page at /open-source/<slug>/ and a release log
 *   project       a repo worth its own line, no story page (yet)
 *   contribution  a pull request, a pattern, a language file, a fix somewhere else
 *
 * Add an entry, and the page updates. Keep `line` to one sentence.
 */

export type Tier = 'flagship' | 'project' | 'contribution';

export interface OpenSourceEntry {
  tier: Tier;
  name: string;
  line: string;
  /** Slug of the story page under /open-source/, flagship only. */
  slug?: string;
  repo: string;
  install?: string;
  /** For contributions: the project it went into. */
  to?: string;
  /** ISO date, for ordering contributions. */
  date?: string;
}

export const entries: OpenSourceEntry[] = [
  {
    tier: 'flagship',
    slug: 'familiar',
    name: 'Familiar',
    line: 'A companion for your newsletter. Interview, outline, draft, edit and social stages that hand back reports instead of rewrites.',
    install: 'npx skills add intentionaut/familiar',
    repo: 'https://github.com/intentionaut/familiar',
  },
  {
    tier: 'flagship',
    slug: 'kernic',
    name: 'Kernic',
    line: 'A CLI that turns a few answers in your terminal into a design system your stack and your AI agent can use.',
    install: 'npx kernic',
    repo: 'https://github.com/intentionaut/kernic',
  },
  // project: { tier: 'project', name: 'Captain\'s Log', line: '…', repo: '…' }
  // contribution: { tier: 'contribution', name: 'Add "quietly" to the tell list', to: 'blader/humanizer', line: '…', repo: '<PR url>', date: '2026-09-01' }
];
