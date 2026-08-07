import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Compass, Milestone, CheckCircle2 } from 'lucide-react';
import { ProfileData } from '../types';

interface JourneySectionProps {
  profile: ProfileData;
  onViewProjects: () => void;
}

export function JourneySection({ profile, onViewProjects }: JourneySectionProps) {
  return (
    <motion.section
      id="journey"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="py-12 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto space-y-6"
    >
      {/* Eyebrow & Title */}
      <div>
        <span className="text-xs font-mono font-extrabold uppercase text-rose-600 tracking-wider block flex items-center gap-1">
          <Milestone className="w-3.5 h-3.5 text-rose-600" />
          DEVELOPER MILESTONES
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 uppercase font-display">
          My Journey<span className="text-rose-600">.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Journey Timeline Cards */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-1.5 before:bg-zinc-950 before:rounded-full">
            {profile.journey.map((item, idx) => (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ x: 4 }}
                className="relative group cursor-pointer"
              >
                {/* Timeline Node Dot */}
                <div className="absolute -left-[27px] sm:-left-[31px] top-4 w-5 h-5 rounded-full border-2 border-zinc-950 bg-amber-400 group-hover:scale-130 group-hover:bg-rose-500 transition-all shadow-xs" />

                <div className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-zinc-950 shadow-[5px_5px_0px_0px_rgba(24,24,27,1)] group-hover:shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] transition-all space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-extrabold text-xs text-amber-950 bg-amber-200 px-3 py-1 rounded-full border border-amber-900 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                      {item.year}
                    </span>
                  </div>
                  <h3 className="font-black text-lg sm:text-xl text-zinc-950 font-display group-hover:text-rose-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-700 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right CTA Card */}
        <div className="lg:col-span-4">
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-zinc-950 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-200 border border-amber-900 flex items-center justify-center text-amber-950 shadow-xs">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-black text-2xl text-zinc-950 font-display">
              Building in Public
            </h3>
            <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-medium">
              Every milestone, software case study, and codebase is documented publicly across GitHub and social channels.
            </p>
            <button
              onClick={onViewProjects}
              data-cursor="Projects"
              className="w-full py-3.5 px-5 bg-zinc-950 hover:bg-zinc-800 text-white font-extrabold text-xs sm:text-sm rounded-full border-2 border-zinc-950 flex items-center justify-center gap-2 cursor-pointer transition-all shadow-[3px_3px_0px_0px_rgba(24,24,27,1)]"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
