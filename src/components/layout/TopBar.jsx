import React, { useState } from 'react';
import { Menu, Search, ChevronDown, Bell, X, Waves } from 'lucide-react';
import { DATE_FILTERS } from '../../data/sampleData';

export default function TopBar({ setMobileOpen, dateFilter, setDateFilter, notice, setNotice }) {
  const [open, setOpen] = useState(false);
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  return (
    <div className="sticky top-0 z-20 backdrop-blur-2xl bg-black/85 border-b border-blue-950/50">
      {notice && (
        <div className="px-4 md:px-8 py-2 bg-blue-500/10 border-b border-blue-500/20 text-blue-200 text-xs flex items-center justify-between gap-3">
          <span>{notice}</span>
          <button onClick={() => setNotice(null)} className="text-blue-300 hover:text-white focus:outline-none">
            <X size={14} />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between gap-4 px-4 md:px-8 py-3.5">
        {/* Left */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-blue-950/50 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
          >
            <Menu size={20} />
          </button>
          <div className="min-w-0">
            <p className="text-[10px] md:text-[11px] font-semibold tracking-[0.22em] text-blue-400/70 uppercase">Bluvia Maldives</p>
            <h1 className="text-base md:text-xl font-bold text-white font-display tracking-tight truncate">
              Business Dashboard
            </h1>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
            <input
              placeholder="Search..."
              className="pl-9 pr-3 py-2 w-44 lg:w-52 rounded-xl bg-blue-950/25 border border-blue-900/40 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/40 transition-all"
            />
          </div>

          {/* Date filter */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-950/25 border border-blue-900/40 text-sm text-slate-300 hover:border-blue-500/40 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <span className="hidden sm:inline">{dateFilter}</span>
              <span className="sm:hidden">Filter</span>
              <ChevronDown size={13} className={`transition-transform text-blue-400/70 ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl border border-blue-900/50 bg-[#02060f]/97 backdrop-blur-xl shadow-2xl shadow-black/60 py-1.5 z-30">
                {DATE_FILTERS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setDateFilter(opt); setOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-500/10 transition-colors ${dateFilter === opt ? 'text-blue-400 font-medium' : 'text-slate-400'}`}
                  >
                    {opt}
                  </button>
                ))}
                {dateFilter === 'Custom Range' && (
                  <div className="px-4 py-2 space-y-2 border-t border-blue-900/40 mt-1 pt-3">
                    <input type="date" value={customStart} onChange={(e) => setCustomStart(e.target.value)} className="w-full px-2 py-1.5 rounded-lg bg-blue-950/40 border border-blue-900/50 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
                    <input type="date" value={customEnd} onChange={(e) => setCustomEnd(e.target.value)} className="w-full px-2 py-1.5 rounded-lg bg-blue-950/40 border border-blue-900/50 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-xl bg-blue-950/25 border border-blue-900/40 text-slate-400 hover:text-blue-300 hover:border-blue-500/40 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50">
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full blue-dot" />
          </button>

          {/* Avatar */}
          <div className="relative">
            <div className="absolute inset-0 rounded-xl blur-md opacity-70" style={{ background: 'rgba(59,130,246,0.4)' }} />
            <div className="relative w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0 logo-badge">
              BM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
