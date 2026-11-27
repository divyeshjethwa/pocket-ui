import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  minTouchTarget,
  palette,
  radii,
  spacing,
} from './tokens';

export type ColorScheme = 'light' | 'dark';

/** Semantic colour roles. Components read these, not raw palette values. */
export interface ThemeColors {
  background: string;
  surface: string;
  border: string;
  text: string;
  textMuted: string;
  primary: string;
  primaryPressed: string;
  onPrimary: string;
  accent: string;
  onAccent: string;
  danger: string;
  onDanger: string;
  focusRing: string;
}

export interface Theme {
  scheme: ColorScheme;
  colors: ThemeColors;
  spacing: typeof spacing;
  radii: typeof radii;
  typography: {
    families: typeof fontFamilies;
    sizes: typeof fontSizes;
    weights: typeof fontWeights;
    lineHeights: typeof lineHeights;
  };
  minTouchTarget: number;
}

const shared = {
  spacing,
  radii,
  typography: {
    families: fontFamilies,
    sizes: fontSizes,
    weights: fontWeights,
    lineHeights,
  },
  minTouchTarget,
};

export const lightTheme: Theme = {
  scheme: 'light',
  colors: {
    background: palette.mist50,
    surface: palette.white,
    border: palette.mist200,
    text: palette.ink900,
    textMuted: palette.ink500,
    primary: palette.indigo500,
    primaryPressed: palette.indigo600,
    onPrimary: palette.white,
    accent: palette.lime400,
    onAccent: palette.ink900,
    danger: palette.red500,
    onDanger: palette.white,
    focusRing: palette.indigo400,
  },
  ...shared,
};

export const darkTheme: Theme = {
  scheme: 'dark',
  colors: {
    background: palette.midnight950,
    surface: palette.midnight900,
    border: palette.midnight800,
    text: palette.mist100,
    textMuted: palette.mist200,
    primary: palette.indigo500,
    primaryPressed: palette.indigo400,
    onPrimary: palette.white,
    accent: palette.lime400,
    onAccent: palette.ink900,
    danger: palette.red500,
    onDanger: palette.white,
    focusRing: palette.lime400,
  },
  ...shared,
};

export const themes: Record<ColorScheme, Theme> = {
  light: lightTheme,
  dark: darkTheme,
};
