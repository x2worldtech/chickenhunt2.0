import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { BackgroundWorld, GameStatisticsLocal, PlayerData } from "../App";
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
  { id: "caffeineai", name: "CaffeineAI" },
  { id: "zombietown", name: "ZombieTown" },
  { id: "halloween", name: "Halloween" },
  { id: "tokyo", name: "Tokyo" },
  { id: "windows", name: "Windows XP" },
  { id: "bitcoin", name: "Bitcoin" },
  { id: "matrix", name: "Matrix" },
  { id: "ocean", name: "Ocean" },
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

  // Sync worldIndex when selectedWorld prop changes
  useEffect(() => {
    const idx = WORLDS.findIndex((w) => w.id === selectedWorld);
    if (idx >= 0) setWorldIndex(idx);
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

  const animateChickens = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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
      drawChicken(ctx, ch);
    }
    while (chickensRef.current.length < 4)
      chickensRef.current.push(makeChicken(canvas));
    animIdRef.current = requestAnimationFrame(animateChickens);
  }, [makeChicken, drawChicken]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
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
