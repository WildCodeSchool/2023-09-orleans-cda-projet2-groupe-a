/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F7F7F7',
        secondary: '#080808',
        background: '#F4F4F4',
        divider: '#BABABA',
      },
      fontFamily: {
        title: ['Nolan'],
        base: ['Roboto'],
      },
    },
  },
  plugins: [],
};
