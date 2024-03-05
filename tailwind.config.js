/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Chivo", "sans-serif"], // Set Montserrat as the default sans-serif font
      },
      fontWeight: {
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      fontSize: {
        xxxs: "0.6rem",
        xxs: "0.62rem",
        l: "0.93rem",
        sxl: "1.13rem",
        s2xl: "1.35rem",
      },
      colors: {
        footer: "#13294b",
        merchbg: "#dcdcdc",
      },
    },
  },
  plugins: [],
};
