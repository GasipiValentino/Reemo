/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#4FD8DF',  
          800: '#66DEE5',
          700: '#7DE4EB',
          600: '#95EAF1',
          500: '#ADEFF6',
          400: '#C4F5FC',
          300: '#DBFAFF',
          200: '#E1FCFF',
          100: '#E8FEFF',
        },
        secondary: {
          900: '#010440',  
          800: '#2A2C66',
          700: '#54548B',
          600: '#7D7DB1',
          500: '#A6A6D6',
          400: '#CFCFEA',
          300: '#D9D9F1',
          200: '#E3E3F7',
          100: '#ECECFD',
        },
        accent: {
          900: '#ECD6AF',  
          800: '#EDDDBB',
          700: '#EEE3C7',
          600: '#EFE9D3',
          500: '#F0EFDF',
          400: '#F3F2E5',
          300: '#F5F4EB',
          200: '#F7F7F0',
          100: '#FAF9F6',
        },
        darkBlue: {
          900: '#0A081D',  
          800: '#27253C',
          700: '#44425A',
          600: '#605E79',
          500: '#7D7B98',
          400: '#9997B6',
          300: '#B5B3D4',
          200: '#D1D0E1',
          100: '#ECECF8',
        },
      }
    },
  },
  plugins: [],
}