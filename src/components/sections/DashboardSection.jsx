import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { DollarSign, TrendingUp, ShoppingBag, Package } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import SectionHeading from '../ui/SectionHeading';
import KPICard from '../ui/KPICard';
import PillToggle from '../ui/PillToggle';
import DiveGauge from '../ui/DiveGauge';
import { ChartTooltip } from '../ui/ChartTooltips';
import { GAUGES, fmtMVR, fmtNum } from '../../data/sampleData';

export default function DashboardSection({ kpi, margin, chartData, chartPeriod, setChartPeriod }) {
  return (
    <section id="dashboard" className="space-y-6 scroll-mt-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
        <KPICard label="Total Revenue" value={fmtMVR(kpi.revenue)} sublabel={`${margin}% margin on the period`} icon={DollarSign} trend={18} accent="#2dd4bf" />
        <KPICard label="Total Profit" value={fmtMVR(kpi.profit)} sublabel={`Profit margin: ${margin}%`} icon={TrendingUp} accent="#38bdf8" />
        <KPICard label="Total Orders" value={fmtNum(kpi.orders)} sublabel="orders this period" icon={ShoppingBag} trend={12} accent="#fb923c" />
        <KPICard label="Inventory Value" value={fmtMVR(kpi.inventoryValue)} sublabel={`${fmtNum(kpi.units)} units available`} icon={Package} accent="#34d399" />
      </div>

      <GlassCard>
        <SectionHeading
          eyebrow="Performance"
          title="Revenue and Profit Performance"
          action={<PillToggle options={['Month', 'Quarter', 'Year']} active={chartPeriod} onChange={setChartPeriod} />}
        />
        <div className="h-72 md:h-80 -ml-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 6, right: 12, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="profGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2dd4bf" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#2dd4bf" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 6" stroke="rgba(125,211,252,0.08)" vertical={false} />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#38bdf8" strokeWidth={2.5} fill="url(#revGrad)" activeDot={{ r: 5, fill: '#38bdf8' }} />
              <Area type="monotone" dataKey="profit" name="Profit" stroke="#2dd4bf" strokeWidth={2.5} fill="url(#profGrad)" activeDot={{ r: 5, fill: '#2dd4bf' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-5 mt-2 pl-2">
          <span className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2.5 h-2.5 rounded-full bg-sky-400" /> Revenue</span>
          <span className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2.5 h-2.5 rounded-full bg-teal-400" /> Profit</span>
        </div>
      </GlassCard>

      <GlassCard>
        <SectionHeading eyebrow="Targets" title="Performance Against Target" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center">
          {GAUGES.map((g) => <DiveGauge key={g.key} {...g} />)}
        </div>
      </GlassCard>
    </section>
  );
}
