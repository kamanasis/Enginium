import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Play, Square, Activity, AlertTriangle, CheckCircle2, RefreshCw, Cpu, Disc } from 'lucide-react';

export default function AcousticView({ selectedVehicle, setActiveTab, setDiagnoseInput }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [analyzedResult, setAnalyzedResult] = useState(null);
  const [selectedDemoSound, setSelectedDemoSound] = useState('tappet');
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [rpmDetected, setRpmDetected] = useState(1150);

  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Audio waveform animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let phase = 0;
    const render = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = 140;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const numBars = 48;
      const barWidth = (canvas.width / numBars) - 2;
      const centerY = canvas.height / 2;

      phase += isRecording ? 0.12 : isPlayingDemo ? 0.08 : 0.02;

      for (let i = 0; i < numBars; i++) {
        // Frequency energy simulation
        let height = 0;
        if (isRecording || isPlayingDemo) {
          // Dynamic lively frequencies with harmonics
          const noise = Math.sin(phase + i * 0.3) * Math.cos(phase * 0.5 + i * 0.2);
          const peak = (i > 18 && i < 26) ? 1.8 : (i > 32 && i < 38) ? 1.4 : 0.8;
          height = Math.abs(noise * 45 * peak) + 10 + Math.random() * 8;
        } else {
          // Gentle ambient idle noise
          height = 6 + Math.sin(phase + i * 0.4) * 4;
        }

        const x = i * (barWidth + 2);
        const y = centerY - height / 2;

        // Color gradient: Cyan for low, Amber for mid, Red for high or alert
        let barColor = '#06b6d4';
        if (i > 30) {
          barColor = isRecording ? '#ef4444' : '#f59e0b';
        } else if (i > 18) {
          barColor = '#38bdf8';
        }

        ctx.fillStyle = barColor;
        ctx.fillRect(x, y, barWidth, height);
      }

      // Draw center line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(canvas.width, centerY);
      ctx.stroke();

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isRecording, isPlayingDemo]);

  // Recording timer
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds(prev => {
          if (prev >= 6) {
            // Auto complete recording after 6 seconds
            stopRecording();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = () => {
    setIsPlayingDemo(false);
    setIsRecording(true);
    setAnalyzedResult(null);
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Generate AI acoustic diagnosis
    const sampleResults = {
      tappet: {
        title: "Tappet / Valve Clearance Noise Detected",
        frequency: "2,450 Hz (High Frequency Metallic Click)",
        dbLevel: "78 dB @ 1200 RPM",
        confidence: "91%",
        severity: "Medium",
        severityColor: "text-amber-400",
        description: "Repetitive light ticking synced with camshaft revolution. Valve rocker clearance is approx 0.12mm (recommended: 0.08mm).",
        solution: "Adjust valve rocker clearances using feeler gauge. Check engine oil level.",
        partId: "spark-plug"
      },
      chain: {
        title: "Drive / Cam Chain Slack Chatter",
        frequency: "850 Hz - 1,400 Hz (Continuous Metallic Whir)",
        dbLevel: "82 dB @ Idle",
        confidence: "88%",
        severity: "High",
        severityColor: "text-red-400",
        description: "Rattling noise from left-side engine casing. Chain tensioner has reached maximum extension or chain has elongated.",
        solution: "Inspect cam chain tensioner and adjust drive chain slack to 25-30mm.",
        partId: "chain"
      },
      normal: {
        title: "Clean Combustion & Baseline Idle",
        frequency: "All frequency bands within normal baseline",
        dbLevel: "68 dB @ 1100 RPM",
        confidence: "96%",
        severity: "Optimal",
        severityColor: "text-cyan-400",
        description: "Smooth 4-stroke acoustic profile. No abnormal piston slap, valve chatter, or bearing rumble detected.",
        solution: "Engine acoustic health is excellent. Maintain regular oil change intervals.",
        partId: null
      }
    };

    setAnalyzedResult(sampleResults[selectedDemoSound] || sampleResults.tappet);
  };

  const toggleDemoSound = (soundKey) => {
    setSelectedDemoSound(soundKey);
    setIsPlayingDemo(true);
    setTimeout(() => {
      setIsPlayingDemo(false);
    }, 4000);
  };

  return (
    <div className="flex-1 flex flex-col p-4 pb-28 text-white space-y-6">
      
      {/* Top Header */}
      <div className="flex justify-between items-center border-b border-zinc-800/80 pb-3">
        <div>
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-black block">AI Acoustic Engine</span>
          <h2 className="text-sm font-black text-white flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-alert" />
            Sound Frequency Diagnostic
          </h2>
        </div>
        <span className="text-[9px] bg-red-500/10 text-red-400 border border-red-500/30 px-2 py-0.5 rounded font-mono uppercase font-bold flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
          20 Hz - 8 kHz FFT
        </span>
      </div>

      {/* Target Machine Banner */}
      <div className="bg-[#12141a] border border-zinc-800/80 rounded-2xl p-3.5 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-xs">
            MIC
          </div>
          <div>
            <h4 className="text-xs font-bold text-zinc-100">{selectedVehicle.name}</h4>
            <p className="text-[10px] text-zinc-400">Hold microphone ~20cm from cylinder head</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[9px] text-zinc-500 uppercase font-mono block">Estimated RPM</span>
          <span className="text-xs font-black text-cyan-400 font-mono">{rpmDetected} RPM</span>
        </div>
      </div>

      {/* Primary Circular Recording HUD (The prominent Red Circle from the design!) */}
      <div className="bg-gradient-to-b from-[#131620] to-[#0d0f14] border border-zinc-800/90 rounded-3xl p-6 relative overflow-hidden flex flex-col items-center justify-center shadow-2xl">
        
        {/* Subtle background radar circles */}
        <div className="absolute w-64 h-64 border border-zinc-800/40 rounded-full pointer-events-none"></div>
        <div className="absolute w-44 h-44 border border-red-500/10 rounded-full pointer-events-none animate-pulse-slow"></div>

        {/* Center Pulsing Recording Button */}
        <div className="relative flex items-center justify-center my-4">
          {/* Animated ping wave ring when recording */}
          {isRecording && (
            <>
              <div className="absolute w-36 h-36 bg-red-600/20 rounded-full animate-ping"></div>
              <div className="absolute w-44 h-44 bg-red-600/10 rounded-full animate-ping" style={{ animationDuration: '1.8s' }}></div>
            </>
          )}

          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`w-28 h-28 rounded-full flex flex-col items-center justify-center transition-all duration-300 relative z-20 shadow-2xl ${
              isRecording 
                ? 'bg-gradient-to-br from-red-500 to-red-700 text-white scale-105 glow-red-strong border-4 border-red-400' 
                : 'bg-gradient-to-br from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white border-4 border-red-500/50 glow-red hover:scale-105 active:scale-95'
            }`}
          >
            {isRecording ? (
              <>
                <Square className="w-8 h-8 fill-white mb-1" />
                <span className="text-[9px] font-black tracking-widest uppercase">STOP (0{recordingSeconds}s)</span>
              </>
            ) : (
              <>
                <Mic className="w-8 h-8 text-white mb-1" />
                <span className="text-[9px] font-black tracking-widest uppercase">RECORD</span>
              </>
            )}
          </button>
        </div>

        {/* Status prompt */}
        <p className="text-xs font-bold text-zinc-300 mt-2 text-center">
          {isRecording ? "Listening to engine frequency spectrum..." : "Tap to record 6-second engine audio"}
        </p>
        <span className="text-[10px] text-zinc-500 mt-0.5">Keep throttle steady at idle</span>

        {/* Audio Waveform Canvas */}
        <div className="w-full mt-5 bg-[#090a0d] border border-zinc-800/80 rounded-2xl p-2 relative overflow-hidden">
          <canvas ref={canvasRef} className="w-full block" />
          <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500 px-2 mt-1">
            <span>20 Hz (Piston)</span>
            <span>1,200 Hz (Camshaft)</span>
            <span>4,000 Hz (Valves)</span>
            <span>8,000 Hz (Chain)</span>
          </div>
        </div>
      </div>

      {/* Preset Symptom Audio Samples for Instant Testing */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Simulated Engine Audio Profiles</h4>
          <span className="text-[10px] text-zinc-500 font-mono">Test Samples</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'tappet', label: 'Valve Tapping', note: '2.4kHz click', color: 'border-amber-500/30' },
            { id: 'chain', label: 'Chain Slack', note: 'Rattling whir', color: 'border-red-500/30' },
            { id: 'normal', label: 'Normal Idle', note: 'Smooth rumble', color: 'border-cyan-500/30' },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => toggleDemoSound(s.id)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                selectedDemoSound === s.id && isPlayingDemo
                  ? 'bg-zinc-800 border-accent shadow-lg shadow-cyan-500/10'
                  : 'bg-[#12141a] border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-zinc-200">{s.label}</span>
                {selectedDemoSound === s.id && isPlayingDemo ? (
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
                ) : (
                  <Play className="w-3 h-3 text-zinc-500" />
                )}
              </div>
              <p className="text-[9px] text-zinc-400 font-mono">{s.note}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Acoustic Analysis Diagnostic Outcome */}
      {analyzedResult && (
        <div className="bg-[#12141a] border border-zinc-800 rounded-3xl p-5 space-y-4 shadow-2xl animate-fade-in">
          <div className="flex justify-between items-start border-b border-zinc-800/80 pb-3">
            <div>
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">AI Frequency Match</span>
              <h3 className="text-sm font-black text-zinc-100 mt-0.5">{analyzedResult.title}</h3>
            </div>
            <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${analyzedResult.severityColor} bg-zinc-900 border-zinc-700`}>
              {analyzedResult.severity}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-850">
              <span className="text-[9px] text-zinc-500 uppercase font-mono block">Peak Frequency</span>
              <span className="font-bold text-zinc-200 text-[11px]">{analyzedResult.frequency}</span>
            </div>
            <div className="bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-850">
              <span className="text-[9px] text-zinc-500 uppercase font-mono block">Confidence Score</span>
              <span className="font-black text-cyan-400 text-[11px]">{analyzedResult.confidence}</span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Acoustic Observation</span>
            <p className="text-[11px] text-zinc-300 leading-relaxed bg-zinc-950/40 p-3 rounded-xl border border-zinc-850">
              {analyzedResult.description}
            </p>
          </div>

          <div className="space-y-1.5 text-xs">
            <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Recommended Wrenching Action</span>
            <p className="text-[11px] text-cyan-300 leading-relaxed bg-cyan-950/20 p-3 rounded-xl border border-cyan-800/30">
              {analyzedResult.solution}
            </p>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={() => {
                setDiagnoseInput(`I ran an acoustic scan and detected ${analyzedResult.title}. Can you explain how to fix it step by step?`);
                setActiveTab('diagnose');
              }}
              className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black py-2.5 rounded-xl text-xs font-black tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20"
            >
              <Cpu className="w-3.5 h-3.5" />
              Ask AI Mechanic
            </button>
            <button
              onClick={startRecording}
              className="px-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Re-Scan
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
