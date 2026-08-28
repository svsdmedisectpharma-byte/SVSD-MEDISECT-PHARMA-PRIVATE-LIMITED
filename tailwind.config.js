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
          blue: '#0E5284',
          blueLight: '#1A6BA8',
          bluePale: '#E8F1F8',
          blueMid: '#3B82B8',
          green: '#0F753A',
          greenLight: '#1A9B4D',
          greenPale: '#E8F5EE',
          greenMid: '#28A45A',
          slate: '#F0F4F8',
          slateDeep: '#E2E8F0',
          text: '#1E3A52',
          textMuted: '#5A7A91',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', '"Plus Jakarta Sans"', 'sans-serif']
      },
      boxShadow: {
        'glass': '0 4px 24px -4px rgba(14, 82, 132, 0.08), 0 1px 4px rgba(14, 82, 132, 0.04)',
        'glass-hover': '0 20px 40px -8px rgba(14, 82, 132, 0.15), 0 4px 12px rgba(14, 82, 132, 0.08)',
        'glass-green': '0 0 0 2px rgba(15, 117, 58, 0.3), 0 20px 40px -8px rgba(15, 117, 58, 0.12)',
        'glass-blue': '0 0 0 2px rgba(14, 82, 132, 0.25), 0 20px 40px -8px rgba(14, 82, 132, 0.12)',
        'btn-green': '0 6px 20px -4px rgba(15, 117, 58, 0.4)',
        'btn-blue': '0 6px 20px -4px rgba(14, 82, 132, 0.4)',
        'modal': '0 32px 64px -12px rgba(14, 82, 132, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.9)',
        'inner-light': 'inset 0 1px 0 rgba(255,255,255,0.9)',
        'pill-active': '0 4px 16px -3px rgba(15, 117, 58, 0.35)',
      },
      backdropBlur: {
        'xs': '4px',
        '2xl': '24px',
        '3xl': '36px',
      },
      animation: {
        'float-a': 'floatA 8s ease-in-out infinite',
        'float-b': 'floatB 10s ease-in-out infinite',
        'float-c': 'floatC 12s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.16,1,0.3,1)',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16,1,0.3,1)',
      },
      keyframes: {
        floatA: {
          '0%,100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-18px) scale(1.04)' },
        },
        floatB: {
          '0%,100%': { transform: 'translateY(0px) translateX(0px)' },
          '33%': { transform: 'translateY(-12px) translateX(8px)' },
          '66%': { transform: 'translateY(8px) translateX(-6px)' },
        },
        floatC: {
          '0%,100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(14px) scale(0.97)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(12px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: 0, transform: 'scale(0.95)' },
          to: { opacity: 1, transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
