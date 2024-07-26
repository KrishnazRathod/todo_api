/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        'dm-sans': ['DM Sans', 'sans-serif']
      },
      colors:{
        link:{
          1:"#FF9D98" ,
          2:"#CAECCC",
          3:"#191619"
        }
      }
    },
  },
  plugins: [],
}