// lastmod for each sitemap URL: the last commit that touched the files the page
// is built from, never the build date (#78). A shallow clone has no history, so
// it returns nothing rather than stamp every page with today.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();

let shallow;
export function isShallow() {
  if (shallow === undefined) {
    try { shallow = git('rev-parse', '--is-shallow-repository') === 'true'; } catch { shallow = true; }
  }
  return shallow;
}

/** The source files a pathname is built from, or [] if unknown (beehiiv posts, endpoints). */
export function sourcesFor(pathname) {
  const p = pathname.replace(/^\/|\/$/g, '');
  const parts = p ? p.split('/') : [];
  const page = (rel) => `src/pages/${rel}`;
  const files = [];
  if (!parts.length) files.push(page('index.astro'));
  else {
    for (const rel of [`${p}.astro`, `${p}/index.astro`]) if (existsSync(page(rel))) files.push(page(rel));
    if (!files.length && parts.length === 2) {
      const [dir, slug] = parts;
      const dyn = page(`${dir}/[slug].astro`);
      const content = { 'case-studies': 'case-studies', projects: 'projects' }[dir];
      if (content && existsSync(`src/content/${content}/${slug}.md`)) files.push(dyn, `src/content/${content}/${slug}.md`);
      else if (dir === 'workshops' && existsSync(dyn)) files.push(dyn, 'src/data/workshops.ts');
      else if (dir === 'tools') files.push(page('tools/[family]/index.astro'), 'src/data/tools.ts');
    }
    if (!files.length && parts.length === 3 && parts[0] === 'tools') files.push(page('tools/[family]/[slug].astro'), 'src/data/tools.ts');
    // Essays are local markdown; beehiiv posts have no source file and get their
    // date from the page itself after the build (see flat-sitemap in astro.config.mjs).
    if (!files.length && parts.length === 2 && parts[0] === 'writing') files.push(`src/content/essays/${parts[1]}.md`);
  }
  return files.filter(existsSync);
}

/** ISO date of the newest commit touching the page's sources, or null. */
export function lastmodFor(pathname) {
  const files = sourcesFor(pathname);
  if (!files.length || isShallow()) return null;
  try { return git('log', '-1', '--format=%cI', '--', ...files) || null; } catch { return null; }
}
