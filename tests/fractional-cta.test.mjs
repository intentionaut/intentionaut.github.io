// npm test
// Reads the page source, not dist/, so it needs no build and never skips.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('../src/pages/fractional.astro', import.meta.url), 'utf8');

test('fractional header has the booking button right after the lede', () => {
  const lede = src.match(/<p class="lede">[\s\S]*?<\/p>/);
  const book = src.match(/<a class="btn-primary" href=\{BOOKING_URL\}[^>]*>[\s\S]*?<\/a>/);
  assert.ok(lede && book, 'lede and booking button exist');
  assert.ok(book[0].includes('Book a free call'), 'button says Book a free call');
  assert.equal(src.slice(lede.index + lede[0].length, book.index).trim().replace(/<div class="cta-row">/, ''), '', 'nothing between lede and button');
  assert.ok(book.index < src.indexOf('class="problem-lines"'), 'button sits before the problem lines');
});

test('booking button opens in a new tab, safely, and says so', () => {
  const book = src.match(/<a class="btn-primary" href=\{BOOKING_URL\}[^>]*>[\s\S]*?<\/a>/)[0];
  assert.match(book, /target="_blank"/);
  assert.match(book, /rel="noopener noreferrer"/);
  assert.match(book, /<span class="sr-only">\(opens in a new tab\)<\/span>/);
});
