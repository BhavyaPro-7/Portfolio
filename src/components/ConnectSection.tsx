import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check, ExternalLink, MessageSquare, Send, Sparkles, Mail, Instagram, Youtube, Github, Linkedin } from 'lucide-react';
import { ProfileData } from '../types';

interface ConnectSectionProps {
  profile: ProfileData;
  onOpenContactModal: () => void;
}

export function ConnectSection({ profile, onOpenContactModal }: ConnectSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(profile.email || 'bhavyakothari.dev@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.section
      id="connect"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="py-16 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto flex justify-center"
    >
      {/* Main Feature Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-white rounded-[2.5rem] border-2 border-zinc-950 shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] hover:shadow-[12px_12px_0px_0px_rgba(24,24,27,1)] transition-all duration-300 p-8 sm:p-12 md:p-16 max-w-3xl w-full text-center space-y-8 relative overflow-hidden"
      >
        {/* Top Decorative Header Badge */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-2">
          <span className="px-3.5 py-1 bg-amber-100 text-amber-950 border border-amber-300 rounded-full font-mono text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            OPEN FOR COLLABORATIONS
          </span>
        </motion.div>

        {/* Title & Tagline */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-zinc-950 uppercase font-display leading-tight">
            Let's build together<span className="text-rose-600 inline-block animate-bounce">.</span>
          </h2>
          <p className="text-sm sm:text-base font-medium text-zinc-700 max-w-lg mx-auto leading-relaxed">
            I document my full software engineering journey publicly. Got a question, idea, or feedback? Reach out anytime!
          </p>
        </motion.div>

        {/* Interactive Copyable Email Container */}
        <motion.div variants={itemVariants} className="pt-2 flex justify-center">
          <div className="bg-zinc-950 p-2.5 pl-6 rounded-full flex items-center justify-between gap-3 max-w-md w-full border-2 border-zinc-950 shadow-[4px_4px_0px_0px_rgba(225,29,72,1)] hover:shadow-[6px_6px_0px_0px_rgba(225,29,72,1)] transition-all">
            <div className="flex items-center gap-2 min-w-0">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-mono text-xs sm:text-sm font-extrabold text-white truncate">
                {profile.email || 'bhavyakothari.dev@gmail.com'}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyEmail}
              data-cursor={copied ? 'Done' : 'Copy'}
              className={`font-black text-xs px-5 py-2.5 rounded-full cursor-pointer transition-all flex items-center gap-1.5 shrink-0 border border-zinc-950 shadow-xs ${
                copied
                  ? 'bg-emerald-400 text-zinc-950'
                  : 'bg-amber-400 hover:bg-amber-300 text-zinc-950'
              }`}
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="copied"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4 text-zinc-950" />
                    <span>Copied!</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-1.5"
                  >
                    <Copy className="w-4 h-4 text-zinc-950" />
                    <span>Copy</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>

        {/* Social Channel Pills Row with Animated Hover */}
        <motion.div variants={itemVariants} className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <motion.a
            whileHover={{ y: -3, scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="https://instagram.com/devwithbhavya"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Instagram"
            className="bg-rose-50 hover:bg-rose-100 text-rose-800 border-2 border-rose-900 px-5 py-2.5 rounded-full font-mono text-xs font-black transition-all flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)]"
          >
            <Instagram className="w-4 h-4 text-rose-600" />
            <span>{profile.instagram || '@devwithbhavya'}</span>
          </motion.a>

          <motion.a
            whileHover={{ y: -3, scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href={profile.github || 'https://github.com/BhavyaPro-7'}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="GitHub"
            className="bg-zinc-100 hover:bg-zinc-200 text-zinc-950 border-2 border-zinc-950 px-5 py-2.5 rounded-full font-mono text-xs font-black transition-all flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)]"
          >
            <Github className="w-4 h-4 text-zinc-950" />
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3 text-zinc-500" />
          </motion.a>

          <motion.a
            whileHover={{ y: -3, scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href={profile.linkedin.startsWith('http') ? profile.linkedin : `https://${profile.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="LinkedIn"
            className="bg-amber-100 hover:bg-amber-200 text-zinc-950 border-2 border-zinc-950 px-5 py-2.5 rounded-full font-mono text-xs font-black transition-all flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)]"
          >
            <Linkedin className="w-4 h-4 text-amber-900" />
            <span>LinkedIn</span>
            <ExternalLink className="w-3 h-3 text-zinc-500" />
          </motion.a>

          <motion.a
            whileHover={{ y: -3, scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="YouTube"
            className="bg-zinc-100 hover:bg-zinc-200 text-zinc-950 border-2 border-zinc-950 px-5 py-2.5 rounded-full font-mono text-xs font-black transition-all flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)]"
          >
            <Youtube className="w-4 h-4 text-rose-600" />
            <span>YouTube</span>
            <ExternalLink className="w-3 h-3 text-zinc-500" />
          </motion.a>
        </motion.div>

        {/* Primary Interactive Direct Message Button */}
        <motion.div variants={itemVariants} className="pt-4 flex flex-col items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenContactModal}
            data-cursor="Message"
            className="px-7 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs sm:text-sm rounded-full border-2 border-zinc-950 flex items-center gap-2.5 cursor-pointer shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] transition-all"
          >
            <MessageSquare className="w-4 h-4 text-white" />
            <span>Send Direct Message to Inbox</span>
            <Send className="w-3.5 h-3.5 text-white/80" />
          </motion.button>
          
          <span className="text-[11px] font-mono font-bold text-zinc-500">
            Messages deliver directly to Bhavya's Firestore Admin Inbox
          </span>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
