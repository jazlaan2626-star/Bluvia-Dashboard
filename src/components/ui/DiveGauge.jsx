import React from 'react';

export default function DiveGauge({ percent, label, value, color }) {
  const size = 156;
  const stroke = 9;
  const radius = (size - stroke) / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const ticks = Array.from({ length: 36 });
  const cx = size / 2, cy = size / 2;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {ticks.map((_, i) => {
            const angle = (i * 10 * Math.PI) / 180;
            const isMajor = i % 9 === 0;
            const r1 = radius + stroke / 2 + 3;
            const r2 = r1 + (isMajor ? 7 : 3);
            const x1 = cx + r1 * Math.cos(angle);
            const y1 = cy + r1 * Math.sin(angle);
            const x2 = cx + r2 * Math.cos(angle);
            const y2 = cy + r2 * Math.sin(angle);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(125,211,252,0.22)" strokeWidth={isMajor ? 1.6 : 1} />;
          })}
          <circle cx={cx} cy={cy} r={radius} fill="none" stroke="rgba(125,211,252,0.1)" strokeWidth={stroke} />
          <circle
            cx={cx} cy={cy} r={radius} fill="none" stroke={color} strokeWidth={stroke}
            strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
            style={{ filter: `drop-shadow(0 0 6px ${color}99)`, transition: 'stroke-dashoffset 1.1s cubic-bezier(.4,0,.2,1)' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white font-mono">{percent}<span className="text-base text-slate-400">%</span></span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-slate-200">{label}</p>
        <p className="text-[11px] text-slate-500 font-mono mt-0.5">{value}</p>
      </div>
    </div>
  );
}
