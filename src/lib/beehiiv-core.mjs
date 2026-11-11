// The parts of the beehiiv pipeline that both the Astro build (via beehiiv.ts)
// and the daily "have the posts changed?" check (scripts/posts-changed.mjs)
// need. One copy, so the check can never disagree with the build about which
// posts are on the site.
import { createHash } from 'node:crypto';

export const PUB_ID = 'pub_96b7bfbb-25ad-448f-a8e8-b4d61019e30d';
const API_BASE = 'https://api.beehiiv.com/v2';

// beehiiv sometimes answers empty or busy for a moment (5 and 10-11 Nov 2026),
// then fine minutes later. Each page gets three tries before the guard below
// refuses the build. A lasting outage still stops the deploy.
export const RETRY_WAITS_MS = [5000, 15000];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchPage(apiKey, page) {
  const res = await fetch(
    `${API_BASE}/publications/${PUB_ID}/posts?status=confirmed&limit=50&page=${page}&expand=free_web_content`,
    { headers: { Authorization: `Bearer ${apiKey}` } }
  );
  if (!res.ok) {
    return {
      retry: res.status === 429 || res.status >= 500,
      error: `beehiiv API returned ${res.status}. Refusing to build with an empty ` +
        '/writing archive; the previous deploy stays live.',
    };
  }
  const body = await res.json();
  // beehiiv has answered 200 with no post list (5 Nov 2026). Say so plainly
  // instead of crashing on the spread below.
  if (!Array.isArray(body?.data)) {
    return {
      retry: true,
      error: `beehiiv API returned no post list on page ${page}. Refusing to build ` +
        'with an empty /writing archive; the previous deploy stays live.',
    };
  }
  return { body };
}

/** Every confirmed post, all pages. */
export async function fetchRawPosts(apiKey, waits = RETRY_WAITS_MS) {
  const all = [];
  for (let page = 1; ; page++) {
    let got = await fetchPage(apiKey, page);
    for (const ms of waits) {
      if (got.body || !got.retry) break;
      await sleep(ms);
      got = await fetchPage(apiKey, page);
    }
    if (!got.body) throw new Error(got.error);
    all.push(...got.body.data);
    if (!got.body.total_pages || page >= got.body.total_pages) return all;
  }
}

// beehiiv's v2 API has only three raw statuses: draft, confirmed, archived.
// "confirmed" covers both "scheduled to send later" and "already sent" - there
// is no separate scheduled status at this layer, so status=confirmed alone
// would put a post on this site the moment it is scheduled, not when beehiiv
// actually sends it.
//
// On top of that, the web page is deliberately held back a further 3 days
// after the actual send: the newsletter is the first read, the site is the
// archive. The 3-day gap is load-bearing for the LinkedIn cadence - teasers
// in week one, the post goes live Monday of week two, and teasers for the
// next issue run the Friday of week two, so the archive page lands inside
// that same steady two-week clockwork rather than surprising it.
// This gate is against post.publish_date (the real send time), never
// displayed_date - that field only overrides what date is *shown* on the
// page once it exists, e.g. dating a talk recap to the talk instead of to
// when it went out.
// Posts already sent before the embargo shipped are grandfathered: they were
// already public on the site, so the embargo must not retroactively pull them
// down and reintroduce this bug's user-visible symptom in reverse. Only posts
// sent from the cutoff onward wait out the 3 days.
const WEB_EMBARGO_SECONDS = 3 * 24 * 60 * 60;
const EMBARGO_CUTOFF = Date.UTC(2026, 8, 2) / 1000; // 2026-09-02, when this shipped

export function isOnSite(post, nowSeconds) {
  if (post.hidden_from_feed) return false;
  if (typeof post.publish_date !== 'number') return false;
  if (post.publish_date <= nowSeconds && post.publish_date < EMBARGO_CUTOFF) return true;
  return post.publish_date + WEB_EMBARGO_SECONDS <= nowSeconds;
}

/**
 * A hash of everything about the on-site posts that changes a built page:
 * which posts are live, their titles, dates and web bodies. The build publishes
 * it at /posts-fingerprint.txt; the daily check compares against that and
 * skips the rebuild when nothing moved.
 */
export function fingerprint(onSitePosts) {
  const rows = onSitePosts
    .map((p) => [
      p.slug,
      p.title,
      p.subtitle ?? '',
      p.publish_date,
      p.displayed_date ?? null,
      p.content?.free?.web ?? '',
    ])
    .sort((a, b) => String(a[0]).localeCompare(String(b[0])));
  return createHash('sha256').update(JSON.stringify(rows)).digest('hex');
}
