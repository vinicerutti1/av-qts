// client/src/utils/formatDate.test.ts

import { formatDate } from './formatDate';

describe('Util: formatDate', () => {
  it('deve formatar uma data padrão corretamente', () => {
    const date = new Date('2025-10-23T10:00:00Z');
    expect(formatDate(date)).toBe('23/10/2025');
  });

  it('deve adicionar zero à esquerda para dias com um dígito', () => {
    const date = new Date('2025-05-01T10:00:00Z');
    expect(formatDate(date)).toBe('01/05/2025');
  });

  it('deve adicionar zero à esquerda para meses com um dígito', () => {
    const date = new Date('2025-01-15T10:00:00Z');
    expect(formatDate(date)).toBe('15/01/2025');
  });

  it('deve formatar corretamente o último dia do ano', () => {
    const date = new Date('2024-12-31T23:59:59Z');
    expect(formatDate(date)).toBe('31/12/2024');
  });

  it('deve formatar corretamente uma data vinda como string', () => {
    const dateString = '2024-02-29T12:00:00.000Z';
    expect(formatDate(dateString)).toBe('29/02/2024');
  });

  it('deve lidar corretamente com anos bissextos', () => {
    const date = new Date('2024-02-29T12:00:00Z');
    expect(formatDate(date)).toBe('29/02/2024');
  });

  it('deve retornar uma string vazia para um objeto de data inválido', () => {
    const invalidDate = new Date('texto invalido');
    expect(formatDate(invalidDate)).toBe('');
  });

  it('deve retornar uma string vazia quando a entrada for null', () => {
    expect(formatDate(null)).toBe('');
  });

  it('deve retornar uma string vazia quando a entrada for undefined', () => {
    expect(formatDate(undefined)).toBe('');
  });

  it('deve retornar uma string vazia para uma string de data mal formatada', () => {
    expect(formatDate('2024-30-30')).toBe('');
  });
});