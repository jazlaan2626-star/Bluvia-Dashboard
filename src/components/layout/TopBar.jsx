import React, { useState } from 'react';
import { Menu, Search, ChevronDown, Bell, X } from 'lucide-react';
import { DATE_FILTERS } from '../../data/sampleData';

export default function TopBar({ setMobileOpen, dateFilter, setDateFilter, notice, setNotice }) {
  const [open, setOpen] = useState(false);
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  return (
    <div className="sticky top-0 z-20 backdrop-blur-xl bg-[#050b14]/80 border-b border-slate-800/60">
      {notice && (
        <div className="px-4 md:px-8 py-2 bg-teal-400/10 border-b border-teal-400/20 text-teal-200 text-xs flex items-center justify-between gap-3">
          <span>{notice}</span>
          <button onClick={() => setNotice(null)} className="text-teal-300 hover:text-white focus:outline-none"><X size={14} /></button>
        </div>
      )}
      <div className="flex items-center justify-between gap-4 px-4 md:px-8 py-4">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-teal-400/60">
            <Menu size={20} />
          </button>
          <div className="min-w-0">
            <p className="text-[10px] md:text-[11px] font-semibold tracking-[0.2em] text-teal-300/80 uppercase">Bluvia Maldives</p>
            <h1 className="text-base md:text-xl font-bold text-white font-display tracking-tight truncate">BLUVIA BUSINESS DASHBOARD</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <div className="relative hidden md:block">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input placeholder="Search..." className="pl-9 pr-3 py-2 w-44 lg:w-56 rounded-xl bg-slate-900/60 border border-slate-700/50 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400/50" />
          </div>

          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-700/50 text-sm text-slate-200 hover:border-teal-400/40 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400/50"
            >
              <span className="hidden sm:inline">{dateFilter}</span>
              <span className="sm:hidden">Filter</span>
              <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl border border-slate-700/60 bg-[#0b1c30] shadow-2xl py-1.5 z-30">
                {DATE_FILTERS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setDateFilter(opt); setOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-teal-400/10 transition-colors ${dateFilter === opt ? 'text-teal-300 font-medium' : 'text-slate-300'}`}
                  >
                    {opt}
                  </button>
                ))}
                {dateFilter === 'Custom Range' && (
                  <div className="px-4 py-2 space-y-2 border-t border-slate-700/50 mt-1 pt-2">
                    <input type="date" value={customStart} onChange={(e) => setCustomStart(e.target.value)} className="w-full px-2 py-1.5 rounded-lg bg-slate-800/70 border border-slate-700/50 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-400/50" />
                    <input type="date" value={customEnd} onChange={(e) => setCustomEnd(e.target.value)} className="w-full px-2 py-1.5 rounded-lg bg-slate-800/70 border border-slate-700/50 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-400/50" />
                  </div>
                )}
              </div>
            )}
          </div>

          <button className="relative p-2 rounded-xl bg-slate-900/60 border border-slate-700/50 text-slate-300 hover:text-teal-300 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400/50">
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-coral-glow" />
          </button>

          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-slate-950 shrink-0 logo-badge">
            BM
          </div>
        </div>
      </div>
    </div>
  );
}
