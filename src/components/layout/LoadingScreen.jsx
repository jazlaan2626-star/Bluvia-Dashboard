import React from 'react';
import { Waves } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black gap-6">
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl blur-xl" style={{ background: 'rgba(59,130,246,0.45)' }} />
        <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center logo-badge">
          <Waves size={28} className="text-white" />
        </div>
      </div>
      <div className="text-center space-y-1">
        <p className="text-base font-bold text-white font-display tracking-widest">BLUVIA</p>
        <p className="text-xs font-medium text-blue-400/70 tracking-[0.2em] uppercase">Initialising Dashboard</p>
      </div>
      <div className="w-52 h-0.5 rounded-full bg-blue-900/60 overflow-hidden">
        <div className="h-full w-1/2 rounded-full loading-bar" />
      </div>
    </div>
  );
}
