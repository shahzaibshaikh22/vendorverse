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
        darkbg: "#18191A", 
        darkfg: "#242526",
        darkufg: "#3A3B3C",
        lightgray: "#E4E6EB",
        darkgray: "#B0B3B8",
        lightbg: "#F0F2F5",
        lightfg: "#FFFFFF",


      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

