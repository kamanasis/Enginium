import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';
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
  RefreshCw,
  Search,
  Settings,
  Shield,
  ShieldAlert,
  Wind,
  X,
  Zap,
} from 'lucide-react';
import {
  resolveBlueprintPartId,
  resolveVehiclePart,
  getVehicleBlueprintNames,
} from '../data/bikeParts';
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

const CATEGORIES = ['All', 'Engine', 'Fuel & Exhaust', 'Transmission', 'Brakes', 'Suspension', 'Wheels', 'Electrical', 'Chassis'];

/**
 * Reliable part photo viewer with automatic retry and an engineered CAD schematic
 * view when offline/unmapped, ensuring "Image unavailable" never appears.
 */
function PartImagePreview({ part, renderIcon }) {
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState(part?.image ? 'loading' : 'schematic');

  useEffect(() => {
    setAttempt(0);
    setStatus(part?.image ? 'loading' : 'schematic');
  }, [part?.id, part?.image]);

  const resolvedSrc = useMemo(() => {
    if (!part?.image) return '';
    if (attempt === 0) return part.image;
    const sep = part.image.includes('?') ? '&' : '?';
    return `${part.image}${sep}retry=${attempt}`;
  }, [part?.image, attempt]);

  const handleImageError = () => {
    if (attempt < 1) {
      window.setTimeout(() => setAttempt((prev) => prev + 1), 250);
    } else {
      setStatus('schematic');
    }
  };

  return (
    <div className="learn-part-image-wrap">
      {status !== 'schematic' && resolvedSrc ? (
        <>
          {status === 'loading' && <div className="learn-part-image-skeleton" aria-hidden="true" />}
          <img
            key={`${part.id}-${attempt}`}
            src={resolvedSrc}
            alt={`Reference photo of ${part.name}`}
            className={`learn-part-image ${status === 'loaded' ? 'is-ready' : 'is-loading'}`}
            loading="eager"
            decoding="async"
            onLoad={() => setStatus('loaded')}
            onError={handleImageError}
          />
        </>
      ) : (
        <div className="learn-part-schematic" role="img" aria-label={`Engineering schematic for ${part.name}`}>
          <div className="learn-part-schematic-grid" aria-hidden="true" />
          <div className="learn-part-schematic-badge">
            <span className="learn-part-schematic-icon">{renderIcon(part.icon)}</span>
            <div>
              <span className="learn-part-schematic-kicker">CAD SPEC · {part.category || 'ASSEMBLY'}</span>
              <strong className="learn-part-schematic-title">{part.name}</strong>
            </div>
          </div>
          <span className="learn-part-schematic-meta">{part.difficulty || 'DIY'} · {part.interval || 'Periodic check'}</span>
        </div>
      )}
      {status === 'loaded' && part.imageCredit && (
        <span className="learn-part-image-credit">Reference · {part.imageCredit}</span>
      )}
    </div>
  );
}

export default function LearnView({
  selectedVehicle,
  vehiclesList = [],
  onSelectVehicle,
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
  const [leftTab, setLeftTab] = useState('3d');
  const [isBlueprintEnlarged, setIsBlueprintEnlarged] = useState(false);

  const [prevInspection, setPrevInspection] = useState(inspectionRequest);
  if (inspectionRequest !== prevInspection) {
    setPrevInspection(inspectionRequest);
    if (inspectionRequest) {
      setLeftTab('3d');
    }
  }

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

  const activeBlueprintId = effectivePart ? resolveBlueprintPartId(effectivePart.id) : null;
  const vehicleParts = selectedVehicle?.parts;
  const vehicleBlueprintNames = useMemo(
    () => getVehicleBlueprintNames(vehicleParts || []),
    [vehicleParts]
  );


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
                  onClick={() => setLeftTab(leftTab === '3d' ? 'tree' : '3d')}
                  style={{ fontSize: '0.75rem', padding: '3px 8px', marginLeft: '6px' }}
                >
                  {leftTab === '3d' ? 'View CAD tree' : 'View 3D model'}
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
                  if (found) {
                    setSelectedPart(found);
                    setLeftTab('3d');
                  }
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

        <div className="learn-parts-layout">
          {/* LEFT WORKSTATION: 3D Section View Blueprint & CAD Tree Navigation */}
          <div className="learn-workbench-left">
            <div className="learn-workbench-nav">
              <div className="learn-workbench-tabs">
                <button
                  type="button"
                  className={`learn-workbench-tab ${leftTab === '3d' ? 'is-active' : ''}`}
                  onClick={() => setLeftTab('3d')}
                  aria-pressed={leftTab === '3d'}
                >
                  <Cpu size={14} aria-hidden="true" />
                  3D Blueprint
                </button>
                <button
                  type="button"
                  className={`learn-workbench-tab ${leftTab === 'tree' ? 'is-active' : ''}`}
                  onClick={() => setLeftTab('tree')}
                  aria-pressed={leftTab === 'tree'}
                >
                  <Settings size={14} aria-hidden="true" />
                  CAD Assembly Tree ({filteredParts.length})
                </button>
              </div>
              <div className="learn-workbench-actions">
                <span className="learn-workbench-chip">
                  {leftTab === '3d' ? 'INTERACTIVE 3D' : `${filteredParts.length} NODES`}
                </span>
              </div>
            </div>

            {leftTab === '3d' ? (
              <div className="learn-3d-shell is-primary-workbench">
                <div className="learn-3d-canvas is-blueprint">
                  <Suspense fallback={<div className="ui-empty">Loading 3D blueprint…</div>}>
                    <BikeBlueprintViewer
                      selectedPartId={activeBlueprintId}
                      markerPartIds={inspectionRequest ? [inspectionRequest.targetPartId, ...(inspectionRequest.relatedPartIds || [])].map(resolveBlueprintPartId).filter(Boolean) : []}
                      partNames={vehicleBlueprintNames}
                      vehicleId={selectedVehicle?.id}
                      vehicleType={selectedVehicle?.type}
                      vehicleName={selectedVehicle?.name}
                      onSelectPart={(id) => {
                        const found = resolveVehiclePart(id, selectedVehicle?.parts || []);
                        if (found) setSelectedPart(found);
                      }}
                      isEnlarged={isBlueprintEnlarged}
                      onToggleEnlarge={setIsBlueprintEnlarged}
                    />
                  </Suspense>
                </div>
                <div className="learn-3d-footer">
                  <div className="learn-3d-footer-status">
                    <span className={`learn-3d-status-dot ${activeBlueprintId ? 'is-synced' : 'is-spec'}`} aria-hidden="true" />
                    <span>
                      {activeBlueprintId
                        ? `3D Focus: ${effectivePart?.name} · Click any mesh to switch`
                        : `Spec View: ${effectivePart?.name || 'Component'} · Mapped to photo & repair guide`}
                    </span>
                  </div>
                  <div className="learn-3d-footer-actions">
                    <button
                      type="button"
                      className="ui-btn ui-btn-quiet"
                      onClick={() => setLeftTab('tree')}
                    >
                      Browse CAD Tree <ChevronRight size={14} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
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
          </div>

          {/* RIGHT PANEL: Compressed Component Information */}
          {effectivePart ? (
            <article className="ui-card learn-detail learn-detail-compact">
              <div className="tool-meta tool-meta-split">
                <div>
                  <span className="ui-eyebrow">Selected part · {selectedVehicle.name}</span>
                  <h2>{effectivePart.name}</h2>
                </div>
                <span className="ui-tag ui-tag-success">{effectivePart.difficulty} DIY</span>
              </div>

              <PartImagePreview part={effectivePart} renderIcon={getIcon} />

              {inspectionRequest?.targetPartId === effectivePart.id && (
                <div className="tool-notice" role="note">
                  <Crosshair size={17} aria-hidden="true" />
                  <div>
                    <strong>Suggested by your diagnosis</strong>
                    {inspectionRequest.reason || 'This part was flagged as worth inspecting first.'} This is a possibility to check, not a confirmed fault.
                  </div>
                </div>
              )}

              <div className="learn-detail-copy">
                <strong>Purpose</strong>
                <br />
                {effectivePart.function}
              </div>

              <div className="ui-grid-two learn-part-metrics">
                <div className="diagnose-stat">
                  <span className="ui-label">Symptoms</span>
                  <strong>{effectivePart.symptoms}</strong>
                </div>
                <div className="diagnose-stat">
                  <span className="ui-label">Check interval</span>
                  <strong>{effectivePart.interval}</strong>
                </div>
              </div>

              {effectivePart.safety && (
                <div className="tool-notice">
                  <ShieldAlert size={17} aria-hidden="true" />
                  <div>
                    <strong>Safety first</strong>
                    {effectivePart.safety}
                  </div>
                </div>
              )}

              <div>
                <div className="tool-meta learn-guide-heading">
                  <h3>Repair guide</h3>
                  <span className="ui-muted">{effectivePart.cost}</span>
                </div>
                <ol className="diagnose-list">
                  {effectivePart.diySteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <p className="ui-muted learn-tools">
                  <strong>Tools:</strong> {effectivePart.tools.join(' · ')}
                </p>
              </div>
            </article>
          ) : (
            <div className="ui-empty">Choose a part to see its guide.</div>
          )}
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
           <div><span className="ui-eyebrow">Learn</span><h1 className="ui-title">Parts and guides</h1><p className="ui-muted">Reference material for {selectedVehicle.name}, with interactive 3D CAD exploration and local quizzes.</p></div>
        </header>
        {vehiclesList.length > 1 && onSelectVehicle && (
          <div className="learn-filters" role="group" aria-label="Switch 3D blueprint model" style={{ marginBottom: '14px' }}>
            {vehiclesList.map((v) => {
              const isSelected = selectedVehicle?.id === v.id;
              return (
                <button
                  type="button"
                  key={v.id}
                  className={`ui-btn learn-filter ${isSelected ? 'is-active' : ''}`}
                  aria-pressed={isSelected}
                  onClick={() => onSelectVehicle(v)}
                >
                  {v.name}
                </button>
              );
            })}
          </div>
        )}
        <div className="learn-tabs" role="tablist" aria-label="Learning sections">
          <button type="button" role="tab" aria-selected={activeSegment === 'parts'} className={`ui-btn learn-tab ${activeSegment === 'parts' ? 'is-active' : ''}`} onClick={() => { setActiveSegment('parts'); setSelectedModule(null); }}>Parts explorer</button>
          <button type="button" role="tab" aria-selected={activeSegment === 'educational'} className={`ui-btn learn-tab ${activeSegment === 'educational' ? 'is-active' : ''}`} onClick={() => setActiveSegment('educational')}>Guides & quizzes</button>
        </div>
        {activeSegment === 'parts' ? renderParts() : renderEducation()}
      </div>
    </main>
  );
}
