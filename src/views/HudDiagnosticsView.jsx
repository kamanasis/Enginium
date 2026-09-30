import React, { useState } from 'react';
import { Wrench, Droplets, Disc, RefreshCw, Zap, ShieldCheck, AlertTriangle, Cpu, CheckCircle2, ChevronRight, Activity, Scan, Radio } from 'lucide-react';

export default function HudDiagnosticsView({ selectedVehicle, setActiveTab, setDiagnoseInput }) {
  const [selectedHotspot, setSelectedHotspot] = useState('engine');
  const [isScanning, setIsScanning] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const hotspots = {
    engine: {
      id: 'engine',
      title: 'Engine: Inspect Oil',
      label: 'Engine: Inspect Oil',
      status: 'Warning',
      color: 'yellow',
      ringColor: '#eab308',
      borderColor: 'border-yellow-400',
      textColor: 'text-yellow-400',
      glowShadow: 'shadow-[0_0_15px_rgba(234,179,8,0.4)]',
      telemetry: 'Viscosity degraded. Sludge index high. Service due in 80 km.',
      position: { top: '44%', left: '40%' },
      specs: [
        { label: 'Oil Life', value: '12%' },
        { label: 'Viscosity', value: '10W-30 Low' },
        { label: 'Sump Temp', value: '94°C' }
      ]
    },
    brakes: {
      id: 'brakes',
      title: 'Brakes: 92%',
      label: 'Brakes: 92%',
      status: 'Optimal',
      color: 'cyan',
      ringColor: '#06b6d4',
      borderColor: 'border-cyan-400',
      textColor: 'text-cyan-400',
      glowShadow: 'shadow-[0_0_15px_rgba(6,182,212,0.4)]',
      telemetry: 'Hydraulic pressure 120 psi. Disc pad wear 12%. No moisture detected.',
      position: { top: '53%', left: '16%' },
      specs: [
        { label: 'Health', value: '92%' },
        { label: 'Pad Wear', value: '12%' },
        { label: 'Pressure', value: '120 PSI' }
      ]
    },
    handlebar: {
      id: 'handlebar',
      title: 'Console & Electrical Switchgear',
      label: 'Controls: 98%',
      status: 'Optimal',
      color: 'yellow',
      ringColor: '#eab308',
      borderColor: 'border-yellow-400',
      textColor: 'text-yellow-400',
      glowShadow: 'shadow-[0_0_15px_rgba(234,179,8,0.4)]',
      telemetry: 'Kill switch, clutch switch, and throttle position sensor (TPS) 0.5V - 4.5V normal.',
      position: { top: '28%', left: '49%' },
      specs: [
        { label: 'TPS Volts', value: '0.85 V' },
        { label: 'CAN-Bus', value: 'Synced' },
        { label: 'Switchgear', value: 'OK' }
      ]
    },
    spark: {
      id: 'spark',
      title: 'Ignition & Spark Plug',
      label: 'Spark: Clean',
      status: 'Optimal',
      color: 'cyan',
      ringColor: '#06b6d4',
      borderColor: 'border-cyan-400',
      textColor: 'text-cyan-400',
      glowShadow: 'shadow-[0_0_15px_rgba(6,182,212,0.4)]',
      telemetry: 'Electrode gap 0.72mm. Spark discharge arc 18 kV nominal. Combustion clean.',
      position: { top: '48%', left: '48%' },
      specs: [
        { label: 'Gap', value: '0.72 mm' },
        { label: 'Arc Volt', value: '18 kV' },
        { label: 'Timing', value: '10° BTDC' }
      ]
    },
    chain: {
      id: 'chain',
      title: 'Drive Chain Slack',
      label: 'Chain: 38mm Slack',
      status: 'Warning',
      color: 'yellow',
      ringColor: '#eab308',
      borderColor: 'border-yellow-400',
      textColor: 'text-yellow-400',
      glowShadow: 'shadow-[0_0_15px_rgba(234,179,8,0.4)]',
      telemetry: 'Vertical free-play slack measured 38mm. Recommended tension 25-30mm.',
      position: { top: '64%', left: '26%' },
      specs: [
        { label: 'Slack', value: '38 mm' },
        { label: 'Target', value: '25-30 mm' },
        { label: 'Wear', value: '18%' }
      ]
    }
  };

  const subsystems = [
    {
      id: 'powertrain',
      title: 'Powertrain Spark Combustion',
      desc: 'Ignition timing and cylinder head pressure clean.',
      status: 'Optimal',
      statusColor: 'text-cyan-400',
      badgeBg: 'bg-cyan-500/10 border-cyan-500/30',
      icon: Wrench,
      iconBg: 'bg-teal-950/80 border-teal-500/30 text-teal-400',
      hotspotKey: 'spark'
    },
    {
      id: 'lubrication',
      title: 'Engine Oil Quality & Level',
      desc: 'Viscosity low. Sump replacement recommended within 80 km.',
      status: 'Warning',
      statusColor: 'text-yellow-400',
      badgeBg: 'bg-yellow-500/10 border-yellow-500/30',
      icon: Droplets,
      iconBg: 'bg-yellow-950/80 border-yellow-500/30 text-yellow-400',
      hotspotKey: 'engine'
    },
    {
      id: 'brakes',
      title: 'Hydraulic Braking System',
      desc: 'Disc pad wear 12%. Fluid boiling point normal (92% health).',
      status: 'Optimal',
      statusColor: 'text-cyan-400',
      badgeBg: 'bg-cyan-500/10 border-cyan-500/30',
      icon: Disc,
      iconBg: 'bg-cyan-950/80 border-cyan-500/30 text-cyan-400',
      hotspotKey: 'brakes'
    },
    {
      id: 'chain',
      title: 'Drive Chain & Final Drive',
      desc: 'Chain slack 38mm measured. Tension adjustment required.',
      status: 'Warning',
      statusColor: 'text-yellow-400',
      badgeBg: 'bg-yellow-500/10 border-yellow-500/30',
      icon: RefreshCw,
      iconBg: 'bg-amber-950/80 border-amber-500/30 text-amber-400',
      hotspotKey: 'chain'
    },
    {
      id: 'electrical',
      title: 'Electrical Circuit & 12V Battery',
      desc: 'Alternator charging at 14.1V. Battery resting at 12.6V.',
      status: 'Optimal',
      statusColor: 'text-cyan-400',
      badgeBg: 'bg-cyan-500/10 border-cyan-500/30',
      icon: Zap,
      iconBg: 'bg-blue-950/80 border-blue-500/30 text-blue-400',
      hotspotKey: 'handlebar'
    }
  ];

  const handleScanTrigger = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 2500);
  };

  const activeHotspotData = hotspots[selectedHotspot] || hotspots.engine;

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 pb-28 text-white space-y-6 max-w-5xl mx-auto w-full">
      
      {/* ========================================================================= */}
      {/* 1. EXACT HEADER (Matching image typography & summary) */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-2 border-b border-zinc-800/80 pb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            HUD Diagnostics
          </h1>
          <p className="text-xs md:text-sm text-zinc-400 font-medium mt-1">
            Last full scans summary: <span className="text-yellow-400 font-bold">2 Warnings</span> · <span className="text-cyan-400 font-bold">0 Critical</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleScanTrigger}
            disabled={isScanning}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 active:scale-95"
          >
            <Radio className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            {isScanning ? 'SCANNING HUD...' : 'REFRESH SCAN'}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. THE EXACT HOLOGRAPHIC BLUEPRINT GRID VIEWPORT */}
      {/* ========================================================================= */}
      <div className="relative w-full rounded-3xl overflow-hidden border border-cyan-500/30 bg-[#080b10] shadow-[0_0_50px_rgba(6,182,212,0.15)] group select-none">
        
        {/* Main Background Image: The 3D Wireframe Cruiser Motorcycle on Perspective Blueprint Grid */}
        <div className="relative w-full aspect-[4/3] md:aspect-[16/10] max-h-[560px] overflow-hidden bg-black flex items-center justify-center">
          <img 
            src="/hud_motorcycle_wireframe.jpg" 
            alt="HUD Diagnostics Motorcycle Wireframe" 
            className="w-full h-full object-cover object-center filter contrast-125 brightness-105"
          />

          {/* Animated Scanning Sweep Bar */}
          {isScanning && (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent h-24 w-full animate-bounce pointer-events-none z-20"></div>
          )}

          {/* Subtle Ambient Vignette & Scanline Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080b10] via-transparent to-transparent opacity-80 pointer-events-none"></div>
          <div className="absolute inset-0 scanlines opacity-30 pointer-events-none"></div>

          {/* ========================================================================= */}
          {/* EXACT HOTSPOT TARGET RINGS & CALLOUT BADGES (Matching attached image!) */}
          {/* ========================================================================= */}

          {/* 1. ENGINE HOTSPOT: Glowing Amber Circle + Callout "Engine: Inspect Oil" */}
          <div 
            className="absolute z-30 flex items-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-105"
            style={{ top: '44%', left: '38%' }}
            onClick={() => setSelectedHotspot('engine')}
          >
            {/* Glowing Amber Target Ring with pulsing core */}
            <div className="relative flex items-center justify-center">
              <span className="w-8 h-8 rounded-full bg-yellow-400/20 animate-ping absolute"></span>
              <div className="w-6 h-6 rounded-full border-[2.5px] border-yellow-400 bg-yellow-400/10 shadow-[0_0_15px_#facc15] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
              </div>
            </div>

            {/* Exact Callout Badge: "Engine: Inspect Oil" with yellow border and black pill */}
            <div className="bg-[#0b0c10]/95 border-2 border-yellow-400 px-3.5 py-1 rounded-xl text-yellow-400 font-black text-xs md:text-sm tracking-wide shadow-[0_4px_20px_rgba(0,0,0,0.8),0_0_15px_rgba(250,204,21,0.3)] flex items-center gap-1.5 backdrop-blur-md">
              <span>Engine: Inspect Oil</span>
            </div>
          </div>

          {/* 2. BRAKES HOTSPOT: Glowing Cyan Circle + Callout "Brakes: 92%" */}
          <div 
            className="absolute z-30 flex items-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-105"
            style={{ top: '53%', left: '14%' }}
            onClick={() => setSelectedHotspot('brakes')}
          >
            {/* Glowing Cyan Target Ring */}
            <div className="relative flex items-center justify-center">
              <span className="w-8 h-8 rounded-full bg-cyan-400/20 animate-ping absolute"></span>
              <div className="w-6 h-6 rounded-full border-[2.5px] border-cyan-400 bg-cyan-400/10 shadow-[0_0_15px_#22d3ee] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
              </div>
            </div>

            {/* Exact Callout Badge: "Brakes: 92%" with cyan border and black pill */}
            <div className="bg-[#0b0c10]/95 border-2 border-cyan-400 px-3.5 py-1 rounded-xl text-cyan-400 font-black text-xs md:text-sm tracking-wide shadow-[0_4px_20px_rgba(0,0,0,0.8),0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-1.5 backdrop-blur-md">
              <span>Brakes: 92%</span>
            </div>
          </div>

          {/* 3. HANDLEBAR CONSOLE HOTSPOT: Glowing Amber Circle on Handlebar */}
          <div 
            className="absolute z-30 cursor-pointer transition-transform duration-200 hover:scale-110"
            style={{ top: '28%', left: '49%' }}
            onClick={() => setSelectedHotspot('handlebar')}
          >
            <div className="relative flex items-center justify-center">
              <span className="w-7 h-7 rounded-full bg-yellow-400/20 animate-ping absolute"></span>
              <div className="w-5 h-5 rounded-full border-[2.5px] border-yellow-400 bg-yellow-400/10 shadow-[0_0_15px_#facc15] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
              </div>
            </div>
          </div>

          {/* 4. SPARK PLUG / CYLINDER HEAD HOTSPOT (Additional Interactive Target) */}
          <div 
            className="absolute z-30 cursor-pointer transition-transform duration-200 hover:scale-110 hidden sm:block"
            style={{ top: '48%', left: '56%' }}
            onClick={() => setSelectedHotspot('spark')}
          >
            <div className="relative flex items-center justify-center">
              <div className="w-4 h-4 rounded-full border-2 border-cyan-400 bg-cyan-400/20 shadow-[0_0_10px_#22d3ee]"></div>
            </div>
          </div>

          {/* 5. DRIVE CHAIN HOTSPOT (Additional Interactive Target) */}
          <div 
            className="absolute z-30 cursor-pointer transition-transform duration-200 hover:scale-110 hidden sm:block"
            style={{ top: '65%', left: '26%' }}
            onClick={() => setSelectedHotspot('chain')}
          >
            <div className="relative flex items-center justify-center">
              <div className="w-4 h-4 rounded-full border-2 border-yellow-400 bg-yellow-400/20 shadow-[0_0_10px_#facc15]"></div>
            </div>
          </div>

          {/* Technical Telemetry HUD Overlays in Corners */}
          <div className="absolute top-4 left-4 z-20 font-mono text-[9px] text-cyan-400/80 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-500/20">
            <div>CYAN_SPEC: CR-650</div>
            <div>CAD_VIEW: SIDE_PROFILE</div>
            <div>MESH_DATA: ACTIVE_OBD2</div>
          </div>

          <div className="absolute top-4 right-4 z-20 font-mono text-[9px] text-zinc-400 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-zinc-800 text-right">
            <div>REV: <span className="text-cyan-400 font-bold">1450 RPM</span></div>
            <div>STATUS: <span className="text-yellow-400 font-bold">WARNINGS (2)</span></div>
          </div>

        </div>

        {/* Selected Component Live Telemetry Bar */}
        <div className="bg-[#0e1117] border-t border-zinc-800/90 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className={`w-3 h-3 rounded-full ${activeHotspotData.color === 'yellow' ? 'bg-yellow-400 shadow-[0_0_10px_#facc15]' : 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]'}`}></span>
            <div>
              <h4 className="text-sm font-black text-white">{activeHotspotData.title}</h4>
              <p className="text-xs text-zinc-400">{activeHotspotData.telemetry}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeHotspotData.specs.map((s, idx) => (
              <div key={idx} className="bg-zinc-900/80 border border-zinc-800 px-2.5 py-1 rounded-lg text-center">
                <span className="text-[9px] font-mono text-zinc-500 block uppercase">{s.label}</span>
                <span className={`text-xs font-bold font-mono ${activeHotspotData.textColor}`}>{s.value}</span>
              </div>
            ))}
            
            <button
              onClick={() => {
                setDiagnoseInput(`I ran HUD Diagnostics on the ${selectedVehicle.name} and found: ${activeHotspotData.title}. Telemetry: ${activeHotspotData.telemetry}. How do I service this?`);
                setActiveTab('diagnose');
              }}
              className="ml-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
            >
              Ask AI <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. SUBSYSTEM DIAGNOSIS SECTION (Exact match to the cards in the image!) */}
      {/* ========================================================================= */}
      <div className="space-y-3 pt-2">
        <h2 className="text-xs font-black tracking-widest text-zinc-400 uppercase">
          SUBSYSTEM DIAGNOSIS
        </h2>

        <div className="space-y-2.5">
          {subsystems.map((sub) => {
            const Icon = sub.icon;
            const isSelected = selectedHotspot === sub.hotspotKey;
            return (
              <div
                key={sub.id}
                onClick={() => setSelectedHotspot(sub.hotspotKey)}
                className={`w-full bg-[#12141a] hover:bg-[#161822] border rounded-2xl p-4 flex items-center justify-between transition-all duration-200 cursor-pointer shadow-lg group ${
                  isSelected ? 'border-cyan-500/60 bg-[#161824]' : 'border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  {/* Circular Icon Badge matching the teal badge in image */}
                  <div className={`w-11 h-11 rounded-full border flex items-center justify-center shrink-0 ${sub.iconBg} shadow-inner`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-white group-hover:text-cyan-400 transition-colors">
                      {sub.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5 leading-normal">
                      {sub.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black uppercase font-mono px-2.5 py-1 rounded-full border ${sub.badgeBg} ${sub.statusColor}`}>
                    {sub.status}
                  </span>
                  <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
