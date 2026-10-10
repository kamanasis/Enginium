import React from 'react';
import { Home, Compass, BookOpen, ShieldAlert, Activity, Scan } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'hud', label: 'Inspect', icon: Scan, isPrimary: true },
    { id: 'home', label: 'Home', icon: Home },
    { id: 'garage', label: 'Garage', icon: ShieldAlert },
    { id: 'diagnose', label: 'Guide', icon: Compass },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'acoustic', label: 'Sound', icon: Activity },
  ];

  return (
    <div className="preview-nav absolute bottom-5 left-3 right-3 h-16 flex items-center justify-around px-1 z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`preview-nav-item flex flex-col items-center justify-center flex-1 h-full py-1 relative transition-all duration-300 ${isActive ? 'is-active' : ''}`}
          >
            {isActive && (
              <span className="preview-nav-active-mark" />
            )}
            <Icon className="w-4 h-4 transition-transform duration-300" />
            <span className="text-[9px] mt-1 font-bold font-sans tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
