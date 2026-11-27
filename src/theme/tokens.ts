/**
 * PocketUI design tokens — "Electric Midnight".
 * Components must style through these tokens only; never hard-code values.
 */

export const palette = {
  indigo500: '#5B5BF7',
  indigo400: '#7A7AF9',
  indigo600: '#4343E0',
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
  red500: '#EF4565',
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

export const fontFamilies = {
  heading: 'Space Grotesk',
  body: 'Inter',
} as const;

export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
  display: 36,
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
