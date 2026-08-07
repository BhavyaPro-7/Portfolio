import React from 'react';

interface SectionFrameProps {
  id: string;
  sectionNumber: string;
  brandName?: string;
  yearTag?: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionFrame({
  id,
  sectionNumber,
  brandName = 'RANDY',
  yearTag = '2025',
  children,
  className = '',
}: SectionFrameProps) {
  return (
    <section
      id={id}
      className={`relative min-h-[85vh] py-12 px-4 sm:px-8 md:px-12 lg:px-16 border-b border-zinc-200/80 bg-[#f4f3ee] text-zinc-900 scroll-mt-20 overflow-hidden flex flex-col justify-between ${className}`}
    >
      {/* Top Section Indicator Bar */}
      <div className="flex items-center justify-between mb-8 select-none">
        {/* Left Section Badge */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">
            {sectionNumber}
          </span>
          {/* Dual tone half-yellow half-black circle badge */}
          <div className="w-6 h-6 rounded-full border border-zinc-900 bg-amber-400 relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-zinc-900" />
          </div>
        </div>

        {/* Right Watermark Rotated Label */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono font-semibold text-zinc-600 tracking-wider uppercase">
          <span>{brandName}</span>
          <span>©</span>
          <span>{yearTag}</span>
        </div>
      </div>

      {/* Main Section Content */}
      <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col justify-center">
        {children}
      </div>

      {/* Side Rotated Watermark for Desktop Viewports */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 origin-right hidden xl:block pointer-events-none select-none">
        <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase font-bold opacity-70">
          {brandName} © {yearTag}
        </span>
      </div>
    </section>
  );
}
