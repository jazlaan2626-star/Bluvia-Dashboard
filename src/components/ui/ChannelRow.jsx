import React from 'react';
import { fmtMVR } from '../../data/sampleData';

export default function ChannelRow({ icon: Icon, name, revenue, orders, aov, max }) {
  const pct = Math.max(4, (revenue / max) * 100);
  return (
    <div className="flex items-center gap-4 py-3 border-b border-slate-800/60 last:border-0">
      <div className="w-9 h-9 rounded-xl bg-teal-400/10 flex items-center justify-center text-teal-300 shrink-0">
        <Icon size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5 gap-2">
          <span className="text-sm font-medium text-slate-200 truncate">{name}</span>
          <span className="text-sm font-mono text-white shrink-0">{fmtMVR(revenue)}</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-slate-800/70 overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #2dd4bf, #38bdf8)' }} />
        </div>
      </div>
      <div className="text-right shrink-0 hidden sm:block w-24">
        <p className="text-xs text-slate-400">{orders} orders</p>
        <p className="text-[11px] font-mono text-slate-500">AOV {fmtMVR(aov)}</p>
      </div>
    </div>
  );
}
