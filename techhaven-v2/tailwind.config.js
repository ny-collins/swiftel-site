/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./cart.html",
    "./products.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4F46E5',     // Indigo
        'secondary': '#111827',   // Rich Black
        'accent': '#10B981',      // Emerald
        'light': '#F9FAFB',       // Off-White
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
