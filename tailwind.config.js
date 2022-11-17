// eslint-disable-next-line import/no-extraneous-dependencies
const daisyui = require('daisyui');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      'light',
      'dark',
      'synthwave',
      'retro',
      'valentine',
      'luxury',
      'dracula',
      'night',
    ],
  },
  plugins: [daisyui],
};
