/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'sans-serif']
      },
      colors: {
        // 'body-bg': '#171717',
        'body-bg': '#020203',
        teal: '#00FFD1',
        // gray: {
        //     50: '#171717;',
        //     100: '#f4f5f7',
        //     200: '#e5e7eb',
        //     300: '#d2d6dc',
        //     400: '#9fa6b2',
        //     500: '#6b7280',
        //     600: '#4b5563',
        //     700: '#374151',
        //     800: '#252f3f',
        //     900: '#161e2e'
        // }
      }
    },
    backgroundImage: {
      // eslint-disable-next-line quotes
      'mvx-white': "url('../multiversx-white.svg')"
    },

  },
  plugins: []
};
