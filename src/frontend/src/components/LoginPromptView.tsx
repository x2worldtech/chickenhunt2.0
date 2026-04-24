import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { LogIn, Medal, Shield, Trophy, User, X } from "lucide-react";
import type React from "react";

interface LoginPromptViewProps {
  requestedFeature: string;
  onClose: () => void;
}

const LoginPromptView: React.FC<LoginPromptViewProps> = ({
  requestedFeature,
  onClose,
}) => {
  const { login, loginStatus } = useInternetIdentity();

  const handleLogin = async () => {
    try {
      await login();
      onClose();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const getFeatureIcon = () => {
    switch (requestedFeature) {
      case "Achievements":
        return <Trophy className="w-12 h-12 text-orange-500" />;
      case "Profile":
        return <User className="w-12 h-12 text-orange-500" />;
      case "Leaderboard":
        return <Medal className="w-12 h-12 text-orange-500" />;
      default:
        return <Shield className="w-12 h-12 text-orange-500" />;
    }
  };

  const getFeatureDescription = () => {
    switch (requestedFeature) {
      case "Achievements":
        return "Track your progress, unlock milestones, and showcase your chicken hunting skills with detailed achievement statistics.";
      case "Profile":
        return "View your player level, XP progress, title, and personal gaming statistics in your customized profile.";
      case "Leaderboard":
        return "Compete with other players and see how your highest scores rank against the global chicken hunting community.";
      default:
        return "Access exclusive features and track your progress across all your gaming sessions.";
    }
  };

  const isLoggingIn = loginStatus === "logging-in";

  return (
    <div
      className="absolute inset-0 bg-black/75 flex items-center justify-center z-50 px-4"
      data-ocid="login-prompt.dialog"
    >
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 mr-4 shadow-lg">
              <LogIn className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-black text-black">LOGIN REQUIRED</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoggingIn}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            aria-label="Close"
            data-ocid="login-prompt.close_button"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Feature Icon and Title */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">{getFeatureIcon()}</div>
            <h3 className="text-xl font-bold text-black mb-2">
              {requestedFeature} Access
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {getFeatureDescription()}
            </p>
          </div>

          {/* Benefits Section */}
          <div className="bg-orange-50 rounded-lg p-4 mb-6 border border-orange-200">
            <h4 className="text-lg font-bold text-orange-800 mb-3 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Benefits of Logging In
            </h4>
            <ul className="space-y-2 text-sm text-orange-700">
              {[
                "Persistent progress across all devices",
                "Unlock and track detailed achievements",
                "Compete on the global leaderboard",
                "Secure, decentralized authentication",
                "No passwords or personal data required",
              ].map((benefit) => (
                <li key={benefit} className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="w-full flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              data-ocid="login-prompt.confirm_button"
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

            <button
              type="button"
              onClick={onClose}
              disabled={isLoggingIn}
              className="w-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              data-ocid="login-prompt.cancel_button"
            >
              <X className="w-5 h-5 mr-3" />
              <span>Continue as Guest</span>
            </button>
          </div>

          {/* Info Text */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Internet Identity provides secure, anonymous authentication
              without requiring personal information or passwords.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPromptView;
