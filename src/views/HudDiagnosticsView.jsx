import React, { useEffect, useState, useMemo } from 'react';
import {
  ArrowUpRight,
  BatteryCharging,
  CircleHelp,
  Disc3,
  Droplets,
  Gauge,
  Link2,
  RefreshCw,
  Sparkles,
  Wrench,
  ShieldCheck,
  Cpu,
} from 'lucide-react';
import './WorkspaceViews.css';

function getVehicleDiagnosticsConfig(vehicle) {
  const isScooter = vehicle?.type?.toLowerCase() === 'scooter';
  const isCruiser = vehicle?.id === 'classic350' || vehicle?.id === 'gt650' || vehicle?.id === 'hunter350';

  if (isScooter) {
    return {
      chassisType: 'Underbone Monocoque Step-Through',
      coolingType: 'Forced Air-Cooled ESP Engine',
      driveType: 'CVT V-Belt & Centrifugal Variator',
      observations: {
        engine: {
          title: 'Engine Oil & ESP Crankcase',
          status: 'Review soon',
          tone: 'warning',
          position: { top: '56%', left: '38%' },
          description: 'Lubrication and fan-cooling inspection for compact 4-stroke ESP engine.',
          detail: 'Check oil level with scooter parked on center stand with engine cool. Use 10W-30 MB scooter-rated low-friction oil.',
          metrics: [
            ['Oil grade', vehicle?.specs?.oilType || '10W-30 MB'],
            ['Sump capacity', vehicle?.specs?.oilCapacity || '0.8 Litres'],
            ['Cooling fan', 'Shroud intact'],
          ],
        },
        brakes: {
          title: 'Combi-Brake System (CBS)',
          status: 'Looks good',
          tone: 'success',
          position: { top: '48%', left: '76%' },
          description: 'Interconnected front/rear brake cable tension and drum/disc free play.',
          detail: 'Check equalizer compensator action: pulling the left rear brake lever should proportionally apply front brake pressure.',
          metrics: [
            ['Lever play', '10–20 mm freeplay'],
            ['Front tire', vehicle?.specs?.tirePressureFront || '22 psi'],
            ['Rear tire', vehicle?.specs?.tirePressureRear || '29 psi'],
          ],
        },
        controls: {
          title: 'Handlebar Switchgear & ACG Starter',
          status: 'Looks good',
          tone: 'success',
          position: { top: '24%', left: '60%' },
          description: 'Silent start ACG generator, throttle cable tension, and side-stand inhibitor switch.',
          detail: 'Test side-stand safety cutoff: engine should immediately cut ignition if side-stand is extended.',
          metrics: [
            ['ACG starter', 'Silent brushless OK'],
            ['Side-stand sensor', 'Cutoff active'],
            ['Battery voltage', '12.6 V nominal'],
          ],
        },
        spark: {
          title: 'Under-Seat Spark Plug & Boot',
          status: 'Looks good',
          tone: 'success',
          position: { top: '46%', left: '47%' },
          description: 'Ignition plug accessed through under-seat luggage tub cavity.',
          detail: `Inspect plug electrode gap (${vehicle?.specs?.sparkPlugGap || '0.8 mm'}). Make sure luggage tub bolts are torqued correctly after inspection.`,
          metrics: [
            ['Gap target', vehicle?.specs?.sparkPlugGap || '0.8 mm'],
            ['Access', 'Luggage box 4x 10mm bolts'],
            ['Boot condition', 'Weatherproof seal OK'],
          ],
        },
        transmission: {
          title: 'CVT V-Belt & Variator Transmission',
          status: 'Review soon',
          tone: 'warning',
          position: { top: '64%', left: '26%' },
          description: 'Continuously Variable Transmission belt, roller weights, and centrifugal clutch shoes.',
          detail: 'Inspect V-belt for dry cracks, edge fraying, and variator roller flat spots every 8,000 km. Unlike motorcycles, scooters do not require chain lubing.',
          metrics: [
            ['Drive mechanism', 'V-Belt (No chain)'],
            ['Belt wear limit', '18.5 mm min width'],
            ['Clutch type', 'Centrifugal dry clutch'],
          ],
        },
      },
      subsystems: [
        {
          id: 'powertrain',
          title: 'Under-seat ESP Powertrain',
          description: 'Forced air-cooling, cylinder head, and electronic ignition.',
          status: 'Looks good',
          tone: 'success',
          icon: Wrench,
          observation: 'spark',
        },
        {
          id: 'lubrication',
          title: 'Scooter Engine Oil (MB Spec)',
          description: 'Check oil level, drain bolt washer, and magnetic strainer.',
          status: 'Review soon',
          tone: 'warning',
          icon: Droplets,
          observation: 'engine',
        },
        {
          id: 'brakes',
          title: 'Combi-Brake System (CBS)',
          description: 'Dual cable synchronizer, drum brake shoes, and lever freeplay.',
          status: 'Looks good',
          tone: 'success',
          icon: Disc3,
          observation: 'brakes',
        },
        {
          id: 'transmission',
          title: 'CVT V-Belt & Variator Housing',
          description: 'Continuous variable transmission, roller weights, and clutch shoes.',
          status: 'Review soon',
          tone: 'warning',
          icon: Link2,
          observation: 'transmission',
        },
        {
          id: 'electrical',
          title: 'Silent ACG Starter & Battery',
          description: 'Brushless AC generator starting, 12V 3Ah battery, and headlight relay.',
          status: 'Looks good',
          tone: 'success',
          icon: BatteryCharging,
          observation: 'controls',
        },
      ],
    };
  }

  if (isCruiser) {
    return {
      chassisType: 'Twin Downtube Cradle Chassis',
      coolingType: 'Air-Oil Cooled Long-Stroke Engine',
      driveType: 'Sealed O-Ring Drive Chain',
      observations: {
        engine: {
          title: 'High-Viscosity Oil & Oil Cooler',
          status: 'Review soon',
          tone: 'warning',
          position: { top: '48%', left: '42%' },
          description: 'Semi-synthetic 15W-50 oil with auxiliary external oil radiator.',
          detail: 'Check sight glass when engine is warmed up and parked upright. Inspect oil radiator fins for debris.',
          metrics: [
            ['Oil grade', vehicle?.specs?.oilType || '15W-50 Semi-Synth'],
            ['Sump capacity', vehicle?.specs?.oilCapacity || '1.9 Litres'],
            ['Oil radiator', 'Radiator clean'],
          ],
        },
        brakes: {
          title: 'Dual-Channel ABS & Disc Rotors',
          status: 'Looks good',
          tone: 'success',
          position: { top: '56%', left: '16%' },
          description: 'Floating twin-piston calipers with ABS tone-wheel sensors.',
          detail: 'Check brake fluid DOT 4 reservoir level and inspect brake pad thickness (minimum 2.0 mm friction material).',
          metrics: [
            ['Disc thickness', '4.0 mm nominal'],
            ['ABS ring', 'Clean / 48 slot'],
            ['Tire pressure', `${vehicle?.specs?.tirePressureFront || '22 psi'} / ${vehicle?.specs?.tirePressureRear || '32 psi'}`],
          ],
        },
        controls: {
          title: 'Fuel Injection ECU & Relay Circuit',
          status: 'Looks good',
          tone: 'success',
          position: { top: '27%', left: '50%' },
          description: 'Electronic fuel injection (EFI), oxygen sensor, and main relay bank.',
          detail: 'Verify throttle body idle actuator speed and inspect main fuse box under left side utility cover.',
          metrics: [
            ['EFI system', 'Closed loop EFI'],
            ['Idle RPM', '1,050 ± 50 RPM'],
            ['Battery voltage', '12.8 V resting'],
          ],
        },
        spark: {
          title: 'Ignition Coil & Spark Plugs',
          status: 'Looks good',
          tone: 'success',
          position: { top: '44%', left: '52%' },
          description: 'Long-reach spark plug with electronic ignition advance.',
          detail: `Inspect electrode gap (${vehicle?.specs?.sparkPlugGap || '0.8 mm'}). Do not overtighten into aluminium cylinder head.`,
          metrics: [
            ['Gap target', vehicle?.specs?.sparkPlugGap || '0.8 mm'],
            ['Hex size', '16 mm thin-wall'],
            ['Torque', '14 Nm spec'],
          ],
        },
        chain: {
          title: 'Heavy O-Ring Drive Chain',
          status: 'Review soon',
          tone: 'warning',
          position: { top: '65%', left: '26%' },
          description: 'Sealed O-ring chain with snail-cam / bolt axle adjusters.',
          detail: 'Measure chain vertical slack at lower mid-run (25–30 mm). Lubricate with O-ring safe dedicated chain lube.',
          metrics: [
            ['Chain slack', '32 mm measured'],
            ['Target', '25–30 mm spec'],
            ['Lube status', 'O-ring safe spray'],
          ],
        },
      },
      subsystems: [
        {
          id: 'powertrain',
          title: 'Long-Stroke Finned Cylinder Block',
          description: 'Air-oil cooling fins, overhead camshaft, and counterbalance shaft.',
          status: 'Looks good',
          tone: 'success',
          icon: Wrench,
          observation: 'spark',
        },
        {
          id: 'lubrication',
          title: 'High-Viscosity Oil & Oil Cooler',
          description: 'Semi-synthetic 15W-50 oil, twin drain plugs, and oil radiator.',
          status: 'Review soon',
          tone: 'warning',
          icon: Droplets,
          observation: 'engine',
        },
        {
          id: 'brakes',
          title: 'Dual-Channel ABS Hydraulics',
          description: 'ByBre twin-piston calipers, 300mm front disc, and DOT 4 fluid.',
          status: 'Looks good',
          tone: 'success',
          icon: Disc3,
          observation: 'brakes',
        },
        {
          id: 'chain',
          title: 'Heavy-Duty Sealed O-Ring Chain',
          description: '520-pitch sealed chain, sprocket wear, and swingarm alignment.',
          status: 'Review soon',
          tone: 'warning',
          icon: Link2,
          observation: 'chain',
        },
        {
          id: 'electrical',
          title: 'Electronic Fuel Injection & ECU',
          description: 'ECU harness, throttle position sensor, and battery charging.',
          status: 'Looks good',
          tone: 'success',
          icon: BatteryCharging,
          observation: 'controls',
        },
      ],
    };
  }

  // Standard Motorcycle (Diamond frame, single cylinder)
  return {
    chassisType: 'Diamond Tubular Backbone Chassis',
    coolingType: 'Air-Cooled 4-Stroke Engine',
    driveType: 'Roller Final Drive Chain',
    observations: {
      engine: {
        title: 'Engine Oil & Wet Clutch Sump',
        status: 'Review soon',
        tone: 'warning',
        position: { top: '44%', left: '39%' },
        description: 'Lubrication for common engine, wet multiplate clutch, and transmission gearbox.',
        detail: 'Confirm level with motorcycle parked on center stand with engine cool. Use 10W-30 MA2 motorcycle oil.',
        metrics: [
          ['Oil grade', vehicle?.specs?.oilType || '10W-30 MA2'],
          ['Sump capacity', vehicle?.specs?.oilCapacity || '0.9 Litres'],
          ['Clutch type', 'Wet multi-plate'],
        ],
      },
      brakes: {
        title: 'Braking System & Cables',
        status: 'Looks good',
        tone: 'success',
        position: { top: '54%', left: '16%' },
        description: 'Brake shoes/pads, lever freeplay, and brake rod return spring.',
        detail: 'Check brake pedal travel and lever free-play (10–15 mm). Inspect wear indicators on drum brake backing plate.',
        metrics: [
          ['Pad/Shoe wear', '12% normal wear'],
          ['Front pressure', vehicle?.specs?.tirePressureFront || '25 psi'],
          ['Rear pressure', vehicle?.specs?.tirePressureRear || '32 psi'],
        ],
      },
      controls: {
        title: 'Controls & Electrical Circuit',
        status: 'Looks good',
        tone: 'success',
        position: { top: '28%', left: '49%' },
        description: 'Clutch cable free play, throttle return, and ignition switchgear.',
        detail: 'Test clutch cable smooth action: lever should snap back crisply without binding in outer sleeve.',
        metrics: [
          ['Clutch play', '10–15 mm freeplay'],
          ['Throttle play', '2–4 mm play'],
          ['Battery', '12V 4Ah maintenance free'],
        ],
      },
      spark: {
        title: 'Ignition Coil & Spark Plug',
        status: 'Looks good',
        tone: 'success',
        position: { top: '48%', left: '56%' },
        description: 'Cylinder head spark plug and high-tension ignition lead.',
        detail: `Inspect electrode gap (${vehicle?.specs?.sparkPlugGap || '0.7 mm'}). Ensure spark plug rubber boot is seated firmly with a click.`,
        metrics: [
          ['Gap target', vehicle?.specs?.sparkPlugGap || '0.7 mm'],
          ['Electrode', 'Clean bronze/tan color'],
          ['Ignition type', 'DC-CDI digital spark'],
        ],
      },
      chain: {
        title: 'Drive Chain & Enclosed Guard',
        status: 'Review soon',
        tone: 'warning',
        position: { top: '65%', left: '27%' },
        description: 'Drive chain tension, enclosed chain-box lubrication, and rear sprocket teeth.',
        detail: 'Measure vertical chain slack through chain guard inspection port (25–30 mm required). Adjust axle adjusters equally.',
        metrics: [
          ['Chain slack', '34 mm measured'],
          ['Target', '25–30 mm standard'],
          ['Cover status', 'Enclosed chain case OK'],
        ],
      },
    },
    subsystems: [
      {
        id: 'powertrain',
        title: 'Air-Cooled Single Cylinder Block',
        description: 'Combustion chamber, intake manifold, and spark ignition.',
        status: 'Looks good',
        tone: 'success',
        icon: Wrench,
        observation: 'spark',
      },
      {
        id: 'lubrication',
        title: 'Engine Oil & Wet Clutch Reservoir',
        description: 'Confirm 10W-30 MA2 oil level, condition, and clutch feel.',
        status: 'Review soon',
        tone: 'warning',
        icon: Droplets,
        observation: 'engine',
      },
      {
        id: 'brakes',
        title: 'Mechanical / Hydraulic Brakes',
        description: 'Inspect shoe wear indicator, cables, and pedal return spring.',
        status: 'Looks good',
        tone: 'success',
        icon: Disc3,
        observation: 'brakes',
      },
      {
        id: 'chain',
        title: 'Drive Chain & Guard Inspection',
        description: 'Check chain slack, link wear, and sprocket teeth shape.',
        status: 'Review soon',
        tone: 'warning',
        icon: Link2,
        observation: 'chain',
      },
      {
        id: 'electrical',
        title: 'Electrical Circuit & Battery',
        description: 'Check 12V battery resting charge, turn signals, and horn.',
        status: 'Looks good',
        tone: 'success',
        icon: BatteryCharging,
        observation: 'controls',
      },
    ],
  };
}

export default function HudDiagnosticsView({ selectedVehicle, setActiveTab, setDiagnoseInput }) {
  const diagConfig = useMemo(() => getVehicleDiagnosticsConfig(selectedVehicle), [selectedVehicle]);
  const observations = diagConfig.observations;
  const subsystems = diagConfig.subsystems;

  const [selectedHotspot, setSelectedHotspot] = useState('engine');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [previewMessage, setPreviewMessage] = useState('Vehicle diagnostics loaded · system configuration verified');

  const vehicleName = selectedVehicle?.name || 'Selected vehicle';
  const activeHotspot = observations[selectedHotspot] ? selectedHotspot : 'engine';
  const activeObservation = observations[activeHotspot];

  useEffect(() => {
    if (!isRefreshing) return undefined;

    const timer = window.setTimeout(() => {
      setIsRefreshing(false);
      setPreviewMessage(`Calibration verified for ${vehicleName} · ${diagConfig.chassisType}`);
    }, 1600);

    return () => window.clearTimeout(timer);
  }, [isRefreshing, vehicleName, diagConfig.chassisType]);

  const refreshPreview = () => {
    setIsRefreshing(true);
    setPreviewMessage(`Scanning sensor telemetry and subsystem geometry for ${vehicleName}…`);
  };

  const askGuide = () => {
    setDiagnoseInput?.(
      `I am reviewing the ${diagConfig.chassisType} diagnostics for my ${vehicleName}. Focus item: ${activeObservation.title}. ${activeObservation.detail} Help me create a safe inspection and maintenance plan.`,
    );
    setActiveTab('diagnose');
  };

  return (
    <section className="workspace-view workspace-hud">
      <div className="workspace-page">
        <header className="workspace-hud-header">
          <div>
            <div className="flex items-center gap-2">
              <p className="ui-eyebrow">Vehicle Inspection</p>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-lime-400/10 text-lime-300 border border-lime-400/20">
                {diagConfig.chassisType}
              </span>
            </div>
            <h1 className="ui-title">System telemetry & blueprint</h1>
            <p className="ui-muted workspace-hud-lede">
              Vehicle-tailored inspection map for <strong>{vehicleName}</strong> ({diagConfig.coolingType} · {diagConfig.driveType}).
            </p>
          </div>
          <div className="workspace-hud-header-actions">
            <button type="button" className="ui-btn ui-btn-quiet" onClick={refreshPreview} disabled={isRefreshing}>
              <RefreshCw aria-hidden="true" size={16} className={isRefreshing ? 'workspace-spin' : ''} />
              {isRefreshing ? 'Scanning…' : 'Scan telemetry'}
            </button>
          </div>
        </header>

        <section className="workspace-hud-notice" aria-label="Report notice">
          <span className="workspace-notice-mark" aria-hidden="true"><CircleHelp size={18} /></span>
          <div>
            <strong role="status">{previewMessage}</strong>
            <p>
              Model-specific specifications for {vehicleName}. Inspection points adapt dynamically between scooter (CVT/ESP) and motorcycle (Chain/Diamond) architectures.
            </p>
          </div>
        </section>

        <section className="workspace-hud-report ui-card" aria-labelledby="inspection-report-title">
          <div className="workspace-section-heading">
            <div className="flex items-center justify-between w-full">
              <h2 id="inspection-report-title">Architectural Blueprint & Hotspots</h2>
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                <Cpu size={14} className="text-cyan-400" />
                {diagConfig.driveType}
              </span>
            </div>
          </div>

          <div className="workspace-hud-report-grid">
            <figure className="workspace-hud-viewport relative overflow-hidden">
              <img
                src="/hud_motorcycle_wireframe.jpg"
                alt={`Schematic wireframe blueprint for ${vehicleName}`}
                className="w-full h-full object-cover opacity-80"
              />

              {/* Technical Blueprint Vector Overlay */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-cyan-500/30" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="hud-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(6, 182, 212, 0.07)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hud-grid)" />
                {/* Crosshairs & Target Marks */}
                <circle cx="50%" cy="50%" r="90" fill="none" stroke="rgba(6, 182, 212, 0.12)" strokeDasharray="4 4" />
                <line x1="20" y1="50%" x2="60" y2="50%" stroke="rgba(6, 182, 212, 0.2)" />
                <line x1="calc(100% - 60px)" y1="50%" x2="calc(100% - 20px)" y2="50%" stroke="rgba(6, 182, 212, 0.2)" />
              </svg>

              {isRefreshing ? <div className="workspace-scan-sweep" aria-hidden="true" /> : null}

              {Object.entries(observations).map(([key, observation], index) => (
                <button
                  type="button"
                  key={key}
                  className={`workspace-hotspot workspace-hotspot-${observation.tone} ${selectedHotspot === key ? 'is-selected' : ''}`}
                  style={{ top: observation.position.top, left: observation.position.left }}
                  onClick={() => setSelectedHotspot(key)}
                  aria-label={`Point ${index + 1}: ${observation.title}, ${observation.status}. Show observation`}
                  aria-pressed={selectedHotspot === key}
                >
                  <span className="workspace-hotspot-marker" aria-hidden="true">{index + 1}</span>
                </button>
              ))}
              <figcaption className="workspace-hud-figure-caption">
                <Gauge aria-hidden="true" size={15} /> Select a numbered hotspot ({diagConfig.chassisType}) to inspect.
              </figcaption>
            </figure>

            <aside className="workspace-hud-observation" aria-live="polite" aria-labelledby="selected-observation-title">
              <div className="workspace-observation-heading">
                <div>
                  <p className="ui-eyebrow">Hotspot · {Object.keys(observations).indexOf(selectedHotspot) + 1} of {Object.keys(observations).length}</p>
                  <h3 id="selected-observation-title">{activeObservation.title}</h3>
                </div>
                <span className={`ui-tag ${activeObservation.tone === 'warning' ? 'ui-tag-warning' : 'ui-tag-success'}`}>
                  {activeObservation.status}
                </span>
              </div>
              <p className="workspace-observation-copy">{activeObservation.description}</p>
              <div className="workspace-sample-metrics" aria-label="Vehicle-specific metrics">
                {activeObservation.metrics.map(([label, value]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
              <div className="workspace-observation-note">
                <Sparkles aria-hidden="true" size={16} />
                <p>{activeObservation.detail}</p>
              </div>
              <button type="button" className="ui-btn ui-btn-primary workspace-full-btn" onClick={askGuide}>
                Ask the service guide <ArrowUpRight aria-hidden="true" size={17} />
              </button>
            </aside>
          </div>
        </section>

        <section className="workspace-subsystems" aria-labelledby="subsystems-title">
          <div className="workspace-section-heading workspace-section-heading-compact">
            <div>
              <h2 id="subsystems-title">{vehicleName} Subsystems</h2>
            </div>
            <p className="ui-muted">Select an architecture module to focus its hotspot on the blueprint.</p>
          </div>

          <div className="workspace-subsystem-list">
            {subsystems.map((subsystem) => {
              const Icon = subsystem.icon;
              const isSelected = selectedHotspot === subsystem.observation;
              return (
                <button
                  type="button"
                  key={subsystem.id}
                  className={`workspace-subsystem-row ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => setSelectedHotspot(subsystem.observation)}
                  aria-pressed={isSelected}
                >
                  <span className="workspace-subsystem-icon" aria-hidden="true">
                    <Icon size={18} />
                  </span>
                  <div className="workspace-subsystem-body">
                    <div className="workspace-subsystem-title-row">
                      <strong>{subsystem.title}</strong>
                      <span className={`ui-tag ${subsystem.tone === 'warning' ? 'ui-tag-warning' : 'ui-tag-success'}`}>
                        {subsystem.status}
                      </span>
                    </div>
                    <p>{subsystem.description}</p>
                  </div>
                  <ShieldCheck aria-hidden="true" size={18} className="workspace-subsystem-arrow" />
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}
