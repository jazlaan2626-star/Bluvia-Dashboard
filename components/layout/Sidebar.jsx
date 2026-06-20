import React from 'react';
import { Waves, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { NAV_ITEMS } from '../../data/sampleData';

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen, activeNav, onNavClick }) {
  const width = collapsed ? 84 : 252;
  return (
    <>
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden" />
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen z-40 flex flex-col shrink-0 transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ width }}
      >
        <div className="h-full flex flex-col sidebar-panel">
          {/* Logo */}
          <div className="flex items-center justify-between px-4 py-5 border-b border-slate-800/60">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 logo-badge">
                <Waves size={18} className="text-slate-950" />
              </div>
              {!collapsed && <span className="font-display font-bold text-white tracking-wide text-[15px] truncate">BLUVIA</span>}
            </div>
            <button onClick={() => setMobileOpen(false)} className="lg:hidden text-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-400/60 rounded-lg p-1">
              <X size={18} />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 no-scrollbar">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavClick(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400/60 ${
                    active ? 'nav-active text-white' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40'
                  } ${collapsed ? 'justify-center' : ''}`}
                >
                  <Icon size={18} className="shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* Collapse toggle (desktop only) */}
          <div className="hidden lg:flex border-t border-slate-800/60 p-3">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-slate-400 hover:text-teal-300 hover:bg-slate-800/40 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400/60"
            >
              {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /><span className="text-xs font-medium">Collapse</span></>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
