/** @type {import('tailwindcss').Config} */
// Tailwind with React Setup
//https://dev.to/david_bilsonn/how-to-setup-tailwind-css-in-react-js-with-vs-code-59p4
module.exports = {
  content: [ "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}

