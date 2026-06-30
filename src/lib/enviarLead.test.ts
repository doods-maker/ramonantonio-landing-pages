import { describe, it, expect, vi, beforeEach } from 'vitest';
import { normalizarTelefone, enviarLead } from './enviarLead';

describe('normalizarTelefone', () => {
  it('aceita formato mascarado com DDD e adiciona 55', () => {
    expect(normalizarTelefone('(47) 99999-9999')).toBe('5547999999999');
  });
  it('mantém número que já começa com 55', () => {
    expect(normalizarTelefone('5547999999999')).toBe('5547999999999');
  });
  it('aceita fixo de 10 dígitos com DDD', () => {
    expect(normalizarTelefone('4733334444')).toBe('554733334444');
  });
  it('rejeita número curto demais', () => {
    expect(normalizarTelefone('99999')).toBeNull();
  });
  it('rejeita string sem dígitos', () => {
    expect(normalizarTelefone('abc')).toBeNull();
  });
});

describe('enviarLead', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('rejeita sem fazer fetch quando o telefone é inválido', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const res = await enviarLead('https://x/api', { nome: 'Ana', telefone: '123', campanha: 'bpc-loas' });
    expect(res.ok).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('faz POST com telefone normalizado e campanha', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchMock);
    const res = await enviarLead('https://x/api', { nome: 'Ana', telefone: '(47) 99999-9999', campanha: 'bpc-loas' });
    expect(res.ok).toBe(true);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://x/api');
    const body = JSON.parse(init.body);
    expect(body).toMatchObject({ nome: 'Ana', telefone: '5547999999999', campanha: 'bpc-loas' });
  });

  it('retorna ok:false quando o servidor responde erro', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
    const res = await enviarLead('https://x/api', { nome: 'Ana', telefone: '(47) 99999-9999', campanha: 'bpc-loas' });
    expect(res.ok).toBe(false);
  });

  it('finge sucesso e não faz fetch quando honeypot está preenchido', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const res = await enviarLead('https://x/api', {
      nome: 'Bot', telefone: '(47) 99999-9999', campanha: 'bpc-loas', website: 'spam.com',
    });
    expect(res.ok).toBe(true);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
