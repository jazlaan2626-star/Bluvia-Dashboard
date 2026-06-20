import React from 'react';
import GlassCard from '../ui/GlassCard';
import SectionHeading from '../ui/SectionHeading';
import CategoryBar from '../ui/CategoryBar';
import ChannelRow from '../ui/ChannelRow';
import { CATEGORY_DATA, DONUT_COLORS, SALES_CHANNELS } from '../../data/sampleData';

export default function SalesSection() {
  const maxCategory = Math.max(...CATEGORY_DATA.map((c) => c.value));
  const maxChannel = Math.max(...SALES_CHANNELS.map((c) => c.revenue));

  return (
    <section id="sales" className="space-y-6 scroll-mt-24">
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
        <GlassCard className="xl:col-span-3">
          <SectionHeading eyebrow="Products" title="Sales by Product Category" />
          <div className="space-y-4">
            {CATEGORY_DATA.map((c, i) => (
              <CategoryBar key={c.name} {...c} max={maxCategory} color={DONUT_COLORS[i % DONUT_COLORS.length]} />
            ))}
          </div>
        </GlassCard>

        <GlassCard className="xl:col-span-2">
          <SectionHeading eyebrow="Channels" title="Sales Channel Performance" />
          <div>
            {SALES_CHANNELS.map((c) => <ChannelRow key={c.name} {...c} max={maxChannel} />)}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
