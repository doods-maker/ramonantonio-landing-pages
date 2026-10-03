import { describe, it, expect } from 'vitest';
import { aposentadoria } from '../aposentadoria';

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

describe('LP aposentadoria', () => {
  it('slug correto', () => {
    expect(aposentadoria.slug).toBe('aposentadoria');
  });
  it('tem 8 a 12 itens de FAQ', () => {
    expect(aposentadoria.faq.length).toBeGreaterThanOrEqual(8);
    expect(aposentadoria.faq.length).toBeLessThanOrEqual(12);
  });
  it('SEO: título ≤ 60 e description entre 120 e 160 caracteres', () => {
    expect(aposentadoria.seoTitle.length).toBeLessThanOrEqual(60);
    expect(aposentadoria.seoDescription.length).toBeGreaterThanOrEqual(120);
    expect(aposentadoria.seoDescription.length).toBeLessThanOrEqual(160);
  });
  it('explica idade, transição e direito adquirido (EC 103/2019)', () => {
    const texto = JSON.stringify(aposentadoria).toLowerCase();
    for (const termo of ['aposentadoria por idade', 'tempo de contribuição', 'regras de transição', 'direito adquirido', '13/11/2019', '62 anos', '65 anos']) expect(texto).toContain(termo);
  });
  it('não viola OAB (sem promessa, valores, prazo, gratuidade nem "+X")', () => {
    const texto = JSON.stringify(aposentadoria);
    for (const re of PROIBIDO) expect(texto).not.toMatch(re);
  });
});
