const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  // theme: false,
  theme: {
    extend: {
      colors: {
        darkbg: "#101217", 
        darkfg: "#1E2025",
        darkufg: "#15171C",
        lightgray: "#E1E1E1",
        darkgray: "#B0B3B8",
        lightbg: "#F9FAFB",
        lightfg: "#FFFFFF",


      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

