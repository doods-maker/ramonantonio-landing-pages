# Integração do Endpoint de Leads na Intranet

Este guia descreve como implementar e testar o endpoint `POST /api/public/leads` no repositório `intranet-ramon`. Este endpoint recebe submissões de formulários da landing page estática (Astro) e insere os leads na tabela `public.leads` do Supabase.

---

## 1. Contexto

### Por que um endpoint na intranet?

A tabela `public.leads` no Supabase está protegida por **Row Level Security (RLS)** que exige autenticação: `auth.uid() is not null`. Isso significa que:

- ❌ A landing page estática (Astro) **não pode fazer insert direto** com a chave anônima (`NEXT_PUBLIC_SUPABASE_ANON_KEY`).
- ❌ Abrir insert anônimo sem autenticação viraria spam e comprometeria a segurança.
- ✅ A solução é criar um endpoint **privado** na intranet (Next.js com service role) que autentica via `SUPABASE_SERVICE_ROLE_KEY`.

### Fluxo

1. Landing page (Astro) coleta dados: `nome`, `telefone`, `campanha`, e um honeypot (`website`).
2. Faz `fetch POST` para `https://intranet.ramonantonio.adv.br/api/public/leads`.
3. O endpoint valida:
   - Nome não vazio.
   - Telefone (apenas dígitos, 12–13 caracteres).
   - Honeypot: se `website` foi preenchido, retorna sucesso fake (não insere).
4. Insere na tabela `leads` com:
   - `origem: 'meta_ads'` (origem fixa, já que vem da LP).
   - `campanha`: valor recebido (ex: `'bpc-loas'`).
   - `etapa: 'novo'` (estado inicial).
5. Retorna `HTTP 200 + {"ok": true}` (sucesso) ou `HTTP 400 + {"ok": false}` (validação).

---

## 2. Onde colar: estrutura do arquivo

No repositório `intranet-ramon`, crie o arquivo:

```
intranet-ramon/
└── app/
    └── api/
        └── public/
            └── leads/
                ├── route.ts          ← criar aqui
                └── route.test.ts     ← teste
```

---

## 3. Código do route.ts

Crie o arquivo `intranet-ramon/app/api/public/leads/route.ts`:

```ts
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin'; // confirmar caminho real na intranet

const ORIGEM_PERMITIDA = 'https://ramonantonio.adv.br';

function corsHeaders(origin: string | null) {
  const allow = origin === ORIGEM_PERMITIDA ? ORIGEM_PERMITIDA : '';
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export function OPTIONS(req: Request) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req.headers.get('origin')) });
}

export async function POST(req: Request) {
  const headers = corsHeaders(req.headers.get('origin'));
  let body: { nome?: string; telefone?: string; campanha?: string; website?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400, headers });
  }

  // Honeypot: finge sucesso, não grava.
  if (body.website) return NextResponse.json({ ok: true }, { status: 200, headers });

  const nome = body.nome?.trim();
  const telefone = (body.telefone ?? '').replace(/\D/g, '');
  const campanha = body.campanha?.trim() || 'lp';
  if (!nome || telefone.length < 12 || telefone.length > 13) {
    return NextResponse.json({ ok: false }, { status: 400, headers });
  }

  const { error } = await supabaseAdmin.from('leads').insert({
    nome, telefone, origem: 'meta_ads', campanha, etapa: 'novo',
  });
  if (error) return NextResponse.json({ ok: false }, { status: 500, headers });
  return NextResponse.json({ ok: true }, { status: 200, headers });
}
```

### Atenção — confirmação de caminho

**Confirme o caminho real do cliente Supabase admin na intranet.** O import acima assume `@/lib/supabase/admin`, mas pode estar em outro local (ex: `lib/clients/supabase`, `utils/supabase/admin.ts`, etc.). Ajuste conforme necessário.

---

## 4. Teste (route.test.ts)

Crie o arquivo `intranet-ramon/app/api/public/leads/route.test.ts`:

```ts
import { describe, it, expect, vi } from 'vitest';

// Mock do cliente admin do Supabase (ajustar o caminho ao real da intranet).
const insert = vi.fn().mockResolvedValue({ error: null });
vi.mock('@/lib/supabase/admin', () => ({
  supabaseAdmin: { from: () => ({ insert }) },
}));

import { POST } from './route';

function req(body: unknown, origin = 'https://ramonantonio.adv.br') {
  return new Request('https://intranet/api/public/leads', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin },
    body: JSON.stringify(body),
  });
}

describe('POST /api/public/leads', () => {
  it('insere lead válido com origem meta_ads', async () => {
    const res = await POST(req({ nome: 'Ana', telefone: '5547999999999', campanha: 'bpc-loas' }));
    expect(res.status).toBe(200);
    expect(insert).toHaveBeenCalledWith(
      expect.objectContaining({ nome: 'Ana', telefone: '5547999999999', origem: 'meta_ads', campanha: 'bpc-loas', etapa: 'novo' }),
    );
  });
  it('rejeita honeypot preenchido sem inserir', async () => {
    insert.mockClear();
    const res = await POST(req({ nome: 'Bot', telefone: '5547999999999', campanha: 'x', website: 'spam' }));
    expect(res.status).toBe(200);
    expect(insert).not.toHaveBeenCalled();
  });
  it('rejeita payload sem nome', async () => {
    const res = await POST(req({ telefone: '5547999999999', campanha: 'x' }));
    expect(res.status).toBe(400);
  });
});
```

### Atenção — ajuste do mock

**Confirme o caminho real do cliente admin** no mock (`vi.mock('@/lib/supabase/admin', ...)`) para que corresponda ao mesmo import do `route.ts`.

---

## 5. Variáveis de ambiente

Verifique se as seguintes variáveis estão **configuradas tanto na Vercel quanto na VPS** onde a intranet roda:

- `SUPABASE_SERVICE_ROLE_KEY` — chave privada (service role) do Supabase. Mantém acesso total ao banco, sem RLS.
- `NEXT_PUBLIC_SUPABASE_URL` — URL do projeto Supabase (ex: `https://seu-projeto.supabase.co`).

**Na landing page** (`ramonantonio-site`), configure:

- `PUBLIC_LEADS_ENDPOINT` — URL completa do endpoint na intranet. Exemplo:
  ```
  PUBLIC_LEADS_ENDPOINT=https://intranet.ramonantonio.adv.br/api/public/leads
  ```

---

## 6. Teste de validação (curl)

Depois de fazer deploy do endpoint, teste com:

```bash
curl -i -X POST https://intranet.ramonantonio.adv.br/api/public/leads \
  -H 'Content-Type: application/json' \
  -H 'Origin: https://ramonantonio.adv.br' \
  -d '{"nome":"Teste","telefone":"5547999999999","campanha":"bpc-loas"}'
```

### Resultado esperado

```
HTTP/1.1 200 OK
Content-Type: application/json
Access-Control-Allow-Origin: https://ramonantonio.adv.br

{"ok":true}
```

### Verificação no banco

1. Acesse o Supabase dashboard.
2. Abra a tabela `leads`.
3. Procure pelo registro recém-inserido com:
   - `origem: 'meta_ads'`
   - `campanha: 'bpc-loas'`
   - `etapa: 'novo'`
   - `nome: 'Teste'`
   - `telefone: '5547999999999'`

Se encontrar, o endpoint está funcionando.

---

## 7. Nota de aprovação

**Esta implementação (arquivo `route.ts`, teste e commit) é executada no repositório `intranet-ramon` pelo Eduardo**, conforme a **Regra de Aprovação** estabelecida na constituição do workspace (RAdvogados/CLAUDE.md).

A landing page (`ramonantonio-site`, neste repositório) apenas **faz fetch para este endpoint**; ela não contém lógica de banco de dados.

Passos após completar a implementação:
1. Rodar `npx vitest run app/api/public/leads/route.test.ts` (esperado: 3 testes passando).
2. Fazer commit: `git commit -m "feat: endpoint POST /api/public/leads com validação e honeypot"`.
3. Fazer push para `intranet-ramon`.
4. Deploy na VPS (ou Vercel, conforme configurado).
5. Validar com o curl acima.

Depois de validado, a landing page já pode enviar leads para a intranet usando o `PUBLIC_LEADS_ENDPOINT` configurado no seu `.env.local`.
