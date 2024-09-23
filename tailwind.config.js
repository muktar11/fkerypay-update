/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}",
            "./LoginScreen.{js,jsx,ts,tsx}",
            "./SignupScreen.{js,jsx,ts,tsx}",
            "./screens-supervisor/**/*.{js,jsx,ts,tsx}",
            "./screens-agents/**/*.{js,jsx,ts,tsx}"
          
          ],
  theme: {
    extend: {},
  },
  plugins: [],
}

