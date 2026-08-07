import React, { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from './lib/firebase';
import { defaultProfile } from './data/defaultProfile';
import { ProfileData, ProjectItem } from './types';
import { CustomCursor } from './components/CustomCursor';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { StatsSection } from './components/StatsSection';
import { JourneySection } from './components/JourneySection';
import { SkillsSection } from './components/SkillsSection';
import { ConnectSection } from './components/ConnectSection';
import { FooterSection } from './components/FooterSection';
import { ProjectModal } from './components/ProjectModal';
import { ContactModal } from './components/ContactModal';
import { ProfileCustomizer } from './components/ProfileCustomizer';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem('portfolio_profile_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultProfile,
          ...parsed,
          name: parsed.name === 'Randy Fahmi' || parsed.name === 'Bhavya Pradeep' ? 'Bhavya Kothari' : (parsed.name || defaultProfile.name),
          bio1: parsed.bio1?.replace(/Randy Fahmi|Bhavya Pradeep/g, 'Bhavya Kothari') || defaultProfile.bio1,
          email: parsed.email === 'randyfahmi902@gmail.com' || parsed.email === 'bhavyapradeep72@gmail.com' ? 'bhavyakothari.dev@gmail.com' : (parsed.email || defaultProfile.email),
          linkedin: parsed.linkedin === 'linkedin.com/in/randyfahmi' || parsed.linkedin === 'linkedin.com/in/bhavyapradeep' ? 'www.linkedin.com/in/bhavya-kothari-b62781401' : (parsed.linkedin || defaultProfile.linkedin),
          github: parsed.github === '@devwithbhavya' || !parsed.github ? 'https://github.com/BhavyaPro-7' : parsed.github,
          instagram: parsed.instagram || defaultProfile.instagram,
          whyBuildProjects: parsed.whyBuildProjects || defaultProfile.whyBuildProjects,
          learningPhilosophy: parsed.learningPhilosophy || defaultProfile.learningPhilosophy,
        };
      }
      return defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  const [currentView, setCurrentView] = useState<'home' | 'admin'>(() => {
    return window.location.hash === '#admin' || window.location.pathname === '/admin' ? 'admin' : 'home';
  });

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // Sync route view with hash URL
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Firestore Live Subscription
  useEffect(() => {
    const docRef = doc(db, 'content', 'profile');
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as ProfileData;
        setProfile((prev) => ({
          ...defaultProfile,
          ...prev,
          ...data,
        }));
      }
    }, (err) => {
      console.warn('Firestore subscription notice:', err.message);
    });

    return () => unsubscribe();
  }, []);

  const handleSaveProfile = async (newProfile: ProfileData) => {
    setProfile(newProfile);
    try {
      localStorage.setItem('portfolio_profile_data', JSON.stringify(newProfile));
    } catch (e) {
      console.error('Failed to save profile to local storage', e);
    }

    // Persist to Firestore as single source of truth
    try {
      const docRef = doc(db, 'content', 'profile');
      await setDoc(docRef, {
        ...newProfile,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
    } catch (err) {
      console.error('Failed to update Firestore profile document:', err);
      throw err;
    }
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToAdmin = () => {
    window.location.hash = '#admin';
    setCurrentView('admin');
  };

  const navigateToHome = () => {
    window.location.hash = '#home';
    setCurrentView('home');
  };

  // Render Admin Dashboard Page when currentView === 'admin'
  if (currentView === 'admin') {
    return (
      <>
        <CustomCursor />
        <AdminDashboard
          profile={profile}
          onSaveProfile={handleSaveProfile}
          onNavigateHome={navigateToHome}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbbd23] text-zinc-950 font-sans selection:bg-zinc-950 selection:text-white">
      <CustomCursor />
      {/* Top Navbar */}
      <Header
        brandName={profile.name}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenAdminDashboard={navigateToAdmin}
      />

      {/* Main Content Sections */}
      <main className="space-y-4 pb-12">
        {/* Hero Section */}
        <HeroSection
          brandName={profile.name}
          yearTag={profile.yearTag}
          onExploreClick={() => handleScrollToSection('projects')}
        />

        {/* About Section */}
        <AboutSection profile={profile} />

        {/* Featured Projects Grid */}
        <ProjectsSection
          profile={profile}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        {/* System Stats Console */}
        <StatsSection />

        {/* Journey Timeline */}
        <JourneySection
          profile={profile}
          onViewProjects={() => handleScrollToSection('projects')}
        />

        {/* Skills & Tech Stack */}
        <SkillsSection profile={profile} />

        {/* Let's Build Together / Connect */}
        <ConnectSection
          profile={profile}
          onOpenContactModal={() => setIsContactOpen(true)}
        />

        {/* Footer */}
        <FooterSection profile={profile} />
      </main>

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        recipientEmail={profile.email}
      />

      <ProfileCustomizer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
      />
    </div>
  );
}
