module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      'body': ['Roboto', 'sans-serif'],
      'poppins': ['Poppins', 'serif'],
    },
    lineHeight: { 'line-middle': '0.1em' },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [],
}
