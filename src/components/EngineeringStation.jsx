import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Zap, Activity, Gauge, RefreshCw, Layers, ShieldCheck, Thermometer } from 'lucide-react';
import ThreeEngineViewer from './ThreeEngineViewer';

export default function EngineeringStation({ selectedVehicle, activeTab }) {
  const [themeColor, setThemeColor] = useState('#06b6d4');
  const [rpm, setRpm] = useState(1250);
  const [engineCycle, setEngineCycle] = useState('Power');
  const [viewMode, setViewMode] = useState('blueprint'); // 'blueprint' | '3d'
  const [selectedPartId, setSelectedPartId] = useState('spark-plug');

  const canvasRef = useRef(null);

  // Animated Blueprint Canvas with dynamic RPM speed & cycle detection
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || viewMode !== 'blueprint') return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let angle = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight || 420;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const speed = (rpm / 60) * 0.008;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height * 0.55;
      const size = Math.min(canvas.width, canvas.height) * 0.68;

      // Draw technical blueprint grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const grid = 30;
      for (let x = 0; x < canvas.width; x += grid) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += grid) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Compass & HUD rings
      ctx.strokeStyle = themeColor === '#ef4444' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(6, 182, 212, 0.15)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.48, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating angle
      angle += speed;
      const crankRadius = size * 0.16;
      const crankX = cx + Math.cos(angle) * crankRadius;
      const crankY = cy + Math.sin(angle) * crankRadius;

      // Piston sizing
      const pistonW = size * 0.32;
      const pistonH = size * 0.22;
      const rodLength = size * 0.44;

      const dx = crankX - cx;
      const pistonY = crankY - Math.sqrt(Math.max(0, rodLength * rodLength - dx * dx));

      // Calculate 4-stroke cycle based on angle
      const normAngle = ((angle % (Math.PI * 4)) + Math.PI * 4) % (Math.PI * 4);
      let currentStage = 'Intake';
      if (normAngle < Math.PI) {
        currentStage = 'Power';
      } else if (normAngle < Math.PI * 2) {
        currentStage = 'Exhaust';
      } else if (normAngle < Math.PI * 3) {
        currentStage = 'Intake';
      } else {
        currentStage = 'Compression';
      }

      // Top Dead Center (TDC) spark ignition
      const isSpark = Math.abs(normAngle) < 0.2 || Math.abs(normAngle - Math.PI * 4) < 0.2;

      // Cylinder Walls
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(cx - pistonW * 0.58, pistonY - pistonH * 1.4);
      ctx.lineTo(cx - pistonW * 0.58, cy + crankRadius * 0.9);
      ctx.moveTo(cx + pistonW * 0.58, pistonY - pistonH * 1.4);
      ctx.lineTo(cx + pistonW * 0.58, cy + crankRadius * 0.9);
      ctx.stroke();

      // Cylinder Head Chamber
      ctx.beginPath();
      ctx.moveTo(cx - pistonW * 0.58, pistonY - pistonH * 1.4);
      ctx.lineTo(cx + pistonW * 0.58, pistonY - pistonH * 1.4);
      ctx.stroke();

      // Spark Plug
      ctx.strokeStyle = themeColor;
      ctx.fillStyle = themeColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(cx - 7, pistonY - pistonH * 1.4 - 24, 14, 24);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, pistonY - pistonH * 1.4 - 6);
      ctx.lineTo(cx, pistonY - pistonH * 1.4);
      ctx.stroke();

      // Spark Flash Effect
      if (isSpark) {
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 20;
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let i = 0; i < 10; i++) {
          const spkAngle = (i / 10) * Math.PI * 2;
          const len = 12 + Math.random() * 12;
          ctx.moveTo(cx, pistonY - pistonH * 1.4);
          ctx.lineTo(cx + Math.cos(spkAngle) * len, pistonY - pistonH * 1.4 + Math.sin(spkAngle) * len);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Connecting Rod
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(cx, pistonY);
      ctx.lineTo(crankX, crankY);
      ctx.stroke();

      // Piston Head
      ctx.fillStyle = 'rgba(20, 24, 34, 0.85)';
      ctx.strokeStyle = themeColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(cx - pistonW * 0.5, pistonY - pistonH, pistonW, pistonH);
      ctx.fill();
      ctx.stroke();

      // Piston Rings
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - pistonW * 0.5, pistonY - pistonH * 0.82);
      ctx.lineTo(cx + pistonW * 0.5, pistonY - pistonH * 0.82);
      ctx.moveTo(cx - pistonW * 0.5, pistonY - pistonH * 0.68);
      ctx.lineTo(cx + pistonW * 0.5, pistonY - pistonH * 0.68);
      ctx.stroke();

      // Wrist Pin
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.arc(cx, pistonY - pistonH * 0.45, 6, 0, Math.PI * 2);
      ctx.fill();

      // Crankshaft Hub
      ctx.fillStyle = '#334155';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Counterweight
      ctx.fillStyle = 'rgba(100, 116, 139, 0.25)';
      ctx.strokeStyle = themeColor;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, crankRadius * 1.35, angle + Math.PI * 0.85, angle + Math.PI * 1.15);
      ctx.lineTo(cx, cy);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Crank Pin
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(crankX, crankY, 8, 0, Math.PI * 2);
      ctx.fill();

      // HUD Text Overlays
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.font = '10px monospace';
      ctx.fillText(`STROKE: 4-CYCLE`, cx - size * 0.45, cy - size * 0.38);
      ctx.fillText(`STAGE: ${currentStage.toUpperCase()}`, cx - size * 0.45, cy - size * 0.30);
      ctx.fillText(`IGNITION: ${isSpark ? 'FIRED' : 'STANDBY'}`, cx + size * 0.12, cy - size * 0.38);
      ctx.fillText(`RPM: ${rpm}`, cx + size * 0.12, cy - size * 0.30);

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [rpm, themeColor, viewMode]);

  return (
    <div className="flex flex-col h-full bg-[#0d0f15] border-l border-zinc-800/80 p-5 space-y-5 overflow-y-auto">
      
      {/* Station Header */}
      <div className="flex justify-between items-center border-b border-zinc-800/80 pb-3">
        <div>
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-black block">Live Engineering HUD</span>
          <h3 className="text-sm font-black text-white flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-cyan-400" />
            4-Stroke Engine Telemetry
          </h3>
        </div>

        {/* View Switcher: Blueprint vs 3D */}
        <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg p-0.5 text-[10px] font-bold">
          <button
            onClick={() => setViewMode('blueprint')}
            className={`px-2.5 py-1 rounded transition-colors ${viewMode === 'blueprint' ? 'bg-cyan-500 text-black' : 'text-zinc-400 hover:text-white'}`}
          >
            Schematic
          </button>
          <button
            onClick={() => setViewMode('3d')}
            className={`px-2.5 py-1 rounded transition-colors ${viewMode === '3d' ? 'bg-cyan-500 text-black' : 'text-zinc-400 hover:text-white'}`}
          >
            3D Orbit
          </button>
        </div>
      </div>

      {/* Blueprint Visualizer Container */}
      <div className="bg-[#12141c] border border-zinc-800/90 rounded-2xl relative overflow-hidden flex flex-col items-center min-h-[360px] justify-center shadow-2xl">
        {viewMode === 'blueprint' ? (
          <div className="relative w-full h-[360px]">
            <canvas ref={canvasRef} className="w-full h-full block" />
            
            {/* Color Scheme Switcher (Cyan, Red, Amber - matching the 3 right diagrams in Figma image!) */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-zinc-800 z-20">
              <span className="text-[9px] text-zinc-400 font-mono">THEME:</span>
              <button
                onClick={() => setThemeColor('#06b6d4')}
                className={`w-3.5 h-3.5 rounded-full bg-cyan-400 border transition-transform ${themeColor === '#06b6d4' ? 'scale-125 border-white' : 'border-transparent'}`}
                title="Cyan Schematic"
              />
              <button
                onClick={() => setThemeColor('#ef4444')}
                className={`w-3.5 h-3.5 rounded-full bg-red-500 border transition-transform ${themeColor === '#ef4444' ? 'scale-125 border-white' : 'border-transparent'}`}
                title="Red Alert Schematic"
              />
              <button
                onClick={() => setThemeColor('#f59e0b')}
                className={`w-3.5 h-3.5 rounded-full bg-amber-400 border transition-transform ${themeColor === '#f59e0b' ? 'scale-125 border-white' : 'border-transparent'}`}
                title="Amber Warning Schematic"
              />
            </div>
          </div>
        ) : (
          <div className="w-full h-[360px]">
            <ThreeEngineViewer selectedPartId={selectedPartId} onSelectPart={setSelectedPartId} />
          </div>
        )}
      </div>

      {/* Interactive Throttle RPM Tachometer Controller */}
      <div className="bg-[#12141c] border border-zinc-800 rounded-2xl p-4 space-y-3 shadow-xl">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-cyan-400" />
            Engine Throttle RPM
          </span>
          <span className="font-mono text-xs font-black text-cyan-400">{rpm} RPM</span>
        </div>

        <input 
          type="range" 
          min="800" 
          max="8500" 
          step="50"
          value={rpm}
          onChange={(e) => setRpm(Number(e.target.value))}
          className="w-full accent-cyan-400 bg-zinc-800 h-1.5 rounded-lg cursor-pointer"
        />

        <div className="flex justify-between text-[9px] font-mono text-zinc-500">
          <span>800 (Idle)</span>
          <span>3,500 (Cruising)</span>
          <span>6,000 (Power Band)</span>
          <span className="text-red-400">8,500 (Redline)</span>
        </div>
      </div>

      {/* 4-Stroke Otto Cycle Dynamic Progress Indicator */}
      <div className="bg-[#12141c] border border-zinc-800 rounded-2xl p-4 space-y-2.5 shadow-xl">
        <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">4-Stroke Cycle Sequence</h4>
        <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
          <div className="bg-cyan-500/10 border border-cyan-500/30 p-2 rounded-xl">
            <span className="font-mono text-[9px] text-cyan-400 block font-bold">STROKE 1</span>
            <span className="font-extrabold text-zinc-200">INTAKE</span>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/30 p-2 rounded-xl">
            <span className="font-mono text-[9px] text-blue-400 block font-bold">STROKE 2</span>
            <span className="font-extrabold text-zinc-200">COMPRESS</span>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 p-2 rounded-xl">
            <span className="font-mono text-[9px] text-amber-400 block font-bold">STROKE 3</span>
            <span className="font-extrabold text-amber-300">POWER</span>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 p-2 rounded-xl">
            <span className="font-mono text-[9px] text-red-400 block font-bold">STROKE 4</span>
            <span className="font-extrabold text-zinc-200">EXHAUST</span>
          </div>
        </div>
      </div>

      {/* Active Vehicle Engine Architecture Summary */}
      <div className="bg-[#12141c] border border-zinc-800 rounded-2xl p-4 space-y-3 shadow-xl">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Engine Specs</span>
          <span className="text-[10px] text-zinc-500 font-mono">{selectedVehicle.model}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800">
            <span className="text-[9px] text-zinc-500 uppercase font-mono block">Architecture</span>
            <span className="font-bold text-zinc-200 text-[11px] truncate block">{selectedVehicle.engine}</span>
          </div>
          <div className="bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800">
            <span className="text-[9px] text-zinc-500 uppercase font-mono block">Output</span>
            <span className="font-bold text-cyan-400 text-[11px] block">{selectedVehicle.power}</span>
          </div>
          <div className="bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800">
            <span className="text-[9px] text-zinc-500 uppercase font-mono block">Oil Viscosity</span>
            <span className="font-bold text-zinc-200 text-[11px] block">{selectedVehicle.specs.oilType}</span>
          </div>
          <div className="bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800">
            <span className="text-[9px] text-zinc-500 uppercase font-mono block">Spark Gap</span>
            <span className="font-bold text-zinc-200 text-[11px] block">{selectedVehicle.specs.sparkPlugGap}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
