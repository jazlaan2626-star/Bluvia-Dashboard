import React from 'react';

function BluviaLogo() {
  return (
    <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
      <defs>
        <linearGradient id="bluvia-hero-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
      <path
        d="M5 18c2.5-3 5.5-3 8 0s5.5 3 8 0s5.5-3 8 0"
        stroke="url(#bluvia-hero-g)"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M5 23c2.5-3 5.5-3 8 0s5.5 3 8 0s5.5-3 8 0"
        stroke="url(#bluvia-hero-g)"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

function BluviaNavbar() {
  const links = ['shop', 'destinations', 'guides', 'about'];

  return (
    <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between gap-4 px-6 pt-6 md:px-10">
      <div className="flex items-center gap-2 rounded-full bg-[rgba(10,22,38,0.85)] py-3 pl-4 pr-6 backdrop-blur border border-[rgba(56,189,248,0.12)]">
        <BluviaLogo />
        <span className="font-display text-sm font-medium tracking-tight text-white">bluvia</span>
      </div>

      <div className="hidden items-center gap-1 rounded-full bg-[rgba(10,22,38,0.85)] px-3 py-2 backdrop-blur border border-[rgba(56,189,248,0.12)] md:flex">
        {links.map((link) => (
          <a
            key={link}
            href={`#${link}`}
            className="rounded-full px-5 py-2 text-sm text-slate-300 transition-colors hover:text-white"
          >
            {link}
          </a>
        ))}
      </div>

      <button
        type="button"
        className="rounded-full bg-gradient-to-r from-[#2dd4bf] to-[#38bdf8] px-6 py-3 text-sm font-medium text-[#04121f] transition-opacity hover:opacity-90"
      >
        shop now
      </button>
    </nav>
  );
}

function StatBlock({
  value,
  label,
  position,
  dividerRotation,
  dividerFirst,
}: {
  value: string;
  label: string;
  position: string;
  dividerRotation: string;
  dividerFirst: boolean;
}) {
  const divider = (
    <span
      className={`hidden h-px w-24 bg-[rgba(148,197,222,0.35)] md:block ${dividerRotation}`}
      aria-hidden="true"
    />
  );

  return (
    <div className={`absolute ${position}`}>
      <div className={`flex items-center gap-3 ${dividerFirst ? 'justify-end' : ''}`}>
        {dividerFirst && divider}
        <span className="font-display text-4xl font-medium tracking-tight text-white md:text-5xl">
          {value}
        </span>
        {!dividerFirst && divider}
      </div>
      <p className={`mt-1 text-xs text-slate-300/80 md:text-sm ${dividerFirst ? 'text-right' : ''}`}>
        {label}
      </p>
    </div>
  );
}

export default function BluviaHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#050b14] bluvia-hero">
      {/* Underwater-caustics ambient backdrop stands in for a looping reef/dive
          video — swap for a <video> element once real footage is available. */}
      <div className="bluvia-hero-bg" aria-hidden="true">
        <div className="bluvia-hero-blob blob-a" />
        <div className="bluvia-hero-blob blob-b" />
        <div className="bluvia-hero-blob blob-c" />
      </div>

      <BluviaNavbar />

      <div className="relative h-full w-full">
        <h1 className="hero-title font-display absolute left-4 top-[18%] text-[14vw] font-medium text-white md:left-10 md:text-[13vw]">
          dive
        </h1>
        <h1 className="hero-title font-display absolute right-4 top-[38%] text-[14vw] font-medium text-white md:right-10 md:text-[13vw]">
          into
        </h1>
        <h1 className="hero-title font-display absolute left-[18%] top-[58%] text-[14vw] font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#2dd4bf] to-[#38bdf8] md:left-[28%] md:text-[13vw]">
          blue
        </h1>

        <p className="absolute left-6 top-[46%] max-w-[240px] text-[15px] leading-snug text-slate-200/90 md:left-10">
          curated snorkeling &amp; diving gear for explorers of the maldives&apos; reefs, built for the deep
        </p>

        <StatBlock
          value="+12k"
          label="adventurers equipped"
          position="right-6 top-[14%] md:right-24"
          dividerRotation="rotate-[20deg]"
          dividerFirst
        />

        <StatBlock
          value="+480"
          label="reef sites mapped"
          position="left-6 bottom-20 md:left-20 md:bottom-24"
          dividerRotation="rotate-[-20deg]"
          dividerFirst={false}
        />

        <StatBlock
          value="+98%"
          label="trip satisfaction"
          position="right-6 bottom-16 md:right-20 md:bottom-20"
          dividerRotation="rotate-[-20deg]"
          dividerFirst
        />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-[#050b14]" />
    </section>
  );
}
