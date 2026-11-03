import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scan, Activity, BookOpen, Compass, ShieldAlert, Users,
  ChevronRight, ArrowRight, Play, CheckCircle2, XCircle,
  Cpu, Zap, Disc, RefreshCw, Flame, Gauge, Volume2, ShieldCheck,
  Menu, X, Sparkles, Layers, Sliders, Eye
} from 'lucide-react';
import EngineBlueprintAnimation from '../components/EngineBlueprintAnimation';
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
      {/* Smooth Themed Kinetic Background */}
      <KineticBackground opacity={0.92} />

      {/* Top Navbar */}
      <header className="en-nav-header">
        <div className="en-nav-container">
          <button type="button" className="en-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="en-brand-icon">
              <Scan size={20} />
            </div>
            <div className="en-brand-text">
              ENGIN<span>IUM</span>
            </div>
          </button>

          <nav className="en-nav-links" aria-label="Landing page sections">
            <button type="button" className="en-nav-link" onClick={() => onNavigate('hud')}>
              Digital Twin (HUD)
            </button>
            <button type="button" className="en-nav-link" onClick={() => onNavigate('acoustic')}>
              Acoustic Lab
            </button>
            <button type="button" className="en-nav-link" onClick={() => onNavigate('learn')}>
              Parts Manual (41+)
            </button>
            <button type="button" className="en-nav-link" onClick={() => onNavigate('diagnose')}>
              AI Diagnostics
            </button>
            <button type="button" className="en-nav-link" onClick={() => onNavigate('garage')}>
              Garage Passport
            </button>
          </nav>

          <div className="en-nav-actions">
            <button
              type="button"
              className="en-btn-launch"
              onClick={() => onNavigate('hud')}
            >
              <span>Launch Twin</span>
              <ArrowRight size={15} />
            </button>
            <button
              type="button"
              className="en-mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="en-mobile-drawer"
            >
              <button type="button" className="en-nav-link" onClick={() => { setMobileMenuOpen(false); onNavigate('hud'); }}>
                🔍 3D Digital Twin Inspector
              </button>
              <button type="button" className="en-nav-link" onClick={() => { setMobileMenuOpen(false); onNavigate('learn'); }}>
                📚 41-Component Photographic Manual
              </button>
              <button type="button" className="en-nav-link" onClick={() => { setMobileMenuOpen(false); onNavigate('acoustic'); }}>
                🎧 Acoustic Frequency Stethoscope
              </button>
              <button type="button" className="en-nav-link" onClick={() => { setMobileMenuOpen(false); onNavigate('diagnose'); }}>
                ⚡ Step-by-Step AI Repair Guide
              </button>
              <button type="button" className="en-nav-link" onClick={() => { setMobileMenuOpen(false); onNavigate('garage'); }}>
                🛡️ Garage Passport & History
              </button>
              <button
                type="button"
                className="en-btn-launch"
                style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
                onClick={() => { setMobileMenuOpen(false); onNavigate('hud'); }}
              >
                Launch Studio
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="en-hero-section">
        <div className="en-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="en-kicker-badge">
              <span className="en-ping-dot" />
              Interactive 4-Stroke Telemetry Engine
            </span>
          </motion.div>

          <motion.h1
            className="en-hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            The Digital Twin for <br className="hidden sm:inline" />
            <span className="en-title-gradient">Motorcycle Engineering</span> <br className="hidden sm:inline" />
            & Precision DIY Repair.
          </motion.h1>

          <motion.p
            className="en-hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Say goodbye to greasy, vague workshop PDFs. Explore interactive 3D exploded components, 41 verified photographic parts, acoustic frequency diagnostics, and verified torque specifications.
          </motion.p>

          <motion.div
            className="en-hero-cta-group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <button
              type="button"
              className="en-btn-primary-hero"
              onClick={() => onNavigate('hud')}
            >
              <Scan size={18} />
              <span>Launch Digital Twin</span>
              <ArrowRight size={17} />
            </button>
            <button
              type="button"
              className="en-btn-secondary-hero"
              onClick={() => onNavigate('learn')}
            >
              <BookOpen size={18} />
              <span>Browse 41+ Parts Manual</span>
            </button>
          </motion.div>

          {/* Telemetry Numbers Bar */}
          <motion.div
            className="en-telemetry-bar"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="en-telemetry-card">
              <div className="en-telemetry-number">41</div>
              <div className="en-telemetry-label">Verified Real Parts</div>
            </div>
            <div className="en-telemetry-card">
              <div className="en-telemetry-number">12 kHz</div>
              <div className="en-telemetry-label">Harmonic Acoustic FFT</div>
            </div>
            <div className="en-telemetry-card">
              <div className="en-telemetry-number">94.8%</div>
              <div className="en-telemetry-label">DIY Diagnostic Confidence</div>
            </div>
            <div className="en-telemetry-card">
              <div className="en-telemetry-number">100%</div>
              <div className="en-telemetry-label">Client-Side Offline Ready</div>
            </div>
          </motion.div>

          {/* Real-time Kinematic 4-Stroke Canvas */}
          <motion.div
            className="en-blueprint-container"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <EngineBlueprintAnimation speed={0.025} />
            <div className="en-blueprint-hud-overlay">
              <div className="en-hud-top">
                <span className="en-hud-pill">
                  <span className="en-ping-dot" />
                  KINEMATICS: RECIPROCATING 97.2cc
                </span>
                <span className="en-hud-pill hidden sm:inline-flex">
                  FOUR-STROKE OTTO CYCLE
                </span>
              </div>
              <div className="en-hud-bottom">
                <div className="en-hud-metric-box">
                  <div className="text-slate-200">SIMULATED RPM</div>
                  <div className="text-[#ff1744] font-bold text-base font-bold">1,450 RPM (Idle)</div>
                </div>
                <div className="en-hud-metric-box text-right">
                  <div className="text-slate-200">ACTIVE STROKE</div>
                  <div className="text-white text-base font-bold">Power / Scavenge</div>
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
          <h2 className="en-section-title">Built for Riders, Machinists & Backyard Engineers</h2>
          <p className="en-section-desc">
            Enginium bridges the gap between digital simulation and actual garage wrenching. Test the interactive tools below:
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="en-feature-tabs">
          <button
            type="button"
            className={`en-tab-btn ${activeFeatureTab === 'hud' ? 'is-active' : ''}`}
            onClick={() => setActiveFeatureTab('hud')}
          >
            <Scan size={16} />
            <span>3D HUD Inspector</span>
          </button>
          <button
            type="button"
            className={`en-tab-btn ${activeFeatureTab === 'acoustic' ? 'is-active' : ''}`}
            onClick={() => setActiveFeatureTab('acoustic')}
          >
            <Activity size={16} />
            <span>Acoustic Frequency Lab</span>
          </button>
          <button
            type="button"
            className={`en-tab-btn ${activeFeatureTab === 'matrix' ? 'is-active' : ''}`}
            onClick={() => setActiveFeatureTab('matrix')}
          >
            <Compass size={16} />
            <span>Symptom Matrix AI</span>
          </button>
          <button
            type="button"
            className={`en-tab-btn ${activeFeatureTab === 'gallery' ? 'is-active' : ''}`}
            onClick={() => setActiveFeatureTab('gallery')}
          >
            <BookOpen size={16} />
            <span>Photographic Manual</span>
          </button>
        </div>

        {/* Interactive Feature Stage Display */}
        <div className="en-feature-stage">
          {activeFeatureTab === 'hud' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-bold text-[#ff1744] font-bold tracking-wider uppercase">Feature 01 · Visual Telemetry</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-2 mb-4">
                  Exploded 3D Inspection with Tolerance Gauges
                </h3>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6">
                  Rotate, explode, and inspect the engine block in real-time. Identify components such as the spark plug, valve rocker cover, carburetor, and exhaust manifold with precise metric torque references.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-slate-100">
                    <CheckCircle2 size={16} className="text-[#ff1744] font-bold" />
                    <span>Real-time wireframe scan and component highlight</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-100">
                    <CheckCircle2 size={16} className="text-[#ff1744] font-bold" />
                    <span>Cross-referenced failure symptoms for every visible part</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-100">
                    <CheckCircle2 size={16} className="text-[#ff1744] font-bold" />
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

              <div className="relative bg-[#0e0f14] border border-[#2c2f3a] rounded-2xl p-6 overflow-hidden min-h-[320px] flex flex-col justify-between">
                <div className="flex justify-between items-center text-xs text-slate-200 font-mono">
                  <span>STATION // ACTIVE</span>
                  <span className="text-[#ff1744] font-bold">HOTSPOTS: 8 IDENTIFIED</span>
                </div>
                <div className="my-auto py-8 text-center space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-[#1e2029] border border-[#ff3344]/40 flex items-center justify-center text-[#ff1744] font-bold shadow-[0_0_30px_rgba(255,23,68,0.35)]">
                    <Scan size={36} className="animate-pulse" />
                  </div>
                  <div className="text-white font-bold text-lg">{currentVehicle.name}</div>
                  <div className="text-xs text-slate-200 max-w-xs mx-auto">
                    {currentVehicle.engine} · {currentVehicle.specs?.sparkPlugGap} plug gap
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs font-mono text-[#ff1744] font-bold pt-4 border-t border-[#2c2f3a]/60">
                  <span>3D RENDER ENGINE</span>
                  <button type="button" onClick={() => onNavigate('hud')} className="underline hover:text-white">
                    Full Interactive Screen →
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeFeatureTab === 'acoustic' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-bold text-[#ff1744] font-bold tracking-wider uppercase">Feature 02 · Mechanical Acoustics</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-2 mb-4">
                  Identify Abnormal Sounds Through Frequency FFT
                </h3>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6">
                  Every engine failure has a characteristic acoustic fingerprint. Compare healthy purr against loose valve tappets, worn piston skirt slap, and timing chain rattles across audio spectrum bins.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-200">
                    <span>FREQUENCY MONITOR</span>
                    <span className="text-[#ff1744] font-bold">{acousticFrequency} Hz</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="600"
                    value={acousticFrequency}
                    onChange={(e) => setAcousticFrequency(Number(e.target.value))}
                    className="w-full accent-[#ff3344] cursor-pointer"
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

              <div className="bg-[#0e0f14] border border-[#2c2f3a] rounded-2xl p-6 flex flex-col justify-between min-h-[320px]">
                <div className="flex justify-between items-center text-xs text-slate-200 font-mono">
                  <span>AUDIO FFT SPECTRUM</span>
                  <span className="text-[#ff1744] font-bold">HARMONIC ANALYZER</span>
                </div>
                {/* Visual Audio Waveform Simulation */}
                <div className="my-auto py-6 flex items-end justify-center gap-1.5 h-36">
                  {[35, 60, 45, 80, 95, 70, 50, 110, 85, 65, 90, 120, 75, 45, 60, 100, 70, 40].map((h, i) => {
                    const scaledH = Math.min(100, (h * (acousticFrequency / 140)));
                    return (
                      <div
                        key={i}
                        className="w-3 rounded-t bg-gradient-to-t from-[#1e2029] to-[#ff3344] transition-all duration-150"
                        style={{ height: `${scaledH}%` }}
                      />
                    );
                  })}
                </div>
                <div className="text-center text-xs font-mono text-slate-200">
                  {acousticFrequency < 120
                    ? 'Sub-bass rumble (Idle Crankshaft stroke)'
                    : acousticFrequency < 300
                    ? 'Mid-range cadence (Healthy 4-stroke valve timing)'
                    : 'High-frequency resonance (Check valve tappet clearance)'}
                </div>
              </div>
            </div>
          )}

          {activeFeatureTab === 'matrix' && (
            <div className="space-y-6">
              <div className="max-w-xl">
                <span className="text-xs font-bold text-[#ff1744] font-bold tracking-wider uppercase">Feature 03 · Instant Diagnostic Playground</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1 mb-2">
                  Test-Drive the AI Symptom Classifier
                </h3>
                <p className="text-slate-200 text-sm">
                  Click a common motorcycle problem below to see the instant diagnostic analysis generated:
                </p>
              </div>

              {/* Symptom Test Chips */}
              <div className="flex flex-wrap gap-2">
                {Object.entries(symptomDemos).map(([key, item]) => (
                  <button
                    type="button"
                    key={key}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                      activeSymptomTest === key
                        ? 'bg-[#1e2029] border-[#ff3344] text-[#ff1744] font-bold'
                        : 'bg-[#14151b] border-[#2c2f3a] text-slate-200 hover:text-white'
                    }`}
                    onClick={() => setActiveSymptomTest(key)}
                  >
                    {item.title}
                  </button>
                ))}
              </div>

              {/* Selected Diagnosis Card */}
              {symptomDemos[activeSymptomTest] && (
                <div className="bg-[#0e0f14] border border-[#2c2f3a] rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <span className="text-xs text-slate-200 block mb-1">PROBABLE CAUSE</span>
                    <strong className="text-white text-sm block">{symptomDemos[activeSymptomTest].cause}</strong>
                  </div>
                  <div>
                    <span className="text-xs text-slate-200 block mb-1">CONFIDENCE & DIY LEVEL</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[#ff1744] font-bold text-sm">{symptomDemos[activeSymptomTest].confidence}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-[#1e2029] text-[#ff1744] font-bold border border-[#2c2f3a]">
                        {symptomDemos[activeSymptomTest].diy}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-slate-200 block mb-1">ESTIMATED TIME & COST</span>
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
            </div>
          )}

          {activeFeatureTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-xs font-bold text-[#ff1744] font-bold tracking-wider uppercase">Feature 04 · Photographic Catalog</span>
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
                      />
                    </div>
                    <div className="en-part-preview-content">
                      <span className="en-part-preview-cat">{part.category || 'System Component'}</span>
                      <h4 className="en-part-preview-title">{part.name}</h4>
                      <p className="text-xs text-slate-200 line-clamp-2">{part.function}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
                <th style={{ width: '30%' }}>Feature Dimension</th>
                <th style={{ width: '35%' }}>Greasy Paper Manuals & Generic Forums</th>
                <th className="en-highlight-cell" style={{ width: '35%' }}>Enginium Interactive Digital Twin</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Component Reference</strong></td>
                <td>Black-and-white flat schematics from the 1980s</td>
                <td className="en-highlight-cell">High-resolution authentic photography & 3D wireframe models</td>
              </tr>
              <tr>
                <td><strong>Acoustic Diagnostics</strong></td>
                <td>Vague text descriptions like "listen for clatter"</td>
                <td className="en-highlight-cell">Live frequency FFT spectrum stethoscope with audio comparisons</td>
              </tr>
              <tr>
                <td><strong>Troubleshooting Speed</strong></td>
                <td>Browsing 300 pages of fine print index tables</td>
                <td className="en-highlight-cell">Instant symptom matrix search with confidence scores & DIY intervals</td>
              </tr>
              <tr>
                <td><strong>Maintenance Records</strong></td>
                <td>Lost paper slips and fading odometer receipts</td>
                <td className="en-highlight-cell">Immutable digital garage passport with milestone achievements</td>
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
              <div className="en-brand-icon">
                <Scan size={18} />
              </div>
              <strong className="text-white text-base tracking-wider font-extrabold">
                ENGIN<span className="text-[#ff1744] font-bold">IUM</span>
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
              <li><button type="button" onClick={() => onNavigate('community')}>Rider Community</button></li>
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
