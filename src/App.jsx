import React, { useState, useEffect } from 'react';
import MobileFrame from './components/MobileFrame';
import Navbar from './components/Navbar';
import EngineBlueprintAnimation from './components/EngineBlueprintAnimation';
import EngineeringStation from './components/EngineeringStation';
import EngineeringBackdrop from './components/EngineeringBackdrop';
import HomeView from './views/HomeView';
import DiagnoseView from './views/DiagnoseView';
import LearnView from './views/LearnView';
import GarageView from './views/GarageView';
import CommunityView from './views/CommunityView';
import ScannerView from './views/ScannerView';
import HudDiagnosticsView from './views/HudDiagnosticsView';
import AcousticView from './views/AcousticView';
import ProfileView from './views/ProfileView';
import DesignBoardView from './views/DesignBoardView';
import { vehiclesData } from './data/vehicles';
import { 
  ShieldAlert, X, PhoneCall, Play, ChevronLeft, ChevronRight, 
  Layers, Monitor, Smartphone, LayoutGrid, AlertTriangle, Compass, 
  ChevronDown, Cpu, Activity, Zap, BookOpen, Users, User, ArrowRight, Scan
} from 'lucide-react';

export default function App() {
  // Viewport mode: 'website' (Full responsive desktop) | 'app' (Mobile phone frame) | 'flow' (Figma canvas)
  const [viewMode, setViewMode] = useState('website');

  // Navigation & Splash: HUD Diagnostics is the MAIN FLAGSHIP function
  const [showSplash, setShowSplash] = useState(false);
  const [activeTab, setActiveTab] = useState('hud');
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(vehiclesData[0]);

  // Lifted HomeView States
  const [showDropdown, setShowDropdown] = useState(false);

  // Lifted DiagnoseView States
  const [diagnoseInput, setDiagnoseInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [activeDiagnosis, setActiveDiagnosis] = useState(null);
  const [loading, setLoading] = useState(false);

  // Lifted LearnView States
  const [activeSegment, setActiveSegment] = useState('parts');
  const [selectedPart, setSelectedPart] = useState(vehiclesData[0].parts[0]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Lifted GarageView States
  const [showMilestoneForm, setShowMilestoneForm] = useState(false);

  // Lifted CommunityView States
  const [showAddTipForm, setShowAddTipForm] = useState(false);

  // Global state for logged DIY actions
  const [serviceHistory, setServiceHistory] = useState([
    { id: 1, title: 'Spark Plug cleaned & gap reset', desc: 'Electrode gap cleaned and adjusted to 0.7mm to resolve cold start lag.', date: '2026-08-12' }
  ]);

  const handleAddServiceRecord = (record) => {
    setServiceHistory([record, ...serviceHistory]);
  };

  const handleAddMilestone = (milestone) => {
    setSelectedVehicle(prev => ({
      ...prev,
      legacyMilestones: [milestone, ...(prev.legacyMilestones || [])]
    }));
  };

  // Nav items for desktop website navbar - HUD Diagnostics as Primary Flagship
  const desktopNavItems = [
    { id: 'hud', label: 'HUD Diagnostics', icon: Scan, isHero: true },
    { id: 'home', label: 'Dashboard', icon: Zap },
    { id: 'diagnose', label: 'AI Diagnostic', icon: Compass },
    { id: 'acoustic', label: 'Acoustic Sound AI', icon: Activity, alert: true },
    { id: 'garage', label: 'Garage Fleet', icon: ShieldAlert },
    { id: 'learn', label: 'Parts & Quiz', icon: BookOpen },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'profile', label: 'Profile & OBD-II', icon: User },
  ];

  // Render Inner Active Screen
  const renderActiveScreen = () => {
    if (showSplash) {
      return (
        <div className="flex-1 flex flex-col justify-center items-center text-center p-8 space-y-8 animate-fade-in relative z-25 min-h-[500px]">
          <div className="absolute top-1/3 w-48 h-48 border border-cyan-500/20 rounded-full flex items-center justify-center animate-pulse-slow">
            <div className="w-36 h-36 border border-cyan-400/30 rounded-full animate-ping"></div>
          </div>

          <div className="z-10 space-y-3">
            <span className="text-[10px] text-cyan-400 tracking-[0.25em] font-extrabold uppercase bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/30">
              DIGITAL MECHANIC PLATFORM
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mt-2">
              ENGIN<span className="text-cyan-400">IUM</span>
            </h1>
            <p className="text-xs md:text-sm text-zinc-400 max-w-[320px] mx-auto mt-1 leading-relaxed">
              Interactive diagnostics, parts manual, sound frequency analysis, and legacy documentation.
            </p>
          </div>

          <button
            onClick={() => setShowSplash(false)}
            className="z-10 bg-cyan-500 hover:bg-cyan-400 text-black rounded-2xl px-8 py-3.5 text-xs font-black tracking-widest uppercase transition-all duration-300 flex items-center gap-2 shadow-lg shadow-cyan-500/30 glow-cyan active:scale-95"
          >
            <Play className="w-4 h-4 fill-black" />
            GET STARTED
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <HomeView
            selectedVehicle={selectedVehicle}
            setSelectedVehicle={setSelectedVehicle}
            vehiclesList={vehiclesData}
            setActiveTab={setActiveTab}
            setDiagnoseInput={setDiagnoseInput}
            setEmergencyMode={setEmergencyMode}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
          />
        );
      case 'diagnose':
        return (
          <DiagnoseView
            selectedVehicle={selectedVehicle}
            diagnoseInput={diagnoseInput}
            setDiagnoseInput={setDiagnoseInput}
            onAddServiceRecord={handleAddServiceRecord}
            messages={messages}
            setMessages={setMessages}
            activeDiagnosis={activeDiagnosis}
            setActiveDiagnosis={setActiveDiagnosis}
            loading={loading}
            setLoading={setLoading}
          />
        );
      case 'acoustic':
        return (
          <AcousticView
            selectedVehicle={selectedVehicle}
            setActiveTab={setActiveTab}
            setDiagnoseInput={setDiagnoseInput}
          />
        );
      case 'hud':
      case 'scanner':
        return (
          <HudDiagnosticsView
            selectedVehicle={selectedVehicle}
            setActiveTab={setActiveTab}
            setDiagnoseInput={setDiagnoseInput}
          />
        );
      case 'learn':
        return (
          <LearnView
            selectedVehicle={selectedVehicle}
            activeSegment={activeSegment}
            setActiveSegment={setActiveSegment}
            selectedPart={selectedPart}
            setSelectedPart={setSelectedPart}
            selectedModule={selectedModule}
            setSelectedModule={setSelectedModule}
            showQuizResult={showQuizResult}
            setShowQuizResult={setShowQuizResult}
            quizIndex={quizIndex}
            setQuizIndex={setQuizIndex}
            quizScore={quizScore}
            setQuizScore={setQuizScore}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
          />
        );
      case 'garage':
        return (
          <GarageView
            selectedVehicle={selectedVehicle}
            serviceHistory={serviceHistory}
            onAddServiceRecord={handleAddServiceRecord}
            onAddMilestone={handleAddMilestone}
            showMilestoneForm={showMilestoneForm}
            setShowMilestoneForm={setShowMilestoneForm}
          />
        );
      case 'community':
        return (
          <CommunityView
            selectedVehicle={selectedVehicle}
            showAddForm={showAddTipForm}
            setShowAddForm={setShowAddTipForm}
          />
        );
      case 'profile':
        return (
          <ProfileView
            onTriggerEmergency={() => setEmergencyMode(true)}
          />
        );
      default:
        return null;
    }
  };

  // If user selected FIGMA FLOW BOARD MODE
  if (viewMode === 'flow') {
    return (
      <div className="h-screen flex flex-col bg-[#07080b]">
        {/* Floating Switcher Bar */}
        <div className="bg-[#12141a] border-b border-zinc-800 px-6 py-2.5 flex items-center justify-between text-xs z-50">
          <div className="flex items-center gap-2">
            <span className="font-black text-white tracking-widest text-sm flex items-center gap-1.5">
              <span className="text-cyan-400">ENGIN</span>IUM
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">/ Figma All-Screens Board</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('website')}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-bold border border-zinc-750 flex items-center gap-1.5 transition-colors"
            >
              <Monitor className="w-3.5 h-3.5 text-cyan-400" />
              Desktop Website Mode
            </button>
            <button
              onClick={() => setViewMode('app')}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-bold border border-zinc-750 flex items-center gap-1.5 transition-colors"
            >
              <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
              Mobile App Preview
            </button>
          </div>
        </div>

        <DesignBoardView
          selectedVehicle={selectedVehicle}
          setSelectedVehicle={setSelectedVehicle}
          vehiclesData={vehiclesData}
          onSelectScreen={(screenId) => {
            setActiveTab(screenId);
            setViewMode('website');
          }}
          onTriggerEmergency={() => setEmergencyMode(true)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white flex flex-col font-sans overflow-x-hidden selection:bg-cyan-500 selection:text-black relative isolate bg-[#070c14]">
      <EngineeringBackdrop />
      
      {/* ========================================================================= */}
      {/* GLOBAL TOP NAVIGATION BAR (For Website Mode & Viewport Switcher) */}
      {/* ========================================================================= */}
      <header className="bg-[#0a1018]/88 backdrop-blur-2xl border-b border-white/[0.08] sticky top-0 z-50 px-4 md:px-8 py-3.5 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { setShowSplash(false); setActiveTab('home'); }}
              className="flex items-center gap-2 text-left group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-300 via-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-black text-sm shadow-[0_8px_25px_rgba(34,211,238,0.22)] group-hover:scale-105 transition-transform">
                EN
              </div>
              <div>
                <h1 className="text-base font-black tracking-tight text-white flex items-center gap-0.5">
                  ENGIN<span className="text-cyan-400">IUM</span>
                </h1>
                <span className="text-[9px] font-mono tracking-[0.16em] text-zinc-500 uppercase block font-bold">
                  VEHICLE INTELLIGENCE SYSTEM
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links (Visible in Website Mode on md+) */}
          {viewMode === 'website' && (
            <nav className="hidden lg:flex items-center gap-1 bg-white/[0.035] border border-white/[0.08] rounded-2xl p-1 shadow-inner">
              {desktopNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { setShowSplash(false); setActiveTab(item.id); }}
                    className={`en-focus-ring px-3 py-2 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 relative ${
                      isActive 
                        ? (item.alert ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25') 
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                    {item.alert && !isActive && (
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    )}
                  </button>
                );
              })}
            </nav>
          )}

          {/* Right Controls: Active Vehicle, Telemetry Pill, Viewport Mode Switcher & SOS */}
          <div className="flex items-center gap-3">
            
            {/* Active Vehicle Picker Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="bg-[#161822] hover:bg-zinc-800 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs font-bold text-zinc-200 flex items-center gap-2 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                <span className="max-w-[120px] md:max-w-[160px] truncate">{selectedVehicle.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-72 bg-[#141620] border border-zinc-800 rounded-2xl shadow-2xl z-50 overflow-hidden divide-y divide-zinc-800/60 animate-fade-in">
                  <div className="p-2.5 bg-zinc-900/80 text-[10px] text-zinc-400 font-mono uppercase tracking-wider font-bold">
                    Switch Garage Machine
                  </div>
                  {vehiclesData.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        setSelectedVehicle(v);
                        setShowDropdown(false);
                      }}
                      className={`w-full text-left p-3 text-xs transition-colors flex items-center justify-between ${
                        selectedVehicle.id === v.id ? 'bg-cyan-500/10 text-cyan-400 font-bold' : 'text-zinc-300 hover:bg-zinc-800/50'
                      }`}
                    >
                      <div>
                        <p className="font-bold">{v.name}</p>
                        <p className="text-[10px] text-zinc-500 font-mono">{v.engine}</p>
                      </div>
                      <span className="text-[9px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-400 font-mono">{v.power}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Viewport Mode Switcher (Website / App / Figma Flow) */}
            <div className="flex bg-white/[0.035] border border-white/[0.08] rounded-xl p-1 text-xs">
              <button
                onClick={() => setViewMode('website')}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-colors ${
                  viewMode === 'website' ? 'bg-cyan-500 text-black' : 'text-zinc-400 hover:text-white'
                }`}
                title="Full Responsive Desktop Website"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Website</span>
              </button>

              <button
                onClick={() => setViewMode('app')}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-colors ${
                  viewMode === 'app' ? 'bg-cyan-500 text-black' : 'text-zinc-400 hover:text-white'
                }`}
                title="Mobile App Frame Preview"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">App</span>
              </button>

              <button
                onClick={() => setViewMode('flow')}
                className="px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
                title="Figma All-Screens Flow Canvas"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Figma Flow</span>
              </button>
            </div>

            {/* SOS Emergency Trigger Button */}
            <button
              onClick={() => setEmergencyMode(true)}
              className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/30 px-3 py-1.5 rounded-xl text-xs font-black tracking-wider uppercase transition-all flex items-center gap-1.5 glow-red"
              title="Emergency Breakdown Checklist & SOS"
            >
              <ShieldAlert className="w-4 h-4 animate-pulse" />
              <span className="hidden sm:inline font-mono">SOS</span>
            </button>

          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN CONTENT AREA */}
      {/* ========================================================================= */}
      {viewMode === 'website' ? (
        /* ======================== 1. FULL WEBSITE DESKTOP WORKSPACE ======================== */
        <main className="flex-1 max-w-[1440px] w-full mx-auto p-3 md:p-6 lg:p-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left / Center Workstation Column (65% width) */}
            <div className="lg:col-span-7 xl:col-span-8 en-panel rounded-[28px] overflow-hidden relative min-h-[720px] flex flex-col">
              
              {/* Animated Blueprint Background Layer */}
              <EngineBlueprintAnimation themeColor={activeTab === 'acoustic' ? '#EF4444' : '#06b6d4'} speed={0.015} />

              {/* View Header Tabs on Tablet/Mobile in Website Mode */}
              <div className="lg:hidden flex items-center gap-1 p-2 bg-[#141620] border-b border-zinc-800 overflow-x-auto scrollbar-none z-20">
                {desktopNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                      activeTab === item.id ? 'bg-cyan-500 text-black' : 'text-zinc-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Active Screen Content */}
              <div className="flex-1 flex flex-col relative z-10 overflow-y-auto">
                {renderActiveScreen()}
              </div>

            </div>

            {/* Right Desktop Station: Live Engine Blueprint & Telemetry (35% width) */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-4 sticky top-24">
              <div className="en-panel rounded-[28px] overflow-hidden h-[780px]">
                <EngineeringStation 
                  selectedVehicle={selectedVehicle} 
                  activeTab={activeTab} 
                />
              </div>
            </div>

          </div>
        </main>
      ) : (
        /* ======================== 2. MOBILE APP PREVIEW MODE ======================== */
        <main className="flex-1 flex items-center justify-center p-2 sm:p-6 bg-[#07080b] relative z-10">
          <MobileFrame>
            <div className="flex-1 flex flex-col relative bg-[#0e1017] select-none h-full overflow-hidden">
              
              {/* Background Wireframe Engine */}
              <EngineBlueprintAnimation themeColor={activeTab === 'acoustic' ? '#EF4444' : '#06b6d4'} speed={0.015} />

              {/* Screen Area */}
              <div className="flex-1 flex flex-col overflow-y-auto relative scrollbar-none pb-20 z-10">
                {renderActiveScreen()}
              </div>

              {/* Mobile Bottom Navigation Bar */}
              {!showSplash && <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />}

            </div>
          </MobileFrame>
        </main>
      )}

      {/* ========================================================================= */}
      {/* ROAD-ASSIST SOS EMERGENCY MODAL OVERLAY */}
      {/* ========================================================================= */}
      {emergencyMode && (
        <div className="fixed inset-0 bg-black/95 z-[999] flex flex-col p-6 text-white overflow-y-auto animate-fade-in font-sans backdrop-blur-xl">
          <div className="max-w-2xl w-full mx-auto my-auto space-y-6">
            
            {/* Header */}
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
                <h2 className="text-base font-black text-red-500 tracking-widest uppercase">ROAD-ASSIST EMERGENCY SOS</h2>
              </div>
              <button 
                onClick={() => setEmergencyMode(false)}
                className="w-9 h-9 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Warning Alert */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-3xl p-5 text-center space-y-2 shadow-2xl">
              <ShieldAlert className="w-10 h-10 text-red-500 mx-auto animate-bounce" />
              <h3 className="font-black text-base text-white">Emergency Breakdown Protocols Active</h3>
              <p className="text-xs text-zinc-300 max-w-md mx-auto">
                Pull over safely onto the road shoulder. Turn on hazard lamps. Put motorcycle on center stand.
              </p>
            </div>

            {/* Breakdown Checklists */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#161822] border border-zinc-800 p-4 rounded-2xl space-y-2">
                <h4 className="text-xs font-black text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  1. Engine Sudden Stall / No-Start
                </h4>
                <ul className="list-disc pl-5 text-[11px] text-zinc-400 space-y-1">
                  <li>Check kill switch is in 'RUN' mode.</li>
                  <li>Check fuel petcock (turn to RESERVE if low).</li>
                  <li>Inspect spark plug rubber boot for loose wire or water.</li>
                  <li>Verify side-stand safety sensor is fully up.</li>
                </ul>
              </div>

              <div className="bg-[#161822] border border-zinc-800 p-4 rounded-2xl space-y-2">
                <h4 className="text-xs font-black text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  2. Flat Tyre / Puncture
                </h4>
                <ul className="list-disc pl-5 text-[11px] text-zinc-400 space-y-1">
                  <li>Do NOT ride on flat tire; it bends the alloy rim.</li>
                  <li>Put vehicle on main/center stand immediately.</li>
                  <li>Locate nail/puncture point. Use plug kit if tubeless.</li>
                </ul>
              </div>
            </div>

            {/* Emergency Hotline Buttons */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Emergency Dialers</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a 
                  href="tel:1033"
                  className="bg-[#161822] border border-zinc-800 hover:border-red-500/50 p-4 rounded-2xl flex items-center justify-between text-xs transition-colors shadow-lg"
                >
                  <div className="flex items-center gap-2.5">
                    <PhoneCall className="w-4 h-4 text-red-500" />
                    <div>
                      <span className="font-bold text-white block">National Highway Helpline</span>
                      <span className="text-[10px] text-zinc-500">Toll-Free Roadside Support</span>
                    </div>
                  </div>
                  <span className="text-cyan-400 font-mono font-bold">1033</span>
                </a>

                <a 
                  href="tel:112"
                  className="bg-[#161822] border border-zinc-800 hover:border-red-500/50 p-4 rounded-2xl flex items-center justify-between text-xs transition-colors shadow-lg"
                >
                  <div className="flex items-center gap-2.5">
                    <PhoneCall className="w-4 h-4 text-red-500" />
                    <div>
                      <span className="font-bold text-white block">All-India Emergency Response</span>
                      <span className="text-[10px] text-zinc-500">Police, Ambulance, Fire</span>
                    </div>
                  </div>
                  <span className="text-cyan-400 font-mono font-bold">112</span>
                </a>
              </div>
            </div>

            <button 
              onClick={() => setEmergencyMode(false)}
              className="w-full bg-red-600 hover:bg-red-500 text-white py-3.5 rounded-2xl text-xs font-black tracking-widest uppercase transition-colors text-center shadow-lg shadow-red-600/30"
            >
              Exit Emergency Mode
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
