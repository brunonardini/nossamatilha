'use client';

import { useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';

/** Props for {@link LocationMap}. */
export type LocationMapProps = {
  /** Google Maps embed URL, requested only after the click. */
  embedUrl: string;
  /** Local placeholder drawn until the visitor asks for the map. */
  children: ReactNode;
};

/**
 * Click-to-load Google map. Nothing is requested from Google until the
 * visitor presses "Mostrar mapa", so the page itself loads no third-party
 * scripts or cookies (see the privacy policy).
 */
export function LocationMap({
  embedUrl,
  children,
}: LocationMapProps): ReactNode {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={embedUrl}
        title="Vista da rua em frente à Nossa Matilha, no Google Maps"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="size-full border-0"
      />
    );
  }

  return (
    <div className="relative size-full">
      {children}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 bg-white/90 p-4 text-center">
        <Button variant="dark" size="sm" onClick={() => setLoaded(true)}>
          Mostrar mapa
        </Button>
        <p className="text-caption text-fg-muted">
          Ao mostrar, o mapa é carregado do Google.
        </p>
      </div>
    </div>
  );
}
