import type { LandingData } from '../types';

export const planejamentoPrevidenciario: LandingData = {
  slug: 'planejamento-previdenciario',
  seoTitle: 'Planejamento de Aposentadoria em SC | Ramon Antonio',
  seoDescription:
    'Quando você pode se aposentar e por qual regra? Conferimos seu CNIS, simulamos as regras de transição e explicamos cada caminho. Advogados em Tubarão/SC.',
  keywords: [
    'planejamento de aposentadoria', 'planejamento previdenciário', 'quando posso me aposentar',
    'simulação de aposentadoria', 'análise do CNIS', 'contribuição em atraso INSS',
    'complementação MEI INSS', 'advogado previdenciário Tubarão', 'advogado previdenciário Vale do Itajaí',
  ],

  heroEyebrow: 'PLANEJAMENTO PREVIDENCIÁRIO · INSS',
  heroHeadline: 'Quando e como você<br>pode se aposentar?',
  heroSub:
    'Depois da Reforma da Previdência, há mais de uma regra possível — e cada uma leva a uma data e a um valor diferentes. O planejamento confere o seu histórico e mostra os caminhos antes do pedido, quando ainda dá para ajustar.',
  mensagemWhats: 'Olá, vim pelo site e gostaria de tirar dúvidas sobre o planejamento da minha aposentadoria.',

  passos: [
    { titulo: 'Análise do seu histórico', descricao: 'Conferimos o seu CNIS, carteiras e carnês para montar o histórico completo de contribuições.' },
    { titulo: 'Simulação das regras', descricao: 'Comparamos as regras de transição e explicamos, em linguagem simples, quando e por qual regra o pedido faz mais sentido.' },
    { titulo: 'Acompanhamento', descricao: 'Orientamos a correção de pendências antes do pedido e acompanhamos cada etapa.' },
  ],

  oQueETitulo: 'O que é o planejamento previdenciário?',
  oQueEQuote: 'A aposentadoria é uma decisão que acompanha você pelo resto da vida.',
  oQueEParagrafos: [
    'O <strong>planejamento previdenciário</strong> é uma análise feita <strong>antes</strong> de pedir a aposentadoria: conferimos todo o seu histórico de contribuições, apontamos o que precisa ser corrigido e simulamos as regras possíveis para mostrar <strong>quando</strong> e <strong>como</strong> o pedido faz mais sentido.',
    'Isso importa porque, depois da <strong>Reforma da Previdência (EC 103/2019)</strong>, quem já contribuía antes de 13/11/2019 pode se enquadrar em mais de uma <strong>regra de transição</strong>, cada uma com exigências e cálculo próprios. Pedir pela regra menos vantajosa — ou antes da hora — pode significar um valor menor por toda a aposentadoria.',
    'No caminho, é comum encontrar <strong>pendências no CNIS</strong>, períodos especiais ou rurais que precisam de prova e <strong>contribuições pagas em atraso ou abaixo do mínimo</strong>. Resolver isso antes do pedido costuma ser mais simples do que depois.',
  ],

  destaqueLegal: {
    titulo: 'Quais são as regras de transição da Reforma?',
    texto:
      'Para quem já contribuía antes de 13/11/2019, a Emenda Constitucional 103 criou caminhos alternativos: <strong>pontos</strong> (idade somada ao tempo de contribuição, com pontuação que sobe a cada ano até 100 para mulheres e 105 para homens); <strong>idade mínima progressiva</strong> (que sobe seis meses por ano até 62 anos para mulheres e 65 para homens); <strong>pedágio de 50%</strong> e <strong>pedágio de 100%</strong> sobre o tempo que faltava em 2019; e a <strong>aposentadoria por idade</strong> de transição. Com exceção desta última, todas exigem 30 anos de contribuição (mulher) ou 35 anos (homem).',
    fonte: 'Emenda Constitucional nº 103/2019, arts. 15, 16, 17, 18 e 20 (regras de transição) e art. 26 (cálculo).',
  },

  requisitosTitulo: 'Para quem o planejamento faz sentido?',
  requisitosDisclaimer: 'Cada histórico de contribuições é único. A simulação mostra os caminhos possíveis no seu caso; a decisão é sempre sua.',
  requisitos: [
    {
      titulo: 'Quem está a poucos anos de se aposentar',
      descricao: 'É a fase em que as regras de transição se cruzam: esperar alguns meses ou escolher outra regra pode mudar a data e o valor do benefício.',
    },
    {
      titulo: 'Quem tem períodos especiais ou rurais',
      descricao: 'Trabalho com ruído, calor ou agentes químicos, ou na roça, precisa de prova — como PPP e documentos da época. A conversão de tempo especial em comum vale para períodos até 13/11/2019.',
    },
    {
      titulo: 'Autônomos, MEIs e contribuições em atraso',
      descricao: 'Mês pago abaixo do mínimo não conta como tempo, mas pode ser complementado ou agrupado. Quem contribuiu pelo plano simplificado (5% ou 11%) precisa complementar até 20% para usar esse tempo na aposentadoria por tempo de contribuição.',
    },
    {
      titulo: 'Quem tem lacunas ou erros no CNIS',
      descricao: 'Empregos que não aparecem, salários lançados a menor e períodos sem contribuição mudam a conta. Corrigir antes do pedido ajuda a evitar uma negativa ou um cálculo menor.',
      destaque: true,
    },
  ],

  documentosTitulo: 'Quais documentos usamos no planejamento?',
  documentos: [
    { titulo: 'CNIS · Extrato INSS', descricao: 'Ponto de partida: vínculos e contribuições' },
    { titulo: 'Carteiras de trabalho', descricao: 'Todas, inclusive as mais antigas' },
    { titulo: 'Carnês e guias (GPS/DAS)', descricao: 'Períodos como autônomo, MEI ou facultativo' },
    { titulo: 'PPP e laudos', descricao: 'Para períodos em atividade especial' },
    { titulo: 'Documentos rurais', descricao: 'Notas, certidões e declarações da época' },
    { titulo: 'RG e CPF', descricao: 'Documentos pessoais' },
  ],

  faqTitulo: 'Dúvidas sobre o planejamento da aposentadoria',
  faq: [
    { pergunta: 'O que é planejamento previdenciário?', resposta: 'É a análise do seu histórico de contribuições feita antes de pedir a aposentadoria, para corrigir pendências e simular as regras possíveis. O objetivo é mostrar quando e por qual regra o pedido faz mais sentido no seu caso.' },
    { pergunta: 'Quando vale a pena fazer o planejamento?', resposta: 'O ideal é alguns anos antes da data provável da aposentadoria, quando ainda há tempo de corrigir o CNIS, reunir provas de tempo especial ou rural e ajustar contribuições. Mas ele é útil em qualquer momento antes do pedido.' },
    { pergunta: 'Quais são as regras de transição?', resposta: 'Para quem já contribuía antes de 13/11/2019: pontos (idade somada ao tempo de contribuição), idade mínima progressiva, pedágio de 50%, pedágio de 100% e a aposentadoria por idade de transição. Cada uma tem exigências e cálculo próprios, e a mesma pessoa pode se encaixar em mais de uma.' },
    { pergunta: 'Comecei a contribuir depois da Reforma. Qual é a regra?', resposta: 'Para quem se filiou ao INSS depois de 13/11/2019, a regra geral exige 62 anos de idade e 15 anos de contribuição para mulheres, e 65 anos de idade e 20 anos de contribuição para homens.' },
    { pergunta: 'Como é calculado o valor da aposentadoria?', resposta: 'Em regra, pela média de todos os salários de contribuição desde julho de 1994. Nas regras de pontos, idade mínima progressiva e idade, o valor parte de 60% dessa média e sobe 2 pontos percentuais por ano de contribuição acima de 15 anos (mulheres) ou 20 anos (homens). No pedágio de 100%, corresponde a 100% da média; no pedágio de 50%, aplica-se o fator previdenciário.' },
    { pergunta: 'Paguei o INSS como autônomo com atraso. Isso conta?', resposta: 'Pode contar como tempo de contribuição, mas contribuições pagas com atraso, referentes a meses anteriores ao primeiro pagamento em dia, não contam para a carência. Períodos muito antigos podem exigir indenização ao INSS e prova de que a atividade foi exercida. Vale analisar antes de pagar qualquer guia.' },
    { pergunta: 'Contribuí como MEI. Preciso complementar?', resposta: 'Depende do objetivo. A contribuição do MEI (5%) conta para a aposentadoria por idade, mas, para usar esse tempo na aposentadoria por tempo de contribuição, é preciso complementar até 20%, com juros. A simulação mostra se a complementação compensa.' },
    { pergunta: 'Paguei sobre menos de um salário mínimo em alguns meses. E agora?', resposta: 'Desde a Reforma, o mês com contribuição abaixo do mínimo não conta como tempo de contribuição. A lei permite complementar a diferença, usar o excedente de outro mês ou agrupar contribuições — ajustes feitos dentro do mesmo ano civil.' },
    { pergunta: 'Posso tirar da média as contribuições baixas?', resposta: 'A Reforma permite excluir da média as contribuições que reduzem o valor, desde que se mantenha o tempo mínimo exigido. Mas o tempo excluído deixa de contar para qualquer finalidade, inclusive para aumentar o percentual do benefício — por isso a conta precisa ser feita com cuidado.' },
    { pergunta: 'Ainda dá para converter tempo especial em comum?', resposta: 'Sim, para o trabalho em condições especiais exercido até 13/11/2019, comprovado por PPP e laudos. Para períodos posteriores à Reforma, a conversão não é mais permitida.' },
  ],

  sobreTexto:
    'Especialistas em Direito Previdenciário, com sede em Tubarão/SC e atendimento em todo o Brasil. Você acompanha cada etapa do processo com transparência.',
  // Sem "+X anos"/"+10.000" nas LPs novas (trava OAB da skill comercial-nova-lp).
  stats: [
    { value: 'Tubarão', label: 'sede no Sul de SC' },
    { value: 'Brasil', label: 'atendimento em todo o país' },
  ],
};
