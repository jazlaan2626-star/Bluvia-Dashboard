import React from 'react';
import GlassCard from '../ui/GlassCard';
import SectionHeading from '../ui/SectionHeading';
import StatusPill from '../ui/StatusPill';
import { TOP_PRODUCTS, fmtMVR, fmtNum } from '../../data/sampleData';

export default function ProductsSection() {
  return (
    <section id="products" className="space-y-6 scroll-mt-24">
      <GlassCard className="p-0 overflow-hidden">
        <div className="p-5 md:p-6 pb-0">
          <SectionHeading eyebrow="Products" title="Top-Selling Products" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[820px]">
            <thead>
              <tr className="text-left text-[11px] text-slate-600 uppercase tracking-widest border-y border-blue-950/50">
                <th className="px-5 py-3 font-medium">Product</th>
                <th className="px-3 py-3 font-medium">Category</th>
                <th className="px-3 py-3 font-medium text-right">Units Sold</th>
                <th className="px-3 py-3 font-medium text-right">Revenue</th>
                <th className="px-3 py-3 font-medium text-right">Cost</th>
                <th className="px-3 py-3 font-medium text-right">Profit</th>
                <th className="px-3 py-3 font-medium text-right">Stock</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {TOP_PRODUCTS.map((p) => (
                <tr key={p.name} className="table-row-hover border-b border-blue-950/40 last:border-0 transition-colors cursor-default">
                  <td className="px-5 py-3.5 font-medium text-slate-200 whitespace-nowrap">{p.name}</td>
                  <td className="px-3 py-3.5 text-slate-500 whitespace-nowrap">{p.category}</td>
                  <td className="px-3 py-3.5 text-right font-mono text-slate-400">{fmtNum(p.units)}</td>
                  <td className="px-3 py-3.5 text-right font-mono text-slate-200">{fmtMVR(p.revenue)}</td>
                  <td className="px-3 py-3.5 text-right font-mono text-slate-500">{fmtMVR(p.cost)}</td>
                  <td className="px-3 py-3.5 text-right font-mono text-blue-400">{fmtMVR(p.profit)}</td>
                  <td className="px-3 py-3.5 text-right font-mono text-slate-400">{fmtNum(p.stock)}</td>
                  <td className="px-5 py-3.5"><StatusPill status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </section>
  );
}
