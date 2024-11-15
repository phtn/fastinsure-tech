import { type Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
import tw3d from "tailwindcss-3d";

export default {
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        inter: ["var(--font-inter)"],
        jet: ["var(--font-jet)"],
        inst: ["var(--font-inst)"],
      },
      animation: {
        enter: "enter 0.275s ease-out normal both",
        back: "back 0.25s ease-out normal both",
        shimmer: "shimmer 5s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        grid: "grid 35s linear infinite",
        ripple: "ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite",
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
        back: {
          "0%": {
            opacity: "0",
            transform: "translateZ(0) scale(1.05)",
          },
          "60%": {
            opacity: "0.75",
            transform: "translateZ(0) scale(1.025)",
            backfaceVisibility: "hidden",
            webkitFontSmoothing: "antialiased",
          },
          "100%": {
            opacity: "1",
            transform: "translateZ(0) scale(1)",
          },
        },
        enter: {
          "0%": {
            opacity: "0",
            transform: "translateZ(0) scale(0.95)",
          },
          "60%": {
            opacity: "0.75",
            transform: "translateZ(0) scale(1.02)",
            backfaceVisibility: "hidden",
            webkitFontSmoothing: "antialiased",
          },
          "100%": {
            opacity: "1",
            transform: "translateZ(0) scale(1)",
          },
        },
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
        skate: {
          from: {
            transform: "translateX(-2rem)",
          },
          to: {
            transform: "translateX(0)",
          },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
        ripple: {
          "0%, 100%": {
            transform: "translate(-50%, -50%) scale(1)",
          },
          "50%": {
            transform: "translate(-50%, -50%) scale(0.9)",
          },
        },
      },
      transitionDuration: {
        "2000": "2000ms",
        "3000": "3000ms",
        "4000": "4000ms",
        "5000": "5000ms",
      },
      boxShadow: {
        "i-tl-lg": "inset 15px 30px 60px -25px rgba(125, 125, 125, 0.15)",
        "i-br-lg": "inset -10px -30px 60px -10px rgba(125, 125, 125, 0.15)",
        // Case light
        "i-br-li": "inset -15px -30px 40px -30px rgba(203, 213, 225, 0.35)",
        "i-tl-li-hv": "inset 20px 20px 60px -30px rgba(100, 116, 139, 0.20)",
        // Case dark
        "i-br-dk": "inset -15px -30px 40px -30px rgba(255, 255, 255, 0.50)",
        "i-tl-dk-hv": "inset 25px 15px 60px -30px rgba(225, 225, 225, 0.8)",
        // Light
        "i-tl-li": "inset 20px 20px 40px -30px rgba(125, 125, 125, 0.15)",
        "i-br-li-hv": "inset -20px -20px 40px -30px rgba(125, 125, 125, 0.20)",
        // Dark
        "i-tl-dk": "inset 20px 20px 40px -30px rgba(255, 255, 255, 0.85)",
        "i-br-dk-hv": "inset -20px -20px 40px -30px rgba(255, 255, 255, 0.70)",
        // Meter
        "i-br-md-m": "inset -15px -30px 40px -20px rgba(175, 175, 175, 0.8)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    tw3d({}),
    nextui({
      themes: {
        light: {
          colors: {
            default: "#FAFAFA",
            background: "#FAFAFA",
            foreground: "#1B1F22",
            primary: {
              DEFAULT: "#1B1F22",
              foreground: "#FAFAFA",
              50: "#FAFAFA",
              100: "#E1E2E2",
              200: "#C8C9CA",
              300: "#B0B1B2",
              400: "#97999A",
              500: "#7E8082",
              600: "#65686A",
              700: "#4D5052",
              800: "#34373A",
              900: "#1B1F22",
            },
            secondary: {
              DEFAULT: "#59B5CA",
              foreground: "#FAFAFA",
              50: "#59B5CA",
              100: "#53ACC0",
              200: "#4DA2B6",
              300: "#4799AB",
              400: "#418FA1",
              500: "#3B8697",
              600: "#357C8D",
              700: "#2F7382",
              800: "#296978",
              900: "#23606E",
            },
          },
        },
        dark: {
          colors: {
            background: "#1B1F22",
            foreground: "#FAFAFA",
            primary: {
              DEFAULT: "#FAFAFA",
              foreground: "#1B1F22",
              50: "#1B1F22",
              100: "#34373A",
              200: "#4D5052",
              300: "#65686A",
              400: "#7E8082",
              500: "#97999A",
              600: "#B0B1B2",
              700: "#C8C9CA",
              800: "#E1E2E2",
              900: "#FAFAFA",
            },
            secondary: {
              DEFAULT: "#59B5CA",
              foreground: "#FAFAFA",
              50: "#23606E",
              100: "#296978",
              200: "#2F7382",
              300: "#357C8D",
              400: "#3B8697",
              500: "#418FA1",
              600: "#4799AB",
              700: "#4DA2B6",
              800: "#53ACC0",
              900: "#59B5CA",
            },
          },
        },
      },
    }),
  ],
} satisfies Config;
