/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        forest: "#2a3128",
        "forest-dark": "#1f241e",
        "warm-white": "#f8f9f7",
        charcoal: "#1a1a1a",
        "mid-gray": "#6b6b6b",
        "light-gray": "#e8e8e8",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        serif: ["var(--font-serif)", "Instrument Serif", "serif"],
      },
      borderRadius: {
        none: "0px",
        sm: "4px",
        DEFAULT: "4px",
        md: "4px",
        lg: "4px",
        xl: "4px",
        "2xl": "4px",
      },
      maxWidth: {
        container: "1200px",
        "container-wide": "1400px",
        prose: "800px",
      },
      boxShadow: {
        subtle: "0 15px 45px rgba(0,0,0,0.08)",
      },
      transitionTimingFunction: {
        "standard": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      spacing: {
        18: "4.5rem",
      },
    },
  },
  plugins: [],
};
