import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Medal, Settings, Target, Trophy, User } from "lucide-react";
import type React from "react";
import { useCallback, useRef } from "react";

type GameView =
  | "game"
  | "achievements"
  | "profile"
  | "settings"
  | "leaderboard"
  | "login-prompt";

interface BottomMenuProps {
  currentView: GameView;
  onViewChange: (view: GameView) => void;
}

const BottomMenu: React.FC<BottomMenuProps> = ({
  currentView,
  onViewChange,
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

  const tabs = [
    {
      id: "achievements" as GameView,
      icon: Trophy,
      ocid: "bottom_menu.achievements_tab",
      authGated: true,
    },
    {
      id: "game" as GameView,
      icon: Target,
      ocid: "bottom_menu.game_tab",
      authGated: false,
    },
    {
      id: "profile" as GameView,
      icon: User,
      ocid: "bottom_menu.profile_tab",
      authGated: true,
    },
    {
      id: "leaderboard" as GameView,
      icon: Medal,
      ocid: "bottom_menu.leaderboard_tab",
      authGated: true,
    },
    {
      id: "settings" as GameView,
      icon: Settings,
      ocid: "bottom_menu.settings_tab",
      authGated: false,
    },
  ];

  const activeColor = (id: GameView) => {
    if (id === "game") return "text-orange-400";
    return "text-yellow-400";
  };

  return (
    <div className="bottom-menu fixed bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-amber-800 via-amber-700 to-amber-600 border-t-4 border-amber-900 shadow-2xl">
      <div className="flex items-center justify-around px-4 py-2">
        {tabs.map(({ id, icon: Icon, ocid, authGated }) => {
          const isActive = currentView === id;
          const dimmed = authGated && !isAuthenticated && !isActive;
          return (
            <button
              key={id}
              type="button"
              data-ocid={ocid}
              onClick={() => handleViewChange(id)}
              className="flex items-center justify-center w-16 h-12 transition-all duration-200 hover:scale-110 active:scale-95"
              aria-label={id}
            >
              <Icon
                size={24}
                className={`transition-colors duration-200 ${
                  isActive
                    ? activeColor(id)
                    : dimmed
                      ? "text-gray-400 opacity-60"
                      : "text-white hover:text-yellow-200"
                }`}
              />
            </button>
          );
        })}
      </div>
      <div className="h-1 bg-gradient-to-r from-amber-900 via-yellow-600 to-amber-900" />
    </div>
  );
};

export default BottomMenu;
