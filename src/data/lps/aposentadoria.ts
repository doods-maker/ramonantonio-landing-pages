import type { LandingData } from '../types';

export const aposentadoria: LandingData = {
  slug: 'aposentadoria',
  seoTitle: 'Advogado de Aposentadoria em Tubarão/SC | Ramon Antonio',
  seoDescription:
    'Aposentadoria por idade ou por tempo de contribuição: veja as regras depois da Reforma, as de transição e o direito adquirido. Advogados previdenciários em SC.',
  keywords: [
    'advogado de aposentadoria', 'advogado aposentadoria SC', 'advogado aposentadoria Tubarão',
    'aposentadoria por idade', 'aposentadoria por idade INSS', 'regras de transição aposentadoria',
    'direito adquirido aposentadoria', 'aposentadoria negada INSS', 'advogado previdenciário Joinville',
  ],

  heroEyebrow: 'APOSENTADORIA · INSS',
  heroHeadline: 'Já trabalhou a vida toda.<br>Quando dá para se aposentar?',
  heroSub:
    'Depois da Reforma da Previdência, aposentar-se ficou mais difícil de entender: há regra nova, regras de transição e, para alguns, o direito às regras antigas. Ajudamos você a descobrir qual caminho existe no seu caso, com o seu histórico de contribuições em mãos.',
  mensagemWhats: 'Olá, vim pelo site e gostaria de tirar dúvidas sobre a minha aposentadoria.',

  passos: [
    { titulo: 'Análise do seu histórico', descricao: 'Conferimos o seu extrato do INSS (CNIS) e a carteira de trabalho, procurando períodos que faltam ou estão errados.' },
    { titulo: 'Comparação das regras', descricao: 'Verificamos em quais regras você se encaixa — nova, de transição ou anterior à Reforma — e explicamos as diferenças entre elas.' },
    { titulo: 'Pedido e acompanhamento', descricao: 'Orientamos o pedido no INSS e, quando for o caso, o recurso ou a via judicial, mantendo você informado em cada etapa.' },
  ],

  oQueETitulo: 'Como funciona a aposentadoria depois da Reforma?',
  oQueEQuote: 'Quem já contribuía antes da Reforma costuma ter mais de um caminho. O importante é saber qual.',
  oQueEParagrafos: [
    'A <strong>Reforma da Previdência</strong> (Emenda Constitucional 103/2019) entrou em vigor em <strong>13/11/2019</strong> e mudou as regras da aposentadoria do INSS. Para quem começou a contribuir depois dessa data, a regra é a <strong>aposentadoria por idade</strong>: <strong>62 anos para a mulher e 65 anos para o homem</strong>, com tempo mínimo de contribuição.',
    'Quem <strong>já contribuía antes da Reforma</strong> tem as chamadas <strong>regras de transição</strong>, que combinam idade, tempo de contribuição e, em alguns casos, pontos ou um tempo adicional (o "pedágio"). A antiga <strong>aposentadoria por tempo de contribuição</strong> continua possível por esse caminho.',
    'E quem <strong>já tinha cumprido todos os requisitos até 13/11/2019</strong> tem <strong>direito adquirido</strong>: pode se aposentar pelas regras antigas a qualquer tempo, mesmo que ainda não tenha feito o pedido. Cada regra leva a um cálculo de valor diferente — por isso vale comparar antes de pedir.',
  ],

  destaqueLegal: {
    titulo: 'Já tinha o tempo antes da Reforma? As regras antigas podem valer para você',
    texto:
      'A própria Emenda da Reforma assegura a aposentadoria pelas regras anteriores a quem <strong>cumpriu os requisitos até a data em que ela entrou em vigor</strong>, a qualquer tempo. Para quem ainda não tinha completado, ela criou <strong>regras de transição</strong> — por exemplo, a soma de idade e tempo de contribuição (pontos), que em <strong>2026 é de 93 pontos para a mulher e 103 para o homem</strong>, com 30 e 35 anos de contribuição, respectivamente. Os números sobem a cada ano.',
    fonte: 'Emenda Constitucional nº 103/2019, arts. 3º, 15 a 20 (planalto.gov.br).',
  },

  requisitosTitulo: 'Quem pode se aposentar hoje?',
  requisitosDisclaimer: 'Requisitos sujeitos à análise do INSS. Os números das regras de transição mudam a cada ano, e cada histórico de contribuição tem detalhes que fazem diferença.',
  requisitos: [
    {
      titulo: 'Por idade — quem começou a contribuir depois da Reforma',
      descricao: '62 anos de idade e 15 anos de contribuição, para a mulher; 65 anos de idade e 20 anos de contribuição, para o homem.',
    },
    {
      titulo: 'Por idade — quem já contribuía antes da Reforma',
      descricao: '62 anos para a mulher e 65 anos para o homem, com 15 anos de contribuição para ambos — o tempo mínimo exigido do homem, nessa regra de transição, é menor.',
    },
    {
      titulo: 'Por tempo de contribuição — regras de transição',
      descricao: 'Para quem já contribuía antes de 13/11/2019: 30 anos de contribuição (mulher) ou 35 anos (homem), combinados com pontos, idade mínima progressiva ou pedágio, conforme a regra. Em 2026, a idade mínima progressiva é de 59 anos e meio para a mulher e 64 anos e meio para o homem.',
    },
    {
      titulo: 'Direito adquirido — quem completou tudo até 13/11/2019',
      descricao: 'Se você já tinha cumprido os requisitos de uma aposentadoria até a data da Reforma, pode se aposentar pelas regras antigas, mesmo pedindo agora. Muitas pessoas não sabem que estão nessa situação.',
      destaque: true,
    },
  ],

  documentosTitulo: 'Quais documentos ajudam a comprovar o seu tempo?',
  documentosIntro: 'Quanto mais completo o histórico, mais segura é a comparação entre as regras.',
  documentos: [
    { titulo: 'CPF e RG ou CNH', descricao: 'Documentos pessoais do segurado' },
    { titulo: 'CNIS · Extrato INSS', descricao: 'Todos os vínculos e contribuições registrados' },
    { titulo: 'Carteiras de trabalho', descricao: 'Todas, inclusive as antigas e as de papel' },
    { titulo: 'Carnês e guias pagas', descricao: 'Dos períodos como autônomo ou facultativo' },
    { titulo: 'PPP e laudos, se houver', descricao: 'De trabalho exposto a ruído, calor ou químicos' },
    { titulo: 'Prova de trabalho rural', descricao: 'Se trabalhou na roça ou na pesca em algum período' },
  ],


  faqTitulo: 'Quais são as dúvidas mais comuns sobre a aposentadoria?',
  faq: [
    { pergunta: 'A aposentadoria por tempo de contribuição acabou?', resposta: 'Para quem começou a contribuir depois de 13/11/2019, sim: a regra passou a ser a aposentadoria por idade. Quem já contribuía antes da Reforma ainda pode se aposentar por tempo de contribuição pelas regras de transição, e quem completou os requisitos até essa data tem direito adquirido às regras antigas.' },
    { pergunta: 'Qual a idade mínima para se aposentar pelo INSS?', resposta: 'Na regra por idade, 62 anos para a mulher e 65 anos para o homem. Nas regras de transição por tempo de contribuição, a idade varia conforme a regra e o ano; algumas delas nem exigem idade mínima, mas exigem pontos ou um tempo adicional de contribuição.' },
    { pergunta: 'Quanto tempo de contribuição eu preciso?', resposta: 'Na aposentadoria por idade, 15 anos para a mulher. Para o homem, 15 anos se já contribuía antes da Reforma, ou 20 anos se começou a contribuir depois dela. Nas regras de transição por tempo de contribuição, são 30 anos (mulher) e 35 anos (homem), além dos demais requisitos de cada regra.' },
    { pergunta: 'O que é direito adquirido na aposentadoria?', resposta: 'É o direito de quem já tinha cumprido todos os requisitos de uma aposentadoria até 13/11/2019 de se aposentar pelas regras antigas, mesmo pedindo depois. Está previsto no art. 3º da Emenda Constitucional 103/2019.' },
    { pergunta: 'O que são as regras de transição?', resposta: 'São regras criadas pela Reforma para quem já contribuía antes de 13/11/2019. Há a regra de pontos (idade somada ao tempo de contribuição), a da idade mínima progressiva e as regras com pedágio de 50% ou de 100% do tempo que faltava na data da Reforma. Uma mesma pessoa pode se encaixar em mais de uma.' },
    { pergunta: 'Qual regra é melhor para mim?', resposta: 'Depende do seu histórico. Cada regra tem uma forma de cálculo, e o valor da aposentadoria acompanha você pelo resto da vida. Por isso, o ideal é comparar os cenários possíveis antes de fazer o pedido.' },
    { pergunta: 'Meu CNIS está com períodos faltando. O que fazer?', resposta: 'É comum o extrato do INSS ter vínculos sem data de saída, salários errados ou períodos faltando. Com a carteira de trabalho, contracheques ou outros documentos da época, é possível pedir a correção, o que pode mudar o tempo reconhecido e a regra em que você se encaixa.' },
    { pergunta: 'Tempo de trabalho rural ou em atividade insalubre conta?', resposta: 'Pode contar, com regras próprias. O trabalho rural anterior à Lei 8.213/91 pode ser contado mesmo sem contribuição, exceto para a carência; e o tempo em atividade especial trabalhado até 13/11/2019 pode ser convertido em tempo comum com acréscimo. Tudo depende da prova, por isso cada caso é analisado com os documentos.' },
    { pergunta: 'Posso continuar trabalhando depois de aposentado?', resposta: 'Na aposentadoria por idade e na por tempo de contribuição, sim: a lei não impede que o aposentado continue trabalhando. A regra é diferente na aposentadoria especial.' },
    { pergunta: 'Meu pedido de aposentadoria foi negado. Ainda tenho chance?', resposta: 'Uma negativa não encerra o assunto. É possível entender o motivo do indeferimento — muitas vezes um período que o INSS não reconheceu — e avaliar o recurso administrativo ou a via judicial.' },
  ],

  sobreTexto:
    'Especialistas em Direito Previdenciário, com sede em Tubarão/SC e atendimento em todo o Brasil. Você acompanha cada etapa do processo com transparência.',
  // Sem "+X anos"/"+10.000" nas LPs novas (trava OAB da skill comercial-nova-lp).
  stats: [
    { value: 'Tubarão', label: 'sede no Sul de SC' },
    { value: 'Brasil', label: 'atendimento em todo o país' },
  ],
};
