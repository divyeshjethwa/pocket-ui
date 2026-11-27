import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';

export interface BlurFillProps {
  scheme: 'light' | 'dark';
  borderRadius?: number;
}

/** Fills its parent with the native iOS/Android blur material. */
export function BlurFill({ scheme, borderRadius }: BlurFillProps) {
  return (
    <BlurView
      intensity={40}
      tint={scheme === 'dark' ? 'systemUltraThinMaterialDark' : 'systemUltraThinMaterialLight'}
      style={[StyleSheet.absoluteFill, { borderRadius }]}
    />
  );
}
