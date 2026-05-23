import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: { '2xl': '1320px' },
    },
    extend: {
      colors: {
        black: '#000000',
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['var(--font-rubik)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
