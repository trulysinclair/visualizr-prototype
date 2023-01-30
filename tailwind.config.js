/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a202c",
        secondary: "#151a23",
        "input-background": "#2d3748",
        "accent-orange": "#ed8936",
        "accent-green": "#48bb78",
        "accent-red": "#e53e3e",
      }
    },
  },
  plugins: [],
}