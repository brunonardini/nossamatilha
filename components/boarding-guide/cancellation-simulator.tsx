'use client';

import { useId, useState, type ReactNode } from 'react';
import { CheckIcon } from '@/components/ui/icons';
import {
  CANCELLATION,
  DAILY_RATE_BRL,
  formatBRL,
} from '@/lib/boarding-guide/pricing';
import { useStayDays } from '@/lib/boarding-guide/stay-store';

/** Notice given before the scheduled check-in. */
type Notice = 'withNotice' | 'late';

const notices: { value: Notice; label: string }[] = [
  { value: 'withNotice', label: '48h ou mais antes' },
  { value: 'late', label: 'Menos de 48h ou não compareceu' },
];

const MAX_DAYS = 30;

function percent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

/**
 * Checkpoint 4: the visitor picks how early they cancel and sees both
 * options (refund or credit) for their stay. The number of daily rates
 * comes from the daily-rate simulator and can be adjusted here.
 * Completes after the visitor has seen both notices.
 */
export function CancellationSimulator(): ReactNode {
  const id = useId();
  const sharedDays = useStayDays();
  const [ownDays, setOwnDays] = useState<number | null>(null);
  const [notice, setNotice] = useState<Notice>('withNotice');
  const [seen, setSeen] = useState<ReadonlySet<Notice>>(
    () => new Set<Notice>(['withNotice']),
  );

  const days = ownDays ?? sharedDays;
  const paid = days * DAILY_RATE_BRL;
  const policy = CANCELLATION[notice];
  const refund = paid * policy.refund;
  const credit = paid * policy.credit;
  const done = seen.size === notices.length;

  function chooseNotice(value: Notice): void {
    setNotice(value);
    setSeen((previous) => new Set(previous).add(value));
  }

  function changeDays(delta: number): void {
    setOwnDays(Math.min(MAX_DAYS, Math.max(1, days + delta)));
  }

  const stepButton =
    'grid size-11 place-items-center rounded-full bg-olive font-heading text-h3 font-bold text-cream transition-transform duration-(--duration-fast) hover:-translate-y-0.5 disabled:opacity-40';

  return (
    <div
      data-checkpoint="cancelamento"
      data-done={done || undefined}
      className="rounded-card bg-surface-raised p-5 shadow-card sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p id={`${id}-days-label`} className="font-heading font-bold">
            Sua reserva
          </p>
          <p className="text-caption text-fg-muted">
            {ownDays === null
              ? 'Usando as diárias da sua simulação.'
              : 'Ajuste quantas diárias foram pagas.'}
          </p>
        </div>
        <div
          role="group"
          aria-labelledby={`${id}-days-label`}
          className="flex items-center gap-3"
        >
          <button
            type="button"
            onClick={() => changeDays(-1)}
            disabled={days <= 1}
            aria-label="Menos uma diária"
            className={stepButton}
          >
            −
          </button>
          <p aria-live="polite" className="min-w-28 text-center">
            <span className="block font-display text-h2 text-accent">
              {days} {days === 1 ? 'diária' : 'diárias'}
            </span>
            <span className="text-caption text-fg-muted">
              {formatBRL(paid)} pagos
            </span>
          </p>
          <button
            type="button"
            onClick={() => changeDays(1)}
            disabled={days >= MAX_DAYS}
            aria-label="Mais uma diária"
            className={stepButton}
          >
            +
          </button>
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className="font-heading font-bold">
          Quando você avisou do cancelamento?
        </legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {notices.map((option) => (
            <label
              key={option.value}
              className="flex min-h-12 cursor-pointer items-center gap-3 rounded-md border-2 border-cream/30 px-4 py-2 font-heading font-semibold transition-colors duration-(--duration-fast) has-checked:border-lime has-checked:bg-lime has-checked:text-forest has-focus-visible:outline-3 has-focus-visible:outline-sun"
            >
              <input
                type="radio"
                name={`${id}-notice`}
                value={option.value}
                checked={notice === option.value}
                onChange={() => chooseNotice(option.value)}
                className="sr-only"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div aria-live="polite">
        <p className="mt-6 text-caption text-fg-muted">
          Você escolhe uma das opções:
        </p>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <div className="rounded-md bg-olive p-4">
            <p className="text-caption text-fg-muted">
              Devolução de {percent(policy.refund)}
            </p>
            <p className="font-display text-h1 text-accent">
              {formatBRL(refund)}
            </p>
            <p className="text-caption text-fg-muted">
              {policy.refund < 1
                ? `Retenção de ${formatBRL(paid - refund)}`
                : 'Sem retenção'}
            </p>
          </div>
          <div className="rounded-md bg-olive p-4">
            <p className="text-caption text-fg-muted">
              Crédito de {percent(policy.credit)}
            </p>
            <p className="font-display text-h1 text-accent">
              {formatBRL(credit)}
            </p>
            <p className="text-caption text-fg-muted">
              Para usar em até {CANCELLATION.creditValidityMonths} meses
            </p>
          </div>
        </div>

        {done ? (
          <p className="checkpoint-complete mt-6 flex items-center gap-2 rounded-card bg-lime p-4 font-heading font-bold text-forest">
            <CheckIcon className="size-5" />
            Parada 4 de 4 concluída
          </p>
        ) : (
          <p className="mt-6 text-caption text-highlight">
            Agora veja como fica com menos de 48h de antecedência.
          </p>
        )}
      </div>
    </div>
  );
}
