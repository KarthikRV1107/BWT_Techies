// import type { Config } from 'tailwindcss'
type Config = any

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(220 20% 4%)',
        foreground: 'hsl(0 0% 93%)',
        card: 'hsl(220 18% 7%)',
        accent: 'hsl(142 71% 45%)',
      },
      boxShadow: {
        glow: '0 0 40px hsl(142 71% 45% / 0.15)',
        card: '0 4px 24px hsl(0 0% 0% / 0.4)',
      },
    },
  },
  plugins: [],
} satisfies Config
