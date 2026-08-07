import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Code, Target, BookOpen, Compass, Sparkles, Terminal } from 'lucide-react';
import { ProfileData } from '../types';

interface AboutSectionProps {
  profile: ProfileData;
}

export function AboutSection({ profile }: AboutSectionProps) {
  const cardHover = {
    hover: { y: -4, transition: { duration: 0.2, ease: 'easeOut' } },
  };

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="py-12 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto space-y-6"
    >
      {/* Category & Title */}
      <div>
        <span className="text-xs font-mono font-extrabold uppercase text-rose-600 tracking-wider block">
          ABOUT ME
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 uppercase font-display">
          Who I Am<span className="text-rose-600">.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Content Cards */}
        <div className="lg:col-span-8 space-y-6">
          {/* Who I Am Card */}
          <motion.div
            variants={cardHover}
            whileHover="hover"
            className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-zinc-950 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-600 font-extrabold text-sm shadow-xs">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-xl text-zinc-950 font-display">
                  My Story & Journey
                </h3>
                <span className="text-[10px] font-mono font-bold text-rose-600 uppercase">
                  DOCUMENTING PUBLICLY
                </span>
              </div>
            </div>
            <p className="text-sm sm:text-base text-zinc-800 leading-relaxed font-medium">
              {profile.bio1}
            </p>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-mono">
              📍 Based in <span className="font-bold text-zinc-950">{profile.location}</span>. I believe in learning publicly by building real software instead of just consuming endless tutorials.
            </p>
          </motion.div>

          {/* Grid of Why I Build & Philosophy */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div
              variants={cardHover}
              whileHover="hover"
              className="bg-white p-6 rounded-3xl border-2 border-zinc-950 shadow-[5px_5px_0px_0px_rgba(24,24,27,1)] space-y-3"
            >
              <div className="flex items-center gap-2 text-rose-600 font-black text-sm font-display">
                <Code className="w-4 h-4" />
                <span>Why I Build Projects</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-medium">
                {profile.whyBuildProjects}
              </p>
            </motion.div>

            <motion.div
              variants={cardHover}
              whileHover="hover"
              className="bg-white p-6 rounded-3xl border-2 border-zinc-950 shadow-[5px_5px_0px_0px_rgba(24,24,27,1)] space-y-3"
            >
              <div className="flex items-center gap-2 text-rose-600 font-black text-sm font-display">
                <BookOpen className="w-4 h-4" />
                <span>Learning Philosophy</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-medium">
                {profile.learningPhilosophy}
              </p>
            </motion.div>
          </div>

          {/* Education & Goals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div
              variants={cardHover}
              whileHover="hover"
              className="bg-white p-6 rounded-3xl border-2 border-zinc-950 shadow-[5px_5px_0px_0px_rgba(24,24,27,1)] space-y-3"
            >
              <div className="flex items-center gap-2 text-zinc-950 font-black text-sm font-display">
                <GraduationCap className="w-4 h-4 text-amber-600" />
                <span>Education</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 bg-amber-200 border border-amber-900 rounded-xl text-center">
                  <span className="text-[10px] uppercase font-mono font-bold text-amber-950 block">since</span>
                  <span className="font-mono font-black text-xs text-zinc-950">{profile.educationYear}</span>
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-zinc-950">{profile.educationDegree}</h4>
                  <p className="text-[11px] text-zinc-600 font-medium">{profile.educationSchool}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={cardHover}
              whileHover="hover"
              className="bg-white p-6 rounded-3xl border-2 border-zinc-950 shadow-[5px_5px_0px_0px_rgba(24,24,27,1)] space-y-3"
            >
              <div className="flex items-center gap-2 text-zinc-950 font-black text-sm font-display">
                <Target className="w-4 h-4 text-amber-600" />
                <span>Current Focus</span>
              </div>
              <ul className="text-xs text-zinc-800 space-y-1.5 font-bold list-disc list-inside">
                <li>Master CS Core Concepts & Data Structures</li>
                <li>Build Python & AI Automation Tools</li>
                <li>Document daily learning progress publicly</li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Right Callout Card */}
        <div className="lg:col-span-4">
          <motion.div
            variants={cardHover}
            whileHover="hover"
            className="bg-zinc-950 text-white rounded-3xl p-8 space-y-6 border-2 border-zinc-950 shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-zinc-950 flex items-center justify-center font-black border border-amber-300 shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono font-extrabold text-amber-400 uppercase tracking-widest block">
                CREATOR STATEMENT
              </span>
              <p className="font-display font-black text-lg sm:text-xl leading-snug">
                "Not looking for freelance clients. The website should tell my story and serve as a second brain."
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs font-mono font-bold text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-rose-500" />
                MUMBAI, INDIA
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
