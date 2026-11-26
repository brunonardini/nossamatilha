import { describe, expect, it } from 'vitest';
import {
  joinNames,
  quoteMessage,
  validateOwnMessage,
  validateQuote,
} from './quote';

describe('validateQuote', () => {
  it('accepts one or more services with both names', () => {
    expect(
      validateQuote({ services: ['Creche'], name: 'Ana', dogName: 'Thor' }),
    ).toEqual({});
    expect(
      validateQuote({
        services: ['Creche', 'Hospedagem'],
        name: 'Ana',
        dogName: 'Thor e Mel',
      }),
    ).toEqual({});
  });

  it('asks for at least one service', () => {
    expect(
      validateQuote({ services: [], name: 'Ana', dogName: 'Thor' }),
    ).toEqual({ services: 'Escolha pelo menos um serviço.' });
  });

  it('treats blank names as missing', () => {
    expect(
      validateQuote({ services: ['Creche'], name: '   ', dogName: '\n' }),
    ).toEqual({
      name: 'Digite o seu nome.',
      dogName: 'Digite o nome do seu cão.',
    });
  });
});

describe('joinNames', () => {
  it('joins with commas and "e" before the last name', () => {
    expect(joinNames(['Creche'])).toBe('Creche');
    expect(joinNames(['Creche', 'Hospedagem'])).toBe('Creche e Hospedagem');
    expect(joinNames(['Creche', 'Hospedagem', 'Transporte'])).toBe(
      'Creche, Hospedagem e Transporte',
    );
  });
});

describe('quoteMessage', () => {
  it('lists the name, the dog and the services, one per line', () => {
    expect(
      quoteMessage({
        services: ['Hospedagem', 'Banho e tosa'],
        name: '  Ana   Souza ',
        dogName: 'Thor',
      }),
    ).toBe(
      [
        'Olá, Nossa Matilha! Gostaria de um orçamento.',
        'Meu nome: Ana Souza',
        'Nome do cão: Thor',
        'Serviços: Hospedagem e Banho e tosa',
      ].join('\n'),
    );
  });
});

describe('validateOwnMessage', () => {
  it('accepts any typed text', () => {
    expect(validateOwnMessage('Quero visitar o espaço.')).toBe(undefined);
  });

  it('asks for a message when the box is blank', () => {
    expect(validateOwnMessage('')).toBe('Escreva a sua mensagem.');
    expect(validateOwnMessage(' \n ')).toBe('Escreva a sua mensagem.');
  });
});
