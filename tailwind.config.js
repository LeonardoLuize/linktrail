/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0e1571",
          secondary: "#f1e8fc",
          accent: "#0b0317",
          neutral: "#fafafa",
          "base-100": "#ffffff",
          info: "#0891b2",
          success: "#10b981",
          warning: "#fbbf24",
          error: "#b91c1c",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
