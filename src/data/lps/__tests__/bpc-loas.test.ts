import { describe, it, expect } from 'vitest';
import { bpcLoas } from '../bpc-loas';

const PROIBIDO = [/garant(e|imos|ido)/i, /R\$\s?\d/, /\b1\.?621\b/, /com certeza/i, /honor[áa]rio/i];

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
