import { describe, it, expect } from 'vitest';
import { aposentadoriaRural } from '../aposentadoria-rural';

// Barramos o que fere o Prov. 205/2021 de fato: valores em R$, honorários,
// promessas de resultado, prazos do INSS, "consulta gratuita" e "+X anos/+10.000".
const PROIBIDO = [
  /R\$\s?\d/,
  /honor[áa]rio/i,
  /com certeza/i,
  /você vai (ganhar|receber)/i,
  /garant(imos|ido o benef)/i,
  /\bem (\d+|poucos) (dias|meses|semanas)\b/i,
  /consulta gratuita/i,
  /\+\s?\d/,
];

describe('LP aposentadoria-rural', () => {
  it('slug correto', () => {
    expect(aposentadoriaRural.slug).toBe('aposentadoria-rural');
  });
  it('tem 8 a 12 itens de FAQ', () => {
    expect(aposentadoriaRural.faq.length).toBeGreaterThanOrEqual(8);
    expect(aposentadoriaRural.faq.length).toBeLessThanOrEqual(12);
  });
  it('SEO: título ≤ 60 e description entre 120 e 160 caracteres', () => {
    expect(aposentadoriaRural.seoTitle.length).toBeLessThanOrEqual(60);
    expect(aposentadoriaRural.seoDescription.length).toBeGreaterThanOrEqual(120);
    expect(aposentadoriaRural.seoDescription.length).toBeLessThanOrEqual(160);
  });
  it('cobre segurado especial, idade reduzida e prova rural', () => {
    const texto = JSON.stringify(aposentadoriaRural).toLowerCase();
    for (const termo of ['segurado especial', '55 anos', '60 anos', 'pescador artesanal', 'autodeclaração', 'economia familiar', 'carnê']) expect(texto).toContain(termo);
  });
  it('não viola OAB (sem promessa, valores, prazo, gratuidade nem "+X")', () => {
    const texto = JSON.stringify(aposentadoriaRural);
    for (const re of PROIBIDO) expect(texto).not.toMatch(re);
  });
});
