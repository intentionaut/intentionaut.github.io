// npm test
// Reads the header source, so it needs no build.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('../src/components/Header.astro', import.meta.url), 'utf8');
const hrefs = (block) => [...block.matchAll(/href: '([^']+)'/g)].map((m) => m[1]);

test('Services groups the five paid offers, in order', () => {
  const block = src.slice(src.indexOf('const services'), src.indexOf('const resources'));
  assert.deepEqual(hrefs(block), ['/fractional/', '/forward-deployed/', '/workshops/', '/keynote-speaker/', '/office-hours/']);
});

test('Resources groups the case studies, tools, guides and media kit', () => {
  const block = src.slice(src.indexOf('const resources'), src.indexOf('const groups'));
  assert.deepEqual(hrefs(block), ['/case-studies/', '/tools/', '/guides/', '/media-kit/']);
});

test('the header links are Writing, Projects, About', () => {
  const block = src.slice(src.indexOf('const links'), src.indexOf('const here'));
  assert.deepEqual(hrefs(block), ['/writing/', '/projects/', '/about/']);
});

test('Work with me stays as the house button to /contact/', () => {
  assert.match(src, /<a class="btn-primary nav-cta" href="\/contact\/"/);
});

test('each group is a disclosure button wired to its own panel', () => {
  assert.match(src, /\{ id: 'services', label: 'Services'/);
  assert.match(src, /\{ id: 'resources', label: 'Resources'/);
  assert.match(src, /class="nav-services-toggle"[\s\S]*?aria-expanded="false"[\s\S]*?aria-controls=\{`nav-\$\{g\.id\}-panel`\}/);
  assert.match(src, /id=\{`nav-\$\{g\.id\}-panel`\}/);
});
