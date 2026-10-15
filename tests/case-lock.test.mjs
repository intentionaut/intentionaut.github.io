// node --test tests/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lock, unlock, keyFor, unlockWithKey, exportKey, importKey } from '../src/lib/case-lock.js';

const html = '<h2>The problem</h2><p>Managers were drowning in reports.</p>';
const pw = 'correct horse battery staple';

test('round-trips with the right password', async () => {
  assert.equal(await unlock(await lock(html, pw), pw), html);
});

test('the ciphertext does not contain the text', async () => {
  assert.ok(!JSON.stringify(await lock(html, pw)).includes('drowning'));
});

test('a wrong password fails, it does not return garbage', async () => {
  await assert.rejects(unlock(await lock(html, pw), 'correct horse battery stapler'));
});

test('a tampered file fails', async () => {
  const box = await lock(html, pw);
  const ct = Buffer.from(box.ct, 'base64');
  ct[0] ^= 1;
  await assert.rejects(unlock({ ...box, ct: ct.toString('base64') }, pw));
});

test('the same text locks differently each time (fresh salt and IV)', async () => {
  const [a, b] = [await lock(html, pw), await lock(html, pw)];
  assert.notEqual(a.ct, b.ct);
  assert.notEqual(a.salt, b.salt);
});

test('a kept key reopens the page without the password', async () => {
  const box = await lock(html, pw);
  const saved = await exportKey(await keyFor(box, pw));
  assert.equal(await unlockWithKey(box, await importKey(saved)), html);
});
