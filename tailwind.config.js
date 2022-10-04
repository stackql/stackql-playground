/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#0F4C81'
      },
      fontFamily: {
        'sans': ['"Open Sans"'],
      },
    }
  },
  plugins: [],
}