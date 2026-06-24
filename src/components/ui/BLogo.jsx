import React, { useState } from 'react';
import { Waves } from 'lucide-react';

/**
 * BLogo — renders the Bluvia logo image from /public/logo.png
 * The image has a black background; mix-blend-mode:screen makes black
 * transparent so only the white logo shows over any dark surface.
 * Falls back to Waves icon if the file is missing.
 */
export default function BLogo({ size = 'md' }) {
  const [err, setErr] = useState(false);

  const dims = {
    sm:  { wrap: 'w-9 h-9',   icon: 18, rounded: 'rounded-xl' },
    md:  { wrap: 'w-11 h-11', icon: 22, rounded: 'rounded-xl' },
    lg:  { wrap: 'w-16 h-16', icon: 28, rounded: 'rounded-2xl' },
  }[size] || {};

  if (err) {
    return (
      <div className={`${dims.wrap} ${dims.rounded} flex items-center justify-center logo-badge shrink-0`}>
        <Waves size={dims.icon} className="text-white" />
      </div>
    );
  }

  return (
    <div className={`${dims.wrap} ${dims.rounded} shrink-0 overflow-hidden flex items-center justify-center bg-black`}>
      <img
        src="/logo.png"
        alt="Bluvia"
        className="w-full h-full object-contain"
        style={{ mixBlendMode: 'screen' }}
        onError={() => setErr(true)}
      />
    </div>
  );
}
