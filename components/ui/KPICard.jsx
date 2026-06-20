import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import GlassCard from './GlassCard';

export default function KPICard({ label, value, sublabel, icon: Icon, trend, accent }) {
  const positive = trend !== undefined && trend >= 0;
  return (
    <GlassCard className="relative overflow-hidden">
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: `${accent}1a`, color: accent }}>
          <Icon size={20} />
        </div>
        {trend !== undefined && (
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${positive ? 'text-emerald-300 bg-emerald-400/10' : 'text-rose-300 bg-rose-400/10'}`}>
            {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="text-xs font-medium text-slate-400 mb-1">{label}</p>
      <p className="text-2xl md:text-[28px] font-bold text-white font-mono tracking-tight">{value}</p>
      {sublabel && <p className="text-xs text-slate-500 mt-1.5">{sublabel}</p>}
    </GlassCard>
  );
}
