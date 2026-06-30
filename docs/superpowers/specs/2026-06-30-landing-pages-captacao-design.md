# Landing Pages de Captação — Design

**Data:** 2026-06-30
**Departamento:** comercial · **Projeto:** `comercial\projetos\landing-pages\`
**Autor da spec:** Claude (proposta) · **Dono/aprovação:** Eduardo Schlata (OAB/SC 39.859)

> Esta spec nasce **rascunho**. Nada é publicado, deployado ou anunciado sem o
> "aprovado" explícito do Eduardo (Regra de Aprovação da sede e do comercial).

---

## 1. Objetivo

Construir um conjunto de **landing pages de captação de leads** para o escritório
**Ramon Antônio Advogados** (Tubarão/SC), alimentadas por **tráfego pago (Meta Ads)**
e otimizadas para **SEO regional em Santa Catarina** (Vale do Itajaí, Joinville,
Tubarão, Sul/Norte de SC).

Cada LP tem **um único objetivo de conversão**: levar o visitante a entrar em contato,
por **duas portas** de menor atrito:
1. **Botão de WhatsApp** (deep link `wa.me` com mensagem pré-preenchida) — atrito zero.
2. **Formulário curto** (nome + telefone) que grava o lead na **intranet/CRM** (Supabase)
   com `origem='meta_ads'` e `campanha=<slug-da-lp>`, e depois oferece o WhatsApp.

**Não-objetivos (YAGNI):** blog, área logada, pagamento online, agendamento automático,
A/B testing automatizado, multi-idioma. Tudo isso fica fora desta entrega.

---

## 2. Escopo — as 4 landing pages

| # | LP | Tese(s) | Slug / URL | Público |
|---|----|---------|-----------|---------|
| 1 | Benefícios por incapacidade | Auxílio-acidente + auxílio-doença | `/auxilio-doenca` (a confirmar) | trabalhador acidentado/doente |
| 2 | BPC/LOAS | Idoso 65+ e pessoa com deficiência | `/bpc-loas` | baixa renda |
| 3 | Salário-maternidade | Urbana e rural | `/salario-maternidade` | mães/gestantes |
| 4 | Trabalhista geral | Direitos do trabalhador CLT | `/direito-trabalhista` (a confirmar) | trabalhador CLT |

> **Bloqueio de conteúdo (importante):** o deep research confirmou base factual sólida
> para **BPC/LOAS** e **salário-maternidade**, mas **não** confirmou afirmações para
> **auxílio-acidente/doença** nem **trabalhista geral**. Ver §10 — essas duas exigem uma
> **2ª rodada de pesquisa** antes de redigir conteúdo público. A infraestrutura (template,
> componentes, deploy) é a mesma para as quatro; só o conteúdo das LPs 1 e 4 fica
> pendente de fundamentação.

URLs finais ficam no domínio principal por subpasta (`ramonantonio.adv.br/<slug>`) —
decisão tomada por SEO (consolida autoridade do domínio) e confiança/conversão (endereço
de marca, sem prefixo `lp.` que "cheira a anúncio").

---

## 3. Arquitetura técnica

**Stack:** Astro (mesma do site institucional `ramonantonio-site`), saída **100% estática**,
deploy por **FTP** para subpasta no **HostGator** (Apache).

**Princípio central — "uma LP = um arquivo de dados".** Toda a copy, FAQ, keywords e config
de cada página vive num arquivo de dados tipado; a página `.astro` só monta os componentes
a partir desse arquivo. Criar/editar uma LP não exige mexer em código de componente.

```
landing-pages\
├── CLAUDE.md                      manual do projeto
├── astro.config.mjs               site: ramonantonio.adv.br · build.format: 'directory'
├── package.json
├── src\
│   ├── layouts\
│   │   └── LandingLayout.astro    <head>, SEO/OG, Meta Pixel, fontes, CSS base
│   ├── components\
│   │   ├── Hero.astro             headline (dor do cliente) + sub + CTA duplo
│   │   ├── ProvaSocial.astro      +20 anos, +10.000 benefícios (sem caso concreto)
│   │   ├── Elegibilidade.astro    "isto é pra você?" — sinais, sem prometer resultado
│   │   ├── ComoFunciona.astro     3 passos (análise → caminho → acompanhamento)
│   │   ├── FAQ.astro              perguntas/respostas (schema.org FAQPage p/ SEO)
│   │   ├── FormLead.astro         nome + telefone → POST intranet · honeypot · validação
│   │   ├── BotaoWhats.astro       deep link wa.me + evento Pixel 'Contact'
│   │   ├── FloatingWhats.astro    botão flutuante fixo
│   │   └── CtaFinal.astro         reforço de contato no rodapé do conteúdo
│   ├── data\
│   │   ├── site.ts                dados da banca (WhatsApp, OAB, contato) — fonte única
│   │   └── lps\
│   │       ├── bpc-loas.ts        ✅ conteúdo fundamentado (research)
│   │       ├── salario-maternidade.ts  ✅ conteúdo fundamentado (research)
│   │       ├── auxilio-doenca.ts  ⏳ aguarda 2ª pesquisa
│   │       └── direito-trabalhista.ts  ⏳ aguarda 2ª pesquisa
│   ├── pages\
│   │   ├── bpc-loas\index.astro
│   │   ├── salario-maternidade\index.astro
│   │   ├── auxilio-doenca\index.astro
│   │   └── direito-trabalhista\index.astro
│   ├── lib\
│   │   ├── tracking.ts            wrappers de evento do Meta Pixel
│   │   └── enviarLead.ts          fetch → POST /api/public/leads (com tratamento de erro)
│   └── styles\global.css          paleta/tipografia herdadas da marca
├── public\
│   ├── images\                    imagens otimizadas (WebP)
│   └── .htaccess                  regras Apache (se necessário p/ a subpasta)
└── .github\workflows\deploy.yml   CI: build + FTP só para a(s) subpasta(s) das LPs
```

**Tipo do arquivo de dados (`LandingData`):** headline, subtítulo, mensagem pré-WhatsApp,
slug/campanha, metadados SEO (title, description, keywords), blocos de elegibilidade,
passos do "como funciona", lista de FAQ, e textos dos CTAs. Um único `interface` compartilhado
garante que toda LP tenha a mesma forma.

---

## 4. Anatomia da página (template de conversão)

Ordem das seções (validada pela pesquisa de LPs jurídicas que convertem + concorrente Willemann):

1. **Hero** — headline focada na **dor/dúvida do cliente** (não no nome do escritório),
   subtítulo de apoio e **CTA duplo** (WhatsApp + âncora para o formulário).
2. **Prova social** — "+20 anos de atuação, +10.000 benefícios conquistados". Sem caso
   concreto individual (vedado pela OAB).
3. **Elegibilidade ("isto é pra você?")** — sinais/critérios em linguagem simples, no tom
   "médico de confiança". Nunca afirma que a pessoa "vai conseguir".
4. **Como funciona** — 3 passos do atendimento (análise do caso → orientação do caminho →
   acompanhamento). Define expectativa sem prometer prazo do INSS.
5. **FAQ** — 8–12 perguntas reais do público (marcação `schema.org/FAQPage` para rich
   results no Google).
6. **CTA final** — reforço de contato.
7. **Botão flutuante de WhatsApp** — visível durante todo o scroll.

Rodapé com identificação profissional (nome do escritório, OAB) conforme exige a publicidade
da advocacia.

---

## 5. Conversão e rastreio

### 5.1 As duas portas
- **WhatsApp:** `https://wa.me/55<DDD><numero>?text=<mensagem-pré-preenchida>`. Mensagem por
  LP, ex.: *"Olá, vim pelo site e gostaria de saber sobre o BPC/LOAS."* Dispara evento
  `Contact` no Pixel.
- **Formulário:** campos **nome** + **telefone** (mínimo). Validação de telefone no cliente.
  **Honeypot** (campo oculto anti-bot). Ao enviar: `POST` para a intranet (§6), feedback de
  sucesso, dispara evento `Lead` no Pixel, e então oferece abrir o WhatsApp.

### 5.2 Meta Pixel
Pixel no `LandingLayout` (ID via variável de build `PUBLIC_META_PIXEL_ID`). Eventos:
`PageView` (automático), `Lead` (form enviado com sucesso), `Contact` (clique no WhatsApp).
Fecha o ciclo de otimização das campanhas no Meta Ads.

### 5.3 LGPD (mínimo viável)
Aviso discreto de privacidade junto ao formulário ("ao enviar, você concorda em ser
contatado sobre seu caso") + link para uma política de privacidade simples. Sem banner de
cookies pesado nesta fase (Pixel é o único cookie de terceiro; avaliar consentimento básico).

---

## 6. Integração com a intranet/CRM (entregável separado para o Eduardo executar)

**Por que assim:** a tabela `public.leads` da intranet tem RLS que **só aceita insert de
usuário autenticado** (`auth.uid() is not null`). A LP estática **não pode** gravar direto no
Supabase com a chave anônima, e abrir insert anônimo viraria porta de spam. Solução: a LP faz
`fetch` para um **endpoint público na própria intranet** (Next.js), que insere com a credencial
de servidor (service role).

### 6.1 O que será criado **dentro de `intranet-ramon`** (Eduardo roda lá)
- **Rota:** `app/api/public/leads/route.ts` — handler `POST`.
- **Comportamento:** valida payload (`nome`, `telefone`, `campanha`), checa honeypot, normaliza
  telefone para E.164, e insere em `public.leads` com:
  - `nome`, `telefone`, `origem = 'meta_ads'`, `campanha = <slug-da-lp>`, `etapa = 'novo'`.
  - opcionalmente cria uma linha em `lead_etapa_historico` (primeira entrada).
- **Segurança:**
  - usa `SUPABASE_SERVICE_ROLE_KEY` (server-side, nunca exposto ao browser);
  - **CORS** liberado **somente** para a origem `https://ramonantonio.adv.br`;
  - honeypot + validação de telefone; rate-limit básico por IP (defensável contra flood).
- **Resposta:** `200 { ok: true }` ou erro tratado (sem vazar detalhe interno).

### 6.2 Variáveis de ambiente
- Na **intranet** (Vercel + VPS): garantir `SUPABASE_SERVICE_ROLE_KEY` e
  `NEXT_PUBLIC_SUPABASE_URL` já presentes (provavelmente já estão).
- Nas **LPs** (build Astro): `PUBLIC_LEADS_ENDPOINT` (URL da rota), `PUBLIC_META_PIXEL_ID`,
  `PUBLIC_WHATSAPP_NUMERO`.

### 6.3 Passo a passo de integração (será entregue como documento próprio)
Ao final da implementação das LPs, entrego um **guia curto** para o Eduardo colar/rodar na
intranet: o arquivo da rota, o trecho de CORS, as env vars e um teste `curl` de validação.
Esse guia é parte da entrega, mas a execução na intranet é do Eduardo (Regra de Aprovação).

---

## 7. Conformidade OAB — Provimento 205/2021 (trava de qualidade, verificada na pesquisa)

Toda LP **deve** respeitar, e o conteúdo será revisado contra esta checklist antes de
qualquer publicação:

**Proibido:**
- ❌ Prometer resultado ou sugerir êxito ("garantimos", "você vai receber").
- ❌ Cravar prazo do INSS.
- ❌ Usar **casos concretos** individuais como isca.
- ❌ Mencionar **honorários**, formas de pagamento, descontos, gratuidade ou reduções.
- ❌ Captação ativa de clientela (indução direta à contratação, estímulo ao litígio).
- ❌ Anunciar "especialista" sem título/registro que sustente.
- ❌ Mencionar dimensões/estrutura física do escritório.

**Permitido (e é o que faremos):**
- ✅ Conteúdo **meramente informativo**, com discrição e sobriedade.
- ✅ Tom acolhedor "médico de confiança".
- ✅ Tráfego pago (Meta/Google Ads) **responsivo a buscas do cliente** + SEO.
- ✅ Identificação profissional (nome, OAB) e canais de contato.
- ✅ Dados de prova institucional agregados (+20 anos, +10.000 benefícios), sem caso individual.

Qualquer texto que chegue perto do limite é sinalizado e entregue como **rascunho destacado**
para aprovação manual do Eduardo.

---

## 8. SEO regional (Santa Catarina)

- **Intenção de busca:** priorizar **cauda longa transacional** ("advogado para BPC em
  Joinville", "como dar entrada no salário-maternidade rural SC") — menos concorrência, maior
  intenção de contratação.
- **On-page por LP:** `<title>` e `<meta description>` com tese + sinal regional; H1 = headline
  do hero; URLs limpas por subpasta; `FAQPage` schema; Open Graph; imagem otimizada; sitemap.
- **Sinais locais:** menção a Tubarão/SC e regiões atendidas no conteúdo e no rodapé;
  alinhamento com Google Meu Negócio (fora do escopo de código, mas recomendado ao Eduardo).
- **Mapa de palavras-chave por tese:** será detalhado no arquivo de dados de cada LP (parte da
  fase de redação de conteúdo), com cabeça + cauda longa + variações regionais.

---

## 9. Deploy

- **GitHub Action própria** (espelho da do `ramonantonio-site`): `push` na `main` →
  `npm ci` → `npm run build` → **FTP** para `public_html/` mirando **apenas** as subpastas
  das LPs (`/bpc-loas/`, `/salario-maternidade/`, etc.).
- **Isolamento do site institucional:** o `FTP-Deploy-Action` gerencia só os arquivos que ele
  mesmo subiu (manifesto `.ftp-deploy-sync-state.json` separado). Como os dois projetos miram
  conjuntos de arquivos disjuntos, **um deploy não apaga o do outro**. Validar isso num primeiro
  deploy de teste antes de anunciar.
- **Secrets:** `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` (os mesmos do site).
- **Protocolo:** FTP simples (FTPS quebra nesse HostGator, conforme o site institucional).
- **Não commitar `dist/`.**

---

## 10. Lacunas de pesquisa e questões em aberto

**Bloqueiam a redação de conteúdo (precisam de 2ª rodada de deep research antes de publicar):**
1. **Auxílio-acidente + auxílio-doença (LP 1):** sem afirmações verificadas nesta rodada.
   Pesquisar requisitos, carência, qualidade de segurado, perícia, NTEP/B31×B91, Súmula 47 TNU,
   documentos, FAQ — tudo com fonte oficial.
2. **Trabalhista geral (LP 4):** sem afirmações verificadas. Definir **quais direitos CLT** são
   mais buscados regionalmente (verbas rescisórias, horas extras, acordos, etc.), keywords e
   estrutura — o escopo "geral" provavelmente precisa ser **afunilado** em 2–3 temas-âncora.
3. **Salário-maternidade urbano:** a pesquisa **refutou** generalizações sobre carência e
   cálculo do urbano — re-pesquisar regras corretas (empregada/doméstica/contribuinte
   individual/facultativa) antes de redigir essa parte. A parte **rural** está fundamentada.

**Decisões pontuais a confirmar com o Eduardo:**
- Slugs finais das LPs 1 e 4 (sugestões em §2 são provisórias).
- Número de WhatsApp a usar nas LPs (mesmo do atendimento atual?).
- Existe Pixel do Meta já criado (ID) ou criamos um novo?
- Política de privacidade: usar a do site institucional ou criar uma página simples no projeto?

**Cuidado de manutenção (caveat da pesquisa):** valores monetários (salário mínimo, teto de
renda do BPC) mudam todo ano — **nunca cravar valores fixos** nas LPs; usar linguagem
qualitativa ("baixa renda", "critério de renda definido por lei") e revalidar a cada reajuste.
O critério de 1/4 do salário mínimo do BPC tem flexibilização legal/jurisprudencial (até 1/2) —
apresentar como critério-base com ressalva de análise caso a caso.

---

## 11. Ordem de implementação proposta

1. **Fundação:** scaffold do projeto Astro + `LandingLayout` + componentes + `site.ts` +
   tipo `LandingData` + `lib/tracking.ts` e `lib/enviarLead.ts`.
2. **2 LPs fundamentadas primeiro:** `bpc-loas` e `salario-maternidade` (conteúdo já tem base).
3. **Integração CRM:** rota `POST /api/public/leads` na intranet + guia para o Eduardo.
4. **Deploy de teste** de 1 LP na subpasta (validar isolamento do site institucional + Pixel +
   gravação do lead na intranet).
5. **2ª rodada de research** para auxílio-acidente/doença e trabalhista → redigir LPs 1 e 4.
6. Revisão OAB de todo o conteúdo (checklist §7) → aprovação do Eduardo → publicação.

---

*Fontes oficiais da pesquisa: Lei 8.742/93 (LOAS), Lei 8.213/91, Provimento 205/2021 CFOAB,
portais gov.br/INSS/MDS. Relatório completo verificado disponível no resultado do deep research.*
