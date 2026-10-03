import { describe, it, expect } from 'vitest';
import { reconhecimentoDeVinculo } from '../reconhecimento-de-vinculo';

// Barramos o que fere o Prov. 205/2021 de fato: valores em R$, honorários,
// promessas de resultado, "consulta gratuita" e números institucionais (+X anos / +10.000).
const PROIBIDO = [
  /R\$\s?\d/,
  /honor[áa]rio/i,
  /com certeza/i,
  /você vai (ganhar|receber)/i,
  /garant(imos|ido o ganho)/i,
  /consulta gratuita/i,
  /\+\s?\d+\s*anos/i,
  /10\.000/,
];

describe('LP reconhecimento-de-vinculo', () => {
  it('slug correto', () => {
    expect(reconhecimentoDeVinculo.slug).toBe('reconhecimento-de-vinculo');
  });
  it('tem 8 a 12 itens de FAQ', () => {
    expect(reconhecimentoDeVinculo.faq.length).toBeGreaterThanOrEqual(8);
    expect(reconhecimentoDeVinculo.faq.length).toBeLessThanOrEqual(12);
  });
  it('traz os 4 requisitos do vínculo (CLT art. 3º)', () => {
    const texto = JSON.stringify(reconhecimentoDeVinculo).toLowerCase();
    for (const t of ['pessoalidade', 'não eventual', 'onerosidade', 'subordinação']) {
      expect(texto).toContain(t);
    }
    expect(reconhecimentoDeVinculo.destaqueLegal?.fonte).toMatch(/art.*3º/);
  });
  it('cobre o que se recupera e o público PJ/MEI', () => {
    const texto = JSON.stringify(reconhecimentoDeVinculo).toLowerCase();
    for (const t of ['carteira', 'fgts', 'férias', '13º', 'inss', 'aposentadoria', 'pj', 'mei']) {
      expect(texto).toContain(t);
    }
  });
  it('menciona os prazos prescricionais (bienal/quinquenal)', () => {
    const texto = JSON.stringify(reconhecimentoDeVinculo).toLowerCase();
    expect(texto).toMatch(/2 anos/);
    expect(texto).toMatch(/5 anos|cinco anos/);
  });
  it('seoTitle até 60 e description 120–160 caracteres', () => {
    expect(reconhecimentoDeVinculo.seoTitle.length).toBeLessThanOrEqual(60);
    expect(reconhecimentoDeVinculo.seoDescription.length).toBeGreaterThanOrEqual(120);
    expect(reconhecimentoDeVinculo.seoDescription.length).toBeLessThanOrEqual(160);
  });
  it('não viola OAB', () => {
    const texto = JSON.stringify(reconhecimentoDeVinculo);
    for (const re of PROIBIDO) expect(texto).not.toMatch(re);
  });
});
