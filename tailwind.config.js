/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nord: {
          0: '#2E3440',   // Primary dark
          1: '#3B4252',   // Surface
          2: '#434C5E',   // Elevated surface
          3: '#4C566A',   // Secondary
          4: '#D8DEE9',   // Light gray
          5: '#E5E9F0',   // Lighter gray
          6: '#ECEFF4',   // Lightest
          7: '#8FBCBB',   // Frost teal
          8: '#88C0D0',   // Arctic blue
          9: '#81A1C1',   // Info blue
          10: '#5E81AC',  // Dark blue
          11: '#BF616A',  // Error red
          12: '#D08770',  // Orange
          13: '#EBCB8B',  // Warning yellow
          14: '#A3BE8C',  // Success green
          15: '#B48EAD'   // Purple
        }
      },
      fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Merriweather', 'Georgia', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 150ms ease-out forwards',
        'slide-in-left': 'slideInLeft 200ms ease-out forwards',
        'slide-in-right': 'slideInRight 200ms ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        }
      }
    },
  },
  plugins: [],
}