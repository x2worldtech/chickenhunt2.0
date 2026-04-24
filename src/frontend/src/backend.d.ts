import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface HttpRequest {
    url: string;
    method: string;
    body: Uint8Array;
    headers: Array<HeaderField>;
}
export interface FileMetadata {
    path: string;
    size: bigint;
    mimeType: string;
}
export interface StreamingToken {
    resource: string;
    index: bigint;
}
export interface StreamingCallbackHttpResponse {
    token?: StreamingToken;
    body: Uint8Array;
}
export type StreamingCallback = (arg0: StreamingToken) => Promise<StreamingCallbackHttpResponse>;
export interface UserInfo {
    principal: Principal;
    role: UserRole;
    approval: ApprovalStatus;
}
export type StreamingStrategy = {
    __kind__: "Callback";
    Callback: {
        token: StreamingToken;
        callback: [Principal, string];
    };
};
export interface UserProfileWithChangeStatus {
    bio: string;
    name: string;
    hasChangedName: boolean;
}
export interface HttpResponse {
    body: Uint8Array;
    headers: Array<HeaderField>;
    streaming_strategy?: StreamingStrategy;
    status_code: number;
}
export type HeaderField = [string, string];
export interface GameStatistics {
    totalShotsFired: bigint;
    totalChickensShot: bigint;
    bestSessionChickens: bigint;
    bestConsecutiveHits: bigint;
    highestScore: bigint;
    perfectAccuracySessions: bigint;
    smallChickensShot: bigint;
    totalPlayTimeMinutes: bigint;
    level: bigint;
    totalScore: bigint;
    fastChickensShot: bigint;
    largeChickensShot: bigint;
    totalMissedShots: bigint;
    mediumChickensShot: bigint;
    currentAccuracy: number;
    goldenChickensShot: bigint;
}
export interface UserProfile {
    bio: string;
    name: string;
}
export enum ApprovalStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignRole(user: Principal, newRole: UserRole): Promise<void>;
    fileDelete(path: string): Promise<void>;
    fileList(): Promise<Array<FileMetadata>>;
    fileUpload(path: string, mimeType: string, chunk: Uint8Array, complete: boolean): Promise<void>;
    getApprovalStatus(user: Principal): Promise<ApprovalStatus>;
    getCurrentUserApprovalStatus(): Promise<ApprovalStatus>;
    getCurrentUserProfile(): Promise<UserProfile | null>;
    getCurrentUserProfileWithChangeStatus(): Promise<UserProfileWithChangeStatus | null>;
    getCurrentUserRole(): Promise<UserRole>;
    getLeaderboard(): Promise<Array<[string, bigint, bigint]>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getUserProfileWithChangeStatus(user: Principal): Promise<UserProfileWithChangeStatus | null>;
    httpStreamingCallback(token: StreamingToken): Promise<StreamingCallbackHttpResponse>;
    http_request(request: HttpRequest): Promise<HttpResponse>;
    initializeAuth(): Promise<void>;
    isCurrentUserAdmin(): Promise<boolean>;
    listUsers(): Promise<Array<UserInfo>>;
    saveCurrentUserProfile(profile: UserProfile): Promise<void>;
    saveCurrentUserProfileWithChangeStatus(profile: UserProfileWithChangeStatus): Promise<void>;
    saveGameStatistics(stats: GameStatistics): Promise<void>;
    setApproval(user: Principal, approval: ApprovalStatus): Promise<void>;
}
