import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { BackgroundWorld, GameStatisticsLocal, PlayerData } from "../App";
import {
  useBitcoinPrice,
  useBrentOilPrice,
  useDogecoinPrice,
  usePumpFunPrice,
} from "../hooks/useQueries";
import AchievementsView from "./AchievementsView";
import BackgroundRenderer from "./BackgroundRenderer";
import BottomMenu from "./BottomMenu";
import LeaderboardView from "./LeaderboardView";
import ProfileView from "./ProfileView";
import SettingsView from "./SettingsView";
import SocialsView from "./SocialsView";

type OverlayView =
  | "achievements"
  | "profile"
  | "leaderboard"
  | "settings"
  | "socials";

interface StartScreenProps {
  onStartGame: () => void;
  selectedWorld: BackgroundWorld;
  onWorldChange: (world: BackgroundWorld) => void;
  playerData: PlayerData;
  gameStatistics: GameStatisticsLocal;
  addXP: (xpAmount: number) => void;
}

interface StartChicken {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
  color: string;
  wingPhase: number;
  direction: "left-to-right" | "right-to-left";
  isRocket?: boolean;
}

const GAME_TIPS = [
  "🎯 Small chickens are worth 20 points but are harder to hit!",
  "⚡ Fast chickens (red-colored) give 5 bonus points on top of their base value!",
  "✨ Golden chickens appear 3 times per round and give special rewards!",
  "🎪 Missing shots deducts 5 points from your round score only!",
  "🔥 Golden chickens can give 2x multiplier, bonus points, or bonus XP!",
  "⏰ A stopwatch appears once per round — shoot it for extra time!",
  "🎵 Adjust music volume in settings for the perfect gaming experience!",
  "🏆 Complete achievements to track your progress and skills!",
  "📊 Your accuracy percentage affects achievement unlocks!",
  "⏰ Each round lasts exactly 60 seconds — make every shot count!",
  "🎮 Use discrete taps only — dragging won't register shots!",
  "🌟 Level up by earning XP from every chicken you shoot!",
  "🎯 Large chickens are easier to hit but worth fewer points!",
  "💫 Perfect accuracy sessions require 100% hits with minimum 5 shots!",
  "🔄 Chickens respawn immediately after being shot!",
  "🎊 The 2x multiplier lasts exactly 5 seconds when activated!",
  "🌍 Use navigation buttons to explore different background worlds!",
  "⏱️ The stopwatch follows a curved path — time your shots carefully!",
];

const WORLDS: { id: BackgroundWorld; name: string }[] = [
  { id: "original", name: "Meadow" },
  { id: "volcano", name: "Volcano" },
  { id: "space", name: "Space" },
  { id: "desert", name: "Desert" },
  { id: "jungle", name: "Jungle" },
  { id: "snowy", name: "Snowy" },
  { id: "sky", name: "Heaven" },
  { id: "cyberpunk", name: "Cyberpunk City" },
  { id: "caffeineai", name: "Caffeine" },
  { id: "zombietown", name: "ZombieTown" },
  { id: "halloween", name: "Halloween" },
  { id: "tokyo", name: "Tokyo" },
  { id: "windows", name: "Windows XP" },
  { id: "bitcoin", name: "Bitcoin" },
  { id: "matrix", name: "Matrix" },
  { id: "ocean", name: "Ocean" },
  { id: "minecraft", name: "Minecraft" },
  { id: "pumpfun", name: "pump.fun" },
  { id: "corona", name: "Corona" },
  { id: "hormuz", name: "Hormuz" },
  { id: "alien", name: "Alien" },
  { id: "dogecoin", name: "Dogecoin" },
];

const CHICKEN_COLORS = ["#8B4513", "#D2691E", "#F4A460", "#DEB887", "#CD853F"];

const START_BUTTON_CLASSES: Record<BackgroundWorld, string> = {
  original: "start-game-button-original",
  volcano: "start-game-button-volcano",
  space: "start-game-button-space",
  desert: "start-game-button-desert",
  jungle: "start-game-button-jungle",
  snowy: "start-game-button-snowy",
  sky: "start-game-button-sky",
  cyberpunk: "start-game-button-cyberpunk",
  caffeineai: "start-game-button-caffeineai",
  zombietown: "start-game-button-zombietown",
  halloween: "start-game-button-halloween",
  tokyo: "start-game-button-tokyo",
  windows: "start-game-button-windows",
  bitcoin: "start-game-button-bitcoin",
  matrix: "start-game-button-matrix",
  ocean: "start-game-button-ocean",
  minecraft: "start-game-button-minecraft",
  pumpfun: "start-game-button-pumpfun",
  corona: "start-game-button-corona",
  hormuz: "start-game-button-hormuz",
  alien: "start-game-button-alien",
  dogecoin: "start-game-button-dogecoin",
};

const StartScreen: React.FC<StartScreenProps> = ({
  onStartGame,
  selectedWorld,
  onWorldChange,
  playerData,
  gameStatistics,
  addXP,
}) => {
  const { isAuthenticated } = useInternetIdentity();
  const [overlayView, setOverlayView] = useState<OverlayView | null>(null);
  const isPumpFunSelected = selectedWorld === "pumpfun";
  const isBitcoinSelected = selectedWorld === "bitcoin";
  const isHormuzSelected = selectedWorld === "hormuz";
  const isDogecoinSelected = selectedWorld === "dogecoin";
  const isCaffeineSelected = selectedWorld === "caffeineai";
  const { data: pumpPriceData } = usePumpFunPrice();
  const { data: btcPriceData } = useBitcoinPrice();
  const { data: brentPriceData } = useBrentOilPrice();
  const { data: dogePriceData } = useDogecoinPrice();
  const [worldIndex, setWorldIndex] = useState(() => {
    const idx = WORLDS.findIndex((w) => w.id === selectedWorld);
    return idx >= 0 ? idx : 0;
  });
  const [tipIndex, setTipIndex] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animIdRef = useRef<number>(0);
  const chickensRef = useRef<StartChicken[]>([]);
  const audioRef = useRef<AudioContext | null>(null);
  const touchStartXRef = useRef(0);
  const touchCurXRef = useRef(0);

  // Transition state for smooth chicken ↔ pill/coin/fish/virus/warcraft/ufo/dogecoin swap
  // entityAlpha: current draw alpha (0..1)
  // transitionPhase: 'idle' | 'fade-out' | 'fade-in'
  // pendingEntityType: the entity type we're transitioning TO
  // "chicken" | "pumpfun" | "bitcoin" | "fish" | "virus" | "warcraft" | "ufo" | "dogecoin"
  const entityAlphaRef = useRef<number>(1);
  const transitionPhaseRef = useRef<"idle" | "fade-out" | "fade-in">("idle");
  const pendingEntityTypeRef = useRef<
    | "chicken"
    | "pumpfun"
    | "bitcoin"
    | "fish"
    | "virus"
    | "warcraft"
    | "ufo"
    | "dogecoin"
  >("chicken");
  const activeEntityTypeRef = useRef<
    | "chicken"
    | "pumpfun"
    | "bitcoin"
    | "fish"
    | "virus"
    | "warcraft"
    | "ufo"
    | "dogecoin"
  >("chicken");

  // Keep backward-compat booleans used by pill drawing (entityAlphaRef is shared)
  const pendingIsPumpFunRef = useRef<boolean>(false);
  const activeIsPumpFunRef = useRef<boolean>(false);

  // Sync worldIndex when selectedWorld prop changes
  useEffect(() => {
    const idx = WORLDS.findIndex((w) => w.id === selectedWorld);
    if (idx >= 0) setWorldIndex(idx);
  }, [selectedWorld]);

  // Trigger smooth transition when selectedWorld crosses entity-type boundaries
  useEffect(() => {
    const nextType:
      | "chicken"
      | "pumpfun"
      | "bitcoin"
      | "fish"
      | "virus"
      | "warcraft"
      | "ufo"
      | "dogecoin" =
      selectedWorld === "pumpfun"
        ? "pumpfun"
        : selectedWorld === "bitcoin"
          ? "bitcoin"
          : selectedWorld === "ocean"
            ? "fish"
            : selectedWorld === "corona"
              ? "virus"
              : selectedWorld === "hormuz"
                ? "warcraft"
                : selectedWorld === "alien"
                  ? "ufo"
                  : selectedWorld === "dogecoin"
                    ? "dogecoin"
                    : "chicken";
    if (nextType === activeEntityTypeRef.current) return; // no change
    pendingEntityTypeRef.current = nextType;
    pendingIsPumpFunRef.current = nextType === "pumpfun";
    transitionPhaseRef.current = "fade-out";
  }, [selectedWorld]);

  // Auto-rotate tips
  useEffect(() => {
    const id = setInterval(
      () => setTipIndex((i) => (i + 1) % GAME_TIPS.length),
      4000,
    );
    return () => clearInterval(id);
  }, []);

  const getAudio = useCallback((): AudioContext | null => {
    if (!audioRef.current) {
      try {
        audioRef.current = new (
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext
        )();
      } catch {
        /* ignore */
      }
    }
    return audioRef.current;
  }, []);

  const playFanfare = useCallback(() => {
    const ac = getAudio();
    if (!ac) return;
    try {
      if (ac.state === "suspended") ac.resume();
      const gain = ac.createGain();
      gain.connect(ac.destination);
      const now = ac.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.4, now + 0.05);
      gain.gain.setValueAtTime(0.5, now + 0.25);
      gain.gain.linearRampToValueAtTime(0.6, now + 0.35);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);

      const freqs = [
        [523.25, 659.25, 783.99],
        [698.46, 880.0, 1046.5],
        [783.99, 987.77, 1174.66],
      ];
      const types: OscillatorType[] = ["sine", "triangle", "square"];
      for (let i = 0; i < 3; i++) {
        const osc = ac.createOscillator();
        osc.type = types[i];
        osc.connect(gain);
        osc.frequency.setValueAtTime(freqs[0][i], now);
        osc.frequency.setValueAtTime(freqs[1][i], now + 0.15);
        osc.frequency.setValueAtTime(freqs[2][i], now + 0.3);
        osc.start(now);
        osc.stop(now + 0.8);
      }
    } catch {
      /* ignore */
    }
  }, [getAudio]);

  const playWorldSwitch = useCallback(() => {
    const ac = getAudio();
    if (!ac) return;
    try {
      if (ac.state === "suspended") ac.resume();
      const gain = ac.createGain();
      gain.connect(ac.destination);
      const now = ac.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
      gain.gain.setValueAtTime(0.2, now + 0.25);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      [
        [440, 660, 523.25],
        [523.25, 783.99, 659.25],
      ].forEach(([a, b, c], i) => {
        const osc = ac.createOscillator();
        osc.type = i === 0 ? "sine" : "triangle";
        osc.connect(gain);
        osc.frequency.setValueAtTime(a, now);
        osc.frequency.linearRampToValueAtTime(b, now + 0.15);
        osc.frequency.linearRampToValueAtTime(c, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.4);
      });
    } catch {
      /* ignore */
    }
  }, [getAudio]);

  const handleStart = useCallback(() => {
    playFanfare();
    onStartGame();
  }, [playFanfare, onStartGame]);

  const goWorld = useCallback(
    (delta: number) => {
      setWorldIndex((prev) => {
        const next = (prev + delta + WORLDS.length) % WORLDS.length;
        onWorldChange(WORLDS[next].id);
        return next;
      });
      playWorldSwitch();
    },
    [onWorldChange, playWorldSwitch],
  );

  const goTip = useCallback((delta: number) => {
    setTipIndex((prev) => (prev + delta + GAME_TIPS.length) % GAME_TIPS.length);
  }, []);

  // Touch handlers for tip swipe
  const onTipTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchCurXRef.current = e.touches[0].clientX;
  };
  const onTipTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    touchCurXRef.current = e.touches[0].clientX;
  };
  const onTipTouchEnd = () => {
    const dx = touchCurXRef.current - touchStartXRef.current;
    if (Math.abs(dx) > 50) goTip(dx > 0 ? -1 : 1);
  };

  // Canvas chicken drawing
  const makeChicken = useCallback((canvas: HTMLCanvasElement): StartChicken => {
    const sizes = [25, 40, 60, 80];
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    const dir: "left-to-right" | "right-to-left" =
      Math.random() < 0.5 ? "left-to-right" : "right-to-left";
    const base = size <= 25 ? 1.5 : size <= 40 ? 1.2 : size <= 60 ? 1.0 : 0.8;
    return {
      id: Date.now() + Math.random(),
      x: dir === "left-to-right" ? -size : canvas.width + size,
      y: 50 + Math.random() * (canvas.height * 0.8 - 100),
      speed: dir === "left-to-right" ? base : -base,
      size,
      color: CHICKEN_COLORS[Math.floor(Math.random() * CHICKEN_COLORS.length)],
      wingPhase: Math.random() * Math.PI * 2,
      direction: dir,
      isRocket: Math.random() < 0.5,
    };
  }, []);

  const drawChicken = useCallback(
    (ctx: CanvasRenderingContext2D, c: StartChicken) => {
      const { x, y, size, color, wingPhase, direction } = c;
      ctx.save();
      ctx.translate(x + size / 2, y + size / 2);
      if (direction === "left-to-right") ctx.scale(-1, 1);

      const wo = Math.sin(wingPhase) * 0.3;
      const wr = Math.sin(wingPhase) * 0.4;

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.35, size * 0.25, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#654321";
      ctx.lineWidth = 1;
      ctx.stroke();

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
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = "#FFA500";
      ctx.beginPath();
      ctx.moveTo(-size * 0.4, -size * 0.15);
      ctx.lineTo(-size * 0.5, -size * 0.1);
      ctx.lineTo(-size * 0.4, -size * 0.05);
      ctx.closePath();
      ctx.fill();

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

      ctx.save();
      ctx.rotate(wr);
      ctx.translate(0, wo * size * 0.1);
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
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.restore();

      ctx.strokeStyle = "#FFA500";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-size * 0.1, size * 0.22);
      ctx.lineTo(-size * 0.12, size * 0.35);
      ctx.moveTo(size * 0.05, size * 0.22);
      ctx.lineTo(size * 0.03, size * 0.35);
      ctx.stroke();
      ctx.lineWidth = 2;
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

  // Draw pump.fun pill (angel-wing capsule) — mirrors GameScreen.drawPumpFunPill
  const drawPumpFunPill = useCallback(
    (ctx: CanvasRenderingContext2D, c: StartChicken) => {
      const { x, y, size, wingPhase, direction } = c;
      const cx = x + size / 2;
      const cy = y + size / 2;

      // Map size bucket → pill dimensions (ph = capsule height as size reference)
      let pw: number;
      let ph: number;
      if (size <= 25) {
        pw = 50;
        ph = 22;
      } else if (size <= 40) {
        pw = 80;
        ph = 34;
      } else {
        pw = 110;
        ph = 48;
      }
      const pr = ph / 2;
      const ws = pw / 130; // wing scale

      ctx.save();
      ctx.translate(cx, cy);
      if (direction === "left-to-right") ctx.scale(-1, 1);
      ctx.rotate((Math.PI * 40) / 180); // 40° tilt

      const flapAngle = Math.sin(wingPhase) * 0.35;
      const wingFill = "rgba(255,255,255,0.95)";
      const wingFillInner = "rgba(230,240,255,0.75)";
      const wingStroke = "#D4AF37";

      const drawWingUp = () => {
        ctx.fillStyle = wingFill;
        ctx.strokeStyle = wingStroke;
        ctx.lineWidth = 1.0 * ws;
        ctx.globalAlpha = 0.97 * entityAlphaRef.current;

        // Feather 1
        ctx.beginPath();
        ctx.moveTo(-3 * ws, 0);
        ctx.bezierCurveTo(
          -8 * ws,
          -10 * ws,
          -4 * ws,
          -20 * ws,
          6 * ws,
          -22 * ws,
        );
        ctx.bezierCurveTo(4 * ws, -14 * ws, 2 * ws, -6 * ws, 3 * ws, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Feather 2
        ctx.beginPath();
        ctx.moveTo(-2 * ws, -2 * ws);
        ctx.bezierCurveTo(
          -14 * ws,
          -14 * ws,
          -20 * ws,
          -28 * ws,
          -10 * ws,
          -36 * ws,
        );
        ctx.bezierCurveTo(-6 * ws, -28 * ws, 0, -16 * ws, 2 * ws, -4 * ws);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Feather 3 (primary)
        ctx.fillStyle = wingFillInner;
        ctx.beginPath();
        ctx.moveTo(4 * ws, -1 * ws);
        ctx.bezierCurveTo(0, -18 * ws, -8 * ws, -34 * ws, -20 * ws, -44 * ws);
        ctx.bezierCurveTo(-24 * ws, -36 * ws, -18 * ws, -22 * ws, 0, -6 * ws);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Feather 4 (outermost tip)
        ctx.fillStyle = wingFill;
        ctx.beginPath();
        ctx.moveTo(2 * ws, -4 * ws);
        ctx.bezierCurveTo(
          -6 * ws,
          -22 * ws,
          -18 * ws,
          -38 * ws,
          -30 * ws,
          -46 * ws,
        );
        ctx.bezierCurveTo(
          -30 * ws,
          -38 * ws,
          -22 * ws,
          -26 * ws,
          -4 * ws,
          -10 * ws,
        );
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      };

      // Top wing (sweeps upward from top of seam)
      ctx.save();
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.translate(0, -ph / 2);
      ctx.rotate(-flapAngle);
      drawWingUp();
      ctx.restore();

      // Bottom wing (mirror, sweeps downward)
      ctx.save();
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.translate(0, ph / 2);
      ctx.scale(1, -1);
      ctx.rotate(flapAngle);
      drawWingUp();
      ctx.restore();

      ctx.globalAlpha = entityAlphaRef.current;

      // Pill body — green (left) half
      ctx.save();
      ctx.beginPath();
      ctx.rect(-pw / 2, -ph / 2, pw / 2, ph);
      ctx.clip();
      const lgLeft = ctx.createLinearGradient(
        -pw / 2,
        -ph / 2,
        -pw / 2,
        ph / 2,
      );
      lgLeft.addColorStop(0, "#4ADE80");
      lgLeft.addColorStop(1, "#22C55E");
      ctx.fillStyle = lgLeft;
      ctx.beginPath();
      ctx.roundRect(-pw / 2, -ph / 2, pw, ph, pr);
      ctx.fill();
      ctx.restore();

      // Pill body — white (right) half
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, -ph / 2, pw / 2, ph);
      ctx.clip();
      const lgRight = ctx.createLinearGradient(0, -ph / 2, 0, ph / 2);
      lgRight.addColorStop(0, "#FFFFFF");
      lgRight.addColorStop(1, "#F0F0F0");
      ctx.fillStyle = lgRight;
      ctx.beginPath();
      ctx.roundRect(-pw / 2, -ph / 2, pw, ph, pr);
      ctx.fill();
      ctx.restore();

      // Dark border
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-pw / 2, -ph / 2, pw, ph, pr);
      ctx.stroke();

      // Gray seam line
      ctx.strokeStyle = "#888888";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, -ph / 2);
      ctx.lineTo(0, ph / 2);
      ctx.stroke();

      // Gloss highlight
      ctx.save();
      ctx.beginPath();
      ctx.rect(-pw / 2, -ph / 2, pw / 2, ph);
      ctx.clip();
      const glossGrad = ctx.createRadialGradient(
        -pw * 0.25,
        -ph * 0.25,
        1,
        -pw * 0.25,
        -ph * 0.25,
        ph * 0.55,
      );
      glossGrad.addColorStop(0, "rgba(255,255,255,0.55)");
      glossGrad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = glossGrad;
      ctx.beginPath();
      ctx.ellipse(
        -pw * 0.2,
        -ph * 0.2,
        pw * 0.18,
        ph * 0.22,
        0,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      ctx.restore();

      ctx.globalAlpha = 1;
      ctx.restore();
    },
    [],
  );

  // Draw Bitcoin coin — golden circle with official white ₿ symbol
  const drawBitcoinCoin = useCallback(
    (ctx: CanvasRenderingContext2D, c: StartChicken) => {
      const { x, y, size, wingPhase, direction } = c;
      const cx = x + size / 2;
      const cy = y + size / 2;

      // Map size bucket → coin radius
      let r: number;
      if (size <= 25) {
        r = 14;
      } else if (size <= 40) {
        r = 22;
      } else {
        r = 32;
      }

      const bob = Math.sin(wingPhase) * 2.5;
      const alpha = entityAlphaRef.current;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(cx, cy + bob);
      // No horizontal flip needed for coins (symmetric)
      void direction;

      // Edge ring
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.strokeStyle = "#B8860B";
      ctx.lineWidth = r * 0.12;
      ctx.stroke();

      // Body gradient
      const grad = ctx.createRadialGradient(
        -r * 0.3,
        -r * 0.3,
        r * 0.05,
        0,
        0,
        r,
      );
      grad.addColorStop(0, "#FFE066");
      grad.addColorStop(0.45, "#F7931A");
      grad.addColorStop(1, "#8B5E00");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();

      // Gloss
      const gloss = ctx.createRadialGradient(
        -r * 0.32,
        -r * 0.32,
        0,
        -r * 0.32,
        -r * 0.32,
        r * 0.55,
      );
      gloss.addColorStop(0, "rgba(255,255,255,0.55)");
      gloss.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gloss;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();

      // ₿ symbol
      const btcScale = (r * 1.15) / 100;
      ctx.save();
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.scale(btcScale, btcScale);
      ctx.translate(-40, -60);
      ctx.rotate((14 * Math.PI) / 180);
      ctx.fillStyle = "#FFFFFF";
      ctx.globalAlpha = 0.95 * alpha;
      const p = new Path2D(
        "M78.3 36.6c1.8-12.2-7.5-18.8-20.2-23.2l4.1-16.6-10.1-2.5-4 16.1c-2.7-.7-5.4-1.3-8.1-1.9l4.1-16.3-10.1-2.5-4.1 16.6c-2.2-.5-4.4-1-6.5-1.5l0 0-13.9-3.5-2.7 10.8s7.5 1.7 7.4 1.8c4.1 1 4.8 3.7 4.7 5.9l-4.7 18.8c.3.1.7.2 1.1.3-.4-.1-.7-.2-1.1-.3l-6.6 26.4c-.5 1.2-1.8 3-4.6 2.3.1.1-7.4-1.9-7.4-1.9l-5.1 11.5 13.2 3.3c2.4.6 4.8 1.2 7.2 1.9l-4.2 16.7 10.1 2.5 4.1-16.6c2.8.7 5.5 1.4 8.2 2.1l-4.1 16.5 10.1 2.5 4.2-16.8c17.3 3.3 30.3 1.9 35.8-13.6 4.4-12.6.2-19.9-9.3-24.6 6.6-1.5 11.6-5.9 12.9-14.7zm-23.1 32.4c-3.1 12.6-24.3 5.8-31.2 4.1l5.6-22.3c6.9 1.7 28.9 5.1 25.6 18.2zm3.1-32.7c-2.9 11.5-20.5 5.7-26.2 4.2l5-20.1c5.7 1.4 24.1 4.1 21.2 15.9z",
      );
      ctx.fill(p);
      ctx.restore();

      ctx.globalAlpha = 1;
      ctx.restore();
    },
    [],
  );

  // Draw Dogecoin coin — uses provided JPEG asset, clipped to circle
  const dogeCoinImgRef = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    const img = new Image();
    img.src = "/assets/img_8762-019dd4d8-8dae-77d4-bc88-50b76c9a6fff.jpeg";
    dogeCoinImgRef.current = img;
  }, []);

  const drawDogecoinCoin = useCallback(
    (ctx: CanvasRenderingContext2D, c: StartChicken) => {
      const { x, y, size, wingPhase, direction } = c;
      const cx = x + size / 2;
      const cy = y + size / 2;

      let r: number;
      if (size <= 25) {
        r = 14;
      } else if (size <= 40) {
        r = 22;
      } else {
        r = 32;
      }

      const bob = Math.sin(wingPhase) * 2.5;
      const alpha = entityAlphaRef.current;
      const img = dogeCoinImgRef.current;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(cx, cy + bob);

      // Mirror when flying left-to-right
      if (direction === "left-to-right") ctx.scale(-1, 1);

      // Clip to circle
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.clip();

      if (img?.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, -r, -r, r * 2, r * 2);
      } else {
        // Fallback gradient
        const grad = ctx.createRadialGradient(
          -r * 0.3,
          -r * 0.3,
          r * 0.05,
          0,
          0,
          r,
        );
        grad.addColorStop(0, "#FFF3A0");
        grad.addColorStop(0.45, "#FFC200");
        grad.addColorStop(1, "#8B6400");
        ctx.fillStyle = grad;
        ctx.fill();
      }

      ctx.restore();

      // Border ring (drawn outside clip region)
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(cx, cy + bob);
      if (direction === "right-to-left") ctx.scale(-1, 1);
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.strokeStyle = "#B8860B";
      ctx.lineWidth = r * 0.1;
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.restore();
    },
    [],
  );

  // Draw ocean fish — colorful deep-sea / tropical fish, mirrors GameScreen.drawOceanFish
  const drawOceanFish = useCallback(
    (ctx: CanvasRenderingContext2D, c: StartChicken) => {
      const { x, y, size, wingPhase, direction } = c;
      const cx = x + size / 2;
      const cy = y + size / 2;

      // Fish dimensions based on size bucket
      let fw: number;
      let fh: number;
      if (size <= 25) {
        fw = 48;
        fh = 20;
      } else if (size <= 40) {
        fw = 76;
        fh = 32;
      } else {
        fw = 108;
        fh = 46;
      }

      const tailWag = Math.sin(wingPhase) * 0.28;
      const finFlutter = Math.sin(wingPhase * 1.3) * 0.18;
      const alpha = entityAlphaRef.current;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(cx, cy);
      if (direction === "left-to-right") ctx.scale(-1, 1);

      ctx.shadowColor = "#00BFFF";
      ctx.shadowBlur = 10;

      // Tail fin
      ctx.save();
      ctx.translate(fw * 0.38, 0);
      ctx.rotate(tailWag);
      const tailGrad = ctx.createLinearGradient(0, -fh * 0.6, 0, fh * 0.6);
      tailGrad.addColorStop(0, "#CE93D8");
      tailGrad.addColorStop(1, "#7B1FA2");
      ctx.fillStyle = tailGrad;
      ctx.strokeStyle = "#4A148C";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(
        fw * 0.18,
        -fh * 0.55,
        fw * 0.32,
        -fh * 0.65,
        fw * 0.42,
        -fh * 0.55,
      );
      ctx.bezierCurveTo(fw * 0.34, -fh * 0.18, fw * 0.2, -fh * 0.06, 0, 0);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(
        fw * 0.18,
        fh * 0.55,
        fw * 0.32,
        fh * 0.65,
        fw * 0.42,
        fh * 0.55,
      );
      ctx.bezierCurveTo(fw * 0.34, fh * 0.18, fw * 0.2, fh * 0.06, 0, 0);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Body
      const bodyGrad = ctx.createRadialGradient(
        -fw * 0.15,
        -fh * 0.1,
        fh * 0.05,
        0,
        0,
        fh * 0.72,
      );
      bodyGrad.addColorStop(0, "#80DEEA");
      bodyGrad.addColorStop(0.3, "#26C6DA");
      bodyGrad.addColorStop(0.65, "#F48FB1");
      bodyGrad.addColorStop(1, "#7B1FA2");
      ctx.fillStyle = bodyGrad;
      ctx.strokeStyle = "#1565C0";
      ctx.lineWidth = Math.max(1, fh * 0.04);
      ctx.beginPath();
      ctx.ellipse(0, 0, fw * 0.42, fh * 0.42, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Scales
      ctx.strokeStyle = "rgba(255,255,255,0.2)";
      ctx.lineWidth = Math.max(0.5, fh * 0.025);
      const scaleRows = size <= 25 ? 2 : 3;
      const scaleCols = size <= 25 ? 3 : 4;
      for (let row = 0; row < scaleRows; row++) {
        for (let col = 0; col < scaleCols; col++) {
          const sx = -fw * 0.2 + col * fw * 0.14;
          const sy = -fh * 0.15 + row * fh * 0.18;
          ctx.beginPath();
          ctx.arc(sx, sy, fh * 0.1, Math.PI * 0.2, Math.PI * 0.8);
          ctx.stroke();
        }
      }

      // Dorsal fin
      ctx.save();
      ctx.rotate(finFlutter * 0.5);
      const dorsalGrad = ctx.createLinearGradient(0, -fh * 0.42, 0, -fh * 0.85);
      dorsalGrad.addColorStop(0, "#80DEEA");
      dorsalGrad.addColorStop(1, "rgba(100,200,220,0)");
      ctx.fillStyle = dorsalGrad;
      ctx.strokeStyle = "#0097A7";
      ctx.lineWidth = Math.max(0.8, fh * 0.03);
      ctx.beginPath();
      ctx.moveTo(-fw * 0.15, -fh * 0.38);
      ctx.bezierCurveTo(
        -fw * 0.05,
        -fh * 0.85,
        fw * 0.12,
        -fh * 0.8,
        fw * 0.22,
        -fh * 0.38,
      );
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Pectoral fin
      ctx.save();
      ctx.translate(-fw * 0.05, fh * 0.1);
      ctx.rotate(finFlutter);
      ctx.fillStyle = "rgba(180,240,255,0.7)";
      ctx.strokeStyle = "#0097A7";
      ctx.lineWidth = Math.max(0.6, fh * 0.025);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(
        -fw * 0.08,
        fh * 0.28,
        fw * 0.08,
        fh * 0.35,
        fw * 0.18,
        fh * 0.18,
      );
      ctx.bezierCurveTo(fw * 0.08, fh * 0.08, -fw * 0.02, fh * 0.04, 0, 0);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Gloss
      const gloss = ctx.createRadialGradient(
        -fw * 0.18,
        -fh * 0.18,
        0,
        -fw * 0.08,
        -fh * 0.08,
        fh * 0.38,
      );
      gloss.addColorStop(0, "rgba(255,255,255,0.5)");
      gloss.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gloss;
      ctx.beginPath();
      ctx.ellipse(
        -fw * 0.1,
        -fh * 0.1,
        fw * 0.22,
        fh * 0.2,
        -0.3,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      // White stripe
      ctx.strokeStyle = "rgba(255,255,255,0.35)";
      ctx.lineWidth = Math.max(1, fh * 0.07);
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-fw * 0.02, -fh * 0.36);
      ctx.bezierCurveTo(
        -fw * 0.02,
        -fh * 0.1,
        fw * 0.04,
        fh * 0.1,
        fw * 0.0,
        fh * 0.36,
      );
      ctx.stroke();

      // Eye
      const eyeX = -fw * 0.28;
      const eyeY = -fh * 0.06;
      const eyeR = Math.max(2, fh * 0.1);
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, eyeR, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#00BCD4";
      ctx.beginPath();
      ctx.arc(eyeX - eyeR * 0.1, eyeY, eyeR * 0.72, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(eyeX - eyeR * 0.15, eyeY, eyeR * 0.36, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.beginPath();
      ctx.arc(
        eyeX - eyeR * 0.2,
        eyeY - eyeR * 0.28,
        eyeR * 0.18,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      // Mouth
      ctx.strokeStyle = "#1565C0";
      ctx.lineWidth = Math.max(0.8, fh * 0.04);
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-fw * 0.41, -fh * 0.04);
      ctx.quadraticCurveTo(-fw * 0.44, fh * 0.04, -fw * 0.41, fh * 0.1);
      ctx.stroke();

      // Bioluminescent spots
      const spotPositions = [
        { sx: fw * 0.05, sy: -fh * 0.12, sr: fh * 0.05 },
        { sx: fw * 0.15, sy: fh * 0.08, sr: fh * 0.04 },
        { sx: -fw * 0.08, sy: fh * 0.14, sr: fh * 0.035 },
      ];
      for (const sp of spotPositions) {
        const spotGlow = ctx.createRadialGradient(
          sp.sx,
          sp.sy,
          0,
          sp.sx,
          sp.sy,
          sp.sr,
        );
        spotGlow.addColorStop(0, "rgba(150,255,255,0.75)");
        spotGlow.addColorStop(1, "rgba(0,200,200,0)");
        ctx.fillStyle = spotGlow;
        ctx.beginPath();
        ctx.arc(sp.sx, sp.sy, sp.sr, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.restore();
    },
    [],
  );

  // ─── Coronavirus particle drawing ────────────────────────────────────────────
  const drawCoronaVirus = useCallback(
    (ctx: CanvasRenderingContext2D, c: StartChicken) => {
      const { x, y, size, wingPhase, direction } = c;
      const cx = x + size / 2;
      const cy = y + size / 2;

      // Size tiers by size bucket (matches distance: far/medium/close)
      let r: number; // body radius
      let spikeLen: number; // spike length
      if (size <= 25) {
        r = 16;
        spikeLen = 10;
      } else if (size <= 40) {
        r = 28;
        spikeLen = 16;
      } else {
        r = 42;
        spikeLen = 24;
      }

      const alpha = entityAlphaRef.current;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(cx, cy);
      // Mirror based on direction of travel
      if (direction === "left-to-right") ctx.scale(-1, 1);

      // Glow
      ctx.shadowColor = "#CC0000";
      ctx.shadowBlur = 8;

      // ── Spikes first (behind body) ──
      const NUM_SPIKES = 14;
      for (let i = 0; i < NUM_SPIKES; i++) {
        const angle = (i / NUM_SPIKES) * Math.PI * 2;
        // Subtle oscillation via wingPhase
        const tipR = r + spikeLen + Math.sin(wingPhase + i) * 0.5;
        const stemX1 = Math.cos(angle) * r * 0.85;
        const stemY1 = Math.sin(angle) * r * 0.85;
        const tipX = Math.cos(angle) * (r + spikeLen);
        const tipY = Math.sin(angle) * (r + spikeLen);
        const bulbR = spikeLen * 0.28 + Math.sin(wingPhase + i) * 0.5;

        // Spike stem
        ctx.strokeStyle = "#8B0000";
        ctx.lineWidth = Math.max(1, r * 0.09);
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(stemX1, stemY1);
        ctx.lineTo(tipX, tipY);
        ctx.stroke();

        // Bulbous tip
        const tipGrad = ctx.createRadialGradient(
          tipX - bulbR * 0.3,
          tipY - bulbR * 0.3,
          bulbR * 0.1,
          tipX,
          tipY,
          tipR * 0.12 + bulbR,
        );
        tipGrad.addColorStop(0, "#FF4444");
        tipGrad.addColorStop(0.5, "#CC0000");
        tipGrad.addColorStop(1, "#8B0000");
        ctx.fillStyle = tipGrad;
        ctx.beginPath();
        ctx.arc(tipX, tipY, bulbR, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Main body sphere ──
      const bodyGrad = ctx.createRadialGradient(
        -r * 0.3,
        -r * 0.3,
        r * 0.05,
        0,
        0,
        r,
      );
      bodyGrad.addColorStop(0, "#E8E8E8");
      bodyGrad.addColorStop(0.35, "#C0C0C0");
      bodyGrad.addColorStop(0.7, "#A8A8A8");
      bodyGrad.addColorStop(1, "#6A6A6A");
      ctx.fillStyle = bodyGrad;
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();
      // Subtle dark outline
      ctx.strokeStyle = "rgba(80,80,80,0.5)";
      ctx.lineWidth = Math.max(0.5, r * 0.04);
      ctx.stroke();

      // ── Surface M-protein dots ──
      const NUM_DOTS = 10;
      for (let i = 0; i < NUM_DOTS; i++) {
        const angle = (i / NUM_DOTS) * Math.PI * 2 + Math.PI * 0.15;
        const dotDist = r * 0.62;
        const dx = Math.cos(angle) * dotDist;
        const dy = Math.sin(angle) * dotDist;
        const dotR = Math.max(1.5, r * 0.1);
        ctx.fillStyle = "#FFA500";
        ctx.beginPath();
        ctx.arc(dx, dy, dotR, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Top-left highlight ──
      const gloss = ctx.createRadialGradient(
        -r * 0.32,
        -r * 0.32,
        r * 0.02,
        -r * 0.2,
        -r * 0.2,
        r * 0.55,
      );
      gloss.addColorStop(0, "rgba(255,255,255,0.55)");
      gloss.addColorStop(0.5, "rgba(255,255,255,0.12)");
      gloss.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gloss;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 1;
      ctx.restore();
    },
    [],
  );

  // Draw Hormuz warcraft — premium rockets and fighter jets, random mix per entity
  const drawHormuzWarcraft = useCallback(
    (ctx: CanvasRenderingContext2D, c: StartChicken) => {
      const { x, y, size, wingPhase, direction } = c;
      const cx = x + size / 2;
      const cy = y + size / 2;

      // Dimensions by size bucket: small/medium/large
      let w: number;
      let h: number;
      if (size <= 25) {
        w = 42;
        h = 13;
      } else if (size <= 40) {
        w = 70;
        h = 22;
      } else {
        w = 102;
        h = 32;
      }

      const alpha = entityAlphaRef.current;
      const isRocket = c.isRocket ?? false;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(cx, cy);
      // Mirror so craft faces its direction of travel
      if (direction === "left-to-right") ctx.scale(-1, 1);

      if (isRocket) {
        // ── Premium Military Rocket / Missile ──
        // Animated exhaust flame behind tail (time-based pulse)
        const t = Date.now();
        const flicker1 = 0.82 + 0.18 * Math.sin(t * 0.011);
        const flicker2 = 0.88 + 0.12 * Math.sin(t * 0.017 + 1.3);
        const flickerAlpha = 0.78 + 0.22 * Math.sin(t * 0.009 + 2.1);

        const rearX = w * 0.36;
        const flameBase = h * 0.28;
        const flameLenOuter = w * 0.52 * flicker1;
        const flameLenCore = w * 0.36 * flicker2;

        // Outer halo
        const flameHaloGrad = ctx.createLinearGradient(
          rearX,
          0,
          rearX + flameLenOuter,
          0,
        );
        flameHaloGrad.addColorStop(0, `rgba(255,130,30,${0.4 * flickerAlpha})`);
        flameHaloGrad.addColorStop(
          0.5,
          `rgba(255,70,0,${0.22 * flickerAlpha})`,
        );
        flameHaloGrad.addColorStop(1, "rgba(255,30,0,0)");
        ctx.fillStyle = flameHaloGrad;
        ctx.beginPath();
        ctx.moveTo(rearX, -flameBase * 1.0);
        ctx.bezierCurveTo(
          rearX + flameLenOuter * 0.4,
          -flameBase * 0.7,
          rearX + flameLenOuter * 0.8,
          -flameBase * 0.2,
          rearX + flameLenOuter,
          0,
        );
        ctx.bezierCurveTo(
          rearX + flameLenOuter * 0.8,
          flameBase * 0.2,
          rearX + flameLenOuter * 0.4,
          flameBase * 0.7,
          rearX,
          flameBase * 1.0,
        );
        ctx.closePath();
        ctx.fill();
        // Mid flame
        const flameMidGrad = ctx.createLinearGradient(
          rearX,
          0,
          rearX + flameLenCore * 1.25,
          0,
        );
        flameMidGrad.addColorStop(0, `rgba(255,210,60,${0.82 * flickerAlpha})`);
        flameMidGrad.addColorStop(
          0.35,
          `rgba(255,110,10,${0.6 * flickerAlpha})`,
        );
        flameMidGrad.addColorStop(1, "rgba(255,50,0,0)");
        ctx.fillStyle = flameMidGrad;
        ctx.beginPath();
        ctx.moveTo(rearX, -flameBase * 0.62);
        ctx.bezierCurveTo(
          rearX + flameLenCore * 0.45,
          -flameBase * 0.38,
          rearX + flameLenCore * 0.9,
          -flameBase * 0.1,
          rearX + flameLenCore * 1.25,
          0,
        );
        ctx.bezierCurveTo(
          rearX + flameLenCore * 0.9,
          flameBase * 0.1,
          rearX + flameLenCore * 0.45,
          flameBase * 0.38,
          rearX,
          flameBase * 0.62,
        );
        ctx.closePath();
        ctx.fill();
        // White-hot core
        const flameCoreGrad = ctx.createLinearGradient(
          rearX,
          0,
          rearX + flameLenCore * 0.7,
          0,
        );
        flameCoreGrad.addColorStop(
          0,
          `rgba(255,255,255,${0.95 * flickerAlpha})`,
        );
        flameCoreGrad.addColorStop(
          0.4,
          `rgba(255,230,100,${0.8 * flickerAlpha})`,
        );
        flameCoreGrad.addColorStop(1, "rgba(255,120,0,0)");
        ctx.fillStyle = flameCoreGrad;
        ctx.beginPath();
        ctx.moveTo(rearX, -flameBase * 0.28);
        ctx.bezierCurveTo(
          rearX + flameLenCore * 0.35,
          -flameBase * 0.15,
          rearX + flameLenCore * 0.6,
          -flameBase * 0.04,
          rearX + flameLenCore * 0.7,
          0,
        );
        ctx.bezierCurveTo(
          rearX + flameLenCore * 0.6,
          flameBase * 0.04,
          rearX + flameLenCore * 0.35,
          flameBase * 0.15,
          rearX,
          flameBase * 0.28,
        );
        ctx.closePath();
        ctx.fill();

        // Rocket cylindrical body — silver-white metallic gradient
        const bodyMetalGrad = ctx.createLinearGradient(0, -h * 0.5, 0, h * 0.5);
        bodyMetalGrad.addColorStop(0, "#F0F0F8");
        bodyMetalGrad.addColorStop(0.18, "#D8D8E8");
        bodyMetalGrad.addColorStop(0.5, "#B0B0C8");
        bodyMetalGrad.addColorStop(0.82, "#D0D0E0");
        bodyMetalGrad.addColorStop(1, "#E8E8F0");
        ctx.fillStyle = bodyMetalGrad;
        ctx.beginPath();
        ctx.roundRect(-w * 0.38, -h * 0.22, w * 0.74, h * 0.44, h * 0.08);
        ctx.fill();
        ctx.strokeStyle = "#50506A";
        ctx.lineWidth = Math.max(0.8, h * 0.05);
        ctx.stroke();

        // Pointed ogive nose cone — silver-white to slightly darker tip
        const noseGrad = ctx.createLinearGradient(
          -w * 0.52,
          -h * 0.22,
          -w * 0.52,
          h * 0.22,
        );
        noseGrad.addColorStop(0, "#E8E8F0");
        noseGrad.addColorStop(0.5, "#C0C0D0");
        noseGrad.addColorStop(1, "#E8E8F0");
        ctx.fillStyle = noseGrad;
        ctx.beginPath();
        ctx.moveTo(-w * 0.38, -h * 0.22);
        ctx.bezierCurveTo(
          -w * 0.44,
          -h * 0.1,
          -w * 0.53,
          -h * 0.04,
          -w * 0.54,
          0,
        );
        ctx.bezierCurveTo(
          -w * 0.53,
          h * 0.04,
          -w * 0.44,
          h * 0.1,
          -w * 0.38,
          h * 0.22,
        );
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "#50506A";
        ctx.lineWidth = Math.max(0.8, h * 0.05);
        ctx.stroke();

        // Red warning band #1 — near nose
        ctx.fillStyle = "#CC1111";
        ctx.beginPath();
        ctx.roundRect(-w * 0.26, -h * 0.22, w * 0.09, h * 0.44, h * 0.04);
        ctx.fill();

        // Red warning band #2 — near tail
        ctx.fillStyle = "#CC1111";
        ctx.beginPath();
        ctx.roundRect(w * 0.08, -h * 0.22, w * 0.09, h * 0.44, h * 0.04);
        ctx.fill();

        // Subtle center seam line
        ctx.strokeStyle = "rgba(80,80,100,0.4)";
        ctx.lineWidth = Math.max(0.5, h * 0.03);
        ctx.setLineDash([h * 0.12, h * 0.08]);
        ctx.beginPath();
        ctx.moveTo(-w * 0.3, 0);
        ctx.lineTo(w * 0.35, 0);
        ctx.stroke();
        ctx.setLineDash([]);

        // 4 cruciform stabilizer fins at tail — top/bottom/front/back
        ctx.fillStyle = "#404050";
        ctx.strokeStyle = "#28282E";
        ctx.lineWidth = Math.max(0.5, h * 0.04);
        // Top fin
        ctx.beginPath();
        ctx.moveTo(w * 0.22, -h * 0.22);
        ctx.lineTo(w * 0.18, -h * 0.55);
        ctx.lineTo(w * 0.36, -h * 0.22);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        // Bottom fin
        ctx.beginPath();
        ctx.moveTo(w * 0.22, h * 0.22);
        ctx.lineTo(w * 0.18, h * 0.55);
        ctx.lineTo(w * 0.36, h * 0.22);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        // Small forward upper fin
        ctx.beginPath();
        ctx.moveTo(w * 0.14, -h * 0.22);
        ctx.lineTo(w * 0.12, -h * 0.38);
        ctx.lineTo(w * 0.24, -h * 0.22);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        // Small forward lower fin
        ctx.beginPath();
        ctx.moveTo(w * 0.14, h * 0.22);
        ctx.lineTo(w * 0.12, h * 0.38);
        ctx.lineTo(w * 0.24, h * 0.22);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Gloss highlight along top of body
        const glossGrad = ctx.createLinearGradient(
          -w * 0.36,
          -h * 0.22,
          w * 0.34,
          -h * 0.22,
        );
        glossGrad.addColorStop(0, "rgba(255,255,255,0)");
        glossGrad.addColorStop(0.2, "rgba(255,255,255,0.45)");
        glossGrad.addColorStop(0.8, "rgba(255,255,255,0.35)");
        glossGrad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = glossGrad;
        ctx.beginPath();
        ctx.roundRect(-w * 0.36, -h * 0.22, w * 0.7, h * 0.1, h * 0.04);
        ctx.fill();
      } else {
        // ── Premium Fighter Jet (F-22 Raptor silhouette) ──
        const bob = Math.sin(wingPhase) * 1.5;
        ctx.translate(0, bob);

        // Animated twin engine afterburner (time-based pulse)
        const t = Date.now();
        const abFlicker1 = 0.8 + 0.2 * Math.sin(t * 0.013);
        const abFlicker2 = 0.85 + 0.15 * Math.sin(t * 0.019 + 0.9);
        const abAlpha = 0.75 + 0.25 * Math.sin(t * 0.008 + 1.7);

        const abBaseX = w * 0.4;
        const abLenOuter = w * 0.3 * abFlicker1;
        const abLenCore = w * 0.2 * abFlicker2;
        const abRadOuter = h * 0.18;
        const abRadCore = h * 0.1;

        const drawABFlame = (yOff: number) => {
          const outerGrad = ctx.createLinearGradient(
            abBaseX,
            yOff,
            abBaseX + abLenOuter,
            yOff,
          );
          outerGrad.addColorStop(0, `rgba(255,150,30,${0.38 * abAlpha})`);
          outerGrad.addColorStop(0.55, `rgba(255,70,0,${0.2 * abAlpha})`);
          outerGrad.addColorStop(1, "rgba(255,30,0,0)");
          ctx.fillStyle = outerGrad;
          ctx.beginPath();
          ctx.moveTo(abBaseX, yOff - abRadOuter);
          ctx.bezierCurveTo(
            abBaseX + abLenOuter * 0.4,
            yOff - abRadOuter * 0.65,
            abBaseX + abLenOuter * 0.8,
            yOff - abRadOuter * 0.15,
            abBaseX + abLenOuter,
            yOff,
          );
          ctx.bezierCurveTo(
            abBaseX + abLenOuter * 0.8,
            yOff + abRadOuter * 0.15,
            abBaseX + abLenOuter * 0.4,
            yOff + abRadOuter * 0.65,
            abBaseX,
            yOff + abRadOuter,
          );
          ctx.closePath();
          ctx.fill();
          const midGrad = ctx.createLinearGradient(
            abBaseX,
            yOff,
            abBaseX + abLenCore * 1.3,
            yOff,
          );
          midGrad.addColorStop(0, `rgba(255,210,50,${0.82 * abAlpha})`);
          midGrad.addColorStop(0.4, `rgba(255,100,10,${0.55 * abAlpha})`);
          midGrad.addColorStop(1, "rgba(255,40,0,0)");
          ctx.fillStyle = midGrad;
          ctx.beginPath();
          ctx.moveTo(abBaseX, yOff - abRadCore * 1.1);
          ctx.bezierCurveTo(
            abBaseX + abLenCore * 0.5,
            yOff - abRadCore * 0.7,
            abBaseX + abLenCore * 0.95,
            yOff - abRadCore * 0.15,
            abBaseX + abLenCore * 1.3,
            yOff,
          );
          ctx.bezierCurveTo(
            abBaseX + abLenCore * 0.95,
            yOff + abRadCore * 0.15,
            abBaseX + abLenCore * 0.5,
            yOff + abRadCore * 0.7,
            abBaseX,
            yOff + abRadCore * 1.1,
          );
          ctx.closePath();
          ctx.fill();
          const coreGrad = ctx.createLinearGradient(
            abBaseX,
            yOff,
            abBaseX + abLenCore * 0.7,
            yOff,
          );
          coreGrad.addColorStop(0, `rgba(255,255,240,${0.95 * abAlpha})`);
          coreGrad.addColorStop(0.45, `rgba(255,220,80,${0.75 * abAlpha})`);
          coreGrad.addColorStop(1, "rgba(255,100,0,0)");
          ctx.fillStyle = coreGrad;
          ctx.beginPath();
          ctx.moveTo(abBaseX, yOff - abRadCore * 0.5);
          ctx.bezierCurveTo(
            abBaseX + abLenCore * 0.35,
            yOff - abRadCore * 0.28,
            abBaseX + abLenCore * 0.6,
            yOff - abRadCore * 0.06,
            abBaseX + abLenCore * 0.7,
            yOff,
          );
          ctx.bezierCurveTo(
            abBaseX + abLenCore * 0.6,
            yOff + abRadCore * 0.06,
            abBaseX + abLenCore * 0.35,
            yOff + abRadCore * 0.28,
            abBaseX,
            yOff + abRadCore * 0.5,
          );
          ctx.closePath();
          ctx.fill();
        };

        drawABFlame(-h * 0.1);
        drawABFlame(h * 0.1);

        // Swept delta wing (F-22 planform) — main lifting surface
        const wingTopGrad = ctx.createLinearGradient(0, -h * 0.7, 0, 0);
        wingTopGrad.addColorStop(0, "#C8C8D0"); // bright highlight at tip
        wingTopGrad.addColorStop(0.5, "#909098");
        wingTopGrad.addColorStop(1, "#606070");
        const wingBotGrad = ctx.createLinearGradient(0, 0, 0, h * 0.7);
        wingBotGrad.addColorStop(0, "#606070");
        wingBotGrad.addColorStop(0.5, "#909098");
        wingBotGrad.addColorStop(1, "#C8C8D0");

        // Upper delta wing
        ctx.fillStyle = wingTopGrad;
        ctx.beginPath();
        ctx.moveTo(-w * 0.42, 0); // nose tip
        ctx.lineTo(-w * 0.05, -h * 0.66); // wing leading edge tip
        ctx.lineTo(w * 0.28, -h * 0.36); // mid trailing
        ctx.lineTo(w * 0.4, -h * 0.22); // engine nacelle root top
        ctx.lineTo(w * 0.4, -h * 0.04); // engine nacelle inner top
        ctx.lineTo(-w * 0.38, -h * 0.06); // fuselage underside
        ctx.closePath();
        ctx.fill();

        // Lower delta wing (mirror)
        ctx.fillStyle = wingBotGrad;
        ctx.beginPath();
        ctx.moveTo(-w * 0.42, 0);
        ctx.lineTo(-w * 0.05, h * 0.66);
        ctx.lineTo(w * 0.28, h * 0.36);
        ctx.lineTo(w * 0.4, h * 0.22);
        ctx.lineTo(w * 0.4, h * 0.04);
        ctx.lineTo(-w * 0.38, h * 0.06);
        ctx.closePath();
        ctx.fill();

        // Wing outlines
        ctx.strokeStyle = "#3A3A48";
        ctx.lineWidth = Math.max(0.6, h * 0.04);
        ctx.beginPath();
        ctx.moveTo(-w * 0.42, 0);
        ctx.lineTo(-w * 0.05, -h * 0.66);
        ctx.lineTo(w * 0.28, -h * 0.36);
        ctx.lineTo(w * 0.4, -h * 0.22);
        ctx.moveTo(-w * 0.42, 0);
        ctx.lineTo(-w * 0.05, h * 0.66);
        ctx.lineTo(w * 0.28, h * 0.36);
        ctx.lineTo(w * 0.4, h * 0.22);
        ctx.stroke();

        // Small canards (forward strakes near nose)
        ctx.fillStyle = "#8090A0";
        ctx.strokeStyle = "#303038";
        ctx.lineWidth = Math.max(0.4, h * 0.03);
        ctx.beginPath();
        ctx.moveTo(-w * 0.3, -h * 0.08);
        ctx.lineTo(-w * 0.12, -h * 0.38);
        ctx.lineTo(-w * 0.06, -h * 0.08);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-w * 0.3, h * 0.08);
        ctx.lineTo(-w * 0.12, h * 0.38);
        ctx.lineTo(-w * 0.06, h * 0.08);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Main fuselage — sleek elongated body
        const fuseTopGrad = ctx.createLinearGradient(0, -h * 0.22, 0, h * 0.22);
        fuseTopGrad.addColorStop(0, "#D0D0D8");
        fuseTopGrad.addColorStop(0.3, "#A0A0B0");
        fuseTopGrad.addColorStop(0.7, "#707080");
        fuseTopGrad.addColorStop(1, "#A8A8B8");
        ctx.fillStyle = fuseTopGrad;
        ctx.beginPath();
        ctx.moveTo(-w * 0.42, 0);
        ctx.bezierCurveTo(
          -w * 0.3,
          -h * 0.04,
          -w * 0.15,
          -h * 0.2,
          w * 0.05,
          -h * 0.2,
        );
        ctx.lineTo(w * 0.38, -h * 0.16);
        ctx.lineTo(w * 0.42, -h * 0.08);
        ctx.lineTo(w * 0.42, h * 0.08);
        ctx.lineTo(w * 0.38, h * 0.16);
        ctx.lineTo(w * 0.05, h * 0.2);
        ctx.bezierCurveTo(-w * 0.15, h * 0.2, -w * 0.3, h * 0.04, -w * 0.42, 0);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "#2A2A38";
        ctx.lineWidth = Math.max(0.6, h * 0.04);
        ctx.stroke();

        // Engine intakes — rectangular scoops on underside
        ctx.fillStyle = "#1A1A28";
        ctx.strokeStyle = "#404050";
        ctx.lineWidth = Math.max(0.4, h * 0.03);
        ctx.beginPath();
        ctx.roundRect(-w * 0.05, -h * 0.19, w * 0.22, h * 0.06, h * 0.02);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.roundRect(-w * 0.05, h * 0.13, w * 0.22, h * 0.06, h * 0.02);
        ctx.fill();
        ctx.stroke();

        // Twin engine nacelles (pods behind fuselage)
        const nacGrad = ctx.createLinearGradient(0, -h * 0.15, 0, h * 0.15);
        nacGrad.addColorStop(0, "#B0B0C0");
        nacGrad.addColorStop(0.5, "#707080");
        nacGrad.addColorStop(1, "#B0B0C0");
        ctx.fillStyle = nacGrad;
        ctx.strokeStyle = "#303040";
        ctx.lineWidth = Math.max(0.4, h * 0.03);
        ctx.beginPath();
        ctx.roundRect(w * 0.18, -h * 0.22, w * 0.22, h * 0.1, h * 0.04);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.roundRect(w * 0.18, h * 0.12, w * 0.22, h * 0.1, h * 0.04);
        ctx.fill();
        ctx.stroke();

        // Twin canted vertical tail fins (F-22 style angled outward)
        ctx.fillStyle = "#808090";
        ctx.strokeStyle = "#303038";
        ctx.lineWidth = Math.max(0.5, h * 0.04);
        // Top-left tail fin (canted ~15° outward)
        ctx.save();
        ctx.translate(w * 0.3, -h * 0.16);
        ctx.rotate(-0.22);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-w * 0.08, -h * 0.46);
        ctx.lineTo(w * 0.14, -h * 0.02);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        // Bottom-right tail fin (mirrored)
        ctx.save();
        ctx.translate(w * 0.3, h * 0.16);
        ctx.rotate(0.22);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-w * 0.08, h * 0.46);
        ctx.lineTo(w * 0.14, h * 0.02);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Cockpit canopy — dark tinted bubble
        const canopyGrad = ctx.createRadialGradient(
          -w * 0.2,
          -h * 0.1,
          0,
          -w * 0.18,
          0,
          h * 0.14,
        );
        canopyGrad.addColorStop(0, "rgba(160,220,255,0.75)");
        canopyGrad.addColorStop(0.4, "rgba(30,80,140,0.7)");
        canopyGrad.addColorStop(1, "rgba(10,30,80,0.85)");
        ctx.fillStyle = canopyGrad;
        ctx.strokeStyle = "#1A2A3A";
        ctx.lineWidth = Math.max(0.5, h * 0.04);
        ctx.beginPath();
        ctx.ellipse(-w * 0.18, 0, w * 0.1, h * 0.13, -0.15, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        // Canopy glint
        ctx.fillStyle = "rgba(220,240,255,0.55)";
        ctx.beginPath();
        ctx.ellipse(
          -w * 0.2,
          -h * 0.05,
          w * 0.045,
          h * 0.045,
          -0.4,
          0,
          Math.PI * 2,
        );
        ctx.fill();

        // Missiles under wings (small cylindrical AIM-120s)
        ctx.fillStyle = "#D0D0D8";
        ctx.strokeStyle = "#606068";
        ctx.lineWidth = Math.max(0.4, h * 0.03);
        // Left missile
        ctx.beginPath();
        ctx.roundRect(-w * 0.08, -h * 0.62, w * 0.18, h * 0.07, h * 0.025);
        ctx.fill();
        ctx.stroke();
        // Red warhead band
        ctx.fillStyle = "#CC1111";
        ctx.beginPath();
        ctx.roundRect(-w * 0.08, -h * 0.62, w * 0.04, h * 0.07, h * 0.025);
        ctx.fill();
        // Right missile
        ctx.fillStyle = "#D0D0D8";
        ctx.beginPath();
        ctx.roundRect(-w * 0.08, h * 0.55, w * 0.18, h * 0.07, h * 0.025);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#CC1111";
        ctx.beginPath();
        ctx.roundRect(-w * 0.08, h * 0.55, w * 0.04, h * 0.07, h * 0.025);
        ctx.fill();

        // Fuselage surface detail lines (panel lines)
        ctx.strokeStyle = "rgba(60,60,80,0.35)";
        ctx.lineWidth = Math.max(0.4, h * 0.025);
        ctx.setLineDash([w * 0.04, w * 0.03]);
        ctx.beginPath();
        ctx.moveTo(-w * 0.35, -h * 0.04);
        ctx.lineTo(w * 0.35, -h * 0.04);
        ctx.moveTo(-w * 0.35, h * 0.04);
        ctx.lineTo(w * 0.35, h * 0.04);
        ctx.stroke();
        ctx.setLineDash([]);

        // Fuselage top highlight
        const fuseGloss = ctx.createLinearGradient(
          -w * 0.38,
          -h * 0.2,
          w * 0.38,
          -h * 0.2,
        );
        fuseGloss.addColorStop(0, "rgba(255,255,255,0)");
        fuseGloss.addColorStop(0.3, "rgba(255,255,255,0.35)");
        fuseGloss.addColorStop(0.7, "rgba(255,255,255,0.25)");
        fuseGloss.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = fuseGloss;
        ctx.beginPath();
        ctx.ellipse(0, -h * 0.12, w * 0.38, h * 0.05, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.restore();
    },
    [],
  );

  // Draw Alien UFO — classic flying saucer with animated rim lights and tractor beam
  const drawAlienUFO = useCallback(
    (ctx: CanvasRenderingContext2D, c: StartChicken) => {
      const { x, y, size, wingPhase, direction } = c;
      const cx = x + size / 2;
      const cy = y + size / 2;

      // Size tiers
      let dw: number; // disc half-width
      let dh: number; // disc half-height
      let domH: number; // dome height
      let domW: number; // dome half-width
      if (size <= 25) {
        dw = 28;
        dh = 6;
        domH = 10;
        domW = 14;
      } else if (size <= 40) {
        dw = 46;
        dh = 10;
        domH = 16;
        domW = 22;
      } else {
        dw = 66;
        dh = 14;
        domH = 24;
        domW = 32;
      }

      const alpha = entityAlphaRef.current;
      const t = Date.now();
      const pulse = 0.7 + 0.3 * Math.sin(wingPhase * 2);

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(cx, cy);
      if (direction === "left-to-right") ctx.scale(-1, 1);

      // Tractor beam — faint green cone downward
      const beamAlpha = (0.12 + 0.08 * Math.sin(wingPhase)) * alpha;
      const beamGrad = ctx.createLinearGradient(0, dh, 0, dh + dw * 1.4);
      beamGrad.addColorStop(0, `rgba(120,255,180,${beamAlpha})`);
      beamGrad.addColorStop(1, "rgba(60,255,120,0)");
      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(-dw * 0.45, dh);
      ctx.lineTo(-dw * 0.75, dh + dw * 1.4);
      ctx.lineTo(dw * 0.75, dh + dw * 1.4);
      ctx.lineTo(dw * 0.45, dh);
      ctx.closePath();
      ctx.fill();

      // Disc body shadow/glow
      ctx.shadowColor = "rgba(100,220,255,0.6)";
      ctx.shadowBlur = dw * 0.3;

      // Disc body — flat ellipse, metallic dark
      const discGrad = ctx.createLinearGradient(0, -dh, 0, dh);
      discGrad.addColorStop(0, "#8ab0c8");
      discGrad.addColorStop(0.4, "#4a6a80");
      discGrad.addColorStop(1, "#1e3040");
      ctx.fillStyle = discGrad;
      ctx.beginPath();
      ctx.ellipse(0, 0, dw, dh, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(160,220,255,0.5)";
      ctx.lineWidth = Math.max(0.8, dh * 0.14);
      ctx.stroke();

      // Rim lights — pulsing colored LEDs around the disc edge
      const rimColors = ["#00ff88", "#0088ff", "#ff4444", "#ffdd00", "#cc44ff"];
      const numLights = size <= 25 ? 6 : size <= 40 ? 9 : 12;
      ctx.shadowBlur = 0;
      for (let i = 0; i < numLights; i++) {
        const angle = (i / numLights) * Math.PI * 2;
        const lx = Math.cos(angle) * dw * 0.82;
        const ly = Math.sin(angle) * dh * 0.82;
        const lightPhase = (t * 0.004 + i * 0.7) % (Math.PI * 2);
        const brightness = 0.5 + 0.5 * Math.sin(lightPhase);
        const col = rimColors[i % rimColors.length];
        ctx.globalAlpha = (0.6 + 0.4 * brightness) * alpha;
        ctx.shadowColor = col;
        ctx.shadowBlur = dh * 1.2 * brightness;
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(lx, ly, Math.max(1.5, dh * 0.28), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.globalAlpha = alpha;

      // Disc top highlight gloss
      const glossGrad = ctx.createRadialGradient(
        -dw * 0.25,
        -dh * 0.4,
        0,
        0,
        -dh * 0.2,
        dw * 0.55,
      );
      glossGrad.addColorStop(0, "rgba(255,255,255,0.38)");
      glossGrad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = glossGrad;
      ctx.beginPath();
      ctx.ellipse(0, -dh * 0.1, dw * 0.85, dh * 0.7, 0, Math.PI, Math.PI * 2);
      ctx.fill();

      // Dome — translucent glass bubble on top
      ctx.shadowColor = "rgba(180,240,255,0.7)";
      ctx.shadowBlur = domH * 0.8;
      const domeGrad = ctx.createRadialGradient(
        -domW * 0.3,
        -domH * 0.5,
        0,
        0,
        0,
        domW,
      );
      domeGrad.addColorStop(0, "rgba(200,240,255,0.85)");
      domeGrad.addColorStop(0.45, "rgba(80,160,220,0.65)");
      domeGrad.addColorStop(1, "rgba(20,60,100,0.7)");
      ctx.fillStyle = domeGrad;
      ctx.strokeStyle = "rgba(180,240,255,0.5)";
      ctx.lineWidth = Math.max(0.6, domW * 0.05);
      ctx.beginPath();
      ctx.ellipse(0, -dh * 0.3, domW, domH, 0, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Alien silhouette inside dome
      const headR = domW * 0.3;
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(30,80,40,0.75)";
      // Head
      ctx.beginPath();
      ctx.ellipse(
        0,
        -dh * 0.3 - domH * 0.42,
        headR,
        headR * 1.2,
        0,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      // Eyes
      ctx.fillStyle = "rgba(80,255,120,0.9)";
      const eyeR = headR * 0.28;
      const pulseEye = pulse;
      ctx.globalAlpha = pulseEye * alpha;
      ctx.beginPath();
      ctx.ellipse(
        -headR * 0.35,
        -dh * 0.3 - domH * 0.5,
        eyeR,
        eyeR * 0.7,
        0,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(
        headR * 0.35,
        -dh * 0.3 - domH * 0.5,
        eyeR,
        eyeR * 0.7,
        0,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      ctx.globalAlpha = alpha;

      // Dome glass glint
      ctx.fillStyle = "rgba(255,255,255,0.45)";
      ctx.beginPath();
      ctx.ellipse(
        -domW * 0.28,
        -dh * 0.3 - domH * 0.72,
        domW * 0.18,
        domH * 0.16,
        -0.4,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      ctx.globalAlpha = 1;
      ctx.restore();
    },
    [],
  );

  const animateChickens = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // ── Transition tick (fade-out → swap → fade-in) ──
    const FADE_STEP = 0.04; // ~0.5 s at 60 fps (1/0.04 = 25 frames)
    const phase = transitionPhaseRef.current;
    if (phase === "fade-out") {
      entityAlphaRef.current = Math.max(0, entityAlphaRef.current - FADE_STEP);
      if (entityAlphaRef.current === 0) {
        // Swap the active entity type and reset chickens
        activeEntityTypeRef.current = pendingEntityTypeRef.current;
        activeIsPumpFunRef.current = pendingIsPumpFunRef.current;
        chickensRef.current = [];
        transitionPhaseRef.current = "fade-in";
      }
    } else if (phase === "fade-in") {
      entityAlphaRef.current = Math.min(1, entityAlphaRef.current + FADE_STEP);
      if (entityAlphaRef.current === 1) {
        transitionPhaseRef.current = "idle";
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const activeType = activeEntityTypeRef.current;
    const drawFn =
      activeType === "pumpfun"
        ? drawPumpFunPill
        : activeType === "bitcoin"
          ? drawBitcoinCoin
          : activeType === "dogecoin"
            ? drawDogecoinCoin
            : activeType === "fish"
              ? drawOceanFish
              : activeType === "virus"
                ? drawCoronaVirus
                : activeType === "warcraft"
                  ? drawHormuzWarcraft
                  : activeType === "ufo"
                    ? drawAlienUFO
                    : drawChicken;

    for (let i = chickensRef.current.length - 1; i >= 0; i--) {
      const ch = chickensRef.current[i];
      ch.x += ch.speed;
      ch.wingPhase += 0.3;
      const off =
        ch.direction === "left-to-right"
          ? ch.x > canvas.width + ch.size
          : ch.x < -ch.size;
      if (off) {
        chickensRef.current.splice(i, 1);
        chickensRef.current.push(makeChicken(canvas));
        continue;
      }
      // Apply globalAlpha for transition fade — pill/coin/fish drawing manages their own alpha
      if (activeType === "chicken") {
        ctx.save();
        ctx.globalAlpha = entityAlphaRef.current;
        drawFn(ctx, ch);
        ctx.globalAlpha = 1;
        ctx.restore();
      } else {
        drawFn(ctx, ch);
      }
    }
    while (chickensRef.current.length < 4)
      chickensRef.current.push(makeChicken(canvas));
    animIdRef.current = requestAnimationFrame(animateChickens);
  }, [
    makeChicken,
    drawChicken,
    drawPumpFunPill,
    drawBitcoinCoin,
    drawDogecoinCoin,
    drawOceanFish,
    drawCoronaVirus,
    drawHormuzWarcraft,
    drawAlienUFO,
  ]);

  // Capture initial world for mount-time entity setup (no dependency on selectedWorld changes)
  const initialWorldRef = useRef(selectedWorld);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Set initial entity type based on starting world (no transition needed on mount)
    const initType:
      | "chicken"
      | "pumpfun"
      | "bitcoin"
      | "fish"
      | "virus"
      | "warcraft"
      | "ufo"
      | "dogecoin" =
      initialWorldRef.current === "pumpfun"
        ? "pumpfun"
        : initialWorldRef.current === "bitcoin"
          ? "bitcoin"
          : initialWorldRef.current === "ocean"
            ? "fish"
            : initialWorldRef.current === "corona"
              ? "virus"
              : initialWorldRef.current === "hormuz"
                ? "warcraft"
                : initialWorldRef.current === "alien"
                  ? "ufo"
                  : initialWorldRef.current === "dogecoin"
                    ? "dogecoin"
                    : "chicken";
    activeEntityTypeRef.current = initType;
    activeIsPumpFunRef.current = initType === "pumpfun";
    entityAlphaRef.current = 1;
    transitionPhaseRef.current = "idle";
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    chickensRef.current = [];
    for (let i = 0; i < 4; i++) {
      const ch = makeChicken(canvas);
      ch.x =
        ch.direction === "left-to-right"
          ? -ch.size - i * 200
          : canvas.width + ch.size + i * 200;
      chickensRef.current.push(ch);
    }
    animIdRef.current = requestAnimationFrame(animateChickens);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animIdRef.current);
    };
  }, [makeChicken, animateChickens]);

  const isSnowy = selectedWorld === "snowy";
  const tipsContainerClass = isSnowy
    ? "tips-container-snowy"
    : "tips-container-default";

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden"
      data-ocid="start.page"
    >
      {/* Background */}
      <BackgroundRenderer world={selectedWorld} />

      {/* Canvas overlay for decorative chickens */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 5 }}
      />

      {/* World name at top */}
      <div className="fixed top-4 left-0 right-0 z-20 text-center pointer-events-none">
        <h1 className="world-name-title">{WORLDS[worldIndex].name}</h1>
        {/* pump.fun live price — only shown when pump.fun world is selected */}
        {isPumpFunSelected && (
          <div className="mt-1 inline-flex flex-col items-center gap-0.5 px-4 py-2 rounded-md bg-black/60 backdrop-blur-sm border border-green-900/50">
            {/* Label — small & muted on top */}
            <span
              style={{
                fontFamily: "'Courier New', Courier, monospace",
                color: "#4B7A5E",
                opacity: 0.85,
              }}
              className="text-xs tracking-widest leading-none"
            >
              PUMP / USD
            </span>
            {/* Price row — large & bright */}
            <div className="flex items-center gap-2">
              <span
                style={{ fontFamily: "'Courier New', Courier, monospace" }}
                className="text-white font-bold text-base tracking-wide leading-none"
              >
                {pumpPriceData
                  ? `$${pumpPriceData.price < 0.01 ? pumpPriceData.price.toFixed(6) : pumpPriceData.price.toFixed(4)}`
                  : "--"}
              </span>
              {pumpPriceData && (
                <span
                  style={{ fontFamily: "'Courier New', Courier, monospace" }}
                  className={`text-xs font-semibold tracking-wide leading-none ${pumpPriceData.change24h >= 0 ? "text-green-400" : "text-red-400"}`}
                >
                  {pumpPriceData.change24h >= 0 ? "+" : ""}
                  {pumpPriceData.change24h.toFixed(2)}%
                </span>
              )}
            </div>
          </div>
        )}
        {/* BTC/USD live price — only shown when bitcoin world is selected */}
        {isBitcoinSelected && (
          <div className="mt-1 inline-flex flex-col items-center gap-0.5 px-4 py-2 rounded-md bg-black/60 backdrop-blur-sm border border-orange-900/50">
            <span
              style={{
                fontFamily: "'Courier New', Courier, monospace",
                color: "#b06010",
                opacity: 0.85,
              }}
              className="text-xs tracking-widest leading-none"
            >
              BTC / USD
            </span>
            <div className="flex items-center gap-2">
              <span
                style={{ fontFamily: "'Courier New', Courier, monospace" }}
                className="text-white font-bold text-base tracking-wide leading-none"
              >
                {btcPriceData
                  ? `$${btcPriceData.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  : "--"}
              </span>
              {btcPriceData && (
                <span
                  style={{ fontFamily: "'Courier New', Courier, monospace" }}
                  className={`text-xs font-semibold tracking-wide leading-none ${btcPriceData.change24h >= 0 ? "text-green-400" : "text-red-400"}`}
                >
                  {btcPriceData.change24h >= 0 ? "+" : ""}
                  {btcPriceData.change24h.toFixed(2)}%
                </span>
              )}
            </div>
          </div>
        )}
        {/* DOGE/USD live price — only shown when Dogecoin world is selected */}
        {isDogecoinSelected && (
          <div className="mt-1 inline-flex flex-col items-center gap-0.5 px-4 py-2 rounded-md bg-black/60 backdrop-blur-sm border border-yellow-900/50">
            <span
              style={{
                fontFamily: "'Courier New', Courier, monospace",
                color: "#c8940a",
                opacity: 0.85,
              }}
              className="text-xs tracking-widest leading-none"
            >
              DOGE / USD
            </span>
            <div className="flex items-center gap-2">
              <span
                style={{ fontFamily: "'Courier New', Courier, monospace" }}
                className="text-white font-bold text-base tracking-wide leading-none"
              >
                {dogePriceData
                  ? `$${dogePriceData.price < 0.001 ? dogePriceData.price.toFixed(6) : dogePriceData.price.toFixed(4)}`
                  : "--"}
              </span>
              {dogePriceData && (
                <span
                  style={{ fontFamily: "'Courier New', Courier, monospace" }}
                  className={`text-xs font-semibold tracking-wide leading-none ${dogePriceData.change24h >= 0 ? "text-green-400" : "text-red-400"}`}
                >
                  {dogePriceData.change24h >= 0 ? "+" : ""}
                  {dogePriceData.change24h.toFixed(2)}%
                </span>
              )}
            </div>
          </div>
        )}
        {/* Caffeine URL — only shown when Caffeine world is selected */}
        {isCaffeineSelected && (
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit caffeine.ai – Build apps with chat"
            className="mt-1 inline-flex flex-col items-center gap-0.5 px-4 py-2 rounded-md bg-black/60 backdrop-blur-sm border pointer-events-auto hover:opacity-90 transition-opacity duration-150"
            style={{ borderColor: "rgba(204,255,0,0.35)" }}
          >
            {/* Row 1: caffeine.ai + external-link icon */}
            <span className="inline-flex flex-row items-center gap-1.5">
              <span
                style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  color: "#ccff00",
                }}
                className="font-bold text-base tracking-wide leading-none"
              >
                caffeine.ai
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ccff00"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ opacity: 0.8, flexShrink: 0 }}
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </span>
            {/* Row 2: tagline */}
            <span
              style={{
                fontFamily: "'Courier New', Courier, monospace",
                color: "#ccff00",
                opacity: 0.6,
              }}
              className="text-xs tracking-wide leading-none"
            >
              Build apps with chat
            </span>
          </a>
        )}
        {/* BRENT/USD live oil price — only shown when Hormuz world is selected */}
        {isHormuzSelected && (
          <div className="mt-1 inline-flex flex-col items-center gap-0.5 px-4 py-2 rounded-md bg-black/60 backdrop-blur-sm border border-red-900/50">
            <span
              style={{
                fontFamily: "'Courier New', Courier, monospace",
                color: "#b03010",
                opacity: 0.85,
              }}
              className="text-xs tracking-widest leading-none"
            >
              BRENT / USD
            </span>
            <div className="flex items-center gap-2">
              <span
                style={{ fontFamily: "'Courier New', Courier, monospace" }}
                className="text-white font-bold text-base tracking-wide leading-none"
              >
                {brentPriceData?.price != null
                  ? `$${brentPriceData.price.toFixed(2)}`
                  : "--"}
              </span>
              {brentPriceData?.change24h != null && (
                <span
                  style={{ fontFamily: "'Courier New', Courier, monospace" }}
                  className={`text-xs font-semibold tracking-wide leading-none ${brentPriceData.change24h >= 0 ? "text-green-400" : "text-red-400"}`}
                >
                  {brentPriceData.change24h >= 0 ? "+" : ""}
                  {brentPriceData.change24h.toFixed(2)}%
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Left world nav */}
      <button
        type="button"
        data-ocid="start.prev_world_button"
        onClick={() => goWorld(-1)}
        className="world-navigation-button fixed left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 hover:scale-110 active:scale-95 border border-white/30 shadow-xl"
        aria-label="Previous world"
      >
        <span className="world-navigation-arrow text-white font-bold text-3xl">
          ‹
        </span>
      </button>

      {/* Right world nav */}
      <button
        type="button"
        data-ocid="start.next_world_button"
        onClick={() => goWorld(1)}
        className="world-navigation-button fixed right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 hover:scale-110 active:scale-95 border border-white/30 shadow-xl"
        aria-label="Next world"
      >
        <span className="world-navigation-arrow text-white font-bold text-3xl">
          ›
        </span>
      </button>

      {/* Center: Start button */}
      <div className="flex-grow flex items-center justify-center px-4 relative z-10">
        <button
          type="button"
          data-ocid="start.start_button"
          onClick={handleStart}
          className={`${START_BUTTON_CLASSES[selectedWorld]} text-white font-bold text-2xl px-12 py-4 rounded-full hover:scale-105 transition-all duration-200 active:scale-95`}
        >
          START GAME
        </button>
      </div>

      {/* Tips section */}
      <div
        className="relative z-10 w-full px-4"
        style={{ paddingBottom: "calc(60px + 1.25rem)" }}
      >
        <div
          className={`${tipsContainerClass} bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl max-w-4xl mx-auto`}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 mr-3 shadow-md lightbulb-icon-container">
              <span className="text-white font-bold text-sm">💡</span>
            </div>
            <h3 className="text-white font-bold text-lg game-tips-heading">
              Game Tips
            </h3>
          </div>

          {/* Swipeable tips */}
          <div
            className="tip-container cursor-grab active:cursor-grabbing select-none"
            onTouchStart={onTipTouchStart}
            onTouchMove={onTipTouchMove}
            onTouchEnd={onTipTouchEnd}
          >
            <p className="text-white/90 text-center text-base font-medium leading-relaxed min-h-[1.5rem]">
              {GAME_TIPS[tipIndex]}
            </p>
          </div>

          {/* Indicator dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {GAME_TIPS.map((tip, i) => (
              <button
                type="button"
                key={tip}
                data-ocid={`start.tip_dot.${i + 1}`}
                onClick={() => setTipIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 ${
                  i === tipIndex
                    ? "bg-orange-500 scale-125"
                    : isSnowy
                      ? "bg-white/30 tip-indicator-dot-snowy hover:bg-white/50"
                      : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to tip ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Overlay views — each opens as its own full-screen panel, never navigates to game */}
      {overlayView === "achievements" && (
        <div className="fixed inset-0 z-40" style={{ paddingBottom: "60px" }}>
          <AchievementsView
            gameStatistics={gameStatistics}
            isAuthenticated={isAuthenticated}
            addXP={addXP}
            playerLevel={playerData.level}
          />
        </div>
      )}
      {overlayView === "profile" && (
        <div className="fixed inset-0 z-40" style={{ paddingBottom: "60px" }}>
          <ProfileView
            score={0}
            playerData={playerData}
            isAuthenticated={isAuthenticated}
            gameStatistics={gameStatistics}
          />
        </div>
      )}
      {overlayView === "leaderboard" && (
        <div className="fixed inset-0 z-40" style={{ paddingBottom: "60px" }}>
          <LeaderboardView
            currentPlayerScore={gameStatistics.highestScore}
            isAuthenticated={isAuthenticated}
          />
        </div>
      )}
      {/* Settings — fullscreen above bottom menu, same pattern as other overlays */}
      {overlayView === "settings" && (
        <div className="fixed inset-0 z-40" style={{ paddingBottom: "60px" }}>
          <SettingsView onClose={() => setOverlayView(null)} />
        </div>
      )}
      {overlayView === "socials" && (
        <div className="fixed inset-0 z-40" style={{ paddingBottom: "60px" }}>
          <SocialsView isAuthenticated={isAuthenticated} />
        </div>
      )}

      {/* Bottom navigation — always visible, above all overlay content */}
      <BottomMenu
        currentView={overlayView ?? "worldSelection"}
        context="worldSelection"
        onViewChange={(view) => {
          if (
            view === "achievements" ||
            view === "profile" ||
            view === "leaderboard" ||
            view === "settings" ||
            view === "socials"
          ) {
            setOverlayView(view);
          } else if (view === "worldSelection") {
            // Globe/world tab clicked — close any open overlay, stay in world selection
            setOverlayView(null);
          }
          // Never navigate to game from here — only "Start Game" does that
        }}
        zIndex={50}
      />
    </div>
  );
};

export default StartScreen;
