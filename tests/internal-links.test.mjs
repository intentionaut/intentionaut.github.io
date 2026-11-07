// npm test
// Every internal link ends in a slash, so no visitor or crawler takes a 301
// hop to reach the canonical URL (#77). Files and anchors are exempt.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../src/', import.meta.url).pathname;
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const FILE = /\.[a-z0-9]{2,5}$/i;

test('internal links end in a trailing slash', () => {
  const bad = [];
  for (const f of walk(root)) {
    if (!/\.(astro|md|mdx|ts)$/.test(f)) continue;
    const src = readFileSync(f, 'utf8');
    for (const m of src.matchAll(/href="(\/[^"#?]*)"|\]\((\/[^)#?\s]*)\)/g)) {
      const path = m[1] ?? m[2];
      if (path === '/' || path.endsWith('/') || FILE.test(path)) continue;
      bad.push(`${f.replace(root, 'src/')}: ${path}`);
    }
  }
  assert.deepEqual(bad, [], 'links without a trailing slash');
});
