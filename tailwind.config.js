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
        'im2':"url(./src/assets/background1.jpg)"
      }
    },
    
  },
 
  
}

