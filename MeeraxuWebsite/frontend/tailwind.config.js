export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Bricolage Grotesque', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        editorial: ['Instrument Serif', 'serif'],
      },
      colors: {
        purple: {
          primary: "#8B5CF6",
          dark: "#6D28D9",
          light: "#C4B5FD",
        },
      },
    },
  },
  plugins: [],
}
