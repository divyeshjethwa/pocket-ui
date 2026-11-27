#!/usr/bin/env node
/**
 * Scaffolds a new PocketUI component.
 *
 *   npm run new:component <Name>
 *
 * Creates src/components/<Name>/ with the component, a story, a test and an
 * index, exports it from src/index.ts and adds a line to CHANGELOG.md.
 * Never overwrites an existing component.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import prettier from 'prettier';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function fail(message) {
  console.error(`✗ ${message}`);
  process.exit(1);
}

const name = process.argv[2];
if (!name) fail('Give the component a name, e.g. `npm run new:component Card`.');
if (!/^[A-Z][A-Za-z0-9]*$/.test(name)) {
  fail(
    `"${name}" must be PascalCase (letters and digits, starting with a capital), e.g. Card or TextField.`,
  );
}

const dir = path.join(root, 'src', 'components', name);
if (existsSync(dir)) fail(`src/components/${name} already exists; nothing was changed.`);

/** "TextField" -> "text field", used in docs and labels. */
const words = name.replace(/([a-z0-9])([A-Z])/g, '$1 $2').toLowerCase();

const files = {
  [`${name}.tsx`]: `import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme';

export interface ${name}Props {
  /** Text shown inside the ${words}. */
  children: string;
  /** Used to find the ${words} in tests. */
  testID?: string;
  /** Extra styles for the outer container (margins, alignment). */
  style?: StyleProp<ViewStyle>;
}

/**
 * ${name}: describe what it's for and when to use it.
 * Style only through theme tokens from \`useTheme()\`.
 */
export function ${name}({ children, testID, style }: ${name}Props) {
  const theme = useTheme();

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radii.md,
          padding: theme.spacing.lg,
        },
        style,
      ]}
    >
      <Text
        style={{
          color: theme.colors.text,
          fontFamily: theme.typography.families.body,
          fontSize: theme.typography.sizes.md,
        }}
      >
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    borderWidth: StyleSheet.hairlineWidth,
  },
});
`,

  [`${name}.stories.tsx`]: `import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { ${name} } from './${name}';

const meta = {
  title: 'Components/${name}',
  component: ${name},
  args: {
    children: '${name}',
  },
  argTypes: {
    style: { control: false },
  },
} satisfies Meta<typeof ${name}>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Try every prop from the Controls panel. */
export const Playground: Story = {};
`,

  [`${name}.test.tsx`]: `import { render, screen } from '@testing-library/react-native';

import { ThemeProvider } from '../../theme';
import { ${name} } from './${name}';

describe('${name}', () => {
  it('renders its content', async () => {
    await render(
      <ThemeProvider scheme="light">
        <${name}>Hello</${name}>
      </ThemeProvider>,
    );

    expect(screen.getByText('Hello')).toBeOnTheScreen();
  });
});
`,

  'index.ts': `export { ${name} } from './${name}';
export type { ${name}Props } from './${name}';
`,
};

// Write the component files, formatted with the project's Prettier config.
mkdirSync(dir, { recursive: true });
for (const [file, source] of Object.entries(files)) {
  const filepath = path.join(dir, file);
  const options = (await prettier.resolveConfig(filepath)) ?? {};
  writeFileSync(filepath, await prettier.format(source, { ...options, filepath }));
}

// Export it from the public API, keeping component exports alphabetical.
const indexPath = path.join(root, 'src', 'index.ts');
const index = readFileSync(indexPath, 'utf8');
const exportLine = `export * from './components/${name}';`;
const lines = index.trimEnd().split('\n');
const componentLines = lines.filter((line) => line.startsWith("export * from './components/"));
const rest = lines.filter((line) => !line.startsWith("export * from './components/"));
writeFileSync(indexPath, [...rest, ...[...componentLines, exportLine].sort()].join('\n') + '\n');

// Note it in the changelog under [Unreleased] → Added.
const changelogPath = path.join(root, 'CHANGELOG.md');
const changelog = readFileSync(changelogPath, 'utf8');
const marker = '## [Unreleased]\n\n### Added\n\n';
if (changelog.includes(marker)) {
  writeFileSync(changelogPath, changelog.replace(marker, `${marker}- **${name}** component.\n`));
} else {
  console.warn(
    '! CHANGELOG.md has no "## [Unreleased] / ### Added" section; add the entry by hand.',
  );
}

const rel = `src/components/${name}`;
console.log(`✓ Created ${rel}/ (${Object.keys(files).join(', ')})`);
console.log(`✓ Exported from src/index.ts`);
console.log(`✓ Added to CHANGELOG.md`);
console.log(`\nNext: build it out, then run npm test, npm run test:stories and npm run storybook.`);
