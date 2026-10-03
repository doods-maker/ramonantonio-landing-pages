import type { LandingData } from '../types';

const base = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');

export const reconhecimentoDeVinculo: LandingData = {
  slug: 'reconhecimento-de-vinculo',
  seoTitle: 'Trabalhou sem Carteira Assinada? Seus Direitos em SC',
  seoDescription:
    'Trabalhou sem registro, como PJ ou MEI, mas com chefe e horário? Veja quando a lei reconhece o vínculo de emprego e o que dá para recuperar. Atuação em SC.',
  keywords: [
    'trabalhei sem carteira assinada', 'reconhecimento de vínculo empregatício', 'vínculo de emprego',
    'pejotização', 'trabalho como PJ direitos', 'MEI com vínculo empregatício',
    'carteira assinada na Justiça', 'advogado trabalhista SC', 'advogado trabalhista Tubarão',
  ],

  heroEyebrow: 'RECONHECIMENTO DE VÍNCULO · CLT',
  heroHeadline: 'Trabalhou sem<br>carteira assinada?',
  heroSub:
    'Sem registro, como "PJ" ou com MEI aberto a pedido da empresa: se na prática você trabalhava como empregado, a lei pode reconhecer o vínculo. Entenda os requisitos, o que dá para recuperar e quais provas ajudam.',
  mensagemWhats: 'Olá, vim pelo site e gostaria de tirar dúvidas sobre trabalho sem carteira assinada.',

  passos: [
    { titulo: 'Análise do seu caso', descricao: 'Entendemos como era o seu dia a dia de trabalho — horário, ordens, pagamento — e quais provas você já tem.' },
    { titulo: 'Orientação do caminho', descricao: 'Explicamos se há sinais de vínculo de emprego, o que pode ser recuperado e como funciona o pedido na Justiça do Trabalho.' },
    { titulo: 'Acompanhamento', descricao: 'Acompanhamos cada etapa do processo e mantemos você informado.' },
  ],

  oQueETitulo: 'O que é o reconhecimento de vínculo?',
  oQueEQuote: 'Vale como o trabalho acontecia, não o nome que deram ao contrato.',
  oQueEParagrafos: [
    'O <strong>reconhecimento de vínculo</strong> é quando a Justiça do Trabalho declara que existia uma <strong>relação de emprego</strong> — mesmo sem carteira assinada — e manda registrar o período, com os direitos da CLT que deixaram de ser pagos.',
    'A lei considera nulos os atos feitos para fraudar a CLT. Por isso, contratar alguém como <strong>"PJ" ou MEI</strong> para um trabalho que, na prática, é de empregado pode ser questionado. Ao mesmo tempo, a lei admite o autônomo de verdade, e a validade da contratação como PJ está em discussão no <strong>Supremo Tribunal Federal (Tema 1.389)</strong>. É por isso que cada caso pede uma análise cuidadosa das provas.',
    `Quando o vínculo é reconhecido, também entram as <a href="${base}/verbas-rescisorias/">verbas rescisórias da saída</a> e, se houver, <a href="${base}/trabalhista-geral/">horas extras e adicionais</a>.`,
  ],

  destaqueLegal: {
    titulo: 'Os sinais que a lei usa para reconhecer o emprego',
    texto:
      'Há relação de emprego quando uma pessoa trabalha com <strong>pessoalidade</strong> (é você quem faz, não pode mandar outro no lugar), de forma <strong>não eventual</strong> (com regularidade, não um bico de vez em quando), com <strong>onerosidade</strong> (recebendo pagamento pelo trabalho) e sob <strong>subordinação</strong> (cumprindo ordens, horários e regras da empresa). Presentes esses elementos, o nome dado ao contrato não afasta os direitos.',
    fonte: 'CLT, arts. 2º, 3º, 9º e 442-B.',
  },

  requisitosTitulo: 'O que você pode recuperar com o reconhecimento?',
  requisitosDisclaimer: 'Prazo: até 2 anos após a saída para entrar com a ação, alcançando os últimos 5 anos (Constituição Federal, art. 7º, XXIX; CLT, art. 11). O pedido de anotação para fins de prova junto ao INSS não segue esse limite (CLT, art. 11, § 1º). Cada caso é analisado individualmente.',
  requisitos: [
    {
      titulo: 'Registro na carteira',
      descricao: 'Anotação do período trabalhado, com data de entrada, saída, função e salário — o primeiro passo para destravar os demais direitos.',
    },
    {
      titulo: 'FGTS do período',
      descricao: 'Os depósitos mensais de 8% que nunca foram feitos e, se a saída foi sem justa causa, a multa de 40% sobre eles.',
    },
    {
      titulo: 'Férias, 13º e acerto da saída',
      descricao: 'Férias com 1/3, 13º salário e as verbas rescisórias do tipo de saída — além de horas extras e adicionais, se houver.',
    },
    {
      titulo: 'Tempo para o INSS e a aposentadoria',
      descricao: 'O período reconhecido pode passar a contar no seu histórico previdenciário, com reflexo na aposentadoria. O INSS exige provas da época, por isso documentos e registros fazem diferença.',
      destaque: true,
    },
  ],

  documentosTitulo: 'Provas que ajudam a mostrar o vínculo',
  documentos: [
    { titulo: 'Mensagens e e-mails', descricao: 'Ordens, escalas, cobranças de horário e metas' },
    { titulo: 'Comprovantes de pagamento', descricao: 'Pix, depósitos, recibos ou extratos mensais' },
    { titulo: 'Testemunhas', descricao: 'Colegas ou clientes que viam você trabalhar' },
    { titulo: 'Crachá, uniforme e fotos', descricao: 'Sinais de que você fazia parte da equipe' },
    { titulo: 'Contrato PJ e notas fiscais', descricao: 'Se você foi contratado como PJ ou MEI' },
    { titulo: 'RG, CPF e CTPS', descricao: 'Documentos pessoais e carteira de trabalho' },
  ],


  faqTitulo: 'Dúvidas sobre trabalho sem carteira assinada',
  faq: [
    { pergunta: 'Trabalhei sem carteira assinada. Tenho direitos?', resposta: 'Se o trabalho reunia os elementos de um emprego — pessoalidade, regularidade, pagamento e subordinação —, a Justiça do Trabalho pode reconhecer o vínculo. A partir daí, são devidos os direitos da CLT do período, como FGTS, férias e 13º.' },
    { pergunta: 'Sou PJ ou MEI, mas tinha chefe e horário. Pode ser vínculo?', resposta: 'Pode. O que importa é como o trabalho acontecia, não o nome do contrato. Mas a lei também admite o autônomo de verdade, e a contratação como PJ está em discussão no Supremo Tribunal Federal (Tema 1.389). Por isso, cada caso precisa ser analisado com cuidado.' },
    { pergunta: 'Que provas eu preciso reunir?', resposta: 'Mensagens com ordens e horários, comprovantes de pagamento, fotos, crachá, e-mails e testemunhas que viam você trabalhar. Quanto mais provas da época, melhor.' },
    { pergunta: 'Só testemunhas bastam?', resposta: 'Testemunhas ajudam bastante na Justiça do Trabalho. Mas, para o tempo contar no INSS, a lei exige também algum documento da época (início de prova material). Por isso vale guardar tudo o que tiver.' },
    { pergunta: 'Faço bicos de vez em quando. Isso é vínculo?', resposta: 'Em regra, trabalho esporádico não forma vínculo de emprego, porque falta a regularidade. Quando o serviço é contínuo, com dias certos e ordens a cumprir, a situação muda. A análise do caso indica de que lado você está.' },
    { pergunta: 'O que eu recupero se o vínculo for reconhecido?', resposta: 'O registro do período na carteira, os depósitos de FGTS, férias com 1/3, 13º salário e as verbas da saída, conforme o tipo de desligamento — além de horas extras e adicionais, se houver.' },
    { pergunta: 'Esse tempo conta para a aposentadoria?', resposta: 'Pode contar. O período reconhecido pode ser levado ao INSS, que exige que a comprovação se apoie em documentos da época. É um ponto que analisamos junto com o caso trabalhista.' },
    { pergunta: 'Qual o prazo para entrar com a ação?', resposta: 'Até 2 anos depois do fim do trabalho, alcançando os créditos dos últimos 5 anos. Já o pedido de anotação para servir de prova junto ao INSS não tem esse limite.' },
    { pergunta: 'Ainda trabalho lá. Posso pedir o reconhecimento?', resposta: 'A lei permite. Muitas pessoas preferem esperar a saída, mas lembre que os créditos mais antigos que 5 anos vão ficando para trás. Avaliamos com você o melhor momento.' },
    { pergunta: 'Como funciona o processo?', resposta: 'Em resumo: reunimos as provas, entramos com a ação, há uma audiência de tentativa de acordo e, se não houver acordo, as provas e testemunhas são ouvidas antes do julgamento. Orientamos você em cada etapa.' },
  ],

  sobreTexto:
    'Especialistas em Direito do Trabalho e Previdenciário, com sede em Tubarão/SC e atendimento em todo o Brasil. Você acompanha cada etapa do processo com transparência.',
  // Sem "+X anos"/"+10.000" nas LPs novas (trava OAB da skill comercial-nova-lp).
  stats: [
    { value: 'Tubarão', label: 'sede no Sul de SC' },
    { value: 'Brasil', label: 'atendimento em todo o país' },
  ],
};
