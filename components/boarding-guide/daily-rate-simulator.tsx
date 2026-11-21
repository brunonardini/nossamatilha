'use client';

import { useEffect, useId, useState, type ReactNode } from 'react';
import { CheckIcon } from '@/components/ui/icons';
import {
  WEEKDAYS,
  calculateStay,
  weekdayAfter,
} from '@/lib/boarding-guide/daily-rate';
import {
  BUSINESS_HOURS,
  DAILY_RATE_BRL,
  formatBRL,
} from '@/lib/boarding-guide/pricing';
import { setStayDays } from '@/lib/boarding-guide/stay-store';

/** Longest stay offered by the simulator, in days after check-in. */
const MAX_DAYS_LATER = 14;

const hours = Array.from(
  { length: BUSINESS_HOURS.closes - BUSINESS_HOURS.opens + 1 },
  (_, index) => BUSINESS_HOURS.opens + index,
);

const daysLaterOptions = Array.from(
  { length: MAX_DAYS_LATER + 1 },
  (_, index) => index,
);

function daysLaterLabel(weekday: number, daysLater: number): string {
  const name = weekdayAfter(weekday, daysLater);
  if (daysLater === 0) return `${name} (mesmo dia)`;
  if (daysLater === 1) return `${name} (dia seguinte)`;
  return `${name} (${daysLater} dias depois)`;
}

function plural(count: number, one: string, many: string): string {
  return `${count} ${count === 1 ? one : many}`;
}

const selectClass =
  'mt-1 block min-h-12 w-full rounded-md border-2 border-cream/30 bg-surface-raised px-3 font-heading font-semibold text-fg focus-visible:border-lime';

/**
 * Checkpoint 2: the visitor picks check-in and check-out and sees how many
 * daily rates (24h blocks from check-in) the stay costs. The server renders
 * the default example, so the result is readable without JavaScript.
 */
export function DailyRateSimulator(): ReactNode {
  const id = useId();
  // Default example from the script: Friday 10h → Sunday 16h.
  const [weekday, setWeekday] = useState(4);
  const [checkInHour, setCheckInHour] = useState(10);
  const [daysLater, setDaysLater] = useState(2);
  const [checkOutHour, setCheckOutHour] = useState(16);
  const [touched, setTouched] = useState(false);

  const result = calculateStay({ checkInHour, daysLater, checkOutHour });
  const resultDays = result.valid ? result.days : null;

  // Share the simulated stay with the cancellation simulator.
  useEffect(() => {
    if (resultDays !== null) setStayDays(resultDays);
  }, [resultDays]);

  function update<T>(setter: (value: T) => void, value: T): void {
    setter(value);
    setTouched(true);
  }

  return (
    <div data-checkpoint="diaria" data-done={touched || undefined}>
      <div className="grid gap-4 rounded-card bg-surface-raised p-5 shadow-card sm:grid-cols-2">
        <fieldset>
          <legend className="font-heading font-bold text-heading">
            Entrada
          </legend>
          <label htmlFor={`${id}-weekday`} className="mt-2 block text-caption">
            Dia
          </label>
          <select
            id={`${id}-weekday`}
            value={weekday}
            onChange={(event) => update(setWeekday, Number(event.target.value))}
            className={selectClass}
          >
            {WEEKDAYS.map((name, index) => (
              <option key={name} value={index}>
                {name}
              </option>
            ))}
          </select>
          <label htmlFor={`${id}-in`} className="mt-3 block text-caption">
            Horário
          </label>
          <select
            id={`${id}-in`}
            value={checkInHour}
            onChange={(event) =>
              update(setCheckInHour, Number(event.target.value))
            }
            className={selectClass}
          >
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}h
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset>
          <legend className="font-heading font-bold text-heading">Saída</legend>
          <label htmlFor={`${id}-days`} className="mt-2 block text-caption">
            Dia
          </label>
          <select
            id={`${id}-days`}
            value={daysLater}
            onChange={(event) =>
              update(setDaysLater, Number(event.target.value))
            }
            className={selectClass}
          >
            {daysLaterOptions.map((option) => (
              <option key={option} value={option}>
                {daysLaterLabel(weekday, option)}
              </option>
            ))}
          </select>
          <label htmlFor={`${id}-out`} className="mt-3 block text-caption">
            Horário
          </label>
          <select
            id={`${id}-out`}
            value={checkOutHour}
            onChange={(event) =>
              update(setCheckOutHour, Number(event.target.value))
            }
            className={selectClass}
          >
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}h
              </option>
            ))}
          </select>
        </fieldset>
        <p className="text-caption text-fg-muted sm:col-span-2">
          Entrada e retirada das {BUSINESS_HOURS.opens}h às{' '}
          {BUSINESS_HOURS.closes}h.
        </p>
      </div>

      <div aria-live="polite" className="mt-6">
        {result.valid ? (
          <>
            <p className="font-display text-h1 text-accent">
              {plural(result.days, 'diária', 'diárias')} ·{' '}
              {formatBRL(result.total)}
            </p>
            <p className="mt-1 text-fg-muted">
              {plural(result.hours, 'hora', 'horas')} de estadia, de{' '}
              {WEEKDAYS[weekday]} às {checkInHour}h até{' '}
              {weekdayAfter(weekday, daysLater)} às {checkOutHour}h.
            </p>

            <ol className="mt-5 grid gap-2" aria-label="Diárias da estadia">
              {Array.from({ length: result.days }, (_, index) => {
                const isLast = index === result.days - 1;
                const fraction = isLast ? result.lastDayHours / 24 : 1;
                return (
                  <li key={index}>
                    <p className="flex justify-between text-caption">
                      <span className="font-semibold">{index + 1}ª diária</span>
                      <span className="text-fg-muted">
                        {weekdayAfter(weekday, index)} {checkInHour}h →{' '}
                        {weekdayAfter(weekday, index + 1)} {checkInHour}h
                      </span>
                    </p>
                    <div className="mt-1 h-3 overflow-hidden rounded-full bg-forest">
                      <div
                        className="h-full origin-left rounded-full bg-lime transition-transform duration-(--duration-slow) ease-out-soft"
                        style={{ transform: `scaleX(${fraction})` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ol>

            {result.hours < 24 ? (
              <p className="mt-4">
                Mesmo com menos de 24 horas, conta como 1 diária completa: não
                fazemos meia diária.
              </p>
            ) : null}
            {result.savableHours !== null ? (
              <p className="mt-4 text-highlight">
                Dica: a última diária foi usada só por{' '}
                {plural(result.savableHours, 'hora', 'horas')}. Saindo até as{' '}
                {checkInHour}h de {weekdayAfter(weekday, result.days - 1)}, a
                estadia fica em {plural(result.days - 1, 'diária', 'diárias')} (
                {formatBRL((result.days - 1) * DAILY_RATE_BRL)}).
              </p>
            ) : null}
          </>
        ) : (
          <p className="rounded-md border-2 border-sun/60 px-4 py-3">
            A saída precisa ser depois da entrada. Ajuste o dia ou o horário.
          </p>
        )}

        {touched ? (
          <p className="mt-6 flex items-center gap-2 rounded-card bg-lime p-4 font-heading font-bold text-forest">
            <CheckIcon className="size-5" />
            Parada 2 de 4 concluída
          </p>
        ) : (
          <p className="mt-6 text-caption text-fg-muted">
            Mude a entrada ou a saída para ver o cálculo da sua estadia.
          </p>
        )}
      </div>
    </div>
  );
}
