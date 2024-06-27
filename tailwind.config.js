/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Chivo", "sans-serif"], // Set Montserrat as the default sans-serif font
      },
      fontWeight: {
        extralight: "200",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      fontSize: {
        xxxs: "0.6rem",
        xxs: "0.62rem",
        sl: "0.9rem",
        l: "0.93rem",
        ssxl: "1.07rem",
        sxl: "1.13rem",
        s2xl: "1.35rem",
      },
      colors: {
        footer: "#13294b",
        groundBase: "#fafafa",
        red: "#8c0305",
        lightGray: "#f5f5f7",
      },
      variants: {
        extend: {
          borderWidth: ["hover", "focus"],
        },
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 1rem))",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-out forwards",
        scroll: "scroll var(--animation-duration) linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
