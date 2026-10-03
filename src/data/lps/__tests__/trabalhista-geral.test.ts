import { describe, it, expect } from 'vitest';
import { trabalhistaGeral } from '../trabalhista-geral';

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

describe('LP trabalhista-geral', () => {
  it('slug correto', () => {
    expect(trabalhistaGeral.slug).toBe('trabalhista-geral');
  });
  it('tem 8 a 12 itens de FAQ', () => {
    expect(trabalhistaGeral.faq.length).toBeGreaterThanOrEqual(8);
    expect(trabalhistaGeral.faq.length).toBeLessThanOrEqual(12);
  });
  it('foca em horas extras, adicionais e rescisão indireta', () => {
    const texto = JSON.stringify(trabalhistaGeral).toLowerCase();
    for (const termo of ['horas extras', 'adicional noturno', 'insalubridade', 'periculosidade', 'rescisão indireta']) {
      expect(texto).toContain(termo);
    }
  });
  it('aponta verbas rescisórias e vínculo para as LPs próprias (sem competir na keyword)', () => {
    const texto = JSON.stringify(trabalhistaGeral);
    expect(texto).toContain('/verbas-rescisorias/');
    expect(texto).toContain('/reconhecimento-de-vinculo/');
    expect(trabalhistaGeral.keywords).not.toContain('verbas rescisórias');
    expect(trabalhistaGeral.seoTitle.toLowerCase()).not.toContain('rescis');
  });
  it('menciona os prazos prescricionais (bienal/quinquenal)', () => {
    const texto = JSON.stringify(trabalhistaGeral).toLowerCase();
    expect(texto).toMatch(/2 anos/);
    expect(texto).toMatch(/5 anos|cinco anos/);
  });
  it('seoTitle até 60 e description 120–160 caracteres', () => {
    expect(trabalhistaGeral.seoTitle.length).toBeLessThanOrEqual(60);
    expect(trabalhistaGeral.seoDescription.length).toBeGreaterThanOrEqual(120);
    expect(trabalhistaGeral.seoDescription.length).toBeLessThanOrEqual(160);
  });
  it('não viola OAB', () => {
    const texto = JSON.stringify(trabalhistaGeral);
    for (const re of PROIBIDO) expect(texto).not.toMatch(re);
  });
});
