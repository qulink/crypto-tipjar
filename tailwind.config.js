/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lightning': '#f7931a',
        'bitcoin': '#ff9500'
      }
    },
  },
  plugins: [],
}