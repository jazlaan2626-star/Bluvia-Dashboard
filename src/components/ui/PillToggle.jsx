import React from 'react';

export default function PillToggle({ options, active, onChange }) {
  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-blue-950/30 border border-blue-900/40">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/60 ${
            active === opt
              ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-[0_0_18px_rgba(59,130,246,0.40)]'
              : 'text-slate-500 hover:text-slate-200 hover:bg-blue-900/30'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
