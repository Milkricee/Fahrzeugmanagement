/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./assets/**/*.{css,scss}"  // Achte darauf, dass der Pfad zu allen relevanten CSS/SCSS-Dateien hier steht
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}