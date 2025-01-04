/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#19011e',
        'background': '#fcf0ff',
        'primary': '#730387',
        'secondary': '#fc6f5f',
        'accent': '#c87604',
       },
    },
    
     
  },
  plugins: [],
}

