# Integração do Endpoint de Leads — ramon-hub

> **Nota histórica:** Este guia era originalmente `integracao-intranet-endpoint-leads.md` (endpoint na intranet Next.js/Supabase). A integração foi **aposentada em favor do ramon-hub** (Chatwoot fork, VPS). O nome do arquivo é mantido por razões históricas; o conteúdo abaixo descreve o novo endpoint.

Este guia descreve como enviar leads dos formulários da landing page estática (Astro) para o ramon-hub. O endpoint recebe submissões e cria leads na etapa **"Novo"** do funil Kanban.

---

## 1. Contexto

### Por que um endpoint no ramon-hub?

O ramon-hub é o **painel de leads e atendimento** (fork do Chatwoot), rodando em VPS dedicada. Centraliza:
- Recebimento e organização de leads.
- Funil Kanban com etapas customizadas.
- Histórico de conversas e notas.
- Dashboard de métricas.

A landing page estática (Astro) **não mantém estado**; por isso envia leads para um backend externo (ramon-hub) que:
- ✅ Valida e sanitiza dados.
- ✅ Cria o lead na etapa "Novo".
- ✅ Grava notas do formulário.
- ✅ Aplica rate limiting.

### Fluxo

1. Landing page (Astro) coleta dados: `nome`, `telefone`, `campanha`, `mensagem` (opcional), e um honeypot (`website`).
2. Faz `fetch POST` para `https://chat.ramonantonio.adv.br/public/api/v1/ramon_leads/<token>`.
3. O endpoint valida:
   - Nome não vazio.
   - Telefone em formato E.164 sem `+` (apenas dígitos, 12–13 caracteres).
   - Honeypot: se `website` foi preenchido, retorna sucesso fake (não cria lead).
4. Cria o lead com:
   - `source: <campanha>` (ex: `'bpc-loas'`, mapeia a origem do formulário).
   - `etapa: 'novo'` (estado inicial, primeira etapa do funil).
5. Se houver `mensagem`, grava-a como **nota automática** vinculada ao lead.
6. Retorna `HTTP 201` (sucesso) ou `HTTP 200` (honeypot) ou `HTTP 401` (token inválido) ou `HTTP 429` (rate limit).

---

## 2. Endpoint do ramon-hub

O endpoint é **público** e **requer autenticação via token**:

```
POST https://chat.ramonantonio.adv.br/public/api/v1/ramon_leads/<token>
```

Onde:
- **`<token>`** = `RAMON_LEAD_CAPTURE_TOKEN` (variável de ambiente da VPS do ramon-hub).
- **Host:** `chat.ramonantonio.adv.br` (VPS dedicada).
- **Protocolo:** HTTPS (SSL obrigatório).

**Status HTTP esperados:**
- `201 Created` — lead criado com sucesso.
- `200 OK` — honeypot detectado (não cria lead, mas retorna sucesso fake para segurança).
- `401 Unauthorized` — token inválido ou ausente.
- `429 Too Many Requests` — rate limit excedido (máx. 5 requisições por minuto por IP).
- `400 Bad Request` — validação falhou (nome vazio, telefone inválido, etc.).

---

## 3. Payload e Validações

### Estrutura da requisição

```json
{
  "nome": "João Silva",
  "telefone": "5547999999999",
  "campanha": "bpc-loas",
  "mensagem": "Gostaria de saber mais sobre o processo",
  "website": ""
}
```

**Campos:**
- **`nome`** (string, obrigatório) — não pode ser vazio após trim.
- **`telefone`** (string, obrigatório) — formato E.164 sem `+`, apenas dígitos. Aceita 12–13 caracteres (ex: `5547999999999` ou `47999999999`).
- **`campanha`** (string, recomendado) — identifica a origem do lead (ex: `'bpc-loas'`, `'salario-maternidade'`). Mapeia para o campo `source` no ramon-hub.
- **`mensagem`** (string, opcional) — texto adicional do formulário. Vira nota automática no lead.
- **`website`** (string, opcional, honeypot) — **nunca** deve ser preenchido por usuário legítimo. Se presente e não vazio, o endpoint **retorna 200 (sucesso fake) sem criar o lead** — tática anti-spam.

### Validações no endpoint

1. **Nome:** não vazio após trim.
2. **Telefone:** apenas dígitos, 12–13 caracteres, sem `+`.
3. **Honeypot:** se `website` ≠ vazio, sucesso fake (200) sem criar lead.

Se qualquer validação falhar, retorna `400` com detalhes opcionais no corpo.

### Comportamento pós-criação

- Lead é criado na etapa **"Novo"** do funil Kanban.
- Campo `source` recebe o valor de `campanha` (ex: `source: 'bpc-loas'`).
- Se `mensagem` foi fornecida, grava-se automaticamente como uma nota (comentário) associada ao lead, com marca de origem "formulário" ou similar (conforme implementação do ramon-hub).

---

## 4. Exemplo de requisição (curl)

```bash
curl -i -X POST https://chat.ramonantonio.adv.br/public/api/v1/ramon_leads/seu-token-aqui \
  -H 'Content-Type: application/json' \
  -d '{
    "nome": "Maria Santos",
    "telefone": "5547999999999",
    "campanha": "auxilio-acidente",
    "mensagem": "Sofri acidente no trabalho há 3 meses."
  }'
```

### Resultado esperado (sucesso)

```
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "lead-12345",
  "status": "novo",
  "source": "auxilio-acidente"
}
```

### Resultado esperado (honeypot)

```
HTTP/1.1 200 OK
Content-Type: application/json

{ "ok": true }
```

---

## 5. Variáveis de Ambiente

### Na landing page (`landing-pages`, este repositório)

Configure no arquivo `.env.local` (não commitar) ou no GitHub Actions Secrets:

```env
# Endpoint do ramon-hub com token
PUBLIC_LEADS_ENDPOINT=https://chat.ramonantonio.adv.br/public/api/v1/ramon_leads/seu-token-aqui
```

**Onde obter o token:**
- Localize a variável `RAMON_LEAD_CAPTURE_TOKEN` na VPS do ramon-hub.
- Ou solicite ao Eduardo / administrador do servidor.

### Na VPS do ramon-hub

Certifique-se de que a variável de ambiente está configurada:

```bash
export RAMON_LEAD_CAPTURE_TOKEN=seu-token-seguro-aqui
```

(Detalhes de deploy e configuração da VPS ficam em `ramon-hub/docs/deployment.md`.)

---

## 6. Implementação no formulário (FormLead.astro)

A landing page já possui a lógica de envio em `src/lib/enviarLead.ts`:

```typescript
// src/lib/enviarLead.ts
export async function enviarLead(dados: {
  nome: string;
  telefone: string;
  campanha: string;
  mensagem?: string;
}) {
  const endpoint = import.meta.env.PUBLIC_LEADS_ENDPOINT;
  if (!endpoint) {
    console.error('PUBLIC_LEADS_ENDPOINT não configurado');
    return false;
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });

    // 201 = sucesso; 200 = honeypot (também conta como "sucesso" pro usuário)
    return response.status === 201 || response.status === 200;
  } catch (error) {
    console.error('Erro ao enviar lead:', error);
    return false;
  }
}
```

**Fluxo:**
1. Usuário preenche o formulário (`FormLead.astro`).
2. Clica "Enviar".
3. JavaScript chama `enviarLead()` com os dados.
4. Fetch POST para `PUBLIC_LEADS_ENDPOINT`.
5. Se sucesso (201 ou 200), dispara evento Meta Pixel `Track('Lead')`.
6. Exibe mensagem de confirmação ao usuário.

**Nenhuma alteração é necessária no código do formulário** — a URL do endpoint é lida de `PUBLIC_LEADS_ENDPOINT` em tempo de build.

---

## 7. Teste e Validação

### Teste pré-deploy

Antes de fazer deploy das landing pages, valide que o endpoint está pronto:

```bash
curl -i -X POST https://chat.ramonantonio.adv.br/public/api/v1/ramon_leads/seu-token-aqui \
  -H 'Content-Type: application/json' \
  -d '{"nome":"Teste","telefone":"5547999999999","campanha":"teste"}'
```

Esperado: `HTTP/1.1 201 Created`.

### Teste no painel (ramon-hub)

Após enviar um lead pelo formulário:
1. Acesse https://chat.ramonantonio.adv.br/ (painel do ramon-hub).
2. Abra a aba **Kanban** ou **Leads**.
3. Procure pelo lead recém-criado na etapa **"Novo"**.
4. Confirme os dados: nome, telefone, source (campanha), e a nota (se foi fornecida).

---

## 8. Troubleshooting

| Problema | Causa provável | Solução |
|---|---|---|
| `401 Unauthorized` | Token inválido ou ausente. | Confirme `PUBLIC_LEADS_ENDPOINT` com o token correto. |
| `429 Too Many Requests` | Ultrapassou 5 requisições/minuto. | Aguarde 1 minuto; não é um erro do cliente. |
| `400 Bad Request` | Nome vazio ou telefone inválido. | Valide os dados no formulário antes de enviar. |
| Lead não aparece no painel | Endpoint respondeu 200/201 mas lead não foi criado. | Verifique se o ramon-hub está rodando e se há espaço em disco. |
| Honeypot não funciona | Campo `website` não está no formulário. | Adicione um campo hidden `name="website"` no HTML. |

---

## 9. Referências

- **Código do formulário:** `src/components/FormLead.astro` (este repositório).
- **Lógica de envio:** `src/lib/enviarLead.ts` (este repositório).
- **Painel de leads:** https://chat.ramonantonio.adv.br/ (ramon-hub em produção).
- **Documentação do ramon-hub:** `ramon-hub/docs/` (repositório doods-maker/ramon-hub).
