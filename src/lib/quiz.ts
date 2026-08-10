import type { OpcaoResposta, PerguntaQuiz } from '../data/quizzes/types';

export interface Resposta {
  pergunta: PerguntaQuiz;
  opcao: OpcaoResposta;
}

/** Reprova se qualquer resposta tiver `reprova`; coleta os rótulos das dúvidas. */
export function avaliar(respostas: Resposta[]): { qualificado: boolean; duvidas: string[] } {
  const qualificado = !respostas.some((r) => r.opcao.reprova);
  const duvidas = respostas.filter((r) => r.opcao.duvida).map((r) => r.pergunta.rotuloResumo);
  return { qualificado, duvidas };
}

/**
 * Resumo em texto puro pro hub (campo `mensagem`) e pro WhatsApp.
 * Formato:
 *   Triagem — <tese>
 *   Nome: <nome>                        (só se houver nome)
 *   <rotuloResumo>: <rotulo da opção>   (uma linha por resposta)
 *   Ponto de atenção: <dúvida>          (se houver)
 */
export function montarResumo(
  tese: string, nome: string, respostas: Resposta[], duvidas: string[],
): string {
  const linhas = [
    `Triagem — ${tese}`,
    ...(nome ? [`Nome: ${nome}`] : []),
    ...respostas.map((r) => `${r.pergunta.rotuloResumo}: ${r.opcao.rotulo}`),
    ...duvidas.map((d) => `Ponto de atenção: ${d}`),
  ];
  return linhas.join('\n');
}
