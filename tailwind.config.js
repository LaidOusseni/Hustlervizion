/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hv-black': '#080808',
        'hv-dark': '#111111',
        'hv-dark-2': '#1a1a1a',
        'hv-red-deep': '#8B111B',
        'hv-red': '#D72638',
        'hv-cream': '#F3F0EA',
        'hv-gray': '#6b6b6b',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-cinematic': 'linear-gradient(to bottom, #080808 0%, #1a0006 50%, #080808 100%)',
        'gradient-red-glow': 'radial-gradient(ellipse, rgba(139,17,27,0.2) 0%, rgba(8,8,8,0) 70%)',
      },
   },
  },
  plugins: [],
}
