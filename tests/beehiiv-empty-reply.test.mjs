// npm test
// beehiiv once answered 200 with no post list (5 Nov 2026) and the daily check
// crashed instead of rebuilding. These stub fetch; no network, no key.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fetchRawPosts } from '../src/lib/beehiiv-core.mjs';

const stub = (body) => async () => ({ ok: true, status: 200, json: async () => body });

test('a 200 with no post list fails with a plain message, not a TypeError', async (t) => {
  t.mock.method(globalThis, 'fetch', stub({}));
  await assert.rejects(fetchRawPosts('key', []), /returned no post list on page 1/);
});

// Replies in order, then the last one forever.
const replies = (...rs) => {
  let i = 0;
  return async () => rs[Math.min(i++, rs.length - 1)];
};
const ok = (body) => ({ ok: true, status: 200, json: async () => body });
const status = (n) => ({ ok: false, status: n, json: async () => ({}) });

test('a brief empty answer, then posts, builds', async (t) => {
  const f = t.mock.method(globalThis, 'fetch', replies(ok({}), ok({ data: [{ id: 'p1' }], total_pages: 1 })));
  assert.deepEqual(await fetchRawPosts('key', [0, 0]), [{ id: 'p1' }]);
  assert.equal(f.mock.callCount(), 2);
});

test('a busy 503, then posts, builds', async (t) => {
  t.mock.method(globalThis, 'fetch', replies(status(503), ok({ data: [{ id: 'p1' }], total_pages: 1 })));
  assert.deepEqual(await fetchRawPosts('key', [0, 0]), [{ id: 'p1' }]);
});

test('a lasting empty answer still stops the build, after three tries', async (t) => {
  const f = t.mock.method(globalThis, 'fetch', replies(ok({})));
  await assert.rejects(fetchRawPosts('key', [0, 0]), /returned no post list on page 1/);
  assert.equal(f.mock.callCount(), 3);
});

test('a bad key is not retried', async (t) => {
  const f = t.mock.method(globalThis, 'fetch', replies(status(401)));
  await assert.rejects(fetchRawPosts('key', [0, 0]), /returned 401/);
  assert.equal(f.mock.callCount(), 1);
});

test('a normal page still returns its posts', async (t) => {
  t.mock.method(globalThis, 'fetch', stub({ data: [{ id: 'p1' }], total_pages: 1 }));
  assert.deepEqual(await fetchRawPosts('key'), [{ id: 'p1' }]);
});

test('the daily check reports changed when beehiiv is unreadable', () => {
  const out = join(mkdtempSync(join(tmpdir(), 'posts-changed-')), 'out');
  const preload =
    'data:text/javascript,' +
    encodeURIComponent('globalThis.fetch = async () => ({ ok: true, status: 200, json: async () => ({}) });');
  const r = spawnSync(process.execPath, ['--import', preload, 'scripts/posts-changed.mjs'], {
    env: { ...process.env, BEEHIIV_API_KEY: 'test', GITHUB_OUTPUT: out },
    encoding: 'utf8',
  });
  assert.equal(r.status, 0, r.stderr);
  assert.match(readFileSync(out, 'utf8'), /changed=true/);
});
