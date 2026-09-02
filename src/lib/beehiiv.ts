const API_KEY = import.meta.env.BEEHIIV_API_KEY;
const PUB_ID = 'pub_96b7bfbb-25ad-448f-a8e8-b4d61019e30d';
const API_BASE = 'https://api.beehiiv.com/v2';

export interface BeehiivPost {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  publish_date: number;
  thumbnail_url: string;
  web_url: string;
  content_html: string;
  authors: string[];
  content_tags: string[];
}

/**
 * The letter footer is written for an inbox: it says what Intentionaut is, and
 * asks the reader to forward it. That is the right close in email, where
 * everyone reading is already subscribed.
 *
 * On the web it is the wrong close twice over. The reader is usually not a
 * subscriber, so "forward this" is not the useful ask; and AuthorBio and the
 * subscribe card directly below already say who wrote this, what she does, and
 * how to get the next one. Left in, the page ends four times over and repeats
 * "fortnightly" three times before the site footer says it again.
 *
 * So the footers are segmented. Email gets the perma-footer below; the web
 * render cuts it and closes with its own line instead (see .letter-close in
 * src/pages/writing/[slug].astro).
 *
 * Two markers, because the perma-footer replaced an earlier one:
 *   - Issues up to and including "Taking a Spell" opened the footer with a
 *     "Thank you for reading" H2, which beehiiv slugifies into an id.
 *   - The perma-footer has no heading, so it is anchored on its opening
 *     sentence instead - which is the positioning.md one-liner, and perma by
 *     definition. Matched last-occurrence-first so a piece that happens to
 *     quote the line in its body is not truncated at the quote.
 * Whichever marker sits earliest wins, so an issue carrying both is cut at the
 * heading.
 *
 * Older archive posts predate both and have no marker; for them this is a
 * no-op, which is correct - they end however they were written.
 */
const LETTER_FOOTER_ID = 'thank-you-for-reading';

/** Opening sentence of the perma-footer, verbatim from positioning.md. */
const LETTER_FOOTER_OPENING = 'is a fortnightly letter from Saielle DaSilva';

/**
 * A second line from the footer, used only to detect a footer the markers
 * failed to cut. Deliberately not the sign-off: the sign-off is body copy now,
 * so keying on it would warn on every issue that signs off by hand.
 */
const LETTER_FOOTER_FORWARD_LINE = 'forward it to one person';

function stripLetterFooter(content: string): string {
  const cuts: number[] = [];

  const headingIdx = content.indexOf(`<div id="${LETTER_FOOTER_ID}"`);
  if (headingIdx !== -1) cuts.push(headingIdx);

  // Cut at the block boundary, not mid-paragraph, so the markup stays balanced.
  const openingIdx = content.lastIndexOf(LETTER_FOOTER_OPENING);
  if (openingIdx !== -1) {
    const blockIdx = content.lastIndexOf('<div', openingIdx);
    if (blockIdx !== -1) cuts.push(blockIdx);
  }

  if (cuts.length > 0) return content.slice(0, Math.min(...cuts));

  // Rewording the footer would silently put it back on every essay page. Say so
  // in the build log rather than let it drift back in unnoticed.
  if (content.includes(LETTER_FOOTER_FORWARD_LINE)) {
    console.warn(
      'beehiiv: letter footer found but not removed - it matched neither the ' +
        `"${LETTER_FOOTER_ID}" heading nor the opening "${LETTER_FOOTER_OPENING}". ` +
        'Has the footer been reworded? Update the markers in src/lib/beehiiv.ts.'
    );
  }

  return content;
}

function stripBeehiivHtml(html: string): string {
  const startTag = "<div id='content-blocks'>";
  const startIdx = html.indexOf(startTag);
  if (startIdx === -1) return html;

  let content = html.slice(startIdx + startTag.length);

  content = content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  content = content.replace(/style="[^"]*"/gi, '');
  content = content.replace(/class="[^"]*"/gi, '');

  const lastClosingDiv = content.lastIndexOf('</div>');
  if (lastClosingDiv !== -1) {
    content = content.slice(0, lastClosingDiv);
  }

  content = stripLetterFooter(content);

  content = content.replace(/<div\s*>\s*<div\s*>\s*<\/div>\s*<\/div>/g, '');
  content = content.replace(/<div\s*>\s*<\/div>/g, '');
  content = content.replace(/<span\s*>\s*<\/span>/g, '');
  content = content.replace(/<small\s*>\s*<p[^>]*>([^<]*)<\/p>\s*<\/small>/g, '');

  content = content.replace(
    /<p[^>]*>\s*(Photo\s+by\s+[^<]+)<\/p>/gi,
    '<figcaption>$1</figcaption>'
  );

  content = content.replace(
    /<img[^>]*>/gi,
    '<figure class="img-card">$&</figure>'
  );

  content = content.replace(
    /<\/figure>\s*(?:<div[^>]*>\s*)?(<a[^>]*>)?\s*<figcaption>([\s\S]*?)<\/figcaption>\s*(<\/a>)?\s*(?:<\/div>)?/gi,
    (_, aOpen, caption, aClose) =>
      `</figure>${aOpen ?? ''}<figcaption class="img-caption">${caption}</figcaption>${aClose ?? ''}`
  );

  content = content.replace(
    /<figure class="img-card">/g,
    '<div class="img-wrap"><figure class="img-card">'
  );

  content = content.replace(
    /(<\/figure>)([\s\S]*?)(?=<div class="img-wrap">|<figure|<p |<h[1-6]|<ul|<ol|<blockquote|$)/g,
    (match, closeFig, between) => {
      if (between.trim().length === 0) {
        return closeFig + '</div>';
      }
      return closeFig + between + '</div>';
    }
  );

  return content.trim();
}

/**
 * Every essay's only indexable copy lives at /writing/<slug>/, built from this
 * fetch. So an empty result is never a safe default in a real build: it would
 * publish a site with no archive, drop ~24 URLs out of the sitemap, and 404
 * every essay Google already knows about. Nobody would see it happen, because
 * the build runs on a schedule.
 *
 * So: return [] only where an empty archive is genuinely expected (a local dev
 * run with no key). Anywhere else, throw. A failed build keeps the last good
 * site live and sends a failure notification, which is the outcome we want.
 */
/**
 * beehiiv can serve a post with its web body gated, returning the title and a
 * paywall marker and nothing else. Astro would happily build a page from that,
 * and it renders as a headline above an empty column.
 *
 * Both the archive listing and the page generation ask this before using a
 * post, so the two can never disagree about what exists. A gated post gets no
 * page and no row; ungating it in beehiiv brings both back on the next build,
 * with no code change.
 */
export function hasWebBody(post: BeehiivPost): boolean {
  if (post.content_html.includes("id='paywall'")) return false;
  return post.content_html.replace(/<[^>]+>/g, '').trim().length > 0;
}

export async function fetchPosts(): Promise<BeehiivPost[]> {
  if (!API_KEY) {
    if (import.meta.env.PROD) {
      throw new Error(
        'BEEHIIV_API_KEY is not set. Refusing to build a production site with an ' +
          'empty /writing archive. Check the repository secret.'
      );
    }
    console.warn('BEEHIIV_API_KEY not set; skipping post fetch.');
    return [];
  }

  const res = await fetch(
    `${API_BASE}/publications/${PUB_ID}/posts?status=confirmed&limit=50&expand=free_web_content`,
    { headers: { Authorization: `Bearer ${API_KEY}` } }
  );

  if (!res.ok) {
    throw new Error(
      `beehiiv API returned ${res.status}. Refusing to build with an empty ` +
        '/writing archive; the previous deploy stays live.'
    );
  }

  const { data } = await res.json();

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
  const now = Date.now() / 1000;
  const published = (data as any[]).filter((post) => {
    if (post.hidden_from_feed) return false;
    if (typeof post.publish_date !== 'number') return false;
    if (post.publish_date <= now && post.publish_date < EMBARGO_CUTOFF) return true;
    return post.publish_date + WEB_EMBARGO_SECONDS <= now;
  });

  return published.map((post: any) => ({
    id: post.id,
    title: post.title,
    subtitle: post.subtitle ?? '',
    slug: post.slug,
    // displayed_date is beehiiv's "show this date instead" override; use it when
    // set (e.g. a talk recap dated to the talk, not to when it was published).
    publish_date: post.displayed_date ?? post.publish_date,
    thumbnail_url: post.thumbnail_url ?? '',
    web_url: post.web_url,
    content_html: stripBeehiivHtml(
      post.content?.free?.web ?? ''
    ),
    authors: post.authors ?? [],
    content_tags: post.content_tags ?? [],
  }));
}
