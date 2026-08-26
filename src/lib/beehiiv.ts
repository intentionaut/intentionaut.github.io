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

  content = content.replace(
    /<p[^>]*>\s*(Photo\s+by\s+[^<]+)<\/p>/gi,
    '<figcaption>$1</figcaption>'
  );

  return content.trim();
}

export async function fetchPosts(): Promise<BeehiivPost[]> {
  if (!API_KEY) {
    console.warn('BEEHIIV_API_KEY not set; skipping post fetch.');
    return [];
  }

  const res = await fetch(
    `${API_BASE}/publications/${PUB_ID}/posts?status=confirmed&limit=50&expand=free_web_content`,
    { headers: { Authorization: `Bearer ${API_KEY}` } }
  );

  if (!res.ok) {
    console.error(`beehiiv API error: ${res.status}`);
    return [];
  }

  const { data } = await res.json();

  return data.map((post: any) => ({
    id: post.id,
    title: post.title,
    subtitle: post.subtitle ?? '',
    slug: post.slug,
    publish_date: post.publish_date,
    thumbnail_url: post.thumbnail_url ?? '',
    web_url: post.web_url,
    content_html: stripBeehiivHtml(
      post.content?.free?.web ?? ''
    ),
    authors: post.authors ?? [],
    content_tags: post.content_tags ?? [],
  }));
}
