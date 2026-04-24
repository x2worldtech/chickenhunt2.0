import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";

const network =
  process.env.DFX_NETWORK ||
  (process.env.NODE_ENV === "production" ? "ic" : "local");

async function loadConfig(): Promise<{
  backend_host: string;
  backend_canister_id: string;
}> {
  try {
    const response = await fetch("./env.json");
    return await response.json();
  } catch {
    return { backend_host: "undefined", backend_canister_id: "undefined" };
  }
}

// Simplified URL sanitization
export const sanitizeUrl = (path: string): string => {
  return path
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9\-_./]/g, "")
    .replace(/-+/g, "-")
    .replace(/\.\./g, "")
    .replace(/^[-/]+/, "")
    .replace(/\/+/g, "/")
    .replace(/[-/]+$/, "");
};

// Get file URL with simplified logic
export const buildFileUrl = async (path: string): Promise<string> => {
  const sanitizedPath = sanitizeUrl(path);
  const config = await loadConfig();

  const backendCanisterId =
    config.backend_canister_id !== "undefined"
      ? config.backend_canister_id
      : "";

  const baseUrl =
    network === "local"
      ? `http://${backendCanisterId}.raw.localhost:8081`
      : `https://${backendCanisterId}.raw.icp0.io`;

  return `${baseUrl}/${sanitizedPath}`;
};

// Hook to fetch the list of files
export const useFileList = () => {
  const { actor } = useActor(createActor);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const a = actor as any;

  return useQuery({
    queryKey: ["fileList"],
    queryFn: async () => {
      if (!a) throw new Error("Backend is not available");
      return await a.fileList();
    },
    enabled: !!a,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

// Unified hook for getting file URLs
export const useFileUrl = (path: string) => {
  return useQuery({
    queryKey: ["fileUrl", path],
    queryFn: () => buildFileUrl(path),
    enabled: !!path,
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: 30 * 60 * 1000,
  });
};

// Utility to invalidate queries
export const useInvalidateQueries = () => {
  const queryClient = useQueryClient();

  return {
    invalidateFileList: () =>
      queryClient.invalidateQueries({ queryKey: ["fileList"] }),
    invalidateFileUrl: (path: string) =>
      queryClient.invalidateQueries({ queryKey: ["fileUrl", path] }),
    invalidateAll: () => {
      queryClient.invalidateQueries({ queryKey: ["fileList"] });
      queryClient.invalidateQueries({ queryKey: ["fileUrl"] });
    },
  };
};
