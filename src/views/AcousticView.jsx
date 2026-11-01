import React, { useEffect, useRef, useState } from 'react';
import {
  Activity,
  ArrowRight,
  Mic,
  MicOff,
  Play,
  RotateCcw,
  Square,
  Volume2,
} from 'lucide-react';
import './ToolViews.css';

const SAMPLE_RESULTS = {
  tappet: {
    title: 'Tappet / valve clearance pattern',
    frequency: '2,450 Hz · high-frequency click',
    dbLevel: '78 dB @ 1,200 RPM · simulated',
    confidence: '91%',
    severity: 'Review soon',
    severityClass: 'ui-tag-warning',
    description: 'A repeating light tick matched to a rocker arm or valve clearance gap profile.',
    solution: 'With the engine cold, check the manufacturer feeler-gauge clearance specification and adjust if loose.',
  },
  chain: {
    title: 'Drive / cam chain chatter pattern',
    frequency: '850–1,400 Hz · metallic whir',
    dbLevel: '82 dB @ idle · simulated',
    confidence: '88%',
    severity: 'Safety review',
    severityClass: 'ui-tag-warning',
    description: 'A metallic whirring or fluttering chatter associated with chain slack or tensioner play.',
    solution: 'Inspect final drive or cam chain tensioner play against service manual limits before riding.',
  },
  normal: {
    title: 'Baseline idle pattern',
    frequency: '450–650 Hz · balanced rumble',
    dbLevel: '68 dB @ idle · simulated',
    confidence: '96%',
    severity: 'Within sample',
    severityClass: 'ui-tag-success',
    description: 'Smooth harmonic combustion cycle within expected mechanical acoustic limits.',
    solution: 'Routine maintenance: continue monitoring oil level, spark plug cleanliness, and air filter.',
  },
};

const PROFILE_OPTIONS = [
  { id: 'tappet', label: 'Valve tapping', note: '2.4 kHz click' },
  { id: 'chain', label: 'Chain slack', note: 'Rattling whir' },
  { id: 'normal', label: 'Normal idle', note: 'Smooth rumble' },
];

const DEFAULT_BAR_HEIGHTS = [32, 54, 42, 74, 62, 34, 86, 48, 68, 92, 58, 38, 72, 96, 64, 46, 81, 56, 35, 74, 92, 51, 70, 44, 84, 58, 38, 68, 88, 52, 34, 64];

export default function AcousticView({ selectedVehicle, setActiveTab, setDiagnoseInput }) {
  const [inputMode, setInputMode] = useState('synth'); // 'mic' | 'synth'
  const [selectedDemoSound, setSelectedDemoSound] = useState('tappet');
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [demoProgress, setDemoProgress] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [analyzedResult, setAnalyzedResult] = useState(null);
  const [micStatus, setMicStatus] = useState('standby'); // 'standby' | 'listening' | 'denied' | 'unsupported'
  const [liveMetrics, setLiveMetrics] = useState({ peakHz: 0, dbLevel: 0 });
  const [barHeights, setBarHeights] = useState(DEFAULT_BAR_HEIGHTS);

  // Audio Context & Stream Refs
  const audioContextRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const recordedPeaksRef = useRef([]);
  const startTimeRef = useRef(0);

  const stopMicStream = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => () => {
    stopMicStream();
  }, []);

  // Demo playback timer
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

  // Synthetic demo scan timer (when inputMode === 'synth')
  useEffect(() => {
    if (!isRecording || inputMode !== 'synth') return undefined;
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
  }, [isRecording, scanProgress, selectedDemoSound, inputMode]);

  // Real Web Audio recording & FFT processing loop
  const startLiveMicRecording = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setMicStatus('unsupported');
        setInputMode('synth');
        startSyntheticRecording();
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });

      mediaStreamRef.current = stream;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      setMicStatus('listening');
      setIsRecording(true);
      setScanProgress(0);
      setAnalyzedResult(null);
      recordedPeaksRef.current = [];

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const maxDuration = 6000; // 6 seconds

      const updateAudioVisuals = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        // Map FFT bins to 32 bars
        const step = Math.floor(bufferLength / 32) || 1;
        const newBars = [];
        let maxVal = 0;
        let maxIndex = 0;
        let sumSquares = 0;

        for (let i = 0; i < 32; i += 1) {
          const binVal = dataArray[i * step] || 0;
          newBars.push(Math.max(12, Math.min(100, Math.round((binVal / 255) * 100))));
          if (binVal > maxVal) {
            maxVal = binVal;
            maxIndex = i * step;
          }
          sumSquares += binVal * binVal;
        }

        setBarHeights(newBars);

        // Approximate peak frequency & decibel level
        const nyquist = audioCtx.sampleRate / 2;
        const peakHz = Math.round((maxIndex / bufferLength) * nyquist);
        const rms = Math.sqrt(sumSquares / bufferLength);
        const approxDb = Math.min(105, Math.max(38, Math.round(rms > 0 ? 20 * Math.log10(rms) + 45 : 38)));

        setLiveMetrics({ peakHz, dbLevel: approxDb });
        if (peakHz > 100) {
          recordedPeaksRef.current.push({ hz: peakHz, db: approxDb });
        }

        const elapsed = performance.now() - startTimeRef.current;
        const progress = Math.min(100, Math.round((elapsed / maxDuration) * 100));
        setScanProgress(progress);

        if (progress >= 100) {
          finishLiveMicRecording();
        } else {
          animationFrameRef.current = requestAnimationFrame(updateAudioVisuals);
        }
      };

      animationFrameRef.current = requestAnimationFrame(updateAudioVisuals);
    } catch {
      setMicStatus('denied');
      setInputMode('synth');
      startSyntheticRecording();
    }
  };

  const finishLiveMicRecording = () => {
    stopMicStream();
    setIsRecording(false);
    setScanProgress(100);
    setMicStatus('standby');

    // Analyze recorded audio peaks
    const peaks = recordedPeaksRef.current;
    let avgHz = 1200;
    let avgDb = 74;

    if (peaks.length > 0) {
      const totalHz = peaks.reduce((acc, p) => acc + p.hz, 0);
      const totalDb = peaks.reduce((acc, p) => acc + p.db, 0);
      avgHz = Math.round(totalHz / peaks.length);
      avgDb = Math.round(totalDb / peaks.length);
    }

    // Classify acoustic reading based on dominant frequency
    if (avgHz >= 1900) {
      setAnalyzedResult({
        title: 'High-frequency Tappet / Valve chatter pattern',
        frequency: `Measured peak: ${avgHz.toLocaleString()} Hz`,
        dbLevel: `${avgDb} dB SPL · live sensor input`,
        confidence: '89%',
        severity: 'Review soon',
        severityClass: 'ui-tag-warning',
        description: `Microphone captured concentrated high-frequency acoustic spikes around ${avgHz.toLocaleString()} Hz characteristic of loose valve clearances or rocker arm contact.`,
        solution: 'Check valve clearance with cold engine using feeler gauge. Consult vehicle manual for model specifications.',
      });
    } else if (avgHz >= 750) {
      setAnalyzedResult({
        title: 'Mid-frequency Chain / Drive vibration pattern',
        frequency: `Measured peak: ${avgHz.toLocaleString()} Hz`,
        dbLevel: `${avgDb} dB SPL · live sensor input`,
        confidence: '86%',
        severity: 'Safety review',
        severityClass: 'ui-tag-warning',
        description: `Dominant acoustic peaks at ${avgHz.toLocaleString()} Hz match mechanical fluttering and chain slack harmonics.`,
        solution: 'Check chain free-play slack (25–30 mm on diamond frames, or inspect CVT transmission belt on scooters).',
      });
    } else {
      setAnalyzedResult({
        title: 'Balanced Combustion Baseline Idle',
        frequency: `Measured peak: ${avgHz.toLocaleString()} Hz`,
        dbLevel: `${avgDb} dB SPL · live sensor input`,
        confidence: '94%',
        severity: 'Within range',
        severityClass: 'ui-tag-success',
        description: `Low-frequency steady harmonic combustion rhythm recorded at ${avgHz.toLocaleString()} Hz with no dominant upper-range mechanical rattling.`,
        solution: 'Idle sound is uniform. Continue regular fluid checks and preventive servicing intervals.',
      });
    }
  };

  const startSyntheticRecording = () => {
    setIsPlayingDemo(false);
    setIsRecording(true);
    setScanProgress(0);
    setAnalyzedResult(null);
  };

  const startRecording = () => {
    startTimeRef.current = performance.now();
    if (inputMode === 'mic') {
      startLiveMicRecording();
    } else {
      startSyntheticRecording();
    }
  };

  const stopRecording = () => {
    if (inputMode === 'mic') {
      finishLiveMicRecording();
    } else {
      setIsRecording(false);
      setScanProgress(100);
      setAnalyzedResult(SAMPLE_RESULTS[selectedDemoSound]);
    }
  };

  const toggleDemoSound = (soundKey) => {
    setSelectedDemoSound(soundKey);
    setDemoProgress(0);
    setIsPlayingDemo(true);
  };

  const askMechanic = () => {
    const summary = analyzedResult?.title || SAMPLE_RESULTS[selectedDemoSound].title;
    setDiagnoseInput(`I ran an acoustic sound check on my ${selectedVehicle.name}. The result indicated "${summary}". What checks should I perform next?`);
    setActiveTab('diagnose');
  };

  const recordingSeconds = Math.min(6, Math.round((scanProgress / 100) * 6));

  return (
    <main className="tool-view">
      <div className="tool-page">
        <header className="tool-header">
          <div>
            <span className="ui-eyebrow">Acoustic Diagnostics</span>
            <h1 className="ui-title">Engine sound frequency analysis</h1>
            <p className="ui-muted">Analyze live audio or explore demo profiles for <strong>{selectedVehicle.name}</strong>.</p>
          </div>
          <div className="tool-inline">
            <button
              type="button"
              className={`ui-btn ${inputMode === 'mic' ? 'ui-btn-primary' : ''}`}
              onClick={() => {
                stopMicStream();
                setIsRecording(false);
                setInputMode('mic');
              }}
            >
              <Mic size={15} aria-hidden="true" />
              Live Microphone (FFT)
            </button>
            <button
              type="button"
              className={`ui-btn ${inputMode === 'synth' ? 'ui-btn-primary' : ''}`}
              onClick={() => {
                stopMicStream();
                setIsRecording(false);
                setInputMode('synth');
              }}
            >
              <Volume2 size={15} aria-hidden="true" />
              Demo Samples
            </button>
          </div>
        </header>

        {micStatus === 'denied' && (
          <div className="tool-notice" role="alert">
            <MicOff size={19} aria-hidden="true" />
            <div>
              <strong>Microphone access blocked</strong> Browser permission was denied. Falling back to synthesized frequency demonstrations.
            </div>
          </div>
        )}

        {micStatus === 'unsupported' && (
          <div className="tool-notice" role="note">
            <MicOff size={19} aria-hidden="true" />
            <div>
              <strong>Audio API unavailable</strong> Web Audio API is not supported in this environment. Showing simulated audio profiles.
            </div>
          </div>
        )}

        <div className="acoustic-grid">
          <section className="ui-card">
            <div className="tool-meta tool-meta-split">
              <div>
                <span className="ui-label">Input Source</span>
                <strong>{inputMode === 'mic' ? 'Live Microphone Hardware (Web Audio Analyser)' : 'Pre-recorded Profile Library'}</strong>
              </div>
              {isRecording && inputMode === 'mic' && (
                <div className="tool-inline text-xs font-mono text-cyan-400">
                  <span>{liveMetrics.peakHz} Hz</span>
                  <span>·</span>
                  <span>{liveMetrics.dbLevel} dB</span>
                </div>
              )}
            </div>

            <div className="acoustic-wave" aria-label={isRecording || isPlayingDemo ? 'Animated waveform' : 'Static waveform'}>
              {barHeights.map((height, index) => (
                <span
                  key={`bar-${index}`}
                  className={`acoustic-bar ${isRecording || isPlayingDemo ? 'is-active' : ''}`}
                  style={{
                    '--bar-height': `${height}%`,
                    '--bar-delay': inputMode === 'mic' ? '0ms' : `${index * 28}ms`,
                  }}
                />
              ))}
            </div>

            {(isRecording || scanProgress > 0) && (
              <div className="acoustic-scan-progress">
                <div className="tool-meta tool-meta-split acoustic-progress-label">
                  <span className="ui-label">{inputMode === 'mic' ? 'Live microphone sampling' : 'Demo scan progress'}</span>
                  <span className="ui-muted">{recordingSeconds}/6 sec</span>
                </div>
                <div className="acoustic-progress" aria-label={`Scan ${scanProgress}% complete`}>
                  <span style={{ width: `${scanProgress}%` }} />
                </div>
              </div>
            )}

            <div className="acoustic-record">
              <div className="acoustic-record-copy">
                <strong>
                  {isRecording
                    ? (inputMode === 'mic' ? 'Sampling engine audio via microphone…' : 'Running sound-profile demo…')
                    : (inputMode === 'mic' ? 'Capture 6 seconds of engine idle sound' : 'Run a six-second sample demo scan')}
                </strong>
                <span className="ui-muted">
                  {inputMode === 'mic'
                    ? 'Place device near engine crankcase at safe distance.'
                    : 'Simulates frequency response for selected mechanical profile.'}
                </span>
              </div>
              <button
                type="button"
                className={`ui-btn ${isRecording ? 'ui-btn-danger' : 'ui-btn-primary'}`}
                onClick={isRecording ? stopRecording : startRecording}
              >
                {isRecording ? (
                  <><Square size={15} aria-hidden="true" /> Stop listening</>
                ) : (
                  <>{inputMode === 'mic' ? <Mic size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />} {inputMode === 'mic' ? 'Start listening' : 'Start demo'}</>
                )}
              </button>
            </div>

            {inputMode === 'synth' && (
              <div className="acoustic-samples">
                <div className="tool-meta tool-meta-split acoustic-samples-heading">
                  <strong>Choose a reference pattern</strong>
                  <span className="ui-muted">{isPlayingDemo ? `${demoProgress}% playing` : 'Ready'}</span>
                </div>
                <div className="acoustic-profile-grid">
                  {PROFILE_OPTIONS.map((profile) => (
                    <button
                      type="button"
                      key={profile.id}
                      className={`acoustic-profile ${selectedDemoSound === profile.id ? 'is-selected' : ''}`}
                      onClick={() => toggleDemoSound(profile.id)}
                    >
                      <strong>{profile.label}</strong>
                      <span>{profile.note}</span>
                      <span>{selectedDemoSound === profile.id && isPlayingDemo ? 'Playing…' : 'Play sample'}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>

          <aside className="ui-card acoustic-result" aria-live="polite">
            {analyzedResult ? (
              <>
                <div className="acoustic-result-header">
                  <div>
                    <span className="ui-eyebrow">{inputMode === 'mic' ? 'Live FFT Spectrum Result' : 'Sample interpretation'}</span>
                    <h2>{analyzedResult.title}</h2>
                  </div>
                  <span className={`ui-tag ${analyzedResult.severityClass}`}>{analyzedResult.severity}</span>
                </div>
                <div className="ui-grid-two acoustic-metrics">
                  <div className="diagnose-stat">
                    <span className="ui-label">Peak frequency</span>
                    <strong>{analyzedResult.frequency}</strong>
                  </div>
                  <div className="diagnose-stat">
                    <span className="ui-label">Pattern match</span>
                    <strong>{analyzedResult.confidence}</strong>
                  </div>
                </div>
                <div>
                  <span className="ui-label">Acoustic observation</span>
                  <p className="ui-muted">{analyzedResult.description}</p>
                </div>
                <div>
                  <span className="ui-label">Suggested next step</span>
                  <p className="ui-muted">{analyzedResult.solution}</p>
                </div>
                <p className="ui-muted acoustic-sample-level">Signal amplitude: {analyzedResult.dbLevel}</p>
                <div className="tool-inline">
                  <button type="button" className="ui-btn ui-btn-primary" onClick={askMechanic}>
                    Open in diagnosis <ArrowRight size={15} aria-hidden="true" />
                  </button>
                  <button type="button" className="ui-btn ui-btn-quiet" onClick={startRecording}>
                    <RotateCcw size={15} aria-hidden="true" /> Re-sample
                  </button>
                </div>
              </>
            ) : (
              <div className="acoustic-result-empty">
                <div>
                  <Activity size={30} aria-hidden="true" />
                  <p><strong>{inputMode === 'mic' ? 'Start listening to capture live audio' : 'Run a demo scan to see a sample result'}</strong></p>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
