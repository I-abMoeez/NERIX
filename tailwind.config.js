/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        ink: '#080b14',
        panel: '#101522',
        line: '#222a3b',
        violet: '#8b5cf6',
        mint: '#42e8b4',
      },
      boxShadow: {
        glow: '0 0 50px rgba(139, 92, 246, 0.18)',
      },
    },
  },
  plugins: [],
}
