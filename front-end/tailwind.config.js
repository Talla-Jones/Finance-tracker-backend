

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        myColor:'rgb(137,0,57)',
        textColor:'#f0f0f0',
        brighter:'#c90046'
      }
    },
  },
  plugins: [],
}
