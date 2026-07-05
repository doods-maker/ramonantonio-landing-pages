export interface LeadPayload {
  nome: string;
  telefone: string;
  campanha: string;
  /** Mensagem livre do lead (opcional). */
  mensagem?: string;
  /** Honeypot anti-bot: deve vir vazio de humanos. */
  website?: string;
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;
const UTM_STORAGE_KEY = 'ra_utm';

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

/**
 * Lê os UTMs da querystring e persiste em sessionStorage, pra atribuição
 * sobreviver à navegação entre páginas antes do envio do formulário.
 */
export function capturarUtm(search?: string, storage?: StorageLike): Record<string, string> {
  try {
    const s = search ?? (typeof window === 'undefined' ? '' : window.location.search);
    const st = storage ?? (typeof sessionStorage === 'undefined' ? undefined : sessionStorage);
    const qs = new URLSearchParams(s);
    const daUrl: Record<string, string> = {};
    for (const k of UTM_KEYS) {
      const v = qs.get(k)?.trim();
      if (v) daUrl[k] = v.slice(0, 255);
    }
    if (Object.keys(daUrl).length > 0) {
      st?.setItem(UTM_STORAGE_KEY, JSON.stringify(daUrl));
      return daUrl;
    }
    return JSON.parse(st?.getItem(UTM_STORAGE_KEY) ?? '{}');
  } catch {
    return {};
  }
}

/**
 * O token de captação sai do path (vazava em log de proxy) e vai no header
 * X-Capture-Token. Aceita o PUBLIC_LEADS_ENDPOINT antigo com token na URL.
 */
export function separarToken(endpoint: string): { url: string; token?: string } {
  const m = endpoint.match(/^(.+\/ramon_leads)\/([^/?#]+)\/?$/);
  return m ? { url: m[1], token: m[2] } : { url: endpoint };
}

/** Normaliza para E.164 brasileiro: '55' + DDD(2) + número(8 ou 9). */
export function normalizarTelefone(input: string): string | null {
  const digitos = (input ?? '').replace(/\D/g, '');
  if (digitos.length < 10) return null;
  const comDDI = digitos.startsWith('55') ? digitos : `55${digitos}`;
  // 55 + 10 (fixo) ou 55 + 11 (celular) = 12 ou 13 dígitos.
  if (comDDI.length !== 12 && comDDI.length !== 13) return null;
  return comDDI;
}

export async function enviarLead(
  endpoint: string,
  payload: LeadPayload,
): Promise<{ ok: boolean }> {
  // Honeypot preenchido => bot. Finge sucesso e não envia.
  if (payload.website) return { ok: true };
  if (!payload.nome?.trim()) return { ok: false };
  const telefone = normalizarTelefone(payload.telefone);
  if (!telefone) return { ok: false };

  const { url, token } = separarToken(endpoint);
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'X-Capture-Token': token } : {}),
      },
      body: JSON.stringify({
        nome: payload.nome.trim(),
        telefone,
        campanha: payload.campanha,
        mensagem: payload.mensagem?.trim() || undefined,
        ...capturarUtm(),
      }),
    });
    return { ok: resp.ok };
  } catch {
    return { ok: false };
  }
}
