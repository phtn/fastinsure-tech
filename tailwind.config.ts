import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        inter: ["var(--font-inter)"],
      },
      animation: {
        enter: "enter 0.275s ease-out normal both",
        back: "back 0.25s ease-out normal both",
        shimmer: "shimmer 5s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
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
      },
      transitionDuration: {
        "2000": "2000ms",
        "3000": "3000ms",
        "4000": "4000ms",
        "5000": "5000ms",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            default: "#FFFFFF",
            background: "#FFFFFF",
            foreground: "#1e1e1e",
            primary: {
              100: "#F5F9FD",
              200: "#EBF3FC",
              300: "#DEE9F8",
              400: "#D2DEF1",
              500: "#0e7490",
              600: "#8C9EC7",
              700: "#6074A7",
              800: "#3D4F86",
              900: "#24346F",
              foreground: "#FFFFFF",
              DEFAULT: "#001744",
            },
            secondary: {
              100: "#FDFEFE",
              200: "#FCFDFE",
              300: "#FAFCFE",
              400: "#F8FBFD",
              500: "#F6F9FC",
              600: "#B3C4D8",
              700: "#7B92B5",
              800: "#4E6692",
              900: "#2F4578",
              foreground: "#001744",
              DEFAULT: "#CEE1F1",
            },
          },
        },
        dark: {
          colors: {
            background: "#18181b",
            foreground: "#f4f4f5",
            primary: {
              100: "#F5F9FD",
              200: "#EBF3FC",
              300: "#DEE9F8",
              400: "#D2DEF1",
              500: "#C0CEE8",
              600: "#8C9EC7",
              700: "#6074A7",
              800: "#3D4F86",
              900: "#24346F",
              foreground: "#1e1e1e",
              DEFAULT: "#DEE9F8",
            },
          },
        },
      },
    }),
  ],
} satisfies Config;
