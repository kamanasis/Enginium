import React from 'react';
import {
  ArrowUpRight,
  BookOpen,
  CalendarClock,
  ChevronRight,
  Headphones,
  ShieldAlert,
  Sparkles,
  Wrench,
} from 'lucide-react';
import './WorkspaceViews.css';

const getOdometer = (vehicle) => {
  if (vehicle?.odometer) return vehicle.odometer;

  return {
    splendor: '42,850 km',
    activa: '18,210 km',
    pulsar: '28,900 km',
  }[vehicle?.id] || '42,912 km';
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

  const openDiagnosis = () => {
    setDiagnoseInput?.(`Help me make a service plan for my ${vehicle.name || 'vehicle'}.`);
    setActiveTab('diagnose');
  };

  return (
    <section className="workspace-view workspace-home">
      <div className="workspace-page">
        <header className="workspace-home-header">
          <div>
            <p className="ui-eyebrow">Dashboard</p>
            <h1 className="ui-title workspace-home-title">Your ride, in good hands.</h1>
            <p className="ui-muted workspace-home-intro">
              Keep track of service, explore your vehicle, and plan what comes next.
            </p>
          </div>
        </header>

        <section className="workspace-home-hero" aria-labelledby="selected-vehicle-title">
          <div className="workspace-home-hero-copy">
            <p className="workspace-overline">Selected vehicle</p>
            <h2 id="selected-vehicle-title">{vehicle.name || 'Your vehicle'}</h2>
            <p className="workspace-home-vehicle-model">
              {vehicle.make || 'Vehicle'} {vehicle.model ? `· ${vehicle.model}` : ''}
            </p>

            <div className="workspace-spec-list" aria-label="Selected vehicle details">
              <div>
                <span>Type</span>
                <strong>{vehicle.type || '—'}</strong>
              </div>
              <div>
                <span>Engine</span>
                <strong>{vehicle.engine || 'Profile details pending'}</strong>
              </div>
              <div>
                <span>Drive Architecture</span>
                <strong>{vehicle.type?.toLowerCase() === 'scooter' ? 'CVT V-Belt (Dry Clutch)' : 'Roller Chain (Wet Clutch)'}</strong>
              </div>
              <div>
                <span>Odometer reference</span>
                <strong>{odometer}</strong>
              </div>
            </div>

            <p className="workspace-home-hero-note">
              {vehicle.type?.toLowerCase() === 'scooter'
                ? 'Scooter platform: uses underbone step-through chassis with continuous variator transmission.'
                : 'Motorcycle platform: uses diamond/cradle frame with manual multi-speed gearbox and final drive chain.'}
            </p>

            <div className="workspace-action-row">
              <button type="button" className="ui-btn ui-btn-primary" onClick={() => setActiveTab('hud')}>
                Inspect vehicle <ArrowUpRight aria-hidden="true" size={17} />
              </button>
              <button type="button" className="ui-btn ui-btn-quiet workspace-btn-on-dark" onClick={() => setActiveTab('garage')}>
                Open garage <ChevronRight aria-hidden="true" size={17} />
              </button>
            </div>
          </div>

          <figure className="workspace-home-hero-figure">
            <img
              src="/hud_motorcycle_wireframe.jpg"
              alt="Illustrative engineering blueprint wireframe"
            />
            <figcaption>
              <span>{vehicle.type?.toLowerCase() === 'scooter' ? 'Scooter architectural blueprint' : 'Motorcycle architectural blueprint'}</span>
            </figcaption>
          </figure>
        </section>

        <section className="workspace-home-maintenance ui-card" aria-labelledby="maintenance-preview-title">
          <div className="workspace-section-heading">
            <div>
              <h2 id="maintenance-preview-title">Maintenance preview</h2>
            </div>
          </div>

          <div className="workspace-maintenance-body">
            <div className="workspace-maintenance-summary">
              <div className="workspace-icon-tile workspace-icon-tile-warning" aria-hidden="true">
                <CalendarClock size={21} />
              </div>
              <div>
                <h3>Oil and chain check</h3>
                <p>
                  A sample reminder for your next workshop visit. Confirm the condition in person before
                  booking any work.
                </p>
              </div>
            </div>
            <div className="workspace-maintenance-badges">
              <span className="ui-tag ui-tag-warning">Review soon</span>
            </div>
          </div>

          <div className="workspace-card-footer">
            <span className="ui-muted">{latestService?.title ? `Last logged: ${latestService.title}` : 'Sample reminder · confirm before booking'}</span>
            <button type="button" className="ui-btn ui-btn-quiet" onClick={() => setActiveTab('garage')}>
              Review service log <ChevronRight aria-hidden="true" size={16} />
            </button>
          </div>
        </section>

        <section className="workspace-home-tools" aria-labelledby="tools-title">
          <div className="workspace-section-heading workspace-section-heading-compact">
            <div>
              <h2 id="tools-title">Your shortcuts</h2>
            </div>
          </div>

          <div className="workspace-tool-grid">
            <button type="button" className="workspace-tool-card" onClick={openDiagnosis}>
              <span className="workspace-tool-icon workspace-tool-icon-red" aria-hidden="true"><Sparkles size={19} /></span>
              <span>
                <strong>Diagnosis guide</strong>
                <small>Turn a symptom into a practical plan.</small>
              </span>
              <ChevronRight aria-hidden="true" size={18} />
            </button>
            <button type="button" className="workspace-tool-card" onClick={() => setActiveTab('acoustic')}>
              <span className="workspace-tool-icon workspace-tool-icon-crimson" aria-hidden="true"><Headphones size={19} /></span>
              <span>
                <strong>Sound check</strong>
                <small>Explore an illustrative engine sound workflow.</small>
              </span>
              <ChevronRight aria-hidden="true" size={18} />
            </button>
            <button type="button" className="workspace-tool-card" onClick={() => setActiveTab('learn')}>
              <span className="workspace-tool-icon workspace-tool-icon-neutral" aria-hidden="true"><BookOpen size={19} /></span>
              <span>
                <strong>Learn the basics</strong>
                <small>Open parts guides and maintenance lessons.</small>
              </span>
              <ChevronRight aria-hidden="true" size={18} />
            </button>
            <button type="button" className="workspace-tool-card" onClick={() => setActiveTab('garage')}>
              <span className="workspace-tool-icon workspace-tool-icon-steel" aria-hidden="true"><Wrench size={19} /></span>
              <span>
                <strong>Garage records</strong>
                <small>Keep service and family milestones together.</small>
              </span>
              <ChevronRight aria-hidden="true" size={18} />
            </button>
          </div>
        </section>

        <section className="workspace-home-sos" aria-label="Emergency assistance">
          <div>
            <span className="workspace-sos-icon" aria-hidden="true"><ShieldAlert size={19} /></span>
            <div>
              <strong>Need help on the roadside?</strong>
              <p>Open the breakdown guide for a quick, safety-first checklist.</p>
            </div>
          </div>
          <button type="button" className="ui-btn ui-btn-quiet" onClick={() => setEmergencyMode(true)}>
            Open roadside guide <ArrowUpRight aria-hidden="true" size={16} />
          </button>
        </section>
      </div>
    </section>
  );
}
