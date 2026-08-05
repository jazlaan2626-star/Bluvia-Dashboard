import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { DiverProfile } from '../types/database';

export function useDiverProfile(userId: string | undefined) {
  const [profile, setProfile] = useState<DiverProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!userId) {
      setProfile(null);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const { data, error: fetchError } = await supabase
      .from('diver_profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setError(null);
      setProfile(data);
    }
    setIsLoading(false);
  }, [userId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const updateProfile = useCallback(
    async (updates: Partial<DiverProfile>) => {
      if (!userId) return { error: 'Not signed in' };
      const { data, error: updateError } = await supabase
        .from('diver_profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (updateError) return { error: updateError.message };
      setProfile(data);
      return { error: null };
    },
    [userId]
  );

  return { profile, isLoading, error, refresh, updateProfile };
}
