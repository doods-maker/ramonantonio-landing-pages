# Landing Pages — Fundação + 2 LPs fundamentadas — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir a infraestrutura Astro estática de landing pages de captação e publicar as duas LPs com base jurídica verificada (BPC/LOAS e salário-maternidade), com captura de lead por formulário (→ intranet/CRM) e WhatsApp, Meta Pixel e deploy FTP isolado.

**Architecture:** Site Astro estático ("uma LP = um arquivo de dados" tipado + página fina que monta componentes reutilizáveis). Lógica pura (validação de telefone, envio de lead, eventos de Pixel) isolada em `src/lib/` e coberta por testes Vitest. Formulário faz `POST` para um endpoint público na intranet Next.js (service role + CORS + honeypot), porque a tabela `leads` do Supabase só aceita insert autenticado. Deploy por GitHub Action via FTP para subpastas do HostGator, com manifesto de sync separado do site institucional.

**Tech Stack:** Astro (saída estática), TypeScript, Vitest, Meta Pixel, GitHub Actions + FTP-Deploy-Action. Endpoint: Next.js App Router (projeto `intranet-ramon`) + Supabase service role.

## Global Constraints

- **OAB Provimento 205/2021 (trava de conteúdo):** nunca prometer resultado; nunca cravar prazo do INSS; sem casos concretos individuais; sem mencionar honorários/pagamento/descontos/gratuidade; sem captação ativa de clientela; sem "especialista" sem título; sem mencionar estrutura física. Conteúdo apenas informativo, tom "médico de confiança".
- **Nada de valores monetários fixos** nas LPs (salário mínimo, teto de renda do BPC mudam todo ano) — usar linguagem qualitativa ("baixa renda", "critério definido por lei").
- **Idioma:** português (pt-BR) em todo o conteúdo.
- **Saída estática:** sem SSR/backend no projeto de LPs — tudo gerado no build.
- **Não commitar `dist/`.**
- **Telefone:** normalizar para E.164 brasileiro (`55` + DDD + número), formato igual ao da intranet (`5547999999999`).
- **Origem do lead na intranet:** sempre `origem='meta_ads'`, `campanha=<slug-da-lp>`, `etapa='novo'`.
- **Aprovação:** todo conteúdo e todo deploy nascem rascunho; publicação só com "aprovado" do Eduardo.

---

### Task 1: Scaffold do projeto Astro + Vitest

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `.gitignore`
- Create: `.env.example`
- Create: `src/styles/global.css`
- Create: `src/lib/__tests__/smoke.test.ts`

**Interfaces:**
- Consumes: nada (primeira task).
- Produces: projeto buildável (`npm run build`) e testável (`npm test`); variáveis de ambiente `PUBLIC_WHATSAPP_NUMERO`, `PUBLIC_META_PIXEL_ID`, `PUBLIC_LEADS_ENDPOINT`.

- [ ] **Step 1: Criar `package.json`**

```json
{
  "name": "landing-pages",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "astro": "^5.0.0",
    "@astrojs/sitemap": "^3.2.0"
  },
  "devDependencies": {
    "vitest": "^2.1.0",
    "typescript": "^5.6.0"
  }
}
```

- [ ] **Step 2: Criar `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Saída 100% estática, URLs amigáveis no Apache (gera /<slug>/index.html).
export default defineConfig({
  site: 'https://ramonantonio.adv.br',
  build: { format: 'directory' },
  integrations: [sitemap()],
});
```

- [ ] **Step 3: Criar `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "types": ["astro/client"]
  }
}
```

- [ ] **Step 4: Criar `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
```

- [ ] **Step 5: Criar `.gitignore`**

```gitignore
node_modules/
dist/
.astro/
.env
.DS_Store
npm-debug.log*
```

- [ ] **Step 6: Criar `.env.example`**

```bash
# Número do WhatsApp em E.164 (DDI 55 + DDD + número), só dígitos.
PUBLIC_WHATSAPP_NUMERO=55XXXXXXXXXXX
# ID do Pixel do Meta (deixar vazio desativa o Pixel no build).
PUBLIC_META_PIXEL_ID=
# URL absoluta do endpoint de leads na intranet.
PUBLIC_LEADS_ENDPOINT=https://intranet.ramonantonio.adv.br/api/public/leads
```

- [ ] **Step 7: Criar `src/styles/global.css` (paleta base — ajustar à marca depois)**

```css
:root {
  --cor-primaria: #0b3d5c;
  --cor-acento: #1f9d55;
  --cor-texto: #1a1a1a;
  --cor-fundo: #ffffff;
  --cor-fundo-suave: #f4f7f9;
  --fonte-base: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --raio: 10px;
  --largura-max: 980px;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; font-family: var(--fonte-base); color: var(--cor-texto); background: var(--cor-fundo); line-height: 1.6; }
.container { max-width: var(--largura-max); margin: 0 auto; padding: 0 20px; }
```

- [ ] **Step 8: Criar teste smoke `src/lib/__tests__/smoke.test.ts`**

```ts
import { describe, it, expect } from 'vitest';

describe('toolchain', () => {
  it('roda Vitest', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 9: Instalar e rodar build + teste**

Run: `npm install && npm test && npm run build`
Expected: testes PASS (1 passed) e build gera `dist/` sem páginas (ou aviso de "no pages", aceitável neste ponto).

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "chore: scaffold Astro + Vitest do projeto landing-pages"
```

---

### Task 2: Tipo `LandingData` + dados da banca (`site.ts`)

**Files:**
- Create: `src/data/types.ts`
- Create: `src/data/site.ts`
- Test: `src/data/__tests__/site.test.ts`

**Interfaces:**
- Consumes: nada de tasks anteriores.
- Produces:
  - `interface LandingData` (campos abaixo) — consumido por todas as páginas e componentes.
  - `interface FaqItem { pergunta: string; resposta: string }`
  - `interface PassoComoFunciona { titulo: string; descricao: string }`
  - `const site: { nomeBanca: string; oab: string; cidade: string; whatsappNumero: string; regioesAtendidas: string[] }`

- [ ] **Step 1: Escrever o teste falhando `src/data/__tests__/site.test.ts`**

```ts
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
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `npx vitest run src/data/__tests__/site.test.ts`
Expected: FAIL ("Cannot find module '../site'").

- [ ] **Step 3: Criar `src/data/types.ts`**

```ts
export interface FaqItem {
  pergunta: string;
  resposta: string;
}

export interface PassoComoFunciona {
  titulo: string;
  descricao: string;
}

export interface LandingData {
  /** Slug da URL e valor de `campanha` no CRM. Ex.: 'bpc-loas'. */
  slug: string;
  /** SEO */
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  /** Hero */
  heroHeadline: string;
  heroSub: string;
  /** Mensagem pré-preenchida do WhatsApp para esta LP. */
  mensagemWhats: string;
  /** Bloco "isto é pra você?" — sinais de elegibilidade, sem prometer resultado. */
  elegibilidadeTitulo: string;
  elegibilidadeSinais: string[];
  /** Como funciona (3 passos). */
  comoFunciona: PassoComoFunciona[];
  /** FAQ (8–12 itens). */
  faq: FaqItem[];
  /** Texto do CTA final. */
  ctaFinalTitulo: string;
  ctaFinalTexto: string;
}
```

- [ ] **Step 4: Criar `src/data/site.ts`**

```ts
// Dados estáveis da banca. WhatsApp vem de env (não hardcodar o número aqui).
export const site = {
  nomeBanca: 'Ramon Antônio Advogados',
  oab: 'OAB/SC', // identificação profissional no rodapé
  cidade: 'Tubarão/SC',
  whatsappNumero: import.meta.env.PUBLIC_WHATSAPP_NUMERO ?? '',
  regioesAtendidas: [
    'Tubarão e Sul de SC',
    'Vale do Itajaí',
    'Joinville e Norte de SC',
  ],
};
```

- [ ] **Step 5: Rodar e ver passar**

Run: `npx vitest run src/data/__tests__/site.test.ts`
Expected: PASS (2 passed).

> Nota: em Vitest, `import.meta.env.PUBLIC_WHATSAPP_NUMERO` é `undefined` → `whatsappNumero` vira `''`. O teste não depende dele.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: tipo LandingData e dados da banca (site.ts)"
```

---

### Task 3: `lib/tracking.ts` — eventos do Meta Pixel

**Files:**
- Create: `src/lib/tracking.ts`
- Test: `src/lib/tracking.test.ts`

**Interfaces:**
- Consumes: nada.
- Produces:
  - `function trackLead(): void` — dispara `fbq('track','Lead')` se o Pixel existir.
  - `function trackContact(): void` — dispara `fbq('track','Contact')` se o Pixel existir.
  - Ambas são no-op seguras quando `window.fbq` não está definido.

- [ ] **Step 1: Escrever o teste falhando `src/lib/tracking.test.ts`**

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { trackLead, trackContact } from './tracking';

describe('tracking', () => {
  beforeEach(() => {
    // @ts-expect-error limpando o mock global entre testes
    globalThis.window = {};
  });

  it('trackLead não quebra quando fbq não existe', () => {
    expect(() => trackLead()).not.toThrow();
  });

  it('trackLead chama fbq("track","Lead") quando fbq existe', () => {
    const fbq = vi.fn();
    // @ts-expect-error mock
    globalThis.window.fbq = fbq;
    trackLead();
    expect(fbq).toHaveBeenCalledWith('track', 'Lead');
  });

  it('trackContact chama fbq("track","Contact") quando fbq existe', () => {
    const fbq = vi.fn();
    // @ts-expect-error mock
    globalThis.window.fbq = fbq;
    trackContact();
    expect(fbq).toHaveBeenCalledWith('track', 'Contact');
  });
});
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `npx vitest run src/lib/tracking.test.ts`
Expected: FAIL ("Cannot find module './tracking'").

- [ ] **Step 3: Criar `src/lib/tracking.ts`**

```ts
type Fbq = (...args: unknown[]) => void;

function getFbq(): Fbq | undefined {
  if (typeof window === 'undefined') return undefined;
  return (window as unknown as { fbq?: Fbq }).fbq;
}

/** Lead capturado pelo formulário. No-op se o Pixel não estiver carregado. */
export function trackLead(): void {
  getFbq()?.('track', 'Lead');
}

/** Clique no WhatsApp. No-op se o Pixel não estiver carregado. */
export function trackContact(): void {
  getFbq()?.('track', 'Contact');
}
```

- [ ] **Step 4: Rodar e ver passar**

Run: `npx vitest run src/lib/tracking.test.ts`
Expected: PASS (3 passed).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: wrappers de evento do Meta Pixel (lib/tracking)"
```

---

### Task 4: `lib/enviarLead.ts` — normalização de telefone + envio

**Files:**
- Create: `src/lib/enviarLead.ts`
- Test: `src/lib/enviarLead.test.ts`

**Interfaces:**
- Consumes: nada.
- Produces:
  - `function normalizarTelefone(input: string): string | null` — retorna E.164 br (`55` + 10/11 dígitos) ou `null` se inválido.
  - `interface LeadPayload { nome: string; telefone: string; campanha: string; website?: string }` (`website` = honeypot)
  - `async function enviarLead(endpoint: string, payload: LeadPayload): Promise<{ ok: boolean }>` — valida, normaliza e faz `POST` JSON.

- [ ] **Step 1: Escrever o teste falhando `src/lib/enviarLead.test.ts`**

```ts
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
});
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `npx vitest run src/lib/enviarLead.test.ts`
Expected: FAIL ("Cannot find module './enviarLead'").

- [ ] **Step 3: Criar `src/lib/enviarLead.ts`**

```ts
export interface LeadPayload {
  nome: string;
  telefone: string;
  campanha: string;
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
      body: JSON.stringify({ nome: payload.nome.trim(), telefone, campanha: payload.campanha }),
    });
    return { ok: resp.ok };
  } catch {
    return { ok: false };
  }
}
```

- [ ] **Step 4: Rodar e ver passar**

Run: `npx vitest run src/lib/enviarLead.test.ts`
Expected: PASS (8 passed).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: normalização de telefone E.164 e envio de lead (lib/enviarLead)"
```

---

### Task 5: `LandingLayout.astro` — casca, SEO e Meta Pixel

**Files:**
- Create: `src/layouts/LandingLayout.astro`

**Interfaces:**
- Consumes: `LandingData` (campos `seoTitle`, `seoDescription`, `keywords`), `site` (rodapé).
- Produces: layout que recebe `props: { data: LandingData }` e renderiza `<head>` (SEO/OG, Pixel condicional) + `<slot/>` + rodapé com identificação profissional.

- [ ] **Step 1: Criar `src/layouts/LandingLayout.astro`**

```astro
---
import type { LandingData } from '../data/types';
import { site } from '../data/site';
import '../styles/global.css';

interface Props { data: LandingData }
const { data } = Astro.props;
const pixelId = import.meta.env.PUBLIC_META_PIXEL_ID;
const canonical = new URL(`/${data.slug}`, Astro.site).href;
---
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{data.seoTitle}</title>
    <meta name="description" content={data.seoDescription} />
    <meta name="keywords" content={data.keywords.join(', ')} />
    <link rel="canonical" href={canonical} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={data.seoTitle} />
    <meta property="og:description" content={data.seoDescription} />
    <meta property="og:url" content={canonical} />
    {pixelId && (
      <script is:inline set:html={`
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init','${pixelId}');fbq('track','PageView');
      `} />
    )}
  </head>
  <body>
    <main><slot /></main>
    <footer class="container" style="padding:32px 20px;color:#555;font-size:14px;border-top:1px solid #eee;margin-top:48px;">
      <p>{site.nomeBanca} — {site.cidade} — {site.oab}</p>
      <p>Atendimento: {site.regioesAtendidas.join(' · ')}</p>
      <p><a href="/politica-de-privacidade">Política de privacidade</a></p>
    </footer>
  </body>
</html>
```

- [ ] **Step 2: Verificar que o type-check do Astro passa**

Run: `npx astro check`
Expected: 0 errors (avisos sobre páginas ausentes são aceitáveis).

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: LandingLayout com SEO, OG e Meta Pixel condicional"
```

---

### Task 6: Componentes da LP

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/ProvaSocial.astro`
- Create: `src/components/Elegibilidade.astro`
- Create: `src/components/ComoFunciona.astro`
- Create: `src/components/FAQ.astro`
- Create: `src/components/BotaoWhats.astro`
- Create: `src/components/FloatingWhats.astro`
- Create: `src/components/FormLead.astro`
- Create: `src/components/CtaFinal.astro`

**Interfaces:**
- Consumes: `LandingData`, `site`, `lib/tracking` (`trackLead`, `trackContact`), `lib/enviarLead`.
- Produces: componentes que recebem props a partir de `LandingData`. `BotaoWhats` recebe `{ texto: string; mensagem: string }`. `FormLead` recebe `{ campanha: string }`.

- [ ] **Step 1: Criar `src/components/BotaoWhats.astro`**

```astro
---
import { site } from '../data/site';
interface Props { texto: string; mensagem: string; variante?: 'primario' | 'flutuante' }
const { texto, mensagem, variante = 'primario' } = Astro.props;
const href = `https://wa.me/${site.whatsappNumero}?text=${encodeURIComponent(mensagem)}`;
---
<a href={href} target="_blank" rel="noopener" data-whats class={`btn-whats ${variante}`}>{texto}</a>
<style>
  .btn-whats { display:inline-block; background:var(--cor-acento); color:#fff; padding:14px 24px; border-radius:var(--raio); font-weight:600; text-decoration:none; }
  .btn-whats.flutuante { position:fixed; right:18px; bottom:18px; z-index:50; box-shadow:0 4px 14px rgba(0,0,0,.25); }
</style>
<script>
  import { trackContact } from '../lib/tracking';
  document.querySelectorAll('[data-whats]').forEach((el) =>
    el.addEventListener('click', () => trackContact()),
  );
</script>
```

- [ ] **Step 2: Criar `src/components/Hero.astro`**

```astro
---
import BotaoWhats from './BotaoWhats.astro';
interface Props { headline: string; sub: string; mensagemWhats: string }
const { headline, sub, mensagemWhats } = Astro.props;
---
<section class="hero">
  <div class="container">
    <h1>{headline}</h1>
    <p class="sub">{sub}</p>
    <div class="ctas">
      <BotaoWhats texto="Falar no WhatsApp" mensagem={mensagemWhats} />
      <a href="#formulario" class="btn-sec">Pedir uma análise</a>
    </div>
  </div>
</section>
<style>
  .hero { background:var(--cor-primaria); color:#fff; padding:64px 0; }
  .hero h1 { font-size:2rem; margin:0 0 12px; }
  .sub { font-size:1.15rem; opacity:.95; max-width:680px; }
  .ctas { margin-top:24px; display:flex; gap:12px; flex-wrap:wrap; }
  .btn-sec { display:inline-block; padding:14px 24px; border:2px solid #fff; color:#fff; border-radius:var(--raio); text-decoration:none; font-weight:600; }
</style>
```

- [ ] **Step 3: Criar `src/components/ProvaSocial.astro`**

```astro
---
// Prova institucional agregada — sem caso concreto individual (OAB).
---
<section class="prova">
  <div class="container">
    <div class="itens">
      <div><strong>+20 anos</strong><span>de atuação</span></div>
      <div><strong>+10.000</strong><span>benefícios conquistados</span></div>
    </div>
  </div>
</section>
<style>
  .prova { background:var(--cor-fundo-suave); padding:32px 0; }
  .itens { display:flex; gap:48px; flex-wrap:wrap; }
  .itens strong { display:block; font-size:1.8rem; color:var(--cor-primaria); }
  .itens span { color:#555; }
</style>
```

- [ ] **Step 4: Criar `src/components/Elegibilidade.astro`**

```astro
---
interface Props { titulo: string; sinais: string[] }
const { titulo, sinais } = Astro.props;
---
<section class="elegib">
  <div class="container">
    <h2>{titulo}</h2>
    <ul>
      {sinais.map((s) => <li>{s}</li>)}
    </ul>
    <p class="obs">Cada caso é analisado individualmente. Esta página é apenas informativa.</p>
  </div>
</section>
<style>
  .elegib { padding:48px 0; }
  .elegib ul { list-style:none; padding:0; display:grid; gap:12px; }
  .elegib li { padding-left:28px; position:relative; }
  .elegib li::before { content:'✓'; position:absolute; left:0; color:var(--cor-acento); font-weight:700; }
  .obs { color:#666; font-size:.9rem; margin-top:16px; }
</style>
```

- [ ] **Step 5: Criar `src/components/ComoFunciona.astro`**

```astro
---
import type { PassoComoFunciona } from '../data/types';
interface Props { passos: PassoComoFunciona[] }
const { passos } = Astro.props;
---
<section class="como">
  <div class="container">
    <h2>Como funciona</h2>
    <ol>
      {passos.map((p) => (
        <li><strong>{p.titulo}</strong><span>{p.descricao}</span></li>
      ))}
    </ol>
  </div>
</section>
<style>
  .como { padding:48px 0; background:var(--cor-fundo-suave); }
  .como ol { display:grid; gap:20px; padding-left:20px; }
  .como strong { display:block; color:var(--cor-primaria); }
</style>
```

- [ ] **Step 6: Criar `src/components/FAQ.astro` (com schema FAQPage)**

```astro
---
import type { FaqItem } from '../data/types';
interface Props { itens: FaqItem[] }
const { itens } = Astro.props;
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: itens.map((i) => ({
    '@type': 'Question',
    name: i.pergunta,
    acceptedAnswer: { '@type': 'Answer', text: i.resposta },
  })),
};
---
<section class="faq">
  <div class="container">
    <h2>Perguntas frequentes</h2>
    {itens.map((i) => (
      <details>
        <summary>{i.pergunta}</summary>
        <p>{i.resposta}</p>
      </details>
    ))}
  </div>
</section>
<script type="application/ld+json" is:inline set:html={JSON.stringify(jsonLd)} />
<style>
  .faq { padding:48px 0; }
  .faq details { border-bottom:1px solid #eee; padding:14px 0; }
  .faq summary { cursor:pointer; font-weight:600; }
</style>
```

- [ ] **Step 7: Criar `src/components/CtaFinal.astro`**

```astro
---
import BotaoWhats from './BotaoWhats.astro';
interface Props { titulo: string; texto: string; mensagemWhats: string }
const { titulo, texto, mensagemWhats } = Astro.props;
---
<section class="ctaf">
  <div class="container">
    <h2>{titulo}</h2>
    <p>{texto}</p>
    <BotaoWhats texto="Falar no WhatsApp agora" mensagem={mensagemWhats} />
  </div>
</section>
<style>
  .ctaf { padding:56px 0; background:var(--cor-primaria); color:#fff; text-align:center; }
</style>
```

- [ ] **Step 8: Criar `src/components/FloatingWhats.astro`**

```astro
---
import BotaoWhats from './BotaoWhats.astro';
interface Props { mensagemWhats: string }
const { mensagemWhats } = Astro.props;
---
<BotaoWhats texto="WhatsApp" mensagem={mensagemWhats} variante="flutuante" />
```

- [ ] **Step 9: Criar `src/components/FormLead.astro`**

```astro
---
interface Props { campanha: string }
const { campanha } = Astro.props;
---
<section id="formulario" class="form">
  <div class="container">
    <h2>Peça uma análise do seu caso</h2>
    <p>Deixe seu contato — retornamos para entender sua situação.</p>
    <form data-form-lead data-campanha={campanha} novalidate>
      <input type="text" name="nome" placeholder="Seu nome" required autocomplete="name" />
      <input type="tel" name="telefone" placeholder="WhatsApp com DDD" required autocomplete="tel" />
      <!-- honeypot: oculto para humanos -->
      <input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px" />
      <button type="submit">Enviar</button>
      <p data-msg class="msg" role="status"></p>
      <p class="lgpd">Ao enviar, você concorda em ser contatado sobre seu caso. Veja a <a href="/politica-de-privacidade">política de privacidade</a>.</p>
    </form>
  </div>
</section>
<style>
  .form { padding:48px 0; background:var(--cor-fundo-suave); }
  .form form { display:grid; gap:12px; max-width:420px; }
  .form input, .form button { padding:14px; border-radius:var(--raio); border:1px solid #ccc; font-size:1rem; }
  .form button { background:var(--cor-acento); color:#fff; border:none; font-weight:600; cursor:pointer; }
  .msg { min-height:1.2em; }
  .msg.erro { color:#c0392b; } .msg.ok { color:var(--cor-acento); }
  .lgpd { font-size:.8rem; color:#666; }
</style>
<script>
  import { enviarLead } from '../lib/enviarLead';
  import { trackLead } from '../lib/tracking';
  const endpoint = import.meta.env.PUBLIC_LEADS_ENDPOINT;
  document.querySelectorAll('[data-form-lead]').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const f = e.currentTarget as HTMLFormElement;
      const msg = f.querySelector('[data-msg]') as HTMLElement;
      const btn = f.querySelector('button') as HTMLButtonElement;
      const fd = new FormData(f);
      btn.disabled = true; msg.textContent = 'Enviando…'; msg.className = 'msg';
      const res = await enviarLead(endpoint, {
        nome: String(fd.get('nome') ?? ''),
        telefone: String(fd.get('telefone') ?? ''),
        campanha: String(f.dataset.campanha ?? ''),
        website: String(fd.get('website') ?? ''),
      });
      if (res.ok) {
        trackLead();
        msg.textContent = 'Recebemos seu contato! Em breve falaremos com você.';
        msg.className = 'msg ok'; f.reset();
      } else {
        msg.textContent = 'Não foi possível enviar. Confira o telefone e tente novamente.';
        msg.className = 'msg erro'; btn.disabled = false;
      }
    });
  });
</script>
```

- [ ] **Step 10: Verificar type-check**

Run: `npx astro check`
Expected: 0 errors.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: componentes da LP (hero, prova, elegibilidade, faq, form, whats)"
```

---

### Task 7: LP BPC/LOAS (dados + página)

**Files:**
- Create: `src/data/lps/bpc-loas.ts`
- Create: `src/pages/bpc-loas/index.astro`
- Test: `src/data/lps/__tests__/bpc-loas.test.ts`

**Interfaces:**
- Consumes: `LandingData`, todos os componentes da Task 6, `LandingLayout`.
- Produces: `export const bpcLoas: LandingData` e a rota estática `/bpc-loas`.

> **Conteúdo OAB-safe e sem valores fixos.** Base factual: Lei 8.742/93 (LOAS), Art. 20. Idoso 65+ ou pessoa com deficiência (impedimento de longo prazo ≥ 2 anos), critério de baixa renda definido por lei (sem citar valores). Não é aposentadoria; não tem 13º; não gera pensão. Nunca prometer concessão.

- [ ] **Step 1: Escrever o teste falhando `src/data/lps/__tests__/bpc-loas.test.ts`**

```ts
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
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `npx vitest run src/data/lps/__tests__/bpc-loas.test.ts`
Expected: FAIL ("Cannot find module '../bpc-loas'").

- [ ] **Step 3: Criar `src/data/lps/bpc-loas.ts`**

```ts
import type { LandingData } from '../types';

export const bpcLoas: LandingData = {
  slug: 'bpc-loas',
  seoTitle: 'Advogado para BPC/LOAS em Santa Catarina | Ramon Antônio Advogados',
  seoDescription:
    'Orientação sobre o BPC/LOAS para idosos (65+) e pessoas com deficiência de baixa renda em SC. Tire suas dúvidas com quem entende do INSS.',
  keywords: [
    'BPC LOAS', 'advogado BPC LOAS SC', 'benefício assistencial idoso',
    'BPC pessoa com deficiência', 'BPC negado o que fazer', 'LOAS Tubarão',
    'advogado previdenciário Joinville', 'como dar entrada no BPC',
  ],
  heroHeadline: 'BPC/LOAS: entenda se você ou sua família têm direito',
  heroSub:
    'O Benefício de Prestação Continuada ampara idosos a partir de 65 anos e pessoas com deficiência de baixa renda. Explicamos o caminho de forma simples.',
  mensagemWhats: 'Olá, vim pelo site e gostaria de tirar dúvidas sobre o BPC/LOAS.',
  elegibilidadeTitulo: 'O BPC/LOAS pode ser para você se…',
  elegibilidadeSinais: [
    'Você tem 65 anos ou mais, ou tem uma deficiência de longo prazo (impedimentos por dois anos ou mais).',
    'A renda da sua família é baixa, dentro do critério definido pela lei.',
    'Você não recebe outro benefício da Previdência (salvo exceções previstas em lei).',
    'Seu pedido foi negado pelo INSS e você quer entender os motivos e o que fazer.',
  ],
  comoFunciona: [
    { titulo: 'Análise do seu caso', descricao: 'Conversamos para entender sua situação de idade ou deficiência e a composição da renda familiar.' },
    { titulo: 'Orientação do caminho', descricao: 'Explicamos a documentação e os passos junto ao INSS ou na via judicial, conforme o caso.' },
    { titulo: 'Acompanhamento', descricao: 'Acompanhamos o andamento e mantemos você informado em cada etapa.' },
  ],
  faq: [
    { pergunta: 'O que é o BPC/LOAS?', resposta: 'É um benefício assistencial previsto na Lei 8.742/93 (LOAS) que garante um salário mínimo mensal a idosos a partir de 65 anos e a pessoas com deficiência de baixa renda que não têm como prover o próprio sustento.' },
    { pergunta: 'Quem tem direito ao BPC?', resposta: 'Idosos com 65 anos ou mais e pessoas com deficiência de longo prazo (impedimentos de pelo menos dois anos), desde que a renda familiar seja baixa, conforme o critério definido em lei.' },
    { pergunta: 'Preciso ter contribuído para o INSS?', resposta: 'Não. O BPC é um benefício assistencial, não previdenciário: não exige contribuições anteriores. Por isso também não se confunde com aposentadoria.' },
    { pergunta: 'O que conta como baixa renda?', resposta: 'A lei usa a renda mensal por pessoa da família como critério-base. Há situações em que a análise considera a vulnerabilidade do caso. Por isso, cada situação precisa ser avaliada individualmente.' },
    { pergunta: 'O que é considerado deficiência para o BPC?', resposta: 'São impedimentos de longo prazo — de natureza física, mental, intelectual ou sensorial — que, em interação com barreiras, podem dificultar a participação plena na sociedade. A lei considera "longo prazo" efeitos por pelo menos dois anos.' },
    { pergunta: 'O BPC dá direito a 13º salário?', resposta: 'Não. Por ser um benefício assistencial, o BPC não inclui o 13º (abono anual).' },
    { pergunta: 'O BPC gera pensão por morte?', resposta: 'Não. O benefício é pessoal e cessa com o falecimento, não sendo transmitido a dependentes como pensão.' },
    { pergunta: 'Meu pedido de BPC foi negado. Ainda tenho chance?', resposta: 'Uma negativa não encerra necessariamente o assunto. É possível entender o motivo do indeferimento e avaliar recurso administrativo ou a via judicial. Cada caso precisa ser analisado.' },
    { pergunta: 'Como é feita a avaliação da deficiência?', resposta: 'O INSS realiza avaliação médica e social para verificar os impedimentos de longo prazo e as barreiras enfrentadas. Reunir bem a documentação médica ajuda nessa etapa.' },
    { pergunta: 'Vocês atendem na minha região?', resposta: 'Atendemos clientes em Santa Catarina, incluindo Tubarão e Sul do estado, Vale do Itajaí e Joinville e região. O primeiro contato pode ser feito pelo WhatsApp.' },
  ],
  ctaFinalTitulo: 'Tire suas dúvidas sobre o BPC/LOAS',
  ctaFinalTexto: 'Fale com nossa equipe e entenda o caminho para o seu caso.',
};
```

- [ ] **Step 4: Rodar e ver passar**

Run: `npx vitest run src/data/lps/__tests__/bpc-loas.test.ts`
Expected: PASS (3 passed).

- [ ] **Step 5: Criar a página `src/pages/bpc-loas/index.astro`**

```astro
---
import LandingLayout from '../../layouts/LandingLayout.astro';
import Hero from '../../components/Hero.astro';
import ProvaSocial from '../../components/ProvaSocial.astro';
import Elegibilidade from '../../components/Elegibilidade.astro';
import ComoFunciona from '../../components/ComoFunciona.astro';
import FormLead from '../../components/FormLead.astro';
import FAQ from '../../components/FAQ.astro';
import CtaFinal from '../../components/CtaFinal.astro';
import FloatingWhats from '../../components/FloatingWhats.astro';
import { bpcLoas as d } from '../../data/lps/bpc-loas';
---
<LandingLayout data={d}>
  <Hero headline={d.heroHeadline} sub={d.heroSub} mensagemWhats={d.mensagemWhats} />
  <ProvaSocial />
  <Elegibilidade titulo={d.elegibilidadeTitulo} sinais={d.elegibilidadeSinais} />
  <ComoFunciona passos={d.comoFunciona} />
  <FormLead campanha={d.slug} />
  <FAQ itens={d.faq} />
  <CtaFinal titulo={d.ctaFinalTitulo} texto={d.ctaFinalTexto} mensagemWhats={d.mensagemWhats} />
  <FloatingWhats mensagemWhats={d.mensagemWhats} />
</LandingLayout>
```

- [ ] **Step 6: Build e verificar a rota gerada**

Run: `npm run build`
Expected: build OK e existe `dist/bpc-loas/index.html`.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: LP BPC/LOAS (conteúdo fundamentado + página)"
```

---

### Task 8: LP Salário-maternidade (dados + página)

**Files:**
- Create: `src/data/lps/salario-maternidade.ts`
- Create: `src/pages/salario-maternidade/index.astro`
- Test: `src/data/lps/__tests__/salario-maternidade.test.ts`

**Interfaces:**
- Consumes: mesmos da Task 7.
- Produces: `export const salarioMaternidade: LandingData` e a rota `/salario-maternidade`.

> **Base verificada:** 120 dias (nascimento) / 14 dias (aborto não criminoso); rural exige comprovação de 10 meses de atividade rural; prazo de até 5 anos para requerer. **Refutado/repesquisar:** regras de carência e cálculo do **urbano** — então o conteúdo trata o urbano de forma **qualitativa** ("regras variam conforme o tipo de segurada"), sem afirmar carência/fórmula. Sem valores em R$.

- [ ] **Step 1: Escrever o teste falhando `src/data/lps/__tests__/salario-maternidade.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { salarioMaternidade } from '../salario-maternidade';

const PROIBIDO = [/garant(e|imos|ido)/i, /R\$\s?\d/, /honor[áa]rio/i];

describe('LP salario-maternidade', () => {
  it('slug correto', () => {
    expect(salarioMaternidade.slug).toBe('salario-maternidade');
  });
  it('tem 8 a 12 itens de FAQ', () => {
    expect(salarioMaternidade.faq.length).toBeGreaterThanOrEqual(8);
    expect(salarioMaternidade.faq.length).toBeLessThanOrEqual(12);
  });
  it('NÃO afirma carência fixa do urbano (refutado na pesquisa)', () => {
    const texto = JSON.stringify(salarioMaternidade).toLowerCase();
    expect(texto).not.toMatch(/urban[ao].{0,40}n[ãa]o (exige|precisa de) car[êe]ncia/);
  });
  it('não viola OAB (sem promessa nem valores em R$)', () => {
    const texto = JSON.stringify(salarioMaternidade);
    for (const re of PROIBIDO) expect(texto).not.toMatch(re);
  });
});
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `npx vitest run src/data/lps/__tests__/salario-maternidade.test.ts`
Expected: FAIL ("Cannot find module '../salario-maternidade'").

- [ ] **Step 3: Criar `src/data/lps/salario-maternidade.ts`**

```ts
import type { LandingData } from '../types';

export const salarioMaternidade: LandingData = {
  slug: 'salario-maternidade',
  seoTitle: 'Salário-maternidade: quem tem direito | Ramon Antônio Advogados — SC',
  seoDescription:
    'Entenda o salário-maternidade urbano e rural: quem tem direito, prazos e como solicitar ao INSS. Orientação clara para mães e gestantes em Santa Catarina.',
  keywords: [
    'salário-maternidade', 'salário maternidade rural', 'advogado salário-maternidade SC',
    'salário-maternidade INSS', 'salário-maternidade negado', 'como dar entrada salário-maternidade',
    'salário-maternidade Tubarão', 'advogado previdenciário Vale do Itajaí',
  ],
  heroHeadline: 'Salário-maternidade: descubra se você tem direito',
  heroSub:
    'O benefício ampara mães e gestantes — trabalhadoras urbanas e rurais — em diferentes situações. Explicamos as regras de forma simples.',
  mensagemWhats: 'Olá, vim pelo site e gostaria de tirar dúvidas sobre o salário-maternidade.',
  elegibilidadeTitulo: 'O salário-maternidade pode ser para você se…',
  elegibilidadeSinais: [
    'Você teve um filho, está grávida, adotou ou obteve guarda para fins de adoção.',
    'Você é trabalhadora urbana (empregada, doméstica, contribuinte individual ou facultativa) — as regras variam conforme o tipo de segurada.',
    'Você é trabalhadora rural (segurada especial) e pode comprovar a atividade rural.',
    'Seu pedido foi negado pelo INSS e você quer entender os motivos.',
  ],
  comoFunciona: [
    { titulo: 'Análise do seu caso', descricao: 'Verificamos sua situação como segurada (urbana ou rural) e o fato gerador (nascimento, adoção, guarda ou aborto não criminoso).' },
    { titulo: 'Orientação do caminho', descricao: 'Explicamos a documentação e os passos junto ao INSS ou na via judicial, conforme o caso.' },
    { titulo: 'Acompanhamento', descricao: 'Acompanhamos o andamento e mantemos você informada em cada etapa.' },
  ],
  faq: [
    { pergunta: 'O que é o salário-maternidade?', resposta: 'É um benefício previdenciário pago à segurada do INSS em razão do nascimento de filho, adoção, guarda para fins de adoção ou aborto não criminoso.' },
    { pergunta: 'Por quanto tempo o benefício é pago?', resposta: 'Em regra, por 120 dias (quatro meses) nos casos de nascimento. Em caso de aborto não criminoso, o período é de 14 dias.' },
    { pergunta: 'Quem pode receber?', resposta: 'Trabalhadoras urbanas (empregada, doméstica, contribuinte individual e facultativa) e trabalhadoras rurais (segurada especial). As exigências variam conforme o tipo de segurada, por isso cada caso é avaliado.' },
    { pergunta: 'A trabalhadora rural tem direito?', resposta: 'Sim. A segurada especial (trabalhadora rural) pode ter direito comprovando a atividade rural nos meses anteriores ao fato gerador, conforme exige a lei.' },
    { pergunta: 'Adoção e guarda dão direito ao benefício?', resposta: 'Sim. A adoção e a guarda judicial para fins de adoção estão entre os fatos geradores do salário-maternidade.' },
    { pergunta: 'Qual o prazo para pedir o salário-maternidade?', resposta: 'Há prazo para requerer o benefício a contar do fato gerador. Por isso é importante não deixar para depois e buscar orientação o quanto antes.' },
    { pergunta: 'As regras são iguais para urbana e rural?', resposta: 'Não. As exigências de comprovação e enquadramento mudam conforme o tipo de segurada. Por isso é importante analisar a sua situação específica.' },
    { pergunta: 'Meu pedido foi negado. O que fazer?', resposta: 'Uma negativa não encerra necessariamente o assunto. É possível entender o motivo e avaliar recurso administrativo ou a via judicial.' },
    { pergunta: 'Preciso já ter o bebê para dar entrada?', resposta: 'Os fatos geradores e o momento do pedido variam conforme a situação. O ideal é tirar essa dúvida em uma análise do seu caso.' },
    { pergunta: 'Vocês atendem na minha região?', resposta: 'Atendemos clientes em Santa Catarina, incluindo Tubarão e Sul do estado, Vale do Itajaí e Joinville e região. O primeiro contato pode ser pelo WhatsApp.' },
  ],
  ctaFinalTitulo: 'Tire suas dúvidas sobre o salário-maternidade',
  ctaFinalTexto: 'Fale com nossa equipe e entenda o caminho para o seu caso.',
};
```

- [ ] **Step 4: Rodar e ver passar**

Run: `npx vitest run src/data/lps/__tests__/salario-maternidade.test.ts`
Expected: PASS (4 passed).

- [ ] **Step 5: Criar a página `src/pages/salario-maternidade/index.astro`**

```astro
---
import LandingLayout from '../../layouts/LandingLayout.astro';
import Hero from '../../components/Hero.astro';
import ProvaSocial from '../../components/ProvaSocial.astro';
import Elegibilidade from '../../components/Elegibilidade.astro';
import ComoFunciona from '../../components/ComoFunciona.astro';
import FormLead from '../../components/FormLead.astro';
import FAQ from '../../components/FAQ.astro';
import CtaFinal from '../../components/CtaFinal.astro';
import FloatingWhats from '../../components/FloatingWhats.astro';
import { salarioMaternidade as d } from '../../data/lps/salario-maternidade';
---
<LandingLayout data={d}>
  <Hero headline={d.heroHeadline} sub={d.heroSub} mensagemWhats={d.mensagemWhats} />
  <ProvaSocial />
  <Elegibilidade titulo={d.elegibilidadeTitulo} sinais={d.elegibilidadeSinais} />
  <ComoFunciona passos={d.comoFunciona} />
  <FormLead campanha={d.slug} />
  <FAQ itens={d.faq} />
  <CtaFinal titulo={d.ctaFinalTitulo} texto={d.ctaFinalTexto} mensagemWhats={d.mensagemWhats} />
  <FloatingWhats mensagemWhats={d.mensagemWhats} />
</LandingLayout>
```

- [ ] **Step 6: Build e verificar a rota**

Run: `npm run build`
Expected: build OK e existe `dist/salario-maternidade/index.html`.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: LP salário-maternidade (conteúdo fundamentado + página)"
```

---

### Task 9: Página de política de privacidade (mínima)

**Files:**
- Create: `src/pages/politica-de-privacidade/index.astro`

**Interfaces:**
- Consumes: `site`.
- Produces: rota estática `/politica-de-privacidade` (linkada pelo rodapé e pelo formulário).

- [ ] **Step 1: Criar `src/pages/politica-de-privacidade/index.astro`**

```astro
---
import { site } from '../../data/site';
import '../../styles/global.css';
---
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Política de Privacidade — {site.nomeBanca}</title>
    <meta name="robots" content="noindex" />
  </head>
  <body>
    <main class="container" style="padding:48px 20px;max-width:760px;">
      <h1>Política de Privacidade</h1>
      <p>Esta página descreve como {site.nomeBanca} trata os dados informados nos formulários de contato deste site.</p>
      <h2>Dados coletados</h2>
      <p>Coletamos apenas os dados que você fornece (nome e telefone) com a finalidade de entrar em contato sobre o seu caso.</p>
      <h2>Uso dos dados</h2>
      <p>Os dados são usados exclusivamente para retorno do contato e organização do atendimento. Não vendemos nem compartilhamos seus dados com terceiros para fins de marketing.</p>
      <h2>Seus direitos</h2>
      <p>Você pode solicitar a correção ou exclusão dos seus dados a qualquer momento pelos nossos canais de atendimento.</p>
      <p><a href="/">Voltar</a></p>
    </main>
  </body>
</html>
```

- [ ] **Step 2: Build e verificar**

Run: `npm run build`
Expected: existe `dist/politica-de-privacidade/index.html`.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: página mínima de política de privacidade"
```

> **Decisão pendente do Eduardo:** usar esta página simples ou apontar para a do site institucional. Ajustar o link no rodapé/formulário conforme a escolha.

---

### Task 10: Endpoint de leads na intranet + guia de integração

**Files (no projeto `intranet-ramon`, executado pelo Eduardo):**
- Create: `intranet-ramon/app/api/public/leads/route.ts`
- Test: `intranet-ramon/app/api/public/leads/route.test.ts`
- Create (neste projeto): `docs/integracao-intranet-endpoint-leads.md`

**Interfaces:**
- Consumes: cliente Supabase com service role já existente na intranet (verificar caminho real, ex.: `lib/supabase/admin.ts`).
- Produces: `POST /api/public/leads` que aceita `{ nome, telefone, campanha, website? }` e insere em `public.leads`.

> Esta task é entregue como **guia** para o Eduardo rodar dentro de `intranet-ramon` (Regra de Aprovação — alteração de sistema é dele). Os caminhos exatos do cliente Supabase admin devem ser confirmados na intranet antes de implementar.

- [ ] **Step 1: Escrever o teste (na intranet) `app/api/public/leads/route.test.ts`**

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

- [ ] **Step 2: Rodar e ver falhar**

Run (na intranet): `npx vitest run app/api/public/leads/route.test.ts`
Expected: FAIL ("Cannot find module './route'").

- [ ] **Step 3: Criar `app/api/public/leads/route.ts`**

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

- [ ] **Step 4: Rodar e ver passar**

Run (na intranet): `npx vitest run app/api/public/leads/route.test.ts`
Expected: PASS (3 passed).

- [ ] **Step 5: Criar o guia `docs/integracao-intranet-endpoint-leads.md` (neste projeto)**

Conteúdo do guia: (a) onde colar o arquivo `route.ts`; (b) confirmar o caminho real do cliente service-role da intranet e ajustar o import; (c) confirmar env vars `SUPABASE_SERVICE_ROLE_KEY` e `NEXT_PUBLIC_SUPABASE_URL` na Vercel e na VPS; (d) teste de validação:

```bash
curl -i -X POST https://intranet.ramonantonio.adv.br/api/public/leads \
  -H 'Content-Type: application/json' \
  -H 'Origin: https://ramonantonio.adv.br' \
  -d '{"nome":"Teste","telefone":"5547999999999","campanha":"bpc-loas"}'
# Esperado: HTTP/1.1 200 e {"ok":true}; conferir o lead em leads (origem=meta_ads).
```

- [ ] **Step 6: Commit (no projeto landing-pages)**

```bash
git add docs/integracao-intranet-endpoint-leads.md
git commit -m "docs: guia de integração do endpoint de leads na intranet"
```

> A implementação do `route.ts` e seu commit acontecem no repositório `intranet-ramon`, pelo Eduardo.

---

### Task 11: Deploy FTP isolado (GitHub Action)

**Files:**
- Create: `.github/workflows/deploy.yml`
- Create: `public/.htaccess` (se necessário)
- Create: `docs/deploy-checklist.md`

**Interfaces:**
- Consumes: secrets `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` (os mesmos do site institucional).
- Produces: deploy automático no `push` para `main`, mirando apenas as subpastas das LPs.

> **Risco controlado:** o FTP-Deploy-Action mantém um manifesto próprio (`.ftp-deploy-sync-state.json`); como este projeto e o site institucional miram conjuntos de arquivos disjuntos, um deploy não apaga o do outro. **Validar num deploy de teste antes de anunciar.**

- [ ] **Step 1: Criar `.github/workflows/deploy.yml`**

```yaml
name: Deploy Landing Pages (FTP)
on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - name: Deploy via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          protocol: ftp
          local-dir: ./dist/
          server-dir: ./public_html/
          # state-name dedicado evita conflito de manifesto com o site institucional.
          state-name: .ftp-deploy-sync-state-landing.json
```

> Cada LP gera sua própria subpasta dentro de `dist/` (ex.: `dist/bpc-loas/`), que o action espelha em `public_html/bpc-loas/`. O `state-name` separado garante que este deploy só gerencie os arquivos das LPs.

- [ ] **Step 2: Criar `docs/deploy-checklist.md`**

Conteúdo: passos do primeiro deploy de teste — (1) configurar secrets FTP no repo; (2) preencher `.env` de build (WhatsApp, Pixel, endpoint); (3) `workflow_dispatch` manual; (4) conferir que `ramonantonio.adv.br/bpc-loas` abre **e** que o site institucional (home/blog) continua intacto; (5) testar o formulário gravando lead na intranet; (6) testar o WhatsApp e os eventos do Pixel (Meta Events Manager).

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "ci: deploy FTP isolado por subpasta + checklist"
```

---

### Task 12: `CLAUDE.md` do projeto

**Files:**
- Create: `CLAUDE.md`

**Interfaces:**
- Consumes: nada.
- Produces: manual do projeto, no padrão dos outros projetos do comercial.

- [ ] **Step 1: Criar `CLAUDE.md`**

Conteúdo: descrição (LPs de captação, Astro estático, deploy FTP HostGator por subpasta), stack, comandos (`npm run dev/build/test`), padrão "uma LP = um arquivo de dados", onde editar conteúdo (`src/data/lps/`), a trava OAB (Provimento 205/2021) como regra de conteúdo, a integração com a intranet (`POST /api/public/leads`), e a referência à spec e à pesquisa em `docs/`. Apontar para o departamento comercial (`..\..\CLAUDE.md`).

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: CLAUDE.md do projeto landing-pages"
```

---

## Fora deste plano (próxima fase, após 2ª pesquisa)

- LP **auxílio-acidente + auxílio-doença** (sem base verificada nesta rodada).
- LP **trabalhista geral** (sem base; provavelmente afunilar em 2–3 temas-âncora).
- Re-pesquisa das regras do **salário-maternidade urbano** (carência/cálculo) para enriquecer aquela LP.
- Cada uma ganha seu próprio ciclo spec → plano, reaproveitando toda a infraestrutura deste plano (basta um novo arquivo em `src/data/lps/` + página).

## Inputs do Eduardo necessários antes do deploy

1. Número de WhatsApp das LPs (`PUBLIC_WHATSAPP_NUMERO`).
2. ID do Pixel do Meta (`PUBLIC_META_PIXEL_ID`) — existente ou novo.
3. URL final do endpoint na intranet (`PUBLIC_LEADS_ENDPOINT`).
4. Política de privacidade: página própria (Task 9) ou a do site institucional.
5. Confirmar slugs `/bpc-loas` e `/salario-maternidade`.
