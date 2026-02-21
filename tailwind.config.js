/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'veilstack': ['UnifixSP', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee var(--duration) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
        'scroll': 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        marquee: {
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-vertical': {
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
        scroll: {
          to: { transform: 'translate(calc(-50% - 0.5rem))' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      maxHeight: {
        '96': '24rem',
      },
    },
  },
  plugins: [],
};
