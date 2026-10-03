import type { LandingData } from '../types';

export const revisaoDeBeneficio: LandingData = {
  slug: 'revisao-de-beneficio',
  seoTitle: 'Revisão de Aposentadoria do INSS em SC | Ramon Antonio',
  seoDescription:
    'Sua aposentadoria veio menor do que deveria? Entenda quando cabe a revisão do benefício do INSS, o prazo de 10 anos e o que conferir. Advogados em Tubarão/SC.',
  keywords: [
    'revisão de aposentadoria', 'revisão de benefício INSS', 'revisão de aposentadoria INSS',
    'aposentadoria com valor errado', 'prazo para revisão de aposentadoria', 'tempo especial não reconhecido',
    'advogado revisão de aposentadoria SC', 'advogado previdenciário Tubarão', 'advogado previdenciário Joinville',
  ],

  heroEyebrow: 'REVISÃO DE BENEFÍCIO · INSS',
  heroHeadline: 'Sua aposentadoria veio<br>menor do que deveria?',
  heroSub:
    'Tempo que ficou de fora, salário lançado errado, atividade especial ou rural não reconhecida: erros na concessão acontecem e podem ser revistos dentro do prazo da lei. Conferimos o seu benefício com calma, antes de qualquer pedido.',
  mensagemWhats: 'Olá, vim pelo site e gostaria de tirar dúvidas sobre a revisão do meu benefício.',

  passos: [
    { titulo: 'Análise do seu caso', descricao: 'Conferimos a carta de concessão, o CNIS e o cálculo do INSS para identificar o que pode ter ficado de fora.' },
    { titulo: 'Orientação do caminho', descricao: 'Explicamos se a revisão compensa no seu caso — inclusive quando não vale a pena pedir — e quais provas reunir.' },
    { titulo: 'Acompanhamento', descricao: 'Acompanhamos o pedido no INSS ou, quando for o caso, na via judicial, e mantemos você informado.' },
  ],

  oQueETitulo: 'O que é a revisão de benefício?',
  oQueEQuote: 'Conferir a conta antes de aceitar que o valor é esse para sempre.',
  oQueEParagrafos: [
    'A <strong>revisão de benefício</strong> é o pedido para o INSS — ou a Justiça — <strong>corrigir o cálculo</strong> de uma aposentadoria, pensão ou outro benefício já concedido. Demonstrado o erro, o valor mensal pode ser recalculado e as diferenças dos <strong>últimos 5 anos</strong> podem ser pagas.',
    'Os pontos que mais analisamos: <strong>tempo especial</strong> (ruído, calor, poeira, produtos químicos) que não foi reconhecido; <strong>tempo rural</strong> que ficou fora da conta; <strong>vínculos e salários que não aparecem no CNIS</strong> ou aparecem errados; e a aplicação de uma regra menos vantajosa do que aquela a que você já tinha direito.',
    'Nem toda revisão compensa: em alguns casos o recálculo não muda o valor ou não é vantajoso. Por isso a análise vem <strong>antes</strong> do pedido — para você decidir com segurança.',
  ],

  destaqueLegal: {
    titulo: 'Existe prazo para pedir a revisão?',
    texto:
      'Sim. A lei dá <strong>10 anos</strong> para pedir a revisão do ato de concessão, contados a partir do <strong>primeiro dia do mês seguinte ao recebimento da primeira prestação</strong>. Passado esse prazo, o direito de revisar se perde (decadência). E, mesmo dentro dele, as diferenças em atraso alcançam apenas os <strong>últimos 5 anos</strong> (prescrição). Por isso vale conferir o benefício o quanto antes.',
    fonte: 'Lei nº 8.213/91, art. 103, caput e inciso I (decadência de 10 anos), e parágrafo único (prescrição de 5 anos).',
  },

  requisitosTitulo: 'Quando a revisão pode ser pedida?',
  requisitosDisclaimer: 'Cada benefício tem um histórico próprio. Só a análise do cálculo mostra se a revisão compensa no seu caso.',
  requisitos: [
    {
      titulo: 'Benefício concedido há menos de 10 anos',
      descricao: 'O prazo de decadência conta a partir do mês seguinte ao primeiro pagamento. Em regra, benefícios mais antigos já não podem ter o ato de concessão revisto.',
    },
    {
      titulo: 'Tempo especial ou rural que ficou de fora',
      descricao: 'Trabalho exposto a ruído, calor, poeira ou agentes químicos, ou na roça, que não foi reconhecido na concessão. A conversão de tempo especial em comum vale para períodos até 13/11/2019.',
    },
    {
      titulo: 'Vínculos ou salários errados no CNIS',
      descricao: 'Empregos que não aparecem no sistema, períodos faltando ou salários lançados a menor reduzem o tempo e a média usados no cálculo.',
    },
    {
      titulo: 'Direito a uma regra mais vantajosa',
      descricao: 'Se antes do pedido você já tinha cumprido os requisitos de uma regra que resultaria em valor maior, o STF reconhece o direito ao cálculo mais favorável (Tema 334), respeitado o prazo de 10 anos.',
      destaque: true,
    },
  ],

  documentosTitulo: 'Quais documentos ajudam a conferir o benefício?',
  documentos: [
    { titulo: 'Carta de concessão', descricao: 'Mostra o cálculo e o tempo que o INSS considerou' },
    { titulo: 'Processo administrativo', descricao: 'Cópia integral do pedido, pelo Meu INSS' },
    { titulo: 'CNIS · Extrato INSS', descricao: 'Vínculos, salários e contribuições registrados' },
    { titulo: 'Carteiras de trabalho', descricao: 'Todas, inclusive as mais antigas' },
    { titulo: 'PPP e laudos', descricao: 'Comprovam a exposição a agentes nocivos' },
    { titulo: 'Provas do trabalho rural', descricao: 'Notas, certidões e declarações da época' },
  ],

  faqTitulo: 'Dúvidas sobre a revisão de benefício',
  faq: [
    { pergunta: 'O que é a revisão de aposentadoria?', resposta: 'É o pedido para corrigir o cálculo de um benefício já concedido pelo INSS, quando algum tempo, salário ou regra foi considerado de forma errada. Pode ser feito no próprio INSS ou na Justiça.' },
    { pergunta: 'Qual é o prazo para pedir a revisão?', resposta: 'Em regra, 10 anos, contados a partir do primeiro dia do mês seguinte ao recebimento da primeira prestação do benefício. Depois disso, o direito de revisar o ato de concessão se perde (decadência).' },
    { pergunta: 'Se a revisão for reconhecida, os valores atrasados são pagos?', resposta: 'As diferenças podem ser pagas, mas alcançam apenas os 5 anos anteriores ao pedido (prescrição). Valores mais antigos que isso não são recuperados.' },
    { pergunta: 'A revisão pode não valer a pena?', resposta: 'Pode. Há casos em que o recálculo não muda o valor ou não é vantajoso — por exemplo, quando corrigir um período altera a regra aplicada. Por isso fazemos a conta antes de qualquer pedido, e você decide com a informação completa.' },
    { pergunta: 'Trabalhei com ruído ou produto químico. Isso conta?', resposta: 'Pode contar. O período em atividade especial, comprovado por PPP e laudos, pode ser convertido em tempo comum com acréscimo, para o trabalho exercido até 13/11/2019, data da Reforma da Previdência. Se esse tempo não foi reconhecido na concessão, pode ser motivo de revisão.' },
    { pergunta: 'E o tempo na roça antes da carteira assinada?', resposta: 'O trabalho rural pode ser reconhecido com documentos da época — como notas, certidões e declarações —, complementados por testemunhas; só testemunhas não bastam. Se esse período ficou fora da conta, pode justificar a revisão.' },
    { pergunta: 'Meu CNIS tem empregos faltando. O que fazer?', resposta: 'Vínculos e salários podem ser incluídos ou corrigidos com carteira de trabalho, contracheques, termos de rescisão e outros documentos. Quando isso muda o tempo ou a média, pode alterar o valor do benefício.' },
    { pergunta: 'A revisão da vida toda ainda é possível?', resposta: 'Não. Em 2024, ao julgar as ADIs 2.110 e 2.111, o STF decidiu que a regra de cálculo da Lei 9.876/99 é obrigatória, e em novembro de 2025, ao julgar os embargos no Tema 1.102, cancelou a tese de 2022 que permitia a revisão: o segurado não pode optar pela regra que incluiria os salários anteriores a julho de 1994. Quem recebeu valores por decisão judicial, definitiva ou provisória, até 5 de abril de 2024 não precisa devolvê-los.' },
    { pergunta: 'Pensão e outros benefícios também podem ser revisados?', resposta: 'Sim. A revisão vale para os benefícios do INSS em geral — aposentadorias, pensões e auxílios —, sempre respeitando o prazo de 10 anos.' },
    { pergunta: 'Como saber se o meu benefício tem erro?', resposta: 'O primeiro passo é comparar a carta de concessão com o CNIS e com a sua história de trabalho: empregos, períodos especiais ou rurais e salários. Fazemos essa conferência e explicamos, em linguagem simples, o que encontramos.' },
  ],

  sobreTexto:
    'Especialistas em Direito Previdenciário, com sede em Tubarão/SC e atendimento em todo o Brasil. Você acompanha cada etapa do processo com transparência.',
  // Sem "+X anos"/"+10.000" nas LPs novas (trava OAB da skill comercial-nova-lp).
  stats: [
    { value: 'Tubarão', label: 'sede no Sul de SC' },
    { value: 'Brasil', label: 'atendimento em todo o país' },
  ],
};
