import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing: {
        15: "60px",
        17: "68px",
        18: "72px",
        19: "76px",
        22: "88px",
        25: "100px",
        26: "104px",
        30: "120px",
        50: "200px",
        70: "280px",
        75: "300px",
        80: "320px",
        84: "336px",
        88: "352px",
        90: "360px",
        100: "400px",
        104: "416px",
        108: "432px",
        112: "448px",
        116: "464px",
        120: "480px",
        125: "500px",
        130: "520px",
        140: "560px",
        150: "600px",
        160: "640px",
        170: "680px",
        180: "720px",
        190: "760px",
        200: "800px",
      },
      colors: {
        zinc: {
          750: "#2e2e32",
          850: "#1c1c1e",
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-debug-screens"),
    require("tailwind-scrollbar"),
  ],
};
export default config;
