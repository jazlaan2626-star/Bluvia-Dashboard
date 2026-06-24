import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import BLogo from '../ui/BLogo';
import { NAV_ITEMS } from '../../data/sampleData';

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen, activeNav, onNavClick }) {
  const width = collapsed ? 84 : 252;
  return (
    <>
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 lg:hidden" />
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen z-40 flex flex-col shrink-0 transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ width }}
      >
        <div className="h-full flex flex-col sidebar-panel">
          {/* Logo */}
          <div className="flex items-center justify-between px-4 py-5 border-b border-blue-950/60">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-xl blur-md" style={{ background: 'rgba(59,130,246,0.35)' }} />
                <div className="relative">
                  <BLogo size="sm" />
                </div>
              </div>
              {!collapsed && (
                <div className="min-w-0">
                  <span className="font-display font-bold text-white tracking-widest text-[14px] truncate block">BLUVIA</span>
                  <span className="text-[9px] text-blue-400/60 tracking-[0.22em] uppercase font-medium">Dashboard</span>
                </div>
              )}
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/60 rounded-lg p-1"
            >
              <X size={18} />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5 no-scrollbar">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavClick(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/60 ${
                    active
                      ? 'nav-active text-blue-300'
                      : 'text-slate-500 hover:text-slate-200 hover:bg-blue-950/30'
                  } ${collapsed ? 'justify-center' : ''}`}
                >
                  <Icon size={17} className={`shrink-0 transition-colors ${active ? 'text-blue-400' : ''}`} />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* Collapse toggle */}
          <div className="hidden lg:flex flex-col border-t border-blue-950/60 p-3 gap-2">
            {!collapsed && (
              <div className="px-3 py-2 rounded-xl bg-blue-950/20 border border-blue-900/20">
                <p className="text-[10px] text-blue-400/50 font-mono">v1.0.0 · Bluvia Maldives</p>
              </div>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-slate-500 hover:text-blue-400 hover:bg-blue-950/30 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/60"
            >
              {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /><span className="text-xs font-medium">Collapse</span></>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
