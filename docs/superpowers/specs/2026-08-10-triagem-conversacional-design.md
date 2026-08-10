# Triagem conversacional por tese — Design

**Data:** 2026-08-10 · **Status:** aprovado por Eduardo (conversa de 10/08)
**Projeto:** landing-pages (Astro) · **Motivação:** mudança de preço das mensagens
do WhatsApp na Meta — qualificar o lead na página, antes de gastar conversa paga.
**Referência de formato:** funil da conversaicrm (chat simulado estilo Typeform/WhatsApp).

## O que é

Páginas de quiz em formato de **chat simulado** (avatar, nome de atendente, status
"online", bolhas com indicador "digitando..."), uma por tese:

| Tese | URL |
|---|---|
| Auxílio-acidente | `ramonantonio.adv.br/lp/t/auxilio-acidente` |
| BPC/LOAS | `ramonantonio.adv.br/lp/t/bpc-loas` |
| Salário-maternidade | `ramonantonio.adv.br/lp/t/salario-maternidade` |

Página enxuta, feita pra tráfego pago: **sem header/menu** do site — só o chat +
rodapé mínimo (identificação da banca, OAB, link da política de privacidade).

**Decisão de formato (Eduardo, 10/08):** igual à referência — com nome de atendente
e status online — ciente do risco OAB sinalizado (Prov. 205/2021, indução a erro).
**Mitigação adotada:** o atendente do chat é uma **pessoa real da equipe**
(nome a definir pelo Eduardo antes da copy), a mesma que atende no WhatsApp — o
"online" descreve o atendimento real, não uma persona inventada.

## Fluxo do chat

1. **Boas-vindas** → pergunta o **nome** do visitante (único campo de digitação
   livre além do telefone); o chat usa o nome nas bolhas seguintes.
2. **Perguntas de qualificação** (4–6 por tese), respondidas **só por botões**:
   - *Auxílio-acidente:* tipo de acidente (trabalho/trajeto/outro) → ficou sequela
     permanente após consolidação? → vínculo na época (empregado/doméstico/avulso/
     segurado especial qualificam; contribuinte individual/MEI reprovam) → recebeu
     auxílio-doença (B31/B91)? → ano do acidente (prescrição quinquenal, Art. 103,
     p.u., Lei 8.213/91 — informativo no resumo, não reprova sozinho).
   - *BPC/LOAS:* perfil (idoso 65+ / PCD) → renda familiar per capita (faixas;
     acima do limite = caso-limite, ver regra abaixo) → inscrição no CadÚnico.
   - *Salário-maternidade:* nascimento/adoção e quando (prescrição) → situação na
     época (empregada/desempregada/MEI/rural — com STF ADIs 2.110/2.111 + IN 188/2025,
     carência dispensada; quase todo caminho qualifica, o quiz organiza o resumo).
3. **Contato:** pede o **WhatsApp (telefone)** antes de mostrar o veredito.
4. **Qualificado:** registra no hub via `enviarLead` (campanha `t-<tese>`,
   `mensagem` = resumo das respostas) **e** mostra botão que abre o WhatsApp da
   banca com o resumo pré-preenchido ("Fiz a triagem: sofri acidente em 2023...").
5. **Reprovado:** registra no hub com campanha `t-<tese>-desqualificado` (mesmo
   resumo) e mostra mensagem final educada e honesta — "pelo que você respondeu,
   esse benefício provavelmente não se aplica" — com link pra LP completa da tese.
   **Sem botão de WhatsApp.**
6. **Tracking:** Pixel `Lead` no envio ao hub; `Contact` no clique do botão de
   WhatsApp (reusa `src/lib/tracking.ts`). UTMs via `capturarUtm` (já existe).

A regra de qualificação é **declarativa por tese** (respostas que reprovam),
hard-coded no arquivo de dados do quiz. Sem backend novo, sem IA respondendo,
sem digitação livre além de nome/telefone.

## Arquitetura

Segue o padrão do projeto — **um quiz = um arquivo de dados**:

```
src/
├── data/quizzes/
│   ├── types.ts               ← QuizData: atendente, passos, opções, regra de qualificação
│   ├── auxilio-acidente.ts
│   ├── bpc-loas.ts
│   ├── salario-maternidade.ts
│   └── __tests__/             ← trava OAB (mesmo padrão das LPs) + lógica de qualificação
├── components/
│   └── ChatQuiz.astro         ← componente único; vanilla JS, sem dependência nova
├── lib/
│   └── quiz.ts                ← máquina de estados pura (avançar passo, avaliar regra,
│                                 montar resumo) — testável em Vitest sem DOM
└── pages/t/
    ├── auxilio-acidente/index.astro
    ├── bpc-loas/index.astro
    └── salario-maternidade/index.astro
```

- Reusa `enviarLead`, `capturarUtm`, `tracking.ts`, `global.css` e o deploy FTP
  existente (GitHub Actions → HostGator `/lp/`).
- O resumo das respostas vai no campo `mensagem` do `LeadPayload` (já suportado
  pelo endpoint do hub — vira nota no lead).
- Erro de rede no `enviarLead`: não bloqueia o lead — o botão de WhatsApp aparece
  mesmo assim (o hub perde o registro, o comercial não perde o lead).

## Testes

- Vitest de conteúdo por quiz: padrões proibidos OAB (promessa de resultado,
  prazo de INSS, honorários, urgência, emoji) — mesmo padrão dos testes das LPs.
- Vitest da lógica: para cada tese, um caso qualificado, um reprovado e o
  caso-limite do BPC (renda um pouco acima → qualifica com dúvida sinalizada
  no resumo).

## Gates de aprovação (inegociáveis)

1. **Copy dos 3 quizzes** → rascunho pra aprovação do Eduardo **antes** de
   qualquer push (push na main = deploy automático).
2. **Nome do atendente real** → Eduardo define antes da copy.
3. Dependências herdadas das LPs, ainda pendentes: **número de WhatsApp
   definitivo** e **Pixel Meta**.

## Fora do escopo

- Campanha de ads em si (depois, via skill `comercial-campanha-meta`).
- IA/respostas dinâmicas no chat; digitação livre; backend novo.
- Alterar as 4 LPs existentes.
