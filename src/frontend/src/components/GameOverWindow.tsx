import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { BarChart3, Home, RotateCcw, Star, Target, Trophy } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PlayerData } from "../App";

interface GameOverWindowProps {
  score: number;
  chickensShot: number;
  xpEarned: number;
  onRetry: () => void;
  onHome: () => void;
  playerData: PlayerData;
  levelXPRequirements: number[];
}

const GameOverWindow: React.FC<GameOverWindowProps> = ({
  score,
  chickensShot,
  xpEarned,
  onRetry,
  onHome,
  playerData,
  levelXPRequirements,
}) => {
  const { isAuthenticated } = useInternetIdentity();

  const [animationStarted, setAnimationStarted] = useState(false);
  const [animatedXP, setAnimatedXP] = useState(playerData.currentXP);
  const [animatedLevel, setAnimatedLevel] = useState(playerData.level);
  const [animatedRequired, setAnimatedRequired] = useState(
    playerData.requiredXP,
  );
  const [animComplete, setAnimComplete] = useState(false);

  const animRef = useRef<number>(0);
  const audioRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const startingXP = Math.max(0, playerData.currentXP - xpEarned);

  const initAudio = useCallback(() => {
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
  }, []);

  const stopSound = useCallback(() => {
    try {
      oscRef.current?.stop();
      oscRef.current = null;
      gainRef.current?.disconnect();
      gainRef.current = null;
    } catch {
      /* ignore */
    }
  }, []);

  const playXPSound = useCallback(() => {
    if (!audioRef.current || !isAuthenticated || xpEarned === 0) return;
    try {
      const ac = audioRef.current;
      if (ac.state === "suspended") ac.resume();
      stopSound();
      const now = ac.currentTime;
      const dur = 2;
      const gain = ac.createGain();
      gain.connect(ac.destination);
      gainRef.current = gain;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.1);
      gain.gain.setValueAtTime(0.15, now + dur - 0.2);
      gain.gain.exponentialRampToValueAtTime(0.01, now + dur);

      [
        [220, 440],
        [330, 660],
      ].forEach(([start, end], i) => {
        const osc = ac.createOscillator();
        osc.type = i === 0 ? "sine" : "triangle";
        osc.connect(gain);
        osc.frequency.setValueAtTime(start, now);
        osc.frequency.exponentialRampToValueAtTime(end, now + dur);
        osc.start(now);
        osc.stop(now + dur);
        if (i === 0) oscRef.current = osc;
      });

      setTimeout(() => {
        oscRef.current = null;
        gainRef.current = null;
      }, dur * 1000);
    } catch {
      /* ignore */
    }
  }, [isAuthenticated, xpEarned, stopSound]);

  useEffect(() => {
    initAudio();
    return () => {
      stopSound();
    };
  }, [initAudio, stopSound]);

  useEffect(() => {
    if (!isAuthenticated || xpEarned === 0) {
      setAnimComplete(true);
      return;
    }
    const t = setTimeout(() => {
      setAnimationStarted(true);
      playXPSound();
    }, 500);
    return () => clearTimeout(t);
  }, [isAuthenticated, xpEarned, playXPSound]);

  useEffect(() => {
    if (!isAuthenticated || !animationStarted || xpEarned === 0) {
      setAnimComplete(true);
      return;
    }

    const dur = 2000;
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const raw = Math.min(elapsed / dur, 1);
      const ease = 1 - (1 - raw) ** 3;
      const gained = Math.floor(xpEarned * ease);

      let lv = playerData.level;
      let xp = startingXP + gained;
      let req = playerData.requiredXP;

      if (lv < 100) {
        while (lv < 100 && xp >= levelXPRequirements[lv - 1]) {
          xp -= levelXPRequirements[lv - 1];
          lv++;
        }
        req = lv < 100 ? levelXPRequirements[lv - 1] : 0;
      } else {
        lv = 100;
        xp = 0;
        req = 0;
      }

      setAnimatedXP(xp);
      setAnimatedLevel(lv);
      setAnimatedRequired(req);

      if (raw < 1) {
        animRef.current = requestAnimationFrame(tick);
      } else {
        setAnimComplete(true);
        stopSound();
      }
    };

    animRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animRef.current);
      stopSound();
    };
  }, [
    isAuthenticated,
    animationStarted,
    xpEarned,
    startingXP,
    playerData,
    levelXPRequirements,
    stopSound,
  ]);

  const progressPct =
    animatedLevel >= 100
      ? 100
      : animatedRequired === 0
        ? 100
        : Math.min(100, (animatedXP / animatedRequired) * 100);

  const xpLabel =
    animatedLevel >= 100
      ? "MAX LEVEL"
      : `${animatedXP} / ${animatedRequired} XP`;
  const leveledUp = animComplete && animatedLevel !== playerData.level;

  return (
    <div
      className="absolute inset-0 bg-black/75 flex items-center justify-center z-30 px-4"
      data-ocid="game_over.dialog"
    >
      <div className="bg-white rounded-lg p-4 text-center shadow-2xl border border-gray-200 max-w-xs w-full game-over-window-extra-small">
        {/* Header */}
        <div className="flex items-center justify-center mb-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 mr-2 shadow-md">
            <Trophy className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-black text-black mb-0">GAME OVER</h2>
            <p className="text-gray-600 text-xs font-medium">Round Complete!</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-4 space-y-2">
          <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
            <div className="flex items-center justify-center mb-1">
              <Trophy className="w-3 h-3 text-orange-500 mr-1" />
              <p className="text-gray-700 text-xs font-bold">Final Score</p>
            </div>
            <p className="text-xl font-black text-orange-500">{score}</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
              <div className="flex items-center justify-center mb-1">
                <Target className="w-3 h-3 text-gray-600 mr-1" />
                <p className="text-gray-700 text-xs font-bold">Chickens</p>
              </div>
              <p className="text-lg font-black text-gray-700">{chickensShot}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
              <div className="flex items-center justify-center mb-1">
                <Star className="w-3 h-3 text-blue-500 mr-1" />
                <p className="text-gray-700 text-xs font-bold">XP</p>
              </div>
              <p className="text-lg font-black text-blue-500">{xpEarned}</p>
            </div>
          </div>
        </div>

        {/* XP Progress — only when authenticated */}
        {isAuthenticated && xpEarned > 0 && (
          <div className="mb-4 bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="flex items-center justify-center mb-2">
              <BarChart3 className="w-3 h-3 text-orange-500 mr-1" />
              <p className="text-gray-700 text-xs font-bold">Level Progress</p>
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-gray-700">
                Level {animatedLevel}
              </span>
              {leveledUp && (
                <span
                  data-ocid="game_over.levelup_badge"
                  className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full"
                >
                  LEVEL UP!
                </span>
              )}
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-2 overflow-hidden">
              <div
                className="h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-sm"
                style={{
                  width: `${progressPct}%`,
                  transition: animationStarted ? "width 0.3s ease-out" : "none",
                }}
              />
            </div>

            <div className="text-center">
              <span className="text-xs font-bold text-gray-600">{xpLabel}</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2">
          <button
            type="button"
            data-ocid="game_over.retry_button"
            onClick={onRetry}
            className="w-full flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-2 px-3 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
          >
            <RotateCcw className="w-3 h-3 mr-2" />
            <span className="text-sm">RETRY</span>
          </button>

          <button
            type="button"
            data-ocid="game_over.home_button"
            onClick={onHome}
            className="w-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-3 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 border border-gray-300"
          >
            <Home className="w-3 h-3 mr-2" />
            <span className="text-sm">HOME</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverWindow;
