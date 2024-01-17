/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      scale: ['hover'],
      colors: {
        primary: '#F7F7F7',
        secondary: '#080808',
        background: '#F4F4F4',
        divider: '#BABABA',
        gold: '#F1B56F',
      },
      fontFamily: {
        title: ['Nolan'],
        base: ['Roboto'],
      },
      animation: {
        float1: 'float 3.5s ease-in infinite',
        float2: 'float 5s ease-out infinite',
        float3: 'float 10s ease-in-out infinite',
        float4: 'float 3s ease-in-out infinite',
        float5: 'float 7s linear infinite',
      },
      keyframes: {
        expand: {
          '0%, 100%': {
            transform: 'scale(0.5)',
          },
          '50%': {
            transform: 'scale(1)',
          },
        },
        float: {
          '0%': {
            transform: 'translatey(0px)',
          },
          '50%': {
            transform: 'translatey(-50px)',
          },
          '100%': {
            transform: 'translatey(0px)',
          },
        },
      },
    },
  },
  plugins: [],
};
