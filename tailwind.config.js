/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#11152f'
      },
      boxShadow: {
        widget: '0 10px 40px rgba(15, 23, 42, 0.18)'
      }
    }
  },
  plugins: []
}
