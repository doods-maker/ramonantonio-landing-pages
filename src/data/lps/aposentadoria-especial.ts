import type { LandingData } from '../types';

export const aposentadoriaEspecial: LandingData = {
  slug: 'aposentadoria-especial',
  seoTitle: 'Aposentadoria Especial: Quem Tem Direito | Ramon Antonio',
  seoDescription:
    'Trabalhou exposto a ruído, calor, poeira ou químicos? Veja quem tem direito à aposentadoria especial e como o PPP comprova o tempo. Advogados em Tubarão/SC.',
  keywords: [
    'aposentadoria especial quem tem direito', 'advogado aposentadoria especial', 'advogado aposentadoria especial SC',
    'aposentadoria especial INSS', 'PPP aposentadoria especial', 'atividade insalubre aposentadoria',
    'conversão de tempo especial', 'aposentadoria especial negada', 'advogado previdenciário Joinville',
  ],

  heroEyebrow: 'APOSENTADORIA ESPECIAL · INSS',
  heroHeadline: 'Trabalhou exposto a ruído,<br>calor ou produtos químicos?',
  heroSub:
    'Quem passou anos em ambiente que faz mal à saúde — fábrica, metalúrgica, mineração, hospital, posto de combustível — pode ter direito a se aposentar com menos tempo de trabalho. O que decide é a prova da exposição, e ajudamos você a entender se a sua está completa.',
  mensagemWhats: 'Olá, vim pelo site e gostaria de tirar dúvidas sobre a aposentadoria especial.',

  passos: [
    { titulo: 'Análise dos seus documentos', descricao: 'Conferimos o PPP de cada empresa, os laudos e o seu extrato do INSS, período por período.' },
    { titulo: 'Orientação do caminho', descricao: 'Explicamos se cabe a aposentadoria especial ou a conversão do tempo especial, e como corrigir PPPs incompletos.' },
    { titulo: 'Pedido e acompanhamento', descricao: 'Orientamos o pedido no INSS e, quando for o caso, o recurso ou a via judicial, mantendo você informado.' },
  ],

  oQueETitulo: 'O que é a aposentadoria especial?',
  oQueEQuote: 'Quem trabalhou exposto ao que faz mal à saúde tem direito de sair mais cedo.',
  oQueEParagrafos: [
    'A <strong>aposentadoria especial</strong> é a aposentadoria do INSS para quem trabalhou de forma <strong>permanente</strong> exposto a <strong>agentes nocivos à saúde</strong> — físicos (como ruído e calor), químicos (como poeiras, solventes e combustíveis) ou biológicos (como em hospitais e laboratórios).',
    'Em vez de esperar a idade comum, o segurado se aposenta com <strong>15, 20 ou 25 anos</strong> de atividade especial, conforme o agente a que ficou exposto. A maioria dos casos — ruído, calor, químicos — é de <strong>25 anos</strong>.',
    'O coração do pedido é a <strong>prova da exposição</strong>: o <strong>PPP (Perfil Profissiográfico Previdenciário)</strong>, preenchido pela empresa com base no <strong>laudo técnico das condições do ambiente de trabalho (LTCAT)</strong>. PPP com informação faltando ou errada é uma das causas mais comuns de negativa no INSS.',
  ],

  destaqueLegal: {
    titulo: 'E a idade mínima, ainda vale?',
    texto:
      'A Reforma de 2019 tinha criado idade mínima de <strong>55, 58 ou 60 anos</strong> para a aposentadoria especial. Em <strong>junho de 2026</strong>, o <strong>STF</strong> declarou essa exigência inconstitucional (decisão ainda sujeita a recurso e a modulação dos efeitos). Pelo que foi decidido, seguem valendo o tempo de exposição, a nova forma de cálculo e a <strong>proibição de converter em tempo comum o tempo especial trabalhado depois de 13/11/2019</strong>. O tempo especial anterior a essa data ainda pode ser convertido. Cada caso depende da prova da exposição.',
    fonte: 'STF, ADI 6309 (julg. 03/06/2026); Emenda Constitucional nº 103/2019, arts. 19, § 1º, I, e 25, § 2º; Lei nº 8.213/91, arts. 57 e 58.',
  },

  requisitosTitulo: 'Quem tem direito à aposentadoria especial?',
  requisitosDisclaimer: 'Requisitos sujeitos à análise do INSS. O enquadramento depende do agente, do nível de exposição e do período trabalhado.',
  requisitos: [
    {
      titulo: 'Exposição permanente a agente nocivo',
      descricao: 'Ter trabalhado exposto, de forma habitual e não ocasional, a ruído, calor, poeira, produtos químicos ou agentes biológicos acima do que a lei tolera.',
    },
    {
      titulo: '15, 20 ou 25 anos de atividade especial',
      descricao: 'O tempo exigido depende do agente. Os períodos podem ser somados mesmo que tenham sido em empresas diferentes.',
    },
    {
      titulo: 'Prova por PPP e laudo técnico',
      descricao: 'A exposição é comprovada pelo PPP emitido pela empresa, com base no LTCAT. A empresa deve entregar o PPP ao trabalhador quando o contrato termina.',
    },
    {
      titulo: 'Não completou o tempo todo? Pode haver conversão',
      descricao: 'O tempo especial trabalhado até 13/11/2019 pode ser convertido em tempo comum com acréscimo, ajudando em outra aposentadoria. Depois dessa data, a conversão não é mais permitida.',
      destaque: true,
    },
  ],

  documentosTitulo: 'Quais documentos comprovam a atividade especial?',
  documentosIntro: 'Reúna de todas as empresas em que trabalhou exposto a agentes nocivos.',
  documentos: [
    { titulo: 'PPP de cada empresa', descricao: 'Perfil Profissiográfico Previdenciário' },
    { titulo: 'LTCAT ou laudos', descricao: 'Laudo técnico das condições do ambiente' },
    { titulo: 'Carteiras de trabalho', descricao: 'Com as funções e datas de cada vínculo' },
    { titulo: 'CNIS · Extrato INSS', descricao: 'Histórico de vínculos e contribuições' },
    { titulo: 'Contracheques', descricao: 'Com adicional de insalubridade ou periculosidade' },
    { titulo: 'CPF e RG ou CNH', descricao: 'Documentos pessoais do segurado' },
  ],


  faqTitulo: 'Quais são as dúvidas mais comuns sobre a aposentadoria especial?',
  faq: [
    { pergunta: 'Quais profissões costumam ter direito?', resposta: 'Não é a profissão que dá o direito, e sim a exposição comprovada ao agente nocivo. São comuns casos de metalúrgicos, soldadores, mineiros, trabalhadores da indústria cerâmica e química, frentistas e profissionais da saúde — mas cada período depende do que está no PPP.' },
    { pergunta: 'Ainda existe idade mínima para a aposentadoria especial?', resposta: 'Em junho de 2026, o STF declarou inconstitucional a idade mínima de 55, 58 ou 60 anos criada pela Reforma (ADI 6309) — a decisão ainda pode ser objeto de recurso e de modulação dos efeitos. Com ela, o que conta é o tempo de exposição de 15, 20 ou 25 anos. Para quem já trabalhava antes da Reforma também há uma regra de transição por pontos, e o efeito da decisão sobre ela ainda está sendo discutido — por isso a análise é individual.' },
    { pergunta: 'O que é o PPP e onde eu consigo?', resposta: 'O Perfil Profissiográfico Previdenciário é o documento em que a empresa descreve as suas funções e os agentes nocivos a que você ficou exposto. A empresa deve mantê-lo atualizado e entregar uma cópia quando o contrato termina; você também pode pedir no RH. Para empregos mais recentes, o PPP pode constar em formato eletrônico.' },
    { pergunta: 'E se a empresa fechou ou não quer me dar o PPP?', resposta: 'Há caminhos: laudos de outras empresas do mesmo ramo, documentos de sindicato, perícia técnica no processo judicial, entre outros. A falta do PPP não encerra o assunto, mas exige mais cuidado com a prova.' },
    { pergunta: 'Usar EPI tira o direito à aposentadoria especial?', resposta: 'Depende do agente. O STF decidiu que, se o EPI realmente neutraliza o agente nocivo, não há direito ao tempo especial. Mas, no caso do ruído acima do limite, a simples informação de EPI eficaz no PPP não afasta o direito (Tema 555).' },
    { pergunta: 'O que é conversão de tempo especial em comum?', resposta: 'É transformar o tempo trabalhado em condição especial em tempo comum, com acréscimo, para ajudar em outra aposentadoria quando não se completou o tempo todo de atividade especial. Só vale para o tempo trabalhado até 13/11/2019.' },
    { pergunta: 'Atividade perigosa também conta?', resposta: 'Os tribunais vêm reconhecendo como especiais algumas atividades perigosas, como trabalho com eletricidade e vigilância, conforme o período e a prova. É um tema com regras que mudaram ao longo do tempo, por isso cada período precisa ser analisado.' },
    { pergunta: 'Posso continuar trabalhando depois de me aposentar?', resposta: 'Pode trabalhar, mas não na atividade especial. O STF decidiu que quem se aposenta pela especial e continua ou volta a trabalhar exposto a agente nocivo tem o pagamento do benefício cessado (Tema 709).' },
    { pergunta: 'Recebia adicional de insalubridade. Isso garante a aposentadoria especial?', resposta: 'Não automaticamente. O adicional é um direito trabalhista e ajuda como indício, mas o INSS exige a prova da exposição pelo PPP e pelo laudo técnico, conforme as regras previdenciárias.' },
    { pergunta: 'Meu pedido foi negado. O que fazer?', resposta: 'É possível entender o motivo do indeferimento — muitas vezes um PPP incompleto ou um período não reconhecido — e avaliar a correção dos documentos, o recurso administrativo ou a via judicial.' },
  ],

  sobreTexto:
    'Especialistas em Direito Previdenciário, com sede em Tubarão/SC e atendimento em todo o Brasil. Você acompanha cada etapa do processo com transparência.',
  // Sem "+X anos"/"+10.000" nas LPs novas (trava OAB da skill comercial-nova-lp).
  stats: [
    { value: 'Tubarão', label: 'sede no Sul de SC' },
    { value: 'Brasil', label: 'atendimento em todo o país' },
  ],
};
