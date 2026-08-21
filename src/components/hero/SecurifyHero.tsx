import React from 'react';

const HERO_VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4';

function SecurifyLogo() {
  return (
    <svg viewBox="0 0 256 256" className="h-5 w-5" fill="#ffffff" aria-hidden="true">
      <path d="M 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 128 L 64 128 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z M 128 64 L 128 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 Z M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 128 0 L 192 0 Z" />
    </svg>
  );
}

function SecurifyNavbar() {
  const links = ['platform', 'solutions', 'company', 'support'];

  return (
    <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between gap-4 px-6 pt-6 md:px-10">
      <div className="flex items-center gap-2 rounded-full bg-neutral-900/90 py-3 pl-4 pr-6 backdrop-blur">
        <SecurifyLogo />
        <span className="text-sm font-normal tracking-tight text-white">securify</span>
      </div>

      <div className="hidden items-center gap-1 rounded-full bg-neutral-900/90 px-3 py-2 backdrop-blur md:flex">
        {links.map((link) => (
          <a
            key={link}
            href={`#${link}`}
            className="rounded-full px-5 py-2 text-sm text-neutral-300 transition-colors hover:text-white"
          >
            {link}
          </a>
        ))}
      </div>

      <button
        type="button"
        className="rounded-full bg-white px-6 py-3 text-sm font-normal text-black transition-colors hover:bg-neutral-200"
      >
        get started
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
      className={`hidden h-px w-24 bg-white/40 md:block ${dividerRotation}`}
      aria-hidden="true"
    />
  );

  return (
    <div className={`absolute ${position}`}>
      <div className={`flex items-center gap-3 ${dividerFirst ? 'justify-end' : ''}`}>
        {dividerFirst && divider}
        <span className="text-4xl font-medium tracking-tight text-white md:text-5xl">{value}</span>
        {!dividerFirst && divider}
      </div>
      <p
        className={`mt-1 text-xs text-white/70 md:text-sm ${dividerFirst ? 'text-right' : ''}`}
      >
        {label}
      </p>
    </div>
  );
}

export default function SecurifyHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black securify-hero">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        src={HERO_VIDEO_SRC}
      />

      <SecurifyNavbar />

      <div className="relative h-full w-full">
        <h1 className="hero-title absolute left-4 top-[18%] text-[14vw] font-medium text-white md:left-10 md:text-[13vw]">
          protect
        </h1>
        <h1 className="hero-title absolute right-4 top-[38%] text-[14vw] font-medium text-white md:right-10 md:text-[13vw]">
          your
        </h1>
        <h1 className="hero-title absolute left-[18%] top-[58%] text-[14vw] font-medium text-white md:left-[28%] md:text-[13vw]">
          data
        </h1>

        <p className="absolute left-6 top-[46%] max-w-[240px] text-[15px] leading-snug text-white/90 md:left-10">
          we can guarding your data with utmost care, empowering you with privacy everywhere
        </p>

        <StatBlock
          value="+65k"
          label="startups use"
          position="right-6 top-[14%] md:right-24"
          dividerRotation="rotate-[20deg]"
          dividerFirst
        />

        <StatBlock
          value="+1.5b"
          label="gb data was protected"
          position="left-6 bottom-20 md:left-20 md:bottom-24"
          dividerRotation="rotate-[-20deg]"
          dividerFirst={false}
        />

        <StatBlock
          value="+300k"
          label="downloads"
          position="right-6 bottom-16 md:right-20 md:bottom-20"
          dividerRotation="rotate-[-20deg]"
          dividerFirst
        />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-black" />
    </section>
  );
}
