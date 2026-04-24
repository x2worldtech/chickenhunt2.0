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
  X,
} from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useState } from "react";

interface SettingsData {
  backgroundMusicVolume: number;
  soundEffectsEnabled: boolean;
}

interface SettingsViewProps {
  onClose: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ onClose }) => {
  const [settings, setSettings] = useState<SettingsData>({
    backgroundMusicVolume: 30,
    soundEffectsEnabled: true,
  });

  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("chickenHuntSettings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings) as Partial<SettingsData>;
        setSettings((prev) => ({ ...prev, ...parsed }));
      } catch (error) {
        console.warn("Failed to load settings:", error);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("chickenHuntSettings", JSON.stringify(settings));
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

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      data-ocid="settings.dialog"
    >
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 mr-4 shadow-lg">
              <SettingsIcon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-black text-black">SETTINGS</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            aria-label="Close settings"
            data-ocid="settings.close_button"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Settings Content */}
        <div className="p-6 space-y-6">
          {/* Background Music Volume */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-50 border border-orange-200 mr-3">
                  <Music className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-black">
                    Background Music
                  </h3>
                  <p className="text-sm text-gray-600">Adjust music volume</p>
                </div>
              </div>
              <div className="text-orange-500 font-bold text-lg">
                {settings.backgroundMusicVolume}%
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <button
                type="button"
                onClick={handleVolumeDecrease}
                disabled={settings.backgroundMusicVolume === 0}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                aria-label="Decrease volume"
                data-ocid="settings.volume_decrease"
              >
                <Minus className="w-5 h-5" />
              </button>

              <div className="flex-1 text-center">
                <div className="text-2xl font-black text-orange-500 mb-1">
                  {settings.backgroundMusicVolume}%
                </div>
                <div className="text-xs text-gray-500">
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
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                aria-label="Increase volume"
                data-ocid="settings.volume_increase"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sound Effects Toggle */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-50 border border-orange-200 mr-3">
                  {settings.soundEffectsEnabled ? (
                    <Volume2 className="w-5 h-5 text-orange-500" />
                  ) : (
                    <VolumeX className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-black">
                    Sound Effects
                  </h3>
                  <p className="text-sm text-gray-600">
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
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                  settings.soundEffectsEnabled
                    ? "bg-gradient-to-r from-orange-500 to-orange-600"
                    : "bg-gray-300"
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

          {/* Authentication Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-50 border border-orange-200 mr-3">
                  {isAuthenticated ? (
                    <LogOut className="w-5 h-5 text-orange-500" />
                  ) : (
                    <LogIn className="w-5 h-5 text-orange-500" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-black">Account</h3>
                  <p className="text-sm text-gray-600">
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
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                  isAuthenticated
                    ? "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
                    : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg"
                }`}
                data-ocid="settings.auth_button"
              >
                {isLoggingIn ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                    <span>Connecting...</span>
                  </div>
                ) : (
                  <span>{isAuthenticated ? "Logout" : "Login"}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
