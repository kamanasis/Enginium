import React, { useEffect, useState } from 'react';
import { Activity, ArrowRight, Play, RotateCcw, Square } from 'lucide-react';
import './ToolViews.css';

const SAMPLE_RESULTS = {
  tappet: {
    title: 'Tappet / valve clearance pattern',
    frequency: '2,450 Hz · high-frequency click',
    dbLevel: '78 dB @ 1,200 RPM · simulated',
    confidence: '91%',
    severity: 'Review soon',
    severityClass: 'ui-tag-warning',
    description: 'A repeating light tick is matched to a camshaft-style demo profile. This does not listen to your engine or measure clearance.',
    solution: 'With the engine cold, check the manufacturer clearance specification and have a technician adjust it if needed.',
  },
  chain: {
    title: 'Drive / cam chain chatter pattern',
    frequency: '850–1,400 Hz · metallic whir',
    dbLevel: '82 dB @ idle · simulated',
    confidence: '88%',
    severity: 'Safety review',
    severityClass: 'ui-tag-warning',
    description: 'The selected demo profile contains a repeating rattle associated with chain slack. It is not a live sensor reading.',
    solution: 'Keep the engine off while checking chain slack against the vehicle manual. Stop riding if the chain can derail or bind.',
  },
  normal: {
    title: 'Baseline idle pattern',
    frequency: 'Frequency bands within demo baseline',
    dbLevel: '68 dB @ idle · simulated',
    confidence: '96%',
    severity: 'Within sample',
    severityClass: 'ui-tag-success',
    description: 'This sample represents a smooth four-stroke idle profile. A normal sample cannot confirm that a real vehicle is safe.',
    solution: 'Continue routine checks and use a qualified inspection for any symptom you can actually hear or feel.',
  },
};

const PROFILE_OPTIONS = [
  { id: 'tappet', label: 'Valve tapping', note: '2.4 kHz click' },
  { id: 'chain', label: 'Chain slack', note: 'Rattling whir' },
  { id: 'normal', label: 'Normal idle', note: 'Smooth rumble' },
];

const BAR_HEIGHTS = [32, 54, 42, 74, 62, 34, 86, 48, 68, 92, 58, 38, 72, 96, 64, 46, 81, 56, 35, 74, 92, 51, 70, 44, 84, 58, 38, 68, 88, 52, 34, 64];

export default function AcousticView({ selectedVehicle, setActiveTab, setDiagnoseInput }) {
  const [selectedDemoSound, setSelectedDemoSound] = useState('tappet');
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [demoProgress, setDemoProgress] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [analyzedResult, setAnalyzedResult] = useState(null);

  useEffect(() => {
    if (!isPlayingDemo) return undefined;
    const timer = window.setTimeout(() => {
      if (demoProgress >= 95) {
        setDemoProgress(100);
        setIsPlayingDemo(false);
      } else {
        setDemoProgress((previous) => Math.min(100, previous + 5));
      }
    }, 100);
    return () => window.clearTimeout(timer);
  }, [isPlayingDemo, demoProgress]);

  useEffect(() => {
    if (!isRecording) return undefined;
    const timer = window.setTimeout(() => {
      if (scanProgress >= 96) {
        setScanProgress(100);
        setIsRecording(false);
        setAnalyzedResult(SAMPLE_RESULTS[selectedDemoSound]);
      } else {
        setScanProgress((previous) => Math.min(100, previous + 4));
      }
    }, 240);
    return () => window.clearTimeout(timer);
  }, [isRecording, scanProgress, selectedDemoSound]);

  const startRecording = () => {
    setIsPlayingDemo(false);
    setIsRecording(true);
    setScanProgress(0);
    setAnalyzedResult(null);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setScanProgress(100);
    setAnalyzedResult(SAMPLE_RESULTS[selectedDemoSound]);
  };

  const toggleDemoSound = (soundKey) => {
    setSelectedDemoSound(soundKey);
    setDemoProgress(0);
    setIsPlayingDemo(true);
  };

  const askMechanic = () => {
    setDiagnoseInput(`I selected the ${SAMPLE_RESULTS[selectedDemoSound].title} sound profile. What should I inspect first?`);
    setActiveTab('diagnose');
  };

  const recordingSeconds = Math.min(6, Math.round((scanProgress / 100) * 6));

  return (
    <main className="tool-view">
      <div className="tool-page">
        <header className="tool-header">
          <div>
            <span className="ui-eyebrow">Acoustic workshop</span>
            <h1 className="ui-title">Explore a sound profile</h1>
            <p className="ui-muted">A guided simulation for {selectedVehicle.name}, with no microphone access or live audio analysis.</p>
          </div>
          <span className="ui-tag ui-tag-demo"><Activity size={14} /> Simulation</span>
        </header>

        <div className="tool-notice" role="note">
          <Activity size={19} aria-hidden="true" />
          <div><strong>Sound-profile simulation</strong> Select a sample or run the timed demo scan. The bars and result are local illustrations, not microphone, RPM, dB, or FFT measurements.</div>
        </div>

        <div className="acoustic-grid" style={{ marginTop: 20 }}>
          <section className="ui-card">
            <div className="tool-meta" style={{ justifyContent: 'space-between', gap: 12 }}>
              <div><span className="ui-label">Vehicle profile</span><strong>{selectedVehicle.name}</strong></div>
              <span className="ui-tag ui-tag-demo">No sensor connected</span>
            </div>

            <div className="acoustic-wave" aria-label={isRecording || isPlayingDemo ? 'Animated simulated waveform' : 'Static simulated waveform'}>
              {BAR_HEIGHTS.map((height, index) => (
                <span
                  key={`${height}-${index}`}
                  className={`acoustic-bar ${isRecording || isPlayingDemo ? 'is-active' : ''}`}
                  style={{ '--bar-height': `${height}%`, '--bar-delay': `${index * 28}ms` }}
                />
              ))}
            </div>

            {(isRecording || scanProgress > 0) && (
              <div style={{ marginBottom: 18 }}>
                <div className="tool-meta" style={{ justifyContent: 'space-between', marginBottom: 7 }}>
                  <span className="ui-label">Demo scan progress</span>
                  <span className="ui-muted">{recordingSeconds}/6 sec</span>
                </div>
                <div className="acoustic-progress" aria-label={`Demo scan ${scanProgress}% complete`}><span style={{ width: `${scanProgress}%` }} /></div>
              </div>
            )}

            <div className="acoustic-record">
              <div className="acoustic-record-copy">
                <span className="ui-label">Timed local action</span>
                <strong>{isRecording ? 'Running sound-profile demo…' : 'Run a six-second demo scan'}</strong>
                <span className="ui-muted">No browser microphone permission is requested.</span>
              </div>
              <button type="button" className="ui-btn ui-btn-primary" onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? <><Square size={15} aria-hidden="true" /> Stop demo</> : <><Play size={15} aria-hidden="true" /> Start demo</>}
              </button>
            </div>

            <div style={{ marginTop: 22 }}>
              <div className="tool-meta" style={{ justifyContent: 'space-between', marginBottom: 10 }}>
                <div><span className="ui-label">Choose a sample</span><strong>Compare local profiles</strong></div>
                <span className="ui-muted">{isPlayingDemo ? `${demoProgress}% playing` : 'Ready'}</span>
              </div>
              <div className="acoustic-profile-grid">
                {PROFILE_OPTIONS.map((profile) => (
                  <button type="button" key={profile.id} className={`acoustic-profile ${selectedDemoSound === profile.id ? 'is-selected' : ''}`} onClick={() => toggleDemoSound(profile.id)}>
                    <strong>{profile.label}</strong>
                    <span>{profile.note}</span>
                    <span>{selectedDemoSound === profile.id && isPlayingDemo ? 'Playing sample…' : 'Play sample'}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <aside className="ui-card acoustic-result" aria-live="polite">
            {analyzedResult ? (
              <>
                <div className="acoustic-result-header">
                  <div><span className="ui-eyebrow">Sample interpretation</span><h2>{analyzedResult.title}</h2></div>
                  <span className={`ui-tag ${analyzedResult.severityClass}`}>{analyzedResult.severity}</span>
                </div>
                <div className="ui-grid-two">
                  <div className="diagnose-stat"><span className="ui-label">Peak pattern</span><strong>{analyzedResult.frequency}</strong></div>
                  <div className="diagnose-stat"><span className="ui-label">Demo match</span><strong>{analyzedResult.confidence}</strong></div>
                </div>
                <div><span className="ui-label">Observation</span><p className="ui-muted">{analyzedResult.description}</p></div>
                <div><span className="ui-label">Suggested next step</span><p className="ui-muted">{analyzedResult.solution}</p></div>
                <div className="tool-notice"><Activity size={17} aria-hidden="true" /><div><strong>{analyzedResult.dbLevel}</strong> The level shown is part of the sample label, not a reading from {selectedVehicle.name}.</div></div>
                <div className="tool-inline">
                  <button type="button" className="ui-btn ui-btn-primary" onClick={askMechanic}>Open diagnosis <ArrowRight size={15} aria-hidden="true" /></button>
                  <button type="button" className="ui-btn ui-btn-quiet" onClick={startRecording}><RotateCcw size={15} aria-hidden="true" /> Re-run</button>
                </div>
              </>
            ) : (
              <div className="ui-empty"><div><Activity size={30} aria-hidden="true" /><p><strong>Pick a sample or start the demo</strong></p><p className="ui-muted">The interpretation will stay clearly labelled as simulated.</p></div></div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
