// npm test
// Reads source files, not dist/, so it needs no build and never skips.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../src/', import.meta.url).pathname;
const read = (p) => readFileSync(join(root, p), 'utf8');
const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const WORKSHOP_PRICES = ['£2,000', '£3,500', '£6,000'];

test('workshop pages and components never hard-code a workshop price', () => {
  const files = [
    ...walk(join(root, 'pages/workshops')),
    join(root, 'components/WorkshopPricing.astro'),
    join(root, 'components/WorkshopTopCta.astro'),
    join(root, 'components/WorkshopClose.astro'),
    join(root, 'data/workshops.ts'),
  ];
  for (const f of files) {
    const src = readFileSync(f, 'utf8');
    for (const price of WORKSHOP_PRICES) {
      assert.ok(!src.includes(price), `${f} types ${price}; read it from rates.ts`);
    }
  }
});

test('workshop FAQ answers read prices from rates.ts', () => {
  const faqs = read('data/faqs.ts');
  const block = faqs.slice(faqs.indexOf("placements: ['workshops']"), faqs.indexOf("placements: ['workshops-ai-strategy']"));
  assert.ok(block.length > 0, 'workshop FAQs exist');
  for (const price of WORKSHOP_PRICES) assert.ok(!block.includes(price), `workshop FAQs type ${price}`);
});

test('no "Best value" label on workshop formats', () => {
  assert.ok(!/Best value/.test(read('components/WorkshopPricing.astro')));
});

test('every workshop page tags its enquiries with its own source', () => {
  assert.match(read('pages/workshops/index.astro'), /<WorkshopClose source="workshops" \/>/);
  assert.match(read('pages/workshops/[slug].astro'), /<WorkshopClose source=\{w\.placement\} \/>/);
  const data = read('data/workshops.ts');
  for (const p of ['workshops-ai-strategy', 'workshops-opportunity-mapping', 'workshops-product-maturity', 'workshops-data-decision', 'workshops-data-culture']) {
    assert.ok(data.includes(`"placement": "${p}"`), `${p} is a workshop source`);
  }
});

test('no internal link to a workshop page carries UTM parameters', () => {
  for (const f of walk(root)) {
    const src = readFileSync(f, 'utf8');
    assert.ok(!/href="\/workshops\/[^"]*utm_/.test(src), `${f} tags an internal workshops link`);
  }
});

test('StepStone figure never names the satellite portfolio', () => {
  for (const f of walk(root)) {
    assert.ok(!/satellite/i.test(readFileSync(f, 'utf8')), `${f} mentions the satellite portfolio`);
  }
});

test('Workshops sits in the header and footer', () => {
  assert.match(read('components/Header.astro'), /href: '\/workshops\/', label: 'Workshops'/);
  assert.match(read('components/Footer.astro'), /<a href="\/workshops\/">Workshops<\/a>/);
});

test('every FAQ list names its topic, so agents keep the context', () => {
  const pages = walk(join(root, 'pages')).filter((f) => f.endsWith('.astro'));
  for (const f of pages) {
    const src = readFileSync(f, 'utf8');
    for (const m of src.matchAll(/<FaqList[\s\S]*?\/>/g)) {
      assert.match(m[0], /heading=/, `${f} has a FaqList with no heading`);
    }
    assert.ok(!src.includes('Fair questions'), `${f} still says "Fair questions"`);
  }
});

test('a framing variant gets a page but no card on /workshops/', () => {
  assert.match(read('pages/workshops/index.astro'), /workshops\.filter\(\(w\) => !w\.variantOf\)\.map/);
  assert.match(read('data/workshops.ts'), /"variantOf": "data-informed-decisions"/);
});

