export interface LeadPayload {
  nome: string;
  telefone: string;
  campanha: string;
  /** Mensagem livre do lead (opcional). */
  mensagem?: string;
  /** Honeypot anti-bot: deve vir vazio de humanos. */
  website?: string;
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

  try {
    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: payload.nome.trim(),
        telefone,
        campanha: payload.campanha,
        mensagem: payload.mensagem?.trim() || undefined,
      }),
    });
    return { ok: resp.ok };
  } catch {
    return { ok: false };
  }
}
