// npm test
// shortcut: reads the page source, not rendered HTML, because tests run before the build; upgrade if the page gains more branches.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const page = readFileSync(new URL('../src/pages/case-studies/[slug].astro', import.meta.url), 'utf8');
// Only the template's `locked ? (...) : (...)` switch; the import above it is not a render.
const [lockedBranch, openBranch] = page.slice(page.indexOf('locked ? (')).split(/\)\s*:\s*\(/);

test('the card posts source=case-study and campaign=<slug>', () => {
  assert.match(openBranch, /source="case-study"/);
  assert.match(openBranch, /campaign=\{study\.id\}/);
});

test('the card sits in the open branch, after the body', () => {
  assert.ok(openBranch.includes('<FrameSubscribe'));
  assert.ok(openBranch.indexOf('<Content />') < openBranch.indexOf('<FrameSubscribe'));
});

test('the card carries the approved copy, exactly', () => {
  assert.ok(openBranch.includes('heading="Results start as decisions"'));
  assert.ok(openBranch.includes('sub="Follow the reasoning behind them, one letter at a time."'));
  assert.ok(openBranch.includes('buttonLabel="Follow along"'));
});

test('a locked study has no card', () => {
  assert.ok(!lockedBranch.includes('FrameSubscribe'));
});
