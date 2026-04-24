import { useActor } from "@caffeineai/core-infrastructure";
import { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ApprovalStatus,
  type GameStatistics,
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
};
export { ApprovalStatus, UserRole };

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
