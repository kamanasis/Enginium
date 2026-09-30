import React, { useEffect, useRef } from 'react';

export default function EngineBlueprintAnimation({ themeColor = '#06b6d4', speed = 0.02 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let angle = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawEngine = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height * 0.55;
      const size = Math.min(canvas.width, canvas.height) * 0.7;

      // Draw engineering grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Rotating crankshaft
      angle += speed;
      const crankRadius = size * 0.15;
      const crankX = cx + Math.cos(angle) * crankRadius;
      const crankY = cy + Math.sin(angle) * crankRadius;

      // Piston dimensions and positions
      const pistonW = size * 0.28;
      const pistonH = size * 0.2;
      const rodLength = size * 0.42;

      // Calculate piston position (sliding vertically)
      // Using trigonometry to calculate exact piston height (y) based on rod length and crank position
      const dx = crankX - cx;
      const pistonY = crankY - Math.sqrt(rodLength * rodLength - dx * dx);

      // Draw circular technical interface/compass scale around engine
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.45, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(249, 115, 22, 0.08)';
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.5, angle * 0.5, angle * 0.5 + Math.PI * 0.5);
      ctx.stroke();

      // Technical crosshairs
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.beginPath();
      ctx.moveTo(cx - size * 0.5, cy);
      ctx.lineTo(cx + size * 0.5, cy);
      ctx.moveTo(cx, cy - size * 0.6);
      ctx.lineTo(cx, cy + size * 0.4);
      ctx.stroke();

      // Cylinder Walls
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      // Left wall
      ctx.moveTo(cx - pistonW * 0.55, pistonY - pistonH * 1.5);
      ctx.lineTo(cx - pistonW * 0.55, cy + crankRadius);
      // Right wall
      ctx.moveTo(cx + pistonW * 0.55, pistonY - pistonH * 1.5);
      ctx.lineTo(cx + pistonW * 0.55, cy + crankRadius);
      ctx.stroke();

      // Cylinder Head (Top chamber)
      ctx.beginPath();
      ctx.moveTo(cx - pistonW * 0.55, pistonY - pistonH * 1.5);
      ctx.lineTo(cx + pistonW * 0.55, pistonY - pistonH * 1.5);
      ctx.stroke();

      // Draw spark plug at the top center
      ctx.strokeStyle = themeColor;
      ctx.fillStyle = themeColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(cx - 6, pistonY - pistonH * 1.5 - 20, 12, 20);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, pistonY - pistonH * 1.5 - 5);
      ctx.lineTo(cx, pistonY - pistonH * 1.5);
      ctx.stroke();

      // Spark Animation (at compression peak / top dead center)
      // When crank is pointing straight up (approx angle = 3*Math.PI/2)
      const normalizedAngle = (angle + Math.PI * 0.5) % (Math.PI * 2);
      const isPeak = normalizedAngle < 0.25 || normalizedAngle > Math.PI * 2 - 0.25;

      if (isPeak) {
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 15;
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const sparkAngle = (i / 8) * Math.PI * 2;
          const len = 10 + Math.random() * 10;
          ctx.moveTo(cx, pistonY - pistonH * 1.5);
          ctx.lineTo(cx + Math.cos(sparkAngle) * len, pistonY - pistonH * 1.5 + Math.sin(sparkAngle) * len);
        }
        ctx.stroke();
        ctx.shadowBlur = 0; // reset
      }

      // Draw Connecting Rod
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(cx, pistonY);
      ctx.lineTo(crankX, crankY);
      ctx.stroke();

      // Draw Piston
      ctx.fillStyle = 'rgba(30, 41, 59, 0.6)';
      ctx.strokeStyle = themeColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(cx - pistonW * 0.5, pistonY - pistonH, pistonW, pistonH);
      ctx.fill();
      ctx.stroke();

      // Piston rings
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - pistonW * 0.5, pistonY - pistonH * 0.85);
      ctx.lineTo(cx + pistonW * 0.5, pistonY - pistonH * 0.85);
      ctx.moveTo(cx - pistonW * 0.5, pistonY - pistonH * 0.7);
      ctx.lineTo(cx + pistonW * 0.5, pistonY - pistonH * 0.7);
      ctx.stroke();

      // Piston Wrist Pin
      ctx.fillStyle = '#64748b';
      ctx.beginPath();
      ctx.arc(cx, pistonY - pistonH * 0.5, 6, 0, Math.PI * 2);
      ctx.fill();

      // Draw Crankshaft
      ctx.fillStyle = '#334155';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Crank Counterweight
      ctx.fillStyle = 'rgba(100, 116, 139, 0.2)';
      ctx.strokeStyle = themeColor;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, crankRadius * 1.3, angle + Math.PI * 0.85, angle + Math.PI * 1.15);
      ctx.lineTo(cx, cy);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Crank pin
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.arc(crankX, crankY, 8, 0, Math.PI * 2);
      ctx.fill();

      // Display real-time engine metrics in text overlays
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.font = '9px monospace';
      ctx.fillText(`CYL_DIA: 52.4 MM`, cx - size * 0.45, cy + size * 0.25);
      ctx.fillText(`RPM: ${Math.round(60 * speed * 60)} EST`, cx - size * 0.45, cy + size * 0.32);
      ctx.fillText(`STROKE: 4-CYCLE`, cx + size * 0.15, cy + size * 0.25);
      ctx.fillText(`IGN: ${isPeak ? 'TRIGGERED' : 'STANDBY'}`, cx + size * 0.15, cy + size * 0.32);

      animationId = requestAnimationFrame(drawEngine);
    };

    drawEngine();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [themeColor, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40 transition-opacity duration-300"
    />
  );
}
