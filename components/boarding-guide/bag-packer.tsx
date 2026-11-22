import type { ReactNode } from 'react';
import { CheckIcon, CrossIcon } from '@/components/ui/icons';

/** An item the visitor can put in the bag. */
type BagItem = {
  id: string;
  name: string;
  /** Feedback shown once the item is in the bag. */
  note: string;
  /** Required items must be in the bag to complete the checkpoint. */
  required?: boolean;
  /** `essential`: food and medication; `optional`: comfort items. */
  category: 'essential' | 'optional';
  icon: ReactNode;
};

function ItemIcon({ children }: { children: ReactNode }): ReactNode {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="size-7"
    >
      {children}
    </svg>
  );
}

const items: BagItem[] = [
  {
    id: 'racao',
    category: 'essential',
    name: 'Ração para toda a estadia',
    note: 'Anote a quantidade e os horários das refeições.',
    required: true,
    icon: (
      <ItemIcon>
        <path d="M3 11h18l-1.5 7a2 2 0 0 1-2 1.6H6.5a2 2 0 0 1-2-1.6L3 11Z" />
        <path d="M7 11c0-2 1.5-3.5 2.5-3.5S12 9 12 11M12 11c0-2.5 1.5-4.5 3-4.5s2 2 2 4.5" />
      </ItemIcon>
    ),
  },
  {
    id: 'remedios',
    category: 'essential',
    name: 'Remédios (se o seu cão usar)',
    note: 'Sempre com a prescrição veterinária: nome, dose, horários e período.',
    icon: (
      <ItemIcon>
        <rect
          x="3"
          y="9"
          width="18"
          height="7"
          rx="3.5"
          transform="rotate(-35 12 12.5)"
        />
        <path d="m9.5 8.5 4.5 7" />
      </ItemIcon>
    ),
  },
  {
    id: 'caminha',
    category: 'optional',
    name: 'Caminha',
    note: 'Temos caminhas. Se preferir, traga a que ele usa em casa.',
    icon: (
      <ItemIcon>
        <path d="M3 17v-5a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v5" />
        <path d="M2 17h20M6 13h12" />
      </ItemIcon>
    ),
  },
  {
    id: 'mantinha',
    category: 'optional',
    name: 'Mantinha',
    note: 'Se ele costuma dormir com uma manta, pode trazer a dele.',
    icon: (
      <ItemIcon>
        <path d="M4 5h16v11l-3 3H4V5Z" />
        <path d="M17 19v-3h3M8 9h8M8 13h5" />
      </ItemIcon>
    ),
  },
  {
    id: 'brinquedo',
    category: 'optional',
    name: 'Brinquedo favorito',
    note: 'Temos brinquedos aqui. O favorito de casa também pode vir.',
    icon: (
      <ItemIcon>
        <circle cx="12" cy="12" r="8" />
        <path d="M5 9c3 1.5 11 1.5 14 0M5 15c3-1.5 11-1.5 14 0" />
      </ItemIcon>
    ),
  },
];

/** Items not to bring: shown for information, not selectable. */
const notToBring = [
  {
    id: 'potes',
    name: 'Potes de comida e água',
    note: 'Aqui usamos nossos próprios potes, que podem ser esterilizados.',
    icon: (
      <ItemIcon>
        <path d="M4 12h16l-2 6H6l-2-6Z" />
        <path d="M8 12c0-2 1.8-3 4-3s4 1 4 3" />
      </ItemIcon>
    ),
  },
];

const groups = [
  {
    category: 'essential',
    title: 'Não pode faltar',
    hint: 'Traga ração para toda a estadia e os remédios que seu cão usa.',
  },
  {
    category: 'optional',
    title: 'Itens opcionais',
    hint: 'Seu cão pode trazer os itens que costuma usar em casa.',
  },
] as const;

/**
 * Checkpoint 3: the visitor taps items to put them in the bag. Everything is
 * native checkboxes plus CSS `:has()` (see `.checklist` in globals.css), so it
 * needs no JavaScript. Completes when the food is in the bag.
 */
export function BagPacker(): ReactNode {
  return (
    <div className="checklist group">
      <fieldset aria-describedby="malinha-feedback">
        <legend className="font-heading text-lead font-semibold">
          Toque nos itens para colocar na malinha:
        </legend>
        {groups.map((group) => (
          <div key={group.category} className="mt-6">
            <h3 className="text-h3 font-bold">{group.title}</h3>
            <p className="text-caption text-fg-muted">{group.hint}</p>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {items
                .filter((item) => item.category === group.category)
                .map((item) => (
                  <li key={item.id}>
                    <label
                      htmlFor={`malinha-${item.id}`}
                      className="flex h-full min-h-16 cursor-pointer flex-col justify-center rounded-md bg-surface-raised px-4 py-3 transition-[background-color,box-shadow] duration-(--duration-fast) hover:bg-forest/70 has-checked:ring-2 has-checked:ring-lime has-focus-visible:outline-3 has-focus-visible:outline-sun"
                    >
                      <span className="flex items-center gap-3">
                        <input
                          id={`malinha-${item.id}`}
                          type="checkbox"
                          data-required={item.required ? '' : undefined}
                          className="peer sr-only"
                        />
                        <span className="text-lime transition-transform duration-(--duration-base) ease-playful peer-checked:scale-110">
                          {item.icon}
                        </span>
                        <span className="font-heading font-semibold">
                          {item.name}
                        </span>
                        {item.required ? (
                          <span className="ml-auto text-caption text-accent">
                            Obrigatória
                          </span>
                        ) : null}
                      </span>
                      <span
                        className={`mt-2 text-caption text-highlight ${noteVisibility[item.id]}`}
                      >
                        {item.note}
                      </span>
                    </label>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </fieldset>

      <div className="mt-6">
        <h3 className="text-h3 font-bold">Não precisa trazer</h3>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {notToBring.map((item) => (
            <li
              key={item.id}
              className="flex flex-col justify-center rounded-md border-2 border-dashed border-cream/30 px-4 py-3"
            >
              <span className="flex items-center gap-3">
                <span className="text-fg-muted">{item.icon}</span>
                <span className="font-heading font-semibold">{item.name}</span>
                <span className="ml-auto grid size-7 shrink-0 place-items-center rounded-full bg-brown text-cream">
                  <CrossIcon className="size-4" />
                  <span className="sr-only">Não trazer</span>
                </span>
              </span>
              <span className="mt-2 text-caption text-fg-muted">
                {item.note}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 grid items-start gap-6 sm:grid-cols-2">
        <div
          aria-hidden="true"
          className="relative rounded-blob bg-brown px-5 pt-10 pb-6 text-cream shadow-lift"
        >
          <span className="absolute -top-5 left-1/2 h-10 w-24 -translate-x-1/2 rounded-t-full border-8 border-b-0 border-brown" />
          <p className="font-heading text-caption font-semibold tracking-widest text-cream/80 uppercase">
            Malinha
          </p>
          <ul className="mt-3 flex min-h-12 flex-wrap gap-2">
            {items.map((item) => (
              <li
                key={item.id}
                className={`items-center gap-2 rounded-full bg-cream px-3 py-1 font-heading text-caption font-semibold text-brown ${bagVisibility[item.id]}`}
              >
                <span className="[&_svg]:size-5">{item.icon}</span>
                {item.name.replace(/ \(.*\)$/, '')}
              </li>
            ))}
            <li className="text-caption text-cream/80 group-has-[input:checked]:hidden">
              Vazia
            </li>
          </ul>
        </div>

        <div id="malinha-feedback" aria-live="polite">
          <p data-checklist-state="empty" className="text-fg-muted">
            Comece pela ração. Se o seu cão toma remédio, inclua também.
          </p>
          <p
            data-checklist-state="missing"
            className="rounded-md border-2 border-sun/60 px-4 py-3"
          >
            Falta marcar a ração para toda a estadia.
          </p>
          <div
            data-checklist-state="done"
            className="checkpoint-complete rounded-card bg-lime p-5 text-forest shadow-card"
          >
            <p className="flex items-center gap-2 font-heading text-caption font-bold tracking-widest uppercase">
              <CheckIcon className="size-5" />
              Parada 3 de 4 concluída
            </p>
            <p className="mt-2 font-heading text-h3 font-bold">
              Malinha pronta!
            </p>
            <p className="mt-1">
              Deixe por escrito as orientações sobre refeições e remédios.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
 * Tailwind needs complete class names in the source, so the per-item
 * `:has()` selectors are listed explicitly.
 */
const noteVisibility: Record<string, string> = {
  racao: 'hidden group-has-[#malinha-racao:checked]:block',
  remedios: 'hidden group-has-[#malinha-remedios:checked]:block',
  caminha: 'hidden group-has-[#malinha-caminha:checked]:block',
  mantinha: 'hidden group-has-[#malinha-mantinha:checked]:block',
  brinquedo: 'hidden group-has-[#malinha-brinquedo:checked]:block',
};

const bagVisibility: Record<string, string> = {
  racao: 'hidden group-has-[#malinha-racao:checked]:flex',
  remedios: 'hidden group-has-[#malinha-remedios:checked]:flex',
  caminha: 'hidden group-has-[#malinha-caminha:checked]:flex',
  mantinha: 'hidden group-has-[#malinha-mantinha:checked]:flex',
  brinquedo: 'hidden group-has-[#malinha-brinquedo:checked]:flex',
};
