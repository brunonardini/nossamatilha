import type { ReactNode } from 'react';
import { CheckIcon } from '@/components/ui/icons';

/** One item of the vaccine checklist. */
type VaccineItem = {
  id: string;
  name: string;
  status: string;
  required: boolean;
};

const items: VaccineItem[] = [
  {
    id: 'v10',
    name: 'V10 (vacina polivalente múltipla)',
    status: 'Obrigatória',
    required: true,
  },
  { id: 'raiva', name: 'Raiva', status: 'Obrigatória', required: true },
  {
    id: 'antiparasitario',
    name: 'Antiparasitário e vermífugo em dia',
    status: 'Obrigatório',
    required: true,
  },
  { id: 'gripe', name: 'Gripe', status: 'Aconselhável', required: false },
];

/**
 * Checkpoint 1: the visitor ticks what their dog already has. Feedback is
 * pure CSS (`.checklist` in globals.css), so it needs no JavaScript. Nothing
 * is stored or sent: the boxes only exist on this page.
 */
export function VaccineChecklist(): ReactNode {
  return (
    <div className="checklist">
      <fieldset aria-describedby="vacinas-feedback">
        <legend className="font-heading text-lead font-semibold">
          Marque o que o seu cão já tem:
        </legend>
        <ul className="mt-4 grid gap-3">
          {items.map((item) => (
            <li key={item.id}>
              <label
                htmlFor={`vacina-${item.id}`}
                className="flex min-h-14 cursor-pointer items-center gap-4 rounded-md bg-surface-raised px-4 py-3 transition-[background-color,box-shadow] duration-(--duration-fast) hover:bg-forest/70 has-checked:ring-2 has-checked:ring-lime has-focus-visible:outline-3 has-focus-visible:outline-sun"
              >
                <input
                  id={`vacina-${item.id}`}
                  name={item.id}
                  type="checkbox"
                  data-required={item.required ? '' : undefined}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className="grid size-7 shrink-0 place-items-center rounded-sm border-2 border-cream/60 text-transparent transition-[background-color,color,transform] duration-(--duration-base) ease-playful peer-checked:scale-110 peer-checked:border-lime peer-checked:bg-lime peer-checked:text-forest"
                >
                  <CheckIcon className="size-5" />
                </span>
                <span className="font-heading font-semibold">{item.name}</span>
                <span className="ml-auto text-right text-caption text-accent">
                  {item.status}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <div id="vacinas-feedback" aria-live="polite" className="mt-6">
        <p data-checklist-state="empty" className="text-fg-muted">
          V10, raiva e antiparasitário em dia são obrigatórios. A gripe é
          aconselhável.
        </p>
        <p
          data-checklist-state="missing"
          className="rounded-md border-2 border-sun/60 px-4 py-3"
        >
          Sem a V10, a raiva e o antiparasitário em dia, não conseguimos receber
          o seu cão. Fale com o seu veterinário antes de reservar.
        </p>
        <div
          data-checklist-state="done"
          className="rounded-card bg-lime p-5 text-forest shadow-card"
        >
          <p className="flex items-center gap-2 font-heading text-caption font-bold tracking-widest uppercase">
            <CheckIcon className="size-5" />
            Parada 1 de 4 concluída
          </p>
          <p className="mt-2 font-heading text-h3 font-bold">Tudo certo!</p>
          <p className="mt-1">
            Na hora de reservar, é só enviar uma{' '}
            <strong>foto do cartão de vacinação atualizado</strong> junto com a
            ficha cadastral.
          </p>
        </div>
      </div>
    </div>
  );
}
