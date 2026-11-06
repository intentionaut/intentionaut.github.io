// npm test
// Reads the header source, so it needs no build.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('../src/components/Header.astro', import.meta.url), 'utf8');
const hrefs = (block) => [...block.matchAll(/href: '([^']+)'/g)].map((m) => m[1]);

test('Services groups the five paid offers, in order', () => {
  const block = src.slice(src.indexOf('const services'), src.indexOf('const links'));
  assert.deepEqual(hrefs(block), ['/fractional/', '/forward-deployed/', '/workshops/', '/keynote-speaker/', '/strategic-direction/']);
});

test('the header links are Case studies, Writing, Projects, About', () => {
  const block = src.slice(src.indexOf('const links'), src.indexOf('const here'));
  assert.deepEqual(hrefs(block), ['/case-studies/', '/writing/', '/projects/', '/about/']);
});

test('Work with me stays as the house button to /contact/', () => {
  assert.match(src, /<a class="btn-primary nav-cta" href="\/contact\/"/);
});

test('Services is a disclosure button wired to its panel', () => {
  assert.match(src, /class="nav-services-toggle"[\s\S]*?aria-expanded="false"[\s\S]*?aria-controls="nav-services-panel"/);
  assert.match(src, /id="nav-services-panel"/);
});
