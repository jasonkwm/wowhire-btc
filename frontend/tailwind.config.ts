import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EBEBEB", // Main background color
        secondary: "#C0C0C0", // Section background color
        accent: "#F7931A", // Bitcoin color - use for important elements (buttons, etc)
        contrast: "#4A90E2", // Soft blue - use for card background, etc
        tertiary: "#2C578A", // Deep blue - use for border
      },
    },
  },
  plugins: [],
} satisfies Config;
