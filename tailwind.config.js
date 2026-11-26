/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#0a0a0f',
        'charcoal-light': '#14141d',
        'charcoal-lighter': '#1e1e26',
        orange: '#ff6b35',
        'orange-dim': 'rgba(255, 107, 53, 0.15)',
        lime: '#a8ff55',
        grey: '#8888a0',
        'grey-light': '#e8e8f0',
        'muted': '#6b6b80',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
