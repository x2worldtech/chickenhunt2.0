import { useActor } from "@caffeineai/core-infrastructure";
import { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ApprovalStatus,
  type ClanDetails,
  type ClanMessage,
  type ClanSummary,
  type GameStatistics,
  JoinMode,
  type PrincipalInfo,
  type UserInfo,
  type UserProfile,
  type UserProfileWithChangeStatus,
  UserRole,
  createActor,
} from "../backend";

export type {
  UserProfile,
  UserProfileWithChangeStatus,
  UserInfo,
  GameStatistics,
  ClanSummary,
  ClanDetails,
  ClanMessage,
  PrincipalInfo,
};
export { ApprovalStatus, UserRole, JoinMode };

export function useUserProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserProfile | null>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCurrentUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUserProfileWithChangeStatus() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserProfileWithChangeStatus | null>({
    queryKey: ["userProfileWithChangeStatus"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCurrentUserProfileWithChangeStatus();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveCurrentUserProfile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("No actor");
      return actor.saveCurrentUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
}

export function useSaveCurrentUserProfileWithChangeStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfileWithChangeStatus) => {
      if (!actor) throw new Error("No actor");
      return actor.saveCurrentUserProfileWithChangeStatus(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userProfileWithChangeStatus"],
      });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
}

export function useSaveGameStatistics() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (stats: GameStatistics) => {
      if (!actor) throw new Error("No actor");
      return actor.saveGameStatistics(stats);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
}

// Leaderboard returns [name, score, level] tuples
export function useLeaderboard() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Array<[string, bigint, bigint]>>({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLeaderboard();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCurrentUserApprovalStatus() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ApprovalStatus>({
    queryKey: ["currentUserApprovalStatus"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor available");
      return actor.getCurrentUserApprovalStatus();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCurrentUserAdmin() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<boolean>({
    queryKey: ["isCurrentUserAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCurrentUserAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCurrentUserRole() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserRole>({
    queryKey: ["currentUserRole"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor available");
      return actor.getCurrentUserRole();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useListUsers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserInfo[]>({
    queryKey: ["listUsers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listUsers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetApproval() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      user,
      approval,
    }: { user: string; approval: ApprovalStatus }) => {
      if (!actor) throw new Error("No actor");
      return actor.setApproval(Principal.fromText(user), approval);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listUsers"] });
    },
  });
}

export function useAssignRole() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ user, role }: { user: string; role: UserRole }) => {
      if (!actor) throw new Error("No actor");
      return actor.assignRole(Principal.fromText(user), role);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listUsers"] });
    },
  });
}

// ─── Clan Queries ──────────────────────────────────────────────────────────────

export function useAllClans() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ClanSummary[]>({
    queryKey: ["allClans"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllClans();
    },
    enabled: !!actor && !isFetching,
  });
}

/**
 * Returns all clans the current user is a member of (owner OR regular member).
 * Fetches all clan summaries, then resolves details in parallel to check membership.
 */
export function useUserClans(myPrincipal: Principal | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ClanSummary[]>({
    queryKey: ["userClans", myPrincipal?.toText()],
    queryFn: async () => {
      if (!actor || !myPrincipal) return [];
      const all = await actor.getAllClans();
      if (all.length === 0) return [];
      const myText = myPrincipal.toText();
      // First pass: clans where user is owner (no extra fetch needed)
      const ownedIds = new Set(
        all
          .filter((c) => c.ownerId.toText() === myText)
          .map((c) => c.id.toString()),
      );
      // Second pass: for remaining clans, fetch details to check membership
      const detailResults = await Promise.allSettled(
        all
          .filter((c) => !ownedIds.has(c.id.toString()))
          .map(async (c) => {
            const res = await actor.getClan(c.id);
            if (res.__kind__ === "ok") {
              const isMember = res.ok.members.some(
                (m) => m.principal.toText() === myText,
              );
              return isMember ? c.id.toString() : null;
            }
            return null;
          }),
      );
      const memberIds = new Set(
        detailResults
          .filter(
            (r): r is PromiseFulfilledResult<string | null> =>
              r.status === "fulfilled",
          )
          .map((r) => r.value)
          .filter((id): id is string => id !== null),
      );
      return all.filter(
        (c) => ownedIds.has(c.id.toString()) || memberIds.has(c.id.toString()),
      );
    },
    enabled: !!actor && !isFetching && myPrincipal !== null,
  });
}

export function useSearchClans(q: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ClanSummary[]>({
    queryKey: ["searchClans", q],
    queryFn: async () => {
      if (!actor || q.trim().length === 0) return [];
      return actor.searchClans(q);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useClanDetails(clanId: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ClanDetails | null>({
    queryKey: ["clan", clanId?.toString()],
    queryFn: async () => {
      if (!actor || clanId === null) return null;
      const res = await actor.getClan(clanId);
      if (res.__kind__ === "ok") return res.ok;
      throw new Error(res.err);
    },
    enabled: !!actor && !isFetching && clanId !== null,
  });
}

export function usePendingJoinRequests(clanId: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<PrincipalInfo[]>({
    queryKey: ["pendingRequests", clanId?.toString()],
    queryFn: async () => {
      if (!actor || clanId === null) return [];
      const res = await actor.getPendingJoinRequests(clanId);
      if (res.__kind__ === "ok") return res.ok;
      return [];
    },
    enabled: !!actor && !isFetching && clanId !== null,
  });
}

export function useCreateClan() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      description,
      joinMode,
    }: { name: string; description: string; joinMode: JoinMode }) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.createClan(name, description, joinMode);
      if (res.__kind__ === "ok") return res.ok;
      throw new Error(res.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allClans"] });
    },
  });
}

export function useJoinClan() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (clanId: bigint) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.joinClan(clanId);
      if (res.__kind__ === "ok") return res.ok;
      throw new Error(res.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allClans"] });
      queryClient.invalidateQueries({ queryKey: ["searchClans"] });
    },
  });
}

export function useLeaveClan() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (clanId: bigint) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.leaveClan(clanId);
      if (res.__kind__ === "ok") return res.ok;
      throw new Error(res.err);
    },
    onSuccess: (_, clanId) => {
      queryClient.invalidateQueries({ queryKey: ["allClans"] });
      queryClient.invalidateQueries({ queryKey: ["clan", clanId.toString()] });
    },
  });
}

export function useDeleteClan() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (clanId: bigint) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.deleteClan(clanId);
      if (res.__kind__ === "ok") return res.ok;
      throw new Error(res.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allClans"] });
    },
  });
}

export function useApproveJoinRequest() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      clanId,
      userId,
    }: { clanId: bigint; userId: Principal }) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.approveJoinRequest(clanId, userId);
      if (res.__kind__ === "ok") return res.ok;
      throw new Error(res.err);
    },
    onSuccess: (_, { clanId }) => {
      queryClient.invalidateQueries({
        queryKey: ["pendingRequests", clanId.toString()],
      });
      queryClient.invalidateQueries({ queryKey: ["clan", clanId.toString()] });
    },
  });
}

export function useDeclineJoinRequest() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      clanId,
      userId,
    }: { clanId: bigint; userId: Principal }) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.declineJoinRequest(clanId, userId);
      if (res.__kind__ === "ok") return res.ok;
      throw new Error(res.err);
    },
    onSuccess: (_, { clanId }) => {
      queryClient.invalidateQueries({
        queryKey: ["pendingRequests", clanId.toString()],
      });
    },
  });
}

// ─── Clan Chat ─────────────────────────────────────────────────────────────────

export function useClanMessages(clanId: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ClanMessage[]>({
    queryKey: ["clanMessages", clanId?.toString()],
    queryFn: async () => {
      if (!actor || clanId === null) return [];
      const res = await actor.getClanMessages(clanId, BigInt(50), null);
      if (res.__kind__ === "ok") return res.ok;
      return [];
    },
    enabled: !!actor && !isFetching && clanId !== null,
    refetchInterval: 3000,
  });
}

export function useSendClanMessage() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ clanId, text }: { clanId: bigint; text: string }) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.sendClanMessage(clanId, text);
      if (res.__kind__ === "ok") return res.ok;
      throw new Error(res.err);
    },
    onSuccess: (_, { clanId }) => {
      queryClient.invalidateQueries({
        queryKey: ["clanMessages", clanId.toString()],
      });
    },
  });
}

// ─── Friends ──────────────────────────────────────────────────────────────────

export function useGetFriends() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<PrincipalInfo[]>({
    queryKey: ["friends"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFriends();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsFriend(userId: Principal | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<boolean>({
    queryKey: ["isFriend", userId?.toText()],
    queryFn: async () => {
      if (!actor || !userId) return false;
      return actor.isFriend(userId);
    },
    enabled: !!actor && !isFetching && userId !== null,
  });
}

export function useAddFriend() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: Principal) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.addFriend(userId);
      if (res.__kind__ === "ok") return res.ok;
      throw new Error(res.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["isFriend"] });
    },
  });
}

export function useRemoveFriend() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: Principal) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.removeFriend(userId);
      if (res.__kind__ === "ok") return res.ok;
      throw new Error(res.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["isFriend"] });
    },
  });
}

export function useGetUserProfile(user: Principal | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserProfile | null>({
    queryKey: ["userProfileOf", user?.toText()],
    queryFn: async () => {
      if (!actor || !user) return null;
      return actor.getUserProfile(user);
    },
    enabled: !!actor && !isFetching && user !== null,
  });
}

export function useGetUserGameStats(userId: Principal | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<GameStatistics | null>({
    queryKey: ["userGameStats", userId?.toText()],
    queryFn: async () => {
      if (!actor || !userId) return null;
      return actor.getUserGameStats(userId);
    },
    enabled: !!actor && !isFetching && userId !== null,
  });
}

// ─── Leaderboard with principals ───────────────────────────────────────────────

export interface LeaderboardEntryWithPrincipal {
  username: string;
  highestScore: number;
  level: number;
  key: string;
  principal: Principal | null;
}

/**
 * Returns leaderboard entries enriched with principal IDs.
 * Cross-references leaderboard names against user profiles via listUsers.
 * principal is null when no match could be found.
 */
export function useLeaderboardWithPrincipals() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<LeaderboardEntryWithPrincipal[]>({
    queryKey: ["leaderboardWithPrincipals"],
    queryFn: async () => {
      if (!actor) return [];
      const [leaderboard, allUsers] = await Promise.all([
        actor.getLeaderboard(),
        actor.listUsers(),
      ]);

      if (leaderboard.length === 0) return [];

      // Batch-fetch profiles for all users (cap at 100 to avoid overload)
      const usersToFetch = allUsers.slice(0, 100);
      const profiles = await Promise.allSettled(
        usersToFetch.map(async (u) => {
          const profile = await actor.getUserProfile(u.principal);
          return { principal: u.principal, name: profile?.name?.trim() ?? "" };
        }),
      );

      // Build name → principal map (first match wins)
      const nameMap = new Map<string, Principal>();
      for (const result of profiles) {
        if (result.status === "fulfilled" && result.value.name) {
          const { name, principal } = result.value;
          if (!nameMap.has(name)) {
            nameMap.set(name, principal);
          }
        }
      }

      return leaderboard
        .map(([username, score, level], index) => ({
          username,
          highestScore: Number(score),
          level: Number(level),
          key: `lb-${index}-${username}`,
          principal: nameMap.get(username) ?? null,
        }))
        .sort((a, b) => b.highestScore - a.highestScore);
    },
    enabled: !!actor && !isFetching,
  });
}
