import React from 'react';
import {
  ArrowUpRight,
  BookOpen,
  CalendarClock,
  ChevronRight,
  CircleAlert,
  Cpu,
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
    <main className="workspace-view workspace-home">
      <div className="workspace-page">
        <header className="workspace-home-header">
          <div>
            <p className="ui-eyebrow">Enginium dashboard</p>
            <h1 className="ui-title workspace-home-title">Your ride. In good hands.</h1>
            <p className="ui-muted workspace-home-intro">
              A calm place to keep service notes, learn the essentials, and plan the next check.
            </p>
          </div>
          <div className="workspace-home-context">
            <span className="ui-tag ui-tag-demo">Demo context</span>
            <span className="ui-muted">Profile view · {vehicle.type || 'Vehicle'}</span>
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
                <span>Odometer reference</span>
                <strong>{odometer}</strong>
              </div>
            </div>

            <p className="workspace-home-hero-note">
              This dashboard uses your selected profile. The vehicle image is an illustrative reference,
              not a photo or live reading of this model.
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
              alt="Illustrative motorcycle wireframe used as a reference, not the selected vehicle"
            />
            <figcaption>
              <span>Illustrative reference</span>
              <span>Not a live OBD image</span>
            </figcaption>
          </figure>
        </section>

        <section className="workspace-home-maintenance ui-card" aria-labelledby="maintenance-preview-title">
          <div className="workspace-section-heading">
            <div>
              <p className="ui-eyebrow">Keep the small things small</p>
              <h2 id="maintenance-preview-title">Maintenance preview</h2>
            </div>
            <span className="ui-tag ui-tag-demo">Sample schedule</span>
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
            <div className="workspace-maintenance-badges" aria-label="Maintenance sample badges">
              <span className="ui-tag ui-tag-warning">Review soon</span>
              <span className="ui-tag">Planning item</span>
              {latestService ? <span className="ui-tag ui-tag-success">Service log available</span> : null}
            </div>
          </div>

          <div className="workspace-card-footer">
            <span className="ui-muted">
              <CircleAlert aria-hidden="true" size={15} /> Sample reminder, not a measured fault
            </span>
            <button type="button" className="ui-btn ui-btn-quiet" onClick={() => setActiveTab('garage')}>
              Review service log <ChevronRight aria-hidden="true" size={16} />
            </button>
          </div>
        </section>

        <section className="workspace-home-tools" aria-labelledby="tools-title">
          <div className="workspace-section-heading workspace-section-heading-compact">
            <div>
              <p className="ui-eyebrow">Choose a starting point</p>
              <h2 id="tools-title">Your shortcuts</h2>
            </div>
            <p className="ui-muted">Built for the next useful action.</p>
          </div>

          <div className="workspace-tool-grid">
            <button type="button" className="workspace-tool-card" onClick={openDiagnosis}>
              <span className="workspace-tool-icon workspace-tool-icon-green" aria-hidden="true"><Sparkles size={19} /></span>
              <span>
                <strong>Diagnosis guide</strong>
                <small>Turn a symptom into a practical plan.</small>
              </span>
              <ChevronRight aria-hidden="true" size={18} />
            </button>
            <button type="button" className="workspace-tool-card" onClick={() => setActiveTab('acoustic')}>
              <span className="workspace-tool-icon workspace-tool-icon-lime" aria-hidden="true"><Headphones size={19} /></span>
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
              <span className="workspace-tool-icon workspace-tool-icon-forest" aria-hidden="true"><Wrench size={19} /></span>
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

        <p className="workspace-home-footnote">
          <Cpu aria-hidden="true" size={14} /> Profile data is reference material until you connect a compatible device.
        </p>
      </div>
    </main>
  );
}
