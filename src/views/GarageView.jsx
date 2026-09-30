import React, { useState } from 'react';
import { Calendar, ShieldAlert, Award, FileText, ChevronRight, Plus, Check, Trash2, Heart } from 'lucide-react';

export default function GarageView({ 
  selectedVehicle, 
  serviceHistory, 
  onAddServiceRecord, 
  onAddMilestone, 
  showMilestoneForm, 
  setShowMilestoneForm 
}) {
  const [activeProfileTab, setActiveProfileTab] = useState('overview'); // overview | timeline | documents
  const [garageFilter, setGarageFilter] = useState('All');
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);

  // New vehicle form state
  const [newVehicleName, setNewVehicleName] = useState('');
  const [newVehicleModel, setNewVehicleModel] = useState('');
  const [newVehicleType, setNewVehicleType] = useState('Motorcycle');
  const [newVehicleEngine, setNewVehicleEngine] = useState('');

  const [vehiclesList, setVehiclesList] = useState([
    { id: 'classic350', name: "Papa's Bullet", model: '2019 Royal Enfield Classic 350', mileage: '42,912 km', health: 87, date: 'Dec 12, 2025', type: 'Motorcycle' },
    { id: 'activa', name: "Mom's Activa", model: '2021 Honda Activa 6G', mileage: '18,210 km', health: 74, date: 'Oct 05, 2025', type: 'Scooter' }
  ]);

  // Service Form State
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [serviceTitle, setServiceTitle] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const [serviceCost, setServiceCost] = useState('');

  const [milestoneTitle, setMilestoneTitle] = useState('');
  const [milestoneDesc, setMilestoneDesc] = useState('');

  const handleAddVehicle = (e) => {
    e.preventDefault();
    if (!newVehicleName || !newVehicleModel) return;

    const newV = {
      id: Date.now().toString(),
      name: newVehicleName,
      model: newVehicleModel,
      mileage: '0 km',
      health: 100,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      type: newVehicleType,
      engine: newVehicleEngine || '110cc, Single Cylinder'
    };

    setVehiclesList([...vehiclesList, newV]);
    setNewVehicleName('');
    setNewVehicleModel('');
    setNewVehicleEngine('');
    setShowAddVehicleModal(false);
  };

  const handleAddServiceSubmit = (e) => {
    e.preventDefault();
    if (!serviceTitle || !serviceDesc) return;

    onAddServiceRecord({
      id: Date.now(),
      title: serviceTitle,
      desc: `${serviceDesc} • Cost: ₹${serviceCost || '0'}`,
      date: new Date().toISOString().split('T')[0]
    });

    setServiceTitle('');
    setServiceDesc('');
    setServiceCost('');
    setShowServiceForm(false);
  };

  const handleAddMilestoneSubmit = (e) => {
    e.preventDefault();
    if (!milestoneTitle || !milestoneDesc) return;
    
    onAddMilestone({
      id: Date.now().toString(),
      title: milestoneTitle,
      desc: milestoneDesc,
      date: new Date().toISOString().split('T')[0]
    });

    setMilestoneTitle('');
    setMilestoneDesc('');
    setShowMilestoneForm(false);
  };

  const filteredVehicles = vehiclesList.filter(v => {
    if (garageFilter === 'All') return true;
    return v.type === garageFilter;
  });

  return (
    <div className="flex-1 flex flex-col p-4 pb-28 text-white space-y-5 relative">
      
      {/* Garage Header */}
      <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
        <div>
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Manage Fleet</span>
          <h3 className="text-sm font-black text-cyan-400">My Garage</h3>
        </div>
        <button 
          onClick={() => setShowAddVehicleModal(true)}
          className="text-xs bg-cyan-500 text-black px-3 py-1.5 rounded-xl font-bold flex items-center gap-1 shadow-lg shadow-cyan-500/10"
        >
          <Plus className="w-3.5 h-3.5 text-black" /> Add Ride
        </button>
      </div>

      {/* Fleet Filters */}
      <div className="flex gap-1.5 text-[10px] overflow-x-auto pb-1 scrollbar-none font-bold uppercase tracking-wider">
        {['All', 'Motorcycles', 'Scooters', 'Cars'].map((filter) => (
          <button
            key={filter}
            onClick={() => setGarageFilter(filter)}
            className={`px-3.5 py-1.5 rounded-lg border transition-colors ${
              garageFilter === filter ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-[#1A1A22] border-zinc-800 text-zinc-400'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Vehicles Fleet List */}
      <div className="grid gap-3">
        {filteredVehicles.map((v) => (
          <div 
            key={v.id}
            className="bg-[#14141B] border border-zinc-850 rounded-2xl p-4 flex justify-between items-start hover:border-zinc-700 transition-colors shadow-lg"
          >
            <div>
              <h4 className="font-extrabold text-sm text-zinc-200">{v.name}</h4>
              <p className="text-[10px] text-zinc-500 mt-0.5">{v.model}</p>
              <p className="text-xs font-bold text-zinc-400 mt-1.5">{v.mileage} • Last Service: {v.date}</p>
            </div>
            
            <div className="flex flex-col items-end justify-between h-full gap-2">
              <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2.5 py-0.5 rounded font-black">
                {v.health}% Health
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Vehicle Profile (Details + Tabs) */}
      <div className="bg-[#1A1A22] border border-zinc-850 rounded-3xl p-4 space-y-4 shadow-2xl">
        <div className="flex justify-between items-center border-b border-zinc-800/60 pb-3">
          <div>
            <span className="text-[8px] text-zinc-500 uppercase tracking-widest font-black block">Active Vehicle Profile</span>
            <h3 className="text-sm font-black text-zinc-200">{selectedVehicle.name}</h3>
            <p className="text-[10px] text-zinc-500">{selectedVehicle.engine}</p>
          </div>
        </div>

        {/* Profile Inner Tabs Selector */}
        <div className="flex border-b border-zinc-850 text-xs font-bold uppercase tracking-wider">
          {['overview', 'timeline', 'documents'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveProfileTab(tab)}
              className={`flex-1 text-center pb-2 border-b-2 transition-colors ${
                activeProfileTab === tab ? 'border-cyan-500 text-cyan-400 font-bold' : 'border-transparent text-zinc-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Sub-tab */}
        {activeProfileTab === 'overview' && (
          <div className="space-y-4 animate-fade-in text-xs">
            {/* Critical Health Systems */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Critical Health Systems</h4>
              
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-zinc-900 border border-zinc-850 p-2.5 rounded-xl flex items-center justify-between">
                  <span className="text-zinc-400">Engine Output</span>
                  <span className="font-bold text-green-400">92% Healthy</span>
                </div>
                <div className="bg-zinc-900 border border-zinc-850 p-2.5 rounded-xl flex items-center justify-between">
                  <span className="text-zinc-400">Battery charge</span>
                  <span className="font-bold text-green-400">84% Healthy</span>
                </div>
                <div className="bg-zinc-900 border border-zinc-850 p-2.5 rounded-xl flex items-center justify-between">
                  <span className="text-zinc-400">Tyre Treads</span>
                  <span className="font-bold text-yellow-400">52% Inspect</span>
                </div>
                <div className="bg-zinc-900 border border-zinc-850 p-2.5 rounded-xl flex items-center justify-between">
                  <span className="text-zinc-400">Oil Life</span>
                  <span className="font-bold text-red-400">12% Replace</span>
                </div>
              </div>
            </div>

            {/* Vehicle Metadata specs */}
            <div className="space-y-2 pt-1">
              <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Vehicle Parameters</h4>
              <div className="bg-zinc-900 border border-zinc-850 p-3 rounded-xl space-y-2 font-mono text-[10px] text-zinc-400">
                <div className="flex justify-between">
                  <span>Chassis Reg ID</span>
                  <span className="text-zinc-300">ME3SK18E0J482910</span>
                </div>
                <div className="flex justify-between">
                  <span>Insurance Policy</span>
                  <span className="text-yellow-400">Expires in 15d</span>
                </div>
                <div className="flex justify-between">
                  <span>Pollution Cert (PUC)</span>
                  <span className="text-green-400">Expires in 94d</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Timeline Sub-tab (Father-to-Son history) */}
        {activeProfileTab === 'timeline' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center border-b border-zinc-850 pb-1.5">
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-black block">Father-to-Son Family Timeline</span>
              <button 
                onClick={() => setShowMilestoneForm(!showMilestoneForm)}
                className="text-[9px] text-cyan-400 hover:text-cyan-300 font-bold uppercase tracking-wider"
              >
                + Log Milestone
              </button>
            </div>

            {showMilestoneForm && (
              <form onSubmit={handleAddMilestoneSubmit} className="bg-zinc-900 border border-zinc-850 rounded-xl p-3 space-y-2.5">
                <input 
                  type="text"
                  placeholder="Milestone title (e.g. Paint Restoration)..."
                  value={milestoneTitle}
                  onChange={(e) => setMilestoneTitle(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
                <textarea 
                  placeholder="Family memory description..."
                  value={milestoneDesc}
                  onChange={(e) => setMilestoneDesc(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-cyan-500 min-h-[50px]"
                />
                <button type="submit" className="w-full bg-cyan-500 text-black rounded py-1.5 text-xs font-bold hover:bg-cyan-600 transition-colors">
                  Add Milestone
                </button>
              </form>
            )}

            <div className="relative pl-4 border-l border-zinc-800 space-y-3.5">
              {selectedVehicle.legacyMilestones.map((m) => (
                <div key={m.id} className="relative">
                  <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-cyan-500 ring-4 ring-[#1A1A22]"></span>
                  <div className="space-y-0.5">
                    <span className="text-[8px] text-zinc-500 block font-semibold">{m.date}</span>
                    <h5 className="text-xs font-bold text-zinc-200">{m.title}</h5>
                    <p className="text-[10px] text-zinc-400 leading-normal">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Documents Sub-tab */}
        {activeProfileTab === 'documents' && (
          <div className="space-y-2.5 animate-fade-in text-xs">
            <div className="bg-zinc-900 border border-zinc-850 p-3 rounded-xl flex items-center justify-between hover:border-zinc-700 transition-colors cursor-pointer">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span className="font-bold">Registration Certificate (RC)</span>
              </div>
              <span className="text-[9px] text-zinc-500 font-mono">PDF • 1.2 MB</span>
            </div>

            <div className="bg-zinc-900 border border-zinc-850 p-3 rounded-xl flex items-center justify-between hover:border-zinc-700 transition-colors cursor-pointer">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span className="font-bold">Insurance Policy Bond</span>
              </div>
              <span className="text-[9px] text-zinc-500 font-mono">PDF • 820 KB</span>
            </div>
          </div>
        )}
      </div>

      {/* Record Service Log section */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Service & DIY Logbook</h4>
          <button 
            onClick={() => setShowServiceForm(!showServiceForm)}
            className="text-[10px] text-cyan-400 hover:text-cyan-300 font-bold uppercase tracking-wider"
          >
            + Log Service
          </button>
        </div>

        {showServiceForm && (
          <form onSubmit={handleAddServiceSubmit} className="bg-[#1A1A22] border border-zinc-800 rounded-xl p-3.5 space-y-3.5">
            <h5 className="text-xs font-bold text-zinc-200">Log New Service Event</h5>
            <input 
              type="text"
              placeholder="Title (e.g. Engine Oil Swap)..."
              value={serviceTitle}
              onChange={(e) => setServiceTitle(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-850 rounded px-2.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
            <textarea 
              placeholder="Provide a description of parts, items, or checks performed..."
              value={serviceDesc}
              onChange={(e) => setServiceDesc(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-850 rounded px-2.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 min-h-[60px]"
            />
            <input 
              type="number"
              placeholder="Cost in INR (optional)..."
              value={serviceCost}
              onChange={(e) => setServiceCost(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-850 rounded px-2.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
            <button type="submit" className="w-full bg-cyan-500 text-black py-2 rounded text-xs font-bold hover:bg-cyan-600 transition-colors">
              Save Log
            </button>
          </form>
        )}

        <div className="space-y-2">
          {serviceHistory.map((s) => (
            <div key={s.id} className="bg-zinc-900 border border-zinc-850 rounded-xl p-3 flex justify-between items-center">
              <div>
                <span className="text-[9px] text-zinc-500 block font-semibold">{s.date}</span>
                <h5 className="text-xs font-bold text-zinc-300">{s.title}</h5>
                <p className="text-[10px] text-zinc-500 mt-0.5 leading-normal">{s.desc}</p>
              </div>
              <div className="w-6 h-6 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Vehicle Modal Form overlay */}
      {showAddVehicleModal && (
        <div className="absolute inset-0 bg-black/85 z-[99] flex items-center justify-center p-4">
          <form onSubmit={handleAddVehicle} className="bg-[#1C1C24] border border-zinc-800 rounded-3xl p-5 w-full max-w-[340px] space-y-4 shadow-2xl">
            <h4 className="text-sm font-black text-cyan-400 uppercase tracking-wider">Add Vehicle to Garage</h4>
            
            <div className="space-y-3 text-xs">
              <input 
                type="text"
                placeholder="Vehicle Name (e.g. Papa's Bullet)..."
                value={newVehicleName}
                onChange={(e) => setNewVehicleName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                required
              />
              <input 
                type="text"
                placeholder="Model Detail (e.g. 2019 Royal Enfield)..."
                value={newVehicleModel}
                onChange={(e) => setNewVehicleModel(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                required
              />
              <input 
                type="text"
                placeholder="Engine displacement (e.g. 349cc)..."
                value={newVehicleEngine}
                onChange={(e) => setNewVehicleEngine(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
              />
              <select 
                value={newVehicleType} 
                onChange={(e) => setNewVehicleType(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none"
              >
                <option value="Motorcycle">Motorcycle</option>
                <option value="Scooter">Scooter</option>
                <option value="Car">Car</option>
              </select>
            </div>

            <div className="flex gap-2 pt-2 text-xs">
              <button 
                type="submit"
                className="flex-1 bg-cyan-500 text-black py-2.5 rounded-xl font-bold hover:bg-cyan-600 transition-colors"
              >
                Save
              </button>
              <button 
                type="button" 
                onClick={() => setShowAddVehicleModal(false)}
                className="flex-1 bg-zinc-900 border border-zinc-800 py-2.5 rounded-xl font-bold hover:bg-zinc-800 transition-colors text-zinc-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
