// npm test
// Reads page source, not dist/, so it needs no build and never skips.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const src = read('../src/pages/interim-cpo.astro');

test('title and H1 say Interim CPO and name the UK', () => {
  // The name suffix is read from /fractional/, so release text never spells the name.
  const suffix = read('../src/pages/fractional.astro').match(/title="[^"|]*\| ([^"]+)"/)[1];
  assert.equal(src.match(/title="([^"]+)"/)[1], `Interim CPO UK | ${suffix}`);
  assert.match(src, /<h1>Interim CPO for UK companies<\/h1>/);
});

test('"Book a free call" link sits directly under the lede', () => {
  const m = src.match(/<p class="lede">[\s\S]*?<\/p>\s*<div class="cta-row">\s*<a class="btn-primary" href=\{BOOKING_URL\}[^>]*>Book a free call/);
  assert.ok(m, 'cta-row follows the lede with nothing between');
  assert.match(m[0], /target="_blank"/);
  assert.match(m[0], /rel="noopener noreferrer"/);
});

test('/fractional/ links to /interim-cpo/', () => {
  assert.ok(read('../src/pages/fractional.astro').includes('href="/interim-cpo/"'));
});

test('sitemap filter does not drop the page', () => {
  const cfg = read('../astro.config.mjs');
  assert.ok(!cfg.includes('interim-cpo'));
});

test('only published figures, no prices, no em dashes', () => {
  assert.ok(!src.includes('—'));
  assert.ok(!src.includes('£'));
  assert.ok(!src.includes('data/rates'));
  assert.ok(!src.includes('data/positioning'));
  assert.ok(!src.includes('80%'));
  const published = read('../src/pages/for-advisors.astro') + read('../src/pages/fractional.astro');
  for (const fig of ['450 per cent in 90 days', '3.2x return on investment']) {
    assert.ok(src.includes(fig) && published.includes(fig), fig);
  }
});

test('page passes a Service node, priced from rates.ts, to the layout', () => {
  assert.match(src, /jsonLd=\{serviceSchema\}/);
  assert.match(src, /'@type': 'Service'/);
  assert.match(src, /price: rates\.fractional/);
});
