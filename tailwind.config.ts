import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#bae0fd",
          300: "#7cc8fb",
          400: "#36adf7",
          500: "#0c93e8",
          600: "#0074c6",
          700: "#015da1",
          800: "#064f85",
          900: "#0b426e",
          950: "#072a49",
        },
        aurora: {
          green: "#78D64B",
          dark: "#1a1d23",
          darker: "#12141a",
          card: "#1e2128",
          border: "#2a2d35",
          text: "#9ca3af",
          accent: "#a78bfa",
        },
        solana: {
          purple: "#9945FF",
          green: "#14F195",
          gradient: "linear-gradient(135deg, #9945FF 0%, #14F195 100%)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient":
          "linear-gradient(135deg, #0b0d15 0%, #1a1040 40%, #0f2847 70%, #0b0d15 100%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(153, 69, 255, 0.1) 0%, rgba(20, 241, 149, 0.05) 100%)",
        "solana-gradient":
          "linear-gradient(135deg, #9945FF 0%, #14F195 100%)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(153, 69, 255, 0.3), 0 0 10px rgba(153, 69, 255, 0.1)" },
          "100%": { boxShadow: "0 0 20px rgba(153, 69, 255, 0.5), 0 0 40px rgba(20, 241, 149, 0.2)" },
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;

