/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cursive': ['Dancing Script', 'cursive'],
        'cursive2': ['Cabin', 'sans-serif'],
      }
    },
  },
  plugins: [],
}