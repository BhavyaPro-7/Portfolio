import React from 'react';

export function DotMatrix({ rows = 6, cols = 8, className = '' }: { rows?: number; cols?: number; className?: string }) {
  return (
    <div className={`grid gap-2 select-none ${className}`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {Array.from({ length: rows * cols }).map((_, i) => (
        <span key={i} className="w-1 h-1 rounded-full bg-zinc-800/40 inline-block" />
      ))}
    </div>
  );
}

export function LaptopIllustration({ className = '' }: { className?: string }) {
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Yellow backing block */}
      <div className="absolute -bottom-2 -right-2 w-48 h-36 bg-amber-400 rounded-3xl -z-10" />
      
      {/* Laptop frame */}
      <div className="w-56 h-36 bg-white border-2 border-zinc-900 rounded-xl p-2 shadow-sm flex flex-col justify-between">
        {/* Screen camera dot */}
        <div className="w-full flex justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
        </div>
        {/* Screen content */}
        <div className="flex-1 my-1 border border-zinc-200 rounded flex items-center justify-center bg-zinc-50">
          <span className="font-mono text-3xl font-extrabold text-zinc-900">&lt;/&gt;</span>
        </div>
        {/* Screen status bar */}
        <div className="w-full h-1 bg-zinc-200 rounded-full" />
      </div>
      
      {/* Laptop base */}
      <div className="w-64 h-3 bg-zinc-100 border-2 border-zinc-900 rounded-b-xl relative flex justify-center items-center">
        <div className="w-12 h-1 bg-zinc-400 rounded-full" />
      </div>

      {/* Floating code doodle badge */}
      <div className="absolute -top-4 -right-4 w-9 h-9 rounded-lg border-2 border-zinc-900 bg-white flex items-center justify-center text-xs font-mono font-bold shadow-sm rotate-6">
        &lt;/&gt;
      </div>
    </div>
  );
}

export function CameraDoodle({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
      <line x1="8" y1="10" x2="8.01" y2="10" />
    </svg>
  );
}

export function LightbulbDoodle({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="4.2" y1="4.2" x2="5.6" y2="5.6" />
      <line x1="19.8" y1="4.2" x2="18.4" y2="5.6" />
    </svg>
  );
}

export function HandArrowDoodle({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="48" height="48" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M 10 10 Q 25 35 35 25 T 42 40" />
      <path d="M 35 40 L 42 40 L 40 33" />
    </svg>
  );
}

export function MailAirplaneDoodle({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
    </svg>
  );
}
