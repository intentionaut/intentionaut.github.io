// npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const src = readFileSync('src/pages/index.astro', 'utf8');

test('the case-study row sits between the offers and the projects', () => {
  const offers = src.indexOf('id="offers-h"');
  const studies = src.indexOf('id="studies-h"');
  const built = src.indexOf('id="built-h"');
  assert.ok(offers >= 0 && offers < studies && studies < built);
  assert.match(src, /href="\/case-studies\/"><span>All case studies<\/span>/);
});

test('the homepage headline is unchanged', () => {
  // The id is the headline test's hook; the served text (what crawlers read) stays this.
  assert.match(src, /<p id="hero-h1" class="hero-title">I speak <em>four<\/em> languages: design, product, data&nbsp;&amp;&nbsp;AI\.<\/p>/);
});
