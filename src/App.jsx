import React, { useState } from 'react';
import MobileFrame from './components/MobileFrame';
import Navbar from './components/Navbar';
import EngineBlueprintAnimation from './components/EngineBlueprintAnimation';
import EngineeringBackdrop from './components/EngineeringBackdrop';
import HomeView from './views/HomeView';
import DiagnoseView from './views/DiagnoseView';
import LearnView from './views/LearnView';
import GarageView from './views/GarageView';
import CommunityView from './views/CommunityView';
import HudDiagnosticsView from './views/HudDiagnosticsView';
import AcousticView from './views/AcousticView';
import ProfileView from './views/ProfileView';
import DesignBoardView from './views/DesignBoardView';
import { vehiclesData } from './data/vehicles';
import {
  ShieldAlert, X, PhoneCall, Play, Monitor, Smartphone, LayoutGrid,
  Compass, ChevronDown, Activity, Zap, BookOpen, Users, User, Scan,
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
    { id: 'home', label: 'Overview', icon: Zap },
    { id: 'hud', label: 'Inspect vehicle', icon: Scan, isHero: true },
    { id: 'diagnose', label: 'Service guide', icon: Compass },
    { id: 'garage', label: 'Garage', icon: ShieldAlert },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'acoustic', label: 'Sound profile', icon: Activity },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'profile', label: 'Settings', icon: User },
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
            serviceHistory={serviceHistory}
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
            vehiclesList={vehiclesData}
            onSelectVehicle={setSelectedVehicle}
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
    <div className="app-shell min-h-screen text-white flex font-sans overflow-x-hidden selection:bg-lime-200 selection:text-[#173d30] relative isolate">
      <EngineeringBackdrop />
      {viewMode === 'website' ? (
        <>
          <aside className="app-sidebar">
            <button className="app-brand" type="button" onClick={() => { setShowSplash(false); setActiveTab('home'); }}>
              <span className="app-brand-mark">EN</span>
              <span><strong>ENGINIUM</strong><small>Vehicle care, made clear.</small></span>
            </button>
            <div className="app-sidebar-section">Workspace</div>
            <nav className="app-sidebar-nav" aria-label="Main navigation">
              {desktopNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return <button type="button" key={item.id} className={`app-sidebar-link ${isActive ? 'is-active' : ''}`} onClick={() => { setShowSplash(false); setActiveTab(item.id); }} aria-current={isActive ? 'page' : undefined}>
                  <Icon size={18} aria-hidden="true" /><span>{item.label}</span>{item.id === 'hud' ? <span className="app-sidebar-dot" /> : null}
                </button>;
              })}
            </nav>
            <div className="app-sidebar-bottom">
              <button type="button" className="app-sidebar-sos" onClick={() => setEmergencyMode(true)}><ShieldAlert size={17} /><span>Roadside help</span><small>SOS</small></button>
              <span className="app-sidebar-version">ENGINIUM / local preview</span>
            </div>
          </aside>
          <div className="app-main">
            <header className="app-topbar">
              <div className="app-mobile-brand"><span className="app-brand-mark">EN</span><strong>ENGINIUM</strong></div>
              <div className="app-topbar-context"><span className="app-topbar-label">Active profile</span><div className="relative">
                <button type="button" className="app-vehicle-picker" onClick={() => setShowDropdown(!showDropdown)} aria-expanded={showDropdown}><span className="app-live-dot" />{selectedVehicle.name}<ChevronDown size={16} /></button>
                {showDropdown ? <div className="app-vehicle-menu">
                  <div className="app-vehicle-menu-heading">Switch vehicle profile</div>
                  {vehiclesData.map((vehicle) => <button type="button" key={vehicle.id} className={selectedVehicle.id === vehicle.id ? 'is-selected' : ''} onClick={() => { setSelectedVehicle(vehicle); setShowDropdown(false); }}><span><strong>{vehicle.name}</strong><small>{vehicle.make} · {vehicle.type}</small></span><span>{vehicle.engine?.split(',')[0]}</span></button>)}
                </div> : null}
              </div></div>
              <div className="app-topbar-actions">
                <div className="app-mode-switcher" aria-label="Preview mode"><button type="button" onClick={() => setViewMode('website')} className={viewMode === 'website' ? 'is-active' : ''}><Monitor size={15} />Web</button><button type="button" onClick={() => setViewMode('app')}><Smartphone size={15} />App</button><button type="button" onClick={() => setViewMode('flow')}><LayoutGrid size={15} />Flow</button></div>
                <button type="button" className="app-topbar-help" onClick={() => setEmergencyMode(true)}><ShieldAlert size={17} /><span>Need help?</span></button>
              </div>
            </header>
            <main className="app-content">
              <div className="app-mobile-nav" aria-label="Mobile navigation">{desktopNavItems.slice(0, 6).map((item) => { const Icon = item.icon; return <button type="button" key={item.id} className={activeTab === item.id ? 'is-active' : ''} onClick={() => setActiveTab(item.id)}><Icon size={16} /><span>{item.label}</span></button>; })}</div>
              {renderActiveScreen()}
            </main>
          </div>
        </>
      ) : (
        <main className="app-preview-main">
          <MobileFrame><div className="app-preview-screen"><EngineBlueprintAnimation themeColor={activeTab === 'acoustic' ? '#EF4444' : '#245c46'} speed={0.015} /><div className="app-preview-content">{renderActiveScreen()}</div>{!showSplash && <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />}</div></MobileFrame>
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
