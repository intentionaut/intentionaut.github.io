// npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { isStale, sortNewestFirst, validate, MAX_CARDS } from '../src/lib/evidence.mjs';

const data = JSON.parse(readFileSync(new URL('../src/data/ai-adoption-evidence.json', import.meta.url), 'utf8'));

test('the shipped data is valid', () => {
  assert.deepEqual(validate(data), []);
});

test('launch set is four cards, under the ceiling', () => {
  assert.equal(data.cards.length, 4);
  assert.ok(data.cards.length <= MAX_CARDS);
});

test('no vendor card in the launch set', () => {
  assert.ok(!data.cards.some((c) => c.sourceType === 'vendor'));
});

test('the prediction is labelled as one', () => {
  const p = data.cards.find((c) => c.id.startsWith('gartner-agentic'));
  assert.equal(p.kind, 'Prediction');
});

test('no em dashes in any card', () => {
  assert.ok(!JSON.stringify(data).includes('—'));
});

test('validate catches a missing base and a non-https link', () => {
  const bad = { lastChecked: '2026-10-21', cards: [{ ...data.cards[0], base: '', url: 'http://x' }] };
  const errs = validate(bad);
  assert.ok(errs.some((e) => e.includes('missing base')));
  assert.ok(errs.some((e) => e.includes('https')));
});

test('newest first, month-only dates included', () => {
  assert.deepEqual(sortNewestFirst(data.cards).map((c) => c.published), ['2026-10-19', '2026-07-20', '2026-01', '2025-06-25']);
});

test('stale after six months, not before', () => {
  const now = new Date('2026-10-21');
  assert.equal(isStale('2026-04-21', now), false);
  assert.equal(isStale('2026-04-20', now), true);
});
