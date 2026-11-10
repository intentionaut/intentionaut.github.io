// A share card per writing page, built from its title. Same paths as
// /writing/[slug]/, so a new beehiiv post gets its card on the build that
// makes its page.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { fetchPosts, hasWebBody } from '../../lib/beehiiv';
import { renderCard } from '../../lib/og-card.mjs';

export async function getStaticPaths() {
  const [posts, essays] = await Promise.all([fetchPosts(), getCollection('essays')]);
  return [
    ...posts.filter(hasWebBody).map((p) => ({
      params: { slug: p.slug },
      props: { title: p.title, eyebrow: 'Saielle DaSilva · Intentionaut' },
    })),
    ...essays.map((e) => ({
      params: { slug: e.id },
      props: { title: e.data.title, eyebrow: `Saielle DaSilva · ${e.data.source}` },
    })),
  ];
}

export const GET: APIRoute = async ({ props }) =>
  new Response(await renderCard(props as { title: string; eyebrow: string }), {
    headers: { 'Content-Type': 'image/png' },
  });
