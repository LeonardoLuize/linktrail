/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#a78bfa",
          secondary: "#ddd6fe",
          accent: "#bef264",
          neutral: "#4b5563",
          "base-100": "#1d232a",
          info: "#bae6fd",
          success: "#86efac",
          warning: "#fcd34d",
          error: "#ef4444",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
