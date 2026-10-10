import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  FileText,
  Plus,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react';
import './WorkspaceViews.css';

const fleetFilters = ['All', 'Motorcycle', 'Scooter', 'Car'];

const formatDate = (value) => {
  if (!value) return 'Date not recorded';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const getVehicleMileage = (vehicle) => {
  if (vehicle?.mileage) return vehicle.mileage;
  if (vehicle?.odometer) return vehicle.odometer;

  return {
    splendor: '42,850 km',
    activa: '18,210 km',
    pulsar: '28,900 km',
  }[vehicle?.id] || 'Reference not recorded';
};

const normaliseVehicle = (vehicle, source) => ({
  ...vehicle,
  source,
  name: vehicle?.name || 'Unnamed vehicle',
  model: vehicle?.model || vehicle?.make || 'Model details pending',
  type: vehicle?.type || 'Motorcycle',
  mileage: getVehicleMileage(vehicle),
  engine: vehicle?.engine || 'Engine details pending',
  lastService: vehicle?.date || vehicle?.lastService,
});

export default function GarageView({
  selectedVehicle,
  serviceHistory = [],
  onAddServiceRecord,
  onAddMilestone,
  showMilestoneForm = false,
  setShowMilestoneForm,
  vehiclesList = [],
  onSelectVehicle,
}) {
  const [activeProfileTab, setActiveProfileTab] = useState('overview');
  const [garageFilter, setGarageFilter] = useState('All');
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [sessionVehicles, setSessionVehicles] = useState([]);
  const [newVehicleName, setNewVehicleName] = useState('');
  const [newVehicleModel, setNewVehicleModel] = useState('');
  const [newVehicleType, setNewVehicleType] = useState('Motorcycle');
  const [newVehicleEngine, setNewVehicleEngine] = useState('');
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [serviceTitle, setServiceTitle] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const [serviceCost, setServiceCost] = useState('');
  const [milestoneTitle, setMilestoneTitle] = useState('');
  const [milestoneDesc, setMilestoneDesc] = useState('');
  const addVehicleDialogRef = useRef(null);

  useEffect(() => {
    const dialog = addVehicleDialogRef.current;
    if (!dialog) return;

    if (showAddVehicleModal && !dialog.open) {
      dialog.showModal();
    } else if (!showAddVehicleModal && dialog.open) {
      dialog.close();
    }
  }, [showAddVehicleModal]);

  const profileVehicles = Array.isArray(vehiclesList) && vehiclesList.length
    ? vehiclesList
    : selectedVehicle
      ? [selectedVehicle]
      : [];
  const profileIds = new Set(profileVehicles.map((vehicle) => vehicle.id));
  const baseFleet = profileVehicles.map((vehicle) => normaliseVehicle(vehicle, 'profile'));
  if (selectedVehicle && !profileIds.has(selectedVehicle.id)) {
    baseFleet.push(normaliseVehicle(selectedVehicle, 'profile'));
  }
  const allVehicles = [...baseFleet, ...sessionVehicles];
  const filteredVehicles = allVehicles.filter((vehicle) => (
    garageFilter === 'All' || vehicle.type === garageFilter
  ));
  const milestones = selectedVehicle?.legacyMilestones || [];
  const canSelectVehicle = typeof onSelectVehicle === 'function';

  const closeAddVehicleModal = () => setShowAddVehicleModal(false);

  const handleAddVehicle = (event) => {
    event.preventDefault();
    if (!newVehicleName.trim() || !newVehicleModel.trim()) return;

    setSessionVehicles((current) => [
      ...current,
      normaliseVehicle({
        id: `session-${Date.now()}`,
        name: newVehicleName.trim(),
        model: newVehicleModel.trim(),
        type: newVehicleType,
        engine: newVehicleEngine.trim() || 'Engine details pending',
        mileage: 'Not recorded',
      }, 'session'),
    ]);
    setNewVehicleName('');
    setNewVehicleModel('');
    setNewVehicleEngine('');
    setNewVehicleType('Motorcycle');
    closeAddVehicleModal();
  };

  const handleAddServiceSubmit = (event) => {
    event.preventDefault();
    if (!serviceTitle.trim() || !serviceDesc.trim()) return;

    onAddServiceRecord?.({
      id: Date.now(),
      title: serviceTitle.trim(),
      desc: `${serviceDesc.trim()}${serviceCost ? ` · Cost: ₹${serviceCost}` : ''}`,
      date: new Date().toISOString().split('T')[0],
    });
    setServiceTitle('');
    setServiceDesc('');
    setServiceCost('');
    setShowServiceForm(false);
  };

  const handleAddMilestoneSubmit = (event) => {
    event.preventDefault();
    if (!milestoneTitle.trim() || !milestoneDesc.trim()) return;

    onAddMilestone?.({
      id: `milestone-${Date.now()}`,
      title: milestoneTitle.trim(),
      desc: milestoneDesc.trim(),
      date: new Date().toISOString().split('T')[0],
    });
    setMilestoneTitle('');
    setMilestoneDesc('');
    setShowMilestoneForm?.(false);
  };

  return (
    <main className="workspace-view workspace-garage">
      <div className="workspace-page">
        <header className="workspace-garage-header">
          <div>
            <p className="ui-eyebrow">Keep every ride accounted for</p>
            <h1 className="ui-title">Garage</h1>
            <p className="ui-muted workspace-garage-lede">
              Your fleet, service notes, and the stories that make each vehicle yours.
            </p>
          </div>
          <button type="button" className="ui-btn ui-btn-primary" onClick={() => setShowAddVehicleModal(true)}>
            <Plus aria-hidden="true" size={17} /> Add vehicle
          </button>
        </header>

        <section className="workspace-garage-intro ui-card">
          <div>
            <p className="ui-eyebrow">Fleet view</p>
            <h2>Choose a useful lens.</h2>
            <p className="ui-muted">Filter by vehicle type. The active profile remains the one selected in the main header.</p>
          </div>
          <div className="workspace-filter-list" role="group" aria-label="Filter garage vehicles">
            {fleetFilters.map((filter) => (
              <button
                type="button"
                key={filter}
                className={`workspace-filter ${garageFilter === filter ? 'is-active' : ''}`}
                onClick={() => setGarageFilter(filter)}
                aria-pressed={garageFilter === filter}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        <section aria-labelledby="fleet-title">
          <div className="workspace-section-heading workspace-section-heading-compact">
            <div>
              <p className="ui-eyebrow">Your vehicles</p>
              <h2 id="fleet-title">Fleet list</h2>
            </div>
            <span className="ui-tag">{filteredVehicles.length} {filteredVehicles.length === 1 ? 'vehicle' : 'vehicles'}</span>
          </div>

          {filteredVehicles.length ? (
            <div className="workspace-fleet-grid">
              {filteredVehicles.map((vehicle) => {
                const isActive = selectedVehicle?.id === vehicle.id;
                const isSession = vehicle.source === 'session';
                return (
                  <article className={`workspace-fleet-card ui-card ${isActive ? 'is-active' : ''}`} key={vehicle.id}>
                    <div className="workspace-fleet-card-topline">
                      <span className={`ui-tag ${isSession ? 'ui-tag-demo' : 'ui-tag-success'}`}>
                        {isSession ? 'Session only' : isActive ? 'Active profile' : vehicle.type}
                      </span>
                      {isActive ? <ShieldCheck aria-label="Active profile" size={18} /> : null}
                    </div>
                    <h3>{vehicle.name}</h3>
                    <p className="workspace-fleet-model">{vehicle.model}</p>
                    <dl className="workspace-fleet-facts">
                      <div><dt>Type</dt><dd>{vehicle.type}</dd></div>
                      <div><dt>Reference mileage</dt><dd>{vehicle.mileage}</dd></div>
                      <div><dt>Last service</dt><dd>{vehicle.lastService ? formatDate(vehicle.lastService) : 'Not recorded'}</dd></div>
                    </dl>
                    {isSession ? (
                      <p className="workspace-session-note">Added in this session. It is not saved to a backend.</p>
                    ) : null}
                    {canSelectVehicle && !isActive ? (
                      <button type="button" className="ui-btn ui-btn-quiet workspace-fleet-action" onClick={() => onSelectVehicle(vehicle)}>
                        Use this profile <ArrowUpRight aria-hidden="true" size={15} />
                      </button>
                    ) : null}
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="ui-empty workspace-empty-state">
              <Wrench aria-hidden="true" size={22} />
              <strong>No {garageFilter.toLowerCase()} vehicles yet</strong>
              <span>Add a session-only vehicle to keep planning.</span>
            </div>
          )}
        </section>

        <section className="workspace-active-profile ui-card" aria-labelledby="active-profile-title">
          <div className="workspace-section-heading">
            <div>
              <p className="ui-eyebrow">Active profile</p>
              <h2 id="active-profile-title">{selectedVehicle?.name || 'No vehicle selected'}</h2>
              <p className="ui-muted">{selectedVehicle?.make || 'Vehicle'} {selectedVehicle?.model ? `· ${selectedVehicle.model}` : ''}</p>
            </div>
            <span className="ui-tag ui-tag-success">Selected in header</span>
          </div>

          <nav className="workspace-profile-tabs" aria-label="Vehicle profile sections">
            {['overview', 'timeline', 'documents'].map((tab) => (
              <button
                type="button"
                key={tab}
                className={activeProfileTab === tab ? 'is-active' : ''}
                onClick={() => setActiveProfileTab(tab)}
                aria-current={activeProfileTab === tab ? 'page' : undefined}
              >
                {tab}
              </button>
            ))}
          </nav>

          {activeProfileTab === 'overview' ? (
            <div className="workspace-profile-overview">
              <div className="workspace-profile-detail-grid">
                <div><span>Vehicle type</span><strong>{selectedVehicle?.type || 'Not recorded'}</strong></div>
                <div><span>Engine</span><strong>{selectedVehicle?.engine || 'Not recorded'}</strong></div>
                <div><span>Reference mileage</span><strong>{getVehicleMileage(selectedVehicle)}</strong></div>
                <div><span>Power profile</span><strong>{selectedVehicle?.power || 'Not recorded'}</strong></div>
              </div>
              <div className="workspace-profile-callout">
                <Sparkles aria-hidden="true" size={18} />
                <div>
                  <strong>Keep this profile useful</strong>
                  <p>Connect a compatible source or add a service entry when you have a confirmed workshop note.</p>
                </div>
              </div>
            </div>
          ) : null}

          {activeProfileTab === 'timeline' ? (
            <div className="workspace-profile-timeline">
              <div className="workspace-profile-tab-heading">
                <div>
                  <h3>Family and service milestones</h3>
                  <p className="ui-muted">Preserve the story behind the machine.</p>
                </div>
                <button type="button" className="ui-btn ui-btn-quiet" onClick={() => setShowMilestoneForm?.(!showMilestoneForm)}>
                  <Plus aria-hidden="true" size={16} /> Log milestone
                </button>
              </div>

              {showMilestoneForm ? (
                <form className="workspace-form ui-card" onSubmit={handleAddMilestoneSubmit}>
                  <div className="workspace-form-heading">
                    <div><p className="ui-eyebrow">New entry</p><h3>Record a milestone</h3></div>
                    <button type="button" className="workspace-icon-button" onClick={() => setShowMilestoneForm?.(false)} aria-label="Close milestone form">
                      <X aria-hidden="true" size={17} />
                    </button>
                  </div>
                  <label className="ui-label" htmlFor="milestone-title">Milestone title</label>
                  <input id="milestone-title" className="ui-input" type="text" value={milestoneTitle} onChange={(event) => setMilestoneTitle(event.target.value)} placeholder="e.g. Paint restoration" required />
                  <label className="ui-label" htmlFor="milestone-description">Story or description</label>
                  <textarea id="milestone-description" className="ui-input workspace-textarea" value={milestoneDesc} onChange={(event) => setMilestoneDesc(event.target.value)} placeholder="What should future you remember?" required />
                  <button type="submit" className="ui-btn ui-btn-primary">Save milestone <Check aria-hidden="true" size={16} /></button>
                </form>
              ) : null}

              {milestones.length ? (
                <ol className="workspace-timeline-list">
                  {milestones.map((milestone) => (
                    <li key={milestone.id}>
                      <span className="workspace-timeline-marker" aria-hidden="true" />
                      <div><time dateTime={milestone.date}>{formatDate(milestone.date)}</time><h4>{milestone.title}</h4><p>{milestone.desc}</p></div>
                    </li>
                  ))}
                </ol>
              ) : (
                <div className="ui-empty workspace-empty-state"><CalendarDays aria-hidden="true" size={21} /><strong>No milestones logged yet</strong><span>Start with the memory you want to keep.</span></div>
              )}
            </div>
          ) : null}

          {activeProfileTab === 'documents' ? (
            <div className="workspace-document-grid">
              <div className="workspace-document-placeholder"><FileText aria-hidden="true" size={20} /><div><strong>Registration documents</strong><span>Document storage can be connected later.</span></div><span className="ui-tag ui-tag-demo">Placeholder</span></div>
              <div className="workspace-document-placeholder"><FileText aria-hidden="true" size={20} /><div><strong>Insurance and permits</strong><span>Keep expiry notes with the profile.</span></div><span className="ui-tag ui-tag-demo">Placeholder</span></div>
            </div>
          ) : null}
        </section>

        <section className="workspace-service-section" aria-labelledby="service-log-title">
          <div className="workspace-section-heading workspace-section-heading-compact">
            <div>
              <p className="ui-eyebrow">Confirmed work</p>
              <h2 id="service-log-title">Service log</h2>
            </div>
            <button type="button" className="ui-btn ui-btn-quiet" onClick={() => setShowServiceForm((current) => !current)}>
              <Plus aria-hidden="true" size={16} /> Log service
            </button>
          </div>

          {showServiceForm ? (
            <form className="workspace-form ui-card" onSubmit={handleAddServiceSubmit}>
              <div className="workspace-form-heading">
                <div><p className="ui-eyebrow">New entry</p><h3>Record completed work</h3></div>
                <button type="button" className="workspace-icon-button" onClick={() => setShowServiceForm(false)} aria-label="Close service form"><X aria-hidden="true" size={17} /></button>
              </div>
              <label className="ui-label" htmlFor="service-title">Service title</label>
              <input id="service-title" className="ui-input" type="text" value={serviceTitle} onChange={(event) => setServiceTitle(event.target.value)} placeholder="e.g. Engine oil change" required />
              <label className="ui-label" htmlFor="service-description">Work completed</label>
              <textarea id="service-description" className="ui-input workspace-textarea" value={serviceDesc} onChange={(event) => setServiceDesc(event.target.value)} placeholder="Parts, checks, or adjustments completed" required />
              <label className="ui-label" htmlFor="service-cost">Cost in INR <span>(optional)</span></label>
              <input id="service-cost" className="ui-input" type="number" min="0" value={serviceCost} onChange={(event) => setServiceCost(event.target.value)} placeholder="0" />
              <button type="submit" className="ui-btn ui-btn-primary">Save service entry <Check aria-hidden="true" size={16} /></button>
            </form>
          ) : null}

          {serviceHistory.length ? (
            <div className="workspace-service-list">
              {serviceHistory.map((service) => (
                <article className="workspace-service-entry ui-card" key={service.id}>
                  <span className="workspace-service-check" aria-hidden="true"><Check size={16} /></span>
                  <div><time dateTime={service.date}>{formatDate(service.date)}</time><h3>{service.title}</h3><p>{service.desc}</p></div>
                </article>
              ))}
            </div>
          ) : (
            <div className="ui-empty workspace-empty-state"><Wrench aria-hidden="true" size={21} /><strong>Your service log is ready</strong><span>Save the next confirmed job here.</span></div>
          )}
        </section>
      </div>

      <dialog
        ref={addVehicleDialogRef}
        className="workspace-dialog"
        onCancel={(event) => {
          event.preventDefault();
          closeAddVehicleModal();
        }}
        onClose={closeAddVehicleModal}
        aria-labelledby="add-vehicle-title"
      >
        <form method="dialog" className="workspace-dialog-form" onSubmit={handleAddVehicle}>
          <div className="workspace-form-heading">
            <div><p className="ui-eyebrow">Add to this session</p><h2 id="add-vehicle-title">Add a vehicle</h2></div>
            <button type="button" className="workspace-icon-button" onClick={closeAddVehicleModal} aria-label="Close add vehicle dialog"><X aria-hidden="true" size={18} /></button>
          </div>
          <p className="workspace-dialog-note">This local ride is session-only. It will appear in this view but is not saved to a backend or made active automatically.</p>
          <label className="ui-label" htmlFor="new-vehicle-name">Vehicle name</label>
          <input id="new-vehicle-name" className="ui-input" type="text" value={newVehicleName} onChange={(event) => setNewVehicleName(event.target.value)} placeholder="e.g. Weekend commuter" autoFocus required />
          <label className="ui-label" htmlFor="new-vehicle-model">Make and model</label>
          <input id="new-vehicle-model" className="ui-input" type="text" value={newVehicleModel} onChange={(event) => setNewVehicleModel(event.target.value)} placeholder="e.g. 2022 Honda CB Shine" required />
          <label className="ui-label" htmlFor="new-vehicle-type">Vehicle type</label>
          <select id="new-vehicle-type" className="ui-input" value={newVehicleType} onChange={(event) => setNewVehicleType(event.target.value)}>
            <option value="Motorcycle">Motorcycle</option>
            <option value="Scooter">Scooter</option>
            <option value="Car">Car</option>
          </select>
          <label className="ui-label" htmlFor="new-vehicle-engine">Engine details <span>(optional)</span></label>
          <input id="new-vehicle-engine" className="ui-input" type="text" value={newVehicleEngine} onChange={(event) => setNewVehicleEngine(event.target.value)} placeholder="e.g. 125cc single cylinder" />
          <div className="workspace-dialog-actions">
            <button type="button" className="ui-btn ui-btn-quiet" onClick={closeAddVehicleModal}>Cancel</button>
            <button type="submit" className="ui-btn ui-btn-primary">Add session vehicle <Plus aria-hidden="true" size={16} /></button>
          </div>
        </form>
      </dialog>
    </main>
  );
}
