import React from 'react';
import { fmtMVR, fmtNum } from '../../data/sampleData';

export function ChartTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-xl border border-blue-500/20 bg-[#010510]/97 backdrop-blur-xl px-4 py-3 shadow-2xl shadow-black/80">
      <p className="text-[11px] font-semibold text-slate-500 mb-2 uppercase tracking-wider">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm font-mono flex items-center gap-2 mb-0.5 last:mb-0" style={{ color: p.color }}>
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          {p.name}: {fmtMVR(p.value)}
        </p>
      ))}
    </div>
  );
}

export function DonutTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const p = payload[0];
  return (
    <div className="rounded-xl border border-blue-500/20 bg-[#010510]/97 backdrop-blur-xl px-3 py-2 shadow-2xl shadow-black/80">
      <p className="text-xs font-mono text-white flex items-center gap-2">
        <span className="w-2 h-2 rounded-full" style={{ background: p.payload.fill }} />
        {p.name}: {fmtNum(p.value)}
      </p>
    </div>
  );
}
