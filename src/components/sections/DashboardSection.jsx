import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { DollarSign, TrendingUp, ShoppingBag } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import SectionHeading from '../ui/SectionHeading';
import KPICard from '../ui/KPICard';
import PillToggle from '../ui/PillToggle';
import DiveGauge from '../ui/DiveGauge';
import { ChartTooltip } from '../ui/ChartTooltips';
import { GAUGES, fmtMVR, fmtNum } from '../../data/sampleData';

export default function DashboardSection({ kpi, margin, chartData, chartPeriod, setChartPeriod }) {
  return (
    <section id="dashboard" className="space-y-5 scroll-mt-24">
      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
        <KPICard label="Total Revenue" value={fmtMVR(kpi.revenue)} sublabel={`${margin}% margin on the period`} icon={DollarSign} trend={18} accent="#3b82f6" />
        <KPICard label="Total Profit" value={fmtMVR(kpi.profit)} sublabel={`Profit margin: ${margin}%`} icon={TrendingUp} accent="#60a5fa" />
        <KPICard label="Total Sales" value={fmtNum(kpi.orders)} sublabel="orders this period" icon={ShoppingBag} trend={12} accent="#7c3aed" />
      </div>

      {/* Revenue / Profit Area Chart */}
      <GlassCard>
        <SectionHeading
          eyebrow="Performance"
          title="Revenue & Profit Performance"
          action={<PillToggle options={['Month', 'Quarter', 'Year']} active={chartPeriod} onChange={setChartPeriod} />}
        />
        <div className="h-72 md:h-80 -ml-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 6, right: 12, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.40} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="profGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 6" stroke="rgba(59,130,246,0.07)" vertical={false} />
              <XAxis dataKey="month" stroke="#334155" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#334155" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#3b82f6" strokeWidth={2.5} fill="url(#revGrad)" activeDot={{ r: 5, fill: '#3b82f6' }} />
              <Area type="monotone" dataKey="profit" name="Profit" stroke="#60a5fa" strokeWidth={2.5} fill="url(#profGrad)" activeDot={{ r: 5, fill: '#60a5fa' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-5 mt-2 pl-2">
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Revenue
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400" /> Profit
          </span>
        </div>
      </GlassCard>

      {/* Gauge Card */}
      <GlassCard>
        <SectionHeading eyebrow="Targets" title="Performance Against Target" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center py-2">
          {GAUGES.map((g) => <DiveGauge key={g.key} {...g} />)}
        </div>
      </GlassCard>
    </section>
  );
}
