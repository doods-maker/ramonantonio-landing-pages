import { describe, it, expect } from 'vitest';
import { aposentadoriaEspecial } from '../aposentadoria-especial';

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

describe('LP aposentadoria-especial', () => {
  it('slug correto', () => {
    expect(aposentadoriaEspecial.slug).toBe('aposentadoria-especial');
  });
  it('tem 8 a 12 itens de FAQ', () => {
    expect(aposentadoriaEspecial.faq.length).toBeGreaterThanOrEqual(8);
    expect(aposentadoriaEspecial.faq.length).toBeLessThanOrEqual(12);
  });
  it('SEO: título ≤ 60 e description entre 120 e 160 caracteres', () => {
    expect(aposentadoriaEspecial.seoTitle.length).toBeLessThanOrEqual(60);
    expect(aposentadoriaEspecial.seoDescription.length).toBeGreaterThanOrEqual(120);
    expect(aposentadoriaEspecial.seoDescription.length).toBeLessThanOrEqual(160);
  });
  it('cobre PPP/LTCAT, 15/20/25 anos, conversão e a ADI 6309', () => {
    const texto = JSON.stringify(aposentadoriaEspecial).toLowerCase();
    for (const termo of ['ppp', 'ltcat', '15, 20 ou 25 anos', 'conversão', '13/11/2019', 'adi 6309', 'ruído']) expect(texto).toContain(termo);
  });
  it('não viola OAB (sem promessa, valores, prazo, gratuidade nem "+X")', () => {
    const texto = JSON.stringify(aposentadoriaEspecial);
    for (const re of PROIBIDO) expect(texto).not.toMatch(re);
  });
});
