import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ArrowRight, Heart, Plus, ShareNetwork, Trash } from 'phosphor-react-native';
import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../../theme';
import { Button, type ButtonSize, type ButtonVariant } from './Button';

const icons = {
  none: undefined,
  ArrowRight: <ArrowRight />,
  Heart: <Heart />,
  Plus: <Plus />,
  ShareNetwork: <ShareNetwork />,
  Trash: <Trash />,
};

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Continue',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    fullWidth: false,
    haptics: true,
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'ghost', 'destructive', 'glass'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    leftIcon: { control: 'select', options: Object.keys(icons), mapping: icons },
    rightIcon: { control: 'select', options: Object.keys(icons), mapping: icons },
    onPress: { action: 'pressed' },
    style: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A pill-shaped button with iOS-style press feedback: a spring scale and dim, a light haptic tap on device, and reduced motion when the user has it turned on. Icons are any element; the examples use [Phosphor](https://phosphoricons.com).',
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Try every prop from the Controls panel. */
export const Playground: Story = {};

export const Primary: Story = {};

export const Secondary: Story = { args: { variant: 'secondary' } };

export const Ghost: Story = { args: { variant: 'ghost', children: 'Learn more' } };

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Delete', leftIcon: <Trash /> },
};

/** Translucent and blurred, for use over photos or colour. */
export const Glass: Story = {
  args: { variant: 'glass', children: 'Share', leftIcon: <ShareNetwork /> },
  decorators: [
    (Story) => (
      <GlassBackdrop>
        <Story />
      </GlassBackdrop>
    ),
  ],
};

export const WithIcons: Story = {
  args: { leftIcon: <Plus />, children: 'Add item' },
  render: (args) => (
    <Row>
      <Button {...args} />
      <Button {...args} leftIcon={undefined} rightIcon={<ArrowRight />}>
        Next
      </Button>
      <Button {...args} variant="secondary" leftIcon={<Heart />}>
        Favourite
      </Button>
    </Row>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Row>
      {(['sm', 'md', 'lg'] as ButtonSize[]).map((size) => (
        <Button key={size} {...args} size={size}>
          {`Size ${size}`}
        </Button>
      ))}
    </Row>
  ),
};

/** Shows a spinner, keeps its width and ignores presses. */
export const Loading: Story = {
  args: { loading: true, children: 'Saving' },
  render: (args) => (
    <Row>
      <Button {...args} />
      <Button {...args} variant="secondary" />
      <Button {...args} variant="destructive" />
    </Row>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <Row>
      {(['primary', 'secondary', 'ghost', 'destructive'] as ButtonVariant[]).map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {label(variant)}
        </Button>
      ))}
    </Row>
  ),
};

export const FullWidth: Story = {
  args: { fullWidth: true, size: 'lg', children: 'Continue', rightIcon: <ArrowRight /> },
  render: (args) => (
    <View style={{ maxWidth: 420, gap: 12 }}>
      <Button {...args} />
      <Button {...args} variant="secondary" rightIcon={undefined}>
        Not now
      </Button>
    </View>
  ),
};

/** Every variant at every size, in the current theme. */
export const AllVariants: Story = {
  render: (args) => <AllVariantsGrid {...args} />,
};

function label(variant: ButtonVariant) {
  return variant.charAt(0).toUpperCase() + variant.slice(1);
}

function Row({ children }: { children: ReactNode }) {
  return <View style={styles.row}>{children}</View>;
}

function GlassBackdrop({ children }: { children: ReactNode }) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.backdrop,
        {
          borderRadius: theme.radii.lg,
          // Light: vivid indigo. Dark: deep surface, so light glass text keeps its contrast.
          backgroundColor: theme.scheme === 'dark' ? theme.colors.surface : theme.colors.primary,
        },
      ]}
    >
      <View style={[styles.blob, styles.blobA, { backgroundColor: theme.colors.accent }]} />
      <View style={[styles.blob, styles.blobB, { backgroundColor: theme.colors.danger }]} />
      <View
        style={[
          styles.blob,
          styles.blobC,
          {
            backgroundColor:
              theme.scheme === 'dark' ? theme.colors.primary : theme.colors.primaryPressed,
          },
        ]}
      />
      <View style={styles.backdropContent}>{children}</View>
    </View>
  );
}

function AllVariantsGrid(args: Story['args']) {
  const theme = useTheme();
  const variants: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'destructive'];
  return (
    <View style={{ gap: theme.spacing.xl }}>
      {variants.map((variant) => (
        <View key={variant} style={{ gap: theme.spacing.sm }}>
          <Text
            style={{
              color: theme.colors.textMuted,
              fontFamily: theme.typography.families.body,
              fontSize: theme.typography.sizes.sm,
            }}
          >
            {label(variant)}
          </Text>
          <Row>
            {(['sm', 'md', 'lg'] as ButtonSize[]).map((size) => (
              <Button
                key={size}
                {...args}
                variant={variant}
                size={size}
                leftIcon={variant === 'destructive' ? <Trash /> : <Plus />}
              >
                {variant === 'destructive' ? 'Delete' : 'Add item'}
              </Button>
            ))}
          </Row>
        </View>
      ))}
      <View style={{ gap: theme.spacing.sm }}>
        <Text
          style={{
            color: theme.colors.textMuted,
            fontFamily: theme.typography.families.body,
            fontSize: theme.typography.sizes.sm,
          }}
        >
          Glass
        </Text>
        <GlassBackdrop>
          <Row>
            {(['sm', 'md', 'lg'] as ButtonSize[]).map((size) => (
              <Button key={size} {...args} variant="glass" size={size} leftIcon={<ShareNetwork />}>
                Share
              </Button>
            ))}
          </Row>
        </GlassBackdrop>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 12,
  },
  backdrop: {
    alignSelf: 'stretch',
    maxWidth: 560,
    minHeight: 180,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  blob: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
  },
  backdropContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  blobA: { top: -120, left: -90, width: 180, height: 180, borderRadius: 90 },
  blobB: { bottom: -150, right: -60 },
  blobC: { top: -90, right: 110, width: 150, height: 150, borderRadius: 75 },
});
