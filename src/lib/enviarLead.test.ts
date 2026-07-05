import { describe, it, expect, vi, beforeEach } from 'vitest';
import { normalizarTelefone, enviarLead, capturarUtm, separarToken } from './enviarLead';

describe('separarToken', () => {
  it('extrai o token do endpoint antigo com token no path', () => {
    expect(separarToken('https://chat.x.br/public/api/v1/ramon_leads/tok-123')).toEqual({
      url: 'https://chat.x.br/public/api/v1/ramon_leads',
      token: 'tok-123',
    });
  });
  it('deixa endpoint sem token intacto', () => {
    expect(separarToken('https://chat.x.br/public/api/v1/ramon_leads')).toEqual({
      url: 'https://chat.x.br/public/api/v1/ramon_leads',
    });
  });
});

describe('capturarUtm', () => {
  const storageFake = () => {
    const dados = new Map<string, string>();
    return {
      getItem: (k: string) => dados.get(k) ?? null,
      setItem: (k: string, v: string) => void dados.set(k, v),
    };
  };

  it('lê utm_* da querystring e persiste no storage', () => {
    const st = storageFake();
    const utm = capturarUtm('?utm_source=facebook&utm_campaign=aa-julho&foo=bar', st);
    expect(utm).toEqual({ utm_source: 'facebook', utm_campaign: 'aa-julho' });
    expect(capturarUtm('', st)).toEqual(utm); // recupera do storage sem querystring
  });

  it('sem utm e sem storage devolve objeto vazio', () => {
    expect(capturarUtm('?foo=bar', storageFake())).toEqual({});
  });
});

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

  it('manda o token no header e faz POST na URL sem token', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchMock);
    await enviarLead('https://x/public/api/v1/ramon_leads/tok-123', {
      nome: 'Ana', telefone: '(47) 99999-9999', campanha: 'bpc-loas',
    });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://x/public/api/v1/ramon_leads');
    expect(init.headers['X-Capture-Token']).toBe('tok-123');
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
