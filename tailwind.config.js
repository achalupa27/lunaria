/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#15803d',
                'primary-hover': '#189e51',
                secondary: '#ffffff',
                'primary-dark': '#27dc74',
                'primary-dark-hover': '#18f074',
                'secondary-dark': '#27272a',

                'ms-blue': '#36A2EB',
            },
        },
    },
    plugins: [],
};
