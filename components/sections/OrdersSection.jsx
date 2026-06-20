import React from 'react';
import GlassCard from '../ui/GlassCard';
import SectionHeading from '../ui/SectionHeading';
import { ORDER_STATUSES } from '../../data/sampleData';

export default function OrdersSection() {
  return (
    <section id="orders" className="space-y-5 scroll-mt-24">
      <SectionHeading eyebrow="Fulfillment" title="Order Tracking" />
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        {ORDER_STATUSES.map((o) => (
          <GlassCard key={o.label} className="text-center">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: `${o.color}1a`, color: o.color }}>
              <o.icon size={18} />
            </div>
            <p className="text-xl font-bold text-white font-mono">{o.value}</p>
            <p className="text-[11px] text-slate-400 mt-1">{o.label}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
