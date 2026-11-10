import { test } from 'node:test';
import assert from 'node:assert/strict';
import { trimDescription } from '../src/lib/meta-description.mjs';

test('short text is unchanged', () => {
  assert.equal(trimDescription('A short line.'), 'A short line.');
});
test('long text ends at the last full sentence under 160', () => {
  const t = 'Basecamp blew it. But you can do better. The personal IS political, and there is no easy way to separate the two. Here are a few thoughts on depression and anxiety at work';
  const out = trimDescription(t);
  assert.ok(out.length <= 160);
  assert.ok(out.endsWith('separate the two.'));
});
test('one long sentence ends at a word with an ellipsis', () => {
  const out = trimDescription('word '.repeat(60));
  assert.ok(out.length <= 160);
  assert.ok(out.endsWith('word…'));
});
