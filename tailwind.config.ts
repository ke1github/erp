import type { Config } from 'tailwindcss';
import formsPlugin from '@tailwindcss/forms';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './context/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // Blue
        accent: '#10B981', // Green
        background: '#F3F4F6', // Light Gray
        textPrimary: '#111827', // Dark Charcoal
        textSecondary: '#6B7280', // Cool Gray
        buttonPrimary: '#6D28D9', // Royal Purple
        borderGray: '#E5E7EB', // Light Cool Gray
      },
    },
  },
  plugins: [formsPlugin],
};

export default config;
