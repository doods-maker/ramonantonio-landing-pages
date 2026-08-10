import { describe, it, expect } from 'vitest';
import { quizSalarioMaternidade as q } from '../salario-maternidade';
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

describe('quiz salario-maternidade', () => {
  it('slug e tese', () => {
    expect(q.slug).toBe('t-salario-maternidade');
    expect(q.tese).toBe('Salário-maternidade');
  });
  it('tem as 3 perguntas na ordem da spec', () => {
    expect(q.perguntas.map((p) => p.id)).toEqual(['evento', 'quando', 'situacao']);
  });
  it('caminho positivo qualifica sem dúvidas', () => {
    expect(avaliar(caminho())).toEqual({ qualificado: true, duvidas: [] });
  });
  it('nenhum evento reprova; mais de 5 anos reprova (prescrição)', () => {
    expect(avaliar(caminho({ evento: 'nenhum' })).qualificado).toBe(false);
    expect(avaliar(caminho({ quando: 'mais-de-5' })).qualificado).toBe(false);
  });
  it('desempregada, MEI e rural qualificam (carência dispensada)', () => {
    for (const s of ['desempregada', 'mei-autonoma', 'rural']) {
      expect(avaliar(caminho({ situacao: s })).qualificado).toBe(true);
    }
  });
  it('gravidez em curso qualifica', () => {
    expect(avaliar(caminho({ evento: 'gravida', quando: 'gravidez-em-curso' })).qualificado).toBe(true);
  });
  it('reprovado tem link pra LP completa e final honesto', () => {
    expect(q.reprovado.linkLp).toBe('/lp/salario-maternidade/');
    expect(q.reprovado.bolhas.length).toBeGreaterThan(0);
  });
  it('a copy fala em qualidade de segurada, não em contribuição única', () => {
    const texto = JSON.stringify(q).toLowerCase();
    expect(texto).not.toMatch(/uma (única|so|só) contribuição/);
    expect(texto).toMatch(/qualidade de segurada/);
  });
  it('não viola OAB', () => {
    const texto = JSON.stringify(q);
    for (const re of PROIBIDO) expect(texto).not.toMatch(re);
  });
});
