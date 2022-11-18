/* eslint-disable import/no-extraneous-dependencies */
const daisyui = require('daisyui');
const themeLight = require('daisyui/src/colors/themes')['[data-theme=light]'];

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          ...themeLight,
          primary: '#5273E8',
          secondary: '#61DAFF',
          accent: '#FFD640',
          'base-300': '#F5F1EF',
          error: '#F96154',
        },
      },
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
