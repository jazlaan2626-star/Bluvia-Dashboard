import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ScreenBackground } from '../components/ScreenBackground';
import { GlassCard } from '../components/GlassCard';
import { StatCard } from '../components/StatCard';
import { useAuth } from '../lib/AuthContext';
import { useDiverProfile } from '../hooks/useDiverProfile';
import { useDives, computeDiveStats, formatDuration } from '../hooks/useDives';
import { colors, spacing, typography } from '../theme/theme';

export function HomeScreen() {
  const { session, isGuest } = useAuth();
  const userId = session?.user.id;
  const { profile } = useDiverProfile(userId);
  const { dives, isLoading, refresh } = useDives(userId);

  const stats = computeDiveStats(dives);
  const displayName = profile?.full_name || profile?.username || session?.user.email || 'Diver';

  return (
    <ScreenBackground>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refresh} tintColor={colors.accent} />}
      >
        <Text style={styles.eyebrow}>WELCOME BACK</Text>
        <Text style={styles.name}>{displayName}</Text>

        {isGuest && (
          <GlassCard style={styles.guestBanner}>
            <Text style={styles.guestText}>
              You're browsing as a guest. Sign up to save your dives across devices.
            </Text>
          </GlassCard>
        )}

        <View style={styles.statsGrid}>
          <StatCard label="Today's Dives" value={String(stats.todayCount)} accent />
          <StatCard label="This Week" value={String(stats.weekCount)} />
          <StatCard label="This Month" value={String(stats.monthCount)} />
          <StatCard label="Current Streak" value={String(stats.streak)} unit="days" />
          <StatCard label="Total Bottom Time" value={formatDuration(stats.totalBottomSeconds)} />
          <StatCard
            label="Personal Best"
            value={stats.personalBestDepth ? stats.personalBestDepth.toFixed(1) : '—'}
            unit="m"
          />
        </View>

        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {dives.length === 0 ? (
          <GlassCard>
            <Text style={styles.emptyText}>No dives logged yet. Start tracking your next dive.</Text>
          </GlassCard>
        ) : (
          dives.slice(0, 3).map((dive) => (
            <GlassCard key={dive.id} style={styles.diveRow}>
              <View>
                <Text style={styles.diveSite}>{dive.dive_site || dive.location || 'Untitled dive'}</Text>
                <Text style={styles.diveMeta}>{dive.dive_date}</Text>
              </View>
              <Text style={styles.diveDepth}>{dive.max_depth ? `${dive.max_depth}m` : '—'}</Text>
            </GlassCard>
          ))
        )}

        <Text style={styles.sectionTitle}>Conditions</Text>
        <GlassCard>
          <Text style={styles.emptyText}>
            Weather, tide, and moon phase data will appear here once location services and a
            marine data provider are connected.
          </Text>
        </GlassCard>
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
  eyebrow: {
    ...typography.caption,
    color: colors.accent,
    letterSpacing: 2,
  },
  name: {
    ...typography.largeTitle,
    marginBottom: spacing.lg,
  },
  guestBanner: {
    marginBottom: spacing.lg,
  },
  guestText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.headline,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  diveRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
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
