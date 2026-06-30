export interface FaqItem {
  pergunta: string;
  resposta: string;
}

export interface PassoComoFunciona {
  titulo: string;
  descricao: string;
}

/** Card de "quem tem direito". `destaque` = card escuro de ênfase (bronze-900/dark-900). */
export interface Requisito {
  titulo: string;
  descricao: string;
  destaque?: boolean;
}

export interface Documento {
  titulo: string;
  descricao: string;
}

export interface StatItem {
  value: string;
  label: string;
}

/**
 * Conteúdo de uma landing page. Estrutura textual — o layout (hero centrado vs split,
 * cards horizontais vs numerados) é decidido na página, conforme o handoff de design.
 */
export interface LandingData {
  /** Slug da URL e valor de `campanha` no CRM. Ex.: 'bpc-loas'. */
  slug: string;

  /** SEO */
  seoTitle: string;
  seoDescription: string;
  keywords: string[];

  /** Hero */
  heroEyebrow: string;
  /** Pode conter <br> para quebra de linha controlada. */
  heroHeadline: string;
  heroSub: string;
  /** Mensagem pré-preenchida do WhatsApp para esta LP. */
  mensagemWhats: string;

  /** "Como funciona" — passos exibidos na seção de contato. */
  passos: PassoComoFunciona[];

  /** Seção "O que é". `quote` (opcional) = pull quote serif; `paragrafos` = corpo (HTML simples permitido). */
  oQueETitulo: string;
  oQueEQuote?: string;
  oQueEParagrafos: string[];

  /** Destaque legal opcional (ex.: mudança de jurisprudência) — renderizado como faixa de ênfase. */
  destaqueLegal?: { titulo: string; texto: string; fonte?: string };

  /** Seção "Quem tem direito". */
  requisitosTitulo: string;
  requisitosIntro?: string;
  requisitosDisclaimer?: string;
  requisitos: Requisito[];

  /** Seção "Documentos necessários". */
  documentosTitulo: string;
  documentosIntro?: string;
  documentos: Documento[];

  /** FAQ (8–12 itens) + JSON-LD FAQPage. */
  faqTitulo: string;
  faq: FaqItem[];

  /** Seção "Sobre o escritório". */
  sobreTexto: string;
  stats: StatItem[];
}
