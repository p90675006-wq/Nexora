/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FAFAF7',
        ink: {
          DEFAULT: '#16192B',
          soft: '#4A4E63',
          faint: '#8A8D9E',
        },
        surface: '#FFFFFF',
        border: '#E7E5DE',
        primary: {
          50: '#EAF5F2',
          100: '#CFE7E0',
          200: '#A0CFC1',
          300: '#6FB6A2',
          400: '#3F9C82',
          500: '#0E7C66',
          600: '#0B6656',
          700: '#095346',
          800: '#073F35',
          900: '#052C25',
        },
        accent: {
          50: '#FDF4E5',
          100: '#FAE3B8',
          200: '#F5CD82',
          300: '#F0B85C',
          400: '#EAA847',
          500: '#E8A33D',
          600: '#C88529',
          700: '#9C6720',
          800: '#704918',
          900: '#4A2F0F',
        },
        weak: {
          50: '#FBEEED',
          300: '#DE9C95',
          500: '#C4544A',
          700: '#8F3B33',
        },
        blurred: {
          50: '#FBF2E4',
          300: '#E4C077',
          500: '#C79A3D',
          700: '#8F6D26',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(22, 25, 43, 0.04), 0 8px 24px -12px rgba(22, 25, 43, 0.10)',
        'card-hover': '0 4px 10px rgba(22, 25, 43, 0.06), 0 16px 36px -14px rgba(22, 25, 43, 0.16)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'ring-fill': {
          '0%': { strokeDashoffset: 'var(--ring-start, 283)' },
          '100%': { strokeDashoffset: 'var(--ring-end, 0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        'fade-in': 'fade-in 0.4s ease-out both',
        'ring-fill': 'ring-fill 1s ease-out both',
      },
    },
  },
  plugins: [],
}
