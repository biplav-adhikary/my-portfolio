/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sky: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
        },
        cloud: {
          50: "#fffbeb",
          100: "#fefce8",
          200: "#fef9c3",
        },
        grass: {
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
        },
        sunset: {
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fdba74",
        },
        earth: {
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
        accent: ['"Caveat"', "cursive"],
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-slower": "float 12s ease-in-out infinite",
        "drift-right": "drift-right 25s linear infinite",
        "drift-left": "drift-left 30s linear infinite",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        sway: "sway 4s ease-in-out infinite",
        "seed-1": "seed-float 10s ease-in-out infinite",
        "seed-2": "seed-float 12s ease-in-out 2s infinite",
        "seed-3": "seed-float 9s ease-in-out 4s infinite",
        "seed-4": "seed-float 14s ease-in-out 1s infinite",
        "seed-5": "seed-float 11s ease-in-out 3s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "drift-right": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100vw)" },
        },
        "drift-left": {
          "0%": { transform: "translateX(100vw)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        "seed-float": {
          "0%": { opacity: "0", transform: "translateY(0) translateX(0)" },
          "15%": { opacity: "0.5" },
          "50%": {
            opacity: "0.4",
            transform: "translateY(-60px) translateX(20px)",
          },
          "85%": { opacity: "0.15" },
          "100%": {
            opacity: "0",
            transform: "translateY(-100px) translateX(-10px)",
          },
        },
      },
    },
  },
  plugins: [],
};
