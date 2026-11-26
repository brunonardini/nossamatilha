'use client';

import {
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from 'react';
import { Button } from '@/components/ui/button';
import { ChatIcon, CheckIcon, PawIcon } from '@/components/ui/icons';
import { whatsAppLink, type WhatsAppContact } from '@/lib/contact';
import { gsap, MOTION_OK, useGSAP } from '@/lib/gsap';
import {
  quoteMessage,
  validateOwnMessage,
  validateQuote,
  type QuoteErrors,
} from '@/lib/quote';

/** `ready`: fill-in message; `own`: the visitor writes the whole text. */
type Mode = 'ready' | 'own';

type FormErrors = QuoteErrors & { own?: string };
type Field = keyof FormErrors;

const modes: readonly { mode: Mode; label: string }[] = [
  { mode: 'ready', label: 'Mensagem pronta' },
  { mode: 'own', label: 'Escrever do meu jeito' },
];

const fields: readonly Field[] = ['services', 'name', 'dogName', 'own'];

function isField(value: string | undefined): value is Field {
  return fields.some((field) => field === value);
}

/** Pops the check mark in when a service is ticked. */
function popCheck(input: HTMLInputElement): void {
  if (!input.checked || !window.matchMedia(MOTION_OK).matches) return;
  const check = input.parentElement?.querySelector('[data-check]');
  if (check) {
    gsap.fromTo(
      check,
      { scale: 0, rotation: -45 },
      { scale: 1, rotation: 0, duration: 0.45, ease: 'back.out(3)' },
    );
  }
}

/** A service as a pill checkbox: an empty circle that fills with a check. */
function ServicePill({
  name,
  checked,
  first,
  onToggle,
}: {
  name: string;
  checked: boolean;
  /** The first pill takes focus when no service is chosen. */
  first: boolean;
  onToggle: (name: string, on: boolean) => void;
}): ReactNode {
  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onToggle(name, event.target.checked);
    popCheck(event.target);
  };
  return (
    <label
      className={`flex min-h-12 cursor-pointer items-center gap-2.5 rounded-full py-2 pr-5 pl-2.5 font-heading font-semibold text-forest transition-colors has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-forest ${checked ? 'bg-lime' : 'bg-white shadow-card hover:bg-cream-light'}`}
    >
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
        data-field={first ? 'services' : undefined}
      />
      <span
        className={`flex size-7 items-center justify-center rounded-full border-2 ${checked ? 'border-forest bg-forest text-lime' : 'border-forest/25'}`}
      >
        <CheckIcon
          data-check
          className={`size-4 ${checked ? '' : 'invisible'}`}
        />
      </span>
      {name}
    </label>
  );
}

/** A blank of the sentence: an underlined inline input with a hidden label. */
function Blank({
  label,
  field,
  value,
  onChange,
  invalid,
  placeholder,
  autoComplete,
}: {
  label: string;
  field: 'name' | 'dogName';
  value: string;
  onChange: (value: string) => void;
  invalid: boolean;
  placeholder: string;
  autoComplete: string;
}): ReactNode {
  const id = useId();
  return (
    <span className="inline-block align-baseline">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        data-field={field}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={invalid || undefined}
        size={Math.max(placeholder.length, value.length + 1)}
        className={`mx-1 max-w-full border-b-3 bg-transparent px-1 font-heading font-bold text-leaf-ink placeholder:font-semibold placeholder:text-forest/35 focus:border-leaf focus:outline-none ${invalid ? 'border-brown' : 'border-forest/25'}`}
      />
    </span>
  );
}

/** Props for {@link ContactForm}. */
export type ContactFormProps = {
  /** Official WhatsApp that receives the message. */
  contact: WhatsAppContact;
  /** Service names, in page order. */
  services: readonly string[];
};

/**
 * Quote request form shaped as a chat window. A two-option switch picks
 * "Mensagem pronta" (a fill-in sentence: the visitor's name, the dog's name
 * and one or more services) or "Escrever do meu jeito" (a blank text box).
 * Sending opens WhatsApp with the message; nothing is stored or logged.
 */
export function ContactForm({
  contact,
  services,
}: ContactFormProps): ReactNode {
  const scope = useRef<HTMLFormElement>(null);
  const firstRender = useRef(true);
  const ownId = useId();
  const [mode, setMode] = useState<Mode>('ready');
  const [chosen, setChosen] = useState<readonly string[]>([]);
  const [name, setName] = useState('');
  const [dogName, setDogName] = useState('');
  const [own, setOwn] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const request = {
    services: services.filter((service) => chosen.includes(service)),
    name,
    dogName,
  };

  // Fade the newly shown content in when the visitor switches modes.
  useGSAP(
    () => {
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from('[data-swap]', {
          autoAlpha: 0,
          y: 14,
          duration: 0.45,
          ease: 'power3.out',
        });
      });
    },
    { scope, dependencies: [mode], revertOnUpdate: true },
  );

  const clearError = (field: Field): void =>
    setErrors((found) => ({ ...found, [field]: undefined }));

  const edit =
    (field: Field, set: (value: string) => void) =>
    (value: string): void => {
      set(value);
      clearError(field);
    };

  const toggle = (service: string, on: boolean): void => {
    setChosen((list) =>
      on ? [...list, service] : list.filter((item) => item !== service),
    );
    if (on) clearError('services');
  };

  const switchMode = (next: Mode): void => {
    setErrors({});
    setMode(next);
  };

  const submit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const found: FormErrors =
      mode === 'own'
        ? { own: validateOwnMessage(own) }
        : validateQuote(request);
    setErrors(found);
    // Focus the first invalid field in page order.
    const invalid = [
      ...event.currentTarget.querySelectorAll<HTMLElement>('[data-field]'),
    ].find((el) => {
      const field = el.dataset.field;
      return isField(field) && Boolean(found[field]);
    });
    if (invalid) {
      invalid.focus();
      return;
    }
    // Nothing is stored: the message goes straight to WhatsApp.
    const message = mode === 'own' ? own.trim() : quoteMessage(request);
    window.open(
      whatsAppLink(contact, message),
      '_blank',
      'noopener,noreferrer',
    );
  };

  return (
    <form
      ref={scope}
      noValidate
      onSubmit={submit}
      className="overflow-hidden rounded-blob bg-white shadow-lift"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 bg-forest px-6 py-4 sm:px-10">
        <p className="flex items-center gap-3 font-heading font-bold text-white">
          <span className="flex size-10 items-center justify-center rounded-full bg-lime text-forest">
            <PawIcon className="size-5 rotate-12" />
          </span>
          Para: Nossa Matilha
        </p>
        <fieldset className="relative grid w-full grid-cols-2 rounded-full bg-olive p-1 sm:w-auto">
          <legend className="sr-only">Como você quer enviar?</legend>
          <span
            aria-hidden="true"
            className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-lime transition-transform duration-300 ease-out-soft ${mode === 'own' ? 'translate-x-full' : ''}`}
          />
          {modes.map((option) => (
            <label
              key={option.mode}
              className={`relative cursor-pointer rounded-full px-4 py-2 text-center font-heading text-caption font-bold transition-colors has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-sun ${mode === option.mode ? 'text-forest' : 'text-cream'}`}
            >
              <input
                type="radio"
                name="modo-da-mensagem"
                className="sr-only"
                checked={mode === option.mode}
                onChange={() => switchMode(option.mode)}
              />
              {option.label}
            </label>
          ))}
        </fieldset>
      </div>

      <div className="p-6 sm:p-10">
        <div data-swap>
          {mode === 'own' ? (
            <div>
              <label
                htmlFor={ownId}
                className="font-heading font-bold text-forest"
              >
                Sua mensagem
              </label>
              <textarea
                id={ownId}
                data-field="own"
                rows={6}
                value={own}
                onChange={(event) => edit('own', setOwn)(event.target.value)}
                placeholder="Digite sua mensagem aqui"
                aria-invalid={Boolean(errors.own) || undefined}
                aria-describedby={errors.own ? `${ownId}-erro` : undefined}
                className={`mt-1.5 block w-full resize-y rounded-md border-2 bg-cream-light px-4 py-3 text-ink placeholder:text-ink/45 ${errors.own ? 'border-brown' : 'border-forest/15 focus:border-leaf'}`}
              />
              {errors.own ? (
                <p
                  id={`${ownId}-erro`}
                  className="mt-1 text-caption font-semibold text-brown"
                >
                  {errors.own}
                </p>
              ) : null}
            </div>
          ) : (
            <div>
              <p className="text-h3 leading-loose font-semibold text-forest">
                Olá, Nossa Matilha! Meu nome é
                <Blank
                  label="Seu nome"
                  field="name"
                  value={name}
                  onChange={edit('name', setName)}
                  invalid={Boolean(errors.name)}
                  placeholder="seu nome"
                  autoComplete="given-name"
                />
                e o meu cão se chama
                <Blank
                  label="Nome do seu cão"
                  field="dogName"
                  value={dogName}
                  onChange={edit('dogName', setDogName)}
                  invalid={Boolean(errors.dogName)}
                  placeholder="nome do cão"
                  autoComplete="off"
                />
                .
              </p>
              {errors.name || errors.dogName ? (
                <ul className="mt-1 text-caption font-semibold text-brown">
                  {errors.name ? <li>{errors.name}</li> : null}
                  {errors.dogName ? <li>{errors.dogName}</li> : null}
                </ul>
              ) : null}

              <fieldset className="mt-5">
                <legend className="text-h3 font-semibold text-forest">
                  Quero um orçamento de{' '}
                  <span className="text-body font-bold text-leaf-ink">
                    (escolha um ou mais)
                  </span>
                  :
                </legend>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {services.map((service, i) => (
                    <ServicePill
                      key={service}
                      name={service}
                      checked={chosen.includes(service)}
                      first={i === 0}
                      onToggle={toggle}
                    />
                  ))}
                </div>
                {errors.services ? (
                  <p className="mt-2 text-caption font-semibold text-brown">
                    {errors.services}
                  </p>
                ) : null}
              </fieldset>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col items-end border-t border-forest/10 pt-6 text-right">
          <Button
            type="submit"
            variant="primary"
            icon={<ChatIcon className="size-5" />}
          >
            {mode === 'own'
              ? 'Enviar mensagem no WhatsApp'
              : 'Solicitar orçamento no WhatsApp'}
          </Button>
          <p className="mt-3 text-caption text-fg-muted">
            Seus dados não ficam salvos no site: servem só para montar a
            mensagem que você envia pelo WhatsApp.
          </p>
        </div>
      </div>
    </form>
  );
}
