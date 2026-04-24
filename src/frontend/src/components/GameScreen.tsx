import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { BackgroundWorld, GameStatisticsLocal } from "../App";
import { useSaveGameStatistics } from "../hooks/useQueries";
import AchievementsView from "./AchievementsView";
import BackgroundRenderer from "./BackgroundRenderer";
import BottomMenu from "./BottomMenu";
import GameOverWindow from "./GameOverWindow";
import LeaderboardView from "./LeaderboardView";
import ProfileView from "./ProfileView";
import SettingsView from "./SettingsView";
import SocialsView from "./SocialsView";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Chicken {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
  points: number;
  color: string;
  wingPhase: number;
  distance: "close" | "medium" | "far";
  isExploding?: boolean;
  explosionPhase?: number;
  type: "regular" | "fast";
  direction: "left-to-right" | "right-to-left";
  isGolden?: boolean;
}

interface Stopwatch {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
  pathPhase: number;
  direction: "left-to-right" | "right-to-left";
  isExploding?: boolean;
  explosionPhase?: number;
  amplitude: number;
  frequency: number;
  baseY: number;
}

interface PlayerData {
  level: number;
  currentXP: number;
  requiredXP: number;
}

interface HitEffect {
  id: number;
  x: number;
  y: number;
  points: number;
  timestamp: number;
}

interface RewardNotification {
  id: number;
  type: "score" | "xp" | "multiplier" | "time";
  value: number;
  timestamp: number;
}

interface TouchTracker {
  id: number;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  hasMoved: boolean;
  startTime: number;
}

interface SessionStatistics {
  chickensShot: number;
  shotsFired: number;
  consecutiveHits: number;
  startTime: number;
  hasMinimumShots: boolean;
  xpEarned: number;
}

interface ScoreMultiplier {
  isActive: boolean;
  endTime: number;
}

interface Point {
  x: number;
  y: number;
}

interface EllipseHitbox {
  type: "ellipse";
  x: number;
  y: number;
  rx: number;
  ry: number;
}

interface RectangleHitbox {
  type: "rectangle";
  x: number;
  y: number;
  width: number;
  height: number;
}

interface PolygonHitbox {
  type: "triangle" | "polygon";
  points: Point[];
}

type Hitbox = EllipseHitbox | RectangleHitbox | PolygonHitbox;

type GameView =
  | "game"
  | "achievements"
  | "profile"
  | "settings"
  | "leaderboard"
  | "socials"
  | "login-prompt";

interface GameScreenProps {
  score: number;
  setScore: (score: number) => void;
  onEndGame: () => void;
  playerData: PlayerData;
  addXP: (xpAmount: number) => void;
  gameStatistics: GameStatisticsLocal;
  updateStatistics: (updates: Partial<GameStatisticsLocal>) => void;
  selectedWorld: BackgroundWorld;
  levelXPRequirements: number[];
  initialView?: GameView;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CHICKEN_COLORS = ["#8B4513", "#D2691E", "#F4A460", "#DEB887", "#CD853F"];
const FAST_CHICKEN_COLORS = [
  "#FF4500",
  "#FF6347",
  "#DC143C",
  "#B22222",
  "#8B0000",
];
const GOLDEN_CHICKEN_COLORS = [
  "#FFD700",
  "#FFA500",
  "#FFFF00",
  "#DAA520",
  "#B8860B",
];
const BOTTOM_MENU_HEIGHT = 60;
const HITBOX_SIZE_MULTIPLIER = 1.25;
const GAME_DURATION = 60;
const TOUCH_MOVEMENT_THRESHOLD = 10;

// ─── Component ────────────────────────────────────────────────────────────────

const GameScreen: React.FC<GameScreenProps> = ({
  score,
  setScore,
  onEndGame,
  playerData,
  addXP,
  gameStatistics,
  updateStatistics,
  selectedWorld,
  levelXPRequirements,
  initialView = "game",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const backgroundMusicGainRef = useRef<GainNode | null>(null);
  const rainSoundGainRef = useRef<GainNode | null>(null);
  const rainSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const aiSoundGainRef = useRef<GainNode | null>(null);
  const aiSoundSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const touchTrackersRef = useRef<Map<number, TouchTracker>>(new Map());

  const gameStateRef = useRef({
    chickens: [] as Chicken[],
    stopwatch: null as Stopwatch | null,
    stopwatchSpawned: false,
    stopwatchSpawnTime: undefined as number | undefined,
    animationId: 0,
    isRunning: true,
    gameStartTime: 0,
    gameEnded: false,
    goldenChickensSpawned: 0,
    goldenChickenSpawnTimes: [] as number[],
    totalGameDuration: GAME_DURATION,
    lastBonusTime: 0,
  });

  const [hitEffects, setHitEffects] = useState<HitEffect[]>([]);
  const [currentView, setCurrentView] = useState<GameView>(initialView);
  const [timeRemaining, setTimeRemaining] = useState(GAME_DURATION);
  const [gameEnded, setGameEnded] = useState(false);
  const [scoreMultiplier, setScoreMultiplier] = useState<ScoreMultiplier>({
    isActive: false,
    endTime: 0,
  });
  const [rewardNotifications, setRewardNotifications] = useState<
    RewardNotification[]
  >([]);
  const [settings, setSettings] = useState({
    backgroundMusicVolume: 30,
    soundEffectsEnabled: true,
  });
  const [sessionStats, setSessionStats] = useState<SessionStatistics>({
    chickensShot: 0,
    shotsFired: 0,
    consecutiveHits: 0,
    startTime: Date.now(),
    hasMinimumShots: false,
    xpEarned: 0,
  });

  const { isAuthenticated } = useInternetIdentity();
  const saveGameStatsMutation = useSaveGameStatistics();

  // ─── Settings sync ──────────────────────────────────────────────────────────

  useEffect(() => {
    const loadSettings = () => {
      const saved = localStorage.getItem("chickenHuntSettings");
      if (saved) {
        try {
          setSettings(JSON.parse(saved));
        } catch {
          /* ignore */
        }
      }
    };
    loadSettings();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "chickenHuntSettings" && e.newValue) {
        try {
          setSettings(JSON.parse(e.newValue));
        } catch {
          /* ignore */
        }
      }
    };
    const interval = setInterval(loadSettings, 100);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(interval);
    };
  }, []);

  // ─── Audio ──────────────────────────────────────────────────────────────────

  const initializeAudio = useCallback(() => {
    if (!audioContextRef.current) {
      try {
        audioContextRef.current = new (
          window.AudioContext ||
          (
            window as typeof window & {
              webkitAudioContext: typeof AudioContext;
            }
          ).webkitAudioContext
        )();
      } catch {
        /* ignore */
      }
    }
  }, []);

  const createBackgroundMusic = useCallback(async () => {
    const audioContext = audioContextRef.current;
    if (!audioContext) return;
    try {
      if (audioContext.state === "suspended") await audioContext.resume();
      const gainNode = audioContext.createGain();
      const vol =
        settings.backgroundMusicVolume === 0
          ? 0
          : (settings.backgroundMusicVolume / 100) * 0.3;
      gainNode.gain.setValueAtTime(vol, audioContext.currentTime);
      gainNode.connect(audioContext.destination);
      backgroundMusicGainRef.current = gainNode;

      if (settings.backgroundMusicVolume > 0) {
        const playBgMusic = () => {
          if (!audioContext || !gainNode) return;
          const osc1 = audioContext.createOscillator();
          const osc2 = audioContext.createOscillator();
          const osc3 = audioContext.createOscillator();
          const f1 = audioContext.createBiquadFilter();
          const f2 = audioContext.createBiquadFilter();
          const f3 = audioContext.createBiquadFilter();
          f1.type = "lowpass";
          f1.frequency.setValueAtTime(800, audioContext.currentTime);
          f2.type = "lowpass";
          f2.frequency.setValueAtTime(600, audioContext.currentTime);
          f3.type = "lowpass";
          f3.frequency.setValueAtTime(400, audioContext.currentTime);
          osc1.connect(f1);
          f1.connect(gainNode);
          osc2.connect(f2);
          f2.connect(gainNode);
          osc3.connect(f3);
          f3.connect(gainNode);
          osc1.type = "sine";
          osc2.type = "triangle";
          osc3.type = "sine";
          const base = 220;
          const melody = [
            { freq: base * 1.0, duration: 2 },
            { freq: base * 1.125, duration: 2 },
            { freq: base * 1.25, duration: 1.5 },
            { freq: base * 1.5, duration: 2.5 },
            { freq: base * 1.25, duration: 1.5 },
            { freq: base * 1.125, duration: 2 },
            { freq: base * 1.0, duration: 3 },
            { freq: base * 0.75, duration: 2 },
            { freq: base * 1.0, duration: 4 },
          ];
          let t = audioContext.currentTime;
          const total = melody.reduce((s, n) => s + n.duration, 0);
          for (const note of melody) {
            osc1.frequency.setValueAtTime(note.freq, t);
            osc2.frequency.setValueAtTime(note.freq * 1.5, t);
            osc3.frequency.setValueAtTime(note.freq * 0.5, t);
            t += note.duration;
          }
          osc1.start(audioContext.currentTime);
          osc2.start(audioContext.currentTime);
          osc3.start(audioContext.currentTime);
          osc1.stop(audioContext.currentTime + total);
          osc2.stop(audioContext.currentTime + total);
          osc3.stop(audioContext.currentTime + total);
          setTimeout(() => {
            if (
              gameStateRef.current.isRunning &&
              !gameStateRef.current.gameEnded &&
              settings.backgroundMusicVolume > 0
            )
              playBgMusic();
          }, total * 1000);
        };
        playBgMusic();
      }
    } catch {
      /* ignore */
    }
  }, [settings.backgroundMusicVolume]);

  const stopBackgroundMusic = useCallback(() => {
    // No-op: oscillators stop themselves; gain node just referenced
    backgroundMusicGainRef.current = null;
  }, []);

  const createRainSound = useCallback(() => {
    const audioContext = audioContextRef.current;
    if (!audioContext) return;
    try {
      if (audioContext.state === "suspended") audioContext.resume();
      // Stop any existing rain source
      if (rainSourceRef.current) {
        try {
          rainSourceRef.current.stop();
        } catch {
          /* ignore */
        }
        rainSourceRef.current = null;
      }
      // Create or reuse gain node
      if (!rainSoundGainRef.current) {
        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(
          0.15,
          audioContext.currentTime + 1.5,
        );
        gainNode.connect(audioContext.destination);
        rainSoundGainRef.current = gainNode;
      } else {
        rainSoundGainRef.current.gain.setValueAtTime(
          0,
          audioContext.currentTime,
        );
        rainSoundGainRef.current.gain.linearRampToValueAtTime(
          0.15,
          audioContext.currentTime + 1.5,
        );
      }
      // White noise buffer — 2 seconds of noise, looped
      const bufferSize = audioContext.sampleRate * 2;
      const noiseBuffer = audioContext.createBuffer(
        1,
        bufferSize,
        audioContext.sampleRate,
      );
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noiseSource = audioContext.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;
      // Bandpass filter to shape into rain sound
      const bandpass = audioContext.createBiquadFilter();
      bandpass.type = "bandpass";
      bandpass.frequency.setValueAtTime(600, audioContext.currentTime);
      bandpass.Q.setValueAtTime(0.8, audioContext.currentTime);
      // Lowpass to soften harsh highs
      const lowpass = audioContext.createBiquadFilter();
      lowpass.type = "lowpass";
      lowpass.frequency.setValueAtTime(3500, audioContext.currentTime);
      noiseSource.connect(bandpass);
      bandpass.connect(lowpass);
      lowpass.connect(rainSoundGainRef.current);
      noiseSource.start();
      rainSourceRef.current = noiseSource;
    } catch {
      /* ignore */
    }
  }, []);

  const stopRainSound = useCallback(() => {
    try {
      if (rainSoundGainRef.current && audioContextRef.current) {
        rainSoundGainRef.current.gain.setValueAtTime(
          rainSoundGainRef.current.gain.value,
          audioContextRef.current.currentTime,
        );
        rainSoundGainRef.current.gain.linearRampToValueAtTime(
          0,
          audioContextRef.current.currentTime + 0.8,
        );
      }
      if (rainSourceRef.current) {
        const src = rainSourceRef.current;
        rainSourceRef.current = null;
        setTimeout(() => {
          try {
            src.stop();
          } catch {
            /* ignore */
          }
        }, 900);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const createAISound = useCallback(() => {
    const audioContext = audioContextRef.current;
    if (!audioContext) return;
    try {
      if (audioContext.state === "suspended") audioContext.resume();
      if (aiSoundSourceRef.current) {
        try {
          aiSoundSourceRef.current.stop();
        } catch {
          /* ignore */
        }
        aiSoundSourceRef.current = null;
      }
      if (!aiSoundGainRef.current) {
        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(
          0.12,
          audioContext.currentTime + 2.0,
        );
        gainNode.connect(audioContext.destination);
        aiSoundGainRef.current = gainNode;
      } else {
        aiSoundGainRef.current.gain.setValueAtTime(0, audioContext.currentTime);
        aiSoundGainRef.current.gain.linearRampToValueAtTime(
          0.12,
          audioContext.currentTime + 2.0,
        );
      }
      // Subtle high-frequency electronic hum via filtered noise
      const bufferSize = audioContext.sampleRate * 3;
      const noiseBuffer = audioContext.createBuffer(
        1,
        bufferSize,
        audioContext.sampleRate,
      );
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.4;
      }
      const noiseSource = audioContext.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;
      // Narrow bandpass at high freq for electronic hum
      const highpass = audioContext.createBiquadFilter();
      highpass.type = "highpass";
      highpass.frequency.setValueAtTime(2400, audioContext.currentTime);
      const bandpass = audioContext.createBiquadFilter();
      bandpass.type = "bandpass";
      bandpass.frequency.setValueAtTime(4800, audioContext.currentTime);
      bandpass.Q.setValueAtTime(2.0, audioContext.currentTime);
      noiseSource.connect(highpass);
      highpass.connect(bandpass);
      bandpass.connect(aiSoundGainRef.current);
      // Low drone oscillator for AI ambience
      const droneOsc = audioContext.createOscillator();
      droneOsc.type = "sine";
      droneOsc.frequency.setValueAtTime(55, audioContext.currentTime);
      droneOsc.frequency.linearRampToValueAtTime(
        58,
        audioContext.currentTime + 4,
      );
      droneOsc.frequency.linearRampToValueAtTime(
        55,
        audioContext.currentTime + 8,
      );
      const droneGain = audioContext.createGain();
      droneGain.gain.setValueAtTime(0.35, audioContext.currentTime);
      droneOsc.connect(droneGain);
      droneGain.connect(aiSoundGainRef.current);
      noiseSource.start();
      droneOsc.start();
      aiSoundSourceRef.current = noiseSource;
    } catch {
      /* ignore */
    }
  }, []);

  const stopAISound = useCallback(() => {
    try {
      if (aiSoundGainRef.current && audioContextRef.current) {
        aiSoundGainRef.current.gain.setValueAtTime(
          aiSoundGainRef.current.gain.value,
          audioContextRef.current.currentTime,
        );
        aiSoundGainRef.current.gain.linearRampToValueAtTime(
          0,
          audioContextRef.current.currentTime + 0.8,
        );
      }
      if (aiSoundSourceRef.current) {
        const src = aiSoundSourceRef.current;
        aiSoundSourceRef.current = null;
        setTimeout(() => {
          try {
            src.stop();
          } catch {
            /* ignore */
          }
        }, 900);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const playShotSound = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx || !settings.soundEffectsEnabled) return;
    try {
      if (ctx.state === "suspended") ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "square";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      /* ignore */
    }
  }, [settings.soundEffectsEnabled]);

  const playMissSound = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx || !settings.soundEffectsEnabled) return;
    try {
      if (ctx.state === "suspended") ctx.resume();
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      osc1.type = "sawtooth";
      osc2.type = "triangle";
      const t = ctx.currentTime;
      osc1.frequency.setValueAtTime(300, t);
      osc1.frequency.exponentialRampToValueAtTime(80, t + 0.2);
      osc2.frequency.setValueAtTime(150, t);
      osc2.frequency.exponentialRampToValueAtTime(40, t + 0.2);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.15, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);
      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + 0.25);
      osc2.stop(t + 0.25);
    } catch {
      /* ignore */
    }
  }, [settings.soundEffectsEnabled]);

  const playStopwatchSound = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx || !settings.soundEffectsEnabled) return;
    try {
      if (ctx.state === "suspended") ctx.resume();
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      osc1.type = "sine";
      osc2.type = "triangle";
      const t = ctx.currentTime;
      osc1.frequency.setValueAtTime(523.25, t);
      osc1.frequency.setValueAtTime(659.25, t + 0.1);
      osc1.frequency.setValueAtTime(783.99, t + 0.2);
      osc2.frequency.setValueAtTime(659.25, t);
      osc2.frequency.setValueAtTime(783.99, t + 0.1);
      osc2.frequency.setValueAtTime(1046.5, t + 0.2);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.4, t + 0.05);
      gain.gain.setValueAtTime(0.4, t + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.5);
      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + 0.5);
      osc2.stop(t + 0.5);
    } catch {
      /* ignore */
    }
  }, [settings.soundEffectsEnabled]);

  useEffect(() => {
    if (backgroundMusicGainRef.current && audioContextRef.current) {
      try {
        const vol =
          settings.backgroundMusicVolume === 0
            ? 0
            : (settings.backgroundMusicVolume / 100) * 0.3;
        backgroundMusicGainRef.current.gain.setValueAtTime(
          vol,
          audioContextRef.current.currentTime,
        );
      } catch {
        /* ignore */
      }
    }
  }, [settings.backgroundMusicVolume]);

  // ─── Notifications ──────────────────────────────────────────────────────────

  const addRewardNotification = useCallback(
    (type: "score" | "xp" | "multiplier" | "time", value: number) => {
      const notif: RewardNotification = {
        id: Date.now() + Math.random(),
        type,
        value,
        timestamp: Date.now(),
      };
      setRewardNotifications((prev) => [...prev, notif]);
      setTimeout(
        () =>
          setRewardNotifications((prev) =>
            prev.filter((n) => n.id !== notif.id),
          ),
        1500,
      );
    },
    [],
  );

  // ─── Golden chicken reward ───────────────────────────────────────────────────

  const handleGoldenChickenReward = useCallback(() => {
    const r = Math.floor(Math.random() * 3);
    if (r === 0) {
      setScoreMultiplier({ isActive: true, endTime: Date.now() + 5000 });
      addRewardNotification("multiplier", 5);
    } else if (r === 1) {
      const bonus = 50 + Math.floor(Math.random() * 151);
      setScore(score + bonus);
      addRewardNotification("score", bonus);
    } else {
      const xpBonus = 100 + Math.floor(Math.random() * 2401);
      addXP(xpBonus);
      setSessionStats((prev) => ({
        ...prev,
        xpEarned: prev.xpEarned + xpBonus,
      }));
      addRewardNotification("xp", xpBonus);
    }
  }, [score, setScore, addXP, addRewardNotification]);

  // ─── Stopwatch reward ───────────────────────────────────────────────────────

  const handleStopwatchReward = useCallback(() => {
    const bonus = 1 + Math.floor(Math.random() * 10);
    gameStateRef.current.totalGameDuration += bonus;
    gameStateRef.current.lastBonusTime = Date.now();
    setTimeRemaining((prev) => prev + bonus);
    if (bonus > 0) addRewardNotification("time", bonus);
  }, [addRewardNotification]);

  // ─── Multiplier timer ───────────────────────────────────────────────────────

  useEffect(() => {
    if (!scoreMultiplier.isActive) return;
    const interval = setInterval(() => {
      if (Date.now() >= scoreMultiplier.endTime) {
        setScoreMultiplier({ isActive: false, endTime: 0 });
      }
    }, 100);
    return () => clearInterval(interval);
  }, [scoreMultiplier.isActive, scoreMultiplier.endTime]);

  // ─── Hit effects ────────────────────────────────────────────────────────────

  const addHitEffect = useCallback((x: number, y: number, points: number) => {
    const effect: HitEffect = {
      id: Date.now() + Math.random(),
      x,
      y,
      points,
      timestamp: Date.now(),
    };
    setHitEffects((prev) => [...prev, effect]);
    setTimeout(
      () => setHitEffects((prev) => prev.filter((e) => e.id !== effect.id)),
      1500,
    );
  }, []);

  // ─── Golden chicken spawn times ─────────────────────────────────────────────

  const generateGoldenChickenSpawnTimes = useCallback(() => {
    const now = Date.now();
    return [0, 1, 2]
      .map((i) => {
        const start = i * 20;
        return now + (start + Math.random() * 20) * 1000;
      })
      .sort((a, b) => a - b);
  }, []);

  const shouldSpawnGoldenChicken = useCallback(() => {
    const gs = gameStateRef.current;
    if (gs.goldenChickensSpawned >= 3) return false;
    const next = gs.goldenChickenSpawnTimes[gs.goldenChickensSpawned];
    return Date.now() >= next;
  }, []);

  // ─── Stopwatch spawn ────────────────────────────────────────────────────────

  const shouldSpawnStopwatch = useCallback(() => {
    const gs = gameStateRef.current;
    if (gs.stopwatchSpawned || gs.stopwatch) return false;
    const elapsed = (Date.now() - gs.gameStartTime) / 1000;
    if (!gs.stopwatchSpawnTime) gs.stopwatchSpawnTime = 10 + Math.random() * 40;
    return elapsed >= gs.stopwatchSpawnTime;
  }, []);

  const createStopwatch = useCallback((): Stopwatch => {
    const canvas = canvasRef.current;
    if (!canvas) return {} as Stopwatch;
    const availableH = canvas.height - BOTTOM_MENU_HEIGHT;
    const size = 50;
    const dir: "left-to-right" | "right-to-left" =
      Math.random() < 0.5 ? "left-to-right" : "right-to-left";
    const baseSpeed = 1.5;
    const speed = dir === "left-to-right" ? baseSpeed : -baseSpeed;
    const baseY = 100 + Math.random() * (availableH - 200);
    const xPos = dir === "left-to-right" ? -size : canvas.width + size;
    return {
      id: Date.now() + Math.random(),
      x: xPos,
      y: baseY,
      speed,
      size,
      pathPhase: 0,
      direction: dir,
      isExploding: false,
      explosionPhase: 0,
      amplitude: 30 + Math.random() * 40,
      frequency: 0.01 + Math.random() * 0.02,
      baseY,
    };
  }, []);

  // ─── Chicken creation ───────────────────────────────────────────────────────

  const createChicken = useCallback((): Chicken => {
    const canvas = canvasRef.current;
    if (!canvas) return {} as Chicken;
    const availableH = canvas.height - BOTTOM_MENU_HEIGHT;
    const isGolden = shouldSpawnGoldenChicken();
    if (isGolden) gameStateRef.current.goldenChickensSpawned++;
    const isFast = Math.random() < 0.2;
    const type: "regular" | "fast" = isFast ? "fast" : "regular";
    const dir: "left-to-right" | "right-to-left" =
      Math.random() < 0.5 ? "left-to-right" : "right-to-left";
    const rand = Math.random();
    let distance: "close" | "medium" | "far";
    let size: number;
    let yPos: number;
    let speed: number;
    let basePoints: number;

    if (rand < 0.3) {
      distance = "far";
      size = 25 + Math.random() * 15;
      yPos = 50 + Math.random() * (availableH * 0.3);
      speed = isFast ? 2.5 + Math.random() * 2.0 : 0.8 + Math.random() * 1.2;
      basePoints = 20;
    } else if (rand < 0.65) {
      distance = "medium";
      size = 40 + Math.random() * 20;
      yPos = 80 + Math.random() * (availableH - 160);
      speed = isFast ? 3.0 + Math.random() * 2.5 : 1.2 + Math.random() * 1.8;
      basePoints = 10;
    } else {
      distance = "close";
      size = 60 + Math.random() * 30;
      yPos = 80 + Math.random() * (availableH - 160);
      speed = isFast ? 3.5 + Math.random() * 3.0 : 1.8 + Math.random() * 2.5;
      basePoints = 5;
    }

    yPos = Math.min(yPos, availableH - size - 20);
    let xPos = dir === "left-to-right" ? -size : canvas.width + size;
    if (dir === "right-to-left") speed = -speed;
    const points = isFast ? basePoints + 5 : basePoints;
    const colorArr = isGolden
      ? GOLDEN_CHICKEN_COLORS
      : isFast
        ? FAST_CHICKEN_COLORS
        : CHICKEN_COLORS;
    const color = colorArr[Math.floor(Math.random() * colorArr.length)];

    return {
      id: Date.now() + Math.random(),
      x: xPos,
      y: yPos,
      speed,
      size,
      points,
      color,
      wingPhase: 0,
      distance,
      isExploding: false,
      explosionPhase: 0,
      type,
      direction: dir,
      isGolden,
    };
  }, [shouldSpawnGoldenChicken]);

  // ─── Canvas drawing ─────────────────────────────────────────────────────────

  const drawExplosion = useCallback(
    (ctx: CanvasRenderingContext2D, obj: Chicken | Stopwatch) => {
      const { x, y, size, explosionPhase = 0 } = obj;
      const cx = x + size / 2;
      const cy = y + size / 2;
      ctx.save();
      const expSize = (explosionPhase / 30) * size * 1.5;
      const alpha = Math.max(0, 1 - explosionPhase / 30);
      const colors = [
        { color: "#FF4500", s: 1.0 },
        { color: "#FF6347", s: 0.8 },
        { color: "#FFD700", s: 0.6 },
        { color: "#FFA500", s: 0.4 },
        { color: "#FFFF00", s: 0.2 },
      ];
      for (const [i, exp] of colors.entries()) {
        ctx.globalAlpha = alpha * (1 - i * 0.1);
        const grad = ctx.createRadialGradient(
          cx,
          cy,
          0,
          cx,
          cy,
          expSize * exp.s,
        );
        grad.addColorStop(0, exp.color);
        grad.addColorStop(0.7, `${exp.color}80`);
        grad.addColorStop(1, `${exp.color}00`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, expSize * exp.s, 0, Math.PI * 2);
        ctx.fill();
      }
      if (explosionPhase < 20) {
        ctx.globalAlpha = alpha;
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          const sx = cx + Math.cos(angle) * expSize * 0.8;
          const sy = cy + Math.sin(angle) * expSize * 0.8;
          ctx.fillStyle = "#FFFF00";
          ctx.beginPath();
          ctx.arc(sx, sy, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    },
    [],
  );

  const drawChicken = useCallback(
    (ctx: CanvasRenderingContext2D, chicken: Chicken) => {
      if (chicken.isExploding) {
        drawExplosion(ctx, chicken);
        return;
      }
      const { x, y, size, color, wingPhase, type, direction, isGolden } =
        chicken;
      ctx.save();
      ctx.translate(x + size / 2, y + size / 2);
      if (direction === "left-to-right") ctx.scale(-1, 1);
      const wingOffset = Math.sin(wingPhase) * 0.3;
      const wingRotation = Math.sin(wingPhase) * 0.4;
      if (type === "fast") {
        ctx.shadowColor = "#FF4500";
        ctx.shadowBlur = 8;
      }
      if (isGolden) {
        ctx.shadowColor = "#FFD700";
        ctx.shadowBlur = 12;
      }
      // Body
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.35, size * 0.25, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = isGolden ? "#B8860B" : "#654321";
      ctx.lineWidth = 1;
      ctx.stroke();
      // Chest
      ctx.fillStyle = isGolden ? "#FFFACD" : "#F5DEB3";
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
      ctx.strokeStyle = isGolden ? "#B8860B" : "#654321";
      ctx.lineWidth = 1;
      ctx.stroke();
      // Beak
      ctx.fillStyle = isGolden ? "#FFD700" : "#FFA500";
      ctx.beginPath();
      ctx.moveTo(-size * 0.4, -size * 0.15);
      ctx.lineTo(-size * 0.5, -size * 0.1);
      ctx.lineTo(-size * 0.4, -size * 0.05);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = isGolden ? "#DAA520" : "#FF8C00";
      ctx.lineWidth = 1;
      ctx.stroke();
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
      // Tail feathers
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(
        size * 0.3,
        -size * 0.05,
        size * 0.15,
        size * 0.08,
        Math.PI * 0.3,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(
        size * 0.32,
        size * 0.02,
        size * 0.12,
        size * 0.06,
        Math.PI * 0.1,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(
        size * 0.34,
        size * 0.08,
        size * 0.1,
        size * 0.05,
        -Math.PI * 0.1,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      // Wings
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
      ctx.strokeStyle = isGolden ? "#B8860B" : "#654321";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.strokeStyle = isGolden ? "#DAA520" : "#8B4513";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(size * 0.05, -size * 0.15);
      ctx.lineTo(size * 0.3, -size * 0.05);
      ctx.moveTo(size * 0.08, -size * 0.08);
      ctx.lineTo(size * 0.32, -size * 0.02);
      ctx.moveTo(size * 0.1, -size * 0.02);
      ctx.lineTo(size * 0.35, 0.02);
      ctx.stroke();
      ctx.restore();
      // Legs
      ctx.strokeStyle = isGolden ? "#FFD700" : "#FFA500";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-size * 0.1, size * 0.22);
      ctx.lineTo(-size * 0.12, size * 0.35);
      ctx.moveTo(size * 0.05, size * 0.22);
      ctx.lineTo(size * 0.03, size * 0.35);
      ctx.stroke();
      // Feet
      ctx.strokeStyle = isGolden ? "#FFD700" : "#FFA500";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-size * 0.18, size * 0.35);
      ctx.lineTo(-size * 0.12, size * 0.35);
      ctx.lineTo(-size * 0.06, size * 0.35);
      ctx.moveTo(-size * 0.03, size * 0.35);
      ctx.lineTo(size * 0.03, size * 0.35);
      ctx.lineTo(size * 0.09, size * 0.35);
      ctx.stroke();
      if (type === "fast" || isGolden) {
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
      }
      ctx.restore();
    },
    [drawExplosion],
  );

  const drawStopwatch = useCallback(
    (ctx: CanvasRenderingContext2D, sw: Stopwatch) => {
      if (sw.isExploding) {
        drawExplosion(ctx, sw);
        return;
      }
      const { x, y, size, direction } = sw;
      ctx.save();
      ctx.translate(x + size / 2, y + size / 2);
      if (direction === "left-to-right") ctx.scale(-1, 1);
      ctx.shadowColor = "#00BFFF";
      ctx.shadowBlur = 10;
      ctx.fillStyle = "#C0C0C0";
      ctx.strokeStyle = "#808080";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.32, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;
      for (let i = 0; i < 12; i++) {
        const a = (i * Math.PI) / 6;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * size * 0.28, Math.sin(a) * size * 0.28);
        ctx.lineTo(Math.cos(a) * size * 0.32, Math.sin(a) * size * 0.32);
        ctx.stroke();
      }
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      const hourA = -Math.PI / 2 + (Date.now() / 43200000) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(hourA) * size * 0.15, Math.sin(hourA) * size * 0.15);
      ctx.stroke();
      const minA = -Math.PI / 2 + (Date.now() / 3600000) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(minA) * size * 0.25, Math.sin(minA) * size * 0.25);
      ctx.stroke();
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.03, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#C0C0C0";
      ctx.strokeStyle = "#808080";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(-size * 0.05, -size * 0.5, size * 0.1, size * 0.15);
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = "#808080";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.5);
      ctx.lineTo(0, -size * 0.6);
      ctx.stroke();
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, -size * 0.65, size * 0.05, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.restore();
    },
    [drawExplosion],
  );

  // ─── Collision detection ────────────────────────────────────────────────────

  const checkCollision = useCallback(
    (mx: number, my: number, obj: Chicken | Stopwatch): boolean => {
      if (obj.isExploding) return false;
      const { x, y, size, direction } = obj;
      const cx = x + size / 2;
      const cy = y + size / 2;
      let lx = mx - cx;
      let ly = my - cy;
      if (direction === "left-to-right") lx = -lx;

      if ("pathPhase" in obj) {
        return (
          Math.sqrt(lx * lx + ly * ly) <= size * 0.4 * HITBOX_SIZE_MULTIPLIER
        );
      }

      const hitboxes: Hitbox[] = [
        {
          type: "ellipse",
          x: 0,
          y: 0,
          rx: size * 0.35 * HITBOX_SIZE_MULTIPLIER,
          ry: size * 0.25 * HITBOX_SIZE_MULTIPLIER,
        },
        {
          type: "ellipse",
          x: -size * 0.25,
          y: -size * 0.15,
          rx: size * 0.2 * HITBOX_SIZE_MULTIPLIER,
          ry: size * 0.18 * HITBOX_SIZE_MULTIPLIER,
        },
        {
          type: "triangle",
          points: [
            {
              x: -size * 0.4 * HITBOX_SIZE_MULTIPLIER,
              y: -size * 0.15 * HITBOX_SIZE_MULTIPLIER,
            },
            {
              x: -size * 0.5 * HITBOX_SIZE_MULTIPLIER,
              y: -size * 0.1 * HITBOX_SIZE_MULTIPLIER,
            },
            {
              x: -size * 0.4 * HITBOX_SIZE_MULTIPLIER,
              y: -size * 0.05 * HITBOX_SIZE_MULTIPLIER,
            },
          ],
        },
        {
          type: "polygon",
          points: [
            {
              x: -size * 0.35 * HITBOX_SIZE_MULTIPLIER,
              y: -size * 0.32 * HITBOX_SIZE_MULTIPLIER,
            },
            {
              x: -size * 0.32 * HITBOX_SIZE_MULTIPLIER,
              y: -size * 0.42 * HITBOX_SIZE_MULTIPLIER,
            },
            {
              x: -size * 0.28 * HITBOX_SIZE_MULTIPLIER,
              y: -size * 0.35 * HITBOX_SIZE_MULTIPLIER,
            },
            {
              x: -size * 0.24 * HITBOX_SIZE_MULTIPLIER,
              y: -size * 0.42 * HITBOX_SIZE_MULTIPLIER,
            },
            {
              x: -size * 0.2 * HITBOX_SIZE_MULTIPLIER,
              y: -size * 0.35 * HITBOX_SIZE_MULTIPLIER,
            },
            {
              x: -size * 0.16 * HITBOX_SIZE_MULTIPLIER,
              y: -size * 0.4 * HITBOX_SIZE_MULTIPLIER,
            },
            {
              x: -size * 0.12 * HITBOX_SIZE_MULTIPLIER,
              y: -size * 0.32 * HITBOX_SIZE_MULTIPLIER,
            },
          ],
        },
        {
          type: "ellipse",
          x: size * 0.15,
          y: -size * 0.1,
          rx: size * 0.25 * HITBOX_SIZE_MULTIPLIER,
          ry: size * 0.15 * HITBOX_SIZE_MULTIPLIER,
        },
        {
          type: "ellipse",
          x: size * 0.3,
          y: -size * 0.05,
          rx: size * 0.15 * HITBOX_SIZE_MULTIPLIER,
          ry: size * 0.08 * HITBOX_SIZE_MULTIPLIER,
        },
        {
          type: "ellipse",
          x: size * 0.32,
          y: size * 0.02,
          rx: size * 0.12 * HITBOX_SIZE_MULTIPLIER,
          ry: size * 0.06 * HITBOX_SIZE_MULTIPLIER,
        },
        {
          type: "ellipse",
          x: size * 0.34,
          y: size * 0.08,
          rx: size * 0.1 * HITBOX_SIZE_MULTIPLIER,
          ry: size * 0.05 * HITBOX_SIZE_MULTIPLIER,
        },
        {
          type: "rectangle",
          x: -size * 0.12,
          y: size * 0.22,
          width: 4 * HITBOX_SIZE_MULTIPLIER,
          height: size * 0.13 * HITBOX_SIZE_MULTIPLIER,
        },
        {
          type: "rectangle",
          x: size * 0.03,
          y: size * 0.22,
          width: 4 * HITBOX_SIZE_MULTIPLIER,
          height: size * 0.13 * HITBOX_SIZE_MULTIPLIER,
        },
      ];

      for (const h of hitboxes) {
        if (h.type === "ellipse") {
          const dx = (lx - h.x) / h.rx;
          const dy = (ly - h.y) / h.ry;
          if (dx * dx + dy * dy <= 1) return true;
        } else if (h.type === "rectangle") {
          if (
            lx >= h.x - h.width / 2 &&
            lx <= h.x + h.width / 2 &&
            ly >= h.y &&
            ly <= h.y + h.height
          )
            return true;
        } else {
          const pts = h.points;
          let inside = false;
          for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
            if (
              pts[i].y > ly !== pts[j].y > ly &&
              lx <
                ((pts[j].x - pts[i].x) * (ly - pts[i].y)) /
                  (pts[j].y - pts[i].y) +
                  pts[i].x
            ) {
              inside = !inside;
            }
          }
          if (inside) return true;
        }
      }
      return false;
    },
    [],
  );

  // ─── Shot handling ──────────────────────────────────────────────────────────

  const handleShotFired = useCallback(
    (mx: number, my: number) => {
      setSessionStats((prev) => ({
        ...prev,
        shotsFired: prev.shotsFired + 1,
        consecutiveHits: 0,
        hasMinimumShots: prev.shotsFired + 1 >= 5,
      }));
      if (score > 0) {
        playMissSound();
        setScore(Math.max(0, score - 5));
        addHitEffect(mx, my, -5);
        updateStatistics({
          totalShotsFired: gameStatistics.totalShotsFired + 1,
          totalMissedShots: gameStatistics.totalMissedShots + 1,
          currentConsecutiveHits: 0,
        });
      } else {
        updateStatistics({
          totalShotsFired: gameStatistics.totalShotsFired + 1,
          currentConsecutiveHits: 0,
        });
      }
    },
    [
      score,
      setScore,
      addHitEffect,
      playMissSound,
      gameStatistics,
      updateStatistics,
    ],
  );

  const handleChickenHit = useCallback(
    (chicken: Chicken) => {
      setSessionStats((prev) => ({
        ...prev,
        chickensShot: prev.chickensShot + 1,
        shotsFired: prev.shotsFired + 1,
        consecutiveHits: prev.consecutiveHits + 1,
        hasMinimumShots: prev.shotsFired + 1 >= 5,
        xpEarned: prev.xpEarned + chicken.points,
      }));
      const catUpdate: Partial<GameStatisticsLocal> = {};
      if (
        chicken.points === 20 ||
        (chicken.points === 25 && chicken.type === "fast")
      )
        catUpdate.smallChickensShot = gameStatistics.smallChickensShot + 1;
      else if (
        chicken.points === 10 ||
        (chicken.points === 15 && chicken.type === "fast")
      )
        catUpdate.mediumChickensShot = gameStatistics.mediumChickensShot + 1;
      else if (
        chicken.points === 5 ||
        (chicken.points === 10 && chicken.type === "fast")
      )
        catUpdate.largeChickensShot = gameStatistics.largeChickensShot + 1;
      const newConsec = gameStatistics.currentConsecutiveHits + 1;
      updateStatistics({
        totalChickensShot: gameStatistics.totalChickensShot + 1,
        goldenChickensShot:
          gameStatistics.goldenChickensShot + (chicken.isGolden ? 1 : 0),
        fastChickensShot:
          gameStatistics.fastChickensShot + (chicken.type === "fast" ? 1 : 0),
        totalShotsFired: gameStatistics.totalShotsFired + 1,
        currentConsecutiveHits: newConsec,
        bestConsecutiveHits: Math.max(
          gameStatistics.bestConsecutiveHits,
          newConsec,
        ),
        totalScore: gameStatistics.totalScore + chicken.points,
        ...catUpdate,
      });
      if (chicken.isGolden) handleGoldenChickenReward();
    },
    [gameStatistics, updateStatistics, handleGoldenChickenReward],
  );

  const handleStopwatchHit = useCallback(() => {
    setSessionStats((prev) => ({
      ...prev,
      shotsFired: prev.shotsFired + 1,
      consecutiveHits: prev.consecutiveHits + 1,
      hasMinimumShots: prev.shotsFired + 1 >= 5,
    }));
    const newConsec = gameStatistics.currentConsecutiveHits + 1;
    updateStatistics({
      totalShotsFired: gameStatistics.totalShotsFired + 1,
      currentConsecutiveHits: newConsec,
      bestConsecutiveHits: Math.max(
        gameStatistics.bestConsecutiveHits,
        newConsec,
      ),
    });
    handleStopwatchReward();
  }, [gameStatistics, updateStatistics, handleStopwatchReward]);

  // ─── Tap processing ─────────────────────────────────────────────────────────

  const processTap = useCallback(
    (tapX: number, tapY: number) => {
      if (currentView !== "game" || gameEnded) return;
      const gs = gameStateRef.current;
      let hit = false;

      if (gs.stopwatch && checkCollision(tapX, tapY, gs.stopwatch)) {
        playStopwatchSound();
        handleStopwatchHit();
        gs.stopwatch.isExploding = true;
        gs.stopwatch.explosionPhase = 0;
        hit = true;
      } else {
        for (let j = gs.chickens.length - 1; j >= 0; j--) {
          const chicken = gs.chickens[j];
          if (checkCollision(tapX, tapY, chicken)) {
            playShotSound();
            const pts = scoreMultiplier.isActive
              ? chicken.points * 2
              : chicken.points;
            addHitEffect(tapX, tapY, pts);
            setScore(score + pts);
            addXP(chicken.points);
            handleChickenHit(chicken);
            chicken.isExploding = true;
            chicken.explosionPhase = 0;
            hit = true;
            break;
          }
        }
      }
      if (!hit) handleShotFired(tapX, tapY);
    },
    [
      score,
      setScore,
      currentView,
      gameEnded,
      checkCollision,
      playShotSound,
      playStopwatchSound,
      addHitEffect,
      addXP,
      handleChickenHit,
      handleStopwatchHit,
      handleShotFired,
      scoreMultiplier,
    ],
  );

  // ─── Mouse / touch handlers ─────────────────────────────────────────────────

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      processTap(e.clientX - rect.left, e.clientY - rect.top);
    },
    [processTap],
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      for (let i = 0; i < e.changedTouches.length; i++) {
        const t = e.changedTouches[i];
        const tx = t.clientX - rect.left;
        const ty = t.clientY - rect.top;
        touchTrackersRef.current.set(t.identifier, {
          id: t.identifier,
          startX: tx,
          startY: ty,
          currentX: tx,
          currentY: ty,
          hasMoved: false,
          startTime: Date.now(),
        });
      }
    },
    [],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      for (let i = 0; i < e.changedTouches.length; i++) {
        const t = e.changedTouches[i];
        const tracker = touchTrackersRef.current.get(t.identifier);
        if (tracker) {
          const tx = t.clientX - rect.left;
          const ty = t.clientY - rect.top;
          const dx = tx - tracker.startX;
          const dy = ty - tracker.startY;
          tracker.currentX = tx;
          tracker.currentY = ty;
          if (Math.sqrt(dx * dx + dy * dy) > TOUCH_MOVEMENT_THRESHOLD)
            tracker.hasMoved = true;
        }
      }
    },
    [],
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      for (let i = 0; i < e.changedTouches.length; i++) {
        const t = e.changedTouches[i];
        const tracker = touchTrackersRef.current.get(t.identifier);
        if (tracker && !tracker.hasMoved)
          processTap(tracker.startX, tracker.startY);
        touchTrackersRef.current.delete(t.identifier);
      }
    },
    [processTap],
  );

  // ─── End game ────────────────────────────────────────────────────────────────

  const endGame = useCallback(() => {
    gameStateRef.current.isRunning = false;
    gameStateRef.current.gameEnded = true;
    setGameEnded(true);
    stopBackgroundMusic();
    stopRainSound();
    stopAISound();
    setScoreMultiplier({ isActive: false, endTime: 0 });
    touchTrackersRef.current.clear();
    const durationMin = Math.round(
      (Date.now() - sessionStats.startTime) / 60000,
    );
    const isPerfect =
      sessionStats.hasMinimumShots &&
      sessionStats.shotsFired > 0 &&
      sessionStats.chickensShot === sessionStats.shotsFired;
    const updatedStats: GameStatisticsLocal = {
      ...gameStatistics,
      totalPlayTimeMinutes: gameStatistics.totalPlayTimeMinutes + durationMin,
      bestSessionChickens: Math.max(
        gameStatistics.bestSessionChickens,
        sessionStats.chickensShot,
      ),
      perfectAccuracySessions:
        gameStatistics.perfectAccuracySessions + (isPerfect ? 1 : 0),
      highestScore: Math.max(gameStatistics.highestScore, score),
    };
    updateStatistics({
      totalPlayTimeMinutes: updatedStats.totalPlayTimeMinutes,
      bestSessionChickens: updatedStats.bestSessionChickens,
      perfectAccuracySessions: updatedStats.perfectAccuracySessions,
      highestScore: updatedStats.highestScore,
    });
    if (isAuthenticated) {
      saveGameStatsMutation.mutate({
        totalChickensShot: BigInt(updatedStats.totalChickensShot),
        goldenChickensShot: BigInt(updatedStats.goldenChickensShot),
        fastChickensShot: BigInt(updatedStats.fastChickensShot),
        smallChickensShot: BigInt(updatedStats.smallChickensShot),
        mediumChickensShot: BigInt(updatedStats.mediumChickensShot),
        largeChickensShot: BigInt(updatedStats.largeChickensShot),
        totalShotsFired: BigInt(updatedStats.totalShotsFired),
        totalMissedShots: BigInt(updatedStats.totalMissedShots),
        currentAccuracy: updatedStats.currentAccuracy,
        bestConsecutiveHits: BigInt(updatedStats.bestConsecutiveHits),
        totalScore: BigInt(updatedStats.totalScore),
        totalPlayTimeMinutes: BigInt(updatedStats.totalPlayTimeMinutes),
        bestSessionChickens: BigInt(updatedStats.bestSessionChickens),
        perfectAccuracySessions: BigInt(updatedStats.perfectAccuracySessions),
        highestScore: BigInt(updatedStats.highestScore),
        level: BigInt(playerData.level),
      });
    }
  }, [
    stopBackgroundMusic,
    stopRainSound,
    stopAISound,
    sessionStats,
    gameStatistics,
    updateStatistics,
    score,
    isAuthenticated,
    saveGameStatsMutation,
    playerData.level,
  ]);

  // ─── Game loop ───────────────────────────────────────────────────────────────

  const gameLoop = useCallback(
    (_ts: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      const gs = gameStateRef.current;
      if (!gs.isRunning || gs.gameEnded) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Stopwatch
      if (shouldSpawnStopwatch()) {
        gs.stopwatch = createStopwatch();
        gs.stopwatchSpawned = true;
      }
      if (gs.stopwatch) {
        const sw = gs.stopwatch;
        if (sw.isExploding) {
          sw.explosionPhase = (sw.explosionPhase || 0) + 1;
          if (sw.explosionPhase >= 30) gs.stopwatch = null;
        } else {
          sw.x += sw.speed;
          sw.pathPhase += Math.abs(sw.speed) * sw.frequency;
          sw.y = sw.baseY + Math.sin(sw.pathPhase) * sw.amplitude;
          const offscreen =
            sw.direction === "left-to-right"
              ? sw.x > canvas.width + sw.size
              : sw.x < -sw.size;
          if (offscreen) gs.stopwatch = null;
        }
        if (gs.stopwatch) drawStopwatch(ctx, gs.stopwatch);
      }

      // Chickens
      for (let i = gs.chickens.length - 1; i >= 0; i--) {
        const ch = gs.chickens[i];
        if (ch.isExploding) {
          ch.explosionPhase = (ch.explosionPhase || 0) + 1;
          if (ch.explosionPhase >= 30) {
            gs.chickens.splice(i, 1);
            gs.chickens.push(createChicken());
            continue;
          }
        } else {
          ch.x += ch.speed;
          ch.wingPhase += ch.type === "fast" ? 0.5 : 0.3;
          const offscreen =
            ch.direction === "left-to-right"
              ? ch.x > canvas.width + ch.size
              : ch.x < -ch.size;
          if (offscreen) {
            gs.chickens.splice(i, 1);
            gs.chickens.push(createChicken());
            continue;
          }
        }
        drawChicken(ctx, ch);
      }
      while (gs.chickens.length < 10) gs.chickens.push(createChicken());

      gs.animationId = requestAnimationFrame(gameLoop);
    },
    [
      createChicken,
      createStopwatch,
      drawChicken,
      drawStopwatch,
      shouldSpawnStopwatch,
    ],
  );

  // ─── Start new round ─────────────────────────────────────────────────────────

  const startNewRound = useCallback(() => {
    const gs = gameStateRef.current;
    gs.isRunning = true;
    gs.gameEnded = false;
    gs.gameStartTime = Date.now();
    gs.goldenChickensSpawned = 0;
    gs.goldenChickenSpawnTimes = generateGoldenChickenSpawnTimes();
    gs.chickens = [];
    gs.stopwatch = null;
    gs.stopwatchSpawned = false;
    gs.stopwatchSpawnTime = undefined;
    gs.totalGameDuration = GAME_DURATION;
    gs.lastBonusTime = 0;
    setGameEnded(false);
    setTimeRemaining(GAME_DURATION);
    setScore(0);
    setScoreMultiplier({ isActive: false, endTime: 0 });
    setRewardNotifications([]);
    setHitEffects([]);
    touchTrackersRef.current.clear();
    setSessionStats({
      chickensShot: 0,
      shotsFired: 0,
      consecutiveHits: 0,
      startTime: Date.now(),
      hasMinimumShots: false,
      xpEarned: 0,
    });
    const canvas = canvasRef.current;
    if (canvas) {
      for (let i = 0; i < 10; i++) {
        const ch = createChicken();
        ch.x =
          ch.direction === "left-to-right"
            ? -ch.size - i * 150
            : canvas.width + ch.size + i * 150;
        gs.chickens.push(ch);
      }
    }
    gs.animationId = requestAnimationFrame(gameLoop);
    createBackgroundMusic();
  }, [
    generateGoldenChickenSpawnTimes,
    setScore,
    createBackgroundMusic,
    createChicken,
    gameLoop,
  ]);

  // ─── Timer effect ────────────────────────────────────────────────────────────

  useEffect(() => {
    if (currentView !== "game" || gameEnded) return;
    const gs = gameStateRef.current;
    if (gs.gameStartTime === 0) {
      gs.gameStartTime = Date.now();
      gs.goldenChickenSpawnTimes = generateGoldenChickenSpawnTimes();
      gs.goldenChickensSpawned = 0;
      gs.totalGameDuration = GAME_DURATION;
      gs.lastBonusTime = 0;
    }
    const interval = setInterval(() => {
      if (gameStateRef.current.gameEnded) {
        clearInterval(interval);
        return;
      }
      const elapsed = (Date.now() - gameStateRef.current.gameStartTime) / 1000;
      const remaining = Math.max(
        0,
        gameStateRef.current.totalGameDuration - elapsed,
      );
      setTimeRemaining(Math.ceil(remaining));
      if (remaining <= 0) {
        clearInterval(interval);
        endGame();
      }
    }, 100);
    return () => clearInterval(interval);
  }, [currentView, gameEnded, endGame, generateGoldenChickenSpawnTimes]);

  // ─── View / music effect ─────────────────────────────────────────────────────

  useEffect(() => {
    if (
      currentView === "game" &&
      gameStateRef.current.isRunning &&
      !gameStateRef.current.gameEnded
    ) {
      createBackgroundMusic();
    } else {
      stopBackgroundMusic();
    }
  }, [currentView, createBackgroundMusic, stopBackgroundMusic]);

  // ─── Cyberpunk rain sound effect ─────────────────────────────────────────────

  useEffect(() => {
    const isGameActive =
      currentView === "game" &&
      gameStateRef.current.isRunning &&
      !gameStateRef.current.gameEnded;
    if (selectedWorld === "cyberpunk" && isGameActive) {
      createRainSound();
    } else {
      stopRainSound();
    }
    return () => {
      stopRainSound();
    };
  }, [selectedWorld, currentView, createRainSound, stopRainSound]);

  // ─── CaffeineAI ambient sound effect ─────────────────────────────────────────

  useEffect(() => {
    const isGameActive =
      currentView === "game" &&
      gameStateRef.current.isRunning &&
      !gameStateRef.current.gameEnded;
    if (selectedWorld === "caffeineai" && isGameActive) {
      createAISound();
    } else {
      stopAISound();
    }
    return () => {
      stopAISound();
    };
  }, [selectedWorld, currentView, createAISound, stopAISound]);

  // ─── Canvas setup / init ─────────────────────────────────────────────────────

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    initializeAudio();
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const gs = gameStateRef.current;
    gs.chickens = [];
    gs.stopwatch = null;
    gs.stopwatchSpawned = false;
    gs.stopwatchSpawnTime = undefined;
    gs.isRunning = true;
    gs.gameStartTime = Date.now();
    gs.gameEnded = false;
    gs.goldenChickensSpawned = 0;
    gs.goldenChickenSpawnTimes = generateGoldenChickenSpawnTimes();
    gs.totalGameDuration = GAME_DURATION;
    gs.lastBonusTime = 0;
    setGameEnded(false);
    setTimeRemaining(GAME_DURATION);
    setScoreMultiplier({ isActive: false, endTime: 0 });
    touchTrackersRef.current.clear();
    setSessionStats({
      chickensShot: 0,
      shotsFired: 0,
      consecutiveHits: 0,
      startTime: Date.now(),
      hasMinimumShots: false,
      xpEarned: 0,
    });

    for (let i = 0; i < 10; i++) {
      const ch = createChicken();
      ch.x =
        ch.direction === "left-to-right"
          ? -ch.size - i * 150
          : canvas.width + ch.size + i * 150;
      gs.chickens.push(ch);
    }
    gs.animationId = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener("resize", resize);
      gameStateRef.current.isRunning = false;
      gameStateRef.current.gameEnded = true;
      if (gameStateRef.current.animationId)
        cancelAnimationFrame(gameStateRef.current.animationId);
      touchTrackersRef.current.clear();
      stopBackgroundMusic();
      stopRainSound();
      stopAISound();
    };
  }, [
    gameLoop,
    createChicken,
    initializeAudio,
    stopBackgroundMusic,
    stopRainSound,
    stopAISound,
    generateGoldenChickenSpawnTimes,
  ]);

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <BackgroundRenderer world={selectedWorld} />

      {/* HUD */}
      {currentView === "game" && !gameEnded && (
        <>
          <div className="absolute top-4 left-4 z-10">
            <div className="score-container-left-aligned-compact bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5 relative">
              <span className="text-white font-bold text-lg">
                Score: {score}
              </span>
              {scoreMultiplier.isActive && (
                <div className="multiplier-indicator">2x</div>
              )}
            </div>
          </div>

          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
            <div className="timer-container-extra-compact bg-red-500/20 backdrop-blur-sm rounded-lg px-3 py-1.5 border-2 border-red-500">
              <span className="text-white font-bold text-lg">
                {timeRemaining}s
              </span>
            </div>
          </div>

          <div className="absolute top-4 right-4 z-10">
            <div className="end-game-container-aligned-compact bg-red-500 hover:bg-red-600 rounded-lg px-3 py-1.5 transition-colors">
              <button
                type="button"
                onClick={endGame}
                className="text-white font-bold text-lg"
                data-ocid="game.end_button"
              >
                End Game
              </button>
            </div>
          </div>
        </>
      )}

      {/* Game Over */}
      {gameEnded && currentView === "game" && (
        <GameOverWindow
          score={score}
          chickensShot={sessionStats.chickensShot}
          xpEarned={sessionStats.xpEarned}
          onRetry={startNewRound}
          onHome={onEndGame}
          playerData={playerData}
          levelXPRequirements={levelXPRequirements}
        />
      )}

      {/* Hit effects */}
      {hitEffects.map((effect) => (
        <div
          key={effect.id}
          className="absolute z-20 pointer-events-none"
          style={{ left: effect.x - 30, top: effect.y - 30 }}
        >
          <div className="hit-effect-container">
            <div className="hit-effect-burst" />
            <div
              className={`hit-effect-points ${effect.points < 0 ? "miss-effect" : ""}`}
            >
              {effect.points > 0 ? `+${effect.points}` : effect.points}
            </div>
          </div>
        </div>
      ))}

      {/* Reward notifications */}
      {rewardNotifications.map((n) => (
        <div
          key={n.id}
          className="absolute top-20 right-4 z-20 pointer-events-none"
        >
          <div className="reward-notification-compact bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-3 py-1.5 rounded-md shadow-md border border-yellow-600 animate-bounce text-sm">
            {n.type === "multiplier" && <span>🌟 2X {n.value}s!</span>}
            {n.type === "score" && <span>💰 +{n.value}</span>}
            {n.type === "xp" && <span>⭐ +{n.value} XP</span>}
            {n.type === "time" && <span>⏰ +{n.value}s</span>}
          </div>
        </div>
      ))}

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        onKeyDown={() => {}}
        onKeyUp={() => {}}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="absolute inset-0 cursor-crosshair touch-none"
        style={{ display: currentView === "game" ? "block" : "none" }}
        data-ocid="game.canvas_target"
      />

      {/* Views — wrapped with paddingBottom:60px so content never overlaps the bottom bar */}
      {currentView === "achievements" && (
        <div className="fixed inset-0 z-40" style={{ paddingBottom: "60px" }}>
          <AchievementsView
            gameStatistics={gameStatistics}
            isAuthenticated={isAuthenticated}
            addXP={addXP}
            playerLevel={playerData.level}
          />
        </div>
      )}
      {currentView === "profile" && (
        <div className="fixed inset-0 z-40" style={{ paddingBottom: "60px" }}>
          <ProfileView
            score={score}
            playerData={playerData}
            isAuthenticated={isAuthenticated}
            gameStatistics={gameStatistics}
          />
        </div>
      )}
      {currentView === "leaderboard" && (
        <div className="fixed inset-0 z-40" style={{ paddingBottom: "60px" }}>
          <LeaderboardView
            currentPlayerScore={gameStatistics.highestScore}
            isAuthenticated={isAuthenticated}
          />
        </div>
      )}
      {currentView === "settings" && (
        <div className="fixed inset-0 z-40" style={{ paddingBottom: "60px" }}>
          <SettingsView onClose={() => setCurrentView("game")} />
        </div>
      )}
      {currentView === "socials" && (
        <div className="fixed inset-0 z-40" style={{ paddingBottom: "60px" }}>
          <SocialsView isAuthenticated={isAuthenticated} />
        </div>
      )}

      <BottomMenu
        currentView={currentView}
        onViewChange={(view) => {
          if (view !== "worldSelection") setCurrentView(view);
        }}
        zIndex={50}
      />
    </div>
  );
};

export default GameScreen;
