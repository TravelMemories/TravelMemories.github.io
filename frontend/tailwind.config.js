/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#e8f5fc",
          200: "#FFEED9",
          300: "#E0F4FF",
          400: "#87C4FF",
          500: "#39A7FF",
          600: "#1685de",
        },
      },
      fontFamily: {
        primary: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
