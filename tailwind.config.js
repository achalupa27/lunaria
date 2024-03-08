/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#060012',
                secondary: '#ffffff',
                'primary-dark': '#ffffff',
                'secondary-dark': '#060012',

                'primary-hover': '#189e51',
                'primary-dark-hover': '#18f074',

                'l-red': '#fca5a5',
                'l-dark-red': '#E00000',

                'l-green': '#99f5d1',
                'l-dark-green': '#08c279',

                'l-slate': '#E5F2FF',
                'l-dark-slate': '#DBE0EE',

                'l-blue': '#93c5fd',
                'l-dark-blue': '#579ae6',

                'l-yellow': '#f7ebc0',
                'l-dark-yellow': '#e8a700',
            },
        },
    },
    plugins: [],
};
