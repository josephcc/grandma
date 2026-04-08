import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://lhyymed.org',
  integrations: [sitemap({ lastmod: new Date() })],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: 'tw',
    locales: ['tw', 'en'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
});
