import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

/**
 * Unit tests (see "Unit tests" in AGENTS.md). Coverage is enforced only on
 * business logic in `lib/`; components are tested for behavior, without a
 * coverage target.
 */
export default defineConfig({
  plugins: [react()],
  resolve: { tsconfigPaths: true },
  test: {
    environment: 'jsdom',
    include: ['**/*.test.{ts,tsx}'],
    exclude: [
      'node_modules/**',
      '.next/**',
      'tmp/**',
      'graphify-out/**',
      // Claude Code worktrees: separate checkouts of this repo (gitignored).
      '.claude/worktrees/**',
    ],
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['lib/**/*.ts'],
      exclude: [
        '**/*.test.ts',
        // GSAP plugin registration: no logic of its own.
        'lib/gsap.ts',
        // Static content maps (data, asset imports): nothing to test.
        'lib/boarding-guide/chapters.ts',
        'lib/boarding-guide/illustrations.ts',
        'lib/boarding-guide/photos.ts',
        'lib/home/hero.ts',
      ],
      thresholds: {
        'lib/**/*.ts': {
          lines: 90,
          branches: 90,
          functions: 90,
          statements: 90,
        },
      },
    },
  },
});
