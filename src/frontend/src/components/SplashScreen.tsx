import type React from "react";
import { useCallback, useEffect, useRef } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

interface SplashChicken {
  x: number;
  y: number;
  speed: number;
  size: number;
  color: string;
  wingPhase: number;
}

interface Letter {
  char: string;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  currentX: number;
  currentY: number;
  progress: number;
  delay: number;
  direction: string;
}

// Fixed chicken color — always the classic warm brown. Never random, never changes.
const FIXED_CHICKEN_COLOR = "#8B4513";

const easeOutCubic = (t: number): number => 1 - (1 - t) ** 3;
const easeOutQuart = (t: number): number => 1 - (1 - t) ** 4;

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>(0);
  const chickenRef = useRef<SplashChicken | null>(null);
  const startTimeRef = useRef<number>(0);
  const lettersRef = useRef<Letter[]>([]);
  const completedRef = useRef(false);

  // Create chicken always using the fixed color — never re-randomize
  const createChicken = useCallback(
    (canvas: HTMLCanvasElement, existingColor?: string): SplashChicken => {
      const size = 120;
      return {
        x: -size,
        y: canvas.height * 0.38 - size / 2,
        speed: 2.5,
        size,
        color: existingColor ?? FIXED_CHICKEN_COLOR,
        wingPhase: 0,
      };
    },
    [],
  );

  const initLetters = useCallback((canvas: HTMLCanvasElement) => {
    const text = "WORLD OF HUNT";
    const fontSize = Math.min(canvas.width * 0.1, 110);
    const letterSpacing = fontSize * 0.72;
    const totalWidth = (text.length - 1) * letterSpacing;
    const baseX = (canvas.width - totalWidth) / 2;
    const centerY = canvas.height * 0.5;

    const directions = [
      "top-left",
      "top",
      "top-right",
      "left",
      "bottom-left",
      "bottom",
      "right",
      "top-left",
      "top",
      "top-right",
      "left",
      "bottom-right",
    ];

    lettersRef.current = text.split("").map((char, i) => {
      const targetX = baseX + i * letterSpacing;
      const dir = directions[i % directions.length];
      let sx = targetX;
      let sy = -150;

      if (dir === "bottom") {
        sx = targetX;
        sy = canvas.height + 150;
      } else if (dir === "left") {
        sx = -250;
        sy = centerY;
      } else if (dir === "right") {
        sx = canvas.width + 250;
        sy = centerY;
      } else if (dir === "top-left") {
        sx = -200;
        sy = -200;
      } else if (dir === "top-right") {
        sx = canvas.width + 200;
        sy = -200;
      } else if (dir === "bottom-left") {
        sx = -200;
        sy = canvas.height + 200;
      } else if (dir === "bottom-right") {
        sx = canvas.width + 200;
        sy = canvas.height + 200;
      }

      return {
        char,
        startX: sx,
        startY: sy,
        targetX,
        targetY: centerY,
        currentX: sx,
        currentY: sy,
        progress: 0,
        delay: i * 90,
        direction: dir,
      };
    });
  }, []);

  const drawChicken = useCallback(
    (ctx: CanvasRenderingContext2D, c: SplashChicken) => {
      const { x, y, size, color, wingPhase } = c;
      ctx.save();
      ctx.translate(x + size / 2, y + size / 2);
      ctx.scale(-1, 1);

      const wingOffset = Math.sin(wingPhase) * 0.3;
      const wingRotation = Math.sin(wingPhase) * 0.4;

      // Body
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.35, size * 0.25, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#3d1a00";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Chest
      ctx.fillStyle = "#F5DEB3";
      ctx.beginPath();
      ctx.ellipse(
        -size * 0.05,
        size * 0.05,
        size * 0.2,
        size * 0.15,
        0,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      // Tail feathers
      ctx.fillStyle = color;
      for (const [ex, ey, rx, ry, rot] of [
        [size * 0.3, -size * 0.05, size * 0.15, size * 0.08, Math.PI * 0.3],
        [size * 0.32, size * 0.02, size * 0.12, size * 0.06, Math.PI * 0.1],
        [size * 0.34, size * 0.08, size * 0.1, size * 0.05, -Math.PI * 0.1],
      ] as [number, number, number, number, number][]) {
        ctx.beginPath();
        ctx.ellipse(ex, ey, rx, ry, rot, 0, Math.PI * 2);
        ctx.fill();
      }

      // Head
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(
        -size * 0.25,
        -size * 0.15,
        size * 0.2,
        size * 0.18,
        0,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      ctx.strokeStyle = "#3d1a00";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Beak
      ctx.fillStyle = "#FFA500";
      ctx.beginPath();
      ctx.moveTo(-size * 0.4, -size * 0.15);
      ctx.lineTo(-size * 0.5, -size * 0.1);
      ctx.lineTo(-size * 0.4, -size * 0.05);
      ctx.closePath();
      ctx.fill();

      // Eye
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.ellipse(
        -size * 0.28,
        -size * 0.18,
        size * 0.06,
        size * 0.08,
        0,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.ellipse(
        -size * 0.26,
        -size * 0.18,
        size * 0.03,
        size * 0.04,
        0,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      // Comb
      ctx.fillStyle = "#DC143C";
      ctx.beginPath();
      ctx.moveTo(-size * 0.35, -size * 0.32);
      ctx.lineTo(-size * 0.32, -size * 0.42);
      ctx.lineTo(-size * 0.28, -size * 0.35);
      ctx.lineTo(-size * 0.24, -size * 0.42);
      ctx.lineTo(-size * 0.2, -size * 0.35);
      ctx.lineTo(-size * 0.16, -size * 0.4);
      ctx.lineTo(-size * 0.12, -size * 0.32);
      ctx.lineTo(-size * 0.35, -size * 0.32);
      ctx.closePath();
      ctx.fill();

      // Wattles
      ctx.fillStyle = "#DC143C";
      ctx.beginPath();
      ctx.ellipse(
        -size * 0.38,
        -size * 0.05,
        size * 0.04,
        size * 0.08,
        0,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(
        -size * 0.42,
        -size * 0.02,
        size * 0.03,
        size * 0.06,
        0,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      // Wings (animated)
      ctx.save();
      ctx.rotate(wingRotation);
      ctx.translate(0, wingOffset * size * 0.1);
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.ellipse(
        size * 0.15,
        -size * 0.1,
        size * 0.25,
        size * 0.15,
        Math.PI * 0.2,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      ctx.strokeStyle = "#3d1a00";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.restore();

      // Legs
      ctx.strokeStyle = "#FFA500";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-size * 0.1, size * 0.22);
      ctx.lineTo(-size * 0.12, size * 0.35);
      ctx.moveTo(size * 0.05, size * 0.22);
      ctx.lineTo(size * 0.03, size * 0.35);
      ctx.stroke();

      // Feet
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-size * 0.18, size * 0.35);
      ctx.lineTo(-size * 0.06, size * 0.35);
      ctx.moveTo(-size * 0.03, size * 0.35);
      ctx.lineTo(size * 0.09, size * 0.35);
      ctx.stroke();

      ctx.restore();
    },
    [],
  );

  const drawBackground = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      // Deep cinematic near-black base
      ctx.fillStyle = "#09080a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle radial vignette — very slightly lighter center for depth
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const r = Math.max(canvas.width, canvas.height) * 0.75;
      const vignette = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      vignette.addColorStop(0, "rgba(30, 22, 18, 0.55)");
      vignette.addColorStop(0.45, "rgba(12, 9, 8, 0.25)");
      vignette.addColorStop(1, "rgba(0, 0, 0, 0.82)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle warm center glow (cinematic amber/warm tone)
      const centerGlow = ctx.createRadialGradient(
        cx,
        cy * 0.92,
        0,
        cx,
        cy * 0.92,
        canvas.height * 0.55,
      );
      centerGlow.addColorStop(0, "rgba(90, 55, 20, 0.18)");
      centerGlow.addColorStop(0.5, "rgba(50, 28, 8, 0.08)");
      centerGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    },
    [],
  );

  const drawTitle = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      elapsed: number,
    ) => {
      const fontSize = Math.min(canvas.width * 0.1, 110);
      const centerY = Math.round(canvas.height * 0.5);

      // Disable image smoothing for crisp rendering
      ctx.imageSmoothingEnabled = false;

      // Draw each animated letter
      for (const letter of lettersRef.current) {
        if (letter.char === " ") continue;

        // Round positions to nearest pixel for sharp text
        const px = Math.round(letter.currentX);
        const py = Math.round(letter.currentY);

        ctx.save();
        ctx.font = `900 ${fontSize}px Cinzel`;
        ctx.textAlign = "center";
        ctx.textBaseline = "alphabetic";

        // Fade in opacity as letter lands
        const opacity = Math.min(letter.progress * 2, 1);
        ctx.globalAlpha = opacity;

        // Simplified 2-stop gold gradient — fewer stops = less antialiasing artifact
        const grad = ctx.createLinearGradient(px, py - fontSize * 0.8, px, py);
        grad.addColorStop(0, "#e8d5a3");
        grad.addColorStop(1, "#c8a86b");

        // Sharper shadow — reduced blur and offset
        ctx.shadowColor = "rgba(0,0,0,0.9)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetY = 2;

        // Thinner stroke for definition without softening
        ctx.strokeStyle = "rgba(0,0,0,0.85)";
        ctx.lineWidth = fontSize * 0.03;
        ctx.lineJoin = "round";
        ctx.strokeText(letter.char, px, py);

        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;

        ctx.fillStyle = grad;
        ctx.fillText(letter.char, px, py);

        ctx.restore();
      }

      // Subtitle — "100% AI Made" — appears after main letters mostly settle
      // Clamp progress to [0, 1] so easeOutQuart never receives values > 1,
      // which would cause opacity to drop back toward 0 and create a blinking effect.
      const subtitleProgress = Math.min(Math.max(0, (elapsed - 1600) / 600), 1);
      if (subtitleProgress > 0) {
        const subOpacity = easeOutQuart(subtitleProgress);
        // Round subY to prevent sub-pixel blurriness
        const subY = Math.round(centerY + fontSize * 0.72);
        const subtitleFontSize = Math.round(Math.min(canvas.width * 0.02, 20));
        const cx = Math.round(canvas.width / 2);

        ctx.save();
        // Use subOpacity directly — no multiplier — so once fade-in completes
        // the text stays at exactly 1.0 (fully opaque, no blink, no pulse).
        ctx.globalAlpha = subOpacity;
        ctx.imageSmoothingEnabled = false;

        const subtitleText = "100% AI Made";
        ctx.font = `400 ${subtitleFontSize}px Cinzel`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const textW = ctx.measureText(subtitleText).width;

        // Horizontal rules flanking the subtitle — all positions pixel-rounded
        const gap = 16;
        const ruleW = Math.round(Math.min(canvas.width * 0.1, 80));
        const ruleY = subY;

        ctx.strokeStyle = "rgba(200, 168, 107, 0.6)";
        ctx.lineWidth = 0.8;

        ctx.beginPath();
        ctx.moveTo(Math.round(cx - textW / 2 - gap - ruleW), ruleY);
        ctx.lineTo(Math.round(cx - textW / 2 - gap), ruleY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(Math.round(cx + textW / 2 + gap), ruleY);
        ctx.lineTo(Math.round(cx + textW / 2 + gap + ruleW), ruleY);
        ctx.stroke();

        ctx.fillStyle = "rgba(200, 168, 107, 0.9)";
        ctx.fillText(subtitleText, cx, ruleY);

        ctx.restore();
      }
    },
    [],
  );

  const animate = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx || completedRef.current) return;

      if (startTimeRef.current === 0) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;

      // Draw premium dark background with vignette
      drawBackground(ctx, canvas);

      // Update and draw chicken
      if (chickenRef.current) {
        const ch = chickenRef.current;
        ch.x += ch.speed;
        ch.wingPhase += 0.3;
        if (ch.x > canvas.width + ch.size) ch.x = -ch.size;
        drawChicken(ctx, ch);
      }

      // Animate letters
      for (const letter of lettersRef.current) {
        if (elapsed >= letter.delay) {
          const le = elapsed - letter.delay;
          const dur = 1100;
          const raw = Math.min(le / dur, 1);
          letter.progress = easeOutCubic(raw);
          letter.currentX =
            letter.startX + (letter.targetX - letter.startX) * letter.progress;
          letter.currentY =
            letter.startY + (letter.targetY - letter.startY) * letter.progress;
        }
      }

      // Draw title (letters + subtitle)
      drawTitle(ctx, canvas, elapsed);

      // Auto-advance after 3.2 seconds
      if (elapsed >= 3200) {
        completedRef.current = true;
        onComplete();
        return;
      }

      animationIdRef.current = requestAnimationFrame(animate);
    },
    [drawBackground, drawChicken, drawTitle, onComplete],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Preserve the existing chicken color on resize — never re-randomize
      const existingColor = chickenRef.current?.color ?? FIXED_CHICKEN_COLOR;
      const existing = chickenRef.current;
      chickenRef.current = createChicken(canvas, existingColor);
      // Preserve wing phase and x position so the animation continues smoothly
      if (existing) {
        chickenRef.current.x = existing.x;
        chickenRef.current.wingPhase = existing.wingPhase;
      }
      initLetters(canvas);
    };

    resize();
    window.addEventListener("resize", resize);
    startTimeRef.current = 0;
    completedRef.current = false;

    // Wait for Cinzel font to be fully loaded before starting animation
    // This prevents blurry fallback-font rendering on first frames
    document.fonts
      .load("900 110px Cinzel")
      .catch(() => {})
      .finally(() => {
        if (!completedRef.current) {
          animationIdRef.current = requestAnimationFrame(animate);
        }
      });

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationIdRef.current);
    };
  }, [createChicken, initLetters, animate]);

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      style={{ background: "#09080a" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default SplashScreen;
