import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import SectionHeading from '../ui/SectionHeading';
import StatusPill from '../ui/StatusPill';
import { DonutTooltip } from '../ui/ChartTooltips';
import { INVENTORY_SUMMARY, STOCK_ALERTS, CATEGORY_DATA, DONUT_COLORS } from '../../data/sampleData';

export default function InventorySection() {
  const inventoryDonut = CATEGORY_DATA.map((c) => ({ name: c.name, value: c.units }));

  return (
    <section id="inventory" className="space-y-5 scroll-mt-24">
      <SectionHeading eyebrow="Stock" title="Inventory Overview" />
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
        {INVENTORY_SUMMARY.map((c) => (
          <GlassCard key={c.label} className="text-center">
            <c.icon size={18} className="text-teal-300 mx-auto mb-2" />
            <p className="text-lg font-bold text-white font-mono">{c.value}</p>
            <p className="text-[11px] text-slate-400 mt-1">{c.label}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
        <GlassCard className="xl:col-span-2">
          <SectionHeading eyebrow="Distribution" title="Inventory by Category" />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={inventoryDonut} dataKey="value" nameKey="name" innerRadius={58} outerRadius={88} paddingAngle={3}>
                  {inventoryDonut.map((_, i) => <Cell key={i} fill={DONUT_COLORS[i % DONUT_COLORS.length]} stroke="none" />)}
                </Pie>
                <Tooltip content={<DonutTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-2">
            {inventoryDonut.map((d, i) => (
              <span key={d.name} className="flex items-center gap-1.5 text-[11px] text-slate-400 truncate">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: DONUT_COLORS[i % DONUT_COLORS.length] }} />
                {d.name}
              </span>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="xl:col-span-3">
          <SectionHeading eyebrow="Action needed" title="Stock Alert Panel" />
          <div className="space-y-1">
            {STOCK_ALERTS.map((s) => (
              <div key={s.name} className="flex items-center justify-between gap-3 py-3 border-b border-slate-800/50 last:border-0">
                <div className="flex items-center gap-3 min-w-0">
                  <AlertTriangle size={16} className="text-amber-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-200 truncate">{s.name}</p>
                    <p className="text-[11px] text-slate-500 font-mono">{s.stock} in stock · reorder at {s.reorder}</p>
                  </div>
                </div>
                <StatusPill status={s.status} />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
