import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFile, writeFile } from 'node:fs/promises';
import { readdirSync, readFileSync } from 'node:fs';

// Old paths kept alive by src/layouts/RedirectLayout.astro. They forward, so
// they must never appear in the sitemap competing with where they forward to.
//
// Exact pathnames, compared whole. A substring match here is a trap: /familiar/
// is also the tail of /open-source/familiar/ and /projects/familiar/, and a
// regex on the URL silently drops those real pages from the sitemap.
const LEGACY_REDIRECTS = new Set([
  '/speaker/',
  '/familiar/',
  '/releases/',
  '/releases/familiar/',
  '/releases/kernic/',
]);

// Password-locked case studies are noindex'd, so they stay out of the sitemap
// too (listing them made Search Console report "Submitted URL marked noindex"
// for /thank-you/). Read from the front matter, so locking a page is one flag.
const LOCKED_CASE_STUDIES = new Set(
  readdirSync('src/content/case-studies')
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .filter((f) => /^locked:\s*true\s*$/m.test(readFileSync(`src/content/case-studies/${f}`, 'utf8').split(/^---$/m)[1] ?? ''))
    .map((f) => `/case-studies/${f.replace(/\.md$/, '')}/`),
);

// Agent scanners look for /sitemap.xml; @astrojs/sitemap only writes an index
// and numbered chunks. After the build, fold every chunk into one flat urlset at
// /sitemap.xml, so both paths list the same URLs and the filter above applies
// to both. Fails the build rather than ship an empty sitemap.
const flatSitemap = {
  name: 'flat-sitemap',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const index = await readFile(new URL('sitemap-index.xml', dir), 'utf8');
      const chunks = [...index.matchAll(/<loc>[^<]*\/(sitemap-\d+\.xml)<\/loc>/g)].map((m) => m[1]);
      const xmls = await Promise.all(chunks.map((c) => readFile(new URL(c, dir), 'utf8')));
      const urls = xmls.flatMap((x) => x.match(/<url>[\s\S]*?<\/url>/g) ?? []);
      if (!urls.length) throw new Error('flat-sitemap: no URLs found in ' + chunks.join(', '));
      const head = xmls[0].slice(0, xmls[0].indexOf('<url>'));
      await writeFile(new URL('sitemap.xml', dir), head + urls.join('') + '</urlset>');
    },
  },
};

export default defineConfig({
  site: 'https://intentionaut.com',
  trailingSlash: 'always',
  // Legacy paths are real pages using RedirectLayout, not entries here.
  // Astro's built-in redirects emit a meta-refresh that drops the query
  // string, so a tagged link to an old path lost its campaign on the hop.
  // See src/layouts/RedirectLayout.astro. They are excluded from the sitemap
  // below so they are never indexed as duplicates of their destinations.
  integrations: [
    sitemap({
      // /draft/* are reworked versions of published essays: kept for readers,
      // noindex'd, and excluded from the sitemap so search engines don't treat
      // them as duplicates of the /writing/* originals.
      filter: (page) =>
        !/\/draft(\/|$)/.test(page) &&
        !/\/preview(\/|$)/.test(page) &&
        // noindex'd: listing it made Search Console report "Submitted URL marked noindex".
        !/\/thank-you\/?$/.test(page) &&
        !LEGACY_REDIRECTS.has(new URL(page).pathname) &&
        !LOCKED_CASE_STUDIES.has(new URL(page).pathname),
    }),
    flatSitemap,
  ],
  build: {
    inlineStylesheets: 'always',
  },
});
