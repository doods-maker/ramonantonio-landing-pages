import { describe, it, expect } from 'vitest';
import { sucessoes } from '../sucessoes';

// Barramos o que fere o Prov. 205/2021 de fato: valores em R$, honorários,
// promessas de resultado, "consulta gratuita" e números institucionais (+X anos / +10.000).
const PROIBIDO = [
  /R\$\s?\d/,
  /honor[áa]rio/i,
  /com certeza/i,
  /você vai (ganhar|receber)/i,
  /garant(imos|ido)/i,
  /consulta gratuita/i,
  /\+\s?\d+\s?anos/i,
  /10\.000/,
];

describe('LP sucessoes', () => {
  it('slug correto', () => {
    expect(sucessoes.slug).toBe('sucessoes');
  });
  it('tem 8 a 12 itens de FAQ', () => {
    expect(sucessoes.faq.length).toBeGreaterThanOrEqual(8);
    expect(sucessoes.faq.length).toBeLessThanOrEqual(12);
  });
  it('cobre as 3 frentes (inventário cartório/judicial, testamento/planejamento, conflito entre herdeiros)', () => {
    const texto = JSON.stringify(sucessoes).toLowerCase();
    for (const termo of ['cartório', 'justiça', 'testamento', 'doação', 'holding', 'herdeiros não se entendem', 'sonega', 'partilha']) {
      expect(texto).toContain(termo);
    }
  });
  it('menciona o prazo de 2 meses e a multa do ITCMD de SC sem valor em R$', () => {
    const texto = JSON.stringify(sucessoes);
    expect(texto).toMatch(/2 meses/);
    expect(texto).toMatch(/ITCMD/);
    expect(sucessoes.destaqueLegal?.fonte).toMatch(/13\.136\/2004/);
    expect(sucessoes.destaqueLegal?.fonte).toMatch(/art\. 611/);
  });
  it('SEO dentro dos limites (title ≤60, description 120–160)', () => {
    expect(sucessoes.seoTitle.length).toBeLessThanOrEqual(60);
    expect(sucessoes.seoDescription.length).toBeGreaterThanOrEqual(120);
    expect(sucessoes.seoDescription.length).toBeLessThanOrEqual(160);
  });
  it('não viola OAB (sem promessa, valores em R$ nem números institucionais)', () => {
    const texto = JSON.stringify(sucessoes);
    for (const re of PROIBIDO) expect(texto).not.toMatch(re);
  });
});
