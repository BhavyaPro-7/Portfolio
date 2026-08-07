import React, { useState } from 'react';
import { X, User, Save, RotateCcw, Sparkles, Check } from 'lucide-react';
import { ProfileData } from '../types';
import { defaultProfile } from '../data/defaultProfile';

interface ProfileCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onSaveProfile: (newProfile: ProfileData) => void;
}

export function ProfileCustomizer({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}: ProfileCustomizerProps) {
  const [formData, setFormData] = useState<ProfileData>({ ...profile });
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyPreset = (presetName: 'randy' | 'bhavya') => {
    if (presetName === 'randy') {
      setFormData({ ...defaultProfile });
    } else {
      setFormData({
        ...defaultProfile,
        name: 'Bhavya Kothari',
        title: 'Creative Visual Developer & UI Designer',
        bio1: "I'm Bhavya Kothari, a creative visual developer & UI designer focused on building polished web applications and graphic experiences.",
        bio2: 'Passionate about typography, modern layout design, and full-stack web development.',
        email: 'bhavyakothari72@gmail.com',
        linkedin: 'linkedin.com/in/bhavyakothari',
        github: '@bhavyakothari',
        location: 'Mumbai, India',
        educationSchool: 'Technology & Design Institute',
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#f4f3ee] border-2 border-zinc-900 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white rounded-full border border-zinc-900 text-zinc-900 hover:bg-amber-400 transition-colors cursor-pointer"
          aria-label="Close customizer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 border border-zinc-900 rounded-full font-mono text-xs font-bold text-zinc-900 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Customize Portfolio Information</span>
            </div>
            <h2 className="text-2xl font-black text-zinc-900 tracking-tight">
              Edit Portfolio Profile
            </h2>
            <p className="text-xs text-zinc-600">
              Update your name, bio, social links, and details in real time.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="p-3 bg-white rounded-2xl border border-zinc-200 space-y-2">
            <span className="text-xs font-mono font-bold text-zinc-700 block">
              Quick Profile Presets:
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleApplyPreset('randy')}
                className="flex-1 py-1.5 px-3 rounded-xl border border-zinc-300 bg-zinc-50 hover:bg-amber-100 font-bold text-xs text-zinc-900 cursor-pointer"
              >
                Randy Fahmi (Original)
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('bhavya')}
                className="flex-1 py-1.5 px-3 rounded-xl border border-zinc-300 bg-zinc-50 hover:bg-amber-100 font-bold text-xs text-zinc-900 cursor-pointer"
              >
                Bhavya Kothari (User Profile)
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono font-bold text-zinc-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-xl text-xs font-medium text-zinc-900 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-zinc-700 mb-1">
                  Professional Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-xl text-xs font-medium text-zinc-900 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-zinc-700 mb-1">
                Bio Intro
              </label>
              <textarea
                rows={2}
                value={formData.bio1}
                onChange={(e) => handleChange('bio1', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-xl text-xs font-medium text-zinc-900 focus:ring-2 focus:ring-amber-400 focus:outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono font-bold text-zinc-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-xl text-xs font-medium text-zinc-900 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-zinc-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-xl text-xs font-medium text-zinc-900 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono font-bold text-zinc-700 mb-1">
                  LinkedIn
                </label>
                <input
                  type="text"
                  value={formData.linkedin}
                  onChange={(e) => handleChange('linkedin', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-xl text-xs font-medium text-zinc-900 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-zinc-700 mb-1">
                  GitHub / Handle
                </label>
                <input
                  type="text"
                  value={formData.github}
                  onChange={(e) => handleChange('github', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-xl text-xs font-medium text-zinc-900 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-zinc-700 mb-1">
                Footer Motto Quote
              </label>
              <input
                type="text"
                value={formData.superpowerQuote}
                onChange={(e) => handleChange('superpowerQuote', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-xl text-xs font-medium text-zinc-900 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>

            {/* Buttons */}
            <div className="pt-2 flex items-center justify-between gap-3 border-t border-zinc-300">
              <button
                type="button"
                onClick={() => setFormData({ ...defaultProfile })}
                className="px-4 py-2 bg-white text-zinc-700 hover:text-zinc-900 border border-zinc-300 rounded-full font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-zinc-900 font-extrabold text-xs rounded-full border border-zinc-900 shadow-2xs flex items-center gap-2 cursor-pointer"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-800" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
