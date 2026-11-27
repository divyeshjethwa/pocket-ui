import {
  cloneElement,
  isValidElement,
  useCallback,
  type ReactElement,
  type ReactNode,
} from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
  type Insets,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { useFocusVisible } from '../../hooks/useFocusVisible';
import { BlurFill } from '../../platform/BlurFill';
import { lightImpact } from '../../platform/haptics';
import { useTheme, type Theme } from '../../theme';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'glass';
export type ButtonSize = 'sm' | 'md' | 'lg';

/** Props an icon element may receive. Phosphor icons accept all three. */
export interface ButtonIconProps {
  color?: string;
  size?: number;
  weight?: string;
}

export interface ButtonProps {
  /** The button's label. Also used as the accessibility label unless one is given. */
  children: string;
  /** Called when the button is pressed. Not called while `disabled` or `loading`. */
  onPress?: (event: GestureResponderEvent) => void;
  /**
   * Visual style.
   * - `primary`: filled, highest emphasis.
   * - `secondary`: iOS "tinted" style, a soft primary-coloured fill.
   * - `ghost`: text only, like an iOS plain button.
   * - `destructive`: filled red, for actions that delete or can't be undone.
   * - `glass`: translucent and blurred, for use over images or colour.
   * @default 'primary'
   */
  variant?: ButtonVariant;
  /**
   * Height and text size: `sm` 34pt (with a 44pt touch area), `md` 44pt, `lg` 50pt.
   * @default 'md'
   */
  size?: ButtonSize;
  /** Shows a spinner, keeps the button's width and blocks presses. */
  loading?: boolean;
  /** Dims the button and blocks presses. */
  disabled?: boolean;
  /**
   * Icon before the label. Pass an element such as `<ArrowRight />`;
   * its colour, size and weight are set to match the button unless you set them.
   */
  leftIcon?: ReactElement<ButtonIconProps>;
  /** Icon after the label. Same rules as `leftIcon`. */
  rightIcon?: ReactElement<ButtonIconProps>;
  /** Stretches the button to the width of its container. */
  fullWidth?: boolean;
  /**
   * Plays a light haptic tap on press (iOS and Android; ignored on web).
   * @default true
   */
  haptics?: boolean;
  /** Overrides the label read by screen readers. */
  accessibilityLabel?: string;
  /** Extra description read after the label, e.g. what happens on press. */
  accessibilityHint?: string;
  /** Used to find the button in tests. */
  testID?: string;
  /** Extra styles for the outer container (margins, alignment). */
  style?: StyleProp<ViewStyle>;
}

interface SizeSpec {
  height: number;
  paddingHorizontal: number;
  fontSize: number;
  iconSize: number;
  gap: number;
}

function getSizeSpec(theme: Theme, size: ButtonSize): SizeSpec {
  const { spacing, typography } = theme;
  switch (size) {
    case 'sm':
      return {
        height: 34,
        paddingHorizontal: spacing.md + spacing.xxs,
        fontSize: typography.sizes.sm,
        iconSize: 16,
        gap: spacing.xs + spacing.xxs,
      };
    case 'lg':
      return {
        height: 50,
        paddingHorizontal: spacing.xl,
        fontSize: typography.sizes.md,
        iconSize: 20,
        gap: spacing.sm,
      };
    case 'md':
    default:
      return {
        height: theme.minTouchTarget,
        paddingHorizontal: spacing.lg + spacing.xs,
        fontSize: typography.sizes.md,
        iconSize: 18,
        gap: spacing.sm,
      };
  }
}

interface VariantSpec {
  background: string;
  foreground: string;
  borderColor?: string;
  /** How much the button dims while pressed (iOS dims plain buttons more). */
  pressedOpacity: number;
}

function getVariantSpec(theme: Theme, variant: ButtonVariant): VariantSpec {
  const { colors } = theme;
  switch (variant) {
    case 'secondary':
      return {
        background: colors.primaryTint,
        foreground: colors.onPrimaryTint,
        pressedOpacity: 0.7,
      };
    case 'ghost':
      return { background: 'transparent', foreground: colors.onPrimaryTint, pressedOpacity: 0.45 };
    case 'destructive':
      return { background: colors.danger, foreground: colors.onDanger, pressedOpacity: 0.85 };
    case 'glass':
      return {
        background: colors.glassFill,
        foreground: colors.text,
        borderColor: colors.glassBorder,
        pressedOpacity: 0.75,
      };
    case 'primary':
    default:
      return { background: colors.primary, foreground: colors.onPrimary, pressedOpacity: 0.85 };
  }
}

function renderIcon(icon: ReactNode, color: string, size: number): ReactNode {
  if (!isValidElement<ButtonIconProps>(icon)) return icon;
  return cloneElement(icon, {
    color: icon.props.color ?? color,
    size: icon.props.size ?? size,
    weight: icon.props.weight ?? 'bold',
  });
}

/**
 * A pill-shaped button with iOS-style press feedback: a spring scale and dim,
 * a light haptic tap, and reduced motion when the user asks for it.
 */
export function Button({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  haptics = true,
  accessibilityLabel,
  accessibilityHint,
  testID,
  style,
}: ButtonProps) {
  const theme = useTheme();
  const reduceMotion = useReducedMotion();
  const { focusVisible, onFocus, onBlur } = useFocusVisible();

  const sizeSpec = getSizeSpec(theme, size);
  const variantSpec = getVariantSpec(theme, variant);
  const inactive = disabled || loading;

  const pressed = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    const progress = pressed.get();
    const scale = 1 - progress * (1 - theme.motion.pressScale);
    const opacity = 1 - progress * (1 - variantSpec.pressedOpacity);
    return {
      opacity,
      transform: [{ scale: reduceMotion ? 1 : scale }],
    };
  });

  const handlePressIn = useCallback(() => {
    pressed.set(
      reduceMotion ? withTiming(1, { duration: 80 }) : withSpring(1, theme.motion.pressSpring),
    );
    if (haptics && Platform.OS !== 'web') {
      lightImpact();
    }
  }, [haptics, pressed, reduceMotion, theme.motion.pressSpring]);

  const handlePressOut = useCallback(() => {
    pressed.set(
      reduceMotion ? withTiming(0, { duration: 120 }) : withSpring(0, theme.motion.pressSpring),
    );
  }, [pressed, reduceMotion, theme.motion.pressSpring]);

  // Small buttons keep a 44pt touch area, per the Apple HIG.
  const hitInset = Math.max(0, (theme.minTouchTarget - sizeSpec.height) / 2);
  const hitSlop: Insets | undefined =
    hitInset > 0 ? { top: hitInset, bottom: hitInset, left: 0, right: 0 } : undefined;

  const radius = theme.radii.pill;

  return (
    <Animated.View
      style={[
        styles.container,
        { alignSelf: fullWidth ? 'stretch' : 'flex-start' },
        inactive && !loading && { opacity: theme.disabledOpacity },
        animatedStyle,
        style,
      ]}
    >
      <Pressable
        testID={testID}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={inactive}
        hitSlop={hitSlop}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? children}
        accessibilityHint={accessibilityHint}
        accessibilityState={{ disabled: inactive, busy: loading }}
        style={[
          styles.pressable,
          {
            minHeight: sizeSpec.height,
            paddingHorizontal: sizeSpec.paddingHorizontal,
            borderRadius: radius,
            backgroundColor: variantSpec.background,
            gap: sizeSpec.gap,
          },
          variantSpec.borderColor && {
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: variantSpec.borderColor,
          },
        ]}
      >
        {variant === 'glass' && <BlurFill scheme={theme.scheme} borderRadius={radius} />}

        <View style={[styles.content, { gap: sizeSpec.gap }, loading && styles.hidden]}>
          {leftIcon && renderIcon(leftIcon, variantSpec.foreground, sizeSpec.iconSize)}
          <Text
            numberOfLines={1}
            style={{
              color: variantSpec.foreground,
              fontFamily: theme.typography.families.body,
              fontSize: sizeSpec.fontSize,
              fontWeight: theme.typography.weights.semibold,
            }}
          >
            {children}
          </Text>
          {rightIcon && renderIcon(rightIcon, variantSpec.foreground, sizeSpec.iconSize)}
        </View>

        {loading && (
          // Decorative: the button itself announces "busy", so hide the spinner from screen readers.
          <View
            style={styles.spinner}
            pointerEvents="none"
            aria-hidden
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            <ActivityIndicator
              testID={testID ? `${testID}-spinner` : undefined}
              color={variantSpec.foreground}
              size="small"
            />
          </View>
        )}
      </Pressable>

      {focusVisible && (
        <View
          pointerEvents="none"
          style={[styles.focusRing, { borderRadius: radius, borderColor: theme.colors.focusRing }]}
        />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hidden: {
    opacity: 0,
  },
  spinner: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusRing: {
    position: 'absolute',
    top: -3,
    bottom: -3,
    left: -3,
    right: -3,
    borderWidth: 2,
  },
});
