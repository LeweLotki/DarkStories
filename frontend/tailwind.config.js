module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        bounceSequential: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        zoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.5)" },
        },
      },
      animation: {
        bounce1: "bounceSequential 1.2s infinite",
        bounce2: "bounceSequential 1.2s infinite 0.4s",
        bounce3: "bounceSequential 1.2s infinite 0.8s",
        zoom: "zoom 1.5s ease-in-out forwards", // Smooth zoom-in animation
      },
    },
  },
  plugins: [],
};
