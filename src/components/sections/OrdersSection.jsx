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
          <GlassCard key={o.label} className="text-center relative overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-[1px] opacity-50"
              style={{ background: `linear-gradient(90deg, transparent, ${o.color}, transparent)` }}
            />
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
              style={{ background: `${o.color}18`, border: `1px solid ${o.color}28`, color: o.color }}
            >
              <o.icon size={18} />
            </div>
            <p className="text-2xl font-bold text-white font-mono">{o.value}</p>
            <p className="text-[11px] text-slate-500 mt-1.5">{o.label}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
