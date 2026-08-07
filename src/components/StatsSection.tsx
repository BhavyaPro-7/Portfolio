import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, Code, Cpu, Activity, Zap } from 'lucide-react';

export function StatsSection() {
  const baseDate = new Date(2026, 7, 7); // August 7, 2026
  const today = new Date();
  
  const baseMidnight = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate()).getTime();
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  
  const dayOffset = Math.round((todayMidnight - baseMidnight) / (1000 * 60 * 60 * 24));
  const diffDays = 159 + dayOffset;

  // Animated count-up effect
  const [displayDay, setDisplayDay] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200; // ms
    const increment = diffDays / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= diffDays) {
        setDisplayDay(diffDays);
        clearInterval(timer);
      } else {
        setDisplayDay(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [diffDays]);

  return (
    <motion.section
      id="stats"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="py-12 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto space-y-6"
    >
      {/* Category & Title */}
      <div>
        <span className="text-xs font-mono font-extrabold uppercase text-rose-600 tracking-wider block flex items-center gap-1">
          <Activity className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
          SYSTEM CONSOLE
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 uppercase font-display">
          System Stats<span className="text-rose-600">.</span>
        </h2>
      </div>

      {/* Two Column Console Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Card: status.log */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="lg:col-span-5 bg-white rounded-3xl border-2 border-zinc-950 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] overflow-hidden flex flex-col justify-between"
        >
          {/* Card Header */}
          <div className="bg-amber-200 px-5 py-3 border-b-2 border-zinc-950 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 border border-zinc-950" />
              <span className="w-3 h-3 rounded-full bg-amber-500 border border-zinc-950" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 border border-zinc-950" />
              <span className="font-mono text-xs font-black text-zinc-950 ml-1">status.log</span>
            </div>
            <span className="font-mono text-[10px] font-extrabold text-amber-900 bg-amber-100 border border-amber-400 px-2 py-0.5 rounded-full">
              LIVE SYSTEM
            </span>
          </div>

          {/* Card Content */}
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-200 pb-4">
              <span className="font-mono text-xs font-extrabold text-zinc-500 uppercase tracking-wider">
                STATUS:
              </span>
              <div className="bg-emerald-100 border border-emerald-400 px-4 py-1 rounded-full flex items-center gap-2 shadow-xs">
                <span className="text-xs font-mono font-black text-emerald-900">Active & Building</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              </div>
            </div>

            {/* Days Programming Row */}
            <div className="space-y-1">
              <span className="font-mono text-xs font-extrabold text-zinc-500 uppercase tracking-wider block">
                DAYS CODING:
              </span>
              <div className="text-4xl sm:text-6xl font-black font-display text-rose-600 tracking-tight leading-none flex items-baseline gap-2">
                <span>Day {displayDay}</span>
                <Zap className="w-6 h-6 text-amber-500 fill-amber-400 animate-bounce" />
              </div>
              <p className="text-xs font-mono font-bold text-zinc-600 pt-1">
                Consecutive Days Publicly Building Software
              </p>
            </div>
          </div>

          <div className="p-4 bg-zinc-950 text-amber-400 font-mono text-[11px] font-bold text-center border-t-2 border-zinc-950 flex items-center justify-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-rose-500" />
            <span>Log active • System operational • 100% Uptime</span>
          </div>
        </motion.div>

        {/* Right Card: tech_stack.cfg */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="lg:col-span-7 bg-white rounded-3xl border-2 border-zinc-950 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] overflow-hidden flex flex-col justify-between"
        >
          {/* Card Header */}
          <div className="bg-amber-200 px-5 py-3 border-b-2 border-zinc-950 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 border border-zinc-950" />
              <span className="w-3 h-3 rounded-full bg-amber-500 border border-zinc-950" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 border border-zinc-950" />
              <span className="font-mono text-xs font-black text-zinc-950 ml-1">tech_stack.cfg</span>
            </div>
            <span className="font-mono text-[10px] font-extrabold text-amber-900 bg-amber-100 border border-amber-400 px-2 py-0.5 rounded-full">
              AUTO-CONFIGURED
            </span>
          </div>

          {/* Card Content */}
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs font-extrabold text-rose-600 uppercase block">
                // PRIMARY LANGUAGES
              </span>
              <div className="flex flex-wrap gap-2">
                {['Python', 'JavaScript (ES6+)', 'TypeScript', 'HTML5 / CSS3', 'SQL'].map((lang) => (
                  <span
                    key={lang}
                    className="px-4 py-2 bg-amber-50 border border-amber-300 rounded-2xl font-mono text-xs font-extrabold text-zinc-950 shadow-xs hover:bg-amber-100 transition-colors"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs font-extrabold text-zinc-700 uppercase block">
                // FRAMEWORKS & TOOLS
              </span>
              <div className="flex flex-wrap gap-2">
                {['React 19', 'Vite', 'Firebase / Firestore', 'Tailwind CSS', 'Git & GitHub', 'VS Code', 'Google AI Studio'].map((tool) => (
                  <span
                    key={tool}
                    className="px-4 py-2 bg-zinc-50 border border-zinc-300 rounded-2xl font-mono text-xs font-extrabold text-zinc-900 shadow-xs hover:bg-zinc-100 transition-colors"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-zinc-950 text-amber-400 font-mono text-[11px] font-bold text-center border-t-2 border-zinc-950 flex items-center justify-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>Stack verified & active</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
