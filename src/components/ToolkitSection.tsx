import React from 'react';
import { SectionFrame } from './SectionFrame';
import { LaptopIllustration } from './Doodles';
import { ArrowRight, Code2, Sparkles, CheckCircle2 } from 'lucide-react';
import { ProfileData } from '../types';

interface ToolkitSectionProps {
  profile: ProfileData;
}

export function ToolkitSection({ profile }: ToolkitSectionProps) {
  const categories = [
    {
      title: 'Code',
      items: ['HTML5', 'CSS3', 'JavaScript', 'Terminal', 'VS Code'],
      iconBg: 'bg-orange-100 text-orange-700',
    },
    {
      title: 'Productivity',
      items: ['Notion', 'Google Sheets', 'Task Boards'],
      iconBg: 'bg-emerald-100 text-emerald-700',
    },
    {
      title: 'AI & Automation',
      items: ['ChatGPT', 'Claude AI', 'Prompt Systems'],
      iconBg: 'bg-indigo-100 text-indigo-700',
    },
    {
      title: 'Design',
      items: ['Figma', 'Canva', 'Pen & Paper'],
      iconBg: 'bg-pink-100 text-pink-700',
    },
  ];

  return (
    <SectionFrame id="toolkit" sectionNumber="06" brandName={profile.name} yearTag={profile.yearTag}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-4">
        
        {/* Left Column: Categorized Toolkit Stacks */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 uppercase">
                My Toolkit
              </h2>
              <div className="w-8 h-8 rounded-full border border-zinc-900 bg-white flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-zinc-900" />
              </div>
            </div>
            <p className="text-zinc-600 text-sm sm:text-base mt-1">
              Tools and technologies I use to build and grow.
            </p>
          </div>

          {/* Stacks Grid */}
          <div className="space-y-4">
            {categories.map((cat) => (
              <div key={cat.title} className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-2xs space-y-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500 block">
                  {cat.title}
                </span>

                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <div
                      key={item}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-100 border border-zinc-200 font-bold text-xs text-zinc-800"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Laptop Wireframe Graphic */}
        <div className="lg:col-span-5 flex justify-center items-center py-6">
          <LaptopIllustration />
        </div>

      </div>
    </SectionFrame>
  );
}
