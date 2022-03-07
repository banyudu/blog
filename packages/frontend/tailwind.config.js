module.exports = {
  content: [
    './public/**/*.html',
    './pages/**/*.tsx',
    './components/**/*.tsx'
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
