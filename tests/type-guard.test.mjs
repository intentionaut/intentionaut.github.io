// Type guard: the look of every page's header block (.hero, .page-head) is
// pinned in tests/type-baseline.json. #361 changed the home headline from an
// h1 to a p for search, and because CSS styled it by tag it lost its typeface
// and spacing with nothing failing. This reads computed styles in real Chrome,
// keyed by position in the block, never by tag or class, so a markup change
// that moves the look fails here.
//
// If this fails: fix the CSS so the page looks as before (style by class).
// Regenerate the baseline (`npm run type-baseline`) only when Elle asked for
// the look to change, and put a before/after table in the PR.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { chromium } from 'playwright-core';

const BASELINE = new URL('./type-baseline.json', import.meta.url);
const PORT = 4499;
const WIDTHS = [1000, 1440];
const PROPS = ['fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'lineHeight',
  'letterSpacing', 'textTransform', 'marginTop', 'marginBottom'];
const BLOCK_PROPS = ['paddingTop', 'paddingBottom'];

const HEADER = /class="[^"]*\b(page-head|hero)\b/;
// A page has a header if its source, or a component it imports, has one
// (guides render theirs from GuidePage.astro).
function hasHeader(p) {
  const src = readFileSync(p, 'utf8');
  if (HEADER.test(src)) return true;
  return [...src.matchAll(/from '((?:\.\.\/)+components\/[\w-]+\.astro)'/g)]
    .some(([, rel]) => HEADER.test(readFileSync(join(p, '..', rel), 'utf8')));
}

// Every static page whose source has a header block. Dynamic routes are skipped.
function pages(dir = 'src/pages') {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return pages(p);
    if (!f.endsWith('.astro') || p.includes('[')) return [];
    if (!hasHeader(p)) return [];
    const route = '/' + relative('src/pages', p).replace(/(index)?\.astro$/, '');
    return [route.endsWith('/') ? route : route + '/'];
  }).sort();
}

async function waitFor(url) {
  for (let i = 0; i < 120; i++) {
    try { if ((await fetch(url)).ok) return; } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`dev server never answered at ${url}`);
}

async function measure() {
  const server = spawn('npx', ['astro', 'dev', '--port', String(PORT)], { stdio: 'ignore', detached: true });
  try {
    await waitFor(`http://localhost:${PORT}/`);
    const browser = await chromium.launch({ channel: 'chrome' });
    const out = {};
    for (const width of WIDTHS) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      for (const route of pages()) {
        await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'load' });
        out[`${route} @${width}`] = await page.evaluate(([props, blockProps]) => {
          const block = document.querySelector('.hero, .page-head');
          if (!block) return null;
          const pick = (el, keys) => { const c = getComputedStyle(el); return Object.fromEntries(keys.map((k) => [k, c[k]])); };
          const kids = [...block.children].filter((e) => e.getBoundingClientRect().height > 0);
          return { block: pick(block, blockProps), children: kids.map((e) => pick(e, props)) };
        }, [PROPS, BLOCK_PROPS]);
      }
      await page.close();
    }
    await browser.close();
    return out;
  } finally {
    process.kill(-server.pid);
  }
}

if (process.argv.includes('--update')) {
  writeFileSync(BASELINE, JSON.stringify(await measure(), null, 2) + '\n');
  console.log(`wrote ${BASELINE.pathname}`);
} else {
  test('header blocks keep their type and spacing', { timeout: 300_000 }, async () => {
    const want = JSON.parse(readFileSync(BASELINE, 'utf8'));
    const got = await measure();
    const diffs = [];
    for (const key of new Set([...Object.keys(want), ...Object.keys(got)])) {
      const a = want[key], b = got[key];
      if (JSON.stringify(a) === JSON.stringify(b)) continue;
      if (!a || !b) { diffs.push(`${key}: ${a ? 'block gone' : 'new page, not in baseline'}`); continue; }
      for (const k of BLOCK_PROPS) if (a.block[k] !== b.block[k]) diffs.push(`${key} block ${k}: ${a.block[k]} -> ${b.block[k]}`);
      if (a.children.length !== b.children.length) diffs.push(`${key}: ${a.children.length} -> ${b.children.length} elements`);
      a.children.forEach((c, i) => b.children[i] && PROPS.forEach((k) => {
        if (c[k] !== b.children[i][k]) diffs.push(`${key} element ${i + 1} ${k}: ${c[k]} -> ${b.children[i][k]}`);
      }));
    }
    assert.equal(diffs.length, 0,
      'Header type or spacing changed:\n  ' + diffs.join('\n  ') +
      '\nFix the CSS so it looks as before (style by class, not tag). ' +
      'Run `npm run type-baseline` only if Elle asked for this look change.');
  });
}
