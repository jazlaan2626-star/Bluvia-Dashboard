import React from 'react';
import { Waves } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#050b14] gap-5">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center logo-badge animate-pulse">
        <Waves size={26} className="text-slate-950" />
      </div>
      <p className="text-sm font-medium text-slate-400 tracking-wide">Loading Bluvia Dashboard…</p>
      <div className="w-48 h-1 rounded-full bg-slate-800 overflow-hidden">
        <div className="h-full w-1/2 rounded-full loading-bar" />
      </div>
    </div>
  );
}
