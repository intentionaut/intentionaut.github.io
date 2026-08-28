import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://intentionaut.com',
  trailingSlash: 'always',
  redirects: {
    // Was a beehiiv-sourced essay page; the post is archived and the talk it
    // came from now lives under Speaking. Keep the old URL from 404ing.
    '/writing/the-ai-opportunity-you-re-missing/': '/speaking/',
  },
  integrations: [
    sitemap({
      // /draft/* are reworked versions of published essays: kept for readers,
      // noindex'd, and excluded from the sitemap so search engines don't treat
      // them as duplicates of the /writing/* originals.
      filter: (page) => !/\/draft(\/|$)/.test(page),
    }),
  ],
  build: {
    inlineStylesheets: 'always',
  },
});
