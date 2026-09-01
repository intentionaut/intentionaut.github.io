import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://intentionaut.com',
  trailingSlash: 'always',
  // Open source story pages live under /open-source/<app>/.
  redirects: {
    // Renamed 1 Sep 2026 to put the search term people actually book on into
    // the URL. GitHub Pages cannot serve a 301, so Astro emits a noindex
    // meta-refresh page with a canonical to the new URL. Weaker than a real
    // redirect, but it keeps every existing link and business card working.
    '/speaker': '/keynote-speaker/',
    '/familiar': '/open-source/familiar/',
    '/releases': '/open-source/',
    '/releases/familiar': '/open-source/familiar/',
    '/releases/kernic': '/open-source/kernic/',
  },
  integrations: [
    sitemap({
      // /draft/* are reworked versions of published essays: kept for readers,
      // noindex'd, and excluded from the sitemap so search engines don't treat
      // them as duplicates of the /writing/* originals.
      filter: (page) => !/\/draft(\/|$)/.test(page) && !/\/preview(\/|$)/.test(page),
    }),
  ],
  build: {
    inlineStylesheets: 'always',
  },
});
