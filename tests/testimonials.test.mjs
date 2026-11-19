// npm test
// Quotes are verbatim and only placed where their author agreed. Reads source.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { read, testimonial, testimonialsSrc } from './lib.mjs';

const placed = (where, ids) => ids.forEach((id) => assert.ok(testimonial(id).includes(`placements: ['${where}'],`), id));

test('James is verbatim, en dash included, and on the Impact Chain page only', () => {
  assert.ok(testimonial('james-gadsby-peet').includes('Even better, mapping the impact chain early highlights your weakest assumptions – such as testing whether a real society can import its register in under an hour before building complex extra features.'));
  placed('impact-chain', ['james-gadsby-peet']);
  const page = read('src/pages/tools/[family]/[slug].astro');
  assert.ok(page.includes('{quotes.length > 0 && (') && page.includes('<cite>{q.name}, {q.org}</cite>'));
  assert.ok(page.indexOf('>Testimonials</h2>') < page.indexOf('aria-labelledby="more-h"'));
});

test('agents talk recap carries the five chosen survey quotes, verbatim', () => {
  placed('talk-agents-2026', ['louise-taylor', 'chris-producttank', 'sebastian-producttank', 'katy-producttank', 'amy-wells']);
  assert.ok(testimonial('amy-wells').includes('I’ve just got Claud through terminal'));
  assert.ok(testimonial('chris-producttank').includes("The Openness and \\'real world\\' tone"));
  assert.ok(read('src/pages/speaking/how-to-manage-ai-agents-as-a-product-leader.astro').includes("testimonialsFor('talk-agents-2026')"));
});

test('/speaking/ carries speaker quotes across talks, leading with the stage quote', () => {
  placed('speaking', ['mtp-2022-senior-pm', 'pk-producttank', 'fiona-macneill', 'mtp-2022-pm', 'paul-producttank', 'mtp-2022-leader']);
  assert.ok(testimonialsSrc.indexOf("id: 'mtp-2022-senior-pm'") < testimonialsSrc.indexOf("id: 'pk-producttank'"));
  assert.ok(read('src/pages/speaking.astro').includes("testimonialsFor('speaking')"));
});

test('quote grid: long quotes widen, text size stays the same', () => {
  const c = read('src/components/QuoteGrid.astro');
  assert.ok(c.includes('wide: t.quote.length > 200') && c.includes('.qg-card.wide { grid-column: span 2; }'));
  assert.ok(!/\.wide[^{]*\.qg-q/.test(c), 'wide cards must not change text size');
});
