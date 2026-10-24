import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./*.html",
  ],
  theme: {
    extend: {
      colors: {
        club: {
          blue: "#0a1f44",
          "blue-mid": "#2b4c7e",
          "blue-light": "#e2e8f0",
          red: "#cc0000",
          "red-bright": "#ff1a1a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
