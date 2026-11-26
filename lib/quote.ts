/** What the visitor fills in the quote form (nothing is stored). */
export type QuoteRequest = {
  /** Names of the chosen services, in display order. */
  services: readonly string[];
  /** Visitor's name. */
  name: string;
  /** Dog's name (or names, as typed). */
  dogName: string;
};

/** Form fields that can hold an error. */
export type QuoteField = 'services' | 'name' | 'dogName';

/** Error message (pt-BR) per invalid field; empty when the form is valid. */
export type QuoteErrors = Partial<Record<QuoteField, string>>;

/** Collapses inner whitespace and trims a typed value. */
function clean(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

/**
 * Checks the quote form: at least one service, the visitor's name and the
 * dog's name. Returns one pt-BR message per missing field.
 */
export function validateQuote(request: QuoteRequest): QuoteErrors {
  const errors: QuoteErrors = {};
  if (request.services.length === 0) {
    errors.services = 'Escolha pelo menos um serviço.';
  }
  if (!clean(request.name)) errors.name = 'Digite o seu nome.';
  if (!clean(request.dogName)) errors.dogName = 'Digite o nome do seu cão.';
  return errors;
}

/** Joins names the pt-BR way: "A", "A e B", "A, B e C". */
export function joinNames(names: readonly string[]): string {
  return new Intl.ListFormat('pt-BR', {
    style: 'long',
    type: 'conjunction',
  }).format(names);
}

/**
 * Builds the WhatsApp message (pt-BR) for a quote request. Typed values are
 * trimmed; services keep the given order.
 */
export function quoteMessage(request: QuoteRequest): string {
  return [
    'Olá, Nossa Matilha! Gostaria de um orçamento.',
    `Meu nome: ${clean(request.name)}`,
    `Nome do cão: ${clean(request.dogName)}`,
    `Serviços: ${joinNames(request.services)}`,
  ].join('\n');
}

/**
 * Checks a message the visitor writes from scratch: it cannot be blank.
 * Returns the pt-BR error, or `undefined` when it can be sent.
 */
export function validateOwnMessage(text: string): string | undefined {
  return clean(text) ? undefined : 'Escreva a sua mensagem.';
}
