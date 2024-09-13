
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        btn: "#4A1212",
        gold: "#DAA520",
        accent:'#556B2F'
      },
      screens: {
        '3xl': '1560px',
      },
    },
    fontFamily: {
      sans: ["Roboto Slab", "sans-serif"],
    },
  },
  plugins: [],
});