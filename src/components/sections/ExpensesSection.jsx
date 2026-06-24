import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import GlassCard from '../ui/GlassCard';
import SectionHeading from '../ui/SectionHeading';
import { ChartTooltip } from '../ui/ChartTooltips';
import { useData } from '../../context/DataContext';
import { fmtMVR } from '../../data/sampleData';

export default function ExpensesSection() {
  const { EXPENSE_CARDS, QUARTER_FINANCE } = useData();

  return (
    <section id="expenses" className="space-y-6 scroll-mt-24">
      <SectionHeading eyebrow="Profitability" title="Expense & Profit Breakdown" />

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        {EXPENSE_CARDS.map((e) => (
          <GlassCard key={e.label} className="text-center">
            <p className={`text-lg font-bold font-mono ${e.tone === 'positive' ? 'text-blue-400' : 'text-white'}`}>
              {fmtMVR(e.value)}
            </p>
            <p className="text-[11px] text-slate-500 mt-1.5">{e.label}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard>
        <SectionHeading eyebrow="Quarterly · Yearly" title="Revenue vs Cost vs Profit" />
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={QUARTER_FINANCE} margin={{ top: 6, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 6" stroke="rgba(59,130,246,0.07)" vertical={false} />
              <XAxis dataKey="quarter" stroke="#334155" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#334155" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(59,130,246,0.05)' }} />
              <Legend wrapperStyle={{ fontSize: 12, color: '#475569' }} />
              <Bar dataKey="revenue" name="Revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              <Bar dataKey="cost"    name="Cost"    fill="#1e293b" radius={[6, 6, 0, 0]} />
              <Bar dataKey="profit"  name="Profit"  fill="#60a5fa" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </section>
  );
}
