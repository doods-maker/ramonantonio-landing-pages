import { describe, it, expect } from 'vitest';
import { revisaoDeBeneficio } from '../revisao-de-beneficio';

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

describe('LP revisao-de-beneficio', () => {
  it('slug correto', () => {
    expect(revisaoDeBeneficio.slug).toBe('revisao-de-beneficio');
  });
  it('tem 8 a 12 itens de FAQ', () => {
    expect(revisaoDeBeneficio.faq.length).toBeGreaterThanOrEqual(8);
    expect(revisaoDeBeneficio.faq.length).toBeLessThanOrEqual(12);
  });
  it('SEO: título ≤60 e description 120–160', () => {
    expect(revisaoDeBeneficio.seoTitle.length).toBeLessThanOrEqual(60);
    expect(revisaoDeBeneficio.seoDescription.length).toBeGreaterThanOrEqual(120);
    expect(revisaoDeBeneficio.seoDescription.length).toBeLessThanOrEqual(160);
  });
  it('explica decadência de 10 anos (art. 103) e prescrição de 5 anos', () => {
    const texto = JSON.stringify(revisaoDeBeneficio).toLowerCase();
    expect(texto).toContain('10 anos');
    expect(texto).toContain('decadência');
    expect(texto).toContain('5 anos');
    expect(texto).toContain('art. 103');
  });
  it('NÃO apresenta a revisão da vida toda como cabível (STF, ADIs 2.110/2.111 e Tema 1.102)', () => {
    const texto = JSON.stringify(revisaoDeBeneficio).toLowerCase();
    if (texto.includes('vida toda')) {
      const faq = revisaoDeBeneficio.faq.find((f) => f.pergunta.toLowerCase().includes('vida toda'));
      expect(faq?.resposta).toMatch(/^Não\./);
      expect(faq?.resposta).toContain('1.102');
    }
  });
  it('não viola OAB (sem promessa, valores, prazo garantido nem prova social numérica)', () => {
    const texto = JSON.stringify(revisaoDeBeneficio);
    for (const re of PROIBIDO) expect(texto).not.toMatch(re);
  });
});
