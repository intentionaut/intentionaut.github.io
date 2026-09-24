// Renders the per-page share images in public/og/, in the same frame as
// public/og.png. Run by hand after changing a headline: node scripts/og-images.mjs
// Headlines are each page's own h1, so the card never says something the page doesn't.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const PAPER = '#f7e9e0';
const INK = '#38234a';
const SLATE = '#e0d2cb';
const ACCENT = '#c85060';
const MUTED = '#74607b';

const pages = [
  {
    slug: 'fractional',
    eyebrow: 'Saielle DaSilva · Fractional leadership',
    lines: ['A senior product leader', 'without the <i>permanent</i>', 'commitment.'],
  },
  {
    slug: 'forward-deployed',
    eyebrow: 'Saielle DaSilva · Forward deployed building',
    lines: ['Someone who <i>builds</i> it,', 'not just decides', 'what to build.'],
  },
  {
    slug: 'for-advisors',
    eyebrow: 'Saielle DaSilva · For advisors & recruiters',
    lines: ['If you place product people,', 'here is the <i>short</i> version.'],
  },
];

const tspans = (line) =>
  line
    .split(/(<i>.*?<\/i>)/)
    .filter(Boolean)
    .map((part) =>
      part.startsWith('<i>')
        ? `<tspan font-style="italic">${part.slice(3, -4)}</tspan>`
        : `<tspan>${part}</tspan>`
    )
    .join('');

function svg({ eyebrow, lines }) {
  const size = lines.length > 2 ? 76 : 70;
  const lead = size * 1.12;
  const top = lines.length > 2 ? 290 : 320;
  const text = lines
    .map((l, i) => `<text xml:space="preserve" x="95" y="${top + i * lead}" font-size="${size}">${tspans(l)}</text>`)
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect x="24" y="24" width="1152" height="582" fill="none" stroke="${INK}" stroke-width="2"/>
  <rect x="31" y="31" width="1138" height="568" fill="none" stroke="${SLATE}" stroke-width="2"/>
  <g font-family="Georgia, serif">
    <text x="97" y="150" font-size="24" letter-spacing="7" fill="${ACCENT}">${eyebrow.toUpperCase().replace(/&/g, '&amp;')}</text>
    <g fill="${INK}">${text}</g>
    <text x="97" y="558" font-size="26" fill="${MUTED}">intentionaut.com</text>
  </g>
</svg>`;
}

await mkdir('public/og', { recursive: true });
for (const p of pages) {
  await sharp(Buffer.from(svg(p))).png().toFile(`public/og/${p.slug}.png`);
  console.log(`public/og/${p.slug}.png`);
}
