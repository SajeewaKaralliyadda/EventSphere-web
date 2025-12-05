/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fff5f0",
          100: "#ffe8dc",
          200: "#ffd1b9",
          300: "#ffb896",
          400: "#ff9e73",
          500: "#ff6b35",
          600: "#ff5722",
          700: "#e64a19",
          800: "#d84315",
          900: "#bf360c",
        },
        secondary: {
          50: "#fce4ec",
          100: "#f8bbd0",
          200: "#f48fb1",
          300: "#f06292",
          400: "#ec407a",
          500: "#e91e63",
          600: "#d81b60",
          700: "#c2185b",
          800: "#ad1457",
          900: "#880e4f",
        },
        accent: {
          50: "#fffef5",
          100: "#fffde7",
          200: "#fff9c4",
          300: "#fff59d",
          400: "#fff176",
          500: "#ffd700",
          600: "#ffc107",
          700: "#ffb300",
          800: "#ffa000",
          900: "#ff8f00",
        },
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
        dark: {
          50: "#e8e9f0",
          100: "#c8cad9",
          200: "#a5a8c2",
          300: "#8286ab",
          400: "#686d9a",
          500: "#4e5489",
          600: "#474d81",
          700: "#3d4376",
          800: "#353a6c",
          900: "#2d3142",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.1)",
        "card-hover": "0 4px 16px rgba(0, 0, 0, 0.15)",
        nav: "0 2px 4px rgba(0, 0, 0, 0.08)",
      },
      borderRadius: {
        card: "12px",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
