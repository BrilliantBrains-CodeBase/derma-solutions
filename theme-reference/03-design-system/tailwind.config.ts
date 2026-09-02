import type { Config } from 'tailwindcss'

/** Tailwind v3 fallback. Prefer tokens.css (@theme) on Tailwind v4 + Vite. */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx,vue,svelte}'],
  theme: {
    extend: {
      colors: {
        primary:   '#481E0B',
        secondary: '#FCF4F1',
        accent:    '#CD5F37',
        body:      '#69615D',
        divider:   '#CD5F371A',
        'divider-dark': '#FFFFFF1A',
      },
      fontFamily: {
        display: ['Marcellus', 'ui-serif', 'Georgia', 'serif'],
        sans:    ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: { pill: '100px', field: '40px', card: '20px' },
    },
  },
  plugins: [],
} satisfies Config
