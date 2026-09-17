/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          // Text/icon/link hue - contrast-safe per theme (see index.css vars).
          DEFAULT: 'rgb(var(--brand-rgb) / <alpha-value>)',
          // Button/active fill - stays vivid so dark ink on it reads well.
          surface: 'rgb(var(--brand-surface-rgb) / <alpha-value>)',
          glow: '#5eead4',
        },
        accent: '#7c5cff',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'hint-tap': {
          '0%': { opacity: '0', transform: 'scale(1.04)' },
          '22%': { opacity: '1', transform: 'scale(1)' },
          '72%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(1)' },
        },
        'screen-in': {
          '0%': { opacity: '0', transform: 'translateY(8px) scale(0.995)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'blink': {
          '0%, 100%': { opacity: '0.2', transform: 'translateY(0)' },
          '50%': { opacity: '1', transform: 'translateY(-2px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'hint-tap': 'hint-tap 1.8s ease-in-out 1 forwards',
        'screen-in': 'screen-in 0.24s ease-out',
        'scan': 'scan 2.5s linear infinite',
        'blink': 'blink 1.05s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
