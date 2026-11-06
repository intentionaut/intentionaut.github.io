// npm test
// #71: one primary action above the fold, and it is the tracked form.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('../src/pages/ai-pilot-to-production.astro', import.meta.url), 'utf8');
const head = src.slice(src.indexOf('<header class="page-head">'), src.indexOf('</header>'));

test('the page head has exactly one action, and it goes to the form', () => {
  assert.equal((head.match(/<a /g) || []).length, 1, 'one link in the page head');
  assert.match(head, /<a class="btn-primary" href="#contact-section">/);
});

test('the form it points at carries this page as its source', () => {
  assert.match(src, /<section class="contact-form-section" id="contact-section"/);
  assert.match(src, /<ContactForm source="ai-pilot-to-production"/);
});
