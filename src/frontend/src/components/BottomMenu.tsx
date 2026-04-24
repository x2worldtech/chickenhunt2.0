import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  Globe,
  Medal,
  Settings,
  Target,
  Trophy,
  User,
  Users,
} from "lucide-react";
import type React from "react";
import { useCallback, useRef } from "react";

type GameView =
  | "game"
  | "worldSelection"
  | "achievements"
  | "profile"
  | "settings"
  | "leaderboard"
  | "socials"
  | "login-prompt";

interface BottomMenuProps {
  currentView: GameView;
  onViewChange: (view: GameView) => void;
  context?: "worldSelection" | "game";
  zIndex?: number;
}

const BottomMenu: React.FC<BottomMenuProps> = ({
  currentView,
  onViewChange,
  context = "game",
  zIndex = 30,
}) => {
  const audioRef = useRef<AudioContext | null>(null);
  const { isAuthenticated } = useInternetIdentity();

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

  const playClick = useCallback(() => {
    const ac = getAudio();
    if (!ac) return;
    try {
      if (ac.state === "suspended") ac.resume();
      const gain = ac.createGain();
      gain.connect(ac.destination);
      const now = ac.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

      [
        [800, 600],
        [400, 300],
      ].forEach(([start, end], i) => {
        const osc = ac.createOscillator();
        osc.type = i === 0 ? "sine" : "triangle";
        osc.connect(gain);
        osc.frequency.setValueAtTime(start, now);
        osc.frequency.exponentialRampToValueAtTime(end, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.1);
      });
    } catch {
      /* ignore */
    }
  }, [getAudio]);

  const handleViewChange = useCallback(
    (view: GameView) => {
      playClick();
      onViewChange(view);
    },
    [playClick, onViewChange],
  );

  // In worldSelection context, the center button uses 'worldSelection' as its id
  const tabs = [
    {
      id: "achievements" as GameView,
      icon: Trophy,
      label: "Achievements",
      ocid: "bottom_menu.achievements_tab",
      authGated: true,
    },
    {
      id: (context === "worldSelection"
        ? "worldSelection"
        : "game") as GameView,
      icon: context === "worldSelection" ? Globe : Target,
      label: context === "worldSelection" ? "Worlds" : "Game",
      ocid:
        context === "worldSelection"
          ? "bottom_menu.world_selection_tab"
          : "bottom_menu.game_tab",
      authGated: false,
    },
    {
      id: "profile" as GameView,
      icon: User,
      label: "Profile",
      ocid: "bottom_menu.profile_tab",
      authGated: true,
    },
    {
      id: "leaderboard" as GameView,
      icon: Medal,
      label: "Leaderboard",
      ocid: "bottom_menu.leaderboard_tab",
      authGated: true,
    },
    {
      id: "socials" as GameView,
      icon: Users,
      label: "Socials",
      ocid: "bottom_menu.socials_tab",
      authGated: true,
    },
    {
      id: "settings" as GameView,
      icon: Settings,
      label: "Settings",
      ocid: "bottom_menu.settings_tab",
      authGated: false,
    },
  ];

  const activeColor = (id: GameView) => {
    if (id === "game" || id === "worldSelection") return "text-orange-400";
    if (id === "socials") return "text-purple-400";
    return "text-yellow-400";
  };

  return (
    <div
      className="bottom-menu fixed bottom-0 left-0 right-0 bg-gradient-to-t from-amber-800 via-amber-700 to-amber-600 border-t-4 border-amber-900 shadow-2xl"
      style={{ zIndex }}
    >
      <div className="flex items-center justify-around px-1 py-1">
        {tabs.map(({ id, icon: Icon, label, ocid, authGated }) => {
          const isActive = currentView === id;
          const dimmed = authGated && !isAuthenticated && !isActive;
          return (
            <button
              key={id}
              type="button"
              data-ocid={ocid}
              onClick={() => handleViewChange(id)}
              className="flex flex-col items-center justify-center w-12 h-12 transition-all duration-200 hover:scale-110 active:scale-95 gap-0.5"
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                size={20}
                className={`transition-colors duration-200 ${
                  isActive
                    ? activeColor(id)
                    : dimmed
                      ? "text-amber-600/50 opacity-60"
                      : "text-white hover:text-yellow-200"
                }`}
              />
              <span
                className={`text-[9px] leading-none font-medium transition-colors duration-200 ${
                  isActive
                    ? activeColor(id)
                    : dimmed
                      ? "text-amber-600/50 opacity-60"
                      : "text-white/70"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
      <div className="h-1 bg-gradient-to-r from-amber-900 via-yellow-600 to-amber-900" />
    </div>
  );
};

export default BottomMenu;
