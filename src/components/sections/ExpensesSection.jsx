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
            <p className={`text-lg font-bold font-mono ${e.tone === 'positive' ? 'text-teal-300' : 'text-white'}`}>{fmtMVR(e.value)}</p>
            <p className="text-[11px] text-slate-400 mt-1">{e.label}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard>
        <SectionHeading eyebrow="Quarterly" title="Revenue vs Cost vs Profit" />
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={QUARTER_FINANCE} margin={{ top: 6, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 6" stroke="rgba(125,211,252,0.08)" vertical={false} />
              <XAxis dataKey="quarter" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(56,189,248,0.05)' }} />
              <Legend wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />
              <Bar dataKey="revenue" name="Revenue" fill="#38bdf8" radius={[6, 6, 0, 0]} />
              <Bar dataKey="cost" name="Cost" fill="#64748b" radius={[6, 6, 0, 0]} />
              <Bar dataKey="profit" name="Profit" fill="#2dd4bf" radius={[6, 6, 0, 0]} />
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
              className="flex items-center gap-2 text-xs text-slate-400 focus:outline-none"
            >
              Exclude products with shipping pre-included
              <span className="toggle-track w-9 h-5 rounded-full relative" style={{ background: excludeShipIncluded ? '#2dd4bf' : '#334155' }}>
                <span className="toggle-thumb absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white" style={{ transform: excludeShipIncluded ? 'translateX(16px)' : 'translateX(0)' }} />
              </span>
            </button>
          }
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {SHIPPING_STATS.map((s) => (
            <div key={s.label} className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
              <s.icon size={16} className="text-sky-300 mb-2" />
              <p className="text-lg font-bold text-white font-mono">
                {s.isPercent ? s.value : fmtMVR(s.value * shippingFactor)}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </section>
  );
}
