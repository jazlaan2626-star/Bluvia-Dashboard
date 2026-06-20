import React from 'react';
import { fmtMVR, fmtNum } from '../../data/sampleData';

export function ChartTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-xl border border-teal-400/20 bg-[#0b1c30]/95 backdrop-blur px-4 py-3 shadow-2xl">
      <p className="text-[11px] font-semibold text-slate-400 mb-1.5">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm font-mono flex items-center gap-2" style={{ color: p.color }}>
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
    <div className="rounded-xl border border-teal-400/20 bg-[#0b1c30]/95 backdrop-blur px-3 py-2 shadow-2xl">
      <p className="text-xs font-mono text-white flex items-center gap-2">
        <span className="w-2 h-2 rounded-full" style={{ background: p.payload.fill }} />
        {p.name}: {fmtNum(p.value)}
      </p>
    </div>
  );
}
