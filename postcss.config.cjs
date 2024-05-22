module.exports = {
  plugins: {
    'postcss-import': {}, // helps importing/nesting css files
    'tailwindcss/nesting': {}, // helps nesting css syntax IN .css files - !!! must be imported before tailwindcss
    tailwindcss: {},
    autoprefixer: {},
  },
};
