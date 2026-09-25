import { postsFingerprint } from '../lib/beehiiv';

// Read by scripts/posts-changed.mjs on the daily run. If beehiiv's on-site
// posts still hash to this, the rebuild is skipped.
export async function GET() {
  return new Response(await postsFingerprint(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
