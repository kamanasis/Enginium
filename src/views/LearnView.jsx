import React, { lazy, Suspense, useState } from 'react';
import { Award, BatteryCharging, BookOpen, ChevronRight, HelpCircle, RefreshCw, Search, ShieldAlert, Wind, Zap } from 'lucide-react';
import './ToolViews.css';

const ThreeEngineViewer = lazy(() => import('../components/ThreeEngineViewer'));

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

const CATEGORIES = ['All', 'Engine', 'Electrical', 'Brakes'];

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
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [show3D, setShow3D] = useState(false);

  const effectivePart = selectedVehicle.parts.find((part) => part.id === selectedPart?.id) || selectedVehicle.parts[0];
  const filteredParts = selectedVehicle.parts.filter((part) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch = part.name.toLowerCase().includes(search) || part.function.toLowerCase().includes(search);
    const matchesCategory = categoryFilter === 'All'
      || (categoryFilter === 'Engine' && ['spark-plug', 'air-filter', 'engine-oil'].includes(part.id))
      || (categoryFilter === 'Electrical' && ['battery', 'spark-plug'].includes(part.id))
      || (categoryFilter === 'Brakes' && ['brakes', 'clutch-cable'].includes(part.id));
    return matchesSearch && matchesCategory;
  });

  const getIcon = (iconName) => {
    const Icon = { Zap, RefreshCw, Wind, BatteryCharging }[iconName] || HelpCircle;
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

  const renderParts = () => (
    <>
      <div className="ui-card">
        <div className="learn-search-row">
          <Search size={18} aria-hidden="true" />
          <input
            className="ui-input"
            aria-label="Search vehicle parts"
            type="search"
            placeholder="Search parts or purpose"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        <div className="learn-filters" aria-label="Part categories">
          {CATEGORIES.map((category) => (
            <button type="button" key={category} className={`ui-btn learn-filter ${categoryFilter === category ? 'is-active' : ''}`} aria-pressed={categoryFilter === category} onClick={() => setCategoryFilter(category)}>{category}</button>
          ))}
        </div>
      </div>

      <div className="learn-parts-layout">
        <div className="learn-part-list" aria-label="Vehicle parts">
          {filteredParts.length > 0 ? filteredParts.map((part) => (
            <button type="button" key={part.id} className={`learn-part-button ${effectivePart?.id === part.id ? 'is-active' : ''}`} onClick={() => setSelectedPart(part)}>
              <span className="tool-inline">{getIcon(part.icon)} {part.name}</span>
            </button>
          )) : <div className="ui-empty">No parts match that search.</div>}
        </div>

        {effectivePart ? (
          <article className="ui-card learn-detail">
            <div className="tool-meta" style={{ justifyContent: 'space-between', gap: 12 }}>
              <div><span className="ui-eyebrow">Selected part · {selectedVehicle.name}</span><h2>{effectivePart.name}</h2></div>
              <span className="ui-tag ui-tag-success">{effectivePart.difficulty} DIY</span>
            </div>
            <div className="learn-detail-copy"><strong>Purpose</strong><br />{effectivePart.function}</div>
            <div className="ui-grid-two">
              <div className="diagnose-stat"><span className="ui-label">Symptoms</span><strong>{effectivePart.symptoms}</strong></div>
              <div className="diagnose-stat"><span className="ui-label">Check interval</span><strong>{effectivePart.interval}</strong></div>
            </div>
            {effectivePart.safety && <div className="tool-notice"><ShieldAlert size={17} aria-hidden="true" /><div><strong>Safety first</strong>{effectivePart.safety}</div></div>}

            <div>
              <div className="tool-meta" style={{ justifyContent: 'space-between', gap: 12, marginBottom: 10 }}><h3>Repair guide</h3><span className="ui-muted">{effectivePart.cost}</span></div>
              <ol className="diagnose-list">{effectivePart.diySteps.map((step) => <li key={step}>{step}</li>)}</ol>
              <p className="ui-muted" style={{ marginBottom: 0, marginTop: 12 }}><strong>Tools:</strong> {effectivePart.tools.join(' · ')}</p>
            </div>

            <div className="learn-3d-shell">
              {!show3D ? (
                <div className="learn-3d-footer"><span><strong>Contained 3D parts view</strong><br />Loads only when you choose to explore.</span><button type="button" className="ui-btn" onClick={() => setShow3D(true)}>Explore in 3D</button></div>
              ) : (
                <>
                  <div className="learn-3d-canvas">
                    <Suspense fallback={<div className="ui-empty">Loading the optional 3D illustration…</div>}>
                      <ThreeEngineViewer selectedPartId={effectivePart.id} onSelectPart={(id) => { const found = selectedVehicle.parts.find((part) => part.id === id); if (found) setSelectedPart(found); }} />
                    </Suspense>
                  </div>
                  <div className="learn-3d-footer"><span>Drag the illustration to inspect a part.</span><button type="button" className="ui-btn ui-btn-quiet" onClick={() => setShow3D(false)}>Close 3D</button></div>
                </>
              )}
            </div>
          </article>
        ) : <div className="ui-empty">Choose a part to see its guide.</div>}
      </div>
    </>
  );

  const renderEducation = () => {
    if (!selectedModule) {
      return (
        <div className="learn-modules">
          {MODULES.map((module) => (
            <button type="button" key={module.id} className="learn-module" onClick={() => { setSelectedModule(module); resetQuiz(); }}>
              <div style={{ flex: 1 }}><h3>{module.title}</h3><p>{module.desc}</p><div className="tool-meta" style={{ justifyContent: 'space-between', marginBottom: 6 }}><span className="ui-label">Progress</span><span className="ui-muted">{module.progress}%</span></div><div className="learn-progress"><span style={{ width: `${module.progress}%` }} /></div></div>
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          ))}
        </div>
      );
    }

    const currentQuiz = selectedModule.quizzes[Math.min(quizIndex, selectedModule.quizzes.length - 1)];
    return (
      <section className="ui-card ui-stack">
        <div className="tool-meta" style={{ justifyContent: 'space-between', gap: 12 }}><div><span className="ui-eyebrow">Learning module</span><h2 className="ui-title" style={{ fontSize: '1.35rem' }}>{selectedModule.title}</h2></div><button type="button" className="ui-btn ui-btn-quiet" onClick={() => setSelectedModule(null)}>Back to modules</button></div>
        {!showQuizResult && currentQuiz ? (
          <>
            <span className="ui-tag ui-tag-demo">Question {quizIndex + 1} of {selectedModule.quizzes.length}</span>
            <h3 style={{ margin: 0, fontSize: '1.05rem', lineHeight: 1.45 }}>{currentQuiz.question}</h3>
            <div className="ui-stack" style={{ gap: 9 }}>{currentQuiz.options.map((option, index) => <button type="button" key={option} className={`quiz-option ${selectedAnswer === index ? 'is-selected' : ''}`} aria-pressed={selectedAnswer === index} onClick={() => setSelectedAnswer(index)}>{option}</button>)}</div>
            <button type="button" className="ui-btn ui-btn-primary" disabled={selectedAnswer === null} onClick={handleNextQuiz}>Next question <ChevronRight size={15} aria-hidden="true" /></button>
          </>
        ) : (
          <div className="ui-empty"><div><Award size={35} aria-hidden="true" /><h3>Module quiz complete</h3><p className="ui-muted">You scored {quizScore} out of {selectedModule.quizzes.length} correctly.</p><button type="button" className="ui-btn ui-btn-primary" onClick={resetQuiz}>Retry quiz</button></div></div>
        )}
      </section>
    );
  };

  return (
    <main className="tool-view">
      <div className="tool-page">
        <header className="tool-header">
          <div><span className="ui-eyebrow">Learn your machine</span><h1 className="ui-title">Parts, guides, and practice</h1><p className="ui-muted">Readable reference material for {selectedVehicle.name}, with optional 3D exploration.</p></div>
          <span className="ui-tag ui-tag-demo"><BookOpen size={14} /> Local reference</span>
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
