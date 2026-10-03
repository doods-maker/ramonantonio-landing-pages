import { describe, it, expect } from 'vitest';
import { pensaoPorMorte } from '../pensao-por-morte';

// Barramos o que fere o Prov. 205/2021 de fato: valores em R$, honorários, promessa
// de resultado, prazo do INSS como garantia, consulta gratuita e prova social numérica.
const PROIBIDO = [
  /R\$\s?\d/,
  /honor[áa]rio/i,
  /com certeza/i,
  /você vai (ganhar|receber)/i,
  /garant(imos|ido o benef)/i,
  /\bem (\d+|poucos) (dias|meses|semanas)\b/i,
  /consulta gratuita/i,
  /\+\s?\d+ anos/i,
  /10\.000/,
];

describe('LP pensao-por-morte', () => {
  it('slug correto', () => {
    expect(pensaoPorMorte.slug).toBe('pensao-por-morte');
  });
  it('tem 8 a 12 itens de FAQ', () => {
    expect(pensaoPorMorte.faq.length).toBeGreaterThanOrEqual(8);
    expect(pensaoPorMorte.faq.length).toBeLessThanOrEqual(12);
  });
  it('SEO: título ≤60 e description 120–160', () => {
    expect(pensaoPorMorte.seoTitle.length).toBeLessThanOrEqual(60);
    expect(pensaoPorMorte.seoDescription.length).toBeGreaterThanOrEqual(120);
    expect(pensaoPorMorte.seoDescription.length).toBeLessThanOrEqual(160);
  });
  it('explica os pontos-chave verificados (dependentes, qualidade de segurado, duração, união estável)', () => {
    const texto = JSON.stringify(pensaoPorMorte).toLowerCase();
    for (const termo of ['dependente', 'qualidade de segurado', 'união estável', 'vitalícia', '45 anos', '18 contribuições', '2 anos']) {
      expect(texto).toContain(termo);
    }
    expect(texto).toMatch(/car[êe]ncia/);
  });
  it('não viola OAB (sem promessa, valores, prazo garantido nem prova social numérica)', () => {
    const texto = JSON.stringify(pensaoPorMorte);
    for (const re of PROIBIDO) expect(texto).not.toMatch(re);
  });
});
