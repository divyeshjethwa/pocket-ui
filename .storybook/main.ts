import type { StorybookConfig } from '@storybook/react-native-web-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/react-native-web-vite',
    options: {
      pluginReactOptions: {
        babel: {
          // Reanimated 4 animations run as worklets; this compiles them for the web build.
          plugins: ['react-native-worklets/plugin'],
        },
      },
    },
  },
  docs: {
    defaultName: 'Docs',
  },
  viteFinal: (viteConfig) => {
    const alias = viteConfig.resolve?.alias;
    const existing = Array.isArray(alias)
      ? alias
      : Object.entries(alias ?? {}).map(([find, replacement]) => ({ find, replacement }));
    viteConfig.resolve = {
      ...viteConfig.resolve,
      alias: [
        // On web, render Phosphor icons with Phosphor's own DOM package (same names and props).
        // phosphor-react-native depends on react-native-svg's native modules, which
        // react-native-web can't provide. Native apps keep using phosphor-react-native.
        { find: /^phosphor-react-native$/, replacement: '@phosphor-icons/react' },
        ...existing,
      ],
    };
    return viteConfig;
  },
  core: {
    disableTelemetry: true,
    disableWhatsNewNotifications: true,
  },
  features: {
    // Hide Storybook's own "Get started" checklist on the public site.
    sidebarOnboardingChecklist: false,
    menuOnboardingChecklist: false,
  },
};

export default config;
