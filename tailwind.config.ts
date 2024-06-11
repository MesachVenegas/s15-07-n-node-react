import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#4ccc81",
        secondary: "#5d87a8",
        layout: "#f6f7fb",
        dark: "#172635",
        sky: "#40aaff",
        purple: "#8e35ff",
        red: "#eb5757",
        yellow: "#F2C94C"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        badge: "0 5px 10px rgba(0, 0, 0, 0.4)",
        card: "0 8px 5px rgba(0, 0, 0, 0.2)"
      },
      backgroundImage: {
        'logo': 'url("/assets/transparent-logo.svg"), linear-gradient(360deg, #f6f7fb 70%, #56da8a 100%)'
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
