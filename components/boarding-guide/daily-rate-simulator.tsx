'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { CheckIcon } from '@/components/ui/icons';
import {
  BUSINESS_HOUR_OPTIONS,
  DAYS_LATER_OPTIONS,
  WEEKDAYS,
  calculateStay,
  dailyRateFractions,
  daysLaterLabel,
  weekdayAfter,
} from '@/lib/boarding-guide/daily-rate';
import { BUSINESS_HOURS, formatBRL } from '@/lib/boarding-guide/pricing';
import { setStayDays } from '@/lib/boarding-guide/stay-store';
import { plural } from '@/lib/format';
import { MOTION_OK, gsap, useGSAP } from '@/lib/gsap';

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

  // Motion on every change (not on first render): bars refill, the total
  // pops and, the first time, the "concluída" badge pops in.
  const resultRef = useRef<HTMLDivElement>(null);
  const stayKey = `${weekday}-${checkInHour}-${daysLater}-${checkOutHour}`;
  const animatedKey = useRef(stayKey);
  useGSAP(
    () => {
      // Compare values (not a first-render flag) so Strict Mode's double
      // effect run does not animate on mount.
      if (animatedKey.current === stayKey) return;
      animatedKey.current = stayKey;
      const root = resultRef.current;
      if (!root) return;
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          root.querySelectorAll('[data-rate-bar]'),
          { scaleX: 0 },
          {
            scaleX: (_index: number, bar: Element) =>
              bar instanceof HTMLElement ? Number(bar.dataset.fraction) : 1,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.08,
          },
        );
        gsap.fromTo(
          root.querySelector('[data-rate-total]'),
          { scale: 0.9, autoAlpha: 0.3 },
          { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out(2)' },
        );
      });
    },
    {
      scope: resultRef,
      dependencies: [stayKey],
    },
  );
  useGSAP(
    () => {
      const badge = resultRef.current?.querySelector('[data-rate-done]');
      if (!touched || !badge) return;
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from(badge, {
          autoAlpha: 0,
          y: 16,
          scale: 0.92,
          duration: 0.6,
          ease: 'back.out(1.8)',
        });
      });
    },
    { scope: resultRef, dependencies: [touched] },
  );

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
            {BUSINESS_HOUR_OPTIONS.map((hour) => (
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
            {DAYS_LATER_OPTIONS.map((option) => (
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
            {BUSINESS_HOUR_OPTIONS.map((hour) => (
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

      <div ref={resultRef} aria-live="polite" className="mt-6">
        {result.valid ? (
          <>
            <p
              data-rate-total
              className="w-fit font-display text-h1 text-accent"
            >
              {plural(result.days, 'diária', 'diárias')} ·{' '}
              {formatBRL(result.total)}
            </p>
            <p className="mt-1 text-fg-muted">
              {plural(result.hours, 'hora', 'horas')} de estadia, de{' '}
              {WEEKDAYS[weekday]} às {checkInHour}h até{' '}
              {weekdayAfter(weekday, daysLater)} às {checkOutHour}h.
            </p>

            <ol className="mt-5 grid gap-2" aria-label="Diárias da estadia">
              {dailyRateFractions(result.days, result.lastDayHours).map(
                (fraction, index) => (
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
                        data-rate-bar
                        data-fraction={fraction}
                        className="h-full origin-left rounded-full bg-lime"
                        style={{ transform: `scaleX(${fraction})` }}
                      />
                    </div>
                  </li>
                ),
              )}
            </ol>

            {result.hours < 24 ? (
              <p className="mt-4">
                Estadias de menos de 24 horas custam uma diária inteira.
              </p>
            ) : null}
            {result.savableHours !== null && result.earlierTotal !== null ? (
              <p className="mt-4 text-highlight">
                Neste exemplo, a última diária cobre{' '}
                {plural(result.savableHours, 'hora', 'horas')} da estadia. Se
                você buscar seu cão até as {checkInHour}h de{' '}
                {weekdayAfter(weekday, result.days - 1)}, o total cai para{' '}
                {plural(result.days - 1, 'diária', 'diárias')} (
                {formatBRL(result.earlierTotal)}).
              </p>
            ) : null}
          </>
        ) : (
          <p className="rounded-md border-2 border-sun/60 px-4 py-3">
            Escolha um dia ou horário de saída posterior à entrada.
          </p>
        )}

        {touched ? (
          <p
            data-rate-done
            className="checkpoint-complete mt-6 flex items-center gap-2 rounded-card bg-lime p-4 font-heading font-bold text-forest"
          >
            <CheckIcon className="size-5" />
            Parada 2 de 4 concluída
          </p>
        ) : (
          <p className="mt-6 text-caption text-fg-muted">
            Ajuste os dias ou horários para calcular o valor da sua estadia.
          </p>
        )}
      </div>
    </div>
  );
}
