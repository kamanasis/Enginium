import React from 'react';
import {
  ArrowUpRight,
  BookOpen,
  CalendarClock,
  ChevronRight,
  Cpu,
  Droplets,
  Gauge,
  Headphones,
  Layers,
  ShieldAlert,
  Sparkles,
  Wrench,
  Zap,
} from 'lucide-react';
import './WorkspaceViews.css';

const getOdometer = (vehicle) => {
  if (vehicle?.odometer) return vehicle.odometer;

  return {
    splendor: '42,850 km',
    activa: '18,210 km',
    pulsar: '28,900 km',
    classic350: '14,620 km',
  }[vehicle?.id] || '24,500 km';
};

export default function HomeView({
  selectedVehicle,
  setSelectedVehicle: _setSelectedVehicle,
  vehiclesList: _vehiclesList,
  setActiveTab,
  setDiagnoseInput,
  setEmergencyMode,
  showDropdown: _showDropdown,
  setShowDropdown: _setShowDropdown,
  serviceHistory = [],
}) {
  const vehicle = selectedVehicle || {};
  const odometer = getOdometer(vehicle);
  const latestService = serviceHistory[0];
  const isScooter = vehicle.type?.toLowerCase() === 'scooter';

  const openDiagnosis = () => {
    setDiagnoseInput?.(`Help me make a service plan for my ${vehicle.name || 'vehicle'}.`);
    setActiveTab('diagnose');
  };

  return (
    <section className="workspace-view workspace-home">
      <div className="workspace-page">
        <header className="workspace-home-header">
          <div>
            <p className="ui-eyebrow">Dashboard · Telemetry Overview</p>
            <h1 className="ui-title workspace-home-title">Your machine, dialed in.</h1>
            <p className="ui-muted workspace-home-intro">
              Monitor machine specs, inspect 3D components, and keep maintenance records organized in one clean cockpit.
            </p>
          </div>
          <div className="workspace-home-header-cta">
            <button type="button" className="ui-btn ui-btn-primary" onClick={() => setActiveTab('hud')}>
              Open 3D Inspect <ArrowUpRight aria-hidden="true" size={16} />
            </button>
          </div>
        </header>

        {/* Live Machine Telemetry Strip */}
        <section className="workspace-kpi-grid" aria-label="Key telemetry metrics">
          <div className="workspace-kpi-card">
            <div className="workspace-kpi-top">
              <span>Odometer</span>
              <Gauge size={15} className="text-[#ff3355]" aria-hidden="true" />
            </div>
            <strong>{odometer}</strong>
            <small>{vehicle.make || 'Machine'} reference</small>
          </div>
          <div className="workspace-kpi-card">
            <div className="workspace-kpi-top">
              <span>Engine Oil</span>
              <Droplets size={15} className="text-amber-400" aria-hidden="true" />
            </div>
            <strong>{vehicle.specs?.oilType || '10W-30 MA2'}</strong>
            <small>Capacity: {vehicle.specs?.oilCapacity || '0.9 Litres'}</small>
          </div>
          <div className="workspace-kpi-card">
            <div className="workspace-kpi-top">
              <span>Ignition &amp; Power</span>
              <Zap size={15} className="text-sky-400" aria-hidden="true" />
            </div>
            <strong>{vehicle.specs?.sparkPlugGap || '0.7 mm'} gap</strong>
            <small>{vehicle.power || '4-Stroke Cycle'}</small>
          </div>
          <div className="workspace-kpi-card">
            <div className="workspace-kpi-top">
              <span>Parts &amp; Logs</span>
              <Layers size={15} className="text-emerald-400" aria-hidden="true" />
            </div>
            <strong>{vehicle.parts?.length || 41} indexed parts</strong>
            <small>{serviceHistory.length} service {serviceHistory.length === 1 ? 'entry' : 'entries'}</small>
          </div>
        </section>

        {/* Hero Selected Vehicle Cockpit */}
        <section className="workspace-home-hero" aria-labelledby="selected-vehicle-title">
          <div className="workspace-home-hero-copy">
            <div className="workspace-hero-badge-row">
              <span className="workspace-overline">Active Profile</span>
              <span className="ui-tag ui-tag-success">Ready</span>
            </div>
            <h2 id="selected-vehicle-title">{vehicle.name || 'Your vehicle'}</h2>
            <p className="workspace-home-vehicle-model">
              {vehicle.make || 'Vehicle'} {vehicle.model ? `· ${vehicle.model}` : ''}
            </p>

            <div className="workspace-spec-list" aria-label="Selected vehicle details">
              <div>
                <span>Platform</span>
                <strong>{vehicle.type || 'Motorcycle'}</strong>
              </div>
              <div>
                <span>Powertrain</span>
                <strong>{vehicle.engine || 'Single Cylinder 4-Stroke'}</strong>
              </div>
              <div>
                <span>Drive Architecture</span>
                <strong>{isScooter ? 'CVT V-Belt (Dry Clutch)' : 'Roller Chain (Wet Clutch)'}</strong>
              </div>
              <div>
                <span>Tire Target (F / R)</span>
                <strong>
                  {vehicle.specs?.tirePressureFront || '25 psi'} / {(vehicle.specs?.tirePressureRear || '32 psi').split(' ')[0]} psi
                </strong>
              </div>
            </div>

            <p className="workspace-home-hero-note">
              <Cpu size={14} className="inline mr-1.5 text-[#ff3355] -mt-0.5" aria-hidden="true" />
              {isScooter
                ? 'Scooter platform: underbone step-through chassis with continuous variator transmission.'
                : 'Motorcycle platform: tubular frame with multi-speed gearbox and final drive chain.'}
            </p>

            <div className="workspace-action-row">
              <button type="button" className="ui-btn ui-btn-primary" onClick={() => setActiveTab('hud')}>
                Inspect hotspots <ArrowUpRight aria-hidden="true" size={16} />
              </button>
              <button type="button" className="ui-btn workspace-btn-on-dark" onClick={() => setActiveTab('learn')}>
                3D Parts Explorer <ChevronRight aria-hidden="true" size={16} />
              </button>
              <button type="button" className="ui-btn ui-btn-quiet" onClick={() => setActiveTab('garage')}>
                Garage log
              </button>
            </div>
          </div>

          <figure className="workspace-home-hero-figure">
            <img
              src="/hud_motorcycle_wireframe.jpg"
              alt="Illustrative engineering blueprint wireframe"
            />
            <div className="workspace-hero-blueprint-hud" aria-hidden="true">
              <span>CAD WIREFRAME</span>
              <span>{isScooter ? 'ESP // CVT' : '4S // CHAIN'}</span>
            </div>
            <figcaption>
              <span>{isScooter ? 'Scooter architectural blueprint' : 'Motorcycle architectural blueprint'}</span>
            </figcaption>
          </figure>
        </section>

        {/* Two-column Maintenance + Quick Tools */}
        <div className="workspace-dashboard-split">
          <section className="workspace-home-maintenance ui-card" aria-labelledby="maintenance-preview-title">
            <div className="workspace-section-heading">
              <div>
                <p className="ui-eyebrow">Service Status</p>
                <h2 id="maintenance-preview-title">Next check &amp; latest log</h2>
              </div>
              <span className="ui-tag ui-tag-warning">Review soon</span>
            </div>

            <div className="workspace-maintenance-body">
              <div className="workspace-maintenance-summary">
                <div className="workspace-icon-tile workspace-icon-tile-warning" aria-hidden="true">
                  <CalendarClock size={20} />
                </div>
                <div>
                  <h3>{isScooter ? 'Engine oil & CVT belt check' : 'Engine oil & chain slack check'}</h3>
                  <p>
                    {latestService?.title
                      ? `Latest logged record: ${latestService.title} (${latestService.date || 'recent'}).`
                      : 'Confirm oil viscosity, fluid level, and drive tension before long rides.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="workspace-card-footer">
              <span className="ui-muted">
                {latestService?.desc ? latestService.desc : 'Standard workshop inspection interval'}
              </span>
              <button type="button" className="ui-btn" onClick={() => setActiveTab('garage')}>
                Open garage <ChevronRight aria-hidden="true" size={15} />
              </button>
            </div>
          </section>

          <section className="workspace-home-tools" aria-labelledby="tools-title">
            <div className="workspace-section-heading workspace-section-heading-compact">
              <div>
                <p className="ui-eyebrow">Quick Launch</p>
                <h2 id="tools-title">Engineering workspace tools</h2>
              </div>
            </div>

            <div className="workspace-tool-grid">
              <button type="button" className="workspace-tool-card" onClick={openDiagnosis}>
                <span className="workspace-tool-icon workspace-tool-icon-red" aria-hidden="true"><Sparkles size={18} /></span>
                <span>
                  <strong>Diagnosis guide</strong>
                  <small>Symptom triage &amp; ranked inspection steps.</small>
                </span>
                <ChevronRight aria-hidden="true" size={17} />
              </button>
              <button type="button" className="workspace-tool-card" onClick={() => setActiveTab('acoustic')}>
                <span className="workspace-tool-icon workspace-tool-icon-crimson" aria-hidden="true"><Headphones size={18} /></span>
                <span>
                  <strong>Sound profile</strong>
                  <small>Live mic FFT spectrum &amp; fault samples.</small>
                </span>
                <ChevronRight aria-hidden="true" size={17} />
              </button>
              <button type="button" className="workspace-tool-card" onClick={() => setActiveTab('learn')}>
                <span className="workspace-tool-icon workspace-tool-icon-neutral" aria-hidden="true"><BookOpen size={18} /></span>
                <span>
                  <strong>3D parts manual</strong>
                  <small>Interactive exploded CAD &amp; real photos.</small>
                </span>
                <ChevronRight aria-hidden="true" size={17} />
              </button>
              <button type="button" className="workspace-tool-card" onClick={() => setActiveTab('garage')}>
                <span className="workspace-tool-icon workspace-tool-icon-steel" aria-hidden="true"><Wrench size={18} /></span>
                <span>
                  <strong>Garage records</strong>
                  <small>Fleet switcher, milestones &amp; logs.</small>
                </span>
                <ChevronRight aria-hidden="true" size={17} />
              </button>
            </div>
          </section>
        </div>

        <section className="workspace-home-sos" aria-label="Emergency assistance">
          <div>
            <span className="workspace-sos-icon" aria-hidden="true"><ShieldAlert size={19} /></span>
            <div>
              <strong>Stranded or need roadside steps?</strong>
              <p>Open the safety-first emergency breakdown checklist and helpline numbers.</p>
            </div>
          </div>
          <button type="button" className="ui-btn" onClick={() => setEmergencyMode(true)}>
            Open roadside guide <ArrowUpRight aria-hidden="true" size={16} />
          </button>
        </section>
      </div>
    </section>
  );
}
