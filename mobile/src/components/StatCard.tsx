import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GlassCard } from './GlassCard';
import { colors, spacing, typography } from '../theme/theme';

interface StatCardProps {
  label: string;
  value: string;
  unit?: string;
  accent?: boolean;
}

export function StatCard({ label, value, unit, accent }: StatCardProps) {
  return (
    <GlassCard style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueRow}>
        <Text style={[styles.value, accent && styles.valueAccent]}>{value}</Text>
        {unit ? <Text style={styles.unit}>{unit}</Text> : null}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    flexBasis: '48%',
    flexGrow: 1,
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.caption,
    marginBottom: spacing.xs,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    ...typography.title,
    fontSize: 26,
  },
  valueAccent: {
    color: colors.accent,
  },
  unit: {
    ...typography.footnote,
    marginLeft: spacing.xs,
  },
});
