import { describe, it, expect } from 'vitest';
import { quizAuxilioAcidente as q } from '../auxilio-acidente';
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

describe('quiz auxilio-acidente', () => {
  it('slug e tese', () => {
    expect(q.slug).toBe('t-auxilio-acidente');
    expect(q.tese).toBe('Auxílio-acidente');
  });
  it('tem as 5 perguntas na ordem da spec', () => {
    expect(q.perguntas.map((p) => p.id))
      .toEqual(['acidente', 'sequela', 'vinculo', 'auxilio-doenca', 'ano']);
  });
  it('caminho positivo qualifica sem dúvidas', () => {
    expect(avaliar(caminho())).toEqual({ qualificado: true, duvidas: [] });
  });
  it('sem sequela reprova; MEI/individual reprova', () => {
    expect(avaliar(caminho({ sequela: 'nao' })).qualificado).toBe(false);
    expect(avaliar(caminho({ vinculo: 'mei-individual' })).qualificado).toBe(false);
  });
  it('acidente há mais de 5 anos qualifica com dúvida (prescrição)', () => {
    const r = avaliar(caminho({ ano: 'mais-de-5' }));
    expect(r.qualificado).toBe(true);
    expect(r.duvidas.length).toBe(1);
  });
  it('reprovado tem link pra LP completa e final honesto', () => {
    expect(q.reprovado.linkLp).toBe('/lp/auxilio-acidente/');
    expect(q.reprovado.bolhas.length).toBeGreaterThan(0);
  });
  it('perguntaTelefone usa o placeholder {nome}', () => {
    expect(q.perguntaTelefone.join(' ')).toContain('{nome}');
  });
  it('não viola OAB', () => {
    const texto = JSON.stringify(q);
    for (const re of PROIBIDO) expect(texto).not.toMatch(re);
  });
});
