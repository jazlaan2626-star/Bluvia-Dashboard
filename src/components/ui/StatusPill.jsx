import React from 'react';
import { STATUS_STYLES } from '../../data/sampleData';

export default function StatusPill({ status }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full border text-[11px] font-medium tracking-wide whitespace-nowrap ${STATUS_STYLES[status] || 'bg-slate-400/10 text-slate-300 border-slate-400/25'}`}>
      {status}
    </span>
  );
}
