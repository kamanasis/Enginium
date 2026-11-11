import React, { lazy, Suspense, useState } from 'react';
import {
  Activity,
  Award,
  BatteryCharging,
  ChevronRight,
  CircleDot,
  Cpu,
  Crosshair,
  Disc,
  Droplet,
  Flame,
  Fuel,
  Gauge,
  HelpCircle,
  ImageOff,
  RefreshCw,
  Search,
  Settings,
  Shield,
  ShieldAlert,
  Wind,
  X,
  Zap,
} from 'lucide-react';
import { BIKE_PART_IDS } from '../data/bikeParts';
import './ToolViews.css';

const BikeBlueprintViewer = lazy(() => import('../components/BikeBlueprintViewer'));

const POPULAR_SEARCHES = ['Spark Plug', 'Engine Oil', 'Carburetor', 'Brake Pads', 'Battery', 'Drive Chain', 'Air Filter', 'Clutch'];

const MODULES = [
  {
    id: 'engine',
    title: 'Engine basics (4-stroke)',
    desc: 'Learn about the piston, cylinder head, valves, and the Otto cycle.',
    progress: 78,
    quizzes: [
      { question: 'What are the four strokes of a motorcycle engine in sequence?', options: ['Intake, Compression, Power, Exhaust', 'Ignition, Combustion, Speed, Rebound', 'Inlet, Spark, Drive, Cleanup'], correct: 0 },
      { question: 'What regulates the opening of intake and exhaust valves?', options: ['Spark plug ignition timing', 'Camshaft lobes rotating on the timing chain', 'Tire pressure expansion force'], correct: 1 },
    ],
  },
  {
    id: 'brakes',
    title: 'Brake systems & fluids',
    desc: 'Understand friction materials, master cylinders, caliper pressure, and safety.',
    progress: 15,
    quizzes: [
      { question: 'Why should you never clean brake discs with oil or grease?', options: ['It dissolves the metal alloy', 'It destroys friction, leading to brake failure', 'It causes squeaking noises only'], correct: 1 },
    ],
  },
];

const CATEGORIES = ['All', 'Engine', 'Fuel & Exhaust', 'Transmission', 'Brakes', 'Suspension', 'Wheels', 'Electrical'];

export default function LearnView({
  selectedVehicle,
  activeSegment,
  setActiveSegment,
  selectedPart,
  setSelectedPart,
  selectedModule,
  setSelectedModule,
  showQuizResult,
  setShowQuizResult,
  quizIndex,
  setQuizIndex,
  quizScore,
  setQuizScore,
  selectedAnswer,
  setSelectedAnswer,
  inspectionRequest,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showAllParts, setShowAllParts] = useState(false);
  const [show3D, setShow3D] = useState(true);

  const getMatchSnippet = (part, query) => {
    if (!query) return null;
    const q = query.toLowerCase().trim();
    if (part.name.toLowerCase().includes(q)) return null;
    if (part.symptoms && part.symptoms.toLowerCase().includes(q)) {
      return `Symptom: ${part.symptoms}`;
    }
    if (part.function && part.function.toLowerCase().includes(q)) {
      return `Function: ${part.function}`;
    }
    if (part.tools && part.tools.some((t) => t.toLowerCase().includes(q))) {
      const matchedTool = part.tools.find((t) => t.toLowerCase().includes(q));
      return `Tool: ${matchedTool}`;
    }
    if (part.failures && part.failures.toLowerCase().includes(q)) {
      return `Issue: ${part.failures}`;
    }
    return null;
  };

  const getCategoryCount = (category) => {
    if (category === 'All') return selectedVehicle.parts.length;
    return selectedVehicle.parts.filter((p) => p.category === category).length;
  };

  const filteredParts = selectedVehicle.parts.filter((part) => {
    const search = searchTerm.toLowerCase().trim();
    const matchesSearch = !search
      || part.name.toLowerCase().includes(search)
      || part.function?.toLowerCase().includes(search)
      || part.symptoms?.toLowerCase().includes(search)
      || part.failures?.toLowerCase().includes(search)
      || part.category?.toLowerCase().includes(search)
      || part.tools?.some((t) => t.toLowerCase().includes(search));

    const matchesCategory = categoryFilter === 'All'
      || part.category === categoryFilter
      || (categoryFilter === 'Engine' && ['spark-plug', 'air-filter', 'engine-oil'].includes(part.id))
      || (categoryFilter === 'Electrical' && ['battery', 'spark-plug'].includes(part.id))
      || (categoryFilter === 'Brakes' && ['brakes', 'clutch-cable'].includes(part.id));

    return matchesSearch && matchesCategory;
  });

  const effectivePart = filteredParts.find((part) => part.id === selectedPart?.id)
    || selectedVehicle.parts.find((part) => part.id === selectedPart?.id)
    || filteredParts[0]
    || selectedVehicle.parts[0];


  const getIcon = (iconName) => {
    const Icon = {
      Zap,
      RefreshCw,
      Wind,
      BatteryCharging,
      Droplet,
      Cpu,
      Shield,
      Settings,
      Activity,
      Disc,
      CircleDot,
      Flame,
      Fuel,
      Gauge,
    }[iconName] || HelpCircle;
    return <Icon size={18} aria-hidden="true" />;
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setShowQuizResult(false);
    setSelectedAnswer(null);
  };

  const handleNextQuiz = () => {
    if (!selectedModule?.quizzes?.[quizIndex] || selectedAnswer === null) return;
    const currentQuiz = selectedModule.quizzes[quizIndex];
    const nextScore = quizScore + (selectedAnswer === currentQuiz.correct ? 1 : 0);
    setQuizScore(nextScore);
    if (quizIndex + 1 < selectedModule.quizzes.length) {
      setQuizIndex(quizIndex + 1);
      setSelectedAnswer(null);
    } else {
      setShowQuizResult(true);
    }
  };

  const renderParts = () => {
    const isSearching = searchTerm.trim().length > 0;
    const isFiltered = categoryFilter !== 'All';
    const shouldShowList = isSearching || isFiltered || showAllParts;

    const CAD_ASSEMBLIES = [
      { id: 'engine', name: 'Engine & Combustion Core', filterKeys: ['Engine'] },
      { id: 'transmission', name: 'Transmission & Drive', filterKeys: ['Transmission'] },
      { id: 'intake', name: 'Fuel, Intake & Exhaust', filterKeys: ['Fuel & Exhaust'] },
      { id: 'electrical', name: 'Electrical & Ignition Circuit', filterKeys: ['Electrical'] },
      { id: 'chassis', name: 'Chassis, Brakes & Suspension', filterKeys: ['Brakes', 'Suspension', 'Wheels', 'Chassis'] },
    ];

    const renderPartButton = (part) => {
      const isSelected = effectivePart?.id === part.id;
      const matchSnippet = isSearching ? getMatchSnippet(part, searchTerm) : null;
      return (
        <button
          type="button"
          key={part.id}
          className={`cad-part-node ${isSelected ? 'is-active' : ''}`}
          onClick={() => setSelectedPart(part)}
        >
          <div className="cad-part-left">
            <span className="cad-part-icon">{getIcon(part.icon)}</span>
            <span className="cad-part-name">{part.name}</span>
          </div>
          <div className="cad-part-right">
            <span className="cad-part-diff">{part.difficulty || 'DIY'}</span>
          </div>
          {matchSnippet && (
            <div className="learn-part-match-snippet">
              <span className="learn-match-tag">Matched:</span> {matchSnippet}
            </div>
          )}
        </button>
      );
    };

    return (
      <>
        <div className="ui-card learn-search-card">
          <div className="learn-search-input-wrap">
            <Search className="learn-search-icon" size={18} aria-hidden="true" />
            <input
              className="ui-input learn-search-input"
              aria-label="Search vehicle parts"
              type="search"
              placeholder="Search 35+ components, symptoms (e.g. misfire, starting), or tools..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <div className="learn-search-controls">
              <span className="learn-search-count">
                {filteredParts.length} {filteredParts.length === 1 ? 'part' : 'parts'}
              </span>
              {searchTerm && (
                <button
                  type="button"
                  className="learn-search-clear"
                  onClick={() => setSearchTerm('')}
                  title="Clear search"
                  aria-label="Clear search"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              )}
              {!searchTerm && categoryFilter === 'All' && (
                <button
                  type="button"
                  className="ui-btn ui-btn-quiet learn-toggle-list-btn"
                  onClick={() => setShowAllParts(!showAllParts)}
                  style={{ fontSize: '0.75rem', padding: '3px 8px', marginLeft: '6px' }}
                >
                  {showAllParts ? 'Hide directory' : 'Browse directory'}
                </button>
              )}
            </div>
          </div>

          <div className="learn-quick-searches" aria-label="Popular searches">
            <span className="tool-inline"><Flame size={14} color="#b96a2b" aria-hidden="true" /> Popular:</span>
            {POPULAR_SEARCHES.map((query) => (
              <button
                type="button"
                key={query}
                className="learn-quick-chip"
                onClick={() => {
                  setSearchTerm(query);
                  const found = selectedVehicle.parts.find((p) => p.name.toLowerCase().includes(query.toLowerCase()));
                  if (found) setSelectedPart(found);
                }}
              >
                {query}
              </button>
            ))}
          </div>

          <div className="learn-filters" aria-label="Part categories">
            {CATEGORIES.map((category) => {
              const count = getCategoryCount(category);
              return (
                <button
                  type="button"
                  key={category}
                  className={`ui-btn learn-filter ${categoryFilter === category ? 'is-active' : ''}`}
                  aria-pressed={categoryFilter === category}
                  onClick={() => setCategoryFilter(category)}
                >
                  {category}
                  {count > 0 && <span className="learn-filter-count">({count})</span>}
                </button>
              );
            })}
          </div>
        </div>

        <div className={`learn-parts-layout ${shouldShowList ? 'has-list' : 'no-list'}`}>
          {shouldShowList && (
            <div className="cad-assembly-tree" aria-label="Vehicle parts CAD tree">
              {filteredParts.length === 0 ? (
                <div className="ui-empty">
                  No components match "{searchTerm}".
                  <br />
                  <button
                    type="button"
                    className="ui-btn ui-btn-quiet"
                    style={{ marginTop: '10px' }}
                    onClick={() => {
                      setSearchTerm('');
                      setCategoryFilter('All');
                    }}
                  >
                    Reset search & filters
                  </button>
                </div>
              ) : (
                CAD_ASSEMBLIES.map((assembly) => {
                  const partsInAssembly = filteredParts.filter((p) =>
                    assembly.filterKeys.includes(p.category)
                  );
                  if (partsInAssembly.length === 0) return null;
                  return (
                    <div key={assembly.id} className="cad-assembly-group">
                      <div className="cad-assembly-header">
                        <span className="cad-assembly-title">{assembly.name}</span>
                        <span className="cad-assembly-count">{partsInAssembly.length} CAD NODES</span>
                      </div>
                      <div className="cad-assembly-nodes">
                        {partsInAssembly.map(renderPartButton)}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

        {effectivePart ? (
          <article className="ui-card learn-detail">
            <div className="tool-meta tool-meta-split">
              <div><span className="ui-eyebrow">Selected part · {selectedVehicle.name}</span><h2>{effectivePart.name}</h2></div>
              <span className="ui-tag ui-tag-success">{effectivePart.difficulty} DIY</span>
            </div>

            {effectivePart.image && (
              <div className="learn-part-image-wrap">
                <img
                  key={effectivePart.image}
                  src={effectivePart.image}
                  alt={`Reference photo of ${effectivePart.name}`}
                  className="learn-part-image"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="learn-part-image-fallback" style={{ display: 'none' }}>
                  <ImageOff size={24} aria-hidden="true" />
                  <span>Image unavailable</span>
                </div>
                {effectivePart.imageCredit && (
                  <span className="learn-part-image-credit">📷 {effectivePart.imageCredit}</span>
                )}
              </div>
            )}

            {inspectionRequest?.targetPartId === effectivePart.id && (
              <div className="tool-notice" role="note">
                <Crosshair size={17} aria-hidden="true" />
                <div>
                  <strong>Suggested by your diagnosis</strong>
                  {inspectionRequest.reason || 'This part was flagged as worth inspecting first.'} This is a possibility to check, not a confirmed fault.
                </div>
              </div>
            )}

            <div className="learn-detail-copy"><strong>Purpose</strong><br />{effectivePart.function}</div>
            <div className="ui-grid-two learn-part-metrics">
              <div className="diagnose-stat"><span className="ui-label">Symptoms</span><strong>{effectivePart.symptoms}</strong></div>
              <div className="diagnose-stat"><span className="ui-label">Check interval</span><strong>{effectivePart.interval}</strong></div>
            </div>
            {effectivePart.safety && <div className="tool-notice"><ShieldAlert size={17} aria-hidden="true" /><div><strong>Safety first</strong>{effectivePart.safety}</div></div>}

            <div>
               <div className="tool-meta learn-guide-heading"><h3>Repair guide</h3><span className="ui-muted">{effectivePart.cost}</span></div>
               <ol className="diagnose-list">{effectivePart.diySteps.map((step) => <li key={step}>{step}</li>)}</ol>
               <p className="ui-muted learn-tools"><strong>Tools:</strong> {effectivePart.tools.join(' · ')}</p>
            </div>

            <div className="learn-3d-shell">
              {!show3D ? (
                <div className="learn-3d-footer">
                  <span><strong>Interactive 3D blueprint</strong><br />Click to open the 3D model.</span>
                  <button type="button" className="ui-btn ui-btn-primary" onClick={() => setShow3D(true)}>Explore in 3D</button>
                </div>
              ) : (
                <>
                  <div className="learn-3d-canvas is-blueprint">
                    <Suspense fallback={<div className="ui-empty">Loading the 3D blueprint…</div>}>
                      <BikeBlueprintViewer
                        selectedPartId={BIKE_PART_IDS.has(effectivePart.id) ? effectivePart.id : null}
                        markerPartIds={inspectionRequest ? [inspectionRequest.targetPartId, ...(inspectionRequest.relatedPartIds || [])] : []}
                        partNames={Object.fromEntries(selectedVehicle.parts.map((part) => [part.id, part.name]))}
                        onSelectPart={(id) => {
                          const found = selectedVehicle.parts.find((part) => part.id === id);
                          if (found) setSelectedPart(found);
                        }}
                      />
                    </Suspense>
                  </div>
                  <div className="learn-3d-footer">
                    <span>
                      {BIKE_PART_IDS.has(effectivePart.id)
                        ? 'Zoom in on the highlighted part to separate the assembly; zoom out to reassemble it.'
                        : `The 3D blueprint has no ${effectivePart.name.toLowerCase()} model yet. Refer to the photo and repair guide above.`}
                    </span>
                    <button type="button" className="ui-btn ui-btn-quiet" onClick={() => setShow3D(false)}>Hide 3D</button>
                  </div>
                </>
              )}
            </div>
          </article>
        ) : <div className="ui-empty">Choose a part to see its guide.</div>}
      </div>
    </>
    );
  };

  const renderEducation = () => {
    if (!selectedModule) {
      return (
        <div className="learn-modules">
          {MODULES.map((module) => (
            <button type="button" key={module.id} className="learn-module" onClick={() => { setSelectedModule(module); resetQuiz(); }}>
                 <div className="learn-module-body"><h3>{module.title}</h3><p>{module.desc}</p><div className="tool-meta learn-module-progress"><span className="ui-label">Progress</span><span className="ui-muted">{module.progress}%</span></div><div className="learn-progress"><span style={{ width: `${module.progress}%` }} /></div></div>
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          ))}
        </div>
      );
    }

    const currentQuiz = selectedModule.quizzes[Math.min(quizIndex, selectedModule.quizzes.length - 1)];
    return (
      <section className="ui-card ui-stack">
         <div className="tool-meta tool-meta-split"><div><span className="ui-eyebrow">Learning module</span><h2 className="ui-title learn-module-title">{selectedModule.title}</h2></div><button type="button" className="ui-btn ui-btn-quiet" onClick={() => setSelectedModule(null)}>Back to modules</button></div>
        {!showQuizResult && currentQuiz ? (
          <>
            <span className="ui-tag ui-tag-demo">Question {quizIndex + 1} of {selectedModule.quizzes.length}</span>
             <h3 className="quiz-question">{currentQuiz.question}</h3>
             <div className="ui-stack quiz-options">{currentQuiz.options.map((option, index) => <button type="button" key={option} className={`quiz-option ${selectedAnswer === index ? 'is-selected' : ''}`} aria-pressed={selectedAnswer === index} onClick={() => setSelectedAnswer(index)}>{option}</button>)}</div>
            <button type="button" className="ui-btn ui-btn-primary" disabled={selectedAnswer === null} onClick={handleNextQuiz}>Next question <ChevronRight size={15} aria-hidden="true" /></button>
          </>
        ) : (
           <div className="learn-quiz-complete"><div><Award size={35} aria-hidden="true" /><h3>Module quiz complete</h3><p className="ui-muted">You scored {quizScore} out of {selectedModule.quizzes.length} correctly.</p><button type="button" className="ui-btn ui-btn-primary" onClick={resetQuiz}>Retry quiz</button></div></div>
        )}
      </section>
    );
  };

  return (
    <main className="tool-view">
      <div className="tool-page">
        <header className="tool-header">
           <div><span className="ui-eyebrow">Learn</span><h1 className="ui-title">Parts and guides</h1><p className="ui-muted">Reference material for {selectedVehicle.name}, with optional 3D exploration and local practice quizzes.</p></div>
        </header>
        <div className="learn-tabs" role="tablist" aria-label="Learning sections">
          <button type="button" role="tab" aria-selected={activeSegment === 'parts'} className={`ui-btn learn-tab ${activeSegment === 'parts' ? 'is-active' : ''}`} onClick={() => { setActiveSegment('parts'); setSelectedModule(null); }}>Parts explorer</button>
          <button type="button" role="tab" aria-selected={activeSegment === 'educational'} className={`ui-btn learn-tab ${activeSegment === 'educational' ? 'is-active' : ''}`} onClick={() => setActiveSegment('educational')}>Guides & quizzes</button>
        </div>
        {activeSegment === 'parts' ? renderParts() : renderEducation()}
      </div>
    </main>
  );
}
