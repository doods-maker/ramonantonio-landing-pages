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
