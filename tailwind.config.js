/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'below-xl': { max: '1280px' }, // sm 이하의 화면 크기를 의미
      },
    },
  },
  plugins: [],
};
