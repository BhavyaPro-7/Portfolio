import React, { useState, useEffect } from 'react';
import {
  Save, Plus, Trash2, Edit3, Image as ImageIcon, Github, ExternalLink,
  ShieldCheck, Layout, Code, Compass, User, Sparkles, Check, ArrowLeft,
  Mail, MessageSquare, Heart, Target, RefreshCw, Eye, AlertCircle,
  Upload, Loader2
} from 'lucide-react';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db, uploadImageToStorage } from '../lib/firebase';
import { ProfileData, ProjectItem, SkillItem, JourneyItem, CoreValue, FocusItem } from '../types';
import { useAuth } from '../context/AuthContext';

interface AdminDashboardPageProps {
  profile: ProfileData;
  onSaveProfile: (updatedProfile: ProfileData) => Promise<void>;
  onNavigateHome: () => void;
}

interface IncomingMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
  createdAt: string;
}

export function AdminDashboard({
  profile,
  onSaveProfile,
  onNavigateHome,
}: AdminDashboardPageProps) {
  const { user, signInWithGoogle } = useAuth();
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'journey' | 'beliefs' | 'profile' | 'inbox'>('projects');
  const [formData, setFormData] = useState<ProfileData>(() => JSON.parse(JSON.stringify(profile)));
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sub-modal edit states
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);
  const [editingJourney, setEditingJourney] = useState<JourneyItem | null>(null);
  const [editingValue, setEditingValue] = useState<CoreValue | null>(null);
  const [editingFocus, setEditingFocus] = useState<FocusItem | null>(null);

  // Deletion prompt confirmation modal states
  const [deleteConfirmProject, setDeleteConfirmProject] = useState<ProjectItem | null>(null);
  const [deleteConfirmMessageId, setDeleteConfirmMessageId] = useState<string | null>(null);

  // Inbox messages state
  const [messages, setMessages] = useState<IncomingMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<IncomingMessage | null>(null);

  // Sync profile when props update
  useEffect(() => {
    setFormData(JSON.parse(JSON.stringify(profile)));
  }, [profile]);

  // Firestore Messages listener
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const msgs: IncomingMessage[] = [];
        snapshot.forEach((docSnap) => {
          msgs.push({ id: docSnap.id, ...docSnap.data() } as IncomingMessage);
        });
        setMessages(msgs);
        setLoadingMessages(false);
      },
      (err) => {
        console.warn('Firestore messages notice:', err.message);
        setLoadingMessages(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const isAdmin =
    user &&
    (user.email === 'bhavyapradeep72@gmail.com' ||
      user.email === 'bhavyakothari.dev@gmail.com');

  const handleGeneralChange = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setSaveSuccess(false);
    try {
      await onSaveProfile(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      console.error('Failed to save to Firestore:', err);
      alert('Error saving changes to Firestore. Please check your connection.');
    } finally {
      setSaving(false);
    }
  };

  // --- PROJECT MANAGEMENT ---
  const handleAddNewProject = () => {
    const newProj: ProjectItem = {
      id: 'p_' + Date.now(),
      title: 'New Innovation Project',
      purpose: 'Describe the main purpose of this project.',
      shortDesc: 'A short catchy summary of what this project accomplishes.',
      fullDesc: 'Detailed description of the application architecture, functionality, and scope.',
      category: 'Web App',
      icon: 'layout',
      iconBg: 'bg-amber-100 text-amber-700',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      tags: ['React', 'TypeScript', 'Tailwind CSS'],
      link: 'https://github.com/BhavyaPro-7',
      github: 'https://github.com/BhavyaPro-7',
      status: 'Active',
      highlights: ['Responsive modern user interface', 'Fast client-side routing'],
      whatILearned: 'Key architectural insights and technologies mastered during development.',
      challenges: 'Primary engineering roadblocks encountered and how they were resolved.',
      futureImprovements: 'Planned next-generation capabilities and enhancements.',
    };
    setEditingProject(newProj);
  };

  const handleSaveEditingProject = async (proj: ProjectItem) => {
    const exists = formData.projects.some((p) => p.id === proj.id);
    let newProjects: ProjectItem[];
    if (exists) {
      newProjects = formData.projects.map((p) => (p.id === proj.id ? proj : p));
    } else {
      newProjects = [proj, ...formData.projects];
    }
    const updatedProfile = { ...formData, projects: newProjects };
    setFormData(updatedProfile);
    setEditingProject(null);
    try {
      await onSaveProfile(updatedProfile);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      console.error('Failed to auto-save project:', err);
    }
  };

  const handleDeleteProject = (id: string) => {
    const projToDelete = formData.projects.find((p) => p.id === id);
    if (projToDelete) {
      setDeleteConfirmProject(projToDelete);
    } else {
      confirmDeleteProjectAction(id);
    }
  };

  const confirmDeleteProjectAction = async (id: string) => {
    const updatedProjects = formData.projects.filter((p) => p.id !== id);
    const updatedProfile = {
      ...formData,
      projects: updatedProjects,
    };
    setFormData(updatedProfile);
    if (editingProject?.id === id) {
      setEditingProject(null);
    }
    try {
      await onSaveProfile(updatedProfile);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      console.error('Failed to persist project deletion:', err);
    }
  };

  // --- SKILL MANAGEMENT ---
  const handleAddNewSkill = () => {
    const newSkill: SkillItem = {
      id: 's_' + Date.now(),
      name: 'New Technology',
      category: 'Development',
      icon: 'code',
      badgeBg: 'bg-indigo-600 text-white',
      badgeText: 'DEV',
      description: 'Hands-on experience building performant modules with this tool.',
    };
    setEditingSkill(newSkill);
  };

  const handleSaveEditingSkill = (skill: SkillItem) => {
    setFormData((prev) => {
      const exists = prev.skills.some((s) => s.id === skill.id);
      let newSkills: SkillItem[];
      if (exists) {
        newSkills = prev.skills.map((s) => (s.id === skill.id ? skill : s));
      } else {
        newSkills = [...prev.skills, skill];
      }
      return { ...prev, skills: newSkills };
    });
    setEditingSkill(null);
  };

  const handleDeleteSkill = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  };

  // --- JOURNEY MANAGEMENT ---
  const handleAddNewJourney = () => {
    const newItem: JourneyItem = {
      id: 'j_' + Date.now(),
      year: new Date().getFullYear().toString(),
      title: 'New Milestone',
      description: 'Describe this landmark learning or career achievement.',
    };
    setEditingJourney(newItem);
  };

  const handleSaveEditingJourney = (item: JourneyItem) => {
    setFormData((prev) => {
      const exists = prev.journey.some((j) => j.id === item.id);
      let newJourney: JourneyItem[];
      if (exists) {
        newJourney = prev.journey.map((j) => (j.id === item.id ? item : j));
      } else {
        newJourney = [...prev.journey, item];
      }
      return { ...prev, journey: newJourney };
    });
    setEditingJourney(null);
  };

  const handleDeleteJourney = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      journey: prev.journey.filter((j) => j.id !== id),
    }));
  };

  // --- CORE VALUES MANAGEMENT ---
  const handleSaveEditingValue = (val: CoreValue) => {
    setFormData((prev) => {
      const exists = prev.coreValues.some((v) => v.id === val.id);
      let updated: CoreValue[];
      if (exists) {
        updated = prev.coreValues.map((v) => (v.id === val.id ? val : v));
      } else {
        updated = [...prev.coreValues, val];
      }
      return { ...prev, coreValues: updated };
    });
    setEditingValue(null);
  };

  const handleDeleteValue = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      coreValues: prev.coreValues.filter((v) => v.id !== id),
    }));
  };

  // --- FOCUS ITEMS MANAGEMENT ---
  const handleSaveEditingFocus = (foc: FocusItem) => {
    setFormData((prev) => {
      const exists = prev.focusItems.some((f) => f.id === foc.id);
      let updated: FocusItem[];
      if (exists) {
        updated = prev.focusItems.map((f) => (f.id === foc.id ? foc : f));
      } else {
        updated = [...prev.focusItems, foc];
      }
      return { ...prev, focusItems: updated };
    });
    setEditingFocus(null);
  };

  const handleDeleteFocus = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      focusItems: prev.focusItems.filter((f) => f.id !== id),
    }));
  };

  // Delete message from Firestore
  const handleDeleteMessage = (msgId: string) => {
    setDeleteConfirmMessageId(msgId);
  };

  const confirmDeleteMessageAction = async (msgId: string) => {
    try {
      await deleteDoc(doc(db, 'messages', msgId));
      if (selectedMessage?.id === msgId) setSelectedMessage(null);
    } catch (err) {
      console.error('Failed to delete message:', err);
    }
  };

  // Non-Admin Auth Check Prompt
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#f4f3ee] flex items-center justify-center p-4">
        <div className="bg-white border-2 border-zinc-900 rounded-3xl max-w-md w-full p-8 shadow-2xl text-center space-y-5">
          <div className="w-16 h-16 bg-amber-400 border-2 border-zinc-900 rounded-full flex items-center justify-center mx-auto text-zinc-950">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black font-display text-zinc-950">
              Admin Access Restricted
            </h2>
            <p className="text-xs text-zinc-600 leading-relaxed">
              You must sign in with verified admin account (<span className="font-mono font-bold text-zinc-900">bhavyapradeep72@gmail.com</span>) to manage portfolio content.
            </p>
          </div>

          <div className="pt-2 space-y-3">
            <button
              onClick={() => signInWithGoogle()}
              className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-zinc-950 font-black text-xs rounded-full border border-zinc-900 shadow-2xs flex items-center justify-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5"
            >
              <User className="w-4 h-4" />
              <span>Sign In with Admin Google Account</span>
            </button>

            <button
              onClick={onNavigateHome}
              className="w-full py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-extrabold text-xs rounded-full border border-zinc-300 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f3ee] text-zinc-900 font-sans flex flex-col">
      
      {/* Top Header Navigation Bar */}
      <header className="bg-zinc-950 text-white border-b-2 border-zinc-900 sticky top-0 z-40 px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateHome}
            data-cursor="Exit Admin"
            className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white rounded-full border border-zinc-700 transition-colors flex items-center gap-1.5 text-xs font-extrabold cursor-pointer"
            title="Return to public portfolio"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">View Public Website</span>
          </button>

          <div className="h-6 w-px bg-zinc-800 hidden sm:block" />

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-400 border border-zinc-900 flex items-center justify-center text-zinc-950 font-black">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-black font-display tracking-tight text-white">
                  Admin Control Center
                </h1>
                <span className="bg-amber-400 text-zinc-950 text-[10px] font-mono font-black px-2 py-0.5 rounded-full uppercase">
                  LIVE EDIT MODE
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 hidden md:block">
                Logged in as <span className="font-mono text-amber-300 font-bold">{user?.email}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveAll}
            disabled={saving}
            data-cursor="Save All"
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-zinc-950 font-black text-xs rounded-full border border-zinc-900 shadow-2xs flex items-center gap-2 cursor-pointer disabled:opacity-50 transition-all hover:-translate-y-0.5"
          >
            {saveSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-950" />
                <span>Saved to Firestore!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{saving ? 'Publishing...' : 'Save All Changes'}</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Sub Header Tabs Navigation */}
      <div className="bg-white border-b border-zinc-200 px-4 sm:px-8 py-2.5 overflow-x-auto flex items-center gap-2 sticky top-[57px] z-30">
        {[
          { id: 'projects', label: 'Projects Showcase', count: formData.projects.length, icon: Layout, cursor: 'Projects' },
          { id: 'skills', label: 'Tech Stack & Skills', count: formData.skills.length, icon: Code, cursor: 'Skills' },
          { id: 'journey', label: 'Journey Timeline', count: formData.journey.length, icon: Compass, cursor: 'Journey' },
          { id: 'beliefs', label: 'Core Beliefs & Focus', count: formData.coreValues.length + formData.focusItems.length, icon: Target, cursor: 'Beliefs' },
          { id: 'profile', label: 'Bio & Personal Details', icon: User, cursor: 'Profile' },
          { id: 'inbox', label: 'Visitor Inbox', count: messages.length, icon: Mail, cursor: 'Inbox' },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              data-cursor={tab.cursor}
              className={`px-4 py-2 rounded-2xl font-mono text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-amber-400 text-zinc-950 border border-zinc-900 shadow-2xs scale-102'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-transparent'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="bg-zinc-900 text-white text-[10px] px-1.5 py-0.5 rounded-full font-sans">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-6">
        
        {/* 1. PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-zinc-200 shadow-xs">
              <div>
                <h2 className="font-black text-xl text-zinc-950 font-display">
                  Projects Showcase Manager
                </h2>
                <p className="text-xs text-zinc-600 mt-0.5">
                  Full control over project title, cover photo URL, GitHub repo, live URL, tags, and case study details.
                </p>
              </div>
              <button
                onClick={handleAddNewProject}
                className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-extrabold text-xs rounded-full border border-zinc-900 flex items-center gap-2 cursor-pointer shadow-2xs self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {formData.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white rounded-3xl border-2 border-zinc-200 p-5 space-y-4 flex flex-col justify-between hover:border-zinc-900 transition-all shadow-xs group"
                >
                  <div className="space-y-3">
                    {proj.image ? (
                      <div className="w-full h-40 rounded-2xl overflow-hidden border border-zinc-200 relative bg-zinc-100">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-28 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 font-mono text-xs font-bold">
                        No Cover Image Attached
                      </div>
                    )}

                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono font-extrabold uppercase text-rose-600 tracking-wider">
                          {proj.category} ● {proj.status}
                        </span>
                        <h3 className="font-black text-lg text-zinc-950 leading-tight">
                          {proj.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setEditingProject(proj)}
                          className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl border border-amber-300 cursor-pointer"
                          title="Edit Project"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-2 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-xl border border-rose-300 cursor-pointer"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                      {proj.shortDesc || proj.fullDesc}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {proj.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono font-bold bg-zinc-100 border border-zinc-200 text-zinc-800 px-2 py-0.5 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500 font-mono">
                    <span className="truncate max-w-[150px]">
                      {proj.github ? 'GitHub repo linked' : 'No repo link'}
                    </span>
                    <button
                      onClick={() => setEditingProject(proj)}
                      className="text-amber-800 font-extrabold hover:underline"
                    >
                      Edit Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. SKILLS TAB */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-zinc-200 shadow-xs">
              <div>
                <h2 className="font-black text-xl text-zinc-950 font-display">
                  Tech Stack & Skills Manager
                </h2>
                <p className="text-xs text-zinc-600 mt-0.5">
                  Organize technologies across Development, Productivity, AI Tools, and Design.
                </p>
              </div>
              <button
                onClick={handleAddNewSkill}
                className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-extrabold text-xs rounded-full border border-zinc-900 flex items-center gap-2 cursor-pointer shadow-2xs self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Skill</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {formData.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="bg-white p-4 rounded-3xl border border-zinc-200 flex items-start justify-between gap-3 shadow-2xs hover:border-zinc-900 transition-all"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded-md ${skill.badgeBg || 'bg-zinc-900 text-white'}`}>
                        {skill.badgeText || skill.category}
                      </span>
                      <h3 className="font-extrabold text-sm text-zinc-950">{skill.name}</h3>
                    </div>
                    <p className="text-xs text-zinc-600 leading-snug">
                      {skill.description}
                    </p>
                    <span className="text-[10px] font-mono text-rose-600 font-bold block">
                      Category: {skill.category}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <button
                      onClick={() => setEditingSkill(skill)}
                      className="p-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="p-1.5 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. JOURNEY TIMELINE TAB */}
        {activeTab === 'journey' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-zinc-200 shadow-xs">
              <div>
                <h2 className="font-black text-xl text-zinc-950 font-display">
                  Journey Timeline Milestones
                </h2>
                <p className="text-xs text-zinc-600 mt-0.5">
                  Chronological learning milestones, projects, and career achievements over time.
                </p>
              </div>
              <button
                onClick={handleAddNewJourney}
                className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-extrabold text-xs rounded-full border border-zinc-900 flex items-center gap-2 cursor-pointer shadow-2xs self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add Timeline Entry</span>
              </button>
            </div>

            <div className="space-y-3">
              {formData.journey.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-3xl border border-zinc-200 flex items-start justify-between gap-4 shadow-2xs hover:border-zinc-900 transition-all"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2.5">
                      <span className="bg-amber-400 border border-zinc-900 text-zinc-950 text-xs font-mono font-black px-3 py-0.5 rounded-full">
                        {item.year}
                      </span>
                      <h3 className="font-extrabold text-base text-zinc-950">{item.title}</h3>
                    </div>
                    <p className="text-xs text-zinc-700 leading-relaxed">{item.description}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingJourney(item)}
                      className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteJourney(item.id)}
                      className="p-2 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-xl cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. BELIEFS & FOCUS TAB */}
        {activeTab === 'beliefs' && (
          <div className="space-y-8">
            {/* Core Values */}
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white p-5 rounded-3xl border border-zinc-200">
                <div>
                  <h2 className="font-black text-lg text-zinc-950 font-display">
                    Core Values & Beliefs
                  </h2>
                  <p className="text-xs text-zinc-600">
                    The guiding principles that define your mindset and work ethic.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingValue({
                      id: 'cv_' + Date.now(),
                      title: 'New Core Value',
                      description: 'Describe this core principle.',
                      icon: 'lightbulb',
                    })
                  }
                  className="px-3 py-2 bg-zinc-900 text-white font-bold text-xs rounded-full flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Value</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formData.coreValues.map((val) => (
                  <div key={val.id} className="bg-white p-4 rounded-3xl border border-zinc-200 flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-rose-600" />
                        <h3 className="font-extrabold text-sm text-zinc-950">{val.title}</h3>
                      </div>
                      <p className="text-xs text-zinc-600">{val.description}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button onClick={() => setEditingValue(val)} className="p-1 bg-amber-100 text-amber-900 rounded">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeleteValue(val.id)} className="p-1 bg-rose-100 text-rose-800 rounded">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Focus Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white p-5 rounded-3xl border border-zinc-200">
                <div>
                  <h2 className="font-black text-lg text-zinc-950 font-display">
                    Current Focus Areas
                  </h2>
                  <p className="text-xs text-zinc-600">
                    Active learning objectives and goals.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingFocus({
                      id: 'f_' + Date.now(),
                      title: 'New Focus Area',
                      description: 'Describe what you are currently mastering.',
                      icon: 'target',
                    })
                  }
                  className="px-3 py-2 bg-zinc-900 text-white font-bold text-xs rounded-full flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Focus Area</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formData.focusItems.map((foc) => (
                  <div key={foc.id} className="bg-white p-4 rounded-3xl border border-zinc-200 flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-amber-600" />
                        <h3 className="font-extrabold text-sm text-zinc-950">{foc.title}</h3>
                      </div>
                      <p className="text-xs text-zinc-600">{foc.description}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button onClick={() => setEditingFocus(foc)} className="p-1 bg-amber-100 text-amber-900 rounded">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeleteFocus(foc.id)} className="p-1 bg-rose-100 text-rose-800 rounded">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. BIO & PERSONAL DETAILS TAB */}
        {activeTab === 'profile' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 space-y-6 shadow-xs">
            <h2 className="font-black text-xl text-zinc-950 font-display border-b border-zinc-200 pb-3">
              Personal Bio, Education & Social Links
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono font-bold text-zinc-700 mb-1">
                  Full Display Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleGeneralChange('name', e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-2xl text-xs font-medium text-zinc-900 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-zinc-700 mb-1">
                  Professional Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleGeneralChange('title', e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-2xl text-xs font-medium text-zinc-900 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-zinc-700 mb-1">
                Primary Bio / Story
              </label>
              <textarea
                rows={3}
                value={formData.bio1}
                onChange={(e) => handleGeneralChange('bio1', e.target.value)}
                className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-2xl text-xs font-medium text-zinc-900 focus:ring-2 focus:ring-amber-400 focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-zinc-700 mb-1">
                Secondary Bio / Philosophy
              </label>
              <textarea
                rows={2}
                value={formData.bio2}
                onChange={(e) => handleGeneralChange('bio2', e.target.value)}
                className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-2xl text-xs font-medium text-zinc-900 focus:ring-2 focus:ring-amber-400 focus:outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono font-bold text-zinc-700 mb-1">
                  Why I Build Projects
                </label>
                <textarea
                  rows={2}
                  value={formData.whyBuildProjects}
                  onChange={(e) => handleGeneralChange('whyBuildProjects', e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-2xl text-xs font-medium text-zinc-900 focus:ring-2 focus:ring-amber-400 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-zinc-700 mb-1">
                  Learning Philosophy
                </label>
                <textarea
                  rows={2}
                  value={formData.learningPhilosophy}
                  onChange={(e) => handleGeneralChange('learningPhilosophy', e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-2xl text-xs font-medium text-zinc-900 focus:ring-2 focus:ring-amber-400 focus:outline-none resize-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-mono font-bold text-zinc-700 mb-1">
                  Education Degree
                </label>
                <input
                  type="text"
                  value={formData.educationDegree}
                  onChange={(e) => handleGeneralChange('educationDegree', e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-2xl text-xs font-medium text-zinc-900 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-zinc-700 mb-1">
                  University / School
                </label>
                <input
                  type="text"
                  value={formData.educationSchool}
                  onChange={(e) => handleGeneralChange('educationSchool', e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-2xl text-xs font-medium text-zinc-900 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-zinc-700 mb-1">
                  Education Year
                </label>
                <input
                  type="text"
                  value={formData.educationYear}
                  onChange={(e) => handleGeneralChange('educationYear', e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-2xl text-xs font-medium text-zinc-900 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-mono font-bold text-zinc-700 mb-1">
                  Email Address
                </label>
                <input
                  type="text"
                  value={formData.email}
                  onChange={(e) => handleGeneralChange('email', e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-2xl text-xs font-medium text-zinc-900 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-zinc-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleGeneralChange('location', e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-2xl text-xs font-medium text-zinc-900 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-zinc-700 mb-1">
                  Footer Tag Year
                </label>
                <input
                  type="text"
                  value={formData.yearTag}
                  onChange={(e) => handleGeneralChange('yearTag', e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-2xl text-xs font-medium text-zinc-900 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-mono font-bold text-zinc-700 mb-1">
                  GitHub Profile Link
                </label>
                <input
                  type="text"
                  value={formData.github}
                  onChange={(e) => handleGeneralChange('github', e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-2xl text-xs font-medium text-zinc-900 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-zinc-700 mb-1">
                  LinkedIn URL
                </label>
                <input
                  type="text"
                  value={formData.linkedin}
                  onChange={(e) => handleGeneralChange('linkedin', e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-2xl text-xs font-medium text-zinc-900 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-zinc-700 mb-1">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={(e) => handleGeneralChange('instagram', e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-2xl text-xs font-medium text-zinc-900 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-zinc-700 mb-1">
                Superpower Motto Quote
              </label>
              <input
                type="text"
                value={formData.superpowerQuote}
                onChange={(e) => handleGeneralChange('superpowerQuote', e.target.value)}
                className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-2xl text-xs font-medium text-zinc-900 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* 6. VISITOR INBOX TAB */}
        {activeTab === 'inbox' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-3xl border border-zinc-200 flex items-center justify-between shadow-xs">
              <div>
                <h2 className="font-black text-xl text-zinc-950 font-display">
                  Visitor Contact Messages Inbox
                </h2>
                <p className="text-xs text-zinc-600 mt-0.5">
                  Real-time inquiry messages submitted by visitors through the contact form.
                </p>
              </div>
              <span className="bg-amber-400 text-zinc-950 text-xs font-mono font-black px-3 py-1 rounded-full border border-zinc-900">
                {messages.length} Message{messages.length === 1 ? '' : 's'}
              </span>
            </div>

            {loadingMessages ? (
              <div className="p-12 text-center text-zinc-500 font-mono text-xs">
                Loading incoming messages...
              </div>
            ) : messages.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-zinc-200 text-center space-y-2">
                <Mail className="w-10 h-10 text-zinc-300 mx-auto" />
                <h3 className="font-extrabold text-base text-zinc-900">No Messages Yet</h3>
                <p className="text-xs text-zinc-500">
                  When visitors submit inquiries via the contact form, they will appear here live!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Messages List */}
                <div className="lg:col-span-5 space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      onClick={() => setSelectedMessage(msg)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                        selectedMessage?.id === msg.id
                          ? 'bg-amber-100 border-amber-400 shadow-xs'
                          : 'bg-white border-zinc-200 hover:border-zinc-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs text-zinc-950 truncate max-w-[180px]">
                          {msg.senderName}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-rose-600 font-mono">
                        {msg.subject}
                      </div>
                      <p className="text-xs text-zinc-600 line-clamp-2">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Selected Message Reader */}
                <div className="lg:col-span-7">
                  {selectedMessage ? (
                    <div className="bg-white p-6 rounded-3xl border-2 border-zinc-900 space-y-4 shadow-sm relative">
                      <div className="flex items-start justify-between border-b border-zinc-200 pb-4">
                        <div>
                          <span className="bg-amber-400 text-zinc-950 text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full uppercase">
                            {selectedMessage.subject}
                          </span>
                          <h3 className="font-black text-lg text-zinc-950 mt-2">
                            {selectedMessage.senderName}
                          </h3>
                          <a
                            href={`mailto:${selectedMessage.senderEmail}`}
                            className="text-xs font-mono font-bold text-amber-700 hover:underline"
                          >
                            {selectedMessage.senderEmail}
                          </a>
                        </div>

                        <button
                          onClick={() => handleDeleteMessage(selectedMessage.id)}
                          className="p-2 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-xl border border-rose-300 cursor-pointer"
                          title="Delete Message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-zinc-400 block">
                          Sent at: {new Date(selectedMessage.createdAt).toLocaleString()}
                        </span>
                        <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 text-xs text-zinc-800 font-medium leading-relaxed whitespace-pre-wrap">
                          {selectedMessage.message}
                        </div>
                      </div>

                      <div className="pt-2">
                        <a
                          href={`mailto:${selectedMessage.senderEmail}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white font-extrabold text-xs rounded-full cursor-pointer shadow-2xs"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Reply via Email</span>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white p-12 rounded-3xl border border-zinc-200 text-center text-zinc-400 font-mono text-xs">
                      Select a message from the left to view details
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* SUB-MODAL 1: EDIT / ADD PROJECT MODAL */}
      {editingProject && (
        <ProjectEditorModal
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onSave={handleSaveEditingProject}
          onDelete={(id) => handleDeleteProject(id)}
        />
      )}

      {/* SUB-MODAL 2: EDIT / ADD SKILL MODAL */}
      {editingSkill && (
        <SkillEditorModal
          skill={editingSkill}
          onClose={() => setEditingSkill(null)}
          onSave={handleSaveEditingSkill}
        />
      )}

      {/* SUB-MODAL 3: EDIT / ADD JOURNEY MODAL */}
      {editingJourney && (
        <JourneyEditorModal
          item={editingJourney}
          onClose={() => setEditingJourney(null)}
          onSave={handleSaveEditingJourney}
        />
      )}

      {/* SUB-MODAL 4: EDIT CORE VALUE MODAL */}
      {editingValue && (
        <ValueEditorModal
          val={editingValue}
          onClose={() => setEditingValue(null)}
          onSave={handleSaveEditingValue}
        />
      )}

      {/* SUB-MODAL 5: EDIT FOCUS ITEM MODAL */}
      {editingFocus && (
        <FocusEditorModal
          foc={editingFocus}
          onClose={() => setEditingFocus(null)}
          onSave={handleSaveEditingFocus}
        />
      )}

      {/* CONFIRM PROJECT DELETE MODAL */}
      {deleteConfirmProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border-2 border-zinc-900 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-800 border border-rose-300 flex items-center justify-center shrink-0">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-lg text-zinc-950 font-display">Delete Project</h3>
                <p className="text-xs text-zinc-600">This action will permanently remove this project from your showcase.</p>
              </div>
            </div>

            <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200">
              <p className="text-xs text-zinc-800 font-medium leading-relaxed">
                Are you sure you want to delete <strong className="text-zinc-950">"{deleteConfirmProject.title}"</strong>?
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-200">
              <button
                type="button"
                onClick={() => setDeleteConfirmProject(null)}
                className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-xs rounded-full border border-zinc-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  const idToDelete = deleteConfirmProject.id;
                  setDeleteConfirmProject(null);
                  await confirmDeleteProjectAction(idToDelete);
                }}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-full border border-rose-900 cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Confirm Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM MESSAGE DELETE MODAL */}
      {deleteConfirmMessageId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border-2 border-zinc-900 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-800 border border-rose-300 flex items-center justify-center shrink-0">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-lg text-zinc-950 font-display">Delete Visitor Message</h3>
                <p className="text-xs text-zinc-600">Remove this message permanently from your Firestore inbox.</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-200">
              <button
                type="button"
                onClick={() => setDeleteConfirmMessageId(null)}
                className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-xs rounded-full border border-zinc-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  const msgId = deleteConfirmMessageId;
                  setDeleteConfirmMessageId(null);
                  await confirmDeleteMessageAction(msgId);
                }}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-full border border-rose-900 cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Message</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- PROJECT EDITOR COMPONENT ---
function ProjectEditorModal({
  project,
  onClose,
  onSave,
  onDelete,
}: {
  project: ProjectItem;
  onClose: () => void;
  onSave: (proj: ProjectItem) => void;
  onDelete?: (id: string) => void;
}) {
  const [data, setData] = useState<ProjectItem>({ ...project });
  const [tagInput, setTagInput] = useState('');
  const [highlightInput, setHighlightInput] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadStatus('Error: Please select an image file (PNG, JPG, WebP, etc.).');
      return;
    }

    setUploadingImage(true);
    setUploadStatus('Uploading cover image to Firebase Storage...');

    try {
      const downloadUrl = await uploadImageToStorage(file, 'project-covers');
      setData((prev) => ({ ...prev, image: downloadUrl }));
      setUploadStatus('Cover image uploaded successfully to Firebase Storage!');
      setTimeout(() => setUploadStatus(null), 4000);
    } catch (err: any) {
      console.error('Failed to upload image:', err);
      setUploadStatus('Upload failed. You can paste a direct image URL below.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    if (!data.tags.includes(tagInput.trim())) {
      setData((prev) => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
    }
    setTagInput('');
  };

  const handleRemoveTag = (t: string) => {
    setData((prev) => ({ ...prev, tags: prev.tags.filter((tag) => tag !== t) }));
  };

  const handleAddHighlight = () => {
    if (!highlightInput.trim()) return;
    setData((prev) => ({ ...prev, highlights: [...prev.highlights, highlightInput.trim()] }));
    setHighlightInput('');
  };

  const handleRemoveHighlight = (idx: number) => {
    setData((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== idx),
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border-2 border-zinc-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-zinc-100 hover:bg-zinc-200 rounded-full text-zinc-800 cursor-pointer"
        >
          ✕
        </button>

        <h3 className="font-black text-xl text-zinc-950 font-display">
          {project.id ? 'Edit Project Details' : 'Add New Project'}
        </h3>

        <div className="space-y-3 text-xs">
          <div>
            <label className="font-mono font-bold block mb-1 text-zinc-700">Project Title</label>
            <input
              type="text"
              required
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 text-zinc-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-mono font-bold block mb-1 text-zinc-700">Category Tag</label>
              <input
                type="text"
                value={data.category}
                onChange={(e) => setData({ ...data, category: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 text-zinc-900"
              />
            </div>
            <div>
              <label className="font-mono font-bold block mb-1 text-zinc-700">Status</label>
              <select
                value={data.status}
                onChange={(e) => setData({ ...data, status: e.target.value as any })}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 text-zinc-900"
              >
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
              </select>
            </div>
          </div>

          {/* Cover Image Upload (Firebase Storage) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-mono font-bold block text-zinc-700">
                Project Cover Image
              </label>
              <span className="font-mono text-[10px] text-amber-800 bg-amber-100 border border-amber-300 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-amber-900" />
                Firebase Storage Integrated
              </span>
            </div>

            {/* Drag & Drop / File Upload Box */}
            <div className="border-2 border-dashed border-zinc-300 hover:border-amber-500 rounded-2xl p-4 bg-zinc-50 hover:bg-amber-50/50 transition-colors text-center relative group cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploadingImage}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
              />
              <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                {uploadingImage ? (
                  <div className="flex items-center gap-2 text-amber-700 font-bold">
                    <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                    <span>Uploading image to Firebase Storage...</span>
                  </div>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center border border-amber-300 group-hover:scale-110 transition-transform">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-zinc-900 text-xs">
                        Click or drag & drop to upload cover image
                      </p>
                      <p className="text-[11px] text-zinc-500">
                        Supports PNG, JPG, WebP (Uploads directly to Firebase Storage bucket)
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {uploadStatus && (
              <p
                className={`text-xs font-mono font-bold px-3 py-1.5 rounded-xl border ${
                  uploadStatus.includes('Error') || uploadStatus.includes('failed')
                    ? 'bg-rose-50 border-rose-300 text-rose-800'
                    : uploadStatus.includes('successfully')
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-amber-50 border-amber-300 text-amber-900'
                }`}
              >
                {uploadStatus}
              </p>
            )}

            {/* Direct Image URL input & Unsplash sample fallback */}
            <div className="space-y-1 pt-1">
              <label className="font-mono text-[11px] font-bold text-zinc-600 block">
                Or paste direct Image URL / Unsplash link
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={data.image || ''}
                  placeholder="https://images.unsplash.com/... or image URL"
                  onChange={(e) => setData({ ...data, image: e.target.value })}
                  className="flex-1 px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 text-zinc-900"
                />
                <button
                  type="button"
                  onClick={() =>
                    setData({
                      ...data,
                      image:
                        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
                    })
                  }
                  className="px-3 py-1 bg-amber-100 text-amber-900 font-bold border border-amber-300 rounded-xl cursor-pointer text-xs"
                >
                  Sample
                </button>
              </div>
            </div>

            {/* Cover Preview */}
            {data.image && (
              <div className="mt-2 relative rounded-2xl border-2 border-zinc-900 overflow-hidden bg-zinc-100 group">
                <img
                  src={data.image}
                  alt="Cover Preview"
                  className="w-full h-40 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    type="button"
                    onClick={() => setData({ ...data, image: '' })}
                    className="px-2.5 py-1 bg-zinc-950/80 hover:bg-red-600 text-white rounded-lg font-bold text-[11px] backdrop-blur-xs transition-colors cursor-pointer"
                  >
                    Remove Cover
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-mono font-bold block mb-1 text-zinc-700">GitHub Repository Link</label>
              <input
                type="text"
                value={data.github || ''}
                placeholder="https://github.com/..."
                onChange={(e) => setData({ ...data, github: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 text-zinc-900"
              />
            </div>
            <div>
              <label className="font-mono font-bold block mb-1 text-zinc-700">Live Demo Link</label>
              <input
                type="text"
                value={data.link || ''}
                placeholder="https://..."
                onChange={(e) => setData({ ...data, link: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 text-zinc-900"
              />
            </div>
          </div>

          <div>
            <label className="font-mono font-bold block mb-1 text-zinc-700">Short Summary</label>
            <input
              type="text"
              value={data.shortDesc}
              onChange={(e) => setData({ ...data, shortDesc: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 text-zinc-900"
            />
          </div>

          <div>
            <label className="font-mono font-bold block mb-1 text-zinc-700">Full Description</label>
            <textarea
              rows={3}
              value={data.fullDesc}
              onChange={(e) => setData({ ...data, fullDesc: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 text-zinc-900 resize-none"
            />
          </div>

          <div>
            <label className="font-mono font-bold block mb-1 text-zinc-700">What I Learned</label>
            <textarea
              rows={2}
              value={data.whatILearned || ''}
              onChange={(e) => setData({ ...data, whatILearned: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 text-zinc-900 resize-none"
            />
          </div>

          <div>
            <label className="font-mono font-bold block mb-1 text-zinc-700">Challenges Encountered</label>
            <textarea
              rows={2}
              value={data.challenges || ''}
              onChange={(e) => setData({ ...data, challenges: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 text-zinc-900 resize-none"
            />
          </div>

          {/* Tech Tags Input */}
          <div>
            <label className="font-mono font-bold block mb-1 text-zinc-700">Tech Stack Tags</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                placeholder="Add tag (e.g. Python, Firebase)"
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                className="flex-1 px-3 py-1.5 bg-zinc-50 border border-zinc-300 rounded-xl font-medium"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-1.5 bg-zinc-900 text-white rounded-xl font-bold cursor-pointer"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {data.tags.map((t) => (
                <span key={t} className="bg-amber-100 text-amber-900 border border-amber-300 font-mono font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <span>{t}</span>
                  <button type="button" onClick={() => handleRemoveTag(t)} className="hover:text-red-600">
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div>
            <label className="font-mono font-bold block mb-1 text-zinc-700">Key Features / Highlights</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={highlightInput}
                placeholder="Add highlight bullet point..."
                onChange={(e) => setHighlightInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddHighlight())}
                className="flex-1 px-3 py-1.5 bg-zinc-50 border border-zinc-300 rounded-xl font-medium"
              />
              <button
                type="button"
                onClick={handleAddHighlight}
                className="px-3 py-1.5 bg-zinc-900 text-white rounded-xl font-bold cursor-pointer"
              >
                Add
              </button>
            </div>
            <div className="space-y-1">
              {data.highlights.map((h, i) => (
                <div key={i} className="flex items-center justify-between bg-zinc-50 p-2 rounded-lg border border-zinc-200">
                  <span className="font-medium text-zinc-800">{h}</span>
                  <button type="button" onClick={() => handleRemoveHighlight(i)} className="text-red-600 font-bold px-1">
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-zinc-200 flex items-center justify-between gap-2">
          {onDelete && project.id ? (
            <button
              type="button"
              onClick={() => onDelete(project.id)}
              className="px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-full font-bold text-xs border border-rose-300 flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Project</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <button onClick={onClose} className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-full font-bold text-xs cursor-pointer">
              Cancel
            </button>
            <button
              onClick={() => onSave(data)}
              className="px-5 py-2 bg-amber-400 hover:bg-amber-500 text-zinc-950 rounded-full font-black text-xs border border-zinc-900 cursor-pointer"
            >
              Save Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SKILL EDITOR COMPONENT ---
function SkillEditorModal({
  skill,
  onClose,
  onSave,
}: {
  skill: SkillItem;
  onClose: () => void;
  onSave: (skill: SkillItem) => void;
}) {
  const [data, setData] = useState<SkillItem>({ ...skill });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border-2 border-zinc-900 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative text-xs">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-zinc-100 rounded-full">
          ✕
        </button>

        <h3 className="font-black text-lg text-zinc-950 font-display">
          Edit Skill / Tech Stack
        </h3>

        <div className="space-y-3">
          <div>
            <label className="font-mono font-bold block mb-1">Technology Name</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl font-medium"
            />
          </div>

          <div>
            <label className="font-mono font-bold block mb-1">Category</label>
            <select
              value={data.category}
              onChange={(e) => setData({ ...data, category: e.target.value as any })}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl font-medium"
            >
              <option value="Development">Development</option>
              <option value="Productivity">Productivity</option>
              <option value="AI Tools">AI Tools</option>
              <option value="Design">Design</option>
            </select>
          </div>

          <div>
            <label className="font-mono font-bold block mb-1">Badge Label Text</label>
            <input
              type="text"
              value={data.badgeText || ''}
              onChange={(e) => setData({ ...data, badgeText: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl font-medium"
            />
          </div>

          <div>
            <label className="font-mono font-bold block mb-1">Description</label>
            <textarea
              rows={2}
              value={data.description || ''}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl font-medium resize-none"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-zinc-200 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-zinc-100 rounded-full font-bold cursor-pointer">
            Cancel
          </button>
          <button
            onClick={() => onSave(data)}
            className="px-5 py-2 bg-amber-400 text-zinc-950 rounded-full font-black border border-zinc-900 cursor-pointer"
          >
            Save Skill
          </button>
        </div>
      </div>
    </div>
  );
}

// --- JOURNEY EDITOR COMPONENT ---
function JourneyEditorModal({
  item,
  onClose,
  onSave,
}: {
  item: JourneyItem;
  onClose: () => void;
  onSave: (item: JourneyItem) => void;
}) {
  const [data, setData] = useState<JourneyItem>({ ...item });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border-2 border-zinc-900 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative text-xs">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-zinc-100 rounded-full">
          ✕
        </button>

        <h3 className="font-black text-lg text-zinc-950 font-display">
          Edit Journey Milestone
        </h3>

        <div className="space-y-3">
          <div>
            <label className="font-mono font-bold block mb-1">Year / Period</label>
            <input
              type="text"
              value={data.year}
              onChange={(e) => setData({ ...data, year: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl font-medium"
            />
          </div>

          <div>
            <label className="font-mono font-bold block mb-1">Milestone Title</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl font-medium"
            />
          </div>

          <div>
            <label className="font-mono font-bold block mb-1">Description</label>
            <textarea
              rows={3}
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl font-medium resize-none"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-zinc-200 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-zinc-100 rounded-full font-bold cursor-pointer">
            Cancel
          </button>
          <button
            onClick={() => onSave(data)}
            className="px-5 py-2 bg-amber-400 text-zinc-950 rounded-full font-black border border-zinc-900 cursor-pointer"
          >
            Save Milestone
          </button>
        </div>
      </div>
    </div>
  );
}

// --- VALUE EDITOR COMPONENT ---
function ValueEditorModal({
  val,
  onClose,
  onSave,
}: {
  val: CoreValue;
  onClose: () => void;
  onSave: (val: CoreValue) => void;
}) {
  const [data, setData] = useState<CoreValue>({ ...val });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-xs">
      <div className="bg-white border-2 border-zinc-900 rounded-3xl max-w-md w-full p-6 space-y-4 text-xs relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-zinc-100 rounded-full">
          ✕
        </button>
        <h3 className="font-black text-lg text-zinc-950 font-display">Edit Core Value</h3>
        <div className="space-y-3">
          <div>
            <label className="font-mono font-bold block mb-1">Title</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl font-medium"
            />
          </div>
          <div>
            <label className="font-mono font-bold block mb-1">Description</label>
            <textarea
              rows={3}
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl font-medium resize-none"
            />
          </div>
        </div>
        <div className="pt-3 border-t border-zinc-200 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-zinc-100 rounded-full font-bold">Cancel</button>
          <button onClick={() => onSave(data)} className="px-5 py-2 bg-amber-400 text-zinc-950 rounded-full font-black border border-zinc-900">Save Value</button>
        </div>
      </div>
    </div>
  );
}

// --- FOCUS EDITOR COMPONENT ---
function FocusEditorModal({
  foc,
  onClose,
  onSave,
}: {
  foc: FocusItem;
  onClose: () => void;
  onSave: (foc: FocusItem) => void;
}) {
  const [data, setData] = useState<FocusItem>({ ...foc });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-xs">
      <div className="bg-white border-2 border-zinc-900 rounded-3xl max-w-md w-full p-6 space-y-4 text-xs relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-zinc-100 rounded-full">
          ✕
        </button>
        <h3 className="font-black text-lg text-zinc-950 font-display">Edit Focus Area</h3>
        <div className="space-y-3">
          <div>
            <label className="font-mono font-bold block mb-1">Title</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl font-medium"
            />
          </div>
          <div>
            <label className="font-mono font-bold block mb-1">Description</label>
            <textarea
              rows={3}
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl font-medium resize-none"
            />
          </div>
        </div>
        <div className="pt-3 border-t border-zinc-200 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-zinc-100 rounded-full font-bold">Cancel</button>
          <button onClick={() => onSave(data)} className="px-5 py-2 bg-amber-400 text-zinc-950 rounded-full font-black border border-zinc-900">Save Focus</button>
        </div>
      </div>
    </div>
  );
}
