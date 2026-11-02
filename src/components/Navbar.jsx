import React from 'react';
import { Home, Compass, BookOpen, ShieldAlert, Activity, Scan, Users, User, Sparkles } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'landing', label: 'Landing', icon: Sparkles },
    { id: 'hud', label: 'Inspect', icon: Scan, isPrimary: true },
    { id: 'home', label: 'Home', icon: Home },
    { id: 'garage', label: 'Garage', icon: ShieldAlert },
    { id: 'diagnose', label: 'Guide', icon: Compass },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'acoustic', label: 'Sound', icon: Activity },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'profile', label: 'Settings', icon: User },
  ];

  return (
    <nav
      className="app-bottom-dock fixed bottom-0 left-0 right-0 h-16 flex items-center overflow-x-auto overscroll-x-contain px-2 z-50 bg-[#081510]/95 backdrop-blur-xl border-t border-[#29483a] shadow-[0_-8px_30px_rgba(0,0,0,0.6)] lg:hidden"
      aria-label="Mobile navigation"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id || (item.id === 'hud' && activeTab === 'scanner');
        return (
          <button
            type="button"
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            aria-current={isActive ? 'page' : undefined}
            className={`flex flex-col items-center justify-center flex-none min-w-[62px] flex-1 h-full py-1.5 relative transition-all duration-200 en-focus-ring ${
              isActive ? 'text-[#c7df9b]' : 'text-[#8fa395] hover:text-[#d0e5d5]'
            }`}
          >
            {isActive && (
              <span className="absolute top-1 w-6 h-0.5 bg-[#c7df9b] rounded-full" aria-hidden="true" />
            )}
            <Icon className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'scale-110 text-[#c7df9b]' : ''}`} aria-hidden="true" />
            <span className={`text-[10px] mt-1 font-semibold tracking-tight ${isActive ? 'font-bold text-white' : ''}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
