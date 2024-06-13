import type { Config } from "tailwindcss";

const config: Config = {
  content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        skin: {
          fill: 'var(--color-fill)',
          'screen-fill': 'var(--color-screen-fill)',
          'content-fill': 'var(--color-content-fill)'
        },
        theme: {
          blue: '#83BDF3',
          pink: '#FF69B4',
          green: '#33B86C',
          yellow: '#FF8C00'
        }
      },
      colors: {
        // skin: {
        //   'hei': 'red'
        // }
      },
      spacing: {
        // '7px': '78px'
      },
    },
  },
  plugins: [],
};
export default config;
