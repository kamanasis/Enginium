import React from 'react';
import { Shield, ChevronRight, Zap, Cpu, Search, BookOpen, AlertTriangle } from 'lucide-react';

export default function HomeView({ 
  selectedVehicle, 
  setSelectedVehicle, 
  vehiclesList, 
  setActiveTab, 
  setDiagnoseInput, 
  setEmergencyMode, 
  showDropdown, 
  setShowDropdown 
}) {
  const odometer = selectedVehicle.id === 'splendor' ? '42,850 km' : 
                   selectedVehicle.id === 'activa' ? '18,210 km' : 
                   selectedVehicle.id === 'pulsar' ? '28,900 km' : '42,912 km';

  return (
    <div className="flex-1 flex flex-col p-4 pb-28 text-white space-y-5">
      
      {/* Greetings & Avatar Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center font-black text-cyan-400 text-sm border border-cyan-500/30">
            KA
          </div>
          <div>
            <h4 className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">Namaste, Kamanasis</h4>
            <p className="text-xs text-zinc-300 font-bold">Let's check your ride</p>
          </div>
        </div>
        
        {/* Active vehicle dropdown trigger */}
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-[#1A1A22] border border-zinc-800 rounded-xl px-3 py-1.5 text-xs font-bold text-zinc-200 hover:text-white flex items-center gap-1 transition-colors"
          >
            {selectedVehicle.name}
            <ChevronRight className={`w-3.5 h-3.5 transform transition-transform ${showDropdown ? 'rotate-90' : ''}`} />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-60 bg-[#1A1A22] border border-zinc-800 rounded-xl shadow-2xl z-50 overflow-hidden divide-y divide-zinc-800/50 animate-fade-in">
              {vehiclesList.map((v) => (
                <button
                  key={v.id}
                  onClick={() => {
                    setSelectedVehicle(v);
                    setShowDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-xs transition-colors flex items-center justify-between ${
                    selectedVehicle.id === v.id ? 'bg-cyan-500/10 text-cyan-400 font-bold' : 'text-zinc-300 hover:bg-zinc-800/40'
                  }`}
                >
                  <div>
                    <p className="font-semibold">{v.name}</p>
                    <p className="text-[9px] text-zinc-500">{v.engine}</p>
                  </div>
                  <span className="text-[9px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-400 font-mono">{v.type}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Vehicle Health Card */}
      <div className="bg-gradient-to-br from-[#14141B] to-[#0F0F12] border border-zinc-800 rounded-3xl p-5 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full filter blur-xl"></div>
        
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-black block">Active Machine</span>
            <h3 className="text-lg font-black text-zinc-100">{selectedVehicle.name}</h3>
            <p className="text-xs text-zinc-400 font-medium">{selectedVehicle.make} • {odometer}</p>
          </div>
          
          {/* Health circular score */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-95" viewBox="0 0 36 36">
                <path
                  className="text-zinc-800"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-cyan-500 transition-all duration-500"
                  strokeDasharray="87, 100"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-sm font-black text-white">87%</span>
                <span className="text-[7px] text-zinc-500 font-bold uppercase tracking-wider">Health</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic heart rate style details */}
        <div className="mt-4 pt-3.5 border-t border-zinc-800/80 flex items-center justify-between text-[10px] text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="font-bold text-cyan-400">OBD Diagnostics Linked</span>
          </div>
          <button 
            onClick={() => setActiveTab('hud')} 
            className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-0.5"
          >
            Open HUD Diagnostics <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Maintenance Warning Card (Teal & Amber custom border highlight) */}
      <button 
        onClick={() => setActiveTab('garage')}
        className="w-full bg-[#1A1812] border border-yellow-500/20 rounded-2xl p-4 flex items-center justify-between hover:border-yellow-500/40 transition-colors shadow-lg text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-400 border border-yellow-500/20 shrink-0">
            <AlertTriangle className="w-4.5 h-4.5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-yellow-400 uppercase tracking-wide">Oil replacement due soon</h4>
            <p className="text-[10px] text-zinc-400 leading-normal mt-0.5">Engine oil replacement recommended in next 80 km.</p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-yellow-400" />
      </button>

      {/* Features Action Grid */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Main Diagnostic Tools</h4>
        <div className="grid grid-cols-2 gap-3">
          {/* 1. AI Mechanic */}
          <button 
            onClick={() => setActiveTab('diagnose')}
            className="bg-[#14141B] border border-zinc-800 hover:border-cyan-500/50 p-4 rounded-2xl text-left transition-all hover:-translate-y-0.5 flex flex-col justify-between h-28 shadow-lg group"
          >
            <div className="w-8 h-8 bg-cyan-500/10 text-cyan-400 rounded-lg flex items-center justify-center border border-cyan-500/20 group-hover:scale-110 transition-transform">
              <Zap className="w-4.5 h-4.5" />
            </div>
            <div>
              <h5 className="font-bold text-xs text-zinc-200">AI Diagnostic Chat</h5>
              <p className="text-[9px] text-zinc-500 mt-0.5">Diagnose symptoms & codes</p>
            </div>
          </button>

          {/* 2. Acoustic Sound AI (The Red Circle Screen in Design!) */}
          <button 
            onClick={() => setActiveTab('acoustic')}
            className="bg-[#14141B] border border-zinc-800 hover:border-red-500/50 p-4 rounded-2xl text-left transition-all hover:-translate-y-0.5 flex flex-col justify-between h-28 shadow-lg group relative overflow-hidden"
          >
            <div className="w-8 h-8 bg-red-500/10 text-red-400 rounded-lg flex items-center justify-center border border-red-500/20 group-hover:scale-110 transition-transform">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping absolute"></span>
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <h5 className="font-bold text-xs text-zinc-200">Acoustic Sound AI</h5>
                <span className="text-[8px] bg-red-500/20 text-red-400 px-1 rounded font-mono font-bold">FFT</span>
              </div>
              <p className="text-[9px] text-zinc-500 mt-0.5">Listen to engine frequencies</p>
            </div>
          </button>

          {/* 3. Primary HUD Diagnostics */}
          <button 
            onClick={() => setActiveTab('hud')}
            className="bg-[#14141B] border border-cyan-500/40 hover:border-cyan-400 p-4 rounded-2xl text-left transition-all hover:-translate-y-0.5 flex flex-col justify-between h-28 shadow-lg shadow-cyan-500/10 group relative overflow-hidden"
          >
            <div className="w-8 h-8 bg-cyan-500/10 text-cyan-400 rounded-lg flex items-center justify-center border border-cyan-500/20 group-hover:scale-110 transition-transform">
              <Cpu className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <h5 className="font-bold text-xs text-white">HUD Diagnostics</h5>
                <span className="text-[8px] bg-cyan-500/20 text-cyan-400 px-1 rounded font-mono font-bold">CORE</span>
              </div>
              <p className="text-[9px] text-zinc-500 mt-0.5">Wireframe grid telemetry</p>
            </div>
          </button>

          {/* 4. Parts & Learn */}
          <button 
            onClick={() => { setActiveTab('learn'); }}
            className="bg-[#14141B] border border-zinc-800 hover:border-cyan-500/50 p-4 rounded-2xl text-left transition-all hover:-translate-y-0.5 flex flex-col justify-between h-28 shadow-lg group"
          >
            <div className="w-8 h-8 bg-cyan-500/10 text-cyan-400 rounded-lg flex items-center justify-center border border-cyan-500/20 group-hover:scale-110 transition-transform">
              <BookOpen className="w-4.5 h-4.5" />
            </div>
            <div>
              <h5 className="font-bold text-xs text-zinc-200">DIY Manual & Quiz</h5>
              <p className="text-[9px] text-zinc-500 mt-0.5">Step-by-step guides</p>
            </div>
          </button>
        </div>
      </div>

      {/* Emergency Roadside SOS Button */}
      <button 
        onClick={() => setEmergencyMode(true)}
        className="w-full bg-red-600/10 hover:bg-red-600/15 border border-red-500/25 p-3.5 rounded-2xl flex items-center justify-between text-left transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping shrink-0"></span>
          <span className="text-xs font-black text-red-400 uppercase tracking-wider">Highway Breakdown SOS</span>
        </div>
        <ChevronRight className="w-4 h-4 text-red-400" />
      </button>

    </div>
  );
}
