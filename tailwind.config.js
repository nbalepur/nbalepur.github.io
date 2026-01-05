/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#A02040',
          50: '#fff1f2',
          100: '#ffe1e3',
          200: '#ffc7cc',
          300: '#ffa0a8',
          400: '#ff6b7a',
          500: '#ff3d51',
          600: '#e11d2e',
          700: '#c1121f',
          800: '#A02040', // Brighter maroon for text in light mode
          900: '#5c0017',
          950: '#33000c',
        },
        beige: {
          DEFAULT: '#B8956A', // More tan beige for text
          50: '#faf9f7',
          100: '#f5f3f0',
          200: '#eae5de',
          300: '#ddd4c7',
          400: '#d4c5a8',
          500: '#c4a574',
          600: '#B8956A', // More tan beige for text
          700: '#9b7d5a',
          800: '#7d6549',
          900: '#5f4f3c',
        },
      },
    },
  },
  plugins: [],
}

