import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme, type ThemeColors } from './index';

/** Shows every semantic colour role of the active theme. Switch theme in the toolbar. */
function ColorSwatches() {
  const theme = useTheme();
  const roles = Object.entries(theme.colors) as [keyof ThemeColors, string][];

  return (
    <View style={[styles.grid, { gap: theme.spacing.lg }]}>
      {roles.map(([role, value]) => (
        <View
          key={role}
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              borderRadius: theme.radii.md,
            },
          ]}
        >
          <View
            aria-hidden
            style={[
              styles.swatch,
              {
                backgroundColor: value,
                borderTopLeftRadius: theme.radii.md,
                borderTopRightRadius: theme.radii.md,
              },
            ]}
          />
          <View style={{ padding: theme.spacing.md }}>
            <Text
              style={{
                color: theme.colors.text,
                fontFamily: theme.typography.families.heading,
                fontSize: theme.typography.sizes.md,
                fontWeight: theme.typography.weights.semibold,
              }}
            >
              {role}
            </Text>
            <Text
              style={{
                color: theme.colors.textMuted,
                fontFamily: theme.typography.families.body,
                fontSize: theme.typography.sizes.sm,
                marginTop: theme.spacing.xxs,
              }}
            >
              {value.toUpperCase()}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const meta = {
  title: 'Foundations/Colors',
  component: ColorSwatches,
  tags: ['!autodocs'],
} satisfies Meta<typeof ColorSwatches>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SemanticRoles: Story = {};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    // Two cards fit per row on a 375pt phone.
    width: 148,
    borderWidth: 1,
    overflow: 'hidden',
  },
  swatch: {
    height: 72,
  },
});
