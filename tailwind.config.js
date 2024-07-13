/** @type {import('tailwindcss').Config} */

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    extend: {
      keyframes: {
        "progress-linear": {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(40%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "progress-linear": "progress-linear 1s linear infinite",
      },
    },
  },
  plugins: [],
};
