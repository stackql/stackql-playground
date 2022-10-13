/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
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