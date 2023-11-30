/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        light: '#F4F7F6',
        dark: '#0E0F0F',
        'dark-purple': '#9F13AF',
        'dark-yellow': '#FED431',
        'dark-blue': '#07BCD5',
        'dark-orange': '#F2682F',
        'dark-green': '#35B888',
        'dark-pink': '#DD1D5E',
        'light-purple': '#B61BCB',
        'light-yellow': '#FCE544',
        'light-blue': '#0AD2E4',
        'light-orange': '#F58643',
        'light-green': '#4FD1A8',
        'light-pink': '#EA2879',
        'pastel-green': '#C1F0DB',
        'pastel-pink': '#FDE0C7',
        'pastel-yellow': '#F5E4A2',
        'pastel-brown': '#D3BA95',
      },
      filter: {
        blackToPurple:
          'invert(17%) sepia(91%) saturate(5311%) hue-rotate(288deg) brightness(94%) contrast(93%)',
        blackToYellow:
          'invert(91%) sepia(83%) saturate(6947%) hue-rotate(323deg) brightness(111%) contrast(98%)',
        blackToBlue:
          'invert(56%) sepia(91%) saturate(1079%) hue-rotate(140deg) brightness(104%) contrast(92%)',
        blackToOrange:
          'invert(74%) sepia(41%) saturate(4587%) hue-rotate(332deg) brightness(101%) contrast(92%)',
        blackToGreen:
          'invert(75%) sepia(81%) saturate(317%) hue-rotate(99deg) brightness(87%) contrast(87%)',
        blackToPink:
          'invert(22%) sepia(50%) saturate(6075%) hue-rotate(323deg) brightness(99%) contrast(85%)',
      },
    },
  },
  plugins: [require('tailwindcss-filters')],
};
