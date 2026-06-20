import React from 'react';
import GlassCard from '../ui/GlassCard';
import SectionHeading from '../ui/SectionHeading';
import StatusPill from '../ui/StatusPill';
import { MARKETING_STATS, CAMPAIGNS, fmtMVR } from '../../data/sampleData';

export default function MarketingSection() {
  return (
    <section id="marketing" className="space-y-5 scroll-mt-24">
      <SectionHeading eyebrow="Growth" title="Marketing Performance" />
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        {MARKETING_STATS.map((m) => (
          <GlassCard key={m.label} className="text-center">
            <m.icon size={18} className="text-teal-300 mx-auto mb-2" />
            <p className="text-lg font-bold text-white font-mono">{m.value}</p>
            <p className="text-[11px] text-slate-400 mt-1">{m.label}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-0 overflow-hidden">
        <div className="p-5 md:p-6 pb-0">
          <SectionHeading eyebrow="Campaigns" title="Campaign Performance" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="text-left text-xs text-slate-500 uppercase tracking-wide border-y border-slate-800/60">
                <th className="px-5 py-3 font-medium">Campaign</th>
                <th className="px-3 py-3 font-medium">Platform</th>
                <th className="px-3 py-3 font-medium text-right">Budget</th>
                <th className="px-3 py-3 font-medium text-right">Sales Generated</th>
                <th className="px-3 py-3 font-medium text-right">ROI</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {CAMPAIGNS.map((c) => (
                <tr key={c.name} className="border-b border-slate-800/40 last:border-0 hover:bg-teal-400/5 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-slate-100 whitespace-nowrap">{c.name}</td>
                  <td className="px-3 py-3.5 text-slate-400 whitespace-nowrap">{c.platform}</td>
                  <td className="px-3 py-3.5 text-right font-mono text-slate-300">{fmtMVR(c.budget)}</td>
                  <td className="px-3 py-3.5 text-right font-mono text-slate-100">{fmtMVR(c.sales)}</td>
                  <td className="px-3 py-3.5 text-right font-mono text-teal-300">{c.roi}</td>
                  <td className="px-5 py-3.5"><StatusPill status={c.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </section>
  );
}
