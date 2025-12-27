import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      typography: ({ theme }: { theme: any }) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.gray.900'),
              textDecoration: 'underline',
              '&:hover': {
                color: theme('colors.gray.600'),
              },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: '-0.025em',
            },
            h2: {
              fontWeight: '600',
              letterSpacing: '-0.025em',
            },
            h3: {
              fontWeight: '600',
            },
            code: {
              fontWeight: '400',
              backgroundColor: theme('colors.gray.100'),
              padding: '0.2em 0.3em',
              borderRadius: '0.2em',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      }),
    },
  },
  plugins: [],
};
export default config;
