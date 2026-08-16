import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#030407',
        'space-navy': '#070913',
        'nebula-purple': '#7C3AED',
        'nebula-indigo': '#6366F1',
        'plasma-cyan': '#22D3EE',
        'solar-orange': '#FB923C',
        starlight: '#F5F7FF',
        'muted-grey': '#94A3B8',
      },
      fontFamily: {
        space: ['var(--font-space-grotesk)', 'sans-serif'],
        inter: ['var(--font-inter-body)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '2px',
        hud: '2px',
        sm: '2px',
        md: '2px',
        lg: '2px',
        xl: '2px',
        '2xl': '2px',
        '3xl': '2px',
      },
      borderColor: {
        hud: 'rgba(255, 255, 255, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
