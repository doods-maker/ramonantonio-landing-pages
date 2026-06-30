import { describe, it, expect } from 'vitest';
import { salarioMaternidade } from '../salario-maternidade';

// "garante/garantido" descreve o benefício (direito garantido pelo INSS), não promessa de
// resultado — permitido. Barramos o que fere o Prov. 205/2021 de fato:
const PROIBIDO = [/R\$\s?\d/, /\b1\.?621\b/, /com certeza/i, /honor[áa]rio/i, /você vai (ganhar|receber)/i];

describe('LP salario-maternidade', () => {
  it('slug correto', () => {
    expect(salarioMaternidade.slug).toBe('salario-maternidade');
  });
  it('tem 8 a 12 itens de FAQ', () => {
    expect(salarioMaternidade.faq.length).toBeGreaterThanOrEqual(8);
    expect(salarioMaternidade.faq.length).toBeLessThanOrEqual(12);
  });
  it('NÃO afirma carência fixa do urbano (refutado na pesquisa)', () => {
    const texto = JSON.stringify(salarioMaternidade).toLowerCase();
    expect(texto).not.toMatch(/urban[ao].{0,40}n[ãa]o (exige|precisa de) car[êe]ncia/);
  });
  it('não viola OAB (sem promessa nem valores em R$)', () => {
    const texto = JSON.stringify(salarioMaternidade);
    for (const re of PROIBIDO) expect(texto).not.toMatch(re);
  });
});
