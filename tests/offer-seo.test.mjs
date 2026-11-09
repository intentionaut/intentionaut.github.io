// npm test
// Reads the page source, so it needs no build. Canonical comes from BaseLayout
// and the sitemap from astro.config.mjs; both offer pages use them unchanged.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (p) => readFileSync(new URL(`../src/${p}`, import.meta.url), 'utf8');
const phrase = read('data/positioning.ts').match(/PRIMARY_PHRASE = '([^']+)'/)[1];
// Fills ${PRIMARY_PHRASE} so the length is the one search shows.
const attr = (src, name) => {
  const m = src.match(new RegExp(`\\n  ${name}=(?:\\{\`([^\`]+)\`\\}|"([^"]+)")`));
  assert.ok(m, `${name} attribute found`);
  return (m[1] ?? m[2]).replaceAll('${PRIMARY_PHRASE}', phrase);
};

const fractional = read('pages/fractional.astro');
const fde = read('pages/forward-deployed.astro');

test('/fractional/ title and description use the imported primary phrase and name London or the UK', () => {
  assert.match(fractional, /title=\{`\$\{PRIMARY_PHRASE\}/);
  assert.match(fractional, /description=\{`\$\{PRIMARY_PHRASE\}/);
  assert.match(attr(fractional, 'title'), /London|UK/);
  assert.match(attr(fractional, 'description'), /London|UK/);
});

test('/forward-deployed/ uses its offer name and the lede words', () => {
  assert.match(attr(fde, 'title'), /^Product building/);
  assert.match(attr(fde, 'description'), /^Product building for founders and product leaders/);
  assert.match(attr(fde, 'description'), /bigger bets but have no capacity to build/);
});

for (const [name, src] of [['fractional', fractional], ['forward-deployed', fde]]) {
  test(`${name} description is under 160, ends on the action, has no em dash or digits`, () => {
    const d = attr(src, 'description');
    assert.ok(d.length < 160, `${d.length} characters`);
    assert.ok(d.endsWith('Book a free call'));
    assert.ok(!/—/.test(d + attr(src, 'title')));
    assert.ok(!/\d/.test(d), 'no figures');
  });
}

test('/about/ and /case-studies/ link to both offers', () => {
  for (const p of ['pages/about.astro', 'pages/case-studies/index.astro']) {
    const s = read(p);
    assert.match(s, /<a href="\/fractional\/">/, p);
    assert.match(s, /<a href="\/forward-deployed\/">/, p);
  }
});
