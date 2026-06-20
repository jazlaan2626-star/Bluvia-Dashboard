import React from 'react';

export default function PillToggle({ options, active, onChange }) {
  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-900/60 border border-slate-700/50">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400/60 ${
            active === opt ? 'bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 shadow-[0_0_16px_rgba(45,212,191,0.4)]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
