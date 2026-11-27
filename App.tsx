import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { ThemeProvider, useTheme } from './src';

function Home() {
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text
        style={{
          color: theme.colors.text,
          fontSize: theme.typography.sizes.xxl,
          fontWeight: theme.typography.weights.bold,
        }}
      >
        PocketUI
      </Text>
      <Text style={{ color: theme.colors.textMuted, marginTop: theme.spacing.sm }}>
        Pocket-sized React Native components.
      </Text>
      <StatusBar style={theme.scheme === 'dark' ? 'light' : 'dark'} />
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
