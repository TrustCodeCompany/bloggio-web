// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   darkMode: 'class',
//   theme: {
//     extend: {
//       fontFamily: {
//         nunito: ["'Nunito Sans', sans-serif"],
//         Oswald: ["'Oswald', sans-serif"]
//       },
//       colors: {
//         secondary: '#0ea5e9'
//       }
//     }
//   },
//   plugins: []
// }
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Esto habilita el modo oscuro basado en clases
  theme: {
    extend: {
      fontFamily: {
        nunito: ["'Nunito Sans', sans-serif"],
        oswald: ["'Oswald', sans-serif"]
      },
      colors: {
        // Colores para el modo claro
        primary: '#ffffff',
        secondary: '#0ea5e9',
        accent: '#f4f4f5',
        // textColor: '#333333',
        textColor: '#121212',
        bgColor: '#f8f9fa',

        // Colores para el modo oscuro
        dark: {
          primary: '#18181b',
          secondary: '#2563eb',
          // accent: '#1f2937',
          accent: '#00BCD4',
          // textColor: '#d1d5db',
          textColor: '#CFD8DC',
          // bgColor: '#121212'
          bgColor: '#011627'
        }
      }
    }
  },
  plugins: []
}
