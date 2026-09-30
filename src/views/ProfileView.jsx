import React, { useState } from 'react';
import { User, ShieldAlert, Settings, Bell, HelpCircle, MapPin, PhoneCall, AlertOctagon, Compass } from 'lucide-react';

export default function ProfileView({ onTriggerEmergency }) {
  const [units, setUnits] = useState('metric');
  const [lang, setLang] = useState('english');
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="flex-1 flex flex-col p-4 pb-28 text-white space-y-6">
      
      {/* Profile Header */}
      <div className="flex items-center gap-4 bg-[#1A1A22] border border-zinc-800 p-4 rounded-2xl shadow-xl">
        <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center font-black text-accent text-xl border border-accent/30 shadow-lg">
          KA
        </div>
        <div>
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">ENGINIUM PILOT</span>
          <h3 className="text-base font-black text-zinc-100">Kamanasis</h3>
          <p className="text-xs text-zinc-400">kamanasis@enginium.app</p>
        </div>
      </div>

      {/* Emergency SOS Control Panel (Red Accent Only For Critical) */}
      <div className="bg-[#1A181C] border border-[#EF4444]/20 rounded-2xl p-4 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-[#EF4444]">
          <ShieldAlert className="w-5 h-5 animate-pulse" />
          <h4 className="text-xs font-black uppercase tracking-wider">Highway Assistance SOS</h4>
        </div>
        <p className="text-[11px] text-zinc-400 leading-normal">
          In case of sudden breakdown or critical incident, trigger the emergency mode to access quick checklists and hotlines.
        </p>
        
        <button 
          onClick={onTriggerEmergency}
          className="w-full bg-[#EF4444] hover:bg-[#DC2626] text-white py-3 rounded-xl text-xs font-black tracking-widest uppercase transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-500/10"
        >
          <AlertOctagon className="w-4 h-4 text-white" />
          Trigger SOS Mode
        </button>

        <div className="grid grid-cols-2 gap-2 text-xs pt-1">
          <a 
            href="tel:1033"
            className="bg-zinc-900 border border-zinc-850 p-2.5 rounded-lg flex flex-col items-center justify-center text-center gap-1 hover:border-zinc-700 transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-zinc-400" />
            <span className="font-bold text-[10px]">National Highway</span>
          </a>
          <button 
            onClick={() => alert("Current location copied to clipboard! (Demo MapPin)")}
            className="bg-zinc-900 border border-zinc-850 p-2.5 rounded-lg flex flex-col items-center justify-center text-center gap-1 hover:border-zinc-700 transition-colors"
          >
            <MapPin className="w-4 h-4 text-zinc-400" />
            <span className="font-bold text-[10px]">Share Location</span>
          </button>
        </div>
      </div>

      {/* Application Settings Form */}
      <div className="bg-[#1A1A22] border border-zinc-800 rounded-2xl p-4 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 border-b border-zinc-800/60 pb-2">
          <Settings className="w-4 h-4 text-accent" />
          <h4 className="text-xs font-black uppercase tracking-wider text-zinc-300">Preferences</h4>
        </div>

        <div className="space-y-3.5 text-xs">
          {/* Units Selection */}
          <div className="flex justify-between items-center">
            <span className="text-zinc-400">Measurement Units</span>
            <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
              <button 
                onClick={() => setUnits('metric')}
                className={`px-3 py-1 rounded text-[10px] font-bold transition-colors ${units === 'metric' ? 'bg-accent text-white' : 'text-zinc-500'}`}
              >
                Metric
              </button>
              <button 
                onClick={() => setUnits('imperial')}
                className={`px-3 py-1 rounded text-[10px] font-bold transition-colors ${units === 'imperial' ? 'bg-accent text-white' : 'text-zinc-500'}`}
              >
                Imperial
              </button>
            </div>
          </div>

          {/* Languages Selector */}
          <div className="flex justify-between items-center">
            <span className="text-zinc-400">Language</span>
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-[10px] text-zinc-300 font-bold focus:outline-none"
            >
              <option value="english">English</option>
              <option value="hindi">हिन्दी (Hindi)</option>
              <option value="bengali">বাংলা (Bengali)</option>
            </select>
          </div>

          {/* Notifications Toggle */}
          <div className="flex justify-between items-center">
            <span className="text-zinc-400">Push Notifications</span>
            <button 
              onClick={() => setNotifications(!notifications)}
              className={`w-10 h-5 rounded-full p-0.5 transition-colors ${notifications ? 'bg-accent' : 'bg-zinc-800'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${notifications ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Support & System Version */}
      <div className="bg-[#1A1A22] border border-zinc-800 rounded-2xl p-4 space-y-3 shadow-xl">
        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Support & Specs</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between text-zinc-400">
            <span>OBD-II Dongle Firmware</span>
            <span className="font-mono text-[10px] text-zinc-500">v2.4.1-demo</span>
          </div>
          <div className="flex items-center justify-between text-zinc-400">
            <span>App Version</span>
            <span className="font-mono text-[10px] text-zinc-500">ENGINIUM-1.0.0-MVP</span>
          </div>
        </div>
      </div>

    </div>
  );
}
