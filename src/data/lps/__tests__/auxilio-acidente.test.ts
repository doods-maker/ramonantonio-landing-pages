import { describe, it, expect } from 'vitest';
import { auxilioAcidente } from '../auxilio-acidente';

// Barramos o que fere o Prov. 205/2021 de fato: valores em R$, honorários,
// promessas de resultado e prazos do INSS apresentados como garantia.
const PROIBIDO = [
  /R\$\s?\d/,
  /honor[áa]rio/i,
  /com certeza/i,
  /você vai (ganhar|receber)/i,
  /garant(imos|ido o benef)/i,
  /\bem (\d+|poucos) (dias|meses|semanas)\b/i,
];

describe('LP auxilio-acidente', () => {
  it('slug correto', () => {
    expect(auxilioAcidente.slug).toBe('auxilio-acidente');
  });
  it('tem 8 a 12 itens de FAQ', () => {
    expect(auxilioAcidente.faq.length).toBeGreaterThanOrEqual(8);
    expect(auxilioAcidente.faq.length).toBeLessThanOrEqual(12);
  });
  it('foca no auxílio-acidente mas traz o auxílio-doença como subsidiário', () => {
    const texto = JSON.stringify(auxilioAcidente).toLowerCase();
    expect(texto).toContain('auxílio-acidente');
    expect(texto).toContain('auxílio-doença');
    // protagonista: aparece no hero e no título "o que é"
    expect(auxilioAcidente.heroEyebrow.toLowerCase()).toContain('auxílio-acidente');
    expect(auxilioAcidente.oQueETitulo.toLowerCase()).toContain('auxílio-acidente');
  });
  it('explica os pontos-chave verificados (acumulável, sem carência, 50%)', () => {
    const texto = JSON.stringify(auxilioAcidente).toLowerCase();
    expect(texto).toMatch(/acumul/);
    expect(texto).toMatch(/car[êe]ncia/);
    expect(texto).toContain('50%');
  });
  it('não viola OAB (sem promessa, valores em R$ nem prazo garantido)', () => {
    const texto = JSON.stringify(auxilioAcidente);
    for (const re of PROIBIDO) expect(texto).not.toMatch(re);
  });
});
