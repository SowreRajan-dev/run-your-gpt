/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
      },
    },
  },
  // eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
