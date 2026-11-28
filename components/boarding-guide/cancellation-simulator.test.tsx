import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { CancellationSimulator } from './cancellation-simulator';

describe('CancellationSimulator', () => {
  it('shows both options for the shared stay', () => {
    render(<CancellationSimulator />);
    expect(screen.getByText('3 diárias')).toBeTruthy();
    expect(screen.getByText('Devolução de 90%')).toBeTruthy();
    expect(screen.getByText('Crédito de 100%')).toBeTruthy();
  });

  it('updates the amounts when the visitor changes the stay', async () => {
    const user = userEvent.setup();
    render(<CancellationSimulator />);
    await user.click(screen.getByRole('button', { name: 'Mais uma diária' }));
    expect(screen.getByText('4 diárias')).toBeTruthy();
    expect(
      screen.getByText('Ajuste quantas diárias foram pagas.'),
    ).toBeTruthy();
  });

  it('completes the checkpoint after comparing both notices', async () => {
    const user = userEvent.setup();
    render(<CancellationSimulator />);
    expect(screen.queryByText('Parada 4 de 4 concluída')).toBeNull();
    await user.click(
      screen.getByRole('radio', {
        name: 'Menos de 48 horas ou não comparecimento',
      }),
    );
    expect(screen.getByText('Devolução de 60%')).toBeTruthy();
    expect(screen.getByText('Parada 4 de 4 concluída')).toBeTruthy();
  });
});
