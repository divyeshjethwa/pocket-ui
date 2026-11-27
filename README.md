# PocketUI

**Pocket-sized React Native components, production-ready on every screen.**

PocketUI is a library of reusable, responsive React Native components. One TypeScript codebase renders on iOS, Android and the web, and every component is documented in a live Storybook that redeploys automatically on each merge to `main`.

> **Live Storybook:** coming soon (Netlify)
> **Status:** foundation in place — components land roughly daily.

## Why this repo exists

PocketUI is a portfolio project that demonstrates how I build front-end systems: typed component APIs, a token-driven theme, tests for every component, and CI/CD that keeps `main` always deployable.

## Stack

| Area       | Choice                                                         |
| ---------- | -------------------------------------------------------------- |
| Language   | TypeScript (strict)                                            |
| Components | React Native + `react-native-web`, on Expo SDK 58              |
| Docs       | Storybook (`@storybook/react-native-web-vite`), autodocs, a11y |
| Styling    | Design tokens in `src/theme` — light and dark from day one     |
| Testing    | Jest + React Native Testing Library                            |
| Quality    | ESLint, Prettier, `tsc --noEmit`, enforced in CI               |
| CI/CD      | GitHub Actions → Netlify                                       |

## Theme: Electric Midnight

| Token      | Value                                  |
| ---------- | -------------------------------------- |
| Primary    | `#5B5BF7` indigo                       |
| Accent     | `#C6F432` neon lime                    |
| Background | `#F7F7FB` light / `#0B0B14` dark       |
| Text       | `#111127` light / `#EDEDF7` dark       |
| Radius     | 12px, pill buttons                     |
| Type       | Space Grotesk (headings), Inter (body) |

Components never hard-code colours or spacing; they read semantic roles from `useTheme()`.

## Project structure

```
src/
  components/       # one folder per component: Component.tsx, .stories.tsx, .test.tsx, index.ts
  theme/            # tokens, light/dark themes, ThemeProvider + useTheme
  index.ts          # public exports
.storybook/         # Storybook config
.github/workflows/  # CI and deploy pipelines
scripts/            # component generator
```

## Getting started

Requires Node.js 24 (see `.nvmrc`).

```bash
npm install
npm run web          # run the Expo app in the browser
npm run lint         # ESLint
npm run typecheck    # TypeScript, no emit
npm run format       # Prettier
```

## Roadmap

1. Repo foundation — TypeScript, linting, theme tokens ✅
2. Storybook with docs, viewport, a11y and theme switcher
3. Button — the first component
4. CI on every pull request
5. Automatic deployment to Netlify
6. Component generator and daily workflow

## Licence

[MIT](./LICENSE) © Divyesh Jethwa
