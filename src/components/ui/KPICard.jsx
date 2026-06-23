import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import GlassCard from './GlassCard';

export default function KPICard({ label, value, sublabel, icon: Icon, trend, accent }) {
  const positive = trend !== undefined && trend >= 0;
  return (
    <GlassCard className="relative overflow-hidden group">
      {/* Subtle top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] opacity-60"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: `${accent}18`, border: `1px solid ${accent}28`, color: accent }}
        >
          <Icon size={20} />
        </div>
        {trend !== undefined && (
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${positive ? 'text-emerald-300 bg-emerald-400/10 border border-emerald-400/20' : 'text-rose-300 bg-rose-400/10 border border-rose-400/20'}`}>
            {positive ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">{label}</p>
      <p className="text-2xl md:text-[28px] font-bold text-white font-mono tracking-tight">{value}</p>
      {sublabel && <p className="text-xs text-slate-600 mt-1.5">{sublabel}</p>}
    </GlassCard>
  );
}
