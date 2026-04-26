import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import {
  Award,
  Camera,
  Check,
  Clock,
  Copy,
  Edit3,
  Image,
  LogIn,
  LogOut,
  Star,
  Target,
  TrendingUp,
  Trophy,
  User,
  X,
  Zap,
} from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useFileUrl } from "../file-storage/FileList";
import { useFileUpload } from "../file-storage/FileUpload";
import {
  useListUsers,
  useSaveCurrentUserProfile,
  useSaveCurrentUserProfileWithChangeStatus,
  useUserProfileWithChangeStatus,
} from "../hooks/useQueries";
import { compressImage } from "../utils/imageUtils";

interface PlayerData {
  level: number;
  currentXP: number;
  requiredXP: number;
}

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

interface ProfileViewProps {
  score: number;
  playerData: PlayerData;
  isAuthenticated: boolean;
  gameStatistics: GameStatisticsLocal;
}

const getPlayerTitle = (level: number): string => {
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

const formatPlayTime = (minutes: number): string => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const rem = minutes % 60;
  return rem > 0 ? `${hours}h ${rem}m` : `${hours}h`;
};

const truncatePrincipal = (id: string): string => {
  if (id.length <= 20) return id;
  return `${id.substring(0, 10)}...${id.substring(id.length - 10)}`;
};

const DEFAULT_AVATAR_SVG = `data:image/svg+xml,${encodeURIComponent(`
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

const STAT_ITEMS = [
  {
    key: "totalChickensShot",
    label: "Total Chickens",
    icon: Target,
    format: (v: number) => v.toLocaleString(),
  },
  {
    key: "highestScore",
    label: "Best Score",
    icon: Trophy,
    format: (v: number) => v.toLocaleString(),
  },
  {
    key: "currentAccuracy",
    label: "Accuracy",
    icon: TrendingUp,
    format: (v: number) => `${v}%`,
  },
  {
    key: "totalPlayTimeMinutes",
    label: "Play Time",
    icon: Clock,
    format: (v: number) => formatPlayTime(v),
  },
  {
    key: "totalMissedShots",
    label: "Missed Shots",
    icon: X,
    format: (v: number) => v.toLocaleString(),
  },
  {
    key: "goldenChickensShot",
    label: "Golden Chickens",
    icon: Star,
    format: (v: number) => v.toLocaleString(),
  },
  {
    key: "fastChickensShot",
    label: "Fast Chickens",
    icon: Zap,
    format: (v: number) => v.toLocaleString(),
  },
  {
    key: "smallChickensShot",
    label: "Small Chickens",
    icon: Target,
    format: (v: number) => v.toLocaleString(),
  },
  {
    key: "mediumChickensShot",
    label: "Medium Chickens",
    icon: Target,
    format: (v: number) => v.toLocaleString(),
  },
  {
    key: "largeChickensShot",
    label: "Large Chickens",
    icon: Target,
    format: (v: number) => v.toLocaleString(),
  },
  {
    key: "bestConsecutiveHits",
    label: "Best Streak",
    icon: TrendingUp,
    format: (v: number) => v.toLocaleString(),
  },
  {
    key: "perfectAccuracySessions",
    label: "Perfect Sessions",
    icon: Award,
    format: (v: number) => v.toLocaleString(),
  },
  {
    key: "totalScore",
    label: "Total Score",
    icon: Star,
    format: (v: number) => v.toLocaleString(),
  },
  {
    key: "totalShotsFired",
    label: "Total Shots",
    icon: Target,
    format: (v: number) => v.toLocaleString(),
  },
  {
    key: "bestSessionChickens",
    label: "Best Session",
    icon: Trophy,
    format: (v: number) => v.toLocaleString(),
  },
] as const;

const ProfileView: React.FC<ProfileViewProps> = ({
  score: _score,
  playerData,
  isAuthenticated,
  gameStatistics,
}) => {
  const { identity, clear, login, loginStatus } = useInternetIdentity();
  const { data: userProfile } = useUserProfileWithChangeStatus();
  const { data: allUsers = [] } = useListUsers();
  const saveProfileMutation = useSaveCurrentUserProfileWithChangeStatus();
  const saveImagesMutation = useSaveCurrentUserProfile();
  const { uploadFile, isUploading } = useFileUpload();
  const queryClient = useQueryClient();
  const profileFileInputRef = useRef<HTMLInputElement>(null);
  const headerFileInputRef = useRef<HTMLInputElement>(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUsername, setEditedUsername] = useState("");
  const [editedBio, setEditedBio] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [bioError, setBioError] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [editedXUrl, setEditedXUrl] = useState("");
  const [editedTelegramUrl, setEditedTelegramUrl] = useState("");
  const [editedYoutubeUrl, setEditedYoutubeUrl] = useState("");
  const [editedGithubUrl, setEditedGithubUrl] = useState("");
  const [xUrlError, setXUrlError] = useState("");
  const [telegramUrlError, setTelegramUrlError] = useState("");
  const [youtubeUrlError, setYoutubeUrlError] = useState("");
  const [githubUrlError, setGithubUrlError] = useState("");
  const [profilePicturePath, setProfilePicturePath] = useState<string | null>(
    null,
  );
  const [headerImagePath, setHeaderImagePath] = useState<string | null>(null);
  const [headerSymbolVisible, setHeaderSymbolVisible] = useState(false);

  const { data: profilePictureUrl } = useFileUrl(profilePicturePath ?? "");
  const { data: headerImageUrl } = useFileUrl(headerImagePath ?? "");

  const handleLogout = async () => {
    try {
      await clear();
      queryClient.clear();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleLogin = async () => {
    try {
      await login();
      queryClient.clear();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const getDefaultUsername = () => {
    if (!identity || !isAuthenticated) return "Guest User";
    const currentPrincipal = identity.getPrincipal().toString();
    const idx = allUsers.findIndex(
      (u) => u.principal.toString() === currentPrincipal,
    );
    return idx >= 0 ? `Player #${idx + 1}` : "Player #1";
  };

  const getDisplayUsername = () => {
    if (!isAuthenticated) return "Guest User";
    return userProfile?.name?.trim() || getDefaultUsername();
  };

  const getDisplayBio = () => {
    if (!isAuthenticated) return "";
    return userProfile?.bio?.trim() || "";
  };

  const canEditUsername = () =>
    userProfile ? !userProfile.hasChangedName : true;

  useEffect(() => {
    setEditedUsername(userProfile?.name ?? "");
    setEditedBio(userProfile?.bio ?? "");
    const p = userProfile as
      | {
          xUrl?: string;
          telegramUrl?: string;
          youtubeUrl?: string;
          githubUrl?: string;
        }
      | null
      | undefined;
    setEditedXUrl(p?.xUrl ?? "");
    setEditedTelegramUrl(p?.telegramUrl ?? "");
    setEditedYoutubeUrl(p?.youtubeUrl ?? "");
    setEditedGithubUrl(p?.githubUrl ?? "");
  }, [userProfile]);

  // Load image paths from storage (backend takes priority over localStorage)
  useEffect(() => {
    if (isAuthenticated && identity) {
      const p = identity.getPrincipal().toString();
      // Prefer backend-stored URLs if available (cast for extended fields)
      const backendProfilePic = (
        userProfile as { profilePictureUrl?: string } | null | undefined
      )?.profilePictureUrl;
      const backendBanner = (
        userProfile as { bannerImageUrl?: string } | null | undefined
      )?.bannerImageUrl;
      setProfilePicturePath(
        backendProfilePic || localStorage.getItem(`profilePicture_${p}`),
      );
      setHeaderImagePath(
        backendBanner || localStorage.getItem(`headerImage_${p}`),
      );
    } else {
      setProfilePicturePath(sessionStorage.getItem("profilePicture_guest"));
      setHeaderImagePath(sessionStorage.getItem("headerImage_guest"));
    }
  }, [isAuthenticated, identity, userProfile]);

  // Hide header symbol when clicking outside
  useEffect(() => {
    if (!headerSymbolVisible) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Element;
      const header = document.querySelector(".profile-header");
      const symbol = document.querySelector(".header-change-symbol");
      if (
        header &&
        symbol &&
        !header.contains(target) &&
        !symbol.contains(target)
      ) {
        setHeaderSymbolVisible(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [headerSymbolVisible]);

  const validateUsername = (u: string): string => {
    const t = u.trim();
    if (!t) return "Username cannot be empty";
    if (t.length < 2) return "Username must be at least 2 characters long";
    if (t.length > 15) return "Username must be 15 characters or less";
    if (!/^[a-zA-Z0-9\s\-_.!@#$%^&*()+={}[\]:;"'<>?,./\\|`~]+$/.test(t))
      return "Username contains invalid characters";
    return "";
  };

  const validateBio = (b: string): string => {
    if (b.trim().length > 200) return "Bio must be 200 characters or less";
    return "";
  };

  const validateXUrl = (url: string): string => {
    if (!url.trim()) return "";
    if (
      /^https?:\/\/(www\.)?(x\.com|twitter\.com)\/[A-Za-z0-9_]{1,50}\/?$/.test(
        url.trim(),
      )
    )
      return "";
    return "Must be https://x.com/username or https://twitter.com/username";
  };

  const validateTelegramUrl = (url: string): string => {
    if (!url.trim()) return "";
    if (
      /^https?:\/\/(www\.)?(t\.me|telegram\.me)\/[A-Za-z0-9_]{4,50}\/?$/.test(
        url.trim(),
      )
    )
      return "";
    return "Must be https://t.me/username or https://telegram.me/username";
  };

  const validateYoutubeUrl = (url: string): string => {
    if (!url.trim()) return "";
    if (
      /^https?:\/\/(www\.)?youtube\.com\/(@[A-Za-z0-9_.\-]{1,100}|c\/[A-Za-z0-9_.\-]{1,100}|user\/[A-Za-z0-9_.\-]{1,100})\/?$/.test(
        url.trim(),
      )
    )
      return "";
    return "Must be https://youtube.com/@handle or /c/channel or /user/name";
  };

  const validateGithubUrl = (url: string): string => {
    if (!url.trim()) return "";
    if (
      /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_.\-]{1,100}\/?$/.test(
        url.trim(),
      )
    )
      return "";
    return "Must be https://github.com/username";
  };

  const handleSaveChanges = async () => {
    const usernameErr = canEditUsername()
      ? validateUsername(editedUsername)
      : "";
    const bioErr = validateBio(editedBio);
    const xErr = validateXUrl(editedXUrl);
    const tgErr = validateTelegramUrl(editedTelegramUrl);
    const ytErr = validateYoutubeUrl(editedYoutubeUrl);
    const ghErr = validateGithubUrl(editedGithubUrl);

    if (usernameErr) {
      setUsernameError(usernameErr);
      return;
    }
    if (bioErr) {
      setBioError(bioErr);
      return;
    }
    if (xErr) {
      setXUrlError(xErr);
      return;
    }
    if (tgErr) {
      setTelegramUrlError(tgErr);
      return;
    }
    if (ytErr) {
      setYoutubeUrlError(ytErr);
      return;
    }
    if (ghErr) {
      setGithubUrlError(ghErr);
      return;
    }

    try {
      const isFirstChange =
        canEditUsername() &&
        editedUsername.trim() !== (userProfile?.name ?? "");
      await saveProfileMutation.mutateAsync({
        name: canEditUsername()
          ? editedUsername.trim()
          : (userProfile?.name ?? getDefaultUsername()),
        bio: editedBio.trim(),
        hasChangedName: userProfile?.hasChangedName || isFirstChange,
        xUrl: editedXUrl.trim() || undefined,
        telegramUrl: editedTelegramUrl.trim() || undefined,
        youtubeUrl: editedYoutubeUrl.trim() || undefined,
        githubUrl: editedGithubUrl.trim() || undefined,
      });
      setIsEditMode(false);
      setUsernameError("");
      setBioError("");
      setXUrlError("");
      setTelegramUrlError("");
      setYoutubeUrlError("");
      setGithubUrlError("");
      setHeaderSymbolVisible(false);
    } catch (error) {
      if (error instanceof Error && error.message.includes("Name too long")) {
        setUsernameError("Username must be 15 characters or less");
      } else {
        setUsernameError("Failed to save profile. Please try again.");
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setUsernameError("");
    setBioError("");
    setXUrlError("");
    setTelegramUrlError("");
    setYoutubeUrlError("");
    setGithubUrlError("");
    setHeaderSymbolVisible(false);
    setEditedUsername(userProfile?.name ?? "");
    setEditedBio(userProfile?.bio ?? "");
    const p = userProfile as
      | {
          xUrl?: string;
          telegramUrl?: string;
          youtubeUrl?: string;
          githubUrl?: string;
        }
      | null
      | undefined;
    setEditedXUrl(p?.xUrl ?? "");
    setEditedTelegramUrl(p?.telegramUrl ?? "");
    setEditedYoutubeUrl(p?.youtubeUrl ?? "");
    setEditedGithubUrl(p?.githubUrl ?? "");
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (v.length <= 15) {
      setEditedUsername(v);
      setUsernameError("");
    } else {
      setUsernameError("Username must be 15 characters or less");
    }
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    if (v.length <= 200) {
      setEditedBio(v);
      setBioError("");
    } else {
      setBioError("Bio must be 200 characters or less");
    }
  };

  const handleBioKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") e.preventDefault();
  };

  const handleBioPaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const text = e.clipboardData
      .getData("text")
      .replace(/[\r\n]+/g, " ")
      .trim();
    if (text.length <= 200) {
      setEditedBio(text);
      setBioError("");
    } else {
      setEditedBio(text.substring(0, 200));
      setBioError("Bio must be 200 characters or less");
    }
  };

  const handleCopyPrincipalId = async () => {
    if (!identity) return;
    try {
      await navigator.clipboard.writeText(identity.getPrincipal().toString());
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      // ignore
    }
  };

  const uploadImageFile = async (
    file: File,
    folder: string,
    prefix: string,
    onPathSaved: (path: string) => void,
  ) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("Image size must be less than 2MB");
      return;
    }
    try {
      // Compress silently in background — max 1200px, JPEG 0.75
      const compressed = await compressImage(file);
      const data = new Uint8Array(await compressed.blob.arrayBuffer());
      const path = `${folder}/${prefix}_${Date.now()}.jpg`;
      await uploadFile(path, "image/jpeg", data);
      onPathSaved(path);
    } catch {
      alert("Failed to upload image. Please try again.");
    }
  };

  const handleProfileFileSelect = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadImageFile(file, "profiles", "profile", (path) => {
      setProfilePicturePath(path);
      if (isAuthenticated && identity) {
        localStorage.setItem(
          `profilePicture_${identity.getPrincipal().toString()}`,
          path,
        );
        // Persist to backend so other players can see it
        saveImagesMutation.mutate({
          name: userProfile?.name ?? "",
          bio: userProfile?.bio ?? "",
          profilePictureUrl: path,
          bannerImageUrl:
            (userProfile as { bannerImageUrl?: string } | null | undefined)
              ?.bannerImageUrl ??
            headerImagePath ??
            "",
        });
      } else {
        sessionStorage.setItem("profilePicture_guest", path);
      }
    });
    if (profileFileInputRef.current) profileFileInputRef.current.value = "";
  };

  const handleHeaderFileSelect = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadImageFile(file, "headers", "header", (path) => {
      setHeaderImagePath(path);
      if (isAuthenticated && identity) {
        localStorage.setItem(
          `headerImage_${identity.getPrincipal().toString()}`,
          path,
        );
        // Persist to backend so other players can see it
        saveImagesMutation.mutate({
          name: userProfile?.name ?? "",
          bio: userProfile?.bio ?? "",
          profilePictureUrl:
            (userProfile as { profilePictureUrl?: string } | null | undefined)
              ?.profilePictureUrl ??
            profilePicturePath ??
            "",
          bannerImageUrl: path,
        });
      } else {
        sessionStorage.setItem("headerImage_guest", path);
      }
    });
    if (headerFileInputRef.current) headerFileInputRef.current.value = "";
  };

  const getProfileImageSrc = () =>
    profilePictureUrl?.trim() ? profilePictureUrl : DEFAULT_AVATAR_SVG;

  const getHeaderStyle = (): React.CSSProperties =>
    headerImageUrl?.trim()
      ? {
          backgroundImage: `url(${headerImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }
      : {};

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = DEFAULT_AVATAR_SVG;
  };

  const displayName = getDisplayUsername();
  const displayBio = getDisplayBio();
  const principalId = identity?.getPrincipal().toString() ?? "";
  const isLoggingIn = loginStatus === "logging-in";
  const currentTitle = getPlayerTitle(playerData.level);

  const profileSocialLinks = userProfile as
    | {
        xUrl?: string;
        telegramUrl?: string;
        youtubeUrl?: string;
        githubUrl?: string;
      }
    | null
    | undefined;

  if (!isAuthenticated) {
    return (
      <div className="absolute inset-0 bg-black overflow-y-auto pb-20">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-3xl mx-auto">
            {/* Blurred profile card */}
            <div className="bg-white rounded-xl shadow-xl border border-gray-200 opacity-60 blur-sm overflow-hidden">
              <div
                className="bg-black rounded-tr-xl h-24 relative"
                style={getHeaderStyle()}
              >
                <div className="absolute left-6 top-12 w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={DEFAULT_AVATAR_SVG}
                    alt="Default Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="bg-white p-6 pt-16">
                <div className="mb-6 profile-info-shifted">
                  <div className="flex items-center mb-1">
                    <h2 className="text-2xl font-bold text-gray-400 mr-3">
                      Guest User
                    </h2>
                    <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                      Lv.1
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 italic mt-2">
                    Login to see your profile
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Login Prompt Overlay */}
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
            data-ocid="profile.login_prompt"
          >
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-md mx-auto">
              <div className="flex items-center justify-center p-6 border-b border-gray-200">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 mr-4 shadow-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-black text-black">PROFILE</h2>
              </div>
              <div className="p-6">
                <div className="text-center mb-6">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Login required to access your profile and track your
                    progress across all gaming sessions.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="w-full flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  data-ocid="profile.login_button"
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
        </div>
      </div>
    );
  }

  return (
    <div
      className="profile-view absolute inset-0 bg-black overflow-y-auto pb-20"
      data-ocid="profile.page"
    >
      {/* Hidden file inputs */}
      <input
        ref={profileFileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleProfileFileSelect}
      />
      <input
        ref={headerFileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleHeaderFileSelect}
      />

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Header Banner */}
            <div
              className="profile-header bg-black rounded-tr-xl h-24 relative cursor-pointer"
              style={getHeaderStyle()}
              onClick={() => isEditMode && setHeaderSymbolVisible(true)}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && isEditMode)
                  setHeaderSymbolVisible(true);
              }}
            >
              {/* Edit / Save / Cancel buttons */}
              <div className="absolute top-2 right-4 z-10">
                {!isEditMode ? (
                  <button
                    type="button"
                    onClick={() => setIsEditMode(true)}
                    className="flex items-center bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-1.5 px-3 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 border border-white/30 shadow-lg text-sm"
                    data-ocid="profile.edit_button"
                  >
                    <Edit3 className="w-3 h-3 mr-1.5" />
                    Edit
                  </button>
                ) : (
                  <div className="flex space-x-1.5">
                    <button
                      type="button"
                      onClick={handleSaveChanges}
                      disabled={saveProfileMutation.isPending}
                      className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-1.5 px-3 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 text-sm"
                      data-ocid="profile.save_button"
                    >
                      <Check className="w-3 h-3 mr-1.5" />
                      {saveProfileMutation.isPending ? "Saving..." : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      disabled={saveProfileMutation.isPending}
                      className="flex items-center bg-gray-500 hover:bg-gray-600 text-white font-bold py-1.5 px-3 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 text-sm"
                      data-ocid="profile.cancel_button"
                    >
                      <X className="w-3 h-3 mr-1.5" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Header Image Change Icon */}
              {isEditMode && headerSymbolVisible && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <button
                    type="button"
                    onClick={() => headerFileInputRef.current?.click()}
                    className="header-change-symbol flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full transition-all duration-200 hover:scale-105 active:scale-95 border border-white/30 shadow-lg"
                    aria-label="Change header image"
                  >
                    <Image className="w-5 h-5" />
                    {isUploading && (
                      <div className="absolute inset-0 rounded-full bg-black/70 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      </div>
                    )}
                  </button>
                </div>
              )}

              {/* Profile Picture */}
              <div className="absolute left-6 top-12 w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <div className="relative w-full h-full">
                  <img
                    src={getProfileImageSrc()}
                    alt="Profile avatar"
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                  {isEditMode && (
                    <button
                      type="button"
                      className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer border-0"
                      onClick={() => profileFileInputRef.current?.click()}
                      aria-label="Change profile picture"
                    >
                      <Camera className="w-6 h-6 text-white" />
                    </button>
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 rounded-full bg-black/70 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white p-6 pt-16">
              <div className="mb-6 profile-info-shifted">
                {/* Username */}
                {isEditMode ? (
                  <div className="space-y-2 mb-3">
                    <div className="relative">
                      {canEditUsername() ? (
                        <>
                          <input
                            type="text"
                            value={editedUsername}
                            onChange={handleUsernameChange}
                            className="text-2xl font-bold text-black bg-white border-2 border-orange-300 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 transition-colors w-full"
                            placeholder="Enter username"
                            maxLength={15}
                            data-ocid="profile.username_input"
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                            {editedUsername.length}/15
                          </div>
                        </>
                      ) : (
                        <div className="text-2xl font-bold text-black bg-gray-100 border-2 border-gray-300 rounded-lg px-3 py-2 w-full relative">
                          {displayName}
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                            Read-only
                          </div>
                        </div>
                      )}
                    </div>
                    {!canEditUsername() && (
                      <p className="text-gray-500 text-sm">
                        Username can only be changed once.
                      </p>
                    )}
                    {usernameError && (
                      <p
                        className="text-red-500 text-sm font-medium"
                        data-ocid="profile.username_error"
                      >
                        {usernameError}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="mb-3">
                    <div className="flex items-center">
                      <h2 className="text-2xl font-bold text-black mr-3">
                        {displayName}
                      </h2>
                      <span className="text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 px-2 py-1 rounded-full shadow-sm">
                        Lv.{playerData.level}
                      </span>
                    </div>
                  </div>
                )}

                {/* Principal ID */}
                <div className="flex items-center mb-3">
                  <span
                    className="text-sm text-gray-500 font-mono mr-2"
                    title={principalId}
                  >
                    {truncatePrincipal(principalId)}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyPrincipalId}
                    className={`transition-colors ${
                      copySuccess
                        ? "text-green-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    aria-label={copySuccess ? "Copied!" : "Copy Principal ID"}
                    data-ocid="profile.copy_id_button"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  {copySuccess && (
                    <span className="text-xs text-green-600 font-medium ml-2">
                      Copied!
                    </span>
                  )}
                </div>

                {/* Bio */}
                {isEditMode ? (
                  <>
                    <div className="space-y-2 mb-4">
                      <div className="relative">
                        <textarea
                          value={editedBio}
                          onChange={handleBioChange}
                          onKeyDown={handleBioKeyDown}
                          onPaste={handleBioPaste}
                          className="w-full text-sm text-black bg-white border-2 border-orange-300 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                          placeholder="Tell us about yourself..."
                          rows={3}
                          maxLength={200}
                          data-ocid="profile.bio_textarea"
                        />
                        <div className="absolute bottom-2 right-3 text-xs text-gray-500">
                          {editedBio.length}/200
                        </div>
                      </div>
                      {bioError && (
                        <p
                          className="text-red-500 text-sm font-medium"
                          data-ocid="profile.bio_error"
                        >
                          {bioError}
                        </p>
                      )}
                    </div>

                    {/* Social Links — edit mode */}
                    <div className="space-y-3 mb-4">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Social Links
                      </h4>

                      {/* X */}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-black">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="white"
                              xmlns="http://www.w3.org/2000/svg"
                              role="img"
                              aria-hidden="true"
                            >
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                          </span>
                          <input
                            type="url"
                            value={editedXUrl}
                            onChange={(e) => {
                              setEditedXUrl(e.target.value);
                              setXUrlError("");
                            }}
                            onBlur={() =>
                              setXUrlError(validateXUrl(editedXUrl))
                            }
                            className="flex-1 text-sm text-black bg-white border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-400 transition-colors"
                            placeholder="https://x.com/yourusername"
                            aria-label="X (Twitter) profile URL"
                            data-ocid="profile.x_url_input"
                          />
                        </div>
                        {xUrlError && (
                          <p
                            className="text-red-500 text-xs mt-1 ml-10"
                            data-ocid="profile.x_url_error"
                          >
                            {xUrlError}
                          </p>
                        )}
                      </div>

                      {/* Telegram */}
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg"
                            style={{ backgroundColor: "#229ED9" }}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="white"
                              xmlns="http://www.w3.org/2000/svg"
                              role="img"
                              aria-hidden="true"
                            >
                              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                            </svg>
                          </span>
                          <input
                            type="url"
                            value={editedTelegramUrl}
                            onChange={(e) => {
                              setEditedTelegramUrl(e.target.value);
                              setTelegramUrlError("");
                            }}
                            onBlur={() =>
                              setTelegramUrlError(
                                validateTelegramUrl(editedTelegramUrl),
                              )
                            }
                            className="flex-1 text-sm text-black bg-white border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-400 transition-colors"
                            placeholder="https://t.me/yourusername"
                            aria-label="Telegram profile URL"
                            data-ocid="profile.telegram_url_input"
                          />
                        </div>
                        {telegramUrlError && (
                          <p
                            className="text-red-500 text-xs mt-1 ml-10"
                            data-ocid="profile.telegram_url_error"
                          >
                            {telegramUrlError}
                          </p>
                        )}
                      </div>

                      {/* YouTube */}
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg"
                            style={{ backgroundColor: "#FF0000" }}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="white"
                              xmlns="http://www.w3.org/2000/svg"
                              role="img"
                              aria-hidden="true"
                            >
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                          </span>
                          <input
                            type="url"
                            value={editedYoutubeUrl}
                            onChange={(e) => {
                              setEditedYoutubeUrl(e.target.value);
                              setYoutubeUrlError("");
                            }}
                            onBlur={() =>
                              setYoutubeUrlError(
                                validateYoutubeUrl(editedYoutubeUrl),
                              )
                            }
                            className="flex-1 text-sm text-black bg-white border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-400 transition-colors"
                            placeholder="https://youtube.com/@yourchannel"
                            aria-label="YouTube channel URL"
                            data-ocid="profile.youtube_url_input"
                          />
                        </div>
                        {youtubeUrlError && (
                          <p
                            className="text-red-500 text-xs mt-1 ml-10"
                            data-ocid="profile.youtube_url_error"
                          >
                            {youtubeUrlError}
                          </p>
                        )}
                      </div>

                      {/* GitHub */}
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg"
                            style={{ backgroundColor: "#181717" }}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="white"
                              xmlns="http://www.w3.org/2000/svg"
                              role="img"
                              aria-hidden="true"
                            >
                              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                            </svg>
                          </span>
                          <input
                            type="url"
                            value={editedGithubUrl}
                            onChange={(e) => {
                              setEditedGithubUrl(e.target.value);
                              setGithubUrlError("");
                            }}
                            onBlur={() =>
                              setGithubUrlError(
                                validateGithubUrl(editedGithubUrl),
                              )
                            }
                            className="flex-1 text-sm text-black bg-white border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-400 transition-colors"
                            placeholder="https://github.com/yourusername"
                            aria-label="GitHub profile URL"
                            data-ocid="profile.github_url_input"
                          />
                        </div>
                        {githubUrlError && (
                          <p
                            className="text-red-500 text-xs mt-1 ml-10"
                            data-ocid="profile.github_url_error"
                          >
                            {githubUrlError}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-4">
                      {displayBio ? (
                        <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">
                          {displayBio}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-400 italic">
                          No bio set.
                        </p>
                      )}
                    </div>

                    {/* Social Links — view mode */}
                    {(profileSocialLinks?.xUrl ||
                      profileSocialLinks?.telegramUrl ||
                      profileSocialLinks?.youtubeUrl ||
                      profileSocialLinks?.githubUrl) && (
                      <div
                        className="flex items-center gap-3 mb-4"
                        data-ocid="profile.social_links"
                      >
                        {profileSocialLinks?.xUrl && (
                          <a
                            href={profileSocialLinks.xUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 flex items-center justify-center rounded-xl bg-black hover:opacity-80 transition-opacity shadow-sm"
                            aria-label="X profile"
                            data-ocid="profile.x_link"
                          >
                            <span className="sr-only">X profile</span>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="white"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                            >
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                          </a>
                        )}
                        {profileSocialLinks?.telegramUrl && (
                          <a
                            href={profileSocialLinks.telegramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 flex items-center justify-center rounded-xl hover:opacity-80 transition-opacity shadow-sm"
                            style={{ backgroundColor: "#229ED9" }}
                            aria-label="Telegram profile"
                            data-ocid="profile.telegram_link"
                          >
                            <span className="sr-only">Telegram profile</span>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="white"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                            >
                              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                            </svg>
                          </a>
                        )}
                        {profileSocialLinks?.youtubeUrl && (
                          <a
                            href={profileSocialLinks.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 flex items-center justify-center rounded-xl hover:opacity-80 transition-opacity shadow-sm"
                            style={{ backgroundColor: "#FF0000" }}
                            aria-label="YouTube channel"
                            data-ocid="profile.youtube_link"
                          >
                            <span className="sr-only">YouTube channel</span>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="white"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                            >
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                          </a>
                        )}
                        {profileSocialLinks?.githubUrl && (
                          <a
                            href={profileSocialLinks.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 flex items-center justify-center rounded-xl hover:opacity-80 transition-opacity shadow-sm"
                            style={{ backgroundColor: "#181717" }}
                            aria-label="GitHub profile"
                            data-ocid="profile.github_link"
                          >
                            <span className="sr-only">GitHub profile</span>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="white"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                            >
                              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Player Title */}
              <div className="flex items-center mb-6">
                <div className="flex items-center bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg px-3 py-1.5 shadow-md">
                  <Trophy className="w-4 h-4 mr-2 text-yellow-300" />
                  <span className="font-bold text-sm">{currentTitle}</span>
                </div>
              </div>

              {/* XP Progress Bar */}
              {playerData.level < 100 && (
                <div className="mb-6">
                  <div className="flex justify-between text-xs font-medium text-gray-600 mb-1">
                    <span>Level {playerData.level}</span>
                    <span>
                      {playerData.currentXP.toLocaleString()} /{" "}
                      {playerData.requiredXP.toLocaleString()} XP
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (playerData.currentXP / Math.max(1, playerData.requiredXP)) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Statistics Grid */}
              <div className="border-t border-gray-200 pt-6 mb-6">
                <h3 className="text-lg font-black text-black flex items-center mb-4">
                  <Trophy className="w-5 h-5 mr-2 text-orange-500" />
                  Statistics Overview
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {STAT_ITEMS.map(({ key, label, icon: Icon, format }) => (
                    <div
                      key={key}
                      className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                    >
                      <div className="flex items-center mb-2">
                        <Icon className="w-4 h-4 text-orange-500 mr-2" />
                        <span className="text-xs font-medium text-gray-600">
                          {label}
                        </span>
                      </div>
                      <p className="text-lg font-black text-gray-700">
                        {format(
                          gameStatistics[
                            key as keyof GameStatisticsLocal
                          ] as number,
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Logout */}
              <div className="border-t border-gray-200 pt-6">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 border border-gray-300"
                  data-ocid="profile.logout_button"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
