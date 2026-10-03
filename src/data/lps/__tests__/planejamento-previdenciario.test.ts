import { describe, it, expect } from 'vitest';
import { planejamentoPrevidenciario } from '../planejamento-previdenciario';

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

describe('LP planejamento-previdenciario', () => {
  it('slug correto', () => {
    expect(planejamentoPrevidenciario.slug).toBe('planejamento-previdenciario');
  });
  it('tem 8 a 12 itens de FAQ', () => {
    expect(planejamentoPrevidenciario.faq.length).toBeGreaterThanOrEqual(8);
    expect(planejamentoPrevidenciario.faq.length).toBeLessThanOrEqual(12);
  });
  it('SEO: título ≤60 e description 120–160', () => {
    expect(planejamentoPrevidenciario.seoTitle.length).toBeLessThanOrEqual(60);
    expect(planejamentoPrevidenciario.seoDescription.length).toBeGreaterThanOrEqual(120);
    expect(planejamentoPrevidenciario.seoDescription.length).toBeLessThanOrEqual(160);
  });
  it('cobre CNIS, regras de transição (EC 103) e contribuições em atraso/complementação', () => {
    const texto = JSON.stringify(planejamentoPrevidenciario).toLowerCase();
    for (const termo of ['cnis', 'regras de transição', 'ec 103', 'pontos', 'pedágio', 'atraso', 'complementar', '13/11/2019']) {
      expect(texto).toContain(termo);
    }
  });
  it('não viola OAB (sem promessa, valores, prazo garantido nem prova social numérica)', () => {
    const texto = JSON.stringify(planejamentoPrevidenciario);
    for (const re of PROIBIDO) expect(texto).not.toMatch(re);
  });
});
