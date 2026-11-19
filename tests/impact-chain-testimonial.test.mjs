// npm test
// shortcut: reads source, not rendered HTML, because tests run before the build.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const data = readFileSync(new URL('../src/data/testimonials.ts', import.meta.url), 'utf8');
const page = readFileSync(new URL('../src/pages/tools/[family]/[slug].astro', import.meta.url), 'utf8');
const entry = data.slice(data.indexOf("id: 'james-gadsby-peet'"), data.indexOf('},', data.indexOf("id: 'james-gadsby-peet'")));

test('James quote is verbatim from the article, en dash included', () => {
  assert.ok(entry.includes('Even better, mapping the impact chain early highlights your weakest assumptions – such as testing whether a real society can import its register in under an hour before building complex extra features.'));
});

test('James quote is placed only on the Impact Chain page, as agreed', () => {
  assert.match(entry, /placements: \['impact-chain'\],/);
});

test('tool page renders the Testimonials section before the other tools, only when quotes exist', () => {
  assert.ok(page.includes('{quotes.length > 0 && ('));
  assert.ok(page.indexOf('>Testimonials</h2>') < page.indexOf('aria-labelledby="more-h"'));
  assert.ok(page.includes('<cite>{q.name}, {q.org}</cite>'));
});
