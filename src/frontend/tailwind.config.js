/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        card: "oklch(var(--card))",
        popover: "oklch(var(--popover))",
        primary: "oklch(var(--primary))",
        "primary-foreground": "oklch(var(--primary-foreground))",
        secondary: "oklch(var(--secondary))",
        "secondary-foreground": "oklch(var(--secondary-foreground))",
        muted: "oklch(var(--muted))",
        "muted-foreground": "oklch(var(--muted-foreground))",
        accent: "oklch(var(--accent))",
        "accent-foreground": "oklch(var(--accent-foreground))",
        destructive: "oklch(var(--destructive))",
        "destructive-foreground": "oklch(var(--destructive-foreground))",
        success: "oklch(var(--success))",
        "success-foreground": "oklch(var(--success-foreground))",
        warning: "oklch(var(--warning))",
        "warning-foreground": "oklch(var(--warning-foreground))",
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring))",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
      },
      keyframes: {
        lightbulbPulse: {
          "0%": {
            transform: "scale(1)",
            "box-shadow": "0 0 8px rgba(255, 165, 0, 0.4), 0 0 16px rgba(255, 165, 0, 0.2)",
          },
          "50%": {
            transform: "scale(1.05)",
            "box-shadow": "0 0 12px rgba(255, 165, 0, 0.6), 0 0 24px rgba(255, 165, 0, 0.3), 0 0 32px rgba(255, 165, 0, 0.1)",
          },
          "100%": {
            transform: "scale(1)",
            "box-shadow": "0 0 8px rgba(255, 165, 0, 0.4), 0 0 16px rgba(255, 165, 0, 0.2)",
          },
        },
        lightbulbGlow: {
          "0%": {
            opacity: "0.3",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.6",
            transform: "scale(1.1)",
          },
          "100%": {
            opacity: "0.3",
            transform: "scale(1)",
          },
        },
        multiplierBlink: {
          "0%": {
            opacity: "0.8",
            transform: "rotate(-8deg) scale(1.1)",
            "box-shadow": "0 2px 8px rgba(255, 215, 0, 0.6), 0 0 12px rgba(255, 215, 0, 0.4)",
          },
          "100%": {
            opacity: "1",
            transform: "rotate(-8deg) scale(1.15)",
            "box-shadow": "0 3px 12px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.6), 0 0 30px rgba(255, 215, 0, 0.3)",
          },
        },
        milestoneBlink: {
          "0%": {
            "box-shadow": "0 0 8px rgba(34, 197, 94, 0.6), 0 0 16px rgba(34, 197, 94, 0.4), inset 0 0 8px rgba(34, 197, 94, 0.2)",
          },
          "50%": {
            "box-shadow": "0 0 16px rgba(34, 197, 94, 0.8), 0 0 32px rgba(34, 197, 94, 0.6), 0 0 48px rgba(34, 197, 94, 0.4), inset 0 0 16px rgba(34, 197, 94, 0.3)",
            transform: "scale(1.02)",
          },
          "100%": {
            "box-shadow": "0 0 8px rgba(34, 197, 94, 0.6), 0 0 16px rgba(34, 197, 94, 0.4), inset 0 0 8px rgba(34, 197, 94, 0.2)",
          },
        },
        tipFadeIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        hitBurst: {
          "0%": {
            transform: "scale(0)",
            opacity: "1",
          },
          "50%": {
            transform: "scale(1.2)",
            opacity: "0.8",
          },
          "100%": {
            transform: "scale(2)",
            opacity: "0",
          },
        },
        hitPoints: {
          "0%": {
            transform: "translateY(0) scale(0.5)",
            opacity: "1",
          },
          "20%": {
            transform: "translateY(-10px) scale(1.2)",
            opacity: "1",
          },
          "40%": {
            transform: "translateY(-20px) scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(-40px) scale(0.8)",
            opacity: "0",
          },
        },
        rewardBounceCompact: {
          "0%": {
            transform: "translateY(-10px) scale(0.8)",
            opacity: "0",
          },
          "10%": {
            transform: "translateY(0) scale(1.05)",
            opacity: "1",
          },
          "20%": {
            transform: "translateY(-3px) scale(1)",
            opacity: "1",
          },
          "85%": {
            transform: "translateY(0) scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(-5px) scale(0.9)",
            opacity: "0",
          },
        },
        rewardBounce: {
          "0%": {
            transform: "translateY(-20px) scale(0.8)",
            opacity: "0",
          },
          "10%": {
            transform: "translateY(0) scale(1.1)",
            opacity: "1",
          },
          "20%": {
            transform: "translateY(-5px) scale(1)",
            opacity: "1",
          },
          "90%": {
            transform: "translateY(0) scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(-10px) scale(0.9)",
            opacity: "0",
          },
        },
        levelBadgeUnlock: {
          "0%": {
            transform: "scale(0.8) rotate(-10deg)",
            opacity: "0",
          },
          "50%": {
            transform: "scale(1.2) rotate(5deg)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(1) rotate(0deg)",
            opacity: "1",
          },
        },
        badgeGlow: {
          "0%": {
            filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 8px rgba(255, 215, 0, 0.3))",
          },
          "100%": {
            filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 16px rgba(255, 215, 0, 0.6))",
          },
        },
        bounce: {
          "0%, 20%, 53%, 80%, 100%": {
            transform: "translate3d(0, 0, 0)",
          },
          "40%, 43%": {
            transform: "translate3d(0, -30px, 0)",
          },
          "70%": {
            transform: "translate3d(0, -15px, 0)",
          },
          "90%": {
            transform: "translate3d(0, -4px, 0)",
          },
        },
      },
      animation: {
        lightbulbPulse: "lightbulbPulse 2.5s ease-in-out infinite",
        lightbulbGlow: "lightbulbGlow 2.5s ease-in-out infinite",
        multiplierBlink: "multiplierBlink 0.8s infinite alternate ease-in-out",
        milestoneBlink: "milestoneBlink 1.5s ease-in-out infinite",
        tipFadeIn: "tipFadeIn 0.5s ease-in-out",
        hitBurst: "hitBurst 0.6s ease-out forwards",
        hitPoints: "hitPoints 1.5s ease-out forwards",
        rewardBounceCompact: "rewardBounceCompact 1.5s ease-out forwards",
        rewardBounce: "rewardBounce 3s ease-out forwards",
        levelBadgeUnlock: "levelBadgeUnlock 0.8s ease-out",
        badgeGlow: "badgeGlow 2s ease-in-out infinite alternate",
        bounce: "bounce 2s infinite",
      },
    },
  },
  plugins: [],
};
