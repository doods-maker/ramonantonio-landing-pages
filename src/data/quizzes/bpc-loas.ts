import type { QuizData } from './types';

export const quizBpcLoas: QuizData = {
  slug: 't-bpc-loas',
  tese: 'BPC/LOAS',
  seoTitle: 'BPC/LOAS — verifique seus direitos | Ramon Antonio Advogados',
  seoDescription:
    'Você tem 65 anos ou mais, ou é pessoa com deficiência, e a renda da família é baixa? Responda algumas perguntas e veja se o BPC pode se aplicar ao seu caso.',
  atendente: { nome: 'Equipe Ramon Antonio', cargo: 'Atendimento' }, // gate: Eduardo define a pessoa real
  boasVindas: [
    'Olá! Que bom ter você aqui.',
    'O BPC é um benefício de um salário mínimo para idosos 65+ e pessoas com deficiência em situação de baixa renda. Vou fazer algumas perguntas simples pra ver se ele pode se aplicar ao seu caso.',
  ],
  perguntaNome: 'Pra começar, como você se chama?',
  perguntaTelefone: [
    'Obrigado, {nome}! Já estamos quase terminando.',
    'Qual o seu WhatsApp com DDD? É por ele que nossa equipe fala com você.',
  ],
  perguntas: [
    {
      id: 'perfil',
      rotuloResumo: 'Perfil',
      bolhas: ['Qual dessas situações é a sua?'],
      opcoes: [
        { rotulo: 'Tenho 65 anos ou mais', valor: 'idoso-65' },
        { rotulo: 'Sou pessoa com deficiência', valor: 'pcd' },
        { rotulo: 'Nenhuma das duas situações', valor: 'nenhum', reprova: true },
      ],
    },
    {
      id: 'renda',
      rotuloResumo: 'Renda familiar por pessoa',
      bolhas: ['E a renda da sua família, dividida por pessoa da casa, é de quanto?'],
      opcoes: [
        { rotulo: 'Até um quarto do salário mínimo por pessoa', valor: 'ate-quarto-salario' },
        { rotulo: 'Um pouco acima disso', valor: 'pouco-acima', duvida: true },
        { rotulo: 'Bem acima disso', valor: 'bem-acima', reprova: true },
      ],
    },
    {
      id: 'cadunico',
      rotuloResumo: 'CadÚnico',
      bolhas: ['Você já tem cadastro no CadÚnico, o Cadastro Único do governo?'],
      opcoes: [
        { rotulo: 'Sim, já tenho', valor: 'sim' },
        { rotulo: 'Ainda não tenho', valor: 'nao', duvida: true },
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
      'Obrigado por responder. Pelo que você contou, o BPC provavelmente não se aplica ao seu caso.',
      'Se a sua situação mudar, ou se quiser entender melhor o benefício, este material explica tudo com calma.',
    ],
    linkLp: '/lp/bpc-loas/',
    rotuloLink: 'Entenda o BPC/LOAS',
  },
  mensagemWhatsPrefixo: 'Olá! Fiz a triagem do BPC no site.',
};
