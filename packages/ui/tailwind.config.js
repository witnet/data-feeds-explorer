/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        white: '#fdfdfd',
        'light-grey': '#bebebe',
        'w-black': '#2d2c39',
        'w-green': '#41bea5',
        charade: {
          50: '#f6f6f9',
          100: '#eeedf1',
          200: '#d6d6e1',
          300: '#b2b2c7',
          400: '#898aa7',
          500: '#6a6a8d',
          600: '#555574',
          700: '#46455f',
          800: '#3d3c50',
          900: '#363545',
          950: '#2d2c39',
        },
        'puerto-rico': {
          50: '#41bea5',
          100: '#d2f5eb',
          200: '#a5ead8',
          300: '#70d8c0',
          400: '#41bea5',
          500: '#29a38d',
          600: '#1e8373',
          700: '#1c695d',
          800: '#1b544c',
          900: '#1b4640',
          950: '#0a2927',
        },
      },
    },
  },
  plugins: [],
}
