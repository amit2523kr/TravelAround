/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        body: ['"DM Sans"', "system-ui", "sans-serif"]
      },
      colors: {
        luxury: {
          navy: "#0b1220",
          panel: "#131d30",
          contact: "#1a2438",
          ink: "#06090f",
          gold: "#c9a84c"
        },
        primary: {
          DEFAULT: "#0F766E",
          dark: "#0D5F59"
        },
        accent: {
          DEFAULT: "#38BDF8"
        }
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem"
      }
    }
  },
  plugins: []
};

