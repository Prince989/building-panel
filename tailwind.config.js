/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        "primary" : "#140092",
        "secondary" : "#4e3350",
        "default" : "#725374"
      },
      screens : {
        "xs" : {max : "640px"}
      }
    },
  },
  plugins: [],
}