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
  /** Bolhas de abertura, antes da primeira pergunta. */
  boasVindas: string[];
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
