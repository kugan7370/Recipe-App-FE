/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}", // Include all JS/JSX/TS/TSX files in the src folder
];
export const theme = {
  fontFamily: {
    poppins: ['Poppins', 'sans-serif'],
    'poppins-medium': ['Poppins-Medium', 'sans-serif'],
    'poppins-semibold': ['Poppins-SemiBold', 'sans-serif'],
    'poppins-bold': ['Poppins-Bold', 'sans-serif'],
  },
  extend: {},
};
export const plugins = [];
