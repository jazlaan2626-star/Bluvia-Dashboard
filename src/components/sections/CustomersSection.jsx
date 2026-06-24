import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import GlassCard from '../ui/GlassCard';
import SectionHeading from '../ui/SectionHeading';
import { DonutTooltip } from '../ui/ChartTooltips';
import { useData } from '../../context/DataContext';

const LOYALTY_COLORS = ['#7c3aed', '#3b82f6'];

export default function CustomersSection() {
  const { CUSTOMER_STATS, CUSTOMER_DONUT } = useData();

  return (
    <section id="customers" className="space-y-5 scroll-mt-24">
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
        <GlassCard className="xl:col-span-3">
          <SectionHeading eyebrow="Audience" title="Customer Analytics" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CUSTOMER_STATS.map((c) => (
              <div key={c.label} className="stat-inner p-4">
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/15 flex items-center justify-center mb-2.5 text-blue-400">
                  <c.icon size={15} />
                </div>
                <p className="text-lg font-bold text-white font-mono">{c.value}</p>
                <p className="text-[11px] text-slate-500 mt-1">{c.label}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="xl:col-span-2">
          <SectionHeading eyebrow="Loyalty" title="New vs Returning" />
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={CUSTOMER_DONUT} dataKey="value" nameKey="name" innerRadius={52} outerRadius={82} paddingAngle={4}>
                  {CUSTOMER_DONUT.map((_, i) => (
                    <Cell key={i} fill={LOYALTY_COLORS[i % LOYALTY_COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip content={<DonutTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-5 mt-1">
            <span className="flex items-center gap-1.5 text-xs text-slate-500"><span className="w-2.5 h-2.5 rounded-full" style={{ background: LOYALTY_COLORS[0] }} /> New</span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500"><span className="w-2.5 h-2.5 rounded-full" style={{ background: LOYALTY_COLORS[1] }} /> Returning</span>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
