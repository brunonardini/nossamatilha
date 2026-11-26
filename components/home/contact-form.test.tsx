import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ContactForm } from './contact-form';

const contact = { digits: '5524900000000', display: '(24) 90000-0000' };
const services = ['Creche', 'Hospedagem', 'Transporte'];

function setup(): {
  user: ReturnType<typeof userEvent.setup>;
  open: ReturnType<typeof vi.fn>;
} {
  const open = vi.fn();
  vi.spyOn(window, 'open').mockImplementation(open);
  render(<ContactForm contact={contact} services={services} />);
  return { user: userEvent.setup(), open };
}

/** Message text sent to WhatsApp in the last `window.open` call. */
function sentMessage(open: ReturnType<typeof vi.fn>): string {
  const url = String(open.mock.lastCall?.[0]);
  return new URL(url).searchParams.get('text') ?? '';
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ContactForm', () => {
  it('sends the filled-in message with every chosen service', async () => {
    const { user, open } = setup();
    await user.type(screen.getByLabelText('Seu nome'), 'Ana');
    await user.type(screen.getByLabelText('Nome do seu cão'), 'Thor');
    await user.click(screen.getByRole('checkbox', { name: 'Transporte' }));
    await user.click(screen.getByRole('checkbox', { name: 'Creche' }));
    await user.click(
      screen.getByRole('button', { name: 'Solicitar orçamento no WhatsApp' }),
    );

    expect(String(open.mock.lastCall?.[0])).toMatch(
      /^https:\/\/wa\.me\/5524900000000\?text=/,
    );
    expect(sentMessage(open)).toBe(
      [
        'Olá, Nossa Matilha! Gostaria de um orçamento.',
        'Meu nome: Ana',
        'Nome do cão: Thor',
        'Serviços: Creche e Transporte',
      ].join('\n'),
    );
  });

  it('points out what is missing and does not open WhatsApp', async () => {
    const { user, open } = setup();
    await user.click(
      screen.getByRole('button', { name: 'Solicitar orçamento no WhatsApp' }),
    );

    expect(open).not.toHaveBeenCalled();
    expect(screen.getByText('Digite o seu nome.')).toBeTruthy();
    expect(screen.getByText('Digite o nome do seu cão.')).toBeTruthy();
    expect(screen.getByText('Escolha pelo menos um serviço.')).toBeTruthy();
    expect(document.activeElement).toBe(screen.getByLabelText('Seu nome'));

    await user.type(screen.getByLabelText('Seu nome'), 'A');
    expect(screen.queryByText('Digite o seu nome.')).toBeNull();
  });

  it('lets the visitor write their own message from a blank box', async () => {
    const { user, open } = setup();
    await user.click(
      screen.getByRole('radio', { name: 'Escrever do meu jeito' }),
    );

    const box = screen.getByRole('textbox', { name: 'Sua mensagem' });
    expect(box).toHaveProperty('value', '');
    expect(box.getAttribute('placeholder')).toBe('Digite sua mensagem aqui');
    expect(
      screen.queryByRole('button', { name: 'Solicitar orçamento no WhatsApp' }),
    ).toBeNull();

    const send = screen.getByRole('button', {
      name: 'Enviar mensagem no WhatsApp',
    });
    await user.click(send);
    expect(open).not.toHaveBeenCalled();
    expect(screen.getByText('Escreva a sua mensagem.')).toBeTruthy();

    await user.type(box, '  Posso visitar o espaço?  ');
    await user.click(send);
    expect(sentMessage(open)).toBe('Posso visitar o espaço?');
  });

  it('keeps what was filled in when switching back and forth', async () => {
    const { user } = setup();
    await user.type(screen.getByLabelText('Seu nome'), 'Ana');
    await user.click(
      screen.getByRole('radio', { name: 'Escrever do meu jeito' }),
    );
    await user.type(
      screen.getByRole('textbox', { name: 'Sua mensagem' }),
      'Oi!',
    );
    await user.click(screen.getByRole('radio', { name: 'Mensagem pronta' }));
    expect(screen.getByLabelText('Seu nome')).toHaveProperty('value', 'Ana');
    await user.click(
      screen.getByRole('radio', { name: 'Escrever do meu jeito' }),
    );
    expect(
      screen.getByRole('textbox', { name: 'Sua mensagem' }),
    ).toHaveProperty('value', 'Oi!');
  });
});
