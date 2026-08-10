import type { QuizData } from './types';

export const quizSalarioMaternidade: QuizData = {
  slug: 't-salario-maternidade',
  tese: 'Salário-maternidade',
  seoTitle: 'Salário-maternidade — verifique seus direitos | Ramon Antonio Advogados',
  seoDescription:
    'Teve um filho, adotou ou está grávida? Responda algumas perguntas e veja se o salário-maternidade pode se aplicar ao seu caso.',
  atendente: { nome: 'Eduardo', cargo: 'Atendimento' },
  boasVindas: [
    'Olá! Que bom ter você aqui.',
    'Vou fazer algumas perguntas rápidas pra entender se o salário-maternidade pode se aplicar ao seu caso. Leva menos de um minuto.',
  ],
  perguntaNome: 'Pra começar, como você se chama?',
  perguntaTelefone: [
    'Obrigado, {nome}! Estamos quase no fim.',
    'Qual o seu WhatsApp com DDD? É por ele que nossa equipe fala com você.',
  ],
  perguntas: [
    {
      id: 'evento',
      rotuloResumo: 'Evento gerador',
      bolhas: ['Pra começar: o benefício é por causa de um nascimento, de uma adoção, ou você está grávida agora?'],
      opcoes: [
        { rotulo: 'Nascimento', valor: 'nascimento' },
        { rotulo: 'Adoção', valor: 'adocao' },
        { rotulo: 'Estou grávida agora', valor: 'gravida' },
        { rotulo: 'Nenhuma dessas situações', valor: 'nenhum', reprova: true },
      ],
    },
    {
      id: 'quando',
      rotuloResumo: 'Quando foi',
      bolhas: ['E isso aconteceu quando?'],
      opcoes: [
        { rotulo: 'Nos últimos 5 anos', valor: 'ate-5-anos' },
        { rotulo: 'Ainda estou grávida', valor: 'gravidez-em-curso' },
        { rotulo: 'Há mais de 5 anos', valor: 'mais-de-5', reprova: true },
      ],
    },
    {
      id: 'situacao',
      rotuloResumo: 'Situação na época',
      bolhas: [
        'Uma coisa importante: hoje a lei dispensa a carência pro salário-maternidade — o que conta é a sua qualidade de segurada na época, não um número mínimo de contribuições.',
        'Qual era (ou é) a sua situação de trabalho?',
      ],
      opcoes: [
        { rotulo: 'Empregada com carteira assinada', valor: 'empregada' },
        { rotulo: 'Desempregada', valor: 'desempregada' },
        { rotulo: 'MEI ou autônoma', valor: 'mei-autonoma' },
        { rotulo: 'Trabalhadora rural', valor: 'rural' },
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
      'Obrigado por responder. Pelo que você contou, o salário-maternidade provavelmente não se aplica ao seu caso.',
      'Se a sua situação mudar, ou se quiser entender melhor o benefício, este material explica tudo com calma.',
    ],
    linkLp: '/lp/salario-maternidade/',
    rotuloLink: 'Entenda o salário-maternidade',
  },
  mensagemWhatsPrefixo: 'Olá! Fiz a triagem do salário-maternidade no site.',
};
