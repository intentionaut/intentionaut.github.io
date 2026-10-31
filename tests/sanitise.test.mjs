import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sanitise } from '../src/lib/sanitise.mjs';

test('drops active content', () => {
  const out = sanitise(
    '<p onclick="x()">a</p><script>x()</script><img src="https://a.test/i.png" onerror="x()"><a href="javascript:x()">b</a><iframe src="https://a.test"></iframe>',
  );
  assert.doesNotMatch(out, /onclick|onerror|<script|javascript:|<iframe/);
});

test('keeps what posts use', () => {
  const html =
    '<aside class="note" aria-label="Note"><h2 id="x">T</h2><a href="https://a.test" target="_blank" rel="noopener">l</a><table><tbody><tr><td>c</td></tr></tbody></table></aside>';
  assert.equal(sanitise(html), html);
});
