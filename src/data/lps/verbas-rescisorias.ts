import type { LandingData } from '../types';

const base = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');

export const verbasRescisorias: LandingData = {
  slug: 'verbas-rescisorias',
  seoTitle: 'Verbas Rescisórias: o que Você Recebe na Demissão | SC',
  seoDescription:
    'Demitido, pediu demissão ou fez acordo? Veja o que recebe em cada tipo de saída, o prazo de 10 dias para o pagamento e o FGTS. Advogados trabalhistas em SC.',
  keywords: [
    'verbas rescisórias', 'o que recebo na demissão', 'acerto da demissão',
    'demissão sem justa causa direitos', 'pedido de demissão direitos', 'acordo trabalhista 484-A',
    'multa do art. 477', 'multa de 40% do FGTS', 'advogado trabalhista SC', 'advogado trabalhista Tubarão',
  ],

  heroEyebrow: 'VERBAS RESCISÓRIAS · CLT',
  heroHeadline: 'Saiu do emprego?<br>Confira o que é seu',
  heroSub:
    'O acerto da saída muda conforme o jeito que o contrato terminou: demissão sem justa causa, pedido de demissão, justa causa, acordo ou rescisão indireta. Entenda o que você deve receber, em que prazo, e o que fazer se veio a menos ou atrasado.',
  mensagemWhats: 'Olá, vim pelo site e gostaria de tirar dúvidas sobre as verbas da minha rescisão.',

  passos: [
    { titulo: 'Análise do seu acerto', descricao: 'Conferimos o termo de rescisão, os contracheques e o extrato do FGTS para ver se o que foi pago corresponde ao seu tipo de saída.' },
    { titulo: 'Orientação do caminho', descricao: 'Explicamos o que ficou faltando, quais documentos reunir e como funciona a cobrança na Justiça do Trabalho.' },
    { titulo: 'Acompanhamento', descricao: 'Acompanhamos cada etapa do processo e mantemos você informado.' },
  ],

  oQueETitulo: 'O que são verbas rescisórias?',
  oQueEQuote: 'O fim do contrato tem regras. O acerto também.',
  oQueEParagrafos: [
    '<strong>Verbas rescisórias</strong> são os valores que a empresa precisa pagar quando o contrato de trabalho termina: saldo de salário, aviso prévio, férias com 1/3, 13º proporcional e, conforme o caso, o saque do <strong>FGTS</strong> com a multa de 40%.',
    'O que entra no acerto depende do <strong>tipo de saída</strong>. Quem é dispensado sem justa causa recebe mais itens do que quem pede demissão; no acordo, alguns valores caem pela metade; na justa causa, sobra bem pouco. Por isso vale conferir item por item.',
    `Se além do acerto ficaram de fora <a href="${base}/trabalhista-geral/">horas extras ou adicionais</a>, ou se você trabalhou <a href="${base}/reconhecimento-de-vinculo/">sem carteira assinada</a>, isso também pode ser cobrado.`,
  ],

  destaqueLegal: {
    titulo: 'A empresa tem até 10 dias para pagar o acerto',
    texto:
      'A lei manda a empresa pagar as verbas rescisórias e entregar os documentos da saída <strong>em até 10 dias</strong> contados do fim do contrato. Se atrasar, deve ao trabalhador uma <strong>multa equivalente a um salário</strong> — salvo se foi o próprio trabalhador quem causou o atraso. E atenção ao prazo para cobrar: são até <strong>2 anos</strong> depois da saída para entrar com a reclamação, alcançando os últimos <strong>5 anos</strong> de contrato.',
    fonte: 'CLT, art. 477, §§ 6º e 8º; Constituição Federal, art. 7º, XXIX; CLT, art. 11.',
  },

  requisitosTitulo: 'O que você recebe em cada tipo de saída?',
  requisitosDisclaimer: 'Resumo das regras gerais da CLT. Convenções coletivas, tempo de casa e detalhes do contrato podem mudar o cálculo — a análise individual confere o seu caso.',
  requisitos: [
    {
      titulo: 'Demissão sem justa causa',
      descricao: 'Saldo de salário, aviso prévio (30 dias, mais 3 por ano de casa, até 90), férias vencidas e proporcionais com 1/3, 13º proporcional, saque do FGTS com multa de 40% e, cumpridos os requisitos, acesso ao seguro-desemprego.',
    },
    {
      titulo: 'Pedido de demissão',
      descricao: 'Saldo de salário, férias vencidas e proporcionais com 1/3 e 13º proporcional. Não há multa de 40%, saque do FGTS nem seguro-desemprego — e, se o aviso prévio não for cumprido, a empresa pode descontá-lo.',
    },
    {
      titulo: 'Demissão por justa causa',
      descricao: 'Em regra, só o saldo de salário e as férias vencidas com 1/3. Mas a justa causa precisa de um motivo previsto em lei: aplicada sem motivo ou sem prova, pode ser discutida na Justiça do Trabalho.',
    },
    {
      titulo: 'Acordo entre empregado e empresa',
      descricao: 'Na saída por acordo, metade do aviso prévio indenizado e metade da multa do FGTS (20%); as demais verbas são pagas por inteiro. Permite sacar até 80% do FGTS, mas não dá acesso ao seguro-desemprego.',
    },
    {
      titulo: 'Rescisão indireta',
      descricao: 'Quando a empresa comete falta grave — como deixar de pagar salários ou exigir serviço fora do combinado —, o trabalhador pode pedir na Justiça o fim do contrato com os mesmos direitos de uma demissão sem justa causa.',
      destaque: true,
    },
  ],

  documentosTitulo: 'Documentos para conferir o seu acerto',
  documentos: [
    { titulo: 'Termo de rescisão (TRCT)', descricao: 'O documento com os valores pagos na saída' },
    { titulo: 'CTPS (física ou digital)', descricao: 'Datas de entrada, saída e salário anotados' },
    { titulo: 'Contracheques / holerites', descricao: 'De preferência os dos últimos meses' },
    { titulo: 'Extrato do FGTS', descricao: 'Para conferir depósitos e a multa' },
    { titulo: 'Aviso de dispensa ou pedido', descricao: 'A carta ou mensagem que formalizou a saída' },
    { titulo: 'RG e CPF', descricao: 'Documentos pessoais do trabalhador' },
  ],


  faqTitulo: 'Dúvidas sobre verbas rescisórias',
  faq: [
    { pergunta: 'Qual o prazo para a empresa pagar a rescisão?', resposta: 'Até 10 dias contados do fim do contrato, qualquer que seja o tipo de saída. No mesmo prazo, a empresa deve entregar os documentos que comprovam a comunicação da saída aos órgãos competentes.' },
    { pergunta: 'E se a empresa atrasar o pagamento?', resposta: 'A CLT prevê uma multa a favor do trabalhador no valor de um salário, além da multa administrativa. Ela só não é devida quando foi o próprio trabalhador quem deu causa ao atraso.' },
    { pergunta: 'Quando tenho direito à multa de 40% do FGTS?', resposta: 'Na demissão sem justa causa e na rescisão indireta reconhecida. No acordo entre as partes, a multa cai para 20%. No pedido de demissão e na justa causa, não há multa.' },
    { pergunta: 'Quem pediu demissão recebe o quê?', resposta: 'Saldo de salário, férias vencidas e proporcionais com o terço constitucional e 13º proporcional. Não há saque do FGTS, multa de 40% nem seguro-desemprego. Se o aviso prévio não for cumprido, a empresa pode descontar o valor correspondente.' },
    { pergunta: 'Fui demitido por justa causa. Perco tudo?', resposta: 'Não tudo: em regra, recebe o saldo de salário e as férias vencidas com 1/3. E a justa causa só vale com um motivo previsto em lei e comprovado pela empresa. Se não foi assim, ela pode ser revertida na Justiça do Trabalho.' },
    { pergunta: 'Como funciona a demissão por acordo?', resposta: 'É a saída combinada entre empregado e empresa, prevista no art. 484-A da CLT. O aviso prévio indenizado e a multa do FGTS são pagos pela metade, as demais verbas por inteiro, e é possível sacar até 80% do FGTS. Nessa modalidade não há seguro-desemprego.' },
    { pergunta: 'Tenho direito ao seguro-desemprego?', resposta: 'Ele é para quem foi dispensado sem justa causa, inclusive na rescisão indireta, e depende de um tempo mínimo de salários recebidos antes da dispensa. Quem pede demissão, sai por justa causa ou por acordo não tem acesso. Orientamos você sobre como fazer o pedido.' },
    { pergunta: 'Como é calculado o aviso prévio?', resposta: 'São 30 dias para quem tem até 1 ano na empresa, com mais 3 dias por ano de serviço, até o limite de 90 dias. Quando é indenizado, as horas extras habituais também entram no cálculo.' },
    { pergunta: 'Assinei o termo de rescisão. Ainda posso cobrar?', resposta: 'Em regra, a quitação vale para as parcelas e os valores que estão discriminados no termo. Se algo ficou de fora ou foi pago a menos, ainda pode ser cobrado, dentro do prazo. Vale conferir com calma.' },
    { pergunta: 'Até quando posso cobrar o que faltou?', resposta: 'Até 2 anos depois da saída para entrar com a reclamação trabalhista, alcançando os créditos dos últimos 5 anos. Quanto mais cedo a análise, menos direitos ficam pelo caminho.' },
  ],

  sobreTexto:
    'Especialistas em Direito do Trabalho e Previdenciário, com sede em Tubarão/SC e atendimento em todo o Brasil. Você acompanha cada etapa do processo com transparência.',
  // Sem "+X anos"/"+10.000" nas LPs novas (trava OAB da skill comercial-nova-lp).
  stats: [
    { value: 'Tubarão', label: 'sede no Sul de SC' },
    { value: 'Brasil', label: 'atendimento em todo o país' },
  ],
};
