import type { Config } from "tailwindcss";

// ONE theme. darkMode is deliberately absent — the site's single dark region is
// the gallery band, handled by the [data-tone="ink"] token override in index.css.
export default {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      fontFamily: {
        sans: ['"Inter Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"Geist Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        surface: {
          DEFAULT: "hsl(var(--surface-base))",
          raised: "hsl(var(--surface-raised))",
          sunken: "hsl(var(--surface-sunken))",
          ink: "hsl(var(--surface-ink))",
          "ink-raised": "hsl(var(--surface-ink-raised))",
        },
        ink: {
          DEFAULT: "hsl(var(--text-primary))",
          secondary: "hsl(var(--text-secondary))",
          tertiary: "hsl(var(--text-tertiary))",
        },
        line: {
          subtle: "hsl(var(--border-subtle))",
          DEFAULT: "hsl(var(--border-default))",
          strong: "hsl(var(--border-strong))",
          interactive: "hsl(var(--border-interactive))",
        },
        brand: {
          50: "hsl(var(--accent-50))",
          100: "hsl(var(--accent-100))",
          200: "hsl(var(--accent-200))",
          400: "hsl(var(--accent-400))",
          600: "hsl(var(--accent-600))",
          700: "hsl(var(--accent-700))",
          900: "hsl(var(--accent-900))",
        },
        signal: "hsl(var(--signal-emerald))",

        // shadcn compatibility
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
      },
      borderRadius: {
        xs: "var(--r-xs)",
        sm: "var(--r-sm)",
        md: "var(--r-md)",
        lg: "var(--r-lg)",
        xl: "var(--r-xl)",
      },
      spacing: {
        // 8pt rhythm
        s1: "4px", s2: "8px", s3: "12px", s4: "16px", s5: "24px",
        s6: "32px", s7: "48px", s8: "64px", s9: "96px", s10: "128px",
      },
      maxWidth: {
        shell: "79rem",
        wide: "64rem",
        text: "48rem",
        prose: "40rem",
      },
      transitionTimingFunction: {
        entrance: "cubic-bezier(.32,.72,0,1)",
      },
      transitionDuration: {
        120: "120ms",
        180: "180ms",
        240: "240ms",
      },
      keyframes: {
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
      },
      animation: {
        "fade-in": "fade-in 180ms cubic-bezier(.32,.72,0,1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
