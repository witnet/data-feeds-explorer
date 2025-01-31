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
        white: {
          50: '#ffffff',
          100: '#efefef',
          200: '#dcdcdc',
          300: '#bdbdbd',
          400: '#989898',
          500: '#7c7c7c',
          600: '#656565',
          700: '#525252',
          800: '#464646',
          900: '#3d3d3d',
          950: '#292929',
        },
        gray: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#707070',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#262626',
        },
        black: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#232323',
        },
        'wit-blue': {
          50: '#ebfffe',
          100: '#cefffe',
          200: '#a2feff',
          300: '#63fafd',
          400: '#1cecf4',
          500: '#00e2ed',
          600: '#03a6b7',
          700: '#0a8494',
          800: '#126978',
          900: '#145765',
          950: '#063a46',
        },
        transparent: 'transparent',
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
      fontFamily: {
        title: ['Outfit', 'sans-serif'],
      },
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      mono: ['Courier', 'monospace'],
    },
  },
  plugins: [],
}
