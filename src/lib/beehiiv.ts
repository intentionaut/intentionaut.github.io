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

  // beehiiv's "hide from feed" makes a post unlisted on the newsletter site.
  // We honour the same intent here: a hidden post stays off intentionaut.com/writing
  // too, so that one beehiiv toggle is the single switch for "is this post public?".
  // Premium posts are deliberately NOT filtered: they publish here with the free
  // (paywalled) web content, which is the subscribe funnel we want, not a leak.
  const published = (data as any[]).filter((post) => !post.hidden_from_feed);

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
