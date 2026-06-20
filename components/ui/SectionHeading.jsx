import React from 'react';

export default function SectionHeading({ eyebrow, title, action }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
      <div>
        {eyebrow && <p className="text-[11px] font-semibold tracking-[0.18em] text-teal-300/80 uppercase mb-1">{eyebrow}</p>}
        <h2 className="text-lg md:text-xl font-bold text-white font-display">{title}</h2>
      </div>
      {action}
    </div>
  );
}
