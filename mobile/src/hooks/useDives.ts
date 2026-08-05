import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Dive } from '../types/database';

export function useDives(diverId: string | undefined) {
  const [dives, setDives] = useState<Dive[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!diverId) {
      setDives([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const { data, error: fetchError } = await supabase
      .from('dives')
      .select('*')
      .eq('diver_id', diverId)
      .order('dive_date', { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setError(null);
      setDives(data ?? []);
    }
    setIsLoading(false);
  }, [diverId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { dives, isLoading, error, refresh };
}

export function computeDiveStats(dives: Dive[]) {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const parsedDives = dives.map((d) => ({ ...d, parsedDate: new Date(d.dive_date) }));

  const todayCount = parsedDives.filter((d) => d.parsedDate >= startOfToday).length;
  const weekCount = parsedDives.filter((d) => d.parsedDate >= startOfWeek).length;
  const monthCount = parsedDives.filter((d) => d.parsedDate >= startOfMonth).length;

  const totalBottomSeconds = dives.reduce((sum, d) => sum + (d.bottom_time_seconds ?? 0), 0);
  const personalBestDepth = dives.reduce(
    (max, d) => (d.max_depth != null && d.max_depth > max ? d.max_depth : max),
    0
  );

  const sortedByDateDesc = [...parsedDives].sort(
    (a, b) => b.parsedDate.getTime() - a.parsedDate.getTime()
  );
  let streak = 0;
  let cursor = startOfToday;
  const diveDaySet = new Set(sortedByDateDesc.map((d) => d.parsedDate.toDateString()));
  while (diveDaySet.has(cursor.toDateString())) {
    streak += 1;
    cursor = new Date(cursor);
    cursor.setDate(cursor.getDate() - 1);
  }

  return {
    todayCount,
    weekCount,
    monthCount,
    totalBottomSeconds,
    personalBestDepth,
    streak,
    totalDives: dives.length,
  };
}

export function formatDuration(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}
