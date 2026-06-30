import { defineConfig } from 'astro/config';

// Saída 100% estática, URLs amigáveis no Apache (gera /<slug>/index.html).
export default defineConfig({
  site: 'https://ramonantonio.adv.br',
  build: { format: 'directory' },
});
