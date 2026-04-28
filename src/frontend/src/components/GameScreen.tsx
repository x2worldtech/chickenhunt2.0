import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { BackgroundWorld, GameStatisticsLocal } from "../App";
import {
  useBitcoinPrice,
  useBrentOilPrice,
  usePumpFunPrice,
  useSaveGameStatistics,
} from "../hooks/useQueries";
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

  // Live pump.fun price — only fetches when world is pumpfun
  const { data: pumpFunPriceData } = usePumpFunPrice();
  const pumpFunPrice =
    selectedWorld === "pumpfun" && pumpFunPriceData
      ? {
          price: Number(pumpFunPriceData.price),
          change24h: Number(pumpFunPriceData.change24h),
        }
      : null;

  // Live BTC/USD price — only fetches when world is bitcoin
  const { data: btcPriceData } = useBitcoinPrice();
  const btcPrice =
    selectedWorld === "bitcoin" && btcPriceData
      ? {
          price: Number(btcPriceData.price),
          change24h: Number(btcPriceData.change24h),
        }
      : null;

  // Live BRENT/USD price — only fetches when world is hormuz
  const { data: brentOilData } = useBrentOilPrice();
  const brentOilPrice =
    selectedWorld === "hormuz" && brentOilData
      ? { price: brentOilData.price, change24h: brentOilData.change24h }
      : null;
  const audioContextRef = useRef<AudioContext | null>(null);
  const backgroundMusicGainRef = useRef<GainNode | null>(null);
  const rainSoundGainRef = useRef<GainNode | null>(null);
  const rainSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const aiSoundGainRef = useRef<GainNode | null>(null);
  const aiSoundSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const zombieSoundGainRef = useRef<GainNode | null>(null);
  const zombieSoundSourceRef = useRef<AudioBufferSourceNode | null>(null);
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

  const createZombieSound = useCallback(() => {
    const audioContext = audioContextRef.current;
    if (!audioContext) return;
    try {
      if (audioContext.state === "suspended") audioContext.resume();
      if (zombieSoundSourceRef.current) {
        try {
          zombieSoundSourceRef.current.stop();
        } catch {
          /* ignore */
        }
        zombieSoundSourceRef.current = null;
      }
      if (!zombieSoundGainRef.current) {
        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(
          0.18,
          audioContext.currentTime + 2.5,
        );
        gainNode.connect(audioContext.destination);
        zombieSoundGainRef.current = gainNode;
      } else {
        zombieSoundGainRef.current.gain.setValueAtTime(
          0,
          audioContext.currentTime,
        );
        zombieSoundGainRef.current.gain.linearRampToValueAtTime(
          0.18,
          audioContext.currentTime + 2.5,
        );
      }
      // Low eerie drone oscillator — deep groan
      const droneOsc = audioContext.createOscillator();
      droneOsc.type = "sawtooth";
      droneOsc.frequency.setValueAtTime(38, audioContext.currentTime);
      droneOsc.frequency.linearRampToValueAtTime(
        42,
        audioContext.currentTime + 6,
      );
      droneOsc.frequency.linearRampToValueAtTime(
        36,
        audioContext.currentTime + 12,
      );
      const droneFilter = audioContext.createBiquadFilter();
      droneFilter.type = "lowpass";
      droneFilter.frequency.setValueAtTime(120, audioContext.currentTime);
      const droneGain = audioContext.createGain();
      droneGain.gain.setValueAtTime(0.45, audioContext.currentTime);
      droneOsc.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(zombieSoundGainRef.current);
      droneOsc.start();

      // Wind noise — filtered low to sound like eerie wind moaning
      const bufferSize = audioContext.sampleRate * 4;
      const noiseBuffer = audioContext.createBuffer(
        1,
        bufferSize,
        audioContext.sampleRate,
      );
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.6;
      }
      const noiseSource = audioContext.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;
      // Very low bandpass — wind moan
      const windFilter = audioContext.createBiquadFilter();
      windFilter.type = "bandpass";
      windFilter.frequency.setValueAtTime(80, audioContext.currentTime);
      windFilter.Q.setValueAtTime(0.4, audioContext.currentTime);
      const windFilter2 = audioContext.createBiquadFilter();
      windFilter2.type = "lowpass";
      windFilter2.frequency.setValueAtTime(300, audioContext.currentTime);
      noiseSource.connect(windFilter);
      windFilter.connect(windFilter2);
      windFilter2.connect(zombieSoundGainRef.current);
      noiseSource.start();
      zombieSoundSourceRef.current = noiseSource;

      // Mid-range moan oscillator — subtle undulating pitch
      const moanOsc = audioContext.createOscillator();
      moanOsc.type = "sine";
      moanOsc.frequency.setValueAtTime(90, audioContext.currentTime);
      moanOsc.frequency.linearRampToValueAtTime(
        75,
        audioContext.currentTime + 3,
      );
      moanOsc.frequency.linearRampToValueAtTime(
        95,
        audioContext.currentTime + 7,
      );
      moanOsc.frequency.linearRampToValueAtTime(
        80,
        audioContext.currentTime + 11,
      );
      const moanGain = audioContext.createGain();
      moanGain.gain.setValueAtTime(0.2, audioContext.currentTime);
      const moanFilter = audioContext.createBiquadFilter();
      moanFilter.type = "lowpass";
      moanFilter.frequency.setValueAtTime(200, audioContext.currentTime);
      moanOsc.connect(moanFilter);
      moanFilter.connect(moanGain);
      moanGain.connect(zombieSoundGainRef.current);
      moanOsc.start();
    } catch {
      /* ignore */
    }
  }, []);

  const stopZombieSound = useCallback(() => {
    try {
      if (zombieSoundGainRef.current && audioContextRef.current) {
        zombieSoundGainRef.current.gain.setValueAtTime(
          zombieSoundGainRef.current.gain.value,
          audioContextRef.current.currentTime,
        );
        zombieSoundGainRef.current.gain.linearRampToValueAtTime(
          0,
          audioContextRef.current.currentTime + 0.8,
        );
      }
      if (zombieSoundSourceRef.current) {
        const src = zombieSoundSourceRef.current;
        zombieSoundSourceRef.current = null;
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

  // ─── Pump.fun pill drawing ───────────────────────────────────────────────────

  const drawPumpFunPill = useCallback(
    (ctx: CanvasRenderingContext2D, chicken: Chicken) => {
      if (chicken.isExploding) {
        drawExplosion(ctx, chicken);
        return;
      }
      const { x, y, size, type, direction, isGolden } = chicken;
      const cx = x + size / 2;
      const cy = y + size / 2;

      // Determine pill dimensions based on distance
      let pw: number;
      let ph: number;
      if (chicken.distance === "far") {
        pw = 50;
        ph = 22;
      } else if (chicken.distance === "medium") {
        pw = 80;
        ph = 34;
      } else {
        pw = 110;
        ph = 48;
      }
      const pr = ph / 2; // corner radius = half height (full rounded caps)
      const wingScale = pw / 130; // scale wings relative to medium size (smaller wings)

      ctx.save();
      ctx.translate(cx, cy);
      // Flip horizontally like chicken does
      if (direction === "left-to-right") ctx.scale(-1, 1);
      // Tilt mirrored per direction: left-to-right tilts +40°, right-to-left tilts +40°
      const tiltRad =
        direction === "left-to-right"
          ? (Math.PI * 40) / 180
          : (Math.PI * 40) / 180;
      ctx.rotate(tiltRad);

      // Fast chicken: orange glow shadow around pill
      if (type === "fast" && !isGolden) {
        ctx.shadowColor = "#FF6600";
        ctx.shadowBlur = 12;
      }
      // Golden chicken: golden glow
      if (isGolden) {
        ctx.shadowColor = "#FFD700";
        ctx.shadowBlur = 16;
      }

      // ── Angel wings — attach at TOP and BOTTOM of capsule seam ──
      // In the pill's local frame: pill is horizontal, seam is a vertical line at x=0.
      // Top of seam = (0, -ph/2), Bottom of seam = (0, +ph/2).
      // The TOP wing sweeps UPWARD (negative Y) — visible on one long side of the pill.
      // The BOTTOM wing sweeps DOWNWARD (positive Y) — visible on the other long side.
      const ws = wingScale;
      const wingFill = isGolden ? "#FFE066" : "rgba(255,255,255,0.95)";
      const wingFillInner = isGolden
        ? "rgba(255,220,80,0.7)"
        : "rgba(230,240,255,0.75)";
      const wingStroke = isGolden ? "#FFD700" : "#D4AF37";
      // Flap angle driven by wingPhase (±~20°)
      const flapAngle = Math.sin(chicken.wingPhase) * 0.35;

      // Helper: draw a multi-feather wing spreading outward from (0,0) along negative Y
      const drawWingUp = () => {
        ctx.fillStyle = wingFill;
        ctx.strokeStyle = wingStroke;
        ctx.lineWidth = 1.0 * ws;
        ctx.globalAlpha = 0.97;

        // Feather 1 (innermost) — short, close to body
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

        // Feather 2 — mid layer, sweeps left-upward
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
        ctx.bezierCurveTo(-6 * ws, -28 * ws, 0 * ws, -16 * ws, 2 * ws, -4 * ws);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Feather 3 — wide primary, sweeps left and up with fanned tip
        ctx.fillStyle = wingFillInner;
        ctx.beginPath();
        ctx.moveTo(4 * ws, -1 * ws);
        ctx.bezierCurveTo(
          0 * ws,
          -18 * ws,
          -8 * ws,
          -34 * ws,
          -20 * ws,
          -44 * ws,
        );
        ctx.bezierCurveTo(
          -24 * ws,
          -36 * ws,
          -18 * ws,
          -22 * ws,
          0 * ws,
          -6 * ws,
        );
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Feather 4 (outermost tip) — far left, thin curved tip
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

      // ── Top wing (sweeps upward from top of seam) ──
      ctx.save();
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.translate(0, -ph / 2); // attach at top of seam
      ctx.rotate(-flapAngle); // flap: negative = wing rises
      drawWingUp();
      ctx.restore();

      // ── Bottom wing (mirror of top wing, sweeps downward) ──
      ctx.save();
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.translate(0, ph / 2); // attach at bottom of seam
      ctx.scale(1, -1); // flip vertically so it sweeps downward
      ctx.rotate(flapAngle); // flap in opposite phase (symmetric)
      drawWingUp();
      ctx.restore();

      ctx.globalAlpha = 1.0;

      // ── Pill body ──
      // Left (green/golden) half — clipped to left half
      ctx.save();
      ctx.beginPath();
      // Full capsule path (for clipping left half)
      ctx.rect(-pw / 2, -ph / 2, pw / 2, ph);
      ctx.clip();
      const leftColor = isGolden ? "#FFD700" : "#4ADE80";
      const leftColorEnd = isGolden ? "#F59E0B" : "#22C55E";
      const lgLeft = ctx.createLinearGradient(
        -pw / 2,
        -ph / 2,
        -pw / 2,
        ph / 2,
      );
      lgLeft.addColorStop(0, leftColor);
      lgLeft.addColorStop(1, leftColorEnd);
      ctx.fillStyle = lgLeft;
      ctx.beginPath();
      ctx.roundRect(-pw / 2, -ph / 2, pw, ph, pr);
      ctx.fill();
      ctx.restore();

      // Right (white) half — clipped to right half
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

      // Dark border around full pill
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-pw / 2, -ph / 2, pw, ph, pr);
      ctx.stroke();

      // Gray seam line at center (capsule separation)
      ctx.strokeStyle = "#888888";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, -ph / 2);
      ctx.lineTo(0, ph / 2);
      ctx.stroke();

      // Gloss highlight on top-left of green half
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

      ctx.restore();
    },
    [drawExplosion],
  );

  // ─── Bitcoin coin drawing ────────────────────────────────────────────────────

  const drawBitcoinCoin = useCallback(
    (ctx: CanvasRenderingContext2D, chicken: Chicken) => {
      if (chicken.isExploding) {
        drawExplosion(ctx, chicken);
        return;
      }
      const { x, y, size, type, isGolden, wingPhase } = chicken;
      const cx = x + size / 2;
      const cy = y + size / 2;

      // Coin radius based on distance
      let r: number;
      if (chicken.distance === "far") {
        r = 14;
      } else if (chicken.distance === "medium") {
        r = 22;
      } else {
        r = 32;
      }

      // Subtle bob using wingPhase (same field reused for animation timing)
      const bob = Math.sin(wingPhase) * 2.5;

      ctx.save();
      ctx.translate(cx, cy + bob);

      // Glow for fast / golden variants
      if (type === "fast" && !isGolden) {
        ctx.shadowColor = "#FF6600";
        ctx.shadowBlur = 12;
      }
      if (isGolden) {
        ctx.shadowColor = "#FFD700";
        ctx.shadowBlur = 18;
      }

      // Coin edge (slightly darker ring)
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.strokeStyle = isGolden ? "#B8860B" : "#B8860B";
      ctx.lineWidth = r * 0.12;
      ctx.stroke();

      // Coin body — metallic radial gradient
      const grad = ctx.createRadialGradient(
        -r * 0.3,
        -r * 0.3,
        r * 0.05,
        0,
        0,
        r,
      );
      if (isGolden) {
        grad.addColorStop(0, "#FFF176");
        grad.addColorStop(0.45, "#FFD700");
        grad.addColorStop(1, "#B8860B");
      } else {
        grad.addColorStop(0, "#FFE066");
        grad.addColorStop(0.45, "#F7931A");
        grad.addColorStop(1, "#8B5E00");
      }
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();

      // White gloss highlight (top-left arc)
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

      // ₿ symbol — drawn as scaled SVG path in canvas
      // The official Bitcoin ₿ path natural bbox: ~80x120 units
      // We scale it to fit r*1.1 height → scale = (r*1.1)/120 * 2
      const btcScale = (r * 1.15) / 100;
      ctx.save();
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.translate(0, 0);
      ctx.scale(btcScale, btcScale);
      // Center the path: natural center is ~(40, 60), so translate(-40,-60)
      ctx.translate(-40, -60);
      ctx.rotate((14 * Math.PI) / 180);
      ctx.fillStyle = "#FFFFFF";
      ctx.globalAlpha = 0.95;
      const p = new Path2D(
        "M78.3 36.6c1.8-12.2-7.5-18.8-20.2-23.2l4.1-16.6-10.1-2.5-4 16.1c-2.7-.7-5.4-1.3-8.1-1.9l4.1-16.3-10.1-2.5-4.1 16.6c-2.2-.5-4.4-1-6.5-1.5l0 0-13.9-3.5-2.7 10.8s7.5 1.7 7.4 1.8c4.1 1 4.8 3.7 4.7 5.9l-4.7 18.8c.3.1.7.2 1.1.3-.4-.1-.7-.2-1.1-.3l-6.6 26.4c-.5 1.2-1.8 3-4.6 2.3.1.1-7.4-1.9-7.4-1.9l-5.1 11.5 13.2 3.3c2.4.6 4.8 1.2 7.2 1.9l-4.2 16.7 10.1 2.5 4.1-16.6c2.8.7 5.5 1.4 8.2 2.1l-4.1 16.5 10.1 2.5 4.2-16.8c17.3 3.3 30.3 1.9 35.8-13.6 4.4-12.6.2-19.9-9.3-24.6 6.6-1.5 11.6-5.9 12.9-14.7zm-23.1 32.4c-3.1 12.6-24.3 5.8-31.2 4.1l5.6-22.3c6.9 1.7 28.9 5.1 25.6 18.2zm3.1-32.7c-2.9 11.5-20.5 5.7-26.2 4.2l5-20.1c5.7 1.4 24.1 4.1 21.2 15.9z",
      );
      ctx.fill(p);
      ctx.globalAlpha = 1;
      ctx.restore();

      ctx.restore();
    },
    [drawExplosion],
  );

  // ─── Ocean fish drawing ──────────────────────────────────────────────────────

  const drawOceanFish = useCallback(
    (ctx: CanvasRenderingContext2D, chicken: Chicken) => {
      if (chicken.isExploding) {
        drawExplosion(ctx, chicken);
        return;
      }
      const { x, y, size, wingPhase, direction, type, isGolden } = chicken;
      const cx = x + size / 2;
      const cy = y + size / 2;

      // Fish dimensions based on distance tier
      let fw: number; // fish width (body length)
      let fh: number; // fish height (body height)
      if (chicken.distance === "far") {
        fw = 48;
        fh = 20;
      } else if (chicken.distance === "medium") {
        fw = 76;
        fh = 32;
      } else {
        fw = 108;
        fh = 46;
      }

      // Animated tail wag and fin flutter via wingPhase
      const tailWag = Math.sin(wingPhase) * 0.28;
      const finFlutter = Math.sin(wingPhase * 1.3) * 0.18;

      ctx.save();
      ctx.translate(cx, cy);
      // Flip so fish faces direction of travel
      if (direction === "left-to-right") ctx.scale(-1, 1);

      // Bioluminescent glow
      if (isGolden) {
        ctx.shadowColor = "#FFD700";
        ctx.shadowBlur = 18;
      } else if (type === "fast") {
        ctx.shadowColor = "#00FFFF";
        ctx.shadowBlur = 14;
      } else {
        ctx.shadowColor = "#00BFFF";
        ctx.shadowBlur = 10;
      }

      // ── Tail fin (behind body, animated) ──
      ctx.save();
      ctx.translate(fw * 0.38, 0);
      ctx.rotate(tailWag);
      const tailGrad = ctx.createLinearGradient(0, -fh * 0.6, 0, fh * 0.6);
      tailGrad.addColorStop(
        0,
        isGolden ? "#FFE066" : type === "fast" ? "#FF8C00" : "#CE93D8",
      );
      tailGrad.addColorStop(
        1,
        isGolden ? "#F59E0B" : type === "fast" ? "#FF3D00" : "#7B1FA2",
      );
      ctx.fillStyle = tailGrad;
      ctx.strokeStyle = isGolden
        ? "#B8860B"
        : type === "fast"
          ? "#CC2200"
          : "#4A148C";
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

      // ── Main body ──
      const bodyGrad = ctx.createRadialGradient(
        -fw * 0.15,
        -fh * 0.1,
        fh * 0.05,
        0,
        0,
        fh * 0.72,
      );
      if (isGolden) {
        bodyGrad.addColorStop(0, "#FFF176");
        bodyGrad.addColorStop(0.4, "#FFD700");
        bodyGrad.addColorStop(1, "#B8860B");
      } else if (type === "fast") {
        bodyGrad.addColorStop(0, "#FFAB40");
        bodyGrad.addColorStop(0.35, "#FF6B35");
        bodyGrad.addColorStop(0.7, "#E53935");
        bodyGrad.addColorStop(1, "#7B1FA2");
      } else {
        bodyGrad.addColorStop(0, "#80DEEA");
        bodyGrad.addColorStop(0.3, "#26C6DA");
        bodyGrad.addColorStop(0.65, "#F48FB1");
        bodyGrad.addColorStop(1, "#7B1FA2");
      }
      ctx.fillStyle = bodyGrad;
      ctx.strokeStyle = isGolden
        ? "#B8860B"
        : type === "fast"
          ? "#CC2200"
          : "#1565C0";
      ctx.lineWidth = Math.max(1, fh * 0.04);
      ctx.beginPath();
      ctx.ellipse(0, 0, fw * 0.42, fh * 0.42, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // ── Scale pattern (decorative arcs) ──
      const scaleColor = isGolden
        ? "rgba(255,255,255,0.3)"
        : "rgba(255,255,255,0.2)";
      ctx.strokeStyle = scaleColor;
      ctx.lineWidth = Math.max(0.5, fh * 0.025);
      const scaleRows = chicken.distance === "far" ? 2 : 3;
      const scaleCols = chicken.distance === "far" ? 3 : 4;
      for (let row = 0; row < scaleRows; row++) {
        for (let col = 0; col < scaleCols; col++) {
          const sx = -fw * 0.2 + col * fw * 0.14;
          const sy = -fh * 0.15 + row * fh * 0.18;
          const sr = fh * 0.1;
          ctx.beginPath();
          ctx.arc(sx, sy, sr, Math.PI * 0.2, Math.PI * 0.8);
          ctx.stroke();
        }
      }

      // ── Dorsal fin (top, animated) ──
      ctx.save();
      ctx.rotate(finFlutter * 0.5);
      const dorsalGrad = ctx.createLinearGradient(0, -fh * 0.42, 0, -fh * 0.85);
      if (isGolden) {
        dorsalGrad.addColorStop(0, "#FFE066");
        dorsalGrad.addColorStop(1, "rgba(255,200,50,0)");
      } else if (type === "fast") {
        dorsalGrad.addColorStop(0, "#FF8C00");
        dorsalGrad.addColorStop(1, "rgba(255,80,0,0)");
      } else {
        dorsalGrad.addColorStop(0, "#80DEEA");
        dorsalGrad.addColorStop(1, "rgba(100,200,220,0)");
      }
      ctx.fillStyle = dorsalGrad;
      ctx.strokeStyle = isGolden
        ? "#DAA520"
        : type === "fast"
          ? "#CC2200"
          : "#0097A7";
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

      // ── Pectoral fin (side, animated) ──
      ctx.save();
      ctx.translate(-fw * 0.05, fh * 0.1);
      ctx.rotate(finFlutter);
      const pectColor = isGolden
        ? "rgba(255,220,50,0.7)"
        : type === "fast"
          ? "rgba(255,120,0,0.7)"
          : "rgba(180,240,255,0.7)";
      ctx.fillStyle = pectColor;
      ctx.strokeStyle = isGolden
        ? "#DAA520"
        : type === "fast"
          ? "#BB3300"
          : "#0097A7";
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

      // ── Gloss highlight ──
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

      // ── Stripe (tropical pattern) ──
      if (!isGolden) {
        ctx.strokeStyle =
          type === "fast" ? "rgba(255,255,150,0.45)" : "rgba(255,255,255,0.35)";
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
      }

      // ── Eye ──
      const eyeX = -fw * 0.28;
      const eyeY = -fh * 0.06;
      const eyeR = Math.max(2, fh * 0.1);
      // Eye white
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, eyeR, 0, Math.PI * 2);
      ctx.fill();
      // Iris
      const irisColor = isGolden
        ? "#FFB300"
        : type === "fast"
          ? "#FF5722"
          : "#00BCD4";
      ctx.fillStyle = irisColor;
      ctx.beginPath();
      ctx.arc(eyeX - eyeR * 0.1, eyeY, eyeR * 0.72, 0, Math.PI * 2);
      ctx.fill();
      // Pupil
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(eyeX - eyeR * 0.15, eyeY, eyeR * 0.36, 0, Math.PI * 2);
      ctx.fill();
      // Catchlight
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

      // ── Mouth ──
      ctx.strokeStyle = isGolden ? "#B8860B" : "#1565C0";
      ctx.lineWidth = Math.max(0.8, fh * 0.04);
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-fw * 0.41, -fh * 0.04);
      ctx.quadraticCurveTo(-fw * 0.44, fh * 0.04, -fw * 0.41, fh * 0.1);
      ctx.stroke();

      // ── Bioluminescent spots (deep-sea touch) ──
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
        const spotColor = isGolden
          ? "rgba(255,240,100,0.85)"
          : type === "fast"
            ? "rgba(255,200,50,0.8)"
            : "rgba(150,255,255,0.75)";
        const spotEdge = isGolden
          ? "rgba(255,180,0,0)"
          : type === "fast"
            ? "rgba(255,100,0,0)"
            : "rgba(0,200,200,0)";
        spotGlow.addColorStop(0, spotColor);
        spotGlow.addColorStop(1, spotEdge);
        ctx.fillStyle = spotGlow;
        ctx.beginPath();
        ctx.arc(sp.sx, sp.sy, sp.sr, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.restore();
    },
    [drawExplosion],
  );

  // ─── Coronavirus particle drawing ────────────────────────────────────────────

  const drawCoronaVirus = useCallback(
    (ctx: CanvasRenderingContext2D, chicken: Chicken) => {
      if (chicken.isExploding) {
        drawExplosion(ctx, chicken);
        return;
      }
      const { x, y, size, wingPhase, direction, type, isGolden } = chicken;
      const cx = x + size / 2;
      const cy = y + size / 2;

      // Size tiers by distance
      let r: number; // body radius
      let spikeLen: number;
      if (chicken.distance === "far") {
        r = 16;
        spikeLen = 10;
      } else if (chicken.distance === "medium") {
        r = 28;
        spikeLen = 16;
      } else {
        r = 42;
        spikeLen = 24;
      }

      ctx.save();
      ctx.translate(cx, cy);
      // Mirror based on direction of travel
      if (direction === "right-to-left") ctx.scale(-1, 1);

      // Glow
      if (isGolden) {
        ctx.shadowColor = "#FFD700";
        ctx.shadowBlur = 18;
      } else if (type === "fast") {
        ctx.shadowColor = "#FF4500";
        ctx.shadowBlur = 14;
      } else {
        ctx.shadowColor = "#CC0000";
        ctx.shadowBlur = 8;
      }

      // ── Spikes first (behind body) ──
      const NUM_SPIKES = 14;
      for (let i = 0; i < NUM_SPIKES; i++) {
        const angle = (i / NUM_SPIKES) * Math.PI * 2;
        const tipR = r + spikeLen + Math.sin(wingPhase + i) * 0.5;
        const stemX1 = Math.cos(angle) * r * 0.85;
        const stemY1 = Math.sin(angle) * r * 0.85;
        const tipX = Math.cos(angle) * (r + spikeLen);
        const tipY = Math.sin(angle) * (r + spikeLen);
        const bulbR = spikeLen * 0.28 + Math.sin(wingPhase + i) * 0.5;

        // Spike stem
        ctx.strokeStyle = isGolden ? "#8B6914" : "#8B0000";
        ctx.lineWidth = Math.max(1, r * 0.09);
        ctx.lineCap = "round";
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
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
        if (isGolden) {
          tipGrad.addColorStop(0, "#FFE066");
          tipGrad.addColorStop(0.5, "#DAA520");
          tipGrad.addColorStop(1, "#8B6914");
        } else {
          tipGrad.addColorStop(0, "#FF4444");
          tipGrad.addColorStop(0.5, "#CC0000");
          tipGrad.addColorStop(1, "#8B0000");
        }
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
      if (isGolden) {
        bodyGrad.addColorStop(0, "#FFF8D6");
        bodyGrad.addColorStop(0.35, "#FFD700");
        bodyGrad.addColorStop(0.7, "#B8860B");
        bodyGrad.addColorStop(1, "#8B6914");
      } else {
        bodyGrad.addColorStop(0, "#E8E8E8");
        bodyGrad.addColorStop(0.35, "#C0C0C0");
        bodyGrad.addColorStop(0.7, "#A8A8A8");
        bodyGrad.addColorStop(1, "#6A6A6A");
      }
      ctx.fillStyle = bodyGrad;
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = isGolden ? "rgba(120,90,0,0.5)" : "rgba(80,80,80,0.5)";
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
        ctx.fillStyle = isGolden ? "#FFB300" : "#FFA500";
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

      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.restore();
    },
    [drawExplosion],
  );

  // ─── Hormuz warcraft drawing (rockets and fighter jets) ──────────────────────

  const drawHormuzWarcraft = useCallback(
    (ctx: CanvasRenderingContext2D, chicken: Chicken) => {
      if (chicken.isExploding) {
        drawExplosion(ctx, chicken);
        return;
      }
      const { x, y, size, wingPhase, direction, type, isGolden, id } = chicken;
      const cx = x + size / 2;
      const cy = y + size / 2;

      // Dimensions by distance tier
      let w: number;
      let h: number;
      if (chicken.distance === "far") {
        w = 42;
        h = 13;
      } else if (chicken.distance === "medium") {
        w = 70;
        h = 22;
      } else {
        w = 102;
        h = 32;
      }

      const isRocket = id % 2 === 0;

      ctx.save();
      ctx.translate(cx, cy);
      // Mirror so craft faces direction of travel
      if (direction === "left-to-right") ctx.scale(-1, 1);

      // Golden / fast glow
      if (isGolden) {
        ctx.shadowColor = "#FFD700";
        ctx.shadowBlur = 18;
      } else if (type === "fast") {
        ctx.shadowColor = "#FF4500";
        ctx.shadowBlur = 12;
      } else {
        ctx.shadowColor = "rgba(255,100,0,0.4)";
        ctx.shadowBlur = 6;
      }

      if (isRocket) {
        // ── Premium Military Rocket / Missile ──
        const gc = isGolden; // golden color mode

        // Exhaust flame: white core → orange → transparent
        const flameLen = w * 0.45;
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        const flameCoreGrad = ctx.createLinearGradient(
          w * 0.36,
          0,
          w * 0.36 + flameLen,
          0,
        );
        flameCoreGrad.addColorStop(
          0,
          gc ? "rgba(255,255,200,0.95)" : "rgba(255,255,255,0.95)",
        );
        flameCoreGrad.addColorStop(
          0.15,
          gc ? "rgba(255,200,50,0.9)" : "rgba(255,220,80,0.9)",
        );
        flameCoreGrad.addColorStop(0.45, "rgba(255,100,0,0.65)");
        flameCoreGrad.addColorStop(1, "rgba(255,60,0,0)");
        const flameHaloGrad = ctx.createLinearGradient(
          w * 0.36,
          0,
          w * 0.36 + flameLen * 1.1,
          0,
        );
        flameHaloGrad.addColorStop(0, "rgba(255,160,40,0.5)");
        flameHaloGrad.addColorStop(0.5, "rgba(255,80,0,0.25)");
        flameHaloGrad.addColorStop(1, "rgba(255,40,0,0)");
        ctx.fillStyle = flameHaloGrad;
        ctx.beginPath();
        ctx.moveTo(w * 0.36, -h * 0.32);
        ctx.lineTo(w * 0.36 + flameLen * 1.1, -h * 0.08);
        ctx.lineTo(w * 0.36 + flameLen * 1.1, h * 0.08);
        ctx.lineTo(w * 0.36, h * 0.32);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = flameCoreGrad;
        ctx.beginPath();
        ctx.moveTo(w * 0.36, -h * 0.2);
        ctx.lineTo(w * 0.36 + flameLen, -h * 0.05);
        ctx.lineTo(w * 0.36 + flameLen, h * 0.05);
        ctx.lineTo(w * 0.36, h * 0.2);
        ctx.closePath();
        ctx.fill();

        if (isGolden) ctx.shadowColor = "#FFD700";
        ctx.shadowBlur = 18;

        // Cylindrical body — metallic gradient
        const bodyMetalGrad = ctx.createLinearGradient(0, -h * 0.5, 0, h * 0.5);
        if (gc) {
          bodyMetalGrad.addColorStop(0, "#FFF5CC");
          bodyMetalGrad.addColorStop(0.18, "#FFE57F");
          bodyMetalGrad.addColorStop(0.5, "#DAA520");
          bodyMetalGrad.addColorStop(0.82, "#FFE082");
          bodyMetalGrad.addColorStop(1, "#FFF0B0");
        } else {
          bodyMetalGrad.addColorStop(0, "#F0F0F8");
          bodyMetalGrad.addColorStop(0.18, "#D8D8E8");
          bodyMetalGrad.addColorStop(0.5, "#B0B0C8");
          bodyMetalGrad.addColorStop(0.82, "#D0D0E0");
          bodyMetalGrad.addColorStop(1, "#E8E8F0");
        }
        ctx.fillStyle = bodyMetalGrad;
        ctx.beginPath();
        ctx.roundRect(-w * 0.38, -h * 0.22, w * 0.74, h * 0.44, h * 0.08);
        ctx.fill();
        ctx.strokeStyle = gc ? "#8B6914" : "#50506A";
        ctx.lineWidth = Math.max(0.8, h * 0.05);
        ctx.stroke();

        // Ogive nose cone
        const noseGrad = ctx.createLinearGradient(
          -w * 0.52,
          -h * 0.22,
          -w * 0.52,
          h * 0.22,
        );
        if (gc) {
          noseGrad.addColorStop(0, "#FFE082");
          noseGrad.addColorStop(0.5, "#B8860B");
          noseGrad.addColorStop(1, "#FFE082");
        } else {
          noseGrad.addColorStop(0, "#E8E8F0");
          noseGrad.addColorStop(0.5, "#C0C0D0");
          noseGrad.addColorStop(1, "#E8E8F0");
        }
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
        ctx.strokeStyle = gc ? "#8B6914" : "#50506A";
        ctx.lineWidth = Math.max(0.8, h * 0.05);
        ctx.stroke();

        // Warning band #1
        ctx.fillStyle = gc ? "#FFD700" : "#CC1111";
        ctx.beginPath();
        ctx.roundRect(-w * 0.26, -h * 0.22, w * 0.09, h * 0.44, h * 0.04);
        ctx.fill();
        // Warning band #2
        ctx.beginPath();
        ctx.roundRect(w * 0.08, -h * 0.22, w * 0.09, h * 0.44, h * 0.04);
        ctx.fill();

        // Dashed center seam
        ctx.strokeStyle = gc ? "rgba(150,120,0,0.4)" : "rgba(80,80,100,0.4)";
        ctx.lineWidth = Math.max(0.5, h * 0.03);
        ctx.setLineDash([h * 0.12, h * 0.08]);
        ctx.beginPath();
        ctx.moveTo(-w * 0.3, 0);
        ctx.lineTo(w * 0.35, 0);
        ctx.stroke();
        ctx.setLineDash([]);

        // 4 cruciform stabilizer fins
        ctx.fillStyle = gc ? "#B8860B" : "#404050";
        ctx.strokeStyle = gc ? "#8B6914" : "#28282E";
        ctx.lineWidth = Math.max(0.5, h * 0.04);
        ctx.beginPath();
        ctx.moveTo(w * 0.22, -h * 0.22);
        ctx.lineTo(w * 0.18, -h * 0.55);
        ctx.lineTo(w * 0.36, -h * 0.22);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(w * 0.22, h * 0.22);
        ctx.lineTo(w * 0.18, h * 0.55);
        ctx.lineTo(w * 0.36, h * 0.22);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(w * 0.14, -h * 0.22);
        ctx.lineTo(w * 0.12, -h * 0.38);
        ctx.lineTo(w * 0.24, -h * 0.22);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(w * 0.14, h * 0.22);
        ctx.lineTo(w * 0.12, h * 0.38);
        ctx.lineTo(w * 0.24, h * 0.22);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Body gloss
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
        const gc = isGolden;

        // Twin engine afterburner cones
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        const afterOuterGrad = ctx.createLinearGradient(
          w * 0.34,
          0,
          w * 0.68,
          0,
        );
        afterOuterGrad.addColorStop(
          0,
          gc ? "rgba(255,220,60,0.4)" : "rgba(255,140,30,0.4)",
        );
        afterOuterGrad.addColorStop(1, "rgba(255,60,0,0)");
        ctx.fillStyle = afterOuterGrad;
        ctx.beginPath();
        ctx.ellipse(w * 0.5, 0, w * 0.22, h * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();
        const afterW = w * 0.22;
        const makeABGrad = (yOff: number) => {
          const g = ctx.createRadialGradient(
            w * 0.4,
            yOff,
            0,
            w * 0.4,
            yOff,
            afterW * 0.7,
          );
          g.addColorStop(
            0,
            gc ? "rgba(255,255,180,0.98)" : "rgba(255,255,220,0.98)",
          );
          g.addColorStop(
            0.25,
            gc ? "rgba(255,210,60,0.85)" : "rgba(255,200,50,0.85)",
          );
          g.addColorStop(0.6, "rgba(255,90,0,0.5)");
          g.addColorStop(1, "rgba(255,40,0,0)");
          return g;
        };
        ctx.fillStyle = makeABGrad(-h * 0.1);
        ctx.beginPath();
        ctx.ellipse(
          w * 0.4,
          -h * 0.1,
          afterW * 0.6,
          h * 0.16,
          0,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.fillStyle = makeABGrad(h * 0.1);
        ctx.beginPath();
        ctx.ellipse(
          w * 0.4,
          h * 0.1,
          afterW * 0.6,
          h * 0.16,
          0,
          0,
          Math.PI * 2,
        );
        ctx.fill();

        if (isGolden) {
          ctx.shadowColor = "#FFD700";
          ctx.shadowBlur = 18;
        } else if (type === "fast") {
          ctx.shadowColor = "#FF4500";
          ctx.shadowBlur = 12;
        } else {
          ctx.shadowColor = "rgba(255,100,0,0.4)";
          ctx.shadowBlur = 6;
        }

        // Swept delta wings
        const wingTopGrad = ctx.createLinearGradient(0, -h * 0.7, 0, 0);
        wingTopGrad.addColorStop(0, gc ? "#FFF0A0" : "#C8C8D0");
        wingTopGrad.addColorStop(0.5, gc ? "#DAA520" : "#909098");
        wingTopGrad.addColorStop(1, gc ? "#A07810" : "#606070");
        const wingBotGrad = ctx.createLinearGradient(0, 0, 0, h * 0.7);
        wingBotGrad.addColorStop(0, gc ? "#A07810" : "#606070");
        wingBotGrad.addColorStop(0.5, gc ? "#DAA520" : "#909098");
        wingBotGrad.addColorStop(1, gc ? "#FFF0A0" : "#C8C8D0");

        ctx.fillStyle = wingTopGrad;
        ctx.beginPath();
        ctx.moveTo(-w * 0.42, 0);
        ctx.lineTo(-w * 0.05, -h * 0.66);
        ctx.lineTo(w * 0.28, -h * 0.36);
        ctx.lineTo(w * 0.4, -h * 0.22);
        ctx.lineTo(w * 0.4, -h * 0.04);
        ctx.lineTo(-w * 0.38, -h * 0.06);
        ctx.closePath();
        ctx.fill();

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

        ctx.strokeStyle = gc ? "#8B6914" : "#3A3A48";
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

        // Canards
        ctx.fillStyle = gc ? "#D4A020" : "#8090A0";
        ctx.strokeStyle = gc ? "#8B6914" : "#303038";
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

        // Fuselage
        const fuseTopGrad = ctx.createLinearGradient(0, -h * 0.22, 0, h * 0.22);
        if (gc) {
          fuseTopGrad.addColorStop(0, "#FFF5CC");
          fuseTopGrad.addColorStop(0.3, "#FFE082");
          fuseTopGrad.addColorStop(0.7, "#B8860B");
          fuseTopGrad.addColorStop(1, "#FFE082");
        } else {
          fuseTopGrad.addColorStop(0, "#D0D0D8");
          fuseTopGrad.addColorStop(0.3, "#A0A0B0");
          fuseTopGrad.addColorStop(0.7, "#707080");
          fuseTopGrad.addColorStop(1, "#A8A8B8");
        }
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
        ctx.strokeStyle = gc ? "#8B6914" : "#2A2A38";
        ctx.lineWidth = Math.max(0.6, h * 0.04);
        ctx.stroke();

        // Engine intakes
        ctx.fillStyle = "#1A1A28";
        ctx.strokeStyle = gc ? "#806010" : "#404050";
        ctx.lineWidth = Math.max(0.4, h * 0.03);
        ctx.beginPath();
        ctx.roundRect(-w * 0.05, -h * 0.19, w * 0.22, h * 0.06, h * 0.02);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.roundRect(-w * 0.05, h * 0.13, w * 0.22, h * 0.06, h * 0.02);
        ctx.fill();
        ctx.stroke();

        // Engine nacelles
        const nacGrad = ctx.createLinearGradient(0, -h * 0.15, 0, h * 0.15);
        nacGrad.addColorStop(0, gc ? "#FFE082" : "#B0B0C0");
        nacGrad.addColorStop(0.5, gc ? "#DAA520" : "#707080");
        nacGrad.addColorStop(1, gc ? "#FFE082" : "#B0B0C0");
        ctx.fillStyle = nacGrad;
        ctx.strokeStyle = gc ? "#8B6914" : "#303040";
        ctx.lineWidth = Math.max(0.4, h * 0.03);
        ctx.beginPath();
        ctx.roundRect(w * 0.18, -h * 0.22, w * 0.22, h * 0.1, h * 0.04);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.roundRect(w * 0.18, h * 0.12, w * 0.22, h * 0.1, h * 0.04);
        ctx.fill();
        ctx.stroke();

        // Canted twin vertical tail fins
        ctx.fillStyle = gc ? "#C8A020" : "#808090";
        ctx.strokeStyle = gc ? "#8B6914" : "#303038";
        ctx.lineWidth = Math.max(0.5, h * 0.04);
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

        // Cockpit canopy
        const canopyGrad = ctx.createRadialGradient(
          -w * 0.2,
          -h * 0.1,
          0,
          -w * 0.18,
          0,
          h * 0.14,
        );
        if (gc) {
          canopyGrad.addColorStop(0, "rgba(255,240,160,0.75)");
          canopyGrad.addColorStop(0.4, "rgba(180,120,0,0.7)");
          canopyGrad.addColorStop(1, "rgba(80,50,0,0.85)");
        } else {
          canopyGrad.addColorStop(0, "rgba(160,220,255,0.75)");
          canopyGrad.addColorStop(0.4, "rgba(30,80,140,0.7)");
          canopyGrad.addColorStop(1, "rgba(10,30,80,0.85)");
        }
        ctx.fillStyle = canopyGrad;
        ctx.strokeStyle = gc ? "#8B6914" : "#1A2A3A";
        ctx.lineWidth = Math.max(0.5, h * 0.04);
        ctx.beginPath();
        ctx.ellipse(-w * 0.18, 0, w * 0.1, h * 0.13, -0.15, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = gc
          ? "rgba(255,250,200,0.55)"
          : "rgba(220,240,255,0.55)";
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

        // Wingtip missiles
        ctx.fillStyle = gc ? "#FFE082" : "#D0D0D8";
        ctx.strokeStyle = gc ? "#8B6914" : "#606068";
        ctx.lineWidth = Math.max(0.4, h * 0.03);
        ctx.beginPath();
        ctx.roundRect(-w * 0.08, -h * 0.62, w * 0.18, h * 0.07, h * 0.025);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = gc ? "#FFD700" : "#CC1111";
        ctx.beginPath();
        ctx.roundRect(-w * 0.08, -h * 0.62, w * 0.04, h * 0.07, h * 0.025);
        ctx.fill();
        ctx.fillStyle = gc ? "#FFE082" : "#D0D0D8";
        ctx.beginPath();
        ctx.roundRect(-w * 0.08, h * 0.55, w * 0.18, h * 0.07, h * 0.025);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = gc ? "#FFD700" : "#CC1111";
        ctx.beginPath();
        ctx.roundRect(-w * 0.08, h * 0.55, w * 0.04, h * 0.07, h * 0.025);
        ctx.fill();

        // Panel lines
        ctx.strokeStyle = gc ? "rgba(120,90,0,0.35)" : "rgba(60,60,80,0.35)";
        ctx.lineWidth = Math.max(0.4, h * 0.025);
        ctx.setLineDash([w * 0.04, w * 0.03]);
        ctx.beginPath();
        ctx.moveTo(-w * 0.35, -h * 0.04);
        ctx.lineTo(w * 0.35, -h * 0.04);
        ctx.moveTo(-w * 0.35, h * 0.04);
        ctx.lineTo(w * 0.35, h * 0.04);
        ctx.stroke();
        ctx.setLineDash([]);

        // Fuselage top gloss
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

      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
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
    stopZombieSound();
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
    stopZombieSound,
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
        if (selectedWorld === "pumpfun") {
          drawPumpFunPill(ctx, ch);
        } else if (selectedWorld === "bitcoin") {
          drawBitcoinCoin(ctx, ch);
        } else if (selectedWorld === "ocean") {
          drawOceanFish(ctx, ch);
        } else if (selectedWorld === "corona") {
          drawCoronaVirus(ctx, ch);
        } else if (selectedWorld === "hormuz") {
          drawHormuzWarcraft(ctx, ch);
        } else {
          drawChicken(ctx, ch);
        }
      }
      while (gs.chickens.length < 10) gs.chickens.push(createChicken());

      gs.animationId = requestAnimationFrame(gameLoop);
    },
    [
      createChicken,
      createStopwatch,
      drawChicken,
      drawPumpFunPill,
      drawBitcoinCoin,
      drawOceanFish,
      drawCoronaVirus,
      drawHormuzWarcraft,
      drawStopwatch,
      selectedWorld,
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

  // ─── ZombieTown ambient sound effect ─────────────────────────────────────────

  useEffect(() => {
    const isGameActive =
      currentView === "game" &&
      gameStateRef.current.isRunning &&
      !gameStateRef.current.gameEnded;
    if (selectedWorld === "zombietown" && isGameActive) {
      createZombieSound();
    } else {
      stopZombieSound();
    }
    return () => {
      stopZombieSound();
    };
  }, [selectedWorld, currentView, createZombieSound, stopZombieSound]);

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
    <div className="fixed inset-0 overflow-hidden">
      <BackgroundRenderer
        world={selectedWorld}
        pumpFunPrice={pumpFunPrice}
        btcPrice={btcPrice}
        brentOilPrice={brentOilPrice}
      />

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
