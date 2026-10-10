import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  BatteryCharging,
  ChevronRight,
  CircleCheck,
  CircleHelp,
  Disc3,
  Droplets,
  Gauge,
  Link2,
  RefreshCw,
  Sparkles,
  Wrench,
} from 'lucide-react';
import './WorkspaceViews.css';

const observations = {
  engine: {
    title: 'Engine oil',
    label: 'Engine · inspect oil',
    status: 'Review soon',
    tone: 'warning',
    position: { top: '44%', left: '39%' },
    description: 'A sample observation showing how a lubrication follow-up could be explained in a report.',
    detail: 'Confirm level and condition with the engine cool. The figures below are illustrative sample values.',
    metrics: [
      ['Oil life', 'Sample 12%'],
      ['Viscosity', '10W-30 example'],
      ['Sump temp', '94°C example'],
    ],
  },
  brakes: {
    title: 'Braking system',
    label: 'Brakes · review pads',
    status: 'Looks good',
    tone: 'success',
    position: { top: '54%', left: '16%' },
    description: 'A sample observation for a visual brake and fluid check.',
    detail: 'Use the report as a checklist, then confirm wear and fluid condition during an in-person inspection.',
    metrics: [
      ['Pad wear', 'Sample 12%'],
      ['Pressure', '120 psi example'],
      ['Fluid', 'Sample normal'],
    ],
  },
  controls: {
    title: 'Controls and electrical',
    label: 'Controls · switchgear',
    status: 'Looks good',
    tone: 'success',
    position: { top: '28%', left: '49%' },
    description: 'A sample observation for switchgear, throttle position, and control checks.',
    detail: 'Test the kill switch, clutch switch, and throttle response with the vehicle safely parked.',
    metrics: [
      ['TPS', '0.85 V example'],
      ['CAN bus', 'Sample synced'],
      ['Switchgear', 'Example OK'],
    ],
  },
  spark: {
    title: 'Ignition and spark plug',
    label: 'Spark plug · clean',
    status: 'Looks good',
    tone: 'success',
    position: { top: '48%', left: '56%' },
    description: 'A sample observation for a spark plug inspection.',
    detail: 'Inspect only with a cool engine and follow the model-specific torque and gap guidance.',
    metrics: [
      ['Gap', '0.72 mm example'],
      ['Arc voltage', '18 kV example'],
      ['Timing', '10° BTDC example'],
    ],
  },
  chain: {
    title: 'Drive chain',
    label: 'Chain · adjust slack',
    status: 'Review soon',
    tone: 'warning',
    position: { top: '65%', left: '27%' },
    description: 'A sample observation for checking chain slack and final-drive condition.',
    detail: 'Measure slack at the manufacturer’s reference point with the engine off and the vehicle secured.',
    metrics: [
      ['Slack', '38 mm example'],
      ['Target', '25–30 mm example'],
      ['Wear', '18% example'],
    ],
  },
};

const subsystems = [
  {
    id: 'powertrain',
    title: 'Powertrain and ignition',
    description: 'Spark and combustion checks are represented with sample observations.',
    status: 'Looks good',
    tone: 'success',
    icon: Wrench,
    observation: 'spark',
  },
  {
    id: 'lubrication',
    title: 'Engine oil and lubrication',
    description: 'Sample follow-up: confirm level, condition, and the next service interval.',
    status: 'Review soon',
    tone: 'warning',
    icon: Droplets,
    observation: 'engine',
  },
  {
    id: 'brakes',
    title: 'Hydraulic braking system',
    description: 'Sample visual check for pads, fluid, and lever feel.',
    status: 'Looks good',
    tone: 'success',
    icon: Disc3,
    observation: 'brakes',
  },
  {
    id: 'chain',
    title: 'Drive chain and final drive',
    description: 'Sample follow-up: measure slack and check lubrication before riding.',
    status: 'Review soon',
    tone: 'warning',
    icon: Link2,
    observation: 'chain',
  },
  {
    id: 'electrical',
    title: 'Electrical circuit and battery',
    description: 'Sample check for charging, resting voltage, and visible terminal condition.',
    status: 'Looks good',
    tone: 'success',
    icon: BatteryCharging,
    observation: 'controls',
  },
];

export default function HudDiagnosticsView({ selectedVehicle, setActiveTab, setDiagnoseInput }) {
  const [selectedHotspot, setSelectedHotspot] = useState('engine');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [previewMessage, setPreviewMessage] = useState('Preview report ready · no live vehicle connection');
  const vehicleName = selectedVehicle?.name || 'selected vehicle';
  const activeObservation = observations[selectedHotspot] || observations.engine;

  useEffect(() => {
    if (!isRefreshing) return undefined;

    const timer = window.setTimeout(() => {
      setIsRefreshing(false);
      setPreviewMessage('Preview refreshed · sample observations unchanged');
    }, 1600);

    return () => window.clearTimeout(timer);
  }, [isRefreshing]);

  const refreshPreview = () => {
    setIsRefreshing(true);
    setPreviewMessage('Simulating a report refresh · no OBD data is being read');
  };

  const askGuide = () => {
    setDiagnoseInput?.(
      `I reviewed the demo vehicle inspection for my ${vehicleName}. The selected observation is ${activeObservation.title}. ${activeObservation.detail} Help me make a safe service plan.`,
    );
    setActiveTab('diagnose');
  };

  return (
    <main className="workspace-view workspace-hud">
      <div className="workspace-page">
        <header className="workspace-hud-header">
          <div>
            <p className="ui-eyebrow">Vehicle inspection</p>
            <h1 className="ui-title">A clearer look under the hood.</h1>
            <p className="ui-muted workspace-hud-lede">
              Review a guided, illustrative report for <strong>{vehicleName}</strong>.
            </p>
          </div>
          <div className="workspace-hud-header-actions">
            <span className="ui-tag ui-tag-demo">Demo report</span>
            <button type="button" className="ui-btn ui-btn-quiet" onClick={refreshPreview} disabled={isRefreshing}>
              <RefreshCw aria-hidden="true" size={16} className={isRefreshing ? 'workspace-spin' : ''} />
              {isRefreshing ? 'Refreshing preview' : 'Refresh preview'}
            </button>
          </div>
        </header>

        <section className="workspace-hud-notice" aria-label="Demo report notice">
          <span className="workspace-notice-mark" aria-hidden="true"><CircleHelp size={18} /></span>
          <div>
            <strong>Illustrative inspection only</strong>
            <p>
              This report is a product preview with sample metrics. It does not read live OBD data or
              declare a measured vehicle fault.
            </p>
          </div>
          <span className="ui-tag ui-tag-demo">{previewMessage}</span>
        </section>

        <section className="workspace-hud-report ui-card" aria-labelledby="inspection-report-title">
          <div className="workspace-section-heading">
            <div>
              <p className="ui-eyebrow">Inspection report</p>
              <h2 id="inspection-report-title">Illustrated vehicle blueprint</h2>
            </div>
            <span className="ui-tag">2 sample follow-ups · 0 critical</span>
          </div>

          <div className="workspace-hud-report-grid">
            <figure className="workspace-hud-viewport">
              <img
                src="/hud_motorcycle_wireframe.jpg"
                alt="Illustrative dark motorcycle blueprint with sample inspection points"
              />
              <div className="workspace-blueprint-label workspace-blueprint-label-top">
                <span>REFERENCE BLUEPRINT</span>
                <small>Illustration · profile: {vehicleName}</small>
              </div>
              <div className="workspace-blueprint-label workspace-blueprint-label-bottom">
                <span>SIMULATION VIEW</span>
                <small>{isRefreshing ? 'Updating sample layer…' : 'No live OBD stream'}</small>
              </div>
              {isRefreshing ? <div className="workspace-scan-sweep" aria-hidden="true" /> : null}

              {Object.entries(observations).map(([key, observation]) => (
                <button
                  type="button"
                  key={key}
                  className={`workspace-hotspot workspace-hotspot-${observation.tone} ${selectedHotspot === key ? 'is-selected' : ''}`}
                  style={{ top: observation.position.top, left: observation.position.left }}
                  onClick={() => setSelectedHotspot(key)}
                  aria-label={`Show sample observation: ${observation.label}`}
                  aria-pressed={selectedHotspot === key}
                >
                  <span className="workspace-hotspot-marker" aria-hidden="true"><span /></span>
                  <span className="workspace-hotspot-label">{observation.label}</span>
                </button>
              ))}
              <figcaption className="workspace-hud-figure-caption">
                <Gauge aria-hidden="true" size={15} /> Select a marked area to review a sample observation.
              </figcaption>
            </figure>

            <aside className="workspace-hud-observation" aria-live="polite" aria-labelledby="selected-observation-title">
              <div className="workspace-observation-heading">
                <div>
                  <p className="ui-eyebrow">Selected observation</p>
                  <h3 id="selected-observation-title">{activeObservation.title}</h3>
                </div>
                <span className={`ui-tag ${activeObservation.tone === 'warning' ? 'ui-tag-warning' : 'ui-tag-success'}`}>
                  {activeObservation.status}
                </span>
              </div>
              <p className="workspace-observation-copy">{activeObservation.description}</p>
              <div className="workspace-sample-metrics" aria-label="Illustrative sample metrics">
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
              <p className="ui-eyebrow">Report sections</p>
              <h2 id="subsystems-title">Subsystem observations</h2>
            </div>
            <p className="ui-muted">Select a row to focus its point on the blueprint.</p>
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
                  <span className="workspace-subsystem-icon" aria-hidden="true"><Icon size={19} /></span>
                  <span className="workspace-subsystem-copy">
                    <strong>{subsystem.title}</strong>
                    <small>{subsystem.description}</small>
                  </span>
                  <span className={`ui-tag ${subsystem.tone === 'warning' ? 'ui-tag-warning' : 'ui-tag-success'}`}>
                    {subsystem.status}
                  </span>
                  <ChevronRight aria-hidden="true" size={18} />
                </button>
              );
            })}
          </div>
        </section>

        <footer className="workspace-hud-footer">
          <div>
            <CircleCheck aria-hidden="true" size={18} />
            <span><strong>Next step:</strong> use the service guide to turn an observation into a safe checklist.</span>
          </div>
          <button type="button" className="ui-btn ui-btn-quiet" onClick={() => setActiveTab('garage')}>
            View garage records <ChevronRight aria-hidden="true" size={16} />
          </button>
        </footer>
      </div>
    </main>
  );
}
