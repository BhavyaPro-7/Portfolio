import React from 'react';
import { X, ExternalLink, Github, CheckCircle2, Sparkles, BookOpen, ShieldAlert, Rocket, Layers } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#f4f3ee] border-2 border-zinc-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white rounded-full border border-zinc-900 text-zinc-900 hover:bg-amber-400 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 pr-8">
          {project.image && (
            <div className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden border-2 border-zinc-900 mb-3 relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-amber-400 text-zinc-900 px-3 py-1 rounded-full border border-zinc-900 font-mono text-xs font-bold inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{project.category}</span>
            </span>
            <span className="bg-zinc-900 text-white px-3 py-1 rounded-full text-xs font-mono font-bold">
              ● Status: {project.status}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight pt-1">
            {project.title}
          </h2>

          <div className="bg-white p-3 rounded-2xl border border-zinc-300 font-medium text-xs sm:text-sm text-zinc-800">
            <span className="font-mono font-bold text-amber-700 uppercase">Purpose:</span> {project.purpose}
          </div>

          <p className="text-sm text-zinc-700 leading-relaxed font-medium">
            {project.fullDesc}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="space-y-2">
          <h3 className="font-extrabold text-xs font-mono uppercase text-zinc-600 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            <span>Technologies Used</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-zinc-900 text-white rounded-lg text-xs font-mono font-bold"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Key Features & Highlights */}
        <div className="space-y-2">
          <h3 className="font-extrabold text-xs font-mono uppercase text-zinc-600">
            Key Features
          </h3>

          <div className="space-y-1.5">
            {project.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-zinc-200 text-xs text-zinc-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Deep Dive: What I Learned */}
        <div className="bg-amber-100/70 p-4 rounded-2xl border-2 border-zinc-900 space-y-2">
          <div className="flex items-center gap-2 text-zinc-900 font-extrabold text-sm">
            <BookOpen className="w-4 h-4 text-amber-700" />
            <span>What I Learned</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed">
            {project.whatILearned}
          </p>
        </div>

        {/* Deep Dive: Challenges */}
        <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200 space-y-2">
          <div className="flex items-center gap-2 text-rose-900 font-extrabold text-sm">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>Challenges Overcome</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed">
            {project.challenges}
          </p>
        </div>

        {/* Deep Dive: Future Improvements */}
        <div className="bg-sky-50 p-4 rounded-2xl border border-sky-200 space-y-2">
          <div className="flex items-center gap-2 text-sky-900 font-extrabold text-sm">
            <Rocket className="w-4 h-4 text-sky-600" />
            <span>Future Improvements</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed">
            {project.futureImprovements}
          </p>
        </div>

        {/* Action Links */}
        <div className="pt-2 flex flex-wrap items-center gap-3 border-t border-zinc-300">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-extrabold text-xs rounded-full border border-zinc-900 text-center shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Code Repository</span>
            </a>
          )}

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 bg-amber-400 hover:bg-amber-500 text-zinc-900 font-extrabold text-xs rounded-full border border-zinc-900 text-center shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          )}

          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-white hover:bg-zinc-100 text-zinc-900 font-bold text-xs rounded-full border border-zinc-300 cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
