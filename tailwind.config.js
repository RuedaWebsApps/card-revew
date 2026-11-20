export default {
  content: ['./index.html', './src/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card-light': '0 24px 60px -15px rgba(54, 38, 118, 0.16), 0 8px 24px -8px rgba(214, 14, 123, 0.08)',
        'card-dark': '0 28px 70px -15px rgba(0, 0, 0, 0.65), 0 0 40px -10px rgba(214, 14, 123, 0.22)',
        'cta-glow': '0 10px 28px -6px rgba(214, 14, 123, 0.45)',
      },
      keyframes: {
        starPop: { '0%, 100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.22)' } },
      },
      animation: { 'star-pop': 'starPop 0.35s ease-out' },
    },
  },
  plugins: [],
};
