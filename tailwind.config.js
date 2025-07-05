/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}', // Eğer src dizini varsa mutlaka dahil et
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
