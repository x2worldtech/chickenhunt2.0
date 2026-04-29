import { useEffect, useState } from "react";

interface MobileOnlyGuardProps {
  children: React.ReactNode;
}

function isMobileDevice(): boolean {
  const uaMatch =
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|webOS/i.test(
      navigator.userAgent,
    );
  const widthMatch = window.innerWidth <= 768;
  return uaMatch || widthMatch;
}

function isLandscape(): boolean {
  // Primary: screen.orientation API
  if (window.screen?.orientation?.type) {
    return window.screen.orientation.type.startsWith("landscape");
  }
  // Fallback: matchMedia
  if (window.matchMedia) {
    return window.matchMedia("(orientation: landscape)").matches;
  }
  // Legacy fallback: compare dimensions
  return window.innerWidth > window.innerHeight;
}

// ─── Portrait-Only Overlay ───────────────────────────────────────────────────
function PortraitOnlyOverlay() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #111008 50%, #0a0a0a 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999999,
        fontFamily: "'Cinzel', serif",
        overflow: "hidden",
        touchAction: "none",
        userSelect: "none",
      }}
      // Block all pointer events on children by capturing them here
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      {/* Golden radial glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(ellipse at center, rgba(212,175,55,0.10) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Top decorative rule */}
      <div
        style={{
          width: "180px",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, #d4af37, transparent)",
          marginBottom: "36px",
        }}
      />

      {/* Rotation SVG icon */}
      <div style={{ marginBottom: "28px" }}>
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Rotate device to portrait"
          role="img"
          style={{ filter: "drop-shadow(0 0 14px rgba(212,175,55,0.5))" }}
        >
          {/* Phone outline in landscape */}
          <rect
            x="6"
            y="22"
            width="44"
            height="26"
            rx="4"
            stroke="#d4af37"
            strokeWidth="2"
            fill="rgba(212,175,55,0.05)"
            opacity="0.45"
          />
          {/* Arrow arc indicating rotation */}
          <path
            d="M56 44 C62 44, 66 38, 66 32 C66 22, 58 15, 50 15"
            stroke="#d4af37"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />
          {/* Arrowhead */}
          <polyline
            points="46,11 50,15 47,20"
            stroke="#d4af37"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Phone outline in portrait (destination) */}
          <rect
            x="28"
            y="38"
            width="18"
            height="28"
            rx="3"
            stroke="#d4af37"
            strokeWidth="2"
            fill="rgba(212,175,55,0.08)"
          />
          <line
            x1="28"
            y1="43"
            x2="46"
            y2="43"
            stroke="#d4af37"
            strokeWidth="1.2"
            opacity="0.4"
          />
          <line
            x1="28"
            y1="60"
            x2="46"
            y2="60"
            stroke="#d4af37"
            strokeWidth="1.2"
            opacity="0.4"
          />
          <circle cx="37" cy="63" r="1.2" fill="#d4af37" opacity="0.6" />
        </svg>
      </div>

      {/* Title */}
      <h1
        style={{
          fontSize: "clamp(20px, 5vw, 28px)",
          fontWeight: "700",
          color: "#d4af37",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          textShadow:
            "0 0 28px rgba(212,175,55,0.45), 0 2px 8px rgba(0,0,0,0.8)",
          marginBottom: "16px",
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        World of Hunt
      </h1>

      {/* Main message */}
      <p
        style={{
          fontSize: "clamp(13px, 3.5vw, 17px)",
          color: "rgba(255,255,255,0.88)",
          textAlign: "center",
          maxWidth: "320px",
          lineHeight: "1.65",
          marginBottom: "10px",
          fontFamily: "'Cinzel', serif",
          letterSpacing: "0.04em",
          padding: "0 24px",
        }}
      >
        Please rotate your device to portrait mode.
      </p>

      {/* Subtitle */}
      <p
        style={{
          fontSize: "clamp(11px, 3vw, 13px)",
          color: "rgba(212,175,55,0.60)",
          textAlign: "center",
          maxWidth: "280px",
          lineHeight: "1.7",
          fontFamily: "sans-serif",
          letterSpacing: "0.02em",
          padding: "0 24px",
        }}
      >
        This game is only playable in portrait orientation.
      </p>

      {/* Bottom decorative rule */}
      <div
        style={{
          width: "180px",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, #d4af37, transparent)",
          marginTop: "36px",
        }}
      />
    </div>
  );
}

// ─── Main Guard ───────────────────────────────────────────────────────────────
export function MobileOnlyGuard({ children }: MobileOnlyGuardProps) {
  const [isMobile, setIsMobile] = useState<boolean>(() => isMobileDevice());
  const [landscape, setLandscape] = useState<boolean>(() => isLandscape());

  // Attempt hardware orientation lock on mount (Android Chrome supports this).
  // Wrapped in try/catch — iOS Safari and some desktop browsers will reject it.
  // The PortraitOnlyOverlay remains as a fallback when the lock is not granted.
  useEffect(() => {
    if (!isMobile) return;
    const lockOrientation = async () => {
      try {
        const orientation = screen.orientation as ScreenOrientation & {
          lock?: (orientation: string) => Promise<void>;
        };
        if (orientation && typeof orientation.lock === "function") {
          await orientation.lock("portrait");
        }
      } catch {
        // Lock not supported or denied (iOS Safari, desktop, etc.) — overlay fallback handles it.
      }
    };
    lockOrientation();
  }, [isMobile]);

  // Desktop/mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Orientation detection — three listeners for maximum compatibility
  useEffect(() => {
    const update = () => setLandscape(isLandscape());

    // 1. screen.orientation change (modern browsers)
    if (window.screen?.orientation) {
      window.screen.orientation.addEventListener("change", update);
    }

    // 2. orientationchange event (iOS Safari, older Android)
    window.addEventListener("orientationchange", update);

    // 3. resize fallback (catches any missed orientation events)
    window.addEventListener("resize", update);

    return () => {
      if (window.screen?.orientation) {
        window.screen.orientation.removeEventListener("change", update);
      }
      window.removeEventListener("orientationchange", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Block desktop entirely
  if (!isMobile) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #111008 50%, #0a0a0a 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99999,
          fontFamily: "'Cinzel', serif",
          overflow: "hidden",
        }}
      >
        {/* Subtle golden radial glow behind content */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Decorative top rule */}
        <div
          style={{
            width: "220px",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, #d4af37, transparent)",
            marginBottom: "40px",
          }}
        />

        {/* Chicken icon */}
        <div style={{ fontSize: "64px", marginBottom: "24px", lineHeight: 1 }}>
          🐔
        </div>

        {/* Game title */}
        <h1
          style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: "700",
            color: "#d4af37",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            textShadow:
              "0 0 32px rgba(212,175,55,0.45), 0 2px 8px rgba(0,0,0,0.8)",
            marginBottom: "8px",
            textAlign: "center",
          }}
        >
          World of Hunt
        </h1>

        {/* 100% AI Made tagline */}
        <p
          style={{
            fontSize: "11px",
            color: "rgba(212,175,55,0.55)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: "48px",
            fontFamily: "'Cinzel', serif",
          }}
        >
          100% AI Made
        </p>

        {/* Phone icon SVG */}
        <div style={{ marginBottom: "32px" }}>
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Mobile phone icon"
            role="img"
            style={{ filter: "drop-shadow(0 0 12px rgba(212,175,55,0.4))" }}
          >
            <rect
              x="14"
              y="4"
              width="28"
              height="48"
              rx="5"
              stroke="#d4af37"
              strokeWidth="2.5"
              fill="none"
            />
            <rect
              x="14"
              y="4"
              width="28"
              height="48"
              rx="5"
              fill="rgba(212,175,55,0.05)"
            />
            <line
              x1="14"
              y1="12"
              x2="42"
              y2="12"
              stroke="#d4af37"
              strokeWidth="1.5"
              opacity="0.5"
            />
            <line
              x1="14"
              y1="44"
              x2="42"
              y2="44"
              stroke="#d4af37"
              strokeWidth="1.5"
              opacity="0.5"
            />
            <circle cx="28" cy="49" r="1.5" fill="#d4af37" opacity="0.6" />
            <rect
              x="22"
              y="8"
              width="12"
              height="1.5"
              rx="0.75"
              fill="#d4af37"
              opacity="0.4"
            />
          </svg>
        </div>

        {/* Main message */}
        <p
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "rgba(255,255,255,0.9)",
            textAlign: "center",
            maxWidth: "440px",
            lineHeight: "1.6",
            marginBottom: "12px",
            fontFamily: "'Cinzel', serif",
            letterSpacing: "0.04em",
            padding: "0 24px",
          }}
        >
          This game is designed for mobile phones.
        </p>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "clamp(12px, 1.4vw, 15px)",
            color: "rgba(212,175,55,0.65)",
            textAlign: "center",
            maxWidth: "380px",
            lineHeight: "1.7",
            fontFamily: "sans-serif",
            letterSpacing: "0.02em",
            padding: "0 24px",
          }}
        >
          Please open World of Hunt on your smartphone to play.
        </p>

        {/* Decorative bottom rule */}
        <div
          style={{
            width: "220px",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, #d4af37, transparent)",
            marginTop: "48px",
          }}
        />
      </div>
    );
  }

  // Mobile device — render children with portrait-only guard on top
  return (
    <>
      {children}
      {landscape && <PortraitOnlyOverlay />}
    </>
  );
}
