import { describe, it, expect } from 'vitest';
import { avaliar, montarResumo, type Resposta } from './quiz';
import type { PerguntaQuiz } from '../data/quizzes/types';

const pergunta = (id: string): PerguntaQuiz => ({
  id, bolhas: ['?'], rotuloResumo: id,
  opcoes: [
    { rotulo: 'Sim', valor: 'sim' },
    { rotulo: 'Não', valor: 'nao', reprova: true },
    { rotulo: 'Mais ou menos', valor: 'limite', duvida: true },
  ],
});
const responder = (id: string, valor: string): Resposta => {
  const p = pergunta(id);
  return { pergunta: p, opcao: p.opcoes.find((o) => o.valor === valor)! };
};

describe('avaliar', () => {
  it('qualifica quando nenhuma resposta reprova', () => {
    expect(avaliar([responder('a', 'sim'), responder('b', 'sim')]))
      .toEqual({ qualificado: true, duvidas: [] });
  });
  it('reprova se qualquer resposta tem reprova', () => {
    expect(avaliar([responder('a', 'sim'), responder('b', 'nao')]).qualificado).toBe(false);
  });
  it('caso-limite qualifica com dúvida sinalizada', () => {
    const r = avaliar([responder('renda', 'limite')]);
    expect(r.qualificado).toBe(true);
    expect(r.duvidas).toEqual(['renda']);
  });
});

describe('montarResumo', () => {
  it('monta uma linha por resposta, com nome e tese', () => {
    const texto = montarResumo('Auxílio-acidente', 'Maria', [responder('Sequela', 'sim')], []);
    expect(texto).toContain('Triagem — Auxílio-acidente');
    expect(texto).toContain('Nome: Maria');
    expect(texto).toContain('Sequela: Sim');
  });
  it('inclui pontos de atenção quando há dúvida', () => {
    const texto = montarResumo('BPC', 'João', [responder('Renda', 'limite')], ['Renda']);
    expect(texto).toContain('Ponto de atenção: Renda');
  });
});
