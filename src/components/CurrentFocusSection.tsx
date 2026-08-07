import React from 'react';
import { SectionFrame } from './SectionFrame';
import { DotMatrix, HandArrowDoodle } from './Doodles';
import { ArrowRight, Brain, Target, PlayCircle, TrendingUp } from 'lucide-react';
import { ProfileData } from '../types';

interface CurrentFocusSectionProps {
  profile: ProfileData;
}

export function CurrentFocusSection({ profile }: CurrentFocusSectionProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'brain': return <Brain className="w-5 h-5 text-amber-700" />;
      case 'layers': return <Target className="w-5 h-5 text-amber-700" />;
      case 'play-circle': return <PlayCircle className="w-5 h-5 text-amber-700" />;
      case 'sparkles': return <TrendingUp className="w-5 h-5 text-amber-700" />;
      default: return <Brain className="w-5 h-5 text-amber-700" />;
    }
  };

  return (
    <SectionFrame id="focus" sectionNumber="08" brandName={profile.name} yearTag={profile.yearTag}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-4">
        
        {/* Left Column: Yellow Block Graphic with Arrow */}
        <div className="lg:col-span-5 relative flex justify-center items-center py-4 order-2 lg:order-1">
          <div className="w-full max-w-xs h-72 sm:h-80 bg-amber-400 rounded-3xl border-2 border-zinc-900 shadow-md p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="flex justify-between items-center">
              <span className="font-mono font-bold text-xs text-zinc-900">NOW FOCUSING</span>
              <div className="w-3 h-3 rounded-full bg-zinc-900 animate-ping" />
            </div>

            <DotMatrix rows={6} cols={6} className="my-auto opacity-70" />

            <div className="bg-white/90 p-3 rounded-xl border border-zinc-900 text-xs font-black text-zinc-900 text-center shadow-2xs">
              Daily Progress
            </div>
          </div>

          {/* Hand Arrow Doodle pointing toward cards */}
          <div className="absolute -top-2 right-2 text-zinc-900 hidden sm:block">
            <HandArrowDoodle />
          </div>
        </div>

        {/* Right Column: Focus Items Stack */}
        <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 uppercase">
                Current Focus
              </h2>
              <div className="w-8 h-8 rounded-full border border-zinc-900 bg-white flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-zinc-900" />
              </div>
            </div>
            <p className="text-zinc-600 text-sm sm:text-base mt-1">
              What I'm working on right now.
            </p>
          </div>

          {/* Cards Stack */}
          <div className="space-y-3">
            {profile.focusItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-2xl border border-zinc-200 hover:border-zinc-900 transition-all shadow-2xs flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center flex-shrink-0">
                  {getIcon(item.icon)}
                </div>

                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-zinc-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-600 mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </SectionFrame>
  );
}
