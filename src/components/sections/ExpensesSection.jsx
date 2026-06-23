import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import GlassCard from '../ui/GlassCard';
import SectionHeading from '../ui/SectionHeading';
import { ChartTooltip } from '../ui/ChartTooltips';
import { EXPENSE_CARDS, QUARTER_FINANCE, SHIPPING_STATS, fmtMVR } from '../../data/sampleData';

export default function ExpensesSection({ excludeShipIncluded, setExcludeShipIncluded }) {
  const shippingFactor = excludeShipIncluded ? 0.82 : 1;

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
        <SectionHeading eyebrow="Quarterly" title="Revenue vs Cost vs Profit" />
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={QUARTER_FINANCE} margin={{ top: 6, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 6" stroke="rgba(59,130,246,0.07)" vertical={false} />
              <XAxis dataKey="quarter" stroke="#334155" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#334155" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(59,130,246,0.05)' }} />
              <Legend wrapperStyle={{ fontSize: 12, color: '#475569' }} />
              <Bar dataKey="revenue" name="Revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              <Bar dataKey="cost" name="Cost" fill="#1e293b" radius={[6, 6, 0, 0]} />
              <Bar dataKey="profit" name="Profit" fill="#60a5fa" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <GlassCard>
        <SectionHeading
          eyebrow="Logistics"
          title="Shipping Analysis"
          action={
            <button
              onClick={() => setExcludeShipIncluded(!excludeShipIncluded)}
              className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
            >
              Exclude products with shipping pre-included
              <span
                className="toggle-track w-9 h-5 rounded-full relative flex-shrink-0"
                style={{ background: excludeShipIncluded ? '#3b82f6' : '#1e293b' }}
              >
                <span
                  className="toggle-thumb absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow"
                  style={{ transform: excludeShipIncluded ? 'translateX(16px)' : 'translateX(0)' }}
                />
              </span>
            </button>
          }
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {SHIPPING_STATS.map((s) => (
            <div key={s.label} className="stat-inner p-4">
              <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/15 flex items-center justify-center mb-2.5 text-blue-400">
                <s.icon size={15} />
              </div>
              <p className="text-lg font-bold text-white font-mono">
                {s.isPercent ? s.value : fmtMVR(s.value * shippingFactor)}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </section>
  );
}
