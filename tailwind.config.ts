import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Sora', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        background: '#070B12',
        foreground: '#FFFFFF',
        card: {
          DEFAULT: '#111827',
          foreground: '#FFFFFF',
        },
        popover: {
          DEFAULT: '#070B12',
          foreground: '#FFFFFF',
        },
        primary: {
          DEFAULT: '#10B981',
          foreground: '#070B12',
        },
        secondary: {
          DEFAULT: '#0E1525',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#1F2937',
          foreground: '#94A3B8',
        },
        accent: {
          DEFAULT: '#34D399',
          foreground: '#070B12',
        },
        destructive: {
          DEFAULT: '0 84.2% 60.2%',
          foreground: '0 0% 98%',
        },
        border: '#1F2937',
        input: '#1F2937',
        ring: '#10B981',
      },
      borderRadius: {
        lg: '1.25rem',
        md: '1rem',
        sm: '0.75rem',
      },
      boxShadow: {
        premium: '0 0 0 1px rgba(16, 185, 129, 0.05), 0 10px 40px rgba(0, 0, 0, 0.35)',
        neon: '0 0 20px rgba(16, 185, 129, 0.25)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;