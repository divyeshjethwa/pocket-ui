# Changelog

All notable changes to PocketUI are recorded here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- **Button** component: `primary`, `secondary` (iOS tinted), `ghost`, `destructive` and `glass` variants; `sm`, `md` and `lg` sizes; `loading`, `disabled`, `leftIcon`, `rightIcon`, `fullWidth` and `haptics` props.
- iOS-style press feedback: Reanimated spring scale and dim, light haptic tap, Reduce Motion support.
- Keyboard-only focus ring on web (`useFocusVisible`).
- Platform wrappers for haptics and blur, with web fallbacks.
- Jest + React Native Testing Library setup (`npm test`).
- Phosphor icons in stories.

### Changed

- Body text uses the system font (SF Pro on Apple devices, Roboto on Android); type scale aligned to iOS (17pt body).
- Danger colour darkened to `#D92D4F` to meet WCAG AA contrast with white text.

## 0.1.0 — Foundation

### Added

- Expo SDK 58 TypeScript project with ESLint, Prettier and strict type checking.
- Electric Midnight design tokens with light and dark themes.
- Storybook with docs, viewport, accessibility checks, theme switcher and a Welcome page.
- macOS-framed README screenshots (`npm run screenshots`).
