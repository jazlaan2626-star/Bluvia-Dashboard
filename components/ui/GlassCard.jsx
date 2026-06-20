import React from 'react';

export default function GlassCard({ children, className = '', id }) {
  return (
    <div id={id} className={`glass-card p-5 md:p-6 ${className}`}>
      {children}
    </div>
  );
}
