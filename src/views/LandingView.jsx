import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scan, Activity, BookOpen, Compass, ShieldAlert, Users,
  ChevronRight, ArrowRight, Play, CheckCircle2, XCircle,
  Cpu, Zap, Disc, RefreshCw, Flame, Gauge, Volume2, ShieldCheck,
  Menu, X, Sparkles, Layers, Sliders, Eye, ChevronDown
} from 'lucide-react';
import EngineBlueprintAnimation from '../components/EngineBlueprintAnimation';
import EnginiumLogoMark from '../components/EnginiumLogoMark';
import KineticBackground from '../components/KineticBackground';
import { vehiclesData } from '../data/vehicles';
import './LandingView.css';

export default function LandingView({ onNavigate, onSelectVehicle, selectedVehicle }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFeatureTab, setActiveFeatureTab] = useState('hud');
  const [activeSymptomTest, setActiveSymptomTest] = useState('slow-starting');
  const [acousticFrequency, setAcousticFrequency] = useState(140);
  const [isPlayingAudioSim, setIsPlayingAudioSim] = useState(false);

  const currentVehicle = selectedVehicle || vehiclesData[0];

  // Featured parts showcasing real photographic assets
  const featuredParts = (currentVehicle.parts || vehiclesData[0].parts).slice(0, 8);

  const symptomDemos = {
    'slow-starting': {
      title: 'Hard Cold Start / Cranking Hesitation',
      cause: 'Carbon-fouled Spark Plug or Weak Battery Terminal Voltage',
      diy: 'Basic DIY',
      confidence: '92%',
      time: '15 mins',
      cost: '₹120 - ₹180',
      action: 'Clean electrode tip with brass wire brush, calibrate gap to 0.7mm.',
    },
    'poor-pickup': {
      title: 'Sluggish Pickup & Engine Over-revving',
      cause: 'Slipping Wet Clutch Friction Plates or Misadjusted Free Play',
      diy: 'Yellow Intermediate',
      confidence: '88%',
      time: '35 mins',
      cost: '₹650 - ₹1,100',
      action: 'Adjust cable slack to 10-15mm; check for burnt clutch lining.',
    },
    'ticking-noise': {
      title: 'Persistent High-Pitch Ticking From Cylinder Head',
      cause: 'Loose Valve Tappet Clearance at Top Dead Center',
      diy: 'Yellow Intermediate',
      confidence: '95%',
      time: '25 mins',
      cost: '₹0 (Adjustment)',
      action: 'Set intake tappet to 0.08mm, exhaust to 0.12mm with feeler gauge.',
    },
    'brake-spongy': {
      title: 'Spongy Brake Lever & Low Braking Bite',
      cause: 'Moisture in Hydraulic DOT 4 Fluid or Glazed Pad Surface',
      diy: 'Basic DIY',
      confidence: '90%',
      time: '20 mins',
      cost: '₹250 - ₹450',
      action: 'Bleed air locks from caliper; scuff pad surface with 120-grit emery.',
    }
  };

  const systemsShowcase = [
    {
      icon: Cpu,
      title: 'Power Unit & Combustion',
      desc: 'High-compression piston rings, cylinder bore, overhead camshaft timing, and precision poppet valves.',
      partsCount: '7 Components',
      linkId: 'piston-rings'
    },
    {
      icon: Disc,
      title: 'Drivetrain & Transmission',
      desc: 'Multi-plate wet clutch pack, constant-mesh gear cluster, cush drive damper, and O-ring drive chain.',
      partsCount: '6 Components',
      linkId: 'clutch-assembly'
    },
    {
      icon: Zap,
      title: 'Electrical & Ignitions',
      desc: 'Alternator stator magneto, solid-state 14.4V regulator rectifier, CDI ignition map, and starter motor.',
      partsCount: '8 Components',
      linkId: 'stator-magneto'
    },
    {
      icon: Flame,
      title: 'Fuel Induction & Scavenging',
      desc: 'Venturi carburetor float bowl, sediment petcock, catalytic converter honeycomb, and tuned exhaust.',
      partsCount: '5 Components',
      linkId: 'carburetor'
    },
    {
      icon: RefreshCw,
      title: 'Hydraulic Chassis & Dampers',
      desc: 'Twin telescopic fork stanchions, oil seals, steering cone bearings, and 5-step preload shock dampers.',
      partsCount: '6 Components',
      linkId: 'telescopic-forks'
    },
    {
      icon: ShieldCheck,
      title: 'Braking & Safety Controls',
      desc: 'Twin-piston disc caliper, sintered friction pads, expanding rear drum, and steel tension rods.',
      partsCount: '4 Components',
      linkId: 'front-brake-disc'
    }
  ];

  return (
    <div className="en-landing">
      {/* Subtle Studio Kinetic Backdrop */}
      <KineticBackground opacity={0.28} />
      <div className="en-studio-top-glow" aria-hidden="true" />

      {/* Top Navbar */}
      <header className="en-nav-header">
        <div className="en-dynamic-island">
          {/* Brand Mark */}
          <button 
            type="button" 
            className="en-island-brand" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title="Enginium Digital Twin"
          >
            <EnginiumLogoMark size={22} className="en-brand-emblem" />
            <span className="en-island-brand-text">ENGINIUM</span>
          </button>

          {/* Segmented Navigation Links */}
          <nav className="en-island-nav hidden md:flex" aria-label="Landing page sections">
            <button type="button" className="en-island-link" onClick={() => onNavigate('hud')}>
              Digital Twin
            </button>
            <button type="button" className="en-island-link" onClick={() => onNavigate('acoustic')}>
              Acoustic
            </button>
            <button type="button" className="en-island-link" onClick={() => onNavigate('learn')}>
              41+ Parts
            </button>
            <button type="button" className="en-island-link" onClick={() => onNavigate('diagnose')}>
              Guide
            </button>
            <button type="button" className="en-island-link" onClick={() => onNavigate('garage')}>
              Garage
            </button>
          </nav>

          {/* Action Trigger Pill */}
          <div className="en-island-actions">
            <button
              type="button"
              className="en-island-launch-btn"
              onClick={() => onNavigate('hud')}
            >
              <span>Launch Studio</span>
              <ArrowRight size={13} className="en-island-arrow" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              className="en-island-mobile-toggle md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="en-island-mobile-drawer md:hidden"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <div className="en-island-mobile-nav">
                <button 
                  type="button" 
                  className="en-island-mobile-link"
                  onClick={() => { onNavigate('hud'); setMobileMenuOpen(false); }}
                >
                  <Scan size={16} className="text-red-500" />
                  <span>3D Digital Twin</span>
                </button>
                <button 
                  type="button" 
                  className="en-island-mobile-link"
                  onClick={() => { onNavigate('acoustic'); setMobileMenuOpen(false); }}
                >
                  <Volume2 size={16} className="text-amber-500" />
                  <span>Acoustic Frequency Lab</span>
                </button>
                <button 
                  type="button" 
                  className="en-island-mobile-link"
                  onClick={() => { onNavigate('learn'); setMobileMenuOpen(false); }}
                >
                  <BookOpen size={16} className="text-blue-500" />
                  <span>41+ Parts Manual</span>
                </button>
                <button 
                  type="button" 
                  className="en-island-mobile-link"
                  onClick={() => { onNavigate('diagnose'); setMobileMenuOpen(false); }}
                >
                  <Compass size={16} className="text-emerald-500" />
                  <span>Diagnostic Guide</span>
                </button>
                <button 
                  type="button" 
                  className="en-island-mobile-link"
                  onClick={() => { onNavigate('garage'); setMobileMenuOpen(false); }}
                >
                  <ShieldCheck size={16} className="text-purple-500" />
                  <span>Garage & Service Passport</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Editorial Split-Viewport Hero Section */}
      <section className="en-hero-section">
        <div className="en-hero-split">
          {/* Left Column: Typography, Machine Switcher, Actions & Live Metrics */}
          <div className="en-hero-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <span className="en-kicker-badge">
                <span className="en-ping-dot" />
                4-Stroke Telemetry · Offline Ready
              </span>
            </motion.div>

            <motion.h1
              className="en-hero-title"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              <span className="en-hero-title-top">Precision Digital Twin</span>
              <span className="en-hero-title-main">for Motorcycle Engineering.</span>
            </motion.h1>

            <motion.p
              className="en-hero-subtitle"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.14 }}
            >
              Replace vague workshop PDFs with interactive exploded 3D assemblies, 41+ real component photos, live acoustic FFT diagnostics, and model-exact repair intervals.
            </motion.p>

            {/* Vehicle Profile Quick Selector */}
            <motion.div
              className="en-hero-vehicle-strip"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              role="group"
              aria-label="Select machine profile"
            >
              <span className="en-hero-vehicle-label">TWIN</span>
              <div className="en-hero-vehicle-pills">
                {vehiclesData.slice(0, 4).map((v) => {
                  const isSelected = currentVehicle.id === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => onSelectVehicle?.(v)}
                      className={`en-hero-vehicle-pill ${isSelected ? 'is-active' : ''}`}
                      aria-pressed={isSelected}
                    >
                      {isSelected && <span className="en-hero-vehicle-dot" aria-hidden="true" />}
                      <span>{v.name}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              className="en-hero-launcher"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25 }}
            >
              <button
                type="button"
                className="en-launcher-primary"
                onClick={() => onNavigate('hud')}
              >
                <span className="en-launcher-icon-wrap">
                  <Scan size={17} />
                </span>
                <div className="en-launcher-text">
                  <span className="en-launcher-title">Launch 3D Studio</span>
                  <span className="en-launcher-sub">Exploded View · Hotspots</span>
                </div>
                <ArrowRight size={15} className="en-launcher-arrow" />
              </button>

              <button
                type="button"
                className="en-launcher-secondary"
                onClick={() => onNavigate('learn')}
              >
                <span className="en-launcher-icon-wrap">
                  <BookOpen size={17} />
                </span>
                <div className="en-launcher-text">
                  <span className="en-launcher-title">Explore Parts Catalog</span>
                  <span className="en-launcher-sub">{currentVehicle.parts?.length || 41} Real Components</span>
                </div>
              </button>
            </motion.div>

            {/* Compact Live Telemetry Metrics */}
            <motion.div
              className="en-telemetry-bar"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="en-telemetry-card">
                <div className="en-telemetry-number">{currentVehicle.parts?.length || 41}</div>
                <div className="en-telemetry-label">Indexed Parts</div>
              </div>
              <div className="en-telemetry-card">
                <div className="en-telemetry-number">{currentVehicle.specs?.oilType?.split(' ')[0] || '10W-30'}</div>
                <div className="en-telemetry-label">Oil Grade</div>
              </div>
              <div className="en-telemetry-card">
                <div className="en-telemetry-number">{currentVehicle.specs?.sparkPlugGap || '0.7 mm'}</div>
                <div className="en-telemetry-label">Spark Gap</div>
              </div>
              <div className="en-telemetry-card">
                <div className="en-telemetry-number">12 kHz</div>
                <div className="en-telemetry-label">Acoustic FFT</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Live Interactive Kinematic Blueprint Cockpit */}
          <motion.div
            className="en-hero-right"
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            <div className="en-cockpit-card">
              <div className="en-cockpit-topbar">
                <div className="en-cockpit-title">
                  <span className="en-ping-dot" />
                  <span>KINEMATIC ENGINE TWIN // {currentVehicle.name.toUpperCase()}</span>
                </div>
                <button
                  type="button"
                  className="en-cockpit-open-btn"
                  onClick={() => onNavigate('hud')}
                >
                  <span>Inspect 3D</span>
                  <ArrowRight size={13} />
                </button>
              </div>

              <div className="en-blueprint-container">
                <EngineBlueprintAnimation speed={0.025} />
                <div className="en-blueprint-hud-overlay">
                  <div className="en-hud-top">
                    <span className="en-hud-pill">
                      OTTO 4-CYCLE
                    </span>
                    <span className="en-hud-pill">
                      {currentVehicle.type?.toUpperCase() || 'MOTORCYCLE'}
                    </span>
                  </div>
                  <div className="en-hud-bottom">
                    <div className="en-hud-metric-box">
                      <div className="text-slate-400 text-[10px]">SIMULATED IDLE</div>
                      <div className="text-[#ff3355] font-bold text-sm">1,450 RPM</div>
                    </div>
                    <div className="en-hud-metric-box text-right">
                      <div className="text-slate-400 text-[10px]">POWER OUTPUT</div>
                      <div className="text-white font-bold text-sm">{currentVehicle.power || '8.02 PS'}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="en-cockpit-footer">
                <div>
                  <span>POWERTRAIN</span>
                  <strong>{currentVehicle.engine}</strong>
                </div>
                <div>
                  <span>TIRE SPEC</span>
                  <strong>{currentVehicle.specs?.tirePressureFront || '25 psi'} / {(currentVehicle.specs?.tirePressureRear || '32 psi').split(' ')[0]} psi</strong>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Feature Cockpit Section */}
      <section className="en-section" id="features">
        <div className="en-section-header">
          <span className="en-kicker-badge">Core Platform Capabilities</span>
          <h2 className="en-section-title">Built for Riders, Machinists &amp; Backyard Engineers</h2>
          <p className="en-section-desc">
            Enginium bridges the gap between digital simulation and actual garage wrenching. Test the interactive tools below:
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="en-feature-tabs">
          {[
            { id: 'hud', label: '3D HUD Inspector', icon: Scan },
            { id: 'acoustic', label: 'Acoustic Frequency Lab', icon: Activity },
            { id: 'matrix', label: 'Symptom Matrix AI', icon: Compass },
            { id: 'gallery', label: 'Photographic Manual', icon: BookOpen },
          ].map((tab) => {
            const TabIcon = tab.icon;
            const isTabActive = activeFeatureTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                className={`en-tab-btn ${isTabActive ? 'is-active' : ''}`}
                onClick={() => setActiveFeatureTab(tab.id)}
              >
                {isTabActive && (
                  <motion.span
                    layoutId="en-feature-tab-pill"
                    className="en-tab-btn-bg"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
                <TabIcon size={16} className="relative z-10" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Feature Stage Display */}
        <div className="en-feature-stage">
          <AnimatePresence mode="wait">
          {activeFeatureTab === 'hud' && (
            <motion.div
              key="hud"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              <div>
                <span className="text-xs font-bold text-[#ff3355] tracking-wider uppercase">Feature 01 · Visual Telemetry</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-2 mb-4">
                  Exploded 3D Inspection with Tolerance Gauges
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  Rotate, explode, and inspect the engine block in real-time. Identify components such as the spark plug, valve rocker cover, carburetor, and exhaust manifold with precise metric torque references.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-slate-200">
                    <CheckCircle2 size={16} className="text-[#ff3355] shrink-0" />
                    <span>Real-time wireframe scan and component highlight</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-200">
                    <CheckCircle2 size={16} className="text-[#ff3355] shrink-0" />
                    <span>Cross-referenced failure symptoms for every visible part</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-200">
                    <CheckCircle2 size={16} className="text-[#ff3355] shrink-0" />
                    <span>One-click jump into verified step-by-step repair guides</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="en-btn-launch"
                  onClick={() => onNavigate('hud')}
                >
                  <span>Open 3D Station</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              <div className="relative bg-[#0b0d14] border border-white/10 rounded-2xl p-6 overflow-hidden min-h-[320px] flex flex-col justify-between shadow-inner">
                <div className="flex justify-between items-center text-xs text-slate-300 font-mono">
                  <span>STATION // ACTIVE</span>
                  <span className="text-[#ff3355] font-bold">HOTSPOTS: 8 IDENTIFIED</span>
                </div>
                <div className="my-auto py-8 text-center space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-[#161924] border border-[#ff3355]/40 flex items-center justify-center text-[#ff3355] shadow-[0_0_30px_rgba(255,23,68,0.28)]">
                    <Scan size={34} className="animate-pulse" />
                  </div>
                  <div className="text-white font-bold text-lg">{currentVehicle.name}</div>
                  <div className="text-xs text-slate-400 max-w-xs mx-auto">
                    {currentVehicle.engine} · {currentVehicle.specs?.sparkPlugGap} plug gap
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs font-mono text-[#ff3355] font-bold pt-4 border-t border-white/10">
                  <span>3D RENDER ENGINE</span>
                  <button type="button" onClick={() => onNavigate('hud')} className="underline hover:text-white">
                    Full Interactive Screen →
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeFeatureTab === 'acoustic' && (
            <motion.div
              key="acoustic"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              <div>
                <span className="text-xs font-bold text-[#ff3355] tracking-wider uppercase">Feature 02 · Mechanical Acoustics</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-2 mb-4">
                  Identify Abnormal Sounds Through Frequency FFT
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  Every engine failure has a characteristic acoustic fingerprint. Compare healthy purr against loose valve tappets, worn piston skirt slap, and timing chain rattles across audio spectrum bins.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                    <span>FREQUENCY MONITOR</span>
                    <span className="text-[#ff3355] font-bold">{acousticFrequency} Hz</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="600"
                    value={acousticFrequency}
                    onChange={(e) => setAcousticFrequency(Number(e.target.value))}
                    className="w-full accent-[#ff3355] cursor-pointer"
                  />
                </div>
                <button
                  type="button"
                  className="en-btn-launch"
                  onClick={() => onNavigate('acoustic')}
                >
                  <span>Launch Sound Stethoscope</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              <div className="bg-[#0b0d14] border border-white/10 rounded-2xl p-6 flex flex-col justify-between min-h-[320px]">
                <div className="flex justify-between items-center text-xs text-slate-300 font-mono">
                  <span>AUDIO FFT SPECTRUM</span>
                  <span className="text-[#ff3355] font-bold">HARMONIC ANALYZER</span>
                </div>
                {/* Visual Audio Waveform Simulation */}
                <div className="my-auto py-6 flex items-end justify-center gap-1.5 h-36">
                  {[35, 60, 45, 80, 95, 70, 50, 110, 85, 65, 90, 120, 75, 45, 60, 100, 70, 40].map((h, i) => {
                    const scaledH = Math.min(100, (h * (acousticFrequency / 140)));
                    return (
                      <div
                        key={i}
                        className="w-3 rounded-t bg-gradient-to-t from-[#1e2029] to-[#ff3355] transition-all duration-150"
                        style={{ height: `${scaledH}%` }}
                      />
                    );
                  })}
                </div>
                <div className="text-center text-xs font-mono text-slate-300">
                  {acousticFrequency < 120
                    ? 'Sub-bass rumble (Idle Crankshaft stroke)'
                    : acousticFrequency < 300
                    ? 'Mid-range cadence (Healthy 4-stroke valve timing)'
                    : 'High-frequency resonance (Check valve tappet clearance)'}
                </div>
              </div>
            </motion.div>
          )}

          {activeFeatureTab === 'matrix' && (
            <motion.div
              key="matrix"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="max-w-xl">
                <span className="text-xs font-bold text-[#ff3355] tracking-wider uppercase">Feature 03 · Instant Diagnostic Playground</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1 mb-2">
                  Test-Drive the AI Symptom Classifier
                </h3>
                <p className="text-slate-300 text-sm">
                  Click a common motorcycle problem below to see the instant diagnostic analysis generated:
                </p>
              </div>

              {/* Symptom Test Chips */}
              <div className="flex flex-wrap gap-2">
                {Object.entries(symptomDemos).map(([key, item]) => (
                  <button
                    type="button"
                    key={key}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                      activeSymptomTest === key
                        ? 'bg-[#1a1d2a] border-[#ff3355] text-white shadow-[0_0_16px_rgba(255,23,68,0.2)]'
                        : 'bg-[#11131c] border-white/10 text-slate-300 hover:text-white hover:border-white/20'
                    }`}
                    onClick={() => setActiveSymptomTest(key)}
                  >
                    {item.title}
                  </button>
                ))}
              </div>

              {/* Selected Diagnosis Card */}
              {symptomDemos[activeSymptomTest] && (
                <div className="bg-[#0b0d14] border border-white/10 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <span className="text-xs text-slate-400 block mb-1">PROBABLE CAUSE</span>
                    <strong className="text-white text-sm block">{symptomDemos[activeSymptomTest].cause}</strong>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block mb-1">CONFIDENCE &amp; DIY LEVEL</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[#ff3355] font-bold text-sm">{symptomDemos[activeSymptomTest].confidence}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-slate-200 font-semibold border border-white/10">
                        {symptomDemos[activeSymptomTest].diy}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block mb-1">ESTIMATED TIME &amp; COST</span>
                    <strong className="text-white text-sm block">
                      {symptomDemos[activeSymptomTest].time} · {symptomDemos[activeSymptomTest].cost}
                    </strong>
                  </div>
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="en-btn-launch w-full justify-center"
                      onClick={() => onNavigate('diagnose')}
                    >
                      <span>Full Step Guide</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeFeatureTab === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-xs font-bold text-[#ff3355] tracking-wider uppercase">Feature 04 · Photographic Catalog</span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                    41 Components Sourced from Real Machinery
                  </h3>
                </div>
                <button
                  type="button"
                  className="en-btn-launch"
                  onClick={() => onNavigate('learn')}
                >
                  <span>View All 41 Parts</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              {/* Horizontal Scroll of Real Parts */}
              <div className="en-gallery-scroll">
                {featuredParts.map((part) => (
                  <div
                    key={part.id}
                    className="en-part-preview-card"
                    onClick={() => onNavigate('learn')}
                  >
                    <div className="en-part-preview-img-wrap">
                      <img
                        src={part.image}
                        alt={part.name}
                        className="en-part-preview-img"
                        loading="lazy"
                        onError={(e) => {
                          if (!e.currentTarget.dataset.retried) {
                            e.currentTarget.dataset.retried = '1';
                            const sep = part.image.includes('?') ? '&' : '?';
                            e.currentTarget.src = `${part.image}${sep}retry=1`;
                          }
                        }}
                      />
                    </div>
                    <div className="en-part-preview-content">
                      <span className="en-part-preview-cat">{part.category || 'System Component'}</span>
                      <h4 className="en-part-preview-title">{part.name}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2">{part.function}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          </AnimatePresence>
        </div>
      </section>

      {/* Systems Architecture Showcase Grid */}
      <section className="en-section" id="systems">
        <div className="en-section-header">
          <span className="en-kicker-badge">Complete Machine Breakdown</span>
          <h2 className="en-section-title">Anatomy of the 2-Wheeled Machine</h2>
          <p className="en-section-desc">
            From the combustion chamber to the rear wheel rubber cush blocks, understand how every sub-assembly interacts.
          </p>
        </div>

        <div className="en-systems-grid">
          {systemsShowcase.map((sys, idx) => {
            const Icon = sys.icon;
            return (
              <div
                key={idx}
                className="en-system-card"
                onClick={() => onNavigate('learn')}
                style={{ cursor: 'pointer' }}
              >
                <div>
                  <div className="en-system-icon-wrap">
                    <Icon size={24} />
                  </div>
                  <h3>{sys.title}</h3>
                  <p>{sys.desc}</p>
                </div>
                <div className="en-system-meta">
                  <span>{sys.partsCount}</span>
                  <span className="flex items-center gap-1 hover:underline">
                    Inspect Specs <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison: Old Way vs Enginium */}
      <section className="en-section" id="comparison">
        <div className="en-section-header">
          <span className="en-kicker-badge">The Paradigm Shift</span>
          <h2 className="en-section-title">Manuals Reimagined for the 21st Century</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="en-compare-table">
            <thead>
              <tr>
                <th style={{ width: '28%' }}>Feature Dimension</th>
                <th style={{ width: '36%' }}>Greasy Paper Manuals & Generic Forums</th>
                <th className="en-highlight-col" style={{ width: '36%' }}>
                  <div className="en-compare-head-badge">
                    <span className="en-compare-head-dot" aria-hidden="true" />
                    <span>Enginium Interactive Digital Twin</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Component Reference</strong></td>
                <td>
                  <div className="en-compare-cell is-negative">
                    <XCircle size={15} className="en-compare-icon is-neg" aria-hidden="true" />
                    <span>Black-and-white flat schematics from the 1980s</span>
                  </div>
                </td>
                <td className="en-highlight-cell">
                  <div className="en-compare-cell is-positive">
                    <CheckCircle2 size={15} className="en-compare-icon is-pos" aria-hidden="true" />
                    <span>High-resolution authentic photography & 3D wireframe models</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td><strong>Acoustic Diagnostics</strong></td>
                <td>
                  <div className="en-compare-cell is-negative">
                    <XCircle size={15} className="en-compare-icon is-neg" aria-hidden="true" />
                    <span>Vague text descriptions like &ldquo;listen for clatter&rdquo;</span>
                  </div>
                </td>
                <td className="en-highlight-cell">
                  <div className="en-compare-cell is-positive">
                    <CheckCircle2 size={15} className="en-compare-icon is-pos" aria-hidden="true" />
                    <span>Live frequency FFT spectrum stethoscope with audio comparisons</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td><strong>Troubleshooting Speed</strong></td>
                <td>
                  <div className="en-compare-cell is-negative">
                    <XCircle size={15} className="en-compare-icon is-neg" aria-hidden="true" />
                    <span>Browsing 300 pages of fine print index tables</span>
                  </div>
                </td>
                <td className="en-highlight-cell">
                  <div className="en-compare-cell is-positive">
                    <CheckCircle2 size={15} className="en-compare-icon is-pos" aria-hidden="true" />
                    <span>Instant symptom matrix search with confidence scores & DIY intervals</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td><strong>Maintenance Records</strong></td>
                <td>
                  <div className="en-compare-cell is-negative">
                    <XCircle size={15} className="en-compare-icon is-neg" aria-hidden="true" />
                    <span>Lost paper slips and fading odometer receipts</span>
                  </div>
                </td>
                <td className="en-highlight-cell">
                  <div className="en-compare-cell is-positive">
                    <CheckCircle2 size={15} className="en-compare-icon is-pos" aria-hidden="true" />
                    <span>Immutable digital garage passport with milestone achievements</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="en-section">
        <div className="en-cta-banner">
          <span className="en-kicker-badge mb-4">Start Exploring Today</span>
          <h2 className="en-cta-title">Ready to Master Your Two-Wheeled Machine?</h2>
          <p className="en-cta-desc">
            Switch vehicle profiles, explore detailed teardowns, or start diagnosing a mechanical quirk in seconds.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              className="en-btn-primary-hero"
              onClick={() => onNavigate('hud')}
            >
              <Scan size={18} />
              <span>Launch Vehicle Station</span>
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              className="en-btn-secondary-hero"
              onClick={() => onNavigate('learn')}
            >
              <span>Explore Parts Catalog</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="en-landing-footer">
        <div className="en-footer-container">
          <div className="en-footer-col">
            <div className="flex items-center gap-3 mb-4">
              <EnginiumLogoMark size={28} className="en-brand-emblem" />
              <strong className="en-brand-text text-base tracking-wider font-extrabold">
                ENGINIUM
              </strong>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed max-w-sm mb-4">
              Open-architecture digital twin platform for motorcycle diagnostics, component mechanics, sound analysis, and community knowledge.
            </p>
            <span className="inline-block text-[11px] font-mono text-[#ff1744] font-bold px-2.5 py-1 rounded bg-[#1e2029] border border-[#2c2f3a]">
              ACTIVE REPO: kamanasis/Enginium
            </span>
          </div>

          <div className="en-footer-col">
            <h4>Platform</h4>
            <ul>
              <li><button type="button" onClick={() => onNavigate('hud')}>3D Digital Twin</button></li>
              <li><button type="button" onClick={() => onNavigate('acoustic')}>Acoustic Stethoscope</button></li>
              <li><button type="button" onClick={() => onNavigate('learn')}>41 Parts Manual</button></li>
              <li><button type="button" onClick={() => onNavigate('diagnose')}>AI Diagnostics</button></li>
            </ul>
          </div>

          <div className="en-footer-col">
            <h4>Garage</h4>
            <ul>
              <li><button type="button" onClick={() => onNavigate('garage')}>Service Passport</button></li>
              <li><button type="button" onClick={() => onNavigate('profile')}>Settings & Backup</button></li>
            </ul>
          </div>

          <div className="en-footer-col">
            <h4>Open Source</h4>
            <ul>
              <li><a href="https://github.com/kamanasis/Enginium" target="_blank" rel="noopener noreferrer">GitHub Repository</a></li>
              <li><a href="https://commons.wikimedia.org" target="_blank" rel="noopener noreferrer">Wikimedia Commons Assets</a></li>
              <li><span className="text-xs text-slate-200">Vite 8 · React 19 · Three.js</span></li>
            </ul>
          </div>
        </div>

        <div className="en-footer-bottom">
          <div>© {new Date().getFullYear()} Enginium Project · Licensed under MIT</div>
          <div className="flex gap-4">
            <span>Built with precision for 2-wheel enthusiasts</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
