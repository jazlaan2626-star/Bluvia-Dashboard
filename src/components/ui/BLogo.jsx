import React, { useState } from 'react';
import { Waves } from 'lucide-react';

export default function BLogo({ size = 'md' }) {
  const [err, setErr] = useState(false);
  const dim = size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-16 h-16' : 'w-11 h-11';
  const iconSize = size === 'sm' ? 18 : size === 'lg' ? 28 : 22;

  return (
    <div className={`${dim} rounded-xl flex items-center justify-center logo-badge shrink-0 overflow-hidden`}>
      {!err ? (
        <img
          src="/logo.svg"
          alt="Bluvia"
          className="w-full h-full object-contain"
          onError={() => setErr(true)}
        />
      ) : (
        <Waves size={iconSize} className="text-white" />
      )}
    </div>
  );
}
