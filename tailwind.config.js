/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f2f8f4',
          100: '#e1efe6',
          500: '#237346',
          700: '#154e2e',
          800: '#113e25',
          900: '#0f2e1e', // Primary Forest
          950: '#071b11',
        },
        herbal: {
          50: '#effcf2',
          100: '#d9f7e0',
          500: '#22c55e',
          600: '#16a34a', // Herbal Green CTA
          700: '#15803d',
        },
        terracotta: {
          50: '#fbf5f3',
          100: '#f5e9e5',
          500: '#c86d51', // Terracotta Earth
          600: '#b45a3f',
          700: '#954731',
        },
        cream: {
          50: '#ffffff',
          100: '#f9fbf9', // Alabaster Cream
          200: '#f1f5f2',
          300: '#e4ebe6',
        },
        charcoal: {
          800: '#1a221e',
          900: '#0c100e', // Dark Slate
          950: '#060807',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
