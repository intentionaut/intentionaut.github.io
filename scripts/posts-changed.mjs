// Daily check: have the posts that belong on the site changed since the last
// deploy? Compares beehiiv now against the fingerprint the live site was built
// with, and writes changed=true|false for the workflow. Anything it can't read
// counts as changed, so a doubt always rebuilds rather than silently skipping.
//   BEEHIIV_API_KEY=... node scripts/posts-changed.mjs
import { appendFileSync } from 'node:fs';
import { fetchRawPosts, isOnSite, fingerprint } from '../src/lib/beehiiv-core.mjs';

const LIVE = 'https://intentionaut.com/posts-fingerprint.txt';

const key = process.env.BEEHIIV_API_KEY;
if (!key) throw new Error('BEEHIIV_API_KEY is not set');

const now = Date.now() / 1000;
const current = fingerprint((await fetchRawPosts(key)).filter((p) => isOnSite(p, now)));

let live = '';
try {
  const res = await fetch(LIVE, { cache: 'no-store' });
  if (res.ok) live = (await res.text()).trim();
} catch {
  /* unreadable counts as changed */
}

const changed = current !== live;
console.log(`posts: ${changed ? 'changed' : 'unchanged'} (now ${current.slice(0, 12)}, live ${live.slice(0, 12) || 'none'})`);
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `changed=${changed}\n`);
