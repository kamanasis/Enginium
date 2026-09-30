/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0b0e',
        surface: '#12141a',
        'surface-light': '#1a1d26',
        steel: {
          light: '#2E2E3E',
          DEFAULT: '#1E1E28',
          dark: '#14141B',
        },
        accent: {
          light: '#22d3ee',
          DEFAULT: '#06b6d4',
          dark: '#0891b2',
          neon: '#00f0ff',
        },
        alert: {
          DEFAULT: '#ef4444',
          glow: '#ff3b30',
        },
        warning: '#f59e0b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    },
  },
  plugins: [],
}
