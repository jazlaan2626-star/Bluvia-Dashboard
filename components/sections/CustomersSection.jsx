import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import GlassCard from '../ui/GlassCard';
import SectionHeading from '../ui/SectionHeading';
import { DonutTooltip } from '../ui/ChartTooltips';
import { CUSTOMER_STATS, CUSTOMER_DONUT } from '../../data/sampleData';

export default function CustomersSection() {
  return (
    <section id="customers" className="space-y-5 scroll-mt-24">
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
        <GlassCard className="xl:col-span-3">
          <SectionHeading eyebrow="Audience" title="Customer Analytics" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {CUSTOMER_STATS.map((c) => (
              <div key={c.label} className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
                <c.icon size={16} className="text-sky-300 mb-2" />
                <p className="text-lg font-bold text-white font-mono">{c.value}</p>
                <p className="text-[11px] text-slate-400 mt-1">{c.label}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="xl:col-span-2">
          <SectionHeading eyebrow="Loyalty" title="New vs Returning" />
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={CUSTOMER_DONUT} dataKey="value" nameKey="name" innerRadius={52} outerRadius={82} paddingAngle={4}>
                  <Cell fill="#fb923c" stroke="none" />
                  <Cell fill="#2dd4bf" stroke="none" />
                </Pie>
                <Tooltip content={<DonutTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-5 mt-1">
            <span className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2.5 h-2.5 rounded-full bg-orange-400" /> New</span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2.5 h-2.5 rounded-full bg-teal-400" /> Returning</span>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
