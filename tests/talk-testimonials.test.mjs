// npm test
// shortcut: reads source, not rendered HTML, because tests run before the build.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const data = readFileSync(new URL('../src/data/testimonials.ts', import.meta.url), 'utf8');
const entry = (id) => data.slice(data.indexOf(`id: '${id}'`), data.indexOf('},', data.indexOf(`id: '${id}'`)));

test('recap page leads with the five chosen survey quotes', () => {
  for (const id of ['louise-taylor', 'chris-producttank', 'sebastian-producttank', 'katy-producttank', 'amy-wells'])
    assert.match(entry(id), /placements: \['talk-agents-2026'\]/, id);
  const recap = readFileSync(new URL('../src/pages/speaking/how-to-manage-ai-agents-as-a-product-leader.astro', import.meta.url), 'utf8');
  assert.ok(recap.includes("testimonialsFor('talk-agents-2026')"));
});

test('speaking page carries the speaker quotes across talks', () => {
  for (const id of ['pk-producttank', 'fiona-macneill', 'paul-producttank', 'mtp-2022-senior-pm', 'mtp-2022-pm', 'mtp-2022-leader'])
    assert.match(entry(id), /placements: \['speaking'\]/, id);
  const page = readFileSync(new URL('../src/pages/speaking.astro', import.meta.url), 'utf8');
  assert.ok(page.includes("testimonialsFor('speaking')"));
});

test('quotes stay verbatim', () => {
  assert.ok(entry('amy-wells').includes('I’ve just got Claud through terminal'));
  assert.ok(entry('chris-producttank').includes("The Openness and \\'real world\\' tone"));
});

test('speaking page leads with the stage quote', () => {
  assert.ok(data.indexOf("id: 'mtp-2022-senior-pm'") < data.indexOf("id: 'pk-producttank'"));
});

test('quote grid: same text size in every card, long quotes only widen', () => {
  const c = readFileSync(new URL('../src/components/QuoteGrid.astro', import.meta.url), 'utf8');
  assert.ok(c.includes('wide: t.quote.length > 200'));
  assert.ok(c.includes('.qg-card.wide { grid-column: span 2; }'));
  assert.ok(!/\.wide[^{]*\.qg-q/.test(c), 'wide cards must not change text size');
});
