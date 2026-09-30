import React, { useState } from 'react';
import { Layers, ZoomIn, ZoomOut, Maximize2, ExternalLink, ChevronRight, Activity, Cpu, Compass, ShieldAlert } from 'lucide-react';
import HomeView from './HomeView';
import DiagnoseView from './DiagnoseView';
import ScannerView from './ScannerView';
import AcousticView from './AcousticView';
import GarageView from './GarageView';
import LearnView from './LearnView';
import ProfileView from './ProfileView';
import EngineBlueprintAnimation from '../components/EngineBlueprintAnimation';

export default function DesignBoardView({ 
  selectedVehicle, 
  setSelectedVehicle, 
  vehiclesData, 
  onSelectScreen, 
  onTriggerEmergency 
}) {
  const [scale, setScale] = useState(0.85);

  const screens = [
    { id: 'splash', num: '01', title: 'Brand Splash & Onboarding', category: 'Landing' },
    { id: 'home', num: '02', title: 'Main Machine Telemetry Dashboard', category: 'Dashboard' },
    { id: 'garage', num: '03', title: 'Digital Fleet Garage & Selection', category: 'Fleet' },
    { id: 'diagnose', num: '04', title: 'Conversational AI Mechanic Chat', category: 'Diagnostics' },
    { id: 'scanner', num: '05', title: '3D Wireframe AR Scanner HUD', category: 'AR Scanner' },
    { id: 'acoustic', num: '06', title: 'Acoustic Sound Diagnostic (Red Ring)', category: 'Sound AI' },
    { id: 'learn-parts', num: '07', title: 'Exploded Engine Parts Index', category: 'Parts Manual' },
    { id: 'learn-quiz', num: '08', title: 'Interactive Mechanical Knowledge Quiz', category: 'Education' },
    { id: 'sos', num: '09', title: 'Road-Assist Emergency Checklist & SOS', category: 'Emergency' },
    { id: 'profile', num: '10', title: 'OBD-II Dongle & User Profile', category: 'Settings' }
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-[#07080b] overflow-hidden select-none">
      
      {/* Board Top Control Bar */}
      <div className="bg-[#11131a] border-b border-zinc-800 px-6 py-3 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <h2 className="text-xs font-black tracking-widest text-white uppercase flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            ENGINIUM FIGMA DESIGN FLOW BOARD
          </h2>
          <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded font-mono">
            {screens.length} Screens + 3 Engine Schematics
          </span>
        </div>

        {/* Zoom & View Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setScale(prev => Math.max(0.6, prev - 0.1))}
            className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-xs"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono text-zinc-400 w-12 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => setScale(prev => Math.min(1.2, prev + 0.1))}
            className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-xs"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setScale(0.85)}
            className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white text-[10px] font-mono"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Figma Artboard Canvas */}
      <div className="flex-1 overflow-x-auto overflow-y-auto p-8 bg-[#0a0b0e] bg-blueprint scrollbar-thin">
        <div 
          className="flex items-start gap-10 min-w-max transition-transform duration-200 origin-top-left"
          style={{ transform: `scale(${scale})` }}
        >

          {/* SCREEN 1: Splash / Onboarding */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between text-xs px-2">
              <span className="font-mono text-cyan-400 font-bold">01. SPLASH</span>
              <button 
                onClick={() => onSelectScreen('home')}
                className="text-[10px] text-zinc-400 hover:text-cyan-400 flex items-center gap-1 font-bold"
              >
                Open <ExternalLink className="w-3 h-3" />
              </button>
            </div>
            <div className="w-[380px] h-[780px] bg-[#12141a] rounded-[42px] border-4 border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col relative">
              <EngineBlueprintAnimation themeColor="#06b6d4" speed={0.015} />
              <div className="flex-1 flex flex-col justify-center items-center text-center p-8 space-y-6 z-10">
                <span className="text-[10px] text-cyan-400 tracking-[0.25em] font-extrabold uppercase bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
                  DIGITAL MECHANIC PLATFORM
                </span>
                <h1 className="text-4xl font-black tracking-tight text-white">
                  ENGIN<span className="text-cyan-400">IUM</span>
                </h1>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-[260px]">
                  Interactive diagnostics, parts manual, and legacy documentation for single cylinder vehicles.
                </p>
                <button
                  onClick={() => onSelectScreen('home')}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black rounded-2xl px-8 py-3.5 text-xs font-black tracking-widest uppercase transition-all shadow-lg shadow-cyan-500/25 glow-cyan"
                >
                  GET STARTED
                </button>
              </div>
            </div>
          </div>

          {/* SCREEN 2: Home Dashboard */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between text-xs px-2">
              <span className="font-mono text-cyan-400 font-bold">02. DASHBOARD</span>
              <button 
                onClick={() => onSelectScreen('home')}
                className="text-[10px] text-zinc-400 hover:text-cyan-400 flex items-center gap-1 font-bold"
              >
                Open <ExternalLink className="w-3 h-3" />
              </button>
            </div>
            <div className="w-[380px] h-[780px] bg-[#12141a] rounded-[42px] border-4 border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-y-auto scrollbar-none relative">
              <HomeView
                selectedVehicle={selectedVehicle}
                setSelectedVehicle={setSelectedVehicle}
                vehiclesList={vehiclesData}
                setActiveTab={onSelectScreen}
                setDiagnoseInput={() => {}}
                setEmergencyMode={onTriggerEmergency}
                showDropdown={false}
                setShowDropdown={() => {}}
              />
            </div>
          </div>

          {/* SCREEN 3: Garage Fleet */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between text-xs px-2">
              <span className="font-mono text-cyan-400 font-bold">03. GARAGE FLEET</span>
              <button 
                onClick={() => onSelectScreen('garage')}
                className="text-[10px] text-zinc-400 hover:text-cyan-400 flex items-center gap-1 font-bold"
              >
                Open <ExternalLink className="w-3 h-3" />
              </button>
            </div>
            <div className="w-[380px] h-[780px] bg-[#12141a] rounded-[42px] border-4 border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-y-auto scrollbar-none relative">
              <GarageView
                selectedVehicle={selectedVehicle}
                serviceHistory={[]}
                onAddServiceRecord={() => {}}
                onAddMilestone={() => {}}
                showMilestoneForm={false}
                setShowMilestoneForm={() => {}}
              />
            </div>
          </div>

          {/* SCREEN 4: AI Diagnostic Chat */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between text-xs px-2">
              <span className="font-mono text-cyan-400 font-bold">04. AI DIAGNOSTIC</span>
              <button 
                onClick={() => onSelectScreen('diagnose')}
                className="text-[10px] text-zinc-400 hover:text-cyan-400 flex items-center gap-1 font-bold"
              >
                Open <ExternalLink className="w-3 h-3" />
              </button>
            </div>
            <div className="w-[380px] h-[780px] bg-[#12141a] rounded-[42px] border-4 border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-y-auto scrollbar-none relative">
              <DiagnoseView
                selectedVehicle={selectedVehicle}
                diagnoseInput=""
                setDiagnoseInput={() => {}}
                onAddServiceRecord={() => {}}
                messages={[
                  { id: 1, sender: 'ai', text: "Hello! I am your AI Diagnostic Mechanic for the Hero Splendor Plus. What symptoms are you noticing?" },
                  { id: 2, sender: 'user', text: "I hear a metallic clanking noise near the chain and downshifting feels jerky." },
                  { id: 3, sender: 'ai', text: "Detected Symptom: Loose / Worn Drive Chain. Slack is likely over 35mm. I recommend inspecting chain free-play and tightening axle nuts." }
                ]}
                setMessages={() => {}}
                activeDiagnosis={selectedVehicle.symptomMap['chain-noise']}
                setActiveDiagnosis={() => {}}
                loading={false}
                setLoading={() => {}}
              />
            </div>
          </div>

          {/* SCREEN 5: 3D Wireframe Scanner HUD */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between text-xs px-2">
              <span className="font-mono text-cyan-400 font-bold">05. WIREFRAME HUD</span>
              <button 
                onClick={() => onSelectScreen('scanner')}
                className="text-[10px] text-zinc-400 hover:text-cyan-400 flex items-center gap-1 font-bold"
              >
                Open <ExternalLink className="w-3 h-3" />
              </button>
            </div>
            <div className="w-[380px] h-[780px] bg-[#12141a] rounded-[42px] border-4 border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-y-auto scrollbar-none relative">
              <ScannerView
                selectedVehicle={selectedVehicle}
                setActiveTab={onSelectScreen}
                setDiagnoseInput={() => {}}
              />
            </div>
          </div>

          {/* SCREEN 6: Acoustic AI Sound Diagnostic (The Red Circle Screen!) */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between text-xs px-2">
              <span className="font-mono text-red-400 font-bold">06. ACOUSTIC SOUND AI</span>
              <button 
                onClick={() => onSelectScreen('acoustic')}
                className="text-[10px] text-zinc-400 hover:text-red-400 flex items-center gap-1 font-bold"
              >
                Open <ExternalLink className="w-3 h-3" />
              </button>
            </div>
            <div className="w-[380px] h-[780px] bg-[#12141a] rounded-[42px] border-4 border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-y-auto scrollbar-none relative">
              <AcousticView
                selectedVehicle={selectedVehicle}
                setActiveTab={onSelectScreen}
                setDiagnoseInput={() => {}}
              />
            </div>
          </div>

          {/* SCREEN 7: Exploded Engine Parts & Manual */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between text-xs px-2">
              <span className="font-mono text-cyan-400 font-bold">07. PARTS MANUAL</span>
              <button 
                onClick={() => onSelectScreen('learn')}
                className="text-[10px] text-zinc-400 hover:text-cyan-400 flex items-center gap-1 font-bold"
              >
                Open <ExternalLink className="w-3 h-3" />
              </button>
            </div>
            <div className="w-[380px] h-[780px] bg-[#12141a] rounded-[42px] border-4 border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-y-auto scrollbar-none relative">
              <LearnView
                selectedVehicle={selectedVehicle}
                activeSegment="parts"
                setActiveSegment={() => {}}
                selectedPart={selectedVehicle.parts[0]}
                setSelectedPart={() => {}}
                selectedModule={null}
                setSelectedModule={() => {}}
                showQuizResult={false}
                setShowQuizResult={() => {}}
                quizIndex={0}
                setQuizIndex={() => {}}
                quizScore={0}
                setQuizScore={() => {}}
                selectedAnswer={null}
                setSelectedAnswer={() => {}}
              />
            </div>
          </div>

          {/* SCREEN 8: Interactive Mechanical Quiz */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between text-xs px-2">
              <span className="font-mono text-cyan-400 font-bold">08. QUIZ & ACADEMY</span>
              <button 
                onClick={() => onSelectScreen('learn')}
                className="text-[10px] text-zinc-400 hover:text-cyan-400 flex items-center gap-1 font-bold"
              >
                Open <ExternalLink className="w-3 h-3" />
              </button>
            </div>
            <div className="w-[380px] h-[780px] bg-[#12141a] rounded-[42px] border-4 border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-y-auto scrollbar-none relative">
              <LearnView
                selectedVehicle={selectedVehicle}
                activeSegment="educational"
                setActiveSegment={() => {}}
                selectedPart={selectedVehicle.parts[0]}
                setSelectedPart={() => {}}
                selectedModule={{
                  id: "engine",
                  title: "Engine Basics (4-Stroke)",
                  desc: "Learn about Piston, Cylinder head, Valves, and the Otto cycle.",
                  progress: 80,
                  quizzes: [
                    {
                      question: "What are the four strokes of a motorcycle engine in sequence?",
                      options: [
                        "Intake, Compression, Power, Exhaust",
                        "Ignition, Combustion, Speed, Rebound",
                        "Inlet, Spark, Drive, Cleanup"
                      ],
                      correct: 0
                    }
                  ]
                }}
                setSelectedModule={() => {}}
                showQuizResult={false}
                setShowQuizResult={() => {}}
                quizIndex={0}
                setQuizIndex={() => {}}
                quizScore={1}
                setQuizScore={() => {}}
                selectedAnswer={0}
                setSelectedAnswer={() => {}}
              />
            </div>
          </div>

          {/* SCREEN 9: Profile & OBD-II */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between text-xs px-2">
              <span className="font-mono text-cyan-400 font-bold">09. PROFILE & OBD-II</span>
              <button 
                onClick={() => onSelectScreen('profile')}
                className="text-[10px] text-zinc-400 hover:text-cyan-400 flex items-center gap-1 font-bold"
              >
                Open <ExternalLink className="w-3 h-3" />
              </button>
            </div>
            <div className="w-[380px] h-[780px] bg-[#12141a] rounded-[42px] border-4 border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-y-auto scrollbar-none relative">
              <ProfileView onTriggerEmergency={onTriggerEmergency} />
            </div>
          </div>

          {/* RIGHT SIDE: LARGE ENGINE BLUEPRINT SCHEMATICS (Matching the right side of Figma image!) */}
          <div className="flex flex-col space-y-3 border-l-2 border-zinc-800/80 pl-8">
            <div className="flex items-center justify-between text-xs px-2">
              <span className="font-mono text-cyan-400 font-bold">CYAN SCHEMATIC</span>
              <span className="text-[10px] text-zinc-500 font-mono">FIGMA SPEC CANVAS</span>
            </div>
            <div className="w-[420px] h-[780px] bg-[#0c0e14] rounded-[42px] border-4 border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.2)] overflow-hidden relative flex flex-col p-6">
              <div className="text-center z-10 space-y-1">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-black">BLUEPRINT HUD - CYAN</span>
                <h3 className="text-sm font-black text-white">4-CYCLE SINGLE CYLINDER</h3>
              </div>
              <EngineBlueprintAnimation themeColor="#06b6d4" speed={0.015} />
              <div className="mt-auto z-10 bg-black/60 backdrop-blur-md p-3.5 rounded-2xl border border-cyan-500/20 text-xs font-mono text-cyan-300 space-y-1">
                <div className="flex justify-between"><span>BORE:</span><span>52.4 MM</span></div>
                <div className="flex justify-between"><span>STROKE:</span><span>57.8 MM</span></div>
                <div className="flex justify-between"><span>RATIO:</span><span>9.2:1</span></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between text-xs px-2">
              <span className="font-mono text-red-400 font-bold">RED SCHEMATIC</span>
              <span className="text-[10px] text-zinc-500 font-mono">THERMAL ALERT SPEC</span>
            </div>
            <div className="w-[420px] h-[780px] bg-[#0c0e14] rounded-[42px] border-4 border-red-500/30 shadow-[0_0_40px_rgba(239,68,68,0.2)] overflow-hidden relative flex flex-col p-6">
              <div className="text-center z-10 space-y-1">
                <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest font-black">BLUEPRINT HUD - RED</span>
                <h3 className="text-sm font-black text-white">THERMAL DYNAMICS</h3>
              </div>
              <EngineBlueprintAnimation themeColor="#ef4444" speed={0.02} />
              <div className="mt-auto z-10 bg-black/60 backdrop-blur-md p-3.5 rounded-2xl border border-red-500/20 text-xs font-mono text-red-300 space-y-1">
                <div className="flex justify-between"><span>SUMP TEMP:</span><span>108° C</span></div>
                <div className="flex justify-between"><span>EXHAUST GAS:</span><span>420° C</span></div>
                <div className="flex justify-between"><span>STATUS:</span><span>WARNING</span></div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
