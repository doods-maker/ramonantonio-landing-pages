import { describe, it, expect } from 'vitest';
import { trabalhistaGeral } from '../trabalhista-geral';

// Barramos o que fere o Prov. 205/2021 de fato: valores em R$, honorários,
// promessas de resultado e prazos apresentados como garantia.
const PROIBIDO = [
  /R\$\s?\d/,
  /honor[áa]rio/i,
  /com certeza/i,
  /você vai (ganhar|receber)/i,
  /garant(imos|ido o ganho)/i,
];

describe('LP trabalhista-geral', () => {
  it('slug correto', () => {
    expect(trabalhistaGeral.slug).toBe('trabalhista-geral');
  });
  it('tem 8 a 12 itens de FAQ', () => {
    expect(trabalhistaGeral.faq.length).toBeGreaterThanOrEqual(8);
    expect(trabalhistaGeral.faq.length).toBeLessThanOrEqual(12);
  });
  it('cobre o mix de teses (rescisórias, horas extras, adicionais, rescisão indireta, FGTS)', () => {
    const texto = JSON.stringify(trabalhistaGeral).toLowerCase();
    for (const termo of ['rescis', 'hora', 'adicional', 'rescisão indireta', 'fgts']) {
      expect(texto).toContain(termo.toLowerCase());
    }
  });
  it('menciona os prazos prescricionais (bienal/quinquenal)', () => {
    const texto = JSON.stringify(trabalhistaGeral).toLowerCase();
    expect(texto).toMatch(/2 anos/);
    expect(texto).toMatch(/5 anos|cinco anos/);
  });
  it('não viola OAB (sem promessa nem valores em R$)', () => {
    const texto = JSON.stringify(trabalhistaGeral);
    for (const re of PROIBIDO) expect(texto).not.toMatch(re);
  });
});
