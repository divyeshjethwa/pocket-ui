import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

/**
 * Runs every Storybook story as a test in headless Chromium, in light and dark.
 * With `a11y: { test: 'error' }` in .storybook/preview.tsx, any accessibility
 * violation fails the run. Unit tests stay in Jest (`npm test`).
 * https://storybook.js.org/docs/writing-tests/integrations/vitest-addon
 */
const storybookProject = (scheme: 'light' | 'dark') => ({
  extends: true as const,
  plugins: [storybookTest({ configDir: path.join(dirname, '.storybook') })],
  // Read by .storybook/preview.tsx to pick the theme for this run.
  define: { __POCKET_TEST_THEME__: JSON.stringify(scheme) },
  test: {
    name: `storybook-${scheme}`,
    browser: {
      enabled: true,
      headless: true,
      provider: playwright({}),
      instances: [{ browser: 'chromium' as const }],
    },
  },
});

export default defineConfig({
  test: {
    // Every story is checked in both themes, since contrast differs between them.
    projects: [storybookProject('light'), storybookProject('dark')],
  },
});
