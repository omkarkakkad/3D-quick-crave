/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        abyss: {
          DEFAULT: '#020b1a',
          dark: '#010512',
          mid: '#051226',
          light: '#081a36'
        },
        navy: '#0a2540',
        ocean: {
          DEFAULT: '#123a5e',
          light: '#1c5478',
          deep: '#0b2450'
        },
        aqua: {
          DEFAULT: '#35d6c4',
          soft: '#7fe8dc',
          dim: '#1daea3'
        },
        seafoam: '#b8ede4',
        sand: '#efe3c8',
        cream: '#f7f1e4',
        ember: {
          DEFAULT: '#ff7a45',
          deep: '#e0582f',
          dark: '#a83e1f'
        },
        coral: '#ff5e5b',
        coconut: '#fffdf7'
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 40px rgba(53,214,196,0.25)',
        card: '0 20px 60px -15px rgba(0,0,0,0.6)',
        ember: '0 0 40px rgba(255,122,69,0.3)'
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        ripple: 'ripple 2.5s ease-out infinite',
        'shimmer-text': 'shimmerText 6s linear infinite',
        'glow-pulse': 'glowPulse 3.4s ease-in-out infinite',
        'spin-slow': 'spin 26s linear infinite',
        'wave-slide': 'waveSlide 18s linear infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        ripple: {
          '0%': { transform: 'scale(0.6)', opacity: '0.9' },
          '100%': { transform: 'scale(2.2)', opacity: '0' }
        },
        shimmerText: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '-200% 50%' }
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 16px rgba(53,214,196,0.18)' },
          '50%': { boxShadow: '0 0 36px rgba(53,214,196,0.45)' }
        },
        waveSlide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      }
    }
  },
  plugins: []
}