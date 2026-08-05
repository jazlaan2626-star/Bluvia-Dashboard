import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ScreenBackground } from '../components/ScreenBackground';
import { GlassCard } from '../components/GlassCard';
import { StatCard } from '../components/StatCard';
import { TextField } from '../components/TextField';
import { PrimaryButton } from '../components/PrimaryButton';
import { useAuth } from '../lib/AuthContext';
import { useDiverProfile } from '../hooks/useDiverProfile';
import { useDives, computeDiveStats, formatDuration } from '../hooks/useDives';
import { colors, spacing, typography } from '../theme/theme';
import type { ExperienceLevel } from '../types/database';

const EXPERIENCE_LEVELS: ExperienceLevel[] = ['beginner', 'intermediate', 'advanced', 'professional'];

export function ProfileScreen() {
  const { session, isGuest, signOut } = useAuth();
  const userId = session?.user.id;
  const { profile, updateProfile } = useDiverProfile(userId);
  const { dives } = useDives(userId);
  const stats = computeDiveStats(dives);

  const [username, setUsername] = useState('');
  const [country, setCountry] = useState('');
  const [bio, setBio] = useState('');
  const [experience, setExperience] = useState<ExperienceLevel>('beginner');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile) {
      setUsername(profile.username ?? '');
      setCountry(profile.country ?? '');
      setBio(profile.bio ?? '');
      setExperience(profile.experience_level);
    }
  }, [profile]);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    const { error } = await updateProfile({
      username: username.trim() || null,
      country: country.trim() || null,
      bio: bio.trim() || null,
      experience_level: experience,
    });
    setSaving(false);
    if (!error) setSaved(true);
  };

  if (isGuest || !session) {
    return (
      <ScreenBackground>
        <View style={styles.guestWrapper}>
          <Text style={styles.title}>Guest mode</Text>
          <Text style={styles.subtitle}>Sign up to build your diver profile and track stats.</Text>
        </View>
      </ScreenBackground>
    );
  }

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Your Profile</Text>

        <View style={styles.statsGrid}>
          <StatCard label="Total Dives" value={String(stats.totalDives)} accent />
          <StatCard label="Max Depth" value={stats.personalBestDepth ? stats.personalBestDepth.toFixed(1) : '—'} unit="m" />
          <StatCard label="Bottom Time" value={formatDuration(stats.totalBottomSeconds)} />
          <StatCard label="Streak" value={String(stats.streak)} unit="days" />
        </View>

        <GlassCard style={styles.formCard}>
          <TextField label="Username" value={username} onChangeText={setUsername} placeholder="oceanwanderer" />
          <TextField label="Country" value={country} onChangeText={setCountry} placeholder="Maldives" />
          <TextField
            label="Bio"
            value={bio}
            onChangeText={setBio}
            placeholder="Tell other divers about yourself"
            multiline
            numberOfLines={3}
            style={styles.bioInput}
          />

          <Text style={styles.label}>Experience Level</Text>
          <View style={styles.pillRow}>
            {EXPERIENCE_LEVELS.map((level) => (
              <PrimaryButton
                key={level}
                label={level[0].toUpperCase() + level.slice(1)}
                variant={experience === level ? 'primary' : 'secondary'}
                onPress={() => setExperience(level)}
                style={styles.pillButton}
              />
            ))}
          </View>

          {saved ? <Text style={styles.savedText}>Profile saved.</Text> : null}
          <PrimaryButton label="Save Profile" loading={saving} onPress={handleSave} style={styles.saveButton} />
        </GlassCard>

        <PrimaryButton label="Sign Out" variant="secondary" onPress={signOut} />
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
  guestWrapper: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  title: {
    ...typography.largeTitle,
    marginBottom: spacing.lg,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  formCard: {
    marginBottom: spacing.lg,
  },
  bioInput: {
    height: 88,
    textAlignVertical: 'top',
    paddingTop: spacing.sm,
  },
  label: {
    ...typography.caption,
    marginBottom: spacing.sm,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.lg,
  },
  pillButton: {
    height: 40,
    paddingHorizontal: 14,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  savedText: {
    ...typography.footnote,
    color: colors.success,
    marginBottom: spacing.sm,
  },
  saveButton: {
    marginTop: spacing.xs,
  },
});
