import React from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenBackground } from '../../components/ScreenBackground';
import { GlassCard } from '../../components/GlassCard';
import { PrimaryButton } from '../../components/PrimaryButton';
import { useAuth } from '../../lib/AuthContext';
import { useDives, formatDuration } from '../../hooks/useDives';
import { colors, spacing, typography } from '../../theme/theme';
import type { LogbookStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<LogbookStackParamList, 'LogbookList'>;

export function LogbookScreen({ navigation }: Props) {
  const { session, isGuest } = useAuth();
  const userId = session?.user.id;
  const { dives, isLoading, refresh } = useDives(userId);

  if (isGuest || !session) {
    return (
      <ScreenBackground>
        <View style={styles.guestWrapper}>
          <Text style={styles.title}>Dive Logbook</Text>
          <Text style={styles.subtitle}>Sign up to start logging dives.</Text>
        </View>
      </ScreenBackground>
    );
  }

  return (
    <ScreenBackground>
      <View style={styles.header}>
        <Text style={styles.title}>Logbook</Text>
        <PrimaryButton
          label="+ Log Dive"
          onPress={() => navigation.navigate('NewDive')}
          style={styles.newButton}
        />
      </View>

      <FlatList
        data={dives}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refresh} tintColor={colors.accent} />}
        ListEmptyComponent={
          <GlassCard>
            <Text style={styles.emptyText}>No dives yet. Tap "Log Dive" to add your first one.</Text>
          </GlassCard>
        }
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('DiveDetail', { dive: item })}>
            <GlassCard style={styles.diveCard}>
              <View style={styles.diveCardRow}>
                <View style={styles.diveCardInfo}>
                  <Text style={styles.diveSite}>{item.dive_site || item.location || 'Untitled dive'}</Text>
                  <Text style={styles.diveMeta}>
                    {item.dive_date} · {formatDuration(item.dive_time_seconds ?? 0)}
                  </Text>
                </View>
                <Text style={styles.diveDepth}>{item.max_depth ? `${item.max_depth}m` : '—'}</Text>
              </View>
            </GlassCard>
          </TouchableOpacity>
        )}
      />
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  guestWrapper: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    paddingTop: spacing.xxl,
  },
  title: {
    ...typography.largeTitle,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  newButton: {
    height: 40,
    paddingHorizontal: 16,
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  diveCard: {
    marginBottom: spacing.sm,
  },
  diveCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  diveCardInfo: {
    flex: 1,
  },
  diveSite: {
    ...typography.headline,
  },
  diveMeta: {
    ...typography.footnote,
    marginTop: spacing.xs,
  },
  diveDepth: {
    ...typography.title,
    color: colors.accent,
  },
});
