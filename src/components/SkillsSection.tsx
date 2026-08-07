import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Code, Wrench, Cpu, Sparkles } from 'lucide-react';
import { ProfileData } from '../types';

interface SkillsSectionProps {
  profile: ProfileData;
}

export function SkillsSection({ profile }: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Languages', 'Tools', 'AI Tools'];

  const filteredSkills = profile.skills.filter((skill) => {
    let mappedCategory = 'Languages';
    if (skill.category === 'Development') mappedCategory = 'Languages';
    else if (skill.category === 'Productivity' || skill.category === 'Design') mappedCategory = 'Tools';
    else if (skill.category === 'AI Tools') mappedCategory = 'AI Tools';

    const matchesCategory = selectedCategory === 'All' || mappedCategory === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mappedCategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Languages': return <Code className="w-3.5 h-3.5" />;
      case 'Tools': return <Wrench className="w-3.5 h-3.5" />;
      case 'AI Tools': return <Cpu className="w-3.5 h-3.5" />;
      default: return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="py-12 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto space-y-6"
    >
      {/* Category Eyebrow & Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-extrabold uppercase text-rose-600 tracking-wider block">
            STACK & TECH
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 uppercase font-display">
            Skills & Stack<span className="text-rose-600">.</span>
          </h2>
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search skill or tool..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-zinc-950 rounded-full text-xs text-zinc-950 focus:outline-none focus:ring-2 focus:ring-amber-400 font-extrabold shadow-xs"
          />
        </div>
      </div>

      {/* Filter Category Pills */}
      <div className="flex flex-wrap items-center gap-2 select-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              data-cursor={cat}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black transition-all border-2 cursor-pointer shadow-xs ${
                isActive
                  ? 'bg-zinc-950 text-amber-400 border-zinc-950 scale-102'
                  : 'bg-white text-zinc-800 border-zinc-950 hover:bg-amber-100'
              }`}
            >
              {getCategoryIcon(cat)}
              <span>{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Skills Cards Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence>
          {filteredSkills.map((skill) => {
            let catName = 'Languages';
            if (skill.category === 'Productivity' || skill.category === 'Design') catName = 'Tools';
            else if (skill.category === 'AI Tools') catName = 'AI Tools';

            return (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="bg-white p-5 rounded-3xl border-2 border-zinc-950 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between space-y-3 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-2xl ${
                      skill.badgeBg || 'bg-zinc-950'
                    } flex items-center justify-center text-white font-mono font-black text-xs border border-zinc-900 shadow-2xs flex-shrink-0`}
                  >
                    <span>{skill.badgeText || skill.name.substring(0, 2)}</span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-black text-sm text-zinc-950 font-display truncate">
                      {skill.name}
                    </h3>
                    <span className="text-[10px] font-mono font-black text-amber-950 bg-amber-200 px-2.5 py-0.5 rounded-full border border-amber-800 inline-block mt-0.5">
                      {catName}
                    </span>
                  </div>
                </div>

                {skill.description && (
                  <p className="text-xs text-zinc-700 font-medium leading-relaxed pt-2 border-t border-zinc-200">
                    {skill.description}
                  </p>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}
