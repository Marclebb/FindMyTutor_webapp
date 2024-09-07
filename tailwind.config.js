/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'im1':"url(./src/assets/tutor.jpg)",
        'im2':"url(./src/assets/backgound1.jpg)"
      }
    },
    
  },
  plugins: [
    function({ addBase }) {
      addBase({
        'input[type="number"]::-webkit-outer-spin-button': {
          '-webkit-appearance': 'none',
          margin: '0',
        },
        'input[type="number"]::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
          margin: '0',
        },
        'input[type="number"]': {
          '-moz-appearance': 'textfield',
        },
      });
    },
  ],
  
}

