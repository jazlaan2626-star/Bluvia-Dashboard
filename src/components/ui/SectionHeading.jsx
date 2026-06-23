import React from 'react';

export default function SectionHeading({ eyebrow, title, action }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
      <div>
        {eyebrow && (
          <p className="text-[10px] font-semibold tracking-[0.22em] text-blue-400/70 uppercase mb-1.5">
            {eyebrow}
          </p>
        )}
        <h2 className="text-lg md:text-xl font-bold text-white font-display">{title}</h2>
      </div>
      {action}
    </div>
  );
}
