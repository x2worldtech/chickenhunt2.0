import { useActor } from "@caffeineai/core-infrastructure";
import { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ApprovalStatus,
  type ClanDetails,
  type ClanMessage,
  type ClanSummary,
  type DirectMessage,
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
  DirectMessage,
};
export { ApprovalStatus, UserRole, JoinMode };

/**
 * Extended UserProfile that includes optional image URL fields and social links.
 * These fields are added by the backend migration; older records
 * will simply not have them (undefined / empty string).
 */
export interface UserProfileExtended extends UserProfile {
  profilePictureUrl?: string;
  bannerImageUrl?: string;
  xUrl?: string;
  telegramUrl?: string;
  youtubeUrl?: string;
  githubUrl?: string;
}

/**
 * Extended UserProfileWithChangeStatus that includes optional image URL fields and social links.
 */
export interface UserProfileWithChangeStatusExtended
  extends UserProfileWithChangeStatus {
  profilePictureUrl?: string;
  bannerImageUrl?: string;
  xUrl?: string;
  telegramUrl?: string;
  youtubeUrl?: string;
  githubUrl?: string;
}

export function useUserProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserProfileExtended | null>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCurrentUserProfile() as Promise<UserProfileExtended | null>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUserProfileWithChangeStatus() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserProfileWithChangeStatusExtended | null>({
    queryKey: ["userProfileWithChangeStatus"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCurrentUserProfileWithChangeStatus() as Promise<UserProfileWithChangeStatusExtended | null>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveCurrentUserProfile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfileExtended) => {
      if (!actor) throw new Error("No actor");
      return actor.saveCurrentUserProfile(profile as UserProfile);
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
    mutationFn: async (profile: UserProfileWithChangeStatusExtended) => {
      if (!actor) throw new Error("No actor");
      return actor.saveCurrentUserProfileWithChangeStatus(
        profile as UserProfileWithChangeStatus,
      );
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
      emblemId,
    }: {
      name: string;
      description: string;
      joinMode: JoinMode;
      emblemId: number;
    }) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.createClan(
        name,
        description,
        joinMode,
        BigInt(emblemId),
      );
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

export function useUpdateClan() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      clanId,
      description,
      joinMode,
      emblemId,
    }: {
      clanId: bigint;
      description: string;
      joinMode: JoinMode;
      emblemId: number;
    }) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.updateClan(
        clanId,
        description,
        joinMode,
        BigInt(emblemId),
      );
      if (res.__kind__ === "ok") return res.ok;
      throw new Error(res.err);
    },
    onSuccess: (_, { clanId }) => {
      queryClient.invalidateQueries({ queryKey: ["clan", clanId.toString()] });
      queryClient.invalidateQueries({ queryKey: ["allClans"] });
      queryClient.invalidateQueries({ queryKey: ["userClans"] });
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

// ─── Direct Messages ──────────────────────────────────────────────────────────

export function useDirectMessages(
  otherUserId: Principal | null,
  enabled: boolean,
) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DirectMessage[]>({
    queryKey: ["directMessages", otherUserId?.toText()],
    queryFn: async () => {
      if (!actor || !otherUserId) return [];
      const res = await actor.getDirectMessages(otherUserId, BigInt(50), null);
      if (res.__kind__ === "ok") return res.ok;
      return [];
    },
    enabled: !!actor && !isFetching && otherUserId !== null && enabled,
    refetchInterval: 3000,
  });
}

export function useSendDirectMessage() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      recipientId,
      text,
    }: {
      recipientId: Principal;
      text: string;
    }) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.sendDirectMessage(recipientId, text);
      if (res.__kind__ === "ok") return res.ok;
      throw new Error(res.err);
    },
    onSuccess: (_, { recipientId }) => {
      queryClient.invalidateQueries({
        queryKey: ["directMessages", recipientId.toText()],
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
  return useQuery<UserProfileExtended | null>({
    queryKey: ["userProfileOf", user?.toText()],
    queryFn: async () => {
      if (!actor || !user) return null;
      return actor.getUserProfile(user) as Promise<UserProfileExtended | null>;
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

// ─── Leaderboard entry type ────────────────────────────────────────────────────

export interface LeaderboardEntry {
  username: string;
  highestScore: number;
  level: number;
  key: string;
}

/**
 * Returns leaderboard entries derived from getLeaderboard().
 * Does NOT call listUsers() (admin-only) — principal enrichment is skipped.
 */
export function useLeaderboardEntries() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<LeaderboardEntry[]>({
    queryKey: ["leaderboardEntries"],
    queryFn: async () => {
      if (!actor) return [];
      const leaderboard = await actor.getLeaderboard();
      return leaderboard.map(([username, score, level], index) => ({
        username,
        highestScore: Number(score),
        level: Number(level),
        key: `lb-${index}-${username}`,
      }));
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── pump.fun live price (Binance REST, CoinGecko fallback) ───────────────────

/** Minimal price shape — matches what BackgroundRenderer / GameScreen expect. */
export interface PumpPriceData {
  price: number;
  change24h: number;
}

async function fetchFromBinance(symbol: string): Promise<PumpPriceData> {
  const res = await fetch(
    `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`,
    { signal: AbortSignal.timeout(8_000) },
  );
  if (!res.ok) throw new Error(`Binance ${res.status}`);
  const data = (await res.json()) as {
    lastPrice: string;
    priceChangePercent: string;
  };
  return {
    price: Number.parseFloat(data.lastPrice),
    change24h: Number.parseFloat(data.priceChangePercent),
  };
}

async function fetchFromCoinGecko(coinId: string): Promise<PumpPriceData> {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true`,
    { signal: AbortSignal.timeout(8_000) },
  );
  if (!res.ok) throw new Error(`CoinGecko ${res.status}`);
  const data = (await res.json()) as Record<
    string,
    { usd?: number; usd_24h_change?: number } | undefined
  >;
  const coin = data[coinId];
  if (!coin?.usd) throw new Error("CoinGecko: no price data");
  return {
    price: coin.usd,
    change24h: coin.usd_24h_change ?? 0,
  };
}

export function usePumpFunPrice() {
  return useQuery<PumpPriceData | null>({
    queryKey: ["pumpFunPrice"],
    queryFn: async () => {
      try {
        return await fetchFromBinance("PUMPUSDT");
      } catch {
        return await fetchFromCoinGecko("pump-fun");
      }
    },
    staleTime: 5_000,
    refetchInterval: 10_000,
    placeholderData: (prev) => prev ?? null,
  });
}

// ─── Bitcoin live price (Binance REST, CoinGecko fallback) ────────────────────

export function useBitcoinPrice() {
  return useQuery<PumpPriceData | null>({
    queryKey: ["bitcoinPrice"],
    queryFn: async () => {
      try {
        return await fetchFromBinance("BTCUSDT");
      } catch {
        return await fetchFromCoinGecko("bitcoin");
      }
    },
    staleTime: 5_000,
    refetchInterval: 10_000,
    placeholderData: (prev) => prev ?? null,
  });
}

// ─── BRENT crude oil live price (Binance Futures BZUSDT, Yahoo Finance fallback) ─

/** Oil price data — includes 24h change. */
export interface BrentOilPriceData {
  price: number | null;
  change24h: number | null;
}

async function fetchBrentFromBinanceFutures(): Promise<BrentOilPriceData> {
  const res = await fetch(
    "https://fapi.binance.com/fapi/v1/ticker/24hr?symbol=BZUSDT",
    { signal: AbortSignal.timeout(8_000) },
  );
  if (!res.ok) throw new Error(`Binance Futures ${res.status}`);
  const data = (await res.json()) as {
    lastPrice: string;
    priceChangePercent: string;
  };
  const price = Number.parseFloat(data.lastPrice);
  const change24h = Number.parseFloat(data.priceChangePercent);
  if (!Number.isFinite(price) || price <= 0)
    throw new Error("Binance Futures: invalid price");
  return { price, change24h };
}

interface YahooFinanceChartMeta {
  regularMarketPrice?: number;
  chartPreviousClose?: number;
}

interface YahooFinanceChartResult {
  meta?: YahooFinanceChartMeta;
}

interface YahooFinanceChartResponse {
  chart?: {
    result?: YahooFinanceChartResult[] | null;
    error?: unknown;
  };
}

async function fetchBrentFromYahoo(
  server: "query1" | "query2",
): Promise<BrentOilPriceData> {
  const url = `https://${server}.finance.yahoo.com/v8/finance/chart/BZ%3DF?interval=1d&range=2d`;
  const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`Yahoo Finance ${res.status}`);
  const json = (await res.json()) as YahooFinanceChartResponse;
  const meta = json?.chart?.result?.[0]?.meta;
  if (!meta) throw new Error("Yahoo Finance: no meta data");
  const price = meta.regularMarketPrice ?? null;
  const prevClose = meta.chartPreviousClose ?? null;
  const change24h =
    price !== null && prevClose !== null && prevClose !== 0
      ? ((price - prevClose) / prevClose) * 100
      : null;
  if (price === null) throw new Error("Yahoo Finance: no price");
  return { price, change24h };
}

export function useBrentOilPrice() {
  return useQuery<BrentOilPriceData>({
    queryKey: ["brentOilPrice"],
    queryFn: async () => {
      try {
        return await fetchBrentFromBinanceFutures();
      } catch {
        try {
          return await fetchBrentFromYahoo("query1");
        } catch {
          try {
            return await fetchBrentFromYahoo("query2");
          } catch {
            return { price: null, change24h: null };
          }
        }
      }
    },
    staleTime: 5_000,
    refetchInterval: 10_000,
    placeholderData: (prev) => prev ?? { price: null, change24h: null },
  });
}
