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
export interface ClanSummary {
    id: bigint;
    ownerId: Principal;
    joinMode: JoinMode;
    name: string;
    memberCount: bigint;
    description: string;
    emblemId: bigint;
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
export interface ClanMessage {
    id: bigint;
    clanId: bigint;
    text: string;
    timestamp: bigint;
    senderId: Principal;
}
export interface UserInfo {
    principal: Principal;
    role: UserRole;
    approval: ApprovalStatus;
}
export interface ClanDetails {
    id: bigint;
    pendingCount: bigint;
    members: Array<PrincipalInfo>;
    ownerId: Principal;
    joinMode: JoinMode;
    name: string;
    createdAt: bigint;
    description: string;
    emblemId: bigint;
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
export interface PrincipalInfo {
    principal: Principal;
    name: string;
    level: bigint;
    avatarUrl?: string;
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
    profilePictureUrl?: string;
    bannerImageUrl?: string;
}
export enum ApprovalStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum JoinMode {
    open = "open",
    requestRequired = "requestRequired"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addFriend(userId: Principal): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    approveJoinRequest(clanId: bigint, userId: Principal): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    assignRole(user: Principal, newRole: UserRole): Promise<void>;
    createClan(name: string, description: string, joinMode: JoinMode, emblemId: bigint): Promise<{
        __kind__: "ok";
        ok: bigint;
    } | {
        __kind__: "err";
        err: string;
    }>;
    declineJoinRequest(clanId: bigint, userId: Principal): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteClan(clanId: bigint): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    fileDelete(path: string): Promise<void>;
    fileList(): Promise<Array<FileMetadata>>;
    fileUpload(path: string, mimeType: string, chunk: Uint8Array, complete: boolean): Promise<void>;
    getAllClans(): Promise<Array<ClanSummary>>;
    getApprovalStatus(user: Principal): Promise<ApprovalStatus>;
    getClan(clanId: bigint): Promise<{
        __kind__: "ok";
        ok: ClanDetails;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getClanMessages(clanId: bigint, limit: bigint, before: bigint | null): Promise<{
        __kind__: "ok";
        ok: Array<ClanMessage>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getCurrentUserApprovalStatus(): Promise<ApprovalStatus>;
    getCurrentUserProfile(): Promise<UserProfile | null>;
    getCurrentUserProfileWithChangeStatus(): Promise<UserProfileWithChangeStatus | null>;
    getCurrentUserRole(): Promise<UserRole>;
    getFriends(): Promise<Array<PrincipalInfo>>;
    getLeaderboard(): Promise<Array<[string, bigint, bigint]>>;
    getPendingJoinRequests(clanId: bigint): Promise<{
        __kind__: "ok";
        ok: Array<PrincipalInfo>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getUserGameStats(userId: Principal): Promise<GameStatistics | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getUserProfileWithChangeStatus(user: Principal): Promise<UserProfileWithChangeStatus | null>;
    httpStreamingCallback(token: StreamingToken): Promise<StreamingCallbackHttpResponse>;
    http_request(request: HttpRequest): Promise<HttpResponse>;
    initializeAuth(): Promise<void>;
    isCurrentUserAdmin(): Promise<boolean>;
    isFriend(userId: Principal): Promise<boolean>;
    joinClan(clanId: bigint): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    leaveClan(clanId: bigint): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    listUsers(): Promise<Array<UserInfo>>;
    removeFriend(userId: Principal): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    saveCurrentUserProfile(profile: UserProfile): Promise<void>;
    saveCurrentUserProfileWithChangeStatus(profile: UserProfileWithChangeStatus): Promise<void>;
    saveGameStatistics(stats: GameStatistics): Promise<void>;
    searchClans(q: string): Promise<Array<ClanSummary>>;
    sendClanMessage(clanId: bigint, text: string): Promise<{
        __kind__: "ok";
        ok: ClanMessage;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setApproval(user: Principal, approval: ApprovalStatus): Promise<void>;
}
