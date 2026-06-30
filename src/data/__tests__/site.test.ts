import { describe, it, expect } from 'vitest';
import { site } from '../site';

describe('site', () => {
  it('expõe identificação profissional obrigatória (OAB)', () => {
    expect(site.nomeBanca).toMatch(/Ramon Antônio/i);
    expect(site.oab).toMatch(/OAB/i);
  });
  it('lista regiões atendidas em SC', () => {
    expect(site.regioesAtendidas.length).toBeGreaterThan(0);
  });
});
