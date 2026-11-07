// npm test
// Reads the page source, not dist/, so it needs no build and never skips.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('../src/pages/ai-adoption-evidence.astro', import.meta.url), 'utf8');
const closing = src.match(/<section class="ev-closing"[\s\S]*?<\/section>/);

test('evidence page ends with a closing block that links to /fractional/', () => {
  assert.ok(closing, 'closing block exists');
  assert.match(closing[0], /href="\/fractional\/"/);
  assert.ok(src.indexOf('class="ev-grid"') < closing.index, 'closing block comes after the figures');
});

test('closing block has the booking button, opening safely in a new tab', () => {
  assert.match(src, /import \{ BOOKING_URL \} from '..\/data\/links';/);
  const book = closing[0].match(/<a class="btn-primary" href=\{BOOKING_URL\}[^>]*>[\s\S]*?<\/a>/);
  assert.ok(book, 'booking button uses BOOKING_URL');
  assert.ok(book[0].includes('Book a free call'));
  assert.match(book[0], /target="_blank"/);
  assert.match(book[0], /rel="noopener noreferrer"/);
  assert.match(book[0], /<span class="sr-only">\(opens in a new tab\)<\/span>/);
});

test('closing copy has no em dashes', () => {
  assert.ok(!closing[0].includes('—'));
});
