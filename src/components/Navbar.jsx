import React from 'react';
import { Home, Compass, BookOpen, ShieldAlert, User, Activity, Scan } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'hud', label: 'HUD Diag', icon: Scan, isPrimary: true },
    { id: 'home', label: 'Home', icon: Home },
    { id: 'garage', label: 'Garage', icon: ShieldAlert },
    { id: 'diagnose', label: 'AI Coach', icon: Compass },
    { id: 'acoustic', label: 'Acoustic', icon: Activity },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="absolute bottom-5 left-3 right-3 h-16 bg-[#12141a]/95 backdrop-blur-xl rounded-2xl border border-zinc-800/80 shadow-[0_8px_32px_rgba(0,0,0,0.6)] flex items-center justify-around px-1 z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full py-1 relative transition-all duration-300 ${
              isActive 
                ? (item.id === 'acoustic' ? 'text-red-400' : 'text-cyan-400') 
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {isActive && (
              <span className={`absolute -top-1 w-6 h-1 rounded-full animate-pulse ${
                item.id === 'acoustic' ? 'bg-red-500 shadow-[0_0_12px_#ef4444]' : 'bg-cyan-400 shadow-[0_0_12px_#06b6d4]'
              }`}></span>
            )}
            <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'scale-115' : 'scale-100'}`} />
            <span className="text-[9px] mt-1 font-bold font-sans tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
