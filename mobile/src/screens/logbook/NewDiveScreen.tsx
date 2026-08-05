import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenBackground } from '../../components/ScreenBackground';
import { TextField } from '../../components/TextField';
import { PrimaryButton } from '../../components/PrimaryButton';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/AuthContext';
import { colors, spacing, typography } from '../../theme/theme';
import type { LogbookStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<LogbookStackParamList, 'NewDive'>;

function toNumberOrNull(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

function minutesToSeconds(value: string): number | null {
  const minutes = toNumberOrNull(value);
  return minutes == null ? null : Math.round(minutes * 60);
}

export function NewDiveScreen({ navigation }: Props) {
  const { session } = useAuth();
  const [diveSite, setDiveSite] = useState('');
  const [location, setLocation] = useState('');
  const [maxDepth, setMaxDepth] = useState('');
  const [avgDepth, setAvgDepth] = useState('');
  const [diveTimeMinutes, setDiveTimeMinutes] = useState('');
  const [waterTemp, setWaterTemp] = useState('');
  const [visibility, setVisibility] = useState('');
  const [buddy, setBuddy] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!session) return;
    setError(null);
    setSaving(true);

    const { error: insertError } = await supabase.from('dives').insert({
      diver_id: session.user.id,
      dive_site: diveSite.trim() || null,
      location: location.trim() || null,
      max_depth: toNumberOrNull(maxDepth),
      avg_depth: toNumberOrNull(avgDepth),
      dive_time_seconds: minutesToSeconds(diveTimeMinutes),
      water_temp: toNumberOrNull(waterTemp),
      visibility: toNumberOrNull(visibility),
      buddy: buddy.trim() || null,
      notes: notes.trim() || null,
    });

    setSaving(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    navigation.goBack();
  };

  return (
    <ScreenBackground>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Log a Dive</Text>

          <TextField label="Dive Site" value={diveSite} onChangeText={setDiveSite} placeholder="Manta Point" />
          <TextField label="Location" value={location} onChangeText={setLocation} placeholder="Maldives" />

          <View style={styles.row}>
            <View style={styles.rowItem}>
              <TextField label="Max Depth (m)" value={maxDepth} onChangeText={setMaxDepth} keyboardType="numeric" placeholder="24" />
            </View>
            <View style={styles.rowItem}>
              <TextField label="Avg Depth (m)" value={avgDepth} onChangeText={setAvgDepth} keyboardType="numeric" placeholder="14" />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.rowItem}>
              <TextField label="Dive Time (min)" value={diveTimeMinutes} onChangeText={setDiveTimeMinutes} keyboardType="numeric" placeholder="45" />
            </View>
            <View style={styles.rowItem}>
              <TextField label="Water Temp (°C)" value={waterTemp} onChangeText={setWaterTemp} keyboardType="numeric" placeholder="27" />
            </View>
          </View>

          <TextField label="Visibility (m)" value={visibility} onChangeText={setVisibility} keyboardType="numeric" placeholder="20" />
          <TextField label="Dive Buddy" value={buddy} onChangeText={setBuddy} placeholder="Alex" />
          <TextField
            label="Notes"
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={4}
            style={styles.notesInput}
            placeholder="Saw a manta ray at 18m..."
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <PrimaryButton label="Save Dive" loading={saving} onPress={handleSave} />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl,
  },
  title: {
    ...typography.largeTitle,
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  rowItem: {
    flex: 1,
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: spacing.sm,
  },
  error: {
    ...typography.footnote,
    color: colors.danger,
    marginBottom: spacing.md,
  },
});
