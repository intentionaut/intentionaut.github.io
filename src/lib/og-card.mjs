// Share cards for pages made at build time (writing pages), in the same frame
// as public/og.png. Text is set in Fraunces, the site's display font, from the
// bundled TTF so CI renders the same card as a laptop does.
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';

// From the repo root, not import.meta.url: the build bundles this file into
// dist/chunks, where a relative URL pointed at nothing and CI fell back to
// DejaVu Sans. Linux CI also has no fontconfig setup, hence fonts.conf.
const FONTS = resolve(process.cwd(), 'src/assets/fonts');
const FONT = resolve(FONTS, 'Fraunces.ttf');
if (!existsSync(FONT)) throw new Error(`Share card font missing: ${FONT}`);
process.env.FONTCONFIG_FILE = resolve(FONTS, 'fonts.conf');
const { default: sharp } = await import('sharp');
const PAPER = '#f7e9e0';
const INK = '#38234a';
const SLATE = '#e0d2cb';
const ACCENT = '#c85060';
const MUTED = '#74607b';
const LEFT = 95;
const WIDTH = 1010;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// The last two words travel together, so no line ends up holding one word.
const keepLastPair = (s) => s.trim().replace(/\s+(\S+)$/, ' $1');

async function text(markup, pt, opts = {}) {
  const { data, info } = await sharp({
    text: { text: markup, font: `Fraunces ${pt}`, fontfile: FONT, width: WIDTH, dpi: 72, rgba: true, ...opts },
  })
    .png()
    .toBuffer({ resolveWithObject: true });
  return { data, height: info.height };
}

/** One 1200x630 PNG: eyebrow, headline, domain. Long titles step down in size. */
export async function renderCard({ eyebrow, title }) {
  const words = esc(keepLastPair(title));
  let head;
  for (const pt of [60, 52, 46, 40]) {
    head = await text(`<span foreground="${INK}">${words}</span>`, pt, { spacing: Math.round(pt * 0.15) });
    if (head.height <= 300) break;
  }
  const brow = await text(
    `<span foreground="${ACCENT}" letter_spacing="7000">${esc(eyebrow.toUpperCase())}</span>`,
    22
  );
  const foot = await text(`<span foreground="${MUTED}">intentionaut.com</span>`, 26);
  const frame = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect x="24" y="24" width="1152" height="582" fill="none" stroke="${INK}" stroke-width="2"/>
  <rect x="31" y="31" width="1138" height="568" fill="none" stroke="${SLATE}" stroke-width="2"/>
</svg>`);
  return sharp(frame)
    .composite([
      { input: brow.data, left: LEFT, top: 122 },
      { input: head.data, left: LEFT, top: Math.round(330 - head.height / 2) },
      { input: foot.data, left: LEFT, top: 528 },
    ])
    .png()
    .toBuffer();
}
