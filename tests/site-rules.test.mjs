// npm test
// Rules every page keeps. Each scans the whole of src/, so a new page is covered
// without a new test.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { read, walk } from './lib.mjs';

const all = walk('src');
const src = all.filter((f) => /\.(astro|md|mdx|ts)$/.test(f));
const hits = (fn, files = src) => files.flatMap((f) => fn(read(f)).map((h) => `${f}: ${h}`));

// #77: no visitor or crawler takes a 301 hop to reach the canonical URL. Files and anchors are exempt.
test('internal links end in a trailing slash', () => {
  const FILE = /\.[a-z0-9]{2,5}$/i;
  assert.deepEqual(hits((s) => [...s.matchAll(/href="(\/[^"#?]*)"|\]\((\/[^)#?\s]*)\)/g)]
    .map((m) => m[1] ?? m[2]).filter((p) => p !== '/' && !p.endsWith('/') && !FILE.test(p))), []);
});

test('every booking link opens in a new tab, safely', () => {
  assert.deepEqual(hits((s) => [...s.matchAll(/<a\b[^>]*href=\{BOOKING_URL\}[^>]*>[\s\S]*?<\/a>/g)].map((m) => m[0])
    .filter((a) => !a.includes('{...blank}') && !(a.includes('target="_blank"') && a.includes('rel="noopener noreferrer"')))), []);
});

test('no internal link to a workshop page carries UTM parameters', () => {
  assert.deepEqual(hits((s) => s.match(/href="\/workshops\/[^"]*utm_[^"]*"/g) ?? [], all), []);
});

test('StepStone figure never names the satellite portfolio', () => {
  assert.deepEqual(hits((s) => s.match(/satellite/gi) ?? [], all), []);
});

test('every FAQ list names its topic, so agents keep the context', () => {
  const pages = src.filter((f) => f.startsWith('src/pages/') && f.endsWith('.astro'));
  for (const f of pages) {
    const s = read(f);
    for (const m of s.matchAll(/<FaqList[\s\S]*?\/>/g)) assert.match(m[0], /heading=/, `${f} has a FaqList with no heading`);
    assert.ok(!s.includes('Fair questions'), `${f} still says "Fair questions"`);
  }
});
