import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import {
  LogIn,
  LogOut,
  Minus,
  Music,
  Plus,
  Settings as SettingsIcon,
  Volume2,
  VolumeX,
} from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useState } from "react";

interface SettingsData {
  backgroundMusicVolume: number;
  soundEffectsEnabled: boolean;
}

interface SettingsViewProps {
  onClose: () => void;
  zIndex?: number;
}

const SettingsView: React.FC<SettingsViewProps> = ({
  onClose: _onClose,
  zIndex = 40,
}) => {
  const [settings, setSettings] = useState<SettingsData>({
    backgroundMusicVolume: 30,
    soundEffectsEnabled: true,
  });

  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  useEffect(() => {
    const savedSettings = localStorage.getItem("worldOfHuntSettings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings) as Partial<SettingsData>;
        setSettings((prev) => ({ ...prev, ...parsed }));
      } catch (error) {
        console.warn("Failed to load settings:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("worldOfHuntSettings", JSON.stringify(settings));
  }, [settings]);

  const handleVolumeIncrease = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      backgroundMusicVolume: Math.min(100, prev.backgroundMusicVolume + 10),
    }));
  }, []);

  const handleVolumeDecrease = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      backgroundMusicVolume: Math.max(0, prev.backgroundMusicVolume - 10),
    }));
  }, []);

  const handleSoundEffectsToggle = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      soundEffectsEnabled: !prev.soundEffectsEnabled,
    }));
  }, []);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await clear();
      queryClient.clear();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden bg-black"
      data-ocid="settings.dialog"
      style={{ zIndex, paddingBottom: "60px" }}
    >
      {/* Header */}
      <div className="flex items-center justify-center px-5 py-4 border-b border-gray-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg">
            <SettingsIcon className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            SETTINGS
          </h2>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
        {/* Background Music */}
        <div className="rounded-xl bg-white border border-gray-200 shadow-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-md">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-black text-black">
                Background Music
              </h3>
              <p className="text-sm text-gray-500">Adjust music volume</p>
            </div>
            <div className="text-orange-500 font-black text-lg min-w-[3rem] text-right">
              {settings.backgroundMusicVolume}%
            </div>
          </div>

          {/* Volume bar */}
          <div className="w-full h-2.5 rounded-full bg-gray-200 overflow-hidden mb-5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-200"
              style={{ width: `${settings.backgroundMusicVolume}%` }}
            />
          </div>

          <div className="flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={handleVolumeDecrease}
              disabled={settings.backgroundMusicVolume === 0}
              className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
              aria-label="Decrease volume"
              data-ocid="settings.volume_decrease"
            >
              <Minus className="w-5 h-5" />
            </button>

            <div className="flex-1 text-center">
              <div className="text-4xl font-black text-black mb-1">
                {settings.backgroundMusicVolume}%
              </div>
              <div className="text-xs text-gray-500 font-medium">
                {settings.backgroundMusicVolume === 0
                  ? "Silent"
                  : settings.backgroundMusicVolume === 100
                    ? "Maximum"
                    : "Volume"}
              </div>
            </div>

            <button
              type="button"
              onClick={handleVolumeIncrease}
              disabled={settings.backgroundMusicVolume === 100}
              className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
              aria-label="Increase volume"
              data-ocid="settings.volume_increase"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sound Effects */}
        <div className="rounded-xl bg-white border border-gray-200 shadow-xl p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-md">
                {settings.soundEffectsEnabled ? (
                  <Volume2 className="w-5 h-5 text-white" />
                ) : (
                  <VolumeX className="w-5 h-5 text-white opacity-60" />
                )}
              </div>
              <div>
                <h3 className="text-base font-black text-black">
                  Sound Effects
                </h3>
                <p className="text-sm text-gray-500">
                  Shot sounds and feedback
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSoundEffectsToggle}
              aria-label={
                settings.soundEffectsEnabled
                  ? "Disable sound effects"
                  : "Enable sound effects"
              }
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                settings.soundEffectsEnabled
                  ? "bg-gradient-to-r from-orange-500 to-orange-600"
                  : "bg-gray-200"
              }`}
              data-ocid="settings.sound_toggle"
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-200 ${
                  settings.soundEffectsEnabled
                    ? "translate-x-7"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Account */}
        <div className="rounded-xl bg-white border border-gray-200 shadow-xl p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-md">
                {isAuthenticated ? (
                  <LogOut className="w-5 h-5 text-white" />
                ) : (
                  <LogIn className="w-5 h-5 text-white" />
                )}
              </div>
              <div>
                <h3 className="text-base font-black text-black">Account</h3>
                <p className="text-sm text-gray-500">
                  {isAuthenticated
                    ? "Logged in with Internet Identity"
                    : "Login for persistent progress"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={isAuthenticated ? handleLogout : handleLogin}
              disabled={isLoggingIn}
              className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                isAuthenticated
                  ? "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200"
                  : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg"
              }`}
              data-ocid="settings.auth_button"
            >
              {isLoggingIn ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                  <span>Connecting...</span>
                </div>
              ) : (
                <span>{isAuthenticated ? "Logout" : "Login"}</span>
              )}
            </button>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-gray-700 text-xs pt-2 font-medium">
          World of Hunt — Settings are saved automatically
        </p>
      </div>
    </div>
  );
};

export default SettingsView;
