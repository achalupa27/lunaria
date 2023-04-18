/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#7e00ff',
                secondary: '#f5f5f4',
                'primary-dark': '#e7e5e4',
                'secondary-dark': '#2e1065',
            },
        },
    },
    plugins: [],
};
