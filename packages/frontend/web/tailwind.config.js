/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,tsx}'],
  safelist: [
    'md:ps-2.5',
    'md:pe-2.5',
    'lg:ps-2.5',
    'lg:pe-2.5',
    'order-1',
    'order-2',
    'order-3',
    'order-4',
    'order-5',
    'order-6',
    'md:order-1',
    'md:order-2',
    'md:order-3',
    'md:order-4',
    'md:order-5',
    'md:order-6',
    'lg:order-1',
    'lg:order-2',
    'lg:order-3',
    'lg:order-4',
    'lg:order-5',
    'lg:order-6',
    'lg:right-[15%]',
    'lg:right-[8%]',
    'lg:right-[4%]',
    'lg:right-[0%]',
    'md:right-[16%]',
    'md:right-[10%]',
    'md:right-[5%]',
    'md:right-[0%]',
    'lg:w-[130%]',
    'lg:w-[110%]',
    'lg:w-[108%]',
    'lg:w-[104%]',
    'lg:w-[103%]',
    'md:w-[116%]',
    'md:w-[110%]',
    'md:w-[105%]',
    'lg:clip-path-polygon-purple-lg',
    'lg:clip-path-polygon-yellow-lg',
    'lg:clip-path-polygon-green-lg',
    'lg:clip-path-polygon-blue-lg',
    'lg:clip-path-polygon-orange-lg',
    'lg:clip-path-polygon-pink-lg',
    'md:clip-path-polygon-purple-md',
    'md:clip-path-polygon-yellow-md',
    'md:clip-path-polygon-green-md',
    'md:clip-path-polygon-blue-md',
    'md:clip-path-polygon-orange-md',
    'md:clip-path-polygon-pink-md',
    'bg-dark-purple',
    'bg-dark-blue',
    'bg-dark-green',
    'bg-dark-yellow',
    'bg-dark-orange',
    'bg-dark-pink',
    'filter-black-to-purple',
    'filter-black-to-blue',
    'filter-black-to-green',
    'filter-black-to-pink',
    'filter-black-to-yellow',
    'filter-black-to-orange',
    "bg-[url('form-cocktail/bubble/bubble-1.png')]",
    "bg-[url('form-cocktail/bubble/bubble-2.png')]",
    "bg-[url('form-cocktail/bubble/bubble-3.png')]",
    "bg-[url('form-cocktail/bubble/bubble-4.png')]",
    "bg-[url('form-cocktail/bubble/bubble-5.png')]",
    "bg-[url('form-cocktail/bubble/bubble-6.png')]",
  ],
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
        'black-to-purple':
          'invert(17%) sepia(91%) saturate(5311%) hue-rotate(288deg) brightness(94%) contrast(93%)',
        'black-to-yellow':
          'invert(91%) sepia(83%) saturate(6947%) hue-rotate(323deg) brightness(111%) contrast(98%)',
        'black-to-blue':
          'invert(56%) sepia(91%) saturate(1079%) hue-rotate(140deg) brightness(104%) contrast(92%)',
        'black-to-orange':
          'invert(74%) sepia(41%) saturate(4587%) hue-rotate(332deg) brightness(101%) contrast(92%)',
        'black-to-green':
          'invert(75%) sepia(81%) saturate(317%) hue-rotate(99deg) brightness(87%) contrast(87%)',
        'black-to-pink':
          'invert(22%) sepia(50%) saturate(6075%) hue-rotate(323deg) brightness(99%) contrast(85%)',
      },
    },
  },
  plugins: [require('tailwindcss-filters')],
};
