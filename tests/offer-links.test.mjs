// npm test
// Ported from #334: the pages search already shows link to both offers.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('/about/ and /case-studies/ link to both offers', () => {
  for (const p of ['pages/about.astro', 'pages/case-studies/index.astro']) {
    const s = readFileSync(new URL(`../src/${p}`, import.meta.url), 'utf8');
    assert.match(s, /<a href="\/fractional\/">/, p);
    assert.match(s, /<a href="\/forward-deployed\/">/, p);
  }
});
