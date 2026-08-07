import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Github, ExternalLink, ChevronLeft, ChevronRight, LayoutGrid, SlidersHorizontal, Play, Pause } from 'lucide-react';
import { ProfileData, ProjectItem } from '../types';

interface ProjectsSectionProps {
  profile: ProfileData;
  onSelectProject: (project: ProjectItem) => void;
}

export function ProjectsSection({ profile, onSelectProject }: ProjectsSectionProps) {
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const projects = profile.projects || [];
  const currentProject = projects[currentIndex] || projects[0];

  // Auto-play interval for Carousel
  useEffect(() => {
    if (!isAutoPlaying || viewMode !== 'carousel' || projects.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isAutoPlaying, viewMode, projects.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const getEyebrowCategory = (project: ProjectItem) => {
    if (!project) return 'PROJECT';
    if (project.title.toLowerCase().includes('file organizer') || project.title.toLowerCase().includes('scaffolder')) {
      return 'PYTHON AUTOMATION SYSTEM';
    }
    if (project.title.toLowerCase().includes('password manager')) {
      return 'PYTHON SECURITY CASE STUDY';
    }
    if (project.title.toLowerCase().includes('netflix')) {
      return 'FRONTEND DESIGN CLONE';
    }
    if (project.title.toLowerCase().includes('portfolio') || project.title.toLowerCase().includes('developer website')) {
      return 'PERSONAL DEVELOPER WEBSITE CASE STUDY';
    }
    return `${project.category?.toUpperCase() || 'DEVELOPMENT'} PROJECT`;
  };

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="py-12 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto space-y-8"
    >
      {/* Header Row & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-950/10 pb-4">
        <div>
          <span className="text-xs font-mono font-extrabold uppercase text-rose-600 tracking-wider block">
            PORTFOLIO SHOWCASE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 uppercase font-display">
            My Projects<span className="text-rose-600">.</span>
          </h2>
        </div>

        {/* View Switcher Tabs: Carousel vs Grid */}
        <div className="flex items-center gap-2 bg-amber-200/80 p-1.5 rounded-2xl border border-zinc-900/20 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('carousel')}
            data-cursor="Carousel"
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'carousel'
                ? 'bg-zinc-950 text-white shadow-sm'
                : 'text-zinc-800 hover:text-zinc-950 hover:bg-amber-300/60'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Interactive Carousel</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            data-cursor="Grid"
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-zinc-950 text-white shadow-sm'
                : 'text-zinc-800 hover:text-zinc-950 hover:bg-amber-300/60'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Grid View</span>
          </button>
        </div>
      </div>

      {/* CAROUSEL VIEW MODE */}
      {viewMode === 'carousel' && currentProject && (
        <div className="space-y-6">
          {/* Main Carousel Feature Slide */}
          <div className="relative bg-white rounded-3xl border-2 border-zinc-950 shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.id || currentIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]"
              >
                {/* Left Side: Mockup Image / Header Graphic */}
                <div className="lg:col-span-7 bg-[#fde68a] border-b lg:border-b-0 lg:border-r border-zinc-950/20 relative min-h-[260px] lg:min-h-[420px] flex flex-col justify-between p-6 overflow-hidden">
                  {/* Top Window Dots */}
                  <div className="flex items-center gap-1.5 z-10">
                    <span className="w-3 h-3 rounded-full bg-rose-500 border border-zinc-950" />
                    <span className="w-3 h-3 rounded-full bg-amber-500 border border-zinc-950" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500 border border-zinc-950" />
                    <span className="ml-2 font-mono text-[10px] font-bold text-amber-900/70 uppercase tracking-widest">
                      Slide {currentIndex + 1} of {projects.length}
                    </span>
                  </div>

                  {currentProject.image ? (
                    <div className="absolute inset-0 pt-12">
                      <img
                        src={currentProject.image}
                        alt={currentProject.title}
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent flex items-end p-6">
                        <span className="text-white font-black text-2xl font-display tracking-tight drop-shadow-md">
                          {currentProject.title}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="my-auto text-center px-4 z-10 py-8">
                        <span className="inline-block px-3 py-1 bg-amber-300 text-amber-950 font-mono text-xs font-black uppercase rounded-full border border-amber-900 mb-3">
                          {getEyebrowCategory(currentProject)}
                        </span>
                        <h3 className="font-black text-3xl sm:text-4xl text-amber-950 uppercase font-display tracking-tight leading-tight">
                          {currentProject.title}
                        </h3>
                      </div>
                      <div className="absolute inset-0 bg-[radial-gradient(#d97706_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-25 pointer-events-none" />
                    </>
                  )}
                </div>

                {/* Right Side: Detailed Details & Action Panel */}
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-extrabold text-rose-600 uppercase tracking-wider">
                        {getEyebrowCategory(currentProject)}
                      </span>
                      <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 text-[11px] font-mono font-extrabold rounded-full border border-amber-300">
                        Featured
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 font-display leading-tight">
                      {currentProject.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                      {currentProject.fullDesc || currentProject.shortDesc}
                    </p>

                    {/* Tech Pills */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider block">
                        TECHS & ARCHITECTURE
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-amber-50 border border-amber-300 rounded-full text-xs font-mono font-bold text-zinc-900"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions & Carousel Nav */}
                  <div className="pt-4 border-t border-zinc-100 space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <button
                        onClick={() => onSelectProject(currentProject)}
                        data-cursor="View"
                        className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full font-mono text-xs font-black border border-rose-950 flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                      >
                        <span>Explore Full Case Study</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-2">
                        {currentProject.github && (
                          <a
                            href={currentProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="GitHub"
                            className="p-2.5 text-zinc-700 hover:text-zinc-950 hover:bg-amber-100 rounded-full border border-zinc-300 transition-colors"
                            title="GitHub Repo"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {currentProject.link && (
                          <a
                            href={currentProject.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="Live"
                            className="p-2.5 text-zinc-700 hover:text-zinc-950 hover:bg-amber-100 rounded-full border border-zinc-300 transition-colors"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Floating Carousel Navigation Bar */}
            <div className="bg-zinc-950 text-white p-4 px-6 flex items-center justify-between border-t border-zinc-800">
              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  data-cursor="Prev"
                  className="p-2 bg-zinc-800 hover:bg-rose-600 text-white rounded-full transition-colors cursor-pointer border border-zinc-700"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  data-cursor="Next"
                  className="p-2 bg-zinc-800 hover:bg-rose-600 text-white rounded-full transition-colors cursor-pointer border border-zinc-700"
                  aria-label="Next project"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Auto Play Toggle */}
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className={`px-3 py-1.5 rounded-full font-mono text-[11px] font-bold flex items-center gap-1.5 border transition-colors cursor-pointer ${
                    isAutoPlaying
                      ? 'bg-amber-400 text-zinc-950 border-amber-300'
                      : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                  }`}
                >
                  {isAutoPlaying ? (
                    <>
                      <Pause className="w-3 h-3 fill-current" />
                      <span>Autoplay ON</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 fill-current" />
                      <span>Autoplay OFF</span>
                    </>
                  )}
                </button>
              </div>

              {/* Slide Dots Indicator */}
              <div className="flex items-center gap-1.5">
                {projects.map((p, idx) => (
                  <button
                    key={p.id || idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      idx === currentIndex ? 'w-8 bg-amber-400' : 'w-2.5 bg-zinc-700 hover:bg-zinc-500'
                    }`}
                    aria-label={`Jump to project ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Project Thumbnails Track */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {projects.map((proj, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={proj.id || idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-24 ${
                    isActive
                      ? 'bg-zinc-950 text-white border-zinc-950 shadow-md scale-102'
                      : 'bg-white text-zinc-900 border-zinc-300 hover:border-amber-500 hover:bg-amber-50'
                  }`}
                >
                  <span className={`text-[10px] font-mono font-bold uppercase block truncate ${isActive ? 'text-amber-400' : 'text-rose-600'}`}>
                    {proj.category || 'PROJECT'}
                  </span>
                  <span className="font-extrabold text-xs line-clamp-2 leading-snug">
                    {proj.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* GRID VIEW MODE */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const categoryTag = getEyebrowCategory(project);

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
                className="bg-white rounded-3xl border-2 border-zinc-950 shadow-[5px_5px_0px_0px_rgba(24,24,27,1)] hover:shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] hover:-translate-y-1 transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Top Mockup Header Bar */}
                  <div className="bg-[#fde68a] border-b border-zinc-950/20 flex flex-col justify-between h-48 relative overflow-hidden group">
                    <div className="flex items-center gap-1.5 z-10 p-4">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 border border-zinc-950" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-zinc-950" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-zinc-950" />
                    </div>

                    {project.image ? (
                      <div className="absolute inset-0 pt-8">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent flex items-end p-4">
                          <span className="text-white font-black text-lg font-display tracking-tight drop-shadow-md">
                            {project.title}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="my-auto text-center px-2 z-10">
                          <h4 className="font-black text-xl sm:text-2xl text-amber-900 uppercase font-display tracking-tight leading-none">
                            {project.title}
                          </h4>
                          <span className="text-[10px] font-mono font-extrabold text-amber-800 uppercase tracking-widest mt-1 block">
                            {categoryTag}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
                      </>
                    )}
                  </div>

                  {/* Card Main Info Body */}
                  <div className="p-6 space-y-4">
                    <span className="text-[10px] font-mono font-extrabold text-rose-600 uppercase tracking-wide block">
                      {categoryTag}
                    </span>

                    <h3 className="font-black text-xl text-zinc-950 font-display leading-snug group-hover:text-rose-600 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xs text-zinc-600 leading-relaxed line-clamp-3">
                      {project.fullDesc || project.shortDesc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-amber-50 border border-amber-300 rounded-full text-[11px] font-mono font-bold text-zinc-900"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Read Case Study Action */}
                <div className="p-6 pt-2 border-t border-zinc-100 flex items-center justify-between">
                  <button
                    onClick={() => onSelectProject(project)}
                    data-cursor="Read"
                    className="font-mono text-xs font-black text-zinc-950 hover:text-rose-600 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Read Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 rounded-full transition-colors"
                        title="GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 rounded-full transition-colors"
                        title="Live Link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.section>
  );
}
