import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Frozen / glacial tech palette
        void: "#050507", // noir profond
        abyss: "#0A0E14",
        glacier: {
          900: "#0E2235",
          700: "#1B3B5F",
          500: "#2E6A9E",
          300: "#4FA8D8",
          100: "#9FD4F0",
        },
        frost: "#E8F2F8", // blanc givré
        cyan: {
          glow: "#5FE3FF",
        },
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      fontSize: {
        // Fluid display sizes (clamp) for cinematic headings
        mega: ["clamp(3rem, 13vw, 13rem)", { lineHeight: "0.92", letterSpacing: "-0.04em" }],
        giant: ["clamp(2.25rem, 8vw, 7rem)", { lineHeight: "0.95", letterSpacing: "-0.035em" }],
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        shimmer: "shimmer 6s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
