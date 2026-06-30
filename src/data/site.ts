// Dados estáveis da banca. WhatsApp vem de env (não hardcodar o número aqui).
export const site = {
  nomeBanca: 'Ramon Antônio Advogados',
  oab: 'OAB/SC', // identificação profissional no rodapé
  cidade: 'Tubarão/SC',
  whatsappNumero: import.meta.env.PUBLIC_WHATSAPP_NUMERO ?? '',
  regioesAtendidas: [
    'Tubarão e Sul de SC',
    'Vale do Itajaí',
    'Joinville e Norte de SC',
  ],
};
