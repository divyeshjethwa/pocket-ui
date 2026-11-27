import { createContext, useContext, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';

import { themes, type ColorScheme, type Theme } from './themes';

const ThemeContext = createContext<Theme>(themes.light);

export interface ThemeProviderProps {
  /** Force a colour scheme. Defaults to the device setting. */
  scheme?: ColorScheme;
  children: ReactNode;
}

/** Provides the PocketUI theme to every component below it. */
export function ThemeProvider({ scheme, children }: ThemeProviderProps) {
  const system = useColorScheme();
  const resolved: ColorScheme = scheme ?? (system === 'dark' ? 'dark' : 'light');
  return <ThemeContext.Provider value={themes[resolved]}>{children}</ThemeContext.Provider>;
}

/** Returns the active PocketUI theme. */
export function useTheme(): Theme {
  return useContext(ThemeContext);
}
