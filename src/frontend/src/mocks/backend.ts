import type { backendInterface, UserProfile, UserProfileWithChangeStatus, GameStatistics, ApprovalStatus, UserRole, UserInfo, FileMetadata, StreamingCallbackHttpResponse, HttpResponse } from "../backend";

export const mockBackend: backendInterface = {
  assignRole: async () => undefined,
  fileDelete: async () => undefined,
  fileList: async (): Promise<FileMetadata[]> => [],
  fileUpload: async () => undefined,
  getApprovalStatus: async () => "approved" as unknown as ApprovalStatus,
  getCurrentUserApprovalStatus: async () => "approved" as unknown as ApprovalStatus,
  getCurrentUserProfile: async (): Promise<UserProfile | null> => ({
    bio: "ChickenHunt Spieler",
    name: "Jäger",
  }),
  getCurrentUserProfileWithChangeStatus: async (): Promise<UserProfileWithChangeStatus | null> => ({
    bio: "ChickenHunt Spieler",
    name: "Jäger",
    hasChangedName: false,
  }),
  getCurrentUserRole: async () => "user" as unknown as UserRole,
  getLeaderboard: async (): Promise<Array<[string, bigint, bigint]>> => [
    ["Jäger", BigInt(5000), BigInt(1)],
    ["Meisterschütze", BigInt(4200), BigInt(2)],
    ["Hühnerjäger", BigInt(3800), BigInt(3)],
  ],
  getUserProfile: async (): Promise<UserProfile | null> => ({
    bio: "ChickenHunt Spieler",
    name: "Jäger",
  }),
  getUserProfileWithChangeStatus: async (): Promise<UserProfileWithChangeStatus | null> => ({
    bio: "ChickenHunt Spieler",
    name: "Jäger",
    hasChangedName: false,
  }),
  httpStreamingCallback: async (): Promise<StreamingCallbackHttpResponse> => ({
    body: new Uint8Array(),
    token: undefined,
  }),
  http_request: async (): Promise<HttpResponse> => ({
    body: new Uint8Array(),
    headers: [],
    status_code: 200,
  }),
  initializeAuth: async () => undefined,
  isCurrentUserAdmin: async () => false,
  listUsers: async (): Promise<UserInfo[]> => [],
  saveCurrentUserProfile: async () => undefined,
  saveCurrentUserProfileWithChangeStatus: async () => undefined,
  saveGameStatistics: async () => undefined,
  setApproval: async () => undefined,
};
