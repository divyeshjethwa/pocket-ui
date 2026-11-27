## What

<!-- One or two sentences: what this PR adds or changes, and why. -->

## Screenshots

<!-- For UI changes: light and dark, and mobile if layout changes. The Netlify Deploy Preview link appears below once it's built. -->

## Definition of done

For a new or changed component:

- [ ] Typed props with JSDoc comments, shown in the Docs tab
- [ ] A story for every variant and state
- [ ] Unit tests pass (`npm test`)
- [ ] No accessibility violations in light or dark (`npm run test:stories`)
- [ ] Looks right on mobile, tablet and desktop viewports, in light and dark
- [ ] Styled only through theme tokens (`useTheme()`), no hard-coded colours or spacing
- [ ] Exported from `src/index.ts` and noted in `CHANGELOG.md`

## How to verify

<!-- Commands or story links a reviewer can use. -->
