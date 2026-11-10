// Renders the per-page share images in public/og/, in the same frame as
// public/og.png. Run by hand after changing a headline: node scripts/og-images.mjs
// Headlines are each page's own h1, so the card never says something the page doesn't.
import { mkdir, writeFile } from 'node:fs/promises';
import { renderCard } from '../src/lib/og-card.mjs';


const pages = [
  {
    slug: 'fractional',
    eyebrow: 'Saielle DaSilva · Fractional leadership',
    lines: ['Product leadership from someone', 'whose products have served over', '<i>100 million</i> customers.'],
  },
  {
    slug: 'for-ceos',
    eyebrow: 'Saielle DaSilva · For CEOs and founders',
    lines: ['Scale your product organisation', 'with <i>clear</i> ownership.'],
  },
  {
    slug: 'for-cpos-ctos',
    eyebrow: 'Saielle DaSilva · For CPOs and CTOs',
    lines: ['Make your AI work add', 'up to a <i>strategy</i>.'],
  },
  {
    slug: 'forward-deployed',
    eyebrow: 'Saielle DaSilva · Product builder',
    lines: ['The prototype has been <i>two sprints</i>', 'away for four months.'],
  },
  {
    slug: 'for-scale-ups',
    eyebrow: 'Saielle DaSilva · For scale-ups',
    lines: ['Product leadership for scale-ups,', 'from someone who has scaled', 'them <i>before</i>.'],
  },
  {
    slug: 'for-advisors',
    eyebrow: 'Saielle DaSilva · For advisors & recruiters',
    lines: ['If you place product people,', 'here is the <i>short</i> version.'],
  },
];

await mkdir('public/og', { recursive: true });
for (const p of pages) {
  await writeFile(`public/og/${p.slug}.png`, await renderCard({ eyebrow: p.eyebrow, title: p.lines.join(' ') }));
  console.log(`public/og/${p.slug}.png`);
}
