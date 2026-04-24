/**
 * PlayerProfileScreen — Unified full-screen read-only profile view.
 * Matches ProfileView.tsx layout exactly:
 *   banner → circular avatar → name + level badge → title → bio → XP bar → stats grid
 * Used everywhere a player's profile is shown (leaderboard, clan chat, socials).
 *
 * Profile picture, banner, and bio are loaded from the backend UserProfile,
 * which stores the file paths in profilePictureUrl / bannerImageUrl fields.
 * Falls back to default avatar and gradient banner when no images are stored.
 */
import type { Principal } from "@icp-sdk/core/principal";
import {
  ArrowLeft,
  Award,
  Clock,
  Star,
  Target,
  TrendingUp,
  Trophy,
  UserMinus,
  UserPlus,
  Users,
  X,
  Zap,
} from "lucide-react";
import type React from "react";
import { useFileUrl } from "../file-storage/FileList";
import type { GameStatistics } from "../hooks/useQueries";
import {
  useAddFriend,
  useGetUserGameStats,
  useGetUserProfile,
  useIsFriend,
  useRemoveFriend,
} from "../hooks/useQueries";

// ─── Shared helpers (mirrored from ProfileView.tsx) ───────────────────────────

export const DEFAULT_AVATAR_SVG = `data:image/svg+xml,${encodeURIComponent(`
  <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ag" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#f97316;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#ea580c;stop-opacity:1" />
      </linearGradient>
      <linearGradient id="bg2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.95" />
        <stop offset="100%" style="stop-color:#f3f4f6;stop-opacity:0.95" />
      </linearGradient>
    </defs>
    <circle cx="40" cy="40" r="40" fill="url(#ag)"/>
    <circle cx="40" cy="40" r="36" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
    <circle cx="40" cy="30" r="12" fill="url(#bg2)" stroke="rgba(0,0,0,0.1)" stroke-width="0.5"/>
    <path d="M22 62 Q22 50 40 50 Q58 50 58 62 Q58 66 40 66 Q22 66 22 62 Z" fill="url(#bg2)" stroke="rgba(0,0,0,0.1)" stroke-width="0.5"/>
    <circle cx="40" cy="40" r="40" fill="none" stroke="rgba(0,0,0,0.1)" stroke-width="1"/>
  </svg>
`)}`;

export const getPlayerTitle = (level: number): string => {
  if (level >= 95) return "Eggsplosion Master";
  if (level >= 90) return "Hen House Hero";
  if (level >= 85) return "Rooster Ruler";
  if (level >= 80) return "Coop Conqueror";
  if (level >= 75) return "Cluck Commander";
  if (level >= 70) return "Ultimate Chicken Champion";
  if (level >= 65) return "Chicken Dragon Tamer";
  if (level >= 60) return "Master of Molt";
  if (level >= 55) return "Feather Curse Slayer";
  if (level >= 50) return "Galactic Rooster Hunter";
  if (level >= 45) return "Egg Exterminator";
  if (level >= 40) return "Poultry Destroyer";
  if (level >= 35) return "King of Chickens";
  if (level >= 30) return "Turbo Tractorman";
  if (level >= 25) return "Wing Hunter";
  if (level >= 20) return "Roasted Hen Tamer";
  if (level >= 15) return "Corn Massacre";
  if (level >= 10) return "Feather Catcher";
  if (level >= 5) return "Egg Breaker";
  return "Chick Warrior";
};

export const formatPlayTime = (minutes: number): string => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const rem = minutes % 60;
  return rem > 0 ? `${hours}h ${rem}m` : `${hours}h`;
};

type StatKey = keyof Pick<
  GameStatistics,
  | "totalChickensShot"
  | "highestScore"
  | "currentAccuracy"
  | "totalPlayTimeMinutes"
  | "totalMissedShots"
  | "goldenChickensShot"
  | "fastChickensShot"
  | "smallChickensShot"
  | "mediumChickensShot"
  | "largeChickensShot"
  | "bestConsecutiveHits"
  | "perfectAccuracySessions"
  | "totalScore"
  | "totalShotsFired"
  | "bestSessionChickens"
>;

export const STAT_ITEMS: Array<{
  key: StatKey;
  label: string;
  icon: React.ElementType;
  format: (v: number) => string;
}> = [
  {
    key: "totalChickensShot",
    label: "Total Chickens",
    icon: Target,
    format: (v) => v.toLocaleString(),
  },
  {
    key: "highestScore",
    label: "Best Score",
    icon: Trophy,
    format: (v) => v.toLocaleString(),
  },
  {
    key: "currentAccuracy",
    label: "Accuracy",
    icon: TrendingUp,
    format: (v) => `${v.toFixed(1)}%`,
  },
  {
    key: "totalPlayTimeMinutes",
    label: "Play Time",
    icon: Clock,
    format: (v) => formatPlayTime(v),
  },
  {
    key: "totalMissedShots",
    label: "Missed Shots",
    icon: X,
    format: (v) => v.toLocaleString(),
  },
  {
    key: "goldenChickensShot",
    label: "Golden Chickens",
    icon: Star,
    format: (v) => v.toLocaleString(),
  },
  {
    key: "fastChickensShot",
    label: "Fast Chickens",
    icon: Zap,
    format: (v) => v.toLocaleString(),
  },
  {
    key: "smallChickensShot",
    label: "Small Chickens",
    icon: Target,
    format: (v) => v.toLocaleString(),
  },
  {
    key: "mediumChickensShot",
    label: "Medium Chickens",
    icon: Target,
    format: (v) => v.toLocaleString(),
  },
  {
    key: "largeChickensShot",
    label: "Large Chickens",
    icon: Target,
    format: (v) => v.toLocaleString(),
  },
  {
    key: "bestConsecutiveHits",
    label: "Best Streak",
    icon: TrendingUp,
    format: (v) => v.toLocaleString(),
  },
  {
    key: "perfectAccuracySessions",
    label: "Perfect Sessions",
    icon: Award,
    format: (v) => v.toLocaleString(),
  },
  {
    key: "totalScore",
    label: "Total Score",
    icon: Star,
    format: (v) => v.toLocaleString(),
  },
  {
    key: "totalShotsFired",
    label: "Total Shots",
    icon: Target,
    format: (v) => v.toLocaleString(),
  },
  {
    key: "bestSessionChickens",
    label: "Best Session",
    icon: Trophy,
    format: (v) => v.toLocaleString(),
  },
];

// ─── Stat skeleton ────────────────────────────────────────────────────────────

const StatSkeleton: React.FC = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
    {Array.from({ length: 6 }, (_, i) => `skel-${i}`).map((id) => (
      <div
        key={id}
        className="h-16 rounded-lg bg-muted border border-border animate-pulse"
      />
    ))}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export interface PlayerProfileScreenProps {
  /** The principal of the player whose profile to show */
  principal: Principal;
  /** Fallback display name (e.g. from PrincipalInfo) */
  fallbackName?: string;
  /** Fallback level (e.g. from PrincipalInfo) */
  fallbackLevel?: number;
  /** Whether this is the current user's own profile (hides friend button) */
  isOwnProfile?: boolean;
  /** Callback to go back */
  onBack: () => void;
}

const PlayerProfileScreen: React.FC<PlayerProfileScreenProps> = ({
  principal,
  fallbackName,
  fallbackLevel = 1,
  isOwnProfile = false,
  onBack,
}) => {
  const { data: profile, isLoading: profileLoading } =
    useGetUserProfile(principal);
  const { data: gameStats, isLoading: statsLoading } =
    useGetUserGameStats(principal);
  const { data: isFriend, isLoading: friendLoading } = useIsFriend(
    isOwnProfile ? null : principal,
  );
  const addFriend = useAddFriend();
  const removeFriend = useRemoveFriend();

  // Resolve image paths stored in the backend profile to displayable URLs
  const profilePicturePath =
    (profile as { profilePictureUrl?: string } | null | undefined)
      ?.profilePictureUrl ?? "";
  const bannerImagePath =
    (profile as { bannerImageUrl?: string } | null | undefined)
      ?.bannerImageUrl ?? "";
  const { data: profilePictureUrl } = useFileUrl(profilePicturePath);
  const { data: bannerImageUrl } = useFileUrl(bannerImagePath);

  const displayName =
    profile?.name?.trim() ||
    fallbackName?.trim() ||
    `${principal.toText().slice(0, 10)}…`;

  const level = gameStats ? Number(gameStats.level) : fallbackLevel;
  const currentTitle = getPlayerTitle(level);

  // XP progress from highestScore
  const highestScore = gameStats ? Number(gameStats.highestScore) : 0;
  const xpForLevel = (lvl: number) => Math.floor(100 * lvl ** 1.5);
  const currentXP = highestScore % Math.max(1, xpForLevel(level));
  const requiredXP = xpForLevel(level);

  const getAvatarSrc = () =>
    profilePictureUrl?.trim() ? profilePictureUrl : DEFAULT_AVATAR_SVG;

  const getBannerStyle = (): React.CSSProperties =>
    bannerImageUrl?.trim()
      ? {
          backgroundImage: `url(${bannerImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }
      : {};

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = DEFAULT_AVATAR_SVG;
  };

  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{ height: "100%", width: "100%" }}
      data-ocid="player_profile.page"
    >
      {/* Header bar */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-gray-800 shrink-0 bg-black">
        <button
          type="button"
          data-ocid="player_profile.back_button"
          onClick={onBack}
          className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-gray-200 text-black hover:border-orange-400 transition-colors shadow-sm shrink-0"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-lg font-black text-white truncate flex-1">
          Player Profile
        </h1>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto bg-black pb-4">
        {/* Profile card — mirrors ProfileView.tsx structure */}
        <div className="mx-4 mt-4 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Banner — uses backend bannerImageUrl if available, falls back to gradient */}
          <div
            className="h-28 relative bg-gradient-to-br from-orange-900 via-orange-700 to-black"
            style={getBannerStyle()}
          >
            {/* Circular avatar overlapping banner */}
            <div className="absolute left-6 bottom-0 translate-y-1/2 w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg bg-orange-100">
              <img
                src={getAvatarSrc()}
                alt={`${displayName}'s avatar`}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </div>
          </div>

          {/* White content area */}
          <div className="bg-white p-6 pt-14">
            {/* Name + level badge */}
            <div className="mb-2">
              {profileLoading ? (
                <div className="h-7 w-40 bg-gray-200 rounded animate-pulse mb-2" />
              ) : (
                <div className="flex items-center flex-wrap gap-2 mb-1">
                  <h2 className="text-2xl font-bold text-black">
                    {displayName}
                  </h2>
                  <span className="text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 px-2 py-1 rounded-full shadow-sm">
                    Lv.{level}
                  </span>
                </div>
              )}
            </div>

            {/* Bio */}
            <div className="mb-4">
              {profileLoading ? (
                <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
              ) : profile?.bio?.trim() ? (
                <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">
                  {profile.bio.trim()}
                </p>
              ) : (
                <p className="text-sm text-gray-400 italic">No bio set.</p>
              )}
            </div>

            {/* Title badge */}
            <div className="flex items-center mb-5">
              <div className="flex items-center bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg px-3 py-1.5 shadow-md">
                <Trophy className="w-4 h-4 mr-2 text-yellow-300" />
                <span className="font-bold text-sm">{currentTitle}</span>
              </div>
            </div>

            {/* XP Progress bar */}
            {level < 100 && (
              <div className="mb-5">
                <div className="flex justify-between text-xs font-medium text-gray-600 mb-1">
                  <span>Level {level}</span>
                  <span>
                    {currentXP.toLocaleString()} / {requiredXP.toLocaleString()}{" "}
                    XP
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (currentXP / Math.max(1, requiredXP)) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Add / Remove Friend button */}
            {!isOwnProfile && (
              <div className="mb-5">
                {friendLoading ? (
                  <div
                    className="w-full h-11 rounded-xl bg-gray-100 border border-gray-200 animate-pulse"
                    data-ocid="player_profile.friend_button.loading_state"
                  />
                ) : isFriend ? (
                  <button
                    type="button"
                    data-ocid="player_profile.remove_friend_button"
                    disabled={removeFriend.isPending}
                    onClick={() => removeFriend.mutate(principal)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white border border-red-200 text-red-500 font-bold text-sm hover:bg-red-50 transition-colors disabled:opacity-40 shadow-sm"
                  >
                    <UserMinus size={16} />
                    {removeFriend.isPending ? "Removing…" : "Remove Friend"}
                  </button>
                ) : (
                  <button
                    type="button"
                    data-ocid="player_profile.add_friend_button"
                    disabled={addFriend.isPending}
                    onClick={() => addFriend.mutate(principal)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 shadow-md"
                  >
                    {addFriend.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        Adding…
                      </>
                    ) : (
                      <>
                        <UserPlus size={16} />
                        Add Friend
                      </>
                    )}
                  </button>
                )}
                {addFriend.isSuccess && (
                  <div className="flex items-center justify-center gap-1.5 mt-2">
                    <Users size={14} className="text-green-600" />
                    <span className="text-xs text-green-600 font-medium">
                      You are now friends!
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Statistics grid — same as ProfileView */}
            <div className="border-t border-gray-200 pt-5">
              <h3 className="text-lg font-black text-black flex items-center mb-4">
                <Trophy className="w-5 h-5 mr-2 text-orange-500" />
                Statistics Overview
              </h3>
              {statsLoading ? (
                <StatSkeleton />
              ) : !gameStats ? (
                <div
                  className="text-center py-6 text-gray-400 text-sm"
                  data-ocid="player_profile.stats.empty_state"
                >
                  No statistics yet
                </div>
              ) : (
                <div
                  className="grid grid-cols-2 md:grid-cols-3 gap-4"
                  data-ocid="player_profile.stats.list"
                >
                  {STAT_ITEMS.map(({ key, label, icon: Icon, format }) => (
                    <div
                      key={key}
                      className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                    >
                      <div className="flex items-center mb-2">
                        <Icon className="w-4 h-4 text-orange-500 mr-2" />
                        <span className="text-xs font-medium text-gray-600 truncate">
                          {label}
                        </span>
                      </div>
                      <p className="text-lg font-black text-gray-700">
                        {format(Number(gameStats[key] ?? 0))}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfileScreen;
