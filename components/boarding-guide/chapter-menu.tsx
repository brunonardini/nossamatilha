'use client';

import { useId, useRef, type ReactNode } from 'react';
import { CheckIcon, ListIcon } from '@/components/ui/icons';
import { chapters } from '@/lib/boarding-guide/chapters';

/**
 * Chapter index menu of the boarding guide. Uses the native Popover API, so
 * it closes on outside click and on Escape; choosing a chapter also closes it.
 */
export function ChapterMenu(): ReactNode {
  const id = useId();
  const menuId = `${id}-menu`;
  const menuRef = useRef<HTMLElement>(null);

  return (
    <>
      <button
        type="button"
        popoverTarget={menuId}
        className="flex min-h-11 items-center gap-2 rounded-full px-3 font-heading font-semibold text-forest hover:bg-forest/10"
      >
        <ListIcon className="size-5" />
        <span>Capítulos</span>
      </button>
      <nav
        ref={menuRef}
        id={menuId}
        popover="auto"
        aria-label="Capítulos do guia"
        className="fixed inset-auto top-16 right-4 m-0 max-h-[calc(100svh-5rem)] w-72 overflow-y-auto rounded-card border-0 bg-white p-2 text-ink shadow-lift sm:right-8"
      >
        <ol className="space-y-1">
          {chapters.map((chapter, index) => (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                onClick={() => menuRef.current?.hidePopover()}
                data-checkpoint-item={
                  chapter.kind === 'rule' ? chapter.id : undefined
                }
                className="flex min-h-11 items-center gap-3 rounded-md px-3 py-2 text-ink hover:bg-cream"
              >
                <span
                  aria-hidden="true"
                  className={`grid size-7 shrink-0 place-items-center rounded-full font-heading text-caption font-bold ${chapter.kind === 'rule' ? 'bg-olive text-cream' : 'bg-cream text-forest'}`}
                >
                  {index}
                </span>
                <span>{chapter.title}</span>
                {chapter.kind === 'rule' ? (
                  <span className="checkpoint-mark ml-auto grid size-6 shrink-0 place-items-center rounded-full text-olive">
                    <CheckIcon className="size-4" />
                  </span>
                ) : null}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
