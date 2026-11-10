// npm test
// Reads the page source, not dist/, so it needs no build and never skips.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('../src/pages/about.astro', import.meta.url), 'utf8');

test('about ends with the booking button and the message link', () => {
  const history = src.indexOf('A brief history.');
  const book = src.match(/<a class="btn-primary" href=\{BOOKING_URL\}[^>]*>Book a free call<\/a>/);
  const send = src.match(/<a class="link-arrow" href="\/contact\/#contact-section"[^>]*><span>Send a message<\/span><\/a>/);
  assert.ok(book, 'booking button uses BOOKING_URL, the same target as /contact/');
  assert.ok(send, 'message link reaches the form on /contact/');
  assert.ok(history >= 0 && history < book.index && book.index < send.index, 'row comes after the history, button before link');
});
