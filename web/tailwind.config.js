/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['DM Mono', 'monospace'],
        serif: ['Frank Ruhl Libre', 'serif'],
      },
      backgroundColor: {
        'zinc-750': '#2f2f3d',
      },
    },
  },
  plugins: [],
};