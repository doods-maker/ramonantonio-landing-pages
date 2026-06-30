export interface FaqItem {
  pergunta: string;
  resposta: string;
}

export interface PassoComoFunciona {
  titulo: string;
  descricao: string;
}

export interface LandingData {
  /** Slug da URL e valor de `campanha` no CRM. Ex.: 'bpc-loas'. */
  slug: string;
  /** SEO */
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  /** Hero */
  heroHeadline: string;
  heroSub: string;
  /** Mensagem pré-preenchida do WhatsApp para esta LP. */
  mensagemWhats: string;
  /** Bloco "isto é pra você?" — sinais de elegibilidade, sem prometer resultado. */
  elegibilidadeTitulo: string;
  elegibilidadeSinais: string[];
  /** Como funciona (3 passos). */
  comoFunciona: PassoComoFunciona[];
  /** FAQ (8–12 itens). */
  faq: FaqItem[];
  /** Texto do CTA final. */
  ctaFinalTitulo: string;
  ctaFinalTexto: string;
}
