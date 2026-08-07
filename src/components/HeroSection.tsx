import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Sparkles, Terminal, Code2, Cpu } from 'lucide-react';

interface HeroSectionProps {
  brandName: string;
  yearTag: string;
  onExploreClick: () => void;
}

export function HeroSection({ onExploreClick }: HeroSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1.0] },
    },
  };

  return (
    <section id="home" className="py-10 sm:py-16 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
      >
        <div className="lg:col-span-8 space-y-6">
          {/* Top Badges Row */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 bg-white text-zinc-900 rounded-full border border-zinc-900 font-extrabold text-xs shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              17-Year-Old Builder
            </span>
            <span className="px-3.5 py-1 bg-white text-zinc-900 rounded-full border border-zinc-900 font-extrabold text-xs shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]">
              🇮🇳 India
            </span>
            <span className="px-3.5 py-1 bg-rose-600 text-white rounded-full border border-rose-950 font-extrabold text-xs shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              CS & AI Enthusiast
            </span>
          </motion.div>

          {/* Huge Headline Typography with Red Period */}
          <motion.div variants={itemVariants} className="pt-2">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-zinc-950 uppercase leading-[0.88] select-none font-display">
              Bhavya<br />
              Kothari<span className="text-rose-600 inline-block ml-1 animate-bounce">.</span>
            </h1>
          </motion.div>

          {/* Subtitle / Bio Description */}
          <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl font-medium text-zinc-900 max-w-2xl leading-relaxed">
            A 17-year-old Computer Science student & builder documenting my journey into Software Engineering, AI, and Robotics. Sharing code, case studies, and building publicly on{' '}
            <a
              href="https://instagram.com/devwithbhavya"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Instagram"
              className="underline decoration-rose-500 decoration-2 font-black hover:text-rose-700 transition-colors"
            >
              @devwithbhavya
            </a>{' '}
            &{' '}
            <a
              href="https://github.com/BhavyaPro-7"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="GitHub"
              className="underline decoration-2 font-black hover:text-zinc-700 transition-colors"
            >
              GitHub
            </a>.
          </motion.p>

          {/* Call-to-Action Action Buttons */}
          <motion.div variants={itemVariants} className="pt-3 flex flex-wrap items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onExploreClick}
              data-cursor="Explore"
              className="group px-6 py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white font-extrabold text-xs sm:text-sm rounded-full border-2 border-zinc-950 flex items-center gap-3 cursor-pointer shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all"
            >
              <span>View My Work</span>
              <div className="w-6 h-6 rounded-full bg-white text-zinc-900 flex items-center justify-center transition-transform group-hover:translate-x-1">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="#about"
              data-cursor="About"
              className="px-6 py-3.5 bg-white hover:bg-amber-100 text-zinc-950 font-extrabold text-xs sm:text-sm rounded-full border-2 border-zinc-950 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] flex items-center gap-2 transition-all"
            >
              <span>Read My Story</span>
              <BookOpen className="w-4 h-4 text-zinc-900" />
            </motion.a>
          </motion.div>
        </div>

        {/* Right Interactive Developer Terminal Card */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-4 bg-zinc-950 text-amber-400 p-6 rounded-3xl border-2 border-zinc-950 shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] font-mono text-xs space-y-4 relative overflow-hidden"
        >
          {/* Terminal Window Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <span className="text-[10px] text-zinc-400 font-bold flex items-center gap-1">
              <Terminal className="w-3 h-3 text-amber-400" />
              bhavya@dev: ~
            </span>
          </div>

          {/* Terminal Content Code Snippet */}
          <div className="space-y-2 text-zinc-200">
            <p className="text-zinc-400">// System Profile Initialization</p>
            <p>
              <span className="text-rose-400">const</span> developer = &#123;
            </p>
            <p className="pl-4">
              name: <span className="text-amber-300">'Bhavya Kothari'</span>,
            </p>
            <p className="pl-4">
              age: <span className="text-emerald-400">17</span>,
            </p>
            <p className="pl-4">
              role: <span className="text-amber-300">'CS Student & Full-Stack Builder'</span>,
            </p>
            <p className="pl-4">
              languages: [<span className="text-emerald-300">'Python'</span>, <span className="text-emerald-300">'TypeScript'</span>, <span className="text-emerald-300">'C++'</span>],
            </p>
            <p className="pl-4">
              status: <span className="text-rose-400">'Building Next-Gen Software'</span>
            </p>
            <p>&#125;;</p>
          </div>

          {/* Dynamic Floating Badges */}
          <div className="pt-2 border-t border-zinc-800 flex flex-wrap gap-2 text-[11px]">
            <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-700 rounded-lg text-amber-300 flex items-center gap-1">
              <Code2 className="w-3 h-3 text-amber-400" /> React 19 + Vite
            </span>
            <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-700 rounded-lg text-emerald-300 flex items-center gap-1">
              <Cpu className="w-3 h-3 text-emerald-400" /> AI & Automation
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
