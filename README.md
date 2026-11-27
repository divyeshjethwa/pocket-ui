# PocketUI

**Pocket-sized React Native components, production-ready on every screen.**

PocketUI is a library of reusable, responsive React Native components. One TypeScript codebase renders on iOS, Android and the web, and every component is documented in a live Storybook that redeploys automatically on each merge to `main`.

> **Live Storybook:** coming soon (Netlify)
> **Status:** foundation in place — components land roughly daily.

## Screenshots

<p align="center">
  <img src="docs/screenshots/welcome.png" alt="PocketUI Storybook welcome page with tagline, stack and links" width="100%" />
</p>

<table>
  <tr>
    <td width="50%"><img src="docs/screenshots/colors-light.png" alt="Theme colour roles in light mode" /></td>
    <td width="50%"><img src="docs/screenshots/colors-dark-a11y.png" alt="Theme colour roles in dark mode with the accessibility panel showing no violations" /></td>
  </tr>
  <tr>
    <td align="center"><sub><b>Light theme</b> — every semantic colour role</sub></td>
    <td align="center"><sub><b>Dark theme</b> — a11y panel: 0 violations</sub></td>
  </tr>
  <tr>
    <td width="50%"><img src="docs/screenshots/mobile-dark.png" alt="Storybook mobile viewport at 375 pixels wide in dark mode" /></td>
    <td width="50%" valign="middle">
      <b>Responsive by default.</b> The viewport toolbar previews every story at
      Mobile (375), Tablet (768) and Desktop (1280), in light and dark.
    </td>
  </tr>
</table>

## Why this repo exists

PocketUI is a personal project where I build front-end systems the way I would in production: typed component APIs, a token-driven theme, tests for every component, and CI/CD that keeps `main` always deployable.

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

## How to use

### Browse the Storybook

1. Run `npm run storybook` and open <http://localhost:6006>.
2. Start at **Welcome**, then pick a story from the sidebar.
3. Use the toolbar to switch **light / dark** theme and the **viewport** (mobile, tablet, desktop).
4. Open the **Docs** tab for props and usage, and the **Accessibility** panel for a11y checks.

### Use PocketUI in a React Native app

Wrap your app once in `ThemeProvider`, then read tokens with `useTheme()`. Components added in later steps (starting with `Button`) are exported from the same entry point.

```tsx
import { Text, View } from 'react-native';
import { ThemeProvider, useTheme } from './src'; // the package entry point once published

function Card() {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radii.md,
        padding: theme.spacing.lg,
      }}
    >
      <Text style={{ color: theme.colors.text, fontSize: theme.typography.sizes.lg }}>
        Hello from PocketUI
      </Text>
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider /* scheme="dark" to force a theme; defaults to the device setting */>
      <Card />
    </ThemeProvider>
  );
}
```

### Regenerate the screenshots

```bash
npm run screenshots   # macOS + Google Chrome; writes docs/screenshots/*.png
```

The script builds the static Storybook, captures each view with headless Chrome and frames it in a macOS browser window (`scripts/screenshots/frame.html`).

## Project structure

```
src/
  components/       # one folder per component: Component.tsx, .stories.tsx, .test.tsx, index.ts
  theme/            # tokens, light/dark themes, ThemeProvider + useTheme
  index.ts          # public exports
.storybook/         # Storybook config
.github/workflows/  # CI and deploy pipelines
scripts/            # screenshot capture, component generator
docs/screenshots/   # README images
```

## Getting started

Requires Node.js 24 (see `.nvmrc`).

```bash
npm install
npm run storybook    # Storybook at http://localhost:6006
npm run build-storybook  # static build in storybook-static/
npm run web          # run the Expo app in the browser
npm run lint         # ESLint
npm run typecheck    # TypeScript, no emit
npm run format       # Prettier
npm run screenshots  # regenerate README screenshots
```

## Roadmap

1. Repo foundation — TypeScript, linting, theme tokens ✅
2. Storybook with docs, viewport, a11y and theme switcher ✅
3. Button — the first component
4. CI on every pull request
5. Automatic deployment to Netlify
6. Component generator and daily workflow

## Licence

[MIT](./LICENSE) © Divyesh Jethwa
