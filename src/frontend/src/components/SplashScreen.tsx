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

const CHICKEN_COLORS = ["#8B4513", "#D2691E", "#F4A460", "#DEB887", "#CD853F"];

const easeOutCubic = (t: number): number => 1 - (1 - t) ** 3;

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>(0);
  const chickenRef = useRef<SplashChicken | null>(null);
  const startTimeRef = useRef<number>(0);
  const lettersRef = useRef<Letter[]>([]);
  const completedRef = useRef(false);

  const createChicken = useCallback(
    (canvas: HTMLCanvasElement): SplashChicken => {
      const size = 120;
      return {
        x: -size,
        y: canvas.height / 2 - size / 2,
        speed: 2.5,
        size,
        color:
          CHICKEN_COLORS[Math.floor(Math.random() * CHICKEN_COLORS.length)],
        wingPhase: 0,
      };
    },
    [],
  );

  const initLetters = useCallback((canvas: HTMLCanvasElement) => {
    const text = "CHICKEN HUNT";
    const fontSize = Math.min(canvas.width * 0.08, 80);
    const totalWidth = text.length * fontSize * 0.6;
    const baseX = (canvas.width - totalWidth) / 2;
    const centerY = canvas.height / 2;

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
      const targetX = baseX + i * fontSize * 0.6;
      const dir = directions[i % directions.length];
      let sx = targetX;
      let sy = -100;

      if (dir === "bottom") {
        sx = targetX;
        sy = canvas.height + 100;
      } else if (dir === "left") {
        sx = -200;
        sy = centerY;
      } else if (dir === "right") {
        sx = canvas.width + 200;
        sy = centerY;
      } else if (dir === "top-left") {
        sx = -150;
        sy = -150;
      } else if (dir === "top-right") {
        sx = canvas.width + 150;
        sy = -150;
      } else if (dir === "bottom-left") {
        sx = -150;
        sy = canvas.height + 150;
      } else if (dir === "bottom-right") {
        sx = canvas.width + 150;
        sy = canvas.height + 150;
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
        delay: i * 100,
        direction: dir,
      };
    });
  }, []);

  const drawChicken = useCallback(
    (ctx: CanvasRenderingContext2D, c: SplashChicken) => {
      const { x, y, size, color, wingPhase } = c;
      ctx.save();
      ctx.translate(x + size / 2, y + size / 2);
      ctx.scale(-1, 1); // left-to-right, flip

      const wingOffset = Math.sin(wingPhase) * 0.3;
      const wingRotation = Math.sin(wingPhase) * 0.4;

      // Body
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.35, size * 0.25, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#654321";
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
      ]) {
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
      ctx.strokeStyle = "#654321";
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
      ctx.strokeStyle = "#654321";
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

  const drawLetter = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      letter: Letter,
      canvas: HTMLCanvasElement,
    ) => {
      const fontSize = Math.min(canvas.width * 0.08, 80);
      ctx.save();
      ctx.font = `900 ${fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 4;
      ctx.lineJoin = "round";
      ctx.strokeText(letter.char, letter.currentX, letter.currentY);
      ctx.fillText(letter.char, letter.currentX, letter.currentY);
      ctx.restore();
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

      // Background gradient
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, "#87CEEB");
      grad.addColorStop(0.3, "#B0E0E6");
      grad.addColorStop(0.7, "#FFE4B5");
      grad.addColorStop(1, "#FFDAB9");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw chicken
      if (chickenRef.current) {
        const ch = chickenRef.current;
        ch.x += ch.speed;
        ch.wingPhase += 0.3;
        if (ch.x > canvas.width + ch.size) ch.x = -ch.size;
        drawChicken(ctx, ch);
      }

      // Animate and draw letters
      for (const letter of lettersRef.current) {
        if (elapsed >= letter.delay) {
          const le = elapsed - letter.delay;
          const dur = 1200;
          const raw = Math.min(le / dur, 1);
          letter.progress = easeOutCubic(raw);
          letter.currentX =
            letter.startX + (letter.targetX - letter.startX) * letter.progress;
          letter.currentY =
            letter.startY + (letter.targetY - letter.startY) * letter.progress;
        }
        drawLetter(ctx, letter, canvas);
      }

      // Auto-advance after 3 seconds
      if (elapsed >= 3000) {
        completedRef.current = true;
        onComplete();
        return;
      }

      animationIdRef.current = requestAnimationFrame(animate);
    },
    [drawChicken, drawLetter, onComplete],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      chickenRef.current = createChicken(canvas);
      initLetters(canvas);
    };

    resize();
    window.addEventListener("resize", resize);
    startTimeRef.current = 0;
    completedRef.current = false;
    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationIdRef.current);
    };
  }, [createChicken, initLetters, animate]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default SplashScreen;
