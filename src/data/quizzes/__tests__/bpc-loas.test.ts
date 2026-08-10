import { describe, it, expect } from 'vitest';
import { quizBpcLoas as q } from '../bpc-loas';
import { avaliar, type Resposta } from '../../../lib/quiz';

const PROIBIDO = [
  /R\$\s?\d/, /honor[áa]rio/i, /com certeza/i,
  /você vai (ganhar|receber)/i, /garant(imos|ido o benef)/i,
  /\bem (\d+|poucos) (dias|meses|semanas)\b/i,
  /clique j[áa]/i, /não perca/i,
  /[\u{1F300}-\u{1FAFF}]/u,
];

const responder = (id: string, valor: string): Resposta => {
  const pergunta = q.perguntas.find((p) => p.id === id)!;
  return { pergunta, opcao: pergunta.opcoes.find((o) => o.valor === valor)! };
};
/** Caminho todo-positivo, trocando as respostas passadas em `overrides`. */
const caminho = (overrides: Record<string, string> = {}): Resposta[] =>
  q.perguntas.map((p) => responder(p.id, overrides[p.id] ?? p.opcoes[0].valor));

describe('quiz bpc-loas', () => {
  it('slug e tese', () => {
    expect(q.slug).toBe('t-bpc-loas');
    expect(q.tese).toBe('BPC/LOAS');
  });
  it('tem as 3 perguntas na ordem da spec', () => {
    expect(q.perguntas.map((p) => p.id)).toEqual(['perfil', 'renda', 'cadunico']);
  });
  it('caminho positivo qualifica sem dúvidas', () => {
    expect(avaliar(caminho())).toEqual({ qualificado: true, duvidas: [] });
  });
  it('sem perfil (nem 65+ nem PCD) reprova; renda bem acima reprova', () => {
    expect(avaliar(caminho({ perfil: 'nenhum' })).qualificado).toBe(false);
    expect(avaliar(caminho({ renda: 'bem-acima' })).qualificado).toBe(false);
  });
  it('renda pouco acima qualifica com dúvida (caso-limite da spec)', () => {
    const r = avaliar(caminho({ renda: 'pouco-acima' }));
    expect(r.qualificado).toBe(true);
    expect(r.duvidas.length).toBe(1);
  });
  it('sem CadÚnico qualifica com dúvida', () => {
    expect(avaliar(caminho({ cadunico: 'nao' })).qualificado).toBe(true);
  });
  it('reprovado tem link pra LP completa e final honesto', () => {
    expect(q.reprovado.linkLp).toBe('/lp/bpc-loas/');
    expect(q.reprovado.bolhas.length).toBeGreaterThan(0);
  });
  it('não viola OAB', () => {
    const texto = JSON.stringify(q);
    for (const re of PROIBIDO) expect(texto).not.toMatch(re);
  });
});
