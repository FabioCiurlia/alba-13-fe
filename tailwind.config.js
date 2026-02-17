/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                gopron: ['var(--font-gopron)'],
                krosur: ['var(--font-krosur)'],
            },
        },
    },
    safelist: [
        {
            pattern: /(bg|text|border)-(cyan|yellow|slate)-(50|100|300|400|600|900)/,
            variants: ['hover', 'group-hover'],
        },
    ],
    plugins: [],
}
