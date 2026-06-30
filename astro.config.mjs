import { defineConfig } from 'astro/config';

// Saída 100% estática, URLs amigáveis no Apache (gera /<slug>/index.html).
// base '/lp' porque as LPs são publicadas na subpasta ramonantonio.adv.br/lp/.
export default defineConfig({
  site: 'https://ramonantonio.adv.br',
  base: '/lp',
  build: { format: 'directory' },
});
