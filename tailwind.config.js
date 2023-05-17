module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#6699CC",
        "weather-secondary": "#336699",
      },
    },
    fontFamily: {
      Open_Sans: ["Open Sans, sans-serif"],
    },
    container: {
      padding: "3rem",
      center: true,
    },
    screens: {
      sm: "640px",
      md: "768px",
    },
  },
  plugins: [],
};
