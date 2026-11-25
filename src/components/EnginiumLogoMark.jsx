import React, { useId } from 'react';

/**
 * EnginiumLogoMark - Precision Automotive & Mechanical Telemetry Hallmark
 * Combines a machined titanium tachometer bezel, crimson redline arc,
 * architectural "E" piston-monogram, and ruby ignition diamond core.
 */
export default function EnginiumLogoMark({ size = 32, className = '' }) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9_-]/g, '');

  const bgGradId = `en-bg-${uid}`;
  const bezelGradId = `en-bezel-${uid}`;
  const crimsonGradId = `en-crimson-${uid}`;
  const monoGradId = `en-mono-${uid}`;
  const glowFilterId = `en-glow-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`en-luxury-emblem ${className}`}
      aria-label="Enginium Brand Hallmark"
    >
      <defs>
        <radialGradient id={bgGradId} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#1b2030" />
          <stop offset="65%" stopColor="#0b0d14" />
          <stop offset="100%" stopColor="#050609" />
        </radialGradient>

        <linearGradient id={bezelGradId} x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>

        <linearGradient id={crimsonGradId} x1="25" y1="8" x2="36" y2="25" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ff4d6d" />
          <stop offset="60%" stopColor="#ff1744" />
          <stop offset="100%" stopColor="#be123c" />
        </linearGradient>

        <linearGradient id={monoGradId} x1="12" y1="12" x2="26" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>

        <filter id={glowFilterId} x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur stdDeviation="1.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Machined Carbon Core Housing */}
      <circle
        cx="20"
        cy="20"
        r="16.5"
        fill={`url(#${bgGradId})`}
        stroke="rgba(255, 255, 255, 0.08)"
        strokeWidth="0.75"
      />

      {/* Titanium Tachometer Outer Ring */}
      <path
        d="M 28.4 5.9 A 16.5 16.5 0 1 0 34.4 28.1"
        stroke={`url(#${bezelGradId})`}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Crimson Redline Telemetry Sweep */}
      <path
        d="M 31.6 8.3 A 16.5 16.5 0 0 1 36.2 22.7"
        stroke={`url(#${crimsonGradId})`}
        strokeWidth="2.1"
        strokeLinecap="round"
        filter={`url(#${glowFilterId})`}
      />

      {/* Precision Calibration Micro-Ticks */}
      <line x1="20" y1="2.3" x2="20" y2="4.6" stroke="#94a3b8" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="2.3" y1="20" x2="4.6" y2="20" stroke="#64748b" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="20" y1="35.4" x2="20" y2="37.7" stroke="#64748b" strokeWidth="1.25" strokeLinecap="round" />

      {/* Architectural "E" Piston Monogram */}
      <path
        d="M 24.5 13 H 14.5 C 13.4 13 12.8 13.6 12.8 14.7 V 25.3 C 12.8 26.4 13.4 27 14.5 27 H 24.5"
        stroke={`url(#${monoGradId})`}
        strokeWidth="2.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 13.3 20 H 21.8"
        stroke="#ffffff"
        strokeWidth="2.35"
        strokeLinecap="round"
      />

      {/* Ruby Ignition Spark Diamond */}
      <path
        d="M 28.6 17.1 L 31.3 20 L 28.6 22.9 L 25.9 20 Z"
        fill={`url(#${crimsonGradId})`}
        filter={`url(#${glowFilterId})`}
      />
    </svg>
  );
}
