import { describe, it, expect } from 'vitest';
import { bpcLoas } from '../bpc-loas';

// "garante/garantido" é descrição legal do benefício (a LOAS garante 1 salário mínimo),
// não promessa de resultado ao cliente — permitido. Barramos o que de fato fere o Prov. 205/2021:
// valores em R$, cifra do salário mínimo, promessa categórica e menção a honorários.
const PROIBIDO = [/R\$\s?\d/, /\b1\.?621\b/, /com certeza/i, /honor[áa]rio/i, /você vai (ganhar|receber)/i];

describe('LP bpc-loas', () => {
  it('slug e campanha corretos', () => {
    expect(bpcLoas.slug).toBe('bpc-loas');
  });
  it('tem 8 a 12 itens de FAQ', () => {
    expect(bpcLoas.faq.length).toBeGreaterThanOrEqual(8);
    expect(bpcLoas.faq.length).toBeLessThanOrEqual(12);
  });
  it('não viola OAB (sem promessa de resultado nem valores em R$)', () => {
    const texto = JSON.stringify(bpcLoas);
    for (const re of PROIBIDO) expect(texto).not.toMatch(re);
  });
});
