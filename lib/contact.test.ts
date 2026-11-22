import { describe, expect, it, vi } from 'vitest';
import { getGroomingWhatsApp, getWhatsApp, whatsAppLink } from './contact';

// Fictitious numbers only (see "Privacy and LGPD" in AGENTS.md).
describe('getWhatsApp', () => {
  it('parses an 11-digit mobile number', () => {
    vi.stubEnv('NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER', '+55 24 90000-0000');
    expect(getWhatsApp()).toEqual({
      digits: '5524900000000',
      display: '(24) 90000-0000',
    });
  });

  it('parses a 10-digit number', () => {
    vi.stubEnv('NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER', '+552430000000');
    expect(getWhatsApp().display).toBe('(24) 3000-0000');
  });

  it('throws a helpful error when the variable is missing or invalid', () => {
    vi.stubEnv('NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER', undefined);
    expect(() => getWhatsApp()).toThrow(/NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER/);
    vi.stubEnv('NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER', '+1 555 0000');
    expect(() => getWhatsApp()).toThrow(/missing or invalid/);
  });
});

describe('getGroomingWhatsApp', () => {
  it('reads its own variable', () => {
    vi.stubEnv('NEXT_PUBLIC_GROOMING_WHATSAPP_PHONE_NUMBER', '+5524911111111');
    expect(getGroomingWhatsApp().digits).toBe('5524911111111');
  });
});

describe('whatsAppLink', () => {
  const contact = { digits: '5524900000000', display: '(24) 90000-0000' };

  it('links to the chat', () => {
    expect(whatsAppLink(contact)).toBe('https://wa.me/5524900000000');
  });

  it('encodes a prefilled message', () => {
    expect(whatsAppLink(contact, 'Quero um orçamento')).toBe(
      'https://wa.me/5524900000000?text=Quero%20um%20or%C3%A7amento',
    );
  });
});
