/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      mobile: { max: "500px" },
      tablet: { max: "850px" },
      regular: { max: "1500px" },
    },
    extend: {
      colors: {
        primary: "#0F4C81",
      },
      fontFamily: {
        sans: ['"Open Sans"'],
      },
    },
  },
  plugins: [],
};
