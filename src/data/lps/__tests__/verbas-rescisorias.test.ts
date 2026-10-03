import { describe, it, expect } from 'vitest';
import { verbasRescisorias } from '../verbas-rescisorias';

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

describe('LP verbas-rescisorias', () => {
  it('slug correto', () => {
    expect(verbasRescisorias.slug).toBe('verbas-rescisorias');
  });
  it('tem 8 a 12 itens de FAQ', () => {
    expect(verbasRescisorias.faq.length).toBeGreaterThanOrEqual(8);
    expect(verbasRescisorias.faq.length).toBeLessThanOrEqual(12);
  });
  it('cobre os 5 tipos de saída', () => {
    const titulos = verbasRescisorias.requisitos.map((r) => r.titulo.toLowerCase()).join(' | ');
    for (const t of ['sem justa causa', 'pedido de demissão', 'por justa causa', 'acordo', 'rescisão indireta']) {
      expect(titulos).toContain(t);
    }
  });
  it('explica prazo de 10 dias, multa do art. 477, FGTS + 40% e seguro-desemprego', () => {
    const texto = JSON.stringify(verbasRescisorias).toLowerCase();
    expect(texto).toContain('10 dias');
    expect(texto).toContain('477');
    expect(texto).toContain('40%');
    expect(texto).toContain('fgts');
    expect(texto).toContain('seguro-desemprego');
    expect(texto).toContain('484-a');
  });
  it('menciona os prazos prescricionais (bienal/quinquenal)', () => {
    const texto = JSON.stringify(verbasRescisorias).toLowerCase();
    expect(texto).toMatch(/2 anos/);
    expect(texto).toMatch(/5 anos|cinco anos/);
  });
  it('seoTitle até 60 e description 120–160 caracteres', () => {
    expect(verbasRescisorias.seoTitle.length).toBeLessThanOrEqual(60);
    expect(verbasRescisorias.seoDescription.length).toBeGreaterThanOrEqual(120);
    expect(verbasRescisorias.seoDescription.length).toBeLessThanOrEqual(160);
  });
  it('não viola OAB', () => {
    const texto = JSON.stringify(verbasRescisorias);
    for (const re of PROIBIDO) expect(texto).not.toMatch(re);
  });
});
