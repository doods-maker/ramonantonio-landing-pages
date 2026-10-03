import type { LandingData } from '../types';

const base = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');

export const trabalhistaGeral: LandingData = {
  slug: 'trabalhista-geral',
  seoTitle: 'Advogado Trabalhista em SC: Horas Extras e Adicionais',
  seoDescription:
    'Horas extras sem pagamento, adicional noturno, insalubridade, periculosidade ou rescisão indireta: o que a reclamação trabalhista pode cobrar e os prazos. SC.',
  keywords: [
    'advogado trabalhista', 'advogado trabalhista SC', 'advogado trabalhista Tubarão',
    'reclamação trabalhista', 'horas extras não pagas', 'adicional de insalubridade',
    'adicional de periculosidade', 'adicional noturno', 'rescisão indireta',
  ],

  heroEyebrow: 'RECLAMAÇÃO TRABALHISTA · CLT',
  heroHeadline: 'Horas extras e adicionais<br>que nunca foram pagos?',
  heroSub:
    'Hora extra sem pagamento, trabalho noturno, insalubre ou perigoso sem o adicional, ou uma empresa que descumpre o contrato: a reclamação trabalhista é o caminho para cobrar o que é devido. Entenda seus direitos e os prazos.',
  mensagemWhats: 'Olá, vim pelo site e gostaria de tirar dúvidas sobre meus direitos trabalhistas.',

  passos: [
    { titulo: 'Análise do seu caso', descricao: 'Examinamos a sua jornada, a função, os contracheques e o que deixou de ser pago para entender o que pode ser cobrado.' },
    { titulo: 'Orientação do caminho', descricao: 'Explicamos os direitos envolvidos, as provas necessárias e como funciona uma reclamação na Justiça do Trabalho.' },
    { titulo: 'Acompanhamento', descricao: 'Acompanhamos cada etapa do processo e mantemos você informado.' },
  ],

  oQueETitulo: 'O que é uma reclamação trabalhista?',
  oQueEQuote: 'O que foi combinado e não foi cumprido, a lei garante o direito de cobrar.',
  oQueEParagrafos: [
    'A <strong>reclamação trabalhista</strong> é a ação na <strong>Justiça do Trabalho</strong> para cobrar o que a empresa deixou de cumprir durante o contrato: horas extras, adicionais e outros direitos previstos na <strong>CLT</strong>.',
    'Os casos mais comuns são de jornada além do combinado sem pagamento, trabalho à noite sem o adicional e funções insalubres ou perigosas sem o acréscimo devido. Quando a falta da empresa é grave, também é possível pedir a <strong>rescisão indireta</strong>.',
    `Saiu da empresa e o acerto veio errado? Veja o que entra nas <a href="${base}/verbas-rescisorias/">verbas rescisórias e no FGTS</a>. Trabalhou sem registro ou como "PJ"? Veja o <a href="${base}/reconhecimento-de-vinculo/">reconhecimento de vínculo</a>.`,
  ],

  destaqueLegal: {
    titulo: 'Existe prazo para reclamar — não deixe passar',
    texto:
      'A lei fixa dois prazos. Depois do fim do contrato, o trabalhador tem até <strong>2 anos para ajuizar</strong> a reclamação (prescrição bienal). E pode cobrar os créditos dos <strong>últimos 5 anos</strong>, contados a partir do ajuizamento (prescrição quinquenal). Conforme o tempo passa, parte dos direitos pode prescrever — por isso buscar orientação cedo faz diferença.',
    fonte: 'Constituição Federal, art. 7º, XXIX; CLT, art. 11.',
  },

  requisitosTitulo: 'O que pode ser cobrado numa reclamação trabalhista?',
  requisitosDisclaimer: 'Percentuais mínimos previstos na CLT; convenções coletivas podem prever valores maiores. Cada relação de trabalho tem particularidades — a análise individual define o que cabe no seu caso.',
  requisitos: [
    {
      titulo: 'Horas extras',
      descricao: 'O tempo trabalhado além da jornada deve ser pago com acréscimo de, no mínimo, 50% sobre a hora normal — com reflexos em férias, 13º e FGTS.',
    },
    {
      titulo: 'Adicional noturno',
      descricao: 'Para o trabalhador urbano, o trabalho entre 22h e 5h tem acréscimo de pelo menos 20%, e cada hora noturna conta como 52 minutos e 30 segundos.',
    },
    {
      titulo: 'Insalubridade e periculosidade',
      descricao: 'Insalubridade (agentes nocivos à saúde): adicional de 10%, 20% ou 40% sobre o salário mínimo, conforme o grau. Periculosidade (inflamáveis, explosivos, eletricidade, segurança, entre outras): 30% sobre o salário-base. A caracterização é feita por perícia.',
    },
    {
      titulo: 'Rescisão indireta',
      descricao: 'Quando a empresa descumpre gravemente o contrato — como deixar de pagar salários ou exigir serviço fora do combinado —, o trabalhador pode pedir o fim do contrato com os direitos de uma demissão sem justa causa.',
      destaque: true,
    },
  ],

  documentosTitulo: 'Documentos que ajudam no seu caso',
  documentos: [
    { titulo: 'Controle de ponto', descricao: 'Cartão, folha ou registro eletrônico de jornada' },
    { titulo: 'Contracheques / holerites', descricao: 'Para ver o que foi e o que não foi pago' },
    { titulo: 'CTPS (física ou digital)', descricao: 'Função, salário e datas do contrato' },
    { titulo: 'Escalas e mensagens', descricao: 'Ordens de serviço, escalas e conversas de trabalho' },
    { titulo: 'Fotos e registros do ambiente', descricao: 'Para casos de insalubridade ou periculosidade' },
    { titulo: 'RG e CPF', descricao: 'Documentos pessoais do trabalhador' },
  ],

  checklist: {
    titulo: 'Prefere esta lista completa, para marcar com calma?',
    texto:
      'Enviamos pelo WhatsApp o checklist em PDF — com orientações de como reunir cada documento e prova da sua jornada e do ambiente de trabalho.',
    mensagemWhats: 'Olá, vim pelo site e gostaria de receber o checklist de documentos do caso trabalhista.',
    botao: 'Receber o checklist',
  },

  faqTitulo: 'Dúvidas sobre reclamação trabalhista',
  faq: [
    { pergunta: 'Tenho prazo para entrar com ação trabalhista?', resposta: 'Sim. Em regra, são até 2 anos após o fim do contrato para ajuizar a reclamação, podendo cobrar os créditos referentes aos últimos 5 anos. Por isso é importante não deixar para depois.' },
    { pergunta: 'Horas extras que nunca recebi podem ser cobradas?', resposta: 'Sim, respeitado o prazo prescricional e desde que seja possível demonstrar o trabalho além da jornada — por controle de ponto, mensagens, testemunhas ou outros elementos.' },
    { pergunta: 'Como provar as horas extras se a empresa não tinha ponto?', resposta: 'Mensagens enviadas fora do horário, e-mails, escalas, registros de acesso e testemunhas podem mostrar a jornada real. A análise do caso indica quais provas reunir.' },
    { pergunta: 'Trabalho à noite. Tenho direito a adicional?', resposta: 'Para o trabalhador urbano, o trabalho entre 22h e 5h tem acréscimo de pelo menos 20% sobre a hora diurna, e a hora noturna é contada como 52 minutos e 30 segundos. O trabalho rural tem regras próprias.' },
    { pergunta: 'Qual a diferença entre insalubridade e periculosidade?', resposta: 'Insalubridade é a exposição a agentes que fazem mal à saúde, como ruído, calor ou produtos químicos. Periculosidade é o risco acentuado à vida, como inflamáveis, explosivos, eletricidade ou atividades de segurança. Os dois adicionais não se somam: quem tem direito aos dois escolhe um.' },
    { pergunta: 'Precisa de perícia para receber insalubridade ou periculosidade?', resposta: 'Sim. A lei exige que a caracterização seja feita por perícia de médico ou engenheiro do trabalho. No processo, o juiz nomeia o perito que avalia o ambiente.' },
    { pergunta: 'O que é rescisão indireta?', resposta: 'É a chamada "justa causa do empregador": quando a empresa comete falta grave, como deixar de pagar salários ou exigir serviços fora do contrato, o trabalhador pode pedir o fim do contrato com direito às verbas de uma demissão sem justa causa.' },
    { pergunta: 'Preciso sair da empresa para pedir a rescisão indireta?', resposta: 'Nem sempre. Quando a falta é o descumprimento das obrigações do contrato, a lei permite continuar trabalhando até a decisão do processo. Cada situação pede uma avaliação antes de qualquer passo.' },
    { pergunta: 'Posso reclamar enquanto ainda estou trabalhando?', resposta: 'Sim, é possível. Muitos preferem ajuizar após a saída, mas a lei permite reclamar durante o contrato — lembrando que os créditos mais antigos que 5 anos vão prescrevendo.' },
    { pergunta: 'Fui demitido sem receber tudo, ou trabalhei sem carteira. E agora?', resposta: 'Esses casos têm páginas próprias aqui no site: uma sobre verbas rescisórias e FGTS e outra sobre reconhecimento de vínculo. Em ambos, vale reunir os documentos e buscar orientação dentro do prazo.' },
    { pergunta: 'Como funciona uma reclamação na Justiça do Trabalho?', resposta: 'Em resumo: reúne-se a documentação, ajuíza-se a ação, há uma audiência de tentativa de acordo e, se não houver acordo, o processo segue para instrução e julgamento. Orientamos você em cada etapa.' },
  ],

  sobreTexto:
    'Especialistas em Direito do Trabalho e Previdenciário, com sede em Tubarão/SC e atendimento em todo o Brasil. Você acompanha cada etapa do processo com transparência.',
  // Sem "+X anos"/"+10.000" nas LPs novas (trava OAB da skill comercial-nova-lp).
  stats: [
    { value: 'Tubarão', label: 'sede no Sul de SC' },
    { value: 'Brasil', label: 'atendimento em todo o país' },
  ],
};
