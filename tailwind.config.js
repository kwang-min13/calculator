/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{html,js}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'primary': '#0d7ff2',
                'background-light': '#f5f7f8',
                'background-dark': '#101922',
            },
            fontFamily: {
                'display': ['Space Grotesk', 'sans-serif'],
                'body': ['Noto Sans', 'sans-serif'],
            },
            borderRadius: {
                'DEFAULT': '0.25rem',
                'lg': '0.5rem',
                'xl': '0.75rem',
                '2xl': '1rem',
                '3xl': '1.5rem',
                'full': '9999px'
            },
        },
    },
    plugins: [],
}
