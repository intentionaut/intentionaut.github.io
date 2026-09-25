import { getCollection } from 'astro:content';
import { fetchPosts, hasWebBody } from './beehiiv';
import {
  writingEntries,
  recommendationSource,
  relatedTo,
  type WritingEntry,
  type Recommendation,
} from '../data/writing';

/*
 * The one list of writing the site links to. The archive in data/writing.ts is
 * hand-curated (themes, external publications, the Blossom years); beehiiv
 * issues are merged in automatically, with a curated entry winning because it
 * carries themes the API cannot supply.
 *
 * Every /writing/ link is checked against the pages the build actually makes
 * (beehiiv posts with a web body, plus local essays), so the archive, "Keep
 * reading" and the recommendations can never point at a page that does not
 * exist. Gating a post in beehiiv removes it everywhere on the next build.
 */
let cached: Promise<WritingEntry[]> | undefined;

export function allEntries(): Promise<WritingEntry[]> {
  return (cached ??= build());
}

async function build(): Promise<WritingEntry[]> {
  const [posts, essays] = await Promise.all([fetchPosts(), getCollection('essays')]);

  const built = new Set<string>(essays.map((e) => `/writing/${e.id}/`));
  const descByUrl = new Map<string, string>();
  for (const e of essays) descByUrl.set(`/writing/${e.id}/`, e.data.description);

  const noBody: string[] = [];
  for (const p of posts) {
    const url = `/writing/${p.slug}/`;
    if (!hasWebBody(p)) {
      noBody.push(p.slug);
      continue;
    }
    built.add(url);
    if (!descByUrl.has(url) && p.subtitle) descByUrl.set(url, p.subtitle);
  }
  if (noBody.length > 0) {
    console.warn(
      `writing: ${noBody.length} published post(s) have no web body, so they get ` +
        `no page and no archive row: ${noBody.join(', ')}. ` +
        "Check that post's web settings in beehiiv."
    );
  }

  const onSite = (url?: string) => !!url && url.startsWith('/writing/');
  const missing = writingEntries.filter((e) => onSite(e.url) && !built.has(e.url!));
  if (missing.length > 0) {
    console.warn(
      `writing: ${missing.length} curated entr(ies) link to a page this build did not make, ` +
        `so they are left out: ${missing.map((e) => e.url).join(', ')}.`
    );
  }

  const curated = writingEntries.filter((e) => !onSite(e.url) || built.has(e.url!));
  const curatedUrls = new Set(curated.map((e) => e.url));

  const auto: WritingEntry[] = posts
    .filter((p) => built.has(`/writing/${p.slug}/`) && !curatedUrls.has(`/writing/${p.slug}/`))
    .map((p) => ({
      title: p.title,
      date: new Date(p.publish_date * 1000).toISOString().slice(0, 10),
      source: 'Intentionaut',
      url: `/writing/${p.slug}/`,
      themes: [],
    }));

  return [...curated, ...auto]
    .map((e) =>
      e.description || !onSite(e.url) ? e : { ...e, description: descByUrl.get(e.url!) }
    )
    .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
}

/** "Keep reading" for the article at `pathname`, from pieces that exist. */
export async function relatedFor(pathname: string, count = 3): Promise<WritingEntry[]> {
  return relatedTo(pathname, await allEntries(), count);
}

/** The curated "start here" set, minus anything whose page wasn't built. */
export async function liveRecommendations(): Promise<Recommendation[]> {
  const entries = await allEntries();
  return recommendationSource
    .map((r) => {
      const entry = entries.find((e) => e.url === r.url);
      return entry ? { entry, blurb: r.blurb } : null;
    })
    .filter((r): r is Recommendation => r !== null);
}
