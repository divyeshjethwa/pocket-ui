import { StyleSheet, View, type ViewStyle } from 'react-native';

import type { BlurFillProps } from './BlurFill';

/** Web version: CSS backdrop-filter gives the same frosted-glass look. */
export function BlurFill({ borderRadius }: BlurFillProps) {
  return (
    <View
      pointerEvents="none"
      style={[
        StyleSheet.absoluteFill,
        {
          borderRadius,
          // react-native-web passes this through to CSS.
          backdropFilter: 'blur(20px) saturate(180%)',
        } as ViewStyle,
      ]}
    />
  );
}
