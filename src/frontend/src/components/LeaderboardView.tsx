import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Crown, LogIn, Medal, Star, Trophy } from "lucide-react";
import type React from "react";
import { useLeaderboard, useLeaderboardEntries } from "../hooks/useQueries";

interface LeaderboardViewProps {
  currentPlayerScore?: number;
  isAuthenticated: boolean;
}

const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  currentPlayerScore: _currentPlayerScore = 0,
  isAuthenticated,
}) => {
  const { login, loginStatus } = useInternetIdentity();
  const { data: entries = [], isLoading } = useLeaderboardEntries();
  const { data: previewData = [] } = useLeaderboard();
  const queryClient = useQueryClient();

  const handleLogin = async () => {
    try {
      await login();
      queryClient.clear();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const getRankIcon = (index: number) => {
    if (index === 0)
      return <Crown className="w-5 h-5" style={{ color: "#f59e0b" }} />;
    if (index === 1)
      return <Medal className="w-5 h-5" style={{ color: "#9ca3af" }} />;
    if (index === 2)
      return <Trophy className="w-5 h-5" style={{ color: "#d97706" }} />;
    return <Star className="w-4 h-4" style={{ color: "#6b7280" }} />;
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
    return `${base}bg-white/10 border border-white/20`;
  };

  const isLoggingIn = loginStatus === "logging-in";

  // ── Unauthenticated view ──────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="absolute inset-0 bg-black overflow-y-auto pb-32">
        <div className="container mx-auto px-4 py-6">
          {/* Blurred header */}
          <div className="mb-6">
            <div
              className="bg-white rounded-xl p-4 shadow-xl border border-gray-200 opacity-60"
              style={{ filter: "blur(2px)" }}
            >
              <div className="flex items-center justify-center mb-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 mr-4 shadow-lg">
                  <Medal className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-black tracking-tight">
                  LEADERBOARD
                </h1>
              </div>
              <p className="text-center text-gray-600 font-medium">
                Players ranked by highest score achieved
              </p>
            </div>
          </div>

          {/* Login overlay */}
          <div
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            style={{ background: "rgba(0,0,0,0.55)" }}
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
                <p className="text-gray-600 text-lg leading-relaxed text-center mb-6">
                  Sign in to view the global rankings and compete with other
                  players.
                </p>
                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="w-full flex items-center justify-center font-bold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-white"
                  style={{
                    background: isLoggingIn
                      ? "#ea580c"
                      : "linear-gradient(to right, #f97316, #ea580c)",
                  }}
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

          {/* Blurred preview rows */}
          <div
            className="max-w-4xl mx-auto space-y-3 pointer-events-none"
            style={{ opacity: 0.25, filter: "blur(2px)" }}
          >
            {previewData.slice(0, 5).map(([username, score, level], index) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: static preview list
                key={`preview-${index}`}
                className={getRankStyling(index)}
              >
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
                      {username}
                      <span className="text-sm font-normal text-white/60 ml-2">
                        Lv.{Number(level)}
                      </span>
                    </h3>
                    <p className="text-white/70 text-sm font-medium">
                      Personal Best
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-white">
                    {Number(score).toLocaleString()}
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

  // ── Authenticated view ────────────────────────────────────────────────────────
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
            <p className="text-center text-gray-600 font-medium">
              Players ranked by highest score achieved
            </p>
          </div>
        </div>

        {/* Loading skeleton */}
        {isLoading && (
          <div
            className="max-w-4xl mx-auto space-y-3"
            data-ocid="leaderboard.loading_state"
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-20 rounded-lg bg-white/10 border border-white/20 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Entries */}
        {!isLoading && entries.length > 0 && (
          <div
            className="max-w-4xl mx-auto space-y-3"
            data-ocid="leaderboard.list"
          >
            {entries.map((entry, index) => (
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
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-white flex items-center gap-2 flex-wrap">
                      <span className="truncate">{entry.username}</span>
                      <span className="text-sm font-normal text-white/60 shrink-0">
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
        )}

        {/* Empty state */}
        {!isLoading && entries.length === 0 && (
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
                No scores yet — be the first to play!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardView;
