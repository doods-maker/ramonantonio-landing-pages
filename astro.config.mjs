import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Saída 100% estática, URLs amigáveis no Apache (gera /<slug>/index.html).
export default defineConfig({
  site: 'https://ramonantonio.adv.br',
  build: { format: 'directory' },
  integrations: [sitemap()],
});
