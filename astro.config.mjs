import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://intentionaut.com',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'always',
  },
});
