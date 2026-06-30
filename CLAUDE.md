# Landing Pages de Captação — Ramon Antonio Advogados

Landing pages estáticas de captação de leads, especialização previdenciária e trabalhista.
Tráfego pago (Meta Ads) + SEO regional (SC). Construído em **Astro** (saída 100% estática),
hospedado no **HostGator** por **subpasta** do domínio institucional (`ramonantonio.adv.br/<slug>`).
Integração com a intranet (`intranet-ramon`) para recebimento de leads via `POST /api/public/leads`.

## Stack

- **Astro 5** — saída estática, `build.format: 'directory'` (gera `/slug/index.html` para URLs amigáveis).
- **TypeScript** — tipagem de dados (tipos em `src/data/types.ts`, dados em `src/data/lps/<slug>.ts`).
- **Vitest** — testes de conteúdo (validação OAB, padrões proibidos, SEO).
- ~~**@astrojs/sitemap**~~ — **removido**: o sitemap nativo colidiria com o do site institucional; o sitemap de `ramonantonio.adv.br` é gerenciado pelo `ramonantonio-site`.
- **Meta Pixel** — rastreamento de conversão (eventos `Lead` + `Contact`).

## Comandos

```bash
npm install      # instala dependências (uma vez)
npm run dev      # servidor local em http://localhost:4321
npm run build    # gera sites estáticos em dist/
npm run preview  # pré-visualiza o build de dist/
npm test         # roda testes (validação de conteúdo)
```

## Padrão: Uma Landing Page = Um Arquivo de Dados

Cada LP vive em **um arquivo de dados** tipado e separado da página:

### Estrutura

```
src/
├── data/
│   ├── types.ts              ← LandingData (interface de tipagem)
│   ├── site.ts               ← dados globais (banca, anos, redes, etc.)
│   └── lps/
│       ├── bpc-loas.ts       ← dados da LP /bpc-loas
│       ├── salario-maternidade.ts  ← dados da LP /salario-maternidade
│       ├── auxilio-doenca.ts       ← (próxima fase)
│       └── __tests__/
│           ├── bpc-loas.test.ts
│           └── salario-maternidade.test.ts
│
├── pages/
│   ├── bpc-loas/
│   │   └── index.astro       ← página (importa src/data/lps/bpc-loas.ts)
│   ├── salario-maternidade/
│   │   └── index.astro       ← página (importa src/data/lps/salario-maternidade.ts)
│   └── index.astro           ← home (opcional; pode redirecionar)
│
├── components/
│   ├── FormLead.astro        ← formulário reutilizável
│   ├── BotaoWhatsApp.astro   ← botão WhatsApp reutilizável
│   ├── FAQ.astro             ← seção FAQ tipada
│   └── ... (outros componentes)
│
├── lib/
│   ├── enviarLead.ts         ← fetch para POST /api/public/leads
│   └── tracking.ts           ← rastreamento do Meta Pixel
│
└── styles/
    └── global.css            ← paleta de cores, tipografia
```

### Criar Uma LP Nova

1. **Criar arquivo de dados:**
   ```
   src/data/lps/meu-beneficio.ts
   ```
   Estrutura (ver `types.ts` para `LandingData`):
   ```typescript
   export const meuBeneficio: LandingData = {
     slug: "meu-beneficio",
     title: "...",
     description: "...",
     h1: "...",
     sections: [...],
     faq: [...],
     keywords: ["palavra1", "palavra2"],
     conversions: { form: true, whatsapp: true },
   };
   ```

2. **Criar página:**
   ```
   src/pages/meu-beneficio/index.astro
   ```
   Exemplo:
   ```astro
   ---
   import { meuBeneficio } from "@/data/lps/meu-beneficio";
   import Layout from "@/layouts/LandingPage.astro";
   import FormLead from "@/components/FormLead.astro";
   import FAQ from "@/components/FAQ.astro";
   ---
   
   <Layout data={meuBeneficio}>
     <!-- Componha os componentes aqui -->
     <FormLead campanha={meuBeneficio.slug} />
     <FAQ items={meuBeneficio.faq} />
   </Layout>
   ```

3. **Testar e validar:**
   - Verificar tipagem (`npm run check` ou `tsc --noEmit`).
   - Rodar testes: `npm test`.
   - Validação de conteúdo (OAB, proibições, SEO) ocorre automaticamente.

## Onde Editar Conteúdo

| O quê | Arquivo |
|------|---------|
| Dados de uma LP (copy, FAQ, keywords) | `src/data/lps/<slug>.ts` |
| Dados globais (banca, anos de atuação, contato) | `src/data/site.ts` |
| Paleta e tipografia | `src/styles/global.css` |
| Layouts e componentes reutilizáveis | `src/layouts/`, `src/components/` |

## Trava OAB: Provimento 205/2021

**Regra de conteúdo inegociável.** As landing pages operam dentro do Provimento 205/2021
(publicidade de advocacia). Testes automatizados (`src/data/lps/__tests__/`) barram:

- ❌ **Promessas de resultado:** "você vai ganhar", "garantido", "certo".
- ❌ **Prazos do INSS:** "3 meses", "em breve", "rápido".
- ❌ **Menção a honorários ou valores:** preço, parcelamento, "a partir de".
- ❌ **Casos concretos:** "cliente nosso conquistou X", nomes/histórias pessoais.
- ❌ **Captação agressiva:** "Clique já!", "Não perca!", CTA urgentista.
- ❌ Emojis, gírias, tom alarmista.

**Tom obrigatório:** "médico de confiança" — caloroso, acolhedor, transparente, sem
juridiquês. Explica o difícil de forma simples. **Nunca arrogante ou alarmista.**

Testes (`*.test.ts`) executam via Vitest e falham se padrões proibidos forem encontrados.
Commit é bloqueado se testes falharem (CI/CD).

## Conversão: Duas Portas

### 1. Formulário (`FormLead`)

**Componente:** `src/components/FormLead.astro`
- Campos: nome, telefone, campanha (hidden).
- Honeypot: campo `website` (spam trap).
- Ação: `POST /api/public/leads` via `src/lib/enviarLead.ts` (fetch cross-origin).
- **Evento Pixel:** `Track('Lead')` após sucesso do POST.

### 2. Botão WhatsApp (`BotaoWhatsApp`)

**Componente:** `src/components/BotaoWhatsApp.astro`
- Link: `wa.me/${PUBLIC_WHATSAPP_NUMERO}?text=...` (personalizado por LP).
- **Evento Pixel:** `Track('Contact')` ao clicar.

## Integração com a Intranet

A intranet (`intranet-ramon`) executa o endpoint **`POST /api/public/leads`** que recebe
as submissões do formulário. Detalhes em `docs/integracao-intranet-endpoint-leads.md`.

### Fluxo

```
[FormLead (landing page)]
         ↓ POST JSON (nome, telefone, campanha, website honeypot)
[Endpoint /api/public/leads na intranet-ramon]
         ↓ validação, honeypot, RLS
[Supabase tabela "leads"]
```

**Validações no endpoint:**
- Nome não vazio.
- Telefone: apenas dígitos, 12–13 caracteres.
- Honeypot: se `website` preenchido, retorna sucesso fake (não insere).

**Inserção no banco:**
- `origem: 'meta_ads'` (fixo).
- `campanha: <slug>` (ex: `'bpc-loas'`).
- `etapa: 'novo'` (estado inicial).

**Implementação:** A intranet precisa criar o route em `app/api/public/leads/route.ts`
(código-modelo incluído na documentação). Eduardo executa o commit e deploy na intranet.

## Variáveis de Ambiente

Arquivo: `.env.local` (não commitar). Template em `.env.example`:

```env
# Meta Ads Pixel
PUBLIC_META_PIXEL_ID=123456789...

# WhatsApp
PUBLIC_WHATSAPP_NUMERO=55479999999999

# Endpoint na intranet (aprovado pelo Eduardo)
PUBLIC_LEADS_ENDPOINT=https://intranet.ramonantonio.adv.br/api/public/leads
```

**Antes do deploy:**
1. Eduardo fornece o número de WhatsApp.
2. Eduardo fornece o Pixel ID do Meta (novo ou existente).
3. Eduardo aprova o endpoint (após implementação na intranet).

## Deploy

Automático via **GitHub Actions** (`.github/workflows/deploy.yml`):
a cada `push` na branch **main**, o CI roda `npm ci` → `npm test` → `npm run build` →
envia `dist/` por **FTP** para o HostGator diretamente em `public_html/`.

### Configuração FTP

- **Destino:** `public_html/` (raiz do domínio). Cada LP fica em `public_html/<slug>/index.html`, acessível em `ramonantonio.adv.br/<slug>`. Não há `base` configurado no Astro nem subpasta intermediária `/lps/`.
- **State name dedicado:** `.ftp-deploy-sync-state-landing.json` — evita colidir com o deploy do site institucional (`ramonantonio-site`).
- **Secrets necessários (FTP):** `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`.
- **Secrets necessários (build):** `PUBLIC_WHATSAPP_NUMERO`, `PUBLIC_META_PIXEL_ID`, `PUBLIC_LEADS_ENDPOINT` — injetados pelo workflow na etapa de build (ver `.github/workflows/deploy.yml`).

### Validação pré-deploy

**Checklist** em `docs/deploy-checklist.md`:

- [ ] `npm test` passou (validação OAB + conteúdo).
- [ ] Slugs confirmados (ex: `/bpc-loas`, `/salario-maternidade`).
- [ ] `PUBLIC_META_PIXEL_ID` definido e testado.
- [ ] `PUBLIC_WHATSAPP_NUMERO` definido e testado.
- [ ] `PUBLIC_LEADS_ENDPOINT` confirmado (após deploy na intranet).
- [ ] Política de privacidade vinculada (página própria ou link pro site).

Deploy manual alternativo: `npm run build` e subir **todo o conteúdo de `dist/`**
para a subpasta FTP via cPanel.

## Status e Pendências

### No Ar (4 LPs)

- **`/bpc-loas`** — BPC/LOAS (Benefício de Prestação Continuada), design e conteúdo aprovado.
- **`/salario-maternidade`** — Salário-maternidade urbano. Copy revisada na 2ª pesquisa: STF (ADIs 2.110/2.111) + IN PRES/INSS 188/2025 dispensam a carência para **todas** as seguradas → a copy fala em "qualidade de segurada", não em "uma única contribuição".
- **`/auxilio-acidente`** — Auxílio-acidente como **foco** (B94, art. 86 da Lei 8.213/91; STJ Tema 416/862): indenizatório, 50% do salário de benefício, acumulável com o salário, isento de carência, exige sequela permanente após consolidação. Têm direito empregado, doméstico, avulso e segurado especial (contribuinte individual/MEI/facultativo **não**). O **auxílio-doença entra como benefício subsidiário** (fase de afastamento temporário) no conteúdo e no FAQ — decisão do Eduardo: foco no acidente, doença como possibilidade.
- **`/trabalhista-geral`** — Mix de teses: verbas rescisórias, horas extras e adicionais, registro/FGTS e rescisão indireta; prescrição bienal/quinquenal (CF art. 7º XXIX; CLT art. 11) como destaque.

Mobile: a fonte foi ampliada em todas as LPs (≤768px) por legibilidade — importante no BPC (público idoso/PCD); e o hero do BPC e do salário-maternidade passa a usar a foto como **fundo** no celular (degradê escuro p/ legibilidade), em vez de ocultá-la.

Cada nova LP reutiliza toda a infraestrutura deste repositório (basta um novo arquivo
em `src/data/lps/` + página em `src/pages/`).

## Referências

- **Spec de design e captação:** `docs/superpowers/specs/2026-06-30-landing-pages-captacao-design.md`
- **Pesquisa jurídica e SEO:** `docs/pesquisa-2026-06-30-fundamentos-juridicos-e-seo.md`
- **Integração endpoint:** `docs/integracao-intranet-endpoint-leads.md`
- **Deploy:** `docs/deploy-checklist.md`

## Hierarquia de Documentos

Este é o manual do **projeto landing-pages** dentro do **departamento comercial**.

- **Mãe (global):** `..\..\..\.CLAUDE.md` (RAdvogados — estatuto da sede).
- **Departamento:** `..\..\.CLAUDE.md` (comercial — constituição, regra de aprovação, workflows).
- **Este projeto:** `CLAUDE.md` (landing-pages — manual operacional).

Quando há conflito, a hierarquia vence: mãe → departamento → projeto.

---

*Manual operacional do projeto landing-pages.*
*Dono: Eduardo (Eduardo Schlata, comercial/infraestrutura digital).*
*Texto simples, aberto para editar via GitHub.*
*Última revisão: 2026-06-30.*
