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
      'cupcake',
      'synthwave',
      'retro',
      'valentine',
      'halloween',
      'lofi',
      'wireframe',
      'luxury',
      'dracula',
      'night',
      'winter',
    ],
  },
  plugins: [daisyui],
};
