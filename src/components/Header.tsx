import React, { useState, useEffect } from 'react';
import { Menu, X, LogIn, LogOut, ShieldCheck, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  brandName: string;
  onOpenCustomizer: () => void;
  onOpenContact: () => void;
  onOpenAdminDashboard: () => void;
}

export function Header({
  brandName,
  onOpenCustomizer,
  onOpenContact,
  onOpenAdminDashboard,
}: HeaderProps) {
  const { user, signInWithGoogle, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signingIn, setSigningIn] = useState(false);

  const isAdmin =
    user &&
    (user.email === 'bhavyapradeep72@gmail.com' ||
      user.email === 'bhavyakothari.dev@gmail.com');

  const navItems = [
    { label: 'About', href: '#about', sectionId: 'about' },
    { label: 'Projects', href: '#projects', sectionId: 'projects' },
    { label: 'Stats', href: '#stats', sectionId: 'stats' },
    { label: 'Journey', href: '#journey', sectionId: 'journey' },
    { label: 'Skills', href: '#skills', sectionId: 'skills' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'stats', 'journey', 'skills', 'connect'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fbbd23]/95 backdrop-blur-md py-3 px-4 sm:px-8 md:px-12 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        
        {/* Left Badge: BK STUDENT */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-1.5 cursor-pointer select-none"
        >
          <div className="bg-white p-1 rounded-full border border-zinc-900 shadow-2xs flex items-center gap-1.5 pl-1.5 pr-3">
            <span className="bg-zinc-900 text-white font-black text-xs px-2 py-0.5 rounded-full font-mono">
              BK
            </span>
            <span className="text-[10px] font-extrabold uppercase bg-amber-400 text-zinc-900 px-2 py-0.5 rounded-full border border-zinc-900">
              STUDENT
            </span>
          </div>
        </a>

        {/* Floating Center Capsule Navbar */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-zinc-300 shadow-xs">
          {navItems.map((item) => {
            const isActive = activeSection === item.sectionId;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-amber-400 text-zinc-900 border border-zinc-900'
                    : 'text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                {item.label}
              </a>
            );
          })}

          <button
            onClick={onOpenContact}
            className="ml-1 px-4 py-1 rounded-full text-xs font-extrabold bg-zinc-900 text-white hover:bg-zinc-800 cursor-pointer transition-colors"
          >
            Contact
          </button>
        </nav>

        {/* Right Side Status Pills & Google Sign-In */}
        <div className="hidden sm:flex items-center gap-2">
          <a
            href="https://instagram.com/devwithbhavya"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-zinc-300 hover:border-zinc-900 text-xs font-bold text-zinc-900 transition-colors"
          >
            <span className="w-2 h-2 rounded-sm bg-rose-500" />
            <span>@devwithbhavya</span>
          </a>

          {user ? (
            <div className="flex items-center gap-2">
              {isAdmin && (
                <button
                  onClick={onOpenAdminDashboard}
                  className="bg-amber-400 hover:bg-amber-500 text-zinc-950 px-3.5 py-1.5 rounded-full border border-zinc-900 font-black text-xs transition-all shadow-2xs hover:-translate-y-0.5 flex items-center gap-1.5 cursor-pointer"
                  title="Open Admin Dashboard"
                >
                  <ShieldCheck className="w-4 h-4 text-zinc-950" />
                  <span>Admin Dashboard</span>
                </button>
              )}

              <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-zinc-900 shadow-2xs">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-5 h-5 rounded-full border border-zinc-900"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-amber-400 border border-zinc-900 flex items-center justify-center font-bold text-[10px]">
                    {user.displayName?.[0] || 'U'}
                  </div>
                )}
                <span className="text-xs font-extrabold text-zinc-900 truncate max-w-[100px]">
                  {user.displayName?.split(' ')[0] || 'User'}
                </span>
                <button
                  onClick={() => logout()}
                  className="p-1 text-zinc-500 hover:text-red-600 transition-colors cursor-pointer"
                  title="Sign Out"
                  aria-label="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={async () => {
                setSigningIn(true);
                try {
                  await signInWithGoogle();
                } catch (e) {
                  console.error(e);
                } finally {
                  setSigningIn(false);
                }
              }}
              disabled={signingIn}
              className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-white px-3.5 py-1.5 rounded-full border border-zinc-900 text-xs font-bold transition-all cursor-pointer shadow-2xs hover:-translate-y-0.5 disabled:opacity-50"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{signingIn ? 'Signing in...' : 'Sign in'}</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          {user ? (
            <img
              src={user.photoURL || ''}
              alt="Profile"
              className="w-7 h-7 rounded-full border border-zinc-900"
              referrerPolicy="no-referrer"
            />
          ) : null}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 bg-white rounded-full border border-zinc-900 text-zinc-900"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-white rounded-3xl border-2 border-zinc-900 p-4 space-y-3 shadow-xl animate-in slide-in-from-top-2">
          {/* Mobile Auth Button */}
          <div className="pt-1 pb-2 border-b border-zinc-200 space-y-2">
            {user ? (
              <>
                <div className="flex items-center justify-between bg-zinc-50 p-2.5 rounded-2xl border border-zinc-200">
                  <div className="flex items-center gap-2.5">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'User'}
                        className="w-8 h-8 rounded-full border border-zinc-900"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-amber-400 border border-zinc-900 flex items-center justify-center font-black text-xs">
                        {user.displayName?.[0] || 'U'}
                      </div>
                    )}
                    <div>
                      <div className="text-xs font-black text-zinc-900">{user.displayName}</div>
                      <div className="text-[10px] text-zinc-500 truncate max-w-[180px]">{user.email}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-full font-bold text-xs transition-colors flex items-center gap-1"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>Out</span>
                  </button>
                </div>

                {isAdmin && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAdminDashboard();
                    }}
                    className="w-full py-2.5 bg-amber-400 hover:bg-amber-500 text-zinc-950 font-black text-xs rounded-2xl border border-zinc-900 flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <ShieldCheck className="w-4 h-4 text-zinc-950" />
                    <span>Open Admin Dashboard</span>
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={async () => {
                  try {
                    await signInWithGoogle();
                    setMobileMenuOpen(false);
                  } catch (e) {
                    console.error(e);
                  }
                }}
                className="w-full py-2.5 bg-zinc-900 text-white font-extrabold text-xs rounded-2xl border border-zinc-900 flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Sign in with Google</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`p-2 rounded-xl text-xs font-extrabold text-center border ${
                  activeSection === item.sectionId
                    ? 'bg-amber-400 border-zinc-900 text-zinc-900'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-700'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            className="w-full py-2.5 bg-zinc-900 text-white font-black text-xs rounded-xl border border-zinc-900 text-center cursor-pointer"
          >
            Contact Me
          </button>
        </div>
      )}
    </header>
  );
}
