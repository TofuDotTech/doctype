import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        nunito: 'var(--font-nunito)',
      },
      colors:{
        'graysecondary':'#F0F0F2',
        'primary':'#1C4D8C',
        'textgray':'#7A7979',
        'background':'#F8F8F8',
        'greendiagnosis':'#4D9A5E'
      }
    },
  },
  plugins: [],
}
export default config
