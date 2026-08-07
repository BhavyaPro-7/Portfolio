import React from 'react';
import { ProfileData } from '../types';

interface FooterSectionProps {
  profile: ProfileData;
}

export function FooterSection({ profile }: FooterSectionProps) {
  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Stats', href: '#stats' },
    { label: 'Journey', href: '#journey' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#connect' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-12 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto space-y-8 border-t border-zinc-900/10">
      
      {/* Quote Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-zinc-200/90 shadow-xs max-w-3xl mx-auto space-y-3">
        <h3 className="text-xl sm:text-3xl font-black text-zinc-950 font-display leading-tight tracking-tight">
          "Building software publicly, one line at a time."
        </h3>
        <p className="text-xs sm:text-sm font-mono text-zinc-500">
          Documenting software engineering, AI, and robotics.
        </p>
      </div>

      {/* Bottom Bar Footer */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
        {/* Logo & Name */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-zinc-950" />
          <span className="font-black text-sm text-zinc-950 tracking-tight font-display">
            {profile.name}
          </span>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap justify-center gap-4 text-xs font-mono font-bold text-zinc-800">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="hover:text-rose-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

    </footer>
  );
}
