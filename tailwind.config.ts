import type { Config } from 'tailwindcss'
const withMT = require('@material-tailwind/react/utils/withMT')
const colors = require('@mui/material/colors')

const config: Config = withMT({
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        ...colors
      }
    }
  },
  plugins: []
})
export default config
