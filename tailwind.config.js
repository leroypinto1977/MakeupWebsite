/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", // subtle warm gray
        input: "var(--color-input)", // elevated surface
        ring: "var(--color-ring)", // champagne gold
        background: "var(--color-background)", // warm white
        foreground: "var(--color-foreground)", // rich dark brown
        primary: {
          DEFAULT: "var(--color-primary)", // champagne gold
          foreground: "var(--color-primary-foreground)", // warm white
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // subtle warm gray
          foreground: "var(--color-secondary-foreground)", // rich dark brown
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // sophisticated burgundy
          foreground: "var(--color-destructive-foreground)", // warm white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // elevated surface
          foreground: "var(--color-muted-foreground)", // medium brown
        },
        accent: {
          DEFAULT: "var(--color-accent)", // elevated surface
          foreground: "var(--color-accent-foreground)", // rich dark brown
        },
        popover: {
          DEFAULT: "var(--color-popover)", // warm white
          foreground: "var(--color-popover-foreground)", // rich dark brown
        },
        card: {
          DEFAULT: "var(--color-card)", // warm off-white
          foreground: "var(--color-card-foreground)", // rich dark brown
        },
        success: {
          DEFAULT: "var(--color-success)", // muted sage green
          foreground: "var(--color-success-foreground)", // warm white
        },
        warning: {
          DEFAULT: "var(--color-warning)", // warm terracotta
          foreground: "var(--color-warning-foreground)", // warm white
        },
        error: {
          DEFAULT: "var(--color-error)", // sophisticated burgundy
          foreground: "var(--color-error-foreground)", // warm white
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
        caption: ["var(--font-caption)"],
        data: ["var(--font-data)"],
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      backdropBlur: {
        nav: "12px",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "scale-in": "scaleIn 0.4s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        '100': '100',
        '200': '200',
        '300': '300',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}