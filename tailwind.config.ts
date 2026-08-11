import type { Config } from "tailwindcss";

// ONE theme. The single dark region is the plate band, handled by the
// [data-tone="plate"] token override in index.css.
//
// Key names are deliberately unchanged from the previous palette so components
// did not all need rewriting — the VALUES now point at the warm ramp.
export default {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      fontFamily: {
        sans: ['"Inter Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ['"Instrument Serif"', "ui-serif", "Georgia", "serif"],
        mono: ['"Geist Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        surface: {
          DEFAULT: "hsl(var(--paper))",
          raised: "hsl(var(--card))",
          sunken: "hsl(var(--well))",
          ink: "hsl(var(--plate-0))",
          "ink-raised": "hsl(var(--plate-1))",
        },
        ink: {
          DEFAULT: "hsl(var(--ink-0))",
          strong: "hsl(var(--ink-1))",
          secondary: "hsl(var(--ink-2))",
          tertiary: "hsl(var(--ink-3))",
        },
        line: {
          subtle: "hsl(var(--rule))",
          DEFAULT: "hsl(var(--rule))",
          strong: "hsl(var(--rule-2))",
          interactive: "hsl(var(--ink-4))",
          edge: "hsl(var(--edge))",
        },
        // blue: track 01, links, focus. never a button fill.
        brand: {
          200: "hsl(var(--blue-200))",
          400: "hsl(var(--blue-400))",
          500: "hsl(var(--blue-500))",
          600: "hsl(var(--blue-600))",
          700: "hsl(var(--blue-700))",
        },
        // oxide: track 02, ad creative only.
        oxide: {
          200: "hsl(var(--ox-200))",
          400: "hsl(var(--ox-400))",
          500: "hsl(var(--ox-500))",
          600: "hsl(var(--ox-600))",
          700: "hsl(var(--ox-700))",
        },
        signal: "hsl(var(--signal))",

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
        xs: "var(--r-chip)",
        sm: "var(--r-control)",
        md: "var(--r-media)",
        lg: "var(--r-card)",
        xl: "var(--r-panel)",
      },
      boxShadow: {
        e1: "var(--e1)",
        e2: "var(--e2)",
        e3: "var(--e3)",
        e4: "var(--e4)",
      },
      spacing: {
        // ~1.6 ratio rather than a linear 8pt list: an even scale reads as a
        // grid, a ratio reads as composition.
        s1: "4px",
        s2: "6px",
        s3: "10px",
        s4: "16px",
        s5: "26px",
        s6: "42px",
        s7: "68px",
        s8: "110px",
        s9: "176px",
        s10: "232px",
      },
      maxWidth: { shell: "86rem", wide: "70rem", text: "52rem", prose: "42rem" },
      transitionTimingFunction: { entrance: "cubic-bezier(.32,.72,0,1)" },
      transitionDuration: { 120: "120ms", 180: "180ms", 240: "240ms", 380: "380ms" },
      keyframes: { "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } } },
      animation: { "fade-in": "fade-in 180ms cubic-bezier(.32,.72,0,1)" },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
