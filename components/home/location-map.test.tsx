import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { LocationMap } from './location-map';

const embedUrl = 'https://maps.example.test/embed';

describe('LocationMap', () => {
  it('loads nothing from Google until the visitor asks for the map', () => {
    render(
      <LocationMap embedUrl={embedUrl}>
        <p>Desenho do mapa</p>
      </LocationMap>,
    );
    expect(screen.getByText('Desenho do mapa')).toBeTruthy();
    expect(screen.queryByTitle(/Google Maps/)).toBeNull();
  });

  it('shows the map after "Mostrar mapa" is pressed', async () => {
    const user = userEvent.setup();
    render(
      <LocationMap embedUrl={embedUrl}>
        <p>Desenho do mapa</p>
      </LocationMap>,
    );
    await user.click(screen.getByRole('button', { name: 'Mostrar mapa' }));
    expect(screen.getByTitle(/Google Maps/).getAttribute('src')).toBe(embedUrl);
    expect(screen.queryByText('Desenho do mapa')).toBeNull();
  });
});
