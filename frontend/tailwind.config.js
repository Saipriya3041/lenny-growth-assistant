export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#93c5fd",
          DEFAULT: "#3b82f6",
          dark: "#1e40af",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      theme: {
  extend: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      serif: ["Georgia", "serif"],
    },
    colors: {
      cream: "#f5f3ef",
      taupe: "#3b2f26",
    },
  },
},

    },
  },
  plugins: [],
};
