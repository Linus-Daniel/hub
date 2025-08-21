module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0B1D3A",
        gold: "#F4B400",
        teal: "#1ABC9C",
        softgray: "#F7F7F7",
        danger: "#E74C3C"
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        sans: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: [],
}