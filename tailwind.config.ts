import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ios: {
          blue: '#007AFF',
          purple: '#AF52DE',
          pink: '#FF2D55',
          orange: '#FF9500',
          teal: '#5AC8FA',
          gray: '#8E8E93',
          lightgray: '#F2F2F7',
        }
      },
      fontFamily: {
        'sf': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
export default config
