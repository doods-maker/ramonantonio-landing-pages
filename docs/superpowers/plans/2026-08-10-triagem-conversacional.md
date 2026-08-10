# Triagem Conversacional por Tese — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Páginas de quiz em formato de chat simulado (`/lp/t/<tese>`) que qualificam o lead na página antes do WhatsApp, registrando tudo no ramon-hub.

**Architecture:** Segue o padrão do projeto — um quiz = um arquivo de dados tipado (`src/data/quizzes/<tese>.ts`), um componente de chat único (`ChatQuiz.astro`, vanilla JS), lógica pura testável em `src/lib/quiz.ts`. Reusa `enviarLead`, `tracking.ts`, `capturarUtm`, `global.css` e o deploy FTP existente.

**Tech Stack:** Astro 5 (estático, `base: '/lp'`), TypeScript, Vitest. **Nenhuma dependência nova.**

**Spec:** `docs/superpowers/specs/2026-08-10-triagem-conversacional-design.md` — ler antes de começar.

## Global Constraints

- **PT-BR em tudo** (código comentado, copy, testes).
- **OAB Prov. 205/2021:** sem promessa de resultado, sem prazo de INSS, sem honorários/valores em R$, sem urgência ("clique já"), **sem emoji** na copy. Os testes barram os mesmos padrões `PROIBIDO` das LPs.
- **Tom:** "médico de confiança" — caloroso, simples, sem juridiquês.
- **Nada de push na main** (push = deploy automático). Commits locais apenas; o push é gate do Eduardo após aprovar a copy.
- **Atendente:** pessoa real da equipe — o nome final é gate do Eduardo. Usar o placeholder de build `atendente.nome` vindo do arquivo de dados (rascunho: "Equipe Ramon Antonio" até o Eduardo definir — NÃO inventar nome de pessoa).
- Campanha no hub: `t-<tese>` (qualificado) e `t-<tese>-desqualificado` (reprovado).
- Rodar testes com `npm test` (Vitest); checagem de tipos com `npx astro check`.

---

### Task 1: Tipos do quiz + máquina de avaliação pura

**Files:**
- Create: `src/data/quizzes/types.ts`
- Create: `src/lib/quiz.ts`
- Test: `src/lib/quiz.test.ts`

**Interfaces:**
- Consumes: nada (base de tudo).
- Produces (usados pelas Tasks 2–6):

```typescript
// src/data/quizzes/types.ts
export interface OpcaoResposta {
  /** Texto do botão. */
  rotulo: string;
  /** Id estável da resposta (usado no resumo e nos testes). */
  valor: string;
  /** Resposta que desqualifica o lead. */
  reprova?: boolean;
  /** Caso-limite: qualifica, mas com dúvida sinalizada no resumo (ex.: renda BPC). */
  duvida?: boolean;
}

export interface PerguntaQuiz {
  id: string;
  /** Bolhas do atendente antes dos botões (1–3 mensagens curtas). */
  bolhas: string[];
  /** Rótulo da resposta no resumo enviado ao hub/WhatsApp. Ex.: "Sequela permanente". */
  rotuloResumo: string;
  opcoes: OpcaoResposta[];
}

export interface QuizData {
  /** Slug da página e prefixo da campanha. Ex.: 't-auxilio-acidente'. */
  slug: string;
  /** Nome da tese para título/resumo. Ex.: 'Auxílio-acidente'. */
  tese: string;
  seoTitle: string;
  seoDescription: string;
  /** Pessoa real da equipe (gate do Eduardo). */
  atendente: { nome: string; cargo: string };
  /** Bolhas de abertura, antes de pedir o nome. */
  boasVindas: string[];
  /** Bolha que pede o nome. */
  perguntaNome: string;
  /** Bolhas que pedem o WhatsApp (antes do veredito). */
  perguntaTelefone: string[];
  perguntas: PerguntaQuiz[];
  /** Final aprovado: bolhas + rótulo do botão de WhatsApp. */
  aprovado: { bolhas: string[]; botaoWhats: string };
  /** Final reprovado: bolhas honestas + link pra LP completa da tese. */
  reprovado: { bolhas: string[]; linkLp: string; rotuloLink: string };
  /** Primeira linha da mensagem pré-preenchida do WhatsApp. */
  mensagemWhatsPrefixo: string;
}
```

```typescript
// src/lib/quiz.ts
import type { OpcaoResposta, PerguntaQuiz } from '../data/quizzes/types';

export interface Resposta {
  pergunta: PerguntaQuiz;
  opcao: OpcaoResposta;
}

/** Reprova se qualquer resposta tiver `reprova`; coleta os rótulos das dúvidas. */
export function avaliar(respostas: Resposta[]): { qualificado: boolean; duvidas: string[] };

/**
 * Resumo em texto puro pro hub (campo `mensagem`) e pro WhatsApp.
 * Formato:
 *   Triagem — <tese>
 *   Nome: <nome>
 *   <rotuloResumo>: <rotulo da opção>   (uma linha por resposta)
 *   Ponto de atenção: <dúvida>          (se houver)
 */
export function montarResumo(tese: string, nome: string, respostas: Resposta[], duvidas: string[]): string;
```

- [ ] **Step 1: Escrever os testes que falham** — `src/lib/quiz.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { avaliar, montarResumo, type Resposta } from './quiz';
import type { PerguntaQuiz } from '../data/quizzes/types';

const pergunta = (id: string): PerguntaQuiz => ({
  id, bolhas: ['?'], rotuloResumo: id,
  opcoes: [
    { rotulo: 'Sim', valor: 'sim' },
    { rotulo: 'Não', valor: 'nao', reprova: true },
    { rotulo: 'Mais ou menos', valor: 'limite', duvida: true },
  ],
});
const responder = (id: string, valor: string): Resposta => {
  const p = pergunta(id);
  return { pergunta: p, opcao: p.opcoes.find((o) => o.valor === valor)! };
};

describe('avaliar', () => {
  it('qualifica quando nenhuma resposta reprova', () => {
    expect(avaliar([responder('a', 'sim'), responder('b', 'sim')]))
      .toEqual({ qualificado: true, duvidas: [] });
  });
  it('reprova se qualquer resposta tem reprova', () => {
    expect(avaliar([responder('a', 'sim'), responder('b', 'nao')]).qualificado).toBe(false);
  });
  it('caso-limite qualifica com dúvida sinalizada', () => {
    const r = avaliar([responder('renda', 'limite')]);
    expect(r.qualificado).toBe(true);
    expect(r.duvidas).toEqual(['renda']);
  });
});

describe('montarResumo', () => {
  it('monta uma linha por resposta, com nome e tese', () => {
    const texto = montarResumo('Auxílio-acidente', 'Maria', [responder('Sequela', 'sim')], []);
    expect(texto).toContain('Triagem — Auxílio-acidente');
    expect(texto).toContain('Nome: Maria');
    expect(texto).toContain('Sequela: Sim');
  });
  it('inclui pontos de atenção quando há dúvida', () => {
    const texto = montarResumo('BPC', 'João', [responder('Renda', 'limite')], ['Renda']);
    expect(texto).toContain('Ponto de atenção: Renda');
  });
});
```

- [ ] **Step 2: Rodar e ver falhar** — `npm test -- quiz.test` → FAIL (módulo não existe).
- [ ] **Step 3: Implementar** — `src/data/quizzes/types.ts` (interfaces acima, verbatim) e `src/lib/quiz.ts`:

```typescript
import type { OpcaoResposta, PerguntaQuiz } from '../data/quizzes/types';

export interface Resposta {
  pergunta: PerguntaQuiz;
  opcao: OpcaoResposta;
}

export function avaliar(respostas: Resposta[]): { qualificado: boolean; duvidas: string[] } {
  const qualificado = !respostas.some((r) => r.opcao.reprova);
  const duvidas = respostas.filter((r) => r.opcao.duvida).map((r) => r.pergunta.rotuloResumo);
  return { qualificado, duvidas };
}

export function montarResumo(
  tese: string, nome: string, respostas: Resposta[], duvidas: string[],
): string {
  const linhas = [
    `Triagem — ${tese}`,
    `Nome: ${nome}`,
    ...respostas.map((r) => `${r.pergunta.rotuloResumo}: ${r.opcao.rotulo}`),
    ...duvidas.map((d) => `Ponto de atenção: ${d}`),
  ];
  return linhas.join('\n');
}
```

- [ ] **Step 4: Rodar e ver passar** — `npm test -- quiz.test` → PASS. Depois `npm test` inteiro (nada quebrou).
- [ ] **Step 5: Commit** — `git add src/data/quizzes/types.ts src/lib/quiz.ts src/lib/quiz.test.ts && git commit -m "feat: tipos e avaliação da triagem conversacional"` (SEM push).

---

### Task 2: Dados do quiz auxílio-acidente

**Files:**
- Create: `src/data/quizzes/auxilio-acidente.ts`
- Test: `src/data/quizzes/__tests__/auxilio-acidente.test.ts`

**Interfaces:**
- Consumes: `QuizData` (Task 1). Export: `export const quizAuxilioAcidente: QuizData`.
- Produces: dados consumidos pela página (Task 5).

**Estrutura obrigatória das perguntas (da spec):**

| id | rotuloResumo | opções (valor → efeito) |
|---|---|---|
| `acidente` | Tipo de acidente | trabalho · trajeto · outro (todas qualificam) |
| `sequela` | Sequela permanente | sim · nao→**reprova** · nao-sei→**duvida** |
| `vinculo` | Vínculo na época | empregado · domestico · avulso · rural — qualificam; mei-individual→**reprova** |
| `auxilio-doenca` | Recebeu auxílio-doença | sim-b91 · sim-b31 · nao (todas qualificam; informativo) |
| `ano` | Ano do acidente | ate-5-anos · mais-de-5→**duvida** (prescrição atinge parcelas, não reprova sozinha) |

- [ ] **Step 1: Escrever o teste que falha** — `__tests__/auxilio-acidente.test.ts`, no padrão dos testes de LP existentes (copiar o array `PROIBIDO` de `src/data/lps/__tests__/auxilio-acidente.test.ts` e acrescentar `/[\u{1F300}-\u{1FAFF}]/u` pra barrar emoji):

```typescript
import { describe, it, expect } from 'vitest';
import { quizAuxilioAcidente as q } from '../auxilio-acidente';
import { avaliar, type Resposta } from '../../../lib/quiz';

const PROIBIDO = [
  /R\$\s?\d/, /honor[áa]rio/i, /com certeza/i,
  /você vai (ganhar|receber)/i, /garant(imos|ido o benef)/i,
  /\bem (\d+|poucos) (dias|meses|semanas)\b/i,
  /clique j[áa]/i, /não perca/i,
  /[\u{1F300}-\u{1FAFF}]/u,
];

const responder = (id: string, valor: string): Resposta => {
  const pergunta = q.perguntas.find((p) => p.id === id)!;
  return { pergunta, opcao: pergunta.opcoes.find((o) => o.valor === valor)! };
};
/** Caminho todo-positivo, trocando as respostas passadas em `overrides`. */
const caminho = (overrides: Record<string, string> = {}): Resposta[] =>
  q.perguntas.map((p) => responder(p.id, overrides[p.id] ?? p.opcoes[0].valor));

describe('quiz auxilio-acidente', () => {
  it('slug e tese', () => {
    expect(q.slug).toBe('t-auxilio-acidente');
    expect(q.tese).toBe('Auxílio-acidente');
  });
  it('tem as 5 perguntas na ordem da spec', () => {
    expect(q.perguntas.map((p) => p.id))
      .toEqual(['acidente', 'sequela', 'vinculo', 'auxilio-doenca', 'ano']);
  });
  it('caminho positivo qualifica sem dúvidas', () => {
    expect(avaliar(caminho())).toEqual({ qualificado: true, duvidas: [] });
  });
  it('sem sequela reprova; MEI/individual reprova', () => {
    expect(avaliar(caminho({ sequela: 'nao' })).qualificado).toBe(false);
    expect(avaliar(caminho({ vinculo: 'mei-individual' })).qualificado).toBe(false);
  });
  it('acidente há mais de 5 anos qualifica com dúvida (prescrição)', () => {
    const r = avaliar(caminho({ ano: 'mais-de-5' }));
    expect(r.qualificado).toBe(true);
    expect(r.duvidas.length).toBe(1);
  });
  it('reprovado tem link pra LP completa e final honesto', () => {
    expect(q.reprovado.linkLp).toBe('/lp/auxilio-acidente/');
    expect(q.reprovado.bolhas.length).toBeGreaterThan(0);
  });
  it('não viola OAB', () => {
    const texto = JSON.stringify(q);
    for (const re of PROIBIDO) expect(texto).not.toMatch(re);
  });
});
```

- [ ] **Step 2: Rodar e ver falhar** — `npm test -- quizzes/__tests__/auxilio-acidente` → FAIL.
- [ ] **Step 3: Escrever os dados.** Copy em rascunho, tom médico-de-confiança, bolhas curtas (máx. ~140 caracteres cada). Conteúdo técnico correto: B94/art. 86 Lei 8.213/91, sequela permanente após consolidação, acumulável com salário. Esqueleto com a copy de partida (o texto pode ser lapidado, a estrutura não):

```typescript
import type { QuizData } from './types';

export const quizAuxilioAcidente: QuizData = {
  slug: 't-auxilio-acidente',
  tese: 'Auxílio-acidente',
  seoTitle: 'Auxílio-acidente — verifique seus direitos | Ramon Antonio Advogados',
  seoDescription:
    'Sofreu um acidente e ficou com sequela? Responda algumas perguntas e veja se o auxílio-acidente pode se aplicar ao seu caso.',
  atendente: { nome: 'Equipe Ramon Antonio', cargo: 'Atendimento' }, // gate: Eduardo define a pessoa real
  boasVindas: [
    'Olá! Que bom ter você aqui.',
    'Vou fazer algumas perguntas rápidas pra entender se o auxílio-acidente pode se aplicar ao seu caso. Leva menos de um minuto.',
  ],
  perguntaNome: 'Pra começar, como você se chama?',
  perguntaTelefone: [
    'Obrigado! Estamos quase no fim.',
    'Qual o seu WhatsApp com DDD? É por ele que nossa equipe fala com você.',
  ],
  perguntas: [
    {
      id: 'acidente',
      rotuloResumo: 'Tipo de acidente',
      bolhas: ['O acidente que você sofreu foi...'],
      opcoes: [
        { rotulo: 'No trabalho', valor: 'trabalho' },
        { rotulo: 'No trajeto casa-trabalho', valor: 'trajeto' },
        { rotulo: 'Outro tipo de acidente', valor: 'outro' },
      ],
    },
    {
      id: 'sequela',
      rotuloResumo: 'Sequela permanente',
      bolhas: ['Depois que o tratamento terminou, ficou alguma sequela ou limitação permanente?'],
      opcoes: [
        { rotulo: 'Sim, ficou sequela', valor: 'sim' },
        { rotulo: 'Não ficou sequela', valor: 'nao', reprova: true },
        { rotulo: 'Ainda não sei dizer', valor: 'nao-sei', duvida: true },
      ],
    },
    {
      id: 'vinculo',
      rotuloResumo: 'Vínculo na época',
      bolhas: ['Na época do acidente, qual era a sua situação de trabalho?'],
      opcoes: [
        { rotulo: 'Empregado registrado', valor: 'empregado' },
        { rotulo: 'Empregado doméstico', valor: 'domestico' },
        { rotulo: 'Trabalhador avulso', valor: 'avulso' },
        { rotulo: 'Trabalhador rural', valor: 'rural' },
        { rotulo: 'MEI ou autônomo', valor: 'mei-individual', reprova: true },
      ],
    },
    {
      id: 'auxilio-doenca',
      rotuloResumo: 'Recebeu auxílio-doença',
      bolhas: ['Você chegou a receber auxílio-doença do INSS por causa desse acidente?'],
      opcoes: [
        { rotulo: 'Sim, acidentário (B91)', valor: 'sim-b91' },
        { rotulo: 'Sim, comum (B31)', valor: 'sim-b31' },
        { rotulo: 'Não recebi', valor: 'nao' },
      ],
    },
    {
      id: 'ano',
      rotuloResumo: 'Quando foi o acidente',
      bolhas: ['E quando aconteceu o acidente?'],
      opcoes: [
        { rotulo: 'Nos últimos 5 anos', valor: 'ate-5-anos' },
        { rotulo: 'Há mais de 5 anos', valor: 'mais-de-5', duvida: true },
      ],
    },
  ],
  aprovado: {
    bolhas: [
      'Pelo que você respondeu, o seu caso merece uma análise da nossa equipe.',
      'Toque no botão abaixo: sua conversa já chega organizada no nosso WhatsApp e a equipe responde por lá.',
    ],
    botaoWhats: 'Continuar no WhatsApp',
  },
  reprovado: {
    bolhas: [
      'Obrigado por responder. Pelo que você contou, o auxílio-acidente provavelmente não se aplica ao seu caso.',
      'Se a sua situação mudar, ou se quiser entender melhor o benefício, este material explica tudo com calma.',
    ],
    linkLp: '/lp/auxilio-acidente/',
    rotuloLink: 'Entenda o auxílio-acidente',
  },
  mensagemWhatsPrefixo: 'Olá! Fiz a triagem de auxílio-acidente no site.',
};
```

- [ ] **Step 4: Rodar e ver passar** — `npm test -- quizzes/__tests__/auxilio-acidente` → PASS.
- [ ] **Step 5: Commit** — `git add src/data/quizzes/auxilio-acidente.ts src/data/quizzes/__tests__/auxilio-acidente.test.ts && git commit -m "feat: dados do quiz auxilio-acidente (copy rascunho)"`.

---

### Task 3: Dados do quiz BPC/LOAS

**Files:**
- Create: `src/data/quizzes/bpc-loas.ts`
- Test: `src/data/quizzes/__tests__/bpc-loas.test.ts`

**Interfaces:**
- Consumes: `QuizData` (Task 1). Export: `export const quizBpcLoas: QuizData`.

**Estrutura obrigatória (da spec):**

| id | rotuloResumo | opções (valor → efeito) |
|---|---|---|
| `perfil` | Perfil | idoso-65 · pcd — qualificam; nenhum→**reprova** ("Nenhuma das duas situações") |
| `renda` | Renda familiar por pessoa | ate-quarto-salario · pouco-acima→**duvida** (jurisprudência flexibiliza) · bem-acima→**reprova** |
| `cadunico` | CadÚnico | sim · nao→**duvida** (dá pra inscrever; não reprova) |

Campos fixos: `slug: 't-bpc-loas'`, `tese: 'BPC/LOAS'`, `reprovado.linkLp: '/lp/bpc-loas/'`, `mensagemWhatsPrefixo: 'Olá! Fiz a triagem do BPC no site.'`. Copy: mesmo tom e estrutura da Task 2 (boasVindas próprias da tese, ex.: "benefício de um salário mínimo para idosos 65+ e pessoas com deficiência em situação de baixa renda"). Público idoso/PCD: bolhas ainda mais curtas e diretas. Sem mencionar valor em R$ (o teste barra); "um salário mínimo" é permitido e factual.

- [ ] **Step 1: Escrever o teste que falha** — mesmo molde da Task 2 (helpers `responder`/`caminho` idênticos, importando `quizBpcLoas`), com estes casos:

```typescript
it('tem as 3 perguntas na ordem da spec', () => {
  expect(q.perguntas.map((p) => p.id)).toEqual(['perfil', 'renda', 'cadunico']);
});
it('caminho positivo qualifica sem dúvidas', () => {
  expect(avaliar(caminho())).toEqual({ qualificado: true, duvidas: [] });
});
it('sem perfil (nem 65+ nem PCD) reprova; renda bem acima reprova', () => {
  expect(avaliar(caminho({ perfil: 'nenhum' })).qualificado).toBe(false);
  expect(avaliar(caminho({ renda: 'bem-acima' })).qualificado).toBe(false);
});
it('renda pouco acima qualifica com dúvida (caso-limite da spec)', () => {
  const r = avaliar(caminho({ renda: 'pouco-acima' }));
  expect(r.qualificado).toBe(true);
  expect(r.duvidas.length).toBe(1);
});
it('sem CadÚnico qualifica com dúvida', () => {
  expect(avaliar(caminho({ cadunico: 'nao' })).qualificado).toBe(true);
});
```

  Mais os testes de slug (`t-bpc-loas`), link do reprovado (`/lp/bpc-loas/`) e OAB (`PROIBIDO`), iguais aos da Task 2.
- [ ] **Step 2: Rodar e ver falhar** — `npm test -- quizzes/__tests__/bpc-loas` → FAIL.
- [ ] **Step 3: Escrever os dados** conforme a tabela e o esqueleto da Task 2.
- [ ] **Step 4: Rodar e ver passar** — `npm test -- quizzes/__tests__/bpc-loas` → PASS.
- [ ] **Step 5: Commit** — `git add src/data/quizzes/bpc-loas.ts src/data/quizzes/__tests__/bpc-loas.test.ts && git commit -m "feat: dados do quiz bpc-loas (copy rascunho)"`.

---

### Task 4: Dados do quiz salário-maternidade

**Files:**
- Create: `src/data/quizzes/salario-maternidade.ts`
- Test: `src/data/quizzes/__tests__/salario-maternidade.test.ts`

**Interfaces:**
- Consumes: `QuizData` (Task 1). Export: `export const quizSalarioMaternidade: QuizData`.

**Estrutura obrigatória (da spec — quase todo caminho qualifica; o quiz organiza o resumo):**

| id | rotuloResumo | opções (valor → efeito) |
|---|---|---|
| `evento` | Nascimento ou adoção | nascimento · adocao — qualificam; nenhum→**reprova** ("Ainda não — estou grávida" NÃO existe como opção reprovada: gravidez em curso entra como `gravida`, qualifica) |
| `quando` | Quando foi | ate-5-anos · mais-de-5→**reprova** (prescrição quinquenal) · gravidez-em-curso (qualifica) |
| `situacao` | Situação na época | empregada · desempregada · mei-autonoma · rural (todas qualificam — STF ADIs 2.110/2.111 + IN 188/2025 dispensam carência; a copy fala em "qualidade de segurada", nunca em "uma única contribuição") |

Atenção: `evento` e `quando` precisam ser coerentes — a opção `gravidez-em-curso` de `quando` só faz sentido com `evento: gravida`. Simplificação deliberada: manter as duas perguntas independentes (o resumo mostra ambas; a equipe lê o contexto). Campos fixos: `slug: 't-salario-maternidade'`, `tese: 'Salário-maternidade'`, `reprovado.linkLp: '/lp/salario-maternidade/'`, `mensagemWhatsPrefixo: 'Olá! Fiz a triagem do salário-maternidade no site.'`.

- [ ] **Step 1: Escrever o teste que falha** — mesmo molde (helpers da Task 2), casos:

```typescript
it('tem as 3 perguntas na ordem da spec', () => {
  expect(q.perguntas.map((p) => p.id)).toEqual(['evento', 'quando', 'situacao']);
});
it('caminho positivo qualifica sem dúvidas', () => {
  expect(avaliar(caminho())).toEqual({ qualificado: true, duvidas: [] });
});
it('nenhum evento reprova; mais de 5 anos reprova (prescrição)', () => {
  expect(avaliar(caminho({ evento: 'nenhum' })).qualificado).toBe(false);
  expect(avaliar(caminho({ quando: 'mais-de-5' })).qualificado).toBe(false);
});
it('desempregada, MEI e rural qualificam (carência dispensada)', () => {
  for (const s of ['desempregada', 'mei-autonoma', 'rural']) {
    expect(avaliar(caminho({ situacao: s })).qualificado).toBe(true);
  }
});
it('a copy fala em qualidade de segurada, não em contribuição única', () => {
  const texto = JSON.stringify(q).toLowerCase();
  expect(texto).not.toMatch(/uma (única|so|só) contribuição/);
});
```

  Mais slug/link/OAB como nas Tasks 2–3.
- [ ] **Step 2: Rodar e ver falhar** — FAIL.
- [ ] **Step 3: Escrever os dados** conforme a tabela.
- [ ] **Step 4: Rodar e ver passar** — PASS, e `npm test` inteiro verde.
- [ ] **Step 5: Commit** — `git add src/data/quizzes/salario-maternidade.ts src/data/quizzes/__tests__/salario-maternidade.test.ts && git commit -m "feat: dados do quiz salario-maternidade (copy rascunho)"`.

---

### Task 5: Layout + componente ChatQuiz + página do auxílio-acidente

**Files:**
- Create: `src/layouts/QuizLayout.astro`
- Create: `src/components/ChatQuiz.astro`
- Create: `src/pages/t/auxilio-acidente/index.astro`

**Interfaces:**
- Consumes: `QuizData` (Task 1), `quizAuxilioAcidente` (Task 2), `avaliar`/`montarResumo`/`Resposta` (Task 1), `enviarLead` + `normalizarTelefone` (`src/lib/enviarLead.ts`), `trackLead`/`trackContact` (`src/lib/tracking.ts`).
- Produces: `QuizLayout.astro` com `interface Props { titulo: string; descricao: string; slug: string }`; `ChatQuiz.astro` com `interface Props { quiz: QuizData }` — reusados verbatim pela Task 6.

Sem teste Vitest de DOM (o projeto não tem infra de teste de browser — a lógica já está coberta na Task 1–4; o componente é casca fina). Verificação = `npx astro check` + build + preview manual.

- [ ] **Step 1: `QuizLayout.astro`** — cópia enxuta do `LandingLayout.astro` (head, fontes, Pixel `PageView`), sem depender de `LandingData`:

```astro
---
import '../styles/global.css';
interface Props { titulo: string; descricao: string; slug: string }
const { titulo, descricao, slug } = Astro.props;
const pixelId = import.meta.env.PUBLIC_META_PIXEL_ID;
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const canonical = new URL(`${base}/t/${slug}`, Astro.site).href;
---
```

  Corpo: `<html lang="pt-BR">` com o mesmo `<head>` do LandingLayout (title/description/canonical/og/fontes/Pixel — copiar o snippet `fbq` verbatim de `src/layouts/LandingLayout.astro:33-42`) e `<body><slot /></body>`. `<meta name="robots" content="noindex" />` — página de tráfego pago, não de SEO (não entra no sitemap e não canibaliza as LPs).
- [ ] **Step 2: `ChatQuiz.astro`** — o componente inteiro (marcação + estilo + script). Requisitos de comportamento:
  - **Cabeçalho do chat:** avatar com iniciais, `atendente.nome`, `atendente.cargo` e status "online" (decisão do Eduardo na spec) — barra fixa no topo, estilo WhatsApp, paleta da casa (`--bronze-*`/`--cream-*` do `global.css`).
  - **Bolhas:** atendente à esquerda (fundo `--white`), visitante à direita (fundo bronze claro). Indicador "digitando…" (3 pontos animados em CSS) por ~900ms antes de cada bolha do atendente; bolhas entram em sequência com scroll automático pro fim.
  - **Máquina de passos no script (vanilla TS no `<script>`):** estados `boasVindas → nome → perguntas[i] → telefone → veredito`. Respostas de pergunta = botões (chips) renderizados a partir de `quiz.perguntas[i].opcoes`; ao clicar, a opção vira bolha do visitante e some a fileira de chips. Nome e telefone = `<input>` no rodapé do chat (único momento em que o campo de digitação aparece); telefone validado com `normalizarTelefone` — se inválido, bolha do atendente pede de novo ("Esse número não parece completo. Confere o DDD?").
  - **Honeypot:** campo `website` oculto no form do rodapé, igual ao `FormContato.astro:32`.
  - **Veredito:** monta `Resposta[]` acumuladas, roda `avaliar` + `montarResumo`.
    - Qualificado: `enviarLead(endpoint, { nome, telefone, campanha: quiz.slug, mensagem: resumo, website: honeypot })`; no `ok` → `trackLead()`. **Com ou sem sucesso do envio**, mostra `aprovado.bolhas` + botão `aprovado.botaoWhats` → `https://wa.me/${PUBLIC_WHATSAPP_NUMERO}?text=` com `mensagemWhatsPrefixo + '\n' + resumo` (URL-encoded); clique → `trackContact()`. (Regra da spec: falha de rede não bloqueia o lead.)
    - Reprovado: `enviarLead(..., { campanha: quiz.slug + '-desqualificado', ... })`; no `ok` → `trackLead()`; mostra `reprovado.bolhas` + link `reprovado.linkLp` com rótulo `reprovado.rotuloLink`. Sem botão de WhatsApp.
    - Sem `PUBLIC_LEADS_ENDPOINT` configurado: pula o envio ao hub silenciosamente (mesma tolerância do `FormContato.astro:162`) e segue o fluxo visual normal.
  - **Rodapé da página** (fora do card do chat): nome da banca, OAB, link `/lp/politica-de-privacidade/` e o disclaimer padrão "Conteúdo informativo. Não substitui a orientação jurídica individual de um(a) advogado(a)."
  - **Mobile-first:** o chat ocupa a tela toda em ≤768px (é onde o tráfego de Meta Ads chega); em desktop, card centrado com `max-width: 480px`.
- [ ] **Step 3: Página** — `src/pages/t/auxilio-acidente/index.astro`:

```astro
---
import QuizLayout from '../../../layouts/QuizLayout.astro';
import ChatQuiz from '../../../components/ChatQuiz.astro';
import { quizAuxilioAcidente } from '../../../data/quizzes/auxilio-acidente';
---
<QuizLayout
  titulo={quizAuxilioAcidente.seoTitle}
  descricao={quizAuxilioAcidente.seoDescription}
  slug="auxilio-acidente"
>
  <ChatQuiz quiz={quizAuxilioAcidente} />
</QuizLayout>
```

- [ ] **Step 4: Verificar** — `npx astro check` sem erros novos; `npm run build` OK; `npm run preview` e testar no browser em `http://localhost:4321/lp/t/auxilio-acidente/`: caminho qualificado (chega no botão de WhatsApp com resumo no `wa.me`), caminho reprovado (tela educada + link), telefone inválido re-pergunta.
- [ ] **Step 5: Commit** — `git add src/layouts/QuizLayout.astro src/components/ChatQuiz.astro src/pages/t/auxilio-acidente/index.astro && git commit -m "feat: chat de triagem + página do auxilio-acidente"`.

---

### Task 6: Páginas BPC e salário-maternidade + verificação final

**Files:**
- Create: `src/pages/t/bpc-loas/index.astro`
- Create: `src/pages/t/salario-maternidade/index.astro`
- Modify: `CLAUDE.md` (seção "Status e Pendências" — registrar as 3 páginas de triagem e seus gates)

**Interfaces:**
- Consumes: `QuizLayout`/`ChatQuiz` (Task 5), `quizBpcLoas` (Task 3), `quizSalarioMaternidade` (Task 4).

- [ ] **Step 1: Criar as duas páginas** — mesmo molde da página da Task 5 Step 3, trocando import e slug (`slug="bpc-loas"` / `slug="salario-maternidade"`).
- [ ] **Step 2: Atualizar `CLAUDE.md`** — acrescentar na seção "Status e Pendências" um bloco "Triagem conversacional (`/lp/t/<tese>`)" com: as 3 rotas, referência à spec, e os gates pendentes (copy aprovada pelo Eduardo, nome do atendente real, nº WhatsApp definitivo, Pixel).
- [ ] **Step 3: Verificação completa** — `npm test` (tudo verde), `npx astro check`, `npm run build`, preview manual das 3 rotas sob `/lp/t/`.
- [ ] **Step 4: Commit** — `git add src/pages/t CLAUDE.md && git commit -m "feat: páginas de triagem bpc-loas e salario-maternidade"`.
- [ ] **Step 5: PARAR — gate do Eduardo.** NÃO fazer push. Entregar ao Eduardo: (a) preview local das 3 rotas, (b) a copy dos 3 quizzes em rascunho pra aprovação, (c) pergunta do nome do atendente real. Push na main (= deploy) só depois do "aprovado" explícito.

---

## Self-Review (feita na escrita do plano)

- **Cobertura da spec:** fluxo do chat (Task 5), 3 teses com regras declarativas (Tasks 2–4), qualificado→hub+WhatsApp e reprovado→hub+tela educada (Task 5 Step 2), tracking Pixel (Task 5), testes OAB+lógica (Tasks 1–4), gates (Task 6 Step 5). Caso-limite BPC coberto (Task 3).
- **Sem placeholders:** todo teste tem código; a copy das Tasks 3–4 segue esqueleto completo da Task 2 com tabelas de estrutura exatas.
- **Consistência de tipos:** `QuizData`/`Resposta`/`avaliar`/`montarResumo` definidos na Task 1 e usados com as mesmas assinaturas nas Tasks 2–6.
