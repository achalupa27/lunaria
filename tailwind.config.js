/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './features/**/*.{js,ts,jsx,tsx}'],
    darkMode: ['class'],
    theme: {
        extend: {
            colors: {
                primary: '#000000',
                secondary: '#ffffff',
                'primary-dark': '#ffffff',
                'secondary-dark': '#000000',
                'primary-hover': '#189e51',
                'primary-dark-hover': '#18f074',
                'l-red': '#fca5a5',
                'l-dark-red': '#E00000',
                'l-green': '#99f5d1',
                'l-dark-green': '#08ff9e',
                'l-slate': '#E5F2FF',
                'l-dark-slate': '#DBE0EE',
                'l-blue': '#93c5fd',
                'l-dark-blue': '#00eaff',
                'l-yellow': '#f7ebc0',
                'l-dark-yellow': '#fffb00',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
        },
    },
    plugins: [require('tailwind-scrollbar')({ nocompatible: true }), require('tailwindcss-animate')],
};
