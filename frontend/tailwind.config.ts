import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        header: ["var(--font-header)"],
        normal: ["var(--font-normal)"],
      },
      colors: {
        background: "#EBEBEB", // Main background color
        foreground: "#C0C0C0", // Section background color
        primary: "#F7931A", // Bitcoin color - use for important elements (buttons, etc)
        secondary: "#4A90E2", // Soft blue - use for card background, etc
        tertiary: "#2C578A", // Deep blue - use for border
      },
    },
  },
  plugins: [],
} satisfies Config;
