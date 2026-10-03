import { describe, it, expect } from 'vitest';
import { responsabilidadeCivil } from '../responsabilidade-civil';

// Barramos o que fere o Prov. 205/2021 de fato: valores em R$, honorários,
// promessas de resultado/valor, "consulta gratuita" e números institucionais (+X anos / +10.000).
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

describe('LP responsabilidade-civil', () => {
  it('slug correto', () => {
    expect(responsabilidadeCivil.slug).toBe('responsabilidade-civil');
  });
  it('tem 8 a 12 itens de FAQ', () => {
    expect(responsabilidadeCivil.faq.length).toBeGreaterThanOrEqual(8);
    expect(responsabilidadeCivil.faq.length).toBeLessThanOrEqual(12);
  });
  it('cobre indenizações em geral (material, moral, lucros cessantes) com exemplos variados', () => {
    const texto = JSON.stringify(responsabilidadeCivil).toLowerCase();
    for (const termo of ['dano material', 'dano moral', 'lucros cessantes', 'acidente', 'consumo', 'terceiro', 'provas']) {
      expect(texto).toContain(termo);
    }
  });
  it('menciona os prazos prescricionais verificados (3 anos CC; 5 anos CDC)', () => {
    const texto = JSON.stringify(responsabilidadeCivil);
    expect(texto).toMatch(/3 anos/);
    expect(texto).toMatch(/5 anos/);
    expect(responsabilidadeCivil.destaqueLegal?.fonte).toMatch(/206, § 3º, V/);
    expect(responsabilidadeCivil.destaqueLegal?.fonte).toMatch(/art\. 27/);
  });
  it('SEO dentro dos limites (title ≤60, description 120–160)', () => {
    expect(responsabilidadeCivil.seoTitle.length).toBeLessThanOrEqual(60);
    expect(responsabilidadeCivil.seoDescription.length).toBeGreaterThanOrEqual(120);
    expect(responsabilidadeCivil.seoDescription.length).toBeLessThanOrEqual(160);
  });
  it('não viola OAB (sem promessa, valores em R$ nem números institucionais)', () => {
    const texto = JSON.stringify(responsabilidadeCivil);
    for (const re of PROIBIDO) expect(texto).not.toMatch(re);
  });
});
