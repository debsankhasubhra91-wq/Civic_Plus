/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#16a34a',
          600: '#15803d',
          700: '#166534',
        },
        civic: {
          road: '#ea580c',      // Vibrant road/orange
          roadLight: '#fff7ed',
          waste: '#059669',     // Eco waste/emerald
          wasteLight: '#ecfdf5',
          critical: '#e11d48',  // Critical/rose
          criticalLight: '#fff1f2',
          progress: '#2563eb',  // In Progress/blue
          progressLight: '#eff6ff',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        'premium': '0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 4px 10px -2px rgba(0, 0, 0, 0.02)',
        'card': '0 0 0 1px rgba(226, 232, 240, 0.8), 0 2px 8px -2px rgba(15, 23, 42, 0.06)',
        'card-hover': '0 0 0 1px rgba(203, 213, 225, 1), 0 12px 24px -4px rgba(15, 23, 42, 0.1)',
        'float': '0 20px 40px -15px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
