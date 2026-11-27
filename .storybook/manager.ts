import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'PocketUI',
    brandUrl: 'https://github.com/divyeshjethwa/pocket-ui',
    brandTarget: '_blank',
    colorPrimary: '#C6F432',
    colorSecondary: '#5B5BF7',
    appBg: '#0B0B14',
    appContentBg: '#15152A',
    appPreviewBg: '#F7F7FB',
    appBorderColor: '#22223D',
    appBorderRadius: 12,
    barBg: '#15152A',
    textColor: '#EDEDF7',
    fontBase: '"Inter", system-ui, sans-serif',
    fontCode: 'ui-monospace, "SF Mono", Menlo, monospace',
  }),
});
