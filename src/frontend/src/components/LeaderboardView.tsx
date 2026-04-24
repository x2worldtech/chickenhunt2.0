import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Crown, LogIn, Medal, Star, Trophy } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import {
  useLeaderboard,
  useListUsers,
  useUserProfileWithChangeStatus,
} from "../hooks/useQueries";

interface LeaderboardEntry {
  username: string;
  highestScore: number;
  key: string;
  level: number;
}

interface LeaderboardViewProps {
  currentPlayerScore?: number;
  isAuthenticated: boolean;
}

const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  currentPlayerScore = 0,
  isAuthenticated,
}) => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    [],
  );
  const { identity, login, loginStatus } = useInternetIdentity();
  const { data: backendLeaderboard = [] } = useLeaderboard();
  const { data: allUsers = [] } = useListUsers();
  const { data: currentUserProfile } = useUserProfileWithChangeStatus();
  const queryClient = useQueryClient();

  const handleLogin = async () => {
    try {
      await login();
      queryClient.clear();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Get default username based on user registration order
  const getDefaultUsername = useCallback(
    (principalString: string) => {
      const userIndex = allUsers.findIndex(
        (user) => user.principal.toString() === principalString,
      );
      return userIndex >= 0 ? `Player #${userIndex + 1}` : "Player #1";
    },
    [allUsers],
  );

  // Get player level from localStorage
  const getPlayerLevel = useCallback((principalString: string): number => {
    try {
      const storageKey = `chickenHuntPlayerData_${principalString}`;
      const savedPlayerData = localStorage.getItem(storageKey);
      if (savedPlayerData) {
        const parsed = JSON.parse(savedPlayerData) as { level?: number };
        return Math.max(1, Math.min(100, parsed.level ?? 1));
      }
    } catch {
      // ignore
    }
    return 1;
  }, []);

  useEffect(() => {
    if (backendLeaderboard.length > 0) {
      // Backend returns [name, score, level]
      const entries: LeaderboardEntry[] = backendLeaderboard.map(
        ([username, score, level], index) => ({
          username,
          highestScore: Number(score),
          level: Number(level),
          key: `backend-${index}-${username}`,
        }),
      );
      setLeaderboardData(
        [...entries].sort((a, b) => b.highestScore - a.highestScore),
      );
    } else if (allUsers.length > 0) {
      const entries: LeaderboardEntry[] = allUsers.map((user, index) => {
        const principalString = user.principal.toString();
        let displayName = getDefaultUsername(principalString);
        if (
          identity &&
          identity.getPrincipal().toString() === principalString &&
          currentUserProfile?.name
        ) {
          displayName = currentUserProfile.name;
        }
        return {
          username: displayName,
          highestScore:
            principalString === identity?.getPrincipal().toString()
              ? currentPlayerScore
              : 0,
          level: getPlayerLevel(principalString),
          key: `user-${index}-${principalString}`,
        };
      });
      setLeaderboardData(
        [...entries].sort((a, b) => b.highestScore - a.highestScore),
      );
    } else {
      // Default placeholder data
      const defaults: LeaderboardEntry[] = [
        { username: "ChickenKing", highestScore: 1420, level: 15, key: "d-1" },
        {
          username: "Player #2",
          highestScore: currentPlayerScore,
          level: getPlayerLevel(identity?.getPrincipal().toString() ?? "guest"),
          key: "d-2",
        },
        { username: "EggHunter99", highestScore: 1250, level: 12, key: "d-3" },
        {
          username: "FeatherFury",
          highestScore: 1100,
          level: 8,
          key: "d-4",
        },
        { username: "RoosterRuler", highestScore: 980, level: 6, key: "d-5" },
      ].sort((a, b) => b.highestScore - a.highestScore);
      setLeaderboardData(defaults);
    }
  }, [
    backendLeaderboard,
    allUsers,
    currentUserProfile,
    identity,
    currentPlayerScore,
    getDefaultUsername,
    getPlayerLevel,
  ]);

  const getRankIcon = (index: number) => {
    if (index === 0) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (index === 1) return <Medal className="w-5 h-5 text-gray-400" />;
    if (index === 2) return <Trophy className="w-5 h-5 text-amber-600" />;
    return <Star className="w-4 h-4 text-gray-500" />;
  };

  const getRankStyling = (index: number): string => {
    const base =
      "flex items-center justify-between p-4 rounded-lg transition-all duration-200 ";
    if (index === 0)
      return `${base}bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30`;
    if (index === 1)
      return `${base}bg-gradient-to-r from-gray-400/20 to-gray-500/20 border border-gray-400/30`;
    if (index === 2)
      return `${base}bg-gradient-to-r from-amber-600/20 to-amber-700/20 border border-amber-600/30`;
    return `${base}bg-white/10 border border-white/20 hover:bg-white/15`;
  };

  const isLoggingIn = loginStatus === "logging-in";

  if (!isAuthenticated) {
    return (
      <div className="absolute inset-0 bg-black overflow-y-auto pb-32">
        <div className="container mx-auto px-4 py-6">
          {/* Blurred Header */}
          <div className="mb-6">
            <div className="bg-white rounded-xl p-4 shadow-xl border border-gray-200 opacity-60 blur-sm">
              <div className="flex items-center justify-center mb-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 mr-4 shadow-lg">
                  <Medal className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-black tracking-tight">
                  LEADERBOARD
                </h1>
              </div>
              <div className="text-center">
                <p className="text-gray-600 font-medium">
                  Players ranked by highest score achieved
                </p>
              </div>
            </div>
          </div>

          {/* Login Prompt Overlay */}
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
            data-ocid="leaderboard.login_prompt"
          >
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-md mx-auto">
              <div className="flex items-center justify-center p-6 border-b border-gray-200">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 mr-4 shadow-lg">
                  <Medal className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-black text-black">LEADERBOARD</h2>
              </div>
              <div className="p-6">
                <div className="text-center mb-6">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Login required to access the leaderboard and compete with
                    other players globally.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="w-full flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  data-ocid="leaderboard.login_button"
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

          {/* Blurred List */}
          <div className="max-w-4xl mx-auto space-y-3 opacity-30 blur-sm pointer-events-none">
            {leaderboardData.slice(0, 5).map((entry, index) => (
              <div key={entry.key} className={getRankStyling(index)}>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
                    <span className="text-white font-black text-lg">
                      #{index + 1}
                    </span>
                  </div>
                  <div className="flex items-center justify-center w-8 h-8">
                    {getRankIcon(index)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-white">
                      {entry.username}
                      <span className="text-sm font-normal text-white/60 ml-2">
                        Lv.{entry.level}
                      </span>
                    </h3>
                    <p className="text-white/70 text-sm font-medium">
                      Personal Best
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-white">
                    {entry.highestScore.toLocaleString()}
                  </div>
                  <div className="text-white/50 text-xs font-medium">
                    POINTS
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
    <div className="absolute inset-0 bg-black overflow-y-auto pb-32">
      <div className="container mx-auto px-4 py-6" data-ocid="leaderboard.page">
        {/* Header */}
        <div className="mb-6">
          <div className="bg-white rounded-xl p-4 shadow-xl border border-gray-200">
            <div className="flex items-center justify-center mb-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 mr-4 shadow-lg">
                <Medal className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-black tracking-tight">
                LEADERBOARD
              </h1>
            </div>
            <div className="text-center">
              <p className="text-gray-600 font-medium">
                Players ranked by highest score achieved
              </p>
            </div>
          </div>
        </div>

        {/* Leaderboard List */}
        <div
          className="max-w-4xl mx-auto space-y-3"
          data-ocid="leaderboard.list"
        >
          {leaderboardData.map((entry, index) => (
            <div
              key={entry.key}
              className={getRankStyling(index)}
              data-ocid={`leaderboard.item.${index + 1}`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm">
                  <span className="text-white font-black text-lg">
                    #{index + 1}
                  </span>
                </div>
                <div className="flex items-center justify-center w-8 h-8">
                  {getRankIcon(index)}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-white">
                    {entry.username}
                    <span className="text-sm font-normal text-white/60 ml-2">
                      Lv.{entry.level}
                    </span>
                  </h3>
                  <p className="text-white/70 text-sm font-medium">
                    Personal Best
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-white">
                  {entry.highestScore.toLocaleString()}
                </div>
                <div className="text-white/50 text-xs font-medium">POINTS</div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {leaderboardData.length === 0 && (
          <div
            className="max-w-4xl mx-auto"
            data-ocid="leaderboard.empty_state"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center border border-white/20">
              <Medal className="w-16 h-16 text-white/50 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                No Scores Yet
              </h3>
              <p className="text-white/70">
                Play some games to see your scores on the leaderboard!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardView;
