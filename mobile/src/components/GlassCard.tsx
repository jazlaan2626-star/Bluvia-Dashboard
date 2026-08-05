import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors, radius } from '../theme/theme';

interface GlassCardProps extends ViewProps {
  padded?: boolean;
}

export function GlassCard({ style, padded = true, children, ...rest }: GlassCardProps) {
  return (
    <View style={[styles.wrapper, style]} {...rest}>
      <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={[styles.overlay, padded && styles.padded]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.surface,
  },
  overlay: {},
  padded: {
    padding: 16,
  },
});
