
module.exports = {
  darkMode: 'class', // Enable dark mode with 'class'
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        'btn-padding-x': '1rem', // Horizontal padding
        'btn-padding-y': '0.5rem', // Vertical padding
      },
      borderRadius: {
        'btn': '0.375rem', // Customize border radius as needed
      },
      colors: {
        primary: '#4F46E5', // Example primary color
        secondary: '#6B7280', // Example secondary color
        danger: '#EF4444', // Example danger color
        success: '#22C55E', // Example success color
      },
    },
  },
  plugins: [],
}
