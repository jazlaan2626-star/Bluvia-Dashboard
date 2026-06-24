import React from 'react';

const CONFIG = {
  live:    { dot: 'bg-emerald-400 shadow-[0_0_6px_#34d399]', text: 'text-emerald-400', label: 'Live' },
  loading: { dot: 'bg-blue-400 animate-pulse',                text: 'text-blue-400',    label: 'Connecting…' },
  error:   { dot: 'bg-amber-400',                             text: 'text-amber-400',   label: 'Sheet error · Demo data' },
  demo:    { dot: 'bg-slate-500',                             text: 'text-slate-500',   label: 'Demo data' },
};

export default function DataSourceBadge({ status }) {
  const c = CONFIG[status] || CONFIG.demo;
  return (
    <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-950/30 border border-blue-900/30">
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
      <span className={`text-[10px] font-medium tracking-wide ${c.text}`}>{c.label}</span>
    </div>
  );
}
