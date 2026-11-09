// npm test
// #78: sitemap lastmod comes from each page's own git history.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { sourcesFor, lastmodFor, isShallow } from '../scripts/lastmod.mjs';

test('static, dynamic and content routes map to their source files', () => {
  assert.deepEqual(sourcesFor('/'), ['src/pages/index.astro']);
  assert.deepEqual(sourcesFor('/fractional/'), ['src/pages/fractional.astro']);
  assert.deepEqual(sourcesFor('/workshops/'), ['src/pages/workshops/index.astro']);
  assert.deepEqual(sourcesFor('/workshops/ai-strategy/'), ['src/pages/workshops/[slug].astro', 'src/data/workshops.ts']);
  assert.deepEqual(sourcesFor('/case-studies/cazoo/'), ['src/pages/case-studies/[slug].astro', 'src/content/case-studies/cazoo.md']);
  assert.deepEqual(sourcesFor('/tools/impact-first-ai/'), ['src/pages/tools/[family]/index.astro', 'src/data/tools.ts']);
  assert.deepEqual(sourcesFor('/tools/impact-first-ai/impact-chain/'), ['src/pages/tools/[family]/[slug].astro', 'src/data/tools.ts']);
  assert.deepEqual(sourcesFor('/writing/bias-in-hiring/'), ['src/content/essays/bias-in-hiring.md']);
});

test('a page with no source file gets no date, never the build date', () => {
  assert.deepEqual(sourcesFor('/writing/some-beehiiv-post/'), []);
  assert.equal(lastmodFor('/writing/some-beehiiv-post/'), null);
});

test('lastmod is the last commit touching the sources, stable across calls', { skip: isShallow() && 'shallow clone' }, () => {
  const expected = execFileSync('git', ['log', '-1', '--format=%cI', '--', 'src/pages/fractional.astro'], { encoding: 'utf8' }).trim();
  assert.equal(lastmodFor('/fractional/'), expected);
  assert.equal(lastmodFor('/fractional/'), lastmodFor('/fractional/'));
});
