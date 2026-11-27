import * as Haptics from 'expo-haptics';

/** Plays a light impact haptic (iOS and Android). Failures are ignored. */
export function lightImpact(): void {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
}
