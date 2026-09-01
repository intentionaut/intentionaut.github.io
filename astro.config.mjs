import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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
        !LEGACY_REDIRECTS.has(new URL(page).pathname),
    }),
  ],
  build: {
    inlineStylesheets: 'always',
  },
});
