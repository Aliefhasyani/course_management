module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.7s ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-animate'),
    require('daisyui'), // tambahkan daisyUI di sini
  ],
  daisyui: {
    themes: [
      "light", "cupcake", "corporate", "emerald", "synthwave", "retro", "cyberpunk", "valentine", "aqua", "pastel", "fantasy", "wireframe", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"
    ],
    darkTheme: "night",
  },
}