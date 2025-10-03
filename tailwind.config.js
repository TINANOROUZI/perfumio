export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["ui-serif", "Georgia", "serif"],
        body: ["ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#0b0b0c",
        bone: "#f6f3ee",
        gold: "#e9c874",
      },
    },
  },
  plugins: [],
};
