// npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { keyFromLink, lock, newKey, unlock } from '../src/lib/case-lock.js';

const html = '<h2>The problem</h2><p>Managers were drowning in reports.</p>';

test('round-trips with the key', async () => {
  const k = newKey();
  assert.equal(await unlock(await lock(html, k), k), html);
});

test('the ciphertext does not contain the text', async () => {
  assert.ok(!JSON.stringify(await lock(html, newKey())).includes('drowning'));
});

test('another key fails, it does not return garbage', async () => {
  await assert.rejects(unlock(await lock(html, newKey()), newKey()));
});

test('a tampered file fails', async () => {
  const k = newKey();
  const box = await lock(html, k);
  const c = box.ct[0] === 'A' ? 'B' : 'A';
  await assert.rejects(unlock({ ...box, ct: c + box.ct.slice(1) }, k));
});

test('keys are fresh and URL-safe', () => {
  const [a, b] = [newKey(), newKey()];
  assert.notEqual(a, b);
  assert.match(a, /^[A-Za-z0-9_-]{43}$/);
});

test('the key comes out of a whole link, a fragment, or nothing', () => {
  const k = newKey();
  assert.equal(keyFromLink(`https://intentionaut.com/case-studies/quorso/#k=${k}`), k);
  assert.equal(keyFromLink(`#k=${k}`), k);
  assert.equal(keyFromLink(`k=${k}`), k);
  assert.equal(keyFromLink('https://intentionaut.com/case-studies/quorso/'), null);
  assert.equal(keyFromLink(`#k=${k.slice(0, 20)}`), null);
});
