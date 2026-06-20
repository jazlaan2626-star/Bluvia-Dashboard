import React from 'react';
import { fmtNum, fmtMVR } from '../../data/sampleData';

export default function CategoryBar({ name, units, value, max, color }) {
  const pct = Math.max(4, (value / max) * 100);
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-slate-200 truncate">{name}</span>
        <span className="font-mono text-xs text-slate-400 shrink-0">{fmtNum(units)} units · {fmtMVR(value)}</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-slate-800/70 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, #38bdf8)` }} />
      </div>
    </div>
  );
}
