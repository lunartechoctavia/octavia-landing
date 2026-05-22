module.exports = {
  content: ['./*.html', './**/*.html'],
  theme: {
    extend: {
      colors: {
        purple: {
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          900: '#2E1065',
        },
        neutral: {
          850: '#1a1a1a',
          900: '#111111',
          950: '#050505',
        },
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'sans-serif'],
        display: ['Geist', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 60px -15px rgba(139, 92, 246, 0.15)',
        'glow-sm': '0 0 20px -5px rgba(139, 92, 246, 0.3)',
      },
      animation: {
        marquee: 'marquee 24s linear infinite',
        float: 'float 5s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.rotate-x-5': { transform: 'perspective(1000px) rotateX(5deg)' },
        '.rotate-x-12': { transform: 'perspective(1000px) rotateX(12deg)' },
        '.preserve-3d': { transformStyle: 'preserve-3d' },
      });
    },
  ],
};
