import { useState, useEffect } from 'react';
import { transformSheetData } from '../data/sheetTransform';
import { SAMPLE_CONTEXT } from '../context/DataContext';
import { DONUT_COLORS } from '../data/sampleData';

const SHEET_URL = import.meta.env.VITE_SHEET_URL;

export function useSheetData() {
  const [data, setData]     = useState(SAMPLE_CONTEXT);
  const [status, setStatus] = useState(SHEET_URL ? 'loading' : 'demo');

  useEffect(() => {
    if (!SHEET_URL) return;

    fetch(SHEET_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((raw) => {
        if (!raw.ok) throw new Error(raw.error || 'Sheet error');
        const transformed = transformSheetData(raw);
        // Merge with sample context so any missing sheet tab falls back gracefully
        setData({ ...SAMPLE_CONTEXT, ...transformed, DONUT_COLORS });
        setStatus('live');
      })
      .catch(() => {
        setStatus('error');
      });
  }, []);

  return { data, status };
}
