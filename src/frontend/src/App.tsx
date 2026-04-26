import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useCallback, useEffect, useState } from "react";
import GameScreen from "./components/GameScreen";
import SplashScreen from "./components/SplashScreen";
import StartScreen from "./components/StartScreen";

type GameState = "splash" | "start" | "playing";

export type GameView =
  | "game"
  | "achievements"
  | "profile"
  | "settings"
  | "leaderboard"
  | "login-prompt";

export type BackgroundWorld =
  | "original"
  | "volcano"
  | "space"
  | "desert"
  | "jungle"
  | "snowy"
  | "sky"
  | "cyberpunk"
  | "caffeineai"
  | "zombietown"
  | "halloween"
  | "tokyo"
  | "windows";

export interface PlayerData {
  level: number;
  currentXP: number;
  requiredXP: number;
}

export interface GameStatisticsLocal {
  totalChickensShot: number;
  goldenChickensShot: number;
  fastChickensShot: number;
  smallChickensShot: number;
  mediumChickensShot: number;
  largeChickensShot: number;
  totalShotsFired: number;
  totalMissedShots: number;
  currentAccuracy: number;
  currentConsecutiveHits: number;
  bestConsecutiveHits: number;
  totalScore: number;
  totalPlayTimeMinutes: number;
  bestSessionChickens: number;
  perfectAccuracySessions: number;
  highestScore: number;
}

export interface Settings {
  volume: number;
  soundEnabled: boolean;
}

// XP requirements per level (non-cumulative — XP needed for that specific level only)
export const LEVEL_XP_REQUIREMENTS: number[] = [
  120, 280, 480, 720, 1000, 1320, 1680, 2080, 2520, 3000, 3520, 4080, 4680,
  5320, 6000, 6720, 7480, 8280, 9120, 10000, 10920, 11880, 12880, 13920, 15000,
  16120, 17280, 18480, 19720, 21000, 22320, 23680, 25080, 26520, 28000, 29520,
  31080, 32680, 34320, 36000, 37720, 39480, 41280, 43120, 45000, 46920, 48880,
  50880, 52920, 55000, 57120, 59280, 61480, 63720, 66000, 68320, 70680, 73080,
  75520, 78000, 80520, 83080, 85680, 88320, 91000, 93720, 96480, 99280, 102120,
  105000, 107920, 110880, 113880, 116920, 120000, 123120, 126280, 129480,
  132720, 136000, 139320, 142680, 146080, 149520, 153000, 156520, 160080,
  163680, 167320, 171000, 174720, 178480, 182280, 186120, 190000, 193920,
  197880, 201880, 205920, 210000,
];

const VALID_WORLDS: BackgroundWorld[] = [
  "original",
  "volcano",
  "space",
  "desert",
  "jungle",
  "snowy",
  "sky",
  "cyberpunk",
  "caffeineai",
  "zombietown",
  "halloween",
  "tokyo",
  "windows",
];

const DEFAULT_PLAYER_DATA: PlayerData = {
  level: 1,
  currentXP: 0,
  requiredXP: 120,
};

const DEFAULT_STATISTICS: GameStatisticsLocal = {
  totalChickensShot: 0,
  goldenChickensShot: 0,
  fastChickensShot: 0,
  smallChickensShot: 0,
  mediumChickensShot: 0,
  largeChickensShot: 0,
  totalShotsFired: 0,
  totalMissedShots: 0,
  currentAccuracy: 0,
  currentConsecutiveHits: 0,
  bestConsecutiveHits: 0,
  totalScore: 0,
  totalPlayTimeMinutes: 0,
  bestSessionChickens: 0,
  perfectAccuracySessions: 0,
  highestScore: 0,
};

function App() {
  const [gameState, setGameState] = useState<GameState>("splash");
  const [score, setScore] = useState(0);
  const [selectedWorld, setSelectedWorld] =
    useState<BackgroundWorld>("original");
  const [playerData, setPlayerData] = useState<PlayerData>(DEFAULT_PLAYER_DATA);
  const [gameStatistics, setGameStatistics] =
    useState<GameStatisticsLocal>(DEFAULT_STATISTICS);
  const [initialGameView, setInitialGameView] = useState<GameView>("game");

  const { identity, isAuthenticated } = useInternetIdentity();

  const getStorageKey = useCallback(
    (baseKey: string): string => {
      if (isAuthenticated && identity) {
        return `${baseKey}_${identity.getPrincipal().toString()}`;
      }
      return `${baseKey}_guest`;
    },
    [isAuthenticated, identity],
  );

  // Load persisted state on mount
  useEffect(() => {
    // Load player data
    const playerKey = getStorageKey("chickenHuntPlayerData");
    const savedPlayer = localStorage.getItem(playerKey);
    if (savedPlayer) {
      try {
        const parsed = JSON.parse(savedPlayer) as Partial<PlayerData>;
        const level = Math.max(1, Math.min(100, parsed.level ?? 1));
        const currentXP = Math.max(0, parsed.currentXP ?? 0);
        const requiredXP = level < 100 ? LEVEL_XP_REQUIREMENTS[level - 1] : 0;
        setPlayerData({ level, currentXP, requiredXP });
      } catch {
        // ignore corrupt data
      }
    }

    // Load statistics
    const statsKey = getStorageKey("chickenHuntStatistics");
    const savedStats = localStorage.getItem(statsKey);
    if (savedStats) {
      try {
        const parsed = JSON.parse(savedStats) as Partial<GameStatisticsLocal>;
        setGameStatistics({ ...DEFAULT_STATISTICS, ...parsed });
      } catch {
        // ignore corrupt data
      }
    }

    // Load selected world
    const savedWorld = localStorage.getItem("chickenHuntSelectedWorld");
    if (savedWorld && (VALID_WORLDS as string[]).includes(savedWorld)) {
      setSelectedWorld(savedWorld as BackgroundWorld);
    }
  }, [getStorageKey]);

  // Persist player data
  useEffect(() => {
    const key = getStorageKey("chickenHuntPlayerData");
    localStorage.setItem(key, JSON.stringify(playerData));
  }, [playerData, getStorageKey]);

  // Persist statistics
  useEffect(() => {
    const key = getStorageKey("chickenHuntStatistics");
    localStorage.setItem(key, JSON.stringify(gameStatistics));
  }, [gameStatistics, getStorageKey]);

  // Persist selected world
  useEffect(() => {
    localStorage.setItem("chickenHuntSelectedWorld", selectedWorld);
  }, [selectedWorld]);

  // Add XP with non-cumulative level-up system
  const addXP = useCallback((xpAmount: number) => {
    setPlayerData((prev) => {
      let level = prev.level;
      let xp = prev.currentXP + xpAmount;
      let required = prev.requiredXP;

      while (level < 100 && xp >= required) {
        const surplus = xp - required;
        level++;
        xp = surplus;
        required = level < 100 ? LEVEL_XP_REQUIREMENTS[level - 1] : 0;
      }

      if (level >= 100) {
        level = 100;
        xp = 0;
        required = 0;
      }

      return { level, currentXP: xp, requiredXP: required };
    });
  }, []);

  const updateStatistics = useCallback(
    (updates: Partial<GameStatisticsLocal>) => {
      setGameStatistics((prev) => {
        const next = { ...prev, ...updates };
        if (
          updates.totalShotsFired !== undefined ||
          updates.totalChickensShot !== undefined
        ) {
          next.currentAccuracy =
            next.totalShotsFired > 0
              ? Math.round(
                  (next.totalChickensShot / next.totalShotsFired) * 100,
                )
              : 0;
        }
        return next;
      });
    },
    [],
  );

  const handleSplashComplete = () => setGameState("start");
  const startGame = (view: GameView = "game") => {
    setScore(0);
    setInitialGameView(view);
    setGameState("playing");
  };
  const endGame = () => {
    setInitialGameView("game");
    setGameState("start");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-green-400 overflow-hidden">
      {gameState === "splash" && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}
      {gameState === "start" && (
        <StartScreen
          onStartGame={() => startGame("game")}
          selectedWorld={selectedWorld}
          onWorldChange={setSelectedWorld}
          playerData={playerData}
          gameStatistics={gameStatistics}
          addXP={addXP}
        />
      )}
      {gameState === "playing" && (
        <GameScreen
          score={score}
          setScore={setScore}
          onEndGame={endGame}
          playerData={playerData}
          addXP={addXP}
          gameStatistics={gameStatistics}
          updateStatistics={updateStatistics}
          selectedWorld={selectedWorld}
          levelXPRequirements={LEVEL_XP_REQUIREMENTS}
          initialView={initialGameView}
        />
      )}
    </div>
  );
}

export default App;
