import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import {
  Award,
  Clock,
  Crosshair,
  Crown,
  Eye,
  Gift,
  LogIn,
  Medal,
  Star,
  Target,
  TrendingUp,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

interface GameStatisticsLocal {
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

interface AchievementsViewProps {
  gameStatistics: GameStatisticsLocal;
  isAuthenticated: boolean;
  addXP: (xpAmount: number) => void;
  playerLevel: number;
}

type MilestoneLevel = "Bronze" | "Silver" | "Gold" | "Diamond" | "Master";

interface Milestone {
  level: MilestoneLevel;
  requirement: number;
  unlocked: boolean;
  collected: boolean;
  color: string;
  bgColor: string;
  xpReward: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  milestones: Milestone[];
  currentProgress: number;
  category: string;
}

const MILESTONE_LEVELS: MilestoneLevel[] = [
  "Bronze",
  "Silver",
  "Gold",
  "Diamond",
  "Master",
];
const MILESTONE_COLORS = [
  "#CD7F32",
  "#C0C0C0",
  "#FFD700",
  "#E5E4E2",
  "#9932CC",
];
const MILESTONE_BG = [
  "bg-amber-600",
  "bg-gray-400",
  "bg-yellow-500",
  "bg-slate-300",
  "bg-purple-600",
];
const XP_REWARDS = [500, 1500, 3000, 5000, 7500];

function createMilestones(requirements: number[]): Milestone[] {
  return requirements.map((req, index) => ({
    level: MILESTONE_LEVELS[index],
    requirement: req,
    unlocked: false,
    collected: false,
    color: MILESTONE_COLORS[index],
    bgColor: MILESTONE_BG[index],
    xpReward: XP_REWARDS[index],
  }));
}

const getMilestoneIcon = (level: string) => {
  switch (level) {
    case "Bronze":
      return "🥉";
    case "Silver":
      return "🥈";
    case "Gold":
      return "🥇";
    case "Diamond":
      return "💎";
    case "Master":
      return "👑";
    default:
      return "🏆";
  }
};

const AchievementsView: React.FC<AchievementsViewProps> = ({
  gameStatistics,
  isAuthenticated,
  addXP,
  playerLevel,
}) => {
  const { identity, login, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();
  const [collectedMilestones, setCollectedMilestones] = useState<Set<string>>(
    new Set(),
  );
  const audioContextRef = useRef<AudioContext | null>(null);

  const handleLogin = async () => {
    try {
      await login();
      queryClient.clear();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const initializeAudio = useCallback(() => {
    if (!audioContextRef.current) {
      try {
        audioContextRef.current = new (
          window.AudioContext ||
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).webkitAudioContext
        )();
      } catch {
        // Audio not supported
      }
    }
  }, []);

  const playMilestoneRewardSound = useCallback(() => {
    if (!audioContextRef.current) initializeAudio();
    if (!audioContextRef.current) return;

    try {
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const osc3 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.connect(gain);
      osc2.connect(gain);
      osc3.connect(gain);
      gain.connect(ctx.destination);

      osc1.type = "sine";
      osc2.type = "triangle";
      osc3.type = "sine";

      const t = ctx.currentTime;
      osc1.frequency.setValueAtTime(1046.5, t);
      osc2.frequency.setValueAtTime(1318.51, t);
      osc3.frequency.setValueAtTime(1567.98, t);
      osc1.frequency.setValueAtTime(1396.91, t + 0.15);
      osc2.frequency.setValueAtTime(1661.22, t + 0.15);
      osc3.frequency.setValueAtTime(2093.0, t + 0.15);
      osc1.frequency.setValueAtTime(1567.98, t + 0.3);
      osc2.frequency.setValueAtTime(1975.53, t + 0.3);
      osc3.frequency.setValueAtTime(2349.32, t + 0.3);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.25, t + 0.02);
      gain.gain.setValueAtTime(0.25, t + 0.1);
      gain.gain.linearRampToValueAtTime(0.3, t + 0.17);
      gain.gain.setValueAtTime(0.3, t + 0.25);
      gain.gain.linearRampToValueAtTime(0.35, t + 0.32);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.9);

      osc1.start(t);
      osc2.start(t);
      osc3.start(t);
      osc1.stop(t + 0.9);
      osc2.stop(t + 0.9);
      osc3.stop(t + 0.9);
    } catch {
      // Audio error
    }
  }, [initializeAudio]);

  useEffect(() => {
    initializeAudio();
  }, [initializeAudio]);

  const getStorageKey = useCallback(() => {
    if (isAuthenticated && identity) {
      return `achievementMilestones_${identity.getPrincipal().toString()}`;
    }
    return "achievementMilestones_guest";
  }, [isAuthenticated, identity]);

  useEffect(() => {
    const key = getStorageKey();
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as string[];
        setCollectedMilestones(new Set(parsed));
      } catch {
        // ignore corrupt data
      }
    }
  }, [getStorageKey]);

  const saveCollectedMilestones = useCallback(
    (milestones: Set<string>) => {
      localStorage.setItem(
        getStorageKey(),
        JSON.stringify(Array.from(milestones)),
      );
    },
    [getStorageKey],
  );

  const achievements: Achievement[] = [
    {
      id: "total-chickens",
      title: "Chicken Master",
      description: "Total chickens shot",
      icon: <Target className="w-5 h-5" />,
      milestones: createMilestones([100, 1000, 5000, 10000, 100000]),
      currentProgress: gameStatistics.totalChickensShot,
      category: "Combat",
    },
    {
      id: "golden-chickens",
      title: "Golden Hunter",
      description: "Golden chickens shot",
      icon: <Crown className="w-5 h-5" />,
      milestones: createMilestones([5, 25, 100, 250, 500]),
      currentProgress: gameStatistics.goldenChickensShot,
      category: "Special",
    },
    {
      id: "fast-chickens",
      title: "Speed Demon",
      description: "Fast chickens eliminated",
      icon: <Zap className="w-5 h-5" />,
      milestones: createMilestones([50, 250, 1000, 2500, 5000]),
      currentProgress: gameStatistics.fastChickensShot,
      category: "Combat",
    },
    {
      id: "small-chickens",
      title: "Small Game Hunter",
      description: "Small chickens shot",
      icon: <Eye className="w-5 h-5" />,
      milestones: createMilestones([250, 500, 1000, 2500, 5000]),
      currentProgress: gameStatistics.smallChickensShot,
      category: "Precision",
    },
    {
      id: "large-chickens",
      title: "Big Game Hunter",
      description: "Large chickens eliminated",
      icon: <Award className="w-5 h-5" />,
      milestones: createMilestones([250, 500, 1000, 2500, 5000]),
      currentProgress: gameStatistics.largeChickensShot,
      category: "Combat",
    },
    {
      id: "accuracy",
      title: "Sharpshooter",
      description: "Accuracy percentage",
      icon: <Crosshair className="w-5 h-5" />,
      milestones: createMilestones([50, 65, 75, 85, 95]),
      currentProgress: gameStatistics.currentAccuracy,
      category: "Precision",
    },
    {
      id: "consecutive-hits",
      title: "Streak King",
      description: "Consecutive hits without missing",
      icon: <TrendingUp className="w-5 h-5" />,
      milestones: createMilestones([5, 10, 20, 35, 50]),
      currentProgress: gameStatistics.bestConsecutiveHits,
      category: "Skill",
    },
    {
      id: "total-score",
      title: "Score Legend",
      description: "Total score reached",
      icon: <Star className="w-5 h-5" />,
      milestones: createMilestones([10000, 25000, 50000, 100000, 250000]),
      currentProgress: gameStatistics.totalScore,
      category: "Progress",
    },
    {
      id: "play-time",
      title: "Marathon Runner",
      description: "Play time in minutes",
      icon: <Clock className="w-5 h-5" />,
      milestones: createMilestones([60, 120, 300, 600, 1000]),
      currentProgress: gameStatistics.totalPlayTimeMinutes,
      category: "Progress",
    },
    {
      id: "session-chickens",
      title: "Marathon Hunter",
      description: "Chickens shot in single session",
      icon: <Medal className="w-5 h-5" />,
      milestones: createMilestones([20, 50, 100, 200, 300]),
      currentProgress: gameStatistics.bestSessionChickens,
      category: "Endurance",
    },
    {
      id: "perfect-sessions",
      title: "Precision Pro",
      description: "Perfect accuracy sessions (0 misses)",
      icon: <Trophy className="w-5 h-5" />,
      milestones: createMilestones([1, 3, 5, 10, 25]),
      currentProgress: gameStatistics.perfectAccuracySessions,
      category: "Skill",
    },
    {
      id: "missed-shots",
      title: "Are You Drunk?!",
      description: "Missed shots",
      icon: <X className="w-5 h-5" />,
      milestones: createMilestones([1000, 2500, 5000, 10000, 25000]),
      currentProgress: gameStatistics.totalMissedShots,
      category: "Persistence",
    },
    {
      id: "level-achiever",
      title: "Level Achiever",
      description: "Player level reached",
      icon: <Star className="w-5 h-5" />,
      milestones: createMilestones([10, 25, 50, 75, 100]),
      currentProgress: playerLevel,
      category: "Progress",
    },
  ];

  // Update milestone unlock and collection status
  for (const achievement of achievements) {
    for (const milestone of achievement.milestones) {
      const key = `${achievement.id}-${milestone.level}`;
      milestone.unlocked = achievement.currentProgress >= milestone.requirement;
      milestone.collected = collectedMilestones.has(key);
    }
  }

  const totalMilestones = achievements.length * 5;
  const unlockedMilestones = achievements.reduce(
    (total, a) => total + a.milestones.filter((m) => m.unlocked).length,
    0,
  );
  const completionPercentage = Math.round(
    (unlockedMilestones / totalMilestones) * 100,
  );

  const getNextMilestone = (achievement: Achievement): Milestone => {
    return (
      achievement.milestones.find((m) => !m.unlocked) ||
      achievement.milestones[achievement.milestones.length - 1]
    );
  };

  const handleCollectReward = (achievementId: string, milestone: Milestone) => {
    if (!milestone.unlocked || milestone.collected) return;
    playMilestoneRewardSound();
    const milestoneKey = `${achievementId}-${milestone.level}`;
    addXP(milestone.xpReward);
    const updated = new Set(collectedMilestones);
    updated.add(milestoneKey);
    setCollectedMilestones(updated);
    saveCollectedMilestones(updated);
  };

  const isLoggingIn = loginStatus === "logging-in";

  if (!isAuthenticated) {
    return (
      <div className="absolute inset-0 bg-black overflow-y-auto pb-32">
        <div className="container mx-auto px-4 py-6">
          {/* Blurred Header */}
          <div className="mb-6">
            <div className="bg-white rounded-xl p-4 shadow-xl border border-gray-200 opacity-60 blur-sm">
              <div className="flex items-center justify-between mb-3">
                <h1 className="text-3xl md:text-4xl font-black text-black tracking-tight">
                  ACHIEVEMENTS
                </h1>
                <div className="flex items-center bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg shadow-md">
                  <Trophy className="w-4 h-4 mr-2" />
                  <span className="font-bold text-sm">0/65</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
                <div
                  className="h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                  style={{ width: "0%" }}
                />
              </div>
              <div className="text-center">
                <span className="text-black font-bold text-lg">
                  0% Complete
                </span>
              </div>
            </div>
          </div>

          {/* Login Prompt Overlay */}
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
            data-ocid="achievements.login_prompt"
          >
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-md mx-auto">
              <div className="flex items-center justify-center p-6 border-b border-gray-200">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 mr-4 shadow-lg">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-black text-black">ACHIEVEMENTS</h2>
              </div>
              <div className="p-6">
                <div className="text-center mb-6">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Login required to access achievements and track your
                    progress across all gaming sessions.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="w-full flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  data-ocid="achievements.login_button"
                >
                  {isLoggingIn ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5 mr-3" />
                      <span>Login with Internet Identity</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Blurred Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-7xl mx-auto opacity-30 blur-sm pointer-events-none">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-white rounded-xl p-5 shadow-xl border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl mr-4 bg-gray-100 text-gray-600 border border-gray-200">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-black mb-1">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-600 text-sm font-medium">
                      {achievement.description}
                    </p>
                    <div className="inline-block bg-gray-100 text-gray-700 text-xs font-bold px-2 py-1 rounded-md mt-1">
                      {achievement.category}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {achievement.milestones.map((milestone) => (
                    <div
                      key={milestone.level}
                      className="p-2 rounded-lg text-center border bg-gray-50 text-gray-400 border-gray-200"
                    >
                      <div className="text-lg mb-1">
                        {getMilestoneIcon(milestone.level)}
                      </div>
                      <div className="font-bold text-xs text-gray-500">
                        {milestone.level}
                      </div>
                      <div className="text-xs text-gray-400">
                        {achievement.id === "accuracy"
                          ? `${milestone.requirement}%`
                          : milestone.requirement.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-gray-700">
                    0/5 Milestones Complete
                  </div>
                  <div className="text-xs text-gray-500 mt-1 font-medium">
                    Login to track progress
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="achievements-view absolute inset-0 bg-black overflow-y-auto pb-32"
      data-ocid="achievements.page"
    >
      <div className="container mx-auto px-4 py-6">
        {/* Progress Header */}
        <div className="mb-6">
          <div className="bg-white rounded-xl p-4 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-3xl md:text-4xl font-black text-black tracking-tight">
                ACHIEVEMENTS
              </h1>
              <div className="flex items-center bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg shadow-md">
                <Trophy className="w-4 h-4 mr-2" />
                <span className="font-bold text-sm">
                  {unlockedMilestones}/{totalMilestones}
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
              <div
                className="h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <div className="text-center">
              <span className="text-black font-bold text-lg">
                {completionPercentage}% Complete
              </span>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-7xl mx-auto">
          {achievements.map((achievement, achIndex) => {
            const nextMilestone = getNextMilestone(achievement);
            const completedCount = achievement.milestones.filter(
              (m) => m.unlocked,
            ).length;
            const isFullyCompleted = completedCount === 5;

            return (
              <div
                key={achievement.id}
                className="bg-white rounded-xl p-5 shadow-xl border border-gray-200 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl"
                data-ocid={`achievements.item.${achIndex + 1}`}
              >
                {/* Achievement Header */}
                <div className="flex items-center mb-4">
                  <div
                    className={`flex items-center justify-center w-14 h-14 rounded-xl mr-4 ${
                      isFullyCompleted
                        ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-600 border border-gray-200"
                    }`}
                  >
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-black mb-1">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-600 text-sm font-medium">
                      {achievement.description}
                    </p>
                    <div className="inline-block bg-gray-100 text-gray-700 text-xs font-bold px-2 py-1 rounded-md mt-1">
                      {achievement.category}
                    </div>
                  </div>
                  {isFullyCompleted && <div className="text-2xl">👑</div>}
                </div>

                {/* Milestones */}
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {achievement.milestones.map((milestone) => (
                    <div key={milestone.level} className="relative">
                      <div
                        className={`p-2 rounded-lg text-center transition-all duration-200 border cursor-pointer ${
                          milestone.unlocked
                            ? milestone.collected
                              ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white border-orange-500 shadow-md"
                              : "bg-gradient-to-br from-green-500 to-green-600 text-white border-green-500 shadow-md milestone-blink hover:scale-105"
                            : "bg-gray-50 text-gray-400 border-gray-200 cursor-default"
                        }`}
                        onClick={() =>
                          milestone.unlocked &&
                          !milestone.collected &&
                          handleCollectReward(achievement.id, milestone)
                        }
                        onKeyDown={(e) => {
                          if (
                            (e.key === "Enter" || e.key === " ") &&
                            milestone.unlocked &&
                            !milestone.collected
                          ) {
                            handleCollectReward(achievement.id, milestone);
                          }
                        }}
                        tabIndex={
                          milestone.unlocked && !milestone.collected ? 0 : -1
                        }
                        role={
                          milestone.unlocked && !milestone.collected
                            ? "button"
                            : undefined
                        }
                        aria-label={
                          milestone.unlocked && !milestone.collected
                            ? `Collect ${milestone.level} reward (${milestone.xpReward} XP)`
                            : undefined
                        }
                      >
                        <div className="text-lg mb-1">
                          {getMilestoneIcon(milestone.level)}
                        </div>
                        <div
                          className={`font-bold text-xs ${
                            milestone.unlocked ? "text-white" : "text-gray-500"
                          }`}
                        >
                          {milestone.level}
                        </div>
                        <div
                          className={`text-xs ${
                            milestone.unlocked
                              ? milestone.collected
                                ? "text-orange-100"
                                : "text-green-100"
                              : "text-gray-400"
                          }`}
                        >
                          {achievement.id === "accuracy"
                            ? `${milestone.requirement}%`
                            : milestone.requirement.toLocaleString()}
                        </div>
                        {milestone.unlocked && milestone.collected && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                            <Trophy className="w-2 h-2 text-orange-500" />
                          </div>
                        )}
                      </div>
                      {milestone.unlocked && !milestone.collected && (
                        <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-1 py-0.5 rounded-full shadow-lg flex items-center milestone-collect-indicator">
                          <Gift className="w-2 h-2 mr-0.5" />
                          <span className="text-xs">XP</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-black text-sm font-medium mb-2">
                    <span>Progress</span>
                    <span className="font-bold">
                      {achievement.id === "accuracy"
                        ? `${Math.min(achievement.currentProgress, nextMilestone.requirement).toFixed(1)}%`
                        : Math.min(
                            achievement.currentProgress,
                            nextMilestone.requirement,
                          ).toLocaleString()}{" "}
                      /{" "}
                      {achievement.id === "accuracy"
                        ? `${nextMilestone.requirement}%`
                        : nextMilestone.requirement.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        isFullyCompleted
                          ? "bg-gradient-to-r from-orange-500 to-orange-600"
                          : "bg-gradient-to-r from-gray-400 to-gray-500"
                      }`}
                      style={{
                        width: `${Math.min(100, (achievement.currentProgress / nextMilestone.requirement) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Completion Status */}
                <div className="text-center">
                  <div
                    className={`text-sm font-bold ${
                      isFullyCompleted ? "text-orange-600" : "text-gray-700"
                    }`}
                  >
                    {completedCount}/5 Milestones Complete
                  </div>
                  {!isFullyCompleted && (
                    <div className="text-xs text-gray-500 mt-1 font-medium">
                      Next: {nextMilestone.level} (
                      {achievement.id === "accuracy"
                        ? `${nextMilestone.requirement}%`
                        : nextMilestone.requirement.toLocaleString()}
                      ) — {nextMilestone.xpReward} XP
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AchievementsView;
