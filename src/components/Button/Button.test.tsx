import { render, screen, userEvent } from '@testing-library/react-native';
import * as Haptics from 'expo-haptics';
import { Text } from 'react-native';

import { ThemeProvider } from '../../theme';
import { Button, type ButtonIconProps } from './Button';

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(() => Promise.resolve()),
  ImpactFeedbackStyle: { Light: 'light', Medium: 'medium', Heavy: 'heavy' },
}));

const impactAsync = Haptics.impactAsync as jest.Mock;

function renderButton(ui: React.ReactElement) {
  return render(<ThemeProvider scheme="light">{ui}</ThemeProvider>);
}

/** A stand-in icon that prints the props the Button gives it. */
function ProbeIcon({ color, size, weight }: ButtonIconProps) {
  return <Text testID="icon">{`${color}|${size}|${weight}`}</Text>;
}

beforeEach(() => {
  impactAsync.mockClear();
});

describe('Button', () => {
  it('renders its label as an accessible button', async () => {
    await renderButton(<Button>Continue</Button>);

    const button = screen.getByRole('button', { name: 'Continue' });
    expect(button).toBeOnTheScreen();
    expect(button).toBeEnabled();
  });

  it('calls onPress when pressed', async () => {
    const onPress = jest.fn();
    const user = userEvent.setup();
    await renderButton(<Button onPress={onPress}>Continue</Button>);

    await user.press(screen.getByRole('button', { name: 'Continue' }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('is disabled and ignores presses when disabled', async () => {
    const onPress = jest.fn();
    const user = userEvent.setup();
    await renderButton(
      <Button onPress={onPress} disabled>
        Continue
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Continue' });
    expect(button).toBeDisabled();
    await user.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('shows a spinner, reports busy and ignores presses while loading', async () => {
    const onPress = jest.fn();
    const user = userEvent.setup();
    await renderButton(
      <Button onPress={onPress} loading testID="save">
        Save
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toBeBusy();
    expect(button).toBeDisabled();
    // The spinner is shown but hidden from screen readers (the button reports busy instead).
    const spinner = screen.getByTestId('save-spinner', { includeHiddenElements: true });
    expect(spinner).toBeOnTheScreen();
    expect(spinner).not.toBeVisible();
    await user.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('keeps the label in the layout while loading so the width does not change', async () => {
    await renderButton(<Button loading>Save</Button>);

    expect(screen.getByText('Save')).toBeOnTheScreen();
  });

  it('uses accessibilityLabel and accessibilityHint when given', async () => {
    await renderButton(
      <Button accessibilityLabel="Add to basket" accessibilityHint="Adds one item">
        Add
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Add to basket' });
    expect(button).toHaveProp('accessibilityHint', 'Adds one item');
  });

  it('passes colour, size and weight to icons', async () => {
    await renderButton(<Button leftIcon={<ProbeIcon />}>Add</Button>);

    // Primary, md: white foreground, 18pt icon, bold weight.
    expect(screen.getByTestId('icon')).toHaveTextContent('#FFFFFF|18|bold');
  });

  it('keeps icon props the caller sets', async () => {
    await renderButton(
      <Button size="lg" rightIcon={<ProbeIcon color="red" weight="fill" />}>
        Next
      </Button>,
    );

    expect(screen.getByTestId('icon')).toHaveTextContent('red|20|fill');
  });

  it('plays a light haptic on press by default', async () => {
    const user = userEvent.setup();
    await renderButton(<Button onPress={jest.fn()}>Continue</Button>);

    await user.press(screen.getByRole('button', { name: 'Continue' }));

    expect(impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Light);
  });

  it('skips the haptic when haptics is false', async () => {
    const user = userEvent.setup();
    await renderButton(
      <Button onPress={jest.fn()} haptics={false}>
        Continue
      </Button>,
    );

    await user.press(screen.getByRole('button', { name: 'Continue' }));

    expect(impactAsync).not.toHaveBeenCalled();
  });

  it.each(['primary', 'secondary', 'ghost', 'destructive', 'glass'] as const)(
    'renders the %s variant',
    async (variant) => {
      await renderButton(<Button variant={variant}>Label</Button>);

      expect(screen.getByRole('button', { name: 'Label' })).toBeOnTheScreen();
    },
  );
});
