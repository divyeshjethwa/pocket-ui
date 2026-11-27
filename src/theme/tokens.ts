import { Platform } from 'react-native';

/**
 * PocketUI design tokens — "Electric Midnight".
 * Components must style through these tokens only; never hard-code values.
 */

export const palette = {
  indigo500: '#5B5BF7',
  indigo400: '#7A7AF9',
  indigo600: '#4343E0',
  indigo300: '#9D9DFB',
  lime400: '#C6F432',
  midnight950: '#0B0B14',
  midnight900: '#15152A',
  midnight800: '#22223D',
  ink900: '#111127',
  ink500: '#5C5C78',
  mist50: '#F7F7FB',
  mist100: '#EDEDF7',
  mist200: '#DCDCEA',
  white: '#FFFFFF',
  /** 4.7:1 with white text (WCAG AA). */
  red600: '#D92D4F',
} as const;

export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radii = {
  none: 0,
  sm: 6,
  md: 12,
  lg: 20,
  pill: 9999,
} as const;

/** Web font stack: SF Pro on Apple devices, then Inter, then the OS default. */
const webSystemStack =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", system-ui, "Segoe UI", Roboto, sans-serif';

/**
 * Body text uses the platform's own font for a native feel:
 * SF Pro on iOS, Roboto on Android, the system stack on web.
 * Headings use Space Grotesk on web; native apps fall back to the system font
 * until custom fonts are bundled.
 */
export const fontFamilies = {
  heading: Platform.select({
    web: `"Space Grotesk", ${webSystemStack}`,
    ios: 'System',
    default: 'sans-serif',
  }),
  body: Platform.select({
    web: webSystemStack,
    ios: 'System',
    default: 'sans-serif',
  }),
};

/** iOS-aligned type scale (pt): 17 is the iOS body size, 34 the Large Title. */
export const fontSizes = {
  xs: 12,
  sm: 15,
  md: 17,
  lg: 20,
  xl: 22,
  xxl: 28,
  display: 34,
} as const;

export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const lineHeights = {
  tight: 1.2,
  normal: 1.5,
} as const;

/** Minimum touch target (pt), per Apple HIG / WCAG 2.5.5. */
export const minTouchTarget = 44;

/** Motion tokens for iOS-style press feedback. */
export const motion = {
  /** Scale applied while a control is pressed. */
  pressScale: 0.97,
  /** Spring used for press in/out: quick, lightly damped, like UIKit. */
  pressSpring: { damping: 20, stiffness: 420, mass: 0.6 },
} as const;

/** Opacity for disabled controls. */
export const disabledOpacity = 0.4;
