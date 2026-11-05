import React from 'react';

/**
 * EnginiumLogoMark - Luxury Automotive & Engineering Hallmark
 * Minimalist geometric mark combining precision twin cylinders, aerodynamic flow, and ruby ignition focal point.
 */
export default function EnginiumLogoMark({ size = 32, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`en-luxury-emblem ${className}`}
      aria-label="Enginium Brand Hallmark"
    >
      <defs>
        {/* Subtle Titanium Specular Sheen */}
        <linearGradient id="enTitaniumGrad" x1="4" y1="4" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>

        {/* Ruby Ignition Core */}
        <linearGradient id="enRubyPoint" x1="18" y1="18" x2="26" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ff4d6d" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>

        <filter id="enCoreGlow" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Aerodynamic Precision Outer Ring Segments */}
      <path
        d="M18 3 C26.2843 3 33 9.71573 33 18 C33 26.2843 26.2843 33 18 33 C9.71573 33 3 26.2843 3 18"
        stroke="url(#enTitaniumGrad)"
        strokeWidth="1.75"
        strokeLinecap="round"
      />

      {/* Internal Geometric Cylinder Apex & "E" Monogram */}
      <path
        d="M11 11 H23 L18 18 H12"
        stroke="#ffffff"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 18 H20 L15 25 H11"
        stroke="url(#enTitaniumGrad)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Ruby Laser Ignition Focal Point */}
      <circle
        cx="25.5"
        cy="18"
        r="2"
        fill="url(#enRubyPoint)"
        filter="url(#enCoreGlow)"
      />
    </svg>
  );
}
