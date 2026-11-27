import type { Decorator, Preview } from '@storybook/react-native-web-vite';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import type { ReactNode } from 'react';
import { View } from 'react-native';

import { ThemeProvider, themes, useTheme, type ColorScheme } from '../src/theme';

/** Paints the canvas with the active theme so every story shows its real background. */
function Canvas({ children }: { children: ReactNode }) {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        minHeight: '100%',
        padding: theme.spacing.xl,
        backgroundColor: theme.colors.background,
      }}
    >
      {children}
    </View>
  );
}

/** Adapter: addon-themes passes the selected theme object; PocketUI's provider takes a scheme. */
function StorybookThemeProvider({
  theme,
  children,
}: {
  theme?: (typeof themes)[ColorScheme];
  children: ReactNode;
}) {
  return (
    <ThemeProvider scheme={theme?.scheme ?? 'light'}>
      <Canvas>{children}</Canvas>
    </ThemeProvider>
  );
}

/**
 * Set by vitest.config.ts so the story tests run once per theme.
 * Undefined in the normal Storybook, which defaults to light.
 */
declare const __POCKET_TEST_THEME__: ColorScheme | undefined;
const testTheme: ColorScheme | undefined =
  typeof __POCKET_TEST_THEME__ === 'undefined' ? undefined : __POCKET_TEST_THEME__;

const withPocketTheme: Decorator = withThemeFromJSXProvider({
  themes: { light: themes.light, dark: themes.dark },
  defaultTheme: testTheme ?? 'light',
  Provider: StorybookThemeProvider,
});

const preview: Preview = {
  decorators: [withPocketTheme],
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: {
      expanded: true,
      matchers: { color: /(background|color)$/i },
    },
    a11y: {
      // Fail the a11y panel (and later CI) on violations rather than just warning.
      test: 'error',
    },
    viewport: {
      options: {
        mobile: { name: 'Mobile (375)', styles: { width: '375px', height: '812px' } },
        tablet: { name: 'Tablet (768)', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop (1280)', styles: { width: '1280px', height: '800px' } },
      },
    },
    options: {
      storySort: { order: ['Welcome', 'Foundations', 'Components'] },
    },
  },
};

export default preview;
