import React from 'react';
import { SectionFrame } from './SectionFrame';
import { CameraDoodle } from './Doodles';
import { ArrowRight, Lightbulb, Target, TrendingUp, Heart } from 'lucide-react';
import { ProfileData } from '../types';

interface DrivesMeSectionProps {
  profile: ProfileData;
}

export function DrivesMeSection({ profile }: DrivesMeSectionProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'lightbulb': return <Lightbulb className="w-6 h-6 text-amber-600" />;
      case 'target': return <Target className="w-6 h-6 text-amber-600" />;
      case 'trending-up': return <TrendingUp className="w-6 h-6 text-amber-600" />;
      case 'heart': return <Heart className="w-6 h-6 text-amber-600 fill-amber-500" />;
      default: return <Lightbulb className="w-6 h-6 text-amber-600" />;
    }
  };

  return (
    <SectionFrame id="drives" sectionNumber="07" brandName={profile.name} yearTag={profile.yearTag}>
      <div className="space-y-6 py-4">
        
        {/* Header */}
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 uppercase">
              What Drives Me
            </h2>
            <div className="w-8 h-8 rounded-full border border-zinc-900 bg-white flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-zinc-900" />
            </div>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {profile.coreValues.map((val) => (
            <div
              key={val.id}
              className="bg-white p-5 rounded-2xl border border-zinc-200 hover:border-zinc-900 transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-100/80 border border-amber-300 flex items-center justify-center">
                {getIcon(val.icon)}
              </div>

              <div>
                <h3 className="font-extrabold text-base text-zinc-900">
                  {val.title}
                </h3>
                <p className="text-xs text-zinc-600 mt-1 leading-snug">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quote Banner Box */}
        <div className="bg-amber-100/70 border-2 border-zinc-900 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 shadow-xs">
          <div className="p-2 bg-white rounded-xl border border-zinc-900 flex-shrink-0">
            <CameraDoodle className="text-zinc-900" />
          </div>
          <div className="text-center sm:text-left">
            <p className="font-serif italic font-bold text-sm sm:text-base text-zinc-900">
              "The best way to learn is by building."
            </p>
            <p className="text-xs font-mono font-medium text-zinc-700 mt-0.5">
              – {profile.quoteBanner}
            </p>
          </div>
        </div>

      </div>
    </SectionFrame>
  );
}
