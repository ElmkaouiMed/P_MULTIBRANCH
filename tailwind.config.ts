import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#eef0f4",
          100: "#d5d9e3",
          200: "#b3bacd",
          300: "#8995ae",
          400: "#65738f",
          500: "#4c5974",
          600: "#3d4860",
          700: "#333c50",
          800: "#2d3445",
          900: "#1b202d",
          950: "#0e121b",
        },
        gold: {
          50: "#fef6f3",
          100: "#fde8df",
          200: "#fad0bf",
          300: "#f6af94",
          400: "#f08a66",
          500: "#eb6e4a",
          600: "#d85430",
          700: "#b44324",
          800: "#8f391f",
          900: "#75331d",
          950: "#3f170b",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "var(--font-arabic)", "Georgia", "serif"],
        body: ["var(--font-body)", "var(--font-arabic)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.7s ease-out forwards",
        "slide-up": "slideUp 0.7s ease-out forwards",
        "slide-down": "slideDown 0.3s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "grain": "grain 8s steps(10) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        grain: {
          "0%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -5%)" },
          "20%": { transform: "translate(-10%, 0)" },
          "30%": { transform: "translate(0, -10%)" },
          "40%": { transform: "translate(-5%, 5%)" },
          "50%": { transform: "translate(-10%, 0)" },
          "60%": { transform: "translate(5%, 5%)" },
          "70%": { transform: "translate(0, 10%)" },
          "80%": { transform: "translate(-5%, -5%)" },
          "90%": { transform: "translate(10%, 5%)" },
          "100%": { transform: "translate(0, 0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
