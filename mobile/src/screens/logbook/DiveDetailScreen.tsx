import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenBackground } from '../../components/ScreenBackground';
import { GlassCard } from '../../components/GlassCard';
import { formatDuration } from '../../hooks/useDives';
import { colors, spacing, typography } from '../../theme/theme';
import type { LogbookStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<LogbookStackParamList, 'DiveDetail'>;

function Field({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
}

export function DiveDetailScreen({ route }: Props) {
  const { dive } = route.params;

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{dive.dive_site || dive.location || 'Untitled dive'}</Text>
        <Text style={styles.date}>{dive.dive_date}</Text>

        <View style={styles.grid}>
          <GlassCard style={styles.gridCard}>
            <Field label="Max Depth" value={dive.max_depth ? `${dive.max_depth} m` : '—'} />
          </GlassCard>
          <GlassCard style={styles.gridCard}>
            <Field label="Avg Depth" value={dive.avg_depth ? `${dive.avg_depth} m` : '—'} />
          </GlassCard>
          <GlassCard style={styles.gridCard}>
            <Field label="Dive Time" value={formatDuration(dive.dive_time_seconds ?? 0)} />
          </GlassCard>
          <GlassCard style={styles.gridCard}>
            <Field label="Bottom Time" value={formatDuration(dive.bottom_time_seconds ?? 0)} />
          </GlassCard>
        </View>

        <GlassCard style={styles.detailsCard}>
          <Field label="Location" value={dive.location || '—'} />
          <Field label="Water Temperature" value={dive.water_temp ? `${dive.water_temp}°C` : '—'} />
          <Field label="Visibility" value={dive.visibility ? `${dive.visibility} m` : '—'} />
          <Field label="Surface Interval" value={formatDuration(dive.surface_interval_seconds ?? 0)} />
          <Field label="Heart Rate (avg)" value={dive.heart_rate_avg ? `${dive.heart_rate_avg} bpm` : '—'} />
          <Field label="Buddy" value={dive.buddy || '—'} />
          <Field label="Equipment" value={dive.equipment_used.length ? dive.equipment_used.join(', ') : '—'} />
        </GlassCard>

        {dive.notes ? (
          <GlassCard style={styles.notesCard}>
            <Text style={styles.fieldLabel}>Notes</Text>
            <Text style={styles.notesText}>{dive.notes}</Text>
          </GlassCard>
        ) : null}
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl,
  },
  title: {
    ...typography.largeTitle,
  },
  date: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  gridCard: {
    flexBasis: '48%',
    marginBottom: spacing.sm,
  },
  detailsCard: {
    marginBottom: spacing.md,
  },
  notesCard: {
    marginBottom: spacing.md,
  },
  field: {
    marginBottom: spacing.sm,
  },
  fieldLabel: {
    ...typography.caption,
    marginBottom: spacing.xs,
  },
  fieldValue: {
    ...typography.headline,
  },
  notesText: {
    ...typography.body,
    marginTop: spacing.xs,
  },
});
