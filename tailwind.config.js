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

                'ms-blue': '#36A2EB',
                'ms-blue-hover': '#1a8edc',
                'ms-blue-dark-hover': '#63b6ee',
            },
        },
    },
    plugins: [],
};
