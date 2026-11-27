import { useCallback, useState } from 'react';
import { Platform } from 'react-native';

/**
 * Tracks whether the user's last interaction was the keyboard, so focus rings
 * appear for keyboard users only (the CSS `:focus-visible` behaviour) instead of
 * after every mouse click or tap.
 */
let hadKeyboardEvent = false;
let listening = false;

function listen() {
  if (listening || Platform.OS !== 'web' || typeof document === 'undefined') return;
  listening = true;
  document.addEventListener(
    'keydown',
    (event) => {
      if (event.metaKey || event.altKey || event.ctrlKey) return;
      hadKeyboardEvent = true;
    },
    true,
  );
  const pointer = () => {
    hadKeyboardEvent = false;
  };
  document.addEventListener('mousedown', pointer, true);
  document.addEventListener('pointerdown', pointer, true);
  document.addEventListener('touchstart', pointer, true);
}

export interface FocusVisible {
  /** True while the element has keyboard focus. Always false on native. */
  focusVisible: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

export function useFocusVisible(): FocusVisible {
  listen();
  const [focusVisible, setFocusVisible] = useState(false);
  const onFocus = useCallback(() => {
    if (Platform.OS === 'web' && hadKeyboardEvent) setFocusVisible(true);
  }, []);
  const onBlur = useCallback(() => setFocusVisible(false), []);
  return { focusVisible, onFocus, onBlur };
}
